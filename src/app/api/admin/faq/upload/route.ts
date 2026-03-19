import crypto from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { NextResponse } from 'next/server';

import { getFaqAdminSessionToken, verifyFaqAdminSession } from '@/lib/server/faq-admin-auth';

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

  const extension = allowedTypes.get(file.type) || '.png';
  const fileName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
  const relativePath = path.join('uploads', 'faq', fileName);
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads', 'faq');
  const absolutePath = path.join(process.cwd(), 'public', relativePath);

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({
    ok: true,
    url: `/${relativePath.replaceAll(path.sep, '/')}`,
  });
}
