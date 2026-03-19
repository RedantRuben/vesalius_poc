'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ArrowUpRight = () => (
  <div className="w-8 h-8 flex items-center justify-center transition-colors duration-300 z-20 text-slate-300 group-hover:text-slate-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  </div>
);

// Advanced Icons
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
);

const PillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
    <path d="m8.5 8.5 7 7"/>
  </svg>
);

const CommandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function Modules() {
  const t = useTranslations('Modules');

  return (
    <section className="w-full bg-[#FCFCFD] relative pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4">PLATFORM MODULES</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B3D] tracking-tight max-w-4xl">
            {t('title')}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Pre Consultation - Top Left (Wider) */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Link href="/product/pre-consultation" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex gap-2.5">
                  <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('preConsultation.tag1')}</span>
                  <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('preConsultation.tag2')}</span>
                </div>
                <ArrowUpRight />
              </div>
              
              <div className="relative z-10 pointer-events-none flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('preConsultation.title')}</h3>
                <p className="text-slate-500 max-w-md text-sm md:text-base leading-relaxed font-light mb-8">
                  {t('preConsultation.description')}
                </p>
              </div>
              
              {/* Visual */}
              <div className="absolute bottom-0 right-0 w-full h-1/2 overflow-hidden pointer-events-none">
                <div className="relative h-full w-full max-w-lg mx-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                   <motion.div  
                     initial={{ opacity: 0, x: 40 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="absolute right-8 top-4 w-2/3 bg-white rounded-2xl rounded-tr-sm p-4 shadow-lg border border-slate-100"
                   >
                     <div className="flex gap-1.5 mb-3">
                        <div className="w-2 h-2 bg-[#06ACC1] rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full w-full mb-2"></div>
                     <div className="h-2 bg-slate-100 rounded-full w-2/3"></div>
                   </motion.div>
                   
                   <motion.div 
                     initial={{ opacity: 0, x: -40 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                     className="absolute left-8 top-24 w-2/3 bg-gradient-to-r from-cyan-50 to-white rounded-2xl rounded-tl-sm p-4 border border-cyan-100 shadow-xl shadow-cyan-900/5"
                   >
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-2 bg-cyan-200 rounded-full w-1/2"></div>
                        <span className="text-[9px] font-bold text-[#06ACC1] tracking-widest uppercase bg-cyan-100/50 px-2 py-0.5 rounded-full">Analyzed</span>
                      </div>
                      <div className="h-2 bg-cyan-100 rounded-full w-full mb-2"></div>
                      <div className="h-2 bg-cyan-100 rounded-full w-4/5"></div>
                   </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Scribe - Top Right (Narrower) */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <Link href="/product/scribe" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex gap-2.5">
                  <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('scribe.tag1')}</span>
                  <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('scribe.tag2')}</span>
                </div>
                <ArrowUpRight />
              </div>
              
              <div className="relative z-10 pointer-events-none flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('scribe.title')}</h3>
                <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed font-light mb-8">
                  {t('scribe.description')}
                </p>
              </div>
              
              <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 pointer-events-none">
                  {/* Glowing Mic */}
                  <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                       <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute w-20 h-20 bg-rose-500/30 rounded-full blur-xl" 
                       />
                       <div className="relative w-16 h-16 bg-gradient-to-tr from-[#FF3366] to-rose-400 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/30 z-10 border border-white/20">
                          <MicIcon />
                       </div>
                  </div>
                  
                  {/* Elegant Waveform */}
                  <div className="flex items-center gap-1.5 h-16">
                      {[16, 32, 24, 40, 20, 12].map((height, i) => (
                          <motion.div
                              key={i}
                              animate={{ height: [height * 0.4, height, height * 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                              style={{ height }}
                              className="w-1.5 rounded-full bg-gradient-to-t from-rose-300 to-rose-200"
                          />
                      ))}
                  </div>
              </div>
            </Link>
          </motion.div>

          {/* Document Generation - Bottom Left (Narrower) */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <Link href="/product/document-generation" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex gap-2.5">
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('documentGeneration.tag1')}</span>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('documentGeneration.tag2')}</span>
                </div>
                <ArrowUpRight />
              </div>
              
              <div className="relative z-10 pointer-events-none flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('documentGeneration.title')}</h3>
                <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed font-light mb-8">
                  {t('documentGeneration.description')}
                </p>
              </div>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                 <motion.div 
                    whileHover={{ scale: 1.05 }}
                    initial={{ rotate: -2, y: 10 }}
                    whileInView={{ y: 0 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 relative group-hover:-translate-y-2 transition-transform duration-700"
                 >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100/50">
                          <FileTextIcon />
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full w-20"></div>
                    </div>
                    {/* Animated Lines */}
                    <div className="space-y-2.5">
                        {[1, 0.8, 1, 0.6].map((width, i) => (
                          <motion.div 
                            key={i}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: width }}
                            transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                            style={{ transformOrigin: "left" }}
                            className="h-2 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full"
                          />
                        ))}
                    </div>
                     <motion.div 
                          animate={{ y: [-4, 4, -4], rotate: [0, 5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-3 -right-3 bg-white p-2 rounded-full shadow-lg border border-slate-100"
                     >
                          <SparklesIcon />
                     </motion.div>
                     <motion.div 
                         initial={{ scale: 0 }}
                         whileInView={{ scale: 1 }}
                         transition={{ delay: 1.2, type: "spring" }}
                         className="absolute -bottom-3 left-4 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-emerald-600 uppercase border border-emerald-200"
                     >
                         Generated
                     </motion.div>
                 </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Smart Triage - Bottom Right (Wider) */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Link href="/product/smart-triage" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex gap-2.5">
                   <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('smartTriage.tag1')}</span>
                </div>
                <ArrowUpRight />
              </div>
              
              <div className="relative z-10 pointer-events-none flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('smartTriage.title')}</h3>
                <p className="text-slate-500 max-w-xl text-sm md:text-base leading-relaxed font-light mb-8">
                  {t('smartTriage.description')}
                </p>
              </div>
              
              <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 md:gap-8 pointer-events-none group-hover:-translate-y-2 transition-transform duration-700">
                  {/* Nodes */}
                  <motion.div 
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-400 relative z-10"
                      whileInView={{ borderColor: ["#e2e8f0", "#0B1B3D", "#e2e8f0"], color: ["#94a3b8", "#0B1B3D", "#94a3b8"] }}
                      transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.4] }}
                  >
                      <CommandIcon />
                  </motion.div>
                  
                  <div className="relative h-px w-12 md:w-20 bg-slate-200">
                      <motion.div 
                          className="absolute left-0 top-0 h-full bg-[#0B1B3D]"
                          whileInView={{ width: ["0%", "100%", "100%"], opacity: [1, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, times: [0.1, 0.3, 0.4] }}
                      />
                  </div>
                  
                  <motion.div 
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-400 relative z-10"
                      whileInView={{ borderColor: ["#e2e8f0", "#f59e0b", "#e2e8f0"], color: ["#94a3b8", "#f59e0b", "#94a3b8"], backgroundColor: ["#ffffff", "#fffbeb", "#ffffff"] }}
                      transition={{ duration: 3, repeat: Infinity, times: [0.3, 0.5, 0.7] }}
                  >
                      <ZapIcon />
                  </motion.div>
                  
                  <div className="relative h-px w-12 md:w-20 bg-slate-200">
                       <motion.div 
                          className="absolute left-0 top-0 h-full bg-amber-500"
                          whileInView={{ width: ["0%", "100%", "100%"], opacity: [1, 1, 0] }}
                          transition={{ duration: 3, repeat: Infinity, times: [0.5, 0.7, 0.8] }}
                      />
                  </div>
                  
                  <motion.div 
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-400 relative z-10"
                      whileInView={{ borderColor: ["#e2e8f0", "#10b981", "#e2e8f0"], color: ["#94a3b8", "#10b981", "#94a3b8"] }}
                      transition={{ duration: 3, repeat: Infinity, times: [0.7, 0.9, 1] }}
                  >
                      <CheckCircleIcon />
                  </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Smart Follow-ups & Medication Manager row omitted for brevity in design, but let's keep them and style perfectly */}
           <motion.div variants={itemVariants} className="lg:col-span-7">
             <Link href="/product/smart-follow-up" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex justify-between items-start mb-6">
                    <div className="flex gap-2.5">
                        <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('smartFollowUp.tag1')}</span>
                        <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('smartFollowUp.tag2')}</span>
                    </div>
                    <ArrowUpRight />
                </div>
                
                <div className="relative z-10 pointer-events-none flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('smartFollowUp.title')}</h3>
                  <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed font-light mb-8">
                      {t('smartFollowUp.description')}
                  </p>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none group-hover:-translate-y-2 transition-transform duration-700">
                    <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-100 shadow-xl p-5 relative">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Progress</span>
                          <span className="text-xs font-bold text-[#06ACC1]">75%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-5">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "75%" }}
                              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-[#0B1B3D] to-[#06ACC1] rounded-full" 
                            />
                        </div>

                         <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="flex items-center gap-3 p-3 bg-amber-50/80 border border-amber-200/50 rounded-xl"
                         >
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="8" x2="12" y2="12"/>
                                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-amber-700 text-xs uppercase tracking-wide">Action Required</h4>
                                <p className="text-amber-600/80 text-[10px] mt-0.5">Deviation detected in recovery</p>
                            </div>
                         </motion.div>
                     </div>
                 </div>
             </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-5">
            <Link href="/product/medication" scroll={true} className="flex flex-col h-full min-h-[420px] bg-white rounded-2xl p-8 md:p-10 pb-40 md:pb-48 relative overflow-hidden group hover:shadow-lg transition-all duration-500 border border-slate-200/60">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex gap-2.5">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('medication.tag1')}</span>
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{t('medication.tag2')}</span>
                </div>
                <ArrowUpRight />
              </div>
              
              <div className="relative z-10 pointer-events-none flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 tracking-tight">{t('medication.title')}</h3>
                <p className="text-slate-500 max-w-sm text-sm md:text-base leading-relaxed font-light mb-8">
                  {t('medication.description')}
                </p>
              </div>
              
              <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 pointer-events-none group-hover:-translate-y-2 transition-transform duration-700">
                  <div className="relative w-28 h-36 bg-white rounded-2xl border border-slate-100 flex flex-col items-center pt-4 overflow-hidden shadow-xl">
                      <div className="w-10 h-1.5 bg-slate-200 rounded-full mb-4"></div>
                      <div className="w-16 h-16 bg-slate-50 rounded-xl shadow-inner border border-slate-100 flex items-center justify-center relative">
                           <div className="space-y-1.5 w-10">
                               <div className="h-1 bg-slate-200 w-full rounded-full"></div>
                               <div className="h-1 bg-slate-200 w-2/3 rounded-full"></div>
                               <div className="h-1 bg-slate-200 w-full rounded-full"></div>
                           </div>
                      </div>
                      <motion.div 
                          animate={{ top: ["20%", "80%", "20%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute w-full h-0.5 bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)] z-10"
                      />
                  </div>

                  <motion.div
                      animate={{ x: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B1B3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                          <path d="M5 12h14"/>
                          <path d="m12 5 7 7-7 7"/>
                      </svg>
                  </motion.div>

                  <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                      className="w-24 h-28 bg-white rounded-2xl border border-indigo-100/50 shadow-xl flex flex-col items-center justify-center gap-3 p-3 relative"
                  >
                      <div className="absolute -top-3 -right-3 bg-gradient-to-tr from-indigo-500 to-indigo-400 rounded-full p-1.5 shadow-lg shadow-indigo-500/30 border border-white">
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                      </div>
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100">
                          <PillIcon />
                      </div>
                      <div className="w-14 h-1.5 bg-slate-200 rounded-full"></div>
                  </motion.div>
              </div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
