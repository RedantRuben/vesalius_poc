import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';

import CookieSettingsButton from '@/components/CookieSettingsButton';
import MarketingPageShell from '@/components/MarketingPageShell';
import { Link } from '@/i18n/routing';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

/**
 * Every cookie and browser-storage key this site and the Vesalius platform use, taken from the code.
 * Keep it in step with the code: a new cookie or storage key needs a row here.
 */
type StorageEntry = {
  name: string;
  type: 'Cookie' | 'Local storage' | 'Session storage';
  setBy: string;
  purpose: string;
  duration: string;
};

const websiteGroups: Array<{ title: string; intro: string; entries: StorageEntry[] }> = [
  {
    title: 'Necessary',
    intro:
      'These make the site work and remember choices you make yourself, such as your language. They are always on.',
    entries: [
      {
        name: 'NEXT_LOCALE',
        type: 'Cookie',
        setBy: 'vesalius.ai',
        purpose: 'Remembers the language you use the site in (English, Dutch or French).',
        duration: 'Until you close your browser, or 1 year after you pick a language',
      },
      {
        name: 'vesalius-specialty',
        type: 'Cookie',
        setBy: 'vesalius.ai',
        purpose: 'Remembers the medical specialty you picked, so the site shows the version for your specialty.',
        duration: '1 year',
      },
      {
        name: 'vesalius-specialty',
        type: 'Local storage',
        setBy: 'vesalius.ai',
        purpose: 'The same specialty choice, kept in your browser.',
        duration: 'Until you clear your browser data',
      },
      {
        name: 'vesalius-specialty-asked',
        type: 'Session storage',
        setBy: 'vesalius.ai',
        purpose: 'Makes sure we ask for your specialty at most once per visit.',
        duration: 'Until you close your browser',
      },
      {
        name: 'vesalius-demo-message-dismissed',
        type: 'Session storage',
        setBy: 'vesalius.ai',
        purpose: 'Remembers that you closed the invitation to book a demo, so it does not come back during this visit.',
        duration: 'Until you close your browser',
      },
      {
        name: 'cookie-consent, cookie-consent-date',
        type: 'Local storage',
        setBy: 'vesalius.ai',
        purpose: 'Remembers your cookie choices and when you made them.',
        duration: 'Until you clear your browser data',
      },
      {
        name: 'vesalius-faq-admin',
        type: 'Cookie',
        setBy: 'vesalius.ai',
        purpose: 'Keeps Vesalius staff signed in while they edit help articles. Visitors never receive it.',
        duration: '12 hours',
      },
    ],
  },
  {
    title: 'Functionality',
    intro: 'These recognise you as an existing customer. You can switch them off.',
    entries: [
      {
        name: 'vh_has_account',
        type: 'Cookie',
        setBy: 'Vesalius platform (whole vesalius.ai domain)',
        purpose:
          'Set by the Vesalius platform when a healthcare professional logs in. It only contains the value "1" and no personal data. This site reads it to offer existing customers a direct link to the platform on the homepage. We ignore it when you switch off functionality cookies.',
        duration: '1 year; removed when your account is deleted or disabled',
      },
      {
        name: 'vesalius-welcome-back-hidden',
        type: 'Local storage',
        setBy: 'vesalius.ai',
        purpose: 'Remembers that you chose not to see the "Welcome back" message again.',
        duration: 'Until you clear your browser data',
      },
      {
        name: 'vesalius-welcome-back-shown',
        type: 'Session storage',
        setBy: 'vesalius.ai',
        purpose: 'Makes sure the "Welcome back" message appears at most once per visit.',
        duration: 'Until you close your browser',
      },
    ],
  },
  {
    title: 'Analytics',
    intro:
      'We use Matomo to count visits and see which pages help visitors. These cookies are only set after you accept analytics cookies. We do not share this data with advertisers.',
    entries: [
      {
        name: '_pk_id.*',
        type: 'Cookie',
        setBy: 'Matomo (analytics.vesalius.ai)',
        purpose: 'A random identifier that lets us recognise repeat visits.',
        duration: '13 months',
      },
      {
        name: '_pk_ses.*',
        type: 'Cookie',
        setBy: 'Matomo (analytics.vesalius.ai)',
        purpose: 'Groups the pages you view during one visit.',
        duration: '30 minutes',
      },
      {
        name: '_pk_ref.*',
        type: 'Cookie',
        setBy: 'Matomo (analytics.vesalius.ai)',
        purpose: 'Remembers which website brought you here.',
        duration: '6 months',
      },
    ],
  },
];

const thirdParties: Array<{ name: string; where: string; body: string; policy: string }> = [
  {
    name: 'Google Maps',
    where: 'The map in the contact section of the homepage',
    body: 'The map loads from Google when you scroll to it. Google may set or read its own cookies, especially if you are signed in to a Google account.',
    policy: 'https://policies.google.com/technologies/cookies',
  },
  {
    name: 'Google Calendar',
    where: 'Booking a demo, and booking a call on the support page',
    body: 'The booking calendar loads from Google. Google may set or read its own cookies, especially if you are signed in to a Google account.',
    policy: 'https://policies.google.com/technologies/cookies',
  },
  {
    name: 'Cloudflare Turnstile',
    where: 'Our contact, demo and support forms, when the anti-spam check is switched on',
    body: 'Cloudflare checks that a form is sent by a person and not a bot, using technical information from your browser.',
    policy: 'https://www.cloudflare.com/turnstile-privacy-policy/',
  },
];

