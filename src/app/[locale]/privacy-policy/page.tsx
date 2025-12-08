import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Version 1 - January 2025
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="w-full pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F9FBFC] rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-[#2B3B53] mb-4">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#definitions" className="text-[#06ACC1] hover:underline text-sm">1. Definitions</a>
              <a href="#why-process" className="text-[#06ACC1] hover:underline text-sm">2. Why do we process your data?</a>
              <a href="#what-data" className="text-[#06ACC1] hover:underline text-sm">3. What data is collected and processed?</a>
              <a href="#third-parties" className="text-[#06ACC1] hover:underline text-sm">4. Is your data disclosed or shared with third parties?</a>
              <a href="#transfers" className="text-[#06ACC1] hover:underline text-sm">5. Do we transfer your data outside the European Union?</a>
              <a href="#retention" className="text-[#06ACC1] hover:underline text-sm">6. How long is your data kept?</a>
              <a href="#protection" className="text-[#06ACC1] hover:underline text-sm">7. How do we protect your privacy?</a>
              <a href="#rights" className="text-[#06ACC1] hover:underline text-sm">8. What are your rights and how to exercise them?</a>
              <a href="#cookies" className="text-[#06ACC1] hover:underline text-sm">9. Do we use cookies?</a>
              <a href="#law" className="text-[#06ACC1] hover:underline text-sm">10. What is the applicable law and the competent jurisdictions?</a>
              <a href="#updates" className="text-[#06ACC1] hover:underline text-sm">11. Be mindful to the update of this policy</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <p className="text-sm text-gray-500 mb-4">This Policy is established by Vesalius Health BV:</p>
              <p className="text-sm text-gray-600 mb-1">Ottergemsesteenweg-Zuid 808b bus 48, 9000 Gent</p>
              <p className="text-sm text-gray-600 mb-1">VAT: 1011.125.426</p>
              <p className="text-sm text-gray-600 mb-4">privacy@vesalius.health</p>
              
              <p className="text-sm text-gray-600 mb-4">
                Hereinafter, the &quot;Vesalius&quot; or &quot;we&quot;, &quot;us&quot;, &quot;our&quot;.
              </p>
              
              <p className="text-sm text-gray-600 mb-4">
                We are particularly vigilant to the protection of personal data (hereinafter referred to as data) and to the respect of the privacy of all persons who come into contact with us. We act transparently, in accordance with national and international provisions in this area, in particular the Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27th 2016 on the protection of individuals with regard to data processing for personal use and for the free movement of this data, and which repeals Directive 95/46 / EC (hereinafter referred to as the &quot;General Data Protection Regulation&quot; or &quot;GDPR&quot;).
              </p>
              
              <p className="text-sm text-gray-600 mb-4">
                This policy describes the measures undertaken for the treatment and processing of your personal data, and your rights as a data subject.
              </p>
              
              <p className="text-sm text-gray-600 mb-4">
                Vesalius as processor of sensitive data such as health data, processes on behalf of hospitals and health care providers. You should therefore contact them for information on the processing of your personal data.
              </p>
              
              <p className="text-sm text-gray-600">
                You can react to any of the treatments described below by contacting us. We inform you that your data will be used in compliance with this data protection declaration.
              </p>
            </div>

            {/* Section 1 */}
            <div id="definitions" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">1. Definitions</h2>
              <p className="text-sm text-gray-600 mb-4">In this statement, the following words and expressions shall be understood as follows:</p>
              
              <ul className="space-y-3 text-sm text-gray-600">
                <li><strong className="text-[#2B3B53]">Statement:</strong> This privacy statement.</li>
                <li><strong className="text-[#2B3B53]">General terms and conditions of use:</strong> The general terms and conditions and the condition of use of Vesalius which administer the use of Vesalius.</li>
                <li><strong className="text-[#2B3B53]">Personal data:</strong> Any information processed relating to an identified or identifiable physical person in accordance with this declaration is described in the article &quot;The data processed&quot;.</li>
                <li><strong className="text-[#2B3B53]">Data relating to health:</strong> Data of a personal nature relating to the physical or mental health of a physical person, which reveal information about the health condition of that person.</li>
                <li><strong className="text-[#2B3B53]">Our professional healthcare partners:</strong> The healthcare professionals who are connected to the patient via Vesalius.</li>
                <li><strong className="text-[#2B3B53]">Our services:</strong> All the services we provide on Vesalius in the context of our professional activity or in execution of our statutory purpose, as described in our general terms and conditions of use.</li>
                <li><strong className="text-[#2B3B53]">Person responsible for processing:</strong> The legal entity that determines the effectiveness and means of processing personal data in accordance with this declaration, namely us.</li>
                <li><strong className="text-[#2B3B53]">Processing:</strong> Any operation or set of operations, whether or not carried out with the aid of automated processes and applied to data of a personal nature, such as collection, recording, organization, storage, adaptation or alteration, extraction, consultation, use, communication by transmission, dissemination or any other form of provision, association or linkage, as well as the locking, erasure or destruction of data of a personal nature.</li>
                <li><strong className="text-[#2B3B53]">Anonymized data:</strong> Removing identifiable elements such as name and e-mail address and using masking data.</li>
                <li><strong className="text-[#2B3B53]">DPO:</strong> The data privacy officer (DPO) is the person who monitors Vesalius compliance with the General Data Protection Regulation (GDPR) in relation to the protection of personal data.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div id="why-process" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">2. Why do we process your data?</h2>
              <p className="text-sm text-gray-600 mb-6">
                We collect and process your personal data for different reasons based on a legal ground determined by the GDPR (for example, compliance with a legal obligation to which we are subject or the performance of a contract concluded with you).
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our medical care customers</h3>
                  <p className="text-sm text-gray-600 mb-2">We process your personal data in order to carry out operations relating to the contracts; invoices; accounting; provision of documents. We could process your personal data to contact you or a member of your team and answer your questions.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.b) and 6.1.c) of the GDPR</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of the application and identification/authentication</h3>
                  <p className="text-sm text-gray-600 mb-2">We process your personal data to give you access to our application. We could also process your data to contact you and answer your questions; ensure the technical administration and security of Vesalius.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.b) and 6.2.f) of the GDPR</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our patients/customers</h3>
                  <p className="text-sm text-gray-600 mb-2">We process your personal data in order to carry out operations relating to the contracts; invoices; accounting; provision of documents. We could process your personal data to contact you and answer your questions.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.b) and 6.1.c) of the GDPR</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Research, statistics, and improving our application software</h3>
                  <p className="text-sm text-gray-600 mb-2">We process personal data in order to provide and improve our services. We perform statistical analysis with anonymized data. You can withdraw your consent anytime by contacting us (privacy@vesalius.health).</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.a) of the GDPR (consent)</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our communication</h3>
                  <p className="text-sm text-gray-600 mb-2">We process personal data in order to provide you with information relating to our activities and services. You can object to the processing by contacting us.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.2.f) of the GDPR (legitimate interest)</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our pre-contractual relationships</h3>
                  <p className="text-sm text-gray-600 mb-2">We process your personal data in order to respond to requests that you address to us (in particular via the contact form on our site), or if you sent us your Curriculum.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.b) of the GDPR</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our suppliers</h3>
                  <p className="text-sm text-gray-600 mb-2">We process personal data to fulfill our contractual obligations to you or to your company or our legal obligation, for instance accountable legal obligations.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.b) and 6.1.c) of the GDPR</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Management of our litigation</h3>
                  <p className="text-sm text-gray-600 mb-2">We may use your personal data to respond to our legitimate interest or to that of third parties, when this is necessary without affecting your interests or your fundamental freedoms and rights to manage a litigation.</p>
                  <p className="text-xs text-gray-500">Legal basis: Article 6.1.f) and 9.2.f) of the GDPR</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div id="what-data" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">3. What data is collected and processed?</h2>
              <p className="text-sm text-gray-600 mb-6">
                We only collect personal data that is adequate, relevant and limited to what is strictly necessary with regard to the purposes for which it is processed.
              </p>
              
              <div className="space-y-6">
                <div className="bg-[#F9FBFC] rounded-xl p-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-3">Management of medical care customers</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Personal identifying data: first and last name; personal address; phone number</li>
                    <li>Electronic identification data: email address</li>
                    <li>Professional data: job title; workplace; Riziv/INAMI number; VAT</li>
                  </ul>
                </div>
                
                <div className="bg-[#F9FBFC] rounded-xl p-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-3">Management of patients/customers</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Personal identifying data: first and last name; personal address; phone number; national register number</li>
                    <li>Electronic identification data: email address, IP address; encrypted password and username, or PIN code</li>
                    <li>Personal features: date of birth; place of birth; gender; nationality</li>
                    <li>Family data: marital and familial status; family composition</li>
                    <li>Conversation: Your medical interactions via the platform</li>
                    <li>Appointments: Your medical appointments with different doctors</li>
                    <li>Referral letters and other data related to your appointments</li>
                  </ul>
                </div>
                
                <div className="bg-[#F9FBFC] rounded-xl p-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-3">Management of the application (doctors)</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Personal identifying data: first and last name; personal address; phone number</li>
                    <li>Electronic identification data: email address, encrypted password and username; IP address</li>
                    <li>Professional data: job title; workplace; Riziv/INAMI number; national register number</li>
                  </ul>
                </div>
                
                <div className="bg-[#F9FBFC] rounded-xl p-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-3">Research, statistics, and improving application</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Personal identifying data: surname, first name, address, telephone number</li>
                    <li>Electronic identification data: email address, encrypted password</li>
                    <li>Personal features: nationality, gender, languages spoken, country and town/city of birth</li>
                    <li>Health data, encrypted data, conversations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div id="third-parties" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">4. Is your data disclosed or shared with third parties?</h2>
              <p className="text-sm text-gray-600 mb-4">
                The data listed above is accessible to people who are members of our team, or intervening as collaborators, professional healthcare practitioners, and only to the strict extent necessary to our lawyers or any technical advisers, to banking or insurance organizations.
              </p>
              
              <p className="text-sm text-gray-600 mb-4">We are also likely to transmit your data:</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside mb-6">
                <li>At the request of a legal, judicial or administrative authority or auxiliary of justice</li>
                <li>In good faith, considering that this action is required to comply with any current law or regulation</li>
                <li>In order to protect and defend our rights or those of other users of our services</li>
              </ul>
              
              <p className="text-sm text-gray-600 mb-4">
                We may also be required to leave access to certain data to our co-contracting parties, qualified as &quot;subcontractors&quot; within the meaning of the legislation. In all circumstances, we ensure the protection of your data by agreements ensuring confidentiality.
              </p>
              
              <div className="bg-[#F9FBFC] rounded-xl p-4">
                <h3 className="font-semibold text-[#2B3B53] mb-3">Service Providers (all in Europe unless noted)</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Customer service tool for feedback and complaint handling</li>
                  <li>Software development company</li>
                  <li>Document management, productivity tools and emails</li>
                  <li>Database infrastructure and service provider</li>
                  <li>Cloud provider and database server</li>
                  <li>CRM and communication tools</li>
                  <li>Lawyers and legal services providers</li>
                  <li>HR services and social security</li>
                  <li>Accountants and financial services providers</li>
                  <li>Providers of IT solutions (US)</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">More information about the subcontractors is available via privacy@vesalius.health</p>
              </div>
            </div>

            {/* Section 5 */}
            <div id="transfers" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">5. Do we transfer your data outside the European Union?</h2>
              <p className="text-sm text-gray-600 mb-4">
                We do not make transfers outside the European Union. If applicable, data transfers to a country outside the Union will only be authorized if and only if:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>The European Commission has issued a decision granting an adequate level of protection equivalent to that provided for by European legislation</li>
                <li>The transfer is covered by an adequate measure such as the Commission&apos;s Standard Clauses</li>
                <li>Your consent</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="retention" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">6. How long is your data kept?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your personal data that we process will be kept for the duration of our contractual relationship, the time strictly necessary for the fulfillment of our legal and contractual obligations, and the time strictly necessary to protect the vital interests of you or any other person.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-[#2B3B53]">Processing</th>
                      <th className="text-left py-3 px-2 font-semibold text-[#2B3B53]">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Medical care customer</td>
                      <td className="py-3 px-2">7 years from end of financial year</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Patient/customer</td>
                      <td className="py-3 px-2">30 years from last action</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Identification/authentication</td>
                      <td className="py-3 px-2">Deleted at end of contractual relation</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Research, statistics</td>
                      <td className="py-3 px-2">20 years after completion of study</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Communication</td>
                      <td className="py-3 px-2">2 years from last contact</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Pre-contractual relationships</td>
                      <td className="py-3 px-2">2 years after last contact</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Suppliers</td>
                      <td className="py-3 px-2">7 years from end of financial year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Litigation</td>
                      <td className="py-3 px-2">7 years from decision notification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 7 */}
            <div id="protection" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">7. How do we protect your privacy?</h2>
              <p className="text-sm text-gray-600 mb-4">
                We strive to optimally protect your personal data against unauthorized use and leakages. To this end, we use physical, organizational, technological, administrative and appropriate measures such as:
              </p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>We use recognized security and encryption processes to ensure the security of the transmission and storage of your data</li>
                <li>We have organizational measures in place, such as restricting access to our computer systems in accordance with the strict needs of each member of staff</li>
                <li>As soon as we can, your data will be pseudonymized or anonymized</li>
                <li>We host your information on our servers which are protected by ad hoc security and certificates</li>
                <li>We have an internal privacy policy and we conduct regular basic training to maintain data privacy awareness</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div id="rights" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">8. What are your rights and how to exercise them?</h2>
              <p className="text-sm text-gray-600 mb-6">
                We attach a great deal of importance to the rights we have as individuals. Contact us at: <a href="mailto:privacy@vesalius.health" className="text-[#06ACC1] hover:underline">privacy@vesalius.health</a> or <a href="mailto:help@vesalius.health" className="text-[#06ACC1] hover:underline">help@vesalius.health</a>. Our DPO is available at: <a href="mailto:dpo@vesalius.health" className="text-[#06ACC1] hover:underline">dpo@vesalius.health</a>
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right of access, information and rectification</h3>
                  <p className="text-sm text-gray-600">You can request information at any time about our treatments, the objectives pursued, the categories of personal data that we hold about you. You may also ask for your data to be corrected or supplemented if it proves to be incorrect or incomplete.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right to restrict processing</h3>
                  <p className="text-sm text-gray-600">You have the right to ask for the processing of your personal data to be restricted when you dispute the accuracy, when the processing is unlawful, or when we no longer need your data but you need them for legal action.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right to object</h3>
                  <p className="text-sm text-gray-600">You can object to the processing of your personal data if your data is processed on the basis of our legitimate interests or on the basis of consent. You can also click on &quot;unsubscribe&quot; in every commercial email you receive from us.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right to data portability</h3>
                  <p className="text-sm text-gray-600">If your information is treated as part of our contractual obligations or following your consent, you have the right to have your personal information transferred in the form in which we hold it.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right to erasure / right to be forgotten</h3>
                  <p className="text-sm text-gray-600">In the cases provided for by the GDPR or the law, we will proceed with the deletion of your personal data at your request. In principle, you can exercise your rights free of charge.</p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">Right to individual decision making</h3>
                  <p className="text-sm text-gray-600">You have the right not to be subject to a decision based solely on automated processing. We combine automated processes with human intervention.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#F9FBFC] rounded-xl">
                <h3 className="font-semibold text-[#2B3B53] mb-2">Lodge a complaint</h3>
                <p className="text-sm text-gray-600 mb-2">You have the right to lodge a complaint with the Data Protection Authority (DPA):</p>
                <p className="text-sm text-gray-600">
                  Rue de la Presse, 35 at 1000 Brussels<br/>
                  Phone: +32 (0) 2 274 48 00<br/>
                  Email: <a href="mailto:contact@apd-gba.be" className="text-[#06ACC1] hover:underline">contact@apd-gba.be</a><br/>
                  Website: <a href="https://www.dataprotectionauthority.be/citizen" className="text-[#06ACC1] hover:underline" target="_blank" rel="noopener noreferrer">dataprotectionauthority.be</a>
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div id="cookies" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">9. Do we use cookies?</h2>
              <p className="text-sm text-gray-600">
                A cookie is a code in the form of a file stored on your computer. Cookies help us to improve our website, to facilitate your browsing and to analyze audiences. Learn more about our Cookie Policy.
              </p>
            </div>

            {/* Section 10 */}
            <div id="law" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">10. What is the applicable law and the competent jurisdictions?</h2>
              <p className="text-sm text-gray-600">
                This Policy is governed by Belgian law. Any dispute relating to the interpretation or execution of this Policy will be subject to Belgian law and will fall under the exclusive jurisdiction of the courts of the judicial district of Brussels.
              </p>
            </div>

            {/* Section 11 */}
            <div id="updates" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">11. Be mindful to the update of this policy!</h2>
              <p className="text-sm text-gray-600">
                This Policy can be updated at any time without notice of modification. We advise you and invite you to consult it regularly.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
