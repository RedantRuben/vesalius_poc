'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { openBooking, preloadBooking } from '@/components/BookingDialog';
import { BOOKING_URL } from '@/lib/booking';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage booking block: after the doctors and the results, the next step is seeing it in your own practice.
 * The real Google booking page opens in a dialog, so the visitor never leaves the page.
 */
export default function BookDemo() {
  const t = useTranslations('BookDemo');

  if (!BOOKING_URL) return null;

  return (
    <section className="w-full py-12 md:py-16">
      {/* Same frame as the testimonials and security cards: max-w-7xl with the padding inside */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          onViewportEnter={preloadBooking}
          transition={{ duration: 0.8, ease: EASE }}
          className="bg-white rounded-[32px] md:rounded-[40px] ring-1 ring-slate-200/70 px-6 py-12 md:px-12 md:py-16 flex flex-col items-center text-center"
        >
          <Image src="/team/quinten.jpg" alt="" width={56} height={56} className="w-14 h-14 rounded-full object-cover ring-4 ring-[#EBF6F8]" />
          <p className="mt-3 text-sm text-slate-500">
            <span className="font-semibold text-[#0B1B3D]">Quinten Schietecatte</span> · {t('role')}
          </p>

          <h2 className="mt-6 text-[2.25rem] md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.045em] leading-[1.04] text-balance max-w-3xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed text-balance max-w-xl">{t('body')}</p>

          <button
            type="button"
            onClick={() => openBooking('Homepage block')}
            aria-haspopup="dialog"
            className="group mt-8 whitespace-nowrap px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] transition-colors flex items-center gap-2"
          >
            {t('cta')}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <p className="mt-3 text-sm text-slate-500">{t('meta')}</p>
        </motion.div>
      </div>
    </section>
  );
}
