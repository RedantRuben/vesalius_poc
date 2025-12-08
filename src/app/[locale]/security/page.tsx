import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const commonListItems = ["End-to-end encryption", "Strict access controls", "Regular security audits", "Vulnerability assessments"];

export default function SecurityPage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#06ACC1]/10 border border-[#06ACC1]/20 text-[#06ACC1] font-medium text-sm mb-8">
            <ShieldCheckIcon />
            <span>Security & Privacy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            Your data, <span className="text-[#06ACC1]">our priority</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At Vesalius.ai, we are deeply committed to your privacy, a dedication 
            reflected in our three key values that ensure the protection and 
            responsible handling of patient data. To build trust with our users, we 
            continuously improve our security and privacy measures, adapting to 
            evolving threats and regulatory landscapes while prioritizing data 
            security and privacy.
          </p>
        </div>
      </section>

      {/* Three Core Values */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Data Protection */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 text-[#06ACC1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <LockIcon />
              </div>
              <h3 className="text-xl font-bold text-[#2B3B53] mb-4">Data Protection</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Our commitment to data protection is unwavering. We implement industry-standard encryption 
                for all data transmissions, ensuring that sensitive patient information remains confidential 
                and secure during transfer. Strict access controls limit data access to authorized personnel 
                only, preventing unauthorized access and ensuring responsible handling of patient data. 
                Regular security audits and vulnerability assessments proactively identify and mitigate 
                potential risks, maintaining a secure environment for our users.
              </p>
              <ul className="space-y-3">
                {commonListItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-[#2B3B53]">
                    <div className="mt-0.5 text-[#06ACC1] shrink-0">
                        <CheckIcon />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory Compliance */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 text-[#06ACC1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <ShieldCheckIcon />
              </div>
              <h3 className="text-xl font-bold text-[#2B3B53] mb-4">Regulatory Compliance</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Compliance with regulatory standards is at the core of our operations. We adhere to the 
                General Data Protection Regulation (GDPR) to protect the personal data of EU citizens, 
                emphasizing transparency in data usage and the right to data erasure. Our platform is also 
                designed to meet the Health Insurance Portability and Accountability Act (HIPAA) standards, 
                implementing safeguards to protect electronic health information and ensure compliance with 
                HIPAA regulations.
              </p>
              <ul className="space-y-3">
                {commonListItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-[#2B3B53]">
                    <div className="mt-0.5 text-[#06ACC1] shrink-0">
                        <CheckIcon />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Transparency */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#06ACC1]/10 text-[#06ACC1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                 <EyeIcon />
              </div>
              <h3 className="text-xl font-bold text-[#2B3B53] mb-4">Data Transparency</h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                We value transparency in our data practices. Our privacy policy outlines how we collect, 
                use, and store data, ensuring users are informed about their data rights. We provide 
                easy-to-use tools for users to control their data, allowing them to request access, 
                corrections, or deletion of their personal information. Our dedication to transparency 
                builds trust with our users, emphasizing their control over their data.
              </p>
              <ul className="space-y-3">
                {commonListItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-[#2B3B53]">
                    <div className="mt-0.5 text-[#06ACC1] shrink-0">
                        <CheckIcon />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="w-full py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B3B53] mb-4">
            Compliance Standards
          </h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
            Certified and audited by leading security organizations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* HIPAA */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#06ACC1]/30 transition-colors flex items-center gap-4 text-left">
               <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                  HIPAA
               </div>
               <div>
                 <h4 className="font-bold text-[#2B3B53]">HIPAA Compliant</h4>
                 <p className="text-xs text-gray-500 mt-0.5">Health Insurance Portability and Accountability Act</p>
               </div>
            </div>

            {/* GDPR */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#06ACC1]/30 transition-colors flex items-center gap-4 text-left">
               <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                  GDPR
               </div>
               <div>
                 <h4 className="font-bold text-[#2B3B53]">GDPR Compliant</h4>
                 <p className="text-xs text-gray-500 mt-0.5">General Data Protection Regulation</p>
               </div>
            </div>

            {/* ISO */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-[#06ACC1]/30 transition-colors flex items-center gap-4 text-left">
               <div className="w-12 h-12 rounded-lg bg-[#06ACC1]/10 flex items-center justify-center flex-shrink-0 text-[#06ACC1] font-bold text-xs">
                  ISO
               </div>
               <div>
                 <h4 className="font-bold text-[#2B3B53]">ISO 27001</h4>
                 <p className="text-xs text-gray-500 mt-0.5">Information Security Management</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col bg-white">
        <Footer />
      </section>
    </main>
  );
}
