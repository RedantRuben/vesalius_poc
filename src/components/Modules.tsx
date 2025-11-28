'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const CommandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 w-5 h-5">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
    </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Modules() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3B53]">
            We have a module for everyone
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Pre Consultation - Top Left (Wider) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="lg:col-span-7 bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow h-[280px] md:h-[320px]"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-2">
                <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">Whatsapp</span>
                <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">50+ Languages</span>
              </div>
              <ArrowUpRight />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#2B3B53] mb-2">Pre Consultation</h3>
            <p className="text-gray-500 max-w-md mb-6 text-xs md:text-sm">
              Intelligent conversational intake that structures patient history before they enter the room.
            </p>
            
            {/* Visual Visualization */}
            <div className="relative h-32 w-full max-w-lg mx-auto transform scale-90 origin-top">
               {/* Background elements or chat bubbles */}
               <motion.div  
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4, duration: 0.5 }}
                 className="absolute right-0 top-0 w-3/4 bg-gray-100 rounded-2xl rounded-tr-sm p-3 mb-4"
               >
                 <div className="flex gap-1 mb-2">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                 </div>
                 <div className="h-1.5 bg-gray-200 rounded w-full mb-2"></div>
                 <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.8, duration: 0.5 }}
                 className="absolute left-0 top-24 md:top-20 w-3/4 bg-cyan-50/50 rounded-2xl rounded-tl-sm p-3 border border-cyan-100"
               >
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-1.5 bg-cyan-200 rounded w-1/2"></div>
                    <span className="text-[8px] font-bold text-cyan-600 tracking-wider">ANALYZED</span>
                  </div>
                  <div className="h-1.5 bg-cyan-200/50 rounded w-full"></div>
               </motion.div>
            </div>
          </motion.div>

          {/* Scribe - Top Right (Narrower) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="lg:col-span-5 bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow h-[280px] md:h-[320px]"
          >
             <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">Desktop</span>
                <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">Mobile</span>
              </div>
              <ArrowUpRight />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#2B3B53] mb-2">Scribe</h3>
            <p className="text-gray-500 mb-6 text-xs md:text-sm">
              The Scribe Bot listens in the background during the consultation (via mobile or desktop) and accurately captures the entire clinical conversation.
            </p>
            
            <div className="flex justify-center items-center gap-6 mt-4">
                {/* Mic Button with pulsating circles */}
                <div className="relative flex items-center justify-center">
                     <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-16 h-16 bg-[#FF3B5C] rounded-2xl blur-md" 
                     />
                     
                     <div className="relative w-16 h-16 bg-[#FF3B5C] rounded-2xl flex items-center justify-center shadow-xl z-10">
                        <MicIcon />
                     </div>
                </div>
                
                {/* Audio Waves */}
                <div className="flex items-end gap-1 h-10">
                    {[12, 24, 18, 10].map((height, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [height * 0.5, height, height * 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                            style={{ height }}
                            className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-pink-200' : 'bg-pink-300'}`}
                        />
                    ))}
                </div>
            </div>
          </motion.div>

          {/* Document Generation - Bottom Left (Narrower) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="lg:col-span-5 bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow h-[280px] md:h-[320px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Automated</span>
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Integrated</span>
              </div>
              <ArrowUpRight />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#2B3B53] mb-2">Document Generation</h3>
            <p className="text-gray-500 mb-6 text-xs md:text-sm">
              Put your data to work. Vesalius stops not at capturing info but uses it to generate your administration.
            </p>

            <div className="relative h-32 w-full flex justify-center transform scale-90 origin-top">
               <motion.div 
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  initial={{ rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-3 relative"
               >
                  {/* Document Header */}
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center">
                        <FileTextIcon />
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded w-16"></div>
                  </div>
                  {/* Lines */}
                  <div className="space-y-1.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="h-1.5 bg-gray-100 rounded"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="h-1.5 bg-gray-100 rounded"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="h-1.5 bg-gray-100 rounded"
                      />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="h-1.5 bg-gray-100 rounded"
                      />
                  </div>
                  {/* Sparkle element floating */}
                   <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md border border-gray-100"
                   >
                        <SparklesIcon />
                   </motion.div>
                   {/* Ready Badge */}
                   <motion.div 
                       initial={{ scale: 0 }}
                       whileInView={{ scale: 1 }}
                       transition={{ delay: 1, type: "spring" }}
                       className="absolute bottom-3 left-3 bg-green-100 px-1.5 py-0.5 rounded text-[8px] font-medium text-green-700"
                   >
                       Ready
                   </motion.div>
               </motion.div>
            </div>
          </motion.div>

          {/* Smart Triage - Bottom Right (Wider) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="lg:col-span-7 bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-6 md:p-8 relative overflow-hidden group hover:shadow-md transition-shadow h-[280px] md:h-[320px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                 <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">Coming Soon</span>
              </div>
              <ArrowUpRight />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#2B3B53] mb-2">Smart Triage</h3>
            <p className="text-gray-500 max-w-xl mb-6 text-xs md:text-sm">
              Intelligent urgency assessment and routing to ensure patients get the right care at the right time. Optimize your schedule and prioritize effectively.
            </p>
            
            <div className="flex justify-center items-center gap-3 md:gap-6 py-4">
                {/* Step 1: Command */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1], 
                        borderColor: ["#f3f4f6", "#2B3B53", "#f3f4f6"],
                        color: ["#9ca3af", "#2B3B53", "#9ca3af"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2] }}
                    className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center bg-white transition-colors"
                >
                    <CommandIcon />
                </motion.div>
                
                {/* Path 1 */}
                <div className="relative h-px w-8 md:w-16 bg-gray-200">
                    <motion.div 
                        animate={{ width: ["0%", "100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, times: [0.1, 0.3, 1] }}
                        className="absolute left-0 top-0 h-full bg-[#2B3B53]"
                    />
                </div>
                
                {/* Step 2: Process (Zap) */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        borderColor: ["#ffedd5", "#f97316", "#ffedd5"],
                        backgroundColor: ["#fff7ed", "#ffedd5", "#fff7ed"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0.3, 0.4, 0.5] }}
                    className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 shadow-sm flex items-center justify-center z-10"
                >
                    <ZapIcon />
                </motion.div>
                
                {/* Path 2 */}
                <div className="relative h-px w-8 md:w-16 bg-gray-200">
                     <motion.div 
                        animate={{ width: ["0%", "100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, times: [0.5, 0.7, 1] }}
                        className="absolute left-0 top-0 h-full bg-[#2B3B53]"
                    />
                </div>
                
                {/* Step 3: Complete (Check) */}
                <motion.div 
                    animate={{ 
                         scale: [1, 1.1, 1],
                         borderColor: ["#f3f4f6", "#22c55e", "#f3f4f6"],
                         color: ["#9ca3af", "#22c55e", "#9ca3af"]
                    }}
                    transition={{ duration: 4, repeat: Infinity, times: [0.7, 0.8, 0.9] }}
                    className="w-12 h-12 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center bg-white z-10"
                >
                    <CheckCircleIcon />
                </motion.div>

                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 mt-2">
                    Routing...
                </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
