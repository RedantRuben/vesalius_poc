import MarketingPageShell from '@/components/MarketingPageShell';
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <MarketingPageShell>
      <div className="pb-6 md:pb-10">
        <Contact sourcePage="/contactus" />
      </div>
    </MarketingPageShell>
  );
}
