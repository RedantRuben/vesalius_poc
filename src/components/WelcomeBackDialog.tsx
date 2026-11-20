'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { APP_URL, hasAccountHint } from '@/lib/returning-user';

/** "Don't show me again": kept for good in this browser. */
const HIDDEN_KEY = 'vesalius-welcome-back-hidden';
/** Shown at most once per visit, so a customer reading the site is not asked again on every homepage view. */
const SHOWN_KEY = 'vesalius-welcome-back-shown';

type MatomoWindow = Window & { _paq?: unknown[]; __vesaliusMatomoLoaded?: boolean };

/** Matomo event, only when the visitor allowed analytics (Matomo is loaded only then). */
function track(action: string) {
  const w = window as MatomoWindow;
  if (w.__vesaliusMatomoLoaded) w._paq?.push(['trackEvent', 'Welcome back', action]);
}

function storageGet(storage: () => Storage, key: string) {
  try { return storage().getItem(key); } catch { return null; }
}

function storageSet(storage: () => Storage, key: string, value: string) {
  try { storage().setItem(key, value); } catch { /* Blocked storage: it only applies to this page view. */ }
}

/**
 * Homepage only: a doctor who already has an account usually came here to get into the platform.
 * The app marks those browsers with a cookie on login; this dialog then offers the way in, once per visit.
 */
export default function WelcomeBackDialog() {
  const t = useTranslations('WelcomeBack');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!hasAccountHint()) return;
    if (storageGet(() => localStorage, HIDDEN_KEY) || storageGet(() => sessionStorage, SHOWN_KEY)) return;

    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      storageSet(() => sessionStorage, SHOWN_KEY, '1');
      dialog.showModal();
      track('Shown');
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  const close = (action: string) => {
    track(action);
    dialogRef.current?.close();
  };

  const hideForGood = () => {
    storageSet(() => localStorage, HIDDEN_KEY, '1');
    close('Hidden for good');
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="welcome-back-title"
      aria-describedby="welcome-back-body"
      onCancel={() => track('Closed')}
      onClick={(event) => { if (event.target === event.currentTarget) close('Closed'); }}
      className="m-auto p-0 w-[min(440px,calc(100vw-2rem))] max-w-none rounded-[28px] bg-white shadow-[0_32px_80px_-24px_rgba(11,27,61,0.45)] ring-1 ring-slate-200/80 backdrop:bg-[#0B1B3D]/35 backdrop:backdrop-blur-[2px] transition-[opacity,translate] duration-300 ease-out starting:open:opacity-0 starting:open:translate-y-3"
    >
      <div className="relative px-6 pt-7 pb-6 sm:px-8 sm:pt-8 text-center">
        <button
          type="button"
          onClick={() => close('Closed')}
          aria-label={t('close')}
          className="absolute right-4 top-4 w-9 h-9 rounded-full text-slate-400 hover:bg-slate-100 hover:text-[#0B1B3D] flex items-center justify-center transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <Image src="/vesalius-logo.svg" alt="" width={48} height={48} className="mx-auto w-12 h-12" />

        <h2 id="welcome-back-title" className="mt-5 text-2xl font-semibold text-[#0B1B3D] tracking-[-0.03em] text-balance">
          {t('title')}
        </h2>
        <p id="welcome-back-body" className="mt-2 text-slate-500 leading-relaxed text-pretty">
          {t('body')}
        </p>

        <a
          href={APP_URL}
          onClick={() => track('Opened platform')}
          autoFocus
          className="group mt-7 w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#06ACC1]/30"
        >
          {t('cta')}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <button
          type="button"
          onClick={() => close('Stayed on website')}
          className="mt-2 w-full px-7 py-3 rounded-full text-[15px] font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0B1B3D] transition-colors"
        >
          {t('stay')}
        </button>

        <button
          type="button"
          onClick={hideForGood}
          className="mt-4 text-sm text-slate-400 underline underline-offset-4 decoration-slate-300 hover:text-slate-600 hover:decoration-slate-500"
        >
          {t('dontShowAgain')}
        </button>
      </div>
    </dialog>
  );
}
