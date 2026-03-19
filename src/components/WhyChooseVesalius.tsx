'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const LanguageVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0, x: -20, y: -6 }}
      whileInView={{ opacity: 1, x: '-82%', y: -14 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 bg-white border border-slate-100 rounded-2xl p-3 md:p-4 shadow-lg shadow-black/5 z-10"
    >
      <div className="flex gap-2 items-center">
        <div className="w-2 h-2 rounded-full bg-slate-300" />
        <span className="text-slate-400 text-xs md:text-sm font-medium tracking-wide">Hola, ¿cómo estás?</span>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, x: 20, y: 6 }}
      whileInView={{ opacity: 1, x: '38%', y: 8 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 bg-[#06ACC1] rounded-2xl rounded-tl-sm p-3 md:p-4 shadow-xl shadow-[#06ACC1]/20 z-20"
    >
      <div className="flex gap-2 items-center">
        <span className="text-white text-xs md:text-sm font-medium tracking-wide">Hello, how are you?</span>
        <motion.div 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-4 bg-white/70 rounded-full"
        />
      </div>
    </motion.div>
  </div>
);

const LiabilityVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-24 h-32 md:w-32 md:h-40 bg-white border border-slate-100 shadow-sm rounded-2xl flex flex-col items-center pt-6 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-2 bg-slate-200 rounded-full mb-3" 
      />
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="h-2 bg-slate-200 rounded-full mb-3" 
      />
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="h-2 bg-slate-200 rounded-full" 
      />
      
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-rose-50/80 to-transparent flex items-end justify-center pb-4 backdrop-blur-[2px]">
        <motion.div 
          initial={{ scale: 0, y: 20 }}
          whileInView={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.8 }}
          className="w-10 h-10 rounded-full bg-white shadow-xl shadow-rose-500/20 flex items-center justify-center border border-rose-100 z-10"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <motion.path 
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 1, delay: 1.2 }}
               d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" 
             />
           </svg>
        </motion.div>
      </div>
    </div>
  </div>
);

const CareVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xl shadow-[#06ACC1]/10">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#care-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="care-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#06ACC1" />
            <stop stopColor="#0B1B3D" />
          </linearGradient>
        </defs>
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" 
        />
      </svg>
    </div>
    
    <motion.div 
      animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      className="absolute z-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#06ACC1]/30" 
    />
    <motion.div 
      animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
      className="absolute z-0 w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#06ACC1]/30" 
    />
  </div>
);

const AccuracyVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      {/* Outer Ring */}
      <motion.svg 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="#0B1B3D" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.2" />
      </motion.svg>
      
      {/* Scanning Radar */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full rounded-full"
        style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6,172,193,0.1) 360deg)' }}
      />
      
      {/* Center Target */}
      <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-lg shadow-[#0B1B3D]/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0B1B3D] to-slate-700 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.polyline 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              points="20 6 9 17 4 12" 
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const ArrowUpRight = () => (
  <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 text-slate-300 transition-colors duration-300 group-hover:text-slate-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  </div>
);

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Break the language barrier",
    description: "Vesalius helps you understand your patients, no matter the language.",
    icon: <LanguageVisual />,
    className: "lg:col-span-7",
  },
  {
    id: 3,
    title: "Liability",
    description: "Vesalius keeps a clear record of interactions, reducing liability and ensuring compliance.",
    icon: <LiabilityVisual />,
    className: "lg:col-span-5",
  },
  {
    id: 4,
    title: "Better care",
    description: "Automate intakes to reduce administration so you can focus on what matters.",
    icon: <CareVisual />,
    className: "lg:col-span-5",
  },
  {
    id: 5,
    title: "Improve your accuracy",
    description: "Eliminate manual errors and ensure consistent patient records.",
    icon: <AccuracyVisual />,
    className: "lg:col-span-7",
  },
];

export default function WhyChooseVesalius() {
  return (
    <section className="w-full bg-[#FCFCFD] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4">Why Vesalius</span>
          <h2 className="text-4xl md:text-5xl lg:text-[4.25rem] font-bold text-[#0B1B3D] tracking-tight max-w-5xl xl:max-w-6xl leading-[1.05] text-balance">
            The AI platform for patient conversations <br className="hidden md:block" />
            built for specialists, by specialists
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`bg-white rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:shadow-lg transition-all duration-500 h-[340px] md:h-[360px] border border-slate-200/60 ${feature.className}`}
            >
              <ArrowUpRight />
              
              <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1B3D] mb-3 pr-12 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 max-w-md text-sm md:text-base leading-relaxed font-light">
                    {feature.description}
                  </p>
              </div>
              
              {/* Visual Area - Pushed to background bottom */}
              <div className="absolute inset-x-6 bottom-6 h-[46%] overflow-visible pointer-events-none">
                <div className="h-full flex items-end justify-center pb-2 group-hover:-translate-y-1 transition-transform duration-700 ease-out">
                  {feature.icon}
                </div>
              </div>
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
