'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  // Scroll spy effect - only on homepage
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }

    const sections = ['product', 'pricing', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll to top (show overview as active)
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const isOverviewActive = isHomePage && activeSection === null;
  const isProductActive = isHomePage && activeSection === 'product';
  const isPricingActive = isHomePage && activeSection === 'pricing';
  const isContactActive = isHomePage && activeSection === 'contact';

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
            <Link 
              href="/" 
              className={`transition-colors ${isOverviewActive ? 'font-bold text-[#2B3B53]' : 'text-[#2B3B53] hover:text-primary'}`}
            >
              {t('overview')}
            </Link>
            {isOverviewActive && (
              <motion.div 
                layoutId="navbar-underline"
                className="absolute -bottom-1 w-1/2 h-[3px] bg-[#06ACC1] rounded-full"
              />
            )}
          </div>
          <div className="relative flex flex-col items-center">
            <Link 
              href="/#product" 
              className={`transition-colors ${isProductActive ? 'font-bold text-[#2B3B53]' : 'text-[#2B3B53] hover:text-primary'}`}
            >
              {t('product')}
            </Link>
            {isProductActive && (
              <motion.div 
                layoutId="navbar-underline"
                className="absolute -bottom-1 w-1/2 h-[3px] bg-[#06ACC1] rounded-full"
              />
            )}
          </div>
          <div className="relative flex flex-col items-center">
            <Link 
              href="/#pricing" 
              className={`transition-colors ${isPricingActive ? 'font-bold text-[#2B3B53]' : 'text-[#2B3B53] hover:text-primary'}`}
            >
              {t('pricing')}
            </Link>
            {isPricingActive && (
              <motion.div 
                layoutId="navbar-underline"
                className="absolute -bottom-1 w-1/2 h-[3px] bg-[#06ACC1] rounded-full"
              />
            )}
          </div>
          <div className="relative flex flex-col items-center">
            <Link 
              href="/#contact" 
              className={`transition-colors ${isContactActive ? 'font-bold text-[#2B3B53]' : 'text-[#2B3B53] hover:text-primary'}`}
            >
              {t('contact')}
            </Link>
            {isContactActive && (
              <motion.div 
                layoutId="navbar-underline"
                className="absolute -bottom-1 w-1/2 h-[3px] bg-[#06ACC1] rounded-full"
              />
            )}
          </div>
          <Link href="/security" className="hover:text-primary transition-colors">{t('security')}</Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="https://assistant.vesalius.ai/onboarding/credentials" className="rounded-[15px] border border-[#F2F2F2] px-5 py-2 text-sm font-medium text-[#2B3B53] hover:border-primary hover:text-primary transition-colors flex items-center gap-1 bg-white">
            {t('tryForFree')}
            <span className="text-lg leading-none mb-1">↗</span>
          </a>
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
              <Link href="/" className={`text-lg py-2 ${isOverviewActive ? 'text-[#06ACC1] font-bold' : 'text-[#2B3B53]'}`} onClick={() => setIsOpen(false)}>{t('overview')}</Link>
              <Link href="/#product" className={`text-lg py-2 ${isProductActive ? 'text-[#06ACC1] font-bold' : 'text-[#2B3B53]'}`} onClick={() => setIsOpen(false)}>{t('product')}</Link>
              <Link href="/#pricing" className={`text-lg py-2 ${isPricingActive ? 'text-[#06ACC1] font-bold' : 'text-[#2B3B53]'}`} onClick={() => setIsOpen(false)}>{t('pricing')}</Link>
              <Link href="/#contact" className={`text-lg py-2 ${isContactActive ? 'text-[#06ACC1] font-bold' : 'text-[#2B3B53]'}`} onClick={() => setIsOpen(false)}>{t('contact')}</Link>
              <Link href="/security" className="text-[#2B3B53] text-lg py-2" onClick={() => setIsOpen(false)}>{t('security')}</Link>
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                 <a href="https://assistant.vesalius.ai/onboarding/credentials" className="w-full rounded-[15px] border border-[#F2F2F2] px-5 py-3 text-sm font-medium text-[#2B3B53] hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1 bg-white">
                  {t('tryForFree')}
                  <span className="text-lg leading-none mb-1">↗</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
