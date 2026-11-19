import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const CARDIOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "cardioloog.",
      "greeting": "Hallo Marc! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Sinds twee maanden heb ik aanvallen van hartkloppingen. Mijn horloge gaf een melding en mijn huisarts zag het op het ECG.",
      "assistantMessage": "Dank u. Voelt uw hartslag dan onregelmatig, of eerder als losse overslagen? En bent u daarbij ooit flauwgevallen of bijna flauwgevallen?",
      "noteBody": "Aanvallen van onregelmatige hartkloppingen sinds twee maanden, tot twee dagen. VKF op ECG huisarts. Nu sinusritme 64/min. Echo: LVEF 58%, linker voorkamer licht gedilateerd. CHA2DS2-VA 2…"
    },
    "journey": {
      "subtitle": "Een patiënt met hartkloppingen, van eerste melding tot een rustig hart. Vesalius doet het voorwerk, u blijft de arts.",
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
          "detail": "Onregelmatig ritme, vastgelegd op ECG en smartwatch: Marc gaat naar de ritmeraadpleging. Losse overslagen zonder andere klachten krijgen een gewone plaats. Flauwvallen bij inspanning: dezelfde dag.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige intake, thuis en in zijn eigen taal.",
          "detail": "Aanvallen en uitlokkers, smartwatch-melding als screenshot, medicatie via foto, alcohol en snurken. Geen rode vlaggen.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De anamnese ligt al klaar. U begint meteen bij ECG, echo en het risico op een beroerte.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift antistolling, aanvraag Holter en slaaponderzoek, uitleg over wanneer 112 bellen.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Herstel thuis opgevolgd, niet alleen in cijfers.",
          "detail": "AFEQT en het aantal aanvallen, maar ook therapietrouw, slaap, werk en fietsen. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënt met voorkamerfibrillatie door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Een onregelmatig ritme gaat naar de ritmeraadpleging. Losse overslagen krijgen een gewone plaats. Wie flauwviel tijdens inspanning, wordt dezelfde dag gezien.",
        "agenda": "Zijn afspraak komt op het juiste moment in de agenda van de ritmoloog, met tijd voor ECG en echo.",
        "preConsultation": "Een chatbot stelt hem de vragen die bij VKF tellen: hoe vaak, hoe lang, wat het uitlokt, kortademigheid, alcohol en snurken. U weet wat er scheelt nog voor hij binnenkomt.",
        "voiceReception": "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U bespreekt het ECG en de echo, berekent zijn risico op een beroerte en start antistolling. Vesalius noteert mee.",
        "medication": "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. Ook de Asaflow die hij niet als bloedverdunner zag, staat in het dossier. U ziet het meteen bij de start van de antistolling.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift voor apixaban en de aanvragen voor Holter en slaaponderzoek staan klaar.",
        "smartFollowUp": "Hij vult de AFEQT in, telt zijn aanvallen, en vertelt hoe het gaat met slapen, werken en fietsen."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor cardiologie.",
      "focus": "Focus binnen uw vakgebied (bv. ritmologie, interventionele cardiologie, hartfalen)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a cardiologist",
      "line2": "again.",
      "greeting": "Hello Marc! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "I’ve had episodes of palpitations for two months. My watch gave me an alert and my GP saw it on the ECG.",
      "assistantMessage": "Thank you. Does your heartbeat feel irregular, or more like isolated skipped beats? Have you ever fainted or nearly fainted during an episode?",
      "noteBody": "Episodes of irregular palpitations for two months, lasting up to two days. AF on GP ECG. Now sinus rhythm at 64/min. Echo: LVEF 58%, mildly dilated left atrium. CHA2DS2-VA 2…"
    },
    "journey": {
      "subtitle": "A patient with palpitations, from the first message to a calmer heart. Vesalius does the groundwork so you can focus on his care.",
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
          "detail": "Irregular rhythm recorded on ECG and smartwatch: Marc goes to the arrhythmia clinic. Isolated skipped beats without other symptoms get a routine slot. Fainting during exercise is seen the same day.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full intake, at home and in his own language.",
          "detail": "Episodes and triggers, a smartwatch alert screenshot, medication from a photo, alcohol and snoring. No red flags.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "The history is ready. You start straight away with ECG, echo and stroke risk.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, anticoagulant prescription, Holter and sleep study requests, and guidance on when to call 112.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow recovery at home, beyond the scores.",
          "detail": "AFEQT and episode frequency, alongside adherence, sleep, work and cycling. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with atrial fibrillation through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "An irregular rhythm goes to the arrhythmia clinic. Isolated skipped beats get a routine slot. Anyone who fainted during exercise is seen the same day.",
        "agenda": "His appointment is booked in the electrophysiologist’s diary, with time for ECG and echo.",
        "preConsultation": "The chatbot asks the questions that matter in AF: frequency, duration, triggers, breathlessness, alcohol and snoring. You know what is going on before he arrives.",
        "voiceReception": "Would he rather call? He gets the same triage and booking over the phone.",
        "scribe": "You discuss the ECG and echo, assess his stroke risk and start anticoagulation. Vesalius takes notes.",
        "medication": "He sends a photo of his pharmacy’s medication schedule in the chat. The record includes the Asaflow he did not think of as a blood thinner. You see it before starting anticoagulation.",
        "documentGeneration": "The letter to the GP, apixaban prescription and Holter and sleep study requests are ready.",
        "smartFollowUp": "He completes the AFEQT, counts his episodes and describes sleep, work and cycling."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for cardiology.",
      "focus": "Focus within your speciality (e.g. electrophysiology, interventional cardiology, heart failure)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "cardiologue.",
      "greeting": "Bonjour Marc ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "J’ai des crises de palpitations depuis deux mois. Ma montre a affiché une alerte et mon médecin traitant l’a vu sur l’ECG.",
      "assistantMessage": "Merci. Votre rythme est-il irrégulier, ou ressentez-vous plutôt des battements isolés ? Avez-vous déjà perdu connaissance ou failli perdre connaissance pendant une crise ?",
      "noteBody": "Crises de palpitations irrégulières depuis deux mois, jusqu’à deux jours. FA sur l’ECG du médecin traitant. Rythme sinusal actuel à 64/min. Écho : FEVG 58 %, oreillette gauche légèrement dilatée. CHA2DS2-VA 2…"
    },
    "journey": {
      "subtitle": "Un patient avec des palpitations, du premier signalement à un cœur plus calme. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
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
          "title": "Chaque patient est orienté vers le bon médecin.",
          "detail": "Rythme irrégulier enregistré sur ECG et montre connectée : Marc va en rythmologie. Des extrasystoles isolées sans autre symptôme ont un créneau habituel. Une syncope à l’effort est vue le jour même.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse complète, chez lui et dans sa langue.",
          "detail": "Crises et déclencheurs, capture de l’alerte de la montre, médicaments par photo, alcool et ronflements. Aucun signe d’alerte.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse est prête. Vous commencez directement par l’ECG, l’échographie et le risque d’AVC.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, prescription d’anticoagulant, demandes de Holter et d’étude du sommeil, consignes pour appeler le 112.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "La récupération suivie à domicile, au-delà des scores.",
          "detail": "AFEQT et nombre de crises, mais aussi observance, sommeil, travail et vélo. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez un patient avec une fibrillation atriale à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Un rythme irrégulier va en rythmologie. Des extrasystoles isolées ont un créneau habituel. Une syncope à l’effort est vue le jour même.",
        "agenda": "Son rendez-vous est placé dans l’agenda du rythmologue, avec du temps pour l’ECG et l’échographie.",
        "preConsultation": "Le chatbot pose les questions importantes dans la FA : fréquence, durée, déclencheurs, dyspnée, alcool et ronflements. Vous savez ce qui se passe avant son arrivée.",
        "voiceReception": "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous discutez de l’ECG et de l’échographie, évaluez le risque d’AVC et commencez l’anticoagulation. Vesalius prend des notes.",
        "medication": "Il envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend aussi l’Asaflow qu’il ne considérait pas comme un fluidifiant. Vous le voyez avant l’anticoagulation.",
        "documentGeneration": "La lettre au médecin traitant, la prescription d’apixaban et les demandes de Holter et d’étude du sommeil sont prêtes.",
        "smartFollowUp": "Il remplit l’AFEQT, compte ses crises et décrit le sommeil, le travail et le vélo."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la cardiologie.",
      "focus": "Domaine de prédilection (p. ex. rythmologie, cardiologie interventionnelle, insuffisance cardiaque)"
    }
  }
};
