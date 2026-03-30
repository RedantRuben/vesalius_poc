'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { FieldError, FormAlert } from '@/components/forms/FormFeedback';
import TurnstileWidget from '@/components/forms/TurnstileWidget';
import { useRouter } from '@/i18n/routing';
import {
  FORM_HONEYPOT_FIELD,
  FORM_SUBMITTED_AT_FIELD,
  FORM_TURNSTILE_TOKEN_FIELD,
  getTurnstileSiteKey,
} from '@/lib/forms/antispam';
import type { FieldErrors, FormErrorResponse, FormSuccessResponse } from '@/lib/forms/types';

type ContactFormState = {
  email: string;
  message: string;
  name: string;
  organisation: string;
  subject: string;
};

const inputClassName =
  'w-full px-5 py-4 rounded-2xl border border-transparent bg-white/60 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-[#06ACC1]/30 focus:border-[#06ACC1]/20 shadow-sm outline-none transition-all text-slate-800 placeholder-slate-400';

export default function ContactForm({ sourcePage }: { sourcePage: string }) {
  const t = useTranslations('Contact.form');
  const shared = useTranslations('SharedForm');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasPrefilledPricingState = useRef(false);
  const submittedAtRef = useRef(Date.now());
  const honeypotId = useId();
  const turnstileEnabled = Boolean(getTurnstileSiteKey());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<ContactFormState>({
    email: '',
    message: '',
    name: '',
    organisation: '',
    subject: '',
  });
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');

  const pricingPlan = searchParams.get('plan');
  const intent = searchParams.get('intent');
  const isPricingIntent = intent === 'pricing';

  useEffect(() => {
    if (!isPricingIntent || hasPrefilledPricingState.current) {
      return;
    }

    hasPrefilledPricingState.current = true;
    const planLabel = pricingPlan ?? shared('pricingFallbackPlan');

    setFormState((current) => ({
      ...current,
      message:
        current.message ||
        t('pricingMessageTemplate', {
          plan: planLabel,
        }),
      subject:
        current.subject ||
        t('pricingSubjectTemplate', {
          plan: planLabel,
        }),
    }));
  }, [isPricingIntent, pricingPlan, shared, t]);

  function updateField<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));

    setFieldErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(undefined);
    setFieldErrors({});

    const effectiveSourcePage = isPricingIntent
      ? `/pricing${pricingPlan ? `?plan=${encodeURIComponent(pricingPlan)}` : ''}`
      : sourcePage;

    if (turnstileEnabled && !turnstileToken) {
      setFormError(shared('turnstileRequired'));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/forms/contact', {
        body: JSON.stringify({
          [FORM_HONEYPOT_FIELD]: honeypot,
          [FORM_SUBMITTED_AT_FIELD]: submittedAtRef.current,
          [FORM_TURNSTILE_TOKEN_FIELD]: turnstileToken,
          ...formState,
          locale,
          sourcePage: effectiveSourcePage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = (await response.json()) as FormErrorResponse | FormSuccessResponse;

      if (!response.ok || !data.ok) {
        const error = data as FormErrorResponse;
        setFieldErrors(error.fieldErrors ?? {});
        setFormError(error.message || shared('submitError'));

        if (turnstileEnabled && !error.fieldErrors) {
          setTurnstileToken('');
          setTurnstileResetSignal((current) => current + 1);
        }

        return;
      }

      router.push(data.redirectTo);
    } catch {
      setFormError(shared('submitError'));

      if (turnstileEnabled) {
        setTurnstileToken('');
        setTurnstileResetSignal((current) => current + 1);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {isPricingIntent ? <FormAlert message={t('pricingIntro')} tone="info" /> : null}
      <FormAlert message={formError} />

      <div
        aria-hidden="true"
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={honeypotId}>{shared('honeypotLabel')}</label>
        <input
          autoComplete="off"
          id={honeypotId}
          name={FORM_HONEYPOT_FIELD}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          type="text"
          value={honeypot}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('nameLabel')}
          </label>
          <input
            autoComplete="name"
            className={inputClassName}
            name="name"
            onChange={(event) => updateField('name', event.target.value)}
            placeholder={t('namePlaceholder')}
            type="text"
            value={formState.name}
          />
          <FieldError message={fieldErrors.name} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('emailLabel')}
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            name="email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder={t('emailPlaceholder')}
            type="email"
            value={formState.email}
          />
          <FieldError message={fieldErrors.email} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('organisationLabel')}
        </label>
        <input
          autoComplete="organization"
          className={inputClassName}
          name="organisation"
          onChange={(event) => updateField('organisation', event.target.value)}
          placeholder={t('orgPlaceholder')}
          type="text"
          value={formState.organisation}
        />
        <FieldError message={fieldErrors.organisation} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('subjectLabel')}
        </label>
        <input
          className={inputClassName}
          name="subject"
          onChange={(event) => updateField('subject', event.target.value)}
          placeholder={t('subjectPlaceholder')}
          type="text"
          value={formState.subject}
        />
        <FieldError message={fieldErrors.subject} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('messageLabel')}
        </label>
        <textarea
          className={`${inputClassName} resize-none`}
          name="message"
          onChange={(event) => updateField('message', event.target.value)}
          placeholder={t('questionPlaceholder')}
          rows={5}
          value={formState.message}
        />
        <FieldError message={fieldErrors.message} />
      </div>

      {turnstileEnabled ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {shared('turnstileLabel')}
          </p>
          <TurnstileWidget
            action="contact_form"
            onTokenChange={setTurnstileToken}
            resetSignal={turnstileResetSignal}
          />
        </div>
      ) : null}

      <button
        className="w-full md:w-auto bg-[#0B1B3D] text-white px-10 py-4 rounded-2xl font-bold tracking-wide hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-[0_8px_20px_-6px_rgba(11,27,61,0.5)] hover:-translate-y-1 group mt-4 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? shared('submitting') : t('submit')}
        <span className="transition-transform group-hover:translate-x-1 text-lg leading-none">→</span>
      </button>
    </form>
  );
}
