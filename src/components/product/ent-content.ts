import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, ENT variant (source: sales, "Website-inhoud NKO", §7). Step titles stay as in the standard copy; only
 * the bodies follow Sven Septum. Dutch is the source, English and French are translations.
 */
export const ENT_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: oor, neus of keel, één of beide kanten, sinds wanneer, al behandeld?',
      'Plots gehoorverlies, zwelling rond het oog of ademnood krijgen voorrang. Chronische sinusitis, zoals bij Sven, volgt de gewone weg.',
      'Sinusitis naar de collega voor neus & sinus. Een kind met oorontstekingen naar de collega voor het oor. Herhaalde keelontstekingen naar keel & stem. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke NKO-arts, volgens zijn focus.',
      'Plots gehoorverlies krijgt nog dezelfde dag een plaats. Chronische sinusitis krijgt een lang blok als nieuwe patiënt, met tijd voor een endoscopie.',
      'Sven heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Sven krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.',
      'Verstopping aan beide kanten met reukverlies? Dan volgen vragen over eerdere sprays en kuren, astma en intolerantie voor ibuprofen, zoals in een goede NKO-anamnese.',
      'U opent het consult met zijn klachten, eerdere behandelingen, de CT en zijn medicatie op een rij.',
    ],
    voiceReception: [
      'Sven belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Oor, neus of keel? Eén of beide kanten? Zwelling rond het oog of plots gehoorverlies? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Chronische sinusitis gaat meteen in de agenda van de collega voor neus & sinus. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, de endoscopie en de bespreking van de CT, en kent termen als middelste neusschelp, Nasal Polyp Score en Lund-Mackay.',
      ORTHO_STEPS.nl.scribe[2],
    ],
    medication: [
      'Sven stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen zijn astmamedicatie, geen bloedverdunners en een intolerantie voor ibuprofen, belangrijk voor de pijnstilling na de ingreep.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake en de Scribe over de neus van Sven vastlegden.',
      'Consultatieverslag, brief aan de huisarts, operatievoorstel, uitleg voor de patiënt en het attest, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Sven krijgt een vragenlijst op dag 2, week 6, maand 3 en maand 12, afgestemd op zijn sinusoperatie.',
      'Zijn SNOT-22 en reukscore worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met slapen, fietsen en koken.',
      'Een bloedneus die niet stopt, zwelling rond het oog of koorts na een ingreep? Dan krijgt uw team een signaal, zoals bij E. Ethmoid.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: ear, nose or throat, one side or both, since when, already treated?',
      'Sudden hearing loss, swelling around the eye or difficulty breathing take priority. Chronic sinusitis, like Sven’s, follows the usual route.',
      'Sinusitis to the nose and sinus colleague. A child with ear infections to the ear colleague. Recurrent throat infections to throat and voice. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in each ENT surgeon’s agenda, according to their focus.',
      'Sudden hearing loss gets a slot the same day. Chronic sinusitis gets a long new-patient slot, with time for an endoscopy.',
      'Sven has already completed his questionnaire before he walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Sven receives a message and answers when it suits him, in his own language. No app to download.',
      'Blocked on both sides with loss of smell? Then come questions on previous sprays and courses, asthma and intolerance to ibuprofen, as in a good ENT history.',
      'You open the consultation with his complaints, previous treatments, the CT and his medication laid out.',
    ],
    voiceReception: [
      'Sven calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Ear, nose or throat? One side or both? Swelling around the eye or sudden hearing loss? That is how urgency is assessed, following clinical protocols.',
      'Chronic sinusitis goes straight into the nose and sinus colleague’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the endoscopy and the discussion of the CT, and knows terms such as middle turbinate, Nasal Polyp Score and Lund-Mackay.',
      ORTHO_STEPS.en.scribe[2],
    ],
    medication: [
      'Sven sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once his asthma medication, no anticoagulants and an intolerance to ibuprofen, which matters for pain relief after surgery.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake and the Scribe captured about Sven’s nose.',
      'Consultation report, letter to the GP, surgical proposal, an explanation for the patient and the certificate, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Sven gets a questionnaire on day 2, week 6, month 3 and month 12, matched to his sinus surgery.',
      'His SNOT-22 and smell score are compared with his baseline from before the consultation. He also tells you how sleeping, cycling and cooking are going.',
      'A nosebleed that will not stop, swelling around the eye or fever after surgery? Then your team gets an alert, as with E. Ethmoid.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : oreille, nez ou gorge, un côté ou les deux, depuis quand, déjà traitée ?',
      'Une surdité brutale, un gonflement autour de l’œil ou une détresse respiratoire sont prioritaires. Une sinusite chronique, comme chez Sven, suit le circuit habituel.',
      'La sinusite chez le confrère nez & sinus. Un enfant avec des otites chez le confrère de l’oreille. Les angines à répétition vers gorge & voix. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque ORL, selon son domaine.',
      'Une surdité brutale obtient une place le jour même. Une sinusite chronique obtient un long créneau de nouveau patient, avec le temps pour une endoscopie.',
      'Sven a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Sven reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Nez bouché des deux côtés avec perte de l’odorat ? Suivent alors des questions sur les sprays et cures antérieurs, l’asthme et l’intolérance à l’ibuprofène, comme dans une bonne anamnèse ORL.',
      'Vous ouvrez la consultation avec ses plaintes, ses traitements antérieurs, le scanner et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Sven appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Oreille, nez ou gorge ? Un côté ou les deux ? Gonflement autour de l’œil ou surdité brutale ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une sinusite chronique va directement dans l’agenda du confrère nez & sinus. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’endoscopie et la discussion du scanner, et connaît des termes comme cornet moyen, Nasal Polyp Score et Lund-Mackay.',
      ORTHO_STEPS.fr.scribe[2],
    ],
    medication: [
      'Sven envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement son traitement de l’asthme, l’absence d’anticoagulants et une intolérance à l’ibuprofène, importante pour l’antalgie après l’intervention.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse et le Scribe ont consigné sur le nez de Sven.',
      'Rapport de consultation, lettre au médecin traitant, proposition opératoire, explication pour le patient et certificat, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Sven reçoit un questionnaire au jour 2, à la semaine 6, au mois 3 et au mois 12, adapté à sa chirurgie des sinus.',
      'Son SNOT-22 et son score d’odorat sont comparés à sa mesure de référence d’avant la consultation. Il raconte aussi comment se passent le sommeil, le vélo et la cuisine.',
      'Un saignement de nez qui ne s’arrête pas, un gonflement autour de l’œil ou de la fièvre après une intervention ? Votre équipe reçoit alors une alerte, comme pour E. Ethmoid.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const ENT_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Sven Septum, 46, chronische sinusitis · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Sven Septum, 46, chronic sinusitis · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Sven Septum, 46 ans, sinusite chronique · étape ${step} sur ${total}`,
};
