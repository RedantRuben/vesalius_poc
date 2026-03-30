import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';

import MarketingPageShell from '@/components/MarketingPageShell';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const cookieCategories = [
  {
    title: 'Necessary Cookies',
    body:
      'These cookies are necessary for the Site to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms. Without these cookies, some parts of our Site will not function properly.',
  },
  {
    title: 'Functionality Cookies',
    body:
      'These cookies allow the website to remember choices you make, such as your user name, language, or the region you are in, and provide enhanced, more personal features.',
  },
  {
    title: 'Analytics Cookies',
    body:
      'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Site. They help us know which pages are the most and least popular and see how visitors move around the Site.',
  },
  {
    title: 'Advertisement Cookies',
    body:
      'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.',
  },
] as const;

const cookieInventory = [
  {
    title: 'Necessary Cookies',
    items: [
      '__hs_do_not_track: This cookie prevents the tracking code from sending any information to HubSpot.',
      '__hs_initial_opt_in: Used to prevent always-on banner display when visitors are browsing in strict mode.',
      '__hs_opt_out: Used by the banner to not ask visitors to accept cookies again.',
      '__cf_bm: This cookie from Cloudflare identifies and mitigates automated traffic to protect our site from bad bots.',
    ],
  },
  {
    title: 'Functionality Cookies',
    items: [
      'AWSALBCORS: This cookie from Airtable.com supports stickiness with CORS use cases.',
      'li_gc: This cookie from LinkedIn.com stores guest consent to the use of cookies for non-essential purposes.',
      'AnalyticsSyncHistory: This LinkedIn.com cookie stores information about the time a sync with the lms_analytics cookie took place.',
    ],
  },
  {
    title: 'Analytics Cookies',
    items: [
      'vuid: This first-party cookie created by Vimeo is used to assign a Vimeo Analytics unique ID.',
      '__hssc: This is an analytics session cookie from our site.',
      '__hssrc: Used to determine if a session is a new session or a repeat visit.',
      "hubspotutk: Contains visitor's identity.",
      '_ga: ID used to identify users.',
      '__hstc: This is an analytics tracking cookie.',
      '_ga_75H08F0Q9M: Used to persist session state.',
    ],
  },
  {
    title: 'Advertisement Cookies',
    items: [
      'bscookie: This cookie is used by LinkedIn to track the use of embedded services.',
      'UserMatchHistory: These cookies are set by LinkedIn for advertising purposes.',
      'lidc: Used by LinkedIn for tracking the use of embedded services.',
      'NID: This Google.com cookie is used for ad personalization and conversion tracking.',
      'bcookie: Used by LinkedIn to track the use of embedded services.',
    ],
  },
  {
    title: 'Uncategorized Cookies',
    items: [
      "_dd_s: This cookie's purpose is currently not documented by us.",
      "WG_CHOOSE_ORIGINAL: This cookie's purpose is currently not documented by us.",
      'brw: This cookie from Airtable.com has an undocumented purpose.',
      '__Host-airtable-session: This cookie from Airtable.com has an undocumented purpose.',
      '__Host-airtable-session.sig: This cookie from Airtable.com has an undocumented purpose.',
      "ln_or: This cookie's purpose is currently not documented by us.",
    ],
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/cookie-policy',
    title: 'Cookie Policy',
    description:
      'Read the Vesalius cookie policy covering cookie categories, consent, analytics, advertising technologies, and browser controls.',
  });
}

export default function CookiePolicyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto rounded-[36px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(11,27,61,0.2)]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1B3D] mb-4">
            Cookie Policy
          </h1>
          <p className="text-slate-500">This Cookie Policy was last updated on September 11, 2024.</p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <p className="text-lg leading-8">
                Our Site uses cookies to enhance your browsing experience, analyze site traffic,
                personalize content, and serve targeted advertisements. By using our Site, you
                consent to our use of cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0B1B3D] mb-3">
                What are Cookies?
              </h2>
              <p className="leading-8">
                Cookies are small text files that can be used by websites to make a user&apos;s
                experience more efficient. They are created when your browser loads a particular
                website. The website sends information to the browser, which creates a text file.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0B1B3D] mb-3">
                How We Use Cookies
              </h2>
              <p className="leading-8 mb-4">
                Our Site uses different types of cookies for different purposes:
              </p>
              <div className="space-y-4">
                {cookieCategories.map((category) => (
                  <div
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                    key={category.title}
                  >
                    <h3 className="font-semibold text-[#0B1B3D]">{category.title}</h3>
                    <p className="mt-2 leading-7">{category.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0B1B3D] mb-3">
                Cookies We Use
              </h2>
              <p className="leading-8">
                Below is a detailed list of the cookies we use on our Site. Our Site is scanned
                with a cookie scanning tool regularly to maintain a list as accurate as possible.
                We classify cookies in the following categories: Necessary Cookies, Functionality
                Cookies, Analytics Cookies, Advertisement Cookies.
              </p>
              <p className="mt-4 leading-8">
                You can opt-out of each cookie category except Necessary Cookies by visiting our
                Cookie Settings page.
              </p>
              <div className="mt-6 space-y-6">
                {cookieInventory.map((group) => (
                  <div
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                    key={group.title}
                  >
                    <h3 className="font-semibold text-[#0B1B3D]">{group.title}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
