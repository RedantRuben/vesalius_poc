'use client';

export function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-rose-600">{message}</p>;
}

export function FormAlert({
  message,
  tone = 'error',
}: {
  message?: string;
  tone?: 'error' | 'info';
}) {
  if (!message) {
    return null;
  }

  const classes =
    tone === 'info'
      ? 'border-cyan-200 bg-cyan-50 text-cyan-900'
      : 'border-rose-200 bg-rose-50 text-rose-700';

  return <div className={`rounded-2xl border px-4 py-3 text-sm ${classes}`}>{message}</div>;
}
