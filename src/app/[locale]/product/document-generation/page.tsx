import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';
import ModulePage from '@/components/product/ModulePage';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/document-generation',
    title: 'Clinical Document Generation',
    description:
      'Generate SOAP notes, referral letters, summaries, and structured medical documentation from conversations with Vesalius document generation workflows.',
  });
}

export default function DocumentGenerationPage() {
  return <ModulePage slug="document-generation" />;
}
