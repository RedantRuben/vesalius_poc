import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Hero');

  return (
    <section className="relative flex flex-col items-center justify-start px-4 text-center overflow-hidden w-full pt-24 md:pt-32 pb-12 md:pb-20">
        {/* Background Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Background Gradient - Mobile Only */}
        <div className="absolute inset-0 overflow-hidden md:hidden pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[70%] h-[40%] bg-[#06ACC1]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[10%] right-[10%] w-[70%] h-[40%] bg-[#2B3B53]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Floating Elements - Desktop Only - Original Style & Placement */}
        {/* Left Image - 320 Views */}
        <div className="absolute top-[15%] left-1/2 -translate-x-[550px] lg:-translate-x-[700px] w-64 -rotate-6 hidden md:block z-0">
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
        <div className="absolute top-[35%] left-1/2 translate-x-[350px] lg:translate-x-[500px] rotate-[6deg] hidden md:block z-0">
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

        <div className="z-10 flex flex-col items-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#2B3B53] mb-6 md:mb-8 leading-[1.1]">
                {t('titlePrefix')} <br className="hidden md:block" />
                <span className="text-[#06ACC1]">{t('titleSuffix')}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-10 md:mb-12 leading-relaxed px-4">
                {t.rich('subtitle', {
                  bold: (chunks) => <span className="font-bold text-[#2B3B53]">{chunks}</span>
                })}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 md:mb-24">
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#06ACC1] text-white font-bold hover:bg-[#0597a9] transition-all flex items-center justify-center gap-2 text-base hover:-translate-y-1 shadow-lg shadow-[#06ACC1]/20">
                    {t('ctaPrimary')}
                    <span className="text-lg leading-none mb-0.5">↗</span>
                </button>
                
                <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 text-base group hover:-translate-y-1 hover:shadow-md">
                    <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                        <PlayIcon />
                    </div>
                    {t('ctaSecondary')}
                </button>
            </div>

            {/* Dashboard Preview - Both Mobile & Desktop */}
            <div className="w-full max-w-[90rem] relative perspective-1000 mx-auto px-2 sm:px-6 lg:px-8 mt-8">
                <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                        src="/screen.png"
                        alt="App Screenshot"
                        width={1400}
                        height={900}
                        className="rounded-md shadow-2xl ring-1 ring-gray-900/10 w-full h-auto"
                        quality={100}
                        priority
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button className="w-24 h-24 md:w-32 md:h-32 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm transition-all hover:scale-110 group">
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#06ACC1]/10 flex items-center justify-center group-hover:bg-[#06ACC1]/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14 text-[#06ACC1] ml-1">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Gradient overlay for bottom fade integration */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-20"></div>
            </div>
        </div>
    </section>
  );
}
