'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import ContactForm from '@/components/forms/ContactForm';

const GENT_HQ_MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Gent%20Belgi%C3%AB%20Ottergemsesteenweg-zuid%20808B&t=m&z=14&ie=UTF8&iwloc=&output=embed';

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#06ACC1]">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Contact({ sourcePage = '/' }: { sourcePage?: string }) {
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? {
          eyebrow: 'Contact',
          titleBefore: 'Nous sommes là ',
          titleAccent: 'pour vous aider',
          subtitle: 'Vous avez une question ? Notre équipe est là pour vous répondre.',
          city: '9000 Gand, Belgique',
        }
      : locale === 'nl'
        ? {
            eyebrow: 'Contact',
            titleBefore: 'We zijn er om ',
            titleAccent: 'te helpen',
            subtitle: 'Heeft u vragen? Ons team staat klaar om u verder te helpen.',
            city: '9000 Gent, België',
          }
        : {
            eyebrow: 'Contact',
            titleBefore: 'We are here ',
            titleAccent: 'to help',
            subtitle: 'Have any questions? Our team is ready to assist you.',
            city: '9000 Gent, Belgium',
          };
  return (
    <section className="w-full bg-[#FCFCFD] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4 block">{copy.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B3D] tracking-tight mb-4">
            {copy.titleBefore}<span className="text-gradient">{copy.titleAccent}</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-light">
            {copy.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 glass-panel bg-white/70 p-8 md:p-12 rounded-[32px]"
          >
            <ContactForm sourcePage={sourcePage} />
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Address Card */}
            <div className="glass-panel bg-white/70 p-8 rounded-[32px] flex items-center gap-6 group hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-50 to-white flex items-center justify-center flex-shrink-0 shadow-inner border border-cyan-100 group-hover:scale-110 transition-transform duration-500">
                <MapPinIcon />
              </div>
              <div>
                <h3 className="text-[#0B1B3D] font-bold text-lg mb-1 tracking-tight">
                  Ottergemsesteenweg Zuid 808B
                </h3>
                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">
                  {copy.city}
                </p>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative flex-grow min-h-[300px] w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.22)]">
              <iframe
                src={GENT_HQ_MAP_EMBED_URL}
                loading="lazy"
                aria-label="Vesalius office map in Gent"
                className="absolute inset-0 h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
