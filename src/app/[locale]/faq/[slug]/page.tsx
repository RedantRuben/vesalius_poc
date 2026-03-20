import { notFound, redirect } from 'next/navigation';

import { findFaqArticleRouteMatch } from '@/lib/faq/content';
import { getFaqArticlePath, getLocalizedFaqPath } from '@/lib/faq/routes';
import { readFaqContent } from '@/lib/server/faq-cms';
import { FAQ_LOCALES, type FaqLocale } from '@/lib/faq/types';

export const dynamic = 'force-dynamic';

export default async function FaqArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await readFaqContent();
  const resolvedLocale: FaqLocale = FAQ_LOCALES.includes(locale as FaqLocale)
    ? (locale as FaqLocale)
    : 'en';
  const article = findFaqArticleRouteMatch(content, resolvedLocale, slug);

  if (!article) {
    notFound();
  }

  redirect(getLocalizedFaqPath(resolvedLocale, getFaqArticlePath(resolvedLocale, article.slug)));
}
