/**
 * Disciplines and their public URLs. Every discipline with its own content has a localised path segment, so search
 * engines and AI assistants find a real page per discipline (/nl/orthopedie, /orthopaedics, /fr/orthopedie), and the
 * module pages live under it (/nl/orthopedie/product/scribe). Kept free of React so server code (routes, metadata,
 * sitemap, llms.txt) and the browser share one source.
 */

export type SiteLocale = 'en' | 'nl' | 'fr';

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

/** Cookie holding the visitor's choice, read by the middleware to open their discipline's URL. */
export const CHOICE_COOKIE = 'vesalius-specialty';

// Older links from sales, in any site language: ?specialiteit=orthopedie, ?specialty=orthopedics, ?specialite=orthopedie.
// They now lead to the discipline's own URL.
export const SPECIALTY_URL_PARAMS = ['specialiteit', 'specialty', 'specialite', 'spécialité'];
export const SPECIALTY_URL_VALUES: Record<string, SpecialtyId | 'general'> = {
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

/** Specialties with their own homepage and demos. */
export const TAILORED = ['orthopedics', 'neurosurgery', 'ent', 'physicalMedicine', 'bariatrics', 'mentalHealth', 'vascularSurgery'] as const satisfies readonly SpecialtyId[];
export type TailoredId = (typeof TAILORED)[number];

export const isTailoredId = (value: unknown): value is TailoredId => TAILORED.includes(value as TailoredId);

/**
 * Per discipline and language: the URL segment and the page title. Slugs are the words people search for in that
 * language; changing one later breaks indexed links, so add a redirect when you do.
 */
export const DISCIPLINE_PAGES: Record<TailoredId, Record<SiteLocale, { slug: string; title: string }>> = {
  orthopedics: {
    nl: { slug: 'orthopedie', title: 'AI-assistent voor orthopedisten' },
    en: { slug: 'orthopaedics', title: 'AI assistant for orthopaedic surgeons' },
    fr: { slug: 'orthopedie', title: 'Assistant IA pour chirurgiens orthopédistes' },
  },
  neurosurgery: {
    nl: { slug: 'neurochirurgie', title: 'AI-assistent voor neurochirurgen' },
    en: { slug: 'neurosurgery', title: 'AI assistant for neurosurgeons' },
    fr: { slug: 'neurochirurgie', title: 'Assistant IA pour neurochirurgiens' },
  },
  ent: {
    nl: { slug: 'nko', title: 'AI-assistent voor NKO-artsen' },
    en: { slug: 'ent', title: 'AI assistant for ENT surgeons' },
    fr: { slug: 'orl', title: 'Assistant IA pour médecins ORL' },
  },
  physicalMedicine: {
    nl: { slug: 'fysische-geneeskunde', title: 'AI-assistent voor fysische geneeskunde' },
    en: { slug: 'physical-medicine', title: 'AI assistant for physical and rehabilitation medicine' },
    fr: { slug: 'medecine-physique', title: 'Assistant IA pour la médecine physique et réadaptation' },
  },
  bariatrics: {
    nl: { slug: 'bariatrie', title: 'AI-assistent voor bariatrische chirurgie' },
    en: { slug: 'bariatric-surgery', title: 'AI assistant for bariatric surgery teams' },
    fr: { slug: 'chirurgie-bariatrique', title: 'Assistant IA pour la chirurgie bariatrique' },
  },
  mentalHealth: {
    nl: { slug: 'geestelijke-gezondheidszorg', title: 'AI-assistent voor psychologen' },
    en: { slug: 'mental-health', title: 'AI assistant for psychologists' },
    fr: { slug: 'sante-mentale', title: 'Assistant IA pour psychologues' },
  },
  vascularSurgery: {
    nl: { slug: 'vaatchirurgie', title: 'AI-assistent voor vaatchirurgen' },
    en: { slug: 'vascular-surgery', title: 'AI assistant for vascular surgeons' },
    fr: { slug: 'chirurgie-vasculaire', title: 'Assistant IA pour chirurgiens vasculaires' },
  },
};

export const disciplineSlug = (id: TailoredId, locale: SiteLocale) => DISCIPLINE_PAGES[id][locale].slug;

/** The discipline whose slug is `slug` in `locale`, or null. */
export function disciplineFromSlug(locale: SiteLocale, slug: string): TailoredId | null {
  return TAILORED.find((id) => DISCIPLINE_PAGES[id][locale].slug === slug) ?? null;
}

/** A slug used in another language (e.g. /fr/nko after switching language): which discipline it means. */
export function disciplineFromAnySlug(slug: string): TailoredId | null {
  return TAILORED.find((id) => Object.values(DISCIPLINE_PAGES[id]).some((page) => page.slug === slug)) ?? null;
}

/** Locale-less path (as next-intl's Link and usePathname use it) for a discipline, optionally with a sub-path. */
export function disciplinePath(id: TailoredId, locale: SiteLocale, rest = '') {
  // "/" and "/#pricing" belong to the discipline's homepage itself: "/orthopaedics", "/orthopaedics#pricing"
  const tail = rest === '/' ? '' : rest.startsWith('/#') ? rest.slice(1) : rest;
  return `/${disciplineSlug(id, locale)}${tail}`;
}

/** Splits a locale-less pathname into its discipline and the rest: "/orthopaedics/product/scribe" → orthopedics, "/product/scribe". */
export function parseDisciplinePath(locale: SiteLocale, pathname: string): { id: TailoredId; rest: string } | null {
  const [, first = '', ...more] = pathname.split('/');
  const id = disciplineFromSlug(locale, first);
  return id ? { id, rest: more.length ? `/${more.join('/')}` : '' } : null;
}

/** Pages that have a discipline version: the homepage (with its anchors) and the module pages. */
export const hasDisciplineVersion = (path: string) => path === '/' || path.startsWith('/#') || path.startsWith('/product/');

/** The same page in another language, translating the discipline segment when there is one. */
export function localizePath(pathname: string, from: SiteLocale, to: SiteLocale) {
  const route = parseDisciplinePath(from, pathname);
  return route ? disciplinePath(route.id, to, route.rest) : pathname;
}
