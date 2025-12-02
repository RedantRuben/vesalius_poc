'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type Logo = {
  name: string;
  icon?: string;
  image?: string;
};

const logos: Logo[] = [
  { name: 'Maria Middelares', image: '/hospitals/mariamiddelares.svg' },
  { name: 'Hospital 2', icon: '🏥' },
  { name: 'Hospital 3', icon: '🏥' },
  { name: 'Hospital 4', icon: '🏥' },
  { name: 'Hospital 5', icon: '🏥' },
  { name: 'Hospital 6', icon: '🏥' },
];

export default function LogoTicker() {
  return (
    <div className="w-full py-12 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center">
        <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
          Trusted by leading institutions
        </p>
      </div>
      
      <div className="flex overflow-hidden mask-linear-fade relative">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap px-8 min-w-max"
          animate={{
            x: "-50%", 
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default group grayscale hover:grayscale-0">
              {logo.image ? (
                <Image 
                  src={logo.image} 
                  alt={logo.name} 
                  width={150} 
                  height={40} 
                  className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              ) : (
                <>
                  <span className="text-2xl group-hover:scale-110 transition-transform">{logo.icon}</span>
                  <span className="text-lg font-bold text-gray-400 group-hover:text-[#06ACC1] transition-colors">{logo.name}</span>
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
