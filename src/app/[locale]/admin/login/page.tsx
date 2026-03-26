import type { Metadata } from 'next';

import { redirect } from 'next/navigation';

import FaqAdminLoginForm from '@/components/admin/FaqAdminLoginForm';
import { isFaqAdminAuthenticated, isFaqAdminConfigured } from '@/lib/server/faq-admin-auth';
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
    pathname: '/admin/login',
    title: 'Admin Login',
    description: 'Internal Vesalius admin login.',
    noindex: true,
  });
}

export default async function FaqAdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authenticated = await isFaqAdminAuthenticated();

  if (authenticated) {
    redirect(`/${locale}/admin/faq`);
  }

  return <FaqAdminLoginForm isConfigured={isFaqAdminConfigured()} locale={locale} />;
}
