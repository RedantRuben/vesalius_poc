'use client';

import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { toSvg, toPng } from 'html-to-image';

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

const CleanLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1584 396">
      <path 
        d="M -100,150 C 400,50 800,250 1684,100" 
        fill="none" 
        stroke="#06ACC1" 
        strokeWidth="1.5" 
        strokeOpacity="0.4"
      />
      <path 
        d="M -100,200 C 500,300 900,100 1684,200" 
        fill="none" 
        stroke="#FF3366" 
        strokeWidth="1.5" 
        strokeOpacity="0.3"
      />
      <path 
        d="M -100,100 C 600,200 1000,150 1684,250" 
        fill="none" 
        stroke="#0B1B3D" 
        strokeWidth="1.5" 
        strokeOpacity="0.25"
      />
    </svg>
  );
};

// Simplified and scaled down chat card for the banner
const FloatingChatCard = () => {
  return (
    <div className="w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(11,27,61,0.08)] p-4 border border-slate-100 overflow-hidden">
       <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
          <VesaliusLogoMark />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#0B1B3D] tracking-tight">Pre-Consultation Agent</span>
            <span className="text-[8px] text-[#06ACC1] font-semibold tracking-wide uppercase flex items-center gap-1 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-[#06ACC1]"></span>
              Intake Active
            </span>
          </div>
       </div>

       <div className="space-y-3">
          <div className="bg-slate-50 border border-slate-100/50 rounded-xl rounded-tl-sm p-2.5 shadow-sm">
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Hello! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?
            </p>
          </div>

          <div className="bg-[#0B1B3D] rounded-xl rounded-tr-sm p-2.5 ml-6 shadow-md">
            <p className="text-[11px] text-white/95 leading-relaxed">
              I've been having severe headaches for the past two weeks. They seem to be getting worse.
            </p>
          </div>
       </div>
    </div>
  );
};

// Simplified and scaled down scribe card for the banner
const FloatingScribeCard = () => {
  return (
    <div className="w-[300px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(11,27,61,0.08)] p-5 border border-slate-100 overflow-hidden">
       <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400 scale-75">
              <UserAvatar />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0B1B3D]">Live Consultation</span>
              <span className="text-[8px] font-medium text-slate-500 uppercase tracking-wider">Room 4</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-rose-50/80 px-2 py-1 rounded-md border border-rose-100">
            <div className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[8px] font-bold text-rose-600 tracking-widest tabular-nums">04:12</span>
          </div>
       </div>

       <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#F9FBFC] to-white border border-slate-100 rounded-xl p-3 shadow-sm">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-4 h-4 rounded-md bg-cyan-50 flex items-center justify-center border border-cyan-100">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
               </div>
               <span className="text-[8px] font-bold text-[#0B1B3D] uppercase tracking-wider">Clinical Note</span>
             </div>
             <p className="text-[10px] text-slate-600 leading-relaxed">
               Patient reports severe, worsening headaches over the past two weeks. Pain is localized in the frontal region and is accompanied by mild photophobia...
             </p>
             <div className="mt-3 h-1 bg-slate-100 rounded-full w-full overflow-hidden relative">
               <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#06ACC1]/60 to-transparent translate-x-1/2" />
             </div>
          </div>
       </div>
    </div>
  );
};

export default function LinkedinBannerPage() {
  const bannerRef = useRef<HTMLDivElement>(null);

  const exportAsSVG = useCallback(() => {
    if (bannerRef.current === null) return;
    toSvg(bannerRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'vesalius-personal-banner.svg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('oops, something went wrong!', err));
  }, []);

  const exportAsPNG = useCallback(() => {
    if (bannerRef.current === null) return;
    toPng(bannerRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'vesalius-personal-banner.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('oops, something went wrong!', err));
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 overflow-auto">
      {/* Export Controls */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={exportAsPNG}
          className="px-6 py-2.5 bg-[#06ACC1] hover:bg-[#0598ab] text-white font-medium rounded-lg transition-colors shadow-lg"
        >
          Export as PNG (Recommended for LinkedIn)
        </button>
        <button 
          onClick={exportAsSVG}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 rounded-lg transition-colors shadow-lg"
        >
          Export as SVG
        </button>
      </div>

      {/* 
        LinkedIn Banner Container 
        Standard dimensions: 1584 x 396 pixels
      */}
      <div 
        ref={bannerRef}
        className="relative bg-[#FCFCFD] overflow-hidden flex-shrink-0"
        style={{ width: '1584px', height: '396px' }}
      >
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-grid-pattern opacity-[0.2]" 
            style={{ 
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', 
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' 
            }} 
          />
        </div>

        {/* Clean Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CleanLines />
        </div>

        {/* Content Container */}
        <div className="relative z-40 w-full h-full flex items-center justify-between px-20">
          
          {/* Left Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-[4rem] font-bold tracking-tight text-[#0B1B3D] mb-4 leading-[1.05]">
              Be A Doctor <br />
              <span className="font-display font-normal italic tracking-normal">
                Again.
              </span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-light max-w-[400px]">
              Your Personal AI Assistant handles everything else.
            </p>
          </div>

          {/* Right Cards */}
          <div className="relative w-[500px] h-full flex items-center justify-center">
             <div className="absolute right-[220px] top-[40px] z-20 transform -rotate-2">
                <FloatingChatCard />
             </div>
             <div className="absolute right-[0px] top-[140px] z-30 shadow-2xl rounded-2xl transform rotate-1">
                <FloatingScribeCard />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
