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
      <g fill="rgba(255,255,255,0.2)">{stars}</g>
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

type Quote = { quote: string; name: string; role: string };

function QuoteCards({ items }: { items: Quote[] }) {
  const t = useTranslations('Testimonials');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-center mb-14 md:mb-20 flex flex-col items-center"
      >
        <h2 className="text-[2.5rem] md:text-6xl font-semibold text-[#0B1B3D] tracking-[-0.045em] max-w-3xl leading-[1.02] text-balance">
          {t('title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 md:mb-24">
        {items.map((item, index) => (
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.8, ease: EASE }}
            className="bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-10 flex flex-col justify-between h-full transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(11,27,61,0.3)]"
          >
            <blockquote className="text-[#0B1B3D] text-lg md:text-xl leading-snug tracking-tight mb-10">
              <span className="block font-display italic text-6xl text-[#06ACC1] leading-none h-8 mb-2" aria-hidden="true">&ldquo;</span>
              {item.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3.5 pt-6 border-t border-slate-100">
              <span className="w-11 h-11 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center font-semibold" aria-hidden="true">
                {item.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold text-[#0B1B3D] tracking-tight">{item.name}</span>
                <span className="block text-sm text-slate-500">{item.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </>
  );
}

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const testimonials = [0, 1, 2].map((index) => ({
    quote: t(`items.${index}.quote`),
    name: t(`items.${index}.name`),
    role: t(`items.${index}.role`),
  }));

  const stats = [
    { value: <CountUp to={83} suffix="%" />, label: t('adoptionRate') },
    { value: <CountUp to={8} suffix="x" />, label: t('roi') },
    {
      value: (
        <>
          19<span className="text-2xl md:text-3xl text-white/60">m</span> 56<span className="text-2xl md:text-3xl text-white/60">s</span>
        </>
      ),
      label: t('completionTime'),
    },
    { value: <CountUp to={13} prefix="+" suffix="%" />, label: t('perceivedQuality') },
  ];

  return (
    <section className="w-full relative pt-16 md:pt-24 pb-4 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <QuoteCards items={testimonials} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative rounded-[36px] overflow-hidden min-h-[520px] flex items-center bg-[#0B1B3D]"
        >
          <div className="absolute inset-0">
            <Image src="/doctor.png" alt="" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D] via-[#0B1B3D]/85 to-[#0B1B3D]/10" />
          </div>

          <div className="relative z-10 w-full md:w-2/3 p-8 sm:p-10 md:p-16">
            <h3 className="text-2xl md:text-[2rem] text-white font-semibold mb-12 tracking-[-0.025em] max-w-xl leading-tight text-balance">
              {t('statsTitle')}.
            </h3>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-white/60">{stat.label}</dt>
                  <dd className="text-4xl md:text-6xl font-semibold text-white tracking-[-0.04em] tabular-nums mb-1.5">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 mt-12 pt-8 border-t border-white/15">
              {[
                { score: 4.1, label: t('patientRating') },
                { score: 4.7, label: t('physiciansRating') },
              ].map((rating) => (
                <div key={rating.label}>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-3xl font-semibold text-white tabular-nums">{rating.score.toFixed(1)}</span>
                    <span className="text-white/50 text-sm">/5</span>
                  </div>
                  <StarRating score={rating.score} label={`${rating.score} / 5`} />
                  <p className="text-sm text-white/60 mt-2">{rating.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
