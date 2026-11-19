import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const DIETETICS_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de vraag: diabetes, gewicht of darmklachten, welke diagnose, welke medicatie, een voorschrift van de huisarts?",
      "Hypo's onder insuline, braken na het eten of ongewild gewichtsverlies krijgen voorrang. Diabetes type 2 zonder hypo's, zoals bij Luc, volgt de gewone weg.",
      "Diabetes en gewicht naar u. Prikkelbare darm naar uw collega maag-darm. Wie glutenvrij wil eten zonder diagnose, eerst naar de huisarts voor een bloedtest. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke diëtist.",
      "Hypo's onder insuline krijgen het vroegste moment. Een eerste consult krijgt een lang blok van een uur, een opvolging een kort.",
      "Luc heeft zijn vragenlijst en drie dagen maaltijdfoto's al doorgestuurd voor hij binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Luc krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Slaat hij het ontbijt over? Dan volgen vragen over zijn werkuren, wat hij drinkt en wanneer hij zijn metformine neemt, zoals in een goede eetanamnese.",
      "U opent het consult met zijn eetpatroon, maaltijdfoto's, labo en medicatie op een rij.",
    ],
    voiceReception: [
      "Luc belt. De assistent neemt meteen op, ook als het secretariaat bezet is of u in consult zit.",
      "Insuline of tabletten? Hypo's? Ongewild gewichtsverlies? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Diabetes type 2 gaat meteen in de agenda van de diëtist diabetes en gewicht. Een rode vlag gaat naar uw team.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de eetanamnese, de metingen en de bespreking van de maaltijdfoto's, ook wat de partner zegt, en kent termen als HbA1c, bordmodel en PES-diagnose.",
      "Aan het einde staat de nota klaar in uw eigen structuur: assessment, diëtistische diagnose, interventie en monitoring.",
    ],
    medication: [
      "Luc stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat hij geen middelen neemt die hypo's geven, en dat hij metformine op een lege maag neemt. Metformine en langdurig omeprazol samen zijn een reden om de huisarts te vragen vitamine B12 na te kijken.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake, de maaltijdfoto's en de Scribe over het eetpatroon van Luc vastlegden.",
      "Consultatieverslag, brief aan de huisarts, persoonlijk voedingsplan en het attest voor het ziekenfonds, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Luc krijgt een vragenlijst op week 2, week 6, maand 3, 6 en 12, afgestemd op zijn begeleiding bij diabetes en gewicht.",
      "Zijn gewicht, buikomtrek en PAID-5 worden vergeleken met de intake. Daarnaast vertelt hij hoe het gaat met de cola, zijn ontbijt, slapen en fietsen met zijn kleinzoon.",
      "Hypo's onder insuline, ongewild gewichtsverlies of braken na het eten? Dan krijgt uw team een signaal, zoals bij I. Langerhans.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius gathers the reason for the visit: diabetes, weight or bowel symptoms, the diagnosis, medication and any GP referral.",
      "Hypos on insulin, vomiting after meals or unintentional weight loss get priority. Type 2 diabetes without hypos, like Luc’s, follows the usual route.",
      "Diabetes and weight go to you. IBS goes to your gastrointestinal colleague. Anyone wanting to go gluten-free without a diagnosis sees the GP for a blood test first. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each dietitian’s diary.",
      "Hypos on insulin get the earliest appointment. A first consultation for diabetes and weight gets a full hour.",
      "Luc has already completed his questionnaire and sent his meal photos when he arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Luc receives a message and replies when it suits him, in his own language. There’s no app to download.",
      "Skipping breakfast prompts questions about his working hours, drinks and when he takes metformin, as in a dietary assessment.",
      "You start the consultation with his eating habits, meal photos, blood results and medication in view.",
    ],
    voiceReception: [
      "Luc calls. The assistant answers straight away, even when reception is busy or you are in a consultation.",
      "Insulin or tablets? Hypos? Unintentional weight loss? The assistant assesses urgency using clinical protocols.",
      "Type 2 diabetes goes straight into the diabetes and weight dietitian’s diary. A red flag goes to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the dietary history, measurements and discussion of meal photos, including the partner’s contributions. It recognises terms such as HbA1c, plate model and PES diagnosis.",
      "The note is ready in your own structure: assessment, dietetic diagnosis, intervention and monitoring.",
    ],
    medication: [
      "Luc sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks him to confirm it.",
      "The confirmed list shows that he takes no medicines associated with hypos and takes metformin on an empty stomach. Metformin together with long-term omeprazole prompts a request to the GP to check vitamin B12.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake, meal photos and Scribe captured about Luc’s eating habits.",
      "Consultation report, letter to the GP, personal nutrition plan and health insurer certificate, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Luc receives questionnaires at weeks 2 and 6 and months 3, 6 and 12, tailored to his diabetes and weight support.",
      "His weight, waist measurement and PAID-5 are compared with intake. He also describes how he is getting on with cola, breakfast, sleep and cycling with his grandson.",
      "Hypos on insulin, unintentional weight loss or vomiting after meals trigger an alert for your team, as in I. Langerhans’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille la demande : diabète, poids ou troubles digestifs, diagnostic, médicaments et prescription du médecin traitant.",
      "Les hypoglycémies sous insuline, les vomissements après les repas ou une perte de poids involontaire sont prioritaires. Le diabète de type 2 sans hypoglycémie, comme chez Luc, suit le parcours habituel.",
      "Le diabète et le poids vous sont adressés. L’intestin irritable relève de votre collègue spécialisé. Avant de supprimer le gluten sans diagnostic, le patient voit le médecin traitant pour une prise de sang. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque diététicien.",
      "Les hypoglycémies sous insuline obtiennent le premier créneau. Une première consultation pour diabète et poids bénéficie d’une heure complète.",
      "Luc a déjà rempli son questionnaire et envoyé ses photos de repas à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Luc reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "S’il saute le petit-déjeuner, l’assistant pose des questions sur ses horaires, ses boissons et le moment de la prise de metformine.",
      "Vous commencez la consultation avec ses habitudes alimentaires, ses photos de repas, ses résultats sanguins et ses médicaments sous les yeux.",
    ],
    voiceReception: [
      "Luc appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé ou que vous êtes en consultation.",
      "Insuline ou comprimés ? Hypoglycémies ? Perte de poids involontaire ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Le diabète de type 2 est inscrit directement dans l’agenda du diététicien diabète et poids. Les signes d’alerte sont transmis à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse alimentaire, les mesures et la discussion des photos, y compris les propos du conjoint. Il reconnaît des termes comme HbA1c, modèle de l’assiette et diagnostic PES.",
      "La note est prête dans votre structure : évaluation, diagnostic diététique, intervention et suivi.",
    ],
    medication: [
      "Luc envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande à Luc de la confirmer.",
      "La liste confirmée indique qu’il ne prend pas de médicaments à risque d’hypoglycémie et prend la metformine à jeun. L’association de metformine et d’oméprazole au long cours motive une demande de contrôle de la vitamine B12 au médecin traitant.",
    ],
    documentGeneration: [
      "Vesalius reprend ce que l’anamnèse, les photos de repas et le Scribe ont consigné sur les habitudes alimentaires de Luc.",
      "Compte rendu, lettre au médecin traitant, plan alimentaire personnel et attestation pour la mutualité, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Luc reçoit un questionnaire aux semaines 2 et 6 et aux mois 3, 6 et 12, adapté à son accompagnement pour diabète et poids.",
      "Son poids, son tour de taille et son PAID-5 sont comparés au bilan initial. Il raconte aussi comment se passent le cola, le petit-déjeuner, le sommeil et le vélo avec son petit-fils.",
      "Des hypoglycémies sous insuline, une perte de poids involontaire ou des vomissements après les repas déclenchent une alerte, comme chez I. Langerhans.",
    ],
  },
};

export const DIETETICS_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Luc Pancreas, 58, diabetes type 2 · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Luc Pancreas, 58, type 2 diabetes · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Luc Pancreas, 58 ans, diabète de type 2 · étape ${step} sur ${total}`,
};
