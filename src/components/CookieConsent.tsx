'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const CONSENT_EVENT = 'cookie-consent-updated';
const EASE = [0.16, 1, 0.3, 1] as const;

type CookiePreferences = {
  necessary: boolean;
  functionality: boolean;
  analytics: boolean;
  advertisement: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  functionality: false,
  analytics: false,
  advertisement: false,
};

const OPTIONAL = ['functionality', 'analytics', 'advertisement'] as const;

/** A small switch in the site's navy; the label sits next to it, so the switch itself only needs its state. */
function Switch({ on, onChange, disabled = false, label }: { on: boolean; onChange?: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-300 ${on ? 'bg-[#0B1B3D]' : 'bg-slate-200 hover:bg-slate-300'} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <motion.span
        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{ x: on ? 16 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  );
}

/** Cookie choice, bottom right (where Quinten’s message appears later, once a choice is made): the same quiet card as the rest of the site, with equal weight for accept and decline. */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const t = useTranslations('CookieConsent');

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setIsVisible(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, functionality: true, analytics: true, advertisement: true });
  const acceptSelected = () => saveConsent(preferences);
  const rejectAll = () => saveConsent(defaultPreferences);

  const togglePreference = (key: (typeof OPTIONAL)[number]) => setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          role="dialog"
          aria-label={t('title')}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed z-[100] left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[400px] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[24px] bg-white ring-1 ring-slate-200/80 shadow-[0_24px_60px_-20px_rgba(11,27,61,0.35)] p-5"
        >
          <p className="text-[15px] font-semibold text-[#0B1B3D] tracking-tight">{t('title')}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {t('description')}{' '}
            <Link href="/cookie-policy" className="font-medium text-[#0B1B3D] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0B1B3D]">
              {t('learnMore')}
            </Link>
          </p>

          <AnimatePresence initial={false}>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
                  <li className="flex items-start justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-medium text-[#0B1B3D]">
                        {t('settings.necessary.title')}
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">{t('settings.required')}</span>
                      </span>
                      <span className="block mt-0.5 text-[13px] leading-snug text-slate-500">{t('settings.necessary.description')}</span>
                    </span>
                    <Switch on disabled label={t('settings.necessary.title')} />
                  </li>
                  {OPTIONAL.map((key) => (
                    <li key={key} className="flex items-start justify-between gap-4 py-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-[#0B1B3D]">{t(`settings.${key}.title`)}</span>
                        <span className="block mt-0.5 text-[13px] leading-snug text-slate-500">{t(`settings.${key}.description`)}</span>
                      </span>
                      <Switch on={preferences[key]} onChange={() => togglePreference(key)} label={t(`settings.${key}.title`)} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Accept and decline side by side, with the same size; in the settings, saving the choice takes the place of declining */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={showSettings ? acceptSelected : rejectAll}
              className="px-4 py-2.5 rounded-full bg-white ring-1 ring-slate-200 text-sm font-semibold text-[#0B1B3D] hover:ring-slate-300 hover:bg-slate-50 transition"
            >
              {showSettings ? t('savePreferences') : t('rejectAll')}
            </button>
            <button type="button" onClick={acceptAll} className="px-4 py-2.5 rounded-full bg-[#0B1B3D] text-sm font-semibold text-white hover:bg-[#13285a] transition-colors">
              {t('acceptAll')}
            </button>
          </div>
          {!showSettings && (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              aria-expanded={showSettings}
              className="mt-3 w-full text-center text-[13px] font-medium text-slate-500 hover:text-[#0B1B3D] transition-colors"
            >
              {t('customize')}
            </button>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
