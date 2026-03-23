import 'server-only';

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { defaultFaqContent, normalizeFaqContent } from '@/lib/faq/content';
import type { FaqContentStore } from '@/lib/faq/types';

const faqContentDirectory = path.join(process.cwd(), 'src', 'data');
const faqContentFilePath = path.join(faqContentDirectory, 'faq-content.json');

function getFaqAssetBaseUrl() {
  const value = process.env.ODOO_BASE_URL?.trim();
  return value && value.length > 0 ? value.replace(/\/$/, '') : 'https://vesalius.odoo.com';
}

function rewriteFaqAssetUrls(value: string) {
  const assetBaseUrl = getFaqAssetBaseUrl();

  return value
    .replaceAll('https://www.vesalius.ai/web/image', `${assetBaseUrl}/web/image`)
    .replaceAll('https://vesalius.ai/web/image', `${assetBaseUrl}/web/image`)
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

export function getFaqContentFilePath() {
  return faqContentFilePath;
}

export async function readFaqContent(): Promise<FaqContentStore> {
  try {
    const content = await readFile(faqContentFilePath, 'utf8');
    return resolveFaqAssetUrls(normalizeFaqContent(JSON.parse(content) as Record<string, unknown>));
  } catch (error) {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;
    if (code === 'ENOENT') {
      return resolveFaqAssetUrls(defaultFaqContent);
    }

    console.error('Failed to read FAQ CMS content:', error);
    return resolveFaqAssetUrls(defaultFaqContent);
  }
}

export async function writeFaqContent(content: Record<string, unknown>) {
  const normalized = normalizeFaqContent(content);
  const serialized = `${JSON.stringify(normalized, null, 2)}\n`;
  const temporaryPath = `${faqContentFilePath}.tmp`;

  await mkdir(faqContentDirectory, { recursive: true });
  await writeFile(temporaryPath, serialized, 'utf8');
  await rename(temporaryPath, faqContentFilePath);

  return normalized;
}
