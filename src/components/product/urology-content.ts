import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const UROLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: de straal of urineverlies, lukt plassen nog, koorts, bloed in de urine, al een PSA-uitslag?",
      "Niet meer kunnen plassen of koorts met flankpijn gaat meteen naar spoed. Zichtbaar bloed in de urine krijgt voorrang. Plasklachten zoals bij Paul volgen de gewone weg, net als eenmalig bloed in het sperma bij een jonge man.",
      "Plasklachten naar de raadpleging plasklachten. Een verhoogde PSA naar uro-oncologie. Nierstenen naar endo-urologie. Urineverlies met een verzakking naar het bekkenbodemteam. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke uroloog.",
      "Wie na een retentie een sonde kreeg, krijgt het vroegste moment. Een nieuwe patiënt met plasklachten krijgt een lang blok, met tijd voor flow en residu.",
      "Paul heeft zijn IPSS en zijn plasdagboek al ingevuld voor hij binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Paul krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Zwakke straal? Dan volgen vragen over aandrang, nachtelijk plassen en urineverlies, de IPSS en drie dagen plasdagboek, zoals in een goede urologische anamnese.",
      "U opent het consult met zijn klachten, zijn IPSS, het dagboek en zijn medicatie op een rij.",
    ],
    voiceReception: [
      "Paul belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Lukt plassen nog? Koorts? Bloed in de urine? Een PSA-uitslag? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Plasklachten zoals bij Paul gaan meteen in de agenda. Wie niet meer kan plassen, zoals R. Etentio, gaat naar spoed en uw team wordt verwittigd.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het rectaal toucher en de bespreking van flow, residu en echo, en kent termen als Qmax, residu en IPSS.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, aanvullende onderzoeken, diagnose en beleid.",
    ],
    medication: [
      "Paul stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat zijn bloeddrukpil een plastablet bevat die hij 's avonds neemt, en dat hij geen bloedverdunners neemt, mocht later een ingreep nodig zijn.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake, het plasdagboek en de Scribe over de plasklachten van Paul vastlegden.",
      "Consultatieverslag, brief aan de huisarts, voorschrift, uitleg voor de patiënt en de aanvraag voor de controle, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Paul krijgt een vragenlijst op week 6, maand 6 en maand 12, afgestemd op zijn medicatie.",
      "Zijn IPSS en nocturie worden vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met slapen, werken en fietsen.",
      "Niet meer kunnen plassen, koorts, of bloed met stolsels na een ingreep? Dan krijgt uw team een signaal, zoals bij T. Rigonum.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius asks about stream or leakage, whether the patient can still pass urine, fever, blood in the urine and any PSA results.",
      "Inability to pass urine or fever with flank pain goes straight to emergency care. Visible blood in the urine gets priority. Symptoms like Paul’s and a single episode of blood in the semen in a younger man follow the usual route.",
      "Urinary symptoms go to the dedicated clinic, raised PSA to uro-oncology, stones to endourology, and leakage with prolapse to the pelvic floor team. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each urologist’s diary.",
      "Patients catheterised after retention get the earliest appointment. New patients with urinary symptoms get a longer slot for flow and residual volume measurements.",
      "Paul has already completed his IPSS and bladder diary when he arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Paul receives a message and replies in his own language when it suits him. There’s no app to download.",
      "A weak stream prompts questions about urgency, nocturia and leakage, with an IPSS and a three-day bladder diary.",
      "You start the consultation with his symptoms, IPSS, diary and medication in view.",
    ],
    voiceReception: [
      "Paul calls. The assistant answers straight away, even when reception is busy.",
      "Can he still pass urine? Fever? Blood in the urine? Any PSA result? The assistant assesses urgency using clinical protocols.",
      "Urinary symptoms like Paul’s go straight into the diary. Inability to pass urine, as in R. Etentio’s case, is sent to emergency care and flagged to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, rectal examination and discussion of flow rate, residual volume and ultrasound. It recognises terms such as Qmax, residual volume and IPSS.",
      "The note is ready in your own format: history, examination, investigations, diagnosis and plan.",
    ],
    medication: [
      "Paul sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. He can also send a prescription, a box or a PDF.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks him to confirm it.",
      "The confirmed list shows that the blood pressure tablet Paul takes in the evening contains a diuretic and that he takes no blood thinners, should a procedure be needed.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake, bladder diary and Scribe recorded about Paul’s urinary symptoms.",
      "Consultation report, letter to the GP, prescription, patient information and request for follow-up testing, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Paul receives questionnaires at week 6 and months 6 and 12, tailored to his medication.",
      "His IPSS and nocturia are compared with his baseline before the consultation. He also describes how he is getting on with sleep, work and cycling.",
      "Inability to pass urine, fever or blood clots after a procedure triggers an alert for your team, as in T. Rigonum’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius s’informe sur le jet ou les fuites, la possibilité d’uriner, la fièvre, le sang dans les urines et les résultats du PSA.",
      "Une impossibilité d’uriner ou de la fièvre avec une douleur du flanc relève des urgences. Le sang visible dans les urines est prioritaire. Les symptômes de Paul et un épisode isolé de sang dans le sperme chez un homme jeune suivent le parcours habituel.",
      "Les troubles urinaires vont en consultation dédiée, un PSA élevé en uro-oncologie, les calculs en endo-urologie et les fuites avec prolapsus à l’équipe du plancher pelvien. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque urologue.",
      "Un patient sondé après une rétention obtient le premier créneau. Un nouveau patient présentant des troubles urinaires bénéficie d’un créneau plus long pour la débitmétrie et le résidu.",
      "Paul a déjà rempli son IPSS et son calendrier mictionnel à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Paul reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Un jet faible entraîne des questions sur l’urgenturie, la nycturie et les fuites, avec un IPSS et un calendrier mictionnel de trois jours.",
      "Vous commencez la consultation avec ses plaintes, son IPSS, son calendrier et ses médicaments sous les yeux.",
    ],
    voiceReception: [
      "Paul appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Peut-il encore uriner ? Fièvre ? Sang dans les urines ? Résultat du PSA ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Les troubles urinaires comme ceux de Paul sont inscrits directement à l’agenda. Une impossibilité d’uriner, comme chez R. Etentio, est orientée vers les urgences et signalée à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, le toucher rectal et la discussion de la débitmétrie, du résidu et de l’échographie. Il reconnaît des termes comme Qmax, résidu et IPSS.",
      "La note est prête dans votre structure : anamnèse, examen clinique, examens complémentaires, diagnostic et conduite à tenir.",
    ],
    medication: [
      "Paul envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande à Paul de la confirmer.",
      "La liste confirmée indique que l’antihypertenseur pris le soir contient un diurétique et que Paul ne prend pas d’anticoagulants, si une intervention s’avère nécessaire.",
    ],
    documentGeneration: [
      "Vesalius reprend ce que l’anamnèse, le calendrier mictionnel et le Scribe ont consigné sur les troubles urinaires de Paul.",
      "Compte rendu, lettre au médecin traitant, ordonnance, informations pour le patient et demande de contrôle, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Paul reçoit un questionnaire à la semaine 6 et aux mois 6 et 12, adapté à son traitement.",
      "Son IPSS et sa nycturie sont comparés aux mesures prises avant la consultation. Il raconte aussi comment se passent le sommeil, le travail et le vélo.",
      "Une impossibilité d’uriner, une fièvre ou du sang avec des caillots après une intervention déclenchent une alerte, comme chez T. Rigonum.",
    ],
  },
};

export const UROLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Paul Prostata, 64, plasklachten · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Paul Prostata, 64, urinary symptoms · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Paul Prostata, 64 ans, troubles urinaires · étape ${step} sur ${total}`,
};
