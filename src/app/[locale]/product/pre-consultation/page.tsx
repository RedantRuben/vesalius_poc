import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";

const copyByLocale = {
  en: {
    badge: "Pre Consultation",
    title: "Automated Patient Intake",
    description:
      "Gather comprehensive patient history before the appointment starts. Our intelligent chatbot interviews patients, understands their symptoms, and structures the data for your review.",
    cta: "Get Started",
    windowTitle: "Vesalius Intake",
    chat: [
      "Good morning. I understand you're experiencing some discomfort. Could you tell me where the pain is located?",
      "It's mostly in my lower back, on the right side.",
      "I see. Does the pain radiate anywhere else, like down your leg?",
    ],
    features: [
      {
        title: "Multilingual Support",
        description:
          "Communicate with patients in 50+ languages. The AI translates everything back to your preferred language.",
      },
      {
        title: "Whatsapp Integration",
        description:
          "Reach patients on the platform they use most. No app installation required for patients.",
      },
      {
        title: "Structured Output",
        description:
          "Conversations are automatically converted into structured clinical summaries ready for your EMR.",
      },
    ],
  },
  fr: {
    badge: "Pré-consultation",
    title: "Recueil patient automatisé",
    description:
      "Recueillez une anamnèse complète avant même le début du rendez-vous. Notre chatbot intelligent interroge le patient, comprend ses symptômes et structure les informations pour votre relecture.",
    cta: "Découvrir",
    windowTitle: "Intake Vesalius",
    chat: [
      "Bonjour. Je comprends que vous ressentez une gêne. Pouvez-vous m'indiquer où se situe la douleur ?",
      "Surtout dans le bas du dos, du côté droit.",
      "D'accord. Est-ce que la douleur irradie ailleurs, par exemple dans la jambe ?",
    ],
    features: [
      {
        title: "Support multilingue",
        description:
          "Échangez avec vos patients dans plus de 50 langues. L'IA vous restitue ensuite tout dans votre langue de travail.",
      },
      {
        title: "Intégration WhatsApp",
        description:
          "Touchez les patients sur l'outil qu'ils utilisent déjà. Aucune installation d'application n'est nécessaire côté patient.",
      },
      {
        title: "Sortie structurée",
        description:
          "Les conversations sont automatiquement converties en synthèses cliniques structurées, prêtes pour votre DMI.",
      },
    ],
  },
  nl: {
    badge: "Pre-consultatie",
    title: "Geautomatiseerde patiëntintake",
    description:
      "Verzamel een volledige anamnese nog voor de afspraak start. Onze intelligente chatbot bevraagt de patiënt, begrijpt de symptomen en structureert alles voor uw review.",
    cta: "Ontdek meer",
    windowTitle: "Vesalius Intake",
    chat: [
      "Goedemorgen. Ik begrijp dat u wat last ervaart. Kunt u aangeven waar de pijn precies zit?",
      "Vooral rechts onderaan in mijn rug.",
      "Ik begrijp het. Straalt de pijn ook uit, bijvoorbeeld naar uw been?",
    ],
    features: [
      {
        title: "Meertalige ondersteuning",
        description:
          "Communiceer met patiënten in meer dan 50 talen. De AI vertaalt alles terug naar uw voorkeurstaal.",
      },
      {
        title: "WhatsApp-integratie",
        description:
          "Bereik patiënten via het kanaal dat ze het vaakst gebruiken. Er is geen app-installatie nodig voor de patiënt.",
      },
      {
        title: "Gestructureerde output",
        description:
          "Gesprekken worden automatisch omgezet in gestructureerde klinische samenvattingen die klaar zijn voor uw EPD.",
      },
    ],
  },
} as const;

export default async function PreConsultationPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-20 md:pt-12 md:pb-24 bg-transparent relative overflow-hidden border-b border-gray-100">
        {/* ... hero content ... */}

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
              <div className="inline-block bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
                {copy.badge}
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
               <div className="relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs text-gray-400 font-medium ml-2">{copy.windowTitle}</div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                     {/* Chat Messages */}
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#06ACC1]/10 flex-shrink-0 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 8V4H8"/>
                              <rect width="16" height="12" x="4" y="8" rx="2"/>
                              <path d="M2 14h2"/>
                              <path d="M20 14h2"/>
                              <path d="M15 13v2"/>
                              <path d="M9 13v2"/>
                           </svg>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[80%]">
                           {copy.chat[0]}
                        </div>
                     </div>

                     <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="8" r="5"/>
                              <path d="M20 21a8 8 0 0 0-16 0"/>
                           </svg>
                        </div>
                        <div className="bg-[#06ACC1] text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                           {copy.chat[1]}
                        </div>
                     </div>

                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#06ACC1]/10 flex-shrink-0 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 8V4H8"/>
                              <rect width="16" height="12" x="4" y="8" rx="2"/>
                              <path d="M2 14h2"/>
                              <path d="M20 14h2"/>
                              <path d="M15 13v2"/>
                              <path d="M9 13v2"/>
                           </svg>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[80%]">
                           {copy.chat[2]}
                        </div>
                     </div>
                     
                     {/* Typing Indicator */}
                     <div className="flex gap-2 ml-11 mt-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
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
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
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
