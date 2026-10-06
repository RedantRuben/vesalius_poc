'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  className?: string;
}

/** Cycles through indices while respecting reduced motion. */
function useCycle(length: number, intervalMs: number) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, reduceMotion]);

  return index;
}

const SOURCE_PHRASES = [
  { lang: 'ES', text: 'Hola, ¿cómo estás?' },
  { lang: 'TR', text: 'Merhaba, nasılsın?' },
  { lang: 'AR', text: 'مرحبا، كيف حالك؟' },
  { lang: 'UK', text: 'Привіт, як справи?' },
  { lang: 'PL', text: 'Cześć, jak się masz?' },
];

const LanguageVisual = ({ targetText, targetLang }: { targetText: string; targetLang: string }) => {
  const index = useCycle(SOURCE_PHRASES.length, 2600);
  const phrase = SOURCE_PHRASES[index];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end gap-3 pb-2">
      <div className="relative h-12 w-full flex justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={phrase.lang}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute -translate-x-10 md:-translate-x-16 bg-white ring-1 ring-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2.5"
          >
            <span className="text-[10px] font-semibold text-slate-400 tabular-nums">{phrase.lang}</span>
            <span className="text-slate-600 text-sm" dir="auto">{phrase.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <svg width="40" height="22" viewBox="0 0 40 22" aria-hidden="true" className="translate-x-2">
        <path d="M 4 2 C 4 14, 20 18, 34 18" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 4" />
        <path d="M 30 14 L 35 18 L 30 22" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div className="translate-x-10 md:translate-x-16 bg-[#06ACC1] rounded-2xl rounded-br-sm px-4 py-3 shadow-[0_16px_30px_-12px_rgba(6,172,193,0.6)] flex items-center gap-2.5">
        <span className="text-[10px] font-semibold text-white/70">{targetLang}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={phrase.lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="text-white text-sm font-medium"
          >
            {targetText}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

/** A record that writes itself, gets timestamped and sealed. */
const LiabilityVisual = () => (
  <div className="relative w-full h-full flex items-end justify-center">
    <svg viewBox="0 0 220 150" className="w-[220px] h-[150px]" aria-hidden="true">
      <rect x="40" y="6" width="140" height="150" rx="14" fill="#fff" stroke="#E2E8F0" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <motion.circle
            cx="58"
            cy={34 + i * 26}
            r="4"
            fill={i === 3 ? '#06ACC1' : '#CBD5E1'}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.25, type: 'spring', bounce: 0.5 }}
          />
          {i < 3 && <line x1="58" y1={40 + i * 26} x2="58" y2={54 + i * 26} stroke="#E2E8F0" strokeWidth="1.5" />}
          <motion.line
            x1="72"
            y1={34 + i * 26}
            x2={[150, 132, 160, 120][i]}
            y2={34 + i * 26}
            stroke={i === 3 ? '#0B1B3D' : '#CBD5E1'}
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.6, ease: 'easeOut' }}
          />
        </g>
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, type: 'spring', bounce: 0.35 }}
      >
        <circle cx="170" cy="120" r="24" fill="#fff" stroke="#06ACC1" strokeWidth="2" />
        <circle cx="170" cy="120" r="18" fill="none" stroke="#06ACC1" strokeWidth="1" strokeDasharray="2 3" />
        <path d="M 170 108 L 180 112 L 180 120 C 180 126 175 130 170 132 C 165 130 160 126 160 120 L 160 112 Z" fill="#06ACC1" fillOpacity="0.15" stroke="#06ACC1" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 165.5 120 L 169 123.5 L 175 117" fill="none" stroke="#0597a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  </div>
);

