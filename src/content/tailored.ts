'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { withProfession } from '@/lib/profession';
import { useSpecialty } from '@/lib/specialty';
import { TAILORED_HOME } from './tailored-copy';
import type { SiteLocale, TailoredHomeCopy } from './orthopedics';

export { TAILORED_HOME };

/** The homepage copy for the visitor's specialty in the site language, or null on the standard site. */
export function useTailoredHome(): TailoredHomeCopy | null {
  const locale = useLocale() as SiteLocale;
  const { tailored } = useSpecialty();
  return useMemo(() => {
    if (!tailored) return null;
    const copy = TAILORED_HOME[tailored];
    return withProfession(copy[locale] ?? copy.en, tailored, locale, 'reader');
  }, [tailored, locale]);
}

/** Shared copy kept in a component (pricing, hero), in the words of the visitor's profession. */
export function useProfessionCopy<T>(copy: T, scope: 'any' | 'reader' = 'any'): T {
  const locale = useLocale() as SiteLocale;
  const { tailored } = useSpecialty();
  return withProfession(copy, tailored, locale, scope);
}
