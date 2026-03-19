import { redirect } from 'next/navigation';

import FaqAdminLoginForm from '@/components/admin/FaqAdminLoginForm';
import { isFaqAdminAuthenticated, isFaqAdminConfigured } from '@/lib/server/faq-admin-auth';

export const dynamic = 'force-dynamic';

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
