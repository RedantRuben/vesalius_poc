import type { Metadata } from 'next';

import MarketingPageShell from '@/components/MarketingPageShell';
import SupportPageContent from '@/components/SupportPageContent';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/support',
    title: 'Support',
    description:
      'Contact Vesalius support to submit tickets, report issues, and get help with platform setup, access, billing, and product workflows.',
  });
}

export default function SupportPage() {
  return (
    <MarketingPageShell>
      <SupportPageContent />
    </MarketingPageShell>
  );
}
