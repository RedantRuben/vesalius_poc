'use client';

import { useTranslations } from 'next-intl';
import ErrorPage from '@/components/ErrorPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorPage.serverError');

  return (
    <ErrorPage
      code={t('code')}
      title={t('title')}
      subtitle={t('subtitle')}
      actionLabel={t('action')}
      onRetry={reset}
    />
  );
}

