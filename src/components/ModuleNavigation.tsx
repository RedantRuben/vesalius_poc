'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const modules = [
  { path: '/product/pre-consultation', key: 'preConsultation' },
  { path: '/product/scribe', key: 'scribe' },
  { path: '/product/document-generation', key: 'documentGeneration' },
  { path: '/product/smart-triage', key: 'smartTriage' },
  { path: '/product/smart-follow-up', key: 'smartFollowUp' },
  { path: '/product/medication', key: 'medication' }
];

export default function ModuleNavigation() {
  const pathname = usePathname();
  const t = useTranslations('Modules');

  const currentIndex = modules.findIndex(m => m.path === pathname);
  
  if (currentIndex === -1) return null;

  const nextIndex = (currentIndex + 1) % modules.length;
  const nextModule = modules[nextIndex];

  const prevIndex = (currentIndex - 1 + modules.length) % modules.length;
  const prevModule = modules[prevIndex];

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link href={prevModule.path} className="group flex items-center gap-2 text-left py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#06ACC1] transition-colors">
                <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="text-sm text-gray-500 group-hover:text-[#06ACC1] transition-colors">
                {t(`${prevModule.key}.title`)}
            </span>
        </Link>

        <Link href={nextModule.path} className="group flex items-center gap-2 text-right py-1">
            <span className="text-sm text-gray-500 group-hover:text-[#06ACC1] transition-colors">
                {t(`${nextModule.key}.title`)}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#06ACC1] transition-colors">
                <path d="m9 18 6-6-6-6"/>
            </svg>
        </Link>
      </div>
    </div>
  );
}
