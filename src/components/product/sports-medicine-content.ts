import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const SPORTS_MEDICINE_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: geleidelijk of plots, welke sport, kan de patiënt nog belasten, klachten bij inspanning?",
      "(Bijna) flauwvallen of druk op de borst bij inspanning krijgt dezelfde dag een plaats. Een plotse knal met onvermogen op de tenen te staan krijgt voorrang. Een overbelaste pees, zoals bij Koen, volgt de gewone weg.",
      "Een overbelastingsletsel naar de sportarts. Een vermoeden van peesruptuur naar orthopedie. Rugpijn zonder sportcontext naar fysische geneeskunde. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke sportarts.",
      "Klachten bij inspanning die op het hart wijzen krijgen het vroegste moment. Een nieuwe patiënt die een echo nodig heeft, krijgt een langer blok.",
      "Koen heeft zijn sportintake en de VISA-A al ingevuld voor hij binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Koen krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Elke sporter krijgt dezelfde sportanamnese. Een pees? Dan volgen vragen over ochtendstijfheid, pijn bij het lopen en recente wijzigingen, zoals in een goede sportgeneeskundige anamnese.",
      "U opent het consult met zijn sportanamnese, klachten, eerdere behandelingen, medicatie en VISA-A op een rij."
    ],
    "voiceReception": [
      "Koen belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Geleidelijk of plots? Kan hij nog op de tenen staan? Klachten bij inspanning? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een overbelaste pees gaat meteen in de agenda van de sportarts, met het juiste type afspraak. Een rode vlag gaat naar uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de sportanamnese, het onderzoek en de echo, en kent termen als arc sign, Thompson-test en heel raise. Wat u links en rechts meet, komt naast elkaar te staan.",
      "Aan het einde staat de nota klaar in uw vaste sjabloon: sportanamnese, anamnese, klinisch onderzoek, functionele testen, echografie, diagnose en beleid. Voor elke sporter dezelfde structuur."
    ],
    "medication": [
      "Koen stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen de recente fluorochinolonkuur en dat hij ibuprofen neemt vóór het lopen, twee punten voor uw beleid."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de sportintake en de Scribe over de pees van Koen vastlegden, inclusief de metingen links en rechts.",
      "Consultatieverslag, brief aan de huisarts, voorschrift kine, belastingsschema en attest voor de club, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Koen krijgt een vragenlijst op week 2, 6 en 12 en na 6 maanden, afgestemd op zijn oefentherapie.",
      "Zijn VISA-A en pijnscores worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoeveel hij loopt, hoe het gaat op het werk en met zijn marathonplan.",
      "Een plotse knal, een gezwollen kuit of klachten bij inspanning? Dan krijgt uw team een signaal, zoals bij D. Peroneus."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks whether symptoms started gradually or suddenly, the sport, ability to bear weight and symptoms during exercise.",
      "Fainting, near-fainting or chest pressure during exercise gets a same-day appointment. A sudden snap with inability to stand on tiptoes receives priority. An overloaded tendon, as in Koen’s case, follows the usual route.",
      "Overuse injuries go to the sports physician, suspected tendon rupture to orthopaedics, and back pain without a sporting context to physical medicine. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each sports physician’s diary.",
      "Exercise symptoms suggesting a cardiac cause get the earliest appointment. A new patient needing ultrasound gets a longer slot.",
      "Koen has completed his sports intake and VISA-A before he arrives. You can see who is ready."
    ],
    "preConsultation": [
      "Koen receives a message and replies when it suits him, in his own language. There’s no app to download.",
      "Every athlete receives the same sports history. Tendon symptoms prompt questions about morning stiffness, running pain and recent changes, as in a sports medicine history.",
      "You start the consultation with his sports history, symptoms, previous treatments, medication and VISA-A in view."
    ],
    "voiceReception": [
      "Koen calls. The assistant answers straight away, even when reception is busy.",
      "Gradual or sudden onset? Can he stand on tiptoes? Symptoms during exercise? The assistant assesses urgency using clinical protocols.",
      "An overloaded tendon goes straight into the sports physician’s diary with the right appointment type. A red flag is passed to your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the sports history, examination and ultrasound. It recognises terms such as arc sign, Thompson test and heel raise, and places left and right measurements side by side.",
      "The note is ready in your usual template: sports history, history, clinical examination, functional tests, ultrasound, diagnosis and plan. The same structure for every athlete."
    ],
    "medication": [
      "Koen sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks him to confirm it.",
      "The confirmed list is in the record. You see his recent fluoroquinolone course and ibuprofen before running, two points for your management plan."
    ],
    "documentGeneration": [
      "Vesalius uses what the sports intake and Scribe recorded about Koen’s tendon, including left and right measurements.",
      "Consultation report, letter to the GP, physiotherapy prescription, loading plan and club certificate, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Koen receives questionnaires at weeks 2, 6 and 12 and after 6 months, tailored to his exercise therapy.",
      "His VISA-A and pain scores are compared with his baseline before the consultation. He also describes mileage, work and his marathon plans.",
      "A sudden snap, a swollen calf or symptoms during exercise triggers an alert for your team, as in D. Peroneus’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille le début progressif ou soudain, le sport, la capacité d’appui et les symptômes à l’effort.",
      "Un malaise ou une pression thoracique à l’effort donne un rendez-vous le jour même. Un claquement avec impossibilité de se mettre sur la pointe du pied est prioritaire. Un tendon surchargé, comme chez Koen, suit le parcours habituel.",
      "Une lésion de surcharge va chez le médecin du sport, une suspicion de rupture tendineuse en orthopédie et une lombalgie sans contexte sportif en médecine physique. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque médecin du sport.",
      "Des symptômes à l’effort évoquant le cœur reçoivent le premier créneau. Un nouveau patient nécessitant une échographie bénéficie d’un créneau plus long.",
      "Koen a rempli son anamnèse sportive et le VISA-A avant son arrivée. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Koen reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Chaque sportif reçoit la même anamnèse. Une plainte tendineuse entraîne des questions sur la raideur matinale, la douleur à la course et les changements récents.",
      "Vous commencez la consultation avec son anamnèse sportive, ses plaintes, traitements antérieurs, médicaments et VISA-A sous les yeux."
    ],
    "voiceReception": [
      "Koen appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Début progressif ou soudain ? Appui sur la pointe du pied possible ? Symptômes à l’effort ? L’urgence est évaluée selon les protocoles cliniques.",
      "Un tendon surchargé est inscrit directement chez le médecin du sport, avec le bon type de rendez-vous. Un signe d’alerte est transmis à votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse sportive, l’examen et l’échographie. Il reconnaît l’arc sign, le test de Thompson et les élévations du talon, et place les mesures droite et gauche côte à côte.",
      "La note suit votre modèle : anamnèse sportive, anamnèse, examen clinique, tests fonctionnels, échographie, diagnostic et conduite à tenir. La même structure pour chaque sportif."
    ],
    "medication": [
      "Koen envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande à Koen de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez la cure récente de fluoroquinolone et l’ibuprofène avant la course, deux points pour votre prise en charge."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse sportive et le Scribe ont consigné sur le tendon de Koen, y compris les mesures droite et gauche.",
      "Compte rendu, lettre au médecin traitant, prescription de kinésithérapie, programme de charge et certificat pour le club, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient."
    ],
    "smartFollowUp": [
      "Koen reçoit un questionnaire aux semaines 2, 6 et 12 et après 6 mois, adapté à sa thérapie par l’exercice.",
      "Son VISA-A et ses scores de douleur sont comparés aux mesures initiales. Il décrit aussi ses kilomètres, son travail et son projet de marathon.",
      "Un claquement soudain, un mollet gonflé ou des symptômes à l’effort déclenchent une alerte, comme chez D. Peroneus."
    ]
  }
};

export const SPORTS_MEDICINE_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Koen Soleus, 42, achillespeespijn · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Koen Soleus, 42, Achilles pain · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Koen Soleus, 42 ans, douleur achilléenne · étape ${step} sur ${total}`,
};
