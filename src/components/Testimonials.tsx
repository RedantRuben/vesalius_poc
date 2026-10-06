'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

/** Five stars filled proportionally to the score, so 4.1 reads as 4.1, not 4. */
const StarRating = ({ score, label }: { score: number; label: string }) => {
  const id = `stars-${String(score).replace('.', '-')}`;
  const stars = [0, 1, 2, 3, 4].map((i) => <path key={i} d={STAR_PATH} transform={`translate(${i * 24} 0)`} />);

  return (
    <svg width="112" height="20" viewBox="0 0 120 22" role="img" aria-label={label}>
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={(score / 5) * 118} height="22" />
        </clipPath>
      </defs>
      <g fill="#E2E8F0">{stars}</g>
      <g fill="#FBBF24" clipPath={`url(#${id})`}>{stars}</g>
    </svg>
  );
};

/** Counts up to a numeric value once visible; leaves the final text untouched. */
function CountUp({ to, decimals = 0, prefix = '', suffix = '' }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = `${prefix}${(to * eased).toFixed(decimals)}${suffix}`;
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, to, decimals, prefix, suffix]);

  return <span ref={ref}>{final}</span>;
}

type DoctorId = 'boedts' | 'ortho' | 'byn' | 'rasschaert';

interface Doctor {
  id: DoctorId;
  /** Null for the doctor who prefers to stay anonymous; their specialty is shown instead. */
  name: string | null;
  initials?: string;
  /** Portrait in /public/testimonials, e.g. '/testimonials/boedts.jpg'. Initials are shown until one is added. */
  photo: string | null;
  timeSaved?: 'moreThan5' | 'twoToFive';
  barelyEdits?: boolean;
  recommends: number;
}

