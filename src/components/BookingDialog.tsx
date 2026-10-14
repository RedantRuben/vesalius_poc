'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { BOOKING_URL, bookingEmbedUrl } from '@/lib/booking';

const OPEN_EVENT = 'vesalius:book-demo';
const PRELOAD_EVENT = 'vesalius:book-demo-preload';
/** Fired when the dialog actually opens, e.g. so Quinten's message knows the visitor already booked. */
export const BOOKING_OPENED_EVENT = 'vesalius:book-demo-opened';

type MatomoWindow = Window & { _paq?: unknown[]; __vesaliusMatomoLoaded?: boolean };

/** Matomo event for the booking funnel; only sent when the visitor allowed analytics (Matomo is loaded only then). */
export function trackBooking(action: string, source: string) {
  const w = window as MatomoWindow;
  if (w.__vesaliusMatomoLoaded) w._paq?.push(['trackEvent', 'Demo booking', action, source]);
}

/** Opens the demo booking dialog; `source` says which button it came from, for analytics. */
export function openBooking(source: string) {
  trackBooking('Calendar opened', source);
  if (!bookingEmbedUrl(BOOKING_URL, 'en')) {
    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    return;
  }
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Starts loading Google's booking page ahead of a likely click (hover, or the booking block coming into view). */
export function preloadBooking() {
  window.dispatchEvent(new Event(PRELOAD_EVENT));
}

/** Quinten's Google calendar in a dialog over the current page; mounted once in the locale layout. */
export default function BookingDialog() {
  const t = useTranslations('BookDemo');
  const embed = bookingEmbedUrl(BOOKING_URL, useLocale());
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Only load Google's page once someone shows intent
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const open = () => {
      setLoaded(true);
      if (!dialog.open) dialog.showModal();
      window.dispatchEvent(new Event(BOOKING_OPENED_EVENT));
    };
    const preload = () => setLoaded(true);
    // Keep the page behind the dialog still while it is open
    const observer = new MutationObserver(() => {
      document.documentElement.style.overflow = dialog.open ? 'hidden' : '';
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener(PRELOAD_EVENT, preload);
    return () => {
      observer.disconnect();
      document.documentElement.style.overflow = '';
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener(PRELOAD_EVENT, preload);
    };
  }, []);

  if (!embed) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={t('dialogTitle')}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      className="pointer-events-auto m-auto p-0 w-[min(1120px,calc(100vw-2rem))] h-[min(860px,calc(100svh-2rem))] max-w-none max-h-none rounded-[28px] bg-white shadow-2xl backdrop:bg-[#0B1B3D]/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
          <p className="text-lg font-semibold text-[#0B1B3D] tracking-tight">{t('dialogTitle')}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t('close')}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0B1B3D] flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        {loaded && <iframe src={embed} title={t('dialogTitle')} className="flex-1 w-full" />}
      </div>
    </dialog>
  );
}
