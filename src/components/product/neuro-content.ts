import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, neurosurgery variant (source: sales, "Website-inhoud neurochirurgie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Tom Atlas. Dutch is the source, English and French are translations.
 */
export const NEURO_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: nek of rug, uitstraling, krachtverlies, sinds wanneer, al behandeld?',
      'Plasproblemen of uitval in beide benen krijgen voorrang. Een hernia met uitval, zoals bij Tom, volgt de gewone weg.',
      'Een hernia met uitval naar de wervelkolomchirurg. Nekpijn zonder uitstraling naar fysische geneeskunde. Tintelingen zonder nekpijn naar perifere zenuwen. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke neurochirurg.',
      'Plasproblemen of uitval in beide benen krijgen het vroegste moment. Een hernia met uitval krijgt een gewone plaats als nieuwe patiënt.',
      'Tom heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Tom krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.',
      'Uitstraling in de arm? Dan volgen vragen over tintelingen, krachtverlies en wat de pijn uitlokt, zoals in een goede neurochirurgische anamnese.',
      'U opent het consult met zijn klachten, eerdere behandelingen en medicatie op een rij.',
    ],
    voiceReception: [
      'Tom belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Uitstraling? Krachtverlies? Plasproblemen of een onzekere gang? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Een hernia met uitval gaat meteen in de agenda van de wervelkolomchirurg. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het neurologisch onderzoek en de bespreking van de MRI, en kent termen als Spurling, Hoffmann en dermatoom C6.',
      ORTHO_STEPS.nl.scribe[2],
    ],
    medication: [
      'Tom stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen dat hij een NSAID met maagbescherming neemt en geen bloedverdunners, mocht een infiltratie nodig zijn.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake en de Scribe over de nek van Tom vastlegden.',
      'Consultatieverslag, brief aan de huisarts, voorschrift kine, uitleg voor de patiënt en het attest, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Tom krijgt een vragenlijst op week 6, maand 3 en maand 12, afgestemd op zijn conservatieve behandeling.',
      'Zijn NDI en pijnscores worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met slapen, werken en gitaar spelen.',
      'Toenemend krachtverlies, slikklachten of koorts na een ingreep? Dan krijgt uw team een signaal, zoals bij K. Discus.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: neck or back, radiating pain, loss of strength, since when, already treated?',
      'Bladder problems or weakness in both legs take priority. A herniated disc with neurological deficit, like Tom’s, follows the usual route.',
      'A herniated disc with deficit to the spine surgeon. Neck pain without radiation to physical medicine. Tingling without neck pain to peripheral nerves. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in each neurosurgeon’s agenda.',
      'Bladder problems or weakness in both legs get the earliest slot. A herniated disc with deficit gets a regular new-patient slot.',
      'Tom has already completed his questionnaire before he walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Tom receives a message and answers when it suits him, in his own language. No app to download.',
      'Pain radiating into the arm? Then come questions on tingling, loss of strength and what triggers the pain, as in a good neurosurgical history.',
      'You open the consultation with his complaints, previous treatments and medication laid out.',
    ],
    voiceReception: [
      'Tom calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Radiating pain? Loss of strength? Bladder problems or an unsteady gait? That is how urgency is assessed, following clinical protocols.',
      'A herniated disc with deficit goes straight into the spine surgeon’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the neurological examination and the discussion of the MRI, and knows terms such as Spurling, Hoffmann and the C6 dermatome.',
      ORTHO_STEPS.en.scribe[2],
    ],
    medication: [
      'Tom sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that he takes an NSAID with stomach protection and no anticoagulants, should an injection be needed.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake and the Scribe captured about Tom’s neck.',
      'Consultation report, letter to the GP, physiotherapy prescription, an explanation for the patient and the certificate, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Tom gets a questionnaire at week 6, month 3 and month 12, matched to his conservative treatment.',
      'His NDI and pain scores are compared with his baseline from before the consultation. He also tells you how sleeping, working and playing the guitar are going.',
      'Increasing loss of strength, swallowing problems or fever after surgery? Then your team gets an alert, as with K. Discus.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : nuque ou dos, irradiation, perte de force, depuis quand, déjà traitée ?',
      'Des troubles urinaires ou un déficit dans les deux jambes sont prioritaires. Une hernie avec déficit, comme chez Tom, suit le circuit habituel.',
      'Une hernie avec déficit au chirurgien du rachis. Une cervicalgie sans irradiation en médecine physique. Des fourmillements sans cervicalgie vers les nerfs périphériques. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque neurochirurgien.',
      'Des troubles urinaires ou un déficit dans les deux jambes obtiennent le premier créneau. Une hernie avec déficit obtient une place normale de nouveau patient.',
      'Tom a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Tom reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Une douleur qui irradie dans le bras ? Suivent alors des questions sur les fourmillements, la perte de force et ce qui déclenche la douleur, comme dans une bonne anamnèse neurochirurgicale.',
      'Vous ouvrez la consultation avec ses plaintes, ses traitements antérieurs et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Tom appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Irradiation ? Perte de force ? Troubles urinaires ou marche instable ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une hernie avec déficit va directement dans l’agenda du chirurgien du rachis. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen neurologique et la discussion de l’IRM, et connaît des termes comme Spurling, Hoffmann et dermatome C6.',
      ORTHO_STEPS.fr.scribe[2],
    ],
    medication: [
      'Tom envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’il prend un AINS avec protection gastrique et aucun anticoagulant, au cas où une infiltration serait nécessaire.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse et le Scribe ont consigné sur la nuque de Tom.',
      'Rapport de consultation, lettre au médecin traitant, prescription de kinésithérapie, explication pour le patient et certificat, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Tom reçoit un questionnaire à la semaine 6, au mois 3 et au mois 12, adapté à son traitement conservateur.',
      'Son NDI et ses scores de douleur sont comparés à sa mesure de référence d’avant la consultation. Il raconte aussi comment se passent le sommeil, le travail et la guitare.',
      'Perte de force croissante, troubles de la déglutition ou fièvre après une intervention ? Votre équipe reçoit alors une alerte, comme pour K. Discus.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const NEURO_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Tom Atlas, 35, hernia in de nek · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Tom Atlas, 35, herniated disc in the neck · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Tom Atlas, 35 ans, hernie cervicale · étape ${step} sur ${total}`,
};
