'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/** Specialties offered in the chooser. Only the TAILORED ones have their own content so far; the others see the standard site. */
export const SPECIALTY_IDS = [
  'orthopedics',
  'generalPractice',
  'ent',
  'neurosurgery',
  'bariatrics',
  'vascularSurgery',
  'neurology',
  'cardiology',
  'dermatology',
  'gynaecology',
  'paediatrics',
  'ophthalmology',
  'urology',
  'gastroenterology',
  'internalMedicine',
  'psychiatry',
  'mentalHealth',
  'physicalMedicine',
  'other',
] as const;
export type SpecialtyId = (typeof SPECIALTY_IDS)[number];

/** Specialties with their own homepage and demos. */
export const TAILORED = ['orthopedics', 'neurosurgery', 'ent', 'physicalMedicine', 'bariatrics', 'mentalHealth', 'vascularSurgery'] as const satisfies readonly SpecialtyId[];
export type TailoredId = (typeof TAILORED)[number];

const isTailored = (value: Specialty | null): value is TailoredId => TAILORED.includes(value as TailoredId);

/**
 * The visitor's specialty. `null` means they have not chosen yet (the prompt is shown);
 * `general` means they chose to browse the standard site.
 */
export type Specialty = SpecialtyId | 'general';

const isSpecialty = (value: unknown): value is Specialty => value === 'general' || SPECIALTY_IDS.includes(value as SpecialtyId);

const STORAGE_KEY = 'vesalius-specialty';

// Accepted in links from sales, in any site language: ?specialiteit=orthopedie, ?specialty=orthopedics, ?specialite=orthopedie
const URL_PARAMS = ['specialiteit', 'specialty', 'specialite', 'spécialité'];
const URL_VALUES: Record<string, Specialty> = {
  orthopedie: 'orthopedics',
  orthopédie: 'orthopedics',
  orthopedics: 'orthopedics',
  orthopaedics: 'orthopedics',
  neurochirurgie: 'neurosurgery',
  neurosurgery: 'neurosurgery',
  nko: 'ent',
  ent: 'ent',
  orl: 'ent',
  'fysische-geneeskunde': 'physicalMedicine',
  fysiater: 'physicalMedicine',
  'physical-medicine': 'physicalMedicine',
  'medecine-physique': 'physicalMedicine',
  'médecine-physique': 'physicalMedicine',
  bariatrie: 'bariatrics',
  bariatrics: 'bariatrics',
  'bariatric-surgery': 'bariatrics',
  'chirurgie-bariatrique': 'bariatrics',
  obesitas: 'bariatrics',
  vaatchirurgie: 'vascularSurgery',
  'vascular-surgery': 'vascularSurgery',
  'chirurgie-vasculaire': 'vascularSurgery',
  vasculaire: 'vascularSurgery',
  ggz: 'mentalHealth',
  'geestelijke-gezondheidszorg': 'mentalHealth',
  psychologie: 'mentalHealth',
  psycholoog: 'mentalHealth',
  psychology: 'mentalHealth',
  'mental-health': 'mentalHealth',
  'sante-mentale': 'mentalHealth',
  'santé-mentale': 'mentalHealth',
  psychologue: 'mentalHealth',
  algemeen: 'general',
  general: 'general',
};

interface SpecialtyContextValue {
  specialty: Specialty | null;
  /** True once the stored choice has been read, so the prompt never flashes for returning visitors. */
  ready: boolean;
  /** The variant with its own content, or null for the standard site. */
  tailored: TailoredId | null;
  isOrthopedics: boolean;
  setSpecialty: (value: Specialty) => void;
  /** The chooser panel in the navbar. */
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  /** Picks a specialty from the panel; one without tailored content yet shows a short notice first. */
  choose: (value: Specialty) => void;
  notice: SpecialtyId | null;
}

const SpecialtyContext = createContext<SpecialtyContextValue>({
  specialty: null,
  ready: false,
  tailored: null,
  isOrthopedics: false,
  setSpecialty: () => {},
  menuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  choose: () => {},
  notice: null,
});

const ASKED_KEY = 'vesalius-specialty-asked';

/** The panel opens by itself at most once per visit. */
export function askedThisVisit() {
  try {
    return window.sessionStorage.getItem(ASKED_KEY) === '1';
  } catch {
    return false;
  }
}

function readStored(): Specialty | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isSpecialty(value) ? value : null;
  } catch {
    return null;
  }
}

function readFromUrl(): Specialty | null {
  const params = new URLSearchParams(window.location.search);
  for (const key of URL_PARAMS) {
    const raw = params.get(key)?.trim();
    if (!raw) continue;
    if (URL_VALUES[raw.toLowerCase()]) return URL_VALUES[raw.toLowerCase()];
    if (isSpecialty(raw)) return raw;
  }
  return null;
}

export function SpecialtyProvider({ children }: { children: React.ReactNode }) {
  const [specialty, setSpecialtyState] = useState<Specialty | null>(null);
  const [ready, setReady] = useState(false);

  const setSpecialty = useCallback((value: Specialty) => {
    setSpecialtyState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private mode or blocked storage: the choice still applies for this visit.
    }
  }, []);

  useEffect(() => {
    // A link from sales wins over an earlier choice, and is remembered for the rest of the visit.
    const fromUrl = readFromUrl();
    const initial = fromUrl ?? readStored();
    if (fromUrl) {
      try {
        window.localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        // ignore
      }
    }
    // Reading browser-only state after mount keeps server and client markup identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpecialtyState(initial);
    setReady(true);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<SpecialtyId | null>(null);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setNotice(null);
    try {
      window.sessionStorage.setItem(ASKED_KEY, '1');
    } catch {
      // ignore
    }
  }, []);
  const choose = useCallback(
    (value: Specialty) => {
      setSpecialty(value);
      if (value === 'general' || isTailored(value)) closeMenu();
      else setNotice(value);
    },
    [setSpecialty, closeMenu],
  );

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(closeMenu, 4000);
    return () => clearTimeout(id);
  }, [notice, closeMenu]);

  return (
    <SpecialtyContext.Provider
      value={{
        specialty,
        ready,
        tailored: isTailored(specialty) ? specialty : null,
        isOrthopedics: specialty === 'orthopedics',
        setSpecialty,
        menuOpen,
        openMenu,
        closeMenu,
        choose,
        notice,
      }}
    >
      {children}
    </SpecialtyContext.Provider>
  );
}

export const useSpecialty = () => useContext(SpecialtyContext);
