import { useTranslations } from 'next-intl';

import MarketingPageShell from '@/components/MarketingPageShell';
import SuccessCard from '@/components/SuccessCard';

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
