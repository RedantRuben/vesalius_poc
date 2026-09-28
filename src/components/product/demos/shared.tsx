'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import type { SiteLocale } from '../content';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Advances 0 → count, one step every `stepMs`; jumps straight to the end for reduced motion. */
export function useSteps(count: number, stepMs: number, startDelayMs = 400) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timers = Array.from({ length: count }, (_, i) => setTimeout(() => setStep(i + 1), startDelayMs + i * stepMs));
    return () => timers.forEach(clearTimeout);
  }, [count, stepMs, startDelayMs, reduceMotion]);

  return reduceMotion ? count : step;
}

/** Picks the copy for the active site locale, falling back to English. */
export function useLocalized<T>(byLocale: Record<SiteLocale, T>): T {
  const locale = useLocale();
  return byLocale[(locale as SiteLocale) in byLocale ? (locale as SiteLocale) : 'en'];
}

export const Check = ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TypingDots = ({ className = 'bg-slate-400' }: { className?: string }) => (
  <span className="inline-flex gap-1" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <span key={i} className={`w-1.5 h-1.5 rounded-full animate-pulse ${className}`} style={{ animationDelay: `${i * 150}ms` }} />
    ))}
  </span>
);
