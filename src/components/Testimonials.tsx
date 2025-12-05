'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={filled ? "text-[#06ACC1]" : "text-gray-300"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#06ACC1]">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const testimonials = [
  {
    quote: "Patients who use the chatbot feel better prepared for their consultation, leading to a more efficient and focused conversation with the doctor.",
    name: "Farah",
    role: "Clinical Researcher"
  },
  {
    quote: "Research has shown that patients who have used Vesalius feel better understood by their doctor compared to those who haven't used Vesalius.",
    name: "Philippe",
    role: "Medisch Centrum Aalst"
  },
  {
    quote: "The general feedback from the nurses is positive; they find the platform easy to use, which results in time savings and increased efficiency in their work.",
    name: "Cynthia",
    role: "Clinical Researcher"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3B53]">
            Hear it straight from our users
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow"
            >
              <p className="text-gray-600 italic mb-6 text-sm md:text-base leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center">
                  <UserGroupIcon />
                </div>
                <div>
                  <div className="font-semibold text-[#2B3B53] flex items-center gap-2">
                    <span className="w-4 h-px bg-gray-300"></span>
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Header */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="text-center mb-6 md:mb-8"
        >
           <h3 className="text-xl md:text-2xl text-[#2B3B53] font-medium">
             Highly rated by patients and physicians throughout the entire industry
           </h3>
        </motion.div>

        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-[24px] border border-[#F2F2F2] shadow-xl shadow-gray-100/50 overflow-hidden flex flex-col md:flex-row h-auto md:h-[320px]"
        >
           {/* Image Section */}
           <div className="relative w-full md:w-1/3 h-64 md:h-full">
             <Image 
               src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=60" 
               alt="Doctor Thumbs Up" 
               fill
               className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
           </div>

           {/* Stats Content */}
           <div className="w-full md:w-2/3 p-8 md:p-10 flex flex-col justify-center bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                 {/* Left Column Stats */}
                 <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                       <span className="text-3xl font-bold text-[#2B3B53]">83%</span>
                       <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Adoption Rate</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                       <span className="text-3xl font-bold text-[#2B3B53]">8x</span>
                       <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Return On Investment</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                       <span className="text-3xl font-bold text-[#2B3B53]">19m56</span>
                       <span className="text-sm font-medium text-gray-500 uppercase tracking-wide sm:whitespace-nowrap">Average Completion Time</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                       <span className="text-3xl font-bold text-[#2B3B53]">+13%</span>
                       <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Perceived Quality</span>
                    </div>
                 </div>

                 {/* Right Column Ratings */}
                 <div className="space-y-8 flex flex-col justify-center pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-3xl font-bold text-[#2B3B53]">4.1/5</span>
                          <span className="text-sm font-medium text-gray-500 text-right uppercase tracking-wide">Patient Rating</span>
                       </div>
                       <div className="flex gap-1.5">
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-3xl font-bold text-[#2B3B53]">4.7/5</span>
                          <span className="text-sm font-medium text-gray-500 text-right uppercase tracking-wide">Physicians Rating</span>
                       </div>
                       <div className="flex gap-1.5">
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon filled />
                          <StarIcon filled />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

