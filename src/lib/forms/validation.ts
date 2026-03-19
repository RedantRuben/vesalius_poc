import {
  ALLOWED_ATTACHMENT_EXTENSIONS,
  ALLOWED_ATTACHMENT_MIME_TYPES,
  DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES,
} from '@/lib/forms/constants';
import {
  APP_LOCALES,
  PUBLIC_TICKET_TYPES,
  type AppLocale,
  type ContactSubmission,
  type DemoSubmission,
  type FieldErrors,
  type TicketSubmission,
  type ValidationResult,
} from '@/lib/forms/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripControlCharacters(value: string) {
  return value.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '');
}

function normalizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return stripControlCharacters(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeMultiLine(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return '';
  }

  return stripControlCharacters(value)
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

function normalizeOptional(value: string) {
  return value.length > 0 ? value : undefined;
}

function validateLocale(value: unknown, fieldErrors: FieldErrors) {
  const locale = normalizeSingleLine(value, 5);

  if (!APP_LOCALES.includes(locale as (typeof APP_LOCALES)[number])) {
    fieldErrors.locale = 'Please choose a valid locale.';
    return APP_LOCALES[0];
  }

  return locale as AppLocale;
}

function validateSourcePage(value: unknown) {
  const normalized = normalizeSingleLine(value, 200);
  return normalized.startsWith('/') ? normalized : '/';
}

function validateCommonIdentityFields(
  input: Record<string, unknown>,
  fieldErrors: FieldErrors,
) {
  const name = normalizeSingleLine(input.name, 120);
  const email = normalizeSingleLine(input.email, 254).toLowerCase();
  const organisation = normalizeOptional(normalizeSingleLine(input.organisation, 160));
  const locale = validateLocale(input.locale, fieldErrors);
  const sourcePage = validateSourcePage(input.sourcePage);

  if (name.length < 2) {
    fieldErrors.name = 'Please enter your full name.';
  }

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  return {
    email,
    locale,
    name,
    organisation,
    sourcePage,
  };
}

export function validateContactPayload(
  input: Record<string, unknown>,
): ValidationResult<ContactSubmission> {
  const fieldErrors: FieldErrors = {};
  const common = validateCommonIdentityFields(input, fieldErrors);
  const subject = normalizeSingleLine(input.subject, 140);
  const message = normalizeMultiLine(input.message, 4000);

  if (subject.length < 3) {
    fieldErrors.subject = 'Please add a subject.';
  }

  if (message.length < 10) {
    fieldErrors.message = 'Please tell us a bit more so we can help.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      ...common,
      message,
      subject,
    },
  };
}

export async function validateTicketFormData(
  formData: FormData,
  maxAttachmentBytes = DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES,
): Promise<ValidationResult<TicketSubmission>> {
  const fieldErrors: FieldErrors = {};
  const common = validateCommonIdentityFields(
    Object.fromEntries(formData.entries()),
    fieldErrors,
  );
  const subject = normalizeSingleLine(formData.get('subject'), 140);
  const description = normalizeMultiLine(formData.get('description'), 5000);
  const ticketType = normalizeSingleLine(formData.get('ticketType'), 60);
  const sourcePage = validateSourcePage(formData.get('sourcePage'));
  const attachmentEntry = formData.get('attachment');

  if (subject.length < 3) {
    fieldErrors.subject = 'Please add a subject for your ticket.';
  }

  if (description.length < 10) {
    fieldErrors.description = 'Please describe the issue in a bit more detail.';
  }

  if (!PUBLIC_TICKET_TYPES.includes(ticketType as (typeof PUBLIC_TICKET_TYPES)[number])) {
    fieldErrors.ticketType = 'Please choose a valid ticket type.';
  }

  let attachment: TicketSubmission['attachment'];

  if (attachmentEntry instanceof File && attachmentEntry.size > 0) {
    const fileExtension = attachmentEntry.name
      .toLowerCase()
      .slice(Math.max(0, attachmentEntry.name.lastIndexOf('.')));

    const hasAllowedMime =
      attachmentEntry.type.length === 0 ||
      ALLOWED_ATTACHMENT_MIME_TYPES.includes(
        attachmentEntry.type as (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number],
      );

    const hasAllowedExtension = ALLOWED_ATTACHMENT_EXTENSIONS.includes(
      fileExtension as (typeof ALLOWED_ATTACHMENT_EXTENSIONS)[number],
    );

    if (!hasAllowedMime && !hasAllowedExtension) {
      fieldErrors.attachment = 'Please upload a PDF, image, text file, or Word document.';
    } else if (attachmentEntry.size > maxAttachmentBytes) {
      fieldErrors.attachment = 'The attachment is too large.';
    } else {
      attachment = {
        dataBase64: Buffer.from(await attachmentEntry.arrayBuffer()).toString('base64'),
        name: attachmentEntry.name,
        size: attachmentEntry.size,
        type: attachmentEntry.type || 'application/octet-stream',
      };
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      ...common,
      attachment,
      description,
      sourcePage,
      subject,
      ticketType: ticketType as TicketSubmission['ticketType'],
    },
  };
}

export function validateDemoPayload(
  input: Record<string, unknown>,
): ValidationResult<DemoSubmission> {
  const fieldErrors: FieldErrors = {};
  const common = validateCommonIdentityFields(input, fieldErrors);
  const role = normalizeOptional(normalizeSingleLine(input.role, 120));
  const message = normalizeMultiLine(input.message, 4000);

  if (message.length < 10) {
    fieldErrors.message = 'Please share what you would like to see in the demo.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      ...common,
      message,
      role,
    },
  };
}
