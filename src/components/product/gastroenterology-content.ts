import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const GASTRO_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: boven- of onderbuik, verband met de stoelgang, bloed, gewichtsverlies, sinds wanneer, al onderzocht?",
      "Zwarte stoelgang of bloedbraken gaan meteen naar uw team. Bloed bij de stoelgang met gewichtsverlies krijgt voorrang voor een coloscopie. Een prikkelbare darm zonder alarmsymptomen, zoals bij Eva, volgt de gewone weg.",
      "Een prikkelbare darm naar de raadpleging darm. Verhoogde leverwaarden naar hepatologie. Cyclische buikpijn naar gynaecologie. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke gastro-enteroloog, raadpleging en endoscopie apart.",
      "Alarmsymptomen krijgen het vroegste moment in de endoscopie. Een prikkelbare darm zonder alarmsymptomen krijgt een gewone plaats als nieuwe patiënt.",
      "Eva heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Eva krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.",
      "Pijn die beter wordt na de stoelgang? Dan volgen vragen over het stoelgangpatroon met de Bristol-schaal, uitlokkers en alarmsymptomen, zoals in een goede gastro-enterologische anamnese.",
      "U opent het consult met haar klachten, eerdere onderzoeken, behandelingen en medicatie op een rij."
    ],
    "voiceReception": [
      "Eva belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Verband met de stoelgang? Bloed of zwarte stoelgang? Gewichtsverlies of nachtelijke klachten? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een prikkelbare darm zonder alarmsymptomen gaat meteen in de agenda van de raadpleging darm. Een rode vlag gaat naar uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het buikonderzoek en de bespreking van het labo, en kent termen als Bristol-schaal, calprotectine, Rome IV en low-FODMAP.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, aanvullende onderzoeken, diagnose en beleid."
    ],
    "medication": [
      "Eva stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat ze al een jaar een maagzuurremmer neemt en geen bloedverdunners, mocht toch een biopsie nodig zijn."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake en de Scribe over de buikklachten van Eva vastlegden.",
      "Consultatieverslag, brief aan de huisarts, voorschrift, labo-aanvraag, verwijzing naar de diëtist en uitleg voor de patiënt, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Eva krijgt een vragenlijst op week 6, maand 3 en maand 12, afgestemd op haar dieet en medicatie.",
      "Haar IBS-SSS en stoelgangpatroon worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met werken, uit eten gaan en lopen.",
      "Bloed bij de stoelgang, gewichtsverlies of koorts na een coloscopie? Dan krijgt uw team een signaal, zoals bij P. Haustra."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks about the site of pain, its relation to bowel movements, bleeding, weight loss, duration and previous investigations.",
      "Black stools or vomiting blood are flagged to your team immediately. Rectal bleeding with weight loss receives priority for colonoscopy. IBS without alarm symptoms, as in Eva’s case, follows the usual route.",
      "IBS goes to the bowel clinic, raised liver enzymes to hepatology and cyclical abdominal pain to gynaecology. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each gastroenterologist’s diary, with clinics and endoscopy kept separate.",
      "Alarm symptoms receive the earliest endoscopy slot. IBS without alarm symptoms gets a routine new patient appointment.",
      "Eva has already completed her questionnaire before she arrives. You can see who is ready."
    ],
    "preConsultation": [
      "Eva receives a message and replies when it suits her, in her own language. There’s no app to download.",
      "Pain relieved by defaecation prompts questions about Bristol stool types, triggers and alarm symptoms, as in a gastroenterological history.",
      "You start the consultation with her symptoms, previous investigations, treatments and medication in view."
    ],
    "voiceReception": [
      "Eva calls. The assistant answers straight away, even when reception is busy.",
      "Relation to bowel movements? Blood or black stools? Weight loss or night-time symptoms? The assistant assesses urgency using clinical protocols.",
      "IBS without alarm symptoms goes straight into the bowel clinic diary. A red flag is passed to your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, abdominal examination and blood test discussion. It recognises terms such as Bristol stool scale, calprotectin, Rome IV and low-FODMAP.",
      "The note is ready in your own structure: history, clinical examination, investigations, diagnosis and plan."
    ],
    "medication": [
      "Eva sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks her to confirm it.",
      "The confirmed list is in the record. You see her daily acid suppressant for the past year and no blood thinners, in case a biopsy is needed."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake and Scribe recorded about Eva’s abdominal symptoms.",
      "Consultation report, letter to the GP, prescription, blood test request, dietitian referral and patient information, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Eva receives questionnaires at week 6, month 3 and month 12, tailored to her diet and medication.",
      "Her IBS-SSS and bowel habits are compared with her baseline before the consultation. She also describes work, meals out and running.",
      "Rectal bleeding, weight loss or fever after a colonoscopy triggers an alert for your team, as in P. Haustra’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille le siège de la douleur, le lien avec les selles, le sang, la perte de poids, la durée et les examens antérieurs.",
      "Des selles noires ou des vomissements de sang sont signalés immédiatement à votre équipe. Du sang dans les selles avec perte de poids donne priorité à une coloscopie. Un intestin irritable sans signe d’alarme, comme chez Eva, suit le parcours habituel.",
      "Un intestin irritable va en consultation intestinale, des enzymes hépatiques élevées en hépatologie et des douleurs cycliques en gynécologie. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque gastro-entérologue, avec consultations et endoscopies séparées.",
      "Les signes d’alarme donnent accès au premier créneau d’endoscopie. Un intestin irritable sans signe d’alarme reçoit un rendez-vous habituel de nouveau patient.",
      "Eva a déjà rempli son questionnaire avant son arrivée. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Eva reçoit un message et répond quand elle le souhaite, dans sa langue. Aucune application à télécharger.",
      "Une douleur soulagée par la défécation entraîne des questions sur le transit avec l’échelle de Bristol, les facteurs déclenchants et les signes d’alarme.",
      "Vous commencez la consultation avec ses plaintes, examens antérieurs, traitements et médicaments sous les yeux."
    ],
    "voiceReception": [
      "Eva appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Lien avec les selles ? Sang ou selles noires ? Perte de poids ou symptômes nocturnes ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Un intestin irritable sans signe d’alarme est inscrit directement en consultation intestinale. Un signal d’alerte est transmis à votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen abdominal et la discussion du bilan. Il reconnaît des termes comme échelle de Bristol, calprotectine, Rome IV et régime pauvre en FODMAP.",
      "La note est prête dans votre structure : anamnèse, examen clinique, examens complémentaires, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Eva envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande à Eva de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez l’antisécrétoire gastrique pris quotidiennement depuis un an et l’absence d’anticoagulants, au cas où une biopsie serait nécessaire."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse et le Scribe ont consigné sur les symptômes abdominaux d’Eva.",
      "Compte rendu, lettre au médecin traitant, ordonnance, demande de bilan, orientation diététique et informations au patient, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient."
    ],
    "smartFollowUp": [
      "Eva reçoit un questionnaire à la semaine 6, aux mois 3 et 12, adapté à son régime et à ses médicaments.",
      "Son IBS-SSS et son transit sont comparés aux mesures d’avant la consultation. Elle raconte aussi comment se passent le travail, les sorties au restaurant et la course.",
      "Du sang dans les selles, une perte de poids ou une fièvre après une coloscopie déclenchent une alerte, comme chez P. Haustra."
    ]
  }
};

export const GASTRO_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Eva Sigma, 32, prikkelbare darm · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Eva Sigma, 32, irritable bowel syndrome · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Eva Sigma, 32 ans, intestin irritable · étape ${step} sur ${total}`,
};
