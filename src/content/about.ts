/**
 * About page copy (source: the "Our Story" brief). Only facts we can stand behind are published; the brief's
 * [[FILL]] items are left out and its [[VERIFY]] items are either confirmed elsewhere on the site or omitted.
 */

export type SiteLocale = 'en' | 'nl' | 'fr';

/**
 * The co-founder's note is a quote in a real person's name: it stays off the page until Dr. Van Overschelde has
 * approved the wording in each language and the title he wants to use.
 */
export const FOUNDER_NOTE_APPROVED = false;

export interface AboutCopy {
  meta: { title: string; description: string };
  hero: { before: string; accent: string; after: string; body: string };
  facts: { value: string; label: string }[];
  origin: { title: string; paragraphs: string[]; close: string };
  founderNote: { title: string; quote: string; name: string; role: string };
  name: {
    title: string;
    paragraphs: string[];
    belief: string;
    beliefAfter: string;
    closing: string;
    caption: string;
    portraitAlt: string;
    marks: { year: string; label: string }[];
  };
  beliefs: { title: string; items: { title: string; body: string }[] };
  doctors: { title: string; body: string };
  trust: { title: string; body: string; items: { title: string; body: string }[]; link: string };
  timeline: { title: string; items: { when: string; what: string }[] };
  people: {
    title: string;
    body: string;
    cofounder: string;
    surgeon: string;
    customerSuccess: string;
    origin: string;
    careersTitle: string;
    careersBody: string;
    careersCta: string;
  };
  ghent: { title: string; paragraphs: string[]; contactTitle: string; mapLabel: string };
}

