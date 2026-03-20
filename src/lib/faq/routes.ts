import type { FaqLocale } from '@/lib/faq/types';

const FAQ_COLLECTION_BY_LOCALE: Record<FaqLocale, string> = {
  en: 'faqs-2',
  nl: 'faq-2',
  fr: 'faq-2',
};

const FAQ_COLLECTION_ALIASES = new Set(['faq-2', 'faqs-2']);

export function isFaqCollectionSegment(value: string) {
  return FAQ_COLLECTION_ALIASES.has(value);
}

export function getFaqCollectionSegment(locale: FaqLocale) {
  return FAQ_COLLECTION_BY_LOCALE[locale];
}

export function getFaqIndexPath(locale: FaqLocale) {
  return `/blog/${getFaqCollectionSegment(locale)}`;
}

export function getFaqArticlePath(locale: FaqLocale, slug: string) {
  return `${getFaqIndexPath(locale)}/${slug}`;
}

export function getLocalizedFaqPath(locale: FaqLocale, pathname: string) {
  return locale === 'en' ? pathname : `/${locale}${pathname}`;
}
