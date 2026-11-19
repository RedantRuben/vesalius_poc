import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, gynaecology variant (source: sales, "Website-inhoud gynaecologie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Lea Levator. Dutch is the source, English and French are translations.
 */
export const GYNAECOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: verzakking, urineverlies, bloedverlies, pijn of kinderwens, sinds wanneer, al behandeld?',
      'Bloedverlies na de menopauze krijgt voorrang. Hevig bloedverlies, of buikpijn bij een positieve zwangerschapstest, gaat meteen naar spoed. Een verzakking met plasklachten, zoals bij Lea, volgt de gewone weg.',
      'Een verzakking naar de urogynaecoloog. Urineverlies na een bevalling, zonder verzakking, eerst naar bekkenbodemkine. Een bal vanuit de anus naar de colorectale chirurg. Kinderwens naar fertiliteit. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke gynaecoloog.',
      'Bloedverlies na de menopauze krijgt een plaats binnen de week. Een verzakking krijgt een lang blok als nieuwe patiënte, met tijd voor het onderzoek.',
      'Lea heeft haar vragenlijst en haar mictiedagboek al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Lea krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.',
      'Een bal vanuit de vagina? Dan volgen vragen over plassen, stoelgang, seksualiteit en de bevallingen, met een mictiedagboek van drie dagen, zoals in een goede urogynaecologische anamnese.',
      'U opent het consult met haar klachten per compartiment, de bevallingen en medicatie op een rij.',
    ],
    voiceReception: [
      'Lea belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Een bal vanuit de vagina of de anus? Bloedverlies na de menopauze? Lukt plassen nog? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Een verzakking gaat meteen in de agenda van de urogynaecoloog. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het gynaecologisch onderzoek en de echografie, en kent termen als POP-Q, hoesttest, residu en Modified Oxford.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, aanvullende onderzoeken, diagnose en beleid.',
    ],
    medication: [
      'Lea stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen de blaaspil die ze vergat te vermelden, en een bloeddrukpil die haar kriebelhoest kan verklaren. Geen bloedverdunners, mocht een ingreep nodig zijn.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake, het mictiedagboek en de Scribe over Lea vastlegden.',
      'Consultatieverslag, brief aan de huisarts, voorschriften voor bekkenbodemkine en lokale oestrogenen, en de uitleg over het pessarium, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Lea krijgt een vragenlijst op week 1, week 6, maand 6 en maand 12, afgestemd op haar pessarium.',
      'Haar PFDI-20 wordt vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met slapen, wandelen, tuinieren en de kleinkinderen.',
      'Niet kunnen plassen, koorts of bloedverlies na een ingreep of met een pessarium? Dan krijgt uw team een signaal, zoals bij U. Rethra.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: prolapse, urine leakage, bleeding, pain or a wish to conceive, since when, already treated?',
      'Postmenopausal bleeding gets priority. Heavy bleeding, or abdominal pain with a positive pregnancy test, goes straight to A&E. A prolapse with bladder symptoms, as with Lea, follows the usual route.',
      'A prolapse to the urogynaecologist. Urine leakage after childbirth, without a prolapse, to pelvic floor physiotherapy first. A bulge from the anus to the colorectal surgeon. A wish to conceive to fertility. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of each gynaecologist.',
      'Postmenopausal bleeding gets a slot within the week. A prolapse gets a long slot as a new patient, with time for the examination.',
      'Lea has already completed her questionnaire and bladder diary before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Lea receives a message and answers when it suits her, in her own language. No app to download.',
      'A bulge from the vagina? Then come questions about bladder, bowel, sexual function and the births, with a three-day bladder diary, as in a good urogynaecological history.',
      'You open the consultation with her symptoms per compartment, the births and medication laid out.',
    ],
    voiceReception: [
      'Lea calls. The assistant picks up straight away, even when the secretariat is busy.',
      'A bulge from the vagina or the anus? Postmenopausal bleeding? Can she still pass urine? That is how urgency is assessed, following clinical protocols.',
      'A prolapse goes straight into the urogynaecologist’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the gynaecological examination and the ultrasound, and knows terms such as POP-Q, cough test, post-void residual and Modified Oxford.',
      'At the end, the note is ready in your own structure: history, clinical examination, further investigations, diagnosis and plan.',
    ],
    medication: [
      'Lea sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once the bladder tablet she forgot to mention, and a blood pressure tablet that may explain her tickly cough. No anticoagulants, should a procedure be needed.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the bladder diary and the Scribe captured about Lea.',
      'Consultation report, letter to the GP, prescriptions for pelvic floor physiotherapy and local oestrogen, and the explanation of the pessary, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Lea gets a questionnaire at week 1, week 6, month 6 and month 12, matched to her pessary.',
      'Her PFDI-20 is compared with her baseline from before the consultation. She also tells you how sleeping, walking, gardening and the grandchildren are going.',
      'Unable to pass urine, fever or bleeding after a procedure or with a pessary? Then your team gets an alert, as with U. Rethra.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : prolapsus, fuites urinaires, saignement, douleur ou désir de grossesse, depuis quand, déjà traité ?',
      'Un saignement après la ménopause est prioritaire. Un saignement abondant, ou une douleur abdominale avec un test de grossesse positif, va directement aux urgences. Un prolapsus avec des troubles urinaires, comme chez Lea, suit le circuit habituel.',
      'Un prolapsus vers l’urogynécologue. Des fuites urinaires après un accouchement, sans prolapsus, d’abord vers la rééducation périnéale. Une boule au niveau de l’anus vers le chirurgien colorectal. Un désir de grossesse vers la fertilité. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque gynécologue.',
      'Un saignement après la ménopause obtient une place dans la semaine. Un prolapsus obtient un long créneau comme nouvelle patiente, avec le temps pour l’examen.',
      'Lea a déjà rempli son questionnaire et son calendrier mictionnel avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Lea reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Une boule au niveau du vagin ? Suivent alors des questions sur la miction, le transit, la sexualité et les accouchements, avec un calendrier mictionnel de trois jours, comme dans une bonne anamnèse urogynécologique.',
      'Vous ouvrez la consultation avec ses plaintes par compartiment, les accouchements et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Lea appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Une boule au niveau du vagin ou de l’anus ? Un saignement après la ménopause ? Arrive-t-elle encore à uriner ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Un prolapsus va directement dans l’agenda de l’urogynécologue. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen gynécologique et l’échographie, et connaît des termes comme POP-Q, test à la toux, résidu post-mictionnel et Modified Oxford.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, examens complémentaires, diagnostic et plan.',
    ],
    medication: [
      'Lea envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement le médicament pour la vessie qu’elle avait oublié, et un antihypertenseur qui peut expliquer sa toux sèche. Pas d’anticoagulants, au cas où une intervention serait nécessaire.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, le calendrier mictionnel et le Scribe ont consigné sur Lea.',
      'Rapport de consultation, lettre au médecin traitant, prescriptions de rééducation périnéale et d’œstrogènes locaux, et l’explication du pessaire, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Lea reçoit un questionnaire à la semaine 1, à la semaine 6, au mois 6 et au mois 12, adapté à son pessaire.',
      'Son PFDI-20 est comparé à sa mesure de référence d’avant la consultation. Elle raconte aussi comment se passent le sommeil, la marche, le jardinage et les petits-enfants.',
      'Impossible d’uriner, de la fièvre ou un saignement après une intervention ou avec un pessaire ? Votre équipe reçoit alors une alerte, comme pour U. Rethra.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const GYNAECOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Lea Levator, 62, verzakking · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Lea Levator, 62, prolapse · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Lea Levator, 62 ans, prolapsus · étape ${step} sur ${total}`,
};
