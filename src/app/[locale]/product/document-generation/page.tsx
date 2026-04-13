import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

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
        title: "Automated Structure",
        description: "Converts transcripts into SOAP notes, referral letters, and specific medical formats automatically.",
      },
      {
        title: "Direct EMR Integration",
        description: "Push generated documents directly to patient records without copy-pasting.",
      },
      {
        title: "Customizable Templates",
        description: "Adapt the AI output to match your hospital's specific documentation guidelines.",
      },
    ],
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Manual Typing Slows You Down",
        description:
          "Doctors spend up to two hours daily manually transcribing notes into electronic medical records. This repetitive task takes time away from patients and adds to administrative burnout.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Automated AI Formatting",
        description:
          "Our AI takes the raw output from the Scribe module and automatically structures it into perfect, professional medical documents. Whether you need a SOAP note, a referral letter, or a discharge summary, it's generated instantly.",
      },
      result: {
        eyebrow: "The Result",
        title: "Your Documents, Ready to Export",
        description:
          "Review the perfectly formatted document, make any minor tweaks, and push it directly into your EMR system with a single click. Save hours of typing every single day.",
      }
    }
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
        title: "Structure automatisée",
        description: "Convertit automatiquement les transcriptions en notes SOAP, lettres de référence et formats médicaux spécifiques.",
      },
      {
        title: "Intégration directe au DMI",
        description: "Transférez les documents générés directement dans les dossiers des patients sans faire de copier-coller.",
      },
      {
        title: "Modèles personnalisables",
        description: "Adaptez les résultats de l'IA aux directives de documentation spécifiques de votre hôpital.",
      },
    ],
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "La saisie manuelle vous ralentit",
        description:
          "Les médecins passent jusqu'à deux heures par jour à transcrire manuellement des notes dans les dossiers médicaux électroniques. Cette tâche répétitive réduit le temps consacré aux patients et accroît l'épuisement administratif.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Formatage automatisé par l'IA",
        description:
          "Notre IA prend la sortie brute du module Scribe et la structure automatiquement en documents médicaux professionnels parfaits. Qu'il s'agisse d'une note SOAP, d'une lettre de référence ou d'un résumé de sortie, tout est généré instantanément.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Vos documents, prêts à être exportés",
        description:
          "Révisez le document parfaitement formaté, apportez-y des ajustements mineurs et envoyez-le directement dans votre système DMI d'un simple clic. Gagnez des heures de frappe chaque jour.",
      }
    }
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
        title: "Geautomatiseerde structuur",
        description: "Zet transcripties automatisch om in SOAP-notities, verwijsbrieven en specifieke medische formaten.",
      },
      {
        title: "Directe EPD-integratie",
        description: "Stuur gegenereerde documenten rechtstreeks naar patiëntendossiers zonder te kopiëren en plakken.",
      },
      {
        title: "Aanpasbare sjablonen",
        description: "Pas de AI-output aan om te voldoen aan de specifieke documentatierichtlijnen van uw ziekenhuis.",
      },
    ],
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Handmatig typen vertraagt u",
        description:
          "Artsen besteden dagelijks tot twee uur aan het handmatig transcriberen van notities in elektronische patiëntendossiers. Deze repetitieve taak gaat ten koste van patiëntentijd en draagt bij aan administratieve burn-out.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Geautomatiseerde AI-opmaak",
        description:
          "Onze AI neemt de ruwe output van de Scribe-module en structureert deze automatisch tot perfecte, professionele medische documenten. Of u nu een SOAP-notitie, een verwijsbrief of een ontslagbrief nodig heeft, het wordt direct gegenereerd.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Uw documenten, klaar om te exporteren",
        description:
          "Kijk het perfect geformatteerde document na, voer kleine aanpassingen door en stuur het met één klik rechtstreeks naar uw EPD-systeem. Bespaar elke dag uren aan typwerk.",
      }
    }
  },
} as const;

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

export default async function DocumentGenerationPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-8 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-emerald-100/50">
            {copy.badge}
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-emerald-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-teal-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-16">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-cyan-200 to-emerald-200 -translate-x-1/2 -z-10"></div>

            <div className="space-y-24 md:space-y-40">
               
               {/* 1. THE PROBLEM */}
               <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Content */}
                  <div className="flex-1 lg:pr-12 text-center lg:text-right relative">
                     <div className="inline-block bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-red-100">
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
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-red-100 rounded-full items-center justify-center z-10 shadow-lg shadow-red-500/10">
                     <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                 <polyline points="14 2 14 8 20 8" />
                              </svg>
                           </div>
                           <div className="h-3 w-32 bg-slate-200 rounded-full"></div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           {/* Messy Document Representation */}
                           <div className="space-y-2">
                              <div className="flex gap-2 items-center">
                                 <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                 <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                 <div className="w-1.5 h-1.5 bg-transparent rounded-full"></div>
                                 <div className="h-2 w-5/6 bg-slate-200 rounded-full"></div>
                              </div>
                              <div className="flex gap-2 items-center">
                                 <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                 <div className="h-2 w-4/6 bg-slate-200 rounded-full"></div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-2 mt-4 bg-red-50 text-red-500 p-3 rounded-xl border border-red-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              <span className="text-xs font-bold uppercase tracking-wide">Time Consuming</span>
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
                        
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-cyan-50">
                           <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                           <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center border border-cyan-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                           </div>
                        </div>

                        <div className="space-y-5 relative z-10">
                           {/* Skeleton Document Transformation */}
                           <div className="space-y-2 group-hover:translate-x-2 transition-transform duration-500">
                              <div className="h-3 w-24 bg-cyan-200 rounded-full mb-1"></div>
                              <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                              <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                              <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                           </div>
                           
                           <div className="space-y-2 group-hover:translate-x-2 transition-transform duration-500 delay-75 mt-4">
                              <div className="h-3 w-32 bg-cyan-200 rounded-full mb-1"></div>
                              <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                              <div className="h-2 w-5/6 bg-slate-100 rounded-full"></div>
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
                     <div className="inline-block bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-emerald-100">
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
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-emerald-100 rounded-full items-center justify-center z-10 shadow-lg shadow-emerald-500/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/40 via-transparent to-transparent"></div>
                        
                        <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
                           <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                              
                              {/* Orbiting dots */}
                              <div className="absolute inset-[-10px] border border-emerald-200/50 rounded-full animate-[spin_8s_linear_infinite]">
                                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full"></div>
                                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-emerald-300 rounded-full"></div>
                              </div>
                           </div>

                           <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-3 px-6 w-full flex justify-between items-center group-hover:-translate-y-1 transition-transform duration-300">
                              <span className="text-sm font-bold text-emerald-700">Export to EMR</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                           </div>
                           
                           <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold pt-4">
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
         </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 bg-transparent border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-cyan-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[0].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-emerald-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
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
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                        <circle cx="12" cy="12" r="3"/>
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
