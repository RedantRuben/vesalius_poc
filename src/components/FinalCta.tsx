'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import FreeMonthForm from '@/components/forms/FreeMonthForm';
import { ORTHO_HOME, type SiteLocale } from '@/content/orthopedics';
import { useSpecialty } from '@/lib/specialty';

/** Anchor used by the pricing card ("1 month free") to jump here with the form open. */
export const FREE_MONTH_ANCHOR = 'free-month';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FinalCta() {
  const t = useTranslations('FinalCta');
  const locale = useLocale() as SiteLocale;
  const pathname = usePathname();
  const { isOrthopedics } = useSpecialty();
  const ortho = (ORTHO_HOME[locale] ?? ORTHO_HOME.en).finalCta;
  const [formOpen, setFormOpen] = useState(false);

  // Opened from elsewhere on the site via #free-month (e.g. the "Free" pricing card).
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${FREE_MONTH_ANCHOR}`) setFormOpen(true);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section id={FREE_MONTH_ANCHOR} className="w-full px-4 sm:px-6 py-12 md:py-20 scroll-mt-24">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[40px] bg-[#0B1B3D] px-6 py-20 md:py-32 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 60% at 50% 110%, rgba(6,172,193,0.35), transparent 70%)' }}
        />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden="true">
          {[
            { d: 'M -100,520 C 400,420 800,720 1540,520', color: '#5FD4E2', opacity: 0.35, delay: 0 },
            { d: 'M -100,620 C 500,720 900,470 1540,570', color: '#FF3366', opacity: 0.3, delay: 0.2 },
            { d: 'M -100,420 C 600,570 1000,470 1540,620', color: '#FFFFFF', opacity: 0.18, delay: 0.4 },
          ].map((line) => (
            <motion.path
              key={line.d}
              d={line.d}
              fill="none"
              stroke={line.color}
              strokeOpacity={line.opacity}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.6, ease: 'easeInOut', delay: line.delay }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative z-10 flex flex-col items-center"
        >
          <h2 className="text-[2.75rem] md:text-7xl lg:text-[5.5rem] font-semibold text-white tracking-[-0.05em] leading-[1] max-w-4xl text-balance">
            {t('title')}
          </h2>
          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/60 tracking-tight max-w-3xl text-balance">{isOrthopedics ? ortho.subtitle : t('subtitle')}</p>


          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {isOrthopedics ? (
              <>
                <button
                  type="button"
                  aria-expanded={formOpen}
                  onClick={() => setFormOpen((open) => !open)}
                  className="group px-8 py-4 rounded-full bg-white text-[#0B1B3D] font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  {ortho.primary}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <a
                  href="https://assistant.vesalius.ai/onboarding/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-white font-semibold ring-1 ring-white/25 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  {ortho.secondary}
                </a>
              </>
            ) : (
              <>
                <a
                  href="https://assistant.vesalius.ai/onboarding/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-full bg-white text-[#0B1B3D] font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  {t('primary')}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/demo"
                  className="px-8 py-4 rounded-full text-white font-semibold ring-1 ring-white/25 hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  {t('secondary')}
                </Link>
              </>
            )}
          </div>

          {isOrthopedics && (
            // Signed by the person who sets it up: a quiet line under the actions, not another block above them
            <figure className="mt-8 flex items-center gap-3 text-left">
              <Image src="/team/quinten.jpg" alt="Quinten Schietecatte" width={40} height={40} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/20 shrink-0" />
              <div className="text-[13px] md:text-sm leading-snug">
                <blockquote className="font-display italic text-white/85 text-[15px] md:text-base text-balance">“{ortho.personLine}”</blockquote>
                <figcaption className="text-white/45">
                  Quinten Schietecatte
                  <span className="hidden sm:inline"> · </span>
                  <span className="block sm:inline">{ortho.personRole}</span>
                </figcaption>
              </div>
            </figure>
          )}

          <AnimatePresence initial={false}>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full max-w-2xl overflow-hidden"
              >
                <div className="pt-8">
                  <FreeMonthForm sourcePage={pathname} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
