import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const GENERAL_SURGERY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "chirurg.",
      greeting: "Hallo Dirk! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      patientMessage: "Al vijf maanden een zwelling in mijn lies rechts. Op het werk, als ik zakken hef, trekt het.",
      assistantMessage: "Dank u. Verdwijnt de zwelling als u neerligt of ze zachtjes terugduwt? En is ze ooit hard of pijnlijk blijven zitten?",
      noteBody: "Zwelling lies rechts sinds vijf maanden, trekkend bij tillen. Staand: zachte zwelling boven het ligament van Poupart, impuls bij hoesten, spontaan reponibel. Links geen breuk. Echo: indirecte liesbreuk rechts, hals 2,1 cm…",
    },
    journey: {
      subtitle: "Een patiënt met een liesbreuk, van eerste melding tot weer aan het werk. Vesalius doet het voorwerk, u blijft de arts.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt bij de juiste arts.",
          detail: "Een zwelling in de lies die verdwijnt als hij ligt: Dirk gaat naar de buikwandraadpleging. Liespijn zonder zwelling bij een voetballer gaat naar sportgeneeskunde, startpijn met een stijve heup naar orthopedie.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in zijn eigen taal.",
          detail: "Hoe zwaar hij tilt, de trompet, de echo bij de radioloog, en een foto van zijn medicatieschema: de tamsulosine die hij zelf vergat. Geen bloedverdunners, geen rode vlaggen.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De anamnese ligt al klaar. U onderzoekt staand en liggend, bespreekt de echo en plant een laparoscopisch herstel.",
          part: "Gewoon arts zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Brief aan de huisarts, aanvraag dagopname, attest voor het werk en uitleg over de voorbereiding.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Na de ingreep",
          title: "Herstel thuis opgevolgd, niet alleen in cijfers.",
          detail: "Plassen en pijn op dag 1, werk en trompet in week 3, EuraHS-QoL en Carolinas Comfort Scale op maand 3 en 12. De vragenlijsten volgen de gekozen behandeling.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënt met een liesbreuk door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Een zwelling die verdwijnt bij liggen gaat naar de buikwandraadpleging. Liespijn bij een sporter gaat naar sportgeneeskunde. Een breuk die hard en pijnlijk blijft zitten, gaat meteen naar het secretariaat.",
        agenda: "Zijn afspraak komt op het juiste moment in de agenda van de buikwandchirurg.",
        preConsultation: "Een chatbot stelt hem de vragen die bij een liesbreuk tellen: welke zijde, gaat de zwelling terug, hoe zwaar tilt hij, eerdere operaties, echo elders. U weet wat er scheelt nog voor hij binnenkomt.",
        voiceReception: "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U onderzoekt zijn lies staand en liggend en bespreekt de echo. Samen kiest u voor een laparoscopisch herstel in dagopname. Vesalius noteert mee.",
        medication: "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook de tamsulosine voor zijn prostaat die hij zelf vergat te vermelden. Geen bloedverdunners: niets te stoppen voor de ingreep.",
        documentGeneration: "De brief aan de huisarts, de aanvraag voor de dagopname, het attest voor het werk en de uitleg over de voorbereiding staan klaar.",
        smartFollowUp: "Hij meldt op dag 1 dat plassen lukt, vult later de EuraHS-QoL en de Carolinas Comfort Scale in, en vertelt hoe het gaat met tillen op het werk en trompet spelen.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor algemene en abdominale heelkunde.",
      focus: "Focus binnen uw vakgebied (bv. buikwand, hepatobiliair, colorectaal)",
    },
  },
  en: {
    hero: {
      line1: "Be a surgeon",
      line2: "again.",
      greeting: "Hello Dirk! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: "I’ve had a swelling in my right groin for five months. It pulls when I lift bags at work.",
      assistantMessage: "Thank you. Does the swelling disappear when you lie down or gently push it back? Has it ever stayed hard and painful?",
      noteBody: "Right groin swelling for five months, pulling discomfort when lifting. Standing examination: soft swelling above the inguinal ligament, cough impulse, spontaneously reducible. No left-sided hernia. Ultrasound: indirect right inguinal hernia, neck 2.1 cm…",
    },
    journey: {
      subtitle: "A patient with an inguinal hernia, from his first message to returning to work. Vesalius does the groundwork so you can focus on his care.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient sees the right clinician.",
          detail: "A groin swelling that disappears when lying down: Dirk goes to the abdominal wall clinic. Groin pain without swelling in a footballer goes to sports medicine, and start-up pain with a stiff hip goes to orthopaedics.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in his own language.",
          detail: "His lifting at work, trumpet playing, the ultrasound and a photo of his medication schedule, including the tamsulosin he forgot to mention. No blood thinners or red flags.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You examine. Vesalius listens.",
          detail: "The history is ready. You examine him standing and lying down, discuss the ultrasound and plan a laparoscopic repair.",
          part: "Just be the doctor.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "Letter to the GP, day-case admission request, fit note and an explanation of the preparations.",
          part: "Review and sign.",
        },
        {
          moment: "After the procedure",
          title: "Follow recovery at home, beyond the scores.",
          detail: "Urination and pain on day 1, work and trumpet in week 3, EuraHS-QoL and Carolinas Comfort Scale at months 3 and 12. The questionnaires follow the treatment chosen.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient with an inguinal hernia through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "A swelling that disappears when lying down goes to the abdominal wall clinic. Groin pain in an athlete goes to sports medicine. A hernia that stays hard and painful is flagged to reception immediately.",
        agenda: "His appointment is booked into the abdominal wall surgeon’s diary at the right time.",
        preConsultation: "The chatbot asks the questions that matter for an inguinal hernia: which side, whether the swelling reduces, lifting, previous operations and ultrasound elsewhere. You know what is going on before he arrives.",
        voiceReception: "Would he rather call? He gets the same triage and booking over the phone.",
        scribe: "You examine his groin standing and lying down and discuss the ultrasound. Together you choose a laparoscopic day-case repair. Vesalius takes notes.",
        medication: "He sends a photo of his pharmacy’s medication schedule. The record includes the tamsulosin for his prostate he forgot to mention. No blood thinners need stopping for the procedure.",
        documentGeneration: "The letter to the GP, day-case admission request, fit note and preparation instructions are ready.",
        smartFollowUp: "On day 1 he confirms he can pass urine. Later he completes the EuraHS-QoL and Carolinas Comfort Scale and describes lifting at work and playing the trumpet.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for general and abdominal surgery.",
      focus: "Focus within your speciality (e.g. abdominal wall, hepatobiliary, colorectal)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "chirurgien.",
      greeting: "Bonjour Dirk ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      patientMessage: "J’ai une boule dans l’aine droite depuis cinq mois. Au travail, quand je soulève des sacs, ça tire.",
      assistantMessage: "Merci. La boule disparaît-elle lorsque vous vous allongez ou que vous la repoussez doucement ? Est-elle déjà restée dure et douloureuse ?",
      noteBody: "Tuméfaction inguinale droite depuis cinq mois, tiraillements au port de charges. Debout : tuméfaction souple au-dessus du ligament inguinal, impulsion à la toux, spontanément réductible. Pas de hernie à gauche. Échographie : hernie inguinale indirecte droite, collet de 2,1 cm…",
    },
    journey: {
      subtitle: "Un patient avec une hernie inguinale, du premier signalement à la reprise du travail. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon professionnel.",
          detail: "Une tuméfaction de l’aine qui disparaît en position couchée : Dirk est orienté en consultation de paroi abdominale. Une douleur sans tuméfaction chez un footballeur relève de la médecine du sport, une douleur au démarrage avec raideur de hanche de l’orthopédie.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez lui et dans sa langue.",
          detail: "Les charges au travail, la trompette, l’échographie et une photo du schéma de médication, avec la tamsulosine qu’il avait oubliée. Aucun anticoagulant ni signe d’alerte.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "L’anamnèse est prête. Vous examinez debout et couché, discutez de l’échographie et planifiez une réparation laparoscopique.",
          part: "Être médecin.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Lettre au médecin traitant, demande d’hospitalisation de jour, certificat de travail et explications sur la préparation.",
          part: "Relire et signer.",
        },
        {
          moment: "Après l’intervention",
          title: "La récupération suivie à domicile, au-delà des scores.",
          detail: "Miction et douleur au jour 1, travail et trompette en semaine 3, EuraHS-QoL et Carolinas Comfort Scale aux mois 3 et 12. Les questionnaires suivent le traitement choisi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez un patient avec une hernie inguinale à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Une tuméfaction qui disparaît couché est orientée en consultation de paroi. Une douleur inguinale chez un sportif relève de la médecine du sport. Une hernie qui reste dure et douloureuse est signalée immédiatement au secrétariat.",
        agenda: "Son rendez-vous est placé au bon moment dans l’agenda du chirurgien de la paroi.",
        preConsultation: "Le chatbot pose les questions importantes : côté, réductibilité, charges portées, opérations antérieures et échographie externe. Vous savez ce qui se passe avant son arrivée.",
        voiceReception: "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous examinez son aine debout et couché et discutez de l’échographie. Vous choisissez ensemble une réparation laparoscopique en hôpital de jour. Vesalius prend des notes.",
        medication: "Il envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend la tamsulosine pour sa prostate qu’il avait oubliée. Aucun anticoagulant à interrompre pour l’intervention.",
        documentGeneration: "La lettre au médecin traitant, la demande d’hôpital de jour, le certificat de travail et les consignes de préparation sont prêts.",
        smartFollowUp: "Au jour 1, il confirme qu’il urine. Plus tard, il remplit l’EuraHS-QoL et la Carolinas Comfort Scale, et raconte comment se passent le port de charges et la trompette.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la chirurgie générale et abdominale.",
      focus: "Domaine de prédilection (p. ex. paroi abdominale, hépatobiliaire, colorectal)",
    },
  },
};
