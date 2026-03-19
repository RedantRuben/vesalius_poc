import 'server-only';

import { createOdooRecord } from '@/lib/server/odoo';
import { sendDemoEmail } from '@/lib/server/mailer';
import type { DemoSubmission } from '@/lib/forms/types';

type DemoMode = 'email' | 'odoo' | 'webhook';

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function getDemoMode(): DemoMode {
  return (getEnv('DEMO_SUBMISSION_MODE') as DemoMode | undefined) ?? 'email';
}

async function submitToWebhook(submission: DemoSubmission) {
  const url = getEnv('DEMO_WEBHOOK_URL');

  if (!url) {
    throw new Error('DEMO_WEBHOOK_URL is required for webhook demo submissions.');
  }

  const response = await fetch(url, {
    body: JSON.stringify(submission),
    headers: {
      'Content-Type': 'application/json',
      ...(getEnv('DEMO_WEBHOOK_BEARER_TOKEN')
        ? { Authorization: `Bearer ${getEnv('DEMO_WEBHOOK_BEARER_TOKEN')}` }
        : {}),
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Demo webhook failed with status ${response.status}.`);
  }
}

async function submitToOdoo(submission: DemoSubmission) {
  const model = getEnv('ODOO_DEMO_MODEL');

  if (!model) {
    throw new Error('ODOO_DEMO_MODEL is required for Odoo demo submissions.');
  }

  const defaultFieldMap = {
    email: 'email_from',
    locale: 'x_locale',
    message: 'description',
    name: 'contact_name',
    organisation: 'partner_name',
    role: 'function',
    sourcePage: 'x_source_page',
  } as const;

  const rawFieldMap = getEnv('ODOO_DEMO_FIELD_MAP');
  const fieldMap = rawFieldMap
    ? (JSON.parse(rawFieldMap) as Record<string, string>)
    : defaultFieldMap;

  const values: Record<string, unknown> = {};

  for (const [inputKey, fieldName] of Object.entries(fieldMap)) {
    const value = submission[inputKey as keyof DemoSubmission];

    if (typeof value !== 'undefined') {
      values[fieldName] = value;
    }
  }

  await createOdooRecord(model, values);
}

export async function submitDemoRequest(submission: DemoSubmission) {
  switch (getDemoMode()) {
    case 'email':
      await sendDemoEmail(submission);
      return;
    case 'odoo':
      await submitToOdoo(submission);
      return;
    case 'webhook':
      await submitToWebhook(submission);
      return;
    default:
      await sendDemoEmail(submission);
  }
}
