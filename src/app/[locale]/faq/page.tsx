import { redirect } from 'next/navigation';

import { getFaqIndexPath, getLocalizedFaqPath } from '@/lib/faq/routes';
import { FAQ_LOCALES, type FaqLocale } from '@/lib/faq/types';

export const dynamic = 'force-dynamic';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale: FaqLocale = FAQ_LOCALES.includes(locale as FaqLocale)
    ? (locale as FaqLocale)
    : 'en';

  redirect(getLocalizedFaqPath(resolvedLocale, getFaqIndexPath(resolvedLocale)));
}
