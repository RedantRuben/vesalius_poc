import type { AppLocale } from '@/lib/forms/types';

export const FORM_SUCCESS_PATHS = {
  contact: '/contactus-thank-you',
  ticket: '/support/success',
  demo: '/demo/thank-you',
} as const;

export function localizePath(_locale: AppLocale, path: string) {
  return path;
}
