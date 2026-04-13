import type { Metadata } from 'next';

import { useTranslations } from 'next-intl';

import MarketingPageShell from '@/components/MarketingPageShell';
import SuccessCard from '@/components/SuccessCard';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/contactus-thank-you',
    title: 'Contact Request Received',
    description: 'Confirmation page for Vesalius contact requests.',
    noindex: true,
  });
}

export default function ContactThankYouPage() {
  const t = useTranslations('SuccessPages.contact');

  return (
    <MarketingPageShell>
      <SuccessCard
        body={t('body')}
        primaryHref="/"
        primaryLabel={t('primaryAction')}
        secondaryHref="/contactus"
        secondaryLabel={t('secondaryAction')}
        title={t('title')}
      />
    </MarketingPageShell>
  );
}
