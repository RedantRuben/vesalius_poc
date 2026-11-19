/** Homepage copy per discipline with its own content; plain data, so server code (metadata, llms.txt) can read it too. */

import { ANAESTHESIA_HOME } from './anaesthesia';
import { BARIATRIC_HOME } from './bariatrics';
import { ENT_HOME } from './ent';
import { DERMATOLOGY_HOME } from './dermatology';
import { MKA_HOME } from './maxillofacial-surgery';
import { MENTAL_HOME } from './mental-health';
import { VASCULAR_HOME } from './vascular-surgery';
import { OPHTHALMOLOGY_HOME } from './ophthalmology';
import { GYNAECOLOGY_HOME } from './gynaecology';
import { NEPHROLOGY_HOME } from './nephrology';
import { ENDOCRINOLOGY_HOME } from './endocrinology';
import { NEURO_HOME } from './neurosurgery';
import { CARDIOLOGY_HOME } from './cardiology';
import { NEUROLOGY_HOME } from './neurology';
import { PNEUMOLOGY_HOME } from './pneumology';
import { PAIN_CLINIC_HOME } from './pain-clinic';
import { RHEUMATOLOGY_HOME } from './rheumatology';
import { SPORTS_MEDICINE_HOME } from './sports-medicine';
import { KINESITHERAPY_HOME } from './physiotherapy';
import { GASTRO_HOME } from './gastroenterology';
import { GENERAL_SURGERY_HOME } from './general-surgery';
import { DIETETICS_HOME } from './dietetics';
import { UROLOGY_HOME } from './urology';
import { PODIATRY_HOME } from './podiatry';
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
  ophthalmology: OPHTHALMOLOGY_HOME,
  gynaecology: GYNAECOLOGY_HOME,
  nephrology: NEPHROLOGY_HOME,
  endocrinology: ENDOCRINOLOGY_HOME,
  maxillofacialSurgery: MKA_HOME,
  dermatology: DERMATOLOGY_HOME,
  anaesthesia: ANAESTHESIA_HOME,
  podiatry: PODIATRY_HOME,
  urology: UROLOGY_HOME,
  dietetics: DIETETICS_HOME,
  generalSurgery: GENERAL_SURGERY_HOME,
  gastroenterology: GASTRO_HOME,
  physiotherapy: KINESITHERAPY_HOME,
  sportsMedicine: SPORTS_MEDICINE_HOME,
  rheumatology: RHEUMATOLOGY_HOME,
  painClinic: PAIN_CLINIC_HOME,
  pneumology: PNEUMOLOGY_HOME,
  cardiology: CARDIOLOGY_HOME,
  neurology: NEUROLOGY_HOME,
};

