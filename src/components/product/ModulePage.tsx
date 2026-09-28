'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import MobileApp from '@/components/MobileApp';
import MotionProvider from '@/components/MotionProvider';
import { MODULES, PHASE_MESSAGE_KEY, moduleBySlug, type ModuleEntry, type ModuleKey } from '@/lib/modules';
import { MODULE_COPY, UI, type SiteLocale, type UiCopy } from './content';
import ModuleDock, { ModuleIcon } from './ModuleDock';
import { AgendaDemo, PreConsultationDemo, TriageDemo, VoiceDemo } from './demos/before';
import { MedicationDemo, ScribeDemo } from './demos/during';
import { DocumentDemo, FollowUpDemo } from './demos/after';

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

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: EASE },
};

/** The live product demo in a window frame; Replay remounts it so the story plays again. */
function DemoStage({ entry, ui }: { entry: ModuleEntry; ui: UiCopy }) {
  const t = useTranslations('Modules');
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Demo = DEMOS[entry.key];

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
  const t = useTranslations('Modules');
  const entry = moduleBySlug(slug) ?? MODULES[0];
  const copy = MODULE_COPY[siteLocale][entry.key];
  const ui = UI[siteLocale];
  const index = MODULES.findIndex((m) => m.slug === entry.slug);
  const next = MODULES[(index + 1) % MODULES.length];
  const nextCopy = MODULE_COPY[siteLocale][next.key];
  const related = copy.related.map((key) => MODULES.find((m) => m.key === key)!);

  return (
    <MotionProvider>
      <main className="w-full relative bg-[#FAFAFB] overflow-x-clip selection:bg-primary/20">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(50% 45% at 50% 0%, rgba(6,172,193,0.12), transparent 70%)',
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-center flex flex-col items-center mb-12 md:mb-16"
            >
              <p className="inline-flex items-center gap-2.5 text-sm text-slate-500 mb-6">
                <span className="font-semibold text-[#0597a9]">{t(PHASE_MESSAGE_KEY[entry.phase])}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
                <span>{t(`${entry.key}.title`)}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
                <span className="tabular-nums">
                  {index + 1} {ui.ofTotal} {MODULES.length}
                </span>
              </p>
              <h1 className="text-[2.75rem] md:text-7xl font-semibold text-[#0B1B3D] tracking-[-0.05em] leading-[1] max-w-4xl text-balance">
                {copy.headline}
              </h1>
              <p className="mt-6 md:mt-8 text-lg md:text-xl text-slate-500 leading-snug tracking-tight max-w-2xl text-balance">{copy.description}</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="https://assistant.vesalius.ai/onboarding/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-7 py-4 rounded-full bg-[#0B1B3D] text-white font-medium hover:bg-[#13285a] transition-colors flex items-center justify-center gap-2"
                >
                  {ui.primaryCta}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <Link href="/demo" className="px-7 py-4 rounded-full bg-white ring-1 ring-slate-200 hover:ring-slate-300 text-[#0B1B3D] font-medium transition-all flex items-center justify-center">
                  {ui.secondaryCta}
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}>
              <DemoStage key={entry.slug} entry={entry} ui={ui} />
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

        {/* What you get + your part */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
            <motion.div {...reveal} className="rounded-[32px] bg-white ring-1 ring-slate-200/70 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#0B1B3D] tracking-[-0.03em] mb-8">{ui.included}</h2>
              <ul className="flex flex-col divide-y divide-slate-100">
                {copy.features.map((feature) => (
                  <li key={feature.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="w-7 h-7 shrink-0 rounded-full bg-[#06ACC1]/10 text-[#0597a9] flex items-center justify-center mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>
                      <span className="block font-semibold text-[#0B1B3D]">{feature.title}</span>
                      <span className="block text-slate-500 mt-0.5 leading-relaxed">{feature.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="relative overflow-hidden rounded-[32px] bg-[#0B1B3D] text-white p-8 md:p-12 flex flex-col justify-end min-h-[280px]"
            >
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(6,172,193,0.45),transparent_65%)]" />
              <span className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-auto">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </span>
              <p className="relative text-sm text-white/60 mt-10 mb-2">{ui.yourPart}</p>
              <p className="relative text-3xl md:text-[2.5rem] font-semibold tracking-[-0.035em] leading-[1.1]">{copy.yourPart}</p>
            </motion.div>
          </div>
        </section>

        {entry.key === 'scribe' && <MobileApp />}

        {/* Works well with */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.h2 {...reveal} className="text-2xl md:text-3xl font-semibold text-[#0B1B3D] tracking-[-0.03em] mb-8">
              {ui.worksWith}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((mod, i) => (
                <motion.div key={mod.slug} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
                  <Link
                    href={`/product/${mod.slug}`}
                    className="group flex flex-col h-full rounded-[28px] bg-white ring-1 ring-slate-200/70 p-6 hover:ring-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(11,27,61,0.35)] transition-all duration-500"
                  >
                    <span className="flex items-center justify-between mb-8">
                      <span className="w-11 h-11 rounded-full bg-slate-100 text-[#0B1B3D] flex items-center justify-center transition-colors group-hover:bg-[#0B1B3D] group-hover:text-white">
                        <ModuleIcon entry={mod} />
                      </span>
                      <span className="text-xs text-slate-400">{t(PHASE_MESSAGE_KEY[mod.phase])}</span>
                    </span>
                    <span className="text-lg font-semibold text-[#0B1B3D] tracking-tight">{t(`${mod.key}.title`)}</span>
                    <span className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">{MODULE_COPY[siteLocale][mod.key].headline}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next in the journey */}
        <section className="py-8 md:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div {...reveal}>
              <Link
                href={`/product/${next.slug}`}
                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-white ring-1 ring-slate-200/70 p-8 md:p-12 hover:shadow-[0_40px_80px_-40px_rgba(11,27,61,0.4)] transition-shadow duration-500"
              >
                <span>
                  <span className="block text-sm font-semibold text-[#0597a9] mb-3">
                    {ui.next} · {t(PHASE_MESSAGE_KEY[next.phase])}
                  </span>
                  <span className="block text-3xl md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.04em] leading-[1.05]">{t(`${next.key}.title`)}</span>
                  <span className="block mt-3 text-lg text-slate-500">{nextCopy.headline}</span>
                </span>
                <span className="shrink-0 w-16 h-16 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <FinalCta />
        <Footer />
        <ModuleDock current={entry} ui={ui} />
      </main>
    </MotionProvider>
  );
}
