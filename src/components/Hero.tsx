'use client';

import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const EASE = [0.16, 1, 0.3, 1] as const;

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const VesaliusMark = ({ className = '' }: { className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/vesalius-logo.svg" alt="" aria-hidden="true" className={className} />
);

/** The three sweeping brand lines from the original hero. */
const CleanLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800" aria-hidden="true">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
      d="M -100,300 C 400,200 800,500 1540,300"
      fill="none"
      stroke="#06ACC1"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 3, ease: 'easeInOut', delay: 0.2 }}
      d="M -100,400 C 500,500 900,250 1540,350"
      fill="none"
      stroke="#FF3366"
      strokeWidth="1.5"
      strokeOpacity="0.3"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.4 }}
      d="M -100,200 C 600,350 1000,250 1540,400"
      fill="none"
      stroke="#0B1B3D"
      strokeWidth="1.5"
      strokeOpacity="0.25"
    />
  </svg>
);

// Choreography: the intake plays out first, then the consultation note starts writing.
const CHAT_START_MS = 700;
const CHAT_STEP_MS = 850;
const NOTE_START_MS = CHAT_START_MS + CHAT_STEP_MS * 3;

const TypingDots = ({ dark = false }: { dark?: boolean }) => (
  <div className={`inline-flex items-center gap-1 rounded-2xl px-3.5 py-3 ${dark ? 'bg-[#0B1B3D] rounded-tr-sm' : 'bg-slate-100 rounded-tl-sm'}`}>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-white/70' : 'bg-slate-400'}`}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

/** Reveals `count` steps one after another, returning how many are currently visible. */
function useSequence(count: number, stepMs: number, startDelayMs: number) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setStep(i + 1), startDelayMs + i * stepMs),
    );
    return () => timers.forEach(clearTimeout);
  }, [count, stepMs, startDelayMs, reduceMotion]);

  return reduceMotion ? count : step;
}

type HeroCopy = {
  intakeAgent: string;
  intakeActive: string;
  intakeReady: string;
  intakeMessages: [string, string, string];
  consultationTitle: string;
  consultationRoom: string;
  clinicalNoteGeneration: string;
  clinicalNoteBody: string;
  noteReady: string;
};


const ChatCard = ({ copy, className = '' }: { copy: HeroCopy; className?: string }) => {
  // steps: 1 msg0, 2 typing(patient), 3 msg1, 4 typing(agent), 5 msg2, 6 ready
  const step = useSequence(6, CHAT_STEP_MS, CHAT_START_MS);

  return (
    <div className={`bg-white/90 backdrop-blur-2xl rounded-[28px] shadow-[0_40px_80px_-30px_rgba(11,27,61,0.25),0_0_0_1px_rgba(11,27,61,0.05)] p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <VesaliusMark className="w-8 h-8 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-[#0B1B3D] tracking-tight">{copy.intakeAgent}</span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            {copy.intakeActive}
          </span>
        </div>
      </div>

      {/* Every bubble keeps its space from the start so the card never changes height */}
      <div className="flex flex-col gap-3 text-left">
        {copy.intakeMessages.map((message, i) => {
          const fromPatient = i === 1;
          const visibleAt = [1, 3, 5][i];
          const typingAt = [0, 2, 4][i];
          return (
            <div key={i} className={`relative ${fromPatient ? 'ml-auto max-w-[85%]' : 'max-w-[88%]'}`}>
              <motion.div
                initial={false}
                animate={step >= visibleAt ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`rounded-2xl p-3.5 ${fromPatient ? 'bg-[#0B1B3D] rounded-tr-sm' : 'bg-slate-100 rounded-tl-sm'}`}
              >
                <p className={`text-[13px] leading-relaxed ${fromPatient ? 'text-white' : 'text-slate-700'}`}>{message}</p>
              </motion.div>
              <AnimatePresence>
                {step === typingAt && typingAt > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`absolute top-0 ${fromPatient ? 'right-0' : 'left-0'}`}
                  >
                    <TypingDots dark={fromPatient} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 6 ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-4 flex items-center gap-2 text-[12px] font-medium text-emerald-700"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.12" />
          <motion.path
            d="m8 12.5 2.5 2.5 5.5-6"
            stroke="#059669"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: step >= 6 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
        {copy.intakeReady}
      </motion.div>
    </div>
  );
};

/** Live-looking consultation timer that starts from 04:12. */
function useConsultationTimer(startSeconds: number) {
  const reduceMotion = useReducedMotion();
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

const WAVE_BARS = 36;

const Waveform = () => {
  // The card renders twice (desktop and mobile layouts), so the gradient id must be unique per instance.
  const gradientId = `hero-wave-${useId().replace(/:/g, '')}`;

  return (
  <svg viewBox={`0 0 ${WAVE_BARS * 8} 48`} className="w-full h-12" aria-hidden="true">
    <defs>
      <linearGradient id={gradientId} x1="0" x2="1">
        <stop offset="0" stopColor="#0B1B3D" />
        <stop offset="1" stopColor="#06ACC1" />
      </linearGradient>
    </defs>
    {Array.from({ length: WAVE_BARS }, (_, i) => {
      const distance = Math.abs(WAVE_BARS / 2 - i) / (WAVE_BARS / 2);
      const peak = 8 + (1 - distance) * 36;
      return (
        <motion.rect
          key={i}
          x={i * 8 + 2}
          width={3.5}
          rx={1.75}
          fill={distance < 0.6 ? `url(#${gradientId})` : '#E2E8F0'}
          initial={{ height: peak * 0.3, y: 24 - peak * 0.15 }}
          animate={{
            height: [peak * 0.3, peak, peak * 0.45, peak * 0.8, peak * 0.3],
            y: [24 - peak * 0.15, 24 - peak / 2, 24 - peak * 0.225, 24 - peak * 0.4, 24 - peak * 0.15],
          }}
          transition={{ duration: 1.6 + (i % 4) * 0.25, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.08 }}
        />
      );
    })}
  </svg>
  );
};

