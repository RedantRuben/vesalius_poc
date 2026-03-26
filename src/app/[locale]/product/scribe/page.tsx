import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    badge: "Scribe Module",
    title: "Ambient Clinical Scribe",
    description:
      "Focus on your patient, not your screen. Vesalius Scribe listens in the background and automatically generates accurate clinical notes from your natural conversation.",
    cta: "Start Recording",
    windowTitle: "Vesalius Scribe",
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "The Burden of Clinical Documentation",
        description:
          "Doctors spend hours every day typing notes, looking at screens instead of patients, and catching up on administration after hours. This leads to burnout and diminishes the quality of the patient-doctor connection.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Ambient Listening Technology",
        description:
          "Vesalius Scribe listens in the background during your consultation via your phone or computer. Our advanced AI perfectly separates speakers, understands medical terminology, and captures the complete clinical picture without you ever touching a keyboard.",
      },
      result: {
        eyebrow: "The Result",
        title: "Focus Completely on Your Patient",
        description:
          "You regain eye contact and presence with your patients. At the end of the consultation, a perfectly formatted, highly accurate clinical note is ready for your review and one-click export to the EMR.",
      }
    }
  },
  fr: {
    badge: "Module Scribe",
    title: "Scribe clinique ambiant",
    description:
      "Concentrez-vous sur votre patient, pas sur votre écran. Vesalius Scribe écoute en arrière-plan et génère automatiquement des notes cliniques fiables à partir de votre échange naturel.",
    cta: "Lancer l'enregistrement",
    windowTitle: "Scribe Vesalius",
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Le fardeau de la documentation clinique",
        description:
          "Les médecins passent des heures chaque jour à taper des notes, regardant des écrans au lieu de leurs patients, et rattrapant l'administration après les heures de travail. Cela mène à l'épuisement et nuit à la relation médecin-patient.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Technologie d'écoute ambiante",
        description:
          "Le Scribe Vesalius écoute en arrière-plan pendant la consultation via votre téléphone ou ordinateur. Notre IA avancée sépare parfaitement les interlocuteurs, comprend le jargon médical et saisit le tableau clinique complet sans que vous n'ayez à toucher un clavier.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Concentrez-vous entièrement sur votre patient",
        description:
          "Vous retrouvez le contact visuel et la présence avec vos patients. À la fin de la consultation, une note clinique parfaitement formatée et très précise est prête à être révisée et exportée vers le DMI en un clic.",
      }
    }
  },
  nl: {
    badge: "Scribe-module",
    title: "Ambient clinical scribe",
    description:
      "Focus op uw patiënt, niet op uw scherm. Vesalius Scribe luistert op de achtergrond mee en zet een natuurlijk gesprek automatisch om in nauwkeurige klinische notities.",
    cta: "Start opname",
    windowTitle: "Vesalius Scribe",
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "De last van klinische documentatie",
        description:
          "Artsen spenderen dagelijks uren aan het typen van notities, staren naar schermen in plaats van naar patiënten, en halen administratie in na de uren. Dit leidt tot burn-out en vermindert de kwaliteit van de arts-patiënt relatie.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Ambient listening technologie",
        description:
          "Vesalius Scribe luistert op de achtergrond mee tijdens uw consultatie via uw telefoon of computer. Onze geavanceerde AI scheidt perfect de sprekers, begrijpt medische terminologie en capteert het volledige klinische beeld zonder dat u een toetsenbord hoeft aan te raken.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Focus u volledig op uw patiënt",
        description:
          "U herwint oogcontact en aanwezigheid bij uw patiënten. Aan het einde van de consultatie staat een perfect geformatteerde, uiterst nauwkeurige klinische nota klaar voor uw review en met één klik exporteerbaar naar het EPD.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/scribe',
    title: 'Ambient Clinical Scribe',
    description:
      'Capture consultations with an ambient clinical scribe that separates speakers and turns conversations into secure, structured clinical notes.',
  });
}

