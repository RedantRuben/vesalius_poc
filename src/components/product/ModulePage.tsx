'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import MobileApp from '@/components/MobileApp';
import MotionProvider from '@/components/MotionProvider';
import { MODULES, moduleBySlug, type ModuleEntry, type ModuleKey } from '@/lib/modules';
import { MODULE_COPY, UI, type SiteLocale, type UiCopy } from './content';
import ModuleDock, { ModuleIcon } from './ModuleDock';
import { AgendaDemo, PreConsultationDemo, TriageDemo, VoiceDemo } from './demos/before';
import { MedicationDemo, ScribeDemo } from './demos/during';
import { DocumentDemo, FollowUpDemo } from './demos/after';
import {
  OrthoAgendaDemo,
  OrthoDocumentDemo,
  OrthoFollowUpDemo,
  OrthoMedicationDemo,
  OrthoPreConsultationDemo,
  OrthoScribeDemo,
  OrthoTriageDemo,
  OrthoVoiceDemo,
} from './demos/ortho';
import { ORTHO_STEPS, ORTHO_TRAJECTORY } from './ortho-content';
import { useSpecialty } from '@/lib/specialty';

const EASE = [0.16, 1, 0.3, 1] as const;

const DEMOS: Record<ModuleKey, () => React.JSX.Element> = {
  smartTriage: TriageDemo,
  agenda: AgendaDemo,
  preConsultation: PreConsultationDemo,
  voiceReception: VoiceDemo,
  scribe: ScribeDemo,
  medication: MedicationDemo,
  documentGeneration: DocumentDemo,
  smartFollowUp: FollowUpDemo,
};

// Orthopaedics: the same pages, following Mrs Femur from triage to recovery.
const ORTHO_DEMOS: Record<ModuleKey, () => React.JSX.Element> = {
  smartTriage: OrthoTriageDemo,
  agenda: OrthoAgendaDemo,
  preConsultation: OrthoPreConsultationDemo,
  voiceReception: OrthoVoiceDemo,
  scribe: OrthoScribeDemo,
  medication: OrthoMedicationDemo,
  documentGeneration: OrthoDocumentDemo,
  smartFollowUp: OrthoFollowUpDemo,
};

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: EASE },
};

/** The live product demo in a window frame; Replay remounts it so the story plays again. */
function DemoStage({ entry, ui, trajectory }: { entry: ModuleEntry; ui: UiCopy; trajectory: string | null }) {
  const t = useTranslations('Modules');
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Demo = (trajectory ? ORTHO_DEMOS : DEMOS)[entry.key];

  return (
    <div ref={ref} className="relative rounded-[36px] bg-gradient-to-b from-white to-[#F4F7F9] ring-1 ring-slate-200/80 shadow-[0_60px_120px_-60px_rgba(11,27,61,0.45)] p-4 md:p-6">
      <div className="flex items-center justify-between px-2 pb-4 md:pb-5">
        <span className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#0B1B3D]">
          <span className="w-8 h-8 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center">
            <ModuleIcon entry={entry} size={16} />
          </span>
          {t(`${entry.key}.title`)}
        </span>
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] font-medium text-slate-400">{ui.exampleData}</span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white ring-1 ring-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0B1B3D] hover:ring-slate-300 transition"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
            </svg>
            {ui.replay}
          </button>
        </span>
      </div>
      <div className="min-h-[300px]">{inView && <Demo key={run} />}</div>
      {trajectory && <p className="px-2 pt-4 text-center text-[12px] text-slate-500">{trajectory}</p>}
    </div>
  );
}

const TANGLED = 'M 20 110 C 120 -40, 60 240, 160 90 C 260 -60, 180 260, 300 110 C 420 -50, 330 250, 440 80 C 540 -40, 470 230, 580 100';
const CALM = 'M 20 110 C 110 110, 90 92, 160 96 C 230 100, 230 112, 300 104 C 370 96, 380 92, 440 96 C 500 100, 520 100, 580 100';
const TANGLED_2 = 'M 20 90 C 140 250, 40 -30, 170 120 C 280 250, 200 -40, 310 90 C 400 230, 360 -30, 450 120 C 530 230, 500 -20, 580 100';
const CALM_2 = 'M 20 90 C 110 90, 100 104, 170 100 C 240 96, 240 88, 310 94 C 380 100, 380 106, 450 102 C 510 98, 530 100, 580 100';

