'use client';

import { useTranslations } from 'next-intl';

import SupportTicketForm from '@/components/forms/SupportTicketForm';

export default function SupportPageContent() {
  const t = useTranslations('SupportPage');

  return (
    <section className="px-4 sm:px-6 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4 block">
            {t('eyebrow')}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#0B1B3D] tracking-tight mb-5">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 glass-panel bg-white/70 p-8 md:p-12 rounded-[32px]">
            <SupportTicketForm sourcePage="/support" />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <article className="glass-panel bg-white/70 rounded-[32px] p-8">
              <h2 className="text-[#0B1B3D] text-xl font-bold tracking-tight mb-4">{t('responseTitle')}</h2>
              <p className="text-slate-600 leading-relaxed">{t('responseBody')}</p>
            </article>

            <article className="glass-panel bg-white/70 rounded-[32px] p-8">
              <h2 className="text-[#0B1B3D] text-xl font-bold tracking-tight mb-4">{t('attachmentTitle')}</h2>
              <p className="text-slate-600 leading-relaxed">{t('attachmentBody')}</p>
            </article>

            <article className="glass-panel bg-[#0B1B3D] rounded-[32px] p-8 text-white">
              <h2 className="text-xl font-bold tracking-tight mb-4">{t('urgentTitle')}</h2>
              <p className="text-slate-200 leading-relaxed">{t('urgentBody')}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
