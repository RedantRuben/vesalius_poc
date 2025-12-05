import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import WhyChooseVesalius from "@/components/WhyChooseVesalius";
import Modules from "@/components/Modules";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import TeamPricing from "@/components/TeamPricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />
      
      {/* Section 1: Hero */}
      <section className="w-full bg-white relative z-0">
         <Hero />
      </section>

      {/* Logo Ticker (formerly Carousel section) */}
      <LogoTicker />

      {/* Section 2: Why Choose Vesalius (Moved from Carousel spot) */}
      <section className="w-full pt-12 md:pt-16 pb-12 md:pb-16 flex items-center justify-center bg-white">
        <WhyChooseVesalius />
      </section>

      {/* Section 3: Modules */}
      <section id="product" className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center bg-white">
        <Modules />
      </section>

      {/* Section 4: Testimonials */}
      <section className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center bg-white">
        <Testimonials />
      </section>

      {/* Section 5: Pricing */}
      <section id="pricing" className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center bg-white">
        <Pricing />
      </section>

      {/* Section 6: Team Pricing */}
      <section className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center bg-white">
        <TeamPricing />
      </section>

      {/* Section 7: Contact & Footer */}
      <section id="contact" className="w-full flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center py-12 md:py-16">
           <Contact />
        </div>
        <Footer />
      </section>
    </main>
  );
}
