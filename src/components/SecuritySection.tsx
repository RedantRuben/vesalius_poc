'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const EASE = [0.16, 1, 0.3, 1] as const;

// One icon per existing point: encryption, access control, transparent data handling.
const POINT_ICONS: Record<string, string> = {
  gdpr: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z',
  access: 'M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3ZM9.5 12l2 2 3.5-4',
  audit: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
};

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
          className="relative overflow-hidden flex flex-col md:flex-row md:items-center gap-10 lg:gap-20 bg-[#0B1B3D] rounded-[36px] p-8 md:p-12 lg:p-16"
        >
          <div className="w-full md:w-3/5 flex flex-col items-start text-left order-1">
            <h2 className="text-[2.25rem] md:text-5xl font-semibold text-white mb-6 tracking-[-0.035em] leading-[1.05] text-balance">
              {t('title')}
            </h2>

            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              {t('description')}
            </p>

            <Link
              href="/security"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0B1B3D] font-medium hover:bg-slate-100 transition-colors"
            >
              {t('cta')}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <ul className="w-full md:w-2/5 flex flex-col order-2 divide-y divide-white/10 border-y border-white/10">
            {['gdpr', 'access', 'audit'].map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE }}
                className="flex items-center gap-4 py-6 text-white text-lg font-medium"
              >
                <span className="w-11 h-11 rounded-full bg-white/[0.08] flex items-center justify-center shrink-0 text-[#5FD4E2]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={POINT_ICONS[key]} />
                  </svg>
                </span>
                {t(`points.${key}`)}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
