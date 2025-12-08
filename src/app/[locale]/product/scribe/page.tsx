import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ScribePage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-24 pb-20 md:pt-32 md:pb-24 bg-white relative overflow-hidden border-b border-gray-100">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left">
              <div className="inline-block py-1 px-3 rounded-full bg-[#FF3366]/10 text-[#FF3366] font-semibold text-sm mb-6 tracking-wide uppercase">
                Scribe Module
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                Ambient Clinical Scribe
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Focus on your patient, not your screen. Vesalius Scribe listens in the background 
                and automatically generates accurate clinical notes from your natural conversation.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all shadow-lg hover:-translate-y-1">
                  Start Recording
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-[20px] border border-gray-200 shadow-2xl p-8 flex items-center justify-center aspect-video">
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
      <section className="w-full py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#FF3366]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" x2="12" y1="19" y2="22"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Ambient Listening</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Capture the entire consultation without intrusive hardware. Works on your existing desktop or mobile device.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#FF3366]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Speaker Separation</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Advanced diarization technology accurately distinguishes between the doctor, patient, and family members.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#FF3366]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Privacy First</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Data is processed securely and is fully HIPAA & GDPR compliant. No audio is stored permanently.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section className="w-full flex flex-col bg-white border-t border-gray-100">
        <Footer />
      </section>
    </main>
  );
}
