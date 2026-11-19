import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const CARDIOLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: welk ritme, sinds wanneer, flauwgevallen, pijn op de borst, al vastgelegd op ECG of smartwatch?",
      "Pijn op de borst in rust of tekenen van een beroerte: meteen 112. Flauwvallen bij inspanning: dezelfde dag. Gekende VKF zonder alarmsignalen, zoals bij Marc, volgt de gewone weg.",
      "VKF naar de ritmeraadpleging. Losse overslagen naar de algemene cardiologie. Kortademigheid met oedeem naar hartfalen. Reflux naar gastro-enterologie. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke cardioloog.",
      "Wie flauwviel bij inspanning, krijgt het vroegste moment. Een nieuwe patiënt met VKF krijgt een lang blok, met tijd voor ECG en echo.",
      "Marc heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Marc krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Hartkloppingen? Dan volgen vragen over het ritme, de duur, wat ze uitlokt, flauwvallen en kortademigheid, zoals in een goede cardiologische anamnese.",
      "U opent het consult met zijn aanvallen, risicofactoren, eerdere behandelingen en medicatie op een rij."
    ],
    "voiceReception": [
      "Marc belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Flauwgevallen? Pijn op de borst? Nu kortademig of tekenen van een beroerte? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Gekende VKF zonder alarmsignalen gaat meteen in de agenda van de ritmeraadpleging. Een rode vlag gaat naar uw team, pijn op de borst in rust naar 112."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, de bespreking van ECG en echo en de keuze voor antistolling, en kent termen als CHA2DS2-VA, LVEF en EHRA.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, onderzoek, technische onderzoeken, risicoscores, diagnose en beleid."
    ],
    "medication": [
      "Marc stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat hij een plaatjesremmer neemt, nog vóór u antistolling voorschrijft."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake, de medicatiefoto en de Scribe over het hartritme van Marc vastlegden.",
      "Consultatieverslag, brief aan de huisarts, voorschrift apixaban, aanvragen voor Holter en slaaponderzoek en de uitleg voor de patiënt, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Marc krijgt een vragenlijst op week 2, maand 3 en maand 12, afgestemd op zijn behandeling met antistolling en frequentiecontrole.",
      "Zijn AFEQT en het aantal aanvallen worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met de bloedverdunner, slapen, werken en fietsen.",
      "Een bloeding onder antistolling, flauwvallen, of koorts en slikpijn na een ablatie? Dan krijgt uw team een signaal, zoals bij V. Pulmonalis."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks about the rhythm, onset, fainting, chest pain and any ECG or smartwatch recording.",
      "Chest pain at rest or signs of stroke: call 112 immediately. Fainting during exercise is seen the same day. Known AF without alarm symptoms, as in Marc’s case, follows the routine pathway.",
      "AF goes to the arrhythmia clinic, isolated skipped beats to general cardiology, breathlessness with oedema to heart failure, and reflux to gastroenterology. Your team sees why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each cardiologist’s diary.",
      "Anyone who fainted during exercise gets the earliest slot. A new patient with AF gets a longer appointment, with time for ECG and echo.",
      "Marc has already completed his questionnaire before arriving. You can see who is ready."
    ],
    "preConsultation": [
      "Marc receives a message and replies when it suits him, in his own language. There’s no app to download.",
      "Palpitations prompt questions about rhythm, duration, triggers, fainting and breathlessness, as in a good cardiology history.",
      "You start the consultation with his episodes, risk factors, previous treatments and medication in view."
    ],
    "voiceReception": [
      "Marc calls. The assistant answers straight away, even when reception is busy.",
      "Fainting? Chest pain? Breathlessness now or signs of stroke? Urgency is assessed using clinical protocols.",
      "Known AF without alarm symptoms is booked straight into the arrhythmia clinic diary. A red flag goes to your team, and chest pain at rest to 112."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, ECG and echo discussion and anticoagulation decision. It recognises terms such as CHA2DS2-VA, LVEF and EHRA.",
      "The note follows your structure: history, examination, investigations, risk scores, diagnosis and plan."
    ],
    "medication": [
      "Marc sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, box or PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list and asks him to confirm it.",
      "The confirmed list is in the record. You see immediately that he takes an antiplatelet, before prescribing anticoagulation."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake, medication photo and Scribe recorded about Marc’s heart rhythm.",
      "Consultation report, letter to the GP, apixaban prescription, Holter and sleep study requests and patient information, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Marc receives questionnaires at week 2, month 3 and month 12, tailored to anticoagulation and rate control.",
      "His AFEQT and episode frequency are compared with baseline. He also describes his anticoagulant treatment, sleep, work and cycling.",
      "Bleeding on anticoagulation, fainting, or fever and pain on swallowing after ablation trigger an alert, as in V. Pulmonalis’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille le rythme, le début, les syncopes, les douleurs thoraciques et les enregistrements ECG ou de montre connectée.",
      "Douleur thoracique au repos ou signes d’AVC : appeler immédiatement le 112. Une syncope à l’effort est vue le jour même. Une FA connue sans signe d’alarme, comme chez Marc, suit le parcours habituel.",
      "La FA va en rythmologie, les extrasystoles isolées en cardiologie générale, la dyspnée avec œdème en insuffisance cardiaque et le reflux en gastro-entérologie. Votre équipe voit pourquoi."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque cardiologue.",
      "Une syncope à l’effort obtient le premier créneau. Un nouveau patient avec une FA bénéficie d’un créneau long pour l’ECG et l’échographie.",
      "Marc a déjà rempli son questionnaire avant d’arriver. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Marc reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Des palpitations entraînent des questions sur le rythme, la durée, les déclencheurs, la syncope et la dyspnée, comme dans une bonne anamnèse cardiologique.",
      "Vous commencez avec ses crises, facteurs de risque, traitements antérieurs et médicaments sous les yeux."
    ],
    "voiceReception": [
      "Marc appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Syncope ? Douleur thoracique ? Dyspnée actuelle ou signes d’AVC ? L’urgence est évaluée selon les protocoles cliniques.",
      "Une FA connue sans signe d’alarme est inscrite directement en rythmologie. Un signe d’alerte va à votre équipe, une douleur thoracique au repos au 112."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’ECG, l’échographie et le choix de l’anticoagulation. Il reconnaît CHA2DS2-VA, FEVG et EHRA.",
      "La note suit votre structure : anamnèse, examen, examens complémentaires, scores de risque, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Marc envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande confirmation.",
      "La liste confirmée figure dans le dossier. Vous voyez immédiatement qu’il prend un antiagrégant avant de prescrire l’anticoagulation."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse, la photo de médicaments et le Scribe ont consigné sur le rythme de Marc.",
      "Compte rendu, lettre au médecin traitant, prescription d’apixaban, demandes de Holter et d’étude du sommeil et information au patient, selon vos modèles.",
      "Vous modifiez les documents et les versez au dossier patient."
    ],
    "smartFollowUp": [
      "Marc reçoit un questionnaire à la semaine 2, au mois 3 et au mois 12, adapté à l’anticoagulation et au contrôle de la fréquence.",
      "Son AFEQT et le nombre de crises sont comparés au bilan initial. Il décrit aussi l’anticoagulant, le sommeil, le travail et le vélo.",
      "Un saignement sous anticoagulant, une syncope ou de la fièvre et une douleur à la déglutition après ablation déclenchent une alerte, comme chez V. Pulmonalis."
    ]
  }
};

export const CARDIOLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Marc Atrium, 66, voorkamerfibrillatie · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Marc Atrium, 66, atrial fibrillation · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Marc Atrium, 66 ans, fibrillation atriale · étape ${step} sur ${total}`,
};
