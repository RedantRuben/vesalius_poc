import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";

const copyByLocale = {
  en: {
    badges: ["Automated", "Alerts"],
    title: "Smart Follow-ups",
    description:
      "Automated check-ins that flag at-risk patients. Get alerts when responses deviate, enabling early intervention.",
    cta: "Get Started",
    cardTitle: "Smart Follow-ups",
    cardBody: "Automated check-ins that flag at-risk patients.",
    timeline: ["Started", "Questionnaire"],
    alertTitle: "Deviation Detected",
    alertBody: "Patient response requires clinical review.",
    features: [
      {
        title: "Automated Monitoring",
        description:
          "Automatically send follow-up questionnaires based on procedure type and recovery timeline.",
      },
      {
        title: "Risk Detection",
        description:
          "Instant alerts when patient reported outcomes deviate from the expected recovery path.",
      },
      {
        title: "Better Outcomes",
        description:
          "Catch complications early and improve long-term patient satisfaction and health outcomes.",
      },
    ],
  },
  fr: {
    badges: ["Automatisé", "Alertes"],
    title: "Suivis intelligents",
    description:
      "Des suivis automatisés qui signalent les patients à risque. Recevez une alerte dès qu'une réponse s'écarte du parcours de récupération attendu.",
    cta: "Découvrir",
    cardTitle: "Suivis intelligents",
    cardBody: "Des check-ins automatisés pour repérer les patients à risque.",
    timeline: ["Démarré", "Questionnaire"],
    alertTitle: "Écart détecté",
    alertBody: "La réponse du patient nécessite une revue clinique.",
    features: [
      {
        title: "Suivi automatisé",
        description:
          "Envoyez automatiquement des questionnaires de suivi en fonction du type d'intervention et du calendrier de récupération.",
      },
      {
        title: "Détection du risque",
        description:
          "Des alertes immédiates lorsque les résultats rapportés par le patient s'écartent de la trajectoire attendue.",
      },
      {
        title: "De meilleurs résultats",
        description:
          "Détectez les complications plus tôt et améliorez la satisfaction ainsi que les résultats cliniques à long terme.",
      },
    ],
  },
  nl: {
    badges: ["Geautomatiseerd", "Meldingen"],
    title: "Slimme opvolging",
    description:
      "Geautomatiseerde check-ins die risicopatiënten signaleren. Ontvang meldingen zodra antwoorden afwijken, zodat u vroeg kunt ingrijpen.",
    cta: "Ontdek meer",
    cardTitle: "Slimme opvolging",
    cardBody: "Geautomatiseerde check-ins die risicopatiënten signaleren.",
    timeline: ["Gestart", "Vragenlijst"],
    alertTitle: "Afwijking gedetecteerd",
    alertBody: "De reactie van de patiënt vraagt om klinische opvolging.",
    features: [
      {
        title: "Geautomatiseerde monitoring",
        description:
          "Verstuur automatisch opvolgvragenlijsten op basis van het type ingreep en het verwachte herstelverloop.",
      },
      {
        title: "Risicodetectie",
        description:
          "Directe meldingen wanneer gerapporteerde uitkomsten afwijken van het verwachte herstelpad.",
      },
      {
        title: "Betere uitkomsten",
        description:
          "Spoor complicaties sneller op en verbeter de tevredenheid en gezondheidsuitkomsten op langere termijn.",
      },
    ],
  },
} as const;

export default async function SmartFollowUpPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-20 md:pt-12 md:pb-24 bg-transparent relative overflow-hidden border-b border-gray-100">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
          <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800">
            <path d="M -100,300 C 400,200 800,500 1540,300" fill="none" stroke="#06ACC1" strokeWidth="1.5" />
            <path d="M -100,400 C 500,500 900,250 1540,350" fill="none" stroke="#FF3366" strokeWidth="1.5" opacity="0.8" />
            <path d="M -100,200 C 600,350 1000,250 1540,400" fill="none" stroke="#0B1B3D" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left">
              <div className="flex gap-2.5 mb-6">
                <span className="bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">{copy.badges[0]}</span>
                <span className="bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">{copy.badges[1]}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                {copy.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                {copy.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#0B1B3D] text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1">
                  {copy.cta}
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-xl p-8 flex flex-col justify-center min-h-[300px]">
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-2">{copy.cardTitle}</h3>
                  <p className="text-sm text-gray-500 mb-8">{copy.cardBody}</p>

                  <div className="relative pt-4 pb-8">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                        <span>{copy.timeline[0]}</span>
                        <span>{copy.timeline[1]}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#06ACC1] w-[75%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Alert */}
                  <div className="mt-4 flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-orange-700 text-sm">{copy.alertTitle}</h4>
                        <p className="text-xs text-orange-600 mt-1">{copy.alertBody}</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 bg-transparent">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[0].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[1].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[2].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[2].description}
                  </p>
               </div>
            </div>
         </div>
      </section>


      <section className="w-full flex flex-col bg-transparent border-t border-gray-100">
        <Footer />
      </section>
    </main>
  );
}
