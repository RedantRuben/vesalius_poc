import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/scribe',
    title: 'Ambient Clinical Scribe',
    description:
      'Capture consultations with an ambient clinical scribe that separates speakers and turns conversations into secure, structured clinical notes.',
  });
}

export default function ScribePage() {
  return <ModulePage slug="scribe" />;
}
