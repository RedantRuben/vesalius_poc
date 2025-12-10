import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";

export default function SmartTriagePage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20 font-sans">
      <Navbar />
      <ModuleNavigation />
      
      {/* Hero Section */}
      <section className="w-full pt-24 pb-20 md:pt-32 md:pb-24 bg-white relative overflow-hidden border-b border-gray-100">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-left">
              <div className="inline-block py-1 px-3 rounded-full bg-[#0B759F]/10 text-[#0B759F] font-semibold text-sm mb-6 tracking-wide uppercase">
                Coming Soon
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                Smart Triage & Routing
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Intelligent urgency assessment that prioritizes patients based on clinical need.
                Ensure the right patient sees the right doctor at the right time.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all shadow-lg hover:-translate-y-1">
                  Join Waitlist
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-[20px] border border-gray-200 shadow-2xl p-8 flex flex-col gap-4 justify-center min-h-[300px]">
                  {/* Triage Cards */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-100">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">Chest Pain</div>
                           <div className="text-xs text-gray-500">High Priority</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded border border-red-100">Immediate</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 border border-yellow-100 opacity-80">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">Migraine</div>
                           <div className="text-xs text-gray-500">Medium Priority</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-yellow-600 bg-white px-2 py-1 rounded border border-yellow-100">48h</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100 opacity-60">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                           <div className="font-bold text-gray-800 text-sm">Prescription</div>
                           <div className="text-xs text-gray-500">Low Priority</div>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded border border-green-100">Routine</span>
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
               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#0B759F]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8"/>
                        <rect width="16" height="12" x="4" y="8" rx="2"/>
                        <path d="M2 14h2"/>
                        <path d="M20 14h2"/>
                        <path d="M15 13v2"/>
                        <path d="M9 13v2"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">AI Assessment</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Algorithms analyze symptoms and history to assign a clinical urgency score automatically.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#0B759F]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="18" r="3"/>
                        <circle cx="6" cy="6" r="3"/>
                        <path d="M6 21V9a9 9 0 0 0 9 9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Intelligent Routing</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Direct patients to the appropriate resource: ER, Specialist, GP, or Self-care advice.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#0B759F]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B759F]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B759F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Workload Balancing</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Distribute patient load effectively across your team to prevent burnout and reduce wait times.
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
