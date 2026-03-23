import MarketingPageShell from '@/components/MarketingPageShell';
import SupportPageContent from '@/components/SupportPageContent';

export default function CustomerCarePage() {
  return (
    <MarketingPageShell>
      <SupportPageContent sourcePage="/helpdesk/customer-care-1" />
    </MarketingPageShell>
  );
}
