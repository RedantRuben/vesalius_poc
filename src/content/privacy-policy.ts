import type { SiteLocale } from '@/lib/seo';

type Definition = {
  term: string;
  description: string;
};

type ProcessingPurpose = {
  title: string;
  description: string;
  legalBasis: string;
};

type DataGroup = {
  title: string;
  items: string[];
};

type RetentionRow = {
  processing: string;
  duration: string;
};

type Right = {
  title: string;
  description: string;
};

export type PrivacyPolicyCopy = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    version: string;
  };
  tableOfContentsTitle: string;
  tableOfContents: Array<{
    id: string;
    label: string;
  }>;
  introduction: {
    establishedBy: string;
    address: string;
    vat: string;
    email: string;
    hereinafter: string;
    vigilance: string;
    purpose: string;
    processor: string;
    contact: string;
  };
  definitions: {
    title: string;
    introduction: string;
    items: Definition[];
  };
  processing: {
    title: string;
    introduction: string;
    purposes: ProcessingPurpose[];
  };
  collectedData: {
    title: string;
    introduction: string;
    groups: DataGroup[];
  };
  thirdParties: {
    title: string;
    paragraphs: string[];
    transferReasons: string[];
    providersTitle: string;
    providers: string[];
    providersNote: string;
  };
  transfers: {
    title: string;
    introduction: string;
    conditions: string[];
  };
  retention: {
    title: string;
    introduction: string;
    tableHeaders: {
      processing: string;
      duration: string;
    };
    rows: RetentionRow[];
  };
  protection: {
    title: string;
    introduction: string;
    measures: string[];
  };
  rights: {
    title: string;
    contactIntroduction: string;
    contactOr: string;
    dpoIntroduction: string;
    rights: Right[];
    complaintTitle: string;
    complaintIntroduction: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    websiteLabel: string;
  };
  cookies: {
    title: string;
    body: string;
  };
  law: {
    title: string;
    body: string;
  };
  updates: {
    title: string;
    body: string;
  };
};

