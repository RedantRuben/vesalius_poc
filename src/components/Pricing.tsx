'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const pricingPlans = [
  {
    name: "Free",
    price: "€0",
    description: "Start today with no obligations and see what our solution can do for your practice.",
    buttonText: "Get Started",
    isPopular: false,
    features: [
      "20 free credits to start",
      "No credit card required",
      "Perfect for trying our service",
      "Standard support"
    ]
  },
  {
    name: "Pay-as-you-use",
    price: "€1.5",
    period: "/credit",
    description: "The flexibility to only pay for what you use. Perfect for variable needs and seasonal practices.",
    buttonText: "Get Started",
    isPopular: false,
    features: [
      "Pay only for what you use",
      "Predefined buckets",
      "Volume discounts available",
      "Flexible for your needs",
      "Standard support"
    ]
  },
  {
    name: "Individual",
    price: "€84",
    period: "/month",
    description: "Unlimited usage for one doctor without tracking credits. Simple and predictable.",
    buttonText: "Get Started",
    isPopular: true,
    popularLabel: "Most Popular",
    features: [
      "Unlimited usage",
      "Perfect for 1 doctor",
      "Predictable monthly cost",
      "Cancel any time",
      "Priority support"
    ]
  }
];

export default function Pricing() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center py-8 md:py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3B53] mb-4">
            Transparent and fair pricing
          </h2>
          <p className="text-gray-500 text-lg">
            Choose the plan that fits your practice
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative bg-white rounded-[15px] p-8 flex flex-col ${
                plan.isPopular 
                  ? 'border-2 border-[#06ACC1] shadow-lg z-10 scale-[1.02] md:scale-105' 
                  : 'border border-[#F2F2F2] shadow-sm hover:shadow-md transition-shadow'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#06ACC1] text-white px-6 py-1.5 rounded-[15px] text-sm font-medium">
                  {plan.popularLabel}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-[#2B3B53] mb-6">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-6">
                  <span className="text-5xl font-bold text-[#2B3B53]">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed px-2 min-h-[60px]">
                   {/* Bold specific keywords based on content to match design */}
                   {plan.description.split(/(\s+)/).map((part, i) => {
                      if (['solution', 'flexibility', 'Unlimited', 'usage'].includes(part.trim())) {
                        return <strong key={i} className="font-bold text-[#2B3B53]">{part}</strong>
                      }
                      return part;
                   })}
                </p>
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-3 rounded-[15px] font-medium transition-all mb-8 ${
                  plan.isPopular
                    ? 'bg-[#06ACC1] text-white hover:bg-[#0597a9] shadow-md hover:shadow-lg'
                    : 'bg-white text-[#06ACC1] border border-[#06ACC1] hover:bg-cyan-50'
                }`}
              >
                {plan.buttonText}
              </button>

              {/* Features List */}
              <div className="space-y-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

