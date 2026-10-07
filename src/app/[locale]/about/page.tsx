import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import AboutContent from '@/components/about/AboutContent';
import SeoJsonLd from '@/components/SeoJsonLd';
import { ABOUT } from '@/content/about';
import { buildPageMetadata, getAbsoluteUrl, resolveSiteLocale, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());
  const copy = ABOUT[locale];

  return buildPageMetadata({
    locale,
    pathname: '/about',
    title: copy.meta.title,
    description: copy.meta.description,
  });
}

export default async function AboutPage() {
  const locale = resolveSiteLocale(await getLocale());

  // Only registry facts (KBO): legal name, address, founding date and directors.
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vesalius',
    legalName: 'Vesalius Health BV',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    foundingDate: '2024-07-03',
    email: 'help@vesalius.health',
    telephone: '+32 9 496 14 78',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ottergemsesteenweg-Zuid 808B',
      postalCode: '9000',
      addressLocality: 'Gent',
      addressCountry: 'BE',
    },
    founder: [
      { '@type': 'Person', name: 'Sander Goossens' },
      { '@type': 'Person', name: 'Hans Peerlinck' },
      { '@type': 'Person', name: 'Philippe Van Overschelde' },
    ],
    sameAs: ['https://www.linkedin.com/company/vesaliushealth'],
  };
  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: getAbsoluteUrl(locale, '/about'),
    name: ABOUT[locale].meta.title,
    about: { '@type': 'Organization', name: 'Vesalius' },
  };

  return (
    <>
      <SeoJsonLd data={[organization, aboutPage]} />
      <AboutContent />
    </>
  );
}
