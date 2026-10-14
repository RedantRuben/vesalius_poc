'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import DemoRequestForm from '@/components/forms/DemoRequestForm';
import { BOOKING_URL, bookingEmbedUrl } from '@/lib/booking';

export default function DemoPageContent() {
  const t = useTranslations('DemoPage');
  const embed = bookingEmbedUrl(BOOKING_URL, useLocale());
  // The calendar is the page; the request form is the fallback for people who would rather write first.
  const [formOpen, setFormOpen] = useState(!BOOKING_URL);

  const toggle = BOOKING_URL ? (
    <p className="text-slate-500 text-[15px]">
      {formOpen ? null : <>{t('formPrompt')} </>}
      <button
        type="button"
        onClick={() => setFormOpen((open) => !open)}
        className="font-semibold text-[#0B1B3D] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0B1B3D]"
      >
        {formOpen ? t('backToCalendar') : t('formToggle')}
      </button>
    </p>
  ) : null;

  return (
    <section className="px-4 pb-12 md:pb-16">
      {/* Same frame as the navbar pill: card edges on the pill, text on the logo and CTA */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6 mb-5 px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#0B1B3D] tracking-[-0.03em]">{t('title')}</h1>
            <p className="mt-1.5 text-slate-500">{t('subtitle')}</p>
          </div>
          {toggle}
        </div>

        {formOpen ? (
          <div className="bg-white rounded-[28px] ring-1 ring-slate-200 p-6 md:p-10">
            <DemoRequestForm sourcePage="/demo" />
          </div>
        ) : embed ? (
          <iframe
            src={embed}
            title={t('bookingFrameTitle')}
            className="block w-full h-[calc(100svh-18.5rem)] md:h-[calc(100svh-15.5rem)] min-h-[520px] rounded-[28px] bg-white ring-1 ring-slate-200"
          />
        ) : (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] transition-colors"
          >
            {t('bookingOpen')}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>
    </section>
  );
}
