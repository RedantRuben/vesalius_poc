'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([±+\-]?\s*)(\d+)(.*)$/);

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    if (!match) {
      nodeRef.current.textContent = value;
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2], 10);
    const suffix = match[3];
    const startTime = performance.now();
    const duration = 1200;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${Math.round(eased * target)}${suffix}`;
      }
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={nodeRef}>{value}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function TheProblem() {
  const t = useTranslations('TheProblem');
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const cards = ['burnout', 'stress', 'data'];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FCFCFD] relative overflow-hidden flex flex-col items-center py-16 md:py-24"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24">
          
          {/* Right Side: Text Content & Hero Stat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:w-[45%] flex flex-col items-start text-left lg:sticky lg:top-32 self-start"
          >
            <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-[11px] md:text-xs mb-4">
              {t('eyebrow')}
            </span>
            <h2 className="text-[2rem] md:text-4xl lg:text-[2.75rem] font-bold text-[#0B1B3D] tracking-tight max-w-xl text-balance leading-[1.1] mb-5">
              {t('title')}
            </h2>
            <p className="text-slate-700 text-[15px] md:text-lg leading-relaxed max-w-lg mb-6 md:mb-8">
              {t('subtitle')}
            </p>

            {/* Hero Stat - Highlighted Evidence */}
            <div className="relative p-8 md:p-10 w-full bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-[#0B1B3D]/5 overflow-hidden group">
               {/* Faint technical background & glow */}
               <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#06ACC1]/10 rounded-full blur-3xl group-hover:bg-[#06ACC1]/20 transition-colors duration-700" />
               
               <div className="relative z-10">
                 <span className="text-[4rem] md:text-[5.5rem] font-bold text-[#06ACC1] leading-none tracking-tight tabular-nums block mb-4">
                   <AnimatedCounter value={t('cards.time.stat')} inView={inView} />
                 </span>
                 <h3 className="text-xl md:text-2xl font-bold text-[#0B1B3D] leading-snug mb-3 tracking-tight">
                   {t('cards.time.title')}
                 </h3>
                 <p className="text-slate-600 text-[15px] md:text-base leading-relaxed">
                   {t('cards.time.description')}
                 </p>
               </div>
            </div>
          </motion.div>

          {/* Left Side: Supporting Stats List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:w-[55%] flex flex-col justify-center w-full lg:pr-8"
          >
            {cards.map((id, index) => (
              <motion.div
                key={id}
                variants={itemVariants}
                className={`py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group ${
                  index !== 0 ? 'border-t border-slate-200/80' : ''
                }`}
              >
                {/* Stat Number */}
                <div className="flex-shrink-0 w-full md:w-40 lg:w-44 relative">
                  <span className="text-[3rem] md:text-[4rem] font-bold text-[#0B1B3D] leading-none tracking-tight tabular-nums block">
                    <AnimatedCounter value={t(`cards.${id}.stat`)} inView={inView} />
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1B3D] leading-snug mb-2 tracking-tight">
                    {t(`cards.${id}.title`)}
                  </h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-md">
                    {t(`cards.${id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
