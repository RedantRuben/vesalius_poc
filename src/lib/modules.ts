export type ModulePhase = 'before' | 'during' | 'after';

export type ModuleKey =
  | 'smartTriage'
  | 'agenda'
  | 'preConsultation'
  | 'voiceReception'
  | 'scribe'
  | 'medication'
  | 'documentGeneration'
  | 'smartFollowUp';

export interface ModuleEntry {
  key: ModuleKey;
  slug: string;
  phase: ModulePhase;
  /** SVG path data on a 24×24 grid, stroked. */
  icon: string;
}

/** The modules in patient-journey order; drives the product pages, their dock and prev/next. */
export const MODULES: ModuleEntry[] = [
  { key: 'smartTriage', slug: 'smart-triage', phase: 'before', icon: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9' },
  { key: 'agenda', slug: 'agenda', phase: 'before', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z' },
  { key: 'preConsultation', slug: 'pre-consultation', phase: 'before', icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z' },
  { key: 'voiceReception', slug: 'voice-reception', phase: 'before', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z' },
  { key: 'scribe', slug: 'scribe', phase: 'during', icon: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3ZM19 10v2a7 7 0 0 1-14 0v-2M12 19v3' },
  { key: 'medication', slug: 'medication', phase: 'during', icon: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7' },
  { key: 'documentGeneration', slug: 'document-generation', phase: 'after', icon: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4' },
  { key: 'smartFollowUp', slug: 'smart-follow-up', phase: 'after', icon: 'M3 12h4l2-5 4 10 2-5h6' },
];

export const PHASES: ModulePhase[] = ['before', 'during', 'after'];

export const PHASE_MESSAGE_KEY: Record<ModulePhase, 'beforeConsultation' | 'duringConsultation' | 'afterConsultation'> = {
  before: 'beforeConsultation',
  during: 'duringConsultation',
  after: 'afterConsultation',
};

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);
