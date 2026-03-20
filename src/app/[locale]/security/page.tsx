import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLocale } from "next-intl/server";

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const securityCardMeta = [
  {
    icon: LockIcon,
    iconClass: "bg-[#0B1B3D] text-white shadow-lg shadow-[#0B1B3D]/20",
  },
  {
    icon: ShieldCheckIcon,
    iconClass: "bg-[#06ACC1] text-white shadow-lg shadow-[#06ACC1]/20",
  },
  {
    icon: EyeIcon,
    iconClass: "bg-gradient-to-br from-[#FF3366] to-rose-500 text-white shadow-lg shadow-rose-500/20",
  },
] as const;

const copyByLocale = {
  en: {
    eyebrow: "Security & Privacy",
    title: "Your data, ",
    accent: "our priority",
    accentClass: "text-transparent bg-clip-text bg-gradient-to-r from-[#06ACC1] to-cyan-400",
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
    accentClass: "text-transparent bg-clip-text bg-gradient-to-r from-[#06ACC1] to-cyan-400",
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
    accentClass: "text-[#0B1B3D]",
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

export default async function SecurityPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-10 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
          <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path d="M -100,300 C 400,200 800,500 1540,300" fill="none" stroke="#06ACC1" strokeWidth="1.5" />
            <path d="M -100,400 C 500,500 900,250 1540,350" fill="none" stroke="#FF3366" strokeWidth="1.5" opacity="0.8" />
            <path d="M -100,200 C 600,350 1000,250 1540,400" fill="none" stroke="#0B1B3D" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-[#0B1B3D] shadow-lg shadow-[#0B1B3D]/20 text-white font-bold text-sm mb-8 tracking-wide">
            <ShieldCheckIcon />
            <span>{copy.eyebrow}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0B1B3D] mb-8 tracking-tight">
            {copy.title}<span className={copy.accentClass}>{copy.accent}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-light max-w-3xl mx-auto">
            {copy.intro}
          </p>
        </div>
      </section>

      {/* Three Core Values */}
      <section className="w-full pt-8 pb-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {copy.cards.map((card, index) => {
              const meta = securityCardMeta[index];
              const Icon = meta.icon;

              return (
                <div
                  key={card.title}
                  className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group relative overflow-hidden h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 ${meta.iconClass}`}>
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1B3D] mb-4 tracking-tight">{card.title}</h3>
                  <p className="text-base text-slate-500 font-light mb-8 leading-relaxed">
                    {card.body}
                  </p>
                  <ul className="space-y-3">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                        <div className="mt-0.5 text-[#06ACC1] shrink-0">
                          <CheckIcon />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="w-full py-24 bg-transparent border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1B3D] mb-4 tracking-tight">
            {copy.standardsTitle}
          </h2>
          <p className="text-slate-500 font-light text-lg mb-16 max-w-2xl mx-auto">
            {copy.standardsSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* HIPAA */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 flex items-center gap-5 text-left group">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-[#162c5e] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform duration-500">
                  HIPAA
               </div>
               <div>
                 <h4 className="font-bold text-[#0B1B3D] tracking-tight">{copy.standards[0].title}</h4>
                 <p className="text-xs text-slate-500 font-light mt-1">{copy.standards[0].body}</p>
               </div>
            </div>

            {/* GDPR */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 flex items-center gap-5 text-left group">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06ACC1] to-cyan-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform duration-500">
                  GDPR
               </div>
               <div>
                 <h4 className="font-bold text-[#0B1B3D] tracking-tight">{copy.standards[1].title}</h4>
                 <p className="text-xs text-slate-500 font-light mt-1">{copy.standards[1].body}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col bg-transparent">
        <Footer />
      </section>
    </main>
  );
}