const DOCTORS: Record<DoctorId, Doctor> = {
  boedts: { id: 'boedts', name: 'Dr. Michael Boedts', initials: 'MB', photo: '/testimonials/boedts.jpg', timeSaved: 'moreThan5', recommends: 10 },
  ortho: { id: 'ortho', name: null, photo: null, timeSaved: 'twoToFive', recommends: 10 },
  byn: { id: 'byn', name: 'Dr. Pieter Byn', initials: 'PB', photo: '/testimonials/byn.jpg', timeSaved: 'twoToFive', barelyEdits: true, recommends: 9 },
  rasschaert: { id: 'rasschaert', name: 'Dr. Ricky Rasschaert', initials: 'RR', photo: '/testimonials/rasschaert.jpg', recommends: 9 },
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** Portrait, initials monogram, or (for the anonymous doctor) a stethoscope icon. */
function DoctorAvatar({ doctor, size = 48, dark = false }: { doctor: Doctor; size?: number; dark?: boolean }) {
  if (doctor.photo) {
    return (
      <span className="relative shrink-0 rounded-full overflow-hidden bg-slate-100 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_rgba(11,27,61,0.1)]" style={{ width: size, height: size }}>
        <Image src={doctor.photo} alt={doctor.name ?? ''} fill sizes={`${size * 2}px`} className="object-cover grayscale" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 rounded-full flex items-center justify-center font-semibold tracking-tight ${dark ? 'bg-white/10 text-white' : 'bg-[#06ACC1]/10 text-[#0597a9]'}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {doctor.initials ?? (
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v6a6 6 0 0 0 12 0V3M6 3H4M18 3h2M12 15v2a4 4 0 0 0 8 0v-2" />
          <circle cx="20" cy="13" r="2" />
        </svg>
      )}
    </span>
  );
}

/** Ten segments, `score` of them filling in: "recommends 9/10" at a glance. */
function RecommendMeter({ score, label, dark = false }: { score: number; label: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2 min-w-[150px]">
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-sm ${dark ? 'text-white/60' : 'text-slate-500'}`}>{label}</span>
        <span className={`text-sm font-semibold tabular-nums ${dark ? 'text-white' : 'text-[#0B1B3D]'}`}>{score}/10</span>
      </div>
      <div className="flex gap-1" role="img" aria-label={`${label} ${score}/10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${dark ? 'bg-white/15' : 'bg-slate-200'}`}
            initial={false}
            whileInView={i < score ? { backgroundColor: dark ? '#5FD4E2' : '#06ACC1' } : undefined}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

/** Plain-text facts under a hairline, the same footer on every card. */
function Facts({ items, dark = false }: { items: { strong: string; rest: string }[]; dark?: boolean }) {
  return (
    <ul className={`flex flex-col gap-1 text-[14px] ${dark ? 'text-white/60' : 'text-slate-500'}`}>
      {items.map((item) => (
        <li key={item.strong + item.rest}>
          <span className={`font-semibold ${dark ? 'text-white' : 'text-[#0B1B3D]'}`}>{item.strong}</span> {item.rest}
        </li>
      ))}
    </ul>
  );
}

function CardFooter({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mt-auto pt-6 border-t flex flex-wrap items-end justify-between gap-6 ${dark ? 'border-white/10' : 'border-slate-100'}`}>{children}</div>
  );
}

function Attribution({ doctor, name, role, dark = false, size = 48 }: { doctor: Doctor; name: string; role: string; dark?: boolean; size?: number }) {
  return (
    <figcaption className="flex items-center gap-3.5">
      <DoctorAvatar doctor={doctor} dark={dark} size={size} />
      <span>
        <span className={`block font-semibold tracking-tight ${dark ? 'text-white' : 'text-[#0B1B3D]'}`}>{name}</span>
        <span className={`block text-sm ${dark ? 'text-white/60' : 'text-slate-500'}`}>{role}</span>
      </span>
    </figcaption>
  );
}

function DoctorWall() {
  const t = useTranslations('Testimonials');
  const name = (d: Doctor) => d.name ?? t(`doctors.${d.id}.name`);
  const { boedts, ortho, byn, rasschaert } = DOCTORS;

  return (
    <>
      <motion.div {...reveal()} className="text-center mb-14 md:mb-20 flex flex-col items-center">
        <h2 className="text-[2.5rem] md:text-6xl font-semibold text-[#0B1B3D] tracking-[-0.045em] max-w-3xl leading-[1.02] text-balance">{t('title')}</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* 1 · one-liner, top left */}
        <motion.figure {...reveal()} className="lg:col-span-5 bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-10 flex flex-col gap-8">
          <blockquote className="font-display italic text-6xl md:text-7xl text-[#06ACC1] leading-none tracking-[-0.01em]">{t('doctors.byn.quote')}</blockquote>
          <Attribution doctor={byn} name={name(byn)} role={t('doctors.byn.role')} />
          <CardFooter>
            <Facts
              items={[
                { strong: t(`metrics.${byn.timeSaved}`), rest: t('metrics.timeSaved') },
                ...(byn.barelyEdits ? [{ strong: '', rest: t('metrics.barelyEdits') }] : []),
              ]}
            />
            <RecommendMeter score={byn.recommends} label={t('metrics.recommends')} />
          </CardFooter>
        </motion.figure>

        {/* 2 · the longest, most specific quote, in the large card on the right */}
        <motion.figure {...reveal(0.1)} className="lg:col-span-7 lg:row-span-2 bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-12 flex flex-col gap-10">
          <blockquote className="text-[1.6rem] md:text-[2.15rem] xl:text-[2.5rem] font-semibold text-[#0B1B3D] tracking-[-0.03em] leading-[1.16] text-balance">
            {t('doctors.boedts.quote')}
          </blockquote>
          <Attribution doctor={boedts} name={name(boedts)} role={t('doctors.boedts.role')} size={64} />
          <CardFooter>
            <div>
              <p className="text-5xl md:text-6xl font-semibold text-[#0B1B3D] tracking-[-0.05em] tabular-nums leading-none">
                5+<span className="text-2xl md:text-3xl text-slate-400 ml-1">min</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">{t('metrics.timeSaved')}</p>
            </div>
            <RecommendMeter score={boedts.recommends} label={t('metrics.recommends')} />
          </CardFooter>
        </motion.figure>

        {/* 3 · one-liner under card 1 */}
        <motion.figure {...reveal(0.2)} className="lg:col-span-5 bg-[#0B1B3D] rounded-[28px] p-8 md:p-10 flex flex-col gap-8">
          <blockquote className="font-display italic text-6xl md:text-7xl text-white leading-none tracking-[-0.01em]">{t('doctors.ortho.quote')}</blockquote>
          <Attribution doctor={ortho} name={name(ortho)} role={t('doctors.ortho.role')} dark />
          <CardFooter dark>
            <Facts dark items={[{ strong: t(`metrics.${ortho.timeSaved}`), rest: t('metrics.timeSaved') }]} />
            <RecommendMeter score={ortho.recommends} label={t('metrics.recommends')} dark />
          </CardFooter>
        </motion.figure>

        {/* A wide strip to close the wall */}
        <motion.figure {...reveal(0.1)} className="lg:col-span-12 bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-8 md:gap-16">
          <blockquote className="text-xl md:text-2xl font-semibold text-[#0B1B3D] tracking-[-0.025em] leading-snug max-w-3xl">{t('doctors.rasschaert.quote')}</blockquote>
          <div className="flex flex-wrap items-center gap-8 md:gap-10 md:pl-10 md:border-l border-slate-100">
            <Attribution doctor={rasschaert} name={name(rasschaert)} role={t('doctors.rasschaert.role')} />
            <RecommendMeter score={rasschaert.recommends} label={t('metrics.recommends')} />
          </div>
        </motion.figure>
      </div>
    </>
  );
}

