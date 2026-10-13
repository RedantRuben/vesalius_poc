/**
 * Homepage copy for the neurosurgery variant (source: sales, "Website-inhoud neurochirurgie", 12 Oct 2026).
 * Everything follows Tom, 35, with a cervical disc herniation. Dutch is the source text; English (British) and
 * French are translations for sales to review. Anything not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const NEURO_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'neurochirurg.',
      greeting: 'Hallo Tom! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: 'Al vier maanden pijn in mijn nek die uitstraalt naar mijn rechterarm, tot in mijn duim en wijsvinger.',
      assistantMessage: 'Dank u. Wordt de pijn erger als u uw hoofd naar rechts draait of voorover buigt? En heeft u minder kracht in uw arm of hand?',
      noteBody:
        'Nekpijn met uitstraling naar de rechterarm, duim en wijsvinger, sinds vier maanden. Spurling rechts positief. Hypesthesie dermatoom C6, verminderde bicepsreflex rechts. MRI: discushernia C5-C6 rechts…',
    },
    journey: {
      subtitle: 'Een patiënt met een hernia in de nek, van eerste melding tot herstel. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail: 'Uitstraling tot in de duim, krachtverlies, en kine hielp niet: Tom gaat naar de wervelkolomchirurg. Nekpijn zonder uitstraling gaat naar fysische geneeskunde.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in zijn eigen taal.',
          detail: 'Arm- en nekpijn apart gescoord, eerdere kine, medicatie via foto, waar de MRI genomen werd. Geen rode vlaggen.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen bij Spurling, kracht en reflexen.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, voorschrift kine, uitleg met ergonomieadvies en het attest voor het werk.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd, niet alleen in cijfers.',
          detail: 'NDI en pijnscores, maar ook slaap, werk en gitaar spelen. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënt met een hernia in de nek door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Een hernia met uitval gaat naar de wervelkolomchirurg. Nekpijn zonder uitstraling gaat naar fysische geneeskunde. Wie sneller gezien moet worden, wordt gemarkeerd.',
        agenda: 'Zijn afspraak komt op het juiste moment in de agenda van de wervelkolomchirurg.',
        preConsultation:
          'Een chatbot stelt hem de vragen die bij een hernia tellen: armpijn en nekpijn apart, tintelingen, krachtverlies, eerdere kine. U weet wat er scheelt nog voor hij binnenkomt.',
        voiceReception: 'Belt hij liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U onderzoekt zijn nek en arm en bespreekt de MRI. Samen kiest u voor een conservatieve aanpak. Vesalius noteert mee.',
        medication:
          'Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook de maagbeschermer die hij zelf vergat te vermelden. Geen bloedverdunners, mocht een infiltratie nodig zijn.',
        documentGeneration: 'De brief aan de huisarts, het voorschrift voor kine en de uitleg met ergonomieadvies staan klaar.',
        smartFollowUp: 'Hij vult de NDI en zijn pijnscores in, en vertelt hoe het gaat met slapen, werken en gitaar spelen.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor neurochirurgie.',
      focus: 'Focus binnen uw vakgebied (bv. wervelkolom, craniaal, perifere zenuwen)',
    },
  },
  en: {
    hero: {
      line1: 'Be a neurosurgeon',
      line2: 'again.',
      greeting: "Hello Tom! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'For four months I’ve had pain in my neck that radiates into my right arm, down to my thumb and index finger.',
      assistantMessage: 'Thank you. Does the pain get worse when you turn your head to the right or bend forward? And do you have less strength in your arm or hand?',
      noteBody:
        'Neck pain radiating to the right arm, thumb and index finger, for four months. Spurling positive on the right. Hypoaesthesia in the C6 dermatome, reduced biceps reflex on the right. MRI: right C5-C6 disc herniation…',
    },
    journey: {
      subtitle: 'A patient with a herniated disc in the neck, from first report to recovery. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'Pain down to the thumb, loss of strength, and physiotherapy did not help: Tom goes to the spine surgeon. Neck pain without radiation goes to physical medicine.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in his own language.',
          detail: 'Arm and neck pain scored separately, previous physiotherapy, medication by photo, where the MRI was taken. No red flags.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight with Spurling, strength and reflexes.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, a physiotherapy prescription, an explanation with ergonomic advice and the certificate for his employer.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery followed at home, not just in numbers.',
          detail: 'NDI and pain scores, but also sleep, work and playing the guitar. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with a herniated disc in the neck through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'A herniated disc with neurological deficit goes to the spine surgeon. Neck pain without radiation goes to physical medicine. Anyone who needs to be seen sooner is flagged.',
        agenda: 'His appointment lands at the right moment in the spine surgeon’s agenda.',
        preConsultation:
          'A chatbot asks him the questions that matter for a herniated disc: arm pain and neck pain separately, tingling, loss of strength, previous physiotherapy. You know what is wrong before he walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You examine his neck and arm and discuss the MRI. Together you decide on a conservative approach. Vesalius takes the notes.',
        medication:
          'He sends a photo of his pharmacy’s medication schedule in the chat. His medication is structured in the record, including the stomach protector he forgot to mention. No anticoagulants, should an injection be needed.',
        documentGeneration: 'The letter to the GP, the physiotherapy prescription and the explanation with ergonomic advice are ready.',
        smartFollowUp: 'He completes the NDI and his pain scores, and tells you how sleeping, working and playing the guitar are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for neurosurgery.',
      focus: 'Focus within your speciality (e.g. spine, cranial, peripheral nerves)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'neurochirurgien.',
      greeting: 'Bonjour Tom. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Depuis quatre mois, j’ai mal à la nuque, et la douleur irradie dans mon bras droit, jusqu’au pouce et à l’index.',
      assistantMessage: 'Merci. La douleur augmente-t-elle quand vous tournez la tête vers la droite ou que vous vous penchez en avant ? Et avez-vous moins de force dans le bras ou la main ?',
      noteBody:
        'Cervicalgie irradiant vers le bras droit, le pouce et l’index, depuis quatre mois. Spurling positif à droite. Hypoesthésie du dermatome C6, réflexe bicipital diminué à droite. IRM : hernie discale C5-C6 droite…',
    },
    journey: {
      subtitle: 'Un patient avec une hernie cervicale, du premier signalement à la guérison. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Douleur jusqu’au pouce, perte de force, et la kinésithérapie n’a pas aidé : Tom va chez le chirurgien du rachis. Une cervicalgie sans irradiation va en médecine physique.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez lui et dans sa langue.',
          detail: 'Douleur du bras et de la nuque cotées séparément, kinésithérapie antérieure, médicaments par photo, lieu de l’IRM. Aucun signal d’alerte.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par le Spurling, la force et les réflexes.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, prescription de kinésithérapie, explication avec conseils d’ergonomie et certificat pour son employeur.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Convalescence suivie à domicile, pas seulement en chiffres.',
          detail: 'NDI et scores de douleur, mais aussi le sommeil, le travail et la guitare. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez un patient avec une hernie cervicale à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Une hernie avec déficit neurologique va au chirurgien du rachis. Une cervicalgie sans irradiation va en médecine physique. Ceux qui doivent être vus plus vite sont signalés.',
        agenda: 'Son rendez-vous arrive au bon moment dans l’agenda du chirurgien du rachis.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour une hernie : douleur du bras et de la nuque séparément, fourmillements, perte de force, kinésithérapie antérieure. Vous savez ce qui ne va pas avant même qu’il n’entre.',
        voiceReception: 'Il préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous examinez sa nuque et son bras et discutez de l’IRM. Ensemble, vous optez pour une approche conservatrice. Vesalius prend les notes.',
        medication:
          'Il envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris le protecteur gastrique qu’il avait oublié de mentionner. Pas d’anticoagulants, au cas où une infiltration serait nécessaire.',
        documentGeneration: 'La lettre au médecin traitant, la prescription de kinésithérapie et l’explication avec conseils d’ergonomie sont prêtes.',
        smartFollowUp: 'Il remplit le NDI et ses scores de douleur, et raconte comment se passent le sommeil, le travail et la guitare.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle:
        'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la neurochirurgie.',
      focus: 'Domaine de prédilection (p. ex. rachis, crânien, nerfs périphériques)',
    },
  },
};
