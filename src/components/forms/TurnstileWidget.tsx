'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

import { getTurnstileSiteKey } from '@/lib/forms/antispam';

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      render: (
        container: HTMLElement,
        options: {
          action?: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          sitekey: string;
          theme?: 'auto' | 'dark' | 'light';
        },
      ) => string;
    };
  }
}

export default function TurnstileWidget({
  action,
  onTokenChange,
  resetSignal = 0,
}: {
  action: string;
  onTokenChange: (token: string) => void;
  resetSignal?: number;
}) {
  const siteKey = getTurnstileSiteKey();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const previousResetSignalRef = useRef(resetSignal);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      action,
      callback(token) {
        onTokenChangeRef.current(token);
      },
      'error-callback'() {
        onTokenChangeRef.current('');
      },
      'expired-callback'() {
        onTokenChangeRef.current('');
      },
      sitekey: siteKey,
      theme: 'light',
    });

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = null;
    };
  }, [action, scriptReady, siteKey]);

  useEffect(() => {
    if (previousResetSignalRef.current === resetSignal) {
      return;
    }

    previousResetSignalRef.current = resetSignal;

    if (widgetIdRef.current && window.turnstile?.reset) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChangeRef.current('');
    }
  }, [resetSignal]);

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
