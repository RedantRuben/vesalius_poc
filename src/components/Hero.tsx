'use client';

import { motion } from 'framer-motion';
import { Instrument_Serif } from 'next/font/google';
import { Link } from '@/i18n/routing';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
});

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const UserAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const VesaliusLogoMark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#06ACC1" fillOpacity="0.1"/>
    <path d="M14.5 16C15.8807 16 17 14.8807 17 13.5C17 12.1193 15.8807 11 14.5 11C13.1193 11 12 12.1193 12 13.5C12 14.8807 13.1193 16 14.5 16Z" fill="#06ACC1"/>
    <path d="M9.5 13C10.8807 13 12 11.8807 12 10.5C12 9.11929 10.8807 8 9.5 8C8.11929 8 7 9.11929 7 10.5C7 11.8807 8.11929 13 9.5 13Z" fill="#0B1B3D"/>
  </svg>
);

// Left Side Floating Card - Chat Intake
const FloatingChatCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
      className="w-[340px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(11,27,61,0.08)] p-5 border border-slate-100 overflow-hidden"
    >
       <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
          <VesaliusLogoMark />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#0B1B3D] tracking-tight">Pre-Consultation Agent</span>
            <span className="text-[10px] text-[#06ACC1] font-semibold tracking-wide uppercase flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06ACC1]"></span>
              Intake Active
            </span>
          </div>
       </div>

       <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-100/50 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
            <p className="text-[13px] text-slate-700 leading-relaxed">
              Hello David! I&apos;m here to help the doctor prepare for your visit. What is the main reason for your appointment today?
            </p>
          </div>

          <div className="bg-[#0B1B3D] rounded-2xl rounded-tr-sm p-3.5 ml-8 shadow-md">
            <p className="text-[13px] text-white/95 leading-relaxed">
              I&apos;ve been having severe headaches for the past two weeks. They seem to be getting worse.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100/50 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
            <p className="text-[13px] text-slate-700 leading-relaxed">
              I understand. Can you tell me exactly where the pain is located, and if you have any other symptoms?
            </p>
          </div>
       </div>
    </motion.div>
  );
};

// Right Side Floating Card - Live Audio Scribe
const FloatingScribeCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
      className="w-[360px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(11,27,61,0.08)] p-6 border border-slate-100 overflow-hidden"
    >
       <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400">
              <UserAvatar />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0B1B3D]">Live Consultation</span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Room 4</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-rose-50/80 px-2.5 py-1.5 rounded-lg border border-rose-100">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-bold text-rose-600 tracking-widest tabular-nums">04:12</span>
          </div>
       </div>

       <div className="space-y-6">
          {/* Audio Waveform visualization */}
          <div className="flex items-center justify-center h-12 px-2 gap-1">
            {[...Array(32)].map((_, i) => {
               const distance = Math.abs(16 - i);
               const maxH = 40 - (distance * 1.5);
               const baseHeight = Math.max(8, maxH);
               
               return (
                 <motion.div
                   key={i}
                   animate={{ height: [baseHeight * 0.4, baseHeight, baseHeight * 0.4] }}
                   transition={{ duration: 0.8 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                   className={`w-1 rounded-full ${distance < 8 ? 'bg-gradient-to-t from-[#0B1B3D] to-[#06ACC1]' : 'bg-slate-200'}`}
                 />
               );
            })}
          </div>

          <div className="bg-gradient-to-br from-[#F9FBFC] to-white border border-slate-100 rounded-2xl p-4 shadow-sm">
             <div className="flex items-center gap-2 mb-3">
               <div className="w-5 h-5 rounded-md bg-cyan-50 flex items-center justify-center border border-cyan-100">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
               </div>
               <span className="text-[10px] font-bold text-[#0B1B3D] uppercase tracking-wider">Clinical Note Generation</span>
             </div>
             <p className="text-[13px] text-slate-600 leading-relaxed">
               Patient reports severe, worsening headaches over the past two weeks. Pain is localized in the frontal region and is accompanied by mild photophobia...
             </p>
             <div className="mt-4 h-1.5 bg-slate-100 rounded-full w-full overflow-hidden relative">
               <motion.div 
                 animate={{ x: ["-100%", "200%"] }}
                 transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#06ACC1]/60 to-transparent"
               />
             </div>
          </div>
       </div>
    </motion.div>
  );
};

// Clean Lines
const CleanLines = () => {
  return (
      <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800">
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          d="M -100,300 C 400,200 800,500 1540,300" 
          fill="none" 
          stroke="#06ACC1" 
          strokeWidth="1.5" 
          strokeOpacity="0.4"
        />
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
          d="M -100,400 C 500,500 900,250 1540,350" 
          fill="none" 
          stroke="#FF3366" 
          strokeWidth="1.5" 
          strokeOpacity="0.3"
        />
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: "easeInOut", delay: 0.4 }}
          d="M -100,200 C 600,350 1000,250 1540,400" 
          fill="none" 
          stroke="#0B1B3D" 
          strokeWidth="1.5" 
          strokeOpacity="0.25"
        />
      </svg>
  );
};

