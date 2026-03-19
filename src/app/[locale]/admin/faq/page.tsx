import FaqAdminEditor from '@/components/admin/FaqAdminEditor';
import { requireFaqAdminAuth } from '@/lib/server/faq-admin-auth';
import { readFaqContent } from '@/lib/server/faq-cms';

export const dynamic = 'force-dynamic';

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
