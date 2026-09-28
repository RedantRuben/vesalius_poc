import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/agenda',
    title: 'Smart Scheduling & Booking Agenda',
    description:
      'Intelligently manage appointments and optimize your schedule with the Vesalius Agenda module. Turn a chaotic calendar into a fluid, stress-free clinic day.',
  });
}

export default function AgendaPage() {
  return <ModulePage slug="agenda" />;
}
