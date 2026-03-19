import { NextResponse } from 'next/server';

import { getFaqAdminSessionToken, verifyFaqAdminSession } from '@/lib/server/faq-admin-auth';
import { readFaqContent, writeFaqContent } from '@/lib/server/faq-cms';

export const runtime = 'nodejs';

async function isAuthorized() {
  const token = await getFaqAdminSessionToken();
  return verifyFaqAdminSession(token);
}

export async function GET(request: Request) {
  void request;

  if (!(await isAuthorized())) {
    return NextResponse.json({ message: 'Unauthorized.', ok: false }, { status: 401 });
  }

  const content = await readFaqContent();

  return NextResponse.json({ content, ok: true });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ message: 'Unauthorized.', ok: false }, { status: 401 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.', ok: false }, { status: 400 });
  }

  try {
    const content = await writeFaqContent(payload);
    return NextResponse.json({ content, ok: true });
  } catch (error) {
    console.error('Failed to write FAQ CMS content:', error);
    return NextResponse.json(
      {
        message: 'Could not save FAQ content.',
        ok: false,
      },
      { status: 500 },
    );
  }
}
