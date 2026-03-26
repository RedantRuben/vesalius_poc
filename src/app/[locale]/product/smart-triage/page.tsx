import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

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
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Overcrowded Waiting Rooms",
        description:
          "Emergency rooms and clinics are often overwhelmed with patients. Without proper prioritization, critical cases can be delayed, leading to worse outcomes, while non-urgent cases wait hours unnecessarily.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "AI-Powered Urgency Assessment",
        description:
          "Our intelligent triage system instantly evaluates patient symptoms, medical history, and risk factors to assign a clinical urgency score. This ensures every patient is routed to the appropriate care level immediately.",
      },
      result: {
        eyebrow: "The Result",
        title: "Right Care, Right Time",
        description:
          "Critical patients are seen immediately, while routine inquiries are directed to self-care or regular consultations. Reduce wait times, optimize staff workload, and improve patient safety.",
      }
    }
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
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Salles d'attente surchargées",
        description:
          "Les urgences et les cliniques sont souvent débordées. Sans une priorisation adéquate, les cas critiques peuvent être retardés, entraînant des complications, tandis que les cas non urgents patientent inutilement pendant des heures.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Évaluation d'urgence par l'IA",
        description:
          "Notre système de triage intelligent évalue instantanément les symptômes, les antécédents médicaux et les facteurs de risque pour attribuer un score d'urgence clinique. Chaque patient est ainsi immédiatement orienté vers le niveau de soins approprié.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Les bons soins, au bon moment",
        description:
          "Les patients critiques sont pris en charge immédiatement, tandis que les demandes de routine sont orientées vers l'auto-soin ou des consultations classiques. Réduisez les délais d'attente, optimisez la charge de travail et renforcez la sécurité.",
      }
    }
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
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Overvolle wachtkamers",
        description:
          "Spoedeisende hulp en klinieken worden vaak overspoeld met patiënten. Zonder de juiste prioriteitstelling kunnen kritieke gevallen vertraging oplopen met ernstige gevolgen, terwijl niet-urgente gevallen onnodig uren moeten wachten.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "AI-gestuurde urgentiebeoordeling",
        description:
          "Ons intelligente triagesysteem evalueert direct symptomen, medische voorgeschiedenis en risicofactoren om een klinische urgentiescore toe te kennen. Zo wordt elke patiënt onmiddellijk naar het juiste zorgniveau doorverwezen.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "De juiste zorg, op het juiste moment",
        description:
          "Kritieke patiënten worden direct geholpen, terwijl routinematige vragen worden doorverwezen naar zelfzorg of reguliere consultaties. Verkort wachttijden, optimaliseer de werkdruk en verbeter de patiëntveiligheid.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/smart-triage',
    title: 'Smart Triage & Routing',
    description:
      'Prioritize patients with AI-assisted triage, clinical urgency scoring, and routing workflows that help hospitals send the right patient to the right care path.',
  });
}

