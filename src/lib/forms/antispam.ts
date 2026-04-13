import type { AntiSpamPayload } from '@/lib/forms/types';

export const FORM_HONEYPOT_FIELD = 'website';
export const FORM_SUBMITTED_AT_FIELD = 'submittedAt';
export const FORM_TURNSTILE_TOKEN_FIELD = 'turnstileToken';
export const MIN_FORM_FILL_DURATION_MS = 2500;
export const FORM_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const FORM_RATE_LIMIT_MAX_ATTEMPTS = 8;

function normalizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeTimestamp(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export function getTurnstileSiteKey() {
  const value = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  return value && value.length > 0 ? value : undefined;
}

export function extractAntiSpamPayload(input: Record<string, unknown>): AntiSpamPayload {
  const turnstileToken = normalizeSingleLine(input[FORM_TURNSTILE_TOKEN_FIELD], 2048);

  return {
    honeypot: normalizeSingleLine(input[FORM_HONEYPOT_FIELD], 255),
    submittedAt: normalizeTimestamp(input[FORM_SUBMITTED_AT_FIELD]),
    turnstileToken: turnstileToken || undefined,
  };
}

export function extractAntiSpamFormData(formData: FormData): AntiSpamPayload {
  return extractAntiSpamPayload(Object.fromEntries(formData.entries()));
}
