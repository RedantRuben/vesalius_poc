import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLocale } from 'next-intl/server';
import { getPrivacyPolicyCopy } from '@/content/privacy-policy';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());
  const copy = getPrivacyPolicyCopy(locale);

  return buildPageMetadata({
    locale,
    pathname: '/privacy-policy',
    title: copy.metadata.title,
    description: copy.metadata.description,
  });
}

export default async function PrivacyPolicyPage() {
  const locale = resolveSiteLocale(await getLocale());
  const copy = getPrivacyPolicyCopy(locale);

  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />

      <section className="w-full pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            {copy.hero.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {copy.hero.version}
          </p>
        </div>
      </section>

      <section className="w-full pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F9FBFC] rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-[#2B3B53] mb-4">
              {copy.tableOfContentsTitle}
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {copy.tableOfContents.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="text-[#06ACC1] hover:underline text-sm"
                >
                  {entry.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="w-full pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <p className="text-sm text-gray-500 mb-4">{copy.introduction.establishedBy}</p>
              <p className="text-sm text-gray-600 mb-1">{copy.introduction.address}</p>
              <p className="text-sm text-gray-600 mb-1">{copy.introduction.vat}</p>
              <p className="text-sm text-gray-600 mb-4">{copy.introduction.email}</p>

              <p className="text-sm text-gray-600 mb-4">{copy.introduction.hereinafter}</p>

              <p className="text-sm text-gray-600 mb-4">{copy.introduction.vigilance}</p>

              <p className="text-sm text-gray-600 mb-4">{copy.introduction.purpose}</p>

              <p className="text-sm text-gray-600 mb-4">{copy.introduction.processor}</p>

              <p className="text-sm text-gray-600">{copy.introduction.contact}</p>
            </div>

            <div
              id="definitions"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.definitions.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{copy.definitions.introduction}</p>

              <ul className="space-y-3 text-sm text-gray-600">
                {copy.definitions.items.map((item) => (
                  <li key={item.term}>
                    <strong className="text-[#2B3B53]">{item.term}:</strong>{' '}
                    {item.description}
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="why-process"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.processing.title}</h2>
              <p className="text-sm text-gray-600 mb-6">{copy.processing.introduction}</p>

              <div className="space-y-6">
                {copy.processing.purposes.map((purpose) => (
                  <div key={purpose.title} className="border-l-4 border-[#06ACC1] pl-4">
                    <h3 className="font-semibold text-[#2B3B53] mb-2">{purpose.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{purpose.description}</p>
                    <p className="text-xs text-gray-500">{purpose.legalBasis}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="what-data"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">
                {copy.collectedData.title}
              </h2>
              <p className="text-sm text-gray-600 mb-6">{copy.collectedData.introduction}</p>

              <div className="space-y-6">
                {copy.collectedData.groups.map((group) => (
                  <div key={group.title} className="bg-[#F9FBFC] rounded-xl p-4">
                    <h3 className="font-semibold text-[#2B3B53] mb-3">{group.title}</h3>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="third-parties"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">
                {copy.thirdParties.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{copy.thirdParties.paragraphs[0]}</p>
              <p className="text-sm text-gray-600 mb-4">{copy.thirdParties.paragraphs[1]}</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside mb-6">
                {copy.thirdParties.transferReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 mb-4">{copy.thirdParties.paragraphs[2]}</p>

              <div className="bg-[#F9FBFC] rounded-xl p-4">
                <h3 className="font-semibold text-[#2B3B53] mb-3">
                  {copy.thirdParties.providersTitle}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  {copy.thirdParties.providers.map((provider) => (
                    <li key={provider}>{provider}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-3">{copy.thirdParties.providersNote}</p>
              </div>
            </div>

            <div
              id="transfers"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.transfers.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{copy.transfers.introduction}</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {copy.transfers.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </div>

            <div
              id="retention"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.retention.title}</h2>
              <p className="text-sm text-gray-600 mb-6">{copy.retention.introduction}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-[#2B3B53]">
                        {copy.retention.tableHeaders.processing}
                      </th>
                      <th className="text-left py-3 px-2 font-semibold text-[#2B3B53]">
                        {copy.retention.tableHeaders.duration}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {copy.retention.rows.map((row, index) => (
                      <tr
                        key={row.processing}
                        className={
                          index === copy.retention.rows.length - 1
                            ? undefined
                            : 'border-b border-gray-100'
                        }
                      >
                        <td className="py-3 px-2">{row.processing}</td>
                        <td className="py-3 px-2">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              id="protection"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.protection.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{copy.protection.introduction}</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                {copy.protection.measures.map((measure) => (
                  <li key={measure}>{measure}</li>
                ))}
              </ul>
            </div>

            <div
              id="rights"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.rights.title}</h2>
              <p className="text-sm text-gray-600 mb-6">
                {copy.rights.contactIntroduction}{' '}
                <a href="mailto:privacy@vesalius.health" className="text-[#06ACC1] hover:underline">
                  privacy@vesalius.health
                </a>{' '}
                {copy.rights.contactOr}{' '}
                <a href="mailto:help@vesalius.health" className="text-[#06ACC1] hover:underline">
                  help@vesalius.health
                </a>. {copy.rights.dpoIntroduction}{' '}
                <a href="mailto:dpo@vesalius.health" className="text-[#06ACC1] hover:underline">
                  dpo@vesalius.health
                </a>
              </p>

              <div className="space-y-4">
                {copy.rights.rights.map((right) => (
                  <div key={right.title} className="border-l-4 border-[#06ACC1] pl-4">
                    <h3 className="font-semibold text-[#2B3B53] mb-2">{right.title}</h3>
                    <p className="text-sm text-gray-600">{right.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#F9FBFC] rounded-xl">
                <h3 className="font-semibold text-[#2B3B53] mb-2">
                  {copy.rights.complaintTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{copy.rights.complaintIntroduction}</p>
                <p className="text-sm text-gray-600">
                  {copy.rights.addressLabel}
                  <br />
                  {copy.rights.phoneLabel} +32 (0) 2 274 48 00
                  <br />
                  {copy.rights.emailLabel}{' '}
                  <a
                    href="mailto:contact@apd-gba.be"
                    className="text-[#06ACC1] hover:underline"
                  >
                    contact@apd-gba.be
                  </a>
                  <br />
                  {copy.rights.websiteLabel}{' '}
                  <a
                    href="https://www.dataprotectionauthority.be/citizen"
                    className="text-[#06ACC1] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dataprotectionauthority.be
                  </a>
                </p>
              </div>
            </div>

            <div
              id="cookies"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.cookies.title}</h2>
              <p className="text-sm text-gray-600">{copy.cookies.body}</p>
            </div>

            <div
              id="law"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.law.title}</h2>
              <p className="text-sm text-gray-600">{copy.law.body}</p>
            </div>

            <div
              id="updates"
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">{copy.updates.title}</h2>
              <p className="text-sm text-gray-600">{copy.updates.body}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
