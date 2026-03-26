import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import FaqPageClient from '@/components/faq/FaqPageClient';
import { isFaqCollectionSegment } from '@/lib/faq/routes';
import { readFaqContent } from '@/lib/server/faq-cms';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; collection: string }>;
}): Promise<Metadata> {
  const { locale, collection } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: `/blog/${collection}`,
    title: 'Support Articles',
    description: 'Support and configuration articles for the Vesalius platform.',
    noindex: true,
    includeLanguageAlternates: false,
  });
}

export default async function FaqBlogPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;

  if (!isFaqCollectionSegment(collection)) {
    notFound();
  }

  const content = await readFaqContent();

  return <FaqPageClient contentByLocale={content} />;
}
