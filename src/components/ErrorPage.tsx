'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ErrorPageProps {
  code: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  actionHref?: string;
  onRetry?: () => void;
}

// Animated heartbeat line SVG
const HeartbeatLine = () => (
  <svg 
    viewBox="0 0 400 100" 
    className="w-full max-w-md h-20 text-primary"
    preserveAspectRatio="xMidYMid meet"
  >
    <motion.path
      d="M0,50 L80,50 L100,50 L120,20 L140,80 L160,35 L180,65 L200,50 L220,50 L400,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
    />
  </svg>
);

// Floating pill icon
const PillIcon = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay }}
  >
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary/40">
      <path 
        d="M10.5 3.5L3.5 10.5C1.5 12.5 1.5 15.5 3.5 17.5L6.5 20.5C8.5 22.5 11.5 22.5 13.5 20.5L20.5 13.5C22.5 11.5 22.5 8.5 20.5 6.5L17.5 3.5C15.5 1.5 12.5 1.5 10.5 3.5Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path d="M12 12L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </motion.div>
);

// Stethoscope icon
const StethoscopeIcon = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ rotate: 0 }}
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay }}
  >
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-secondary/30">
      <path 
        d="M6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9V11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="18" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
      <path 
        d="M6 9V15C6 18.3137 8.68629 21 12 21" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  </motion.div>
);

// Bandage icon
const BandageIcon = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={className}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay }}
  >
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-accent/30">
      <rect 
        x="2" y="8" width="20" height="8" rx="2" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="12" r="1" fill="currentColor"/>
    </svg>
  </motion.div>
);

export default function ErrorPage({ 
  code, 
  title, 
  subtitle, 
  actionLabel, 
  actionHref = '/',
  onRetry 
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-white">
      {/* Background Grid - matching Hero component */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-[#06ACC1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-[#2B3B53]/5 rounded-full blur-3xl" />
      </div>

      {/* Floating medical icons */}
      <PillIcon className="absolute top-[15%] left-[10%] hidden md:block" delay={0} />
      <StethoscopeIcon className="absolute top-[20%] right-[15%] hidden md:block" delay={1} />
      <BandageIcon className="absolute bottom-[25%] left-[15%] hidden md:block" delay={2} />
      <PillIcon className="absolute bottom-[20%] right-[10%] hidden md:block" delay={1.5} />

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Error code with heartbeat effect */}
        <motion.div
          className="text-8xl md:text-9xl font-bold text-[#06ACC1] mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {code}
        </motion.div>

        {/* Heartbeat line */}
        <div className="flex justify-center mb-8">
          <HeartbeatLine />
        </div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#2B3B53] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {onRetry ? (
            <button
              onClick={onRetry}
              className="px-8 py-3 rounded-full bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-[#06ACC1]/20 mx-auto"
            >
              {actionLabel}
              <span className="text-lg leading-none">↻</span>
            </button>
          ) : (
            <Link
              href={actionHref}
              className="inline-flex px-8 py-3 rounded-full bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all items-center justify-center gap-2 text-base shadow-lg shadow-[#06ACC1]/20"
            >
              {actionLabel}
              <span className="text-lg leading-none mb-0.5">↗</span>
            </Link>
          )}
        </motion.div>

        {/* Fun extra message */}
        <motion.p
          className="mt-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          🩺 The doctor will see you now... on the homepage
        </motion.p>
      </motion.div>
    </div>
  );
}

