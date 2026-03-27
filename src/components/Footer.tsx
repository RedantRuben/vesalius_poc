'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-[#06ACC1] transition-colors">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-[#06ACC1] transition-colors">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-[#06ACC1] transition-colors">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full bg-[#0B1B3D] pt-24 pb-12 relative overflow-hidden text-slate-300 rounded-t-[40px] md:rounded-t-[80px] mt-12 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] md:w-[800px] md:h-[800px] bg-gradient-to-bl from-[#06ACC1]/10 to-transparent rounded-full blur-3xl pointer-events-none transform translate-x-1/4 -translate-y-1/4 md:translate-x-1/3 md:-translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.72fr)_minmax(280px,0.9fr)] gap-12 lg:gap-20 mb-20 items-start">
          
          {/* Brand & Contact */}
          <div className="flex max-w-md flex-col space-y-8">
            <Link
              href="/"
              className="group relative inline-flex max-w-full items-center rounded-[32px] border border-white/14 bg-white/[0.045] px-4 sm:px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_-32px_rgba(2,8,23,0.75)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/8 via-transparent to-[#06ACC1]/[0.06] opacity-90" />
              <Image
                src="/vesalius-logo-with-text.svg"
                alt="Vesalius.ai logo"
                width={237}
                height={41}
                className="relative h-9 sm:h-10 w-auto shrink-0"
              />
            </Link>
            
            <div className="space-y-5">
              <a href="mailto:help@vesalius.health" className="flex items-center gap-4 group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#06ACC1]/50 group-hover:bg-[#06ACC1]/10 transition-all">
                  <MailIcon />
                </div>
                <span className="text-sm md:text-base font-medium group-hover:text-white transition-colors">help@vesalius.health</span>
              </a>
              
              <a href="tel:094961478" className="flex items-center gap-4 group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#06ACC1]/50 group-hover:bg-[#06ACC1]/10 transition-all">
                  <PhoneIcon />
                </div>
                <span className="text-sm md:text-base font-medium group-hover:text-white transition-colors">09 496 14 78</span>
              </a>
              
              <a href="https://www.linkedin.com/company/vesaliushealth/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#06ACC1]/50 group-hover:bg-[#06ACC1]/10 transition-all">
                  <LinkedinIcon />
                </div>
                <span className="text-sm md:text-base font-medium group-hover:text-white transition-colors">Vesalius.health</span>
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:justify-self-center">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">{t('legal')}</h3>
            <ul className="space-y-4">
              <li><Link href="/terms-conditions" className="text-sm font-medium hover:text-[#06ACC1] transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity md:-ml-3 md:hover:ml-0 transition-all">{t('termsAndConditions')}</Link></li>
              <li><Link href="/privacy-policy" className="text-sm font-medium hover:text-[#06ACC1] transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity md:-ml-3 md:hover:ml-0 transition-all">{t('privacyPolicy')}</Link></li>
              <li><Link href="/cookie-policy" className="text-sm font-medium hover:text-[#06ACC1] transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity md:-ml-3 md:hover:ml-0 transition-all">{t('cookiePolicy')}</Link></li>
              <li><Link href="/security" className="text-sm font-medium hover:text-[#06ACC1] transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity md:-ml-3 md:hover:ml-0 transition-all">{t('security')}</Link></li>
            </ul>
          </div>

          {/* Help Links & Address */}
          <div className="flex max-w-sm flex-col">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">{t('help')}</h3>
            <ul className="space-y-4 mb-10">
              <li><Link href="/contactus" className="text-sm font-medium hover:text-[#06ACC1] transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity md:-ml-3 md:hover:ml-0 transition-all">{t('contact')}</Link></li>
            </ul>

            <div className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
               <h4 className="text-white font-bold text-sm mb-2">{t('address.street')}</h4>
               <p className="text-sm font-medium text-slate-400">{t('address.city')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm font-medium">
            {t('copyright')}
          </div>
          
          <div className="opacity-80 hover:opacity-100 transition-opacity">
             <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
