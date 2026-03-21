import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full bg-white relative selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Version of September 2024
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="w-full pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#F9FBFC] rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-[#2B3B53] mb-4">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <a href="#preamble" className="text-[#06ACC1] hover:underline">Preamble</a>
              <a href="#article-1" className="text-[#06ACC1] hover:underline">Article 1 - Generalities</a>
              <a href="#article-2" className="text-[#06ACC1] hover:underline">Article 2 - Definitions</a>
              <a href="#article-3" className="text-[#06ACC1] hover:underline">Article 3 - Subject matter and acceptance</a>
              <a href="#article-4" className="text-[#06ACC1] hover:underline">Article 4 - Description of our services</a>
              <a href="#article-5" className="text-[#06ACC1] hover:underline">Article 5 - Your general commitments</a>
              <a href="#article-6" className="text-[#06ACC1] hover:underline">Article 6 - Access to the Vesalius platform</a>
              <a href="#article-7" className="text-[#06ACC1] hover:underline">Article 7 - Your obligations when using Vesalius</a>
              <a href="#article-8" className="text-[#06ACC1] hover:underline">Article 8 - Our liability</a>
              <a href="#article-9" className="text-[#06ACC1] hover:underline">Article 9 - Distribution/revocation/amendments</a>
              <a href="#article-10" className="text-[#06ACC1] hover:underline">Article 10 - Links to other services</a>
              <a href="#article-11" className="text-[#06ACC1] hover:underline">Article 11 - Intellectual property</a>
              <a href="#article-12" className="text-[#06ACC1] hover:underline">Article 12 - Data collection and processing</a>
              <a href="#article-13" className="text-[#06ACC1] hover:underline">Article 13 - Duration and termination</a>
              <a href="#article-14" className="text-[#06ACC1] hover:underline">Article 14 - Final provisions</a>
            </nav>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600">
            
            {/* Preamble */}
            <div id="preamble" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Preamble</h2>
              <p className="text-sm text-gray-600 mb-4">
                These general terms of use of Vesalius, the privacy charter, and, where relevant, the special contractual conditions for each service make up the entirety of the contractual framework applicable to each service provided through Vesalius for your benefit (hereinafter the &quot;Contract&quot;). This Contract cancels and replaces any other preceding forms of communication.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                It is important to read, understand, and accept the entirety of the content of this Contract, as each service provided through Vesalius for your benefit is governed by this contractual framework and, specifically, these general terms of use.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                By using the Vesalius services, you also accept the terms of use. If you disagree with the content of this Contract, you should not make use of Vesalius.
              </p>
              <p className="text-sm text-gray-500 italic">
                This preamble is an integral part of the general terms of use of the Vesalius platform.
              </p>
            </div>

            {/* Article 1 */}
            <div id="article-1" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 1 - Generalities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-3">1.1 Who is governed by these general terms of use?</h3>
                  <p className="text-sm text-gray-600">
                    These general terms of use apply to each natural person using the Vesalius Platform, or, generally, the service provided by Vesalius BV/SARL (hereinafter: &quot;we&quot;). This person is designated &quot;you&quot; in this document.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-3">1.2 Who are we, and how can you contact us?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The Vesalius platform you are using is a service provided by the information company governed by these general terms of use, called Vesalius BV/SARL (hereinafter: &quot;we&quot;).
                  </p>
                  <div className="bg-[#F9FBFC] rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2"><strong>Our precise coordinates:</strong></p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li><strong>Corporate form:</strong> Limited Liability Company/Société à Responsabilité Limitée</li>
                      <li><strong>Website:</strong> <a href="https://www.vesalius.ai" className="text-[#06ACC1] hover:underline">www.vesalius.ai</a></li>
                      <li><strong>Email address:</strong> <a href="mailto:help@vesalius.health" className="text-[#06ACC1] hover:underline">help@vesalius.health</a></li>
                      <li><strong>Telephone:</strong> +32 9 496 14 78</li>
                      <li><strong>Registered offices:</strong> Ottergemsesteenweg-Zuid 808b bus 48, 9000 Gent</li>
                      <li><strong>CBE/VAT no.:</strong> VAT BE 1011.125.426</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div id="article-2" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 2 - Definitions</h2>
              <p className="text-sm text-gray-600 mb-4">The following words are defined as follows in these general terms of use:</p>
              
              <ul className="space-y-3 text-sm text-gray-600">
                <li><strong className="text-[#2B3B53]">&quot;General terms of use&quot;:</strong> these general terms governing the use of Vesalius.</li>
                <li><strong className="text-[#2B3B53]">&quot;The Vesalius platform&quot; or &quot;Vesalius&quot;:</strong> the platform, and, generally, the service provided by the information company used to present our services.</li>
                <li><strong className="text-[#2B3B53]">&quot;We&quot;:</strong> the legal entity offering its services on Vesalius, which personal data are defined in the &quot;Generalities&quot; section of this document, referred to as &quot;we&quot;, &quot;our&quot;, and the like in these general terms of use.</li>
                <li><strong className="text-[#2B3B53]">&quot;Privacy statement&quot;:</strong> the document that describes the processing of the data, as available at <a href="/privacy-policy" className="text-[#06ACC1] hover:underline">www.vesalius.ai/privacy-policy</a></li>
                <li><strong className="text-[#2B3B53]">&quot;Professional health partner&quot;:</strong> the healthcare professional connected to the patient through Vesalius.</li>
                <li><strong className="text-[#2B3B53]">&quot;Contract parties&quot;:</strong> the parties that undertake to respect these general terms of use, primarily you and us.</li>
                <li><strong className="text-[#2B3B53]">&quot;Service(s)&quot;:</strong> the entirety of the services we provide through and using Vesalius in the context of our professional activities or to pursue our statutory object as set out in the &quot;Description of our services&quot; section of this document.</li>
                <li><strong className="text-[#2B3B53]">&quot;User(s)&quot;:</strong> each person, not including you, with access to and using Vesalius.</li>
                <li><strong className="text-[#2B3B53]">&quot;You&quot;:</strong> the person with access to and using Vesalius, designated in these general terms of use as &quot;you&quot;, &quot;your&quot;, and the like. You are a Professional health partner.</li>
              </ul>
            </div>

            {/* Article 3 */}
            <div id="article-3" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 3 - Subject matter and acceptance of these general terms of use</h2>
              <p className="text-sm text-gray-600 mb-4">
                The use of Vesalius is governed by these general terms of use. These terms of use constitute a legally binding agreement between us and you and apply to your use of the Vesalius platform.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                These general terms of use of Vesalius, the privacy charter, and, where relevant, the special contractual conditions for each service constitute the entire agreement and understanding between you and us with respect to the subject matter hereof and supersedes all prior oral or written agreements, representations or understandings between you and us relating to the subject matter hereof.
              </p>
              <p className="text-sm text-gray-600">
                You undertake to respect these during any use of Vesalius and our services. If you register for the online services, you acknowledge to have studied these general terms of use and to accept them by (i) using Vesalius, and (ii) by checking the corresponding field when ordering your subscription.
              </p>
            </div>

            {/* Article 4 */}
            <div id="article-4" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 4 - Description of our services</h2>
              <p className="text-sm text-gray-600 mb-4">
                We are a medical device company developing technology and software to enhance and automate patient interactions.
              </p>
              <p className="text-sm text-gray-600 mb-4">We propose the following to you, among other things:</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside mb-4">
                <li>The access to the Vesalius platform</li>
                <li>The creation of your Vesalius subscription and the access to your data set out therein</li>
                <li>The automation of patient interactions</li>
                <li>The possibility to tailor it for your needs</li>
                <li>The access to the patient&apos;s interactions</li>
                <li>The access to the structured summary of the patient&apos;s interactions</li>
                <li>Manage your calendar and schedule</li>
                <li>Manage appointments</li>
                <li>Manage patient data</li>
              </ul>
              <p className="text-sm text-gray-600">
                You understand that we can change or adapt the content of the Services at any time, specifically to take into account changes to technologies and/or applicable legislation. We will do our utmost to inform you about any important improvement or change to our Services.
              </p>
            </div>

            {/* Article 5 */}
            <div id="article-5" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 5 - Your general commitments</h2>
              <p className="text-sm text-gray-600 mb-4">
                You confirm that you are of legal age in your country and are not forbidden by an employment or other contract to form a binding contract and hereby agree to be bound by these general terms of use.
              </p>
              <p className="text-sm text-gray-600">
                You undertake to provide information in accordance with these general terms of use that is accurate, precise, and up to date. You undertake to use Vesalius in accordance with the instructions that will be provided by Vesalius.
              </p>
            </div>

            {/* Article 6 */}
            <div id="article-6" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 6 - Access to the Vesalius platform</h2>
              <p className="text-sm text-gray-600 mb-4">
                Once your Vesalius account has been created, you will have access to our Services through the Vesalius platform.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                In order to use Vesalius, you must have a compatible device. Vesalius is not compatible with all devices and it is your responsibility to use a compatible device with Vesalius. Any compatible device with Vesalius and on which you use Vesalius will be known as a &quot;Device&quot; for the purposes of these terms. You confirm that you either own the applicable Device or if not owned by you, you have obtained permission to install and use Vesalius on such Device.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                From time to time, updates to Vesalius may be made available. Depending on the update, you may not be able to use Vesalius until you have installed the latest version or updated your Device.
              </p>
              <p className="text-sm text-gray-600">
                You are responsible for all carrier data plans, Internet fees, and other fees and taxes associated with your use of the Services.
              </p>
            </div>

            {/* Article 7 */}
            <div id="article-7" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 7 - Your obligations when using Vesalius</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">7.1 The security of your Vesalius account</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Access to your account is subject to identification using your login credentials and password. You will solely remain responsible for the information stored on your account.
                  </p>
                  <p className="text-sm text-gray-600">
                    You acknowledge that your login credentials and password are strictly personal and confidential. You are required to take all necessary steps to secure your login credentials and password against any form of attack. We cannot be considered responsible for any fraudulent access to your account, except in case of gross negligence attributable to us.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">7.2 The use of Vesalius</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    You agree to use the Vesalius Services only for their intended use as set forth in these Terms of Use.
                  </p>
                  <p className="text-sm text-gray-600">
                    By using Vesalius, you guarantee and ensure that you are responsible for any use of Vesalius by yourself or by any person using your login credentials and password or working under your authority.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">7.3 Ban on the illegal or unlawful use of Vesalius</h3>
                  <p className="text-sm text-gray-600">
                    You guarantee that you will not use Vesalius for illegal purposes or for purposes banned by law, these general terms of use or a separate contract which would prohibit you from using Vesalius.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">7.4 Observing the Vesalius instructions</h3>
                  <p className="text-sm text-gray-600">
                    You agree to carefully follow the instructions provided by Vesalius and to complete the questionnaires with honest and accurate information. Compliance is crucial to give the medical professional a correct understanding of the conversation. Vesalius does not make diagnoses but only automates interactions with patients.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#06ACC1] pl-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">7.5 The content you publish on Vesalius</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    The information you provide, program, amend, and check is your complete responsibility, and, where relevant, will be subject to your individual and exclusive responsibility.
                  </p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Ban on certain content:</strong> The content you provide on Vesalius may not:</p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Be false, defamatory, unlawful, threatening, or harassing</li>
                    <li>Be obscene or harm public order and public decency</li>
                    <li>Entail attacks based on races, beliefs, ethnic origin, sex, or sexual preference</li>
                    <li>Relay unsolicited promotional messages</li>
                    <li>Harm the rights of third parties, such as intellectual property rights or privacy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Article 8 */}
            <div id="article-8" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 8 - Our liability</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">8.1 Generalities</h3>
                  <p className="text-sm text-gray-600">
                    Vesalius and its services are provided in an unaltered state and without any explicit or tacit guarantee concerning the conditions of their use and/or availability. You have been informed that Vesalius and our services are in line with applicable Belgian legislation.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">8.2 Quality of the instructions and content</h3>
                  <p className="text-sm text-gray-600">
                    We will deploy all available resources in order to offer you quality content. Our Services are provided &quot;as is&quot; and, to the extent permitted by applicable law, we exclude all representations or warranties of any kind, express or implied. We do not warrant that our Services will be operational, error-free, secure or safe.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">8.3 Healthcare decisions</h3>
                  <p className="text-sm text-gray-600">
                    You specifically acknowledge and agree that we cannot be held liable for any healthcare or related decisions/advice or treatments made available to you or by you. You acknowledge that you, and not we, are solely responsible for the interpretation of your data or other healthcare information related to your use of the Service.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">8.4 Security/access</h3>
                  <p className="text-sm text-gray-600">
                    We make reasonable efforts to ensure the security and operational integrity of Vesalius. We strive to keep our services available 7 days per week, 24 hours per day. We reserve the option of fully or partially interrupting, suspending, or amending access to the Services without notice or compensation.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">8.5 Limitation of liability</h3>
                  <p className="text-sm text-gray-600">
                    To the extent legally permitted, we shall not be liable for any special, indirect, exemplary, punitive, incidental or consequential damages. Our aggregate liability will not exceed the amount of the subscription paid for your use of our Services.
                  </p>
                </div>
              </div>
            </div>

            {/* Article 9 */}
            <div id="article-9" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 9 - Distribution/revocation/amendments to the contents</h2>
              <p className="text-sm text-gray-600">
                Within the applicable statutory limits, we may be required to distribute any content or data of Vesalius, or to comply with applicable laws, or, if we – in good faith – believe that such a measure is required to protect our rights or interests, those of our users, or those of the general public, specifically in the context of judicial proceedings.
              </p>
            </div>

            {/* Article 10 */}
            <div id="article-10" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 10 - Links to other services</h2>
              <p className="text-sm text-gray-600 mb-4">
                Vesalius can link to other services (websites, applications, and the like) over which we cannot exert any technical or substantive control. The existence of a textual link to another service does not constitute our validation of this service or its content.
              </p>
              <p className="text-sm text-gray-600">
                We reject any liability for the direct or indirect damage arising from consulting or using these online services referred to by Vesalius or for the information published on these services.
              </p>
            </div>

            {/* Article 11 */}
            <div id="article-11" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 11 - Intellectual property</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">11.1 Our intellectual property</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The Vesalius Services made available by us are our exclusive property. All rights in and to the Vesalius Services not expressly granted to you are reserved to us. You acknowledge that all intellectual property rights in and to Vesalius belong to us or our licensors.
                  </p>
                  <p className="text-sm text-gray-600">
                    We grant you a limited, revocable, non-exclusive, non-sublicensable, and non-transferable license to use our Services, subject to and in accordance with these general terms of use.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">11.2 Intellectual property of your content</h3>
                  <p className="text-sm text-gray-600">
                    With respect to the content protected by intellectual property rights that you upload, submit, store, send, or receive on or through our Services, you grant us a worldwide, royalty-free, non-exclusive, transferable, sub-licensable license to use, reproduce, amend, translate, distribute, modify, display and communicate this content, exclusively for administrative purposes of Vesalius.
                  </p>
                </div>
              </div>
            </div>

            {/* Article 12 */}
            <div id="article-12" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 12 - Data collection and processing personal data</h2>
              <p className="text-sm text-gray-600 mb-4">
                With respect to the processing of your personal data conducted by us, we refer you to our <a href="/privacy-policy" className="text-[#06ACC1] hover:underline">privacy statement</a>. You must agree and consent to our privacy statement before using Vesalius Services.
              </p>
              <p className="text-sm text-gray-600">
                Your personal data is collected in order to provide you with the Vesalius Services, feedback, customer care, marketing, non-commercial communications, for research activities, to manage and improve our Vesalius services and for legal obligations.
              </p>
            </div>

            {/* Article 13 */}
            <div id="article-13" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 13 - Duration and termination</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">13.1 Duration of the subscription</h3>
                  <p className="text-sm text-gray-600">
                    These general terms of use take effect on the day you are granted access to the Vesalius platform and end on the day on which your Vesalius account is closed.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">13.2 Your right to stop using the services</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You have the right to request the closing of your Vesalius account by sending a letter by registered mail with confirmation of receipt to us.
                  </p>
                  <p className="text-sm text-gray-600">
                    We reserve the right to terminate your Vesalius account in case of improper use, including: failure to respect intellectual property rights, voluntary provision of incorrect information, actions in violation of our commercial interests, or violation of laws or these terms of use.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">13.3 The termination of your account</h3>
                  <p className="text-sm text-gray-600">
                    Upon the termination of these terms of use, you will no longer be authorized to access or use the Vesalius platform. Once your account has been closed, we will retain your data and provide you with these at your request in accordance with the privacy statement.
                  </p>
                </div>
              </div>
            </div>

            {/* Article 14 */}
            <div id="article-14" className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-6">Article 14 - Final provisions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.1 Amendments to these general terms of use</h3>
                  <p className="text-sm text-gray-600">
                    We can amend these general terms of use at any time. We will inform you about amendments made, and you will have 15 days to terminate your subscription if you disagree. If you do not terminate within this period, you will be deemed to have accepted the amendments.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.2 Conclusive force</h3>
                  <p className="text-sm text-gray-600">
                    All electronic communication between you and us will be deemed to have the same conclusive force as a paper document.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.3 Severability</h3>
                  <p className="text-sm text-gray-600">
                    If a clause of these general terms of use must be declared invalid, this will not affect the validity of the remaining clauses.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.4 Force majeure</h3>
                  <p className="text-sm text-gray-600">
                    No contractual party will be held liable for delays or non-fulfilment of obligations arising from force majeure events.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.5 Dispute settlement</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You can contact us about any objection at <a href="mailto:help@vesalius.health" className="text-[#06ACC1] hover:underline">help@vesalius.health</a>. Please contact us before taking any other steps to enable us to come to an amicable solution.
                  </p>
                  <p className="text-sm text-gray-600">
                    You can also contact a European online dispute regulation platform at <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#06ACC1] hover:underline">ec.europa.eu/consumers/odr</a>.
                  </p>
                </div>
                
                <div className="bg-[#F9FBFC] rounded-xl p-4">
                  <h3 className="font-semibold text-[#2B3B53] mb-2">14.6 Applicable law and competent courts</h3>
                  <p className="text-sm text-gray-600">
                    These general terms of use are governed by the laws of Belgium. Any dispute arising out of or in connection with the Services or these general terms of use is subject to the exclusive jurisdiction of the courts of Brussels (Belgium).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

