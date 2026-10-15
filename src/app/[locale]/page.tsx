import type { Metadata } from 'next';

import HomePage from '@/components/HomePage';
import { buildPageMetadata, resolveSiteLocale, SITE_DESCRIPTION } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = resolveSiteLocale(locale);

  return buildPageMetadata({
    locale: resolvedLocale,
    pathname: '/',
    title: 'Healthcare AI Platform for Patient Intake and Clinical Workflows',
    description: SITE_DESCRIPTION,
    keywords: [
      'Vesalius',
      'healthcare AI platform',
      'patient intake automation',
      'ambient clinical scribe',
      'clinical documentation',
      'hospital workflow automation',
    ],
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomePage locale={resolveSiteLocale(locale)} />;
}
