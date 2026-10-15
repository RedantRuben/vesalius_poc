import type { Metadata } from 'next';

import { SPECIALTY_UI } from '@/content/orthopedics';
import { TAILORED_HOME } from '@/content/tailored-copy';
import { DISCIPLINE_PAGES, disciplinePath, type TailoredId } from '@/lib/disciplines';
import type { ModuleKey } from '@/lib/modules';
import { routing } from '@/i18n/routing';
import { buildPageMetadata, getAbsoluteUrl, type SiteLocale } from '@/lib/seo';

/** The same discipline page in every language, each with its own slug (for hreflang and the sitemap). */
export function disciplineLanguages(id: TailoredId, rest = '') {
  return Object.fromEntries(routing.locales.map((locale) => [locale, getAbsoluteUrl(locale, disciplinePath(id, locale, rest))]));
}

/** "Wees opnieuw orthopedist." followed by the timeline's one-line story: specific, in the page's own language. */
export function disciplineDescription(id: TailoredId, locale: SiteLocale) {
  const copy = TAILORED_HOME[id][locale];
  return `${copy.hero.line1} ${copy.hero.line2} ${copy.journey.subtitle}`;
}

export const disciplineLabel = (id: TailoredId, locale: SiteLocale) => SPECIALTY_UI[locale].specialties[id];

export function disciplineHomeMetadata(id: TailoredId, locale: SiteLocale): Metadata {
  return buildPageMetadata({
    locale,
    pathname: disciplinePath(id, locale),
    title: DISCIPLINE_PAGES[id][locale].title,
    description: disciplineDescription(id, locale),
    keywords: ['Vesalius', disciplineLabel(id, locale), DISCIPLINE_PAGES[id][locale].title],
    languages: disciplineLanguages(id),
  });
}

export function disciplineModuleMetadata(id: TailoredId, locale: SiteLocale, key: ModuleKey, slug: string, moduleTitle: string): Metadata {
  const rest = `/product/${slug}`;
  return buildPageMetadata({
    locale,
    pathname: disciplinePath(id, locale, rest),
    title: `${moduleTitle} · ${disciplineLabel(id, locale)}`,
    description: TAILORED_HOME[id][locale].modules.cards[key],
    keywords: ['Vesalius', moduleTitle, disciplineLabel(id, locale)],
    languages: disciplineLanguages(id, rest),
  });
}

/** JSON-LD for a discipline page: what it is about and who it is for, so search engines and AI assistants can place it. */
export function disciplineSchema(id: TailoredId, locale: SiteLocale, rest = '', name = DISCIPLINE_PAGES[id][locale].title, description = disciplineDescription(id, locale)) {
  return {
    '@type': 'WebPage',
    name,
    description,
    url: getAbsoluteUrl(locale, disciplinePath(id, locale, rest)),
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', name: 'Vesalius', url: getAbsoluteUrl(locale, '/') },
    about: { '@type': 'SoftwareApplication', name: 'Vesalius', applicationCategory: 'HealthApplication' },
    audience: { '@type': 'MedicalAudience', audienceType: disciplineLabel(id, locale) },
  };
}
