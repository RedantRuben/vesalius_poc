import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import FaqPageClient from '@/components/faq/FaqPageClient';
import { isFaqCollectionSegment } from '@/lib/faq/routes';
import { readFaqContent } from '@/lib/server/faq-cms';
import { FAQ_LOCALES, type FaqLocale } from '@/lib/faq/types';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function normalizeTagSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-')
    .replace(/-\d+$/, '')
    .replace(/^-+|-+$/g, '');
}

function getTagPageSubtitle(locale: FaqLocale, tag: string) {
  if (locale === 'fr') {
    return `Articles d'aide etiquetes ${tag}.`;
  }

  if (locale === 'nl') {
    return `Helpartikels met de tag ${tag}.`;
  }

  return `Support articles tagged ${tag}.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; collection: string; tag: string }>;
}): Promise<Metadata> {
  const { locale, collection, tag } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: `/blog/${collection}/tag/${tag}`,
    title: 'Support Articles',
    description: 'Tagged support and configuration articles for the Vesalius platform.',
    noindex: true,
    includeLanguageAlternates: false,
  });
}

export default async function FaqBlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; collection: string; tag: string }>;
}) {
  const { locale, collection, tag } = await params;

  if (!isFaqCollectionSegment(collection)) {
    notFound();
  }

  const resolvedLocale: FaqLocale = FAQ_LOCALES.includes(locale as FaqLocale)
    ? (locale as FaqLocale)
    : 'en';
  const content = await readFaqContent();
  const localizedTags = Array.from(new Set(content[resolvedLocale].items.flatMap((item) => item.tags)));
  const resolvedTag = localizedTags.find((item) => normalizeTagSlug(item) === normalizeTagSlug(tag));

  if (!resolvedTag) {
    notFound();
  }

  return (
    <FaqPageClient
      contentByLocale={content}
      heroTitle={resolvedTag}
      heroSubtitle={getTagPageSubtitle(resolvedLocale, resolvedTag)}
      lockedTag={resolvedTag}
    />
  );
}
