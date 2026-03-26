import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    badge: "Agenda Module",
    title: "Smart Scheduling & Booking",
    description:
      "Intelligently manage appointments and optimize your schedule based on individual patient needs. Vesalius Agenda turns a chaotic calendar into a fluid, stress-free clinic day.",
    cta: "Optimize Your Schedule",
    windowTitle: "Vesalius Calendar",
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Disorganized Agendas Cost You Time and Energy",
        description:
          "Doctors and clinical staff waste countless hours manually scheduling, dealing with no-shows, and managing disorganized daily agendas. Overlapping appointments and unexpected gaps create bottlenecks and stress before the patient even arrives.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Intelligent Calendar Management",
        description:
          "Vesalius Agenda intelligently manages your appointments in the background. It automatically flags gaps, prioritizes urgent cases via Smart Triage, and syncs seamlessly with the pre-consultation flow. It acts as an autonomous assistant for your front desk.",
      },
      result: {
        eyebrow: "The Result",
        title: "A Fluid, Stress-Free Clinic Day",
        description:
          "Waiting times are minimized and staff administrative burden is significantly reduced. You walk into your practice with a perfectly organized overview of your day, allowing you to focus entirely on patient care.",
      }
    }
  },
  fr: {
    badge: "Module Agenda",
    title: "Planification et réservation intelligentes",
    description:
      "Gérez intelligemment les rendez-vous et optimisez votre emploi du temps en fonction des besoins individuels des patients. L'Agenda Vesalius transforme un calendrier chaotique en une journée de clinique fluide et sans stress.",
    cta: "Optimiser mon agenda",
    windowTitle: "Calendrier Vesalius",
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Les agendas désorganisés vous coûtent du temps et de l'énergie",
        description:
          "Les médecins et le personnel clinique perdent d'innombrables heures à planifier manuellement, à gérer les absences et à organiser des emplois du temps désordonnés. Les rendez-vous qui se chevauchent et les imprévus créent du stress avant même l'arrivée du patient.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Gestion intelligente du calendrier",
        description:
          "L'Agenda Vesalius gère intelligemment vos rendez-vous en arrière-plan. Il signale automatiquement les créneaux libres, priorise les cas urgents via le Triage Intelligent, et se synchronise parfaitement avec le flux de pré-consultation.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Une journée de clinique fluide et sans stress",
        description:
          "Les temps d'attente sont minimisés et la charge administrative du personnel est considérablement réduite. Vous arrivez au cabinet avec une vue d'ensemble parfaitement organisée, vous permettant de vous concentrer sur les soins.",
      }
    }
  },
  nl: {
    badge: "Agenda-module",
    title: "Slimme Planning & Boeking",
    description:
      "Beheer intelligent uw afspraken en optimaliseer uw agenda op basis van individuele patiëntbehoeften. Vesalius Agenda transformeert een chaotische kalender in een vloeiende, stressvrije werkdag.",
    cta: "Optimaliseer uw agenda",
    windowTitle: "Vesalius Kalender",
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Ongeorganiseerde agenda's kosten tijd en energie",
        description:
          "Artsen en klinisch personeel verspillen talloze uren aan het handmatig inplannen, het omgaan met no-shows en het beheren van ongeorganiseerde dagelijkse agenda's. Overlappende afspraken en onverwachte gaten creëren stress voordat de patiënt arriveert.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Intelligent kalenderbeheer",
        description:
          "Vesalius Agenda beheert uw afspraken intelligent op de achtergrond. Het markeert automatisch gaten, geeft prioriteit aan urgente gevallen via Smart Triage, en synchroniseert naadloos met de pre-consultatie flow.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Een vloeiende, stressvrije werkdag",
        description:
          "Wachttijden worden geminimaliseerd en de administratieve last voor het personeel wordt aanzienlijk verminderd. U stapt uw praktijk binnen met een perfect georganiseerd overzicht, zodat u zich volledig op de patiënt kunt concentreren.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/agenda',
    title: 'Smart Scheduling & Booking Agenda',
    description:
      'Intelligently manage appointments and optimize your schedule with the Vesalius Agenda module. Turn a chaotic calendar into a fluid, stress-free clinic day.',
  });
}

export default async function AgendaPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-12 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-blue-100/50">
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-blue-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-emerald-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-12">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-blue-200 to-emerald-200 -translate-x-1/2 -z-10"></div>

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
                        
                        {/* Messy Calendar UI Representation */}
                        <div className="flex justify-between items-center mb-6">
                           <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                           </div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                        </div>

                        <div className="space-y-3 relative z-10">
                           <div className="flex items-stretch gap-3">
                              <div className="w-12 text-xs text-slate-400 font-medium pt-2">09:00</div>
                              <div className="flex-1 bg-slate-100/80 rounded-xl p-3 border border-slate-200/50">
                                 <div className="h-2 w-1/2 bg-slate-300 rounded-full mb-2"></div>
                                 <div className="h-2 w-1/4 bg-slate-200 rounded-full"></div>
                              </div>
                           </div>
                           <div className="flex items-stretch gap-3">
                              <div className="w-12 text-xs text-red-400 font-bold pt-2">09:30</div>
                              <div className="flex-1 bg-red-50 rounded-xl p-3 border border-red-100 shadow-sm relative -ml-2 translate-x-2">
                                 <div className="h-2 w-2/3 bg-red-300 rounded-full mb-2"></div>
                                 <div className="h-2 w-1/3 bg-red-200 rounded-full"></div>
                                 <div className="absolute right-3 top-3 text-[10px] font-bold text-red-500 uppercase tracking-wider">Overlap</div>
                              </div>
                           </div>
                           <div className="flex items-stretch gap-3 opacity-50 grayscale">
                              <div className="w-12 text-xs text-slate-400 font-medium pt-2">10:00</div>
                              <div className="flex-1 bg-slate-50 border border-slate-200 border-dashed rounded-xl p-3 flex items-center justify-center">
                                 <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">No-Show</span>
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
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-blue-100 shadow-2xl shadow-blue-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                           <div className="text-sm font-bold text-[#0B1B3D] tracking-tight">{copy.windowTitle}</div>
                           <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="m8 10 4 4"/><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/></svg>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           <div className="flex gap-4 items-center bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50 group-hover:-translate-y-1 transition-transform duration-300">
                              <div className="w-1.5 h-10 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-1/3"></div>
                                    <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded-full">Triage: High</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/4"></div>
                              </div>
                           </div>
                           
                           <div className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                              <div className="w-1.5 h-10 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-1/2"></div>
                                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">Synced</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/3"></div>
                              </div>
                           </div>
                           
                           <div className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                              <div className="w-1.5 h-10 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                              <div className="flex-1">
                                 <div className="flex justify-between items-center mb-1.5">
                                    <div className="h-2.5 bg-slate-700 rounded-full w-2/5"></div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Routine</div>
                                 </div>
                                 <div className="h-2 bg-slate-300 rounded-full w-1/4"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-blue-100 rounded-full items-center justify-center z-10 shadow-lg shadow-blue-500/20">
                     <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-blue-100">
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
