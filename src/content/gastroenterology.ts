import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const GASTRO_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "gastro-enteroloog.",
      "greeting": "Hallo Eva! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Al negen maanden krampen in mijn buik en een opgeblazen gevoel. De ene dag diarree, dan weer dagen niets.",
      "assistantMessage": "Dank u. Wordt de pijn minder nadat u naar het toilet bent geweest? En heeft u ooit bloed bij de stoelgang gezien of bent u ongewild afgevallen?",
      "noteBody": "Krampende buikpijn linksonder sinds negen maanden, beter na stoelgang. Wisselend Bristol 1 tot 6. Geen alarmsymptomen, calprotectine 32 µg/g. Rome IV: PDS met wisselend stoelgangpatroon…"
    },
    "journey": {
      "subtitle": "Een patiënte met een prikkelbare darm, van eerste melding tot een rustige buik. Vesalius doet het voorwerk, u blijft de arts.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "Bij het boeken",
          "title": "De juiste patiënt bij de juiste arts.",
          "detail": "Pijn die beter wordt na de stoelgang, geen bloed, niet afgevallen: Eva krijgt een gewone plaats op de raadpleging darm. Bloed bij de stoelgang en gewichtsverlies krijgen voorrang voor een coloscopie.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige intake, thuis en in haar eigen taal.",
          "detail": "Stoelgang volgens de Bristol-schaal, uitlokkers, eerdere diëten, de bloedname en calprotectine van de huisarts, medicatie via foto. Geen alarmsymptomen.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De anamnese en de Rome IV-criteria liggen al klaar. U onderzoekt de buik en legt uit wat PDS is.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift, labo-aanvraag coeliakie, verwijzing naar de diëtist en uitleg over het low-FODMAP-dieet.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Herstel thuis opgevolgd, niet alleen in cijfers.",
          "detail": "IBS-SSS en stoelgang, maar ook werk, etentjes en weer kunnen lopen. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënte met een prikkelbare darm door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Buikpijn die beter wordt na de stoelgang, zonder alarmsymptomen, gaat naar de raadpleging darm. Bloed bij de stoelgang met gewichtsverlies krijgt voorrang voor een coloscopie. Zwarte stoelgang gaat meteen naar het secretariaat.",
        "agenda": "Haar afspraak komt op het juiste moment in de agenda, los van de endoscopiesessies.",
        "preConsultation": "Een chatbot stelt haar de vragen die bij een prikkelbare darm tellen: verband met de stoelgang, Bristol-schaal, uitlokkers, alarmsymptomen, eerdere diëten. U weet wat er scheelt nog voor ze binnenkomt.",
        "voiceReception": "Belt ze liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U onderzoekt haar buik en bespreekt de bloedname. Samen kiest u voor een dieet onder begeleiding en een aangepaste medicatie. Vesalius noteert mee.",
        "medication": "Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de maagzuurremmer die ze zelf vergat te vermelden. Geen bloedverdunners, mocht toch een biopsie nodig zijn.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift, de labo-aanvraag, de verwijzing naar de diëtist en de uitleg over het dieet staan klaar.",
        "smartFollowUp": "Ze vult de IBS-SSS in, houdt haar stoelgang bij, en vertelt hoe het gaat met werken, uit eten gaan en lopen."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor gastro-enterologie.",
      "focus": "Focus binnen uw vakgebied (bv. darm en IBD, hepatologie, endoscopie)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a gastroenterologist",
      "line2": "again.",
      "greeting": "Hello Eva! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "I’ve had abdominal cramps and bloating for nine months. One day I have diarrhoea, then nothing for days.",
      "assistantMessage": "Thank you. Does the pain ease after you open your bowels? Have you ever noticed blood in your stool or lost weight without trying?",
      "noteBody": "Cramping left lower abdominal pain for nine months, relieved by defaecation. Alternating Bristol types 1 to 6. No alarm symptoms, calprotectin 32 µg/g. Rome IV: IBS with mixed bowel habits…"
    },
    "journey": {
      "subtitle": "A patient with irritable bowel syndrome, from her first message to a calmer gut. Vesalius does the groundwork so you can focus on her care.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "At booking",
          "title": "The right patient sees the right clinician.",
          "detail": "Pain relieved by defaecation, no bleeding or weight loss: Eva gets a routine appointment at the bowel clinic. Rectal bleeding and weight loss receive priority for colonoscopy.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full intake, at home and in her own language.",
          "detail": "Bristol stool types, triggers, previous diets, the GP’s blood tests and calprotectin, and medication from a photo. No alarm symptoms.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "Her history and Rome IV criteria are ready. You examine her abdomen and explain IBS.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, prescription, coeliac blood test request, dietitian referral and low-FODMAP diet information.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow recovery at home, beyond the scores.",
          "detail": "IBS-SSS and bowel habits, alongside work, meals out and running again. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with irritable bowel syndrome through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "Abdominal pain relieved by defaecation without alarm symptoms goes to the bowel clinic. Rectal bleeding with weight loss receives priority for colonoscopy. Black stools are flagged to reception immediately.",
        "agenda": "Her appointment is booked at the right time in the diary, separately from endoscopy sessions.",
        "preConsultation": "The chatbot asks the questions that matter for IBS: relation to bowel movements, Bristol stool types, triggers, alarm symptoms and previous diets. You know what is going on before she arrives.",
        "voiceReception": "Would she rather call? She gets the same triage and booking over the phone.",
        "scribe": "You examine her abdomen and discuss the blood tests. Together you choose a supervised diet and adjusted medication. Vesalius takes notes.",
        "medication": "She sends a photo of her pharmacy’s medication schedule. The record includes the acid suppressant she forgot to mention, and confirms no blood thinners in case a biopsy is needed.",
        "documentGeneration": "The letter to the GP, prescription, blood test request, dietitian referral and diet information are ready.",
        "smartFollowUp": "She completes the IBS-SSS, tracks her bowel habits and describes work, meals out and running."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for gastroenterology.",
      "focus": "Focus within your speciality (e.g. bowel and IBD, hepatology, endoscopy)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "gastro-entérologue.",
      "greeting": "Bonjour Eva ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "J’ai des crampes abdominales et des ballonnements depuis neuf mois. Un jour, j’ai la diarrhée, puis plus rien pendant plusieurs jours.",
      "assistantMessage": "Merci. La douleur diminue-t-elle après être allée à la selle ? Avez-vous déjà vu du sang dans les selles ou perdu du poids sans le vouloir ?",
      "noteBody": "Douleurs abdominales crampiformes en fosse iliaque gauche depuis neuf mois, soulagées par la défécation. Alternance de types Bristol 1 à 6. Aucun signe d’alarme, calprotectine à 32 µg/g. Rome IV : syndrome de l’intestin irritable à transit mixte…"
    },
    "journey": {
      "subtitle": "Une patiente avec un intestin irritable, du premier signalement à un ventre apaisé. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "À la prise de rendez-vous",
          "title": "Chaque patient est orienté vers le bon professionnel.",
          "detail": "Douleur soulagée par la défécation, sans sang ni perte de poids : Eva obtient un rendez-vous habituel en consultation intestinale. Le sang dans les selles et la perte de poids donnent priorité à une coloscopie.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse complète, chez elle et dans sa langue.",
          "detail": "Échelle de Bristol, facteurs déclenchants, régimes antérieurs, bilan sanguin et calprotectine du généraliste, médicaments à partir d’une photo. Aucun signe d’alarme.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse et les critères de Rome IV sont prêts. Vous examinez l’abdomen et expliquez le syndrome de l’intestin irritable.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, ordonnance, demande de sérologie cœliaque, orientation vers un diététicien et informations sur le régime pauvre en FODMAP.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "La récupération suivie à domicile, au-delà des scores.",
          "detail": "IBS-SSS et transit, mais aussi travail, sorties au restaurant et reprise de la course. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez une patiente avec un intestin irritable à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Une douleur soulagée par la défécation sans signe d’alarme est orientée en consultation intestinale. Du sang dans les selles avec perte de poids donne priorité à une coloscopie. Des selles noires sont signalées immédiatement au secrétariat.",
        "agenda": "Son rendez-vous est placé au bon moment dans l’agenda, séparément des séances d’endoscopie.",
        "preConsultation": "Le chatbot pose les questions importantes : lien avec les selles, échelle de Bristol, facteurs déclenchants, signes d’alarme et régimes antérieurs. Vous savez ce qui se passe avant son arrivée.",
        "voiceReception": "Elle préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous examinez son abdomen et discutez du bilan sanguin. Vous choisissez ensemble un régime accompagné et une médication adaptée. Vesalius prend des notes.",
        "medication": "Elle envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend l’antisécrétoire gastrique oublié et confirme l’absence d’anticoagulants, au cas où une biopsie serait nécessaire.",
        "documentGeneration": "La lettre au médecin traitant, l’ordonnance, la demande de bilan, l’orientation diététique et les informations sur le régime sont prêtes.",
        "smartFollowUp": "Elle remplit l’IBS-SSS, suit son transit et raconte comment se passent le travail, les sorties au restaurant et la course."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la gastro-entérologie.",
      "focus": "Domaine de prédilection (p. ex. intestin et MICI, hépatologie, endoscopie)"
    }
  }
};
