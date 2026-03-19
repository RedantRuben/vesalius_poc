'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import FaqRichTextEditor from '@/components/admin/FaqRichTextEditor';
import FaqArticleBlocks from '@/components/faq/FaqArticleBlocks';
import { Link } from '@/i18n/routing';
import { getArticleExcerpt, getArticleHeroImage } from '@/lib/faq/content';
import { FAQ_LOCALES, type FaqArticle, type FaqContentStore, type FaqLocale } from '@/lib/faq/types';

interface FaqAdminEditorProps {
  initialContent: FaqContentStore;
  initialLocale: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createArticle() {
  return {
    id: crypto.randomUUID(),
    slug: `faq-${crypto.randomUUID().slice(0, 8)}`,
    question: 'New FAQ article',
    excerpt: '',
    publishedAt: new Date().toLocaleDateString('en-GB'),
    authorName: 'Vesalius Team',
    heroImage: {
      alt: 'New FAQ article',
      caption: '',
      src: '/screen.png',
    },
    tags: ['General'],
    body: '<p>Start writing your article...</p>',
  } satisfies FaqArticle;
}

export default function FaqAdminEditor({
  initialContent,
  initialLocale,
}: FaqAdminEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeLocale, setActiveLocale] = useState<FaqLocale>(
    FAQ_LOCALES.includes(initialLocale as FaqLocale) ? (initialLocale as FaqLocale) : 'en',
  );
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    initialContent[FAQ_LOCALES.includes(initialLocale as FaqLocale) ? (initialLocale as FaqLocale) : 'en']
      .items[0]?.id ?? null,
  );
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'hero' | 'inline'>('idle');

  const localeContent = content[activeLocale];
  const selectedArticle =
    localeContent.items.find((item) => item.id === selectedArticleId) ?? localeContent.items[0] ?? null;

  useEffect(() => {
    if (!selectedArticle && localeContent.items[0]) {
      setSelectedArticleId(localeContent.items[0].id);
    }
  }, [localeContent.items, selectedArticle]);

  const tagSummary = useMemo(() => {
    return Array.from(new Set(localeContent.items.flatMap((item) => item.tags))).sort().join(', ');
  }, [localeContent.items]);

  function updateLocaleField(field: 'title' | 'aboutBody' | 'supportButtonLabel', value: string) {
    setContent((currentValue) => ({
      ...currentValue,
      [activeLocale]: {
        ...currentValue[activeLocale],
        [field]: value,
      },
    }));
    setSaveState('idle');
  }

  function updateArticle(updater: (article: FaqArticle) => FaqArticle) {
    if (!selectedArticle) {
      return;
    }

    setContent((currentValue) => ({
      ...currentValue,
      [activeLocale]: {
        ...currentValue[activeLocale],
        items: currentValue[activeLocale].items.map((item) =>
          item.id === selectedArticle.id ? updater(item) : item,
        ),
      },
    }));
    setSaveState('idle');
  }

  function addArticle() {
    const article = createArticle();

    setContent((currentValue) => ({
      ...currentValue,
      [activeLocale]: {
        ...currentValue[activeLocale],
        items: [article, ...currentValue[activeLocale].items],
      },
    }));
    setSelectedArticleId(article.id);
    setSaveState('idle');
  }

  function deleteArticle() {
    if (!selectedArticle) {
      return;
    }

    const confirmed = window.confirm('Delete this FAQ article?');
    if (!confirmed) {
      return;
    }

    const nextItems = localeContent.items.filter((item) => item.id !== selectedArticle.id);

    setContent((currentValue) => ({
      ...currentValue,
      [activeLocale]: {
        ...currentValue[activeLocale],
        items: nextItems,
      },
    }));
    setSelectedArticleId(nextItems[0]?.id ?? null);
    setSaveState('idle');
  }

  function moveArticle(articleId: string, direction: -1 | 1) {
    setContent((currentValue) => {
      const items = [...currentValue[activeLocale].items];
      const currentIndex = items.findIndex((item) => item.id === articleId);
      const targetIndex = currentIndex + direction;

      if (currentIndex < 0 || targetIndex < 0 || targetIndex >= items.length) {
        return currentValue;
      }

      const [movedArticle] = items.splice(currentIndex, 1);
      items.splice(targetIndex, 0, movedArticle);

      return {
        ...currentValue,
        [activeLocale]: {
          ...currentValue[activeLocale],
          items,
        },
      };
    });

    setSaveState('idle');
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/faq/upload', {
      credentials: 'include',
      method: 'POST',
      body: formData,
    });

    const payload = (await response.json()) as {
      message?: string;
      ok?: boolean;
      url?: string;
    };

    if (!response.ok || !payload.ok || !payload.url) {
      throw new Error(payload.message || 'Upload failed.');
    }

    return payload.url;
  }

  async function handleHeroUpload(file: File | null) {
    if (!file || !selectedArticle) {
      return;
    }

    setUploadState('hero');
    setError(null);

    try {
      const url = await uploadImage(file);
      updateArticle((article) => ({
        ...article,
        heroImage: {
          alt: article.heroImage?.alt || article.question,
          caption: article.heroImage?.caption || '',
          src: url,
        },
      }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploadState('idle');
    }
  }

  async function handleInlineUpload(file: File | null) {
    if (!file) {
      return null;
    }

    setUploadState('inline');
    setError(null);

    try {
      return await uploadImage(file);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
      return null;
    } finally {
      setUploadState('idle');
    }
  }

  function validateForSave() {
    if (!selectedArticle) {
      return 'No article selected.';
    }

    if (!selectedArticle.question.trim()) {
      return 'Article title is required.';
    }

    return null;
  }

  async function handleSave() {
    const validationError = validateForSave();
    if (validationError) {
      setSaveState('error');
      setError(validationError);
      return;
    }

    setSaveState('saving');
    setError(null);

    try {
      const response = await fetch('/api/admin/faq', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const payload = (await response.json()) as {
        content?: FaqContentStore;
        message?: string;
        ok?: boolean;
      };

      if (!response.ok || !payload.ok || !payload.content) {
        throw new Error(payload.message || 'Saving failed.');
      }

      setContent(payload.content);
      setSaveState('saved');
      router.refresh();
    } catch (saveError) {
      setSaveState('error');
      setError(saveError instanceof Error ? saveError.message : 'Saving failed.');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/session', { credentials: 'include', method: 'DELETE' });
    router.push(`/${activeLocale}/admin/login`);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,172,193,0.16),_transparent_40%),linear-gradient(180deg,_#f8fbfd_0%,_#fcfcfd_55%,_#f2f6fa_100%)]">
      <div className="mx-auto max-w-[1600px] px-5 py-8">
        <div className="rounded-[34px] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#0B1B3D] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                FAQ CMS
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0B1B3D]">
                Write articles
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Focus on writing. Summary is generated automatically from the opening sentence, and
                each article gets a hero image on the FAQ page.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {FAQ_LOCALES.map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setActiveLocale(locale)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    locale === activeLocale
                      ? 'bg-[#0B1B3D] text-white'
                      : 'border border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
              >
                Log out
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveState === 'saving'}
                className="rounded-2xl bg-[#06ACC1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0597a9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saveState === 'saving' ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#0B1B3D]">Articles</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">
                    {localeContent.items.length} entries
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addArticle}
                  className="rounded-full bg-[#0B1B3D] px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                >
                  Add article
                </button>
              </div>

              <div className="space-y-3">
                {localeContent.items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-3 transition ${
                      item.id === selectedArticle?.id
                        ? 'border-[#06ACC1] bg-white shadow-md shadow-slate-200/70'
                        : 'border-slate-200 bg-white/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedArticleId(item.id)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <p className="line-clamp-2 text-sm font-semibold text-[#0B1B3D]">{item.question}</p>
                        <p className="mt-2 text-xs text-slate-500">{item.publishedAt}</p>
                      </button>

                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => moveArticle(item.id, -1)}
                          disabled={index === 0}
                          className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Move ${item.question} up`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveArticle(item.id, 1)}
                          disabled={index === localeContent.items.length - 1}
                          className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Move ${item.question} down`}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0B1B3D]">
                  FAQ page
                </h3>
                <div className="mt-4 space-y-4">
                  <label className="space-y-2 block">
                    <span className="text-sm font-medium text-slate-700">Page title</span>
                    <input
                      value={localeContent.title}
                      onChange={(event) => updateLocaleField('title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-sm font-medium text-slate-700">About text</span>
                    <textarea
                      value={localeContent.aboutBody}
                      onChange={(event) => updateLocaleField('aboutBody', event.target.value)}
                      rows={5}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                    />
                  </label>
                  <label className="space-y-2 block">
                    <span className="text-sm font-medium text-slate-700">Support button</span>
                    <input
                      value={localeContent.supportButtonLabel}
                      onChange={(event) => updateLocaleField('supportButtonLabel', event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                    />
                  </label>
                </div>
                <p className="mt-4 text-xs text-slate-500">Current tags: {tagSummary || 'None yet'}</p>
              </div>
            </aside>

            {selectedArticle ? (
              <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0B1B3D]">Article</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Big writing area first. The summary below is generated automatically.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={deleteArticle}
                      className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete article
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px_200px]">
                    <label className="space-y-2 block lg:col-span-3">
                      <span className="text-sm font-medium text-slate-700">Title</span>
                      <input
                        value={selectedArticle.question}
                        onChange={(event) =>
                          updateArticle((article) => ({ ...article, question: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-2xl font-semibold tracking-tight text-[#0B1B3D] outline-none transition focus:border-[#06ACC1] focus:bg-white"
                      />
                    </label>

                    <label className="space-y-2 block">
                      <span className="text-sm font-medium text-slate-700">Author</span>
                      <input
                        value={selectedArticle.authorName}
                        onChange={(event) =>
                          updateArticle((article) => ({ ...article, authorName: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                      />
                    </label>
                    <label className="space-y-2 block">
                      <span className="text-sm font-medium text-slate-700">Published date</span>
                      <input
                        value={selectedArticle.publishedAt}
                        onChange={(event) =>
                          updateArticle((article) => ({ ...article, publishedAt: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                      />
                    </label>
                    <label className="space-y-2 block">
                      <span className="text-sm font-medium text-slate-700">Tags</span>
                      <input
                        value={selectedArticle.tags.join(', ')}
                        onChange={(event) =>
                          updateArticle((article) => ({
                            ...article,
                            tags: event.target.value
                              .split(',')
                              .map((tag) => tag.trim())
                              .filter(Boolean),
                          }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                      />
                    </label>

                    <label className="space-y-2 block lg:col-span-2">
                      <span className="text-sm font-medium text-slate-700">Slug</span>
                      <div className="flex gap-2">
                        <input
                          value={selectedArticle.slug}
                          onChange={(event) =>
                            updateArticle((article) => ({ ...article, slug: event.target.value }))
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#06ACC1] focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArticle((article) => ({
                              ...article,
                              slug: slugify(article.question) || article.slug,
                            }))
                          }
                          className="shrink-0 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-400"
                        >
                          Auto
                        </button>
                      </div>
                    </label>

                    <div className="lg:col-span-1 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                      <span className="block font-medium text-[#0B1B3D]">Summary preview</span>
                      <span className="mt-1 block">{getArticleExcerpt(selectedArticle)}</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50/70 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-[#0B1B3D]">Hero image</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Required. This image is shown on both the FAQ overview and the article page.
                        </p>
                      </div>
                      <label className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          className="hidden"
                          onChange={(event) => handleHeroUpload(event.target.files?.[0] ?? null)}
                        />
                        {uploadState === 'hero' ? 'Uploading...' : 'Upload hero'}
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                        <Image
                          src={getArticleHeroImage(selectedArticle).src}
                          alt={getArticleHeroImage(selectedArticle).alt || selectedArticle.question}
                          width={500}
                          height={280}
                          className="h-auto w-full object-cover"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="space-y-2 block">
                          <span className="text-sm font-medium text-slate-700">Hero image URL</span>
                          <input
                            value={selectedArticle.heroImage?.src || ''}
                            onChange={(event) =>
                              updateArticle((article) => ({
                                ...article,
                                heroImage: event.target.value
                                  ? {
                                      alt: article.heroImage?.alt || article.question,
                                      caption: article.heroImage?.caption || '',
                                      src: event.target.value,
                                    }
                                  : undefined,
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#06ACC1]"
                          />
                        </label>
                        <label className="space-y-2 block">
                          <span className="text-sm font-medium text-slate-700">Hero alt text</span>
                          <input
                            value={selectedArticle.heroImage?.alt || ''}
                            onChange={(event) =>
                              updateArticle((article) => ({
                                ...article,
                                heroImage: article.heroImage
                                  ? { ...article.heroImage, alt: event.target.value }
                                  : {
                                      alt: event.target.value,
                                      caption: '',
                                      src: '',
                                    },
                              }))
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#06ACC1]"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-[#0B1B3D]">Body</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Larger writing canvas, WordPress-style toolbar, inline images in the middle.
                        </p>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
                        {uploadState === 'inline' ? 'Uploading inline image...' : 'Editor ready'}
                      </div>
                    </div>

                    <FaqRichTextEditor
                      value={selectedArticle.body}
                      uploadLabel="Insert image"
                      onImageUpload={handleInlineUpload}
                      onChange={(nextValue) =>
                        updateArticle((article) => ({
                          ...article,
                          body: nextValue,
                        }))
                      }
                    />
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-[#0B1B3D]">Preview</h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Same renderer as the public article page.
                        </p>
                      </div>
                      <Link
                        href={`/${activeLocale}/faq/${selectedArticle.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400"
                      >
                        Open page
                      </Link>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-[#FCFCFD]">
                      <Image
                        src={getArticleHeroImage(selectedArticle).src}
                        alt={getArticleHeroImage(selectedArticle).alt || selectedArticle.question}
                        width={900}
                        height={500}
                        className="h-auto w-full object-cover"
                      />
                      <div className="p-5">
                        <h3 className="text-2xl font-semibold tracking-tight text-[#0B1B3D]">
                          {selectedArticle.question}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {selectedArticle.publishedAt} · {selectedArticle.authorName}
                        </p>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                          {getArticleExcerpt(selectedArticle)}
                        </p>
                        <div className="mt-5 border-t border-slate-200 pt-5">
                          <FaqArticleBlocks body={selectedArticle.body} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {error}
                    </div>
                  ) : null}

                  {saveState === 'saved' ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      FAQ content saved successfully.
                    </div>
                  ) : null}
                </aside>
              </section>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                Add an article to start editing.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
