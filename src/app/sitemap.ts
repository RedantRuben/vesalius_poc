import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { disciplineLanguages } from '@/lib/discipline-seo';
import { TAILORED, disciplinePath } from '@/lib/disciplines';
import { MODULES } from '@/lib/modules';
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
  '/product/agenda',
  '/product/voice-reception',
  '/about',
] as const;

/** Each discipline's homepage and its module pages, with the slug of each language. */
const DISCIPLINE_RESTS = ['', ...MODULES.map((entry) => `/product/${entry.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const standard = routing.locales.flatMap((locale) =>
    PUBLIC_PATHS.map((pathname) => ({
      url: getAbsoluteUrl(locale, pathname),
      alternates: {
        languages: getLanguageAlternates(pathname),
      },
    })),
  );
  const disciplines = routing.locales.flatMap((locale) =>
    TAILORED.flatMap((id) =>
      DISCIPLINE_RESTS.map((rest) => ({
        url: getAbsoluteUrl(locale, disciplinePath(id, locale, rest)),
        alternates: { languages: disciplineLanguages(id, rest) },
      })),
    ),
  );
  return [...standard, ...disciplines];
}
