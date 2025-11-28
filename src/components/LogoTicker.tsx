'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'Hospital 1', icon: '🏥' },
  { name: 'Hospital 2', icon: '🏥' },
  { name: 'Hospital 3', icon: '🏥' },
  { name: 'Hospital 4', icon: '🏥' },
  { name: 'Hospital 5', icon: '🏥' },
  { name: 'Hospital 6', icon: '🏥' },
];

export default function LogoTicker() {
  return (
    <div className="w-full py-10 bg-white/50 border-y border-gray-100 overflow-hidden backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center">
        <p className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
          Trusted by leading institutions
        </p>
      </div>
      
      <div className="flex overflow-hidden mask-linear-fade">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap px-8"
          animate={{
            x: "-50%", 
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-300 cursor-default group">
              <span className="text-2xl group-hover:scale-110 transition-transform">{logo.icon}</span>
              <span className="text-lg font-bold text-gray-400 group-hover:text-[#06ACC1] transition-colors">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
