'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Steps through 0..length-1 on an interval; frozen on the last step for reduced motion. */
function useLoop(length: number, intervalMs: number) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setStep((s) => (s + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, reduceMotion]);

  return reduceMotion ? length - 1 : step;
}

const Check = ({ size = 14, color = '#059669' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

const TRIAGE_ROUTES = [
  { d: 'M 30 80 L 150 80 C 205 80 215 28 290 28', color: '#FF3366', delay: 0 },
  { d: 'M 30 80 L 150 80 L 290 80', color: '#F59E0B', delay: 1.1 },
  { d: 'M 30 80 L 150 80 C 205 80 215 132 290 132', color: '#06ACC1', delay: 2.2 },
];

const TriageVisual = () => (
  <svg viewBox="0 0 320 160" className="w-full max-w-[340px] h-auto" aria-hidden="true">
    {TRIAGE_ROUTES.map((route) => (
      <path key={route.d} d={route.d} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
    ))}
    {TRIAGE_ROUTES.map((route) => (
      <circle key={`dot-${route.d}`} r="5" fill={route.color}>
        <animateMotion dur="3.3s" begin={`${route.delay}s`} repeatCount="indefinite" path={route.d} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.7;1" dur="3.3s" begin={`${route.delay}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {/* Patients arriving */}
    <circle cx="30" cy="80" r="16" fill="#fff" stroke="#E2E8F0" />
    <circle cx="30" cy="75" r="4" fill="#94A3B8" />
    <path d="M 22 89 C 22 82 38 82 38 89" fill="#94A3B8" />
    {/* Vesalius assessment */}
    <circle cx="150" cy="80" r="22" fill="#0B1B3D" />
    <circle cx="150" cy="80" r="22" fill="none" stroke="#06ACC1" strokeWidth="2">
      <animate attributeName="r" values="22;32" dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <path d="M 139 80 L 145 80 L 148 73 L 152 87 L 155 80 L 161 80" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Destinations */}
    {TRIAGE_ROUTES.map((route, i) => (
      <g key={`end-${route.d}`} transform={`translate(290 ${[28, 80, 132][i]})`}>
        <circle r="13" fill="#fff" stroke={route.color} strokeWidth="1.5" />
        <circle r="4.5" fill={route.color} />
      </g>
    ))}
  </svg>
);

const AGENDA_LAYOUTS = [
  [0, 2, 3],
  [1, 2, 4],
  [0, 1, 3],
];
const AGENDA_BLOCKS = [
  { color: 'bg-[#0B1B3D]', w: 'w-[78%]' },
  { color: 'bg-[#06ACC1]', w: 'w-[62%]' },
  { color: 'bg-slate-300', w: 'w-[70%]' },
];

const AgendaVisual = () => {
  const layout = AGENDA_LAYOUTS[useLoop(AGENDA_LAYOUTS.length, 2200)];
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00'];

  return (
    <div className="w-full max-w-[300px] bg-white rounded-2xl ring-1 ring-slate-200 shadow-[0_24px_40px_-24px_rgba(11,27,61,0.35)] p-4">
      <div className="relative">
        {hours.map((hour) => (
          <div key={hour} className="flex items-center gap-3 h-7">
            <span className="text-[10px] text-slate-400 tabular-nums w-8">{hour}</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
        ))}
        {AGENDA_BLOCKS.map((block, i) => (
          <motion.div
            key={i}
            className={`absolute left-11 h-5 rounded-md ${block.color} ${block.w}`}
            initial={false}
            animate={{ top: layout[i] * 28 + 4 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          />
        ))}
      </div>
    </div>
  );
};

const PreConsultationVisual = ({ analyzed }: { analyzed: string }) => {
  const step = useLoop(5, 1100);

  return (
    <div className="flex items-end justify-center gap-4 w-full">
      <div className="w-[132px] h-[168px] rounded-[26px] bg-[#0B1B3D] p-2 shadow-[0_24px_40px_-20px_rgba(11,27,61,0.6)]">
        <div className="w-full h-full rounded-[20px] bg-slate-50 p-2 flex flex-col gap-1.5 justify-end overflow-hidden">
          <AnimatePresence initial={false}>
            {[0, 1, 2].slice(0, Math.min(step + 1, 3)).map((i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`rounded-xl px-2 py-1.5 ${i % 2 ? 'bg-[#06ACC1] self-end rounded-br-sm' : 'bg-white ring-1 ring-slate-200 self-start rounded-bl-sm'}`}
              >
                <div className={`h-1 rounded-full mb-1 ${i % 2 ? 'bg-white/70 w-12' : 'bg-slate-300 w-14'}`} />
                <div className={`h-1 rounded-full ${i % 2 ? 'bg-white/50 w-8' : 'bg-slate-200 w-10'}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <svg width="28" height="12" viewBox="0 0 28 12" className="mb-16" aria-hidden="true">
        <path d="M 0 6 L 24 6 M 19 1 L 25 6 L 19 11" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="w-[150px] bg-white rounded-2xl ring-1 ring-slate-200 p-3 shadow-[0_24px_40px_-24px_rgba(11,27,61,0.35)] mb-4">
        <span className="inline-block text-[10px] font-semibold text-[#0597a9] bg-[#06ACC1]/10 px-2 py-0.5 rounded-full mb-2.5">{analyzed}</span>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2 h-6">
            <motion.span
              className="w-4 h-4 rounded-full flex items-center justify-center"
              animate={{ backgroundColor: step > row ? 'rgba(16,185,129,0.15)' : 'rgba(226,232,240,1)' }}
            >
              {step > row && <Check size={10} />}
            </motion.span>
            <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
              <motion.div className="h-full bg-[#0B1B3D] rounded-full" animate={{ width: step > row ? '100%' : '0%' }} transition={{ duration: 0.5, ease: EASE }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VoiceVisual = () => {
  const step = useLoop(4, 1200);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-5 w-full">
      <div className="relative w-14 h-14 shrink-0">
        {[0, 1].map((ring) => (
          <motion.span
            key={ring}
            className="absolute inset-0 rounded-full border border-[#06ACC1]"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: ring * 0.9, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-[#0B1B3D] flex items-center justify-center text-white"
          animate={{ rotate: [0, -10, 10, -10, 10, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 1] }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </motion.div>
      </div>

      <div className="flex items-center gap-[3px] h-12 px-3 rounded-2xl bg-white ring-1 ring-slate-200">
        {[10, 22, 30, 16, 26, 12, 20].map((h, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-[#06ACC1]"
            animate={{ height: [h * 0.35, h, h * 0.35] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="w-28 bg-white rounded-xl ring-1 ring-slate-200 p-2.5 shadow-[0_24px_40px_-24px_rgba(11,27,61,0.35)]">
        {[0, 1, 2].map((slot) => (
          <motion.div
            key={slot}
            className="h-5 rounded-md mb-1.5 last:mb-0 flex items-center justify-end pr-1.5"
            animate={{ backgroundColor: slot === 1 && step >= 2 ? 'rgba(6,172,193,0.15)' : 'rgba(241,245,249,1)' }}
            transition={{ duration: 0.4 }}
          >
            {slot === 1 && step >= 3 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
                <Check size={12} color="#0597a9" />
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SCRIBE_BARS = 44;

const ScribeVisual = () => (
  <svg viewBox="0 0 180 180" className="w-[180px] h-[180px]" aria-hidden="true">
    {Array.from({ length: SCRIBE_BARS }, (_, i) => {
      const angle = (i / SCRIBE_BARS) * 360;
      const max = 14 + ((i * 7) % 11) * 2;
      return (
        <g key={i} transform={`rotate(${angle} 90 90)`}>
          <motion.rect
            x={88.75}
            width={2.5}
            rx={1.25}
            fill={i % 4 === 0 ? '#06ACC1' : '#0B1B3D'}
            fillOpacity={i % 4 === 0 ? 1 : 0.25}
            initial={{ y: 90 - 44 - 4, height: 4 }}
            animate={{ y: [90 - 44 - 4, 90 - 44 - max, 90 - 44 - 6, 90 - 44 - 4], height: [4, max, 6, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: (i % 11) * 0.12, ease: 'easeInOut' }}
          />
        </g>
      );
    })}
    <circle cx="90" cy="90" r="36" fill="#0B1B3D" />
    <g transform="translate(78 76)" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="0" width="8" height="15" rx="4" />
      <path d="M 3 12 A 9 9 0 0 0 21 12" />
      <path d="M 12 21 L 12 25" />
    </g>
  </svg>
);

const MedicationVisual = () => (
  <div className="flex items-end justify-center gap-5 w-full">
    <div className="relative w-[124px] h-[150px]">
      <svg viewBox="0 0 124 150" className="w-full h-full" aria-hidden="true">
        <path d="M 12 30 L 40 8 L 112 8 L 112 120 L 84 142 L 12 142 Z" fill="#fff" stroke="#CBD5E1" />
        <path d="M 12 30 L 84 30 L 112 8 M 84 30 L 84 142" fill="none" stroke="#E2E8F0" />
        <rect x="22" y="44" width="50" height="8" rx="4" fill="#0B1B3D" />
        <rect x="22" y="58" width="34" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="22" y="96" width="52" height="30" rx="6" fill="#F1F5F9" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={32 + i * 16} cy="111" rx="5" ry="8" fill="#fff" stroke="#CBD5E1" />
        ))}
      </svg>
      <motion.div
        className="absolute left-0 right-4 h-[2px] bg-[#06ACC1] shadow-[0_0_14px_3px_rgba(6,172,193,0.5)]"
        animate={{ top: ['12%', '88%', '12%'] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>

    <div className="flex flex-col gap-2 mb-3">
      {['500 mg', '1 - 0 - 1', '× 30'].map((field, i) => (
        <motion.span
          key={field}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.25, duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 bg-white ring-1 ring-slate-200 rounded-full pl-2 pr-3 py-1.5 text-[12px] font-medium text-[#0B1B3D] tabular-nums shadow-sm"
        >
          <span className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center"><Check size={10} /></span>
          {field}
        </motion.span>
      ))}
    </div>
  </div>
);

const FOLLOW_UP_POINTS = [
  [20, 92], [70, 80], [120, 70], [170, 58], [220, 52], [270, 86],
] as const;

const FollowUpVisual = ({ actionRequired, deviation }: { actionRequired: string; deviation: string }) => {
  const line = FOLLOW_UP_POINTS.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
  const [lastX, lastY] = FOLLOW_UP_POINTS[FOLLOW_UP_POINTS.length - 1];

  return (
    <div className="w-full max-w-[380px] flex flex-col gap-3">
      <svg viewBox="0 0 290 110" className="w-full h-auto" aria-hidden="true">
        <path d="M 20 100 L 270 40 L 270 64 L 20 110 Z" fill="#06ACC1" fillOpacity="0.07" />
        <path d="M 20 105 L 270 52" fill="none" stroke="#06ACC1" strokeOpacity="0.35" strokeDasharray="3 4" />
        <motion.path
          d={line}
          fill="none"
          stroke="#0B1B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
        {FOLLOW_UP_POINTS.slice(0, -1).map(([x, y], i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={y}
            r="3.5"
            fill="#fff"
            stroke="#0B1B3D"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 * i }}
          />
        ))}
        <circle cx={lastX} cy={lastY} r="5" fill="#F59E0B">
          <animate attributeName="r" values="5;12;5" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={lastX} cy={lastY} r="5" fill="#F59E0B" stroke="#fff" strokeWidth="2" />
      </svg>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        className="flex items-center gap-3 p-3 bg-amber-50 ring-1 ring-amber-200/70 rounded-2xl"
      >
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div className="text-left">
          <p className="font-semibold text-amber-800 text-[13px]">{actionRequired}</p>
          <p className="text-amber-700/80 text-[12px]">{deviation}</p>
        </div>
      </motion.div>
    </div>
  );
};

const DocumentVisual = ({ generated }: { generated: string }) => (
  <div className="relative w-[200px] h-[170px]">
    {[-10, 8].map((rotate, i) => (
      <motion.div
        key={rotate}
        className="absolute inset-x-6 top-2 bottom-0 bg-white rounded-2xl ring-1 ring-slate-200"
        initial={{ rotate: 0, x: 0 }}
        whileInView={{ rotate, x: rotate * 2.2 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + i * 0.1, type: 'spring', bounce: 0.3 }}
      />
    ))}
    <div className="absolute inset-x-6 top-2 bottom-0 bg-white rounded-2xl ring-1 ring-slate-200 shadow-[0_24px_40px_-20px_rgba(11,27,61,0.35)] p-4">
      <svg viewBox="0 0 120 110" className="w-full h-auto" aria-hidden="true">
        <rect x="0" y="0" width="22" height="22" rx="6" fill="#06ACC1" fillOpacity="0.12" />
        <path d="M 6 7 L 16 7 M 6 11 L 16 11 M 6 15 L 12 15" stroke="#0597a9" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="30" y="4" width="48" height="6" rx="3" fill="#0B1B3D" />
        <rect x="30" y="14" width="30" height="4" rx="2" fill="#CBD5E1" />
        {[36, 50, 64, 78, 92].map((y, i) => (
          <motion.path
            key={y}
            d={`M 0 ${y} L ${[120, 104, 116, 88, 60][i]} ${y}`}
            stroke="#E2E8F0"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.18, duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 1.7, type: 'spring', bounce: 0.5 }}
      className="absolute -bottom-3 right-2 inline-flex items-center gap-1.5 bg-[#0B1B3D] text-white px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-lg"
    >
      <Check size={12} color="#5EEAD4" />
      {generated}
    </motion.span>
  </div>
);

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

type ModuleKey =
  | 'agenda'
  | 'preConsultation'
  | 'smartTriage'
  | 'voiceReception'
  | 'scribe'
  | 'medication'
  | 'smartFollowUp'
  | 'documentGeneration';

interface ModuleConfig {
  key: ModuleKey;
  slug: string;
  span: string;
  visual: React.ReactNode;
}

function ModuleCard({ module, index }: { module: ModuleConfig; index: number }) {
  const t = useTranslations('Modules');
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.1 }}
      className={module.span}
    >
      <Link
        href={`/${locale}/product/${module.slug}`}
        scroll={true}
        className="group flex flex-col h-full min-h-[460px] bg-white rounded-[28px] p-8 md:p-10 relative overflow-hidden ring-1 ring-slate-200/70 hover:ring-slate-300 hover:shadow-[0_40px_80px_-40px_rgba(11,27,61,0.35)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1]"
      >
        <div className="flex justify-between items-start gap-4 mb-5">
          <div className="flex gap-2 flex-wrap">
            {[t(`${module.key}.tag1`), t(`${module.key}.tag2`)].map((tag) => (
              <span key={tag} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
          <span className="w-9 h-9 shrink-0 rounded-full bg-slate-100 text-[#0B1B3D] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0B1B3D] group-hover:text-white" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </div>

        <h3 className="text-2xl md:text-[1.75rem] font-semibold text-[#0B1B3D] mb-2 tracking-[-0.025em]">{t(`${module.key}.title`)}</h3>
        <p className="text-slate-500 max-w-md text-[15px] md:text-base leading-relaxed">{t(`${module.key}.description`)}</p>

        <div className="flex-1 min-h-[190px] mt-8 flex items-end justify-center transition-transform duration-700 ease-out group-hover:-translate-y-1">
          {module.visual}
        </div>
      </Link>
    </motion.div>
  );
}

function Chapter({ number, label, modules }: { number: string; label: string; modules: ModuleConfig[] }) {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex items-center gap-5">
        <span className="text-sm font-semibold text-[#0597a9] tabular-nums">{number}</span>
        <h3 className="text-xl md:text-2xl font-semibold text-[#0B1B3D] tracking-tight whitespace-nowrap">{label}</h3>
        <motion.div
          className="h-px flex-1 bg-slate-200 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {modules.map((module, index) => (
          <ModuleCard key={module.key} module={module} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function Modules() {
  const t = useTranslations('Modules');
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? {
          analyzed: 'Analysé',
          generated: 'Généré',
          actionRequired: 'Action requise',
          deviation: 'Écart détecté dans le suivi',
        }
      : locale === 'nl'
        ? {
            analyzed: 'Geanalyseerd',
            generated: 'Gegenereerd',
            actionRequired: 'Actie vereist',
            deviation: 'Afwijking gedetecteerd in herstel',
          }
        : {
            analyzed: 'Analyzed',
            generated: 'Generated',
            actionRequired: 'Action Required',
            deviation: 'Deviation detected in recovery',
          };

  const before: ModuleConfig[] = [
    { key: 'smartTriage', slug: 'smart-triage', span: 'lg:col-span-6', visual: <TriageVisual /> },
    { key: 'agenda', slug: 'agenda', span: 'lg:col-span-6', visual: <AgendaVisual /> },
    { key: 'preConsultation', slug: 'pre-consultation', span: 'lg:col-span-6', visual: <PreConsultationVisual analyzed={copy.analyzed} /> },
    { key: 'voiceReception', slug: 'voice-reception', span: 'lg:col-span-6', visual: <VoiceVisual /> },
  ];
  const during: ModuleConfig[] = [
    { key: 'scribe', slug: 'scribe', span: 'lg:col-span-6', visual: <ScribeVisual /> },
    { key: 'medication', slug: 'medication', span: 'lg:col-span-6', visual: <MedicationVisual /> },
  ];
  const after: ModuleConfig[] = [
    { key: 'documentGeneration', slug: 'document-generation', span: 'lg:col-span-5', visual: <DocumentVisual generated={copy.generated} /> },
    {
      key: 'smartFollowUp',
      slug: 'smart-follow-up',
      span: 'lg:col-span-7',
      visual: <FollowUpVisual actionRequired={copy.actionRequired} deviation={copy.deviation} />,
    },
  ];

  return (
    <section className="w-full relative pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <h2 className="text-[2.5rem] md:text-6xl lg:text-[4.5rem] font-semibold text-[#0B1B3D] tracking-[-0.045em] max-w-4xl leading-[1.02] text-balance">
            {t('title')}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-28">
          <Chapter number="01" label={t('beforeConsultation')} modules={before} />
          <Chapter number="02" label={t('duringConsultation')} modules={during} />
          <Chapter number="03" label={t('afterConsultation')} modules={after} />
        </div>
      </div>
    </section>
  );
}
