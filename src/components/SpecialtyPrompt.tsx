'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { SPECIALTY_UI, type SiteLocale } from '@/content/orthopedics';
import { SPECIALTY_IDS, askedThisVisit, useSpecialty } from '@/lib/specialty';

const COOKIE_EVENT = 'cookie-consent-updated';
/** Elements that belong to the chooser; a press anywhere else closes it. */
const MENU_ATTR = 'data-specialty-menu';

/** "Cardiologie" reads as "cardiologie" mid-sentence; abbreviations such as NKO stay as they are. */
const inSentence = (label: string) => (label === label.toUpperCase() ? label : label.toLowerCase());

function cookieChoiceMade() {
  try {
    return Boolean(window.localStorage.getItem('cookie-consent'));
  } catch {
    return true;
  }
}

function useCopy() {
  const locale = useLocale() as SiteLocale;
  return SPECIALTY_UI[locale] ?? SPECIALTY_UI.en;
}

/**
 * Headless controller, mounted once in the layout: opens the navbar panel by itself on a first visit (homepage and
 * module pages, once per visit, after the cookie banner), and closes it on a press outside or Escape.
 */
export default function SpecialtyPrompt() {
  const { specialty, ready, menuOpen, openMenu, closeMenu } = useSpecialty();
  const pathname = usePathname();
  const onTargetPage = pathname === '/' || pathname.startsWith('/product/');
  const [cookieDone, setCookieDone] = useState(false);

  useEffect(() => {
    const update = () => setCookieDone(cookieChoiceMade());
    update();
    window.addEventListener(COOKIE_EVENT, update);
    return () => window.removeEventListener(COOKIE_EVENT, update);
  }, []);

  useEffect(() => {
    if (!ready || specialty !== null || !cookieDone || !onTargetPage || askedThisVisit()) return;
    const id = setTimeout(openMenu, 1400);
    return () => clearTimeout(id);
  }, [ready, specialty, cookieDone, onTargetPage, openMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest(`[${MENU_ATTR}]`)) closeMenu();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, closeMenu]);

  return null;
}

/** The small "?" badge shown until the visitor has made any choice. */
export function QuestionDot({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute w-4 h-4 rounded-full bg-[#06ACC1] text-white text-[10px] font-bold leading-none flex items-center justify-center ring-2 ring-white ${className}`}
    >
      ?
    </span>
  );
}

/** "Specialiteit" pill in the navbar; opens the panel. */
export function SpecialtyPill({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  const { specialty, menuOpen, openMenu, closeMenu } = useSpecialty();
  const copy = useCopy();
  const label = specialty === null || specialty === 'general' ? copy.switchLabel : copy.specialties[specialty];

  return (
    <button
      type="button"
      {...{ [MENU_ATTR]: '' }}
      aria-haspopup="dialog"
      aria-expanded={menuOpen}
      onClick={onClick ?? (() => (menuOpen ? closeMenu() : openMenu()))}
      className={`relative inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 pl-3.5 pr-3 py-2 text-[13px] font-medium text-[#0B1B3D] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1] ${className}`}
    >
      {label}
      <svg className={`text-slate-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
      {specialty === null && <QuestionDot className="-top-1 -right-1" />}
    </button>
  );
}

/**
 * The chooser itself, attached to the navigation: under the pill on desktop (`pill`), or under the whole bar on
 * smaller screens (`bar`), so it reads as part of the menu rather than a popup over the page.
 */
export function SpecialtyPanel({ anchor, className = '' }: { anchor: 'pill' | 'bar'; className?: string }) {
  const { specialty, menuOpen, notice, choose, closeMenu } = useSpecialty();
  const copy = useCopy();
  const position = anchor === 'pill' ? 'right-0 w-[400px] origin-top-right' : 'left-2 right-2 sm:left-auto sm:w-[400px] origin-top';

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          {...{ [MENU_ATTR]: '' }}
          role="dialog"
          aria-label={copy.promptTitle}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          className={`absolute top-full mt-3 z-50 rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_24px_48px_-20px_rgba(11,27,61,0.35)] p-5 text-left ${position} ${className}`}
        >
          {anchor === 'pill' && <span aria-hidden="true" className="absolute -top-[7px] right-10 w-3 h-3 rotate-45 bg-white border-l border-t border-slate-200" />}

          <div className="flex items-start justify-between gap-3">
            <p className="text-[17px] font-semibold text-[#0B1B3D] tracking-tight leading-snug">{copy.promptTitle}</p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close"
              className="shrink-0 -mr-1.5 -mt-1 w-8 h-8 rounded-full text-slate-400 hover:text-[#0B1B3D] hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {notice ? (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <p className="mt-1 text-[14px] text-slate-600 leading-snug">
                {notice === 'other' ? copy.untailoredOther : copy.untailored(inSentence(copy.specialties[notice]))}
              </p>
              <button type="button" onClick={closeMenu} className="mt-4 w-full rounded-full bg-[#0B1B3D] text-white text-[14px] font-medium py-2.5 hover:bg-[#13285a] transition-colors">
                {copy.ok}
              </button>
            </motion.div>
          ) : (
            <>
              <p className="mt-0.5 text-[14px] text-slate-500 leading-snug">{copy.promptBody}</p>
              <div className="mt-3 -mx-1 flex flex-wrap gap-1.5 max-h-[52vh] overflow-y-auto p-1">
                {SPECIALTY_IDS.map((id) => {
                  const selected = specialty === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(id)}
                      className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition active:scale-[0.98] ${
                        selected ? 'bg-[#0B1B3D] text-white' : 'ring-1 ring-slate-200 text-[#0B1B3D] hover:ring-[#0B1B3D] hover:bg-slate-50'
                      }`}
                    >
                      {copy.specialties[id]}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => choose('general')}
                className="mt-3 w-full rounded-full text-slate-500 text-[13px] font-medium py-2 hover:text-[#0B1B3D] hover:bg-slate-50 transition-colors"
              >
                {copy.browse}
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
