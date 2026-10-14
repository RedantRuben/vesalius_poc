'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { BOOKING_OPENED_EVENT, openBooking, trackBooking } from '@/components/BookingDialog';
import { BOOKING_URL } from '@/lib/booking';
import { useSpecialty } from '@/lib/specialty';

/** Local dev only: the message shows right away and comes back after closing, so it is easy to review. */
const DEV = process.env.NODE_ENV === 'development';
/** Visible time on the site (across pages, this visit) before Quinten's message appears. */
const SHOW_AFTER_MS = DEV ? 1_000 : 45_000;
/** Once closed or used, it stays away this long (in dev: comes back after a few seconds). */
const QUIET_FOR_MS = 14 * 24 * 60 * 60 * 1000;
const DEV_RETURN_MS = 3_000;

/** `?demo-nudge` on any URL shows the message straight away, e.g. to show it on the test site. */
const FORCE_PARAM = 'demo-nudge';
const TIME_KEY = 'vesalius-demo-nudge-ms';
const DONE_KEY = 'vesalius-demo-nudge-done';
const EASE = [0.16, 1, 0.3, 1] as const;

function read(storage: () => Storage, key: string) {
  try { return storage().getItem(key); } catch { return null; }
}
function write(storage: () => Storage, key: string, value: string) {
  try { storage().setItem(key, value); } catch { /* storage unavailable: the message simply shows less reliably */ }
}
const local = () => window.localStorage;
const session = () => window.sessionStorage;

function recentlyDone() {
  if (DEV) return false;
  const at = Number(read(local, DONE_KEY));
  return Number.isFinite(at) && at > 0 && Date.now() - at < QUIET_FOR_MS;
}

/** A short message from Quinten, bottom right, after a visitor has spent a while on the site. */
export default function DemoNudge() {
  const t = useTranslations('DemoNudge');
  const pathname = usePathname();
  const { menuOpen } = useSpecialty();
  // Forced via the URL: due from the start and not held back by an earlier close
  const [forced] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has(FORCE_PARAM));
  const [due, setDue] = useState(forced);
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(true);
  const snoozedUntil = useRef(0);
  // Closed or used on this page: not again (outside dev), even when forced via the URL
  const [closed, setClosed] = useState(false);

  const blocked = pathname === '/demo' || menuOpen;

  // Count visible seconds; stop counting once it is due
  useEffect(() => {
    if (!BOOKING_URL || due || recentlyDone()) return;
    const tick = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const spent = Number(read(session, TIME_KEY)) + 1000;
      write(session, TIME_KEY, String(spent));
      if (spent >= SHOW_AFTER_MS) setDue(true);
    }, 1000);
    return () => window.clearInterval(tick);
  }, [due]);

  // Show when due, but never on top of the cookie banner, the discipline picker or the booking page
  useEffect(() => {
    if (!due || blocked || visible || closed) return;
    const check = window.setInterval(() => {
      if (!forced && recentlyDone()) { window.clearInterval(check); return; }
      if (!read(local, 'cookie-consent') || Date.now() < snoozedUntil.current) return;
      window.clearInterval(check);
      setTyping(true);
      setVisible(true);
      trackBooking('Nudge shown', pathname);
      window.setTimeout(() => setTyping(false), 1100);
    }, 500);
    return () => window.clearInterval(check);
  }, [due, blocked, visible, closed, forced, pathname]);

  // Booking from anywhere else also counts as done
  useEffect(() => {
    const done = () => {
      write(local, DONE_KEY, String(Date.now()));
      if (DEV) snoozedUntil.current = Date.now() + DEV_RETURN_MS;
      else setClosed(true);
      setVisible(false);
    };
    window.addEventListener(BOOKING_OPENED_EVENT, done);
    return () => window.removeEventListener(BOOKING_OPENED_EVENT, done);
  }, []);

  const dismiss = () => {
    trackBooking('Nudge closed', pathname);
    write(local, DONE_KEY, String(Date.now()));
    if (DEV) snoozedUntil.current = Date.now() + DEV_RETURN_MS;
    else setClosed(true);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && !blocked && (
        <motion.aside
          aria-label={t('label')}
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed z-[90] left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px] rounded-[24px] bg-white ring-1 ring-slate-200/80 shadow-[0_24px_60px_-20px_rgba(11,27,61,0.35)] p-5"
        >
          <div className="flex items-center gap-3 pr-8">
            <Image src="/team/quinten.jpg" alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover shrink-0" />
            <p className="text-sm leading-snug">
              <span className="block font-semibold text-[#0B1B3D]">Quinten Schietecatte</span>
              <span className="text-slate-500">Vesalius.ai</span>
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t('close')}
            className="absolute top-4 right-4 w-7 h-7 rounded-full text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="mt-4 rounded-2xl rounded-tl-md bg-[#F3F6F9] px-4 py-3.5 text-[15px] leading-relaxed text-[#0B1B3D] min-h-[76px]">
            {typing ? (
              <span className="flex items-center gap-1 h-5" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </span>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {t('message')}
              </motion.p>
            )}
          </div>

          <button
            type="button"
            onClick={() => openBooking('Nudge')}
            className="group mt-4 w-full px-5 py-3 rounded-full bg-[#0B1B3D] text-white text-sm font-semibold hover:bg-[#13285a] transition-colors flex items-center justify-center gap-2"
          >
            {t('cta')}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
