/**
 * Homepage copy for the physical and rehabilitation medicine variant (source: sales, "Website-inhoud fysische
 * geneeskunde", 12 Oct 2026). Everything follows Sofie, 41, with fibromyalgia; the weight lies on the intake before the
 * consultation and on the long first consultation itself. Dutch is the source text; English (British) and French are
 * translations for sales to review. Anything not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const PHYSIO_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'fysiater.',
      greeting: 'Hallo Sofie! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak?',
      patientMessage: 'Al twee jaar pijn overal: nek, schouders, rug en benen. En ik ben altijd moe, ook na een volle nacht.',
      assistantMessage: 'Dank u. Hoe lang bent u ’s ochtends stijf? En worden uw gewrichten soms dik of warm?',
      noteBody:
        'Wijdverspreide pijn sinds twee jaar, niet-herstellende slaap, concentratieklachten. Ochtendstijfheid 15 minuten, geen synovitis. WPI 13/19, SSS 9/12. Labo en reumatologisch advies normaal…',
    },
    journey: {
      subtitle:
        'Een patiënte met fibromyalgie en twee jaar voorgeschiedenis. Vesalius verzamelt haar verhaal vooraf en schrijft mee tijdens het lange eerste consult. U blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail:
            'Pijn overal, korte ochtendstijfheid, geen gezwollen gewrichten, bloedname normaal: Sofie komt bij u. Lange ochtendstijfheid en nachtelijke rugpijn gaan naar reumatologie.',
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Twee jaar voorgeschiedenis, al op een rij.',
          detail:
            'Pijnkaart, slaap, vermoeidheid en concentratie, elk onderzoek en elke behandeling van de voorbije twee jaar, medicatie via een foto in de chat. In haar eigen tempo, over drie avonden. Wat u nodig heeft voor de ACR-criteria ligt klaar.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail:
            'De anamnese ligt al klaar, dus het consult gaat naar wat telt: het onderzoek, de uitleg over fibromyalgie en de afspraken over programma, medicatie en werk. Het hele gesprek staat in uw nota.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, verwijzing naar het revalidatieprogramma, voorschrift kine, afbouwschema en het verslag voor de adviserend arts.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Opgevolgd, niet alleen in cijfers.',
          detail: 'FIQR en slaapscore, maar ook werk, zwemmen en hoe haar dagen verlopen. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënte met chronische pijn door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Wijdverspreide pijn zonder ontstekingstekens komt bij u. Gezwollen gewrichten of lange ochtendstijfheid gaan naar reumatologie. Wie sneller gezien moet worden, wordt gemarkeerd.',
        agenda: 'Haar eerste consult krijgt een lang blok in de agenda van de arts met focus chronische pijn.',
        preConsultation:
          'Over drie avonden vertelt ze haar verhaal: pijnkaart, slaap, vermoeidheid, concentratie, en elk onderzoek en elke behandeling van de voorbije twee jaar. U begint het consult met de chronologie en de ACR-scores op een rij.',
        voiceReception: 'Belt ze liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe:
          'Een lang gesprek, met veel uitleg. U onderzoekt haar, legt uit wat fibromyalgie is en maakt afspraken over het programma, de afbouw van haar medicatie en haar werk. Vesalius zet het hele gesprek om in een nota.',
        medication:
          'Ze stuurt in de chat een foto van haar apotheekschema. De medicatie staat gestructureerd in het dossier, ook het slaapmiddel dat ze zelf vergat te vermelden. U ziet meteen wat er af te bouwen valt.',
        documentGeneration: 'De brief aan de huisarts, de verwijzing naar het programma, het voorschrift kine en het afbouwschema staan klaar.',
        smartFollowUp: 'Ze vult de FIQR en haar slaapscore in, en vertelt hoe het gaat met werken, zwemmen en haar gezin.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor fysische geneeskunde.',
      focus: 'Focus binnen uw vakgebied (bv. chronische pijn, rugrevalidatie, sportrevalidatie)',
    },
  },
  en: {
    hero: {
      line1: 'Be a rehabilitation physician',
      line2: 'again.',
      greeting: "Hello Sofie! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment?",
      patientMessage: 'For two years I’ve had pain everywhere: neck, shoulders, back and legs. And I’m always tired, even after a full night.',
      assistantMessage: 'Thank you. How long are you stiff in the morning? And do your joints ever become swollen or warm?',
      noteBody:
        'Widespread pain for two years, unrefreshing sleep, difficulty concentrating. Morning stiffness 15 minutes, no synovitis. WPI 13/19, SSS 9/12. Bloods and rheumatology opinion normal…',
    },
    journey: {
      subtitle:
        'A patient with fibromyalgia and two years of history. Vesalius gathers her story beforehand and takes notes during the long first consultation. You stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail:
            'Pain everywhere, short morning stiffness, no swollen joints, normal bloods: Sofie comes to you. Long morning stiffness and back pain at night go to rheumatology.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'Two years of history, already in order.',
          detail:
            'Pain map, sleep, fatigue and concentration, every test and every treatment of the past two years, medication by photo in the chat. At her own pace, over three evenings. What you need for the ACR criteria is ready.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail:
            'The history is already prepared, so the consultation goes to what matters: the examination, explaining fibromyalgia and agreeing on the programme, medication and work. The whole conversation is in your note.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, referral to the rehabilitation programme, a physiotherapy prescription, a tapering schedule and the report for the medical adviser.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Followed up, not just in numbers.',
          detail: 'FIQR and sleep score, but also work, swimming and how her days are going. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with chronic pain through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'Widespread pain without signs of inflammation comes to you. Swollen joints or long morning stiffness go to rheumatology. Anyone who needs to be seen sooner is flagged.',
        agenda: 'Her first consultation gets a long slot in the agenda of the doctor who focuses on chronic pain.',
        preConsultation:
          'Over three evenings she tells her story: pain map, sleep, fatigue, concentration, and every test and treatment of the past two years. You start the consultation with the chronology and the ACR scores laid out.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe:
          'A long conversation, with a lot of explaining. You examine her, explain what fibromyalgia is and agree on the programme, tapering her medication and her work. Vesalius turns the whole conversation into a note.',
        medication:
          'She sends a photo of her pharmacy schedule in the chat. Her medication is structured in the record, including the sleeping tablet she forgot to mention. You see at once what can be tapered.',
        documentGeneration: 'The letter to the GP, the programme referral, the physiotherapy prescription and the tapering schedule are ready.',
        smartFollowUp: 'She completes the FIQR and her sleep score, and tells you how work, swimming and her family are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle:
        'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for physical and rehabilitation medicine.',
      focus: 'Focus within your speciality (e.g. chronic pain, spinal rehabilitation, sports rehabilitation)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'médecin physique.',
      greeting: 'Bonjour Sofie. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous ?',
      patientMessage: 'Depuis deux ans, j’ai mal partout : nuque, épaules, dos et jambes. Et je suis toujours fatiguée, même après une nuit complète.',
      assistantMessage: 'Merci. Combien de temps êtes-vous raide le matin ? Et vos articulations deviennent-elles parfois gonflées ou chaudes ?',
      noteBody:
        'Douleurs diffuses depuis deux ans, sommeil non réparateur, troubles de la concentration. Raideur matinale 15 minutes, pas de synovite. WPI 13/19, SSS 9/12. Biologie et avis rhumatologique normaux…',
    },
    journey: {
      subtitle:
        'Une patiente atteinte de fibromyalgie, avec deux ans d’antécédents. Vesalius recueille son histoire à l’avance et prend des notes pendant la longue première consultation. Vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail:
            'Douleurs partout, raideur matinale courte, pas d’articulations gonflées, prise de sang normale : Sofie vient chez vous. Une raideur matinale prolongée et des lombalgies nocturnes vont en rhumatologie.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Deux ans d’antécédents, déjà en ordre.',
          detail:
            'Carte de la douleur, sommeil, fatigue et concentration, chaque examen et chaque traitement des deux dernières années, médicaments par photo dans le chat. À son rythme, sur trois soirées. Ce qu’il vous faut pour les critères ACR est prêt.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail:
            'L’anamnèse est déjà prête, la consultation va donc à l’essentiel : l’examen, l’explication de la fibromyalgie et les accords sur le programme, les médicaments et le travail. Toute la conversation figure dans votre note.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail:
            'Lettre au médecin traitant, orientation vers le programme de revalidation, prescription de kinésithérapie, schéma de sevrage et rapport pour le médecin-conseil.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Suivie, pas seulement en chiffres.',
          detail: 'FIQR et score de sommeil, mais aussi le travail, la natation et le déroulement de ses journées. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle:
        'Suivez une patiente souffrant de douleurs chroniques à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Des douleurs diffuses sans signes inflammatoires viennent chez vous. Des articulations gonflées ou une raideur matinale prolongée vont en rhumatologie. Ceux qui doivent être vus plus vite sont signalés.',
        agenda: 'Sa première consultation obtient un long créneau dans l’agenda du médecin spécialisé en douleur chronique.',
        preConsultation:
          'Sur trois soirées, elle raconte son histoire : carte de la douleur, sommeil, fatigue, concentration, et chaque examen et traitement des deux dernières années. Vous commencez la consultation avec la chronologie et les scores ACR en un coup d’œil.',
        voiceReception: 'Elle préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe:
          'Une longue conversation, avec beaucoup d’explications. Vous l’examinez, expliquez ce qu’est la fibromyalgie et convenez du programme, du sevrage de ses médicaments et de son travail. Vesalius transforme toute la conversation en note.',
        medication:
          'Elle envoie dans le chat une photo de son schéma de pharmacie. Ses médicaments sont structurés dans le dossier, y compris le somnifère qu’elle avait oublié de mentionner. Vous voyez immédiatement ce qui peut être réduit.',
        documentGeneration: 'La lettre au médecin traitant, l’orientation vers le programme, la prescription de kinésithérapie et le schéma de sevrage sont prêts.',
        smartFollowUp: 'Elle remplit le FIQR et son score de sommeil, et raconte comment se passent le travail, la natation et la vie de famille.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle:
        'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la médecine physique et réadaptation.',
      focus: 'Domaine de prédilection (p. ex. douleur chronique, revalidation du dos, revalidation sportive)',
    },
  },
};
