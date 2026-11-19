import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, ophthalmology variant (source: sales, "Website-inhoud oogheelkunde", §7). Step titles stay as in the
 * standard copy; only the bodies follow Paul Lens. Dutch is the source, English and French are translations.
 */
export const OPHTHALMOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: welk oog, geleidelijk of plots, vervormd zien, flitsen of een schaduw, pijn of een rood oog?',
      'Flitsen met een schaduw, een plots pijnlijk rood oog of plots zichtverlies krijgen voorrang. Geleidelijk wazig zicht, zoals bij Paul, volgt de gewone weg. Een oud, onveranderd vlekje is geen rode vlag.',
      'Cataract naar de cataractraadpleging. Vervormd zien naar medische retina. Verhoogde oogdruk naar glaucoom. Droge ogen naar de orthoptist. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke oogarts.',
      'Flitsen met een schaduw krijgen dezelfde dag een plaats. Een nieuwe patiënt met cataract krijgt een langer blok, met tijd voor dilatatie en biometrie.',
      'Paul heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Paul krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.',
      'Wazig zicht? Dan volgen vragen over welk oog, verblinding, rijden, lezen en vervormd zien, zoals in een goede oogheelkundige anamnese.',
      'U opent het consult met zijn klachten, voorgeschiedenis en medicatie op een rij.',
    ],
    voiceReception: [
      'Paul belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Geleidelijk of plots? Welk oog? Flitsen, een schaduw, pijn of een rood oog? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Geleidelijk wazig zicht gaat meteen in de agenda van de cataractraadpleging. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het onderzoek aan de spleetlamp en de bespreking van de biometrie, en kent termen als OD en OS, LOCS III, C/D-ratio en floppy iris.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek per oog, aanvullende onderzoeken, diagnose en beleid.',
    ],
    medication: [
      'Paul stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen dat hij tamsulosine neemt, belangrijk voor de operatie, en geen anticoagulantia.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake, de medicatiefoto en de Scribe over de ogen van Paul vastlegden.',
      'Consultatieverslag, brief aan de huisarts, aanvraag dagopname, voorschrift oogdruppels en druppelschema, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Paul krijgt een vragenlijst op dag 1, week 1 en maand 1, en na het tweede oog op maand 3, afgestemd op zijn operatie.',
      "Zijn Catquest-9SF wordt vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij of hij 's avonds weer rijdt, de krant leest en aan houtbewerking toekomt.",
      'Meer pijn, een rood oog of zicht dat achteruitgaat na een ingreep? Dan krijgt uw team een signaal, zoals bij U. Uvea.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: which eye, gradual or sudden, distorted vision, flashes or a shadow, pain or a red eye?',
      'Flashes with a shadow, a suddenly painful red eye or sudden loss of vision get priority. Gradually blurred vision, as with Paul, follows the usual route. An old, unchanged floater is not a red flag.',
      'Cataract to the cataract clinic. Distorted vision to medical retina. Raised eye pressure to glaucoma. Dry eyes to the orthoptist. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of each ophthalmologist.',
      'Flashes with a shadow get a slot the same day. A new patient with a cataract gets a longer slot, with time for dilation and biometry.',
      'Paul has already completed his questionnaire before he walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Paul receives a message and answers when it suits him, in his own language. No app to download.',
      'Blurred vision? Then come questions about which eye, glare, driving, reading and distorted vision, as in a good ophthalmic history.',
      'You open the consultation with his symptoms, history and medication laid out.',
    ],
    voiceReception: [
      'Paul calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Gradual or sudden? Which eye? Flashes, a shadow, pain or a red eye? That is how urgency is assessed, following clinical protocols.',
      'Gradually blurred vision goes straight into the cataract clinic’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the slit-lamp examination and the discussion of the biometry, and knows terms such as OD and OS, LOCS III, C/D ratio and floppy iris.',
      'At the end, the note is ready in your own structure: history, clinical examination per eye, further investigations, diagnosis and plan.',
    ],
    medication: [
      'Paul sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that he takes tamsulosin, important for the operation, and no anticoagulants.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the medication photo and the Scribe captured about Paul’s eyes.',
      'Consultation report, letter to the GP, day-case request, eye-drop prescription and drop schedule, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Paul gets a questionnaire on day 1, at week 1 and month 1, and at month 3 after the second eye, matched to his operation.',
      'His Catquest-9SF is compared with his baseline from before the consultation. He also tells you whether he is driving at night again, reading the newspaper and getting to his woodworking.',
      'More pain, a red eye or vision getting worse after a procedure? Then your team gets an alert, as with U. Uvea.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : quel œil, progressif ou brutal, vision déformée, éclairs ou une ombre, douleur ou œil rouge ?',
      'Des éclairs avec une ombre, un œil rouge soudain douloureux ou une perte de vision brutale sont prioritaires. Une vue progressivement floue, comme chez Paul, suit le circuit habituel. Une ancienne mouche volante inchangée n’est pas un signal d’alerte.',
      'La cataracte vers la consultation cataracte. La vision déformée vers la rétine médicale. Une pression oculaire élevée vers le glaucome. Les yeux secs vers l’orthoptiste. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque ophtalmologue.',
      'Des éclairs avec une ombre obtiennent une place le jour même. Un nouveau patient atteint de cataracte obtient un créneau plus long, avec le temps pour la dilatation et la biométrie.',
      'Paul a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Paul reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Une vue floue ? Suivent alors des questions sur l’œil concerné, l’éblouissement, la conduite, la lecture et la vision déformée, comme dans une bonne anamnèse ophtalmologique.',
      'Vous ouvrez la consultation avec ses plaintes, ses antécédents et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Paul appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Progressif ou brutal ? Quel œil ? Des éclairs, une ombre, une douleur ou un œil rouge ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une vue progressivement floue va directement dans l’agenda de la consultation cataracte. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen à la lampe à fente et la discussion de la biométrie, et connaît des termes comme OD et OG, LOCS III, rapport C/D et iris flasque.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique par œil, examens complémentaires, diagnostic et plan.',
    ],
    medication: [
      'Paul envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’il prend de la tamsulosine, importante pour l’opération, et pas d’anticoagulants.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, la photo des médicaments et le Scribe ont consigné sur les yeux de Paul.',
      'Rapport de consultation, lettre au médecin traitant, demande d’hôpital de jour, prescription de collyres et schéma de gouttes, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Paul reçoit un questionnaire au jour 1, à la semaine 1 et au mois 1, puis au mois 3 après le deuxième œil, adapté à son opération.',
      'Son Catquest-9SF est comparé à sa mesure de référence d’avant la consultation. Il raconte aussi s’il conduit de nouveau le soir, lit le journal et retrouve sa menuiserie.',
      'Plus de douleur, un œil rouge ou une vue qui baisse après une intervention ? Votre équipe reçoit alors une alerte, comme pour U. Uvea.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const OPHTHALMOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Paul Lens, 71, cataract · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Paul Lens, 71, cataract · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Paul Lens, 71 ans, cataracte · étape ${step} sur ${total}`,
};
