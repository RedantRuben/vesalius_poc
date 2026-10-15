'use client';

import { useLocale } from 'next-intl';
import { useSpecialty, type TailoredId } from '@/lib/specialty';
import { BARIATRIC_HOME } from './bariatrics';
import { ENT_HOME } from './ent';
import { MENTAL_HOME } from './mental-health';
import { VASCULAR_HOME } from './vascular-surgery';
import { NEURO_HOME } from './neurosurgery';
import { PHYSIO_HOME } from './physical-medicine';
import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

/** Homepage copy per specialty with its own content. */
export const TAILORED_HOME: Record<TailoredId, Record<SiteLocale, TailoredHomeCopy>> = {
  orthopedics: ORTHO_HOME,
  neurosurgery: NEURO_HOME,
  ent: ENT_HOME,
  physicalMedicine: PHYSIO_HOME,
  bariatrics: BARIATRIC_HOME,
  mentalHealth: MENTAL_HOME,
  vascularSurgery: VASCULAR_HOME,
};

/** The homepage copy for the visitor's specialty in the site language, or null on the standard site. */
export function useTailoredHome(): TailoredHomeCopy | null {
  const locale = useLocale() as SiteLocale;
  const { tailored } = useSpecialty();
  if (!tailored) return null;
  const copy = TAILORED_HOME[tailored];
  return copy[locale] ?? copy.en;
}
