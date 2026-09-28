import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/smart-triage',
    title: 'Smart Triage & Routing',
    description:
      'Prioritize patients with AI-assisted triage, clinical urgency scoring, and routing workflows that help hospitals send the right patient to the right care path.',
  });
}

export default function SmartTriagePage() {
  return <ModulePage slug="smart-triage" />;
}
