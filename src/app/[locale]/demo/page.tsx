import type { Metadata } from 'next';

import MarketingPageShell from '@/components/MarketingPageShell';
import DemoPageContent from '@/components/DemoPageContent';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/demo',
    title: 'Request a Demo',
    description:
      'Request a Vesalius demo to explore patient intake, ambient clinical notes, triage, medication capture, and follow-up workflows for hospitals and care teams.',
  });
}

export default function DemoPage() {
  return (
    <MarketingPageShell>
      <DemoPageContent />
    </MarketingPageShell>
  );
}
