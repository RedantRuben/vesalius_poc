'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={filled ? "text-amber-400" : "text-slate-200"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#06ACC1]">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-[#06ACC1]/10 absolute -top-2 -left-2 rotate-180">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const testimonials = [0, 1, 2].map((index) => ({
    quote: t(`items.${index}.quote`),
    name: t(`items.${index}.name`),
    role: t(`items.${index}.role`)
  }));

  return (
    <section className="w-full bg-[#FCFCFD] relative overflow-hidden py-16 md:py-24">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#06ACC1]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0B1B3D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4">USER FEEDBACK</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B3D] tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-[24px] p-8 md:p-10 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 relative bg-gradient-to-br from-white/90 to-white/50 border border-white/60 flex flex-col justify-between h-full group"
            >
              <QuoteIcon />
              <p className="text-slate-600 text-lg leading-relaxed mb-10 relative z-10 font-light mt-4">
                <span aria-hidden="true">&ldquo;</span>
                {item.quote}
                <span aria-hidden="true">&rdquo;</span>
              </p>
              
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-50 to-white shadow-inner flex items-center justify-center border border-cyan-100/50 group-hover:scale-110 transition-transform duration-500">
                  <UserGroupIcon />
                </div>
                <div>
                  <div className="font-bold text-[#0B1B3D] tracking-tight text-lg">
                    {item.name}
                  </div>
                  <div className="text-sm font-medium text-[#06ACC1] tracking-wide">
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-900/10 min-h-[500px] flex items-center"
        >
           {/* Background Image with Parallax feeling */}
           <div className="absolute inset-0">
             <Image 
               src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1600&auto=format&fit=crop&q=80" 
               alt="Doctor Thumbs Up" 
               fill
               className="object-cover scale-105 transform origin-center"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B3D]/95 via-[#0B1B3D]/80 to-transparent" />
           </div>

           {/* Stats Content Overlay */}
           <div className="relative z-10 w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl text-white font-medium mb-12 tracking-tight max-w-xl leading-snug">
                {t('statsTitle')}.
              </h3>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                 {/* Left Column Stats */}
                 <div className="space-y-8">
                    <div>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">83%</span>
                       </div>
                       <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">{t('adoptionRate')}</span>
                    </div>
                    <div>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">8x</span>
                       </div>
                       <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">{t('roi')}</span>
                    </div>
                 </div>

                 {/* Right Column Ratings */}
                 <div className="space-y-8">
                    <div>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">19<span className="text-2xl">m</span>56<span className="text-2xl">s</span></span>
                       </div>
                       <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">{t('completionTime')}</span>
                    </div>
                    <div>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">+13%</span>
                       </div>
                       <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">{t('perceivedQuality')}</span>
                    </div>
                 </div>
              </div>

              {/* Star Ratings Row */}
              <div className="flex flex-col sm:flex-row gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-white">4.1</span>
                      <span className="text-white/60 text-sm">/5</span>
                   </div>
                   <div className="flex gap-1 mb-2">
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon />
                   </div>
                   <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">{t('patientRating')}</span>
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-white">4.7</span>
                      <span className="text-white/60 text-sm">/5</span>
                   </div>
                   <div className="flex gap-1 mb-2">
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon filled />
                      <StarIcon filled />
                   </div>
                   <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">{t('physiciansRating')}</span>
                </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
