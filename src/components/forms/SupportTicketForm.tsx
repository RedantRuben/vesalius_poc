'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { FieldError, FormAlert } from '@/components/forms/FormFeedback';
import {
  ALLOWED_ATTACHMENT_EXTENSIONS,
  ALLOWED_ATTACHMENT_MIME_TYPES,
  DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES,
  TICKET_TYPE_CONFIG,
} from '@/lib/forms/constants';
import { useRouter } from '@/i18n/routing';
import type { FieldErrors, FormErrorResponse, FormSuccessResponse, PublicTicketType } from '@/lib/forms/types';

const inputClassName =
  'w-full px-5 py-4 rounded-2xl border border-transparent bg-white/60 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-[#06ACC1]/30 focus:border-[#06ACC1]/20 shadow-sm outline-none transition-all text-slate-800 placeholder-slate-400';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<SupportFormState>({
    description: '',
    email: '',
    name: '',
    organisation: '',
    subject: '',
    ticketType: 'question',
  });
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

    const payload = new FormData();
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
        return;
      }

      router.push(data.redirectTo);
    } catch {
      setFormError(shared('submitError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <FormAlert message={formError} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('nameLabel')}
          </label>
          <input
            autoComplete="name"
            className={inputClassName}
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
          onChange={(event) => updateField('organisation', event.target.value)}
          placeholder={t('organisationPlaceholder')}
          type="text"
          value={formState.organisation}
        />
        <p className="text-sm text-slate-500">{t('organisationHint')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('subjectLabel')}
          </label>
          <input
            className={inputClassName}
            onChange={(event) => updateField('subject', event.target.value)}
            placeholder={t('subjectPlaceholder')}
            type="text"
            value={formState.subject}
          />
          <FieldError message={fieldErrors.subject} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('ticketTypeLabel')}
          </label>
          <select
            className={inputClassName}
            onChange={(event) => updateField('ticketType', event.target.value as PublicTicketType)}
            value={formState.ticketType}
          >
            {TICKET_TYPE_CONFIG.map((ticketType) => (
              <option key={ticketType.value} value={ticketType.value}>
                {t(`ticketTypes.${ticketType.labelKey}`)}
              </option>
            ))}
          </select>
          <p className="text-sm text-slate-500">
            {t(`ticketTypes.${selectedTicketType.descriptionKey}`)}
          </p>
          <FieldError message={fieldErrors.ticketType} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('descriptionLabel')}
        </label>
        <textarea
          className={`${inputClassName} resize-none`}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder={t('descriptionPlaceholder')}
          rows={6}
          value={formState.description}
        />
        <FieldError message={fieldErrors.description} />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('attachmentLabel')}
        </label>
        <input
          className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-[#0B1B3D] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white`}
          onChange={(event) => updateField('attachment', event.target.files?.[0])}
          type="file"
        />
        <p className="text-sm text-slate-500">{t('attachmentHint')}</p>
        <FieldError message={fieldErrors.attachment} />
      </div>

      <button
        className="w-full md:w-auto bg-[#0B1B3D] text-white px-10 py-4 rounded-full font-bold tracking-wide hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-[0_8px_20px_-6px_rgba(11,27,61,0.5)] hover:-translate-y-1 group mt-4 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? shared('submitting') : t('submit')}
        <span className="transition-transform group-hover:translate-x-1 text-lg leading-none">→</span>
      </button>
    </form>
  );
}
