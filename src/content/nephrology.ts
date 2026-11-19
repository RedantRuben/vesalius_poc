/**
 * Homepage copy for the nephrology variant (source: sales, "Website-inhoud nefrologie", 4 Nov 2026). Everything follows
 * Luc, 64, with a declining kidney function in diabetes and high blood pressure, from triage to follow-up. The key
 * insight for nephrologists: not every referral for "kidney function" needs a consultation; a stable, age-related decline
 * without protein in the urine is often better served by advice to the GP. Dutch is the source text; English (British)
 * and French are translations for sales to review. Anything not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const NEPHROLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'nefroloog.',
      greeting: 'Hallo Luc! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: 'Mijn huisarts zegt dat mijn nieren achteruitgaan en dat er eiwit in mijn urine zit.',
      assistantMessage: 'Dank u. Heeft u uw laatste bloeduitslagen bij de hand? Een foto volstaat. En neemt u soms pijnstillers zoals ibuprofen of diclofenac, ook zonder voorschrift?',
      noteBody:
        'eGFR 58 → 49 → 38 ml/min/1,73 m² in twee jaar, UACR 420 mg/g. Type 2-diabetes, hypertensie. Ibuprofen bijna dagelijks voor de knie. Sediment rustig. Echo: symmetrische nieren, geen hydronefrose. CKD G3b A3…',
    },
    journey: {
      subtitle: 'Een patiënt met een dalende nierfunctie, van verwijzing tot opvolging. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail: 'eGFR daalt over twee jaar en er zit eiwit in de urine: Luc gaat naar de nefroloog. Een stabiele eGFR op 83 jaar zonder eiwit krijgt een advies aan de huisarts.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in zijn eigen taal.',
          detail: 'Labo als foto in de chat, thuisbloeddruk, diabetes en oogarts, medicatie via foto: daar duikt de ibuprofen voor zijn knie op. Geen rode vlaggen.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'Het eGFR-verloop en de medicatie liggen al klaar. U begint meteen bij oedeem, bloeddruk, sediment en echo.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, voorschriften, labo-aanvraag over twee weken, verwijzing diëtist en het zorgtraject.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Opgevolgd thuis, niet alleen in labowaarden.',
          detail: 'KDQOL-36, thuisbloeddruk en gewicht, maar ook vermoeidheid, werk en zijn duiven. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënt met een dalende nierfunctie door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Een dalende eGFR met eiwit in de urine gaat naar de nefroloog. Een stabiele, leeftijdsgebonden daling krijgt een advies aan de huisarts. Wie sneller gezien moet worden, wordt gemarkeerd.',
        agenda: 'Zijn afspraak komt in de agenda van de nefroloog, met labo en urinestaal een week vooraf en een echo op dezelfde dag.',
        preConsultation: 'Een chatbot vraagt naar het verloop van zijn nierfunctie, thuisbloeddruk, diabetes, plassen en pijnstillers. U weet wat er speelt nog voor hij binnenkomt.',
        voiceReception: 'Belt hij liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U onderzoekt zijn enkels en bespreekt labo en echo. Samen kiest u voor nierbescherming met een SGLT2-remmer. Vesalius noteert mee.',
        medication:
          'Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook de ibuprofen die hij zelf niet vermeldde. Metformine boven de dosis voor zijn eGFR wordt gemarkeerd.',
        documentGeneration: 'De brief aan de huisarts, de voorschriften, de labo-aanvraag, de verwijzing naar de diëtist en het zorgtraject staan klaar.',
        smartFollowUp: 'Hij vult de KDQOL-36 in, geeft zijn thuisbloeddruk en gewicht door, en vertelt hoe het gaat met werken en zijn duiven.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor nefrologie.',
      focus: 'Focus binnen uw vakgebied (bv. chronische nierziekte, dialyse, transplantatie)',
    },
  },
  en: {
    hero: {
      line1: 'Be a nephrologist',
      line2: 'again.',
      greeting: "Hello Luc! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'My GP says my kidneys are getting worse and that there is protein in my urine.',
      assistantMessage: 'Thank you. Do you have your latest blood results to hand? A photo is fine. And do you sometimes take painkillers such as ibuprofen or diclofenac, including without a prescription?',
      noteBody:
        'eGFR 58 → 49 → 38 ml/min/1.73 m² over two years, UACR 420 mg/g. Type 2 diabetes, hypertension. Ibuprofen almost daily for the knee. Bland sediment. Ultrasound: symmetrical kidneys, no hydronephrosis. CKD G3b A3…',
    },
    journey: {
      subtitle: 'A patient with declining kidney function, from referral to follow-up. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'eGFR falling over two years with protein in the urine: Luc goes to the nephrologist. A stable eGFR at 83 without protein gets advice for the GP.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in his own language.',
          detail: 'Lab results as a photo in the chat, home blood pressure, diabetes and eye checks, medication by photo: that is where the ibuprofen for his knee turns up. No red flags.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The eGFR trend and the medication are already prepared. You start straight away with oedema, blood pressure, sediment and ultrasound.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, prescriptions, a lab request for two weeks’ time, a dietitian referral and the care pathway.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Followed up at home, not just in lab values.',
          detail: 'KDQOL-36, home blood pressure and weight, but also tiredness, work and his pigeons. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with declining kidney function through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'A falling eGFR with protein in the urine goes to the nephrologist. A stable, age-related decline gets advice for the GP. Anyone who needs to be seen sooner is flagged.',
        agenda: 'His appointment lands in the nephrologist’s agenda, with bloods and a urine sample a week before and an ultrasound on the same day.',
        preConsultation: 'A chatbot asks about the course of his kidney function, home blood pressure, diabetes, passing urine and painkillers. You know what is going on before he walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You examine his ankles and discuss the bloods and ultrasound. Together you choose kidney protection with an SGLT2 inhibitor. Vesalius takes notes.',
        medication:
          'He sends a photo of his pharmacy’s medication schedule in the chat. His medication is structured in the record, including the ibuprofen he did not mention himself. Metformin above the dose for his eGFR is flagged.',
        documentGeneration: 'The letter to the GP, the prescriptions, the lab request, the dietitian referral and the care pathway are ready.',
        smartFollowUp: 'He completes the KDQOL-36, sends in his home blood pressure and weight, and tells you how work and his pigeons are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for nephrology.',
      focus: 'Focus within your speciality (e.g. chronic kidney disease, dialysis, transplantation)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'néphrologue.',
      greeting: 'Bonjour Luc. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Mon médecin traitant dit que mes reins se dégradent et qu’il y a des protéines dans mes urines.',
      assistantMessage: 'Merci. Avez-vous vos derniers résultats de prise de sang sous la main ? Une photo suffit. Et prenez-vous parfois des antidouleurs comme l’ibuprofène ou le diclofénac, même sans ordonnance ?',
      noteBody:
        'DFGe 58 → 49 → 38 ml/min/1,73 m² en deux ans, RAC 420 mg/g. Diabète de type 2, hypertension. Ibuprofène presque quotidien pour le genou. Sédiment calme. Échographie : reins symétriques, pas d’hydronéphrose. MRC G3b A3…',
    },
    journey: {
      subtitle: 'Un patient dont la fonction rénale baisse, de l’orientation au suivi. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Le DFGe baisse depuis deux ans et il y a des protéines dans les urines : Luc va chez le néphrologue. Un DFGe stable à 83 ans sans protéinurie reçoit un avis au médecin traitant.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez lui et dans sa langue.',
          detail: 'Biologie en photo dans le chat, tension à domicile, diabète et ophtalmologue, médicaments par photo : c’est là qu’apparaît l’ibuprofène pour son genou. Aucun signal d’alerte.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’évolution du DFGe et les médicaments sont déjà prêts. Vous commencez directement par les œdèmes, la tension, le sédiment et l’échographie.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, prescriptions, demande de biologie dans deux semaines, orientation vers la diététicienne et trajet de soins.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Suivi à domicile, pas seulement en valeurs de laboratoire.',
          detail: 'KDQOL-36, tension et poids à domicile, mais aussi la fatigue, le travail et ses pigeons. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez un patient dont la fonction rénale baisse à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Un DFGe en baisse avec des protéines dans les urines va chez le néphrologue. Une baisse stable, liée à l’âge, reçoit un avis au médecin traitant. Ceux qui doivent être vus plus vite sont signalés.',
        agenda: 'Son rendez-vous arrive dans l’agenda du néphrologue, avec prise de sang et échantillon d’urine une semaine avant et une échographie le jour même.',
        preConsultation: 'Un chatbot l’interroge sur l’évolution de sa fonction rénale, sa tension à domicile, son diabète, ses mictions et ses antidouleurs. Vous savez ce qui se passe avant même qu’il n’entre.',
        voiceReception: 'Il préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous examinez ses chevilles et discutez de la biologie et de l’échographie. Ensemble, vous optez pour une néphroprotection par inhibiteur de SGLT2. Vesalius prend des notes.',
        medication:
          'Il envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris l’ibuprofène qu’il n’avait pas mentionné. La metformine au-dessus de la dose adaptée à son DFGe est signalée.',
        documentGeneration: 'La lettre au médecin traitant, les prescriptions, la demande de biologie, l’orientation vers la diététicienne et le trajet de soins sont prêts.',
        smartFollowUp: 'Il remplit le KDQOL-36, transmet sa tension et son poids à domicile, et raconte comment se passent le travail et ses pigeons.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la néphrologie.',
      focus: 'Domaine de prédilection (p. ex. maladie rénale chronique, dialyse, transplantation)',
    },
  },
};
