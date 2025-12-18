'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

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
    setIsVisible(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functionality: true,
      analytics: true,
      advertisement: true,
    };
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    saveConsent(defaultPreferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't toggle necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Main Banner */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-[#06ACC1]/10 items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="8" cy="9" r="1" fill="#06ACC1"/>
                    <circle cx="15" cy="8" r="1" fill="#06ACC1"/>
                    <circle cx="10" cy="14" r="1" fill="#06ACC1"/>
                    <circle cx="16" cy="14" r="1" fill="#06ACC1"/>
                    <circle cx="12" cy="11" r="1" fill="#06ACC1"/>
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2B3B53] mb-2">
                    {t('title')}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t('description')}{' '}
                    <Link href="/cookie-policy" className="text-[#06ACC1] hover:underline">
                      {t('learnMore')}
                    </Link>
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptAll}
                      className="px-6 py-2.5 rounded-full bg-[#06ACC1] text-white font-semibold text-sm hover:bg-[#0597a9] transition-colors shadow-lg shadow-[#06ACC1]/20"
                    >
                      {t('acceptAll')}
                    </button>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-[#2B3B53] font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {t('customize')}
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-6 py-2.5 rounded-full text-gray-500 font-medium text-sm hover:text-gray-700 transition-colors"
                    >
                      {t('rejectAll')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookie Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 overflow-hidden"
                >
                  <div className="p-6 bg-[#F9FBFC]">
                    <h4 className="font-semibold text-[#2B3B53] mb-4">{t('settings.title')}</h4>
                    
                    <div className="space-y-4">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#2B3B53]">{t('settings.necessary.title')}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{t('settings.required')}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{t('settings.necessary.description')}</p>
                        </div>
                        <div className="w-12 h-7 bg-[#06ACC1] rounded-full relative cursor-not-allowed opacity-70">
                          <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow" />
                        </div>
                      </div>

                      {/* Functionality Cookies */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex-1 pr-4">
                          <span className="font-medium text-[#2B3B53]">{t('settings.functionality.title')}</span>
                          <p className="text-sm text-gray-500 mt-1">{t('settings.functionality.description')}</p>
                        </div>
                        <button
                          onClick={() => togglePreference('functionality')}
                          className={`w-12 h-7 rounded-full relative transition-colors ${preferences.functionality ? 'bg-[#06ACC1]' : 'bg-gray-200'}`}
                        >
                          <motion.div 
                            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                            animate={{ left: preferences.functionality ? '22px' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex-1 pr-4">
                          <span className="font-medium text-[#2B3B53]">{t('settings.analytics.title')}</span>
                          <p className="text-sm text-gray-500 mt-1">{t('settings.analytics.description')}</p>
                        </div>
                        <button
                          onClick={() => togglePreference('analytics')}
                          className={`w-12 h-7 rounded-full relative transition-colors ${preferences.analytics ? 'bg-[#06ACC1]' : 'bg-gray-200'}`}
                        >
                          <motion.div 
                            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                            animate={{ left: preferences.analytics ? '22px' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      {/* Advertisement Cookies */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex-1 pr-4">
                          <span className="font-medium text-[#2B3B53]">{t('settings.advertisement.title')}</span>
                          <p className="text-sm text-gray-500 mt-1">{t('settings.advertisement.description')}</p>
                        </div>
                        <button
                          onClick={() => togglePreference('advertisement')}
                          className={`w-12 h-7 rounded-full relative transition-colors ${preferences.advertisement ? 'bg-[#06ACC1]' : 'bg-gray-200'}`}
                        >
                          <motion.div 
                            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                            animate={{ left: preferences.advertisement ? '22px' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={acceptSelected}
                        className="px-6 py-2.5 rounded-full bg-[#06ACC1] text-white font-semibold text-sm hover:bg-[#0597a9] transition-colors"
                      >
                        {t('savePreferences')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

