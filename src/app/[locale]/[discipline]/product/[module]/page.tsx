import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import SeoJsonLd from '@/components/SeoJsonLd';
import ModulePage from '@/components/product/ModulePage';
import { TAILORED_HOME } from '@/content/tailored-copy';
import { routing } from '@/i18n/routing';
import { disciplineLabel, disciplineModuleMetadata, disciplineSchema } from '@/lib/discipline-seo';
import { TAILORED, disciplineFromAnySlug, disciplineFromSlug, disciplinePath, disciplineSlug } from '@/lib/disciplines';
import { MODULES, moduleBySlug } from '@/lib/modules';
import { getLocalizedPath, resolveSiteLocale } from '@/lib/seo';

type Params = Promise<{ locale: string; discipline: string; module: string }>;

/** Every module page per discipline and language: /nl/orthopedie/product/scribe and so on. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TAILORED.flatMap((id) => MODULES.map((entry) => ({ locale, discipline: disciplineSlug(id, locale), module: entry.slug }))),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, discipline, module } = await params;
  const siteLocale = resolveSiteLocale(locale);
  const id = disciplineFromSlug(siteLocale, discipline);
  const entry = moduleBySlug(module);
  if (!id || !entry) return {};
  const t = await getTranslations({ locale: siteLocale, namespace: 'Modules' });
  return disciplineModuleMetadata(id, siteLocale, entry.key, entry.slug, t(`${entry.key}.title`));
}

export default async function DisciplineModule({ params }: { params: Params }) {
  const { locale, discipline, module } = await params;
  const siteLocale = resolveSiteLocale(locale);
  setRequestLocale(siteLocale);
  const entry = moduleBySlug(module);
  if (!entry) notFound();
  const id = disciplineFromSlug(siteLocale, discipline);
  if (!id) {
    const other = disciplineFromAnySlug(discipline);
    if (other) permanentRedirect(getLocalizedPath(siteLocale, disciplinePath(other, siteLocale, `/product/${entry.slug}`)));
    notFound();
  }
  const t = await getTranslations({ locale: siteLocale, namespace: 'Modules' });
  const name = `${t(`${entry.key}.title`)} · ${disciplineLabel(id, siteLocale)}`;
  return (
    <>
      <SeoJsonLd data={{ '@context': 'https://schema.org', ...disciplineSchema(id, siteLocale, `/product/${entry.slug}`, name, TAILORED_HOME[id][siteLocale].modules.cards[entry.key]) }} />
      <ModulePage slug={entry.slug} />
    </>
  );
}
