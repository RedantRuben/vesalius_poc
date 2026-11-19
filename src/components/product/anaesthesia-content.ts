import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const ANAESTHESIA_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Na het inplannen van de ingreep beantwoordt de patiënt een paar korte vragen: welke ingreep, hoe gaan trappen, klachten van hart of adem, slaap, eerdere narcoses, medicatie.",
      "Nieuwe klachten van hart of adem, of koorts vlak voor de ingreep, gaan dezelfde dag naar uw secretariaat. Misselijkheid na een vorige narcose is geen rode vlag, wel een aandachtspunt in de samenvatting.",
      "Op dossier, telefonisch of op raadpleging, volgens de afspraken van uw dienst. U bevestigt of past aan. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit de screening, de intake en de telefoonassistent komen samen in de agenda van de pre-op raadpleging.",
      "Nieuwe klachten van hart of adem worden meteen aan het secretariaat gemeld. Wie veel aandachtspunten heeft, krijgt een langer blok, ruim vóór de ingreep.",
      "Frans heeft zijn vragenlijst al ingevuld voor hij binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Frans krijgt een bericht zodra zijn ingreep gepland is, en antwoordt wanneer het hem past. Geen app te downloaden.",
      "Stopt hij halverwege de trap? Dan vraagt de assistent of dat door zijn adem of door zijn knie is, zoals een anesthesist zelf zou doorvragen.",
      "U opent de raadpleging met zijn aandachtspunten bovenaan en de volledige vragenlijst eronder. U beoordeelt, Vesalius ordent.",
    ],
    voiceReception: [
      "Frans belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Welke ingreep? Nieuwe klachten van hart of adem? Bloedverdunners? Zo wordt de urgentie ingeschat, volgens de afspraken van uw dienst.",
      "Als de pre-op raadpleging bevestigd is, komt Frans in de agenda en krijgt hij de vragenlijst. Een rode vlag gaat naar uw team.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van de raadpleging. Leg hem daarna gewoon neer.",
      "Het volgt het gesprek over de aandachtspunten, het onderzoek van de luchtweg en de keuze van de anesthesietechniek, en kent termen als Mallampati, spinale verdoving en sedatie.",
      "Aan het einde staat de nota klaar in de structuur van uw pre-op verslag: ingreep, voorgeschiedenis, eerdere anesthesie, onderzoek, beoordeling en plan.",
    ],
    medication: [
      "Frans stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier, met bloedverdunners, diabetesmedicatie en injecties apart gemarkeerd. U beslist wat hij doorneemt en wat hij tijdelijk stopt.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake, de foto van het medicatieschema en de Scribe van de pre-op raadpleging vastlegden.",
      "Pre-op verslag voor de chirurg, brief aan de huisarts en instructies voor de patiënt, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier. De instructies gaan naar de patiënt via de chat.",
    ],
    smartFollowUp: [
      "Frans krijgt een herinnering de week en de dag vóór zijn ingreep, en een vragenlijst de dag na zijn ontslag en na twee weken.",
      "Zijn QoR-15 en pijnscores worden vergeleken met zijn nulmeting van vóór de ingreep. Daarnaast vertelt hij hoe hij de verdoving beleefde, hoe hij slaapt en hoe ver hij wandelt.",
      "Koorts vlak voor de ingreep, of hoofdpijn bij rechtop zitten na een ruggenprik? Dan krijgt uw team een signaal, zoals bij D. Ura.",
    ],
  },
  en: {
    smartTriage: [
      "Once surgery is booked, the patient answers short questions about the procedure, stairs, heart or breathing symptoms, sleep, previous anaesthetics and medication.",
      "New heart or breathing symptoms, or fever shortly before surgery, go to your reception team the same day. Nausea after a previous anaesthetic is noted for review.",
      "The screening suggests a record review, a phone assessment or a clinic appointment according to your department’s procedures. You confirm or change it. Your team can see why.",
    ],
    agenda: [
      "Bookings from screening, intake and the phone assistant come together in the pre-op clinic diary.",
      "New heart or breathing symptoms are flagged to reception straight away. Patients with several points to review get a longer appointment well before surgery.",
      "Frans has already completed his questionnaire by the time he arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Frans gets a message once his operation is booked and replies when it suits him. There’s no app to download.",
      "If he stops halfway up the stairs, the assistant asks whether that is because of his breathing or his knee, as an anaesthetist would.",
      "You open the assessment with the points to review at the top and the full questionnaire underneath. Vesalius organises the information for your review.",
    ],
    voiceReception: [
      "Frans calls. The assistant answers immediately, even when the reception team is busy.",
      "Which operation? Any new heart or breathing symptoms? Blood thinners? The assistant flags answers according to your department’s procedures.",
      "Once the pre-op appointment is confirmed, Frans is booked in and receives the questionnaire. Red flags go to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the assessment, then set it down.",
      "Vesalius follows the points you discuss, the airway examination and the choice of anaesthetic technique. It recognises terms such as Mallampati, spinal anaesthesia and sedation.",
      "The note is ready in your pre-op report structure: operation, history, previous anaesthetics, examination, assessment and plan.",
    ],
    medication: [
      "Frans sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. He can also send a prescription, a box or a PDF.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks him to confirm it.",
      "The confirmed list is in the patient record, with blood thinners, diabetes medication and injections flagged separately. You decide what he should continue and what to pause.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake, the medication schedule and Scribe recorded for the pre-op assessment.",
      "Pre-op report for the surgeon, letter to the GP and instructions for the patient, using your templates.",
      "Make any edits you need and add the documents to the patient record. The instructions are sent to the patient in the chat.",
    ],
    smartFollowUp: [
      "Frans receives a reminder the week and the day before surgery, and questionnaires the day after discharge and at two weeks.",
      "His QoR-15 and pain scores are compared with his baseline before surgery. He also describes his experience of the anaesthetic, his sleep and how far he can walk.",
      "Fever shortly before surgery or a headache when sitting upright after a spinal anaesthetic triggers an alert for your team, as in D. Ura’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Une fois l’intervention planifiée, le patient répond à quelques questions sur l’opération, les escaliers, les symptômes cardiaques ou respiratoires, le sommeil, les anesthésies antérieures et les médicaments.",
      "De nouveaux symptômes cardiaques ou respiratoires, ou une fièvre juste avant l’intervention, sont transmis au secrétariat le jour même. Des nausées après une anesthésie antérieure sont relevées pour l’évaluation.",
      "Le dépistage propose une évaluation sur dossier, par téléphone ou en consultation selon les procédures de votre service. Vous confirmez ou adaptez la proposition. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus du dépistage, de l’anamnèse et de l’assistant téléphonique arrivent dans l’agenda de la consultation préopératoire.",
      "De nouveaux symptômes cardiaques ou respiratoires sont immédiatement signalés au secrétariat. Plusieurs points à examiner justifient un créneau plus long, bien avant l’intervention.",
      "Frans a déjà rempli son questionnaire à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Frans reçoit un message dès que son intervention est planifiée et répond quand il le souhaite. Aucune application à télécharger.",
      "S’il s’arrête à mi-chemin dans l’escalier, l’assistant demande si c’est à cause de son souffle ou de son genou, comme le ferait un anesthésiste.",
      "Vous ouvrez la consultation avec les points à examiner en haut et le questionnaire complet en dessous. Vesalius organise les informations pour votre évaluation.",
    ],
    voiceReception: [
      "Frans appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Quelle intervention ? De nouveaux symptômes cardiaques ou respiratoires ? Des anticoagulants ? L’assistant signale les réponses selon les procédures de votre service.",
      "Une fois la consultation préopératoire confirmée, Frans est inscrit à l’agenda et reçoit le questionnaire. Les signes d’alerte sont transmis à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit les points discutés, l’examen des voies aériennes et le choix de la technique. Il reconnaît des termes comme Mallampati, rachianesthésie et sédation.",
      "La note est prête dans la structure du bilan : intervention, antécédents, anesthésies antérieures, examen, évaluation et conduite à tenir.",
    ],
    medication: [
      "Frans envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Il peut aussi envoyer une ordonnance, une boîte ou un PDF.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, puis affiche la liste dans le chat et demande à Frans de la confirmer.",
      "La liste confirmée figure dans le dossier, avec les anticoagulants, les antidiabétiques et les injections signalés séparément. Vous décidez des médicaments à poursuivre ou à interrompre temporairement.",
    ],
    documentGeneration: [
      "Vesalius reprend ce que l’anamnèse, la photo du schéma de médication et le Scribe ont consigné pendant la préparation.",
      "Bilan préopératoire pour le chirurgien, lettre au médecin traitant et consignes au patient, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier. Les consignes sont envoyées au patient dans le chat.",
    ],
    smartFollowUp: [
      "Frans reçoit un rappel une semaine et un jour avant l’intervention, puis un questionnaire le lendemain de sa sortie et à deux semaines.",
      "Ses scores QoR-15 et de douleur sont comparés aux mesures d’avant l’intervention. Il décrit aussi son expérience de l’anesthésie, son sommeil et la distance qu’il peut parcourir à pied.",
      "Une fièvre juste avant l’intervention ou un mal de tête en position assise après une rachianesthésie déclenche une alerte pour votre équipe, comme chez D. Ura.",
    ],
  },
};

export const ANAESTHESIA_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Frans Larynx, 68, pre-op voor een knieprothese · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Frans Larynx, 68, pre-op for a knee replacement · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Frans Larynx, 68 ans, bilan préopératoire pour une prothèse du genou · étape ${step} sur ${total}`,
};
