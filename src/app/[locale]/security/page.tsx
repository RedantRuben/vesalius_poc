import type { Metadata } from 'next';

import SecurityContent from "@/components/SecurityContent";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    eyebrow: "Security & Privacy",
    title: "Your data, ",
    accent: "our priority",
    intro:
      "At Vesalius.ai, we are deeply committed to your privacy, a dedication reflected in our three key values that ensure the protection and responsible handling of patient data. To build trust with our users, we continuously improve our security and privacy measures, adapting to evolving threats and regulatory landscapes while prioritizing data security and privacy.",
    cards: [
      {
        title: "Data Protection",
        body:
          "Our commitment to data protection is unwavering. We implement industry-standard encryption for all data transmissions, ensuring that sensitive patient information remains confidential and secure during transfer. Strict access controls limit data access to authorized personnel only, preventing unauthorized access and ensuring responsible handling of patient data. Regular security audits and vulnerability assessments proactively identify and mitigate potential risks, maintaining a secure environment for our users.",
        items: [
          "Encryption in transit and at rest",
          "Role-based access for authorized teams only",
          "Proactive audits and vulnerability testing",
        ],
      },
      {
        title: "Regulatory Compliance",
        body:
          "Compliance with regulatory standards is at the core of our operations. We adhere to the General Data Protection Regulation (GDPR) to protect the personal data of EU citizens, emphasizing transparency in data usage and the right to data erasure. Our platform is also designed to meet the Health Insurance Portability and Accountability Act (HIPAA) standards, implementing safeguards to protect electronic health information and ensure compliance with HIPAA regulations.",
        items: [
          "GDPR-aligned handling of personal data",
          "HIPAA-oriented safeguards for health information",
          "Privacy-by-design controls built into operations",
        ],
      },
      {
        title: "Data Transparency",
        body:
          "We value transparency in our data practices. Our privacy policy outlines how we collect, use, and store data, ensuring users are informed about their data rights. We provide easy-to-use tools for users to control their data, allowing them to request access, corrections, or deletion of their personal information. Our dedication to transparency builds trust with our users, emphasizing their control over their data.",
        items: [
          "Clear policies for collection, use, and retention",
          "Straightforward requests for access or correction",
          "User control over deletion where applicable",
        ],
      },
    ],
    standardsTitle: "Compliance Standards",
    standardsSubtitle: "Certified and audited by leading security organizations",
    standards: [
      {
        acronym: "HIPAA",
        title: "HIPAA Compliant",
        body: "Health Insurance Portability and Accountability Act",
      },
      {
        acronym: "GDPR",
        title: "GDPR Compliant",
        body: "General Data Protection Regulation",
      },
    ],
  },
  fr: {
    eyebrow: "Sécurité & confidentialité",
    title: "Vos données, ",
    accent: "notre priorité",
    intro:
      "Chez Vesalius.ai, la protection de votre vie privée est une exigence de fond. Elle se traduit par trois engagements clés qui garantissent une gestion responsable et sécurisée des données patients. Pour renforcer la confiance de nos utilisateurs, nous faisons évoluer en continu nos mesures de sécurité et de confidentialité afin de nous adapter aux menaces et aux exigences réglementaires.",
    cards: [
      {
        title: "Protection des données",
        body:
          "Notre engagement en matière de protection des données est constant. Nous appliquons des standards de chiffrement reconnus pour tous les échanges afin de préserver la confidentialité des informations sensibles pendant leur transmission. Des contrôles d'accès stricts réservent les données aux seules personnes autorisées, tandis que des audits réguliers et des évaluations de vulnérabilité permettent d'identifier et de réduire les risques de manière proactive.",
        items: [
          "Chiffrement des données en transit et au repos",
          "Accès fondé sur les rôles pour les équipes autorisées",
          "Audits proactifs et tests de vulnérabilité",
        ],
      },
      {
        title: "Conformité réglementaire",
        body:
          "Le respect des exigences réglementaires est au coeur de nos opérations. Nous appliquons le RGPD pour protéger les données personnelles des citoyens européens, avec un accent fort sur la transparence et les droits des personnes. Notre plateforme est également conçue pour répondre aux standards HIPAA afin d'encadrer la protection des informations de santé électroniques.",
        items: [
          "Traitement des données aligné sur le RGPD",
          "Mesures orientées HIPAA pour les données de santé",
          "Contrôles de confidentialité intégrés dès la conception",
        ],
      },
      {
        title: "Transparence sur les données",
        body:
          "Nous tenons à une transparence claire sur nos pratiques. Notre politique de confidentialité précise comment les données sont collectées, utilisées et conservées, afin que chaque utilisateur comprenne ses droits. Nous mettons aussi à disposition des moyens simples pour demander un accès, une correction ou une suppression des informations personnelles lorsque cela s'applique.",
        items: [
          "Politiques claires sur la collecte, l'usage et la conservation",
          "Demandes simples d'accès ou de rectification",
          "Contrôle utilisateur sur la suppression lorsque applicable",
        ],
      },
    ],
    standardsTitle: "Standards de conformité",
    standardsSubtitle: "Certifié et audité selon les références majeures du secteur",
    standards: [
      {
        acronym: "HIPAA",
        title: "Conforme HIPAA",
        body: "Health Insurance Portability and Accountability Act",
      },
      {
        acronym: "GDPR",
        title: "Conforme RGPD",
        body: "Règlement général sur la protection des données",
      },
    ],
  },
  nl: {
    eyebrow: "Beveiliging & privacy",
    title: "Uw data, ",
    accent: "onze prioriteit",
    intro:
      "Bij Vesalius.ai nemen we privacy fundamenteel ernstig. Die overtuiging vertaalt zich in drie kernwaarden die zorgen voor een veilige en verantwoorde omgang met patiëntgegevens. Om het vertrouwen van onze gebruikers te verdienen en te behouden, scherpen we onze beveiligings- en privacymaatregelen voortdurend aan naarmate dreigingen en regelgeving evolueren.",
    cards: [
      {
        title: "Databescherming",
        body:
          "Onze inzet voor databescherming is onvoorwaardelijk. We gebruiken encryptie volgens de gangbare industrienormen voor alle datatransmissies, zodat gevoelige patiëntinformatie vertrouwelijk en veilig blijft tijdens overdracht. Strikte toegangscontroles beperken toegang tot geautoriseerde medewerkers, terwijl regelmatige audits en kwetsbaarheidsanalyses risico's proactief opsporen en beperken.",
        items: [
          "Encryptie tijdens verzending en opslag",
          "Rolgebaseerde toegang voor geautoriseerde teams",
          "Proactieve audits en kwetsbaarheidstesten",
        ],
      },
      {
        title: "Regelgevende naleving",
        body:
          "Naleving van regelgeving zit ingebakken in onze werking. We volgen de GDPR om persoonsgegevens van EU-burgers te beschermen, met bijzondere aandacht voor transparantie en rechten rond gegevensverwijdering. Ons platform is daarnaast ontworpen om ook aan HIPAA-verwachtingen te voldoen voor de bescherming van elektronische gezondheidsinformatie.",
        items: [
          "Verwerking van persoonsgegevens in lijn met GDPR",
          "HIPAA-gerichte waarborgen voor gezondheidsinformatie",
          "Privacy-by-design controles in de werking ingebouwd",
        ],
      },
      {
        title: "Datatransparantie",
        body:
          "We vinden heldere communicatie over data essentieel. In ons privacybeleid leggen we uit hoe we gegevens verzamelen, gebruiken en bewaren, zodat gebruikers hun rechten goed begrijpen. We voorzien ook toegankelijke manieren om inzage, correctie of verwijdering van persoonsgegevens aan te vragen waar dat van toepassing is.",
        items: [
          "Duidelijk beleid rond verzameling, gebruik en bewaartermijnen",
          "Toegankelijke aanvragen voor inzage of correctie",
          "Gebruikerscontrole over verwijdering waar mogelijk",
        ],
      },
    ],
    standardsTitle: "Compliance-standaarden",
    standardsSubtitle: "Gecertificeerd en geaudit volgens toonaangevende veiligheidsnormen",
    standards: [
      {
        acronym: "HIPAA",
        title: "HIPAA-conform",
        body: "Health Insurance Portability and Accountability Act",
      },
      {
        acronym: "GDPR",
        title: "GDPR-conform",
        body: "General Data Protection Regulation",
      },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/security',
    title: 'Security & Privacy',
    description:
      'Learn how Vesalius approaches healthcare security, GDPR-aligned data handling, HIPAA-oriented safeguards, encryption, access control, and privacy practices.',
  });
}

export default async function SecurityPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  return <SecurityContent copy={copy} />;
}
