import { NextResponse } from 'next/server';

import { getFaqAdminSessionToken, verifyFaqAdminSession } from '@/lib/server/faq-admin-auth';
import { uploadFaqImage } from '@/lib/server/faq-cms';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Map([
  ['image/gif', '.gif'],
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

async function isAuthorized() {
  const token = await getFaqAdminSessionToken();
  return verifyFaqAdminSession(token);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ message: 'Unauthorized.', ok: false }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'No file provided.', ok: false }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ message: 'Unsupported file type.', ok: false }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ message: 'File is too large.', ok: false }, { status: 400 });
  }

  try {
    const url = await uploadFaqImage(file);

    return NextResponse.json({
      ok: true,
      url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Upload failed.',
        ok: false,
      },
      { status: 500 },
    );
  }
}
