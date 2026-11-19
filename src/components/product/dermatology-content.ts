import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const DERMATOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: welk letsel of welke huidziekte, sinds wanneer, verandert het, al behandeld?",
      "Een moedervlek die groeit, verkleurt of bloedt, krijgt voorrang. Plekjes die al jaren onveranderd zijn, en psoriasis zoals bij Koen, volgen de gewone weg.",
      "Psoriasis na systemische therapie naar de raadpleging inflammatoire huidziekten. Psoriasis met gezwollen gewrichten naar reumatologie. Handeczeem met een beroepsvermoeden naar allergologie. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke dermatoloog.",
      "Een moedervlek die snel verandert, krijgt het vroegste moment. Een start van systemische therapie krijgt een lang blok.",
      "Koen heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Koen krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Psoriasis die niet meer reageert? Dan volgen vragen over elke eerdere behandeling, de jeuk, de nagels en de gewrichten, zoals in een goede dermatologische anamnese. Hij stuurt ook foto's van zijn plekken in de chat.",
      "U opent het consult met zijn plekken en foto's, eerdere behandelingen, screening en DLQI op een rij.",
    ],
    voiceReception: [
      "Koen belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Al behandeld met lichttherapie of tabletten? Koorts of een huid die over het hele lichaam rood is? Een moedervlek die verandert? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Psoriasis na systemische therapie gaat meteen in de agenda van de raadpleging inflammatoire huidziekten. Een rode vlag gaat naar uw team.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het huidonderzoek en de bespreking van de behandeling, en kent termen als PASI, onycholyse en erythematosquameus.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, scores, aanvullende onderzoeken, diagnose en beleid.",
    ],
    medication: [
      "Koen stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, verpakking of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, ook van zalven en schuimen, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat hij een bètablokker neemt, die psoriasis kan verergeren, en geen bloedverdunners.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake en de Scribe over de huid van Koen vastlegden: scores, eerdere behandelingen, screening.",
      "Consultatieverslag, brief aan de huisarts, screeningsaanvraag en uitleg voor de patiënt, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Koen krijgt een vragenlijst op week 4, week 16 en maand 12, en een korte check vóór elke injectie, afgestemd op zijn biological.",
      "Zijn DLQI en jeukscore worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met slapen, lesgeven en zwemmen.",
      "Koorts of een infectie onder een biological? Een huid die plots over het hele lichaam rood wordt? Dan krijgt uw team een signaal, zoals bij R. Epidermis.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius gathers the details: which lesion or skin condition, when it started, whether it is changing, and what treatment has already been tried.",
      "A mole that grows, changes colour or bleeds gets priority. Spots that have been unchanged for years and psoriasis like Koen’s follow the usual route.",
      "Psoriasis after systemic treatment goes to the inflammatory skin disease clinic. Psoriasis with swollen joints goes to rheumatology. Suspected work-related hand eczema goes to allergology. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each dermatologist’s diary.",
      "A mole that is changing quickly gets the earliest appointment. Starting systemic treatment gets a longer slot.",
      "Koen has already completed his questionnaire when he arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Koen gets a message and replies when it suits him, in his own language. There’s no app to download.",
      "For psoriasis, the assistant asks about itch, affected areas, previous treatments and their effects, and any joint symptoms. Koen can send photos in the chat.",
      "You start the consultation with his photos, previous treatments and scores in view.",
    ],
    voiceReception: [
      "Koen calls. The assistant answers immediately, even when the reception team is busy.",
      "Has he had light therapy or tablets? Fever or skin that has become red all over? A mole that is changing? The assistant assesses urgency using clinical protocols.",
      "Psoriasis after systemic treatment is booked straight into the inflammatory skin disease clinic. A red flag goes to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, skin examination and discussion of treatment. It recognises terms such as PASI, onycholysis and erythematosquamous.",
      "The note is ready in your own format: history, clinical examination, scores, investigations, diagnosis and plan.",
    ],
    medication: [
      "Koen sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. He can also send a prescription, a package or a PDF.",
      "The assistant reads the name, active ingredient, strength, form and frequency, including for ointments and foams. It shows the list in the chat and asks Koen to confirm it.",
      "The confirmed list is in the patient record. You can see that he takes a beta blocker that can worsen psoriasis, and that he takes no blood thinners.",
    ],
    documentGeneration: [
      "Vesalius uses the scores, previous treatments and screening recorded by the intake and Scribe.",
      "Consultation report, letter to the GP, screening request and information for the patient, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Koen receives questionnaires at weeks 4 and 16 and month 12, with a short check before each injection, tailored to his biologic treatment.",
      "His DLQI and itch score are compared with his baseline before the consultation. He also describes how he is getting on with sleeping, teaching and swimming.",
      "Fever or infection while on a biologic, or skin that suddenly becomes red all over, triggers an alert for your team, as in R. Epidermis’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille les détails : quelle lésion ou maladie cutanée, depuis quand, comment elle évolue et quels traitements ont déjà été essayés.",
      "Un grain de beauté qui grossit, change de couleur ou saigne est prioritaire. Les lésions stables depuis des années et le psoriasis de Koen suivent le parcours habituel.",
      "Le psoriasis après traitement systémique est orienté vers les dermatoses inflammatoires. Des articulations gonflées relèvent de la rhumatologie. Un eczéma des mains possiblement professionnel relève de l’allergologie. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque dermatologue.",
      "Un grain de beauté qui évolue rapidement obtient le premier créneau. L’instauration d’un traitement systémique bénéficie d’un créneau plus long.",
      "Koen a déjà rempli son questionnaire à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Koen reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Pour le psoriasis, l’assistant pose des questions sur le prurit, les zones atteintes, les traitements antérieurs et leurs effets, et les symptômes articulaires. Koen peut envoyer des photos dans le chat.",
      "Vous commencez la consultation avec ses photos, ses traitements précédents et ses scores sous les yeux.",
    ],
    voiceReception: [
      "Koen appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Photothérapie ou comprimés déjà essayés ? Fièvre ou rougeur étendue à tout le corps ? Un grain de beauté qui change ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Après un traitement systémique, le psoriasis est orienté directement vers la consultation des dermatoses inflammatoires. Un signe d’alerte est signalé à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou votre ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen cutané et la discussion du traitement. Il reconnaît des termes comme PASI, onycholyse et érythématosquameux.",
      "La note est prête dans votre structure : anamnèse, examen clinique, scores, examens complémentaires, diagnostic et prise en charge.",
    ],
    medication: [
      "Koen envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Il peut aussi envoyer une ordonnance, un emballage ou un PDF.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, y compris pour les pommades et les mousses. Il affiche la liste dans le chat et demande à Koen de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez qu’il prend un bêtabloquant susceptible d’aggraver le psoriasis et aucun anticoagulant.",
    ],
    documentGeneration: [
      "Vesalius reprend les scores, les traitements antérieurs et le bilan consignés par l’anamnèse et le Scribe.",
      "Compte rendu de consultation, lettre au médecin traitant, demande de bilan et informations pour le patient, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Koen reçoit un questionnaire aux semaines 4 et 16 et au mois 12, avec un contrôle rapide avant chaque injection, adapté à sa biothérapie.",
      "Son DLQI et son score de prurit sont comparés aux mesures d’avant la consultation. Il raconte aussi comment il dort, enseigne et reprend la natation.",
      "Une fièvre ou une infection sous biothérapie, ou une rougeur qui s’étend soudain à tout le corps, déclenche une alerte pour votre équipe, comme chez R. Epidermis.",
    ],
  },
};

export const DERMATOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Koen Dermis, 44, psoriasis · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Koen Dermis, 44, psoriasis · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Koen Dermis, 44 ans, psoriasis · étape ${step} sur ${total}`,
};