export default function Testimonials() {
  const t = useTranslations('Testimonials');

  const stats = [
    { value: <CountUp to={83} suffix="%" />, label: t('adoptionRate') },
    { value: <CountUp to={8} suffix="x" />, label: t('roi') },
    {
      value: (
        <>
          19<span className="text-2xl md:text-3xl text-slate-400">m</span> 56<span className="text-2xl md:text-3xl text-slate-400">s</span>
        </>
      ),
      label: t('completionTime'),
    },
    { value: <CountUp to={13} prefix="+" suffix="%" />, label: t('perceivedQuality') },
  ];

  return (
    <section className="w-full relative pt-6 md:pt-10 pb-4 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <DoctorWall />

        {/* Results: the closing row of the testimonial wall */}
        <motion.div {...reveal()} className="bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-10">
          <h3 className="text-lg md:text-xl font-semibold text-[#0B1B3D] tracking-tight mb-8">{t('statsTitle')}.</h3>
          <dl className="grid grid-cols-2 lg:grid-cols-6 gap-y-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end lg:border-r lg:border-slate-100 lg:pr-6 lg:mr-6">
                <dt className="text-sm text-slate-500">{stat.label}</dt>
                <dd className="text-[2rem] md:text-[2.75rem] font-semibold text-[#0B1B3D] tracking-[-0.04em] tabular-nums whitespace-nowrap leading-none mb-2">{stat.value}</dd>
              </div>
            ))}
            {[
              { score: 4.1, label: t('patientRating') },
              { score: 4.7, label: t('physiciansRating') },
            ].map((rating, i) => (
              <div key={rating.label} className={`flex flex-col ${i === 0 ? 'lg:border-r lg:border-slate-100 lg:pr-6 lg:mr-6' : ''}`}>
                <dd className="flex items-baseline gap-1 mb-2 leading-none">
                  <span className="text-[2rem] md:text-[2.75rem] font-semibold text-[#0B1B3D] tracking-[-0.04em] tabular-nums">{rating.score.toFixed(1)}</span>
                  <span className="text-slate-400 text-sm">/5</span>
                </dd>
                <StarRating score={rating.score} label={`${rating.score} / 5`} />
                <dt className="text-sm text-slate-500 mt-1.5">{rating.label}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
