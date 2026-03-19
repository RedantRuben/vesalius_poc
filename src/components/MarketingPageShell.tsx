import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function MarketingPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="w-full relative selection:bg-primary/20 bg-[#FCFCFD] min-h-screen">
      <Navbar />
      <div className="pt-28 md:pt-32">{children}</div>
      <Footer />
    </main>
  );
}
