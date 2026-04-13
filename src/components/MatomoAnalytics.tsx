'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type CookiePreferences = {
  necessary: boolean;
  functionality: boolean;
  analytics: boolean;
  advertisement: boolean;
};

type MatomoWindow = Window & {
  _paq?: unknown[];
  __vesaliusMatomoLoaded?: boolean;
  __vesaliusMatomoConfigured?: boolean;
};

const MATOMO_URL = 'https://analytics.vesalius.ai/';
const MATOMO_SITE_ID = '2';
const CONSENT_EVENT = 'cookie-consent-updated';

function getAnalyticsConsent() {
  if (typeof window === 'undefined') {
    return false;
  }

  const consent = window.localStorage.getItem('cookie-consent');

  if (!consent) {
    return false;
  }

  try {
    const preferences = JSON.parse(consent) as CookiePreferences;
    return preferences.analytics;
  } catch {
    return false;
  }
}

function ensureMatomoLoaded() {
  const matomoWindow = window as MatomoWindow;
  const paq = (matomoWindow._paq = matomoWindow._paq || []);

  if (!matomoWindow.__vesaliusMatomoConfigured) {
    paq.push(['enableLinkTracking']);
    paq.push(['setTrackerUrl', `${MATOMO_URL}matomo.php`]);
    paq.push(['setSiteId', MATOMO_SITE_ID]);
    matomoWindow.__vesaliusMatomoConfigured = true;
  }

  if (matomoWindow.__vesaliusMatomoLoaded) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `${MATOMO_URL}matomo.js`;
  document.head.appendChild(script);

  matomoWindow.__vesaliusMatomoLoaded = true;
}

export default function MatomoAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setHasConsent(getAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener('storage', syncConsent);
    window.addEventListener(CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener('storage', syncConsent);
      window.removeEventListener(CONSENT_EVENT, syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!hasConsent) {
      return;
    }

    ensureMatomoLoaded();
  }, [hasConsent]);

  useEffect(() => {
    if (!hasConsent || !pathname) {
      return;
    }

    const matomoWindow = window as MatomoWindow;
    const paq = (matomoWindow._paq = matomoWindow._paq || []);
    const queryString = searchParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    paq.push(['setCustomUrl', url]);
    paq.push(['setDocumentTitle', document.title]);
    paq.push(['trackPageView']);
  }, [hasConsent, pathname, searchParams]);

  return null;
}
