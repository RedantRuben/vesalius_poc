'use client';

import { OPEN_SETTINGS_EVENT } from '@/components/CookieConsent';

/** Reopens the cookie choice card, so a visitor can change or withdraw consent at any time. */
export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B1B3D] text-white text-sm font-semibold hover:bg-[#13285a] transition-colors"
    >
      {label}
    </button>
  );
}
