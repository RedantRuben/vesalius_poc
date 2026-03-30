import 'server-only';

import {
  FORM_RATE_LIMIT_MAX_ATTEMPTS,
  FORM_RATE_LIMIT_WINDOW_MS,
  MIN_FORM_FILL_DURATION_MS,
} from '@/lib/forms/antispam';
import type { AntiSpamPayload } from '@/lib/forms/types';

type ProtectedFormName = 'contact' | 'demo' | 'ticket';

type ProtectionSuccess = {
  ipAddress?: string;
  ok: true;
  userAgent?: string;
};

type ProtectionFailure = {
  ipAddress?: string;
  message: string;
  ok: false;
  reason: string;
  status: number;
  userAgent?: string;
};

type ProtectionResult = ProtectionFailure | ProtectionSuccess;

type TurnstileVerificationResponse = {
  'error-codes'?: string[];
  success?: boolean;
};

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const globalRateLimitStore = globalThis as typeof globalThis & {
  __vesaliusRateLimitStore?: Map<string, number[]>;
};

function getRateLimitStore() {
  if (!globalRateLimitStore.__vesaliusRateLimitStore) {
    globalRateLimitStore.__vesaliusRateLimitStore = new Map<string, number[]>();
  }

  return globalRateLimitStore.__vesaliusRateLimitStore;
}

function getIpAddress(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const firstForwarded = forwardedFor.split(',')[0]?.trim();

    if (firstForwarded) {
      return firstForwarded;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  return realIp && realIp.length > 0 ? realIp : undefined;
}

function getTurnstileSecret() {
  const value = process.env.TURNSTILE_SECRET_KEY?.trim();
  return value && value.length > 0 ? value : undefined;
}

function hasTrustedOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const candidateHeaders = [request.headers.get('origin'), request.headers.get('referer')];

  for (const headerValue of candidateHeaders) {
    if (!headerValue) {
      continue;
    }

    try {
      const origin = new URL(headerValue).origin;

      if (origin === requestUrl.origin) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return candidateHeaders.every((value) => value === null);
}

function checkRateLimit(formName: ProtectedFormName, ipAddress?: string) {
  if (!ipAddress) {
    return true;
  }

  const now = Date.now();
  const key = `${formName}:${ipAddress}`;
  const store = getRateLimitStore();
  const attempts = (store.get(key) ?? []).filter(
    (timestamp) => now - timestamp < FORM_RATE_LIMIT_WINDOW_MS,
  );

  if (attempts.length >= FORM_RATE_LIMIT_MAX_ATTEMPTS) {
    store.set(key, attempts);
    return false;
  }

  attempts.push(now);
  store.set(key, attempts);

  for (const [storeKey, storeAttempts] of store.entries()) {
    const recentAttempts = storeAttempts.filter(
      (timestamp) => now - timestamp < FORM_RATE_LIMIT_WINDOW_MS,
    );

    if (recentAttempts.length === 0) {
      store.delete(storeKey);
    } else if (recentAttempts.length !== storeAttempts.length) {
      store.set(storeKey, recentAttempts);
    }
  }

  return true;
}

async function verifyTurnstileToken(turnstileToken: string | undefined, ipAddress?: string) {
  const secret = getTurnstileSecret();

  if (!secret) {
    return {
      ok: true,
      skipped: true,
    } as const;
  }

  if (!turnstileToken) {
    return {
      ok: false,
      reason: 'turnstile_missing',
    } as const;
  }

  const requestBody = new URLSearchParams({
    response: turnstileToken,
    secret,
  });

  if (ipAddress) {
    requestBody.set('remoteip', ipAddress);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    body: requestBody,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  if (!response.ok) {
    return {
      ok: false,
      reason: `turnstile_http_${response.status}`,
    } as const;
  }

  const data = (await response.json()) as TurnstileVerificationResponse;

  if (data.success) {
    return {
      ok: true,
      skipped: false,
    } as const;
  }

  return {
    ok: false,
    reason: data['error-codes']?.join(',') || 'turnstile_failed',
  } as const;
}

export async function protectFormSubmission({
  antiSpam,
  formName,
  request,
}: {
  antiSpam: AntiSpamPayload;
  formName: ProtectedFormName;
  request: Request;
}): Promise<ProtectionResult> {
  const ipAddress = getIpAddress(request);
  const userAgent = request.headers.get('user-agent') ?? undefined;

  if (!hasTrustedOrigin(request)) {
    return {
      ipAddress,
      message: 'We could not verify where this request came from.',
      ok: false,
      reason: 'origin_mismatch',
      status: 403,
      userAgent,
    };
  }

  if (antiSpam.honeypot.length > 0) {
    return {
      ipAddress,
      message: 'We could not validate your request. Please try again.',
      ok: false,
      reason: 'honeypot_filled',
      status: 400,
      userAgent,
    };
  }

  if (
    antiSpam.submittedAt === null ||
    !Number.isFinite(antiSpam.submittedAt) ||
    Date.now() - antiSpam.submittedAt < MIN_FORM_FILL_DURATION_MS
  ) {
    return {
      ipAddress,
      message: 'Please wait a moment and try again.',
      ok: false,
      reason: 'submitted_too_quickly',
      status: 400,
      userAgent,
    };
  }

  if (!checkRateLimit(formName, ipAddress)) {
    return {
      ipAddress,
      message: 'Please wait a moment before sending another request.',
      ok: false,
      reason: 'rate_limited',
      status: 429,
      userAgent,
    };
  }

  const turnstileResult = await verifyTurnstileToken(antiSpam.turnstileToken, ipAddress);

  if (!turnstileResult.ok) {
    return {
      ipAddress,
      message: 'Please complete the anti-spam check and try again.',
      ok: false,
      reason: turnstileResult.reason,
      status: 400,
      userAgent,
    };
  }

  return {
    ipAddress,
    ok: true,
    userAgent,
  };
}
