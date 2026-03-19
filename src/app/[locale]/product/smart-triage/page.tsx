import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";

const copyByLocale = {
  en: {
    badges: ["AI Triage", "Smart Routing"],
    title: "Smart Triage & Routing",
    description:
      "Intelligent urgency assessment that prioritizes patients based on clinical need. Ensure the right patient sees the right doctor at the right time.",
    cta: "Get Started",
    triageCards: [
      { title: "Chest Pain", priority: "High Priority", timing: "Immediate" },
      { title: "Migraine", priority: "Medium Priority", timing: "48h" },
      { title: "Prescription", priority: "Low Priority", timing: "Routine" },
    ],
    features: [
      {
        title: "AI Assessment",
        description:
          "Algorithms analyze symptoms and history to assign a clinical urgency score automatically.",
      },
      {
        title: "Intelligent Routing",
        description:
          "Direct patients to the appropriate resource: ER, Specialist, GP, or Self-care advice.",
      },
      {
        title: "Workload Balancing",
        description:
          "Distribute patient load effectively across your team to prevent burnout and reduce wait times.",
      },
    ],
  },
  fr: {
    badges: ["Triage IA", "Orientation intelligente"],
    title: "Triage & orientation intelligents",
    description:
      "Une évaluation intelligente de l'urgence qui priorise les patients selon le besoin clinique. Orientez la bonne personne vers le bon professionnel au bon moment.",
    cta: "Découvrir",
    triageCards: [
      { title: "Douleur thoracique", priority: "Priorité élevée", timing: "Immédiat" },
      { title: "Migraine", priority: "Priorité moyenne", timing: "48 h" },
      { title: "Ordonnance", priority: "Priorité faible", timing: "Routier" },
    ],
    features: [
      {
        title: "Évaluation par l'IA",
        description:
          "Les algorithmes analysent automatiquement les symptômes et l'historique pour attribuer un niveau d'urgence clinique.",
      },
      {
        title: "Orientation intelligente",
        description:
          "Dirigez les patients vers la bonne ressource : urgences, spécialiste, généraliste ou conseil d'auto-soin.",
      },
      {
        title: "Équilibrage de charge",
        description:
          "Répartissez plus efficacement l'activité au sein de votre équipe pour limiter la surcharge et réduire les délais.",
      },
    ],
  },
  nl: {
    badges: ["AI-triage", "Slimme routering"],
    title: "Slimme triage en routering",
    description:
      "Intelligente urgentiebeoordeling die patiënten prioriteert op basis van klinische nood. Zorg dat de juiste patiënt op het juiste moment bij de juiste zorgverlener terechtkomt.",
    cta: "Ontdek meer",
    triageCards: [
      { title: "Pijn op de borst", priority: "Hoge prioriteit", timing: "Onmiddellijk" },
      { title: "Migraine", priority: "Middelmatige prioriteit", timing: "48 u" },
      { title: "Voorschrift", priority: "Lage prioriteit", timing: "Routine" },
    ],
    features: [
      {
        title: "AI-beoordeling",
        description:
          "Algoritmes analyseren symptomen en voorgeschiedenis om automatisch een klinische urgentiescore toe te kennen.",
      },
      {
        title: "Slimme routering",
        description:
          "Verwijs patiënten naar de juiste bestemming: spoed, specialist, huisarts of advies voor zelfzorg.",
      },
      {
        title: "Werkdruk spreiden",
        description:
          "Verdeel de patiëntenstroom slimmer over uw team om overbelasting te voorkomen en wachttijden te verkorten.",
      },
    ],
  },
} as const;

export default async function SmartTriagePage() {
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
                <span className="bg-sky-50 text-sky-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">{copy.badges[0]}</span>
                <span className="bg-sky-50 text-sky-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">{copy.badges[1]}</span>
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
               <div className="relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-xl p-8 flex flex-col gap-4 justify-center min-h-[300px]">
                  {/* Triage Cards */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">{copy.triageCards[0].title}</div>
                           <div className="text-xs text-gray-500">{copy.triageCards[0].priority}</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded border border-red-100">{copy.triageCards[0].timing}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 border border-yellow-100 opacity-80">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">{copy.triageCards[1].title}</div>
                           <div className="text-xs text-gray-500">{copy.triageCards[1].priority}</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-yellow-600 bg-white px-2 py-1 rounded border border-yellow-100">{copy.triageCards[1].timing}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100 opacity-60">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">{copy.triageCards[2].title}</div>
                           <div className="text-xs text-gray-500">{copy.triageCards[2].priority}</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded border border-green-100">{copy.triageCards[2].timing}</span>
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
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8"/>
                        <rect width="16" height="12" x="4" y="8" rx="2"/>
                        <path d="M2 14h2"/>
                        <path d="M20 14h2"/>
                        <path d="M15 13v2"/>
                        <path d="M9 13v2"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[0].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="18" r="3"/>
                        <circle cx="6" cy="6" r="3"/>
                        <path d="M6 21V9a9 9 0 0 0 9 9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[1].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
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
