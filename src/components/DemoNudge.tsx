'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { BOOKING_CLOSED_EVENT, BOOKING_OPENED_EVENT, openBooking, trackBooking } from '@/components/BookingDialog';
import { BOOKING_URL } from '@/lib/booking';
import { useSpecialty } from '@/lib/specialty';
import { hasAccountHint } from '@/lib/returning-user';

const CONSENT_EVENT = 'cookie-consent-updated';
const EASE = [0.16, 1, 0.3, 1] as const;
/** Only explicit dismissal of this message counts; the retired launcher used a different key. */
const DISMISSED_KEY = 'vesalius-demo-message-dismissed';

function read(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function subscribePreferences(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function canShowInvitation() {
  // Existing customers are past the demo stage
  if (hasAccountHint()) return false;
  if (!read('cookie-consent')) return false;
  // Local previews should work again after a refresh, even when a previous preview was dismissed.
  if (process.env.NODE_ENV === 'development') return true;
  try { return window.sessionStorage.getItem(DISMISSED_KEY) !== '1'; } catch { return true; }
}

/** The original typing indicator, followed by Quinten's personal invitation. */
function PersonalMessage({ message, reducedMotion }: { message: string; reducedMotion: boolean }) {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setTyping(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative mt-4 min-h-[76px] rounded-2xl rounded-tl-md bg-[#F3F6F9] px-4 py-3.5 text-[15px] leading-relaxed text-[#0B1B3D]" aria-live="polite">
      <motion.p aria-hidden={typing} initial={{ opacity: 0 }} animate={{ opacity: typing ? 0 : 1 }} transition={{ duration: reducedMotion ? 0.15 : 0.3 }}>{message}</motion.p>
      {typing && (
        <span className="absolute left-4 top-3.5 flex h-5 items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ opacity: reducedMotion ? 0.6 : [0.3, 1, 0.3] }} transition={reducedMotion ? { duration: 0 } : { duration: 1, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </span>
      )}
    </div>
  );
}

/** Product pages show the invitation immediately; homepages wait until the hero is out of view. */
export default function DemoNudge() {
  const t = useTranslations('DemoNudge');
  const reducedMotion = Boolean(useReducedMotion());
  const pathname = usePathname();
  const isProductPage = pathname.includes('/product/');
  const { menuOpen, promptPending } = useSpecialty();
  const eligible = useSyncExternalStore(subscribePreferences, canShowInvitation, () => false);
  const [closed, setClosed] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [revealedOn, setRevealedOn] = useState('');
  const shownOn = useRef('');

  useEffect(() => {
    const onOpen = () => setBookingOpen(true);
    const onClose = () => setBookingOpen(false);
    window.addEventListener(BOOKING_OPENED_EVENT, onOpen);
    window.addEventListener(BOOKING_CLOSED_EVENT, onClose);
    return () => {
      window.removeEventListener(BOOKING_OPENED_EVENT, onOpen);
      window.removeEventListener(BOOKING_CLOSED_EVENT, onClose);
    };
  }, []);

  useEffect(() => {
    if (isProductPage) return;
    const hero = document.querySelector('[data-demo-hero]');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.boundingClientRect.bottom > 0) return;
      setRevealedOn(pathname);
      observer.disconnect();
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isProductPage, pathname]);

  const placementAllowed = isProductPage || revealedOn === pathname;
  const visible = Boolean(BOOKING_URL) && eligible && !closed && !bookingOpen && !menuOpen && !promptPending && placementAllowed;

  useEffect(() => {
    if (!visible || shownOn.current === pathname) return;
    shownOn.current = pathname;
    trackBooking('Nudge shown', pathname);
  }, [visible, pathname]);

  const dismiss = () => {
    trackBooking('Nudge closed', pathname);
    setClosed(true);
    try { window.sessionStorage.setItem(DISMISSED_KEY, '1'); } catch { /* Keep it dismissed for this page when storage is unavailable. */ }
  };

  return (
    <AnimatePresence>
      {visible && <motion.aside
        key="demo-message"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reducedMotion ? 0 : 8, transition: { duration: reducedMotion ? 0.1 : 0.18 } }}
        transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: EASE }}
        aria-label={t('label')} className={`fixed left-4 right-4 z-[90] overflow-y-auto rounded-[24px] bg-white p-5 ring-1 ring-slate-200/80 shadow-[0_24px_60px_-20px_rgba(11,27,61,0.35)] sm:left-auto sm:right-6 sm:w-[360px] ${isProductPage ? 'bottom-24 max-h-[calc(100svh-7rem)] xl:bottom-6 xl:max-h-[calc(100svh-2rem)]' : 'bottom-4 sm:bottom-6 max-h-[calc(100svh-2rem)]'}`}>
      <div className="flex items-center gap-3 pr-8">
        <Image src="/team/quinten.jpg" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
        <p className="text-sm leading-snug">
          <span className="block font-semibold text-[#0B1B3D]">Quinten Schietecatte</span>
          <span className="text-slate-500">Vesalius.ai</span>
        </p>
      </div>
      <button type="button" onClick={dismiss} aria-label={t('close')} className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B1B3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1]">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <PersonalMessage message={t('message')} reducedMotion={reducedMotion} />
      <button type="button" onClick={() => openBooking('Nudge')} aria-haspopup="dialog" className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#13285a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1] focus-visible:ring-offset-2">
        {t('cta')}
        <span aria-hidden="true">→</span>
      </button>
      </motion.aside>}
    </AnimatePresence>
  );
}
