'use client';

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Animated heartbeat line SVG
const HeartbeatLine = () => (
  <svg 
    viewBox="0 0 400 100" 
    className="w-full max-w-md h-20"
    style={{ color: '#06ACC1' }}
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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <div 
          className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
          style={{ backgroundColor: '#ffffff' }}
        >
          {/* Background Grid */}
          <div 
            className="absolute inset-0 -z-10 h-full w-full"
            style={{ 
              backgroundColor: '#ffffff',
              backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }} 
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute rounded-full blur-3xl" 
              style={{ 
                top: '20%', 
                left: '20%', 
                width: '40%', 
                height: '40%',
                backgroundColor: 'rgba(6, 172, 193, 0.05)'
              }} 
            />
            <div 
              className="absolute rounded-full blur-3xl" 
              style={{ 
                bottom: '20%', 
                right: '20%', 
                width: '40%', 
                height: '40%',
                backgroundColor: 'rgba(43, 59, 83, 0.05)'
              }} 
            />
          </div>

          {/* Main content */}
          <motion.div
            className="text-center z-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Error code with heartbeat effect */}
            <motion.div
              className="text-8xl md:text-9xl font-bold mb-2"
              style={{ color: '#06ACC1' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Oops
            </motion.div>

            {/* Heartbeat line */}
            <div className="flex justify-center mb-8">
              <HeartbeatLine />
            </div>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#2B3B53' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Something Went Wrong
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl mb-10 leading-relaxed px-4"
              style={{ color: '#6b7280' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Don&apos;t worry, it&apos;s not contagious. Our team is diagnosing the issue.
            </motion.p>

            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={reset}
                className="px-8 py-3 rounded-full text-white font-bold transition-all flex items-center justify-center gap-2 text-base mx-auto"
                style={{ 
                  backgroundColor: '#06ACC1',
                  boxShadow: '0 10px 15px -3px rgba(6, 172, 193, 0.2)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0597a9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#06ACC1'}
              >
                Try Again
                <span className="text-lg leading-none">↻</span>
              </button>
            </motion.div>

            {/* Fun extra message */}
            <motion.p
              className="mt-8 text-sm"
              style={{ color: '#9ca3af' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              🩺 The doctor will see you now... on the homepage
            </motion.p>
          </motion.div>
        </div>
      </body>
    </html>
  );
}

