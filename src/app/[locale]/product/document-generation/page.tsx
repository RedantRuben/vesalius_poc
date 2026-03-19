import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";

const copyByLocale = {
  en: {
    badge: "Document Generation",
    title: "Instant Clinical Notes",
    description:
      "Transform conversations into structured medical records instantly. Generate SOAP notes, referral letters, and summaries with one click.",
    cta: "See Examples",
    generatedIn: "Generated in 2s",
    features: [
      {
        title: "SOAP & SBAR",
        description:
          "Automatically format output into standard medical frameworks like SOAP notes, SBAR, or custom templates.",
      },
      {
        title: "EMR Integration",
        description:
          "Push generated documents directly into your Electronic Medical Record system with a single click.",
      },
      {
        title: "Custom Templates",
        description:
          "Train the AI to match your personal writing style and formatting preferences perfectly.",
      },
    ],
  },
  fr: {
    badge: "Génération de documents",
    title: "Notes cliniques instantanées",
    description:
      "Transformez les conversations en dossiers médicaux structurés en quelques secondes. Générez des notes SOAP, des lettres d'orientation et des synthèses en un clic.",
    cta: "Voir des exemples",
    generatedIn: "Généré en 2 s",
    features: [
      {
        title: "SOAP & SBAR",
        description:
          "Formatez automatiquement la sortie selon des cadres médicaux standards comme SOAP, SBAR ou vos propres modèles.",
      },
      {
        title: "Intégration DMI",
        description:
          "Envoyez les documents générés directement dans votre dossier médical informatisé en un seul clic.",
      },
      {
        title: "Modèles sur mesure",
        description:
          "Adaptez l'IA à votre style rédactionnel et à vos préférences de mise en forme pour une sortie fidèle à vos habitudes.",
      },
    ],
  },
  nl: {
    badge: "Documentgeneratie",
    title: "Directe klinische notities",
    description:
      "Zet gesprekken meteen om in gestructureerde medische documentatie. Genereer SOAP-notities, verwijsbrieven en samenvattingen met één klik.",
    cta: "Bekijk voorbeelden",
    generatedIn: "Gegenereerd in 2 s",
    features: [
      {
        title: "SOAP & SBAR",
        description:
          "Formatteer output automatisch volgens standaard medische kaders zoals SOAP, SBAR of uw eigen templates.",
      },
      {
        title: "EPD-integratie",
        description:
          "Stuur gegenereerde documenten met één klik rechtstreeks naar uw elektronisch patiëntendossier.",
      },
      {
        title: "Aangepaste templates",
        description:
          "Train de AI zodat die perfect aansluit bij uw persoonlijke schrijfstijl en gewenste opmaak.",
      },
    ],
  },
} as const;

export default async function DocumentGenerationPage() {
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
              <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
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
               <div className="relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-xl p-8 aspect-[4/3] flex flex-col">
                  {/* Document Preview */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                     <div className="w-1/3 h-4 bg-gray-200 rounded" />
                     <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                           <polyline points="14 2 14 8 20 8" />
                        </svg>
                     </div>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                     <div className="space-y-2">
                        <div className="w-24 h-3 bg-gray-200 rounded" />
                        <div className="w-full h-2 bg-gray-100 rounded" />
                        <div className="w-full h-2 bg-gray-100 rounded" />
                        <div className="w-3/4 h-2 bg-gray-100 rounded" />
                     </div>
                     
                     <div className="space-y-2">
                        <div className="w-20 h-3 bg-gray-200 rounded" />
                        <div className="w-full h-2 bg-gray-100 rounded" />
                        <div className="w-5/6 h-2 bg-gray-100 rounded" />
                     </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                     <div className="flex items-center gap-2 text-[#06ACC1] text-sm font-bold">
                        <span>{copy.generatedIn}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <polyline points="20 6 9 17 4 12" />
                        </svg>
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
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
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
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
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
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                        <circle cx="12" cy="12" r="3"/>
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
