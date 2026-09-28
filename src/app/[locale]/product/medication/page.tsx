import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/medication',
    title: 'Medication Manager',
    description:
      'Extract medication names, dosage, frequency, and forms from photos, printed lists, or handwritten notes with Vesalius medication workflows.',
  });
}

export default function MedicationPage() {
  return <ModulePage slug="medication" />;
}