const platformEntries: StorageEntry[] = [
  {
    name: 'AUTH_SESSION_ID, KC_RESTART, KC_AUTH_SESSION_HASH, KEYCLOAK_IDENTITY, KEYCLOAK_SESSION',
    type: 'Cookie',
    setBy: 'iam.vesalius.ai (our login service)',
    purpose: 'Sign you in securely and keep you signed in. Necessary for the platform to work.',
    duration: 'Until you log out or your session ends',
  },
  {
    name: 'vh_has_account',
    type: 'Cookie',
    setBy: 'assistant.vesalius.ai',
    purpose: 'Lets this website recognise healthcare professionals who have an account (see above).',
    duration: '1 year; removed when your account is deleted or disabled',
  },
  {
    name: 'Platform preferences',
    type: 'Local storage',
    setBy: 'assistant.vesalius.ai',
    purpose:
      'Remember your settings in the platform, such as language, selected practice, menu state, and table filters and sorting. Some temporary steps, like onboarding and accepting the privacy statement, use session storage.',
    duration: 'Until you clear your browser data, or until you close your browser for session storage',
  },
  {
    name: '_pk_id.*, _pk_ses.*, _pk_ref.*',
    type: 'Cookie',
    setBy: 'Matomo (analytics.vesalius.ai)',
    purpose: 'Usage statistics for the platform. Only set after you accept analytics in the platform’s cookie message.',
    duration: '13 months, 30 minutes and 6 months',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/cookie-policy',
    title: 'Cookie Policy',
    description:
      'Which cookies and browser storage the Vesalius website and platform use, why, for how long, and how to change your choices.',
  });
}

const sectionTitle = 'text-xl md:text-2xl font-semibold tracking-tight text-[#0B1B3D] mb-3';
const linkClass = 'font-medium text-[#0B1B3D] underline underline-offset-4 decoration-slate-300 hover:decoration-[#0B1B3D]';

function EntryList({ entries }: { entries: StorageEntry[] }) {
  return (
    <ul className="divide-y divide-slate-200/80">
      {entries.map((entry) => (
        <li key={`${entry.name}-${entry.type}`} className="py-4 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <code className="font-mono text-[13px] font-semibold text-[#0B1B3D] break-all">{entry.name}</code>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">{entry.type}</span>
          </div>
          <p className="mt-1.5 leading-7">{entry.purpose}</p>
          <p className="mt-1 text-sm text-slate-500">
            {entry.setBy} · {entry.duration}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function CookiePolicyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto rounded-[36px] border border-slate-200 bg-white p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(11,27,61,0.2)]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1B3D] mb-4">Cookie Policy</h1>
          <p className="text-slate-500">This Cookie Policy was last updated on November 20, 2026.</p>

          <div className="mt-10 space-y-12 text-slate-600">
            <section>
              <p className="text-lg leading-8">
                This page lists every cookie and every piece of browser storage that this website (vesalius.ai) and the
                Vesalius platform use, why we use it, and how long it stays. We do not use advertising cookies, and we
                do not sell or share your data with advertisers.
              </p>
            </section>

            <section>
              <h2 className={sectionTitle}>What are cookies?</h2>
              <p className="leading-8">
                Cookies are small text files a website stores in your browser. Local storage and session storage work
                the same way, but stay in your browser and are not sent to our servers. Session storage is removed when
                you close your browser. We list all three below.
              </p>
            </section>

            <section>
              <h2 className={sectionTitle}>Your choices</h2>
              <p className="leading-8">
                On your first visit we ask which cookies you accept. Necessary cookies are always on. Functionality and
                analytics cookies are only used with your permission, and you can change your choice at any time. You can
                also delete cookies and browser storage in your browser settings.
              </p>
              <div className="mt-5">
                <CookieSettingsButton label="Change cookie settings" />
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>On this website</h2>
              <div className="mt-6 space-y-6">
                {websiteGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
                    <h3 className="font-semibold text-[#0B1B3D]">{group.title}</h3>
                    <p className="mt-1 mb-5 text-[15px] leading-7 text-slate-500">{group.intro}</p>
                    <EntryList entries={group.entries} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Content from other companies</h2>
              <p className="leading-8">
                Some parts of the site load content from other companies. They decide which cookies they use, under their
                own policies.
              </p>
              <ul className="mt-6 space-y-4">
                {thirdParties.map((party) => (
                  <li key={party.name} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
                    <h3 className="font-semibold text-[#0B1B3D]">{party.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{party.where}</p>
                    <p className="mt-2 leading-7">
                      {party.body}{' '}
                      <a href={party.policy} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        Their policy
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={sectionTitle}>On the Vesalius platform</h2>
              <p className="leading-8">
                When you log in at assistant.vesalius.ai, the platform uses the cookies and storage below. The platform
                also sends error reports to Sentry so we can fix problems quickly; Sentry does not set cookies. More about
                how we handle data in the platform is in our{' '}
                <Link href="/privacy-policy" className={linkClass}>
                  privacy policy
                </Link>
                .
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
                <EntryList entries={platformEntries} />
              </div>
            </section>

            <section>
              <h2 className={sectionTitle}>Questions</h2>
              <p className="leading-8">
                Email us at{' '}
                <a href="mailto:help@vesalius.health" className={linkClass}>
                  help@vesalius.health
                </a>
                . You can also contact the Belgian Data Protection Authority at{' '}
                <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  dataprotectionauthority.be
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