/** A heart with a live ECG trace running through it. */
const CareVisual = () => (
  <div className="relative w-full h-full flex items-end justify-center">
    <svg viewBox="0 0 260 140" className="w-[260px] h-[140px] overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="care-heart-clip">
          <path d="M130 128 L 76 76 C 58 58 62 28 88 22 C 106 18 120 28 130 42 C 140 28 154 18 172 22 C 198 28 202 58 184 76 Z" />
        </clipPath>
      </defs>
      <motion.path
        d="M130 128 L 76 76 C 58 58 62 28 88 22 C 106 18 120 28 130 42 C 140 28 154 18 172 22 C 198 28 202 58 184 76 Z"
        fill="#06ACC1"
        fillOpacity="0.08"
        stroke="#06ACC1"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        animate={{ scale: [1, 1.04, 1, 1.03, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, times: [0, 0.1, 0.25, 0.35, 1] }}
      />
      <path d="M 0 80 L 96 80 L 106 64 L 116 96 L 126 40 L 138 112 L 148 72 L 156 80 L 260 80" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M 0 80 L 96 80 L 106 64 L 116 96 L 126 40 L 138 112 L 148 72 L 156 80 L 260 80"
        pathLength={1000}
        fill="none"
        stroke="#0B1B3D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="vh-pulse-travel"
        style={{ animationDuration: '2.4s', strokeDasharray: '220 780' }}
      />
      <g clipPath="url(#care-heart-clip)">
        <path
          d="M 0 80 L 96 80 L 106 64 L 116 96 L 126 40 L 138 112 L 148 72 L 156 80 L 260 80"
          pathLength={1000}
          fill="none"
          stroke="#06ACC1"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="vh-pulse-travel"
          style={{ animationDuration: '2.4s', strokeDasharray: '220 780' }}
        />
      </g>
    </svg>
  </div>
);

/** Inconsistent fields snap into a clean, verified record. */
const AccuracyVisual = () => {
  const rows = [
    { w: 110, offset: 18, delay: 0.2 },
    { w: 150, offset: -14, delay: 0.35 },
    { w: 90, offset: 24, delay: 0.5 },
    { w: 130, offset: -10, delay: 0.65 },
  ];

  return (
    <div className="relative w-full h-full flex items-end justify-center">
      <div className="w-full max-w-[300px] bg-white rounded-2xl ring-1 ring-slate-200 p-4 flex flex-col gap-2.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-2 w-11 rounded-full bg-slate-200" />
            <motion.div
              className="h-2 rounded-full"
              style={{ width: row.w }}
              initial={{ x: row.offset, rotate: row.offset > 0 ? 3 : -3, backgroundColor: '#FECDD3' }}
              whileInView={{ x: 0, rotate: 0, backgroundColor: '#0B1B3D' }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + row.delay, type: 'spring', bounce: 0.3 }}
            />
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="ml-auto shrink-0"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + row.delay, type: 'spring' }}
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="8" fill="#10B981" fillOpacity="0.15" />
              <path d="M 4.5 8.2 L 7 10.5 L 11.5 5.8" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function WhyChooseVesalius() {
  const t = useTranslations('WhyChooseVesalius');
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? { translationTarget: 'Bonjour, comment allez-vous ?', targetLang: 'FR' }
      : locale === 'nl'
        ? { translationTarget: 'Hallo, hoe gaat het met u?', targetLang: 'NL' }
        : { translationTarget: 'Hello, how are you?', targetLang: 'EN' };

  const features: FeatureItem[] = [
    {
      id: 'language',
      title: t('features.language.title'),
      description: t('features.language.description'),
      visual: <LanguageVisual targetText={copy.translationTarget} targetLang={copy.targetLang} />,
      className: 'lg:col-span-7',
    },
    {
      id: 'liability',
      title: t('features.liability.title'),
      description: t('features.liability.description'),
      visual: <LiabilityVisual />,
      className: 'lg:col-span-5',
    },
    {
      id: 'care',
      title: t('features.care.title'),
      description: t('features.care.description'),
      visual: <CareVisual />,
      className: 'lg:col-span-5',
    },
    {
      id: 'accuracy',
      title: t('features.accuracy.title'),
      description: t('features.accuracy.description'),
      visual: <AccuracyVisual />,
      className: 'lg:col-span-7',
    },
  ];

  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-14 md:mb-20 flex flex-col items-center text-center"
        >
          <h2 className="text-[2.5rem] md:text-6xl lg:text-[4.5rem] font-semibold text-[#0B1B3D] tracking-[-0.045em] max-w-5xl leading-[1.02] text-balance">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.1 }}
              className={`bg-white rounded-[28px] p-8 md:p-10 relative overflow-hidden h-[380px] md:h-[400px] ring-1 ring-slate-200/70 flex flex-col ${feature.className}`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-[1.75rem] font-semibold text-[#0B1B3D] mb-2 tracking-[-0.025em]">{feature.title}</h3>
                <p className="text-slate-500 max-w-md text-[15px] md:text-base leading-relaxed">{feature.description}</p>
              </div>
              <div className="relative flex-1 mt-6">{feature.visual}</div>
            </motion.article>
          ))}

          {/* Fifth card, full width: the reason behind all of the above */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-12 bg-white rounded-[28px] p-8 md:p-12 ring-1 ring-slate-200/70 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-12 md:items-center"
          >
            <h3 className="text-3xl md:text-[2.75rem] font-semibold text-[#0B1B3D] tracking-[-0.035em] leading-[1.05]">{t('features.caregiver.title')}</h3>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed tracking-tight">{t('features.caregiver.description')}</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
