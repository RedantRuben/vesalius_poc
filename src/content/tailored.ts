'use client';

import { useLocale } from 'next-intl';
import { useSpecialty } from '@/lib/specialty';
import { TAILORED_HOME } from './tailored-copy';
import type { SiteLocale, TailoredHomeCopy } from './orthopedics';

export { TAILORED_HOME };

/** The homepage copy for the visitor's specialty in the site language, or null on the standard site. */
export function useTailoredHome(): TailoredHomeCopy | null {
  const locale = useLocale() as SiteLocale;
  const { tailored } = useSpecialty();
  if (!tailored) return null;
  const copy = TAILORED_HOME[tailored];
  return copy[locale] ?? copy.en;
}
