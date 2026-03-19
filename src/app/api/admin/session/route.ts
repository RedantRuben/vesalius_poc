import { NextResponse } from 'next/server';

import {
  createFaqAdminSession,
  getFaqAdminCookieName,
  isFaqAdminConfigured,
  verifyFaqAdminCredentials,
} from '@/lib/server/faq-admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isFaqAdminConfigured()) {
    return NextResponse.json(
      {
        message: 'FAQ admin credentials are not configured.',
        ok: false,
      },
      { status: 500 },
    );
  }

  let payload: { password?: string; username?: string };

  try {
    payload = (await request.json()) as { password?: string; username?: string };
  } catch {
    return NextResponse.json(
      {
        message: 'Invalid request payload.',
        ok: false,
      },
      { status: 400 },
    );
  }

  const username = payload.username?.trim() ?? '';
  const password = payload.password?.trim() ?? '';

  if (!verifyFaqAdminCredentials(username, password)) {
    return NextResponse.json(
      {
        message: 'Invalid username or password.',
        ok: false,
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    httpOnly: true,
    maxAge: 60 * 60 * 12,
    name: getFaqAdminCookieName(),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    value: createFaqAdminSession(username),
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    httpOnly: true,
    maxAge: 0,
    name: getFaqAdminCookieName(),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    value: '',
  });
  return response;
}