export const ABOUT: Record<SiteLocale, AboutCopy> = {
  en: {
    meta: {
      title: 'About Vesalius · Healthcare AI built in Ghent, Belgium',
      description: 'Vesalius is a Ghent-based healthcare AI company building an assistant that handles intake, notes and follow-up, so doctors can be doctors again.',
    },
    hero: {
      before: 'We give doctors their ',
      accent: 'consultations',
      after: ' back.',
      body: 'Vesalius is a healthcare AI company from Ghent, Belgium. We build one assistant that handles everything around the consultation: intake, triage, notes, letters and follow-up. The time in the room belongs to you and your patient.',
    },
    facts: [
      { value: 'Ghent, 2024', label: 'Founded in Belgium' },
      { value: 'Hip & knee surgeons', label: 'Built and tested with' },
      { value: '50+ languages', label: 'For the patient intake' },
    ],
    origin: {
      title: 'Why we started',
      paragraphs: [
        'It began in a consultation room in Ghent. A hip and knee surgeon was losing the first minutes of every visit to the same questions: where does it hurt, since when, which medication?',
        'So we let patients tell their story beforehand, at home and in their own language. It worked. And doctors immediately asked: can it also write the note? The referral letter? The follow-up?',
      ],
      close: 'That’s how one intake tool grew into Vesalius.',
    },
    founderNote: {
      title: 'A note from our co-founder',
      quote:
        'I became a surgeon to treat patients, not to type. Every doctor I know feels the same. Vesalius is the assistant I wanted in my own practice: it prepares the consultation, listens while I talk with my patient, and writes the paperwork so I can review and sign. It doesn’t make medical decisions. It gives me back the time to make them well.',
      name: 'Dr. Philippe Van Overschelde',
      role: 'Orthopaedic surgeon and co-founder',
    },
    name: {
      title: 'Why we’re called Vesalius',
      paragraphs: [
        'In 1514, a boy named Andries van Wesel was born in Brussels. The world would come to know him as Andreas Vesalius, the founder of modern human anatomy.',
        'For more than a thousand years, medicine had repeated what old books said about the human body, even where the books were wrong. Vesalius did something radical for his time: he looked for himself. Where his peers lectured from a distance, he worked with his own hands and urged his students to do the same. His De humani corporis fabrica (1543) changed medicine because it was built on direct observation.',
      ],
      belief: 'We took his name because we believe in the same thing, five centuries later: good medicine starts with paying attention to the patient in front of you.',
      beliefAfter: 'Everything we build is meant to clear the way for that attention.',
      closing: 'He was born in Brussels and studied in Leuven. Our story started in Ghent. We like the idea of carrying a Belgian name back into medicine.',
      caption: 'Andreas Vesalius in De humani corporis fabrica, 1543. Public domain.',
      portraitAlt: 'Woodcut portrait of Andreas Vesalius dissecting a forearm, from De humani corporis fabrica (1543)',
      marks: [
        { year: '1514', label: 'Born in Brussels' },
        { year: '1543', label: 'De humani corporis fabrica' },
        { year: '2024', label: 'Vesalius Health, Ghent' },
      ],
    },
    beliefs: {
      title: 'What we believe',
      items: [
        { title: 'The doctor decides. Always.', body: 'Vesalius prepares, listens and drafts. You review, correct and sign. We build assistants, not replacements.' },
        { title: 'The consultation is a conversation, not a data-entry session.', body: 'If you’re looking at a screen instead of your patient, the software has failed, not you.' },
        { title: 'No patient should be misunderstood because of the language they speak.', body: 'Patients can complete their intake in more than 50 languages.' },
        {
          title: 'Trust is earned in the details.',
          body: 'Plain answers about where your data goes, who can see it, and what our AI does and doesn’t do. If you can’t find an answer, ask us. A person will reply.',
        },
      ],
    },
    doctors: {
      title: 'Built with doctors, not just for them.',
      body: 'Vesalius was shaped from day one by the clinicians who use it. Surgeons and their assistants tested the first version before it ever saw a real patient, and doctors across specialties keep telling us what to fix next.',
    },
    trust: {
      title: 'How we handle what you trust us with',
      body: 'Patient conversations are the most sensitive data there is. Here is what we do with them, in plain language.',
      items: [
        { title: 'We work for you.', body: 'Under GDPR, Vesalius processes health data on behalf of the hospitals and doctors who use it.' },
        { title: 'Your data is protected.', body: 'Encryption, strict access controls and regular security assessments.' },
        { title: 'There’s a person accountable.', body: 'Our Data Protection Officer is reachable at dpo@vesalius.health.' },
      ],
      link: 'Read our security & privacy page',
    },
    timeline: {
      title: 'Our story so far',
      items: [
        { when: 'The beginning', what: 'A first prototype of AI-assisted anamnesis, built with hip and knee surgeons in Ghent.' },
        { when: 'July 2024', what: 'Vesalius Health is founded in Ghent.' },
        { when: 'September 2024', what: 'Vesalius launches for doctors.' },
        { when: 'March 2025', what: 'At Medical Update in the Mountains, we show how Vesalius automates clinical workflows with AI agents.' },
        { when: 'Today', what: 'Eight modules, one assistant: from the first patient message to the last follow-up.' },
      ],
    },
    people: {
      title: 'The people behind Vesalius',
      body: 'We’re a small team of engineers and clinicians in Ghent. Small enough that you’ll talk to the people who build the product.',
      cofounder: 'Co-founder',
      surgeon: 'Orthopaedic surgeon, hip & knee',
      customerSuccess: 'Customer Success',
      origin: 'Vesalius grew out of the engineering team at Endare, a Ghent software studio founded in 2012.',
      careersTitle: 'Want to build this with us?',
      careersBody: 'We’re always happy to hear from engineers, designers and clinicians who care about better care.',
      careersCta: 'Say hello',
    },
    ghent: {
      title: 'Made in Ghent',
      paragraphs: [
        'Ghent is a city of doctors, engineers and stubborn optimists: a university hospital, a top research university and a startup scene that likes to build useful things. Our office is on the Ottergemsesteenweg-Zuid, a short ride from the hospitals our users work in.',
        'Being Belgian means building for a healthcare system we know from the inside, in the languages our patients actually speak.',
      ],
      contactTitle: 'Prefer to talk to a person?',
      mapLabel: 'Open in Maps',
    },
  },
  nl: {
    meta: {
      title: 'Over Vesalius · Zorg-AI gebouwd in Gent',
      description: 'Vesalius is een AI-bedrijf voor de zorg uit Gent. We bouwen een assistent voor intake, nota’s en opvolging, zodat artsen opnieuw arts kunnen zijn.',
    },
    hero: {
      before: 'Wij geven artsen hun ',
      accent: 'consultatie',
      after: ' terug.',
      body: 'Vesalius is een AI-bedrijf voor de zorg uit Gent. We bouwen één assistent die alles rond het consult regelt: intake, triage, nota’s, brieven en opvolging. Zo is de tijd in de kamer van u en uw patiënt.',
    },
    facts: [
      { value: 'Gent, 2024', label: 'Opgericht in België' },
      { value: 'Heup- en kniechirurgen', label: 'Gebouwd en getest met' },
      { value: '50+ talen', label: 'Voor de intake van de patiënt' },
    ],
    origin: {
      title: 'Waarom we begonnen',
      paragraphs: [
        'Het begon in een consultatieruimte in Gent. Een heup- en kniechirurg verloor de eerste minuten van elk consult aan dezelfde vragen: waar doet het pijn, sinds wanneer, welke medicatie?',
        'Dus lieten we patiënten hun verhaal vooraf vertellen, thuis en in hun eigen taal. Het werkte. En artsen vroegen meteen: kan het ook de nota schrijven? De verwijsbrief? De opvolging?',
      ],
      close: 'Zo groeide één intaketool uit tot Vesalius.',
    },
    founderNote: {
      title: 'Een woord van onze medeoprichter',
      quote:
        'Ik werd chirurg om patiënten te behandelen, niet om te typen. Elke arts die ik ken, voelt dat ook zo. Vesalius is de assistent die ik in mijn eigen praktijk wilde: hij bereidt het consult voor, luistert mee terwijl ik met mijn patiënt praat, en schrijft het papierwerk zodat ik kan nalezen en ondertekenen. Hij neemt geen medische beslissingen. Hij geeft me de tijd terug om ze goed te nemen.',
      name: 'Dr. Philippe Van Overschelde',
      role: 'Orthopedisch chirurg en medeoprichter',
    },
    name: {
      title: 'Waarom we Vesalius heten',
      paragraphs: [
        'In 1514 werd in Brussel een jongen geboren: Andries van Wesel. De wereld zou hem leren kennen als Andreas Vesalius, de grondlegger van de moderne menselijke anatomie.',
        'Meer dan duizend jaar lang herhaalde de geneeskunde wat oude boeken over het menselijk lichaam zeiden, ook waar die boeken ernaast zaten. Vesalius deed iets wat toen radicaal was: hij keek zelf. Waar zijn collega’s van op afstand doceerden, werkte hij met zijn eigen handen, en hij spoorde zijn studenten aan hetzelfde te doen. Zijn De humani corporis fabrica (1543) veranderde de geneeskunde, omdat het steunde op rechtstreekse observatie.',
      ],
      belief: 'We kozen zijn naam omdat we vijf eeuwen later in hetzelfde geloven: goede geneeskunde begint bij aandacht voor de patiënt die voor u zit.',
      beliefAfter: 'Alles wat we bouwen, moet ruimte maken voor die aandacht.',
      closing: 'Hij werd geboren in Brussel en studeerde in Leuven. Ons verhaal begon in Gent. We vinden het een mooi idee dat een Belgische naam zo terugkeert in de geneeskunde.',
      caption: 'Andreas Vesalius in De humani corporis fabrica, 1543. Publiek domein.',
      portraitAlt: 'Houtsnede van Andreas Vesalius die een onderarm ontleedt, uit De humani corporis fabrica (1543)',
      marks: [
        { year: '1514', label: 'Geboren in Brussel' },
        { year: '1543', label: 'De humani corporis fabrica' },
        { year: '2024', label: 'Vesalius Health, Gent' },
      ],
    },
    beliefs: {
      title: 'Waar we in geloven',
      items: [
        { title: 'De arts beslist. Altijd.', body: 'Vesalius bereidt voor, luistert mee en schrijft een eerste versie. U leest na, past aan en ondertekent. We bouwen assistenten, geen vervangers.' },
        { title: 'Een consult is een gesprek, geen invoersessie.', body: 'Kijkt u naar een scherm in plaats van naar uw patiënt? Dan heeft de software gefaald, niet u.' },
        { title: 'Geen patiënt mag verkeerd begrepen worden door de taal die hij spreekt.', body: 'Patiënten kunnen hun intake in meer dan 50 talen invullen.' },
        {
          title: 'Vertrouwen verdien je in de details.',
          body: 'Duidelijke antwoorden over waar uw data naartoe gaan, wie ze kan zien en wat onze AI wel en niet doet. Vindt u een antwoord niet? Vraag het ons. Er antwoordt een mens.',
        },
      ],
    },
    doctors: {
      title: 'Gebouwd met artsen, niet alleen voor hen.',
      body: 'Vesalius werd vanaf dag één gevormd door de clinici die het gebruiken. Chirurgen en hun assistenten testten de eerste versie nog voor ze een echte patiënt zag, en artsen uit allerlei specialismen blijven ons vertellen wat we als volgende moeten verbeteren.',
    },
    trust: {
      title: 'Hoe we omgaan met wat u ons toevertrouwt',
      body: 'Gesprekken met patiënten zijn de gevoeligste data die er bestaan. Dit is wat we ermee doen, in gewone taal.',
      items: [
        { title: 'We werken voor u.', body: 'Volgens de AVG verwerkt Vesalius gezondheidsgegevens in opdracht van de ziekenhuizen en artsen die het gebruiken.' },
        { title: 'Uw data zijn beschermd.', body: 'Versleuteling, strikte toegangscontrole en regelmatige veiligheidsevaluaties.' },
        { title: 'Er is iemand verantwoordelijk.', body: 'Onze functionaris voor gegevensbescherming is bereikbaar via dpo@vesalius.health.' },
      ],
      link: 'Lees onze pagina over beveiliging en privacy',
    },
    timeline: {
      title: 'Ons verhaal tot nu toe',
      items: [
        { when: 'Het begin', what: 'Een eerste prototype van AI-ondersteunde anamnese, gebouwd met heup- en kniechirurgen in Gent.' },
        { when: 'Juli 2024', what: 'Vesalius Health wordt opgericht in Gent.' },
        { when: 'September 2024', what: 'Vesalius gaat live voor artsen.' },
        { when: 'Maart 2025', what: 'Op Medical Update in the Mountains tonen we hoe Vesalius klinische workflows automatiseert met AI-agents.' },
        { when: 'Vandaag', what: 'Acht modules, één assistent: van het eerste bericht van de patiënt tot de laatste opvolging.' },
      ],
    },
    people: {
      title: 'De mensen achter Vesalius',
      body: 'We zijn een klein team van ingenieurs en clinici in Gent. Klein genoeg om rechtstreeks te praten met de mensen die het product bouwen.',
      cofounder: 'Medeoprichter',
      surgeon: 'Orthopedisch chirurg, heup en knie',
      customerSuccess: 'Customer Success',
      origin: 'Vesalius groeide uit het ingenieursteam van Endare, een Gentse softwarestudio opgericht in 2012.',
      careersTitle: 'Wilt u dit mee bouwen?',
      careersBody: 'We horen graag van ingenieurs, designers en clinici die betere zorg belangrijk vinden.',
      careersCta: 'Stuur ons een bericht',
    },
    ghent: {
      title: 'Gemaakt in Gent',
      paragraphs: [
        'Gent is een stad van artsen, ingenieurs en koppige optimisten: een universitair ziekenhuis, een topuniversiteit en een startupscene die graag nuttige dingen bouwt. Ons kantoor ligt aan de Ottergemsesteenweg-Zuid, een korte rit van de ziekenhuizen waar onze gebruikers werken.',
        'Belgisch zijn betekent bouwen voor een zorgsysteem dat we van binnenuit kennen, in de talen die onze patiënten echt spreken.',
      ],
      contactTitle: 'Liever met een mens praten?',
      mapLabel: 'Open in Kaarten',
    },
  },
  fr: {
    meta: {
      title: 'À propos de Vesalius · IA médicale conçue à Gand',
      description: 'Vesalius est une entreprise gantoise d’IA médicale qui construit un assistant pour l’anamnèse, les notes et le suivi, pour que les médecins redeviennent médecins.',
    },
    hero: {
      before: 'Nous rendons aux médecins leurs ',
      accent: 'consultations',
      after: '.',
      body: 'Vesalius est une entreprise d’IA médicale basée à Gand, en Belgique. Nous construisons un assistant qui s’occupe de tout ce qui entoure la consultation : anamnèse, triage, notes, lettres et suivi. Le temps passé en consultation vous appartient, à vous et à votre patient.',
    },
    facts: [
      { value: 'Gand, 2024', label: 'Fondée en Belgique' },
      { value: 'Chirurgiens hanche et genou', label: 'Conçue et testée avec' },
      { value: '50+ langues', label: 'Pour l’anamnèse du patient' },
    ],
    origin: {
      title: 'Pourquoi nous avons commencé',
      paragraphs: [
        'Tout a commencé dans un cabinet de consultation à Gand. Un chirurgien de la hanche et du genou perdait les premières minutes de chaque consultation aux mêmes questions : où avez-vous mal, depuis quand, quels médicaments ?',
        'Nous avons donc permis aux patients de raconter leur histoire à l’avance, chez eux et dans leur langue. Ça a marché. Et les médecins ont aussitôt demandé : peut-il aussi rédiger la note ? La lettre de référence ? Le suivi ?',
      ],
      close: 'C’est ainsi qu’un outil d’anamnèse est devenu Vesalius.',
    },
    founderNote: {
      title: 'Un mot de notre cofondateur',
      quote:
        'Je suis devenu chirurgien pour soigner des patients, pas pour taper. Tous les médecins que je connais ressentent la même chose. Vesalius est l’assistant que je voulais dans ma propre pratique : il prépare la consultation, écoute pendant que je parle avec mon patient, et rédige les documents pour que je puisse relire et signer. Il ne prend pas de décisions médicales. Il me rend le temps de bien les prendre.',
      name: 'Dr Philippe Van Overschelde',
      role: 'Chirurgien orthopédiste et cofondateur',
    },
    name: {
      title: 'Pourquoi nous nous appelons Vesalius',
      paragraphs: [
        'En 1514, un garçon nommé Andries van Wesel naît à Bruxelles. Le monde le connaîtra sous le nom d’André Vésale, le fondateur de l’anatomie humaine moderne.',
        'Pendant plus de mille ans, la médecine avait répété ce que les livres anciens disaient du corps humain, même lorsqu’ils se trompaient. Vésale a fait quelque chose de radical pour son époque : il a regardé par lui-même. Là où ses pairs enseignaient à distance, il travaillait de ses propres mains et encourageait ses étudiants à faire de même. Son De humani corporis fabrica (1543) a changé la médecine parce qu’il reposait sur l’observation directe.',
      ],
      belief: 'Nous avons pris son nom parce que nous croyons, cinq siècles plus tard, à la même chose : la bonne médecine commence par l’attention portée au patient qui est devant vous.',
      beliefAfter: 'Tout ce que nous construisons doit faire place à cette attention.',
      closing: 'Il est né à Bruxelles et a étudié à Louvain. Notre histoire a commencé à Gand. Nous aimons l’idée de ramener un nom belge dans la médecine.',
      caption: 'André Vésale dans De humani corporis fabrica, 1543. Domaine public.',
      portraitAlt: 'Gravure sur bois d’André Vésale disséquant un avant-bras, tirée du De humani corporis fabrica (1543)',
      marks: [
        { year: '1514', label: 'Naissance à Bruxelles' },
        { year: '1543', label: 'De humani corporis fabrica' },
        { year: '2024', label: 'Vesalius Health, Gand' },
      ],
    },
    beliefs: {
      title: 'Ce en quoi nous croyons',
      items: [
        { title: 'Le médecin décide. Toujours.', body: 'Vesalius prépare, écoute et rédige un premier jet. Vous relisez, corrigez et signez. Nous construisons des assistants, pas des remplaçants.' },
        { title: 'La consultation est une conversation, pas une saisie de données.', body: 'Si vous regardez un écran plutôt que votre patient, c’est le logiciel qui a échoué, pas vous.' },
        { title: 'Aucun patient ne devrait être mal compris à cause de sa langue.', body: 'Les patients peuvent remplir leur anamnèse dans plus de 50 langues.' },
        {
          title: 'La confiance se gagne dans les détails.',
          body: 'Des réponses claires sur l’endroit où vont vos données, qui peut les voir et ce que notre IA fait ou ne fait pas. Vous ne trouvez pas la réponse ? Demandez-nous. Une personne vous répondra.',
        },
      ],
    },
    doctors: {
      title: 'Conçu avec les médecins, pas seulement pour eux.',
      body: 'Vesalius a été façonné dès le premier jour par les cliniciens qui l’utilisent. Des chirurgiens et leurs assistants ont testé la première version avant qu’elle ne voie un vrai patient, et des médecins de toutes spécialités continuent de nous dire quoi améliorer ensuite.',
    },
    trust: {
      title: 'Ce que nous faisons de ce que vous nous confiez',
      body: 'Les conversations avec les patients sont les données les plus sensibles qui soient. Voici ce que nous en faisons, en termes simples.',
      items: [
        { title: 'Nous travaillons pour vous.', body: 'Au sens du RGPD, Vesalius traite les données de santé pour le compte des hôpitaux et des médecins qui l’utilisent.' },
        { title: 'Vos données sont protégées.', body: 'Chiffrement, contrôles d’accès stricts et évaluations de sécurité régulières.' },
        { title: 'Une personne en est responsable.', body: 'Notre délégué à la protection des données est joignable à dpo@vesalius.health.' },
      ],
      link: 'Lire notre page sécurité et confidentialité',
    },
    timeline: {
      title: 'Notre histoire jusqu’ici',
      items: [
        { when: 'Les débuts', what: 'Un premier prototype d’anamnèse assistée par l’IA, conçu avec des chirurgiens de la hanche et du genou à Gand.' },
        { when: 'Juillet 2024', what: 'Vesalius Health est fondée à Gand.' },
        { when: 'Septembre 2024', what: 'Vesalius est lancé pour les médecins.' },
        { when: 'Mars 2025', what: 'À Medical Update in the Mountains, nous montrons comment Vesalius automatise les flux cliniques avec des agents d’IA.' },
        { when: 'Aujourd’hui', what: 'Huit modules, un assistant : du premier message du patient au dernier suivi.' },
      ],
    },
    people: {
      title: 'Les personnes derrière Vesalius',
      body: 'Nous sommes une petite équipe d’ingénieurs et de cliniciens à Gand. Assez petite pour que vous parliez aux personnes qui construisent le produit.',
      cofounder: 'Cofondateur',
      surgeon: 'Chirurgien orthopédiste, hanche et genou',
      customerSuccess: 'Customer Success',
      origin: 'Vesalius est né de l’équipe d’ingénieurs d’Endare, un studio logiciel gantois fondé en 2012.',
      careersTitle: 'Envie de le construire avec nous ?',
      careersBody: 'Nous sommes toujours heureux d’entendre des ingénieurs, designers et cliniciens qui tiennent à de meilleurs soins.',
      careersCta: 'Écrivez-nous',
    },
    ghent: {
      title: 'Fabriqué à Gand',
      paragraphs: [
        'Gand est une ville de médecins, d’ingénieurs et d’optimistes obstinés : un hôpital universitaire, une grande université de recherche et une scène de startups qui aime construire des choses utiles. Nos bureaux se trouvent sur l’Ottergemsesteenweg-Zuid, à quelques minutes des hôpitaux où travaillent nos utilisateurs.',
        'Être belge, c’est construire pour un système de santé que nous connaissons de l’intérieur, dans les langues que nos patients parlent vraiment.',
      ],
      contactTitle: 'Vous préférez parler à une personne ?',
      mapLabel: 'Ouvrir dans Plans',
    },
  },
};

/**
 * The team grid. Add people here (with their consent); `photo` is optional and falls back to initials, so a card can
 * go live before its portrait is taken. Portraits: square-ish, at least 600px wide, in /public/team.
 */
export const TEAM: { name: string; initials: string; role?: 'cofounder' | 'customerSuccess'; surgeon?: boolean; photo?: string }[] = [
  { name: 'Sander Goossens', initials: 'SG', role: 'cofounder' },
  { name: 'Hans Peerlinck', initials: 'HP', role: 'cofounder' },
  { name: 'Dr. Philippe Van Overschelde', initials: 'PV', role: 'cofounder', surgeon: true },
  { name: 'Quinten Schietecatte', initials: 'QS', role: 'customerSuccess', photo: '/team/quinten-portrait.jpg' },
  // Titles still to confirm: the cards show just the name until then.
  { name: 'Axel Jonckheere', initials: 'AJ' },
  { name: 'Navaron Bracke', initials: 'NB' },
  { name: 'Ruben Redant', initials: 'RR' },
];
