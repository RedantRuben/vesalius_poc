import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TheProblem from '@/components/TheProblem';
import WhyChooseVesalius from '@/components/WhyChooseVesalius';
import Modules from '@/components/Modules';
import Testimonials from '@/components/Testimonials';
import SecuritySection from '@/components/SecuritySection';
import PricingSection from '@/components/PricingSection';
import Contact from '@/components/Contact';
import Journey from '@/components/Journey';
import BookDemo from '@/components/BookDemo';
import FinalCta from '@/components/FinalCta';
import MobileApp from '@/components/MobileApp';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';
import MotionProvider from '@/components/MotionProvider';
import { getAbsoluteUrl, SITE_DESCRIPTION, type SiteLocale } from '@/lib/seo';

/**
 * The homepage, for the standard site and for each discipline's own URL. Which variant renders follows from the URL
 * (see SpecialtyProvider), so the server already sends the discipline's content; `schema` adds that page's JSON-LD.
 */
export default function HomePage({ locale, schema }: { locale: SiteLocale; schema?: Record<string, unknown> }) {
  const homepageUrl = getAbsoluteUrl(locale, '/');
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Vesalius',
        url: homepageUrl,
        logo: getAbsoluteUrl(locale, '/vesalius-logo-with-text.svg'),
        email: 'help@vesalius.health',
        sameAs: ['https://www.linkedin.com/company/vesaliushealth/posts/?feedView=all'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ottergemsesteenweg Zuid 808B',
          addressLocality: 'Gent',
          postalCode: '9000',
          addressCountry: 'BE',
        },
      },
      {
        '@type': 'WebSite',
        name: 'Vesalius',
        url: homepageUrl,
        description: SITE_DESCRIPTION,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Vesalius',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        url: homepageUrl,
        description: SITE_DESCRIPTION,
      },
      ...(schema ? [schema] : []),
    ],
  };

  return (
    <MotionProvider>
      <main className="relative w-full max-w-full overflow-x-clip selection:bg-primary/20 bg-[#FAFAFB]">
        <SeoJsonLd data={organizationSchema} />
        <Navbar />

        <section className="w-full relative z-0">
          <Hero />
        </section>

        <TheProblem />

        <div id="product">
          <Journey />
        </div>

        <section className="w-full py-12 md:py-24">
          <WhyChooseVesalius />
        </section>

        <section id="modules" className="w-full pt-20 md:pt-28">
          <Modules />
        </section>

        <MobileApp />

        <section className="w-full">
          <Testimonials />
        </section>
        <BookDemo />

        <SecuritySection />

        <PricingSection />

        <FinalCta />

        {/* Section 7: Contact & Footer */}
        <section id="contact" className="w-full flex flex-col">
          <div className="flex-1 flex items-center justify-center py-12 md:py-24">
            <Contact />
          </div>
          <Footer />
        </section>
      </main>
    </MotionProvider>
  );
}
