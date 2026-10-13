/**
 * Homepage copy for the ENT variant (source: sales, "Website-inhoud NKO", 12 Oct 2026).
 * Everything follows Sven, 46, with chronic sinusitis and nasal polyps. Dutch is the source text; English (British) and
 * French are translations for sales to review. Anything not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

/** The three ENT subdomains, each with one fixed chip colour on every page (and on Dr Boedts' testimonial). */
export type EntSubdomain = 'ear' | 'nose' | 'throat';

export const ENT_SUBDOMAINS: Record<EntSubdomain, { text: string; bg: string; label: Record<SiteLocale, string> }> = {
  ear: { text: '#6D45B8', bg: '#F2EDFB', label: { nl: 'Oor', en: 'Ear', fr: 'Oreille' } },
  nose: { text: '#0B759F', bg: '#EBF6F8', label: { nl: 'Neus & sinus', en: 'Nose & sinus', fr: 'Nez & sinus' } },
  throat: { text: '#23855A', bg: '#E8F5EE', label: { nl: 'Keel & stem', en: 'Throat & voice', fr: 'Gorge & voix' } },
};

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const ENT_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'NKO-arts.',
      greeting: 'Hallo Sven! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: 'Mijn neus zit al meer dan een jaar dicht en ik ruik bijna niets meer.',
      assistantMessage: 'Dank u. Zit de verstopping aan beide kanten of vooral aan één kant? En heeft u al eens bloederig slijm gehad aan één kant?',
      noteBody:
        'Neusverstopping beiderzijds sinds 14 maanden, reukverlies sinds 8 maanden. Endoscopie: bilaterale neuspoliepen tot onder de middelste neusschelp. CT: Lund-Mackay 16/24. Voorstel: FESS bilateraal…',
    },
    journey: {
      subtitle: 'Een patiënt met chronische sinusitis en neuspoliepen, van eerste melding tot herstel na de ingreep. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste NKO-arts.',
          detail:
            'Verstopping aan beide kanten, reukverlies, en neusspray hielp niet: Sven gaat naar de collega voor neus & sinus. Een kind dat slecht hoort, gaat naar de collega voor het oor.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in zijn eigen taal.',
          detail: 'SNOT-22 als nulmeting, eerdere sprays en antibioticakuren, medicatie via foto, waar de CT genomen werd. Kortademig na ibuprofen: genoteerd.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen met de endoscopie en de bespreking van de CT.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, operatievoorstel, uitleg over de nazorg en het attest voor het werk.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd, niet alleen in cijfers.',
          detail: 'SNOT-22 en reuk, maar ook slaap, fietsen en koken. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënt met chronische sinusitis door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Chronische sinusitis gaat naar de collega voor neus & sinus. Een kind met oorontstekingen naar de collega voor het oor. Plots doof aan één oor wordt nog dezelfde dag gemarkeerd.',
        agenda: 'Zijn afspraak komt in de agenda van de juiste NKO-arts, met tijd voor een endoscopie.',
        preConsultation:
          'Een chatbot stelt hem de vragen die bij sinusitis tellen: één of beide kanten, reuk, eerdere sprays en kuren, astma. U weet wat er scheelt nog voor hij binnenkomt.',
        voiceReception: 'Belt hij liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U kijkt met de endoscoop in zijn neus en bespreekt de CT. Samen kiest u voor een sinusoperatie. Vesalius noteert mee.',
        medication:
          'Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook het allergiemiddel dat hij zelf vergat te vermelden. Geen bloedverdunners, wel astma en geen NSAID’s na de ingreep.',
        documentGeneration: 'De brief aan de huisarts, het operatievoorstel en de uitleg over de nazorg staan klaar.',
        smartFollowUp: 'Hij vult de SNOT-22 en zijn reukscore in, en vertelt hoe het gaat met slapen, fietsen en koken.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor NKO.',
      focus: 'Focus binnen uw vakgebied (bv. oor, neus & sinus, keel & stem)',
    },
  },
  en: {
    hero: {
      line1: 'Be an ENT surgeon',
      line2: 'again.',
      greeting: "Hello Sven! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'My nose has been blocked for more than a year and I can hardly smell anything any more.',
      assistantMessage: 'Thank you. Is it blocked on both sides or mainly on one side? And have you ever had blood-stained mucus on one side?',
      noteBody:
        'Bilateral nasal obstruction for 14 months, loss of smell for 8 months. Endoscopy: bilateral nasal polyps extending below the middle turbinate. CT: Lund-Mackay 16/24. Proposal: bilateral FESS…',
    },
    journey: {
      subtitle: 'A patient with chronic sinusitis and nasal polyps, from first report to recovery after surgery. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right ENT surgeon.',
          detail:
            'Blocked on both sides, loss of smell, and nasal spray did not help: Sven goes to the nose and sinus colleague. A child who hears poorly goes to the ear colleague.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in his own language.',
          detail: 'SNOT-22 as a baseline, previous sprays and courses of antibiotics, medication by photo, where the CT was taken. Short of breath after ibuprofen: noted.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight with the endoscopy and the discussion of the CT.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, the surgical proposal, aftercare information and the certificate for his employer.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery followed at home, not just in numbers.',
          detail: 'SNOT-22 and sense of smell, but also sleep, cycling and cooking. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with chronic sinusitis through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'Chronic sinusitis goes to the nose and sinus colleague. A child with ear infections goes to the ear colleague. Sudden deafness in one ear is flagged the same day.',
        agenda: 'His appointment lands in the right ENT surgeon’s agenda, with time for an endoscopy.',
        preConsultation:
          'A chatbot asks him the questions that matter for sinusitis: one side or both, sense of smell, previous sprays and courses, asthma. You know what is wrong before he walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You look into his nose with the endoscope and discuss the CT. Together you decide on sinus surgery. Vesalius takes the notes.',
        medication:
          'He sends a photo of his pharmacy’s medication schedule in the chat. His medication is structured in the record, including the allergy tablet he forgot to mention. No anticoagulants, but asthma, and no NSAIDs after surgery.',
        documentGeneration: 'The letter to the GP, the surgical proposal and the aftercare information are ready.',
        smartFollowUp: 'He completes the SNOT-22 and his smell score, and tells you how sleeping, cycling and cooking are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for ENT.',
      focus: 'Focus within your speciality (e.g. otology, rhinology, laryngology)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'ORL.',
      greeting: 'Bonjour Sven. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Mon nez est bouché depuis plus d’un an et je ne sens presque plus rien.',
      assistantMessage: 'Merci. Le nez est-il bouché des deux côtés ou surtout d’un côté ? Et avez-vous déjà eu des mucosités sanglantes d’un seul côté ?',
      noteBody:
        'Obstruction nasale bilatérale depuis 14 mois, perte de l’odorat depuis 8 mois. Endoscopie : polypes nasaux bilatéraux dépassant le bord inférieur du cornet moyen. Scanner : Lund-Mackay 16/24. Proposition : FESS bilatérale…',
    },
    journey: {
      subtitle: 'Un patient avec une sinusite chronique et des polypes nasaux, du premier signalement à la convalescence après l’intervention. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon ORL.',
          detail:
            'Nez bouché des deux côtés, perte de l’odorat, et le spray nasal n’a pas aidé : Sven va chez le confrère nez & sinus. Un enfant qui entend mal va chez le confrère de l’oreille.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez lui et dans sa langue.',
          detail: 'SNOT-22 comme mesure de référence, sprays et cures d’antibiotiques antérieurs, médicaments par photo, lieu du scanner. Essoufflé après l’ibuprofène : noté.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par l’endoscopie et la discussion du scanner.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, proposition opératoire, explications sur les soins postopératoires et certificat pour son employeur.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Convalescence suivie à domicile, pas seulement en chiffres.',
          detail: 'SNOT-22 et odorat, mais aussi le sommeil, le vélo et la cuisine. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez un patient avec une sinusite chronique à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Une sinusite chronique va chez le confrère nez & sinus. Un enfant avec des otites chez le confrère de l’oreille. Une surdité brutale d’une oreille est signalée le jour même.',
        agenda: 'Son rendez-vous arrive dans l’agenda du bon ORL, avec le temps prévu pour une endoscopie.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour une sinusite : un côté ou les deux, l’odorat, les sprays et cures antérieurs, l’asthme. Vous savez ce qui ne va pas avant même qu’il n’entre.',
        voiceReception: 'Il préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous examinez son nez à l’endoscope et discutez du scanner. Ensemble, vous optez pour une chirurgie des sinus. Vesalius prend les notes.',
        medication:
          'Il envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris l’antiallergique qu’il avait oublié de mentionner. Pas d’anticoagulants, mais un asthme, et pas d’AINS après l’intervention.',
        documentGeneration: 'La lettre au médecin traitant, la proposition opératoire et les explications sur les soins postopératoires sont prêtes.',
        smartFollowUp: 'Il remplit le SNOT-22 et son score d’odorat, et raconte comment se passent le sommeil, le vélo et la cuisine.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle:
        'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l’ORL.',
      focus: 'Domaine de prédilection (p. ex. otologie, rhinologie, laryngologie)',
    },
  },
};
