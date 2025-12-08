'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

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
    <div className="flex items-center gap-6 text-sm">
      <button 
        onClick={() => onSelectChange('nl')}
        disabled={isPending}
        className={`${locale === 'nl' ? 'text-[#06ACC1] font-medium' : 'text-gray-600 hover:text-[#06ACC1]'}`}
      >
        Nederlands (BE)
      </button>
      <div className="h-4 w-px bg-gray-300"></div>
      <button 
        onClick={() => onSelectChange('en')}
        disabled={isPending}
        className={`${locale === 'en' ? 'text-[#06ACC1] font-medium' : 'text-gray-600 hover:text-[#06ACC1]'}`}
      >
        English (US)
      </button>
      <div className="h-4 w-px bg-gray-300"></div>
      <button 
        onClick={() => onSelectChange('fr')}
        disabled={isPending}
        className={`${locale === 'fr' ? 'text-[#06ACC1] font-medium' : 'text-gray-600 hover:text-[#06ACC1]'}`}
      >
        Français (BE)
      </button>
    </div>
  );
}
