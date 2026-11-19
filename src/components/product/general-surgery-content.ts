import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const GENERAL_SURGERY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: zwelling of niet, waar precies, gaat ze terug bij liggen, wanneer doet het pijn?",
      "Een breuk die hard en pijnlijk blijft zitten, zeker met braken, gaat meteen naar spoed. Een breuk die vanzelf terug gaat, zoals bij Dirk of N. Umbilicus, volgt de gewone weg.",
      "Een liesbreuk naar de buikwandraadpleging. Liespijn bij een sporter naar sportgeneeskunde, een stijve heup naar orthopedie, galsteenpijn naar de collega hepatobiliaire chirurgie. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke chirurg.",
      "Een breuk die vastzit, gaat niet in de agenda maar meteen naar spoed. Een nieuwe liesbreuk krijgt een lang blok, een wondcontrole of een lipoom een kort.",
      "Dirk heeft zijn vragenlijst al ingevuld voor hij binnenkomt, met de echo en zijn medicatie erbij. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Dirk krijgt een bericht en antwoordt wanneer het hem past, in zijn eigen taal. Geen app te downloaden.",
      "Een zwelling in de lies? Dan volgen vragen over de zijde, of ze terug gaat, hoe zwaar hij tilt en wat de buikwand belast, zoals in een goede chirurgische anamnese.",
      "U opent het consult met zijn klachten, echo, eerdere operaties en medicatie op een rij.",
    ],
    voiceReception: [
      "Dirk belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Een zwelling? Gaat ze terug bij liggen? Is ze hard en pijnlijk, met braken? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een breuk die terug gaat, komt meteen in de agenda van de buikwandchirurg. Een breuk die vastzit, zoals bij S. Femoralis, gaat naar uw team en naar spoed.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het onderzoek staand en liggend en de bespreking van de echo, en kent termen als ligament van Poupart, reponibel, TEP en EHS-classificatie.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, beeldvorming, diagnose en beleid.",
    ],
    medication: [
      "Dirk stuurt in de chat een foto van het medicatieschema van zijn apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat er niets te stoppen is voor de ingreep, en dat hij tamsulosine neemt.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake, de foto van het medicatieschema en de Scribe over Dirk vastlegden.",
      "Consultatieverslag, brief aan de huisarts, aanvraag opname, attest en uitleg voor de patiënt, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Dirk krijgt een vragenlijst op dag 1, week 1, week 3, maand 3 en maand 12, afgestemd op zijn laparoscopisch herstel.",
      "Zijn EuraHS-QoL wordt vergeleken met zijn nulmeting van vóór het consult. Daarnaast vertelt hij hoe het gaat met tillen op het werk, trompet en padel.",
      "Niet kunnen plassen, koorts, pus aan de wonde of een brandende pijn die blijft? Dan krijgt uw team een signaal, zoals bij R. Ilioinguinalis.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius asks whether there is a swelling, exactly where it is, whether it reduces when lying down and when it hurts.",
      "A hernia that stays hard and painful, especially with vomiting, goes straight to emergency care. A hernia that reduces spontaneously, as in Dirk or N. Umbilicus’s case, follows the usual route.",
      "An inguinal hernia goes to the abdominal wall clinic. Groin pain in an athlete goes to sports medicine, a stiff hip to orthopaedics, and biliary pain to hepatobiliary surgery. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each surgeon’s diary.",
      "An irreducible painful hernia goes straight to emergency care. A new inguinal hernia gets a longer appointment, while a wound review or lipoma gets a shorter one.",
      "Dirk has already completed his questionnaire, including the ultrasound and his medication. You can see who is ready.",
    ],
    preConsultation: [
      "Dirk receives a message and replies when it suits him, in his own language. There’s no app to download.",
      "A groin swelling prompts questions about the side, reducibility, lifting and strain on the abdominal wall, as in a surgical history.",
      "You start the consultation with his symptoms, ultrasound, previous operations and medication in view.",
    ],
    voiceReception: [
      "Dirk calls. The assistant answers straight away, even when reception is busy.",
      "A swelling? Does it reduce when lying down? Is it hard and painful, with vomiting? The assistant assesses urgency using clinical protocols.",
      "A reducible hernia goes straight into the abdominal wall surgeon’s diary. An irreducible painful hernia, as in S. Femoralis’s case, is flagged to your team and sent to emergency care.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, standing and supine examination and ultrasound discussion. It recognises terms such as inguinal ligament, reducible, TEP and EHS classification.",
      "The note is ready in your own structure: history, clinical examination, imaging, diagnosis and plan.",
    ],
    medication: [
      "Dirk sends a photo of his pharmacy’s medication schedule in the chat, as he would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks him to confirm it.",
      "The confirmed list is in the record. You see his tamsulosin and that his recorded medication needs no changes for the planned procedure.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake, medication photo and Scribe recorded about Dirk.",
      "Consultation report, letter to the GP, admission request, fit note and patient information, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Dirk receives questionnaires on day 1, week 1, week 3, month 3 and month 12, tailored to his laparoscopic repair.",
      "His EuraHS-QoL is compared with his baseline before the consultation. He also describes lifting at work, playing the trumpet and padel.",
      "Inability to pass urine, fever, pus at the wound or persistent burning pain triggers an alert for your team, as in R. Ilioinguinalis’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius demande s’il y a une tuméfaction, où elle se trouve, si elle se réduit couché et quand elle fait mal.",
      "Une hernie qui reste dure et douloureuse, surtout avec des vomissements, est orientée immédiatement vers les urgences. Une hernie spontanément réductible, comme chez Dirk ou N. Umbilicus, suit le parcours habituel.",
      "Une hernie inguinale va en consultation de paroi. Une douleur chez un sportif relève de la médecine du sport, une hanche raide de l’orthopédie et une douleur biliaire de la chirurgie hépatobiliaire. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque chirurgien.",
      "Une hernie douloureuse irréductible est orientée directement vers les urgences. Une nouvelle hernie bénéficie d’un créneau plus long, un contrôle de plaie ou un lipome d’un créneau court.",
      "Dirk a déjà rempli son questionnaire, avec l’échographie et ses médicaments. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Dirk reçoit un message et répond quand il le souhaite, dans sa langue. Aucune application à télécharger.",
      "Une tuméfaction inguinale entraîne des questions sur le côté, la réductibilité, les charges portées et les contraintes sur la paroi abdominale.",
      "Vous commencez la consultation avec ses plaintes, son échographie, ses opérations antérieures et ses médicaments sous les yeux.",
    ],
    voiceReception: [
      "Dirk appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Une tuméfaction ? Se réduit-elle en position couchée ? Est-elle dure et douloureuse, avec des vomissements ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Une hernie réductible est inscrite directement dans l’agenda du chirurgien de paroi. Une hernie douloureuse irréductible, comme chez S. Femoralis, est signalée à votre équipe et orientée vers les urgences.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen debout et couché et la discussion de l’échographie. Il reconnaît des termes comme ligament inguinal, réductible, TEP et classification EHS.",
      "La note est prête dans votre structure : anamnèse, examen clinique, imagerie, diagnostic et conduite à tenir.",
    ],
    medication: [
      "Dirk envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande à Dirk de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez la tamsulosine et l’absence de modification nécessaire des médicaments consignés pour l’intervention prévue.",
    ],
    documentGeneration: [
      "Vesalius reprend ce que l’anamnèse, la photo des médicaments et le Scribe ont consigné sur Dirk.",
      "Compte rendu, lettre au médecin traitant, demande d’admission, certificat et informations au patient, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Dirk reçoit un questionnaire au jour 1, aux semaines 1 et 3 et aux mois 3 et 12, adapté à sa réparation laparoscopique.",
      "Son EuraHS-QoL est comparé à la mesure d’avant la consultation. Il raconte aussi comment se passent le port de charges, la trompette et le padel.",
      "Une impossibilité d’uriner, une fièvre, du pus à la plaie ou une douleur brûlante persistante déclenchent une alerte, comme chez R. Ilioinguinalis.",
    ],
  },
};

export const GENERAL_SURGERY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Dirk Inguinalis, 56, liesbreuk · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Dirk Inguinalis, 56, inguinal hernia · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Dirk Inguinalis, 56 ans, hernie inguinale · étape ${step} sur ${total}`,
};
