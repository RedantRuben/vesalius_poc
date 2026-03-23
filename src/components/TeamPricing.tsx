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

type BillingCycle = 'monthly' | 'yearly';

interface PlanPrice {
  price: string;
  period?: string;
  note?: string;
}

interface TeamPricingProps {
  billingCycle: BillingCycle;
}

export default function TeamPricing({ billingCycle }: TeamPricingProps) {
  const locale = useLocale();
  const copy =
    locale === 'fr'
      ? {
          eyebrow: 'Entreprise',
          title: 'Besoin de plus de flexibilité ?',
          plans: [
            {
              name: 'Équipe',
              pricing: {
                monthly: { price: '€299', period: '/mois' },
                yearly: { price: '€254', period: '/mois', note: 'Facturé annuellement' },
              },
              description: 'Idéal pour les cabinets avec plusieurs médecins. Une collaboration efficace à un tarif accessible.',
              buttonText: 'Commencer',
              features: ['Utilisation illimitée', 'Jusqu’à 5 soignants', 'Coût mensuel prévisible', 'Espace de travail centralisé', 'Résiliable à tout moment', 'Support prioritaire'],
            },
            {
              name: 'Organisation',
              price: { price: 'Tarif', period: 'sur mesure' },
              description: 'Vous avez plus de 5 médecins dans votre organisation ? Nous proposons des solutions personnalisées pour les grands cabinets et les hôpitaux.',
              buttonText: 'Contacter l’équipe',
              features: ['Utilisation illimitée pour les grandes équipes', 'Support prioritaire spécialisé', 'Intégrations personnalisées', 'Account manager dédié', 'SLA entreprise', 'Plan tarifaire sur mesure'],
            },
          ],
        }
      : locale === 'nl'
        ? {
            eyebrow: 'Enterprise',
            title: 'Meer flexibiliteit nodig?',
            plans: [
              {
                name: 'Team',
                pricing: {
                  monthly: { price: '€299', period: '/maand' },
                  yearly: { price: '€254', period: '/maand', note: 'Jaarlijks gefactureerd' },
                },
                description: 'Ideaal voor praktijken met meerdere artsen. Efficiënte samenwerking aan één betaalbare prijs.',
                buttonText: 'Aan de slag',
                features: ['Onbeperkt gebruik', 'Tot 5 zorgverleners', 'Voorspelbare maandelijkse kost', 'Gecentraliseerde werkruimte', 'Op elk moment opzegbaar', 'Prioritaire ondersteuning'],
              },
              {
                name: 'Organisatie',
                price: { price: 'Prijs op', period: 'maat' },
                description: 'Heeft u meer dan 5 artsen in uw organisatie? Wij bieden oplossingen op maat voor grotere praktijken en ziekenhuizen.',
                buttonText: 'Contacteer sales',
                features: ['Onbeperkt gebruik voor grote teams', 'Gespecialiseerde prioritaire ondersteuning', 'Integraties op maat', 'Toegewijde accountmanager', 'Enterprise SLA', 'Prijsplan op maat'],
              },
            ],
          }
        : {
            eyebrow: 'Enterprise',
            title: 'Need more flexibility?',
            plans: [
              {
                name: 'Team',
                pricing: {
                  monthly: { price: '€299', period: '/month' },
                  yearly: { price: '€254', period: '/month', note: 'Billed annually' },
                },
                description: 'Ideal for practices with multiple doctors. Efficient collaboration, one affordable price.',
                buttonText: 'Get Started',
                features: ['Unlimited usage', 'Up to 5 healthcare providers', 'Predictable monthly cost', 'Centralised workspace', 'Cancel any time', 'Priority support'],
              },
              {
                name: 'Organisation',
                price: { price: 'Custom', period: 'pricing' },
                description: 'Do you have more than 5 doctors in your organisation? We offer custom solutions for larger practices and hospitals.',
                buttonText: 'Contact Sales',
                features: ['Unlimited usage for large teams', 'Specialised priority support', 'Customised integrations', 'Dedicated account manager', 'Enterprise SLA', 'Tailored price plan'],
              },
            ],
          };
  return (
    <section className="w-full bg-[#FCFCFD] relative pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[#06ACC1] font-semibold tracking-wider uppercase text-sm mb-4">{copy.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] tracking-tight mb-4">
            {copy.title}
          </h2>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {copy.plans.map((plan, index) => {
            const activePrice: PlanPrice = 'pricing' in plan ? plan.pricing[billingCycle] : plan.price;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="glass-panel bg-white/60 border border-white/80 rounded-[32px] p-8 md:p-10 flex flex-col hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 h-full group"
              >
                <div className="mb-10 border-b border-slate-100 pb-8">
                  <h3 className="text-xl font-bold tracking-tight mb-6 text-[#0B1B3D]">
                    {plan.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-6">
                    <span className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#0B1B3D]">
                      {activePrice.price}
                    </span>
                    {activePrice.period && (
                      <span className="text-lg font-bold tracking-tight text-slate-400">
                        {activePrice.period}
                      </span>
                    )}
                  </div>
                  {activePrice.note ? (
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#06ACC1]">
                      {activePrice.note}
                    </p>
                  ) : null}
                  <p className="text-sm leading-relaxed font-light text-slate-500">
                      {plan.description}
                  </p>
                </div>

                <div className="space-y-5 flex-grow mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckIcon />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/contactus?intent=pricing&plan=${encodeURIComponent(plan.name)}&billing=${billingCycle}`}
                  className="w-full py-4 rounded-full font-bold tracking-wide transition-all flex items-center justify-center gap-2 group-hover:bg-[#0B1B3D] group-hover:text-white group-hover:border-transparent bg-white text-[#0B1B3D] border border-slate-200 shadow-sm"
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
