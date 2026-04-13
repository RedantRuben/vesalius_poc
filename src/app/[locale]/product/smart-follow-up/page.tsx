import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    badges: ["Automated", "Alerts"],
    title: "Smart Follow-ups",
    description:
      "Automated check-ins that flag at-risk patients. Get alerts when responses deviate, enabling early intervention.",
    cta: "Get Started",
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
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Post-Discharge Blind Spots",
        description:
          "Once patients leave the hospital, it's difficult to track their recovery. Complications often go unnoticed until they become emergencies, leading to unnecessary readmissions and poorer patient outcomes.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Automated Check-ins",
        description:
          "Vesalius automatically sends personalized follow-up questionnaires directly to the patient's phone based on their specific procedure and expected recovery timeline.",
      },
      result: {
        eyebrow: "The Result",
        title: "Proactive Risk Detection",
        description:
          "The system instantly analyzes responses, flagging any deviations and alerting the care team immediately. Intervene early, prevent complications, and ensure a smooth recovery.",
      }
    }
  },
  fr: {
    badges: ["Automatisé", "Alertes"],
    title: "Suivis intelligents",
    description:
      "Des suivis automatisés qui signalent les patients à risque. Recevez une alerte dès qu'une réponse s'écarte du parcours de récupération attendu.",
    cta: "Découvrir",
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
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Zones d'ombre après la sortie",
        description:
          "Une fois les patients sortis de l'hôpital, il est difficile de suivre leur rétablissement. Les complications passent souvent inaperçues jusqu'à ce qu'elles deviennent des urgences, entraînant des réadmissions.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Check-ins automatisés",
        description:
          "Vesalius envoie automatiquement des questionnaires de suivi personnalisés directement sur le téléphone du patient, en fonction de son intervention et du calendrier de rétablissement prévu.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Détection proactive des risques",
        description:
          "Le système analyse instantanément les réponses, signalant tout écart et alertant immédiatement l'équipe soignante. Intervenez tôt et prévenez les complications.",
      }
    }
  },
  nl: {
    badges: ["Geautomatiseerd", "Meldingen"],
    title: "Slimme opvolging",
    description:
      "Geautomatiseerde check-ins die risicopatiënten signaleren. Ontvang meldingen zodra antwoorden afwijken, zodat u vroeg kunt ingrijpen.",
    cta: "Ontdek meer",
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
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Blinde vlekken na ontslag",
        description:
          "Zodra patiënten het ziekenhuis verlaten, is het moeilijk om hun herstel te volgen. Complicaties blijven vaak onopgemerkt tot het noodgevallen worden, wat leidt tot onnodige heropnames.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Geautomatiseerde check-ins",
        description:
          "Vesalius stuurt automatisch gepersonaliseerde opvolgvragenlijsten rechtstreeks naar de telefoon van de patiënt, gebaseerd op hun specifieke ingreep en het verwachte herstelverloop.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Proactieve risicodetectie",
        description:
          "Het systeem analyseert direct de antwoorden, signaleert afwijkingen en waarschuwt het zorgteam onmiddellijk. Grijp vroeg in, voorkom complicaties en zorg voor een vlot herstel.",
      }
    }
  },
} as const;

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

