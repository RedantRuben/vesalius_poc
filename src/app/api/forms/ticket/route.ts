import { NextResponse } from 'next/server';

import { FORM_SUCCESS_PATHS, localizePath } from '@/lib/forms/paths';
import { validateTicketFormData } from '@/lib/forms/validation';
import { createHelpdeskTicket } from '@/lib/server/odoo';
import { submissionLogger } from '@/lib/server/submissionLogger';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: 'Invalid multipart request.', ok: false },
      { status: 400 },
    );
  }

  const result = await validateTicketFormData(formData);

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  submissionLogger.info('form.ticket.received', {
    email: result.data.email,
    locale: result.data.locale,
    sourcePage: result.data.sourcePage,
    ticketType: result.data.ticketType,
  });

  try {
    const ticketId = await createHelpdeskTicket(result.data);

    return NextResponse.json({
      ok: true,
      redirectTo: localizePath(result.data.locale, FORM_SUCCESS_PATHS.ticket),
      ticketId: String(ticketId),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    submissionLogger.error('form.ticket.failed', {
      error: message,
      sourcePage: result.data.sourcePage,
      ticketType: result.data.ticketType,
    });

    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === 'development'
            ? `We could not create your support ticket right now. ${message}`
            : 'We could not create your support ticket right now. Please try again.',
        ok: false,
      },
      { status: 502 },
    );
  }
}
