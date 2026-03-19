'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/routing';
import { FieldError, FormAlert } from '@/components/forms/FormFeedback';
import type { FieldErrors, FormErrorResponse, FormSuccessResponse } from '@/lib/forms/types';

const inputClassName =
  'w-full px-5 py-4 rounded-2xl border border-transparent bg-white/60 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-[#06ACC1]/30 focus:border-[#06ACC1]/20 shadow-sm outline-none transition-all text-slate-800 placeholder-slate-400';

type DemoFormState = {
  email: string;
  message: string;
  name: string;
  organisation: string;
  role: string;
};

export default function DemoRequestForm({ sourcePage }: { sourcePage: string }) {
  const t = useTranslations('DemoForm');
  const shared = useTranslations('SharedForm');
  const locale = useLocale();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<DemoFormState>({
    email: '',
    message: '',
    name: '',
    organisation: '',
    role: '',
  });

  function updateField<K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) {
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

    try {
      const response = await fetch('/api/forms/demo', {
        body: JSON.stringify({
          ...formState,
          locale,
          sourcePage,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
            {t('roleLabel')}
          </label>
          <input
            className={inputClassName}
            onChange={(event) => updateField('role', event.target.value)}
            placeholder={t('rolePlaceholder')}
            type="text"
            value={formState.role}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {t('messageLabel')}
        </label>
        <textarea
          className={`${inputClassName} resize-none`}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder={t('messagePlaceholder')}
          rows={6}
          value={formState.message}
        />
        <FieldError message={fieldErrors.message} />
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
