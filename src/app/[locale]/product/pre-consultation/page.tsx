import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

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
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Incomplete Context Before Consultations",
        description:
          "Doctors often walk into a consultation room completely blind to the patient's actual needs. Time is wasted asking basic questions, trying to understand the timeline of symptoms, or overcoming language barriers.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Intelligent AI Triage & Intake",
        description:
          "Vesalius proactively contacts the patient via WhatsApp before their visit. Our multilingual AI conducts a conversational interview to gather symptoms, history, and context without requiring the patient to download any app.",
      },
      result: {
        eyebrow: "The Result",
        title: "Ready For Meaningful Care",
        description:
          "You start the consultation with a fully structured summary of the patient's complaints already in your EMR. The language barrier is eliminated, and you can focus immediately on diagnosis and treatment.",
      }
    }
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
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Un contexte incomplet avant la consultation",
        description:
          "Les médecins entrent souvent en salle de consultation sans connaître les besoins réels du patient. Du temps précieux est perdu à poser des questions de base ou à surmonter la barrière de la langue.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Triage et recueil intelligents par l'IA",
        description:
          "Vesalius contacte le patient de manière proactive via WhatsApp avant sa visite. Notre IA multilingue mène un entretien conversationnel pour recueillir les symptômes et l'historique sans aucune application à télécharger.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Prêt pour des soins de qualité",
        description:
          "Vous débutez la consultation avec un résumé parfaitement structuré des plaintes du patient, déjà intégré à votre DMI. La barrière de la langue disparaît, et vous vous concentrez immédiatement sur le diagnostic.",
      }
    }
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
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Onvolledige context voor de consultatie",
        description:
          "Artsen stappen vaak blind een consultatieruimte binnen. Kostbare tijd gaat verloren aan het stellen van basisvragen, het in kaart brengen van symptomen of het overwinnen van taalbarrières.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Intelligente AI-triage en intake",
        description:
          "Vesalius neemt proactief contact op met de patiënt via WhatsApp voor hun bezoek. Onze meertalige AI voert een conversatie om symptomen en medische geschiedenis te verzamelen, zonder dat de patiënt een app hoeft te downloaden.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Klaar voor betekenisvolle zorg",
        description:
          "U start het consult met een gestructureerde samenvatting van de klachten, al geïntegreerd in uw EPD. Taalbarrières verdwijnen en u kunt zich direct richten op de diagnose en behandeling.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/pre-consultation',
    title: 'Automated Patient Intake',
    description:
      'Automate patient intake before appointments with multilingual symptom collection, structured summaries, and workflow-ready outputs for hospitals and care teams.',
  });
}

export default async function PreConsultationPage() {
  const locale = await getLocale();
  const copy = locale === "fr" ? copyByLocale.fr : locale === "nl" ? copyByLocale.nl : copyByLocale.en;
  
  return (
    <main className="w-full bg-[#FCFCFD] relative selection:bg-primary/20 font-sans overflow-hidden">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-8 pb-8 md:pt-12 md:pb-12 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm border border-cyan-100/50">
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-cyan-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-indigo-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-12">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-cyan-200 to-indigo-200 -translate-x-1/2 -z-10"></div>

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
                        
                        <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-3">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              </div>
                              <div className="flex flex-col">
                                 <div className="h-2.5 w-24 bg-slate-200 rounded-full mb-1.5"></div>
                                 <div className="h-1.5 w-16 bg-slate-100 rounded-full"></div>
                              </div>
                           </div>
                           <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                           </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 opacity-70">
                              <div className="h-2 w-full bg-slate-200 rounded-full mb-2"></div>
                              <div className="h-2 w-3/4 bg-slate-200 rounded-full"></div>
                           </div>
                           <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-center gap-3">
                              <span className="text-sm font-semibold text-red-500">Missing Intake Information</span>
                           </div>
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 opacity-70 flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                              <div className="flex-1">
                                 <div className="h-2 w-full bg-slate-200 rounded-full mt-2"></div>
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
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 border border-cyan-100 shadow-2xl shadow-cyan-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="bg-gray-50 border-b border-gray-200 p-4 -mt-6 -mx-6 mb-4 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                              </div>
                              <div className="text-xs text-gray-400 font-medium ml-2">{copy.windowTitle}</div>
                           </div>
                           <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">WhatsApp</div>
                        </div>

                        <div className="space-y-4 relative z-10 pt-2">
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
                              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[85%] leading-relaxed">
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
                              <div className="bg-[#06ACC1] text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[85%] shadow-sm leading-relaxed">
                                 {copy.chat[1]}
                              </div>
                           </div>

                           <div className="flex gap-3 group-hover:translate-y-0 translate-y-2 opacity-50 group-hover:opacity-100 transition-all duration-500">
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
                              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[85%] leading-relaxed">
                                 {copy.chat[2]}
                              </div>
                           </div>
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
                        
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100/50">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                           </div>
                           <div className="h-3 bg-slate-100 rounded-full w-32"></div>
                        </div>

                        <div className="space-y-4 relative z-10">
                           <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm group-hover:-translate-y-1 transition-transform duration-500">
                              <div className="flex items-center gap-2 mb-3">
                                 <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Symptoms</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                              <div className="h-2 w-4/5 bg-slate-100 rounded-full"></div>
                           </div>

                           <div className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                              <div className="flex items-center gap-2 mb-3">
                                 <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Timeline</span>
                              </div>
                              <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                              <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
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