'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FaqAdminLoginFormProps {
  isConfigured: boolean;
  locale: string;
}

export default function FaqAdminLoginForm({
  isConfigured,
  locale,
}: FaqAdminLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || `/${locale}/admin/faq`;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setError('Set FAQ admin environment variables before logging in.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/session', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, username }),
      });

      const payload = (await response.json()) as { message?: string; ok?: boolean };

      if (!response.ok || !payload.ok) {
        setError(payload.message || 'Login failed. Please check your credentials.');
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-[#0B1B3D] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            FAQ CMS
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-[#0B1B3D]">Admin login</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Use the credentials from your <code>.env.local</code> file to edit FAQ articles and
            upload images.
          </p>
        </div>

        {!isConfigured ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Missing <code>FAQ_ADMIN_USERNAME</code>, <code>FAQ_ADMIN_PASSWORD</code>, or{' '}
            <code>FAQ_ADMIN_SECRET</code>.
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#06ACC1] focus:bg-white"
              autoComplete="username"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#06ACC1] focus:bg-white"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting || !isConfigured}
            className="w-full rounded-2xl bg-[#0B1B3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
