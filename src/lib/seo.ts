import type { Metadata } from 'next';

import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://www.vesalius.ai';
export const DEFAULT_OG_IMAGE = '/logo.webp';

export type SiteLocale = (typeof routing.locales)[number];

export const SITE_NAME = 'Vesalius';
export const SITE_DESCRIPTION =
  'Vesalius is a healthcare AI platform for patient intake, ambient clinical notes, medication capture, triage, follow-up, and hospital workflow automation.';

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
}

export function resolveSiteLocale(locale: string): SiteLocale {
  if (routing.locales.includes(locale as SiteLocale)) {
    return locale as SiteLocale;
  }

  return routing.defaultLocale;
}

export function getLocalizedPath(locale: SiteLocale, pathname = '/') {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === '/') {
    return locale === routing.defaultLocale ? '/' : `/${locale}`;
  }

  return locale === routing.defaultLocale
    ? normalizedPathname
    : `/${locale}${normalizedPathname}`;
}

export function getAbsoluteUrl(locale: SiteLocale, pathname = '/') {
  return new URL(getLocalizedPath(locale, pathname), SITE_URL).toString();
}

export function getLanguageAlternates(pathname = '/') {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getAbsoluteUrl(locale, pathname)]),
  );
}

export function buildPageTitle(title: string) {
  return title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
  noindex = false,
  includeLanguageAlternates = true,
}: {
  locale: SiteLocale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
  noindex?: boolean;
  includeLanguageAlternates?: boolean;
}): Metadata {
  const canonical = getAbsoluteUrl(locale, pathname);
  const fullTitle = buildPageTitle(title);
  const robots = noindex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      };

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages: includeLanguageAlternates ? getLanguageAlternates(pathname) : undefined,
    },
    openGraph: {
      type: 'website',
      locale,
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots,
  };
}
