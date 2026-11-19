'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { SPECIALTY_UI, type SiteLocale } from '@/content/orthopedics';
import { openBooking } from '@/components/BookingDialog';
import { TAILORED, useSpecialty } from '@/lib/specialty';

/** "Cardiologie" reads as "cardiologie" mid-sentence; abbreviations such as NKO stay as they are. */
const inSentence = (label: string) => (label === label.toUpperCase() ? label : label.toLowerCase());

function useCopy() {
  const locale = useLocale() as SiteLocale;
  return SPECIALTY_UI[locale] ?? SPECIALTY_UI.en;
}

/** Opens the discipline dialog once per visit, independently of the cookie decision. */
export default function SpecialtyPrompt() {
  const { promptPending, menuOpen, openMenu } = useSpecialty();

  useEffect(() => {
    if (!promptPending || menuOpen) return;
    const id = setTimeout(openMenu, 1400);
    return () => clearTimeout(id);
  }, [promptPending, menuOpen, openMenu]);

  return <SpecialtyPanel />;
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

/** A single native modal keeps focus and pointer interaction inside the chooser at every screen size. */
function SpecialtyPanel() {
  const { specialty, menuOpen, notice, choose, closeMenu } = useSpecialty();
  const copy = useCopy();
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [query, setQuery] = useState('');
  const normalise = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase(locale);
  const offered = [...TAILORED]
    .sort((a, b) => copy.specialties[a].localeCompare(copy.specialties[b], locale))
    .filter(id => normalise(copy.specialties[id]).includes(normalise(query.trim())));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!menuOpen) {
      dialog.close();
      return;
    }
    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    // Avoid opening the software keyboard automatically on a phone.
    if (window.matchMedia('(min-width: 640px)').matches) searchRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = document.querySelector('dialog[open]') && !dialog.open ? 'hidden' : previousOverflow;
    };
  }, [menuOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); closeMenu(); }}
      onClose={() => { setQuery(''); closeMenu(); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}
      className="m-auto h-[min(680px,calc(100svh-2rem))] w-[min(640px,calc(100vw-2rem))] max-h-none max-w-none overflow-hidden rounded-[22px] bg-white p-0 text-left text-[#0B1B3D] shadow-[0_24px_80px_-20px_rgba(11,27,61,0.35)] backdrop:bg-[#0B1B3D]/25 backdrop:backdrop-blur-[4px]"
    >
      <div className="flex h-full flex-col">
        <div className="shrink-0 px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="text-[20px] font-semibold tracking-tight leading-snug">{copy.promptTitle}</h2>
            <button
              type="button" onClick={closeMenu} aria-label={copy.close}
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B1B3D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <p id={descriptionId} className="mt-1 text-[14px] leading-snug text-slate-500">{copy.promptBody}</p>
          {!notice && (
            <div className="relative my-5">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
              <input
                ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)}
                aria-label={copy.search} placeholder={copy.search}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-3 text-[14px] outline-none placeholder:text-slate-400 focus:border-[#06ACC1] focus:ring-2 focus:ring-[#06ACC1]/15"
              />
            </div>
          )}
        </div>

        {notice ? (
          <div className="px-5 py-5 sm:px-6">
            <p className="text-[14px] leading-snug text-slate-600">{notice === 'other' ? copy.untailoredOther : copy.untailored(inSentence(copy.specialties[notice]))}</p>
            <button type="button" onClick={closeMenu} className="mt-4 w-full rounded-full bg-[#0B1B3D] py-2.5 text-[14px] font-medium text-white hover:bg-[#13285a]">{copy.ok}</button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3 sm:px-6" role="group" aria-label={copy.switchLabel}>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {offered.map(id => (
                  <button
                    key={id} type="button" aria-pressed={specialty === id} onClick={() => choose(id)}
                    className={`flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#06ACC1] ${specialty === id ? 'bg-[#E8EEF5] text-[#0B1B3D]' : 'bg-slate-50 text-[#0B1B3D] hover:bg-slate-100'}`}
                  >
                    <span>{copy.specialties[id]}</span>
                    {specialty === id && <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>}
                  </button>
                ))}
              </div>
              {offered.length === 0 && <p role="status" className="py-6 text-center text-[14px] text-slate-500">{copy.noResults}</p>}
            </div>
            <div className="shrink-0 border-t border-slate-100 px-5 py-4 sm:px-6">
              <button type="button" aria-pressed={specialty === 'general'} onClick={() => choose('general')} className="rounded-full bg-[#0B1B3D] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#13285a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06ACC1] focus-visible:ring-offset-2">{copy.browse}</button>
              <p className="mt-3 text-[12px] leading-snug text-slate-500">
                {copy.more.before}
                <button type="button" onClick={() => { dialogRef.current?.close(); closeMenu(); openBooking('Discipline picker'); }} className="font-medium text-[#0B1B3D] underline decoration-slate-300 underline-offset-4 hover:decoration-[#0B1B3D]">{copy.more.link}</button>
                {copy.more.after}
              </p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
