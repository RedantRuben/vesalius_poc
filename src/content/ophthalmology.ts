/**
 * Homepage copy for the ophthalmology variant (source: sales, "Website-inhoud oogheelkunde", 4 Nov 2026). Everything
 * follows Paul, 71, with a cataract, from triage to follow-up. The key insight for ophthalmologists: not every blurred
 * vision is a cataract. Distorted vision, or flashes with a shadow, take another route before the consultation. Dutch is
 * the source text; English (British) and French are translations for sales to review. Anything not listed here stays
 * identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const OPHTHALMOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'oogarts.',
      greeting: 'Hallo Paul! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: "Ik zie al maanden steeds waziger, vooral met mijn rechteroog. 's Avonds verblinden de lichten van tegenliggers me.",
      assistantMessage: 'Dank u. Lijken rechte lijnen, zoals deurstijlen of tegels, soms krom of golvend? En ziet u lichtflitsen of een schaduw in uw gezichtsveld?',
      noteBody:
        'Geleidelijk wazig zicht OD > OS sinds acht maanden, verblinding bij tegenlicht. Visus met correctie OD 4/10, OS 7/10. Nucleaire cataract graad 3 OD. Neemt tamsulosine: risico op floppy iris…',
    },
    journey: {
      subtitle: 'Een patiënt met cataract, van eerste melding tot helder zicht. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail: 'Geleidelijk wazig, verblinding, rechte lijnen recht, geen flitsen: Paul gaat naar de cataractraadpleging. Recent vervormd zien gaat naar medische retina.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in zijn eigen taal.',
          detail: "Welk oog, verblinding, rijden 's avonds, diabetes, medicatie via foto. De tamsulosine die hij vergat, staat gemarkeerd.",
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen bij visus, spleetlamp en biometrie.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, operatieplanning met IFIS-voorzorgen, druppelschema en uitleg voor de patiënt.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd, niet alleen in cijfers.',
          detail: "Catquest-9SF, maar ook rijden 's avonds, de krant lezen en houtbewerking. De vragenlijsten volgen de gekozen behandeling.",
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënt met cataract door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage: 'Geleidelijk wazig zicht gaat naar de cataractraadpleging. Recent vervormd zien gaat naar medische retina. Flitsen met een schaduw krijgen dezelfde dag een plaats.',
        agenda: 'Zijn afspraak komt in een langer blok, met tijd voor dilatatie en biometrie.',
        preConsultation:
          "Een chatbot stelt hem de vragen die bij cataract tellen: welk oog, verblinding, rijden 's avonds, lezen, diabetes. U weet wat er scheelt nog voor hij binnenkomt.",
        voiceReception: 'Belt hij liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U meet zijn visus, onderzoekt de lens en bespreekt de biometrie. Samen kiest u voor een operatie rechts. Vesalius noteert mee.',
        medication:
          'Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. De medicatie staat gestructureerd in het dossier, ook de tamsulosine die hij zelf vergat. Die telt voor de operatie: risico op een slappe iris.',
        documentGeneration: 'De brief aan de huisarts, de operatieplanning en het druppelschema voor na de ingreep staan klaar.',
        smartFollowUp: "Hij vult de Catquest-9SF in, en vertelt of hij 's avonds weer rijdt en de krant kan lezen.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor oogheelkunde.',
      focus: 'Focus binnen uw vakgebied (bv. cataract en refractie, medische retina, glaucoom, cornea)',
    },
  },
  en: {
    hero: {
      line1: 'Be an ophthalmologist',
      line2: 'again.',
      greeting: "Hello Paul! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'For months my sight has been getting blurrier, especially in my right eye. In the evening the headlights of oncoming cars dazzle me.',
      assistantMessage: 'Thank you. Do straight lines, such as door frames or tiles, ever look bent or wavy? And do you see flashes of light or a shadow in your field of vision?',
      noteBody:
        'Gradually blurred vision OD > OS for eight months, glare against the light. Corrected visual acuity OD 4/10, OS 7/10. Nuclear cataract grade 3 OD. Takes tamsulosin: risk of floppy iris…',
    },
    journey: {
      subtitle: 'A patient with a cataract, from first report to clear sight. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'Gradually blurred, glare, straight lines straight, no flashes: Paul goes to the cataract clinic. Recently distorted vision goes to medical retina.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in his own language.',
          detail: 'Which eye, glare, driving at night, diabetes, medication by photo. The tamsulosin he forgot is flagged.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight away with visual acuity, slit lamp and biometry.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, surgery planning with IFIS precautions, drop schedule and an explanation for the patient.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery at home followed up, not just in numbers.',
          detail: 'Catquest-9SF, but also driving at night, reading the newspaper and woodworking. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with a cataract through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage: 'Gradually blurred vision goes to the cataract clinic. Recently distorted vision goes to medical retina. Flashes with a shadow get a slot the same day.',
        agenda: 'His appointment gets a longer slot, with time for dilation and biometry.',
        preConsultation:
          'A chatbot asks him the questions that matter for a cataract: which eye, glare, driving at night, reading, diabetes. You know what is wrong before he walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You measure his visual acuity, examine the lens and discuss the biometry. Together you decide to operate on the right eye. Vesalius takes notes.',
        medication:
          'He sends a photo of his pharmacy’s medication schedule in the chat. His medication is structured in the record, including the tamsulosin he forgot himself. That matters for the operation: risk of a floppy iris.',
        documentGeneration: 'The letter to the GP, the surgery planning and the post-operative drop schedule are ready.',
        smartFollowUp: 'He completes the Catquest-9SF, and tells you whether he is driving at night again and can read the newspaper.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for ophthalmology.',
      focus: 'Focus within your speciality (e.g. cataract and refractive, medical retina, glaucoma, cornea)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'ophtalmologue.',
      greeting: 'Bonjour Paul. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Depuis des mois, ma vue devient de plus en plus floue, surtout de l’œil droit. Le soir, les phares des voitures en face m’éblouissent.',
      assistantMessage: 'Merci. Les lignes droites, comme les montants de porte ou le carrelage, vous paraissent-elles parfois courbes ou ondulées ? Et voyez-vous des éclairs lumineux ou une ombre dans votre champ de vision ?',
      noteBody:
        'Baisse progressive de l’acuité visuelle OD > OG depuis huit mois, éblouissement à contre-jour. Acuité visuelle corrigée OD 4/10, OG 7/10. Cataracte nucléaire grade 3 OD. Prend de la tamsulosine : risque d’iris flasque…',
    },
    journey: {
      subtitle: 'Un patient atteint de cataracte, du premier signalement à une vue claire. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Vue progressivement floue, éblouissement, lignes droites bien droites, pas d’éclairs : Paul va à la consultation cataracte. Une vision déformée récente va en rétine médicale.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez lui et dans sa langue.',
          detail: 'Quel œil, éblouissement, conduite le soir, diabète, médicaments par photo. La tamsulosine qu’il avait oubliée est signalée.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par l’acuité visuelle, la lampe à fente et la biométrie.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, planification de l’opération avec précautions IFIS, schéma de gouttes et explication pour le patient.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'La convalescence suivie à domicile, pas seulement en chiffres.',
          detail: 'Catquest-9SF, mais aussi la conduite le soir, la lecture du journal et la menuiserie. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez un patient atteint de cataracte à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Une vue progressivement floue va à la consultation cataracte. Une vision déformée récente va en rétine médicale. Des éclairs avec une ombre obtiennent une place le jour même.',
        agenda: 'Son rendez-vous obtient un créneau plus long, avec le temps pour la dilatation et la biométrie.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour la cataracte : quel œil, éblouissement, conduite le soir, lecture, diabète. Vous savez ce qui ne va pas avant même qu’il n’entre.',
        voiceReception: 'Il préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous mesurez son acuité visuelle, examinez le cristallin et discutez de la biométrie. Ensemble, vous optez pour une opération de l’œil droit. Vesalius prend des notes.',
        medication:
          'Il envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris la tamsulosine qu’il avait lui-même oubliée. Elle compte pour l’opération : risque d’iris flasque.',
        documentGeneration: 'La lettre au médecin traitant, la planification de l’opération et le schéma de gouttes postopératoire sont prêts.',
        smartFollowUp: 'Il remplit le Catquest-9SF, et raconte s’il conduit de nouveau le soir et s’il arrive à lire le journal.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l’ophtalmologie.',
      focus: 'Domaine de prédilection (p. ex. cataracte et réfractive, rétine médicale, glaucome, cornée)',
    },
  },
};
