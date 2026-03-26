import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/seo';

const PUBLIC_PATHS = [
  '/',
  '/security',
  '/demo',
  '/contactus',
  '/support',
  '/cookie-policy',
  '/privacy-policy',
  '/terms-conditions',
  '/product/pre-consultation',
  '/product/scribe',
  '/product/document-generation',
  '/product/medication',
  '/product/smart-follow-up',
  '/product/smart-triage',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PUBLIC_PATHS.map((pathname) => ({
      url: getAbsoluteUrl(locale, pathname),
      alternates: {
        languages: getLanguageAlternates(pathname),
      },
    })),
  );
}
