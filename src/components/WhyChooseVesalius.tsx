'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  className?: string;
}

const ShieldIcon = ({ color }: { color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const LanguageVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 bg-gray-50 rounded-2xl p-3 shadow-sm border border-gray-100">
      <span className="text-gray-400 text-sm">Hola, ¿cómo estás?</span>
    </div>
    <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/4 bg-[#20BBC0] rounded-2xl p-3 shadow-lg shadow-[#20BBC0]/20">
      <span className="text-white text-sm font-medium">Hello, how are you?</span>
    </div>
  </div>
);

const TriageVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="w-48 space-y-3">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <div className="w-20 h-2 bg-gray-100 rounded-full" />
        </div>
        <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">✓</div>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-16 h-2 bg-gray-100 rounded-full" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center justify-between opacity-40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-24 h-2 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const LiabilityVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="bg-white w-24 h-32 md:w-32 md:h-40 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center pt-6 relative overflow-hidden">
      <div className="w-12 md:w-16 h-2 bg-gray-100 rounded-full mb-3" />
      <div className="w-16 md:w-20 h-2 bg-gray-100 rounded-full mb-3" />
      <div className="w-10 md:w-14 h-2 bg-gray-100 rounded-full" />
      
      <div className="absolute bottom-0 w-full h-12 md:h-16 bg-gradient-to-t from-red-50/50 to-transparent flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-red-100">
           <ShieldIcon color="#FF3366" /> 
        </div>
      </div>
    </div>
  </div>
);

const CareVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#20BBC0]/5 to-transparent" />
    <div className="relative z-10 w-20 h-20 rounded-full bg-white shadow-lg shadow-[#20BBC0]/10 flex items-center justify-center border border-[#20BBC0]/20">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#20BBC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </div>
    {/* Pulse waves */}
    <div className="absolute z-0 w-32 h-32 rounded-full border border-[#20BBC0]/10 animate-ping opacity-20" />
  </div>
);

const AccuracyVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      {/* Dashed Ring */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#0B759F" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.3" />
      </svg>
      {/* Markers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#0B759F]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#0B759F]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#0B759F]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-1 bg-[#0B759F]" />
      
      {/* Center Check */}
      <div className="absolute inset-0 m-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0B759F]/5 flex items-center justify-center">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0B759F] flex items-center justify-center shadow-lg shadow-[#0B759F]/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const ArrowUpRight = () => (
  <div className="absolute top-8 right-8 z-20">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300 transition-colors duration-300 group-hover:text-[#06ACC1]">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  </div>
);

const features: FeatureItem[] = [
  {
    id: 1,
    title: "Break the language barrier",
    description: "Vesalius helps you understand your patients, no matter the language.",
    icon: <LanguageVisual />,
    color: "bg-gray-50",
    className: "lg:col-span-7",
  },
  {
    id: 3,
    title: "Liability",
    description: "Vesalius keeps a clear record of interactions, reducing liability and ensuring compliance.",
    icon: <LiabilityVisual />,
    color: "bg-gray-50",
    className: "lg:col-span-5",
  },
  {
    id: 4,
    title: "Better care",
    description: "Automate intakes to reduce administration so you can focus on what matters.",
    icon: <CareVisual />,
    color: "bg-gray-50",
    className: "lg:col-span-5",
  },
  {
    id: 5,
    title: "Improve your accuracy",
    description: "Eliminate manual errors and ensure consistent patient records.",
    icon: <AccuracyVisual />,
    color: "bg-gray-50",
    className: "lg:col-span-7",
  },
];

export default function WhyChooseVesalius() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3B53]">
            "The AI platform for patient conversations <br className="hidden md:block" />
            built for specialists, by specialists"
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-8 relative overflow-hidden group hover:shadow-md transition-shadow h-[280px] md:h-[320px] ${feature.className}`}
            >
              <ArrowUpRight />
              
              <h3 className="text-xl md:text-2xl font-bold text-[#2B3B53] mb-2 pr-8">{feature.title}</h3>
              <p className="text-gray-500 max-w-md mb-6 text-xs md:text-sm">
                {feature.description}
              </p>
              
              {/* Visual Area */}
              <div className="absolute bottom-0 left-0 right-0 h-48 w-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center transform translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}