export default async function SmartFollowUpPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-8 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center gap-2.5 mb-6">
            <span className="inline-block bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-cyan-100/50">{copy.badges[0]}</span>
            <span className="inline-block bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-cyan-100/50">{copy.badges[1]}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0B1B3D] mb-6 leading-[1.1] max-w-4xl mx-auto tracking-tight">
            {copy.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            {copy.description}
          </p>

          <div className="flex justify-center mb-16">
            <button className="px-8 py-3 rounded-2xl bg-[#0B1B3D] text-white font-bold hover:shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-1">
              {copy.cta}
            </button>
          </div>
        </div>

        {/* Floating Abstract UI Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-40">
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-teal-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-16">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-slate-200 via-cyan-200 to-teal-200 -translate-x-1/2 -z-10"></div>

            <div className="space-y-24 md:space-y-40">
               
               {/* 1. THE PROBLEM */}
               <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Content */}
                  <div className="flex-1 lg:pr-12 text-center lg:text-right relative">
                     <div className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-slate-200">
                        {copy.story.problem.eyebrow}
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] mb-6 leading-tight">
                        {copy.story.problem.title}
                     </h2>
                     <p className="text-lg text-slate-500 leading-relaxed font-light">
                        {copy.story.problem.description}
                     </p>
                  </div>
                  
                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-slate-100 rounded-full items-center justify-center z-10 shadow-lg shadow-slate-500/10">
                     <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex flex-col gap-4 relative z-10">
                           <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-60">
                              <div className="w-10 h-10 rounded-full bg-slate-200" />
                              <div className="flex-1 space-y-2">
                                <div className="h-2.5 w-24 bg-slate-200 rounded-full"></div>
                                <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                              </div>
                              <div className="w-16 h-6 rounded-md bg-slate-200"></div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-40">
                              <div className="w-10 h-10 rounded-full bg-slate-200" />
                              <div className="flex-1 space-y-2">
                                <div className="h-2.5 w-32 bg-slate-200 rounded-full"></div>
                                <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
                              </div>
                              <div className="w-16 h-6 rounded-md bg-slate-200"></div>
                           </div>
                           <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 opacity-20">
                              <div className="w-10 h-10 rounded-full bg-slate-200" />
                              <div className="flex-1 space-y-2">
                                <div className="h-2.5 w-20 bg-slate-200 rounded-full"></div>
                                <div className="h-2 w-12 bg-slate-200 rounded-full"></div>
                              </div>
                              <div className="w-16 h-6 rounded-md bg-slate-200"></div>
                           </div>

                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-slate-500 font-bold text-sm">
                                 No visibility post-discharge
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 2. THE SOLUTION */}
               <div className="relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Visual */}
                  <div className="flex-1 w-full lg:pr-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-cyan-100 shadow-2xl shadow-cyan-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="space-y-4 relative z-10">
                           <div className="text-center mb-6">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-500 mb-3 border border-cyan-100">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                              </div>
                              <div className="h-3 bg-slate-200 rounded-full w-1/2 mx-auto"></div>
                           </div>

                           {/* Smart Chat interface */}
                           <div className="space-y-3">
                              <div className="flex justify-end group-hover:-translate-y-1 transition-transform duration-300">
                                 <div className="bg-cyan-50 text-cyan-700 p-3 rounded-2xl rounded-tr-sm border border-cyan-100 text-xs w-3/4 shadow-sm">
                                    <div className="h-2 bg-cyan-200 rounded-full w-full mb-1.5"></div>
                                    <div className="h-2 bg-cyan-200 rounded-full w-4/5"></div>
                                 </div>
                              </div>
                              <div className="flex justify-start group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                                 <div className="bg-slate-50 text-slate-600 p-3 rounded-2xl rounded-tl-sm border border-slate-100 text-xs w-2/3 shadow-sm">
                                    <div className="h-2 bg-slate-200 rounded-full w-full mb-1.5"></div>
                                    <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                                 </div>
                              </div>
                              <div className="flex justify-end group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                                 <div className="bg-cyan-50 text-cyan-700 p-3 rounded-2xl rounded-tr-sm border border-cyan-100 text-xs w-5/6 shadow-sm">
                                    <div className="h-2 bg-cyan-200 rounded-full w-full mb-1.5"></div>
                                    <div className="h-2 bg-cyan-200 rounded-full w-1/2"></div>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Magic highlight sweep */}
                           <div className="absolute inset-0 w-[200%] -left-[100%] h-full bg-gradient-to-r from-transparent via-cyan-100/30 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite]"></div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-cyan-100 rounded-full items-center justify-center z-10 shadow-lg shadow-cyan-500/20">
                     <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-cyan-100">
                        {copy.story.solution.eyebrow}
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] mb-6 leading-tight">
                        {copy.story.solution.title}
                     </h2>
                     <p className="text-lg text-slate-500 leading-relaxed font-light">
                        {copy.story.solution.description}
                     </p>
                  </div>
               </div>

               {/* 3. THE RESULT */}
               <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Content */}
                  <div className="flex-1 lg:pr-12 text-center lg:text-right relative">
                     <div className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-teal-100">
                        {copy.story.result.eyebrow}
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] mb-6 leading-tight">
                        {copy.story.result.title}
                     </h2>
                     <p className="text-lg text-slate-500 leading-relaxed font-light">
                        {copy.story.result.description}
                     </p>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-teal-100 rounded-full items-center justify-center z-10 shadow-lg shadow-teal-500/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-teal-100/50 shadow-2xl shadow-teal-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50/40 via-transparent to-transparent"></div>
                        
                        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                           
                           {/* Normal state */}
                           <div className="w-full p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-between mb-2">
                             <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                               <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                             </div>
                             <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                             </div>
                           </div>

                           {/* Alert state */}
                           <div className="w-full p-5 rounded-xl border-2 border-orange-200 bg-orange-50 shadow-lg shadow-orange-500/10 flex flex-col gap-3 group-hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                             <div className="flex justify-between items-start">
                               <div className="flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                 <span className="text-sm font-bold text-orange-700">Deviation Detected</span>
                               </div>
                               <span className="text-[10px] font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded">NOW</span>
                             </div>
                             <div className="space-y-1.5 pl-1">
                               <div className="h-2 w-full bg-orange-200/50 rounded-full"></div>
                               <div className="h-2 w-3/4 bg-orange-200/50 rounded-full"></div>
                             </div>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 bg-transparent border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-cyan-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[0].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-orange-500 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[1].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-teal-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[2].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
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
