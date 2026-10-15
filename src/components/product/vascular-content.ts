import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, vascular surgery variant (source: sales, "Website-inhoud vaatchirurgie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Greet Saphena. Dutch is the source, English and French are translations.
 */
export const VASCULAR_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: zware benen of pijn bij het stappen, zwelling, een wonde, sinds wanneer, al behandeld?',
      'Een plots dik, pijnlijk been of een bloedende spatader krijgt voorrang. Spataders met klachten, zoals bij Greet, volgen de gewone weg.',
      'Spataders met klachten naar de veneuze vaatchirurg. Kuitpijn bij het stappen naar de collega arterieel. Adertjes zonder klachten naar het esthetisch spreekuur. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke vaatchirurg.',
      'Een plots dik, pijnlijk been krijgt het vroegste moment. Een wonde die niet geneest krijgt voorrang. Spataders met klachten krijgen een lang blok, met tijd voor de duplex.',
      'Greet heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Greet krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.',
      'Zware benen? Dan volgen vragen over zwelling, steunkousen, zwangerschappen en trombose, zoals in een goede flebologische anamnese.',
      'U opent het consult met haar klachten, eerdere behandelingen en medicatie op een rij.',
    ],
    voiceReception: [
      'Greet belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Klachten of uitzicht? Een plots dik been, een rode streng of een wonde? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Spataders met klachten gaan meteen in de agenda van de veneuze vaatchirurg. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de anamnese, het onderzoek en wat u tijdens de duplex zegt, en kent termen als VSM, saphenofemorale junctie, reflux en CEAP.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, duplex, diagnose en beleid.',
    ],
    medication: [
      'Greet stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier. U ziet meteen dat ze geen bloedverdunners neemt, maar wel hormonale substitutie: daar houdt u rekening mee bij de ablatie.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake en de Scribe over de benen van Greet vastlegden, inclusief de duplexbevindingen.',
      'Consultatieverslag, brief aan de huisarts, opnameaanvraag, voorschriften, uitleg voor de patiënt en het attest, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Greet krijgt een vragenlijst op dag 2, week 1, maand 3 en maand 12, afgestemd op haar ablatie.',
      'Haar AVVQ en het zware gevoel worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met een volle schooldag, haar slaap en wandelen met de hond.',
      'Een pijnlijke, gezwollen kuit of kortademigheid na een ingreep? Dan krijgt uw team een signaal, zoals bij S. Parva.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: heavy legs or pain on walking, swelling, a wound, since when, already treated?',
      'A suddenly swollen, painful leg or a bleeding varicose vein gets priority. Symptomatic varicose veins, as with Greet, follow the usual route.',
      'Symptomatic varicose veins to the venous surgeon. Calf pain on walking to the arterial colleague. Thread veins without symptoms to the aesthetic clinic. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agenda of each vascular surgeon.',
      'A suddenly swollen, painful leg gets the earliest slot. A wound that does not heal gets priority. Symptomatic varicose veins get a long slot, with time for the duplex.',
      'Greet has already completed her questionnaire before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Greet receives a message and answers when it suits her, in her own language. No app to download.',
      'Heavy legs? Then come questions about swelling, compression stockings, pregnancies and thrombosis, as in a good phlebological history.',
      'You open the consultation with her symptoms, previous treatments and medication laid out.',
    ],
    voiceReception: [
      'Greet calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Symptoms or appearance? A suddenly swollen leg, a red cord or a wound? That is how urgency is assessed, following clinical protocols.',
      'Symptomatic varicose veins go straight into the venous surgeon’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the history, the examination and what you say during the duplex, and knows terms such as GSV, saphenofemoral junction, reflux and CEAP.',
      'At the end, the note is ready in your own structure: history, clinical examination, duplex, diagnosis and plan.',
    ],
    medication: [
      'Greet sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record. You see at once that she takes no anticoagulants, but does take hormone replacement therapy: something to bear in mind for the ablation.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake and the Scribe captured about Greet’s legs, including the duplex findings.',
      'Consultation report, letter to the GP, admission request, prescriptions, explanation for the patient and the certificate, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Greet gets a questionnaire on day 2, at week 1, month 3 and month 12, matched to her ablation.',
      'Her AVVQ and the heavy feeling are compared with her baseline from before the consultation. She also tells you how a full school day, her sleep and walking the dog are going.',
      'A painful, swollen calf or breathlessness after a procedure? Then your team gets an alert, as with S. Parva.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : jambes lourdes ou douleur à la marche, gonflement, une plaie, depuis quand, déjà traité ?',
      'Une jambe soudain gonflée et douloureuse ou une varice qui saigne est prioritaire. Les varices symptomatiques, comme chez Greet, suivent le circuit habituel.',
      'Les varices symptomatiques vers le chirurgien veineux. Une douleur au mollet à la marche vers le collègue artériel. Des varicosités sans plainte vers la consultation esthétique. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque chirurgien vasculaire.',
      'Une jambe soudain gonflée et douloureuse obtient le créneau le plus proche. Une plaie qui ne guérit pas est prioritaire. Les varices symptomatiques obtiennent un long créneau, avec le temps pour l’écho-Doppler.',
      'Greet a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Greet reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Des jambes lourdes ? Suivent alors des questions sur le gonflement, les bas de contention, les grossesses et la thrombose, comme dans une bonne anamnèse phlébologique.',
      'Vous ouvrez la consultation avec ses plaintes, ses traitements antérieurs et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Greet appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Plaintes ou aspect ? Une jambe soudain gonflée, un cordon rouge ou une plaie ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Les varices symptomatiques vont directement dans l’agenda du chirurgien veineux. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit l’anamnèse, l’examen et ce que vous dites pendant l’écho-Doppler, et connaît des termes comme GVS, jonction saphéno-fémorale, reflux et CEAP.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, écho-Doppler, diagnostic et plan.',
    ],
    medication: [
      'Greet envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier. Vous voyez immédiatement qu’elle ne prend pas d’anticoagulants, mais bien un traitement hormonal substitutif : à prendre en compte pour l’ablation.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse et le Scribe ont consigné sur les jambes de Greet, y compris les résultats de l’écho-Doppler.',
      'Rapport de consultation, lettre au médecin traitant, demande d’admission, prescriptions, explication pour la patiente et certificat, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Greet reçoit un questionnaire au jour 2, à la semaine 1, au mois 3 et au mois 12, adapté à son ablation.',
      'Son AVVQ et la sensation de lourdeur sont comparés à sa mesure de référence d’avant la consultation. Elle raconte aussi comment se passent une journée d’école complète, son sommeil et la promenade du chien.',
      'Un mollet douloureux et gonflé ou un essoufflement après une intervention ? Votre équipe reçoit alors une alerte, comme pour S. Parva.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const VASCULAR_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Greet Saphena, 52, spataders · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Greet Saphena, 52, varicose veins · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Greet Saphena, 52 ans, varices · étape ${step} sur ${total}`,
};