export default async function ScribePage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-12 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-rose-100/50">
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-rose-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-orange-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-12">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-rose-200 to-orange-200 -translate-x-1/2 -z-10"></div>

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
                        
                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                           </div>
                           <div className="flex-1">
                              <div className="h-2.5 bg-slate-200 rounded-full w-2/3 mb-2"></div>
                              <div className="h-1.5 bg-slate-100 rounded-full w-1/2"></div>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           <div className="flex items-center gap-2">
                              <div className="w-1 h-4 bg-red-400 rounded-full animate-pulse"></div>
                              <div className="text-xs font-medium text-slate-400">Typing...</div>
                           </div>
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                              <div className="h-2 w-full bg-slate-300 rounded-full mb-3"></div>
                              <div className="h-2 w-5/6 bg-slate-200 rounded-full mb-3"></div>
                              <div className="h-2 w-4/6 bg-slate-200 rounded-full mb-3"></div>
                              <div className="h-2 w-full bg-slate-200 rounded-full mb-3"></div>
                              <div className="h-2 w-1/3 bg-red-200 rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* 2. THE SOLUTION */}
               <div className="relative flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                  {/* Left Side: Visual */}
                  <div className="flex-1 w-full lg:pr-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group">
                        
                        <div className="flex justify-between items-center mb-10">
                           <div className="text-sm font-bold text-[#0B1B3D] tracking-tight">{copy.windowTitle}</div>
                           <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-rose-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                              Recording
                           </div>
                        </div>

                        <div className="flex flex-col items-center justify-center relative z-10 py-4">
                           {/* Glowing Mic */}
                           <div className="relative flex items-center justify-center mb-12">
                               <div className="absolute w-24 h-24 bg-rose-500/30 rounded-full blur-xl animate-pulse" />
                               <div className="relative w-20 h-20 bg-gradient-to-tr from-[#FF3366] to-rose-400 rounded-3xl flex items-center justify-center shadow-xl shadow-rose-500/30 z-10 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                      <line x1="12" x2="12" y1="19" y2="22" />
                                    </svg>
                               </div>
                           </div>

                           {/* Elegant Waveform */}
                           <div className="flex items-center justify-center gap-1.5 h-16 w-full">
                               {[20, 40, 24, 60, 32, 80, 40, 24, 48, 20].map((height, i) => (
                                   <div
                                       key={i}
                                       className="w-1.5 rounded-full bg-gradient-to-t from-rose-500 to-rose-300 transition-all duration-300"
                                       style={{ 
                                          height: `${height}%`,
                                       }}
                                   />
                               ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-rose-100 rounded-full items-center justify-center z-10 shadow-lg shadow-rose-500/20">
                     <div className="w-4 h-4 bg-rose-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-rose-100">
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
                     <div className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-orange-100">
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
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-orange-100 rounded-full items-center justify-center z-10 shadow-lg shadow-orange-500/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>

                  {/* Right Side: Visual */}
                  <div className="flex-1 w-full lg:pl-12">
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-orange-100/50 shadow-2xl shadow-orange-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/40 via-transparent to-transparent"></div>
                        
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center border border-orange-100/50 text-orange-500">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                           </div>
                           <div className="flex-1 flex justify-between items-center border-b border-slate-100 pb-2">
                              <div className="h-3 bg-slate-200 rounded-full w-32"></div>
                              <div className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">SOAP</div>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10 pl-2 border-l-2 border-orange-100/50 ml-4">
                           <div className="relative">
                              <div className="absolute -left-[23px] top-1 w-3 h-3 bg-white border-2 border-orange-300 rounded-full"></div>
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subjective</h4>
                              <div className="h-2 w-full bg-slate-100 rounded-full mb-1.5"></div>
                              <div className="h-2 w-4/5 bg-slate-100 rounded-full mb-1.5"></div>
                              <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                           </div>

                           <div className="relative pt-2">
                              <div className="absolute -left-[23px] top-3 w-3 h-3 bg-white border-2 border-orange-400 rounded-full"></div>
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Objective</h4>
                              <div className="h-2 w-full bg-slate-200 rounded-full mb-1.5"></div>
                              <div className="h-2 w-5/6 bg-slate-200 rounded-full"></div>
                           </div>
                           
                           <div className="relative pt-2">
                              <div className="absolute -left-[23px] top-3 w-3 h-3 bg-white border-2 border-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div>
                              <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Assessment & Plan</h4>
                              <div className="h-2 w-full bg-orange-50 rounded-full mb-1.5"></div>
                              <div className="h-2 w-3/4 bg-orange-50 rounded-full"></div>
                           </div>
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