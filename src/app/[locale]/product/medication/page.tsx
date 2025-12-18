import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModuleNavigation from "@/components/ModuleNavigation";

export default function MedicationPage() {
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
                <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">OCR</span>
                <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">Instant</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                Medication Manager
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Stop manually typing medication lists. Simply snap a photo of a medication box, 
                printed list, or handwritten notes - our AI extracts all details instantly.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all shadow-lg hover:-translate-y-1">
                  Try It Now
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-[20px] border border-gray-200 shadow-2xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                  
                  <div className="flex items-center gap-8">
                    {/* Phone with scan */}
                    <div className="relative w-32 h-44 bg-gray-50 rounded-2xl border-2 border-gray-200 flex flex-col items-center pt-4 overflow-hidden shadow-lg">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-3"></div>
                      <div className="w-24 h-28 bg-white rounded-lg shadow-inner border border-gray-100 flex items-center justify-center relative overflow-hidden">
                        {/* Medication list simulation */}
                        <div className="space-y-2 w-16 p-2">
                          <div className="h-1 bg-gray-300 w-full rounded"></div>
                          <div className="h-1 bg-gray-200 w-4/5 rounded"></div>
                          <div className="h-1 bg-gray-300 w-full rounded"></div>
                          <div className="h-1 bg-gray-200 w-3/4 rounded"></div>
                          <div className="h-1 bg-gray-300 w-full rounded"></div>
                        </div>
                        
                        {/* Scan line */}
                        <div className="absolute w-full h-0.5 bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] animate-scan"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-100 rounded-full mt-2"></div>
                    </div>

                    {/* Arrow */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-300">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>

                    {/* Extracted data card */}
                    <div className="w-40 bg-white rounded-xl border border-violet-100 shadow-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-violet-100 rounded-md flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                            <path d="m8.5 8.5 7 7"/>
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-[#2B3B53]">Extracted</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Name</span>
                          <span className="text-[10px] font-medium text-[#2B3B53]">Omeprazole</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Dosage</span>
                          <span className="text-[10px] font-medium text-[#2B3B53]">10mg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Frequency</span>
                          <span className="text-[10px] font-medium text-[#2B3B53]">1x Daily</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">Form</span>
                          <span className="text-[10px] font-medium text-[#2B3B53]">Capsule</span>
                        </div>
                      </div>
                      <div className="mt-3 bg-green-50 text-green-700 text-[8px] font-bold py-1 px-2 rounded text-center">
                        ADDED TO RECORD
                      </div>
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
               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-violet-200 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                        <circle cx="12" cy="13" r="3"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Photo Recognition</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Advanced OCR technology reads medication details from any source - boxes, printed lists, or even handwritten notes.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-violet-200 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" x2="8" y1="13" y2="13"/>
                        <line x1="16" x2="8" y1="17" y2="17"/>
                        <line x1="10" x2="8" y1="9" y2="9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Complete Extraction</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Automatically extracts medication name, dosage, form, frequency, and prescription details in one scan.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-violet-200 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Instant Integration</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Extracted data flows directly into the patient record - no manual typing, no transcription errors.
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


