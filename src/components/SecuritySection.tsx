'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const EASE = [0.16, 1, 0.3, 1] as const;

const SHIELD = 'M 150 78 L 190 94 L 190 136 C 190 164 172 184 150 194 C 128 184 110 164 110 136 L 110 94 Z';

/** Shield that draws itself and locks, with encrypted data orbiting around it. */
const ShieldVisual = () => (
  <svg viewBox="0 0 300 280" className="w-full max-w-[360px] h-auto" aria-hidden="true">
    <defs>
      <radialGradient id="sec-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#06ACC1" stopOpacity="0.35" />
        <stop offset="1" stopColor="#06ACC1" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="150" cy="138" r="130" fill="url(#sec-glow)" />

    <g className="vh-spin-slow">
      <circle cx="150" cy="138" r="118" fill="none" stroke="#fff" strokeOpacity="0.12" strokeDasharray="2 8" />
      <circle cx="150" cy="20" r="4" fill="#06ACC1" />
      <circle cx="268" cy="138" r="3" fill="#fff" fillOpacity="0.6" />
    </g>
    <g className="vh-spin-reverse">
      <circle cx="150" cy="138" r="88" fill="none" stroke="#fff" strokeOpacity="0.18" />
      <rect x="57" y="133" width="10" height="10" rx="3" fill="#06ACC1" fillOpacity="0.8" />
      <rect x="228" y="100" width="8" height="8" rx="2.5" fill="#fff" fillOpacity="0.5" />
      <rect x="170" y="220" width="8" height="8" rx="2.5" fill="#fff" fillOpacity="0.35" />
    </g>

    <motion.path
      d={SHIELD}
      fill="#06ACC1"
      fillOpacity="0.12"
      stroke="#06ACC1"
      strokeWidth="2.5"
      strokeLinejoin="round"
      initial={{ pathLength: 0, fillOpacity: 0 }}
      whileInView={{ pathLength: 1, fillOpacity: 0.12 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
    />

    {/* Padlock: shackle drops closed once the shield is drawn */}
    <motion.path
      d="M 140 132 L 140 122 C 140 110 160 110 160 122 L 160 132"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ y: -8 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 400, damping: 14 }}
    />
    <rect x="133" y="130" width="34" height="28" rx="6" fill="#fff" />
    <circle cx="150" cy="142" r="3.5" fill="#0B1B3D" />
    <rect x="148.5" y="143" width="3" height="7" rx="1.5" fill="#0B1B3D" />
  </svg>
);

export default function SecuritySection() {
  const t = useTranslations('SecuritySection');

  return (
    <section className="w-full relative pt-4 md:pt-8 pb-12 md:pb-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative overflow-hidden flex flex-col md:flex-row items-center gap-10 lg:gap-16 bg-[#0B1B3D] rounded-[36px] p-8 md:p-12 lg:p-16"
        >
          <div className="w-full md:w-3/5 flex flex-col items-start text-left order-2 md:order-1">
            <h2 className="text-[2.25rem] md:text-5xl font-semibold text-white mb-6 tracking-[-0.035em] leading-[1.05] text-balance">
              {t('title')}
            </h2>

            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {t('description')}
            </p>

            <ul className="flex flex-col gap-3.5 mb-10">
              {['gdpr', 'access', 'audit'].map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
                  className="flex items-center gap-3 text-white font-medium"
                >
                  <span className="w-6 h-6 rounded-full bg-[#06ACC1]/20 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5FD4E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t(`points.${key}`)}
                </motion.li>
              ))}
            </ul>

            <Link
              href="/security"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0B1B3D] font-medium hover:bg-slate-100 transition-colors"
            >
              {t('cta')}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="w-full md:w-2/5 flex items-center justify-center order-1 md:order-2">
            <ShieldVisual />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
