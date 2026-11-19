import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const PNEUMOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "longarts.",
      "greeting": "Hallo Paul! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Ik ben al twee jaar steeds sneller buiten adem. Na één trap moet ik stoppen, en ik hoest elke ochtend slijm op.",
      "assistantMessage": "Dank u. Bent u ook kortademig als u plat ligt of 's nachts? En rookt u, of heeft u gerookt?",
      "noteBody": "Progressieve inspanningsdyspneu sinds twee jaar, chronische ochtendhoest. Actief roker, 45 pakjaren. Verlengd expirium, expiratoire wheezing. Spirometrie: FEV1 51%, FEV1/FVC 0,49, niet reversibel…"
    },
    "journey": {
      "subtitle": "Een patiënt met COPD, van eerste melding tot weer wandelen met de hond. Vesalius doet het voorwerk, u blijft de arts.",
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
          "detail": "Kortademig bij inspanning, jaren ochtendhoest, rookt nog: Paul gaat naar de COPD-raadpleging. Kortademig bij plat liggen met dikke enkels gaat naar cardiologie.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige intake, thuis en in zijn eigen taal.",
          "detail": "Wandelafstand, opstoten van het voorbije jaar, pakjaren, 38 jaar lasdampen, inhalatoren via foto, waar de RX genomen werd. Geen rode vlaggen.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De anamnese ligt al klaar. U begint meteen bij de spirometrie, de inhalatietechniek en het rookgesprek.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift inhalator en voorzetkamer, aanvraag longrevalidatie, verwijzing tabacoloog en een actieplan bij een opstoot.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Herstel thuis opgevolgd, niet alleen in cijfers.",
          "detail": "CAT en mMRC, maar ook opstoten, rookstatus, de noodpuffer en het rondje met de hond. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënt met COPD door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Kortademig bij inspanning met ochtendhoest gaat naar de COPD-raadpleging. Kortademig bij plat liggen met dikke enkels gaat naar cardiologie. Wie bloed ophoest, wordt gemarkeerd.",
        "agenda": "Zijn afspraak komt in een lang blok, met tijd voor spirometrie en inhalatietechniek.",
        "preConsultation": "Een chatbot stelt hem de vragen die bij COPD tellen: wandelafstand, opstoten, pakjaren, beroep, vaccinaties. U weet wat er scheelt nog voor hij binnenkomt.",
        "voiceReception": "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U bespreekt de spirometrie en zijn inhalatietechniek, en samen kiest u een nieuwe inhalator en een stopdatum. Vesalius noteert mee.",
        "medication": "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook het prostaatmiddel dat hij zelf niet vermeldde. Dat telt naast een inhalator met tiotropium.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift, de aanvraag longrevalidatie en zijn actieplan bij een opstoot staan klaar.",
        "smartFollowUp": "Hij vult de CAT in, meldt of hij nog rookt en vertelt hoe ver hij weer wandelt met de hond."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor pneumologie.",
      "focus": "Focus binnen uw vakgebied (bv. COPD en astma, slaapgeneeskunde, thoracale oncologie)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a respiratory physician",
      "line2": "again.",
      "greeting": "Hello Paul! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "I’ve been getting breathless more easily for two years. I have to stop after one flight of stairs and cough up phlegm every morning.",
      "assistantMessage": "Thank you. Are you also breathless lying flat or at night? Do you smoke, or have you smoked in the past?",
      "noteBody": "Progressive exertional breathlessness for two years, chronic morning cough. Current smoker, 45 pack-years. Prolonged expiration, expiratory wheeze. Spirometry: FEV1 51%, FEV1/FVC 0.49, not reversible…"
    },
    "journey": {
      "subtitle": "A patient with COPD, from his first message to walking the dog again. Vesalius does the groundwork so you can focus on his care.",
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
          "detail": "Breathless on exertion, years of morning cough and still smoking: Paul goes to the COPD clinic. Breathlessness lying flat with swollen ankles goes to cardiology.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full intake, at home and in his own language.",
          "detail": "Walking distance, exacerbations in the past year, pack-years, 38 years of welding fumes, inhalers from a photo and where his chest X-ray was taken. No red flags.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "The history is ready. You start straight away with spirometry, inhaler technique and discussing smoking cessation.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, inhaler and spacer prescription, pulmonary rehabilitation request, smoking cessation referral and exacerbation action plan.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow recovery at home, beyond the scores.",
          "detail": "CAT and mMRC, alongside exacerbations, smoking status, reliever use and walking the dog. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with COPD through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "Exertional breathlessness with a morning cough goes to the COPD clinic. Breathlessness lying flat with swollen ankles goes to cardiology. Coughing up blood is flagged.",
        "agenda": "His appointment gets a longer slot, with time for spirometry and inhaler technique.",
        "preConsultation": "The chatbot asks the questions that matter in COPD: walking distance, exacerbations, pack-years, occupation and vaccinations. You know what is going on before he arrives.",
        "voiceReception": "Would he rather call? He gets the same triage and booking over the phone.",
        "scribe": "You discuss spirometry and inhaler technique, then choose a new inhaler and a quit date together. Vesalius takes notes.",
        "medication": "He sends a photo of his pharmacy’s medication schedule. The record includes the prostate medicine he did not mention, relevant alongside an inhaler containing tiotropium.",
        "documentGeneration": "The letter to the GP, prescription, pulmonary rehabilitation request and exacerbation action plan are ready.",
        "smartFollowUp": "He completes the CAT, reports whether he still smokes and describes how far he can walk with the dog."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for respiratory medicine.",
      "focus": "Focus within your speciality (e.g. COPD and asthma, sleep medicine, thoracic oncology)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "pneumologue.",
      "greeting": "Bonjour Paul ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "Je suis de plus en plus vite essoufflé depuis deux ans. Je dois m’arrêter après un étage et je crache des glaires chaque matin.",
      "assistantMessage": "Merci. Êtes-vous aussi essoufflé en position couchée ou la nuit ? Fumez-vous, ou avez-vous fumé ?",
      "noteBody": "Dyspnée d’effort progressive depuis deux ans, toux matinale chronique. Fumeur actif, 45 paquets-années. Expiration prolongée, sibilants expiratoires. Spirométrie : VEMS 51 %, VEMS/CVF 0,49, non réversible…"
    },
    "journey": {
      "subtitle": "Un patient avec une BPCO, du premier signalement aux promenades avec son chien. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
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
          "detail": "Dyspnée d’effort, toux matinale ancienne et tabagisme actif : Paul va en consultation BPCO. Une dyspnée couché avec chevilles gonflées va en cardiologie.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse complète, chez lui et dans sa langue.",
          "detail": "Distance de marche, exacerbations de l’année, paquets-années, 38 ans de fumées de soudage, inhalateurs par photo et lieu de la radiographie. Aucun signe d’alerte.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse est prête. Vous commencez directement par la spirométrie, la technique d’inhalation et l’arrêt du tabac.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, prescription d’inhalateur et de chambre d’inhalation, demande de réadaptation respiratoire, orientation en tabacologie et plan d’action en cas d’exacerbation.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "La récupération suivie à domicile, au-delà des scores.",
          "detail": "CAT et mMRC, mais aussi exacerbations, tabagisme, inhalateur de secours et promenades. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez un patient avec une BPCO à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Une dyspnée d’effort avec toux matinale va en consultation BPCO. Une dyspnée couché avec chevilles gonflées va en cardiologie. Des crachats de sang sont signalés.",
        "agenda": "Son rendez-vous bénéficie d’un créneau long, avec le temps pour la spirométrie et la technique d’inhalation.",
        "preConsultation": "Le chatbot pose les questions importantes : distance de marche, exacerbations, paquets-années, métier et vaccinations. Vous savez ce qui se passe avant son arrivée.",
        "voiceReception": "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous discutez de la spirométrie et de la technique d’inhalation, puis choisissez ensemble un nouvel inhalateur et une date d’arrêt du tabac. Vesalius prend des notes.",
        "medication": "Il envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend le traitement prostatique oublié, important avec un inhalateur contenant du tiotropium.",
        "documentGeneration": "La lettre au médecin traitant, l’ordonnance, la demande de réadaptation respiratoire et le plan d’action sont prêts.",
        "smartFollowUp": "Il remplit le CAT, indique s’il fume encore et raconte la distance parcourue avec son chien."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la pneumologie.",
      "focus": "Domaine de prédilection (p. ex. BPCO et asthme, médecine du sommeil, oncologie thoracique)"
    }
  }
};
