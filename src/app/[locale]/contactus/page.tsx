import type { Metadata } from 'next';

import MarketingPageShell from '@/components/MarketingPageShell';
import Contact from '@/components/Contact';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/contactus',
    title: 'Contact',
    description:
      'Contact Vesalius to discuss healthcare AI workflows, hospital deployments, pricing, partnerships, or implementation questions.',
  });
}

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <div className="pb-6 md:pb-10">
        <Contact sourcePage="/contactus" />
      </div>
    </MarketingPageShell>
  );
}
