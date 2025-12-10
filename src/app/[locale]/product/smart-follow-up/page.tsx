import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";

export default function SmartFollowUpPage() {
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
              <div className="flex gap-2 mb-6">
                <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">Automated</span>
                <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">Alerts</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                Smart Follow-ups
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Automated check-ins that flag at-risk patients. Get alerts when responses deviate, enabling early intervention.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all shadow-lg hover:-translate-y-1">
                  Get Started
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-[20px] border border-gray-200 shadow-2xl p-8 flex flex-col justify-center min-h-[300px]">
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-2">Smart Follow-ups</h3>
                  <p className="text-sm text-gray-500 mb-8">Automated check-ins that flag at-risk patients.</p>

                  <div className="relative pt-4 pb-8">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                        <span>Started</span>
                        <span>Questionnaire</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#06ACC1] w-[75%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Alert */}
                  <div className="mt-4 flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <div className="shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-orange-700 text-sm">Deviation Detected</h4>
                        <p className="text-xs text-orange-600 mt-1">Patient response requires clinical review.</p>
                    </div>
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
               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#06ACC1]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Automated Monitoring</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Automatically send follow-up questionnaires based on procedure type and recovery timeline.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#06ACC1]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Risk Detection</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Instant alerts when patient reported outcomes deviate from the expected recovery path.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#06ACC1]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Better Outcomes</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Catch complications early and improve long-term patient satisfaction and health outcomes.
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
