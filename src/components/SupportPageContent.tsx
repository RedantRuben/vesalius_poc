'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import SupportTicketForm from '@/components/forms/SupportTicketForm';
import { SUPPORT_BOOKING_URL, bookingEmbedUrl } from '@/lib/booking';

interface SupportPageContentProps {
  sourcePage?: string;
}

type SupportMode = 'ticket' | 'call';

const TicketIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5h16v10H8l-4 4V5Z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);

const CallIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="13" height="12" rx="2.5" />
    <path d="m16 10.5 5-3v9l-5-3" />
  </svg>
);

/** Support page: two ways in. A ticket for something that is broken or unclear, a call for help finding your way in the platform. */
export default function SupportPageContent({
  sourcePage = '/support',
}: SupportPageContentProps) {
  const t = useTranslations('SupportPage');
  const locale = useLocale();
  const [mode, setMode] = useState<SupportMode>('ticket');
  const embed = bookingEmbedUrl(SUPPORT_BOOKING_URL, locale);

  const options: Array<{ value: SupportMode; icon: React.ReactNode; title: string; body: string }> = [
    { value: 'ticket', icon: <TicketIcon />, title: t('ticketOption'), body: t('ticketOptionBody') },
  ];
  if (SUPPORT_BOOKING_URL) {
    options.push({ value: 'call', icon: <CallIcon />, title: t('callOption'), body: t('callOptionBody') });
  }

  return (
    <section className="px-4 sm:px-6 pt-6 pb-12 md:pt-10 md:pb-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.04em] leading-[1.05] text-balance">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed text-pretty">{t('subtitle')}</p>

          <div role="tablist" aria-label={t('modeLabel')} className="mt-8 flex flex-col gap-2">
            {options.map((option) => {
              const active = mode === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  id={`support-tab-${option.value}`}
                  aria-selected={active}
                  aria-controls="support-panel"
                  onClick={() => {
                    setMode(option.value);
                    // Stacked layout: the panel sits below the options, so bring it into view
                    if (window.matchMedia('(max-width: 1023px)').matches) {
                      document.getElementById('support-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`flex items-start gap-4 text-left rounded-2xl px-4 py-4 transition-colors ${
                    active ? 'bg-white ring-1 ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      active ? 'bg-[#0B1B3D] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {option.icon}
                  </span>
                  <span>
                    <span className={`block font-semibold ${active ? 'text-[#0B1B3D]' : 'text-slate-700'}`}>{option.title}</span>
                    <span className="block mt-0.5 text-[15px] leading-snug text-slate-500">{option.body}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 px-4 text-[15px] text-slate-500 leading-relaxed">
            {t('emailPrompt')}{' '}
            <a href="mailto:help@vesalius.health" className="font-medium text-[#0B1B3D] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0B1B3D]">
              help@vesalius.health
            </a>
          </p>
        </div>

        <div
          id="support-panel"
          role="tabpanel"
          aria-labelledby={`support-tab-${mode}`}
          className="lg:col-span-8 scroll-mt-28 bg-white rounded-[28px] ring-1 ring-slate-200"
        >
          {mode === 'ticket' ? (
            <div className="p-6 sm:p-8 md:p-10">
              <h2 className="text-xl font-semibold text-[#0B1B3D] tracking-tight">{t('ticketTitle')}</h2>
              <p className="mt-1 text-slate-500">{t('ticketBody')}</p>
              <div className="mt-8">
                <SupportTicketForm sourcePage={sourcePage} />
              </div>
            </div>
          ) : (
            <div>
              <div className="p-6 sm:p-8 md:p-10 md:pb-8 flex flex-col sm:flex-row gap-6 sm:items-start sm:justify-between border-b border-slate-100">
                <div className="max-w-md">
                  <h2 className="text-xl font-semibold text-[#0B1B3D] tracking-tight">{t('callTitle')}</h2>
                  <p className="mt-1 text-slate-500 leading-relaxed">{t('callBody')}</p>
                  <ul className="mt-5 space-y-2 text-[15px] text-slate-600">
                    {(['callPoint1', 'callPoint2', 'callPoint3'] as const).map((key) => (
                      <li key={key} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 shrink-0 rounded-full bg-[#06ACC1]" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:text-right shrink-0">
                  <Image src="/team/quinten.jpg" alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover ring-4 ring-[#EBF6F8]" />
                  <p className="text-sm text-slate-500">
                    <span className="block font-semibold text-[#0B1B3D]">Quinten Schietecatte</span>
                    {t('callMeta')}
                  </p>
                </div>
              </div>

              {embed ? (
                <iframe
                  src={embed}
                  title={t('callFrameTitle')}
                  className="block w-full h-[680px] rounded-b-[28px]"
                />
              ) : (
                <div className="p-6 sm:p-8 md:p-10">
                  <a
                    href={SUPPORT_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] transition-colors"
                  >
                    {t('callOpen')}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
