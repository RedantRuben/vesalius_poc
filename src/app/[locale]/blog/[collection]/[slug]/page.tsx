import type { Metadata } from 'next';

import { notFound, redirect } from 'next/navigation';

import FaqArticlePage from '@/components/faq/FaqArticlePage';
import { findFaqArticleRouteMatch } from '@/lib/faq/content';
import {
  getFaqArticlePath,
  getFaqCollectionSegment,
  getLocalizedFaqPath,
  isFaqCollectionSegment,
} from '@/lib/faq/routes';
import { readFaqContent } from '@/lib/server/faq-cms';
import { FAQ_LOCALES, type FaqLocale } from '@/lib/faq/types';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; collection: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, collection, slug } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: `/blog/${collection}/${slug}`,
    title: 'Support Article',
    description: 'Support and configuration article for the Vesalius platform.',
    noindex: true,
    includeLanguageAlternates: false,
  });
}

export default async function FaqBlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; collection: string; slug: string }>;
}) {
  const { locale, collection, slug } = await params;

  if (!isFaqCollectionSegment(collection)) {
    notFound();
  }

  const resolvedLocale: FaqLocale = FAQ_LOCALES.includes(locale as FaqLocale)
    ? (locale as FaqLocale)
    : 'en';
  const content = await readFaqContent();
  const article = findFaqArticleRouteMatch(content, resolvedLocale, slug);

  if (!article) {
    notFound();
  }

  const canonicalCollection = getFaqCollectionSegment(resolvedLocale);
  const canonicalPath = getFaqArticlePath(resolvedLocale, article.slug);

  if (collection !== canonicalCollection || slug !== article.slug) {
    redirect(getLocalizedFaqPath(resolvedLocale, canonicalPath));
  }

  const readNext = content[resolvedLocale].items.find((item) => item.id !== article.id);

  return (
    <FaqArticlePage
      article={article}
      locale={resolvedLocale}
      localeContent={content[resolvedLocale]}
      readNext={readNext}
    />
  );
}
