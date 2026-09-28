'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

const ICONS = [
  // Intake chat
  <path key="chat" d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />,
  // Triage flag
  <path key="flag" d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  // Scribe mic
  <g key="mic"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></g>,
  // Document
  <g key="doc"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></g>,
  // Follow-up pulse
  <path key="pulse" d="M3 12h4l2-5 4 10 2-5h6" />,
];

export default function Journey() {
  const t = useTranslations('Journey');
  const steps = ICONS.map((icon, i) => ({
    icon,
    day: t(`steps.${i}.day`),
    title: t(`steps.${i}.title`),
    part: t(`steps.${i}.part`),
  }));

  return (
    <section className="w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-[2.5rem] md:text-6xl font-semibold text-[#0B1B3D] tracking-[-0.045em] leading-[1.02]">{t('title')}</h2>
          <p className="mt-5 text-lg md:text-xl text-slate-500 tracking-tight">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline rail (desktop): draws across once in view */}
          <div className="hidden md:block absolute left-[10%] right-[10%] top-7 h-px bg-slate-200" aria-hidden="true">
            <motion.div
              className="h-full bg-[#06ACC1] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.3 }}
                className="relative flex md:flex-col items-start md:items-center md:text-center gap-5 md:gap-0"
              >
                <span className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center text-[#0B1B3D] md:mb-6 shadow-[0_10px_24px_-12px_rgba(11,27,61,0.35)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {step.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-medium text-[#0597a9] mb-1.5">{step.day}</p>
                  <h3 className="text-lg font-semibold text-[#0B1B3D] tracking-tight leading-snug md:max-w-[14rem] md:mx-auto text-balance">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">
                    {t('yourPart')}: <span className="font-semibold text-[#0B1B3D]">{step.part}</span>
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
