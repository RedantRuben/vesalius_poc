'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const teamPlans = [
  {
    name: "Team",
    price: "€254",
    period: "/month",
    description: "Ideal for practices with multiple doctors. Efficient collaboration, one affordable price.",
    buttonText: "Get Started",
    features: [
      "Unlimited usage",
      "Up to 5 healthcare providers",
      "Predictable monthly cost",
      "Centralised workspace",
      "Cancel any time",
      "Priority support"
    ]
  },
  {
    name: "Organisation",
    price: "Custom Pricing",
    period: "",
    description: "Do you have more than 5 doctors in your organisation? We offer custom solutions for larger practices and hospitals.",
    buttonText: "Get Started",
    features: [
      "Unlimited usage, special support, and customised integrations at a tailored price."
    ]
  }
];

export default function TeamPricing() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-6 h-full flex flex-col justify-center py-8 md:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-lg">
            Need more flexibility?
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white rounded-[15px] border border-[#F2F2F2] shadow-sm p-8 md:p-10 flex flex-col hover:shadow-md transition-shadow h-full"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-[#2B3B53] mb-6">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-6">
                  <span className={`font-bold text-[#2B3B53] ${plan.price === "Custom Pricing" ? "text-3xl" : "text-5xl"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed px-4 min-h-[60px]">
                    {plan.description.split(/(\s+)/).map((part, i) => {
                      if (['multiple', 'doctors.', 'custom', 'solutions'].includes(part.trim())) {
                        return <strong key={i} className="font-bold text-[#2B3B53]">{part}</strong>
                      }
                      return part;
                   })}
                </p>
              </div>

              <button className="w-full py-3 rounded-[15px] font-medium transition-all mb-8 bg-white text-[#06ACC1] border border-[#06ACC1] hover:bg-cyan-50">
                {plan.buttonText}
              </button>

              <div className="space-y-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="text-center text-gray-500 text-sm"
        >
           Yearly payment (save 15%), switch to <a href="#" className="text-[#06ACC1] underline hover:text-[#0597a9]">monthly payments</a>
        </motion.div>
      </div>
    </section>
  );
}

