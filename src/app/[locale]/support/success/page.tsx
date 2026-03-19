import { useTranslations } from 'next-intl';

import MarketingPageShell from '@/components/MarketingPageShell';
import SuccessCard from '@/components/SuccessCard';

export default function SupportSuccessPage() {
  const t = useTranslations('SuccessPages.support');

  return (
    <MarketingPageShell>
      <SuccessCard
        body={t('body')}
        primaryHref="/"
        primaryLabel={t('primaryAction')}
        secondaryHref="/support"
        secondaryLabel={t('secondaryAction')}
        title={t('title')}
      />
    </MarketingPageShell>
  );
}
