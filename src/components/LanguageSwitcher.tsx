'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

const LANGUAGES = [
  { code: 'nl', label: 'Nederlands' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
] as const;

/** Segmented language control for the dark footer. */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] ring-1 ring-white/10 p-1 text-[13px]" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => onSelectChange(code)}
            disabled={isPending || active}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors ${active ? 'bg-white/[0.12] text-white' : 'text-white/55 hover:text-white'}`}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden uppercase">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
