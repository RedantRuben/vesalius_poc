import Image from 'next/image';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import FaqArticleBlocks from '@/components/faq/FaqArticleBlocks';
import { Link } from '@/i18n/routing';
import { getArticleHeroImage } from '@/lib/faq/content';
import type { FaqArticle, FaqLocaleContent } from '@/lib/faq/types';

interface FaqArticlePageProps {
  article: FaqArticle;
  localeContent: FaqLocaleContent;
  readNext?: FaqArticle;
}

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const AuthorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 21a6 6 0 0 0-12 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function FaqArticlePage({
  article,
  localeContent,
  readNext,
}: FaqArticlePageProps) {
  const heroImage = getArticleHeroImage(article);

  return (
    <main className="min-h-screen bg-[#FCFCFD] selection:bg-primary/20">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(6,172,193,0.16),_transparent_38%),linear-gradient(180deg,_#ffffff_0%,_#fcfcfd_58%,_#f7fafc_100%)]" />

        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#06ACC1] hover:text-[#06ACC1]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to FAQ
          </Link>

          <article className="mt-8 rounded-[36px] border border-slate-200/70 bg-white p-6 shadow-2xl shadow-slate-200/60 md:p-10">
            <div className="max-w-4xl">
              <div className="mb-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-semibold tracking-tight text-[#0B1B3D] md:text-6xl">
                {article.question}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500 md:text-base">
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon />
                  {article.publishedAt}
                </span>
                <span className="inline-flex items-center gap-2">
                  <AuthorIcon />
                  {article.authorName}
                </span>
              </div>

            </div>

            <figure className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50">
              <Image
                src={heroImage.src}
                alt={heroImage.alt || article.question}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
              {heroImage.caption ? (
                <figcaption className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
                  {heroImage.caption}
                </figcaption>
              ) : null}
            </figure>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="min-w-0">
                <FaqArticleBlocks body={article.body} />
              </div>

              <aside className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 lg:sticky lg:top-28 lg:self-start">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0B1B3D]">
                  {localeContent.tagsTitle}
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </article>

          {readNext ? (
            <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Read Next
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#0B1B3D]">
                {readNext.question}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">{readNext.excerpt}</p>
              <Link
                href={`/faq/${readNext.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B1B3D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#06ACC1]"
              >
                {localeContent.readMoreLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </section>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
