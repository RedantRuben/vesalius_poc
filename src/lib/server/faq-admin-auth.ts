import 'server-only';

import crypto from 'node:crypto';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const FAQ_ADMIN_COOKIE = 'vesalius-faq-admin';

function getTrimmedEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function getAuthConfig() {
  return {
    username: getTrimmedEnv('FAQ_ADMIN_USERNAME'),
    password: getTrimmedEnv('FAQ_ADMIN_PASSWORD'),
    secret: getTrimmedEnv('FAQ_ADMIN_SECRET'),
  };
}

function signPayload(payload: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

export function isFaqAdminConfigured() {
  const { username, password, secret } = getAuthConfig();
  return Boolean(username && password && secret);
}

export function verifyFaqAdminCredentials(username: string, password: string) {
  const config = getAuthConfig();

  if (!config.username || !config.password || !config.secret) {
    return false;
  }

  return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function createFaqAdminSession(username: string) {
  const { secret } = getAuthConfig();

  if (!secret) {
    throw new Error('FAQ admin secret is not configured.');
  }

  const issuedAt = Date.now().toString();
  const payload = `${username}:${issuedAt}`;
  const signature = signPayload(payload, secret);
  return `${payload}:${signature}`;
}

export function verifyFaqAdminSession(token: string | undefined) {
  const { secret, username } = getAuthConfig();

  if (!token || !secret || !username) {
    return false;
  }

  const [tokenUsername, issuedAt, signature] = token.split(':');

  if (!tokenUsername || !issuedAt || !signature) {
    return false;
  }

  const expectedSignature = signPayload(`${tokenUsername}:${issuedAt}`, secret);
  return safeEqual(tokenUsername, username) && safeEqual(signature, expectedSignature);
}

export function getFaqAdminCookieName() {
  return FAQ_ADMIN_COOKIE;
}

export async function getFaqAdminSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(FAQ_ADMIN_COOKIE)?.value;
}

export async function isFaqAdminAuthenticated() {
  const token = await getFaqAdminSessionToken();
  return verifyFaqAdminSession(token);
}

export async function requireFaqAdminAuth(locale: string, nextPath?: string) {
  const authenticated = await isFaqAdminAuthenticated();

  if (!authenticated) {
    const next = encodeURIComponent(nextPath ?? `/${locale}/admin/faq`);
    redirect(`/${locale}/admin/login?next=${next}`);
  }
}
