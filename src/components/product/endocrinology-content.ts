import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, endocrinology variant (source: sales, "Website-inhoud endocrinologie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Paul Langerhans. Dutch is the source, English and French are translations.
 */
export const ENDOCRINOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de vraag: diabetes, schildklier, bijnier of hypofyse, gewicht? Welke behandeling, hypo's, wonden aan de voet?",
      'Braken met ketonen gaat meteen naar het secretariaat. Een nieuwe voetwonde krijgt voorrang. Eén hoge waarde na een feest, zonder klachten, krijgt een gewone plaats.',
      'Ontspoorde diabetes naar de diabetesraadpleging. Een knobbel in de hals naar de collega schildklier. Een vraag naar een maagverkleining naar de obesitaskliniek. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke endocrinoloog.',
      'Na een ketoacidose of met een voetwonde krijgt een patiënt het vroegste moment. Een nieuwe patiënt met ontspoorde diabetes krijgt een lang blok, op een dag die past bij zijn werk.',
      'Paul heeft zijn vragenlijst al ingevuld en zijn labo meegestuurd voor hij binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Paul krijgt een bericht en antwoordt wanneer het hem past, ook vanop een parking in het buitenland. Geen app te downloaden.',
      "Hypo's? Dan volgen vragen over wanneer, hoe erg en of iemand moest helpen, zoals in een goede diabetesanamnese. Zijn labo stuurt hij mee.",
      "U opent het consult met zijn hypo's, complicaties, leefstijl en labo op een rij.",
    ],
    voiceReception: [
      'Paul belt vanuit zijn cabine. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      "Welk type diabetes, welke behandeling? Hypo's met hulp van anderen? Een wonde aan de voet, braken of ketonen? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      'Ontspoorde diabetes zonder rode vlag gaat in de agenda van de diabetesraadpleging, op een dag die past. Braken met ketonen, zoals bij I. Insula, gaat meteen naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het voetonderzoek en de bespreking van het labo, en kent termen als HbA1c, monofilament en albuminurie.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, labo, diagnose en beleid.',
    ],
    medication: [
      'Paul stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      "De bevestigde lijst staat in het dossier. U ziet meteen dat hij 120 mg gliclazide neemt, de waarschijnlijke oorzaak van zijn hypo's achter het stuur.",
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake, de medicatiefoto, het labo en de Scribe over Paul vastlegden.',
      'Consultatieverslag, brief aan de huisarts, voorschriften, aanvraag terugbetaling, attest rijgeschiktheid en verwijzingen, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Paul krijgt een vragenlijst in week 2, week 6, maand 3 en maand 12, afgestemd op zijn nieuwe behandeling.',
      'Zijn PAID-5, DTSQ en WHO-5 worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met rijden, slapen en zijn duiven.',
      'Hevige buikpijn na de start van een injectie, braken onder een SGLT2-remmer of een nieuwe voetwonde? Dan krijgt uw team een signaal, zoals bij D. Ductus.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the question: diabetes, thyroid, adrenal or pituitary, weight? Which treatment, hypos, wounds on the foot?',
      'Vomiting with ketones goes straight to the secretariat. A new foot wound gets priority. One high reading after a party, without symptoms, gets a regular slot.',
      'Uncontrolled diabetes to the diabetes clinic. A lump in the neck to the thyroid colleague. A question about weight-loss surgery to the obesity clinic. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of each endocrinologist.',
      'After ketoacidosis or with a foot wound, a patient gets the earliest slot. A new patient with uncontrolled diabetes gets a long slot, on a day that fits his work.',
      'Paul has already completed his questionnaire and sent his bloods before he walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Paul receives a message and answers when it suits him, even from a lay-by abroad. No app to download.',
      'Hypos? Then come questions about when, how bad and whether anyone had to help, as in a good diabetes history. He sends his bloods along.',
      'You open the consultation with his hypos, complications, lifestyle and bloods laid out.',
    ],
    voiceReception: [
      'Paul calls from his cab. The assistant picks up straight away, even when the secretariat is busy.',
      'Which type of diabetes, which treatment? Hypos needing help from others? A foot wound, vomiting or ketones? That is how urgency is assessed, following clinical protocols.',
      'Uncontrolled diabetes without a red flag goes into the diabetes clinic’s agenda, on a day that suits. Vomiting with ketones, as with I. Insula, goes straight to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the foot examination and the discussion of the bloods, and knows terms such as HbA1c, monofilament and albuminuria.',
      'At the end, the note is ready in your own structure: history, clinical examination, bloods, diagnosis and plan.',
    ],
    medication: [
      'Paul sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that he takes 120 mg of gliclazide, the likely cause of his hypos behind the wheel.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the medication photo, the bloods and the Scribe captured about Paul.',
      'Consultation report, letter to the GP, prescriptions, reimbursement request, fitness-to-drive certificate and referrals, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Paul gets a questionnaire at week 2, week 6, month 3 and month 12, matched to his new treatment.',
      'His PAID-5, DTSQ and WHO-5 are compared with his baseline from before the consultation. He also tells you how driving, sleep and his pigeons are going.',
      'Severe abdominal pain after starting an injection, vomiting on an SGLT2 inhibitor or a new foot wound? Then your team gets an alert, as with D. Ductus.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la demande : diabète, thyroïde, surrénales ou hypophyse, poids ? Quel traitement, des hypoglycémies, des plaies au pied ?',
      'Des vomissements avec cétones vont directement au secrétariat. Une nouvelle plaie au pied est prioritaire. Une seule valeur élevée après une fête, sans plainte, obtient une place habituelle.',
      'Un diabète déséquilibré vers la consultation de diabétologie. Un nodule dans le cou vers le collègue thyroïde. Une demande de chirurgie bariatrique vers la clinique de l’obésité. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque endocrinologue.',
      'Après une acidocétose ou avec une plaie au pied, un patient obtient le créneau le plus proche. Un nouveau patient au diabète déséquilibré obtient un long créneau, un jour compatible avec son travail.',
      'Paul a déjà rempli son questionnaire et envoyé sa biologie avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Paul reçoit un message et répond quand cela lui convient, même depuis un parking à l’étranger. Aucune application à télécharger.',
      'Des hypoglycémies ? Suivent alors des questions sur quand, à quel point et si quelqu’un a dû aider, comme dans une bonne anamnèse diabétologique. Il envoie sa biologie.',
      'Vous ouvrez la consultation avec ses hypoglycémies, complications, mode de vie et biologie en un coup d’œil.',
    ],
    voiceReception: [
      'Paul appelle depuis sa cabine. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Quel type de diabète, quel traitement ? Des hypoglycémies nécessitant l’aide d’un tiers ? Une plaie au pied, des vomissements ou des cétones ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Un diabète déséquilibré sans signal d’alerte va dans l’agenda de la consultation de diabétologie, un jour qui convient. Des vomissements avec cétones, comme chez I. Insula, vont directement à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen des pieds et la discussion de la biologie, et connaît des termes comme HbA1c, monofilament et albuminurie.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, biologie, diagnostic et plan.',
    ],
    medication: [
      'Paul envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’il prend 120 mg de gliclazide, la cause probable de ses hypoglycémies au volant.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, la photo des médicaments, la biologie et le Scribe ont consigné sur Paul.',
      'Rapport de consultation, lettre au médecin traitant, prescriptions, demande de remboursement, certificat d’aptitude à la conduite et orientations, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Paul reçoit un questionnaire à la semaine 2, à la semaine 6, au mois 3 et au mois 12, adapté à son nouveau traitement.',
      'Son PAID-5, son DTSQ et son WHO-5 sont comparés à sa mesure de référence d’avant la consultation. Il raconte aussi comment se passent la conduite, le sommeil et ses pigeons.',
      'Une douleur abdominale intense après le début d’une injection, des vomissements sous inhibiteur de SGLT2 ou une nouvelle plaie au pied ? Votre équipe reçoit alors une alerte, comme pour D. Ductus.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const ENDOCRINOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Paul Langerhans, 58, diabetes type 2 · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Paul Langerhans, 58, type 2 diabetes · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Paul Langerhans, 58 ans, diabète de type 2 · étape ${step} sur ${total}`,
};
