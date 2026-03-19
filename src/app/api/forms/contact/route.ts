import { NextResponse } from 'next/server';

import { FORM_SUCCESS_PATHS, localizePath } from '@/lib/forms/paths';
import {
  DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL,
  DEFAULT_HOMEPAGE_CONTACT_RECIPIENT_EMAIL,
  DEFAULT_PRICING_RECIPIENT_EMAIL,
} from '@/lib/forms/constants';
import { validateContactPayload } from '@/lib/forms/validation';
import { sendContactEmail } from '@/lib/server/mailer';
import { submissionLogger } from '@/lib/server/submissionLogger';

export const runtime = 'nodejs';

function getTrimmedEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function resolveContactRecipient(sourcePage: string) {
  if (sourcePage.includes('pricing')) {
    return (
      getTrimmedEnv('PRICING_RECIPIENT_EMAIL') ||
      getTrimmedEnv('CONTACT_PAGE_RECIPIENT_EMAIL') ||
      DEFAULT_PRICING_RECIPIENT_EMAIL
    );
  }

  if (sourcePage === '/contactus') {
    return getTrimmedEnv('CONTACT_PAGE_RECIPIENT_EMAIL') || DEFAULT_CONTACT_PAGE_RECIPIENT_EMAIL;
  }

  return getTrimmedEnv('HOMEPAGE_CONTACT_RECIPIENT_EMAIL') || DEFAULT_HOMEPAGE_CONTACT_RECIPIENT_EMAIL;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: 'Invalid request payload.', ok: false },
      { status: 400 },
    );
  }

  const result = validateContactPayload(payload);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  const recipient = resolveContactRecipient(result.data.sourcePage);

  submissionLogger.info('form.contact.received', {
    email: result.data.email,
    locale: result.data.locale,
    sourcePage: result.data.sourcePage,
  });

  try {
    await sendContactEmail(result.data, recipient);
  } catch (error) {
    submissionLogger.error('form.contact.failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      sourcePage: result.data.sourcePage,
    });

    return NextResponse.json(
      {
        message: 'We could not send your message right now. Please try again.',
        ok: false,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    redirectTo: localizePath(result.data.locale, FORM_SUCCESS_PATHS.contact),
  });
}
