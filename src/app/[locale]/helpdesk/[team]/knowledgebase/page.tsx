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
  params: Promise<{ locale: string; team: string }>;
}): Promise<Metadata> {
  const { locale, team } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: `/helpdesk/${team}/knowledgebase`,
    title: 'Knowledge Base',
    description:
      'Submit a support ticket and browse Vesalius help articles, setup guides, and product walkthroughs in one place.',
  });
}

export default async function HelpdeskKnowledgeBasePage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;
  const content = await readFaqContent();

  return (
    <MarketingPageShell>
      <SupportPageContent sourcePage={`/helpdesk/${team}/knowledgebase`} />
      <FaqPageClient contentByLocale={content} embedded />
    </MarketingPageShell>
  );
}
