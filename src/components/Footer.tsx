'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const icon = 'mt-0.5 text-white/40 group-hover:text-[#5FD4E2] transition-colors shrink-0';

const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={icon}
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={icon}
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={icon}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={icon}
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// The hover dot sits outside the text box (absolute), so nothing shifts on hover.
const linkClass =
  "relative inline-block text-sm text-white/65 hover:text-white transition-colors before:content-[''] before:absolute before:-left-3.5 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#06ACC1] before:opacity-0 hover:before:opacity-100 before:transition-opacity";
const headingClass = 'text-white text-sm font-semibold mb-5';

export default function Footer() {
  const t = useTranslations('Footer');

  const columns = [
    {
      title: t('legal'),
      links: [
        { href: '/terms-conditions', label: t('termsAndConditions') },
        { href: '/privacy-policy', label: t('privacyPolicy') },
        { href: '/cookie-policy', label: t('cookiePolicy') },
        { href: '/security', label: t('security') },
      ],
    },
    {
      title: t('help'),
      links: [
        { href: '/support', label: t('support') },
        { href: '/contactus', label: t('contact') },
        { href: '/about', label: t('about') },
      ],
    },
  ];

  const contact = [
    {
      href: 'mailto:help@vesalius.health',
      label: 'help@vesalius.health',
      Icon: MailIcon,
    },
    { href: 'tel:+3294961478', label: '09 496 14 78', Icon: PhoneIcon },
    {
      href: 'https://www.linkedin.com/company/vesaliushealth/posts/?feedView=all',
      label: 'LinkedIn',
      Icon: LinkedinIcon,
      external: true,
    },
    {
      href: 'https://www.google.com/maps/search/?api=1&query=Ottergemsesteenweg+Zuid+808B+9000+Gent',
      label: (
        <>
          {t('address.street')}, <span className="whitespace-nowrap">{t('address.city')}</span>
        </>
      ),
      Icon: PinIcon,
      external: true,
    },
  ];

  return (
    <footer className="w-full bg-[#0B1B3D] pt-20 md:pt-24 pb-10 relative overflow-hidden text-slate-300 rounded-t-[40px] md:rounded-t-[80px] mt-12">
      {/* Soft glow, top right */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] md:w-[760px] md:h-[760px] bg-gradient-to-bl from-[#06ACC1]/10 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4 md:translate-x-1/3 md:-translate-y-1/3" />

      {/* Same edges as the navbar: 16px page gutter, then the bar's 24px padding + 1px border */}
      <div className="relative z-10 px-4">
        <div className="max-w-7xl mx-auto px-[25px]">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 pb-16 md:pb-20">
            {/* Brand: logo, where we are and how to reach us */}
            <div className="col-span-2 lg:col-span-6">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity" aria-label="Vesalius.ai">
                <Image src="/vesalius-logo-with-text-footer.svg" alt="Vesalius.ai" width={237} height={41} className="h-8 w-auto" />
              </Link>
              <ul className="mt-8 space-y-3">
                {contact.map(({ href, label, Icon, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors"
                    >
                      <Icon />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {columns.map((column, i) => (
              <nav key={column.title} aria-label={column.title} className={`lg:col-span-3 ${i === 0 ? 'lg:col-start-7' : ''}`}>
                <h3 className={headingClass}>{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col-reverse sm:flex-row justify-between items-center gap-5">
            <p className="text-[13px] text-white/50">{t('copyright')}</p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
