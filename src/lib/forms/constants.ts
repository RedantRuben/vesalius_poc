import type { PublicTicketType } from '@/lib/forms/types';

export const DEFAULT_HOMEPAGE_CONTACT_RECIPIENT_EMAIL = 'finance@vesalius.health';
export const DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL = 'help@vesalius.health';
export const DEFAULT_PRICING_RECIPIENT_EMAIL = DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL;
export const DEFAULT_DEMO_RECIPIENT_EMAIL = DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL;
export const DEFAULT_TICKET_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const ALLOWED_ATTACHMENT_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.txt',
  '.doc',
  '.docx',
] as const;

export const TICKET_TYPE_CONFIG: ReadonlyArray<{
  value: PublicTicketType;
  labelKey: string;
  descriptionKey: string;
}> = [
  {
    value: 'question',
    labelKey: 'question',
    descriptionKey: 'questionDescription',
  },
  {
    value: 'incident',
    labelKey: 'incident',
    descriptionKey: 'incidentDescription',
  },
  {
    value: 'billing',
    labelKey: 'billing',
    descriptionKey: 'billingDescription',
  },
  {
    value: 'feature_request',
    labelKey: 'featureRequest',
    descriptionKey: 'featureRequestDescription',
  },
];
