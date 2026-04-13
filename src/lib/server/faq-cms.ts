import "server-only";

import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { ConvexHttpClient } from "convex/browser";

import { prepareFaqContentForSave, validateFaqContentForSave } from "@/lib/faq/cms-validation";
import { defaultFaqContent, normalizeFaqContent } from "@/lib/faq/content";
import { FAQ_LOCALES } from "@/lib/faq/types";
import type { FaqContentStore } from "@/lib/faq/types";

const faqContentDirectory = path.join(process.cwd(), "src", "data");
const faqContentFilePath = path.join(faqContentDirectory, "faq-content.json");
const MAX_FAQ_BODY_CHUNK_BYTES = 180 * 1024;

function getFaqAssetBaseUrl() {
  const value = process.env.ODOO_BASE_URL?.trim();
  return value && value.length > 0 ? value.replace(/\/$/, "") : "https://vesalius.odoo.com";
}

function getConvexAdminToken() {
  const value = process.env.CONVEX_DEPLOY_KEY?.trim();
  return value && value.length > 0 ? value : undefined;
}

function isConvexReadConfigured() {
  const value = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  return Boolean(value);
}

function isConvexWriteConfigured() {
  return isConvexReadConfigured() && Boolean(getConvexAdminToken());
}

function getConvexUrl() {
  const value = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  return value && value.length > 0 ? value : undefined;
}

function createConvexClient(adminToken?: string) {
  const url = getConvexUrl();

  if (!url) {
    throw new Error("Convex FAQ CMS is not configured. Set NEXT_PUBLIC_CONVEX_URL.");
  }

  const client = new ConvexHttpClient(url);

  if (adminToken) {
    (client as ConvexHttpClient & { setAdminAuth(token: string): void }).setAdminAuth(adminToken);
  }

  return client;
}

async function runConvexQuery<T>(
  client: ConvexHttpClient,
  name: string,
  args: Record<string, unknown>,
) {
  return (client as ConvexHttpClient & {
    query(query: string, args: Record<string, unknown>): Promise<T>;
  }).query(name, args);
}

async function runConvexMutation<T>(
  client: ConvexHttpClient,
  name: string,
  args: Record<string, unknown>,
) {
  return (client as ConvexHttpClient & {
    mutation(mutation: string, args: Record<string, unknown>): Promise<T>;
  }).mutation(name, args);
}

