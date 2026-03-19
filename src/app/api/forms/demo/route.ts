import { NextResponse } from 'next/server';

import { FORM_SUCCESS_PATHS, localizePath } from '@/lib/forms/paths';
import { validateDemoPayload } from '@/lib/forms/validation';
import { submitDemoRequest } from '@/lib/server/demo';
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

  submissionLogger.info('form.demo.received', {
    email: result.data.email,
    locale: result.data.locale,
    sourcePage: result.data.sourcePage,
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
