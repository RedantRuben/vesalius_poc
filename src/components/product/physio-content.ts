import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, physical medicine variant (source: sales, "Website-inhoud fysische geneeskunde", §7). Step titles stay
 * as in the standard copy; only the bodies follow Sofie Fascia. Dutch is the source, English and French are translations.
 */
export const PHYSIO_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: waar de pijn zit, sinds wanneer, ochtendstijfheid, gezwollen gewrichten, wat al onderzocht werd.',
      'Nieuwe hoofdpijn of kauwpijn bij een oudere patiënt gaat vandaag nog naar uw team, wazig of dubbel zien meteen naar de spoed. Chronische pijn, zoals bij Sofie, volgt de gewone weg.',
      'Wijdverspreide pijn zonder ontstekingstekens naar de arts voor chronische pijn. Ontstekingstekens naar reumatologie. Nog geen bloedname? Eerst de huisarts. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke arts.',
      'Een rode vlag, zoals nieuwe hoofdpijn of kauwpijn bij een oudere patiënt, komt niet op de wachtlijst maar gaat vandaag nog naar uw team. Een eerste consult voor chronische pijn krijgt een lang blok.',
      'Sofie heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Sofie krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal en in meerdere keren. Geen app te downloaden.',
      'Pijn overal? Dan volgen de pijnkaart, vragen over slaap, vermoeidheid en concentratie, en wat al onderzocht en geprobeerd werd.',
      'U opent het consult met twee jaar voorgeschiedenis op een rij. De vragenlijst verzamelt wat u nodig heeft voor de ACR-criteria, de diagnose blijft bij u.',
    ],
    voiceReception: [
      'Sofie belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Ochtendstijfheid? Gezwollen gewrichten? Al een bloedname? Bij een oudere beller: nieuwe hoofdpijn of pijn bij het kauwen? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Chronische pijn gaat meteen in de agenda, met een lang blok. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het onderzoek en de uitleg aan de patiënt, en kent termen als hyperalgesie, WPI, nociplastische pijn en pacing.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, aanvullende onderzoeken, diagnose en beleid.',
    ],
    medication: [
      'Sofie stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt. Ook wat eerder niet werkte, komt aan bod.',
      'De bevestigde lijst staat in het dossier. U ziet meteen het opioïd en het slaapmiddel, en wat al geprobeerd werd, nog voor het consult begint.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake, de medicatiechat en de Scribe over Sofie vastlegden, ook twee jaar voorgeschiedenis.',
      'Consultatieverslag, brief aan de huisarts, verwijzing naar het programma, voorschrift kine, afbouwschema en het verslag voor de adviserend arts, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Sofie krijgt een vragenlijst in week 2, week 6, maand 3, 6 en 12, afgestemd op haar revalidatieprogramma en de afbouw van haar medicatie.',
      'Haar FIQR, slaapscore en pijn worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met werken, zwemmen en haar gezin.',
      'Nieuwe gezwollen gewrichten, koorts of toenemend krachtverlies? Dan krijgt uw team een signaal, zoals bij P. Phalanx.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: where the pain is, since when, morning stiffness, swollen joints, what has already been investigated.',
      'New headache or jaw pain on chewing in an older patient goes to your team today, blurred or double vision straight to A&E. Chronic pain, like Sofie’s, follows the usual route.',
      'Widespread pain without signs of inflammation to the chronic pain doctor. Signs of inflammation to rheumatology. No blood test yet? The GP first. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in each doctor’s agenda.',
      'A red flag, such as new headache or jaw pain on chewing in an older patient, does not go on the waiting list but to your team today. A first consultation for chronic pain gets a long slot.',
      'Sofie has already completed her questionnaire before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Sofie receives a message and answers when it suits her, in her own language and over several sittings. No app to download.',
      'Pain everywhere? Then come the pain map, questions on sleep, fatigue and concentration, and what has already been investigated and tried.',
      'You open the consultation with two years of history laid out. The questionnaire gathers what you need for the ACR criteria; the diagnosis stays with you.',
    ],
    voiceReception: [
      'Sofie calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Morning stiffness? Swollen joints? A blood test already? For an older caller: new headache or pain when chewing? That is how urgency is assessed, following clinical protocols.',
      'Chronic pain goes straight into the agenda, with a long slot. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the examination and the explanation to the patient, and knows terms such as hyperalgesia, WPI, nociplastic pain and pacing.',
      'At the end, the note is ready in your own structure: history, clinical examination, further investigations, diagnosis and plan.',
    ],
    medication: [
      'Sofie sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct. What did not work before comes up too.',
      'The confirmed list is in the record. You see the opioid and the sleeping tablet at once, and what has already been tried, before the consultation starts.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the medication chat and the Scribe captured about Sofie, including two years of history.',
      'Consultation report, letter to the GP, programme referral, physiotherapy prescription, tapering schedule and the report for the medical adviser, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Sofie gets a questionnaire at week 2, week 6, and months 3, 6 and 12, matched to her rehabilitation programme and the tapering of her medication.',
      'Her FIQR, sleep score and pain are compared with her baseline from before the consultation. She also tells you how work, swimming and her family are going.',
      'New swollen joints, fever or increasing weakness? Then your team gets an alert, as with P. Phalanx.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : où se situe la douleur, depuis quand, raideur matinale, articulations gonflées, ce qui a déjà été examiné.',
      'Une nouvelle céphalée ou une douleur à la mastication chez un patient âgé va aujourd’hui même à votre équipe, une vision floue ou double directement aux urgences. La douleur chronique, comme chez Sofie, suit le circuit habituel.',
      'Les douleurs diffuses sans signes inflammatoires vers le médecin de la douleur chronique. Les signes inflammatoires vers la rhumatologie. Pas encore de prise de sang ? D’abord le médecin traitant. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque médecin.',
      'Un signal d’alerte, comme une nouvelle céphalée ou une douleur à la mastication chez un patient âgé, ne va pas sur la liste d’attente mais à votre équipe le jour même. Une première consultation pour douleur chronique obtient un long créneau.',
      'Sofie a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Sofie reçoit un message et répond quand cela lui convient, dans sa langue et en plusieurs fois. Aucune application à télécharger.',
      'Des douleurs partout ? Suivent alors la carte de la douleur, des questions sur le sommeil, la fatigue et la concentration, et ce qui a déjà été examiné et essayé.',
      'Vous ouvrez la consultation avec deux ans d’antécédents en un coup d’œil. Le questionnaire recueille ce qu’il vous faut pour les critères ACR ; le diagnostic reste le vôtre.',
    ],
    voiceReception: [
      'Sofie appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Raideur matinale ? Articulations gonflées ? Déjà une prise de sang ? Chez un appelant âgé : nouvelle céphalée ou douleur à la mastication ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'La douleur chronique va directement dans l’agenda, avec un long créneau. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen et les explications données au patient, et connaît des termes comme hyperalgésie, WPI, douleur nociplastique et pacing.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, examens complémentaires, diagnostic et plan.',
    ],
    medication: [
      'Sofie envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte. Ce qui n’a pas fonctionné auparavant est aussi abordé.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement l’opioïde et le somnifère, et ce qui a déjà été essayé, avant même le début de la consultation.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, le chat sur les médicaments et le Scribe ont consigné sur Sofie, y compris deux ans d’antécédents.',
      'Rapport de consultation, lettre au médecin traitant, orientation vers le programme, prescription de kinésithérapie, schéma de sevrage et rapport pour le médecin-conseil, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Sofie reçoit un questionnaire à la semaine 2, à la semaine 6, et aux mois 3, 6 et 12, adapté à son programme de revalidation et au sevrage de ses médicaments.',
      'Son FIQR, son score de sommeil et sa douleur sont comparés à sa mesure de référence d’avant la consultation. Elle raconte aussi comment se passent le travail, la natation et la vie de famille.',
      'De nouvelles articulations gonflées, de la fièvre ou une perte de force croissante ? Votre équipe reçoit alors une alerte, comme pour P. Phalanx.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const PHYSIO_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Sofie Fascia, 41, fibromyalgie · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Sofie Fascia, 41, fibromyalgia · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Sofie Fascia, 41 ans, fibromyalgie · étape ${step} sur ${total}`,
};
