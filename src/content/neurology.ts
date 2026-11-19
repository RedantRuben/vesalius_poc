import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const NEUROLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "neuroloog.",
      "greeting": "Hallo Eva! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Mijn migraine komt de laatste maanden veel vaker. Ik heb bijna om de andere dag hoofdpijn.",
      "assistantMessage": "Dank u. Op hoeveel dagen per maand neemt u iets tegen de hoofdpijn, zoals een triptan of ibuprofen?",
      "noteBody": "Migraine sinds de leeftijd van 16 jaar, nu 16 hoofdpijndagen per maand, waarvan 10 met migrainekenmerken. Triptan op ±11 dagen per maand. Neurologisch onderzoek normaal, fundoscopie zonder papiloedeem…"
    },
    "journey": {
      "subtitle": "Een patiënte met migraine die steeds vaker komt, van eerste melding tot minder hoofdpijndagen. Vesalius doet het voorwerk, u blijft de arts.",
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
          "detail": "Gekende migraine die vaker komt, geen alarmsignalen: Eva gaat naar de hoofdpijnraadpleging. Een plotse, zeer hevige hoofdpijn gaat meteen naar spoed.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige intake, thuis en in haar eigen taal.",
          "detail": "Hoofdpijndagen en dagen met pijnstillers, eerdere preventieve behandelingen, medicatie via foto, de MRI van 2021. Geen rode vlaggen.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De anamnese ligt al klaar. U begint meteen bij het neurologisch onderzoek en het gesprek over de preventie.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift, aanvraag terugbetaling en een afbouwschema voor de pijnstillers.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Herstel thuis opgevolgd, niet alleen in cijfers.",
          "detail": "Migrainedagen, HIT-6 en MIDAS, maar ook slaap, werk en tijd met de kinderen. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënte met migraine door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Gekende migraine die vaker komt, gaat naar de hoofdpijnraadpleging. Kaakpijn bij kauwen gaat naar de tandarts. Een plotse, zeer hevige hoofdpijn gaat meteen naar spoed.",
        "agenda": "Haar afspraak komt in een lang blok op de hoofdpijnraadpleging, met tijd voor het gesprek over preventie.",
        "preConsultation": "Een chatbot stelt haar de vragen die bij migraine tellen: hoofdpijndagen, dagen met pijnstillers, aura, triggers, eerdere preventie. U weet wat er speelt nog voor ze binnenkomt.",
        "voiceReception": "Belt ze liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U onderzoekt haar en bespreekt de preventie. Samen kiest u voor afbouw van de pijnstillers en een CGRP-antistof. Vesalius noteert mee.",
        "medication": "Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de pil die ze zelf vergat te vermelden.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift, de aanvraag terugbetaling en het afbouwschema staan klaar.",
        "smartFollowUp": "Ze vult haar migrainedagen, HIT-6 en MIDAS in, en vertelt hoe het gaat met slapen, werken en lopen."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor neurologie.",
      "focus": "Focus binnen uw vakgebied (bv. hoofdpijn, epilepsie, bewegingsstoornissen, MS)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a neurologist",
      "line2": "again.",
      "greeting": "Hello Eva! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "My migraines have become much more frequent in recent months. I have a headache almost every other day.",
      "assistantMessage": "Thank you. On how many days each month do you take something for the headache, such as a triptan or ibuprofen?",
      "noteBody": "Migraine since age 16, now 16 headache days a month, including 10 with migraine features. Triptan use on around 11 days a month. Normal neurological examination, no papilloedema on fundoscopy…"
    },
    "journey": {
      "subtitle": "A patient with increasingly frequent migraine, from her first message to fewer headache days. Vesalius does the groundwork so you can focus on her care.",
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
          "detail": "Established migraine becoming more frequent, without alarm symptoms: Eva goes to the headache clinic. Sudden, severe headache goes straight to emergency care.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full intake, at home and in her own language.",
          "detail": "Headache days and days taking acute medication, previous preventive treatments, medication from a photo and the 2021 MRI. No red flags.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "The history is ready. You start straight away with the neurological examination and discussion of prevention.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, prescription, reimbursement application and a plan to reduce acute medication.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow recovery at home, beyond the scores.",
          "detail": "Migraine days, HIT-6 and MIDAS, alongside sleep, work and time with the children. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with migraine through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "Established migraine becoming more frequent goes to the headache clinic. Jaw pain when chewing goes to the dentist. Sudden, severe headache goes straight to emergency care.",
        "agenda": "Her appointment gets a longer slot at the headache clinic, with time to discuss prevention.",
        "preConsultation": "The chatbot asks the questions that matter in migraine: headache days, days taking acute medication, aura, triggers and previous prevention. You know what is going on before she arrives.",
        "voiceReception": "Would she rather call? She gets the same triage and booking over the phone.",
        "scribe": "You examine her and discuss prevention. Together you choose to reduce acute medication and start a CGRP antibody. Vesalius takes notes.",
        "medication": "She sends a photo of her pharmacy’s medication schedule. The record includes the contraceptive pill she forgot to mention.",
        "documentGeneration": "The letter to the GP, prescription, reimbursement application and medication reduction plan are ready.",
        "smartFollowUp": "She records migraine days, HIT-6 and MIDAS and describes sleep, work and running."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for neurology.",
      "focus": "Focus within your specialty (e.g. headache, epilepsy, movement disorders, MS)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "neurologue.",
      "greeting": "Bonjour Eva ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "Mes migraines sont beaucoup plus fréquentes depuis quelques mois. J’ai mal à la tête presque un jour sur deux.",
      "assistantMessage": "Merci. Combien de jours par mois prenez-vous quelque chose contre les céphalées, comme un triptan ou de l’ibuprofène ?",
      "noteBody": "Migraine depuis l’âge de 16 ans, désormais 16 jours de céphalées par mois dont 10 avec caractéristiques migraineuses. Triptan environ 11 jours par mois. Examen neurologique normal, fond d’œil sans œdème papillaire…"
    },
    "journey": {
      "subtitle": "Une patiente avec des migraines de plus en plus fréquentes, du premier signalement à moins de jours de céphalées. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
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
          "detail": "Migraine connue plus fréquente, sans signe d’alarme : Eva va en consultation de céphalées. Une céphalée soudaine et très intense va directement aux urgences.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse complète, chez elle et dans sa langue.",
          "detail": "Jours de céphalées et de médicaments aigus, traitements préventifs antérieurs, médicaments par photo et IRM de 2021. Aucun signe d’alerte.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse est prête. Vous commencez directement par l’examen neurologique et la discussion de la prévention.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, ordonnance, demande de remboursement et schéma de réduction des médicaments aigus.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "La récupération suivie à domicile, au-delà des scores.",
          "detail": "Jours de migraine, HIT-6 et MIDAS, mais aussi sommeil, travail et temps avec les enfants. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez une patiente avec une migraine à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Une migraine connue plus fréquente va en consultation de céphalées. Une douleur de mâchoire à la mastication va chez le dentiste. Une céphalée soudaine et très intense va aux urgences.",
        "agenda": "Son rendez-vous bénéficie d’un créneau long en consultation de céphalées, avec du temps pour la prévention.",
        "preConsultation": "Le chatbot pose les questions importantes : jours de céphalées, médicaments aigus, aura, facteurs déclenchants et prévention antérieure. Vous savez ce qui se passe avant son arrivée.",
        "voiceReception": "Elle préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous l’examinez et discutez de prévention. Vous choisissez ensemble de réduire les médicaments aigus et de commencer un anticorps anti-CGRP. Vesalius prend des notes.",
        "medication": "Elle envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend la pilule contraceptive oubliée.",
        "documentGeneration": "La lettre au médecin traitant, l’ordonnance, la demande de remboursement et le schéma de réduction sont prêts.",
        "smartFollowUp": "Elle renseigne ses jours de migraine, HIT-6 et MIDAS et décrit le sommeil, le travail et la course."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la neurologie.",
      "focus": "Domaine de prédilection (p. ex. céphalées, épilepsie, troubles du mouvement, SEP)"
    }
  }
};
