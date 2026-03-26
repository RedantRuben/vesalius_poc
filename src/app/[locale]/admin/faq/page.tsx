import type { Metadata } from 'next';

import FaqAdminEditor from '@/components/admin/FaqAdminEditor';
import { requireFaqAdminAuth } from '@/lib/server/faq-admin-auth';
import { readFaqContent } from '@/lib/server/faq-cms';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: resolveSiteLocale(locale),
    pathname: '/admin/faq',
    title: 'FAQ Admin',
    description: 'Internal Vesalius FAQ administration.',
    noindex: true,
  });
}

export default async function FaqAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  await requireFaqAdminAuth(locale);

  const content = await readFaqContent();

  return <FaqAdminEditor initialContent={content} initialLocale={locale} />;
}
