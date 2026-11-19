import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const RHEUMATOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: welke gewrichten, gezwollen of alleen pijnlijk, hoe lang stijf 's ochtends, sinds wanneer, al een bloedname bij de huisarts?",
      "Koorts met een warm gewricht of een nieuwe hoofdpijn met wazig zien gaan meteen naar uw team. Een jichtopstoot zonder koorts krijgt snel een plaats, maar is geen spoed. Een vroege artritis, zoals bij Lies, krijgt voorrang in de agenda.",
      "Een vroege artritis naar de artritisraadpleging. Inflammatoire rugpijn naar de collega voor spondyloartritis. Pijn overal zonder zwelling naar fysische geneeskunde. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke reumatoloog.",
      "Een nieuwe hoofdpijn met wazig zien krijgt het vroegste moment. Een vroege artritis krijgt voorrang en een lang blok als nieuwe patiënt.",
      "Lies heeft haar vragenlijst al ingevuld en haar gewrichten aangeduid voor ze binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Lies krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.",
      "Gezwollen gewrichten? Dan volgen vragen over ochtendstijfheid, welke gewrichten, huid, darm en ogen, en wat de huisarts al vond, zoals in een goede reumatologische anamnese.",
      "U opent het consult met haar klachten, haar gewrichtenschema, het labo en de medicatie op een rij."
    ],
    "voiceReception": [
      "Lies belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Gezwollen of alleen pijnlijk? Hoe lang stijf 's ochtends? Koorts of een plots warm gewricht? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een vroege artritis gaat met voorrang in de agenda van de artritisraadpleging. Een rode vlag gaat naar uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, de gewrichtentelling en de bespreking van labo en echo, en kent termen als MCP, squeeze test, anti-CCP en DAS28.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, labo, beeldvorming, ziekteactiviteit, diagnose en beleid."
    ],
    "medication": [
      "Lies stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat ze de pil neemt, wat telt bij de start van methotrexaat, en geen bloedverdunners, mocht een infiltratie nodig zijn."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake, de medicatiefoto en de Scribe over de handen van Lies vastlegden.",
      "Consultatieverslag, brief aan de huisarts, voorschrift, afbouwschema, labo-aanvraag en uitleg voor de patiënte, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Lies krijgt een vragenlijst op week 2, 6 en 12, afgestemd op haar start met methotrexaat.",
      "Haar RAPID3 en ochtendstijfheid worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met slapen, werken en piano spelen.",
      "Koorts, keelpijn of een droge hoest onder methotrexaat? Dan krijgt uw team een signaal, zoals bij E. Olecranon. Misselijkheid na de inname is geen alarm, maar staat klaar voor het volgende consult."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks which joints are affected, whether they are swollen or only painful, morning stiffness, duration and any GP blood results.",
      "Fever with a hot joint or a new headache with blurred vision is flagged to your team immediately. A gout flare without fever gets a prompt appointment, without an emergency label. Early arthritis, as in Lies’s case, gets priority.",
      "Early arthritis goes to the arthritis clinic, inflammatory back pain to the spondyloarthritis clinician, and widespread pain without swelling to physical medicine. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each rheumatologist’s diary.",
      "New headache with blurred vision gets the earliest appointment. Early arthritis receives priority and a longer new patient slot.",
      "Lies has already completed her questionnaire and marked her affected joints. You can see who is ready."
    ],
    "preConsultation": [
      "Lies receives a message and replies when it suits her, in her own language. There’s no app to download.",
      "Swollen joints prompt questions about morning stiffness, affected joints, skin, bowel and eyes, and the GP’s findings, as in a rheumatological history.",
      "You start the consultation with her symptoms, joint diagram, blood results and medication in view."
    ],
    "voiceReception": [
      "Lies calls. The assistant answers straight away, even when reception is busy.",
      "Swollen or only painful? How long is morning stiffness? Fever or a suddenly hot joint? The assistant assesses urgency using clinical protocols.",
      "Early arthritis gets priority at the arthritis clinic. A red flag is passed to your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, joint count and discussion of blood results and ultrasound. It recognises terms such as MCP, squeeze test, anti-CCP and DAS28.",
      "The note is ready in your own structure: history, clinical examination, blood tests, imaging, disease activity, diagnosis and plan."
    ],
    "medication": [
      "Lies sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks her to confirm it.",
      "The confirmed list is in the record. You see the contraceptive pill, relevant when starting methotrexate, and no blood thinners, in case an injection is needed."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake, medication photo and Scribe recorded about Lies’s hands.",
      "Consultation report, letter to the GP, prescription, steroid taper, blood test request and patient information, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Lies receives questionnaires at weeks 2, 6 and 12, tailored to starting methotrexate.",
      "Her RAPID3 and morning stiffness are compared with her baseline before the consultation. She also describes sleep, work and piano playing.",
      "Fever, sore throat or a dry cough on methotrexate triggers an alert, as in E. Olecranon’s case. Nausea after a dose is noted for the next consultation without an alarm."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille les articulations atteintes, le gonflement ou la douleur seule, la raideur matinale, la durée et le bilan du généraliste.",
      "Fièvre avec articulation chaude ou nouvelle céphalée avec vision floue sont signalées immédiatement. Une crise de goutte sans fièvre reçoit un rendez-vous rapide, sans urgence. Une arthrite débutante, comme chez Lies, est prioritaire.",
      "Une arthrite débutante va en consultation d’arthrite, une lombalgie inflammatoire chez le collègue en spondyloarthrite et une douleur diffuse sans gonflement en médecine physique. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque rhumatologue.",
      "Une nouvelle céphalée avec vision floue reçoit le premier créneau. Une arthrite débutante est prioritaire, avec un créneau long de nouveau patient.",
      "Lies a déjà rempli son questionnaire et indiqué ses articulations atteintes. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Lies reçoit un message et répond quand elle le souhaite, dans sa langue. Aucune application à télécharger.",
      "Des articulations gonflées entraînent des questions sur la raideur matinale, les articulations, la peau, l’intestin, les yeux et les résultats du généraliste.",
      "Vous commencez la consultation avec ses plaintes, son schéma articulaire, le bilan et les médicaments sous les yeux."
    ],
    "voiceReception": [
      "Lies appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Gonflement ou douleur seule ? Durée de la raideur matinale ? Fièvre ou articulation soudainement chaude ? L’urgence est évaluée selon les protocoles cliniques.",
      "Une arthrite débutante est inscrite en priorité en consultation d’arthrite. Un signe d’alerte est transmis à votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, le compte articulaire et la discussion du bilan et de l’échographie. Il reconnaît MCP, squeeze test, anti-CCP et DAS28.",
      "La note suit votre structure : anamnèse, examen clinique, bilan biologique, imagerie, activité de la maladie, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Lies envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande à Lies de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez la pilule, importante avant le méthotrexate, et l’absence d’anticoagulants, au cas où une infiltration serait nécessaire."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse, la photo des médicaments et le Scribe ont consigné sur les mains de Lies.",
      "Compte rendu, lettre au médecin traitant, ordonnance, schéma de diminution, demande de bilan et informations à la patiente, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient."
    ],
    "smartFollowUp": [
      "Lies reçoit un questionnaire aux semaines 2, 6 et 12, adapté à l’instauration du méthotrexate.",
      "Son RAPID3 et sa raideur matinale sont comparés aux mesures initiales. Elle décrit aussi le sommeil, le travail et le piano.",
      "Fièvre, mal de gorge ou toux sèche sous méthotrexate déclenchent une alerte, comme chez E. Olecranon. Les nausées après la prise sont notées pour la consultation suivante, sans alarme."
    ]
  }
};

export const RHEUMATOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Lies Carpus, 46, beginnende reumatoïde artritis · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Lies Carpus, 46, early rheumatoid arthritis · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Lies Carpus, 46 ans, polyarthrite rhumatoïde débutante · étape ${step} sur ${total}`,
};
