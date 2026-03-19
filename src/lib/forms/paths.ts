import { routing } from '@/i18n/routing';
import type { AppLocale } from '@/lib/forms/types';

export const FORM_SUCCESS_PATHS = {
  contact: '/contactus-thank-you',
  ticket: '/support/success',
  demo: '/demo/thank-you',
} as const;

export function localizePath(locale: AppLocale, path: string) {
  return locale === routing.defaultLocale ? path : `/${locale}${path}`;
}
