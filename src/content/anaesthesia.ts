import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const ANAESTHESIA_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "anesthesist.",
      greeting: "Hallo Frans! Ik help de anesthesist om uw operatie voor te bereiden. Voor welke ingreep komt u, en wanneer is die gepland?",
      patientMessage: "Ik krijg op 2 december een nieuwe knie, links.",
      assistantMessage: "Dank u. Kunt u twee trappen op zonder te stoppen? En snurkt u, of ziet iemand dat u soms stopt met ademen als u slaapt?",
      intakeReady: "Samenvatting klaar voor de anesthesist",
      noteBody: "Pre-op voor totale knieprothese links. Twee trappen lukt traag, beperkt door de knie. Snurken met ademstops gezien door de partner. Diabetes met wekelijkse injectie. Luchtweg: mondopening ruim, nek vrij beweeglijk, uitneembare bovenprothese…",
    },
    journey: {
      subtitle: "Een patiënt voor een knieprothese, van het inplannen van de ingreep tot herstel thuis. Vesalius doet het voorwerk, u blijft de arts.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het inplannen",
          title: "De juiste patiënt op de juiste plaats.",
          detail: "Grote ingreep, diabetes, snurken: de anesthesist plant Frans in op de pre-op raadpleging. Een gezonde patiënt voor een kleine ingreep kan op dossier beoordeeld worden, volgens de afspraken van uw dienst.",
          part: "Niets.",
        },
        {
          moment: "Na de screening",
          title: "Een volledige pre-op intake, thuis.",
          detail: "Eerdere narcoses, trappen, slaap, gebit, allergieën en medicatie via een foto in de chat. De wekelijkse injectie die hij vergat, staat bovenaan.",
          part: "Niets.",
        },
        {
          moment: "Tijdens de raadpleging",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De vragenlijst ligt al klaar. U begint bij de luchtweg en bespreekt de anesthesietechniek.",
          part: "Gewoon arts zijn.",
        },
        {
          moment: "Na de raadpleging",
          title: "De administratie schrijft zichzelf.",
          detail: "Pre-op verslag voor de chirurg, brief aan de huisarts en instructies voor Frans in begrijpelijke taal.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Rond de ingreep",
          title: "Herinnerd vooraf, opgevolgd achteraf.",
          detail: "De dag vooraf een herinnering aan de nuchterafspraken van de anesthesist. Na de ingreep: herstel, pijn, misselijkheid en hoe hij de narcose beleefde.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënt door de pre-op en de ingreep. De modules werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Na het inplannen van de ingreep zet de screening de antwoorden naast de afspraken van uw dienst. De anesthesist beslist wie op raadpleging komt. Nieuwe klachten van hart of adem gaan dezelfde dag naar het secretariaat.",
        agenda: "Frans krijgt een lang blok op de pre-op raadpleging, ruim vóór zijn ingreep.",
        preConsultation: "Een chatbot vraagt naar eerdere narcoses, trappen, slaap, gebit en allergieën. U opent de raadpleging met de aandachtspunten bovenaan.",
        voiceReception: "Belt hij liever? Dezelfde screening en inplanning, via de telefoon.",
        scribe: "U onderzoekt de luchtweg en bespreekt de anesthesietechniek. Vesalius noteert mee in de structuur van uw pre-op verslag.",
        medication: "Hij stuurt in de chat een foto van zijn medicatieschema. De medicatie staat gestructureerd in het dossier, ook de wekelijkse injectie die hij zelf vergat. U beslist wat hij doorneemt.",
        documentGeneration: "Het pre-op verslag, de brief aan de huisarts en de instructies voor Frans staan klaar, met wat u besliste.",
        smartFollowUp: "De dag vooraf een herinnering. Na de ingreep vertelt hij hoe hij herstelt, of hij misselijk was en hoe hij de narcose beleefde.",
      },
      tags: { smartTriage: "Kern van de pre-op", preConsultation: "Kern van de pre-op", scribe: "Kern van de pre-op" },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor anesthesie en pre-op.",
      focus: "Focus binnen uw vakgebied (bv. pre-op raadpleging, dagchirurgie, locoregionale anesthesie)",
    },
  },
  en: {
    hero: {
      line1: "Be an anaesthetist",
      line2: "again.",
      greeting: "Hello Frans! I’m here to help the anaesthetist prepare for your operation. What procedure are you having, and when is it scheduled?",
      patientMessage: "I’m having my left knee replaced on 2 December.",
      assistantMessage: "Thank you. Can you climb two flights of stairs without stopping? Do you snore, or has anyone noticed you sometimes stop breathing while asleep?",
      intakeReady: "Summary ready for the anaesthetist",
      noteBody: "Pre-op assessment for left total knee replacement. Climbs two flights slowly, limited by knee pain. Snoring with witnessed pauses in breathing. Diabetes treated with a weekly injection. Airway: good mouth opening, free neck movement, removable upper denture…",
    },
    journey: {
      subtitle: "A patient having a knee replacement, from booking to recovery at home. Vesalius prepares the information for your clinical review.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient in the right place.",
          detail: "Major surgery, diabetes and snoring: the anaesthetist books Frans into the pre-op clinic. A healthy patient having minor surgery may be reviewed on the record, according to your department’s procedures.",
          part: "Nothing.",
        },
        {
          moment: "After screening",
          title: "A full pre-op intake, at home.",
          detail: "Previous anaesthetics, stairs, sleep, dentures, allergies and medication from a photo in the chat. The weekly injection he forgot to mention is flagged at the top.",
          part: "Nothing.",
        },
        {
          moment: "During the assessment",
          title: "You examine. Vesalius listens.",
          detail: "The questionnaire is ready. You start with the airway and discuss the anaesthetic technique.",
          part: "Just be the doctor.",
        },
        {
          moment: "After the assessment",
          title: "The paperwork writes itself.",
          detail: "A pre-op report for the surgeon, a letter to the GP and instructions for Frans in plain language.",
          part: "Review and sign.",
        },
        {
          moment: "Around the operation",
          title: "Reminders beforehand, follow-up afterwards.",
          detail: "A reminder the day before repeats the anaesthetist’s fasting instructions. Afterwards, Frans reports on recovery, pain, nausea and his experience of the anaesthetic.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient through pre-op and surgery. The modules work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "After the operation is booked, screening compares the answers with your department’s procedures. The anaesthetist decides who needs an appointment. New heart or breathing symptoms go to the reception team the same day.",
        agenda: "Frans gets a longer pre-op appointment well before his operation.",
        preConsultation: "The chatbot asks about previous anaesthetics, stairs, sleep, dentures and allergies. You open the assessment with the points to review at the top.",
        voiceReception: "Would he rather call? He gets the same screening and booking over the phone.",
        scribe: "You examine his airway and discuss the anaesthetic technique. Vesalius takes notes in the structure of your pre-op report.",
        medication: "He sends a photo of his medication schedule in the chat. The record includes the weekly injection he forgot to mention. You decide what he should continue.",
        documentGeneration: "The pre-op report, letter to the GP and instructions for Frans are ready, reflecting your decisions.",
        smartFollowUp: "He gets a reminder the day before. After the operation, he reports how he is recovering, whether he felt sick and what the anaesthetic was like.",
      },
      tags: { smartTriage: "Core to pre-op", preConsultation: "Core to pre-op", scribe: "Core to pre-op" },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for anaesthesia and pre-op.",
      focus: "Focus within your speciality (e.g. pre-op assessment, day surgery, regional anaesthesia)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "anesthésiste.",
      greeting: "Bonjour Frans ! J’aide l’anesthésiste à préparer votre opération. Quelle intervention est prévue et à quelle date ?",
      patientMessage: "On me pose une prothèse du genou gauche le 2 décembre.",
      assistantMessage: "Merci. Pouvez-vous monter deux étages sans vous arrêter ? Ronflez-vous ou quelqu’un a-t-il remarqué des pauses respiratoires pendant votre sommeil ?",
      intakeReady: "Résumé prêt pour l’anesthésiste",
      noteBody: "Bilan préopératoire pour prothèse totale du genou gauche. Monte deux étages lentement, gêné par le genou. Ronflements avec pauses respiratoires observées par sa conjointe. Diabète avec injection hebdomadaire. Voies aériennes : bonne ouverture buccale, mobilité cervicale libre, prothèse dentaire supérieure amovible…",
    },
    journey: {
      subtitle: "Un patient qui va recevoir une prothèse du genou, de la planification de l’intervention à la récupération à domicile. Vesalius prépare les informations pour votre évaluation clinique.",
      icons: ICONS,
      steps: [
        {
          moment: "À la planification de l’intervention",
          title: "Chaque patient suit le parcours adapté.",
          detail: "Intervention majeure, diabète et ronflements : l’anesthésiste prévoit une consultation pour Frans. Pour une intervention mineure chez un patient en bonne santé, une évaluation sur dossier est possible selon les procédures de votre service.",
          part: "Rien.",
        },
        {
          moment: "Après le dépistage",
          title: "Une anamnèse préopératoire complète, à domicile.",
          detail: "Anesthésies antérieures, escaliers, sommeil, dentition, allergies et médicaments par photo dans le chat. L’injection hebdomadaire oubliée est signalée en haut.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "Le questionnaire est prêt. Vous commencez par les voies aériennes et discutez de la technique d’anesthésie.",
          part: "Être médecin.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Bilan préopératoire pour le chirurgien, lettre au médecin traitant et consignes pour Frans en termes clairs.",
          part: "Relire et signer.",
        },
        {
          moment: "Autour de l’intervention",
          title: "Un rappel avant, un suivi après.",
          detail: "La veille, un rappel reprend les consignes de jeûne de l’anesthésiste. Après l’intervention, Frans décrit sa récupération, la douleur, les nausées et son expérience de l’anesthésie.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez un patient de la consultation préopératoire à l’intervention. Les modules fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Après la planification de l’intervention, le dépistage rapproche les réponses des procédures de votre service. L’anesthésiste décide qui doit venir en consultation. Les nouveaux symptômes cardiaques ou respiratoires sont signalés au secrétariat le jour même.",
        agenda: "Frans bénéficie d’un créneau préopératoire plus long, bien avant l’intervention.",
        preConsultation: "Le chatbot pose des questions sur les anesthésies antérieures, les escaliers, le sommeil, la dentition et les allergies. Vous ouvrez la consultation avec les points à examiner en haut.",
        voiceReception: "Il préfère appeler ? Le même dépistage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous examinez les voies aériennes et discutez de la technique d’anesthésie. Vesalius prend des notes dans la structure de votre bilan préopératoire.",
        medication: "Il envoie une photo de son schéma de médication dans le chat. Son dossier reprend aussi l’injection hebdomadaire qu’il avait oubliée. Vous décidez des médicaments à poursuivre.",
        documentGeneration: "Le bilan préopératoire, la lettre au médecin traitant et les consignes pour Frans sont prêts et reprennent vos décisions.",
        smartFollowUp: "Il reçoit un rappel la veille. Après l’intervention, il raconte comment il récupère, s’il a eu des nausées et comment il a vécu l’anesthésie.",
      },
      tags: { smartTriage: "Au cœur du préopératoire", preConsultation: "Au cœur du préopératoire", scribe: "Au cœur du préopératoire" },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l'anesthésie et la consultation préopératoire.",
      focus: "Domaine de prédilection (p. ex. consultation préopératoire, chirurgie de jour, anesthésie locorégionale)",
    },
  },
};