const ScribeCard = ({ copy, className = '' }: { copy: HeroCopy; className?: string }) => {
  const timer = useConsultationTimer(252);
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const full = copy.clinicalNoteBody;

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 2;
        setTyped(Math.min(i, full.length));
        if (i >= full.length && interval) clearInterval(interval);
      }, 28);
    }, NOTE_START_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [full, reduceMotion]);

  const shown = reduceMotion ? full.length : typed;
  const done = shown >= full.length;

  return (
    <div className={`bg-white/90 backdrop-blur-2xl rounded-[28px] shadow-[0_40px_80px_-30px_rgba(11,27,61,0.3),0_0_0_1px_rgba(11,27,61,0.05)] p-6 ${className}`}>
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-[#0B1B3D] tracking-tight">{copy.consultationTitle}</span>
          <span className="text-[11px] text-slate-500 mt-0.5">{copy.consultationRoom}</span>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 px-2.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-rose-600 tabular-nums">{timer}</span>
        </div>
      </div>

      <Waveform />

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-500 tracking-tight">{copy.clinicalNoteGeneration}</span>
          <AnimatePresence>
            {done && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] font-semibold text-[#0597a9] bg-[#06ACC1]/10 px-2 py-0.5 rounded-full"
              >
                {copy.noteReady}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="text-[13px] text-slate-700 leading-relaxed min-h-[84px]">
          {full.slice(0, shown)}
          {!done && <span className="inline-block w-[2px] h-[14px] -mb-[2px] ml-0.5 bg-[#06ACC1] animate-pulse" />}
        </p>
      </div>
    </div>
  );
};

/** Desktop composition, as in the original hero: chat card top, live consultation overlapping lower right. */
function HeroStage({ copy }: { copy: HeroCopy }) {
  return (
    <div className="relative w-full h-[640px] xl:h-[700px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
        className="absolute right-[15%] xl:right-[20%] top-0 xl:top-[3%] z-20 w-[340px]"
      >
        <ChatCard copy={copy} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.4 }}
        className="absolute right-0 top-[50%] xl:top-[50%] z-30 w-[360px]"
      >
        <ScribeCard copy={copy} />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? {
          line1: 'Redevenez',
          line2: 'médecin.',
          subtitle: 'Votre assistant IA personnel s’occupe du reste.',
          primaryCta: 'Créez votre assistant',
          secondaryCta: 'Demander une démo',
          intakeAgent: 'Agent de pré-consultation',
          intakeActive: 'Intake en cours',
          intakeReady: 'Résumé prêt pour le médecin',
          intakeMessages: [
            'Bonjour David. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
            'J’ai de fortes migraines depuis deux semaines. Elles semblent s’aggraver.',
            'Je comprends. Pouvez-vous me préciser où la douleur se situe exactement et si vous avez d’autres symptômes ?',
          ] as [string, string, string],
          consultationTitle: 'Consultation en direct',
          consultationRoom: 'Salle 4',
          clinicalNoteGeneration: 'Génération de note clinique',
          noteReady: 'Prêt à valider',
          clinicalNoteBody:
            'Le patient signale des céphalées sévères qui s’intensifient depuis deux semaines. La douleur est localisée au niveau frontal et s’accompagne d’une légère photophobie...',
        }
      : locale === 'nl'
        ? {
            line1: 'Wees opnieuw',
            line2: 'arts.',
            subtitle: 'Uw persoonlijke AI-assistent neemt de rest uit handen.',
            primaryCta: 'Maak uw assistent aan',
            secondaryCta: 'Vraag een demo aan',
            intakeAgent: 'Pre-consultatie-assistent',
            intakeActive: 'Intake actief',
            intakeReady: 'Samenvatting klaar voor de arts',
            intakeMessages: [
              'Hallo David! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
              'Ik heb al twee weken hevige hoofdpijn. Het lijkt alleen maar erger te worden.',
              'Ik begrijp het. Kunt u precies aangeven waar de pijn zit en of u nog andere symptomen heeft?',
            ] as [string, string, string],
            consultationTitle: 'Live consultatie',
            consultationRoom: 'Kamer 4',
            clinicalNoteGeneration: 'Generatie van klinische nota',
            noteReady: 'Klaar ter controle',
            clinicalNoteBody:
              'De patiënt meldt hevige, toenemende hoofdpijn sinds twee weken. De pijn is gelokaliseerd in de frontale regio en gaat gepaard met lichte fotofobie...',
          }
        : {
            line1: 'Be a doctor',
            line2: 'again.',
            subtitle: 'Your personal AI assistant handles everything else.',
            primaryCta: 'Create your assistant',
            secondaryCta: 'Request a demo',
            intakeAgent: 'Pre-Consultation Agent',
            intakeActive: 'Intake Active',
            intakeReady: 'Summary ready for the doctor',
            intakeMessages: [
              "Hello David! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
              "I've been having severe headaches for the past two weeks. They seem to be getting worse.",
              'I understand. Can you tell me exactly where the pain is located, and if you have any other symptoms?',
            ] as [string, string, string],
            consultationTitle: 'Live Consultation',
            consultationRoom: 'Room 4',
            clinicalNoteGeneration: 'Clinical Note Generation',
            noteReady: 'Ready for review',
            clinicalNoteBody:
              'Patient reports severe, worsening headaches over the past two weeks. Pain is localized in the frontal region and is accompanied by mild photophobia...',
          };

  const words = copy.line1.split(' ');

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full pt-28 md:pt-32 pb-16 lg:pb-20 min-h-[80vh] md:min-h-[92vh] overflow-x-clip"
    >
      {/* Soft brand light and lines, faded out at the bottom so the hero melts into the next section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(60% 55% at 75% 35%, rgba(6,172,193,0.10) 0%, rgba(6,172,193,0) 70%)',
          maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        }}
      >
        <CleanLines />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-6">
          {/* Copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[46%]">
            <h1 className="text-[3.25rem] md:text-[4.5rem] xl:text-[6rem] font-semibold tracking-[-0.045em] text-[#0B1B3D] mb-7 leading-[0.98] w-full">
              <span className="sr-only">{`${copy.line1} ${copy.line2}`}</span>
              <span aria-hidden="true" className="block">
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block mr-[0.22em]"
                    initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br className="hidden lg:block" />
                <motion.span
                  className="relative inline-block font-display font-normal italic tracking-[-0.01em] pr-2"
                  initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.1 + words.length * 0.09, ease: EASE }}
                >
                  {copy.line2}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="text-xl md:text-2xl text-slate-500 mb-10 leading-snug tracking-tight max-w-md xl:max-w-lg text-balance"
            >
              {copy.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="https://assistant.vesalius.ai/onboarding/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-7 py-4 rounded-full bg-[#0B1B3D] text-white font-medium hover:bg-[#13285a] transition-colors flex items-center justify-center gap-2 text-[15px] shadow-[0_10px_30px_-10px_rgba(11,27,61,0.6)]"
              >
                {copy.primaryCta}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/80 backdrop-blur text-[#0B1B3D] font-medium hover:bg-white ring-1 ring-slate-200 hover:ring-slate-300 transition-all flex items-center justify-center gap-2.5 text-[15px]"
              >
                <span className="w-6 h-6 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center">
                  <PlayIcon />
                </span>
                {copy.secondaryCta}
              </Link>
            </motion.div>
          </div>

          {/* Product story: intake → consultation (desktop stage) */}
          <div className="hidden lg:flex relative w-[54%] xl:w-[50%] justify-end">
            <HeroStage copy={copy} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked story */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
        className="lg:hidden relative z-10 w-full px-4 mt-14 flex flex-col items-center gap-5"
      >
        <ChatCard copy={copy} className="w-full max-w-[380px]" />
        <ScribeCard copy={copy} className="w-full max-w-[380px]" />
      </motion.div>
    </section>
  );
}
