'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import MotionProvider from '@/components/MotionProvider';
import { ABOUT, FOUNDER_NOTE_APPROVED, TEAM, type AboutCopy, type SiteLocale } from '@/content/about';

const EASE = [0.16, 1, 0.3, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: EASE, delay },
});

/** One rhythm for the whole page: the same padding on every section, the same gap under every heading. */
const SECTION = 'py-12 md:py-16';
const AFTER_HEADING = 'mt-10 md:mt-12';

const H2 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-[2.25rem] md:text-5xl font-semibold text-[#0B1B3D] tracking-[-0.04em] leading-[1.05] text-balance ${className}`}>{children}</h2>
);

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Ottergemsesteenweg+Zuid+808B+9000+Gent';

/* ------------------------------------------------------------------ */

function Hero({ c }: { c: AboutCopy }) {
  return (
    <section className="relative pt-36 md:pt-48 pb-12 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold text-[#0B1B3D] tracking-[-0.05em] leading-[1] text-balance"
        >
          {c.hero.before}
          <span className="font-display italic font-normal tracking-[-0.02em]">{c.hero.accent}</span>
          {c.hero.after}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed max-w-4xl mx-auto text-balance"
        >
          {c.hero.body}
        </motion.p>
      </div>

      {/* The three answers a sceptical doctor looks for first */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 bg-white rounded-[28px] ring-1 ring-slate-200/70 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
        >
          {c.facts.map((fact) => (
            <div key={fact.value} className="px-7 py-6 md:px-9 md:py-8 flex flex-col-reverse">
              <dd className="text-xl md:text-2xl font-semibold text-[#0B1B3D] tracking-[-0.02em]">{fact.value}</dd>
              <dt className="text-sm text-slate-500 mb-1">{fact.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Origin({ c }: { c: AboutCopy }) {
  return (
    <section className={SECTION}>
      <motion.div {...reveal()} className="max-w-6xl mx-auto px-4 sm:px-6">
        <H2>{c.origin.title}</H2>
        <div className={`${AFTER_HEADING} space-y-6 text-xl md:text-2xl leading-relaxed tracking-[-0.01em] text-pretty`}>
          {c.origin.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-slate-500">
              {paragraph}
            </p>
          ))}
          <p className="font-semibold text-[#0B1B3D]">{c.origin.close}</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FounderNote({ c }: { c: AboutCopy }) {
  return (
    <section className={SECTION}>
      <motion.figure {...reveal()} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-medium text-[#0597a9] mb-6">{c.founderNote.title}</p>
        <blockquote className="font-display italic text-[1.75rem] md:text-[2.5rem] text-[#0B1B3D] leading-[1.25] text-balance">
          “{c.founderNote.quote}”
        </blockquote>
        <figcaption className="mt-8 text-[15px] text-slate-500">
          <span className="font-semibold text-[#0B1B3D]">{c.founderNote.name}</span> · {c.founderNote.role}
        </figcaption>
      </motion.figure>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function NameStory({ c }: { c: AboutCopy }) {
  return (
    <section className={`px-4 sm:px-6 ${SECTION}`}>
      <motion.div {...reveal()} className="relative max-w-7xl mx-auto rounded-[36px] md:rounded-[44px] bg-[#0B1B3D] overflow-hidden">
        <div aria-hidden="true" className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#06ACC1]/10 blur-3xl pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 p-6 sm:p-10 md:p-16">
          <figure className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] bg-[#EDE6D6]">
              <Image
                src="/about/vesalius-fabrica-1543.jpg"
                alt={c.name.portraitAlt}
                width={736}
                height={1022}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="mt-4 text-[13px] text-white/45 leading-snug">{c.name.caption}</figcaption>
          </figure>

          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-[2.25rem] md:text-5xl font-semibold text-white tracking-[-0.04em] leading-[1.05] text-balance">{c.name.title}</h2>
            {c.name.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-6 text-lg text-white/70 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 text-xl md:text-2xl font-semibold text-white tracking-[-0.02em] leading-snug text-balance">{c.name.belief}</p>
            <p className="mt-3 text-lg text-white/70 leading-relaxed">{c.name.beliefAfter}</p>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{c.name.closing}</p>

            {/* Brussels, the Fabrica, Ghent */}
            <ol className="mt-auto pt-12 grid grid-cols-3 gap-4">
              {c.name.marks.map((mark, i) => (
                <li key={mark.year} className="border-t border-white/15 pt-4 relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full ${i === c.name.marks.length - 1 ? 'bg-[#06ACC1]' : 'bg-white/40'}`}
                  />
                  <span className="block text-2xl md:text-3xl font-semibold text-white tracking-[-0.03em] tabular-nums">{mark.year}</span>
                  <span className="block mt-1 text-[13px] text-white/50 leading-snug">{mark.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Beliefs({ c }: { c: AboutCopy }) {
  return (
    <section className={SECTION}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...reveal()}>
          <H2>{c.beliefs.title}</H2>
        </motion.div>
        <div className={`${AFTER_HEADING} grid grid-cols-1 md:grid-cols-2 gap-5`}>
          {c.beliefs.items.map((belief, i) => (
            <motion.article key={belief.title} {...reveal((i % 2) * 0.1)} className="bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 md:p-10">
              <span className="text-sm font-semibold text-[#0597a9] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-xl md:text-2xl font-semibold text-[#0B1B3D] tracking-[-0.02em] leading-snug text-balance">{belief.title}</h3>
              <p className="mt-3 text-slate-500 leading-relaxed">{belief.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const DOCTORS = [
  { id: 'boedts', name: 'Dr. Michael Boedts', photo: '/testimonials/boedts.jpg', short: true },
  { id: 'byn', name: 'Dr. Pieter Byn', photo: '/testimonials/byn.jpg', short: false },
  { id: 'rasschaert', name: 'Dr. Ricky Rasschaert', photo: '/testimonials/rasschaert.jpg', short: false },
] as const;

/** First sentence only: the About page quotes, the homepage tells the whole story. */
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

function Doctors({ c }: { c: AboutCopy }) {
  const t = useTranslations('Testimonials');
  return (
    <section className={SECTION}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...reveal()} className="max-w-3xl">
          <H2>{c.doctors.title}</H2>
          <p className="mt-5 text-lg md:text-xl text-slate-500 leading-relaxed">{c.doctors.body}</p>
        </motion.div>
        <div className={`${AFTER_HEADING} grid grid-cols-1 md:grid-cols-3 gap-5`}>
          {DOCTORS.map((doctor, i) => {
            const quote = t(`doctors.${doctor.id}.quote`);
            const oneLiner = quote.length < 20;
            return (
              <motion.figure key={doctor.id} {...reveal(i * 0.1)} className="bg-white rounded-[28px] ring-1 ring-slate-200/70 p-8 flex flex-col gap-8">
                <blockquote
                  className={
                    oneLiner
                      ? 'font-display italic text-5xl md:text-6xl text-[#06ACC1] leading-none tracking-[-0.01em]'
                      : 'text-xl font-semibold text-[#0B1B3D] tracking-[-0.02em] leading-snug text-balance'
                  }
                >
                  {doctor.short ? firstSentence(quote) : quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden bg-slate-100 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_0_1px_rgba(11,27,61,0.1)]">
                    <Image src={doctor.photo} alt={doctor.name} fill sizes="88px" className="object-cover grayscale" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-[#0B1B3D]">{doctor.name}</span>
                    <span className="block text-[13px] text-slate-500 leading-snug">{t(`doctors.${doctor.id}.role`)}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const TRUST_ICONS = [
  // processor on your behalf
  <path key="a" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 11l2 2 4-4" />,
  // protected
  <g key="b">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </g>,
  // a person accountable
  <g key="c">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </g>,
];

function Trust({ c }: { c: AboutCopy }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 sm:px-6 ${SECTION}`}>
      <motion.div
        {...reveal()}
        className="bg-white rounded-[32px] ring-1 ring-slate-200/70 p-8 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16"
      >
        <div>
          <H2>{c.trust.title}</H2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">{c.trust.body}</p>
          <p className="mt-8">
            <Link href="/security" className="group text-[15px] font-semibold text-[#0B1B3D] hover:text-[#0597a9] transition-colors">
              {c.trust.link}
              <span aria-hidden="true" className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </p>
        </div>
        <ul className="divide-y divide-slate-100 self-center">
          {c.trust.items.map((item, i) => (
            <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-[#EBF6F8] text-[#0597a9] flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {TRUST_ICONS[i]}
                </svg>
              </span>
              <span>
                <span className="block text-[17px] font-semibold text-[#0B1B3D]">{item.title}</span>
                <span className="block mt-1 text-slate-500 leading-relaxed">
                  {item.body.includes('dpo@vesalius.health') ? (
                    <>
                      {item.body.split('dpo@vesalius.health')[0]}
                      <a
                        href="mailto:dpo@vesalius.health"
                        className="font-medium text-[#0B1B3D] underline decoration-slate-300 underline-offset-4 hover:decoration-[#06ACC1]"
                      >
                        dpo@vesalius.health
                      </a>
                      {item.body.split('dpo@vesalius.health')[1]}
                    </>
                  ) : (
                    item.body
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Timeline({ c }: { c: AboutCopy }) {
  const items = c.timeline.items;
  return (
    <section className={SECTION}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...reveal()}>
          <H2>{c.timeline.title}</H2>
        </motion.div>
        <div className={`relative ${AFTER_HEADING}`}>
          {/* Rail: draws across once in view */}
          <div className="hidden md:block absolute left-[7px] right-[calc(20%-26px)] top-[7px] h-px bg-slate-200" aria-hidden="true">
            <motion.div
              className="h-full bg-[#06ACC1] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
            />
          </div>
          <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 border-l border-slate-200 md:border-0 pl-6 md:pl-0">
            {items.map((item, i) => {
              const now = i === items.length - 1;
              return (
                <motion.li key={item.when} {...reveal(0.15 + i * 0.18)} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[31px] md:left-0 top-0.5 md:top-0 w-[15px] h-[15px] rounded-full ring-4 ring-[#FAFAFB] ${now ? 'bg-[#06ACC1]' : 'bg-white border-2 border-[#06ACC1]'}`}
                  >
                    {now && <span className="absolute inset-0 rounded-full bg-[#06ACC1] animate-ping opacity-40 [animation-duration:2.4s]" />}
                  </span>
                  <p className="md:mt-8 text-sm font-semibold text-[#0597a9]">{item.when}</p>
                  <p className="mt-2 text-[15px] md:text-base text-[#0B1B3D] leading-relaxed md:pr-4">{item.what}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PersonCard({ person, c }: { person: (typeof TEAM)[number]; c: AboutCopy }) {
  return (
    <div className="h-full bg-white rounded-[24px] ring-1 ring-slate-200/70 p-2 pb-5">
      <div className="relative aspect-square rounded-[18px] overflow-hidden bg-gradient-to-br from-[#EBF6F8] to-[#F1F4F7]">
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover object-top" />
        ) : (
          // Placeholder until the portrait is taken
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0B1B3D]/15">
            {person.initials}
          </span>
        )}
      </div>
      <div className="px-3 pt-4">
        <p className="text-[15px] md:text-base font-semibold text-[#0B1B3D] tracking-[-0.01em] leading-snug">{person.name}</p>
        {person.role && (
          <p className="mt-1 text-[13px] md:text-sm text-slate-500 leading-snug">
            {c.people[person.role]}
            {person.surgeon && (
              <>
                <br />
                {c.people.surgeon}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function People({ c }: { c: AboutCopy }) {
  return (
    <section className={SECTION}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div {...reveal()} className="max-w-3xl">
          <H2>{c.people.title}</H2>
          <p className="mt-5 text-lg md:text-xl text-slate-500 leading-relaxed">{c.people.body}</p>
          <p className="mt-3 text-[15px] text-slate-400 leading-relaxed">{c.people.origin}</p>
        </motion.div>

        <ul className={`${AFTER_HEADING} grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4`}>
          {TEAM.map((person, i) => (
            <motion.li key={person.name} {...reveal((i % 4) * 0.06)}>
              <PersonCard person={person} c={c} />
            </motion.li>
          ))}
          {/* An open seat at the end */}
          <motion.li {...reveal(0.18)}>
            <div className="h-full rounded-[24px] bg-[#0B1B3D] p-5 md:p-6 flex flex-col">
              <span aria-hidden="true" className="w-10 h-10 rounded-full ring-1 ring-white/20 text-white/70 flex items-center justify-center text-xl font-light">
                +
              </span>
              <p className="mt-auto pt-8 text-lg font-semibold text-white tracking-[-0.01em] leading-snug text-balance">{c.people.careersTitle}</p>
              <p className="mt-2 text-[14px] text-white/60 leading-relaxed">{c.people.careersBody}</p>
              <a href="mailto:help@vesalius.health" className="group mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#5FD4E2] hover:text-white transition-colors w-fit">
                {c.people.careersCta}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Ghent({ c }: { c: AboutCopy }) {
  const rows = [
    {
      href: 'mailto:help@vesalius.health',
      label: 'help@vesalius.health',
      icon: <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />,
    },
    {
      href: 'tel:+3294961478',
      label: '09 496 14 78',
      icon: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      ),
    },
    {
      href: MAPS,
      label: 'Ottergemsesteenweg-Zuid 808B, 9000 Gent',
      icon: (
        <g>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </g>
      ),
      external: true,
    },
  ];

  return (
    <section className={SECTION}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div {...reveal()} className="lg:col-span-7">
          <H2>{c.ghent.title}</H2>
          {c.ghent.paragraphs.map((paragraph, i) => (
            <p key={i} className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.aside {...reveal(0.1)} className="lg:col-span-5 lg:mt-2 relative bg-white rounded-[28px] ring-1 ring-slate-200/70 p-7 md:p-8">
          <span aria-hidden="true" className="absolute top-7 right-7 md:top-8 md:right-8 text-[11px] font-medium text-slate-400 tabular-nums">
            51.03° N · 3.71° E
          </span>
          <p className="text-lg font-semibold text-[#0B1B3D] pr-24">{c.ghent.contactTitle}</p>
          <ul className="mt-6 space-y-4">
            {rows.map((row) => (
              <li key={row.href}>
                <a
                  href={row.href}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${row.label} · ${c.ghent.mapLabel}` } : {})}
                  className="group flex items-start gap-3.5 text-[15px] text-[#0B1B3D] hover:text-[#0597a9] transition-colors"
                >
                  <span className="w-9 h-9 shrink-0 rounded-xl bg-[#F4F6F8] text-slate-500 group-hover:text-[#0597a9] group-hover:bg-[#EBF6F8] flex items-center justify-center transition-colors">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {row.icon}
                    </svg>
                  </span>
                  <span className="pt-2 leading-snug">{row.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function AboutContent() {
  const locale = useLocale() as SiteLocale;
  const c = ABOUT[locale] ?? ABOUT.en;

  return (
    <MotionProvider>
      <main className="w-full relative bg-[#FAFAFB] overflow-x-clip selection:bg-primary/20">
        <Navbar />
        <Hero c={c} />
        <Origin c={c} />
        {FOUNDER_NOTE_APPROVED && <FounderNote c={c} />}
        <NameStory c={c} />
        <Beliefs c={c} />
        <Doctors c={c} />
        <Trust c={c} />
        <Timeline c={c} />
        <People c={c} />
        <Ghent c={c} />
        <FinalCta />
        <Footer />
      </main>
    </MotionProvider>
  );
}
