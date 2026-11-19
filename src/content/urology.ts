import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const UROLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "uroloog.",
      greeting: "Hallo Paul! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      patientMessage: "Al meer dan een jaar een zwakke straal, en 's nachts moet ik drie keer naar het toilet.",
      assistantMessage: "Dank u. Lukt het plassen op dit moment nog altijd? En heeft u ooit bloed in uw urine gezien?",
      noteBody: "Zwakke straal, nadruppelen en nocturie 3× sinds ruim een jaar. IPSS 19. Rectaal toucher: prostaat vergroot, glad, geen noduli. Qmax 9 ml/s, residu 90 ml. Echo: prostaatvolume 52 ml…",
    },
    journey: {
      subtitle: "Een patiënt met plasklachten door een vergrote prostaat, van eerste melding tot een nacht doorslapen. Vesalius doet het voorwerk, u blijft de arts.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt bij de juiste arts.",
          detail: "Zwakke straal, plassen lukt nog, geen koorts, PSA normaal: Paul gaat naar de raadpleging plasklachten. Een verhoogde PSA gaat naar uro-oncologie, niet meer kunnen plassen meteen naar spoed.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in zijn eigen taal.",
          detail: "IPSS en een plasdagboek van drie dagen. Zijn medicatiefoto toont dat zijn bloeddrukpil een plastablet bevat, die hij 's avonds neemt.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De anamnese en het dagboek liggen al klaar. U begint meteen bij het rectaal toucher, de flow en het residu.",
          part: "Gewoon arts zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Brief aan de huisarts, voorschrift en uitleg over de medicatie, met het drinkadvies.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Na de behandeling",
          title: "Herstel thuis opgevolgd, niet alleen in cijfers.",
          detail: "IPSS en nocturie, maar ook slaap, werk en fietsen. De vragenlijsten volgen de gekozen behandeling.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënt met plasklachten door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Plasklachten met een normale PSA gaan naar de raadpleging plasklachten. Een verhoogde PSA gaat naar uro-oncologie. Wie niet meer kan plassen, wordt meteen gemarkeerd.",
        agenda: "Zijn afspraak komt op het juiste moment in de agenda, met tijd voor flow en residu.",
        preConsultation: "Een chatbot stelt hem de vragen die bij plasklachten tellen: straal, nocturie, aandrang, de IPSS en een plasdagboek van drie dagen. U weet wat er scheelt nog voor hij binnenkomt.",
        voiceReception: "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U onderzoekt de prostaat en bespreekt de flow, het residu en de echo. Samen kiest u voor medicatie. Vesalius noteert mee.",
        medication: "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. Zo ziet u dat zijn bloeddrukpil een plastablet bevat die hij 's avonds neemt. Geen bloedverdunners, mocht later een ingreep nodig zijn.",
        documentGeneration: "De brief aan de huisarts, het voorschrift en de uitleg met drinkadvies staan klaar.",
        smartFollowUp: "Hij vult de IPSS in en vertelt hoe vaak hij 's nachts nog op moet, hoe hij slaapt en hoe het fietsen gaat.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor urologie.",
      focus: "Focus binnen uw vakgebied (bv. functionele urologie, uro-oncologie, endo-urologie)",
    },
  },
  en: {
    hero: {
      line1: "Be a urologist",
      line2: "again.",
      greeting: "Hello Paul! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: "I’ve had a weak stream for over a year, and I get up three times a night to use the toilet.",
      assistantMessage: "Thank you. Can you still pass urine now? Have you ever seen blood in your urine?",
      noteBody: "Weak stream, post-micturition dribble and nocturia three times nightly for over a year. IPSS 19. DRE: enlarged, smooth prostate, no nodules. Qmax 9 ml/s, residual 90 ml. Ultrasound: prostate volume 52 ml…",
    },
    journey: {
      subtitle: "A patient with urinary symptoms from an enlarged prostate, from his first message to a better night’s sleep. Vesalius does the groundwork so you can focus on his care.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient sees the right clinician.",
          detail: "Weak stream, still able to pass urine, no fever and a normal PSA: Paul goes to the urinary symptoms clinic. Raised PSA is routed to uro-oncology, and inability to pass urine goes straight to emergency care.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in his own language.",
          detail: "An IPSS and a three-day bladder diary. His medication photo shows that the blood pressure tablet he takes in the evening contains a diuretic.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You examine. Vesalius listens.",
          detail: "The history and diary are ready. You can start with the rectal examination, flow rate and residual volume.",
          part: "Just be the doctor.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "A letter to the GP, a prescription and an explanation of the medication, with advice on fluid intake.",
          part: "Review and sign.",
        },
        {
          moment: "After treatment",
          title: "Follow recovery at home, beyond the scores.",
          detail: "IPSS and nocturia, alongside sleep, work and cycling. The questionnaires follow the treatment chosen.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient with urinary symptoms through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "Urinary symptoms with a normal PSA go to the urinary symptoms clinic. Raised PSA goes to uro-oncology. Anyone unable to pass urine is flagged immediately.",
        agenda: "His appointment is booked with time for uroflowmetry and a residual volume measurement.",
        preConsultation: "The chatbot asks about stream, nocturia, urgency, the IPSS and a three-day bladder diary. You know what is going on before he arrives.",
        voiceReception: "Would he rather call? He gets the same triage and booking over the phone.",
        scribe: "You examine his prostate and discuss the flow rate, residual volume and ultrasound. Together you choose medication. Vesalius takes notes.",
        medication: "He sends a photo of his pharmacy’s medication schedule. You can see that the blood pressure tablet he takes in the evening contains a diuretic. He takes no blood thinners, should a procedure be needed later.",
        documentGeneration: "The letter to the GP, the prescription and the explanation with advice on fluid intake are ready.",
        smartFollowUp: "He completes the IPSS and tells you how often he still gets up at night, how he sleeps and how his cycling is going.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for urology.",
      focus: "Focus within your speciality (e.g. functional urology, uro-oncology, endourology)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "urologue.",
      greeting: "Bonjour Paul ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      patientMessage: "Mon jet est faible depuis plus d’un an, et je me lève trois fois par nuit pour aller aux toilettes.",
      assistantMessage: "Merci. Arrivez-vous encore à uriner en ce moment ? Avez-vous déjà vu du sang dans vos urines ?",
      noteBody: "Jet faible, gouttes retardataires et nycturie 3× depuis plus d’un an. IPSS 19. Toucher rectal : prostate augmentée de volume, lisse, sans nodule. Qmax 9 ml/s, résidu 90 ml. Échographie : volume prostatique 52 ml…",
    },
    journey: {
      subtitle: "Un patient présentant des troubles urinaires liés à une prostate augmentée de volume, du premier signalement à un meilleur sommeil. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon professionnel.",
          detail: "Jet faible, miction encore possible, pas de fièvre, PSA normal : Paul est orienté vers la consultation des troubles urinaires. Un PSA élevé est orienté en uro-oncologie. Une impossibilité d’uriner est signalée immédiatement aux urgences.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez lui et dans sa langue.",
          detail: "Un IPSS et un calendrier mictionnel de trois jours. La photo de son traitement montre que l’antihypertenseur qu’il prend le soir contient un diurétique.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "L’anamnèse et le calendrier sont prêts. Vous commencez par le toucher rectal, la débitmétrie et le résidu post-mictionnel.",
          part: "Être médecin.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Lettre au médecin traitant, ordonnance et explications sur le traitement, avec des conseils sur les boissons.",
          part: "Relire et signer.",
        },
        {
          moment: "Après le traitement",
          title: "La récupération suivie à domicile, au-delà des scores.",
          detail: "L’IPSS et la nycturie, mais aussi le sommeil, le travail et le vélo. Les questionnaires suivent le traitement choisi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez un patient présentant des troubles urinaires à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Les troubles urinaires avec un PSA normal sont orientés vers la consultation dédiée. Un PSA élevé est orienté vers l’uro-oncologie. Les patients qui ne peuvent plus uriner sont signalés immédiatement.",
        agenda: "Son rendez-vous prévoit le temps nécessaire à la débitmétrie et à la mesure du résidu post-mictionnel.",
        preConsultation: "Le chatbot l’interroge sur le jet, la nycturie, l’urgenturie, l’IPSS et le calendrier mictionnel de trois jours. Vous savez ce qui se passe avant son arrivée.",
        voiceReception: "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous examinez la prostate et discutez de la débitmétrie, du résidu et de l’échographie. Vous choisissez ensemble un traitement médicamenteux. Vesalius prend des notes.",
        medication: "Il envoie une photo du schéma de médication de sa pharmacie. Vous voyez que l’antihypertenseur qu’il prend le soir contient un diurétique. Il ne prend pas d’anticoagulants, si une intervention s’avère nécessaire plus tard.",
        documentGeneration: "La lettre au médecin traitant, l’ordonnance et les explications avec les conseils sur les boissons sont prêtes.",
        smartFollowUp: "Il remplit l’IPSS et raconte combien de fois il se lève encore la nuit, comment il dort et comment se passent ses sorties à vélo.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l'urologie.",
      focus: "Domaine de prédilection (p. ex. urologie fonctionnelle, uro-oncologie, endo-urologie)",
    },
  },
};
