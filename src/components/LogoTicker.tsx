'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Logo = {
  name: string;
  icon?: string;
  image?: string;
};

const logos: Logo[] = [
  { name: 'Maria Middelares', image: '/hospitals/mariamiddelares.svg' },
  { name: 'University Hospital', icon: '🏥' },
  { name: 'Care Clinic', icon: '🏥' },
  { name: 'General Hospital', icon: '🏥' },
  { name: 'Specialist Center', icon: '🏥' },
  { name: 'Medical Group', icon: '🏥' },
];

export default function LogoTicker() {
  const t = useTranslations('LogoTicker');
  return (
    <div className="w-full py-12 bg-transparent relative z-10 border-t border-b border-slate-200/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          {t('trustedBy')}
        </p>
      </div>
      
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 relative">
        {/* Subtle glowing edges for the ticker */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FCFCFD] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FCFCFD] to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden relative">
          <motion.div
            className="flex gap-16 md:gap-24 items-center whitespace-nowrap px-8 min-w-max"
            animate={{
              x: ["0%", "-50%"], 
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <div key={idx} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-500 cursor-default group grayscale hover:grayscale-0">
                {logo.image ? (
                  <Image 
                    src={logo.image} 
                    alt={logo.name} 
                    width={160} 
                    height={40} 
                    className="h-7 md:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-500">{logo.icon}</span>
                    <span className="text-xl font-bold text-slate-400 group-hover:text-[#0B1B3D] transition-colors duration-500 tracking-tight">{logo.name}</span>
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
