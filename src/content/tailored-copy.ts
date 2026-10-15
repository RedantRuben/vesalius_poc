/** Homepage copy per discipline with its own content; plain data, so server code (metadata, llms.txt) can read it too. */

import { BARIATRIC_HOME } from './bariatrics';
import { ENT_HOME } from './ent';
import { MENTAL_HOME } from './mental-health';
import { VASCULAR_HOME } from './vascular-surgery';
import { NEURO_HOME } from './neurosurgery';
import { PHYSIO_HOME } from './physical-medicine';
import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';
import type { TailoredId } from '@/lib/disciplines';

export const TAILORED_HOME: Record<TailoredId, Record<SiteLocale, TailoredHomeCopy>> = {
  orthopedics: ORTHO_HOME,
  neurosurgery: NEURO_HOME,
  ent: ENT_HOME,
  physicalMedicine: PHYSIO_HOME,
  bariatrics: BARIATRIC_HOME,
  mentalHealth: MENTAL_HOME,
  vascularSurgery: VASCULAR_HOME,
};

