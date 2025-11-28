'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#F9FBFC] border-t border-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          {/* Brand & Contact */}
          <div className="md:col-span-4 space-y-6">
            <Image
              src="/logo.webp"
              alt="Vesalius.ai Logo"
              width={150}
              height={42}
              className="object-contain h-10 w-auto mb-4"
            />
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAF8FA] flex items-center justify-center flex-shrink-0">
                  <MailIcon />
                </div>
                <span className="text-gray-600">help@vesalius.health</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAF8FA] flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <span className="text-gray-600">09 496 14 78</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAF8FA] flex items-center justify-center flex-shrink-0">
                  <LinkedinIcon />
                </div>
                <span className="text-gray-600">Vesalius.health</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-[#2B3B53] font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Security</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">FAQ</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Legal</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Contact</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="md:col-span-2">
            <h3 className="text-[#2B3B53] font-semibold text-lg mb-6">Help</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Security</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">FAQ</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Legal</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-[#06ACC1]">Contact</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div className="md:col-span-3 text-right md:text-right">
             <h3 className="text-[#2B3B53] font-semibold text-lg mb-2">Ottergemsesteenweg Zuid 808B</h3>
             <p className="text-gray-600">9000 Gent, Belgium</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F2F2F2] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            Copyright © Vesalius health
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <button className="text-gray-600 hover:text-[#06ACC1]">Nederlands (BE)</button>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="text-[#06ACC1] font-medium">English (US)</button>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="text-[#06ACC1] font-medium">Français (BE)</button>
          </div>
        </div>
      </div>
    </footer>
  );
}


