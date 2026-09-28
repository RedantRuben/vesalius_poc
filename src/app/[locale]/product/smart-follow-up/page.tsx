import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/smart-follow-up',
    title: 'Automated Patient Follow-Up',
    description:
      'Monitor recovery with automated follow-up questionnaires, risk alerts, and deviation detection to help care teams intervene earlier.',
  });
}

export default function SmartFollowUpPage() {
  return <ModulePage slug="smart-follow-up" />;
}