export default function Hero() {

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center w-full pt-24 md:pt-24 pb-12 lg:pb-16 bg-[#FCFCFD] min-h-[75vh] md:min-h-[85vh] overflow-x-hidden">
        
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />
        </div>

        {/* Clean, sweeping lines background */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CleanLines />
        </div>

        {/* Main Layout Container */}
        <div className="relative w-full max-w-7xl mx-auto z-40 px-4 md:px-8 mt-4 md:mt-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
                
                {/* Left: Main Content Area */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[45%] xl:w-[50%] relative z-40">
                    
                    {/* Main Title - Single Line, Single Color */}
                    <h1 className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold tracking-tight text-[#0B1B3D] mb-6 leading-[1.05] w-full">
                        <motion.span 
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          className="block"
                        >
                          Be A Doctor <br className="hidden lg:block" />
                          <span className={`${instrumentSerif.className} inline-block font-normal italic tracking-normal`}>
                            Again.
                          </span>
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p 
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                      className="text-lg md:text-xl xl:text-2xl text-slate-500 mb-10 leading-relaxed font-light max-w-2xl lg:max-w-md xl:max-w-lg"
                    >
                        Your Personal AI Assistant handles everything else.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                      className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <a href="https://assistant.vesalius.ai/onboarding/credentials" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0B1B3D] text-white font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-[15px] shadow-[0_8px_20px_-6px_rgba(11,27,61,0.5)] hover:-translate-y-0.5">
                            Meet your Assistant →
                        </a>
                        
                        <Link href="/demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-2 text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <PlayIcon />
                            Watch Demo
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Floating Cards Collage (Desktop Only) */}
                <div className="hidden lg:flex relative w-full lg:w-[55%] xl:w-[50%] h-[500px] xl:h-[600px] items-center justify-end pointer-events-none">
                    <div className="absolute right-[15%] xl:right-[20%] top-0 xl:top-[5%] z-20 pointer-events-auto transition-all duration-300">
                        <FloatingChatCard />
                    </div>
                    <div className="absolute right-0 top-[30%] xl:top-[35%] z-30 pointer-events-auto transition-all duration-300 shadow-2xl rounded-3xl">
                        <FloatingScribeCard />
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile-only compact view of cards */}
        <div className="lg:hidden w-full px-4 mt-8 flex flex-col gap-6 relative z-30 items-center">
             <div className="relative w-full max-w-[340px]">
                <div className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-5 border border-slate-100">
                   <div className="flex items-center gap-3 mb-4">
                      <VesaliusLogoMark />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-[#0B1B3D]">Pre-Consultation Agent</span>
                        <span className="text-[10px] text-[#06ACC1] font-medium tracking-wide uppercase">Intake Active</span>
                      </div>
                   </div>

                   <div className="space-y-4 text-left">
                    <div className="bg-slate-50 border border-slate-100/50 rounded-2xl rounded-tl-sm p-3.5 shadow-sm">
                        <p className="text-[13px] text-slate-700 leading-relaxed">
                          Hello David! I&apos;m here to help the doctor prepare for your visit. What is the main reason for your appointment today?
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-[#0B1B3D] to-[#162c5e] rounded-2xl rounded-tr-sm p-3.5 ml-6 shadow-md">
                        <p className="text-[13px] text-white/95 leading-relaxed">
                          I&apos;ve been having severe headaches for the past two weeks. They seem to be getting worse.
                        </p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="relative w-full max-w-[340px]">
                <div className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-5 border border-slate-100">
                   <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                          <UserAvatar />
                        </div>
                        <span className="text-sm font-bold text-[#0B1B3D]">Live Consultation</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-rose-600 tracking-widest tabular-nums">04:12</span>
                      </div>
                   </div>

                   <div className="space-y-4 text-left">
                      <div className="flex items-center justify-center h-8 px-2 gap-1">
                        {[...Array(24)].map((_, i) => {
                             const distance = Math.abs(12 - i);
                             const maxH = 30 - (distance * 2);
                             return (
                               <div
                                 key={i}
                                 className={`w-1 rounded-full ${distance < 6 ? 'bg-[#0B1B3D]' : 'bg-slate-200'}`}
                                 style={{ height: `${Math.max(6, maxH)}px` }}
                               />
                             );
                        })}
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50/50 to-white border border-cyan-100/50 rounded-xl p-3.5">
                         <div className="flex items-center gap-1.5 mb-2">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
                           <span className="text-[9px] font-bold text-[#06ACC1] uppercase tracking-wider">Clinical Note</span>
                         </div>
                         <p className="text-[12px] text-slate-600 leading-relaxed">
                           Patient reports severe, worsening headaches over the past two weeks. Pain is localized in the frontal region and is accompanied by mild photophobia...
                         </p>
                      </div>
                   </div>
                </div>
             </div>
        </div>
        
    </section>
  );
}
