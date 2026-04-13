import type { Metadata } from 'next';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";
import { buildPageMetadata, resolveSiteLocale } from '@/lib/seo';

const copyByLocale = {
  en: {
    badges: ["OCR", "Instant"],
    title: "Medication Manager",
    description:
      "Stop manually typing medication lists. Simply snap a photo of a medication box, printed list, or handwritten notes - our AI extracts all details instantly.",
    cta: "Try It Now",
    features: [
      {
        title: "Photo Recognition",
        description:
          "Advanced OCR technology reads medication details from any source - boxes, printed lists, or even handwritten notes.",
      },
      {
        title: "Complete Extraction",
        description:
          "Automatically extracts medication name, dosage, form, frequency, and prescription details in one scan.",
      },
      {
        title: "Instant Integration",
        description:
          "Extracted data flows directly into the patient record - no manual typing, no transcription errors.",
      },
    ],
    story: {
      problem: {
        eyebrow: "The Challenge",
        title: "Manual Medication Entry",
        description:
          "Doctors waste valuable time manually typing long lists of patient medications from paper lists, boxes, or handwritten notes into the Electronic Medical Record. It's slow and prone to transcription errors.",
      },
      solution: {
        eyebrow: "The Vesalius Solution",
        title: "Instant AI Photo Extraction",
        description:
          "Simply take a photo of any medication list or box. Our advanced OCR technology immediately reads, understands, and structures the drug names, dosages, and frequencies.",
      },
      result: {
        eyebrow: "The Result",
        title: "Zero-Error Patient Records",
        description:
          "The perfectly structured medication list is instantly synced to the patient's record with a single click. Save time, eliminate transcription mistakes, and ensure patient safety.",
      }
    }
  },
  fr: {
    badges: ["OCR", "Instantané"],
    title: "Gestion des traitements",
    description:
      "Fini la saisie manuelle des traitements. Prenez simplement en photo une boîte de médicament, une liste imprimée ou des notes manuscrites : notre IA extrait immédiatement toutes les informations utiles.",
    cta: "Essayer maintenant",
    features: [
      {
        title: "Reconnaissance photo",
        description:
          "Une technologie OCR avancée lit les détails du traitement à partir de tout support : boîtes, listes imprimées ou même notes manuscrites.",
      },
      {
        title: "Extraction complète",
        description:
          "Le nom du médicament, le dosage, la forme, la fréquence et les détails de prescription sont extraits automatiquement en un seul scan.",
      },
      {
        title: "Intégration immédiate",
        description:
          "Les données extraites alimentent directement le dossier patient, sans ressaisie ni erreur de transcription.",
      },
    ],
    story: {
      problem: {
        eyebrow: "Le défi",
        title: "Saisie manuelle fastidieuse",
        description:
          "Les médecins perdent un temps précieux à saisir manuellement de longues listes de médicaments à partir de feuilles, de boîtes ou de notes manuscrites. C'est lent et source d'erreurs de transcription.",
      },
      solution: {
        eyebrow: "La solution Vesalius",
        title: "Extraction photo instantanée",
        description:
          "Prenez simplement une photo de toute liste ou boîte de médicaments. Notre technologie OCR avancée lit, comprend et structure immédiatement les noms, dosages et fréquences.",
      },
      result: {
        eyebrow: "Le résultat",
        title: "Dossiers patients sans erreur",
        description:
          "La liste de médicaments parfaitement structurée est instantanément synchronisée avec le dossier du patient en un seul clic. Gagnez du temps et éliminez les erreurs.",
      }
    }
  },
  nl: {
    badges: ["OCR", "Direct"],
    title: "Medicatiebeheer",
    description:
      "Stop met het handmatig overtypen van medicatielijsten. Maak gewoon een foto van een medicatiedoosje, geprinte lijst of handgeschreven notities en onze AI haalt meteen alle details eruit.",
    cta: "Probeer het nu",
    features: [
      {
        title: "Fotodetectie",
        description:
          "Geavanceerde OCR-technologie leest medicatiegegevens uit elke bron: doosjes, geprinte lijsten en zelfs handgeschreven notities.",
      },
      {
        title: "Volledige extractie",
        description:
          "Naam, dosering, vorm, frequentie en voorschriftgegevens worden in één scan automatisch uitgelezen.",
      },
      {
        title: "Direct geïntegreerd",
        description:
          "De uitgelezen gegevens stromen rechtstreeks naar het patiëntendossier, zonder manueel typen of transcriptiefouten.",
      },
    ],
    story: {
      problem: {
        eyebrow: "De uitdaging",
        title: "Handmatige medicatie-invoer",
        description:
          "Artsen verspillen kostbare tijd met het handmatig overtypen van lange lijsten met medicatie vanaf papieren lijsten, doosjes of handgeschreven notities. Het is traag en vatbaar voor fouten.",
      },
      solution: {
        eyebrow: "De Vesalius oplossing",
        title: "Directe AI-foto-extractie",
        description:
          "Maak simpelweg een foto van een medicatielijst of doosje. Onze geavanceerde OCR-technologie leest, begrijpt en structureert onmiddellijk de namen, doseringen en frequenties.",
      },
      result: {
        eyebrow: "Het resultaat",
        title: "Foutloze patiëntendossiers",
        description:
          "De perfect gestructureerde medicatielijst wordt met één klik direct gesynchroniseerd met het patiëntendossier. Bespaar tijd, elimineer transcriptiefouten en verhoog de veiligheid.",
      }
    }
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveSiteLocale(await getLocale());

  return buildPageMetadata({
    locale,
    pathname: '/product/medication',
    title: 'Medication Manager',
    description:
      'Extract medication names, dosage, frequency, and forms from photos, printed lists, or handwritten notes with Vesalius medication workflows.',
  });
}

export default async function MedicationPage() {
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
            <span className="inline-block bg-violet-50 text-violet-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-violet-100/50">{copy.badges[0]}</span>
            <span className="inline-block bg-violet-50 text-violet-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm border border-violet-100/50">{copy.badges[1]}</span>
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
           <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-violet-400/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-pink-400/20 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="w-full py-8 md:py-16 bg-transparent relative -mt-8 md:-mt-16">
         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* Story Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-[100px] bottom-[100px] w-px bg-gradient-to-b from-red-200 via-violet-200 to-emerald-200 -translate-x-1/2 -z-10"></div>

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
                        
                        <div className="flex flex-col gap-4 relative z-10 items-center">
                           {/* Messy paper notes visual */}
                           <div className="w-48 h-56 bg-[#FFF9C4] rounded border border-[#FBE9E7] shadow-md transform -rotate-6 p-4 flex flex-col space-y-3 relative">
                              <div className="w-full h-1 bg-gray-200/50"></div>
                              <div className="w-3/4 h-2 bg-gray-400 rounded-full skew-x-3"></div>
                              <div className="w-1/2 h-2 bg-gray-300 rounded-full -skew-x-2"></div>
                              <div className="w-full h-1 bg-gray-200/50 mt-2"></div>
                              <div className="w-5/6 h-2 bg-gray-400 rounded-full skew-x-1"></div>
                              <div className="w-2/3 h-2 bg-gray-300 rounded-full -skew-x-3"></div>
                              
                              <div className="absolute -bottom-2 -right-2 bg-red-50 text-red-500 text-[10px] font-bold py-1 px-2 rounded-full border border-red-100 shadow-sm flex items-center gap-1 transform rotate-12">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                Tedious to copy
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
                     <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-violet-100 shadow-2xl shadow-violet-500/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex justify-center items-center relative z-10">
                           {/* Phone with scan */}
                           <div className="relative w-36 h-52 bg-slate-50 rounded-[2rem] border-4 border-slate-200 flex flex-col items-center pt-4 overflow-hidden shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                             <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-3"></div>
                             <div className="w-28 h-32 bg-white rounded-lg shadow-inner border border-slate-100 flex items-center justify-center relative overflow-hidden">
                               {/* Target Box */}
                               <div className="w-20 h-24 border-2 border-dashed border-violet-300 rounded-md flex flex-col items-center justify-center p-2 opacity-50">
                                  <div className="h-2 w-full bg-slate-200 rounded-full mb-2"></div>
                                  <div className="h-1.5 w-3/4 bg-slate-200 rounded-full mb-1"></div>
                                  <div className="h-1.5 w-1/2 bg-slate-200 rounded-full"></div>
                               </div>
                               
                               {/* Scan line */}
                               <div className="absolute w-full h-0.5 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.9)] animate-scan"></div>
                             </div>
                           </div>
                           
                           {/* Magic highlight sweep */}
                           <div className="absolute inset-0 w-[200%] -left-[100%] h-full bg-gradient-to-r from-transparent via-violet-100/30 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_infinite]"></div>
                        </div>
                     </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-violet-100 rounded-full items-center justify-center z-10 shadow-lg shadow-violet-500/20">
                     <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 lg:pl-12 text-center lg:text-left relative">
                     <div className="inline-block bg-violet-50 text-violet-600 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-violet-100">
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
                        
                        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                           {/* Extracted data card */}
                           <div className="w-full bg-white rounded-xl border border-emerald-100 shadow-lg p-5 group-hover:-translate-y-1 transition-transform duration-300">
                             <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                               <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                   <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                   <path d="m9 12 2 2 4-4"/>
                                 </svg>
                               </div>
                               <span className="text-sm font-bold text-[#0B1B3D]">Extracted Successfully</span>
                             </div>
                             
                             <div className="space-y-3">
                               <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                 <span className="text-xs text-slate-500 font-medium">Medication</span>
                                 <span className="text-xs font-bold text-[#0B1B3D]">Omeprazole</span>
                               </div>
                               <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                 <span className="text-xs text-slate-500 font-medium">Dosage</span>
                                 <span className="text-xs font-bold text-[#0B1B3D]">20mg</span>
                               </div>
                               <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                 <span className="text-xs text-slate-500 font-medium">Frequency</span>
                                 <span className="text-xs font-bold text-[#0B1B3D]">1x Daily</span>
                               </div>
                             </div>
                             
                             <div className="mt-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 border border-emerald-100">
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                               SYNCED TO EMR
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
               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-violet-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                        <circle cx="12" cy="13" r="3"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[0].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-violet-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" x2="8" y1="13" y2="13"/>
                        <line x1="16" x2="8" y1="17" y2="17"/>
                        <line x1="10" x2="8" y1="9" y2="9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{copy.features[1].title}</h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-3xl border border-slate-200/60 bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-emerald-600 shadow-inner">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
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
