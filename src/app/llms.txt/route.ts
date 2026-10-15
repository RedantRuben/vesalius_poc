import { TAILORED_HOME } from '@/content/tailored-copy';
import { SPECIALTY_UI } from '@/content/orthopedics';
import { routing } from '@/i18n/routing';
import { TAILORED, disciplinePath } from '@/lib/disciplines';
import { MODULES } from '@/lib/modules';
import { getAbsoluteUrl, SITE_DESCRIPTION } from '@/lib/seo';

/**
 * /llms.txt: a plain overview for AI assistants and AI search (the llmstxt.org convention), listing the product, its
 * modules and every discipline page in each language. Built from the same data as the pages, so it never drifts.
 */
export const dynamic = 'force-static';

const MODULE_NAMES: Record<string, string> = {
  'smart-triage': 'Smart Triage: routes each referral to the right doctor and flags red flags',
  agenda: 'Agenda: brings bookings from intake, triage and phone together, with priorities respected',
  'pre-consultation': 'Pre-consultation: a chat intake at home, in the patient’s own language, summarised in the record',
  'voice-reception': 'Voice Reception: answers the phone, asks the right questions and books the appointment',
  scribe: 'Scribe: listens during the consultation and drafts the clinical note in your structure',
  medication: 'Medication: reads a photo of the patient’s medication and structures it in the record',
  'document-generation': 'Document generation: letters, reports, prescriptions and patient explanations, ready to review',
  'smart-follow-up': 'Smart follow-up: questionnaires after treatment, with an alert to the team when it matters',
};

export function GET() {
  const lines: string[] = [
    '# Vesalius',
    '',
    `> ${SITE_DESCRIPTION} Based in Ghent, Belgium. Available in Dutch, English and French.`,
    '',
    'Vesalius is a personal AI assistant for doctors and care teams: it prepares each patient before the consultation, takes notes during it, writes the paperwork afterwards and follows patients up after treatment. Vesalius follows the GDPR.',
    '',
    '## Product',
    '',
    `- [Homepage](${getAbsoluteUrl('en', '/')})`,
    ...MODULES.map((entry) => `- [${MODULE_NAMES[entry.slug]?.split(':')[0] ?? entry.slug}](${getAbsoluteUrl('en', `/product/${entry.slug}`)}): ${MODULE_NAMES[entry.slug]?.split(': ')[1] ?? ''}`),
    `- [Security](${getAbsoluteUrl('en', '/security')})`,
    `- [Book a demo](${getAbsoluteUrl('en', '/demo')})`,
    `- [About](${getAbsoluteUrl('en', '/about')})`,
    '',
    '## Per discipline',
    '',
    'Each discipline has its own pages that follow one example patient through every module. Each is available in English, Dutch and French.',
    '',
  ];

  for (const id of TAILORED) {
    const en = TAILORED_HOME[id].en;
    lines.push(`### ${SPECIALTY_UI.en.specialties[id]}`, '', en.journey.subtitle, '');
    for (const locale of routing.locales) {
      lines.push(`- [${SPECIALTY_UI[locale].specialties[id]} (${locale})](${getAbsoluteUrl(locale, disciplinePath(id, locale))})`);
    }
    lines.push(`- Module pages: ${MODULES.map((entry) => getAbsoluteUrl('en', disciplinePath(id, 'en', `/product/${entry.slug}`))).join(', ')}`, '');
  }

  lines.push('## Contact', '', '- Email: help@vesalius.health', '- Phone: +32 9 496 14 78', '- Address: Ottergemsesteenweg Zuid 808B, 9000 Gent, Belgium', '');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
