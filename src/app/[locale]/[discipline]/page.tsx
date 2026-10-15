import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import HomePage from '@/components/HomePage';
import { routing } from '@/i18n/routing';
import { disciplineHomeMetadata, disciplineSchema } from '@/lib/discipline-seo';
import { TAILORED, disciplineFromAnySlug, disciplineFromSlug, disciplinePath, disciplineSlug } from '@/lib/disciplines';
import { getLocalizedPath, resolveSiteLocale } from '@/lib/seo';

type Params = Promise<{ locale: string; discipline: string }>;

/** One page per discipline and language, rendered ahead of time: /nl/orthopedie, /orthopaedics, /fr/orthopedie. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => TAILORED.map((id) => ({ locale, discipline: disciplineSlug(id, locale) })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, discipline } = await params;
  const siteLocale = resolveSiteLocale(locale);
  const id = disciplineFromSlug(siteLocale, discipline);
  return id ? disciplineHomeMetadata(id, siteLocale) : {};
}

export default async function DisciplineHome({ params }: { params: Params }) {
  const { locale, discipline } = await params;
  const siteLocale = resolveSiteLocale(locale);
  setRequestLocale(siteLocale);
  const id = disciplineFromSlug(siteLocale, discipline);
  if (!id) {
    // Another language's word for it (e.g. /fr/nko): the right page in this language
    const other = disciplineFromAnySlug(discipline);
    if (other) permanentRedirect(getLocalizedPath(siteLocale, disciplinePath(other, siteLocale)));
    notFound();
  }
  return <HomePage locale={siteLocale} schema={disciplineSchema(id, siteLocale)} />;
}
