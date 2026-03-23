'use client';

import { useState } from 'react';

import Pricing from '@/components/Pricing';
import TeamPricing from '@/components/TeamPricing';

type BillingCycle = 'monthly' | 'yearly';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <>
      <section id="pricing" className="w-full pt-0 pb-12 md:pb-16 flex items-center justify-center">
        <Pricing billingCycle={billingCycle} onBillingCycleChange={setBillingCycle} />
      </section>

      <section className="w-full pt-0 pb-12 md:pb-24 flex items-center justify-center">
        <TeamPricing billingCycle={billingCycle} />
      </section>
    </>
  );
}
