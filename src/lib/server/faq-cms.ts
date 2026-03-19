import 'server-only';

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { defaultFaqContent, normalizeFaqContent } from '@/lib/faq/content';
import type { FaqContentStore } from '@/lib/faq/types';

const faqContentDirectory = path.join(process.cwd(), 'src', 'data');
const faqContentFilePath = path.join(faqContentDirectory, 'faq-content.json');

export function getFaqContentFilePath() {
  return faqContentFilePath;
}

export async function readFaqContent(): Promise<FaqContentStore> {
  try {
    const content = await readFile(faqContentFilePath, 'utf8');
    return normalizeFaqContent(JSON.parse(content) as Record<string, unknown>);
  } catch (error) {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;
    if (code === 'ENOENT') {
      return defaultFaqContent;
    }

    console.error('Failed to read FAQ CMS content:', error);
    return defaultFaqContent;
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
