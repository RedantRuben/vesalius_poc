'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-[#F2F2F2]">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center z-50">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Vesalius.ai Logo"
              width={120}
              height={34}
              className="object-contain h-8 w-auto"
              priority
            />
          </Link>
        </div>
      
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#2B3B53]">
          <div className="relative flex flex-col items-center">
            <Link href="/" className="text-[#2B3B53] transition-colors font-bold">Overview</Link>
            <div className="absolute -bottom-1 w-1/2 h-[3px] bg-[#06ACC1] rounded-full"></div>
          </div>
          <Link href="/#product" className="hover:text-primary transition-colors">Product</Link>
          <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/security" className="hover:text-primary transition-colors">Security</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button className="rounded-[15px] border border-[#F2F2F2] px-5 py-2 text-sm font-medium text-[#2B3B53] hover:border-primary hover:text-primary transition-colors flex items-center gap-1 bg-white">
            Try for free 
            <span className="text-lg leading-none mb-1">↗</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 p-2 -mr-2 text-[#2B3B53]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-[#F2F2F2] shadow-lg md:hidden p-6 flex flex-col gap-4"
            >
              <Link href="/" className="text-[#2B3B53] font-bold text-lg py-2" onClick={() => setIsOpen(false)}>Overview</Link>
              <Link href="/#product" className="text-[#2B3B53] text-lg py-2" onClick={() => setIsOpen(false)}>Product</Link>
              <Link href="/#pricing" className="text-[#2B3B53] text-lg py-2" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="#contact" className="text-[#2B3B53] text-lg py-2" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link href="/security" className="text-[#2B3B53] text-lg py-2" onClick={() => setIsOpen(false)}>Security</Link>
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                 <button className="w-full rounded-[15px] border border-[#F2F2F2] px-5 py-3 text-sm font-medium text-[#2B3B53] hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1 bg-white">
                  Try for free 
                  <span className="text-lg leading-none mb-1">↗</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
