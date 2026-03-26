import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import WhyChooseVesalius from "@/components/WhyChooseVesalius";
import Modules from "@/components/Modules";
import Testimonials from "@/components/Testimonials";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SeoJsonLd from '@/components/SeoJsonLd';
import { buildPageMetadata, getAbsoluteUrl, resolveSiteLocale, SITE_DESCRIPTION } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = resolveSiteLocale(locale);

  return buildPageMetadata({
    locale: resolvedLocale,
    pathname: '/',
    title: 'Healthcare AI Platform for Patient Intake and Clinical Workflows',
    description: SITE_DESCRIPTION,
    keywords: [
      'Vesalius',
      'healthcare AI platform',
      'patient intake automation',
      'ambient clinical scribe',
      'clinical documentation',
      'hospital workflow automation',
    ],
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = resolveSiteLocale(locale);
  const homepageUrl = getAbsoluteUrl(resolvedLocale, '/');
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Vesalius',
        url: homepageUrl,
        logo: getAbsoluteUrl(resolvedLocale, '/logo.webp'),
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
    ],
  };

  return (
    <main className="relative w-full max-w-full overflow-x-clip selection:bg-primary/20 bg-[#FCFCFD]">
      <SeoJsonLd data={organizationSchema} />
      <Navbar />
      
      {/* Section 1: Hero */}
      <section className="w-full relative z-0">
         <Hero />
      </section>

      {/* Section: The Problem */}
      <section className="w-full pt-12 md:pt-24 pb-0 flex items-center justify-center">
        <TheProblem />
      </section>

      {/* Section 2: Why Choose Vesalius */}
      <section className="w-full pt-12 md:pt-24 pb-12 md:pb-24 flex items-center justify-center">
        <WhyChooseVesalius />
      </section>

      {/* Section 3: Modules */}
      <section id="product" className="w-full pt-0 pb-12 md:pb-24 flex items-center justify-center">
        <Modules />
      </section>

      {/* Section 4: Testimonials */}
      <section className="w-full pt-0 pb-4 md:pb-8 flex items-center justify-center">
        <Testimonials />
      </section>

      {/* Section: Security */}
      <SecuritySection />

      <PricingSection />

      {/* Section 7: Contact & Footer */}
      <section id="contact" className="w-full flex flex-col">
        <div className="flex-1 flex items-center justify-center py-12 md:py-24">
           <Contact />
        </div>
        <Footer />
      </section>
    </main>
  );
}
