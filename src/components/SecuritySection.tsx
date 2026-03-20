'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const SoftShieldVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[250px] md:min-h-[300px]">
    <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
      
      {/* Outer soft pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-[#06ACC1] blur-2xl"
      />
      
      {/* Gentle floating rings */}
      <motion.div
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 rounded-full border border-[#06ACC1]/20"
      />
      
      <motion.div
        animate={{ scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-8 rounded-full border border-slate-200"
      />

      {/* Center soft card */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-xl shadow-[#06ACC1]/10"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f0f9fa] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-8 md:h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="fill-[#06ACC1]/5" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        
        {/* Soft floating checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
          className="absolute -right-3 -top-3 md:-right-4 md:-top-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default function SecuritySection() {
  const t = useTranslations('SecuritySection');

  return (
    <section className="w-full bg-[#FCFCFD] relative overflow-hidden pt-4 md:pt-8 pb-12 md:pb-20 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl shadow-slate-200/40"
        >
          
          {/* Content Side */}
          <div className="w-full md:w-3/5 flex flex-col items-start text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06ACC1]/10 text-[#06ACC1] text-sm font-medium mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Privacy & Trust
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#0B1B3D] mb-6 tracking-tight leading-[1.1] text-balance">
              {t('title')}
            </h2>
            
            <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-6 max-w-2xl font-light text-balance">
              {t('description')}
            </p>
            
            <div className="flex flex-col gap-3 mb-8">
              {['gdpr', 'access', 'audit'].map((key) => (
                <div key={key} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {t(`points.${key}`)}
                </div>
              ))}
            </div>

            <Link 
              href="/security" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-[#0B1B3D] font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group"
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform text-[#06ACC1]">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Visual Side */}
          <div className="w-full md:w-2/5 flex items-center justify-center order-1 md:order-2">
            <SoftShieldVisual />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
