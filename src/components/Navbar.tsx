'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const sections = ['product', 'pricing', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
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

    const handleScrollTop = () => {
      if (window.scrollY < 300) {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScrollTop);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [isHomePage]);

  const displayedActiveSection = isHomePage ? activeSection : null;
  const isOverviewActive = isHomePage && displayedActiveSection === null;
  const isProductActive = isHomePage && displayedActiveSection === 'product';
  const isPricingActive = isHomePage && displayedActiveSection === 'pricing';
  const isContactActive = isHomePage && displayedActiveSection === 'contact';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300 pointer-events-none">
      <header
        className={`w-full max-w-7xl rounded-full border border-transparent pointer-events-auto transition-[background-color,box-shadow,border-color,padding] duration-500 ${
          scrolled
            ? 'bg-white/95 shadow-[0_12px_36px_-16px_rgba(15,23,42,0.18)] border-slate-200/70 py-2 md:py-3 backdrop-blur-sm'
            : 'bg-transparent shadow-none py-4'
        }`}
      >
        <nav className="flex items-center justify-between px-6 w-full">
          <div className="flex items-center z-50">
            <Link href="/">
              <Image
                src="/vesalius.svg"
                alt="Vesalius.ai Logo"
                width={196}
                height={34}
                className="object-contain h-7 md:h-8 w-auto hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>
        
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem href="/" isActive={isOverviewActive} label={t('overview')} />
            <NavItem href="/#product" isActive={isProductActive} label={t('product')} />
            <NavItem href="/#pricing" isActive={isPricingActive} label={t('pricing')} />
            <NavItem href="/#contact" isActive={isContactActive} label={t('contact')} />
            <NavItem href="/security" isActive={pathname === '/security'} label={t('security')} />
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://assistant.vesalius.ai/onboarding/credentials" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0B1B3D] px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-[0_4px_14px_-4px_rgba(11,27,61,0.5)] hover:-translate-y-0.5">
              {t('tryForFree')}
              <span className="text-lg leading-none mb-0.5">↗</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 p-2 -mr-2 text-[#0B1B3D]"
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
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[120%] left-0 right-0 bg-white rounded-2xl shadow-xl md:hidden p-6 flex flex-col gap-2 mt-2 border border-slate-100"
              >
                <MobileNavItem href="/" isActive={isOverviewActive} label={t('overview')} onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/#product" isActive={isProductActive} label={t('product')} onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/#pricing" isActive={isPricingActive} label={t('pricing')} onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/#contact" isActive={isContactActive} label={t('contact')} onClick={() => setIsOpen(false)} />
                <MobileNavItem href="/security" isActive={pathname === '/security'} label={t('security')} onClick={() => setIsOpen(false)} />
                
                <div className="pt-4 mt-2 border-t border-slate-200">
                   <a href="https://assistant.vesalius.ai/onboarding/credentials" target="_blank" rel="noopener noreferrer" className="w-full rounded-xl bg-[#0B1B3D] px-5 py-3.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 shadow-md">
                    {t('tryForFree')}
                    <span className="text-lg leading-none mb-1">↗</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </div>
  );
}

function NavItem({ href, isActive, label }: { href: string, isActive: boolean, label: string }) {
  return (
    <Link 
      href={href} 
      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'text-[#0B1B3D]' : 'text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-50'}`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute inset-0 bg-slate-100/80 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavItem({ href, isActive, label, onClick }: { href: string, isActive: boolean, label: string, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? 'bg-slate-50 text-[#0B1B3D]' : 'text-slate-600 hover:bg-slate-50'}`}
    >
      {label}
    </Link>
  );
}
