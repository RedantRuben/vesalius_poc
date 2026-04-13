import type { Metadata } from 'next';

import MarketingPageShell from '@/components/MarketingPageShell';
import SupportPageContent from '@/components/SupportPageContent';
import FaqPageClient from '@/components/faq/FaqPageClient';
import { readFaqContent } from '@/lib/server/faq-cms';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/helpdesk/customer-care-1/knowledgebase',
    title: 'Knowledge Base',
    description:
      'Submit a support ticket and browse Vesalius help articles, setup guides, and product walkthroughs in one place.',
  });
}

export default async function KnowledgeBasePage() {
  const content = await readFaqContent();

  return (
    <MarketingPageShell>
      <SupportPageContent sourcePage="/helpdesk/customer-care-1/knowledgebase" />
      <FaqPageClient contentByLocale={content} embedded />
    </MarketingPageShell>
  );
}