function splitFaqBodyIntoChunks(body: string) {
  const chunks: string[] = [];
  let currentChunk = "";

  for (const character of body) {
    const nextChunk = `${currentChunk}${character}`;

    if (Buffer.byteLength(nextChunk, "utf8") > MAX_FAQ_BODY_CHUNK_BYTES) {
      if (!currentChunk) {
        throw new Error("An FAQ article contains a body chunk that cannot fit within Convex limits.");
      }

      chunks.push(currentChunk);
      currentChunk = character;
      continue;
    }

    currentChunk = nextChunk;
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function rewriteFaqAssetUrls(value: string) {
  const assetBaseUrl = getFaqAssetBaseUrl();

  return value
    .replaceAll("https://www.vesalius.ai/web/image", `${assetBaseUrl}/web/image`)
    .replaceAll("https://vesalius.ai/web/image", `${assetBaseUrl}/web/image`)
    .replace(/(\b(?:src|data-original-src)=["'])\/web\/image/gi, `$1${assetBaseUrl}/web/image`);
}

function resolveFaqAssetUrls(content: FaqContentStore): FaqContentStore {
  return {
    en: {
      ...content.en,
      items: content.en.items.map((article) => ({
        ...article,
        body: rewriteFaqAssetUrls(article.body),
        heroImage: article.heroImage
          ? {
              ...article.heroImage,
              src: rewriteFaqAssetUrls(article.heroImage.src),
            }
          : article.heroImage,
      })),
    },
    nl: {
      ...content.nl,
      items: content.nl.items.map((article) => ({
        ...article,
        body: rewriteFaqAssetUrls(article.body),
        heroImage: article.heroImage
          ? {
              ...article.heroImage,
              src: rewriteFaqAssetUrls(article.heroImage.src),
            }
          : article.heroImage,
      })),
    },
    fr: {
      ...content.fr,
      items: content.fr.items.map((article) => ({
        ...article,
        body: rewriteFaqAssetUrls(article.body),
        heroImage: article.heroImage
          ? {
              ...article.heroImage,
              src: rewriteFaqAssetUrls(article.heroImage.src),
            }
          : article.heroImage,
      })),
    },
  };
}

async function readLocalFaqContent(): Promise<FaqContentStore> {
  try {
    const content = await readFile(faqContentFilePath, "utf8");
    return resolveFaqAssetUrls(normalizeFaqContent(JSON.parse(content) as Record<string, unknown>));
  } catch (error) {
    const code = typeof error === "object" && error !== null && "code" in error ? error.code : undefined;
    if (code === "ENOENT") {
      return resolveFaqAssetUrls(defaultFaqContent);
    }

    console.error("Failed to read local FAQ CMS content:", error);
    return resolveFaqAssetUrls(defaultFaqContent);
  }
}

export function getFaqContentFilePath() {
  return faqContentFilePath;
}

export function isFaqCmsReadConfigured() {
  return isConvexReadConfigured();
}

export function isFaqCmsWriteConfigured() {
  return isConvexWriteConfigured();
}

export async function readFaqContent(): Promise<FaqContentStore> {
  if (isConvexReadConfigured()) {
    try {
      const content = await runConvexQuery<Record<string, unknown> | null>(
        createConvexClient(),
        "faqCms:getContent",
        {},
      );
      if (content) {
        return resolveFaqAssetUrls(normalizeFaqContent(content as Record<string, unknown>));
      }
    } catch (error) {
      console.error("Failed to read FAQ CMS content from Convex:", error);
    }
  }

  return readLocalFaqContent();
}

export async function writeFaqContent(content: Record<string, unknown>) {
  const preparedContent = prepareFaqContentForSave(content);
  const validationError = validateFaqContentForSave(preparedContent);

  if (validationError) {
    throw new Error(validationError);
  }

  const adminToken = getConvexAdminToken();

  if (!isConvexWriteConfigured() || !adminToken) {
    throw new Error("Convex FAQ CMS is not configured. Set NEXT_PUBLIC_CONVEX_URL and CONVEX_DEPLOY_KEY.");
  }

  const client = createConvexClient(adminToken);
  const previousVersion = await runConvexQuery<string | null>(client, "faqCms:getCurrentVersion", {});
  const nextVersion = crypto.randomUUID();

  for (const locale of FAQ_LOCALES) {
    const localeContent = preparedContent[locale];

    await runConvexMutation(client, "faqCms:insertLocaleSettings", {
      aboutBody: localeContent.aboutBody,
      aboutTitle: localeContent.aboutTitle,
      badgeLabel: localeContent.badgeLabel,
      closeLabel: localeContent.closeLabel,
      locale,
      noResults: localeContent.noResults,
      placeholder: localeContent.placeholder,
      readMoreLabel: localeContent.readMoreLabel,
      supportButtonLabel: localeContent.supportButtonLabel,
      tagsTitle: localeContent.tagsTitle,
      title: localeContent.title,
      version: nextVersion,
    });

    for (const [position, article] of localeContent.items.entries()) {
      await runConvexMutation(client, "faqCms:insertArticle", {
        authorName: article.authorName,
        excerpt: article.excerpt,
        heroImage: article.heroImage,
        id: article.id,
        legacySlugs: article.legacySlugs ?? [],
        locale,
        position,
        publishedAt: article.publishedAt,
        question: article.question,
        slug: article.slug,
        tags: article.tags,
        version: nextVersion,
      });

      const bodyChunks = splitFaqBodyIntoChunks(article.body);

      for (const [chunkIndex, chunk] of bodyChunks.entries()) {
        await runConvexMutation(client, "faqCms:insertArticleBodyChunk", {
          articleId: article.id,
          chunk,
          chunkIndex,
          locale,
          version: nextVersion,
        });
      }
    }
  }

  await runConvexMutation(client, "faqCms:activateVersion", {
    version: nextVersion,
  });

  if (previousVersion && previousVersion !== nextVersion) {
    await runConvexMutation(client, "faqCms:deleteVersion", {
      version: previousVersion,
    });
  }

  return preparedContent;
}

export async function uploadFaqImage(file: File) {
  const adminToken = getConvexAdminToken();

  if (!isConvexWriteConfigured() || !adminToken) {
    throw new Error("Convex FAQ uploads are not configured. Set NEXT_PUBLIC_CONVEX_URL and CONVEX_DEPLOY_KEY.");
  }

  const client = createConvexClient(adminToken);
  const uploadUrl = await runConvexMutation<string>(client, "faqCms:generateUploadUrl", {});
  const uploadResponse = await fetch(uploadUrl, {
    body: file,
    headers: file.type ? { "Content-Type": file.type } : undefined,
    method: "POST",
  });

  if (!uploadResponse.ok) {
    throw new Error("Image upload failed before the file reached Convex storage.");
  }

  const payload = (await uploadResponse.json()) as { storageId?: string };

  if (!payload.storageId) {
    throw new Error("Convex did not return a storage ID for the uploaded file.");
  }

  const assetUrl = await runConvexQuery<string | null>(client, "faqCms:getFileUrl", {
    storageId: payload.storageId,
  });

  if (!assetUrl) {
    throw new Error("The uploaded file was stored, but no public URL could be resolved.");
  }

  return assetUrl;
}
