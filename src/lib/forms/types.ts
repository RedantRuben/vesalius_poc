export const APP_LOCALES = ['en', 'nl', 'fr'] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const PUBLIC_TICKET_TYPES = [
  'question',
  'incident',
  'billing',
  'feature_request',
] as const;

export type PublicTicketType = (typeof PUBLIC_TICKET_TYPES)[number];

export type FieldErrors = Record<string, string>;

export interface ContactSubmission {
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  message: string;
  sourcePage: string;
  locale: AppLocale;
}

export interface TicketAttachment {
  name: string;
  type: string;
  size: number;
  dataBase64: string;
}

export interface TicketSubmission {
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  description: string;
  ticketType: PublicTicketType;
  attachment?: TicketAttachment;
  sourcePage: string;
  locale: AppLocale;
}

export interface DemoSubmission {
  name: string;
  email: string;
  organisation?: string;
  role?: string;
  message: string;
  sourcePage: string;
  locale: AppLocale;
}

export type FormSuccessResponse = {
  ok: true;
  redirectTo: string;
  ticketId?: string;
};

export type FormErrorResponse = {
  ok: false;
  message: string;
  fieldErrors?: FieldErrors;
};

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors: FieldErrors };
