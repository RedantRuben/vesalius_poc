import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseVesalius from "@/components/WhyChooseVesalius";
import Modules from "@/components/Modules";
import Testimonials from "@/components/Testimonials";
import SecuritySection from "@/components/SecuritySection";
import Pricing from "@/components/Pricing";
import TeamPricing from "@/components/TeamPricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative selection:bg-primary/20 bg-[#FCFCFD]">
      <Navbar />
      
      {/* Section 1: Hero */}
      <section className="w-full relative z-0">
         <Hero />
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
      <section className="w-full pt-0 pb-12 md:pb-24 flex items-center justify-center">
        <Testimonials />
      </section>

      {/* Section: Security */}
      <SecuritySection />

      {/* Section 5: Pricing */}
      <section id="pricing" className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center">
        <Pricing />
      </section>

      {/* Section 6: Team Pricing */}
      <section className="w-full pt-0 pb-12 md:pb-24 flex items-center justify-center">
        <TeamPricing />
      </section>

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
