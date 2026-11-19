import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const PODIATRY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: waar in de voet, startpijn of pijn bij elke stap, tintelingen, diabetes, een wonde?",
      "Een wonde of rode, warme voet bij diabetes krijgt dezelfde dag aandacht. Een likdoorn, zoals bij K. Clavus, volgt de gewone weg.",
      "Hielpijn met startpijn naar de podoloog. Een vermoeden van stressfractuur of een zenuwprobleem eerst naar de huisarts. Uw team ziet waarom.",
    ],
    agenda: [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke podoloog.",
      "Een wonde bij diabetes krijgt het vroegste moment. Een nieuwe patiënt met hielpijn krijgt een lang blok voor de loopanalyse.",
      "Sara heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.",
    ],
    preConsultation: [
      "Sara krijgt een bericht en antwoordt wanneer het haar past, na haar dienst, in haar eigen taal. Geen app te downloaden.",
      "Startpijn onder de hiel? Dan volgen vragen over loopvolume, schoenen, werkuren en tintelingen, zoals in een goede podologische anamnese.",
      "U opent het consult met haar klachten, schoenen, eerdere behandelingen en medicatie op een rij.",
    ],
    voiceReception: [
      "Sara belt tijdens haar pauze. De assistent neemt meteen op, ook als het secretariaat bezet is of de podoloog aan het werk is.",
      "Startpijn of pijn bij elke stap? Diabetes? Een wonde of rode, warme voet? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Hielpijn met startpijn gaat meteen in de agenda voor biomechanica. Een wonde bij diabetes gaat naar uw team.",
    ],
    scribe: [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het voet- en looponderzoek en het schoenadvies, en kent termen als windlass-test, Foot Posture Index en navicular drop.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, statisch en dynamisch onderzoek, schoeisel, conclusie en behandelplan.",
    ],
    medication: [
      "Sara stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat ze al maanden dagelijks ibuprofen neemt, geen bloedverdunners heeft en niet tegen gewone tape kan.",
    ],
    documentGeneration: [
      "Vesalius gebruikt wat de intake en de Scribe over de voet van Sara vastlegden.",
      "Consultatieverslag, verslag aan de huisarts, zolenfiche, oefenschema en attest voor de mutualiteit, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier.",
    ],
    smartFollowUp: [
      "Sara krijgt een vragenlijst in week 2, week 6, maand 3 en maand 6, afgestemd op haar steunzolen en oefeningen.",
      "Haar FFI en pijnscores worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met werken, lopen en wandelen met de hond.",
      "Roodheid en koorts na een nagelingreep, of een nieuwe wonde bij diabetes? Dan krijgt uw team een signaal, zoals bij O. Unguis.",
    ],
  },
  en: {
    smartTriage: [
      "Through intake, chat or phone, Vesalius asks where the foot hurts, whether it is worse on the first steps or on every step, and whether there is tingling, diabetes or a wound.",
      "A wound or a red, warm foot in a person with diabetes gets attention the same day. A corn, as in K. Clavus’s case, follows the usual route.",
      "Heel pain on the first steps goes to the podiatrist. A suspected stress fracture or nerve problem goes to the GP first. Your team can see why.",
    ],
    agenda: [
      "Bookings from intake, triage and the phone assistant come together in each podiatrist’s diary.",
      "A wound in a person with diabetes gets the earliest appointment. A new patient with heel pain gets a longer slot for gait analysis.",
      "Sara has already completed her questionnaire when she arrives. You can see who is ready.",
    ],
    preConsultation: [
      "Sara receives a message and replies in her own language whenever it suits her, after her shift. There’s no app to download.",
      "Heel pain on the first steps prompts questions about running mileage, footwear, work hours and tingling, as in a podiatry assessment.",
      "You start the consultation with her symptoms, footwear, previous treatments and medication in view.",
    ],
    voiceReception: [
      "Sara calls during her break. The assistant answers straight away, even if reception is busy or the podiatrist is with a patient.",
      "Does it hurt on the first steps or every step? Diabetes? A wound or a red, warm foot? The assistant assesses urgency using clinical protocols.",
      "Heel pain on the first steps goes straight into the biomechanics diary. A wound in a person with diabetes is flagged to your team.",
    ],
    scribe: [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, foot and gait assessment and footwear advice. It recognises terms such as windlass test, Foot Posture Index and navicular drop.",
      "The note is ready in your own structure: history, static and dynamic assessment, footwear, conclusion and treatment plan.",
    ],
    medication: [
      "Sara sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. She can also send a prescription, a box or a PDF.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks her to confirm it.",
      "The confirmed list is in the record. You can see her regular ibuprofen use, that she takes no blood thinners, and that she reacts to ordinary adhesive tape.",
    ],
    documentGeneration: [
      "Vesalius uses what the intake and Scribe recorded about Sara’s foot.",
      "Consultation report, report to the GP, orthotics specification, exercise plan and health insurer certificate, using your templates.",
      "Make any edits you need and add the documents to the patient record.",
    ],
    smartFollowUp: [
      "Sara receives questionnaires at weeks 2 and 6 and months 3 and 6, tailored to her orthoses and exercises.",
      "Her FFI and pain scores are compared with her baseline before the consultation. She also describes how she is getting on with work, running and walking the dog.",
      "Redness and fever after a nail procedure, or a new wound in someone with diabetes, triggers an alert for your team, as in O. Unguis’s case.",
    ],
  },
  fr: {
    smartTriage: [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius demande où le pied fait mal, si la douleur survient aux premiers pas ou à chaque pas, et s’il y a des picotements, un diabète ou une plaie.",
      "Une plaie ou un pied rouge et chaud chez une personne diabétique est signalé le jour même. Un cor, comme chez K. Clavus, suit le parcours habituel.",
      "Une douleur du talon aux premiers pas est orientée vers le podologue. Une suspicion de fracture de fatigue ou d’atteinte nerveuse est d’abord adressée au médecin traitant. Votre équipe voit le motif.",
    ],
    agenda: [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque podologue.",
      "Une plaie chez une personne diabétique obtient le premier créneau. Une nouvelle patiente avec une douleur du talon bénéficie d’un créneau plus long pour l’analyse de la marche.",
      "Sara a déjà rempli son questionnaire à son arrivée. Vous voyez qui est prêt.",
    ],
    preConsultation: [
      "Sara reçoit un message et répond quand elle le souhaite après son service, dans sa langue. Aucune application à télécharger.",
      "En cas de douleur du talon aux premiers pas, l’assistant pose des questions sur le volume de course, les chaussures, les heures de travail et les picotements.",
      "Vous commencez la consultation avec ses plaintes, ses chaussures, les traitements précédents et ses médicaments sous les yeux.",
    ],
    voiceReception: [
      "Sara appelle pendant sa pause. L’assistant décroche immédiatement, même quand le secrétariat est occupé ou que le podologue est en consultation.",
      "Douleur aux premiers pas ou à chaque pas ? Diabète ? Plaie ou pied rouge et chaud ? L’assistant évalue l’urgence selon les protocoles cliniques.",
      "La douleur du talon aux premiers pas est inscrite directement dans l’agenda de biomécanique. Une plaie chez une personne diabétique est signalée à votre équipe.",
    ],
    scribe: [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen du pied et de la marche et les conseils de chaussage. Il reconnaît des termes comme test de Windlass, Foot Posture Index et navicular drop.",
      "La note est prête dans votre structure : anamnèse, examen statique et dynamique, chaussage, conclusion et plan de traitement.",
    ],
    medication: [
      "Sara envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande à Sara de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez qu’elle prend régulièrement de l’ibuprofène, qu’elle ne prend aucun anticoagulant et qu’elle réagit aux adhésifs ordinaires.",
    ],
    documentGeneration: [
      "Vesalius reprend ce que l’anamnèse et le Scribe ont consigné sur le pied de Sara.",
      "Compte rendu de consultation, rapport au médecin traitant, fiche des semelles, programme d’exercices et attestation pour la mutualité, selon vos modèles.",
      "Vous apportez les modifications souhaitées et versez les documents au dossier patient.",
    ],
    smartFollowUp: [
      "Sara reçoit un questionnaire aux semaines 2 et 6 et aux mois 3 et 6, adapté à ses semelles et à ses exercices.",
      "Son FFI et ses scores de douleur sont comparés aux mesures d’avant la consultation. Elle raconte aussi comment se passent le travail, la course et les promenades avec son chien.",
      "Une rougeur et de la fièvre après une intervention sur un ongle, ou une nouvelle plaie chez une personne diabétique, déclenchent une alerte, comme chez O. Unguis.",
    ],
  },
};

export const PODIATRY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Sara Calcaneus, 46, hielpijn · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Sara Calcaneus, 46, heel pain · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Sara Calcaneus, 46 ans, douleur du talon · étape ${step} sur ${total}`,
};
