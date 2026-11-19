import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const MKA_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: rond een kies, vóór het oor of in de wang, ontsteking of zwelling, al behandeld door de tandarts, foto gemaakt?",
      "Zwelling onder de kaak met slikproblemen gaat meteen naar spoed. Een zweer die niet geneest krijgt voorrang. Een gezwollen wang op dag 2 na een extractie, zonder koorts, is een normaal verloop.",
      "Een ontstoken verstandskies naar de MKA-chirurg. Kaakgewrichtsklachten zonder tandprobleem naar orofaciale kinesitherapie. Een verstopte neus met drukkende wang naar NKO. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke MKA-chirurg.",
      "Een zweer die niet geneest krijgt het vroegste moment. Verstandskiezen met een foto die vragen oproept krijgen een lang blok, met tijd voor een 3D-foto.",
      "Lotte heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Lotte krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.",
      "Een ontsteking rond de verstandskies? Dan volgen vragen over de opstoten, de mondopening, het gevoel in lip en tong en eerdere antibiotica, zoals in een goede MKA-anamnese.",
      "U opent het consult met haar klachten, eerdere behandelingen, de foto van de tandarts en medicatie op een rij.",
    ],
    voiceReception: [
      "Lotte belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Ontsteking? Foto bij de tandarts? Zwelling onder de kaak, koorts of moeite met slikken? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Verstandskiezen gaan meteen in de agenda van de MKA-chirurg. Een zwelling met slikproblemen, zoals bij H. Hyoid, gaat naar uw team.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het onderzoek van mond en kaak en de bespreking van de foto's, en kent termen als pericoronitis, canalis mandibularis en coronectomie.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, beeldvorming, diagnose en beleid.",
    ],
    medication: [
      "Lotte stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat ze geen bloedverdunners neemt, en dat de anesthesist van haar astma moet weten.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake en de Scribe over de verstandskiezen van Lotte vastlegden.",
      "Consultatieverslag, brief aan de tandarts, toestemmingsformulier, opname in het dagziekenhuis, voorschrift, nazorg en attest, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Lotte krijgt een vragenlijst op dag 1, 3 en 7 en na drie maanden, afgestemd op de verwijdering van haar verstandskiezen.",
      "Pijn, zwelling en mondopening worden vergeleken met haar waarden van vóór de ingreep. Daarnaast vertelt ze hoe het gaat met eten, slapen, lesgeven en hockey.",
      "Pijn die na enkele dagen weer toeneemt, een nabloeding of een zwelling met koorts? Dan krijgt uw team een signaal, zoals bij A. Alveolaris.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius gathers the symptoms: around a tooth, in front of the ear or in the cheek? Inflammation or swelling? Has the dentist treated it or taken an X-ray?",
      "Swelling under the jaw with difficulty swallowing is directed to emergency care straight away. A persistent ulcer gets priority. Cheek swelling on day 2 after an extraction without fever is an expected part of this example’s recovery.",
      "An inflamed wisdom tooth goes to the maxillofacial surgeon. Jaw-joint symptoms without a dental problem go to orofacial physiotherapy. A blocked nose with pressure in the cheek goes to ENT. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each maxillofacial surgeon’s diary.",
      "A persistent ulcer gets the earliest slot. A wisdom tooth with an X-ray that needs a closer look gets a longer slot, with time for a 3D scan.",
      "Lotte has already completed her questionnaire by the time she arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Lotte receives a message and replies when it suits her, in her own language. There’s no app to download.",
      "For an inflamed wisdom tooth, the assistant asks about flare-ups, mouth opening, sensation in the lip and tongue, and antibiotics already taken.",
      "You start the consultation with her symptoms, previous treatments, the dentist’s X-ray and her medication in view.",
    ],
    voiceReception: [
      "Lotte calls. The assistant answers immediately, even when the reception team is busy.",
      "Inflammation? An X-ray at the dentist? Swelling under the jaw, fever or difficulty swallowing? The assistant assesses urgency using clinical protocols.",
      "Wisdom tooth appointments go straight into the maxillofacial surgeon’s diary. Swelling with difficulty swallowing, as in H. Hyoid’s case, is flagged to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, the examination of the mouth and jaw, and the discussion of the scans. It recognises terms such as pericoronitis, mandibular canal and coronectomy.",
      "The note is ready in your own format: history, clinical examination, imaging, diagnosis and plan.",
    ],
    medication: [
      "Lotte sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. She can also send a prescription, a medicine box or a PDF.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks whether it is correct.",
      "The confirmed list is in the record. You can see that she takes no blood thinners and that the anaesthetist needs to know about her asthma.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake and Scribe captured about Lotte’s wisdom teeth.",
      "Consultation report, letter to the dentist, consent form, day-case admission, prescription, aftercare and fit note, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Lotte receives questionnaires on days 1, 3 and 7 and at three months, tailored to her wisdom tooth extraction.",
      "Pain, swelling and mouth opening are compared with her measurements before the procedure. She also describes how she is getting on with eating, sleeping, teaching and hockey.",
      "Pain that worsens again after a few days, further bleeding or swelling with fever triggers an alert for your team, as in A. Alveolaris’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille les symptômes : autour d’une dent, devant l’oreille ou dans la joue ? Inflammation ou gonflement ? Le dentiste a-t-il déjà traité le problème ou fait une radio ?",
      "Un gonflement sous la mâchoire avec des difficultés à avaler est orienté immédiatement vers les urgences. Un ulcère persistant est prioritaire. Une joue gonflée sans fièvre au jour 2 après l’extraction fait partie de l’évolution attendue dans cet exemple.",
      "Une dent de sagesse enflammée est orientée vers le chirurgien maxillo-facial. Des symptômes de l’articulation de la mâchoire sans problème dentaire relèvent de la kinésithérapie oro-faciale. Un nez bouché avec une pression dans la joue relève de l’ORL. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque chirurgien maxillo-facial.",
      "Un ulcère persistant obtient le premier créneau. Un examen des dents de sagesse avec une radio à approfondir bénéficie d’un créneau plus long, avec le temps d’effectuer une imagerie 3D.",
      "Lotte a déjà rempli son questionnaire à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Lotte reçoit un message et répond quand elle le souhaite, dans sa langue. Aucune application à télécharger.",
      "En cas d’inflammation autour d’une dent de sagesse, l’assistant pose des questions sur les poussées, l’ouverture buccale, la sensibilité de la lèvre et de la langue et les antibiotiques déjà pris.",
      "Vous commencez la consultation avec ses symptômes, les traitements précédents, la radio du dentiste et ses médicaments sous les yeux.",
    ],
    voiceReception: [
      "Lotte appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Inflammation ? Une radio chez le dentiste ? Gonflement sous la mâchoire, fièvre ou difficultés à avaler ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "Les rendez-vous pour les dents de sagesse sont placés directement dans l’agenda du chirurgien maxillo-facial. Un gonflement avec des difficultés à avaler, comme chez H. Hyoid, est signalé à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou votre ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen de la bouche et de la mâchoire et la discussion des images. Il reconnaît des termes comme péricoronarite, canal mandibulaire et coronectomie.",
      "La note est prête dans votre structure : anamnèse, examen clinique, imagerie, diagnostic et prise en charge.",
    ],
    medication: [
      "Lotte envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Elle peut aussi envoyer une ordonnance, une boîte ou un PDF.",
      "L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.",
      "La liste confirmée figure dans le dossier. Vous voyez qu’elle ne prend pas d’anticoagulants et que l’anesthésiste doit être informé de son asthme.",
    ],
    documentGeneration: [
      "Vesalius utilise ce que l’anamnèse et le Scribe ont consigné au sujet des dents de sagesse de Lotte.",
      "Compte rendu de consultation, lettre au dentiste, formulaire de consentement, admission en hôpital de jour, ordonnance, soins postopératoires et certificat, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Lotte reçoit un questionnaire aux jours 1, 3 et 7, puis à trois mois, adapté à l’extraction de ses dents de sagesse.",
      "La douleur, le gonflement et l’ouverture buccale sont comparés aux mesures d’avant l’intervention. Elle raconte aussi comment elle mange, dort, enseigne et reprend le hockey.",
      "Une douleur qui augmente après quelques jours, un nouveau saignement ou un gonflement avec fièvre déclenchent une alerte pour votre équipe, comme chez A. Alveolaris.",
    ],
  },
};

export const MKA_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Lotte Mandibula, 24, ontstoken verstandskies · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Lotte Mandibula, 24, inflamed wisdom tooth · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Lotte Mandibula, 24 ans, dent de sagesse enflammée · étape ${step} sur ${total}`,
};
