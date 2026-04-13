import { NextResponse } from 'next/server';

import { extractAntiSpamPayload } from '@/lib/forms/antispam';
import { FORM_SUCCESS_PATHS, localizePath } from '@/lib/forms/paths';
import { validateDemoPayload } from '@/lib/forms/validation';
import { submitDemoRequest } from '@/lib/server/demo';
import { protectFormSubmission } from '@/lib/server/formProtection';
import { submissionLogger } from '@/lib/server/submissionLogger';

export const runtime = 'nodejs';

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

  const result = validateDemoPayload(payload);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  const protectionResult = await protectFormSubmission({
    antiSpam: extractAntiSpamPayload(payload),
    formName: 'demo',
    request,
  });

  if (!protectionResult.ok) {
    submissionLogger.info('form.demo.blocked', {
      ipAddress: protectionResult.ipAddress,
      locale: result.data.locale,
      reason: protectionResult.reason,
      sourcePage: result.data.sourcePage,
      userAgent: protectionResult.userAgent,
    });

    return NextResponse.json(
      { message: protectionResult.message, ok: false },
      { status: protectionResult.status },
    );
  }

  submissionLogger.info('form.demo.received', {
    email: result.data.email,
    ipAddress: protectionResult.ipAddress,
    locale: result.data.locale,
    sourcePage: result.data.sourcePage,
    userAgent: protectionResult.userAgent,
  });

  try {
    await submitDemoRequest(result.data);
  } catch (error) {
    submissionLogger.error('form.demo.failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      sourcePage: result.data.sourcePage,
    });

    return NextResponse.json(
      {
        message: 'We could not process your demo request right now. Please try again.',
        ok: false,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    redirectTo: localizePath(result.data.locale, FORM_SUCCESS_PATHS.demo),
  });
}
