import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PreConsultationPage() {
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
              <div className="inline-block py-1 px-3 rounded-full bg-[#06ACC1]/10 text-[#06ACC1] font-semibold text-sm mb-6 tracking-wide uppercase">
                Pre Consultation
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-6 leading-[1.1]">
                Automated Patient Intake
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Gather comprehensive patient history before the appointment starts. 
                Our intelligent chatbot interviews patients, understands their symptoms, 
                and structures the data for your review.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-[15px] bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all shadow-lg hover:-translate-y-1">
                  Get Started
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
               <div className="relative z-10 bg-white rounded-[20px] border border-gray-200 shadow-2xl overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs text-gray-400 font-medium ml-2">Vesalius Intake</div>
                  </div>
                  
                  <div className="p-6 space-y-4">
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
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[80%]">
                           Good morning. I understand you're experiencing some discomfort. Could you tell me where the pain is located?
                        </div>
                     </div>

                     <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="8" r="5"/>
                              <path d="M20 21a8 8 0 0 0-16 0"/>
                           </svg>
                        </div>
                        <div className="bg-[#06ACC1] text-white rounded-2xl rounded-tr-none p-3 text-sm max-w-[80%]">
                           It's mostly in my lower back, on the right side.
                        </div>
                     </div>

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
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 max-w-[80%]">
                           I see. Does the pain radiate anywhere else, like down your leg?
                        </div>
                     </div>
                     
                     {/* Typing Indicator */}
                     <div className="flex gap-2 ml-11 mt-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
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
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Multilingual Support</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Communicate with patients in 50+ languages. The AI translates everything back to your preferred language.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#06ACC1]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Whatsapp Integration</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Reach patients on the platform they use most. No app installation required for patients.
                  </p>
               </div>

               <div className="p-8 rounded-[20px] border border-[#F2F2F2] bg-white hover:border-[#06ACC1]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                     </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2B3B53] mb-3">Structured Output</h3>
                  <p className="text-gray-500 leading-relaxed">
                     Conversations are automatically converted into structured clinical summaries ready for your EMR.
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
