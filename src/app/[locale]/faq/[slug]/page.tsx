import { notFound } from 'next/navigation';

import FaqArticlePage from '@/components/faq/FaqArticlePage';
import { findFaqArticleBySlug } from '@/lib/faq/content';
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
  const article = findFaqArticleBySlug(content, resolvedLocale, slug);

  if (!article) {
    notFound();
  }

  const readNext = content[resolvedLocale].items.find((item) => item.id !== article.id);

  return (
    <FaqArticlePage
      article={article}
      localeContent={content[resolvedLocale]}
      readNext={readNext}
    />
  );
}
