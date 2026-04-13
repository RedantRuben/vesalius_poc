import { redirect } from 'next/navigation';

export default async function CustomerCarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supportPath = locale === 'en' ? '/support' : `/${locale}/support`;

  redirect(supportPath);
}
