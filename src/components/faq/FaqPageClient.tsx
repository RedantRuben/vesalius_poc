'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Link } from '@/i18n/routing';
import { getArticleExcerpt, getArticleHeroImage, getArticlePlainText } from '@/lib/faq/content';
import { getFaqArticlePath } from '@/lib/faq/routes';
import { FAQ_LOCALES, type FaqContentStore, type FaqLocale } from '@/lib/faq/types';

interface FaqPageClientProps {
  contentByLocale: FaqContentStore;
  heroSubtitle?: string;
  heroTitle?: string;
  lockedTag?: string;
}

const ITEMS_PER_PAGE = 6;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
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
    width="14"
    height="14"
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

export default function FaqPageClient({
  contentByLocale,
  heroSubtitle,
  heroTitle,
  lockedTag,
}: FaqPageClientProps) {
  const locale = useLocale();
  const resolvedLocale: FaqLocale = FAQ_LOCALES.includes(locale as FaqLocale)
    ? (locale as FaqLocale)
    : 'en';
  const content = contentByLocale[resolvedLocale];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(lockedTag ?? null);
  const [currentPage, setCurrentPage] = useState(1);

  const allTags = useMemo(
    () => Array.from(new Set(content.items.flatMap((item) => item.tags))).sort(),
    [content.items],
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return content.items.filter((item) => {
      const articleText = getArticlePlainText(item).toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        articleText.includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.authorName.toLowerCase().includes(query);

      const matchesTag = selectedTag === null || item.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [content.items, searchQuery, selectedTag]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleTagChange(tag: string | null) {
    if (lockedTag) {
      return;
    }

    setSelectedTag(tag);
    setCurrentPage(1);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#FCFCFD] selection:bg-primary/20">
      <Navbar />

      <section className="relative w-full overflow-hidden bg-transparent pb-14 pt-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
          >
            <path d="M -100,300 C 400,200 800,500 1540,300" fill="none" stroke="#06ACC1" strokeWidth="1.5" />
            <path
              d="M -100,400 C 500,500 900,250 1540,350"
              fill="none"
              stroke="#FF3366"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <path
              d="M -100,200 C 600,350 1000,250 1540,400"
              fill="none"
              stroke="#0B1B3D"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="mb-6 inline-block">
            <span className="rounded-full bg-[#0B1B3D] px-5 py-2 text-sm font-bold tracking-wide text-white shadow-md shadow-[#0B1B3D]/20">
              {content.badgeLabel}
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-bold tracking-tight text-[#0B1B3D] md:text-5xl lg:text-7xl">
            {heroTitle ?? content.title}
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-600">
            {heroSubtitle ??
              'Browse the latest support articles, setup guides, and product walkthroughs for the Vesalius platform.'}
          </p>

          <div className="group relative mx-auto max-w-3xl">
            <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center text-slate-400 transition-colors group-focus-within:text-[#06ACC1]">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={content.placeholder}
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-full rounded-full border-2 border-slate-200/80 bg-white py-5 pl-14 pr-6 text-lg font-medium text-[#0B1B3D] placeholder-slate-400 shadow-xl shadow-slate-200/40 transition-all focus:border-[#06ACC1] focus:outline-none focus:ring-4 focus:ring-[#06ACC1]/10"
            />
          </div>

          {!lockedTag ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag === selectedTag ? null : tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    tag === selectedTag
                      ? 'bg-[#0B1B3D] text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-[#06ACC1] hover:text-[#06ACC1]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="flex-1 bg-transparent pb-16">
        <div className="mx-auto max-w-7xl px-6">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-500">{content.noResults}</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {paginatedItems.map((item) => (
                <Link
                  key={item.id}
                  href={getFaqArticlePath(resolvedLocale, item.slug)}
                  className="group overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-xl shadow-slate-200/40 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <Image
                      src={getArticleHeroImage(item).src}
                      alt={getArticleHeroImage(item).alt || item.question}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarIcon />
                        {item.publishedAt}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <AuthorIcon />
                        {item.authorName}
                      </span>
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0B1B3D] transition-colors group-hover:text-[#06ACC1]">
                      {item.question}
                    </h2>
                    <p className="mb-6 line-clamp-4 text-base leading-8 text-slate-600">
                      {getArticleExcerpt(item)}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1B3D] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[#06ACC1]">
                      {content.readMoreLabel}
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
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                    page === currentPage
                      ? 'bg-[#0B1B3D] text-white shadow-md'
                      : 'border border-slate-200/60 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="w-full bg-transparent pb-16 pt-4">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-slate-200/40">
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0B1B3D]">
                  {content.aboutTitle}
                </h2>
                <p className="mb-6 text-base leading-8 text-slate-600">{content.aboutBody}</p>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B1B3D] px-6 py-3 font-medium text-white shadow-md shadow-[#0B1B3D]/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {content.supportButtonLabel}
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
              </div>

              {!lockedTag ? (
                <div>
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[#0B1B3D]">
                    {content.tagsTitle}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagChange(tag === selectedTag ? null : tag)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          tag === selectedTag
                            ? 'bg-[#06ACC1] text-white'
                            : 'border border-slate-200/60 bg-white text-slate-600 hover:border-[#06ACC1] hover:text-[#06ACC1]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
