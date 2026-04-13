'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06ACC1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#06ACC1]">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="stroke-[#06ACC1]/20 fill-[#06ACC1]/5"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const CheckIconWhite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="stroke-cyan-400/30 fill-cyan-400/10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

type BillingCycle = 'monthly' | 'yearly';

interface PlanPrice {
  price: string;
  period?: string;
  note?: string;
}

function getActivePrice(
  plan: { price?: PlanPrice; pricing?: Partial<Record<BillingCycle, PlanPrice>> },
  billingCycle: BillingCycle,
) {
  if (plan.pricing?.[billingCycle]) {
    return plan.pricing[billingCycle];
  }

  return plan.price;
}

interface PricingProps {
  billingCycle: BillingCycle;
  onBillingCycleChange: (cycle: BillingCycle) => void;
}

export default function Pricing({
  billingCycle,
  onBillingCycleChange,
}: PricingProps) {
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? {
          eyebrow: 'Tarifs',
          title: 'Tarification transparente et équitable',
          subtitle: 'Choisissez l’offre adaptée à votre cabinet',
          monthlyLabel: 'Mensuel',
          yearlyLabel: 'Annuel',
          savingsLabel: 'Économisez 15 %',
          staticPlanHint: 'Les offres Gratuit et Paiement à l’usage restent identiques.',
          plans: [
            {
              name: 'Gratuit',
              price: { price: '€0' },
              description: 'Commencez dès aujourd’hui, sans engagement, et découvrez ce que notre solution peut apporter à votre pratique.',
              buttonText: 'Commencer',
              isPopular: false,
              features: ['20 crédits gratuits pour démarrer', 'Aucune carte bancaire requise', 'Parfait pour tester notre solution', 'Support standard'],
            },
            {
              name: 'Paiement à l’usage',
              price: { price: '€1.50', period: '/crédit' },
              description: 'La flexibilité de payer uniquement ce que vous utilisez. Idéal pour les besoins variables et les activités saisonnières.',
              buttonText: 'Commencer',
              isPopular: false,
              features: ['Payez uniquement ce que vous utilisez', 'Paliers prédéfinis', 'Remises sur volume disponibles', 'Flexible selon vos besoins', 'Support standard'],
            },
            {
              name: 'Individuel',
              pricing: {
                monthly: { price: '€99', period: '/mois' },
                yearly: { price: '€84', period: '/mois', note: 'Facturé annuellement' },
              },
              description: 'Utilisation illimitée pour un médecin, sans suivi de crédits. Simple et prévisible.',
              buttonText: 'Commencer',
              isPopular: true,
              popularLabel: 'Le plus populaire',
              features: ['Utilisation illimitée', 'Parfait pour 1 médecin', 'Coût mensuel prévisible', 'Résiliable à tout moment', 'Support prioritaire'],
            },
          ],
        }
      : locale === 'nl'
        ? {
            eyebrow: 'Prijzen',
            title: 'Transparante en eerlijke prijzen',
            subtitle: 'Kies het plan dat bij uw praktijk past',
            monthlyLabel: 'Maandelijks',
            yearlyLabel: 'Jaarlijks',
            savingsLabel: 'Bespaar 15%',
            staticPlanHint: 'Gratis en betalen per gebruik blijven hetzelfde.',
            plans: [
              {
                name: 'Gratis',
                price: { price: '€0' },
                description: 'Start vandaag zonder verplichtingen en ontdek wat onze oplossing voor uw praktijk kan betekenen.',
                buttonText: 'Aan de slag',
                isPopular: false,
                features: ['20 gratis credits om te starten', 'Geen kredietkaart nodig', 'Perfect om onze oplossing uit te proberen', 'Standaard ondersteuning'],
              },
              {
                name: 'Betalen per gebruik',
                price: { price: '€1.50', period: '/credit' },
                description: 'De flexibiliteit om alleen te betalen voor wat u gebruikt. Perfect voor wisselende noden en seizoensgebonden praktijken.',
                buttonText: 'Aan de slag',
                isPopular: false,
                features: ['Betaal alleen voor wat u gebruikt', 'Vooraf gedefinieerde bundels', 'Volumekorting beschikbaar', 'Flexibel volgens uw behoeften', 'Standaard ondersteuning'],
              },
              {
                name: 'Individueel',
                pricing: {
                  monthly: { price: '€99', period: '/maand' },
                  yearly: { price: '€84', period: '/maand', note: 'Jaarlijks gefactureerd' },
                },
                description: 'Onbeperkt gebruik voor één arts zonder credits op te volgen. Eenvoudig en voorspelbaar.',
                buttonText: 'Aan de slag',
                isPopular: true,
                popularLabel: 'Meest gekozen',
                features: ['Onbeperkt gebruik', 'Perfect voor 1 arts', 'Voorspelbare maandelijkse kost', 'Op elk moment opzegbaar', 'Prioritaire ondersteuning'],
              },
            ],
          }
        : {
            eyebrow: 'Pricing',
            title: 'Transparent and fair pricing',
            subtitle: 'Choose the plan that fits your practice',
            monthlyLabel: 'Monthly',
            yearlyLabel: 'Yearly',
            savingsLabel: 'Save 15%',
            staticPlanHint: 'Free and pay-as-you-use stay the same.',
            plans: [
              {
                name: 'Free',
                price: { price: '€0' },
                description: 'Start today with no obligations and see what our solution can do for your practice.',
                buttonText: 'Get Started',
                isPopular: false,
                features: ['20 free credits to start', 'No credit card required', 'Perfect for trying our service', 'Standard support'],
              },
              {
                name: 'Pay-as-you-use',
                price: { price: '€1.50', period: '/credit' },
                description: 'The flexibility to only pay for what you use. Perfect for variable needs and seasonal practices.',
                buttonText: 'Get Started',
                isPopular: false,
                features: ['Pay only for what you use', 'Predefined buckets', 'Volume discounts available', 'Flexible for your needs', 'Standard support'],
              },
              {
                name: 'Individual',
                pricing: {
                  monthly: { price: '€99', period: '/month' },
                  yearly: { price: '€84', period: '/month', note: 'Billed annually' },
                },
                description: 'Unlimited usage for one doctor without tracking credits. Simple and predictable.',
                buttonText: 'Get Started',
                isPopular: true,
                popularLabel: 'Most Popular',
                features: ['Unlimited usage', 'Perfect for 1 doctor', 'Predictable monthly cost', 'Cancel any time', 'Priority support'],
              },
            ],
          };
  return (
    <section className="w-full bg-[#FCFCFD] relative py-12 md:py-16">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4">{copy.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B3D] tracking-tight mb-4">
            {copy.title}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-light mb-8">
            {copy.subtitle}
          </p>
          <div className="inline-flex flex-col items-center gap-3">
            <div className="inline-flex rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur-sm">
              {(['monthly', 'yearly'] as BillingCycle[]).map((cycle) => {
                const isActive = billingCycle === cycle;
                const label = cycle === 'monthly' ? copy.monthlyLabel : copy.yearlyLabel;
                return (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => onBillingCycleChange(cycle)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0B1B3D] text-white shadow-[0_8px_18px_-10px_rgba(11,27,61,0.55)]'
                        : 'text-slate-500 hover:text-[#0B1B3D]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="text-sm font-medium text-slate-500">
              {billingCycle === 'yearly' ? (
                <>
                  <span className="text-[#06ACC1]">{copy.savingsLabel}</span>
                  {' · '}
                </>
              ) : null}
              {copy.staticPlanHint}
            </p>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto w-full">
          {copy.plans.map((plan, index) => {
            const isDark = plan.isPopular;
            const activePrice = getActivePrice(plan, billingCycle);

            if (!activePrice) {
              return null;
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className={`relative rounded-[32px] p-8 md:p-10 flex flex-col h-full transition-transform duration-500 hover:-translate-y-2 ${
                  isDark 
                    ? 'bg-[#0B1B3D] shadow-2xl shadow-[#0B1B3D]/30 border border-white/10 lg:scale-105 z-20 glow-effect' 
                    : 'glass-panel bg-white/60 border border-white/80 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] z-10'
                }`}
              >
                {/* Popular Badge */}
                {isDark && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#06ACC1] blur-md opacity-50 rounded-full"></div>
                      <div className="relative bg-gradient-to-r from-[#06ACC1] to-[#0597a9] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg border border-white/20">
                        {plan.popularLabel}
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-10 border-b border-white/10 pb-8">
                  <h3 className={`text-xl font-bold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-[#0B1B3D]'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className={`text-5xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-[#0B1B3D]'}`}>
                      {activePrice.price}
                    </span>
                    {activePrice.period && (
                      <span className={`ml-2 text-sm font-medium tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {activePrice.period}
                      </span>
                    )}
                  </div>
                  {activePrice.note ? (
                    <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-cyan-300/80' : 'text-[#06ACC1]'}`}>
                      {activePrice.note}
                    </p>
                  ) : null}
                  <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                     {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-5 flex-grow mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 flex-shrink-0">
                        {isDark ? <CheckIconWhite /> : <CheckIcon />}
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/contactus?intent=pricing&plan=${encodeURIComponent(plan.name)}&billing=${billingCycle}`}
                  className={`w-full py-4 rounded-2xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 group ${
                    isDark
                      ? 'bg-[#06ACC1] text-white hover:bg-white hover:text-[#0B1B3D] shadow-lg shadow-[#06ACC1]/20'
                      : 'bg-white text-[#0B1B3D] border border-slate-200 hover:border-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white shadow-sm'
                  }`}
                >
                  {plan.buttonText}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
