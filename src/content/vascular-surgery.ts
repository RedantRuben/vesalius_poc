/**
 * Homepage copy for the vascular surgery variant (source: sales, "Website-inhoud vaatchirurgie", 13 Oct 2026). Everything
 * follows Greet, 52, with varicose veins, from triage to follow-up. The key insight for vascular surgeons: a purely
 * cosmetic question or what is really an arterial problem is sent on before the consultation. Dutch is the source text;
 * English (British) and French are translations for sales to review. Anything not listed here stays identical to the
 * standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const VASCULAR_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'vaatchirurg.',
      greeting: 'Hallo Greet! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: 'Mijn linkerbeen is elke avond zwaar en mijn enkel zwelt op. En de spataders aan mijn kuit worden erger.',
      assistantMessage: 'Dank u. Voelen uw benen beter als u ze omhoog legt? En krijgt u pijn in de kuit tijdens het wandelen, die verdwijnt als u even stilstaat?',
      noteBody:
        "Zware benen en enkeloedeem links 's avonds, erger na tweede zwangerschap. Varices mediaal knie en kuit links. Duplex: reflux VSM links van junctie tot midkuit, diep veneus competent. CEAP C3…",
    },
    journey: {
      subtitle: 'Een patiënte met spataders, van eerste melding tot herstel. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail: "Zware benen en zwelling 's avonds, beter met de benen omhoog: Greet gaat naar de veneuze vaatchirurg. Kuitpijn bij het stappen gaat naar de collega arterieel.",
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in haar eigen taal.',
          detail: 'Klachten en uitzicht apart bevraagd, steunkousen en hoe ze die verdraagt, zwangerschappen, medicatie via foto. Geen rode vlaggen.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen met de duplex.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, opnameaanvraag voor de ablatie, voorschriften, uitleg over de ingreep en het attest voor school.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd, niet alleen in cijfers.',
          detail: 'AVVQ en het zware gevoel, maar ook slaap, een volle schooldag en wandelen met de hond. De vragenlijsten volgen de gekozen behandeling.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënte met spataders door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage: 'Spataders met klachten gaan naar de veneuze vaatchirurg. Kuitpijn bij het stappen gaat naar de collega arterieel. Een plots dik, pijnlijk been wordt meteen gemarkeerd.',
        agenda: 'Haar afspraak komt in een lang blok bij de veneuze vaatchirurg, met tijd voor de duplex.',
        preConsultation:
          'Een chatbot stelt haar de vragen die bij spataders tellen: klachten of uitzicht, zwelling, steunkousen, zwangerschappen, ooit een trombose. U weet wat er scheelt nog voor ze binnenkomt.',
        voiceReception: 'Belt ze liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U doet de duplex en bespreekt de reflux in de grote ader. Samen kiest u voor een endoveneuze ablatie. Vesalius noteert mee.',
        medication:
          'Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de hormoontherapie die ze zelf vergat te vermelden. Die telt mee voor de tromboseprofylaxe na de ingreep.',
        documentGeneration: 'De brief aan de huisarts, de opnameaanvraag, de voorschriften en de uitleg over de ingreep staan klaar.',
        smartFollowUp: 'Ze vult de AVVQ in, en vertelt hoe het gaat met een volle schooldag, haar slaap en wandelen met de hond.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor vaatchirurgie.',
      focus: 'Focus binnen uw vakgebied (bv. veneus, perifeer arterieel, aorta, vaattoegang)',
    },
  },
  en: {
    hero: {
      line1: 'Be a vascular surgeon',
      line2: 'again.',
      greeting: "Hello Greet! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'My left leg feels heavy every evening and my ankle swells up. And the varicose veins on my calf are getting worse.',
      assistantMessage: 'Thank you. Do your legs feel better when you put them up? And do you get pain in your calf while walking that goes away when you stand still for a moment?',
      noteBody:
        'Heavy legs and left ankle oedema in the evening, worse after second pregnancy. Varicose veins medial knee and calf on the left. Duplex: left GSV reflux from junction to mid-calf, deep venous system competent. CEAP C3…',
    },
    journey: {
      subtitle: 'A patient with varicose veins, from first report to recovery. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'Heavy legs and swelling in the evening, better with the legs up: Greet goes to the venous surgeon. Calf pain on walking goes to the arterial colleague.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in her own language.',
          detail: 'Symptoms and appearance asked about separately, compression stockings and how she tolerates them, pregnancies, medication by photo. No red flags.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight away with the duplex.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, admission request for the ablation, prescriptions, an explanation of the procedure and the certificate for school.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery at home followed up, not just in numbers.',
          detail: 'AVVQ and the heavy feeling, but also sleep, a full school day and walking the dog. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with varicose veins through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage: 'Symptomatic varicose veins go to the venous surgeon. Calf pain on walking goes to the arterial colleague. A suddenly swollen, painful leg is flagged straight away.',
        agenda: 'Her appointment gets a long slot with the venous surgeon, with time for the duplex.',
        preConsultation:
          'A chatbot asks her the questions that matter for varicose veins: symptoms or appearance, swelling, compression stockings, pregnancies, ever a thrombosis. You know what is wrong before she walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You do the duplex and discuss the reflux in the great saphenous vein. Together you choose endovenous ablation. Vesalius takes notes.',
        medication:
          'She sends a photo of her pharmacy’s medication schedule in the chat. Her medication is structured in the record, including the hormone therapy she forgot to mention. That counts for thrombosis prophylaxis after the procedure.',
        documentGeneration: 'The letter to the GP, the admission request, the prescriptions and the explanation of the procedure are ready.',
        smartFollowUp: 'She completes the AVVQ, and tells you how a full school day, her sleep and walking the dog are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for vascular surgery.',
      focus: 'Focus within your speciality (e.g. venous, peripheral arterial, aortic, vascular access)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'chirurgien vasculaire.',
      greeting: 'Bonjour Greet. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Ma jambe gauche est lourde tous les soirs et ma cheville gonfle. Et les varices de mon mollet s’aggravent.',
      assistantMessage: 'Merci. Vos jambes vont-elles mieux quand vous les surélevez ? Et avez-vous mal au mollet en marchant, une douleur qui disparaît quand vous vous arrêtez un instant ?',
      noteBody:
        'Jambes lourdes et œdème de la cheville gauche le soir, aggravés après la deuxième grossesse. Varices face interne du genou et du mollet gauches. Écho-Doppler : reflux de la GVS gauche de la jonction à mi-mollet, réseau veineux profond continent. CEAP C3…',
    },
    journey: {
      subtitle: 'Une patiente atteinte de varices, du premier signalement à la guérison. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Jambes lourdes et gonflement le soir, mieux jambes surélevées : Greet va chez le chirurgien veineux. Une douleur au mollet à la marche va chez le collègue artériel.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez elle et dans sa langue.',
          detail: 'Plaintes et aspect interrogés séparément, bas de contention et leur tolérance, grossesses, médicaments par photo. Aucun signal d’alerte.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par l’écho-Doppler.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, demande d’admission pour l’ablation, prescriptions, explication de l’intervention et certificat pour l’école.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'La convalescence suivie à domicile, pas seulement en chiffres.',
          detail: 'AVVQ et la sensation de lourdeur, mais aussi le sommeil, une journée d’école complète et la promenade du chien. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez une patiente atteinte de varices à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Les varices symptomatiques vont chez le chirurgien veineux. Une douleur au mollet à la marche va chez le collègue artériel. Une jambe soudain gonflée et douloureuse est signalée immédiatement.',
        agenda: 'Son rendez-vous obtient un long créneau chez le chirurgien veineux, avec le temps pour l’écho-Doppler.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour les varices : plaintes ou aspect, gonflement, bas de contention, grossesses, déjà une thrombose. Vous savez ce qui ne va pas avant même qu’elle n’entre.',
        voiceReception: 'Elle préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous faites l’écho-Doppler et discutez du reflux dans la grande veine saphène. Ensemble, vous optez pour une ablation endoveineuse. Vesalius prend des notes.',
        medication:
          'Elle envoie dans le chat une photo du schéma de médication de sa pharmacie. Ses médicaments sont structurés dans le dossier, y compris le traitement hormonal qu’elle avait oublié de mentionner. Il compte pour la prophylaxie de la thrombose après l’intervention.',
        documentGeneration: 'La lettre au médecin traitant, la demande d’admission, les prescriptions et l’explication de l’intervention sont prêtes.',
        smartFollowUp: 'Elle remplit l’AVVQ, et raconte comment se passent une journée d’école complète, son sommeil et la promenade du chien.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la chirurgie vasculaire.',
      focus: 'Domaine de prédilection (p. ex. veineux, artériel périphérique, aorte, abord vasculaire)',
    },
  },
};
