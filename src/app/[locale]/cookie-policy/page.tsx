import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";

export default function CookiePolicyPage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: September 11, 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="prose prose-lg max-w-none text-gray-600">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Our Site uses cookies to enhance your browsing experience, analyze site traffic, personalize content, and serve targeted advertisements. By using our Site, you consent to our use of cookies.
              </p>
            </div>

            {/* What are Cookies */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">What are Cookies?</h2>
              <p className="text-sm text-gray-600">
                Cookies are small text files that can be used by websites to make a user&apos;s experience more efficient. They are created when your browser loads a particular website. The website sends information to the browser, which creates a text file.
              </p>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">How We Use Cookies</h2>
              <p className="text-sm text-gray-600 mb-6">Our Site uses different types of cookies for different purposes:</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600">These cookies are necessary for the Site to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or filling in forms. Without these cookies, some parts of our Site will not function properly.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Functionality Cookies</h3>
                  <p className="text-sm text-gray-600">These cookies allow the website to remember choices you make (such as your user name, language, or the region you are in) and provide enhanced, more personal features.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Site. They help us know which pages are the most and least popular and see how visitors move around the Site.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Advertisement Cookies</h3>
                  <p className="text-sm text-gray-600">These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.</p>
                </div>
              </div>
            </div>

            {/* Cookies We Use */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Cookies We Use</h2>
              <p className="text-sm text-gray-600 mb-6">
                Below is a detailed list of the cookies we use on our Site. Our Site is scanned with a cookie scanning tool regularly to maintain a list as accurate as possible.
              </p>

              {/* Necessary Cookies */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#2B3B53] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Necessary Cookies
                </h3>
                <div className="bg-[#F9FBFC] rounded-xl p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hs_do_not_track</span>
                    <p className="text-gray-500 mt-1">Prevents the tracking code from sending any information to HubSpot.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hs_initial_opt_in</span>
                    <p className="text-gray-500 mt-1">Used to prevent always-on banner display when visitors are browsing in strict mode.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hs_opt_out</span>
                    <p className="text-gray-500 mt-1">Used by the banner to not ask visitors to accept cookies again.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__cf_bm</span>
                    <p className="text-gray-500 mt-1">This cookie from Cloudflare identifies and mitigates automated traffic to protect our site from bad bots.</p>
                  </div>
                </div>
              </div>

              {/* Functionality Cookies */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#2B3B53] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Functionality Cookies
                </h3>
                <div className="bg-[#F9FBFC] rounded-xl p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">AWSALBCORS</span>
                    <p className="text-gray-500 mt-1">This cookie from Airtable.com supports stickiness with CORS use cases.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">li_gc</span>
                    <p className="text-gray-500 mt-1">This cookie from LinkedIn.com stores guest consent to the use of cookies for non-essential purposes.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">AnalyticsSyncHistory</span>
                    <p className="text-gray-500 mt-1">This LinkedIn.com cookie stores information about the time a sync with the lms_analytics cookie took place.</p>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#2B3B53] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Analytics Cookies
                </h3>
                <div className="bg-[#F9FBFC] rounded-xl p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">vuid</span>
                    <p className="text-gray-500 mt-1">This first-party cookie created by Vimeo is used to assign a Vimeo Analytics unique ID.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hssc</span>
                    <p className="text-gray-500 mt-1">This is an analytics session cookie from our site.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hssrc</span>
                    <p className="text-gray-500 mt-1">Used to determine if a session is a new session or a repeat visit.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">hubspotutk</span>
                    <p className="text-gray-500 mt-1">Contains visitor&apos;s identity.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">_ga</span>
                    <p className="text-gray-500 mt-1">ID used to identify users.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__hstc</span>
                    <p className="text-gray-500 mt-1">This is an analytics tracking cookie.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">_ga_75H08F0Q9M</span>
                    <p className="text-gray-500 mt-1">Used to persist session state.</p>
                  </div>
                </div>
              </div>

              {/* Advertisement Cookies */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#2B3B53] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  Advertisement Cookies
                </h3>
                <div className="bg-[#F9FBFC] rounded-xl p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">bscookie</span>
                    <p className="text-gray-500 mt-1">This cookie is used by LinkedIn to track the use of embedded services.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">UserMatchHistory</span>
                    <p className="text-gray-500 mt-1">These cookies are set by LinkedIn for advertising purposes.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">lidc</span>
                    <p className="text-gray-500 mt-1">Used by LinkedIn for tracking the use of embedded services.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">NID</span>
                    <p className="text-gray-500 mt-1">This Google.com cookie is used for ad personalization and conversion tracking.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">bcookie</span>
                    <p className="text-gray-500 mt-1">Used by LinkedIn to track the use of embedded services.</p>
                  </div>
                </div>
              </div>

              {/* Uncategorized Cookies */}
              <div>
                <h3 className="font-semibold text-[#2B3B53] mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  Uncategorized Cookies
                </h3>
                <div className="bg-[#F9FBFC] rounded-xl p-4 space-y-3">
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">_dd_s</span>
                    <p className="text-gray-500 mt-1">This cookie&apos;s purpose is currently not documented by us.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">WG_CHOOSE_ORIGINAL</span>
                    <p className="text-gray-500 mt-1">This cookie&apos;s purpose is currently not documented by us.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">brw</span>
                    <p className="text-gray-500 mt-1">This cookie from Airtable.com has an undocumented purpose.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__Host-airtable-session</span>
                    <p className="text-gray-500 mt-1">This cookie from Airtable.com has an undocumented purpose.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">__Host-airtable-session.sig</span>
                    <p className="text-gray-500 mt-1">This cookie from Airtable.com has an undocumented purpose.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono text-[#06ACC1]">ln_or</span>
                    <p className="text-gray-500 mt-1">This cookie&apos;s purpose is currently not documented by us.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Your Cookie Settings */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Control Your Cookie Settings</h2>
              <p className="text-sm text-gray-600 mb-4">
                You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of our services or websites you visit.
              </p>
              <p className="text-sm text-gray-600 mb-4">For more information on how to manage or disable cookies on most browsers, please visit:</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#06ACC1] hover:underline">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#06ACC1] hover:underline">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-[#06ACC1] hover:underline">
                    Microsoft Internet Explorer
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#06ACC1] hover:underline">
                    Apple Safari
                  </a>
                </li>
              </ul>
            </div>

            {/* Updates */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Updates to This Cookie Policy</h2>
              <p className="text-sm text-gray-600">
                We may update our Cookie Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Cookie Policy on this page. These changes are effective immediately, after they are posted on this page.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Questions?</h2>
              <p className="text-sm text-gray-600">
                If you have any questions about this Cookie Policy, please contact us at{' '}
                <a href="mailto:help@vesalius.health" className="text-[#06ACC1] hover:underline">
                  help@vesalius.health
                </a>
              </p>
            </div>

            {/* Consent */}
            <div className="bg-[#F9FBFC] rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Consent</h2>
              <p className="text-sm text-gray-600 mb-4">
                By continuing to browse or by clicking &quot;Accept All Cookies,&quot; you agree to the storing of first- and third-party cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. The processing of information about your use of this site, through cookies, by us and our partners, may occur in the United States or other locations outside of your home jurisdiction.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                If you do not agree with our Cookie Policy, please cease website usage immediately and clear your browser of any cookies that may have been placed during your visit.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Your consent applies to:</strong> www.vesalius.ai</p>
                <p><strong>Effective date:</strong> September 11, 2024</p>
                <p><strong>Last updated:</strong> September 11, 2024</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

