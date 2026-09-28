import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/pre-consultation',
    title: 'Automated Patient Intake',
    description:
      'Automate patient intake before appointments with multilingual symptom collection, structured summaries, and workflow-ready outputs for hospitals and care teams.',
  });
}

export default function PreConsultationPage() {
  return <ModulePage slug="pre-consultation" />;
}
