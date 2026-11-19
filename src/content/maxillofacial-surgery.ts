import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

// Lotte's homepage case, from “Website-inhoud MKA-chirurgie”.
export const MKA_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "MKA-chirurg.",
      greeting: "Hallo Lotte! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      patientMessage: "Mijn tandvlees rond mijn verstandskies linksonder ontsteekt steeds opnieuw. Al drie keer dit jaar, de laatste keer met antibiotica.",
      assistantMessage: "Dank u. Zit de pijn rond de kies zelf, of eerder vóór uw oor bij het kauwen? En kunt u uw mond nu volledig openen?",
      noteBody: "Recidiverende pericoronitis 38, drie opstoten in negen maanden, laatste behandeld met amoxicilline. 38 en 48 partieel doorgebroken. Mondopening 46 mm, gevoel onderlip, kin en tong normaal. CBCT: canalis mandibularis linguaal van de wortels van 38…",
    },
    journey: {
      subtitle: "Een patiënte met een ontstoken verstandskies, van eerste melding tot herstel. Vesalius doet het voorwerk, u blijft de arts.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt bij de juiste arts.",
          detail: "Ontsteking rond een half doorgebroken verstandskies, foto van de tandarts: Lotte gaat naar de MKA-chirurg. Klikken en pijn vóór het oor gaat naar orofaciale kinesitherapie, een drukkende wang met verstopte neus naar NKO.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in haar eigen taal.",
          detail: "Pijn tijdens en tussen de opstoten, mondopening, gevoel in lip en tong, medicatie via foto, waar de panoramische foto gemaakt werd. Geen rode vlaggen.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De anamnese ligt al klaar. U begint meteen bij de mondopening, de sensibiliteit en de 3D-foto.",
          part: "Gewoon arts zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Brief aan de tandarts, toestemmingsformulier, opname in het dagziekenhuis, nazorg en het attest voor school.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Na de behandeling",
          title: "Herstel thuis opgevolgd, niet alleen in cijfers.",
          detail: "Pijn, zwelling en mondopening dag na dag, maar ook eten, lesgeven en hockey. De vragenlijsten volgen de gekozen behandeling.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënte met een ontstoken verstandskies door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Een ontstoken verstandskies met een foto van de tandarts gaat naar de MKA-chirurg. Klikken vóór het oor gaat naar orofaciale kinesitherapie, een drukkende wang met verstopte neus naar NKO. Wie snel gezien moet worden, wordt gemarkeerd.",
        agenda: "Haar afspraak komt op het juiste moment in de agenda van de MKA-chirurg, met tijd voor een 3D-foto.",
        preConsultation: "Een chatbot stelt haar de vragen die bij verstandskiezen tellen: pijn tijdens en tussen de opstoten, mondopening, gevoel in lip en tong, eerdere antibiotica. U weet wat er speelt nog voor ze binnenkomt.",
        voiceReception: "Belt ze liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U meet haar mondopening, test het gevoel in lip en tong en bespreekt de 3D-foto. Samen kiest u voor verwijdering onder narcose. Vesalius noteert mee.",
        medication: "Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de pil die ze zelf vergat te vermelden. Geen bloedverdunners, wel astma om aan de anesthesist te melden.",
        documentGeneration: "De brief aan de tandarts, het toestemmingsformulier, de opname in het dagziekenhuis en het attest voor school staan klaar.",
        smartFollowUp: "Ze geeft dag na dag pijn, zwelling en mondopening door, en vertelt hoe het gaat met eten, lesgeven en hockey.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor MKA-chirurgie.",
      focus: "Focus binnen uw vakgebied (bv. dento-alveolaire chirurgie, implantologie, orthognatische chirurgie, traumatologie)",
    },
  },
  en: {
    hero: {
      line1: "Be an oral and maxillofacial surgeon",
      line2: "again.",
      greeting: "Hello Lotte! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: "The gum around my lower left wisdom tooth keeps getting inflamed. It’s happened three times this year, and I needed antibiotics last time.",
      assistantMessage: "Thank you. Is the pain around the tooth itself, or is it in front of your ear when you chew? Can you open your mouth fully now?",
      noteBody: "Recurrent pericoronitis around 38, three flare-ups in nine months, the latest treated with amoxicillin. 38 and 48 partially erupted. Mouth opening 46 mm, normal sensation in the lower lip, chin and tongue. CBCT: mandibular canal lingual to the roots of 38…",
    },
    journey: {
      subtitle: "A patient with an inflamed wisdom tooth, from her first message to recovery. Vesalius does the groundwork so you can focus on her care.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient sees the right clinician.",
          detail: "Inflammation around a partially erupted wisdom tooth and an X-ray from her dentist: Lotte goes to the maxillofacial surgeon. Clicking and pain in front of the ear go to orofacial physiotherapy. Pressure in the cheek with a blocked nose goes to ENT.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in her own language.",
          detail: "Pain during and between flare-ups, mouth opening, sensation in the lip and tongue, medication from a photo, and where the panoramic X-ray was taken. No red flags.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You examine. Vesalius listens.",
          detail: "The history is ready. You can go straight to assessing mouth opening and sensation and reviewing the 3D scan.",
          part: "Just be the doctor.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "A letter to the dentist, a consent form, a day-case admission, aftercare and a fit note for the school.",
          part: "Review and sign.",
        },
        {
          moment: "After treatment",
          title: "Follow recovery at home, beyond the scores.",
          detail: "Pain, swelling and mouth opening day by day, along with eating, teaching and hockey. The questionnaires follow the treatment chosen.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow a patient with an inflamed wisdom tooth through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "An inflamed wisdom tooth with an X-ray from the dentist goes to the maxillofacial surgeon. Clicking in front of the ear goes to orofacial physiotherapy. Pressure in the cheek with a blocked nose goes to ENT. Anyone who needs to be seen quickly is flagged.",
        agenda: "Her appointment goes into the maxillofacial surgeon’s diary with enough time for a 3D scan.",
        preConsultation: "A chatbot asks the questions that matter for wisdom teeth: pain during and between flare-ups, mouth opening, sensation in the lip and tongue, and previous antibiotics. You know what’s going on before she arrives.",
        voiceReception: "Would she rather call? She gets the same triage and booking over the phone.",
        scribe: "You measure her mouth opening, test sensation in her lip and tongue, and discuss the 3D scan. Together you choose extraction under general anaesthesia. Vesalius takes notes.",
        medication: "She sends a photo of her pharmacy’s medication schedule in the chat. Her medicines are recorded in the patient record, including the pill she forgot to mention. She takes no blood thinners and her asthma is flagged for the anaesthetist.",
        documentGeneration: "The letter to the dentist, consent form, day-case admission and fit note for the school are ready.",
        smartFollowUp: "She reports pain, swelling and mouth opening day by day and tells you how she’s getting on with eating, teaching and hockey.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for oral and maxillofacial surgery.",
      focus: "Focus within your specialty (e.g. dentoalveolar surgery, implantology, orthognathic surgery, trauma)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez chirurgien",
      line2: "maxillo-facial.",
      greeting: "Bonjour Lotte ! Je vous aide à préparer votre visite avec le médecin. Quelle est la raison principale de votre rendez-vous aujourd’hui ?",
      patientMessage: "La gencive autour de ma dent de sagesse en bas à gauche s’enflamme sans arrêt. Trois fois cette année, avec des antibiotiques la dernière fois.",
      assistantMessage: "Merci. La douleur se situe-t-elle autour de la dent ou plutôt devant l’oreille quand vous mâchez ? Pouvez-vous ouvrir complètement la bouche maintenant ?",
      noteBody: "Péricoronarite récidivante de la 38, trois poussées en neuf mois, dernière traitée par amoxicilline. 38 et 48 partiellement sorties. Ouverture buccale de 46 mm, sensibilité de la lèvre inférieure, du menton et de la langue normale. CBCT : canal mandibulaire en lingual des racines de la 38…",
    },
    journey: {
      subtitle: "Une patiente avec une dent de sagesse enflammée, du premier signalement à la guérison. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon professionnel.",
          detail: "Inflammation autour d’une dent de sagesse partiellement sortie et radio du dentiste : Lotte est orientée vers le chirurgien maxillo-facial. Des claquements et une douleur devant l’oreille relèvent de la kinésithérapie oro-faciale. Une pression dans la joue avec le nez bouché relève de l’ORL.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez elle et dans sa langue.",
          detail: "Douleur pendant et entre les poussées, ouverture buccale, sensibilité de la lèvre et de la langue, médicaments par photo, lieu de la radiographie panoramique. Aucun signe d’alerte.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "L’anamnèse est prête. Vous commencez par l’ouverture buccale, la sensibilité et l’imagerie 3D.",
          part: "Être médecin.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Lettre au dentiste, formulaire de consentement, admission en hôpital de jour, soins postopératoires et certificat pour l’école.",
          part: "Relire et signer.",
        },
        {
          moment: "Après le traitement",
          title: "La convalescence suivie à domicile, au-delà des scores.",
          detail: "Douleur, gonflement et ouverture buccale jour après jour, mais aussi repas, enseignement et hockey. Les questionnaires suivent le traitement choisi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez une patiente avec une dent de sagesse enflammée à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Une dent de sagesse enflammée avec une radio du dentiste est orientée vers le chirurgien maxillo-facial. Des claquements devant l’oreille relèvent de la kinésithérapie oro-faciale. Une pression dans la joue avec le nez bouché relève de l’ORL. Les patients qui doivent être vus rapidement sont signalés.",
        agenda: "Son rendez-vous est placé dans l’agenda du chirurgien maxillo-facial avec le temps nécessaire pour une imagerie 3D.",
        preConsultation: "Le chatbot pose les questions qui comptent pour les dents de sagesse : douleur pendant et entre les poussées, ouverture buccale, sensibilité de la lèvre et de la langue, antibiotiques antérieurs. Vous savez ce qui se passe avant son arrivée.",
        voiceReception: "Elle préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous mesurez son ouverture buccale, testez la sensibilité de sa lèvre et de sa langue et discutez de l’imagerie 3D. Vous choisissez ensemble une extraction sous anesthésie générale. Vesalius prend des notes.",
        medication: "Elle envoie dans le chat une photo du schéma de médication de sa pharmacie. Les médicaments figurent dans le dossier, y compris la pilule qu’elle avait oubliée. Elle ne prend aucun anticoagulant et son asthme est signalé à l’anesthésiste.",
        documentGeneration: "La lettre au dentiste, le formulaire de consentement, l’admission en hôpital de jour et le certificat pour l’école sont prêts.",
        smartFollowUp: "Elle signale jour après jour la douleur, le gonflement et l’ouverture buccale, et raconte comment elle mange, enseigne et reprend le hockey.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la chirurgie maxillo-faciale.",
      focus: "Domaine de prédilection (p. ex. chirurgie dento-alvéolaire, implantologie, chirurgie orthognathique, traumatologie)",
    },
  },
};
