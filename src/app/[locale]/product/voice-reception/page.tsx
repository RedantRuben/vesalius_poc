import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    badge: "Voice Reception Module",
    title: "AI Phone Assistant & Triage",
    description:
      "An AI phone assistant that answers patient calls, asks the right questions to assess urgency, and guides them to the correct care or books an appointment directly in your agenda.",
    cta: "Automate Your Calls",
    windowTitle: "Vesalius Voice Assistant",
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "The Front Desk is Overwhelmed by Calls",
        description:
          "Constant phone rings disrupt patient flow and create immense stress for the medical secretariat. A large volume of calls are routine queries or simple appointment bookings, while truly urgent cases risk being put on hold.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Intelligent Phone Triage",
        description:
          "Vesalius Voice Reception acts as a first line of defense. The AI answers immediately, assesses the urgency based on clinical protocols, handles routine bookings autonomously, and routes complex or urgent issues directly to the right staff.",
      },
      result: {
        eyebrow: "The Result",
        title: "A Calm Front Desk and Better Care",
        description:
          "The phone barely rings for routine tasks anymore. The secretariat regains control over their day, patients get instant answers or bookings without waiting on hold, and urgent cases are never missed.",
      }
    }
  },
  fr: {
    badge: "Module Voice Reception",
    title: "Assistant Téléphonique IA et Triage",
    description:
      "Un assistant téléphonique IA qui répond aux appels, pose les bonnes questions pour évaluer l'urgence et oriente les patients vers les soins adaptés ou réserve directement un rendez-vous.",
    cta: "Automatiser vos appels",
    windowTitle: "Assistant Vocal Vesalius",
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "L'accueil est submergé par les appels",
        description:
          "Les sonneries constantes perturbent le flux des patients et créent un stress immense pour le secrétariat médical. Les cas vraiment urgents risquent d'être mis en attente.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Triage téléphonique intelligent",
        description:
          "Vesalius Voice Reception agit comme une première ligne de défense. L'IA répond immédiatement, évalue l'urgence selon les protocoles cliniques, gère les réservations de routine en toute autonomie, et achemine les problèmes complexes ou urgents directement au bon personnel.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Un accueil serein et de meilleurs soins",
        description:
          "Le téléphone ne sonne presque plus pour les tâches de routine. Le secrétariat reprend le contrôle de sa journée, les patients obtiennent des réponses ou des réservations instantanées sans attendre, et les cas urgents ne sont jamais manqués.",
      }
    }
  },
  nl: {
    badge: "Voice Reception-module",
    title: "AI Telefoonassistent & Triage",
    description:
      "Een AI-telefoonassistent die patiëntoproepen beantwoordt, de juiste vragen stelt om de urgentie in te schatten en patiënten naar de juiste zorg leidt of direct een afspraak inboekt.",
    cta: "Automatiseer uw oproepen",
    windowTitle: "Vesalius Voice Assistant",
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Het onthaal wordt overspoeld door telefoontjes",
        description:
          "Constante telefoontjes verstoren de patiëntenstroom en creëren enorme stress voor het medisch secretariaat. Een groot deel van de oproepen betreft routinevragen of eenvoudige afspraakboekingen, terwijl echt dringende gevallen het risico lopen in de wacht te worden gezet.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Intelligente telefonische triage",
        description:
          "Vesalius Voice Reception fungeert als eerste verdedigingslinie. De AI antwoordt onmiddellijk, beoordeelt de urgentie op basis van klinische protocollen, handelt routineboekingen autonoom af en stuurt complexe of urgente problemen rechtstreeks door naar het juiste personeel.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Een rustig onthaal en betere zorg",
        description:
          "De telefoon rinkelt nauwelijks nog voor routinetaken. Het secretariaat krijgt weer controle over de dag, patiënten krijgen direct antwoord of een afspraak zonder in de wacht te staan, en urgente gevallen worden nooit meer gemist.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/voice-reception',
    title: 'AI Phone Assistant & Triage',
    description:
      'An AI phone assistant that answers patient calls, asks the right questions to assess urgency, and guides them to the correct care or books an appointment directly in your agenda.',
  });
}

export default async function VoiceReceptionPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-12 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-indigo-100/50">
            {copy.badge}
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-cyan-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-12">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-indigo-200 to-emerald-200 -translate-x-1/2 -z-10"></div>

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
                        
                        {/* Overflowing Call UI Representation */}
                        <div className="flex justify-between items-center mb-6">
                           <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                           </div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>

                        <div className="space-y-3 relative z-10">
                           <div className="flex items-stretch gap-3">
                              <div className="w-12 text-xs text-red-400 font-bold pt-2">08:31</div>
                              <div className="flex-1 bg-red-50 rounded-xl p-3 border border-red-100 shadow-sm relative">
                                 <div className="h-2 w-2/3 bg-red-300 rounded-full mb-2"></div>
                                 <div className="h-2 w-1/3 bg-red-200 rounded-full"></div>
                                 <div className="absolute right-3 top-3 text-[10px] font-bold text-red-500 uppercase tracking-wider">Missed</div>
                              </div>
                           </div>
                           <div className="flex items-stretch gap-3 opacity-80">
                              <div className="w-12 text-xs text-red-400 font-bold pt-2">08:32</div>
                              <div className="flex-1 bg-red-50 rounded-xl p-3 border border-red-100 shadow-sm relative">
                                 <div className="h-2 w-1/2 bg-red-300 rounded-full mb-2"></div>
                                 <div className="h-2 w-1/4 bg-red-200 rounded-full"></div>
                                 <div className="absolute right-3 top-3 text-[10px] font-bold text-red-500 uppercase tracking-wider">On Hold</div>
                              </div>
                           </div>
                           <div className="flex items-stretch gap-3 opacity-50 grayscale">
                              <div className="w-12 text-xs text-slate-400 font-medium pt-2">08:35</div>
                              <div className="flex-1 bg-slate-50 border border-slate-200 border-dashed rounded-xl p-3 flex items-center justify-center">
                                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Voicemail</span>
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
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-indigo-100 shadow-2xl shadow-indigo-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                           <div className="text-sm font-bold text-[#0B1B3D] tracking-tight">{copy.windowTitle}</div>
                           <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           <div className="flex gap-4 items-center bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/50 group-hover:-translate-y-1 transition-transform duration-300">
                              <div className="w-1.5 h-10 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-1/3"></div>
                                    <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-100 px-2 py-0.5 rounded-full">Call Answered</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/4"></div>
                              </div>
                           </div>
                           
                           <div className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                              <div className="w-1.5 h-10 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,172,193,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-1/2"></div>
                                    <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded-full">Context Gathered</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/3"></div>
                              </div>
                           </div>
                           
                           <div className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                              <div className="w-1.5 h-10 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-2/5"></div>
                                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">Directly Booked</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/4"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-indigo-100 rounded-full items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                     <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-indigo-100">
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
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-10 border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 relative overflow-hidden flex flex-col items-center justify-center text-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
                        
                        <div className="relative">
                           <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-700"></div>
                           <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 mb-6 relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                           </div>
                        </div>

                        <div className="space-y-2 relative z-10">
                           <div className="h-3 w-32 bg-slate-800 rounded-full mx-auto mb-4"></div>
                           <div className="h-2 w-48 bg-slate-200 rounded-full mx-auto"></div>
                           <div className="h-2 w-40 bg-slate-200 rounded-full mx-auto"></div>
                        </div>
                     </div>
                  </div>
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
