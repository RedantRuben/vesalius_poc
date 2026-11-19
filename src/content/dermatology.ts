import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const DERMATOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "dermatoloog.",
      greeting: "Hallo Koen! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      patientMessage: "Ik heb al twintig jaar psoriasis, maar het laatste jaar wordt het steeds erger. De zalven helpen niet meer en methotrexaat verdroeg ik niet.",
      assistantMessage: "Dank u. Heeft u ook pijnlijke of gezwollen gewrichten, of is een vinger of teen soms helemaal gezwollen?",
      noteBody: "Plaquepsoriasis sinds 22 jaar, erger sinds 14 maanden. Plaques op ellebogen, knieën, onderrug en hoofdhuid, putjes in de nagels. PASI 16,4, BSA 14%, DLQI 18. Recidief na UVB-nb, methotrexaat gestopt wegens leverwaarden…",
    },
    journey: {
      subtitle: "Een patiënt met psoriasis, van eerste melding tot een rustige huid. Vesalius doet het voorwerk, u blijft de arts.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt bij de juiste arts.",
          detail: "Psoriasis die niet meer reageert op zalven en methotrexaat: Koen gaat naar de raadpleging inflammatoire huidziekten. Een moedervlek die snel groter en donkerder wordt, krijgt voorrang.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in zijn eigen taal.",
          detail: "Jeuk en DLQI gescoord, elke eerdere behandeling met haar effect, gewrichtsklachten bevraagd. Foto's van zijn plekken en van zijn medicatieschema in de chat. Geen rode vlaggen.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De voorgeschiedenis ligt al klaar. U begint meteen bij de huid, de nagels en de gewrichten, en scoort de PASI.",
          part: "Gewoon arts zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Brief aan de huisarts, screeningsaanvraag en uitleg over de injecties.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Na de behandeling",
          title: "Een rustige huid, thuis opgevolgd.",
          detail: "DLQI en jeuk, maar ook slaap, werk en weer gaan zwemmen. De vragenlijsten volgen de gekozen behandeling.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënt met psoriasis door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Psoriasis na zalven en methotrexaat gaat naar de raadpleging inflammatoire huidziekten. Psoriasis met gezwollen gewrichten gaat mee naar reumatologie. Een moedervlek die snel verandert, krijgt voorrang.",
        agenda: "Zijn eerste afspraak krijgt een lang blok, want een start van systemische therapie vraagt tijd.",
        preConsultation: "Een chatbot vraagt naar jeuk, de plekken, elke eerdere behandeling met haar effect en zijn gewrichten. Hij stuurt foto's van zijn plekken mee. U weet wat er speelt nog voor hij binnenkomt.",
        voiceReception: "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U bekijkt zijn huid, nagels en gewrichten en scoort de PASI. Samen kiest u voor een biological. Vesalius noteert mee.",
        medication: "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook de bloeddrukpil die hij zelf vergat: een bètablokker, die psoriasis kan verergeren.",
        documentGeneration: "De brief aan de huisarts, de screeningsaanvraag en de uitleg over de injecties staan klaar.",
        smartFollowUp: "Hij vult de DLQI en zijn jeukscore in, en vertelt hoe het gaat met slapen, lesgeven en zwemmen.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor dermatologie.",
      focus: "Focus binnen uw vakgebied (bv. inflammatoire huidziekten, dermato-oncologie, allergologie)",
    },
  },
  en: {
    hero: {
      line1: "Be a dermatologist",
      line2: "again.",
      greeting: "Hello Koen! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: "I’ve had psoriasis for twenty years, but it’s been getting worse over the past year. The creams no longer work and I couldn’t tolerate methotrexate.",
      assistantMessage: "Thank you. Have you also had painful or swollen joints, or has a whole finger or toe ever swollen up?",
      noteBody: "Plaque psoriasis for 22 years, worsening over the past 14 months. Plaques on elbows, knees, lower back and scalp, with nail pitting. PASI 16.4, BSA 14%, DLQI 18. Relapse after NB-UVB, methotrexate stopped due to raised liver enzymes…",
    },
    journey: {
      subtitle: "A patient with psoriasis, from his first message to calmer skin. Vesalius does the groundwork so you can focus on his care.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient sees the right clinician.",
          detail: "Psoriasis that no longer responds to topical treatment and methotrexate: Koen is booked into the inflammatory skin disease clinic. A mole that has quickly grown and darkened is given priority.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in his own language.",
          detail: "The intake records itch and DLQI scores, previous treatment and its effects, and joint symptoms. He sends photos of his skin and medication schedule in the chat. No red flags.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You examine. Vesalius listens.",
          detail: "The history is ready. You can go straight to examining his skin, nails and joints and scoring the PASI.",
          part: "Just be the doctor.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "The letter to the GP, the screening request and an explanation of the injections.",
          part: "Review and sign.",
        },
        {
          moment: "After treatment",
          title: "Calmer skin, followed up at home.",
          detail: "DLQI and itch, alongside sleep, work and getting back to swimming. The questionnaires follow the treatment chosen.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient with psoriasis through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "Psoriasis after topical treatment and methotrexate goes to the inflammatory skin disease clinic. Psoriasis with swollen joints is also referred to rheumatology. A mole that changes quickly gets priority.",
        agenda: "His first appointment gets a longer slot, as starting systemic treatment takes time.",
        preConsultation: "A chatbot asks about itch, the affected areas, the response to each previous treatment and his joints. He sends photos of his skin. You know what is going on before he arrives.",
        voiceReception: "Would he rather call? He gets the same triage and booking over the phone.",
        scribe: "You examine his skin, nails and joints and score the PASI. Together you choose a biologic. Vesalius takes notes.",
        medication: "He sends a photo of his pharmacy’s medication schedule in the chat. His medicines are recorded in the patient record, including the blood pressure tablet he forgot to mention, a beta blocker that can worsen psoriasis.",
        documentGeneration: "The letter to the GP, the screening request and an explanation of the injections are ready.",
        smartFollowUp: "He completes the DLQI and an itch score, and tells you how he is getting on with sleep, teaching and swimming.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for dermatology.",
      focus: "Focus within your specialty (e.g. inflammatory skin disease, dermato-oncology, allergology)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "dermatologue.",
      greeting: "Bonjour Koen ! Je vous aide à préparer votre visite avec le médecin. Quelle est la raison principale de votre rendez-vous aujourd’hui ?",
      patientMessage: "J’ai du psoriasis depuis vingt ans, mais depuis un an, ça empire. Les traitements locaux ne fonctionnent plus et j’ai mal supporté le méthotrexate.",
      assistantMessage: "Merci. Avez-vous aussi des articulations douloureuses ou gonflées ? Un doigt ou un orteil a-t-il déjà gonflé dans son ensemble ?",
      noteBody: "Psoriasis en plaques depuis 22 ans, aggravé depuis 14 mois. Plaques sur les coudes, les genoux, le bas du dos et le cuir chevelu, avec dépressions unguéales. PASI 16,4, BSA 14 %, DLQI 18. Récidive après UVB à spectre étroit, arrêt du méthotrexate pour perturbation du bilan hépatique…",
    },
    journey: {
      subtitle: "Un patient atteint de psoriasis, du premier signalement à une peau apaisée. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon professionnel.",
          detail: "Psoriasis qui ne répond plus aux traitements locaux ni au méthotrexate : Koen est orienté vers la consultation des dermatoses inflammatoires. Un grain de beauté qui grossit et fonce rapidement est prioritaire.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez lui et dans sa langue.",
          detail: "Le prurit et le DLQI sont évalués, les traitements antérieurs et leurs effets sont recensés, et les symptômes articulaires sont recherchés. Il envoie des photos de ses plaques et de son schéma de médication dans le chat. Aucun signe d’alerte.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "Les antécédents sont prêts. Vous pouvez examiner la peau, les ongles et les articulations, puis calculer le PASI.",
          part: "Être médecin.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Lettre au médecin traitant, demande de bilan et explications sur les injections.",
          part: "Relire et signer.",
        },
        {
          moment: "Après le traitement",
          title: "Une peau apaisée, suivie à domicile.",
          detail: "Le DLQI et le prurit, mais aussi le sommeil, le travail et la reprise de la natation. Les questionnaires suivent le traitement choisi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez un patient atteint de psoriasis à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Un psoriasis après traitement local et méthotrexate relève de la consultation des dermatoses inflammatoires. Un psoriasis avec des articulations gonflées est aussi orienté vers la rhumatologie. Un grain de beauté qui évolue rapidement est prioritaire.",
        agenda: "Son premier rendez-vous bénéficie d’un créneau plus long, car l’instauration d’un traitement systémique demande du temps.",
        preConsultation: "Le chatbot pose des questions sur le prurit, les plaques, les traitements précédents et leurs effets, ainsi que les articulations. Il envoie des photos de sa peau. Vous savez ce qui se passe avant son arrivée.",
        voiceReception: "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous examinez sa peau, ses ongles et ses articulations et calculez le PASI. Vous choisissez ensemble une biothérapie. Vesalius prend des notes.",
        medication: "Il envoie dans le chat une photo du schéma de médication de sa pharmacie. Les médicaments figurent dans le dossier, y compris celui qu’il a oublié de mentionner pour sa tension, un bêtabloquant qui peut aggraver le psoriasis.",
        documentGeneration: "La lettre au médecin traitant, la demande de bilan et les explications sur les injections sont prêtes.",
        smartFollowUp: "Il remplit le DLQI et évalue son prurit, puis raconte comment il dort, enseigne et reprend la natation.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la dermatologie.",
      focus: "Domaine de prédilection (p. ex. dermatoses inflammatoires, dermato-oncologie, allergologie)",
    },
  },
};
