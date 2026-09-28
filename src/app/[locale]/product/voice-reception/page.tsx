import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/voice-reception',
    title: 'AI Phone Assistant & Triage',
    description:
      'An AI phone assistant that answers patient calls, asks the right questions to assess urgency, and guides them to the correct care or books an appointment directly in your agenda.',
  });
}

export default function VoiceReceptionPage() {
  return <ModulePage slug="voice-reception" />;
}