export default async function SmartTriagePage() {
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
            <span className="inline-block bg-sky-50 text-sky-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-sky-100/50">{copy.badges[0]}</span>
            <span className="inline-block bg-sky-50 text-sky-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-sky-100/50">{copy.badges[1]}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0B1B3D] mb-6 leading-[1.1] max-w-4xl mx-auto tracking-tight">
            {copy.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            {copy.description}
          </p>

          <div className="flex justify-center mb-16">
            <button className="px-8 py-4 rounded-2xl bg-[#0B1B3D] text-white font-bold hover:shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-1">
              {copy.cta}
            </button>
          </div>
        </div>

        {/* Floating Abstract UI Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-40">
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-sky-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-indigo-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-16">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-sky-200 to-indigo-200 -translate-x-1/2 -z-10"></div>

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
                                 <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                 <circle cx="9" cy="7" r="4" />
                                 <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                 <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                           </div>
                           <div className="h-3 w-40 bg-slate-200 rounded-full"></div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           {/* Messy Waiting List Representation */}
                           {[1, 2, 3].map((i) => (
                             <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${i === 1 ? 'bg-red-50 border-red-100 opacity-50' : i === 2 ? 'bg-slate-50 border-slate-100' : 'bg-red-50 border-red-100'}`}>
                               <div className="flex items-center gap-3">
                                  <div className={`w-3 h-3 rounded-full ${i === 2 ? 'bg-slate-300' : 'bg-red-400'}`} />
                                  <div className="space-y-1.5">
                                    <div className="w-20 h-2 bg-slate-200 rounded-full"></div>
                                    <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                                  </div>
                               </div>
                               <div className="w-10 h-3 bg-slate-200 rounded-full"></div>
                             </div>
                           ))}
                           
                           <div className="flex items-center gap-2 mt-4 bg-red-50 text-red-500 p-3 rounded-xl border border-red-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                              <span className="text-xs font-bold uppercase tracking-wide">Critical Delay Risk</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 2. THE SOLUTION */}
               <div className="relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Visual */}
                  <div className="flex-1 w-full lg:pr-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-sky-100 shadow-2xl shadow-sky-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-sky-50">
                           <div className="h-4 bg-slate-200 rounded-full w-1/3"></div>
                           <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           {/* Sorted Triage Cards */}
                           <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100 group-hover:-translate-y-1 transition-transform duration-300">
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                 <div>
                                    <div className="font-bold text-gray-800 text-sm">{copy.triageCards[0].title}</div>
                                    <div className="text-xs text-red-500 font-medium">{copy.triageCards[0].priority}</div>
                                 </div>
                              </div>
                              <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded border border-red-100">{copy.triageCards[0].timing}</span>
                           </div>

                           <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-100 opacity-90 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-amber-500" />
                                 <div>
                                    <div className="font-bold text-gray-800 text-sm">{copy.triageCards[1].title}</div>
                                    <div className="text-xs text-amber-500 font-medium">{copy.triageCards[1].priority}</div>
                                 </div>
                              </div>
                              <span className="text-xs font-bold text-amber-600 bg-white px-2 py-1 rounded border border-amber-100">{copy.triageCards[1].timing}</span>
                           </div>

                           <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-100 opacity-80 group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                 <div>
                                    <div className="font-bold text-gray-800 text-sm">{copy.triageCards[2].title}</div>
                                    <div className="text-xs text-emerald-500 font-medium">{copy.triageCards[2].priority}</div>
                                 </div>
                              </div>
                              <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded border border-emerald-100">{copy.triageCards[2].timing}</span>
                           </div>
                           
                           {/* Magic highlight sweep */}
                           <div className="absolute inset-0 w-[200%] -left-[100%] h-full bg-gradient-to-r from-transparent via-sky-100/30 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite]"></div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-sky-100 rounded-full items-center justify-center z-10 shadow-lg shadow-sky-500/20">
                     <div className="w-4 h-4 bg-sky-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-sky-100">
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
                     <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-indigo-100">
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
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-indigo-100 rounded-full items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-indigo-100/50 shadow-2xl shadow-indigo-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent"></div>
                        
                        <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
                           <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-indigo-400 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 relative">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                              
                              {/* Orbiting dots */}
                              <div className="absolute inset-[-10px] border border-indigo-200/50 rounded-full animate-[spin_8s_linear_infinite]">
                                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-400 rounded-full"></div>
                                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-indigo-300 rounded-full"></div>
                              </div>
                           </div>

                           <div className="bg-indigo-50 border border-indigo-100 rounded-xl py-3 px-6 w-full flex justify-between items-center group-hover:-translate-y-1 transition-transform duration-300">
                              <span className="text-sm font-bold text-indigo-700">Patient Safety</span>
                              <span className="text-sm font-bold text-indigo-600">Optimized</span>
                           </div>
                           
                           <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold pt-2">
                              <span>Zero Delay for Critical Care</span>
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
               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-sky-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8"/>
                        <rect width="16" height="12" x="4" y="8" rx="2"/>
                        <path d="M2 14h2"/>
                        <path d="M20 14h2"/>
                        <path d="M15 13v2"/>
                        <path d="M9 13v2"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[0].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-sky-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="18" r="3"/>
                        <circle cx="6" cy="6" r="3"/>
                        <path d="M6 21V9a9 9 0 0 0 9 9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[1].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-indigo-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
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
