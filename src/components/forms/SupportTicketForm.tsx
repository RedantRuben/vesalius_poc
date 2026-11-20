'use client';

import { useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { FieldError, FormAlert } from '@/components/forms/FormFeedback';
import TurnstileWidget from '@/components/forms/TurnstileWidget';
import {
  ALLOWED_ATTACHMENT_EXTENSIONS,
  ALLOWED_ATTACHMENT_MIME_TYPES,
  DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES,
  TICKET_TYPE_CONFIG,
} from '@/lib/forms/constants';
import { useRouter } from '@/i18n/routing';
import {
  FORM_HONEYPOT_FIELD,
  FORM_SUBMITTED_AT_FIELD,
  FORM_TURNSTILE_TOKEN_FIELD,
  getTurnstileSiteKey,
} from '@/lib/forms/antispam';
import type { FieldErrors, FormErrorResponse, FormSuccessResponse, PublicTicketType } from '@/lib/forms/types';

const inputClassName =
  'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 focus:border-[#06ACC1] focus:ring-4 focus:ring-[#06ACC1]/10 outline-none transition-colors text-slate-800 placeholder:text-slate-400';

type SupportFormState = {
  attachment?: File;
  description: string;
  email: string;
  name: string;
  organisation: string;
  subject: string;
  ticketType: PublicTicketType;
};

export default function SupportTicketForm({ sourcePage }: { sourcePage: string }) {
  const t = useTranslations('SupportForm');
  const shared = useTranslations('SharedForm');
  const locale = useLocale();
  const router = useRouter();
  const submittedAtRef = useRef(Date.now());
  const honeypotId = useId();
  const turnstileEnabled = Boolean(getTurnstileSiteKey());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<SupportFormState>({
    description: '',
    email: '',
    name: '',
    organisation: '',
    subject: '',
    ticketType: 'question',
  });
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState('');
  const selectedTicketType =
    TICKET_TYPE_CONFIG.find((item) => item.value === formState.ticketType) ?? TICKET_TYPE_CONFIG[0];

  function updateField<K extends keyof SupportFormState>(key: K, value: SupportFormState[K]) {
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

  function validateAttachment(file?: File) {
    if (!file) {
      return undefined;
    }

    const extension = file.name.toLowerCase().slice(Math.max(0, file.name.lastIndexOf('.')));
    const hasAllowedMime =
      file.type.length === 0 ||
      ALLOWED_ATTACHMENT_MIME_TYPES.includes(file.type as (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number]);
    const hasAllowedExtension = ALLOWED_ATTACHMENT_EXTENSIONS.includes(
      extension as (typeof ALLOWED_ATTACHMENT_EXTENSIONS)[number],
    );

    if (!hasAllowedMime && !hasAllowedExtension) {
      return t('attachmentUnsupported');
    }

    if (file.size > DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES) {
      return t('attachmentTooLarge');
    }

    return undefined;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(undefined);
    setFieldErrors({});

    const attachmentError = validateAttachment(formState.attachment);

    if (attachmentError) {
      setFieldErrors({ attachment: attachmentError });
      setIsSubmitting(false);
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setFormError(shared('turnstileRequired'));
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.set(FORM_HONEYPOT_FIELD, honeypot);
    payload.set(FORM_SUBMITTED_AT_FIELD, String(submittedAtRef.current));
    payload.set(FORM_TURNSTILE_TOKEN_FIELD, turnstileToken);
    payload.set('name', formState.name);
    payload.set('email', formState.email);
    payload.set('organisation', formState.organisation);
    payload.set('subject', formState.subject);
    payload.set('description', formState.description);
    payload.set('ticketType', formState.ticketType);
    payload.set('sourcePage', sourcePage);
    payload.set('locale', locale);

    if (formState.attachment) {
      payload.set('attachment', formState.attachment);
    }

    try {
      const response = await fetch('/api/forms/ticket', {
        body: payload,
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

  const labelClassName = 'block text-sm font-medium text-slate-700 mb-2';

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

      <fieldset>
        <legend className={labelClassName}>{t('ticketTypeLabel')}</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TICKET_TYPE_CONFIG.map((ticketType) => {
            const checked = formState.ticketType === ticketType.value;
            return (
              <label
                key={ticketType.value}
                className={`relative cursor-pointer select-none rounded-xl px-3 py-2.5 text-center text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#06ACC1]/40 ${
                  checked
                    ? 'bg-[#0B1B3D] text-white'
                    : 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100'
                }`}
              >
                <input
                  checked={checked}
                  className="sr-only"
                  name="ticketType"
                  onChange={() => updateField('ticketType', ticketType.value)}
                  type="radio"
                  value={ticketType.value}
                />
                {t(`ticketTypes.${ticketType.labelKey}`)}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {t(`ticketTypes.${selectedTicketType.descriptionKey}`)}
        </p>
        <FieldError message={fieldErrors.ticketType} />
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label className={labelClassName} htmlFor="support-name">
            {t('nameLabel')}
          </label>
          <input
            autoComplete="name"
            className={inputClassName}
            id="support-name"
            onChange={(event) => updateField('name', event.target.value)}
            placeholder={t('namePlaceholder')}
            required
            type="text"
            value={formState.name}
          />
          <FieldError message={fieldErrors.name} />
        </div>

        <div>
          <label className={labelClassName} htmlFor="support-email">
            {t('emailLabel')}
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="support-email"
            onChange={(event) => updateField('email', event.target.value)}
            placeholder={t('emailPlaceholder')}
            required
            type="email"
            value={formState.email}
          />
          <FieldError message={fieldErrors.email} />
        </div>
      </div>

      <div>
        <label className={labelClassName} htmlFor="support-organisation">
          {t('organisationLabel')} <span className="font-normal text-slate-400">{t('optional')}</span>
        </label>
        <input
          aria-describedby="support-organisation-hint"
          autoComplete="organization"
          className={inputClassName}
          id="support-organisation"
          onChange={(event) => updateField('organisation', event.target.value)}
          placeholder={t('organisationPlaceholder')}
          type="text"
          value={formState.organisation}
        />
        <p id="support-organisation-hint" className="mt-2 text-sm text-slate-500">{t('organisationHint')}</p>
      </div>

      <div>
        <label className={labelClassName} htmlFor="support-subject">
          {t('subjectLabel')}
        </label>
        <input
          className={inputClassName}
          id="support-subject"
          onChange={(event) => updateField('subject', event.target.value)}
          placeholder={t('subjectPlaceholder')}
          required
          type="text"
          value={formState.subject}
        />
        <FieldError message={fieldErrors.subject} />
      </div>

      <div>
        <label className={labelClassName} htmlFor="support-description">
          {t('descriptionLabel')}
        </label>
        <textarea
          className={`${inputClassName} resize-y min-h-[148px]`}
          id="support-description"
          onChange={(event) => updateField('description', event.target.value)}
          placeholder={t('descriptionPlaceholder')}
          rows={6}
          value={formState.description}
        />
        <FieldError message={fieldErrors.description} />
      </div>

      <div>
        <span className={labelClassName}>
          {t('attachmentLabel')} <span className="font-normal text-slate-400">{t('optional')}</span>
        </span>
        <label className="flex items-center gap-4 cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-4 hover:border-slate-400 hover:bg-slate-50 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#06ACC1]/40">
          <input
            className="sr-only"
            onChange={(event) => updateField('attachment', event.target.files?.[0])}
            type="file"
          />
          <span className="shrink-0 w-10 h-10 rounded-lg bg-white ring-1 ring-slate-200 flex items-center justify-center text-slate-500">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21 12-8.5 8.5a5 5 0 0 1-7-7L14 5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L15.5 8" />
            </svg>
          </span>
          <span className="min-w-0 text-sm">
            {formState.attachment ? (
              <span className="block truncate font-medium text-[#0B1B3D]">{formState.attachment.name}</span>
            ) : (
              <span className="block font-medium text-[#0B1B3D]">{t('attachmentCta')}</span>
            )}
            <span className="block text-slate-500">{t('attachmentHint')}</span>
          </span>
        </label>
        <FieldError message={fieldErrors.attachment} />
      </div>

      {turnstileEnabled ? (
        <div>
          <p className={labelClassName}>{shared('turnstileLabel')}</p>
          <TurnstileWidget
            action="support_form"
            onTokenChange={setTurnstileToken}
            resetSignal={turnstileResetSignal}
          />
        </div>
      ) : null}

      <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-slate-500">{t('replyNote')}</p>
        <button
          className="group shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0B1B3D] text-white font-semibold hover:bg-[#13285a] transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? shared('submitting') : t('submit')}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </form>
  );
}
