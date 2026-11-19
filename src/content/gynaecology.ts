/**
 * Homepage copy for the gynaecology variant (source: sales, "Website-inhoud gynaecologie", 4 Nov 2026). Everything
 * follows Lea, 62, with a bladder prolapse (cystocele), from triage to follow-up. The key insight for gynaecologists: a
 * bulge from the anus, or urine leakage after childbirth without a prolapse, belongs elsewhere and is sent on before the
 * consultation. Dutch is the source text; English (British) and French are translations for sales to review. Anything
 * not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const GYNAECOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'gynaecoloog.',
      greeting: 'Hallo Lea! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: "Al acht maanden een gevoel alsof er een bal naar beneden zakt, vooral 's avonds. En ik moet heel vaak plassen.",
      assistantMessage: 'Dank u. Voelt u die bal vanuit de vagina of vanuit de anus? En moet u hem soms terugduwen om goed te kunnen plassen?',
      noteBody:
        'Balgevoel vaginaal sinds acht maanden, frequente mictie en onvolledige lediging, duwt soms terug om uit te plassen. POP-Q: Ba +3, C −5. Residu 160 ml. Cystocele stadium III…',
    },
    journey: {
      subtitle: 'Een patiënte met een verzakking, van eerste melding tot herstel. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail:
            'Een bal vanuit de vagina en moeite met uitplassen: Lea gaat naar de urogynaecoloog. Een bal vanuit de anus gaat naar de colorectale chirurg. Bloedverlies na de menopauze krijgt voorrang.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in haar eigen taal.',
          detail: 'Verzakking, plassen en stoelgang apart bevraagd, een mictiedagboek van drie dagen, de bevallingen, medicatie via foto. Geen rode vlaggen.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen bij het onderzoek: POP-Q, hoesttest en residu.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, voorschrift bekkenbodemkine en lokale oestrogenen, uitleg over de verzorging van het pessarium.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd, niet alleen in cijfers.',
          detail: 'PFDI-20 en PGI-I, maar ook slaap, wandelen, tuinieren en de kleinkinderen optillen. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënte met een verzakking door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Een verzakking met plasklachten gaat naar de urogynaecoloog. Urineverlies na een bevalling, zonder verzakking, gaat eerst naar bekkenbodemkine. Bloedverlies na de menopauze krijgt voorrang.',
        agenda: 'Haar afspraak komt op het juiste moment in de agenda van de urogynaecoloog, met een lang blok voor het onderzoek.',
        preConsultation:
          'Een chatbot stelt haar de vragen die bij een verzakking tellen: balgevoel, plassen, stoelgang, seksualiteit en de bevallingen, met een mictiedagboek van drie dagen. U weet wat er scheelt nog voor ze binnenkomt.',
        voiceReception: 'Belt ze liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U onderzoekt haar en meet de POP-Q en het residu. Samen kiest u voor een pessarium. Vesalius noteert mee.',
        medication:
          'Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de blaaspil die ze zelf vergat te vermelden. Geen bloedverdunners, mocht een ingreep nodig zijn.',
        documentGeneration: 'De brief aan de huisarts, de voorschriften voor bekkenbodemkine en lokale oestrogenen en de uitleg over het pessarium staan klaar.',
        smartFollowUp: 'Ze vult de PFDI-20 in, en vertelt hoe het gaat met slapen, wandelen, tuinieren en de kleinkinderen.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor gynaecologie.',
      focus: 'Focus binnen uw vakgebied (bv. urogynaecologie, oncologie, fertiliteit)',
    },
  },
  en: {
    hero: {
      line1: 'Be a gynaecologist',
      line2: 'again.',
      greeting: "Hello Lea! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'For eight months it has felt as if a ball is dropping down, especially in the evening. And I need to pass urine very often.',
      assistantMessage: 'Thank you. Do you feel that bulge from the vagina or from the anus? And do you sometimes have to push it back to empty your bladder properly?',
      noteBody:
        'Vaginal bulge for eight months, urinary frequency and incomplete emptying, sometimes reduces it to void. POP-Q: Ba +3, C −5. Post-void residual 160 ml. Cystocele stage III…',
    },
    journey: {
      subtitle: 'A patient with a prolapse, from first report to recovery. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'A bulge from the vagina and difficulty emptying the bladder: Lea goes to the urogynaecologist. A bulge from the anus goes to the colorectal surgeon. Postmenopausal bleeding gets priority.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in her own language.',
          detail: 'Prolapse, bladder and bowel asked about separately, a three-day bladder diary, the births, medication by photo. No red flags.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight away with the examination: POP-Q, cough test and residual.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, prescriptions for pelvic floor physiotherapy and local oestrogen, an explanation of how to care for the pessary.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery at home followed up, not just in numbers.',
          detail: 'PFDI-20 and PGI-I, but also sleep, walking, gardening and lifting the grandchildren. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with a prolapse through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'A prolapse with bladder symptoms goes to the urogynaecologist. Urine leakage after childbirth, without a prolapse, goes to pelvic floor physiotherapy first. Postmenopausal bleeding gets priority.',
        agenda: 'Her appointment lands at the right moment in the urogynaecologist’s agenda, with a long slot for the examination.',
        preConsultation:
          'A chatbot asks her the questions that matter for a prolapse: the bulge, bladder, bowel, sexual function and the births, with a three-day bladder diary. You know what is wrong before she walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You examine her and measure the POP-Q and the residual. Together you choose a pessary. Vesalius takes notes.',
        medication:
          'She sends a photo of her pharmacy’s medication schedule in the chat. Her medication is structured in the record, including the bladder tablet she forgot to mention. No anticoagulants, should a procedure be needed.',
        documentGeneration: 'The letter to the GP, the prescriptions for pelvic floor physiotherapy and local oestrogen and the explanation of the pessary are ready.',
        smartFollowUp: 'She completes the PFDI-20, and tells you how sleeping, walking, gardening and the grandchildren are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for gynaecology.',
      focus: 'Focus within your speciality (e.g. urogynaecology, oncology, fertility)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'gynécologue.',
      greeting: 'Bonjour Lea. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Depuis huit mois, j’ai l’impression qu’une boule descend, surtout le soir. Et je dois uriner très souvent.',
      assistantMessage: 'Merci. Sentez-vous cette boule au niveau du vagin ou de l’anus ? Et devez-vous parfois la repousser pour bien vider votre vessie ?',
      noteBody:
        'Sensation de boule vaginale depuis huit mois, pollakiurie et vidange incomplète, réduit parfois le prolapsus pour uriner. POP-Q : Ba +3, C −5. Résidu 160 ml. Cystocèle stade III…',
    },
    journey: {
      subtitle: 'Une patiente atteinte d’un prolapsus, du premier signalement à la guérison. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Une boule au niveau du vagin et des difficultés à vider la vessie : Lea va chez l’urogynécologue. Une boule au niveau de l’anus va chez le chirurgien colorectal. Un saignement après la ménopause est prioritaire.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez elle et dans sa langue.',
          detail: 'Prolapsus, vessie et transit interrogés séparément, un calendrier mictionnel de trois jours, les accouchements, médicaments par photo. Aucun signal d’alerte.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par l’examen : POP-Q, test à la toux et résidu.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, prescriptions de rééducation périnéale et d’œstrogènes locaux, explication sur l’entretien du pessaire.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'La convalescence suivie à domicile, pas seulement en chiffres.',
          detail: 'PFDI-20 et PGI-I, mais aussi le sommeil, la marche, le jardinage et porter les petits-enfants. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez une patiente atteinte d’un prolapsus à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Un prolapsus avec des troubles urinaires va chez l’urogynécologue. Des fuites urinaires après un accouchement, sans prolapsus, vont d’abord en rééducation périnéale. Un saignement après la ménopause est prioritaire.',
        agenda: 'Son rendez-vous arrive au bon moment dans l’agenda de l’urogynécologue, avec un long créneau pour l’examen.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour un prolapsus : sensation de boule, miction, transit, sexualité et accouchements, avec un calendrier mictionnel de trois jours. Vous savez ce qui ne va pas avant même qu’elle n’entre.',
        voiceReception: 'Elle préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous l’examinez et mesurez le POP-Q et le résidu. Ensemble, vous optez pour un pessaire. Vesalius prend des notes.',
        medication:
          'Elle envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris le médicament pour la vessie qu’elle avait oublié de mentionner. Pas d’anticoagulants, au cas où une intervention serait nécessaire.',
        documentGeneration: 'La lettre au médecin traitant, les prescriptions de rééducation périnéale et d’œstrogènes locaux et l’explication du pessaire sont prêtes.',
        smartFollowUp: 'Elle remplit le PFDI-20, et raconte comment se passent le sommeil, la marche, le jardinage et les petits-enfants.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la gynécologie.',
      focus: 'Domaine de prédilection (p. ex. urogynécologie, oncologie, fertilité)',
    },
  },
};
