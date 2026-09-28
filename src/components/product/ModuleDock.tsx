'use client';

import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { MODULES, PHASE_MESSAGE_KEY, PHASES, type ModuleEntry } from '@/lib/modules';
import type { UiCopy } from './content';

export const ModuleIcon = ({ entry, size = 20 }: { entry: ModuleEntry; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={entry.icon} />
  </svg>
);

const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
  </svg>
);

/**
 * Floating dock across all module pages: every module grouped by phase of the patient journey,
 * the current one highlighted, prev/next arrows, and ← → keyboard navigation.
 */
export default function ModuleDock({ current, ui }: { current: ModuleEntry; ui: UiCopy }) {
  const t = useTranslations('Modules');
  const router = useRouter();
  const index = MODULES.findIndex((m) => m.slug === current.slug);
  const prev = MODULES[(index - 1 + MODULES.length) % MODULES.length];
  const next = MODULES[(index + 1) % MODULES.length];

  // Step out of the way while the footer is on screen, so it never covers links or the language switch.
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { threshold: 0 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;
      // Resolve the neighbour from the live URL, so quick repeated presses never act on a stale page.
      const slug = window.location.pathname.split('/').filter(Boolean).pop();
      const at = MODULES.findIndex((m) => m.slug === slug);
      if (at === -1) return;
      const step = event.key === 'ArrowLeft' ? -1 : 1;
      router.push(`/product/${MODULES[(at + step + MODULES.length) % MODULES.length].slug}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  return (
    <motion.nav
      aria-label={ui.modulesNav}
      initial={{ y: 80, opacity: 0 }}
      animate={footerVisible ? { y: 120, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      style={{ pointerEvents: footerVisible ? 'none' : undefined }}
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1rem)]"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/80 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-slate-200/80 shadow-[0_20px_50px_-20px_rgba(11,27,61,0.45)]">
        <Link
          href={`/product/${prev.slug}`}
          aria-label={`${ui.previous}: ${t(`${prev.key}.title`)}`}
          className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100 transition-colors"
        >
          <Arrow direction="left" />
        </Link>

        {PHASES.map((phase, phaseIndex) => (
          <Fragment key={phase}>
            {phaseIndex > 0 && <span className="w-px h-6 bg-slate-200 mx-0.5 sm:mx-1" aria-hidden="true" />}
            <div className="flex items-center gap-0.5" role="group" aria-label={t(PHASE_MESSAGE_KEY[phase])}>
              {MODULES.filter((m) => m.phase === phase).map((entry) => {
                const active = entry.slug === current.slug;
                return (
                  <Link
                    key={entry.slug}
                    href={`/product/${entry.slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors ${
                      active ? 'text-white' : 'text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100'
                    }`}
                  >
                    {active && (
                      <motion.span layoutId="module-dock-active" className="absolute inset-0 rounded-full bg-[#0B1B3D]" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                    )}
                    <span className="relative">
                      <ModuleIcon entry={entry} />
                    </span>
                    <span className="sr-only">{t(`${entry.key}.title`)}</span>
                    <span
                      className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0B1B3D] text-white text-xs font-medium px-3 py-1.5 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
                      aria-hidden="true"
                    >
                      {t(`${entry.key}.title`)}
                      <span className="text-white/50"> · {t(PHASE_MESSAGE_KEY[phase])}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </Fragment>
        ))}

        <Link
          href={`/product/${next.slug}`}
          aria-label={`${ui.next}: ${t(`${next.key}.title`)}`}
          className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100 transition-colors"
        >
          <Arrow direction="right" />
        </Link>
      </div>
      <p className="hidden md:block text-center text-[11px] text-slate-400 mt-2">{ui.keyboardHint}</p>
    </motion.nav>
  );
}
