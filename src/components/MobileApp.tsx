'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const EASE = [0.16, 1, 0.3, 1] as const;

const APP_STORE_URL = 'https://apps.apple.com/nl/app/vesalius-ai/id6786656236';
const playStoreUrl = (locale: string) => `https://play.google.com/store/apps/details?id=ai.vesalius.app&hl=${locale}`;

const AppleLogo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.37 1.43c0 1.14-.5 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.2-2.98.81-.94 2.15-1.64 3.25-1.68.03.13.06.28.06.43Zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8C4 18.38 2.96 15.57 2.96 12.92c0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.22-1.01 3.9-1.01.62 0 2.89.06 4.38 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.95 4.45Z" />
  </svg>
);

const PlayLogo = () => (
  <svg width="20" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#00A0FF" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Z" />
    <path fill="#00D95F" d="M3.6 1.8c.4-.2.9-.2 1.4.1l11.9 6.8-3.1 3.3L3.6 1.8Z" />
    <path fill="#FF3A44" d="M3.6 22.2 13.8 12l3.1 3.3L5 22.1c-.5.3-1 .3-1.4.1Z" />
    <path fill="#FFD500" d="m16.9 8.7 3.4 1.9c1 .6 1 2.1 0 2.7l-3.4 1.9-3.1-3.2 3.1-3.3Z" />
  </svg>
);

function StoreButton({ href, logo, eyebrow, name }: { href: string; logo: React.ReactNode; eyebrow: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 h-14 pl-4 pr-6 rounded-2xl bg-black text-white hover:bg-[#1d1d1f] transition-colors"
    >
      {logo}
      <span className="flex flex-col leading-none text-left">
        <span className="text-[11px] text-white/75">{eyebrow}</span>
        <span className="text-lg font-semibold tracking-tight mt-0.5">{name}</span>
      </span>
    </a>
  );
}

type ScreenCopy = { title: string; patient: string; streaming: string; hint: string; stop: string; language: string };

/** Counts up from zero in the app's HH:MM:SS format. */
function useElapsed() {
  const reduceMotion = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const shown = reduceMotion ? 2 : seconds;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(Math.floor(shown / 3600))}:${pad(Math.floor(shown / 60) % 60)}:${pad(shown % 60)}`;
}

/** The app's recording orb: a glossy teal blob that slowly morphs while it listens. */
const RecordingBlob = () => (
  <div className="relative w-32 h-32">
    <div className="absolute -inset-8 rounded-full bg-[#06ACC1]/10 blur-2xl" aria-hidden="true" />
    <motion.div
      className="relative w-full h-full"
      style={{
        background: 'radial-gradient(circle at 36% 30%, #E6FDFF 0%, #5ED9E6 12%, #13B3C6 34%, #0A8BA3 62%, #0B4A63 100%)',
        boxShadow: '0 24px 40px -18px rgba(11,74,99,0.55)',
      }}
      animate={{
        borderRadius: [
          '52% 48% 46% 54% / 50% 44% 56% 50%',
          '44% 56% 58% 42% / 56% 50% 50% 44%',
          '56% 44% 40% 60% / 44% 58% 42% 56%',
          '52% 48% 46% 54% / 50% 44% 56% 50%',
        ],
        rotate: [0, 8, -6, 0],
        scale: [1, 1.04, 0.98, 1],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

/** Phone mockup of the Vesalius app's recording screen. */
function PhoneMockup({ copy }: { copy: ScreenCopy }) {
  const elapsed = useElapsed();

  return (
    <div className="relative w-[290px] h-[600px] rounded-[54px] bg-[#111] p-[10px] shadow-[0_60px_120px_-40px_rgba(11,27,61,0.55)]">
      <div className="relative w-full h-full rounded-[44px] bg-[#F5F7F9] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="relative flex items-center justify-between px-7 pt-4 pb-2 bg-white text-[13px] font-semibold text-black">
          <span className="tabular-nums">11:09</span>
          <span className="absolute left-1/2 top-3 -translate-x-1/2 w-[92px] h-[26px] rounded-full bg-black flex items-center justify-end pr-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          </span>
          <span className="flex items-center gap-1" aria-hidden="true">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" opacity="0.35" /><rect x="13" y="0" width="3" height="11" rx="1" opacity="0.35" /></svg>
            <span className="ml-1 px-1 rounded-[4px] bg-black text-white text-[10px] leading-[14px]">79</span>
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-3 pb-4 bg-white border-b border-slate-200">
          <div>
            <p className="text-xl font-medium text-[#1E2A44] leading-tight">{copy.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{copy.patient}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-400">
            {copy.language}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <RecordingBlob />
          <p className="mt-10 text-[2.5rem] font-light text-[#1E2A44] tabular-nums tracking-tight leading-none">{elapsed}</p>
          <span className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06ACC1]/10 text-[11px] font-semibold text-[#0FA5B7]">
            <span className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#2CC3D2]"
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </span>
            {copy.streaming}
          </span>
          <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">{copy.hint}</p>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 px-5 pt-4 pb-7">
          <span className="flex items-center justify-center gap-2 h-12 rounded-2xl border-2 border-[#FF1F1F] text-[#FF1F1F] text-sm font-semibold">
            <span className="w-4 h-4 rounded-[3px] border-2 border-current" aria-hidden="true" />
            {copy.stop}
          </span>
        </div>
      </div>
    </div>
  );
}

// Lock, globe, send: backed by the app's own recording screen (keeps recording, language picker, streams to Vesalius).
const POINT_ICONS = [
  'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z',
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18',
  'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z',
];

export default function MobileApp() {
  const t = useTranslations('MobileApp');
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={ref} className="relative w-full px-4 sm:px-6 py-12 md:py-20">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[36px] bg-white ring-1 ring-slate-200/70">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-6 px-8 md:px-14 lg:px-16 pt-14 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:pb-16 self-center"
          >
            <h2 className="text-[2.5rem] md:text-6xl font-semibold text-[#0B1B3D] tracking-[-0.045em] leading-[1.02] text-balance">{t('title')}</h2>
            <p className="mt-6 text-lg md:text-xl text-slate-500 leading-relaxed tracking-tight max-w-md">{t('subtitle')}</p>

            <ul className="mt-8 flex flex-col gap-3.5 max-w-md">
              {POINT_ICONS.map((icon, i) => (
                <li key={icon} className="flex items-center gap-3 text-[15px] text-[#0B1B3D]">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-[#06ACC1]/10 text-[#0597a9] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={icon} />
                    </svg>
                  </span>
                  {t(`points.${i}`)}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <StoreButton href={APP_STORE_URL} logo={<AppleLogo />} eyebrow={t('appStore')} name="App Store" />
              <StoreButton href={playStoreUrl(locale)} logo={<PlayLogo />} eyebrow={t('playStore')} name="Google Play" />
            </div>
          </motion.div>

          {/* The phone rises out of the card's bottom edge; a soft glow sits only behind it */}
          <div className="relative flex justify-center lg:justify-end lg:pr-6 self-end">
            <div
              aria-hidden="true"
              className="absolute left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 lg:translate-x-0 top-10 w-[460px] h-[460px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(6,172,193,0.16), rgba(6,172,193,0) 65%)' }}
            />
            <motion.div style={{ y: phoneY }} className="relative -mb-28">
              <PhoneMockup
                copy={{
                  title: t('screenTitle'),
                  patient: t('patient'),
                  streaming: t('streaming'),
                  hint: t('hint'),
                  stop: t('stop'),
                  language: locale.toUpperCase(),
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
