import type { Metadata } from 'next';

import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/linkedin-company-banner',
    title: 'LinkedIn Company Banner',
    description: 'Internal Vesalius LinkedIn company banner export page.',
    noindex: true,
  });
}

export default function LinkedinCompanyBannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