/** Without/With toggle: the tangled line of today straightens into Vesalius' calm one. */
function BeforeAfter({ copy, ui }: { copy: { without: string; with: string }; ui: UiCopy }) {
  const [mode, setMode] = useState<'without' | 'with'>('without');
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const calm = mode === 'with';

  // Show the transformation once on its own, unless the visitor already chose a side.
  useEffect(() => {
    if (!inView || touched) return;
    const id = setTimeout(() => setMode('with'), 1400);
    return () => clearTimeout(id);
  }, [inView, touched]);

  const choose = (next: 'without' | 'with') => {
    setTouched(true);
    setMode(next);
  };

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div className="inline-flex p-1 rounded-full bg-slate-100 mb-8" role="tablist">
          {(['without', 'with'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => choose(key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${mode === key ? 'text-[#0B1B3D]' : 'text-slate-500 hover:text-[#0B1B3D]'}`}
            >
              {mode === key && <motion.span layoutId="before-after-pill" className="absolute inset-0 rounded-full bg-white shadow-sm" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
              <span className="relative">{key === 'without' ? ui.without : ui.with}</span>
            </button>
          ))}
        </div>
        <div className="min-h-[9rem] md:min-h-[8rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: EASE }}
              className={`text-[1.75rem] md:text-4xl font-semibold tracking-[-0.03em] leading-[1.15] ${calm ? 'text-[#0B1B3D]' : 'text-slate-500'}`}
            >
              {calm ? copy.with : copy.without}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className={`relative rounded-[32px] h-[240px] md:h-[280px] overflow-hidden transition-colors duration-700 ${calm ? 'bg-[#0B1B3D]' : 'bg-slate-100'}`}>
        <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={{ d: calm ? CALM_2 : TANGLED_2, stroke: calm ? 'rgba(255,255,255,0.25)' : 'rgba(11,27,61,0.18)' }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <motion.path
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={{ d: calm ? CALM : TANGLED, stroke: calm ? '#5FD4E2' : '#FF3366' }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </svg>
      </div>
    </div>
  );
}

export default function ModulePage({ slug }: { slug: string }) {
  const locale = useLocale();
  const siteLocale: SiteLocale = locale === 'nl' || locale === 'fr' ? locale : 'en';
  const entry = moduleBySlug(slug) ?? MODULES[0];
  const { isOrthopedics } = useSpecialty();
  const baseCopy = MODULE_COPY[siteLocale][entry.key];
  const copy = isOrthopedics
    ? { ...baseCopy, steps: baseCopy.steps.map((step, i) => ({ ...step, body: ORTHO_STEPS[siteLocale][entry.key][i] })) }
    : baseCopy;
  const ui = UI[siteLocale];
  const trajectory = isOrthopedics ? ORTHO_TRAJECTORY[siteLocale](MODULES.indexOf(entry) + 1, MODULES.length) : null;

  return (
    <MotionProvider>
      <main className="w-full relative bg-[#FAFAFB] overflow-x-clip selection:bg-primary/20">
        <Navbar />

        {/* Compact intro, then straight into the product; the actions follow once people have seen it */}
        <section className="relative pt-32 md:pt-36 pb-12 md:pb-16">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-10 md:mb-12"
            >
              <h1 className="text-[2.25rem] md:text-[3.25rem] font-semibold text-[#0B1B3D] tracking-[-0.035em] leading-[1.05] text-balance">{copy.headline}</h1>
              <p className="mt-4 text-[17px] md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-balance">{copy.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
              <DemoStage key={`${entry.slug}-${isOrthopedics ? 'ortho' : 'general'}`} entry={entry} ui={ui} trajectory={trajectory} />
            </motion.div>

          </div>
        </section>

        {/* Without / With */}
        <section className="py-16 md:py-24">
          <motion.div {...reveal} className="max-w-6xl mx-auto px-4 sm:px-6">
            <BeforeAfter key={entry.slug} copy={copy} ui={ui} />
          </motion.div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.h2 {...reveal} className="text-[2.25rem] md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.04em] mb-12 md:mb-16">
              {ui.howItWorks}
            </motion.h2>
            <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              <span className="hidden md:block absolute left-0 right-0 top-5 h-px bg-slate-200" aria-hidden="true" />
              {copy.steps.map((step, i) => (
                <motion.li key={step.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }} className="relative">
                  <span className="relative z-10 w-10 h-10 rounded-full bg-[#0B1B3D] text-white text-sm font-semibold flex items-center justify-center mb-6 ring-8 ring-[#FAFAFB] tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-[#0B1B3D] tracking-tight mb-2">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {entry.key === 'scribe' && <MobileApp />}

        <FinalCta />
        <Footer />
        <ModuleDock current={entry} ui={ui} />
      </main>
    </MotionProvider>
  );
}
