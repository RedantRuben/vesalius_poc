'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Contact() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center py-8 md:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3B53] mb-4">
            We are here <span className="text-[#06ACC1]">to help</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Any other questions? Get in touch with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white p-8 rounded-[15px] border border-[#F2F2F2] shadow-sm"
          >
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  className="w-full px-4 py-3 rounded-[15px] border border-[#F2F2F2] bg-[#F9FBFC] focus:border-[#06ACC1] focus:ring-1 focus:ring-[#06ACC1] outline-none transition-all text-gray-600 placeholder-gray-400"
                />
                <input 
                  type="email" 
                  placeholder="Your Email *" 
                  className="w-full px-4 py-3 rounded-[15px] border border-[#F2F2F2] bg-[#F9FBFC] focus:border-[#06ACC1] focus:ring-1 focus:ring-[#06ACC1] outline-none transition-all text-gray-600 placeholder-gray-400"
                />
              </div>
              <input 
                type="text" 
                placeholder="Your Organisation" 
                className="w-full px-4 py-3 rounded-[15px] border border-[#F2F2F2] bg-[#F9FBFC] focus:border-[#06ACC1] focus:ring-1 focus:ring-[#06ACC1] outline-none transition-all text-gray-600 placeholder-gray-400"
              />
              <input 
                type="text" 
                placeholder="Subject *" 
                className="w-full px-4 py-3 rounded-[15px] border border-[#F2F2F2] bg-[#F9FBFC] focus:border-[#06ACC1] focus:ring-1 focus:ring-[#06ACC1] outline-none transition-all text-gray-600 placeholder-gray-400"
              />
              <textarea 
                placeholder="Your Question *" 
                rows={5}
                className="w-full px-4 py-3 rounded-[15px] border border-[#F2F2F2] bg-[#F9FBFC] focus:border-[#06ACC1] focus:ring-1 focus:ring-[#06ACC1] outline-none transition-all text-gray-600 placeholder-gray-400 resize-none"
              />
              <button 
                type="submit"
                className="bg-[#06ACC1] text-white px-8 py-3 rounded-[15px] font-medium hover:bg-[#0597a9] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Submit 
                <span>→</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col gap-6 h-full"
          >
            {/* Address Card */}
            <div className="bg-white p-6 rounded-[15px] border border-[#F2F2F2] shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                <MapPinIcon />
              </div>
              <div>
                <h3 className="text-[#2B3B53] font-semibold text-lg mb-1">
                  Ottergemsesteenweg Zuid 808B
                </h3>
                <p className="text-gray-500">
                  9000 Gent, Belgium
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative flex-grow min-h-[300px] w-full rounded-[15px] overflow-hidden border border-[#F2F2F2] shadow-sm bg-[#242424]">
              {/* Using a styled div to represent the dark map shown in screenshot if real map image isn't available */}
              <div className="absolute inset-0 opacity-40" 
                   style={{
                     backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }}
              ></div>
              
              {/* Simulated Map Streets/Paths for visual effect */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                 <path d="M0,100 Q150,120 300,80 T600,150" stroke="#555" strokeWidth="4" fill="none"/>
                 <path d="M100,0 Q120,150 80,300 T150,600" stroke="#555" strokeWidth="4" fill="none"/>
                 <path d="M400,0 L350,400" stroke="#555" strokeWidth="3" fill="none"/>
              </svg>

              {/* Map Pin on Map */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#06ACC1] rounded-full animate-ping absolute inset-0"></div>
                    <div className="w-4 h-4 bg-[#06ACC1] rounded-full relative border-2 border-white"></div>
                  </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
                Map Data © OpenStreetMap
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

