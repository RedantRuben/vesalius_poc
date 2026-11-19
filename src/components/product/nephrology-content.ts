import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, nephrology variant (source: sales, "Website-inhoud nefrologie", §7). Step titles stay as in the standard
 * copy; only the bodies follow Luc Nefron. Dutch is the source, English and French are translations.
 */
export const NEPHROLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de reden van verwijzing: nierfunctie, eiwit of bloed in de urine, stenen, bloeddruk. Een recent labo mag als foto in de chat.',
      'Veel minder plassen, colakleurige urine met oedeem of een hoog kalium krijgen voorrang. Een geleidelijk dalende nierfunctie, zoals bij Luc, volgt de gewone weg.',
      'Een dalende eGFR met eiwit naar de nefroloog. Een niersteen naar urologie. Moeilijke bloeddruk bij een jonge patiënt naar de hypertensieraadpleging. Een stabiele eGFR op hoge leeftijd: advies aan de huisarts. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke nefroloog.',
      'Colakleurige urine met oedeem of veel minder plassen krijgt het vroegste moment. Een dalende nierfunctie krijgt een gewone plaats als nieuwe patiënt, met labo en urinestaal een week vooraf.',
      'Luc heeft zijn vragenlijst al ingevuld en zijn labo is binnen voor hij binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Luc krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.',
      'Dalende nierfunctie? Dan volgen vragen over het verloop van het labo, bloeddruk, diabetes, plassen en pijnstillers, zoals in een goede nefrologische anamnese.',
      'U opent het consult met zijn eGFR-verloop, klachten en medicatie op een rij.',
    ],
    voiceReception: [
      'Luc belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Bloed of colakleurige urine? Veel minder plassen? Kortademig? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Een dalende nierfunctie gaat meteen in de agenda van de nefroloog, met labo vooraf. Een rode vlag, zoals bij H. Bowman, gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het onderzoek en de bespreking van labo en echo, en kent termen als eGFR, UACR, CKD G3b A3 en putjesoedeem.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, labo, beeldvorming, diagnose en beleid.',
    ],
    medication: [
      'Luc stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen dat hij bijna dagelijks een NSAID neemt, dat zijn metformine te hoog staat voor zijn nierfunctie en dat hij geen bloedverdunners neemt.',
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake, de foto's in de chat en de Scribe over de nieren van Luc vastlegden.",
      'Consultatieverslag, brief aan de huisarts, voorschriften, labo-aanvraag, verwijzing diëtist, zorgtraject en uitleg voor de patiënt, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Luc krijgt een vragenlijst op week 2, maand 3 en maand 12, afgestemd op zijn nierbescherming.',
      'Zijn KDQOL-36, thuisbloeddruk en gewicht worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met werken en zijn duiven.',
      'Bloed in de urine na een biopsie, veel minder plassen of snel aankomen in gewicht? Dan krijgt uw team een signaal, zoals bij P. Papil. Vaker plassen na de start van een SGLT2-remmer is verwacht: dan volstaat uitleg.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the reason for referral: kidney function, protein or blood in the urine, stones, blood pressure. Recent bloods can be sent as a photo in the chat.',
      'Passing much less urine, cola-coloured urine with oedema or a high potassium get priority. A gradually declining kidney function, as with Luc, follows the usual route.',
      'A falling eGFR with protein to the nephrologist. A kidney stone to urology. Difficult blood pressure in a young patient to the hypertension clinic. A stable eGFR in old age: advice for the GP. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of each nephrologist.',
      'Cola-coloured urine with oedema or passing much less urine gets the earliest slot. A declining kidney function gets a regular slot as a new patient, with bloods and a urine sample a week before.',
      'Luc has already completed his questionnaire and his bloods are in before he walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Luc receives a message and answers when it suits him, in his own language. No app to download.',
      'Declining kidney function? Then come questions about the trend in his bloods, blood pressure, diabetes, passing urine and painkillers, as in a good nephrological history.',
      'You open the consultation with his eGFR trend, symptoms and medication laid out.',
    ],
    voiceReception: [
      'Luc calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Blood or cola-coloured urine? Passing much less urine? Breathless? That is how urgency is assessed, following clinical protocols.',
      'A declining kidney function goes straight into the nephrologist’s agenda, with bloods beforehand. A red flag, as with H. Bowman, goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the examination and the discussion of bloods and ultrasound, and knows terms such as eGFR, UACR, CKD G3b A3 and pitting oedema.',
      'At the end, the note is ready in your own structure: history, clinical examination, bloods, imaging, diagnosis and plan.',
    ],
    medication: [
      'Luc sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that he takes an NSAID almost daily, that his metformin is too high for his kidney function and that he takes no anticoagulants.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the photos in the chat and the Scribe captured about Luc’s kidneys.',
      'Consultation report, letter to the GP, prescriptions, lab request, dietitian referral, care pathway and an explanation for the patient, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Luc gets a questionnaire at week 2, month 3 and month 12, matched to his kidney protection.',
      'His KDQOL-36, home blood pressure and weight are compared with his baseline from before the consultation. He also tells you how work and his pigeons are going.',
      'Blood in the urine after a biopsy, passing much less urine or putting on weight fast? Then your team gets an alert, as with P. Papil. Passing urine more often after starting an SGLT2 inhibitor is expected: an explanation is enough.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille le motif d’orientation : fonction rénale, protéines ou sang dans les urines, calculs, tension. Une biologie récente peut être envoyée en photo dans le chat.',
      'Une forte baisse de la diurèse, des urines couleur cola avec œdèmes ou un potassium élevé sont prioritaires. Une fonction rénale en baisse progressive, comme chez Luc, suit le circuit habituel.',
      'Un DFGe en baisse avec protéinurie vers le néphrologue. Un calcul rénal vers l’urologie. Une tension difficile chez un patient jeune vers la consultation d’hypertension. Un DFGe stable à un âge avancé : avis au médecin traitant. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque néphrologue.',
      'Des urines couleur cola avec œdèmes ou une forte baisse de la diurèse obtiennent le créneau le plus proche. Une fonction rénale en baisse obtient une place habituelle comme nouveau patient, avec prise de sang et échantillon d’urine une semaine avant.',
      'Luc a déjà rempli son questionnaire et sa biologie est arrivée avant qu’il n’entre. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Luc reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Une fonction rénale en baisse ? Suivent alors des questions sur l’évolution de la biologie, la tension, le diabète, les mictions et les antidouleurs, comme dans une bonne anamnèse néphrologique.',
      'Vous ouvrez la consultation avec l’évolution de son DFGe, ses plaintes et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Luc appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Du sang ou des urines couleur cola ? Une forte baisse de la diurèse ? Essoufflé ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une fonction rénale en baisse va directement dans l’agenda du néphrologue, avec biologie préalable. Un signal d’alerte, comme chez H. Bowman, va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen et la discussion de la biologie et de l’échographie, et connaît des termes comme DFGe, RAC, MRC G3b A3 et œdème prenant le godet.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, biologie, imagerie, diagnostic et plan.',
    ],
    medication: [
      'Luc envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’il prend un AINS presque tous les jours, que sa metformine est trop élevée pour sa fonction rénale et qu’il ne prend pas d’anticoagulants.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, les photos dans le chat et le Scribe ont consigné sur les reins de Luc.',
      'Rapport de consultation, lettre au médecin traitant, prescriptions, demande de biologie, orientation vers la diététicienne, trajet de soins et explication pour le patient, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Luc reçoit un questionnaire à la semaine 2, au mois 3 et au mois 12, adapté à sa néphroprotection.',
      'Son KDQOL-36, sa tension et son poids à domicile sont comparés à sa mesure de référence d’avant la consultation. Il raconte aussi comment se passent le travail et ses pigeons.',
      'Du sang dans les urines après une biopsie, une forte baisse de la diurèse ou une prise de poids rapide ? Votre équipe reçoit alors une alerte, comme pour P. Papil. Uriner plus souvent après le début d’un inhibiteur de SGLT2 est attendu : une explication suffit.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const NEPHROLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Luc Nefron, 64, dalende nierfunctie · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Luc Nefron, 64, declining kidney function · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Luc Nefron, 64 ans, fonction rénale en baisse · étape ${step} sur ${total}`,
};
