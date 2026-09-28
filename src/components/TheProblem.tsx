'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

// Trig results can differ in the last digit between server and browser; round to avoid hydration mismatches.
const round = (n: number) => Math.round(n * 100) / 100;

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const match = value.match(/^([±+\-]?\s*)(\d+)(.*)$/);
    if (!inView || !nodeRef.current || !match || reduceMotion) return;

    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const startTime = performance.now();
    const duration = 1400;
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${Math.round(eased * target)}${suffix}`;
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return <span ref={nodeRef}>{value}</span>;
}

/** Clock face: the cyan arc sweeps the hours lost to administration each day. */
function ClockDial({ hours, inView }: { hours: number; inView: boolean }) {
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const fraction = hours / 12;

  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 md:w-52 md:h-52 shrink-0" aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="#fff" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const inner = i % 3 === 0 ? 62 : 66;
        return (
          <line
            key={i}
            x1={round(100 + Math.sin(angle) * inner)}
            y1={round(100 - Math.cos(angle) * inner)}
            x2={round(100 + Math.sin(angle) * 71)}
            y2={round(100 - Math.cos(angle) * 71)}
            stroke="#0B1B3D"
            strokeOpacity={i % 3 === 0 ? 0.4 : 0.15}
            strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="100" cy="100" r={radius} fill="none" stroke="#EEF2F6" strokeWidth="10" />
      <motion.circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#06ACC1"
        strokeWidth="10"
        strokeLinecap="round"
        transform="rotate(-90 100 100)"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: circumference * (1 - fraction) } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
      />
      <motion.g
        initial={{ rotate: 0 }}
        animate={inView ? { rotate: fraction * 360 } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
      >
        {/* Invisible disc keeps the group's box centred on the dial so it rotates around the hub */}
        <circle cx="100" cy="100" r="96" fill="none" />
        <line x1="100" y1="100" x2="100" y2="46" stroke="#0B1B3D" strokeWidth="4" strokeLinecap="round" />
      </motion.g>
      <circle cx="100" cy="100" r="6" fill="#0B1B3D" />
      <circle cx="100" cy="100" r="2" fill="#fff" />
    </svg>
  );
}

/** 100 dots, `percent` of them filled: a percentage you can see at a glance. */
function DotGrid({ percent, inView }: { percent: number; inView: boolean }) {
  return (
    <div className="grid grid-cols-10 gap-[5px] w-fit shrink-0" aria-hidden="true">
      {Array.from({ length: 100 }, (_, i) => (
        <motion.span
          key={i}
          className="w-[9px] h-[9px] rounded-full"
          initial={{ backgroundColor: '#E2E8F0' }}
          animate={inView && i < percent ? { backgroundColor: '#0B1B3D' } : undefined}
          transition={{ duration: 0.25, delay: 0.3 + i * 0.012 }}
        />
      ))}
    </div>
  );
}

export default function TheProblem() {
  const t = useTranslations('TheProblem');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  const cards = ['burnout', 'stress', 'data'];
  const hours = parseInt(t('cards.time.stat').replace(/[^\d]/g, ''), 10) || 4;

  return (
    <section ref={ref} className="w-full py-20 md:py-28">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <h2 className="text-[2.25rem] md:text-5xl lg:text-[3.5rem] font-semibold text-[#0B1B3D] tracking-[-0.04em] leading-[1.05] text-balance">
              {t('title')}
            </h2>
            <p className="mt-6 text-slate-500 text-lg md:text-xl leading-snug tracking-tight max-w-xl">{t('subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="flex items-center gap-6 md:gap-8"
          >
            <ClockDial hours={hours} inView={inView} />
            <div>
              <p className="text-5xl md:text-6xl font-semibold text-[#06ACC1] tracking-[-0.05em] tabular-nums whitespace-nowrap">
                <AnimatedCounter value={t('cards.time.stat')} inView={inView} />
              </p>
              <p className="mt-2 text-base md:text-lg font-semibold text-[#0B1B3D] tracking-tight max-w-[12rem] leading-snug">{t('cards.time.title')}</p>
            </div>
          </motion.div>
        </div>

        <div ref={statsRef} className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 border-t border-slate-200">
          {cards.map((id, index) => {
            const stat = t(`cards.${id}.stat`);
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
                className={`flex items-center gap-6 py-10 md:py-12 ${index > 0 ? 'border-t md:border-t-0 md:border-l border-slate-200 md:pl-10' : ''} ${index < 2 ? 'md:pr-10' : ''}`}
              >
                <DotGrid percent={parseInt(stat.replace(/[^\d]/g, ''), 10) || 0} inView={statsInView} />
                <div>
                  <p className="text-4xl md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.05em] tabular-nums">
                    <AnimatedCounter value={stat} inView={statsInView} />
                  </p>
                  <p className="mt-1.5 text-[15px] text-slate-500 leading-snug">{t(`cards.${id}.title`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
