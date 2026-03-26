import type { Metadata } from 'next';

import { getLocale } from 'next-intl/server';

import MarketingPageShell from '@/components/MarketingPageShell';
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    title: 'Cookie Policy',
    version: 'Version 1 - March 2026',
    intro:
      'This cookie policy explains how Vesalius uses cookies and similar technologies on this website, what they do, and how you can manage your preferences.',
    sections: [
      {
        title: 'What are cookies?',
        body:
          'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep essential features working, and understand how the site is used.',
      },
      {
        title: 'How we use cookies',
        body:
          'Vesalius uses cookies to support core website functionality, remember your consent settings, improve performance, and understand how visitors interact with the site. We do not use this page to authorize any handling of patient data inside the platform itself.',
      },
      {
        title: 'Cookie categories',
        body:
          'Necessary cookies keep the site working and cannot be switched off. Functional cookies remember choices such as language or region. Analytics cookies help us understand traffic and improve the experience. Advertising cookies, if used, help measure and personalize campaigns.',
      },
      {
        title: 'Managing your preferences',
        body:
          'You can accept, reject, or customize non-essential cookies through the cookie settings shown on the website. You can also control cookies through your browser settings, although disabling some cookies may affect parts of the website experience.',
      },
      {
        title: 'Contact',
        body:
          'If you have questions about this policy or how Vesalius handles website privacy preferences, you can contact us at privacy@vesalius.health.',
      },
    ],
  },
  fr: {
    title: 'Politique relative aux cookies',
    version: 'Version 1 - mars 2026',
    intro:
      'Cette politique relative aux cookies explique comment Vesalius utilise les cookies et technologies similaires sur ce site, à quoi ils servent et comment vous pouvez gérer vos préférences.',
    sections: [
      {
        title: 'Qu’est-ce qu’un cookie ?',
        body:
          'Les cookies sont de petits fichiers texte enregistrés sur votre appareil lorsque vous visitez un site web. Ils permettent de mémoriser certaines préférences, d’assurer le bon fonctionnement du site et de comprendre son utilisation.',
      },
      {
        title: 'Comment nous utilisons les cookies',
        body:
          'Vesalius utilise des cookies pour assurer le fonctionnement essentiel du site, mémoriser vos choix de consentement, améliorer les performances et comprendre l’usage du site. Cette page ne couvre pas le traitement des données patients au sein de la plateforme produit.',
      },
      {
        title: 'Catégories de cookies',
        body:
          'Les cookies nécessaires permettent au site de fonctionner et ne peuvent pas être désactivés. Les cookies fonctionnels mémorisent des choix comme la langue. Les cookies analytiques nous aident à comprendre le trafic et à améliorer l’expérience. Les cookies publicitaires, lorsqu’ils sont utilisés, servent à mesurer et personnaliser certaines campagnes.',
      },
      {
        title: 'Gérer vos préférences',
        body:
          'Vous pouvez accepter, refuser ou personnaliser les cookies non essentiels via les réglages de cookies du site. Vous pouvez également gérer les cookies dans votre navigateur, mais certaines fonctionnalités du site pourraient alors être limitées.',
      },
      {
        title: 'Contact',
        body:
          'Si vous avez des questions sur cette politique ou sur la manière dont Vesalius gère les préférences de confidentialité du site, vous pouvez nous écrire à privacy@vesalius.health.',
      },
    ],
  },
  nl: {
    title: 'Cookiebeleid',
    version: 'Versie 1 - maart 2026',
    intro:
      'Dit cookiebeleid legt uit hoe Vesalius cookies en gelijkaardige technologieën op deze website gebruikt, waarvoor ze dienen en hoe u uw voorkeuren kunt beheren.',
    sections: [
      {
        title: 'Wat zijn cookies?',
        body:
          'Cookies zijn kleine tekstbestanden die op uw toestel worden opgeslagen wanneer u een website bezoekt. Ze helpen websites om voorkeuren te onthouden, basisfunctionaliteit te laten werken en het gebruik van de site beter te begrijpen.',
      },
      {
        title: 'Hoe wij cookies gebruiken',
        body:
          'Vesalius gebruikt cookies om de kernfunctionaliteit van de website te ondersteunen, uw toestemmingskeuzes te onthouden, de prestaties te verbeteren en inzicht te krijgen in het gebruik van de site. Deze pagina gaat niet over patiëntgegevens binnen het platform zelf.',
      },
      {
        title: 'Cookiecategorieën',
        body:
          'Noodzakelijke cookies laten de site correct functioneren en kunnen niet worden uitgeschakeld. Functionele cookies onthouden keuzes zoals taal of regio. Analytische cookies helpen ons verkeer te begrijpen en de ervaring te verbeteren. Advertentiecookies, wanneer gebruikt, helpen campagnes te meten en te personaliseren.',
      },
      {
        title: 'Uw voorkeuren beheren',
        body:
          'U kunt niet-essentiële cookies accepteren, weigeren of aanpassen via de cookie-instellingen op de website. U kunt cookies ook beheren via uw browser, al kunnen bepaalde onderdelen van de website dan minder goed werken.',
      },
      {
        title: 'Contact',
        body:
          'Heeft u vragen over dit beleid of over hoe Vesalius websitevoorkeuren rond privacy beheert, neem dan contact op via privacy@vesalius.health.',
      },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/cookie-policy',
    title: 'Cookie Policy',
    description:
      'Read the Vesalius cookie policy to understand how website cookies, consent preferences, analytics, and related technologies are used.',
  });
}

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const copy = locale === 'fr' ? copyByLocale.fr : locale === 'nl' ? copyByLocale.nl : copyByLocale.en;

  return (
    <MarketingPageShell>
      <section className="px-4 sm:px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto rounded-[36px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(11,27,61,0.2)]">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1B3D] mb-4">
            {copy.title}
          </h1>
          <p className="text-slate-500 mb-6">{copy.version}</p>
          <p className="text-slate-600 text-lg leading-relaxed">{copy.intro}</p>

          <div className="mt-10 space-y-8">
            {copy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#0B1B3D] mb-3">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-8">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
