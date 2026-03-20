import { notFound } from 'next/navigation';

import FaqPageClient from '@/components/faq/FaqPageClient';
import { isFaqCollectionSegment } from '@/lib/faq/routes';
import { readFaqContent } from '@/lib/server/faq-cms';

export const dynamic = 'force-dynamic';

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
