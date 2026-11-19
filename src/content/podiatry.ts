import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const PODIATRY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "podoloog.",
      greeting: "Hallo Sara! Ik help de podoloog om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak?",
      patientMessage: "Al vier maanden pijn onder mijn rechterhiel. 's Ochtends zijn de eerste stappen het ergst.",
      assistantMessage: "Dank u. Wordt de pijn beter nadat u een paar minuten gestapt hebt, of doet elke stap even veel pijn? En voelt u tintelingen of een doof gevoel in uw voet?",
      intakeReady: "Samenvatting klaar voor de podoloog",
      noteBody: "Hielpijn rechts sinds vier maanden, startpijn 's ochtends 7/10. Drukpijn mediaal tuberculum calcanei, windlass-test positief. FPI-6 rechts +8, dorsiflexie enkel 5°. Conclusie: plantaire fasciopathie rechts…",
    },
    journey: {
      subtitle: "Een patiënte met hielpijn, van eerste melding tot ze opnieuw loopt. Vesalius doet het voorwerk, u blijft de podoloog.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt in de juiste agenda.",
          detail: "Startpijn onder de hiel die beter wordt na wat stappen: Sara krijgt een lang blok voor biomechanica. Pijn bij elke stap met drukpijn op het bot gaat eerst naar de huisarts.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in haar eigen taal.",
          detail: "Pijn bij de eerste stappen en na een dienst apart gescoord, loopvolume, schoenen, de echo bij de huisarts, medicatie via foto. Geen rode vlaggen.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U onderzoekt. Vesalius luistert mee.",
          detail: "De anamnese ligt al klaar. U begint meteen bij de voetanalyse, de windlass-test en de loopband.",
          part: "Gewoon podoloog zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Verslag aan de huisarts, zolenfiche, oefenschema met schoenadvies en het attest voor de mutualiteit.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Na de behandeling",
          title: "Herstel thuis opgevolgd, niet alleen in cijfers.",
          detail: "FFI en pijn bij de eerste stappen, maar ook werk, lopen en wandelen met de hond. De vragenlijsten volgen de gekozen behandeling.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënte met hielpijn door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Hielpijn bij de eerste stappen gaat naar de podoloog. Een vermoeden van stressfractuur gaat eerst naar de huisarts. Een diabetische voet met een wonde wordt dezelfde dag gemarkeerd.",
        agenda: "Haar afspraak komt als lang blok in de agenda voor biomechanica, met tijd voor de loopanalyse.",
        preConsultation: "Een chatbot stelt haar de vragen die bij hielpijn tellen: startpijn, loopvolume, schoenen, beroep, eerdere behandelingen. U weet wat er scheelt nog voor ze binnenkomt.",
        voiceReception: "Belt ze liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U onderzoekt haar voet en bekijkt hoe ze loopt. Samen kiest u voor steunzolen en oefeningen. Vesalius noteert mee.",
        medication: "Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de schildkliermedicatie die ze zelf vergat te vermelden. Geen bloedverdunners.",
        documentGeneration: "Het verslag aan de huisarts, de zolenfiche, het oefenschema en het attest voor de mutualiteit staan klaar.",
        smartFollowUp: "Ze vult de FFI en haar pijn bij de eerste stappen in, en vertelt hoe het gaat met werken, lopen en wandelen met de hond.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor podologie.",
      focus: "Focus binnen uw praktijk (bv. sport en biomechanica, diabetische voet, kinderpodologie)",
    },
  },
  en: {
    hero: {
      line1: "Be a podiatrist",
      line2: "again.",
      greeting: "Hello Sara! I’m here to help the podiatrist prepare for your visit. What is the main reason for your appointment?",
      patientMessage: "I’ve had pain under my right heel for four months. The first few steps in the morning are the worst.",
      assistantMessage: "Thank you. Does it ease after a few minutes of walking, or does every step hurt the same? Do you get any tingling or numbness in your foot?",
      intakeReady: "Summary ready for the podiatrist",
      noteBody: "Right heel pain for four months, first steps in the morning 7/10. Tenderness over the medial calcaneal tubercle, positive windlass test. FPI-6 right +8, ankle dorsiflexion 5°. Conclusion: right plantar fasciopathy…",
    },
    journey: {
      subtitle: "A patient with heel pain, from her first message to running again. Vesalius does the groundwork so you can focus on podiatry.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient in the right diary.",
          detail: "Heel pain on the first steps that eases with walking: Sara gets a longer biomechanics appointment. Pain on every step with tenderness over the bone is referred to the GP first.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in her own language.",
          detail: "Separate pain scores for first steps and after a shift, running mileage, footwear, the GP’s ultrasound and medication from a photo. No red flags.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You examine. Vesalius listens.",
          detail: "The history is ready. You can start with the foot assessment, windlass test and treadmill analysis.",
          part: "Just be the podiatrist.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "The report to the GP, orthotics specification, exercise plan with footwear advice and the certificate for her health insurer.",
          part: "Review and sign.",
        },
        {
          moment: "After treatment",
          title: "Follow recovery at home, beyond the scores.",
          detail: "FFI and first-step pain, alongside work, running and walking the dog. The questionnaires follow the treatment chosen.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient with heel pain through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "Heel pain on the first steps goes to the podiatrist. A suspected stress fracture goes to the GP first. A foot wound in a person with diabetes is flagged the same day.",
        agenda: "Her appointment gets a longer slot in the biomechanics diary, with time for gait analysis.",
        preConsultation: "The chatbot asks about first-step pain, running mileage, footwear, work and previous treatments. You know what is going on before she arrives.",
        voiceReception: "Would she rather call? She gets the same triage and booking over the phone.",
        scribe: "You examine her foot and watch her run. Together you choose orthoses and exercises. Vesalius takes notes.",
        medication: "She sends a photo of her pharmacy’s medication schedule in the chat. Her record includes the thyroid medication she forgot to mention. She takes no blood thinners.",
        documentGeneration: "The report to the GP, orthotics specification, exercise plan and certificate for her health insurer are ready.",
        smartFollowUp: "She completes the FFI and rates first-step pain, then describes how she is getting on at work, with running and with walking the dog.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for podiatry.",
      focus: "Focus within your practice (e.g. sport and biomechanics, diabetic foot, paediatric podiatry)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "podologue.",
      greeting: "Bonjour Sara ! J’aide le podologue à préparer votre visite. Quel est le motif principal de votre rendez-vous ?",
      patientMessage: "J’ai mal sous le talon droit depuis quatre mois. Les premiers pas du matin sont les plus douloureux.",
      assistantMessage: "Merci. La douleur diminue-t-elle après quelques minutes de marche, ou chaque pas est-il aussi douloureux ? Ressentez-vous des picotements ou un engourdissement du pied ?",
      intakeReady: "Résumé prêt pour le podologue",
      noteBody: "Douleur du talon droit depuis quatre mois, 7/10 aux premiers pas le matin. Douleur à la pression du tubercule médial du calcanéus, test de Windlass positif. FPI-6 droit +8, dorsiflexion de cheville 5°. Conclusion : fasciopathie plantaire droite…",
    },
    journey: {
      subtitle: "Une patiente qui souffre du talon, du premier signalement à la reprise de la course. Vesalius prépare le terrain pour que vous puissiez vous consacrer à la podologie.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon rendez-vous.",
          detail: "La douleur aux premiers pas qui s’atténue à la marche vaut à Sara un créneau plus long en biomécanique. Une douleur à chaque pas avec sensibilité osseuse est d’abord orientée vers le médecin traitant.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez elle et dans sa langue.",
          detail: "Douleur aux premiers pas et après un service évaluées séparément, volume de course, chaussures, échographie du médecin traitant et médicaments par photo. Aucun signe d’alerte.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous examinez. Vesalius écoute.",
          detail: "L’anamnèse est prête. Vous commencez par le bilan du pied, le test de Windlass et l’analyse sur tapis.",
          part: "Être podologue.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Compte rendu au médecin traitant, fiche de fabrication des semelles, programme d’exercices avec conseils de chaussage et attestation pour la mutualité.",
          part: "Relire et signer.",
        },
        {
          moment: "Après le traitement",
          title: "La récupération suivie à domicile, au-delà des scores.",
          detail: "Le FFI et la douleur aux premiers pas, mais aussi le travail, la course et les promenades avec le chien. Les questionnaires suivent le traitement choisi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez une patiente qui souffre du talon à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Une douleur du talon aux premiers pas est orientée vers le podologue. Une suspicion de fracture de fatigue est d’abord orientée vers le médecin traitant. Une plaie du pied chez une personne diabétique est signalée le jour même.",
        agenda: "Son rendez-vous bénéficie d’un créneau plus long en biomécanique pour permettre l’analyse de la marche et de la course.",
        preConsultation: "Le chatbot l’interroge sur la douleur aux premiers pas, le volume de course, les chaussures, le travail et les traitements déjà essayés. Vous savez ce qui se passe avant son arrivée.",
        voiceReception: "Elle préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous examinez son pied et observez sa course. Vous choisissez ensemble des semelles et des exercices. Vesalius prend des notes.",
        medication: "Elle envoie une photo du schéma de médication de sa pharmacie. Son dossier reprend aussi le traitement thyroïdien qu’elle avait oublié de mentionner. Elle ne prend pas d’anticoagulants.",
        documentGeneration: "Le compte rendu au médecin traitant, la fiche des semelles, le programme d’exercices et l’attestation pour la mutualité sont prêts.",
        smartFollowUp: "Elle remplit le FFI, évalue sa douleur aux premiers pas et raconte comment se passent le travail, la course et les promenades avec son chien.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la podologie.",
      focus: "Domaine de prédilection (p. ex. sport et biomécanique, pied diabétique, podologie pédiatrique)",
    },
  },
};
