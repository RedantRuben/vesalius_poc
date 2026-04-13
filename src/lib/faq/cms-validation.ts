import { normalizeFaqContent } from "@/lib/faq/content";
import { sanitizeRichTextHtml, stripHtml } from "@/lib/faq/html";
import { FAQ_LOCALES, type FaqArticle, type FaqContentStore } from "@/lib/faq/types";

const MAX_AUTHOR_NAME_LENGTH = 80;
const MAX_PAGE_TITLE_LENGTH = 120;
const MAX_QUESTION_LENGTH = 160;
const MAX_SLUG_LENGTH = 120;
const MAX_TAG_LENGTH = 40;
const MAX_TAGS_PER_ARTICLE = 12;

function truncate(value: string, maxLength: number) {
  return value.slice(0, maxLength).trim();
}

export function slugifyFaqValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[-\s]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH);
}

function getDefaultPublishedAt() {
  return new Date().toLocaleDateString("en-GB");
}

function prepareArticle(article: FaqArticle, index: number): FaqArticle {
  const question = truncate(article.question.trim(), MAX_QUESTION_LENGTH);
  const slug = slugifyFaqValue(article.slug) || slugifyFaqValue(question) || `faq-article-${index + 1}`;
  const tags = Array.from(
    new Set(
      article.tags
        .map((tag) => truncate(tag.trim(), MAX_TAG_LENGTH))
        .filter(Boolean),
    ),
  ).slice(0, MAX_TAGS_PER_ARTICLE);

  return {
    ...article,
    authorName: truncate(article.authorName.trim(), MAX_AUTHOR_NAME_LENGTH) || "Vesalius Team",
    body: sanitizeRichTextHtml(article.body).trim(),
    heroImage: article.heroImage?.src
      ? {
          alt: article.heroImage.alt.trim() || question,
          caption: article.heroImage.caption?.trim() || "",
          src: article.heroImage.src.trim(),
        }
      : undefined,
    legacySlugs: Array.from(
      new Set(
        (article.legacySlugs ?? [])
          .map((legacySlug) => slugifyFaqValue(legacySlug))
          .filter(Boolean),
      ),
    ),
    publishedAt: article.publishedAt.trim() || getDefaultPublishedAt(),
    question,
    slug,
    tags,
  };
}

export function prepareFaqContentForSave(content: Record<string, unknown> | FaqContentStore) {
  const normalized = normalizeFaqContent(content);

  const prepared: FaqContentStore = {
    en: {
      ...normalized.en,
      title: truncate(normalized.en.title.trim(), MAX_PAGE_TITLE_LENGTH),
      items: normalized.en.items.map(prepareArticle),
    },
    nl: {
      ...normalized.nl,
      title: truncate(normalized.nl.title.trim(), MAX_PAGE_TITLE_LENGTH),
      items: normalized.nl.items.map(prepareArticle),
    },
    fr: {
      ...normalized.fr,
      title: truncate(normalized.fr.title.trim(), MAX_PAGE_TITLE_LENGTH),
      items: normalized.fr.items.map(prepareArticle),
    },
  };

  return normalizeFaqContent(prepared);
}

export function validateFaqContentForSave(content: FaqContentStore) {
  for (const locale of FAQ_LOCALES) {
    const localeContent = content[locale];
    const seenSlugs = new Set<string>();

    for (const article of localeContent.items) {
      if (!article.question.trim()) {
        return `Every ${locale.toUpperCase()} article needs a title.`;
      }

      if (!article.slug.trim()) {
        return `The article "${article.question}" needs a slug.`;
      }

      if (seenSlugs.has(article.slug)) {
        return `The slug "${article.slug}" is duplicated in ${locale.toUpperCase()}.`;
      }

      if (!stripHtml(article.body)) {
        return `The article "${article.question}" needs body content.`;
      }

      if (!article.heroImage?.src?.trim()) {
        return `The article "${article.question}" needs a hero image.`;
      }

      seenSlugs.add(article.slug);
    }
  }

  return null;
}
