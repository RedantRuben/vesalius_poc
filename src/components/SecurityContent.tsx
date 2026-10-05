'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import MotionProvider from '@/components/MotionProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

type Item = { title: string; body: string; items: readonly string[] };

export interface SecurityCopy {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  cards: readonly Item[];
  standardsTitle: string;
  standardsSubtitle: string;
  standards: readonly { acronym: string; title: string; body: string }[];
}

// Lock, shield-check, eye: one per value, in the same order as the copy.
const VALUE_ICONS = [
  'M5 11h14v10H5zM7 11V7a5 5 0 0 1 10 0v4',
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4',
  'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** The three brand lines from the homepage hero, drawn in and faded at the bottom. */
const BrandLines = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none"
    style={{
      maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
    }}
  >
    <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 800">
      {[
        { d: 'M -100,300 C 400,200 800,500 1540,300', color: '#06ACC1', opacity: 0.4 },
        { d: 'M -100,400 C 500,500 900,250 1540,350', color: '#FF3366', opacity: 0.3 },
        { d: 'M -100,200 C 600,350 1000,250 1540,400', color: '#0B1B3D', opacity: 0.25 },
      ].map((line, i) => (
        <motion.path
          key={line.d}
          d={line.d}
          fill="none"
          stroke={line.color}
          strokeOpacity={line.opacity}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  </div>
);

export default function SecurityContent({ copy }: { copy: SecurityCopy }) {
  return (
    <MotionProvider>
      <main className="w-full relative bg-[#FAFAFB] overflow-x-clip selection:bg-primary/20">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-36 md:pt-44 pb-16 md:pb-24">
          <BrandLines />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              {...fadeUp()}
              className="text-[3rem] md:text-7xl lg:text-[5.5rem] font-semibold text-[#0B1B3D] tracking-[-0.04em] leading-[0.98]"
            >
              {/* "Uw data, onze prioriteit." with the accent in the serif, like "Be a doctor again." on the homepage */}
              {copy.title.trim()} <span className="font-display italic font-normal tracking-[-0.01em]">{copy.accent}.</span>
            </motion.h1>
            <motion.p {...fadeUp(0.1)} className="mt-8 md:mt-10 text-lg md:text-xl text-slate-600 leading-relaxed tracking-tight max-w-3xl mx-auto">
              {copy.intro}
            </motion.p>
          </div>
        </section>

        {/* Three values */}
        <section className="py-8 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
            {copy.cards.map((card, i) => (
              <motion.article
                key={card.title}
                {...fadeUp()}
                className="bg-white rounded-[28px] ring-1 ring-slate-200/70 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-8"
              >
                <div className="flex flex-col p-2 md:p-4">
                  <span className="flex items-center gap-3 mb-5">
                    <span className="text-[#0597a9]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={VALUE_ICONS[i]} />
                      </svg>
                    </span>
                    <h2 className="text-2xl md:text-[2rem] font-semibold text-[#0B1B3D] tracking-[-0.03em] leading-tight">{card.title}</h2>
                  </span>
                  <p className="text-[17px] text-slate-600 leading-relaxed">{card.body}</p>
                </div>
                <ul className="rounded-[20px] bg-[#F4F6F8] px-6 py-2 flex flex-col justify-center divide-y divide-slate-200/80">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-4 text-[15px] font-medium text-[#0B1B3D] leading-snug">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 mt-0.5 text-[#06ACC1]" aria-hidden="true">
                        <path d="M 3.5 8.5 L 6.5 11.5 L 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Compliance standards */}
        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp()} className="rounded-[28px] bg-white ring-1 ring-slate-200/70 p-8 md:p-14 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 lg:items-center">
              <div>
                <h2 className="text-[2.25rem] md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.035em] leading-[1.05] text-balance">{copy.standardsTitle}</h2>
                <p className="mt-5 text-slate-600 text-lg leading-relaxed">{copy.standardsSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {copy.standards.map((standard) => (
                  <div key={standard.acronym} className="rounded-2xl bg-[#FAFAFB] ring-1 ring-slate-200/70 p-6 md:p-7">
                    <p className="text-4xl md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.04em]">{standard.acronym}</p>
                    <p className="mt-6 font-semibold text-[#0B1B3D]">{standard.title}</p>
                    <p className="mt-1 text-sm text-slate-500 leading-snug">{standard.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <FinalCta />
        <Footer />
      </main>
    </MotionProvider>
  );
}
