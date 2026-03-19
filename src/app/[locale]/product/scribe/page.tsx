import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";
import { getLocale } from "next-intl/server";

const copyByLocale = {
  en: {
    badge: "Scribe Module",
    title: "Ambient Clinical Scribe",
    description:
      "Focus on your patient, not your screen. Vesalius Scribe listens in the background and automatically generates accurate clinical notes from your natural conversation.",
    cta: "Start Recording",
    features: [
      {
        title: "Ambient Listening",
        description:
          "Capture the entire consultation without intrusive hardware. Works on your existing desktop or mobile device.",
      },
      {
        title: "Speaker Separation",
        description:
          "Advanced diarization technology accurately distinguishes between the doctor, patient, and family members.",
      },
      {
        title: "Privacy First",
        description:
          "Data is processed securely and is fully HIPAA & GDPR compliant. No audio is stored permanently.",
      },
    ],
  },
  fr: {
    badge: "Module Scribe",
    title: "Scribe clinique ambiant",
    description:
      "Concentrez-vous sur votre patient, pas sur votre écran. Vesalius Scribe écoute en arrière-plan et génère automatiquement des notes cliniques fiables à partir de votre échange naturel.",
    cta: "Lancer l'enregistrement",
    features: [
      {
        title: "Écoute ambiante",
        description:
          "Capturez l'intégralité de la consultation sans matériel intrusif. Fonctionne sur votre ordinateur ou votre mobile actuel.",
      },
      {
        title: "Séparation des intervenants",
        description:
          "Une diarisation avancée distingue avec précision le médecin, le patient et les éventuels proches présents.",
      },
      {
        title: "Confidentialité avant tout",
        description:
          "Les données sont traitées de manière sécurisée et conforme au RGPD et à la HIPAA. Aucun audio n'est conservé durablement.",
      },
    ],
  },
  nl: {
    badge: "Scribe-module",
    title: "Ambient clinical scribe",
    description:
      "Focus op uw patiënt, niet op uw scherm. Vesalius Scribe luistert op de achtergrond mee en zet een natuurlijk gesprek automatisch om in nauwkeurige klinische notities.",
    cta: "Start opname",
    features: [
      {
        title: "Ambient listening",
        description:
          "Leg het volledige consult vast zonder storende hardware. Werkt op uw bestaande desktop of mobiele toestel.",
      },
      {
        title: "Sprekers scheiden",
        description:
          "Geavanceerde diarization-technologie onderscheidt nauwkeurig de arts, de patiënt en eventuele familieleden.",
      },
      {
        title: "Privacy eerst",
        description:
          "Gegevens worden veilig verwerkt en zijn volledig GDPR- en HIPAA-conform. Audio wordt niet permanent bewaard.",
      },
    ],
  },
} as const;

export default async function ScribePage() {
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
              <div className="inline-block bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6">
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
               <div className="relative z-10 bg-white rounded-2xl border border-slate-200/60 shadow-xl p-8 flex items-center justify-center aspect-video">
                  <div className="relative">
                     {/* Pulsing Effect */}
                     <div className="absolute inset-0 bg-[#FF3366]/20 rounded-full animate-ping" />
                     <div className="relative w-24 h-24 bg-gradient-to-br from-[#FF3366] to-[#ff6b85] rounded-full flex items-center justify-center shadow-xl shadow-[#FF3366]/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" x2="12" y1="19" y2="22" />
                        </svg>
                     </div>
                  </div>
                  
                  {/* Audio Waveform Simulation */}
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center items-end gap-1 h-8 px-12">
                     {[...Array(20)].map((_, i) => (
                        <div key={i} 
                             className="w-1 bg-[#FF3366]/40 rounded-full" 
                             style={{ height: `${Math.random() * 100}%` }} 
                        />
                     ))}
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
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" x2="12" y1="19" y2="22"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[0].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[0].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">{copy.features[1].title}</h3>
                  <p className="text-gray-500 leading-relaxed">
                     {copy.features[1].description}
                  </p>
               </div>

               <div className="p-8 md:p-10 rounded-2xl border border-slate-200/60 bg-white hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