const copyByLocale = {
  en: {
    metadata: {
      title: 'Privacy Policy',
      description:
        'Read the Vesalius privacy policy covering personal data processing, GDPR rights, security measures, retention, and contact details.',
    },
    hero: {
      title: 'Privacy Policy',
      version: 'Version 1 - January 2025',
    },
    tableOfContentsTitle: 'Table of Contents',
    tableOfContents: [
      { id: 'definitions', label: '1. Definitions' },
      { id: 'why-process', label: '2. Why do we process your data?' },
      { id: 'what-data', label: '3. What data is collected and processed?' },
      {
        id: 'third-parties',
        label: '4. Is your data disclosed or shared with third parties?',
      },
      {
        id: 'transfers',
        label: '5. Do we transfer your data outside the European Union?',
      },
      { id: 'retention', label: '6. How long is your data kept?' },
      { id: 'protection', label: '7. How do we protect your privacy?' },
      {
        id: 'rights',
        label: '8. What are your rights and how to exercise them?',
      },
      { id: 'cookies', label: '9. Do we use cookies?' },
      {
        id: 'law',
        label: '10. What is the applicable law and the competent jurisdictions?',
      },
      { id: 'updates', label: '11. Be mindful to the update of this policy' },
    ],
    introduction: {
      establishedBy: 'This Policy is established by Vesalius Health BV:',
      address: 'Ottergemsesteenweg-Zuid 808b bus 48, 9000 Gent',
      vat: 'VAT: 1011.125.426',
      email: 'privacy@vesalius.health',
      hereinafter: 'Hereinafter, the "Vesalius" or "we", "us", "our".',
      vigilance:
        'We are particularly vigilant to the protection of personal data (hereinafter referred to as data) and to the respect of the privacy of all persons who come into contact with us. We act transparently, in accordance with national and international provisions in this area, in particular the Regulation (EU) 2016/679 of the European Parliament and of the Council of April 27th 2016 on the protection of individuals with regard to data processing for personal use and for the free movement of this data, and which repeals Directive 95/46 / EC (hereinafter referred to as the "General Data Protection Regulation" or "GDPR").',
      purpose:
        'This policy describes the measures undertaken for the treatment and processing of your personal data, and your rights as a data subject.',
      processor:
        'Vesalius as processor of sensitive data such as health data, processes on behalf of hospitals and health care providers. You should therefore contact them for information on the processing of your personal data.',
      contact:
        'You can react to any of the treatments described below by contacting us. We inform you that your data will be used in compliance with this data protection declaration.',
    },
    definitions: {
      title: '1. Definitions',
      introduction:
        'In this statement, the following words and expressions shall be understood as follows:',
      items: [
        { term: 'Statement', description: 'This privacy statement.' },
        {
          term: 'General terms and conditions of use',
          description:
            'The general terms and conditions and the condition of use of Vesalius which administer the use of Vesalius.',
        },
        {
          term: 'Personal data',
          description:
            'Any information processed relating to an identified or identifiable physical person in accordance with this declaration is described in the article "The data processed".',
        },
        {
          term: 'Data relating to health',
          description:
            'Data of a personal nature relating to the physical or mental health of a physical person, which reveal information about the health condition of that person.',
        },
        {
          term: 'Our professional healthcare partners',
          description:
            'The healthcare professionals who are connected to the patient via Vesalius.',
        },
        {
          term: 'Our services',
          description:
            'All the services we provide on Vesalius in the context of our professional activity or in execution of our statutory purpose, as described in our general terms and conditions of use.',
        },
        {
          term: 'Person responsible for processing',
          description:
            'The legal entity that determines the effectiveness and means of processing personal data in accordance with this declaration, namely us.',
        },
        {
          term: 'Processing',
          description:
            'Any operation or set of operations, whether or not carried out with the aid of automated processes and applied to data of a personal nature, such as collection, recording, organization, storage, adaptation or alteration, extraction, consultation, use, communication by transmission, dissemination or any other form of provision, association or linkage, as well as the locking, erasure or destruction of data of a personal nature.',
        },
        {
          term: 'Anonymized data',
          description:
            'Removing identifiable elements such as name and e-mail address and using masking data.',
        },
        {
          term: 'DPO',
          description:
            'The data privacy officer (DPO) is the person who monitors Vesalius compliance with the General Data Protection Regulation (GDPR) in relation to the protection of personal data.',
        },
      ],
    },
    processing: {
      title: '2. Why do we process your data?',
      introduction:
        'We collect and process your personal data for different reasons based on a legal ground determined by the GDPR (for example, compliance with a legal obligation to which we are subject or the performance of a contract concluded with you).',
      purposes: [
        {
          title: 'Management of our medical care customers',
          description:
            'We process your personal data in order to carry out operations relating to the contracts; invoices; accounting; provision of documents. We could process your personal data to contact you or a member of your team and answer your questions.',
          legalBasis: 'Legal basis: Article 6.1.b) and 6.1.c) of the GDPR',
        },
        {
          title: 'Management of the application and identification/authentication',
          description:
            'We process your personal data to give you access to our application. We could also process your data to contact you and answer your questions; ensure the technical administration and security of Vesalius.',
          legalBasis: 'Legal basis: Article 6.1.b) and 6.2.f) of the GDPR',
        },
        {
          title: 'Management of our patients/customers',
          description:
            'We process your personal data in order to carry out operations relating to the contracts; invoices; accounting; provision of documents. We could process your personal data to contact you and answer your questions.',
          legalBasis: 'Legal basis: Article 6.1.b) and 6.1.c) of the GDPR',
        },
        {
          title: 'Research, statistics, and improving our application software',
          description:
            'We process personal data in order to provide and improve our services. We perform statistical analysis with anonymized data. You can withdraw your consent anytime by contacting us (privacy@vesalius.health).',
          legalBasis: 'Legal basis: Article 6.1.a) of the GDPR (consent)',
        },
        {
          title: 'Management of our communication',
          description:
            'We process personal data in order to provide you with information relating to our activities and services. You can object to the processing by contacting us.',
          legalBasis:
            'Legal basis: Article 6.2.f) of the GDPR (legitimate interest)',
        },
        {
          title: 'Management of our pre-contractual relationships',
          description:
            'We process your personal data in order to respond to requests that you address to us (in particular via the contact form on our site), or if you sent us your Curriculum.',
          legalBasis: 'Legal basis: Article 6.1.b) of the GDPR',
        },
        {
          title: 'Management of our suppliers',
          description:
            'We process personal data to fulfill our contractual obligations to you or to your company or our legal obligation, for instance accountable legal obligations.',
          legalBasis: 'Legal basis: Article 6.1.b) and 6.1.c) of the GDPR',
        },
        {
          title: 'Management of our litigation',
          description:
            'We may use your personal data to respond to our legitimate interest or to that of third parties, when this is necessary without affecting your interests or your fundamental freedoms and rights to manage a litigation.',
          legalBasis: 'Legal basis: Article 6.1.f) and 9.2.f) of the GDPR',
        },
      ],
    },
    collectedData: {
      title: '3. What data is collected and processed?',
      introduction:
        'We only collect personal data that is adequate, relevant and limited to what is strictly necessary with regard to the purposes for which it is processed.',
      groups: [
        {
          title: 'Management of medical care customers',
          items: [
            'Personal identifying data: first and last name; personal address; phone number',
            'Electronic identification data: email address',
            'Professional data: job title; workplace; Riziv/INAMI number; VAT',
          ],
        },
        {
          title: 'Management of patients/customers',
          items: [
            'Personal identifying data: first and last name; personal address; phone number; national register number',
            'Electronic identification data: email address, IP address; encrypted password and username, or PIN code',
            'Personal features: date of birth; place of birth; gender; nationality',
            'Family data: marital and familial status; family composition',
            'Conversation: Your medical interactions via the platform',
            'Appointments: Your medical appointments with different doctors',
            'Referral letters and other data related to your appointments',
          ],
        },
        {
          title: 'Management of the application (doctors)',
          items: [
            'Personal identifying data: first and last name; personal address; phone number',
            'Electronic identification data: email address, encrypted password and username; IP address',
            'Professional data: job title; workplace; Riziv/INAMI number; national register number',
          ],
        },
        {
          title: 'Research, statistics, and improving application',
          items: [
            'Personal identifying data: surname, first name, address, telephone number',
            'Electronic identification data: email address, encrypted password',
            'Personal features: nationality, gender, languages spoken, country and town/city of birth',
            'Health data, encrypted data, conversations',
          ],
        },
      ],
    },
    thirdParties: {
      title: '4. Is your data disclosed or shared with third parties?',
      paragraphs: [
        'The data listed above is accessible to people who are members of our team, or intervening as collaborators, professional healthcare practitioners, and only to the strict extent necessary to our lawyers or any technical advisers, to banking or insurance organizations.',
        'We are also likely to transmit your data:',
        'We may also be required to leave access to certain data to our co-contracting parties, qualified as "subcontractors" within the meaning of the legislation. In all circumstances, we ensure the protection of your data by agreements ensuring confidentiality.',
      ],
      transferReasons: [
        'At the request of a legal, judicial or administrative authority or auxiliary of justice',
        'In good faith, considering that this action is required to comply with any current law or regulation',
        'In order to protect and defend our rights or those of other users of our services',
      ],
      providersTitle: 'Service Providers (all in Europe unless noted)',
      providers: [
        'Customer service tool for feedback and complaint handling',
        'Software development company',
        'Document management, productivity tools and emails',
        'Database infrastructure and service provider',
        'Cloud provider and database server',
        'CRM and communication tools',
        'Lawyers and legal services providers',
        'HR services and social security',
        'Accountants and financial services providers',
        'Providers of IT solutions (US)',
      ],
      providersNote:
        'More information about the subcontractors is available via privacy@vesalius.health',
    },
    transfers: {
      title: '5. Do we transfer your data outside the European Union?',
      introduction:
        'We do not make transfers outside the European Union. If applicable, data transfers to a country outside the Union will only be authorized if and only if:',
      conditions: [
        'The European Commission has issued a decision granting an adequate level of protection equivalent to that provided for by European legislation',
        "The transfer is covered by an adequate measure such as the Commission's Standard Clauses",
        'Your consent',
      ],
    },
    retention: {
      title: '6. How long is your data kept?',
      introduction:
        'Your personal data that we process will be kept for the duration of our contractual relationship, the time strictly necessary for the fulfillment of our legal and contractual obligations, and the time strictly necessary to protect the vital interests of you or any other person.',
      tableHeaders: {
        processing: 'Processing',
        duration: 'Duration',
      },
      rows: [
        { processing: 'Medical care customer', duration: '7 years from end of financial year' },
        { processing: 'Patient/customer', duration: '30 years from last action' },
        {
          processing: 'Identification/authentication',
          duration: 'Deleted at end of contractual relation',
        },
        { processing: 'Research, statistics', duration: '20 years after completion of study' },
        { processing: 'Communication', duration: '2 years from last contact' },
        { processing: 'Pre-contractual relationships', duration: '2 years after last contact' },
        { processing: 'Suppliers', duration: '7 years from end of financial year' },
        { processing: 'Litigation', duration: '7 years from decision notification' },
      ],
    },
    protection: {
      title: '7. How do we protect your privacy?',
      introduction:
        'We strive to optimally protect your personal data against unauthorized use and leakages. To this end, we use physical, organizational, technological, administrative and appropriate measures such as:',
      measures: [
        'We use recognized security and encryption processes to ensure the security of the transmission and storage of your data',
        'We have organizational measures in place, such as restricting access to our computer systems in accordance with the strict needs of each member of staff',
        'As soon as we can, your data will be pseudonymized or anonymized',
        'We host your information on our servers which are protected by ad hoc security and certificates',
        'We have an internal privacy policy and we conduct regular basic training to maintain data privacy awareness',
      ],
    },
    rights: {
      title: '8. What are your rights and how to exercise them?',
      contactIntroduction:
        'We attach a great deal of importance to the rights we have as individuals. Contact us at:',
      contactOr: 'or',
      dpoIntroduction: 'Our DPO is available at:',
      rights: [
        {
          title: 'Right of access, information and rectification',
          description:
            'You can request information at any time about our treatments, the objectives pursued, the categories of personal data that we hold about you. You may also ask for your data to be corrected or supplemented if it proves to be incorrect or incomplete.',
        },
        {
          title: 'Right to restrict processing',
          description:
            'You have the right to ask for the processing of your personal data to be restricted when you dispute the accuracy, when the processing is unlawful, or when we no longer need your data but you need them for legal action.',
        },
        {
          title: 'Right to object',
          description:
            'You can object to the processing of your personal data if your data is processed on the basis of our legitimate interests or on the basis of consent. You can also click on "unsubscribe" in every commercial email you receive from us.',
        },
        {
          title: 'Right to data portability',
          description:
            'If your information is treated as part of our contractual obligations or following your consent, you have the right to have your personal information transferred in the form in which we hold it.',
        },
        {
          title: 'Right to erasure / right to be forgotten',
          description:
            'In the cases provided for by the GDPR or the law, we will proceed with the deletion of your personal data at your request. In principle, you can exercise your rights free of charge.',
        },
        {
          title: 'Right to individual decision making',
          description:
            'You have the right not to be subject to a decision based solely on automated processing. We combine automated processes with human intervention.',
        },
      ],
      complaintTitle: 'Lodge a complaint',
      complaintIntroduction:
        'You have the right to lodge a complaint with the Data Protection Authority (DPA):',
      addressLabel: 'Rue de la Presse, 35 at 1000 Brussels',
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      websiteLabel: 'Website:',
    },
    cookies: {
      title: '9. Do we use cookies?',
      body: 'A cookie is a code in the form of a file stored on your computer. Cookies help us to improve our website, to facilitate your browsing and to analyze audiences. Learn more about our Cookie Policy.',
    },
    law: {
      title: '10. What is the applicable law and the competent jurisdictions?',
      body: 'This Policy is governed by Belgian law. Any dispute relating to the interpretation or execution of this Policy will be subject to Belgian law and will fall under the exclusive jurisdiction of the courts of the judicial district of Brussels.',
    },
    updates: {
      title: '11. Be mindful to the update of this policy!',
      body: 'This Policy can be updated at any time without notice of modification. We advise you and invite you to consult it regularly.',
    },
  },
  nl: {
    metadata: {
      title: 'Privacybeleid',
      description:
        'Lees het privacybeleid van Vesalius over de verwerking van persoonsgegevens, GDPR-rechten, beveiligingsmaatregelen, bewaartermijnen en contactgegevens.',
    },
    hero: {
      title: 'Privacybeleid',
      version: 'Versie 1 - januari 2025',
    },
    tableOfContentsTitle: 'Inhoudsopgave',
    tableOfContents: [
      { id: 'definitions', label: '1. Definities' },
      { id: 'why-process', label: '2. Waarom verwerken wij uw gegevens?' },
      { id: 'what-data', label: '3. Welke gegevens worden verzameld en verwerkt?' },
      {
        id: 'third-parties',
        label: '4. Worden uw gegevens bekendgemaakt aan of gedeeld met derden?',
      },
      {
        id: 'transfers',
        label: '5. Dragen wij uw gegevens over buiten de Europese Unie?',
      },
      { id: 'retention', label: '6. Hoelang worden uw gegevens bewaard?' },
      { id: 'protection', label: '7. Hoe beschermen wij uw privacy?' },
      {
        id: 'rights',
        label: '8. Wat zijn uw rechten en hoe kunt u ze uitoefenen?',
      },
      { id: 'cookies', label: '9. Gebruiken wij cookies?' },
      {
        id: 'law',
        label: '10. Welk recht is van toepassing en welke rechtbanken zijn bevoegd?',
      },
      { id: 'updates', label: '11. Let op updates van dit beleid' },
    ],
    introduction: {
      establishedBy: 'Dit beleid werd opgesteld door Vesalius Health BV:',
      address: 'Ottergemsesteenweg-Zuid 808b bus 48, 9000 Gent',
      vat: 'BTW: 1011.125.426',
      email: 'privacy@vesalius.health',
      hereinafter: 'Hierna: "Vesalius" of "wij", "ons", "onze".',
      vigilance:
        'Wij besteden bijzondere aandacht aan de bescherming van persoonsgegevens (hierna: gegevens) en aan de eerbiediging van de privacy van alle personen die met ons in contact komen. Wij handelen transparant en in overeenstemming met de nationale en internationale regelgeving op dit gebied, in het bijzonder Verordening (EU) 2016/679 van het Europees Parlement en de Raad van 27 april 2016 betreffende de bescherming van natuurlijke personen in verband met de verwerking van persoonsgegevens en betreffende het vrije verkeer van die gegevens, tot intrekking van Richtlijn 95/46/EG (hierna: de "Algemene Verordening Gegevensbescherming" of "AVG").',
      purpose:
        'Dit beleid beschrijft de maatregelen die wij nemen voor de behandeling en verwerking van uw persoonsgegevens en uw rechten als betrokkene.',
      processor:
        'Vesalius verwerkt als verwerker gevoelige gegevens, zoals gezondheidsgegevens, in opdracht van ziekenhuizen en zorgverleners. Voor informatie over de verwerking van uw persoonsgegevens neemt u daarom best contact met hen op.',
      contact:
        'U kunt reageren op een van de hieronder beschreven verwerkingen door contact met ons op te nemen. Wij informeren u dat uw gegevens worden gebruikt in overeenstemming met deze gegevensbeschermingsverklaring.',
    },
    definitions: {
      title: '1. Definities',
      introduction:
        'In deze verklaring hebben de volgende woorden en uitdrukkingen de onderstaande betekenis:',
      items: [
        { term: 'Verklaring', description: 'Deze privacyverklaring.' },
        {
          term: 'Algemene gebruiksvoorwaarden',
          description:
            'De algemene voorwaarden en gebruiksvoorwaarden van Vesalius die het gebruik van Vesalius regelen.',
        },
        {
          term: 'Persoonsgegevens',
          description:
            'Alle informatie over een geïdentificeerde of identificeerbare natuurlijke persoon die overeenkomstig deze verklaring wordt verwerkt, zoals beschreven in het artikel "De verwerkte gegevens".',
        },
        {
          term: 'Gezondheidsgegevens',
          description:
            'Persoonsgegevens over de lichamelijke of geestelijke gezondheid van een natuurlijke persoon die informatie over diens gezondheidstoestand onthullen.',
        },
        {
          term: 'Onze professionele zorgpartners',
          description:
            'De zorgverleners die via Vesalius met de patiënt verbonden zijn.',
        },
        {
          term: 'Onze diensten',
          description:
            'Alle diensten die wij via Vesalius leveren in het kader van onze professionele activiteit of ter uitvoering van ons statutair doel, zoals beschreven in onze algemene gebruiksvoorwaarden.',
        },
        {
          term: 'Verwerkingsverantwoordelijke',
          description:
            'De rechtspersoon die overeenkomstig deze verklaring het doel en de middelen van de verwerking van persoonsgegevens bepaalt, namelijk wij.',
        },
        {
          term: 'Verwerking',
          description:
            'Elke bewerking of elk geheel van bewerkingen met betrekking tot persoonsgegevens, al dan niet uitgevoerd met geautomatiseerde procedés, zoals het verzamelen, vastleggen, ordenen, structureren, opslaan, aanpassen of wijzigen, opvragen, raadplegen, gebruiken, verstrekken door doorzending, verspreiden of op een andere manier ter beschikking stellen, aligneren of combineren, afschermen, wissen of vernietigen van gegevens.',
        },
        {
          term: 'Geanonimiseerde gegevens',
          description:
            'Het verwijderen van identificerende elementen, zoals naam en e-mailadres, en het gebruik van afschermingsgegevens.',
        },
        {
          term: 'DPO',
          description:
            'De functionaris voor gegevensbescherming (DPO) is de persoon die toeziet op de naleving door Vesalius van de Algemene Verordening Gegevensbescherming (AVG) met betrekking tot de bescherming van persoonsgegevens.',
        },
      ],
    },
    processing: {
      title: '2. Waarom verwerken wij uw gegevens?',
      introduction:
        'Wij verzamelen en verwerken uw persoonsgegevens om verschillende redenen op basis van een rechtsgrond die door de AVG wordt bepaald (bijvoorbeeld om te voldoen aan een wettelijke verplichting waaraan wij onderworpen zijn of om een met u gesloten overeenkomst uit te voeren).',
      purposes: [
        {
          title: 'Beheer van onze klanten in de gezondheidszorg',
          description:
            'Wij verwerken uw persoonsgegevens om handelingen uit te voeren met betrekking tot overeenkomsten, facturen, boekhouding en het verstrekken van documenten. Wij kunnen uw persoonsgegevens verwerken om contact met u of een lid van uw team op te nemen en uw vragen te beantwoorden.',
          legalBasis: 'Rechtsgrond: artikel 6.1.b) en 6.1.c) van de AVG',
        },
        {
          title: 'Beheer van de toepassing en identificatie/authenticatie',
          description:
            'Wij verwerken uw persoonsgegevens om u toegang te geven tot onze toepassing. Wij kunnen uw gegevens ook verwerken om contact met u op te nemen en uw vragen te beantwoorden en om het technische beheer en de beveiliging van Vesalius te verzekeren.',
          legalBasis: 'Rechtsgrond: artikel 6.1.b) en 6.2.f) van de AVG',
        },
        {
          title: 'Beheer van onze patiënten/klanten',
          description:
            'Wij verwerken uw persoonsgegevens om handelingen uit te voeren met betrekking tot overeenkomsten, facturen, boekhouding en het verstrekken van documenten. Wij kunnen uw persoonsgegevens verwerken om contact met u op te nemen en uw vragen te beantwoorden.',
          legalBasis: 'Rechtsgrond: artikel 6.1.b) en 6.1.c) van de AVG',
        },
        {
          title: 'Onderzoek, statistieken en verbetering van onze toepassingssoftware',
          description:
            'Wij verwerken persoonsgegevens om onze diensten te leveren en te verbeteren. Wij voeren statistische analyses uit met geanonimiseerde gegevens. U kunt uw toestemming op elk moment intrekken door contact met ons op te nemen (privacy@vesalius.health).',
          legalBasis: 'Rechtsgrond: artikel 6.1.a) van de AVG (toestemming)',
        },
        {
          title: 'Beheer van onze communicatie',
          description:
            'Wij verwerken persoonsgegevens om u informatie te bezorgen over onze activiteiten en diensten. U kunt bezwaar maken tegen de verwerking door contact met ons op te nemen.',
          legalBasis: 'Rechtsgrond: artikel 6.2.f) van de AVG (gerechtvaardigd belang)',
        },
        {
          title: 'Beheer van onze precontractuele relaties',
          description:
            'Wij verwerken uw persoonsgegevens om te antwoorden op verzoeken die u tot ons richt (in het bijzonder via het contactformulier op onze website) of wanneer u ons uw curriculum vitae heeft bezorgd.',
          legalBasis: 'Rechtsgrond: artikel 6.1.b) van de AVG',
        },
        {
          title: 'Beheer van onze leveranciers',
          description:
            'Wij verwerken persoonsgegevens om onze contractuele verplichtingen tegenover u of uw onderneming na te komen, of om te voldoen aan onze wettelijke verplichtingen, bijvoorbeeld boekhoudkundige verplichtingen.',
          legalBasis: 'Rechtsgrond: artikel 6.1.b) en 6.1.c) van de AVG',
        },
        {
          title: 'Beheer van onze geschillen',
          description:
            'Wij kunnen uw persoonsgegevens gebruiken om tegemoet te komen aan ons gerechtvaardigd belang of dat van derden wanneer dit noodzakelijk is, zonder uw belangen of uw fundamentele vrijheden en rechten onevenredig te beïnvloeden, om een geschil te beheren.',
          legalBasis: 'Rechtsgrond: artikel 6.1.f) en 9.2.f) van de AVG',
        },
      ],
    },
    collectedData: {
      title: '3. Welke gegevens worden verzameld en verwerkt?',
      introduction:
        'Wij verzamelen alleen persoonsgegevens die toereikend, ter zake dienend en beperkt zijn tot wat noodzakelijk is voor de doeleinden waarvoor ze worden verwerkt.',
      groups: [
        {
          title: 'Beheer van klanten in de gezondheidszorg',
          items: [
            'Persoonlijke identificatiegegevens: voor- en achternaam; privé-adres; telefoonnummer',
            'Elektronische identificatiegegevens: e-mailadres',
            'Professionele gegevens: functietitel; werkplaats; Riziv/INAMI-nummer; btw-nummer',
          ],
        },
        {
          title: 'Beheer van patiënten/klanten',
          items: [
            'Persoonlijke identificatiegegevens: voor- en achternaam; privé-adres; telefoonnummer; rijksregisternummer',
            'Elektronische identificatiegegevens: e-mailadres, IP-adres; versleuteld wachtwoord en gebruikersnaam, of pincode',
            'Persoonlijke kenmerken: geboortedatum; geboorteplaats; geslacht; nationaliteit',
            'Familiale gegevens: burgerlijke en familiale staat; gezinssamenstelling',
            'Gesprekken: uw medische interacties via het platform',
            'Afspraken: uw medische afspraken met verschillende artsen',
            'Verwijsbrieven en andere gegevens met betrekking tot uw afspraken',
          ],
        },
        {
          title: 'Beheer van de toepassing (artsen)',
          items: [
            'Persoonlijke identificatiegegevens: voor- en achternaam; privé-adres; telefoonnummer',
            'Elektronische identificatiegegevens: e-mailadres, versleuteld wachtwoord en gebruikersnaam; IP-adres',
            'Professionele gegevens: functietitel; werkplaats; Riziv/INAMI-nummer; rijksregisternummer',
          ],
        },
        {
          title: 'Onderzoek, statistieken en verbetering van de toepassing',
          items: [
            'Persoonlijke identificatiegegevens: familienaam, voornaam, adres, telefoonnummer',
            'Elektronische identificatiegegevens: e-mailadres, versleuteld wachtwoord',
            'Persoonlijke kenmerken: nationaliteit, geslacht, gesproken talen, land en dorp/stad van geboorte',
            'Gezondheidsgegevens, versleutelde gegevens, gesprekken',
          ],
        },
      ],
    },
    thirdParties: {
      title: '4. Worden uw gegevens bekendgemaakt aan of gedeeld met derden?',
      paragraphs: [
        'De hierboven vermelde gegevens zijn toegankelijk voor personen die deel uitmaken van ons team of als medewerkers of professionele zorgverleners tussenkomen, en alleen voor zover dit strikt noodzakelijk is voor onze advocaten of technische adviseurs, bank- of verzekeringsorganisaties.',
        'Wij kunnen uw gegevens ook doorgeven:',
        'Wij kunnen ook verplicht zijn om bepaalde gegevens toegankelijk te maken voor onze medecontractanten, die in de zin van de wetgeving als "verwerkers" worden gekwalificeerd. In alle omstandigheden verzekeren wij de bescherming van uw gegevens door middel van overeenkomsten die de vertrouwelijkheid waarborgen.',
      ],
      transferReasons: [
        'Op verzoek van een wettelijke, gerechtelijke of administratieve autoriteit of een medewerker van het gerecht',
        'Te goeder trouw, wanneer wij van oordeel zijn dat deze handeling noodzakelijk is om te voldoen aan een geldende wet of regelgeving',
        'Om onze rechten of die van andere gebruikers van onze diensten te beschermen en te verdedigen',
      ],
      providersTitle: 'Dienstverleners (allemaal in Europa, tenzij anders vermeld)',
      providers: [
        'Klantendiensttool voor feedback en klachtenbehandeling',
        'Softwareontwikkelingsbedrijf',
        'Documentbeheer, productiviteitstools en e-maildiensten',
        'Database-infrastructuur en dienstverlener',
        'Cloudprovider en databaseserver',
        'CRM- en communicatietools',
        'Advocaten en juridische dienstverleners',
        'HR-diensten en sociale zekerheid',
        'Accountants en financiële dienstverleners',
        'Aanbieders van IT-oplossingen (VS)',
      ],
      providersNote:
        'Meer informatie over de verwerkers is beschikbaar via privacy@vesalius.health',
    },
    transfers: {
      title: '5. Dragen wij uw gegevens over buiten de Europese Unie?',
      introduction:
        'Wij dragen geen gegevens over buiten de Europese Unie. Indien van toepassing worden gegevens alleen naar een land buiten de Unie doorgegeven indien en voor zover:',
      conditions: [
        'De Europese Commissie een besluit heeft genomen waarin een passend beschermingsniveau wordt toegekend dat gelijkwaardig is aan het beschermingsniveau van de Europese wetgeving',
        'De doorgifte wordt gedekt door een passende maatregel, zoals de standaardbepalingen van de Commissie',
        'U daarvoor toestemming heeft gegeven',
      ],
    },
    retention: {
      title: '6. Hoelang worden uw gegevens bewaard?',
      introduction:
        'Uw persoonsgegevens die wij verwerken, worden bewaard gedurende onze contractuele relatie, gedurende de strikt noodzakelijke termijn om aan onze wettelijke en contractuele verplichtingen te voldoen en gedurende de strikt noodzakelijke termijn om de vitale belangen van u of een andere persoon te beschermen.',
      tableHeaders: {
        processing: 'Verwerking',
        duration: 'Bewaartermijn',
      },
      rows: [
        { processing: 'Klant in de gezondheidszorg', duration: '7 jaar vanaf het einde van het boekjaar' },
        { processing: 'Patiënt/klant', duration: '30 jaar vanaf de laatste handeling' },
        {
          processing: 'Identificatie/authenticatie',
          duration: 'Verwijderd aan het einde van de contractuele relatie',
        },
        { processing: 'Onderzoek, statistieken', duration: '20 jaar na afloop van het onderzoek' },
        { processing: 'Communicatie', duration: '2 jaar vanaf het laatste contact' },
        { processing: 'Precontractuele relaties', duration: '2 jaar na het laatste contact' },
        { processing: 'Leveranciers', duration: '7 jaar vanaf het einde van het boekjaar' },
        { processing: 'Geschillen', duration: '7 jaar vanaf de kennisgeving van de beslissing' },
      ],
    },
    protection: {
      title: '7. Hoe beschermen wij uw privacy?',
      introduction:
        'Wij streven ernaar uw persoonsgegevens optimaal te beschermen tegen ongeoorloofd gebruik en lekken. Daartoe gebruiken wij fysieke, organisatorische, technologische en administratieve maatregelen, zoals:',
      measures: [
        'Wij gebruiken erkende beveiligings- en versleutelingsprocessen om de veiligheid van de overdracht en opslag van uw gegevens te verzekeren',
        'Wij hebben organisatorische maatregelen ingevoerd, zoals het beperken van de toegang tot onze computersystemen volgens de strikte behoeften van elk personeelslid',
        'Zodra mogelijk worden uw gegevens gepseudonimiseerd of geanonimiseerd',
        'Wij hosten uw informatie op servers die beschermd zijn met passende beveiliging en certificaten',
        'Wij hebben een intern privacybeleid en organiseren regelmatig basisopleidingen om het bewustzijn rond gegevensprivacy te onderhouden',
      ],
    },
    rights: {
      title: '8. Wat zijn uw rechten en hoe kunt u ze uitoefenen?',
      contactIntroduction:
        'Wij hechten veel belang aan de rechten die wij als individuen hebben. Neem contact met ons op via:',
      contactOr: 'of',
      dpoIntroduction: 'Onze DPO is bereikbaar via:',
      rights: [
        {
          title: 'Recht op inzage, informatie en rectificatie',
          description:
            'U kunt op elk moment informatie vragen over onze verwerkingen, de nagestreefde doeleinden en de categorieën persoonsgegevens die wij over u bewaren. U kunt ook vragen om uw gegevens te corrigeren of aan te vullen wanneer ze onjuist of onvolledig blijken te zijn.',
        },
        {
          title: 'Recht op beperking van de verwerking',
          description:
            'U heeft het recht om te vragen dat de verwerking van uw persoonsgegevens wordt beperkt wanneer u de juistheid ervan betwist, wanneer de verwerking onrechtmatig is of wanneer wij uw gegevens niet langer nodig hebben maar u ze nodig heeft voor een rechtsvordering.',
        },
        {
          title: 'Recht van bezwaar',
          description:
            'U kunt bezwaar maken tegen de verwerking van uw persoonsgegevens wanneer uw gegevens worden verwerkt op basis van ons gerechtvaardigd belang of op basis van toestemming. U kunt ook op "uitschrijven" klikken in elke commerciële e-mail die u van ons ontvangt.',
        },
        {
          title: 'Recht op gegevensoverdraagbaarheid',
          description:
            'Wanneer uw informatie wordt verwerkt als onderdeel van onze contractuele verplichtingen of op basis van uw toestemming, heeft u het recht om uw persoonsgegevens te laten overdragen in de vorm waarin wij ze bewaren.',
        },
        {
          title: 'Recht op wissing / recht om vergeten te worden',
          description:
            'In de gevallen die door de AVG of de wet worden voorzien, zullen wij uw persoonsgegevens op uw verzoek verwijderen. In principe kunt u uw rechten kosteloos uitoefenen.',
        },
        {
          title: 'Recht op menselijke tussenkomst bij individuele besluitvorming',
          description:
            'U heeft het recht niet te worden onderworpen aan een beslissing die uitsluitend gebaseerd is op geautomatiseerde verwerking. Wij combineren geautomatiseerde processen met menselijke tussenkomst.',
        },
      ],
      complaintTitle: 'Een klacht indienen',
      complaintIntroduction:
        'U heeft het recht een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA):',
      addressLabel: 'Drukpersstraat 35, 1000 Brussel',
      phoneLabel: 'Telefoon:',
      emailLabel: 'E-mail:',
      websiteLabel: 'Website:',
    },
    cookies: {
      title: '9. Gebruiken wij cookies?',
      body: 'Een cookie is een code in de vorm van een bestand dat op uw computer wordt opgeslagen. Cookies helpen ons onze website te verbeteren, uw navigatie te vergemakkelijken en bezoekersaantallen te analyseren. Lees meer over ons Cookiebeleid.',
    },
    law: {
      title: '10. Welk recht is van toepassing en welke rechtbanken zijn bevoegd?',
      body: 'Dit beleid wordt beheerst door het Belgische recht. Elk geschil met betrekking tot de interpretatie of uitvoering van dit beleid valt onder het Belgische recht en onder de exclusieve bevoegdheid van de rechtbanken van het gerechtelijk arrondissement Brussel.',
    },
    updates: {
      title: '11. Let op updates van dit beleid!',
      body: 'Dit beleid kan op elk moment zonder voorafgaande kennisgeving worden bijgewerkt. Wij raden u aan het regelmatig te raadplegen.',
    },
  },
  fr: {
    metadata: {
      title: 'Politique de confidentialité',
      description:
        'Consultez la politique de confidentialité de Vesalius concernant le traitement des données personnelles, les droits RGPD, les mesures de sécurité, la conservation et les coordonnées.',
    },
    hero: {
      title: 'Politique de confidentialité',
      version: 'Version 1 - janvier 2025',
    },
    tableOfContentsTitle: 'Table des matières',
    tableOfContents: [
      { id: 'definitions', label: '1. Définitions' },
      { id: 'why-process', label: '2. Pourquoi traitons-nous vos données ?' },
      { id: 'what-data', label: '3. Quelles données sont collectées et traitées ?' },
      {
        id: 'third-parties',
        label: '4. Vos données sont-elles communiquées ou partagées avec des tiers ?',
      },
      {
        id: 'transfers',
        label: '5. Transférons-nous vos données en dehors de l’Union européenne ?',
      },
      { id: 'retention', label: '6. Combien de temps vos données sont-elles conservées ?' },
      { id: 'protection', label: '7. Comment protégeons-nous votre vie privée ?' },
      {
        id: 'rights',
        label: '8. Quels sont vos droits et comment les exercer ?',
      },
      { id: 'cookies', label: '9. Utilisons-nous des cookies ?' },
      {
        id: 'law',
        label: '10. Quel est le droit applicable et quelles sont les juridictions compétentes ?',
      },
      { id: 'updates', label: '11. Soyez attentif aux mises à jour de cette politique' },
    ],
    introduction: {
      establishedBy: 'La présente politique est établie par Vesalius Health BV :',
      address: 'Ottergemsesteenweg-Zuid 808b bus 48, 9000 Gand',
      vat: 'TVA : 1011.125.426',
      email: 'privacy@vesalius.health',
      hereinafter: 'Ci-après, « Vesalius » ou « nous », « notre », « nos ».',
      vigilance:
        'Nous accordons une attention particulière à la protection des données à caractère personnel (ci-après les données) et au respect de la vie privée de toutes les personnes qui entrent en contact avec nous. Nous agissons de manière transparente, conformément aux dispositions nationales et internationales en la matière, notamment au Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l’égard du traitement des données à caractère personnel et à la libre circulation de ces données, qui abroge la directive 95/46/CE (ci-après le « Règlement général sur la protection des données » ou « RGPD »).',
      purpose:
        'La présente politique décrit les mesures prises pour le traitement de vos données à caractère personnel ainsi que vos droits en tant que personne concernée.',
      processor:
        'En tant que sous-traitant de données sensibles, telles que des données de santé, Vesalius traite ces données pour le compte d’hôpitaux et de prestataires de soins de santé. Vous devez donc vous adresser à ceux-ci pour toute information relative au traitement de vos données à caractère personnel.',
      contact:
        'Vous pouvez réagir à l’un des traitements décrits ci-dessous en nous contactant. Nous vous informons que vos données seront utilisées conformément à la présente déclaration de protection des données.',
    },
    definitions: {
      title: '1. Définitions',
      introduction:
        'Dans la présente déclaration, les mots et expressions suivants ont la signification indiquée ci-dessous :',
      items: [
        { term: 'Déclaration', description: 'La présente déclaration de confidentialité.' },
        {
          term: 'Conditions générales d’utilisation',
          description:
            'Les conditions générales et conditions d’utilisation de Vesalius qui régissent l’utilisation de Vesalius.',
        },
        {
          term: 'Données à caractère personnel',
          description:
            'Toute information traitée relative à une personne physique identifiée ou identifiable conformément à la présente déclaration, telle que décrite dans l’article « Les données traitées ».',
        },
        {
          term: 'Données relatives à la santé',
          description:
            'Les données à caractère personnel relatives à la santé physique ou mentale d’une personne physique qui révèlent des informations sur son état de santé.',
        },
        {
          term: 'Nos partenaires professionnels de santé',
          description:
            'Les professionnels de santé qui sont en relation avec le patient via Vesalius.',
        },
        {
          term: 'Nos services',
          description:
            'Tous les services que nous fournissons sur Vesalius dans le cadre de notre activité professionnelle ou de l’exécution de notre objet statutaire, tels que décrits dans nos conditions générales d’utilisation.',
        },
        {
          term: 'Responsable du traitement',
          description:
            'La personne morale qui détermine les finalités et les moyens du traitement des données à caractère personnel conformément à la présente déclaration, à savoir nous-mêmes.',
        },
        {
          term: 'Traitement',
          description:
            'Toute opération ou tout ensemble d’opérations effectuées ou non à l’aide de procédés automatisés et appliquées à des données à caractère personnel, telles que la collecte, l’enregistrement, l’organisation, la conservation, l’adaptation ou la modification, l’extraction, la consultation, l’utilisation, la communication par transmission, la diffusion ou toute autre forme de mise à disposition, le rapprochement ou l’interconnexion, ainsi que le verrouillage, l’effacement ou la destruction de données à caractère personnel.',
        },
        {
          term: 'Données anonymisées',
          description:
            'La suppression des éléments identifiants tels que le nom et l’adresse électronique et l’utilisation de données masquées.',
        },
        {
          term: 'DPO',
          description:
            'Le délégué à la protection des données (DPO) est la personne qui veille au respect par Vesalius du Règlement général sur la protection des données (RGPD) en matière de protection des données à caractère personnel.',
        },
      ],
    },
    processing: {
      title: '2. Pourquoi traitons-nous vos données ?',
      introduction:
        'Nous collectons et traitons vos données à caractère personnel pour différentes raisons fondées sur une base juridique déterminée par le RGPD (par exemple, le respect d’une obligation légale à laquelle nous sommes soumis ou l’exécution d’un contrat conclu avec vous).',
      purposes: [
        {
          title: 'Gestion de nos clients du secteur des soins de santé',
          description:
            'Nous traitons vos données à caractère personnel afin d’effectuer des opérations relatives aux contrats, aux factures, à la comptabilité et à la fourniture de documents. Nous pouvons traiter vos données à caractère personnel pour vous contacter ou contacter un membre de votre équipe et répondre à vos questions.',
          legalBasis: 'Base juridique : article 6.1.b) et 6.1.c) du RGPD',
        },
        {
          title: 'Gestion de l’application et identification/authentification',
          description:
            'Nous traitons vos données à caractère personnel pour vous donner accès à notre application. Nous pouvons également traiter vos données pour vous contacter et répondre à vos questions, ainsi que pour assurer l’administration technique et la sécurité de Vesalius.',
          legalBasis: 'Base juridique : article 6.1.b) et 6.2.f) du RGPD',
        },
        {
          title: 'Gestion de nos patients/clients',
          description:
            'Nous traitons vos données à caractère personnel afin d’effectuer des opérations relatives aux contrats, aux factures, à la comptabilité et à la fourniture de documents. Nous pouvons traiter vos données à caractère personnel pour vous contacter et répondre à vos questions.',
          legalBasis: 'Base juridique : article 6.1.b) et 6.1.c) du RGPD',
        },
        {
          title: 'Recherche, statistiques et amélioration de nos logiciels applicatifs',
          description:
            'Nous traitons des données à caractère personnel afin de fournir et d’améliorer nos services. Nous réalisons des analyses statistiques à partir de données anonymisées. Vous pouvez retirer votre consentement à tout moment en nous contactant (privacy@vesalius.health).',
          legalBasis: 'Base juridique : article 6.1.a) du RGPD (consentement)',
        },
        {
          title: 'Gestion de nos communications',
          description:
            'Nous traitons des données à caractère personnel afin de vous fournir des informations relatives à nos activités et services. Vous pouvez vous opposer au traitement en nous contactant.',
          legalBasis:
            'Base juridique : article 6.2.f) du RGPD (intérêt légitime)',
        },
        {
          title: 'Gestion de nos relations précontractuelles',
          description:
            'Nous traitons vos données à caractère personnel afin de répondre aux demandes que vous nous adressez (notamment via le formulaire de contact de notre site) ou si vous nous avez envoyé votre curriculum vitae.',
          legalBasis: 'Base juridique : article 6.1.b) du RGPD',
        },
        {
          title: 'Gestion de nos fournisseurs',
          description:
            'Nous traitons des données à caractère personnel afin de remplir nos obligations contractuelles envers vous ou votre entreprise, ou nos obligations légales, notamment nos obligations comptables.',
          legalBasis: 'Base juridique : article 6.1.b) et 6.1.c) du RGPD',
        },
        {
          title: 'Gestion de nos litiges',
          description:
            'Nous pouvons utiliser vos données à caractère personnel pour répondre à notre intérêt légitime ou à celui de tiers lorsque cela est nécessaire, sans porter atteinte à vos intérêts ni à vos libertés et droits fondamentaux, afin de gérer un litige.',
          legalBasis: 'Base juridique : article 6.1.f) et 9.2.f) du RGPD',
        },
      ],
    },
    collectedData: {
      title: '3. Quelles données sont collectées et traitées ?',
      introduction:
        'Nous ne collectons que les données à caractère personnel qui sont adéquates, pertinentes et limitées à ce qui est strictement nécessaire au regard des finalités pour lesquelles elles sont traitées.',
      groups: [
        {
          title: 'Gestion des clients du secteur des soins de santé',
          items: [
            'Données d’identification personnelles : nom et prénom ; adresse personnelle ; numéro de téléphone',
            'Données d’identification électronique : adresse électronique',
            'Données professionnelles : fonction ; lieu de travail ; numéro Riziv/INAMI ; TVA',
          ],
        },
        {
          title: 'Gestion des patients/clients',
          items: [
            'Données d’identification personnelles : nom et prénom ; adresse personnelle ; numéro de téléphone ; numéro de registre national',
            'Données d’identification électronique : adresse électronique, adresse IP ; mot de passe et nom d’utilisateur chiffrés, ou code PIN',
            'Caractéristiques personnelles : date de naissance ; lieu de naissance ; sexe ; nationalité',
            'Données familiales : état civil et situation familiale ; composition de la famille',
            'Conversations : vos interactions médicales via la plateforme',
            'Rendez-vous : vos rendez-vous médicaux avec différents médecins',
            'Lettres d’orientation et autres données relatives à vos rendez-vous',
          ],
        },
        {
          title: 'Gestion de l’application (médecins)',
          items: [
            'Données d’identification personnelles : nom et prénom ; adresse personnelle ; numéro de téléphone',
            'Données d’identification électronique : adresse électronique, mot de passe et nom d’utilisateur chiffrés ; adresse IP',
            'Données professionnelles : fonction ; lieu de travail ; numéro Riziv/INAMI ; numéro de registre national',
          ],
        },
        {
          title: 'Recherche, statistiques et amélioration de l’application',
          items: [
            'Données d’identification personnelles : nom, prénom, adresse, numéro de téléphone',
            'Données d’identification électronique : adresse électronique, mot de passe chiffré',
            'Caractéristiques personnelles : nationalité, sexe, langues parlées, pays et ville de naissance',
            'Données de santé, données chiffrées, conversations',
          ],
        },
      ],
    },
    thirdParties: {
      title: '4. Vos données sont-elles communiquées ou partagées avec des tiers ?',
      paragraphs: [
        'Les données énumérées ci-dessus sont accessibles aux membres de notre équipe, aux collaborateurs et aux professionnels de santé intervenant, et uniquement dans la stricte mesure nécessaire à nos avocats ou conseillers techniques, aux organismes bancaires ou d’assurance.',
        'Nous sommes également susceptibles de transmettre vos données :',
        'Nous pouvons également être tenus de donner accès à certaines données à nos cocontractants, qualifiés de « sous-traitants » au sens de la législation. En toutes circonstances, nous assurons la protection de vos données au moyen d’accords garantissant la confidentialité.',
      ],
      transferReasons: [
        'À la demande d’une autorité légale, judiciaire ou administrative ou d’un auxiliaire de justice',
        'De bonne foi, lorsque nous estimons que cette mesure est nécessaire pour respecter toute loi ou réglementation en vigueur',
        'Afin de protéger et de défendre nos droits ou ceux des autres utilisateurs de nos services',
      ],
      providersTitle: 'Prestataires de services (tous en Europe sauf indication contraire)',
      providers: [
        'Outil de service client pour le traitement des commentaires et des réclamations',
        'Société de développement logiciel',
        'Gestion documentaire, outils de productivité et e-mails',
        'Infrastructure de base de données et prestataire de services',
        'Fournisseur cloud et serveur de base de données',
        'Outils CRM et de communication',
        'Avocats et prestataires de services juridiques',
        'Services RH et sécurité sociale',
        'Comptables et prestataires de services financiers',
        'Fournisseurs de solutions informatiques (États-Unis)',
      ],
      providersNote:
        'De plus amples informations sur les sous-traitants sont disponibles via privacy@vesalius.health',
    },
    transfers: {
      title: '5. Transférons-nous vos données en dehors de l’Union européenne ?',
      introduction:
        'Nous n’effectuons pas de transferts en dehors de l’Union européenne. Le cas échéant, les transferts de données vers un pays situé en dehors de l’Union ne seront autorisés que si et seulement si :',
      conditions: [
        'La Commission européenne a pris une décision reconnaissant un niveau de protection adéquat équivalent à celui prévu par la législation européenne',
        'Le transfert est couvert par une mesure appropriée telle que les clauses types de la Commission',
        'Vous avez donné votre consentement',
      ],
    },
    retention: {
      title: '6. Combien de temps vos données sont-elles conservées ?',
      introduction:
        'Vos données à caractère personnel que nous traitons sont conservées pendant la durée de notre relation contractuelle, pendant le temps strictement nécessaire à l’accomplissement de nos obligations légales et contractuelles et pendant le temps strictement nécessaire à la protection de vos intérêts vitaux ou de ceux de toute autre personne.',
      tableHeaders: {
        processing: 'Traitement',
        duration: 'Durée',
      },
      rows: [
        { processing: 'Client du secteur des soins de santé', duration: '7 ans à compter de la fin de l’exercice comptable' },
        { processing: 'Patient/client', duration: '30 ans à compter de la dernière action' },
        {
          processing: 'Identification/authentification',
          duration: 'Supprimées à la fin de la relation contractuelle',
        },
        { processing: 'Recherche, statistiques', duration: '20 ans après la fin de l’étude' },
        { processing: 'Communication', duration: '2 ans à compter du dernier contact' },
        { processing: 'Relations précontractuelles', duration: '2 ans après le dernier contact' },
        { processing: 'Fournisseurs', duration: '7 ans à compter de la fin de l’exercice comptable' },
        { processing: 'Litiges', duration: '7 ans à compter de la notification de la décision' },
      ],
    },
    protection: {
      title: '7. Comment protégeons-nous votre vie privée ?',
      introduction:
        'Nous nous efforçons de protéger au mieux vos données à caractère personnel contre toute utilisation non autorisée et toute fuite. À cette fin, nous mettons en œuvre des mesures physiques, organisationnelles, technologiques et administratives appropriées, telles que :',
      measures: [
        'Nous utilisons des processus de sécurité et de chiffrement reconnus afin d’assurer la sécurité de la transmission et du stockage de vos données',
        'Nous avons mis en place des mesures organisationnelles, telles que la limitation de l’accès à nos systèmes informatiques aux besoins stricts de chaque membre du personnel',
        'Dès que possible, vos données sont pseudonymisées ou anonymisées',
        'Nous hébergeons vos informations sur des serveurs protégés par des mesures de sécurité et des certificats appropriés',
        'Nous disposons d’une politique interne de confidentialité et organisons régulièrement des formations de base afin de maintenir la sensibilisation à la confidentialité des données',
      ],
    },
    rights: {
      title: '8. Quels sont vos droits et comment les exercer ?',
      contactIntroduction:
        'Nous accordons une grande importance aux droits que nous avons en tant qu’individus. Contactez-nous à l’adresse suivante :',
      contactOr: 'ou',
      dpoIntroduction: 'Notre DPO est joignable à l’adresse suivante :',
      rights: [
        {
          title: 'Droit d’accès, d’information et de rectification',
          description:
            'Vous pouvez à tout moment demander des informations sur nos traitements, les finalités poursuivies et les catégories de données à caractère personnel que nous détenons à votre sujet. Vous pouvez également demander que vos données soient corrigées ou complétées si elles se révèlent incorrectes ou incomplètes.',
        },
        {
          title: 'Droit à la limitation du traitement',
          description:
            'Vous avez le droit de demander la limitation du traitement de vos données à caractère personnel lorsque vous contestez leur exactitude, lorsque le traitement est illicite ou lorsque nous n’avons plus besoin de vos données mais que vous en avez besoin pour une action en justice.',
        },
        {
          title: 'Droit d’opposition',
          description:
            'Vous pouvez vous opposer au traitement de vos données à caractère personnel lorsque vos données sont traitées sur la base de nos intérêts légitimes ou de votre consentement. Vous pouvez également cliquer sur « se désabonner » dans chaque e-mail commercial que vous recevez de notre part.',
        },
        {
          title: 'Droit à la portabilité des données',
          description:
            'Si vos informations sont traitées dans le cadre de nos obligations contractuelles ou à la suite de votre consentement, vous avez le droit de faire transférer vos données à caractère personnel dans la forme sous laquelle nous les détenons.',
        },
        {
          title: 'Droit à l’effacement / droit à l’oubli',
          description:
            'Dans les cas prévus par le RGPD ou la loi, nous procéderons à la suppression de vos données à caractère personnel à votre demande. En principe, vous pouvez exercer vos droits gratuitement.',
        },
        {
          title: 'Droit à une décision individuelle',
          description:
            'Vous avez le droit de ne pas faire l’objet d’une décision fondée exclusivement sur un traitement automatisé. Nous combinons des processus automatisés avec une intervention humaine.',
        },
      ],
      complaintTitle: 'Introduire une réclamation',
      complaintIntroduction:
        'Vous avez le droit d’introduire une réclamation auprès de l’Autorité de protection des données (APD) :',
      addressLabel: 'Rue de la Presse 35, 1000 Bruxelles',
      phoneLabel: 'Téléphone :',
      emailLabel: 'E-mail :',
      websiteLabel: 'Site web :',
    },
    cookies: {
      title: '9. Utilisons-nous des cookies ?',
      body: 'Un cookie est un code sous la forme d’un fichier stocké sur votre ordinateur. Les cookies nous aident à améliorer notre site web, à faciliter votre navigation et à analyser l’audience. En savoir plus sur notre politique en matière de cookies.',
    },
    law: {
      title: '10. Quel est le droit applicable et quelles sont les juridictions compétentes ?',
      body: 'La présente politique est régie par le droit belge. Tout litige relatif à l’interprétation ou à l’exécution de la présente politique sera soumis au droit belge et relèvera de la compétence exclusive des tribunaux de l’arrondissement judiciaire de Bruxelles.',
    },
    updates: {
      title: '11. Soyez attentif aux mises à jour de cette politique !',
      body: 'La présente politique peut être mise à jour à tout moment sans notification de modification. Nous vous conseillons et vous invitons à la consulter régulièrement.',
    },
  },
} satisfies Record<SiteLocale, PrivacyPolicyCopy>;

export function getPrivacyPolicyCopy(locale: SiteLocale): PrivacyPolicyCopy {
  return copyByLocale[locale];
}
