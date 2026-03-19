import FaqPageClient from '@/components/faq/FaqPageClient';
import { readFaqContent } from '@/lib/server/faq-cms';

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const content = await readFaqContent();

  return <FaqPageClient contentByLocale={content} />;
}
