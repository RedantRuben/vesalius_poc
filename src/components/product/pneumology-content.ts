import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const PNEUMOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: wanneer kortademig, hoe lang al hoest, rookt u, bloed opgehoest of vermagerd?",
      "Plotse kortademigheid met pijn bij inademen gaat naar spoed. Bloed ophoesten met gewichtsverlies krijgt voorrang. COPD zonder opstoot, zoals bij Paul, volgt de gewone weg.",
      "COPD naar de COPD-raadpleging. Piepen bij een niet-roker naar astma en allergie. Kortademig bij plat liggen naar cardiologie. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke longarts.",
      "Bloed ophoesten met gewichtsverlies krijgt het vroegste moment. Een nieuwe COPD-patiënt krijgt een lang blok, met tijd voor spirometrie.",
      "Paul heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Paul krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Kortademig bij inspanning? Dan volgen vragen over wandelafstand, opstoten, roken en beroep, zoals in een goede pneumologische anamnese.",
      "U opent het consult met zijn klachten, opstoten, pakjaren en inhalatoren op een rij."
    ],
    "voiceReception": [
      "Paul belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Kortademig bij inspanning, in rust of bij plat liggen? Bloed opgehoest? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een vermoeden van COPD gaat meteen in de agenda, met tijd voor spirometrie. Een rode vlag gaat naar uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, de bespreking van de spirometrie en de oefening met de inhalator, en kent termen als FEV1, GOLD-groep en pakjaren.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, longfunctie, beeldvorming, diagnose en beleid."
    ],
    "medication": [
      "Paul stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen welke puffers hij neemt, hoe vaak hij de noodpuffer nodig heeft en dat hij een prostaatmiddel neemt."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake en de Scribe over de longen van Paul vastlegden.",
      "Consultatieverslag, brief aan de huisarts, voorschrift, aanvraag longrevalidatie en actieplan, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Paul krijgt een vragenlijst op week 2, maand 3 en maand 12, afgestemd op zijn inhalatietherapie en rookstop.",
      "Zijn CAT en mMRC worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij of hij nog rookt en hoe ver hij wandelt met de hond.",
      "Meer kortademig, groen slijm of koorts? Dan krijgt uw team een signaal, zoals bij B. Bronchiolus."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks when breathlessness occurs, how long the cough has lasted, smoking, coughing up blood and weight loss.",
      "Sudden breathlessness with pain on breathing goes to emergency care. Coughing up blood with weight loss receives priority. COPD without an exacerbation, as in Paul’s case, follows the usual route.",
      "COPD goes to the COPD clinic, wheeze in a non-smoker to asthma and allergy, and breathlessness lying flat to cardiology. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each respiratory physician’s diary.",
      "Coughing up blood with weight loss gets the earliest appointment. A new COPD patient gets a longer slot with time for spirometry.",
      "Paul has already completed his questionnaire before he arrives. You can see who is ready."
    ],
    "preConsultation": [
      "Paul receives a message and replies when it suits him, in his own language. There’s no app to download.",
      "Exertional breathlessness prompts questions about walking distance, exacerbations, smoking and occupation, as in a respiratory history.",
      "You start the consultation with his symptoms, exacerbations, pack-years and inhalers in view."
    ],
    "voiceReception": [
      "Paul calls. The assistant answers straight away, even when reception is busy.",
      "Breathless on exertion, at rest or lying flat? Coughing up blood? The assistant assesses urgency using clinical protocols.",
      "Suspected COPD goes straight into the diary with time for spirometry. A red flag is passed to your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, spirometry discussion and inhaler demonstration. It recognises terms such as FEV1, GOLD group and pack-years.",
      "The note follows your structure: history, clinical examination, lung function, imaging, diagnosis and plan."
    ],
    "medication": [
      "Paul sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list and asks him to confirm it.",
      "The confirmed list is in the record. You see his inhalers, reliever use and prostate medicine."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake and Scribe recorded about Paul’s lungs.",
      "Consultation report, letter to the GP, prescription, pulmonary rehabilitation request and action plan, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Paul receives questionnaires at week 2, month 3 and month 12, tailored to his inhaler therapy and smoking cessation.",
      "His CAT and mMRC are compared with baseline. He also describes whether he still smokes and how far he walks with the dog.",
      "Increased breathlessness, green sputum or fever triggers an alert for your team, as in B. Bronchiolus’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille les circonstances de la dyspnée, la durée de la toux, le tabagisme, les crachats de sang et la perte de poids.",
      "Une dyspnée soudaine avec douleur à l’inspiration va aux urgences. Des crachats de sang avec perte de poids sont prioritaires. Une BPCO sans exacerbation, comme chez Paul, suit le parcours habituel.",
      "Une BPCO va en consultation BPCO, des sibilants chez un non-fumeur en asthme et allergie et une dyspnée couché en cardiologie. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque pneumologue.",
      "Des crachats de sang avec perte de poids reçoivent le premier créneau. Un nouveau patient BPCO bénéficie d’un créneau long avec spirométrie.",
      "Paul a déjà rempli son questionnaire avant son arrivée. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Paul reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Une dyspnée d’effort entraîne des questions sur la distance de marche, les exacerbations, le tabagisme et le métier, comme dans une anamnèse pneumologique.",
      "Vous commencez avec ses plaintes, exacerbations, paquets-années et inhalateurs sous les yeux."
    ],
    "voiceReception": [
      "Paul appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Dyspnée à l’effort, au repos ou couché ? Crachats de sang ? L’urgence est évaluée selon les protocoles cliniques.",
      "Une suspicion de BPCO est inscrite directement avec le temps pour une spirométrie. Un signe d’alerte est transmis à votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, la discussion de la spirométrie et la démonstration de l’inhalateur. Il reconnaît VEMS, groupe GOLD et paquets-années.",
      "La note suit votre structure : anamnèse, examen clinique, fonction respiratoire, imagerie, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Paul envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande confirmation.",
      "La liste confirmée figure dans le dossier. Vous voyez les inhalateurs, le recours à l’inhalateur de secours et le traitement prostatique."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse et le Scribe ont consigné sur les poumons de Paul.",
      "Compte rendu, lettre au médecin traitant, ordonnance, demande de réadaptation respiratoire et plan d’action, selon vos modèles.",
      "Vous modifiez les documents et les versez au dossier patient."
    ],
    "smartFollowUp": [
      "Paul reçoit un questionnaire à la semaine 2, aux mois 3 et 12, adapté aux inhalateurs et au sevrage tabagique.",
      "Son CAT et son mMRC sont comparés au bilan initial. Il décrit aussi son tabagisme et ses promenades avec le chien.",
      "Une dyspnée accrue, des expectorations vertes ou une fièvre déclenchent une alerte, comme chez B. Bronchiolus."
    ]
  }
};

export const PNEUMOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Paul Bronchus, 64, COPD · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Paul Bronchus, 64, COPD · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Paul Bronchus, 64 ans, BPCO · étape ${step} sur ${total}`,
};
