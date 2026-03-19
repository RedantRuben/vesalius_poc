import { useTranslations } from 'next-intl';

import MarketingPageShell from '@/components/MarketingPageShell';
import SuccessCard from '@/components/SuccessCard';

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
