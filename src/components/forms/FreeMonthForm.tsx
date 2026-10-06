'use client';

import { useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import TurnstileWidget from '@/components/forms/TurnstileWidget';
import { FREE_MONTH_FORM, SPECIALTY_UI, type SiteLocale } from '@/content/orthopedics';
import {
  FORM_HONEYPOT_FIELD,
  FORM_SUBMITTED_AT_FIELD,
  FORM_TURNSTILE_TOKEN_FIELD,
  getTurnstileSiteKey,
} from '@/lib/forms/antispam';
import type { FieldErrors, FormErrorResponse, FormSuccessResponse } from '@/lib/forms/types';
import { SPECIALTY_IDS, useSpecialty } from '@/lib/specialty';

const field =
  'w-full rounded-xl bg-white px-4 py-3 text-[15px] text-[#0B1B3D] ring-1 ring-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#06ACC1] transition-shadow';

type State = { name: string; email: string; phone: string; specialty: string; focus: string; organisation: string; remarks: string };

/**
 * "Free month" request. Sent through the existing demo-request endpoint (same recipient and spam protection);
 * the extra fields are folded into the message so sales receives everything in one email.
 */
export default function FreeMonthForm({ sourcePage }: { sourcePage: string }) {
  const locale = useLocale() as SiteLocale;
  const c = FREE_MONTH_FORM[locale] ?? FREE_MONTH_FORM.en;
  const shared = useTranslations('SharedForm');
  const { specialty } = useSpecialty();
  const labels = (SPECIALTY_UI[locale] ?? SPECIALTY_UI.en).specialties;
  const idPrefix = useId();
  const submittedAtRef = useRef(Date.now());
  const turnstileEnabled = Boolean(getTurnstileSiteKey());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [honeypot, setHoneypot] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>({
    name: '',
    email: '',
    phone: '',
    // Prefilled with the specialty chosen on the site
    specialty: specialty && specialty !== 'general' ? labels[specialty] : '',
    focus: '',
    organisation: '',
    remarks: '',
  });

  const update = (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setState((current) => ({ ...current, [key]: event.target.value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setFieldErrors({});
    if (turnstileEnabled && !turnstileToken) {
      setError(shared('turnstileRequired'));
      return;
    }
    setBusy(true);

    const message = [
      'Aanvraag gratis maand (website)',
      `${c.specialty}: ${state.specialty || '-'}`,
      `${c.focus}: ${state.focus || '-'}`,
      `${c.phone}: ${state.phone || '-'}`,
      `${c.remarks}: ${state.remarks || '-'}`,
    ].join('\n');

    try {
      const response = await fetch('/api/forms/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [FORM_HONEYPOT_FIELD]: honeypot,
          [FORM_SUBMITTED_AT_FIELD]: submittedAtRef.current,
          [FORM_TURNSTILE_TOKEN_FIELD]: turnstileToken,
          name: state.name,
          email: state.email,
          organisation: state.organisation,
          role: state.specialty,
          message,
          locale,
          sourcePage,
        }),
      });
      const data = (await response.json()) as FormErrorResponse | FormSuccessResponse;
      if (!response.ok || !data.ok) {
        const failure = data as FormErrorResponse;
        setFieldErrors(failure.fieldErrors ?? {});
        setError(failure.message || c.error);
        setTurnstileToken('');
        setTurnstileReset((n) => n + 1);
        return;
      }
      setSent(true);
    } catch {
      setError(c.error);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-6 md:p-8 text-left" role="status">
        <p className="text-lg font-semibold text-[#0B1B3D] leading-snug">{c.thanks}</p>
        <p className="mt-2 text-slate-500">— {c.signature}</p>
      </div>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;
  const label = (name: keyof State, text: string, required = false) => (
    <label htmlFor={id(name)} className="block text-[13px] font-medium text-[#0B1B3D] mb-1.5">
      {text}
      {required && <span className="text-[#06ACC1]"> *</span>}
    </label>
  );
  const err = (name: string) => fieldErrors[name] && <p className="mt-1 text-[13px] text-[#B42335]">{fieldErrors[name]}</p>;

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 md:p-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={id('website')}>{shared('honeypotLabel')}</label>
        <input id={id('website')} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        {label('name', c.name, true)}
        <input id={id('name')} className={field} required autoComplete="name" value={state.name} onChange={update('name')} />
        {err('name')}
      </div>
      <div>
        {label('email', c.email, true)}
        <input id={id('email')} type="email" className={field} required autoComplete="email" value={state.email} onChange={update('email')} />
        {err('email')}
      </div>
      <div>
        {label('phone', c.phone)}
        <input id={id('phone')} type="tel" className={field} autoComplete="tel" value={state.phone} onChange={update('phone')} />
      </div>
      <div>
        {label('specialty', c.specialty, true)}
        <select id={id('specialty')} className={field} required value={state.specialty} onChange={update('specialty')}>
          <option value="" disabled>
            {c.specialty}
          </option>
          {SPECIALTY_IDS.map((id) => (
            <option key={id} value={labels[id]}>
              {labels[id]}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        {label('focus', c.focus)}
        <input id={id('focus')} className={field} value={state.focus} onChange={update('focus')} />
      </div>
      <div className="sm:col-span-2">
        {label('organisation', c.organisation)}
        <input id={id('organisation')} className={field} autoComplete="organization" value={state.organisation} onChange={update('organisation')} />
      </div>
      <div className="sm:col-span-2">
        {label('remarks', c.remarks)}
        <textarea id={id('remarks')} rows={3} className={`${field} resize-y`} value={state.remarks} onChange={update('remarks')} />
      </div>

      {turnstileEnabled && (
        <div className="sm:col-span-2">
          <TurnstileWidget action="demo" onTokenChange={setTurnstileToken} resetSignal={turnstileReset} />
        </div>
      )}
      {error && (
        <p className="sm:col-span-2 text-[14px] text-[#B42335]" role="alert">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={busy || !state.name || !state.email || !state.specialty}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] disabled:opacity-50 transition-colors"
        >
          {busy ? c.sending : c.send}
        </button>
      </div>
    </form>
  );
}
