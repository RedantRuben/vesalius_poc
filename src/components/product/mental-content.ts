import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

/**
 * Module pages, mental health variant (source: sales, "Website-inhoud geestelijke gezondheidszorg", §7). Step titles stay
 * as in the standard copy; only the bodies follow Lotte Amygdala, and speak of clients and sessions. Dutch is the source,
 * English and French are translations.
 */
export const MENTAL_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon stelt Vesalius een paar korte vragen: waarvoor zoekt u hulp, sinds wanneer, wat vermijdt u, wat heeft u al geprobeerd?',
      'Gedachten aan zelfdoding, psychotische klachten of gevaar voor anderen gaan meteen naar uw team. De cliënt krijgt de crisisnummers. Paniek zonder risico, zoals bij Lotte, volgt de gewone weg.',
      'Paniek naar de collega met focus op angst. Trauma naar EMDR. Een ernstige depressie met medicatievraag naar de psychiater. Hartklachten bij inspanning eerst naar de huisarts. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke psycholoog in uw praktijk.',
      'Een crisis krijgt het vroegste moment. Een nieuwe cliënt krijgt een lang blok voor het eerste gesprek.',
      'Lotte heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Lotte krijgt een bericht en antwoordt wanneer het haar past, in haar eigen tempo. Geen app te downloaden.',
      'Paniekaanvallen? Dan volgen vragen over vermijding, veiligheidsgedrag en of het hart al onderzocht werd, zoals in een goed intakegesprek. De veiligheidsvraag komt altijd.',
      'U start de eerste sessie met haar hulpvraag, scores en eigen woorden op een rij, en kunt meteen inhoudelijk beginnen.',
    ],
    voiceReception: [
      'Lotte belt. De assistent neemt meteen op, ook als u in sessie zit en er geen secretariaat is.',
      'Waarvoor zoekt u hulp? In rust of bij inspanning? Gedachten aan zelfdoding? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Paniek zonder risico gaat meteen in de agenda van de juiste psycholoog. Een crisis gaat naar uw team, en de beller krijgt de crisisnummers.',
    ],
    scribe: [
      'Op uw smartphone of computer, bij het begin van de sessie, met toestemming van de cliënt. Leg hem daarna gewoon neer en kijk uw cliënt aan.',
      'Het volgt het verhaal, de hulpvraag en de afspraken, en hoort ook hoe iets gezegd wordt: angst, schaamte, opluchting, weerstand.',
      'Na de sessie staat de nota klaar in uw eigen structuur, met daaronder het emotionele verloop en de zinnen die het verschil maakten.',
    ],
    medication: [
      'Lotte stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen dat ze een kalmeermiddel zo nodig neemt, iets om mee te nemen in het behandelplan.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake en de Scribe over de paniekaanvallen van Lotte vastlegden.',
      'Intakeverslag, verslag aan de huisarts, behandelplan, uitleg voor de cliënt en oefenschema, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het cliëntendossier.',
    ],
    smartFollowUp: [
      'Lotte krijgt na elke sessie een korte check-in, en na sessie 4, 8 en 10 een uitgebreidere meting, afgestemd op haar therapie.',
      'Haar paniekscores worden vergeleken met haar nulmeting van vóór het eerste gesprek. Daarnaast vertelt ze hoe het gaat met de trein, het lopen en het koor, en hoe ze de sessie ervoer.',
      'Somberder, nauwelijks slapen of gedachten aan zelfdoding? Dan krijgt u een signaal vóór de volgende sessie, zoals bij P. Vagus.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius asks a few short questions: what are you looking for help with, since when, what do you avoid, what have you already tried?',
      'Thoughts of suicide, psychotic symptoms or danger to others go straight to your team. The client receives the crisis numbers. Panic without risk, as with Lotte, follows the usual route.',
      'Panic to the colleague who focuses on anxiety. Trauma to EMDR. Severe depression with a question about medication to the psychiatrist. Heart symptoms on exertion to the GP first. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of every psychologist in your practice.',
      'A crisis gets the earliest slot. A new client gets a long slot for the first session.',
      'Lotte has already completed her questionnaire before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Lotte receives a message and answers when it suits her, at her own pace. No app to download.',
      'Panic attacks? Then come questions about avoidance, safety behaviours and whether her heart has been checked, as in a good intake interview. The safety question is always asked.',
      'You start the first session with her request for help, scores and own words laid out, and can get straight to the substance.',
    ],
    voiceReception: [
      'Lotte calls. The assistant picks up straight away, even when you are in session and there is no secretariat.',
      'What are you looking for help with? At rest or on exertion? Thoughts of suicide? That is how urgency is assessed, following clinical protocols.',
      'Panic without risk goes straight into the right psychologist’s agenda. A crisis goes to your team, and the caller receives the crisis numbers.',
    ],
    scribe: [
      'On your phone or computer, at the start of the session, with the client’s consent. Then simply put it down and look at your client.',
      'It follows the story, the request for help and the agreements, and also hears how things are said: fear, shame, relief, resistance.',
      'After the session, the note is ready in your own structure, with the emotional course and the sentences that made the difference below it.',
    ],
    medication: [
      'Lotte sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that she takes a sedative as needed, something to take into account in the treatment plan.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake and the Scribe captured about Lotte’s panic attacks.',
      'Intake report, report to the GP, treatment plan, explanation for the client and exercise schedule, following your templates.',
      'You adjust what you want and add it to the client record.',
    ],
    smartFollowUp: [
      'Lotte gets a short check-in after every session, and a fuller measurement after sessions 4, 8 and 10, matched to her therapy.',
      'Her panic scores are compared with her baseline from before the first session. She also tells you how the train, running and the choir are going, and how she experienced the session.',
      'Lower in mood, hardly sleeping or thoughts of suicide? Then you get an alert before the next session, as with P. Vagus.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius pose quelques questions courtes : pour quoi cherchez-vous de l’aide, depuis quand, qu’évitez-vous, qu’avez-vous déjà essayé ?',
      'Des pensées suicidaires, des symptômes psychotiques ou un danger pour autrui vont immédiatement à votre équipe. Le client reçoit les numéros de crise. Une panique sans risque, comme chez Lotte, suit le circuit habituel.',
      'La panique vers le collègue spécialisé en anxiété. Le trauma vers l’EMDR. Une dépression sévère avec une question de médicaments vers le psychiatre. Des plaintes cardiaques à l’effort d’abord vers le médecin traitant. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque psychologue de votre cabinet.',
      'Une crise obtient le créneau le plus proche. Un nouveau client obtient un long créneau pour le premier entretien.',
      'Lotte a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Lotte reçoit un message et répond quand cela lui convient, à son rythme. Aucune application à télécharger.',
      'Des crises de panique ? Suivent alors des questions sur l’évitement, les comportements de sécurité et si le cœur a déjà été examiné, comme lors d’un bon entretien d’accueil. La question de sécurité est toujours posée.',
      'Vous commencez la première séance avec sa demande d’aide, ses scores et ses propres mots en un coup d’œil, et pouvez entrer directement dans le fond.',
    ],
    voiceReception: [
      'Lotte appelle. L’assistant décroche immédiatement, même quand vous êtes en séance et qu’il n’y a pas de secrétariat.',
      'Pour quoi cherchez-vous de l’aide ? Au repos ou à l’effort ? Des pensées suicidaires ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une panique sans risque va directement dans l’agenda du bon psychologue. Une crise va à votre équipe, et l’appelant reçoit les numéros de crise.',
    ],
    scribe: [
      'Sur votre smartphone ou votre ordinateur, au début de la séance, avec l’accord du client. Puis posez-le simplement et regardez votre client.',
      'Il suit le récit, la demande d’aide et les accords, et entend aussi comment les choses sont dites : peur, honte, soulagement, résistance.',
      'Après la séance, la note est prête dans votre propre structure, avec en dessous le déroulement émotionnel et les phrases qui ont fait la différence.',
    ],
    medication: [
      'Lotte envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’elle prend un calmant si nécessaire, un point à intégrer dans le plan de traitement.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse et le Scribe ont consigné sur les crises de panique de Lotte.',
      'Rapport d’accueil, rapport au médecin traitant, plan de traitement, explication pour le client et schéma d’exercices, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier du client.',
    ],
    smartFollowUp: [
      'Lotte reçoit un court suivi après chaque séance, et une mesure plus complète après les séances 4, 8 et 10, adaptée à sa thérapie.',
      'Ses scores de panique sont comparés à sa mesure de référence d’avant le premier entretien. Elle raconte aussi comment se passent le train, la course et la chorale, et comment elle a vécu la séance.',
      'Plus d’humeur sombre, presque plus de sommeil ou des pensées suicidaires ? Vous recevez alors une alerte avant la séance suivante, comme pour P. Vagus.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const MENTAL_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Lotte Amygdala, 31, paniekaanvallen · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Lotte Amygdala, 31, panic attacks · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Lotte Amygdala, 31 ans, crises de panique · étape ${step} sur ${total}`,
};
