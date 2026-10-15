'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  CHOICE_COOKIE,
  SPECIALTY_IDS,
  SPECIALTY_URL_PARAMS as URL_PARAMS,
  SPECIALTY_URL_VALUES as URL_VALUES,
  TAILORED,
  disciplinePath,
  hasDisciplineVersion,
  isTailoredId,
  parseDisciplinePath,
  type SiteLocale,
  type SpecialtyId,
  type TailoredId,
} from '@/lib/disciplines';

export { SPECIALTY_IDS, TAILORED, type SpecialtyId, type TailoredId };

/**
 * The visitor's specialty. `null` means they have not chosen yet (the prompt is shown);
 * `general` means they chose to browse the standard site.
 */
export type Specialty = SpecialtyId | 'general';

const isSpecialty = (value: unknown): value is Specialty => value === 'general' || SPECIALTY_IDS.includes(value as SpecialtyId);

const STORAGE_KEY = 'vesalius-specialty';

interface SpecialtyContextValue {
  specialty: Specialty | null;
  /** True once the stored choice has been read, so the prompt never flashes for returning visitors. */
  ready: boolean;
  /** The discipline of the current URL (its own content), or null on the standard pages. */
  tailored: TailoredId | null;
  isOrthopedics: boolean;
  setSpecialty: (value: Specialty) => void;
  /** Turns a homepage or module path into the visitor's discipline version: "/product/scribe" → "/orthopaedics/product/scribe". */
  href: (path: string) => string;
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
  href: (path) => path,
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

/** The current query string and hash, without the old specialty parameters. */
function keptQueryAndHash() {
  // Kept as written, so a flag such as ?demo-nudge stays without an "=" added
  const kept = window.location.search
    .slice(1)
    .split('&')
    .filter((part) => part && !URL_PARAMS.includes(decodeURIComponent(part.split('=')[0])));
  return `${kept.length ? `?${kept.join('&')}` : ''}${window.location.hash}`;
}

export function SpecialtyProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as SiteLocale;
  const pathname = usePathname();
  const router = useRouter();
  // The URL decides the content, so the server already renders the discipline's page for search engines.
  const route = useMemo(() => parseDisciplinePath(locale, pathname), [locale, pathname]);
  const [stored, setStored] = useState<Specialty | null>(null);
  const [ready, setReady] = useState(false);

  const setSpecialty = useCallback((value: Specialty) => {
    setStored(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Private mode or blocked storage: the choice still applies for this visit.
    }
    // The same choice for the server, which then opens the discipline's URL straight away on the next visit
    document.cookie = `${CHOICE_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  // The same page for another choice: a discipline's version of the homepage or module, or the standard one.
  const pathFor = useCallback(
    (value: Specialty | null, path: string) => {
      const generic = route ? route.rest || '/' : path;
      return isTailoredId(value) ? disciplinePath(value, locale, generic) : generic;
    },
    [route, locale],
  );

  useEffect(() => {
    // A link from sales wins over an earlier choice; a discipline URL is remembered as the choice.
    const fromUrl = readFromUrl();
    const initial = fromUrl ?? route?.id ?? readStored();
    if (initial) setSpecialty(initial);
    setReady(true);
    // Reading browser-only state after mount keeps server and client markup identical.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Old ?specialiteit= links and a remembered discipline lead to the discipline's own URL.
  useEffect(() => {
    if (!ready) return;
    const fromUrl = readFromUrl();
    const want = fromUrl ?? (route ? null : stored);
    const generic = route ? route.rest || '/' : pathname;
    if (!want || !hasDisciplineVersion(generic)) return;
    const target = pathFor(want, generic);
    if (target !== pathname || fromUrl) router.replace(`${target}${keptQueryAndHash()}`, { scroll: false });
  }, [ready, pathname, route, stored, pathFor, router]);

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
      // On the homepage and module pages, the choice opens that discipline's version of the same page.
      const generic = route ? route.rest || '/' : pathname;
      if (hasDisciplineVersion(generic)) {
        const target = pathFor(value, generic);
        if (target !== pathname) router.push(target, { scroll: false });
      }
      if (value === 'general' || isTailoredId(value)) closeMenu();
      else setNotice(value);
    },
    [setSpecialty, closeMenu, route, pathname, pathFor, router],
  );

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(closeMenu, 4000);
    return () => clearTimeout(id);
  }, [notice, closeMenu]);

  const specialty = route?.id ?? stored;
  const preferred = route?.id ?? (isTailoredId(stored) ? stored : null);
  const href = useCallback((path: string) => (preferred && hasDisciplineVersion(path) ? disciplinePath(preferred, locale, path) : path), [preferred, locale]);

  return (
    <SpecialtyContext.Provider
      value={{
        specialty,
        ready,
        tailored: route?.id ?? null,
        isOrthopedics: route?.id === 'orthopedics',
        setSpecialty,
        href,
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
