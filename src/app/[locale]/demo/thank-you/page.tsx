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
    pathname: '/demo/thank-you',
    title: 'Demo Request Received',
    description: 'Confirmation page for Vesalius demo requests.',
    noindex: true,
  });
}

export default function DemoThankYouPage() {
  const t = useTranslations('SuccessPages.demo');

  return (
    <MarketingPageShell>
      <SuccessCard
        body={t('body')}
        primaryHref="/"
        primaryLabel={t('primaryAction')}
        secondaryHref="/demo"
        secondaryLabel={t('secondaryAction')}
        title={t('title')}
      />
    </MarketingPageShell>
  );
}
