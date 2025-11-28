import Image from 'next/image';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 fill-gray-400 ml-0.5">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 text-center overflow-hidden w-full h-full py-24 md:py-0">
        {/* Background Gradient - Mobile Only */}
        <div className="absolute inset-0 overflow-hidden md:hidden pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[70%] h-[40%] bg-[#06ACC1]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[10%] right-[10%] w-[70%] h-[40%] bg-[#2B3B53]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Floating Elements */}
        {/* Left Image - 320 Views */}
        <div className="absolute top-[20%] left-[5%] lg:left-[10%] w-64 -rotate-6 hidden md:block z-0 animate-float">
             <div className="transform transition-transform hover:scale-105 duration-500">
                <Image 
                    src="/320.png" 
                    alt="Stats View" 
                    width={300} 
                    height={150} 
                    className="w-full h-auto rounded-[20px]"
                    quality={100}
                 />
             </div>
        </div>
        
        {/* Right Image - Stats Breakdown */}
        <div className="absolute top-[60%] right-[-2%] lg:right-[5%] xl:right-[10%] rotate-[6deg] hidden md:block z-0 animate-float-delayed">
            <div className="transform transition-transform hover:scale-105 duration-500">
                <Image 
                    src="/statsright.png" 
                    alt="Stats Breakdown" 
                    width={400} 
                    height={100} 
                    className="h-[88px] w-auto rounded-[20px]" 
                    quality={100}
                />
            </div>
        </div>

        <div className="z-10 flex flex-col items-center max-w-4xl mx-auto flex-1 justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#2B3B53] mb-6 md:mb-8 leading-[1.1] pt-4">
                Your Digital <br className="hidden md:block" />
                <span className="text-[#06ACC1]">Medical Assistant</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-10 md:mb-12 leading-relaxed px-4">
                Powered by Your Expertise, <span className="font-bold text-[#2B3B53]">Enhanced by AI</span>. Experience the next generation of clinical workflow automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all flex items-center justify-center gap-2 text-base hover:-translate-y-1">
                    Meet your Digital Medical Assistant
                    <span className="text-lg leading-none mb-0.5">↗</span>
                </button>
                
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 text-base group hover:-translate-y-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                        <PlayIcon />
                    </div>
                    Watch Demo
                </button>
            </div>
        </div>
    </section>
  );
}

