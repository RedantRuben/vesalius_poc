import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const PAIN_CLINIC_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: waar, sinds wanneer, wat al geprobeerd werd en hoe lang het hielp, welke pijnstillers.",
      "Plasproblemen of krachtverlies gaan meteen naar uw team. Een vermoeden van CRPS of pijn na zona krijgt voorrang.",
      "Chronisch: een uur. Niet chronisch: een halfuur. Een gekende patiënt met een indicatie die u al stelde: vijf minuten. Wijdverspreide pijn gaat naar fysische geneeskunde. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke algoloog, de ingreepzaal inbegrepen.",
      "Een rode vlag gaat meteen naar uw team. Een vermoeden van CRPS krijgt het eerste vrije moment. Elke afspraak krijgt de duur die bij haar type past: 60, 30 of 5 minuten.",
      "Ingrid heeft haar uitgebreide intake al ingevuld voor ze binnenkomt. Bij een inspuiting is de korte check al gebeurd: geen bloedverdunners, geen koorts, geen nieuwe klachten."
    ],
    "preConsultation": [
      "Ingrid krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal en in haar eigen tempo. Geen app te downloaden.",
      "Ze vertelt haar verhaal; de assistent vraagt door naar wat al geprobeerd werd, hoe lang het hielp, hoe ze slaapt, werkt en zich voelt. Zoals in een goede pijnanamnese.",
      "U opent het consult met drie jaar pijnhistoriek op een tijdlijn, haar medicatie en haar vragenlijsten op een rij."
    ],
    "voiceReception": [
      "Ingrid belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Hoe lang al? Wat al geprobeerd? Plasproblemen of krachtverlies? Dezelfde triage als online, volgens de afspraken van uw centrum.",
      "De assistent boekt de afspraak met de juiste duur in en stuurt de intake, of schakelt door naar de juiste persoon in uw team, met de samenvatting erbij."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt het gesprek over verwachtingen en angsten, het onderzoek en de bespreking van de opties, en kent termen als Lasègue, facetinfiltratie, PCS en morfine-equivalenten.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, medicatie, onderzoek, vragenlijsten, diagnose en beleid."
    ],
    "medication": [
      "Ingrid stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen haar opioïddosis, het slaapmiddel dat ze zelf vergat, en dat ze geen bloedverdunners neemt."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de uitgebreide intake en de Scribe over Ingrid vastlegden: haar pijnhistoriek, medicatie, vragenlijsten en het plan.",
      "Consultatieverslag, brief aan de huisarts, verwijzing naar het programma, afbouwschema en de brief voor de arbeidsarts, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Ingrid krijgt een vragenlijst op maand 1, 3, 6 en 12, afgestemd op haar multidisciplinaire programma en de afbouw van haar medicatie.",
      "Haar pijn, interferentie, catastroferen en zelfvertrouwen worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met slapen, werken en wandelen met de hond.",
      "Plasproblemen, koorts na een procedure of een ontstoken wonde bij een neurostimulator? Dan krijgt uw team een signaal, zoals bij G. Ganglion."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius collects the site and duration of pain, previous treatments and how long they helped, and painkillers.",
      "Bladder problems or loss of strength are flagged to your team immediately. Suspected CRPS or pain after shingles receives priority.",
      "Chronic pain: one hour. Recent pain: half an hour. An established patient with an indication you have already confirmed: five minutes. Widespread pain goes to physical medicine. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each pain physician’s diary, including the procedure room.",
      "A red flag is passed to your team immediately. Suspected CRPS gets the first available appointment. Each type gets the right duration: 60, 30 or 5 minutes.",
      "Ingrid has completed her extended intake. Before an injection, the short safety check is done: no blood thinners, fever or new symptoms."
    ],
    "preConsultation": [
      "Ingrid receives a message and replies when it suits her, in her own language and at her own pace. There’s no app to download.",
      "She tells her story; the assistant asks about previous treatments, duration of benefit, sleep, work and feelings, as in a pain history.",
      "You start the consultation with three years of pain history on a timeline, her medication and questionnaires in view."
    ],
    "voiceReception": [
      "Ingrid calls. The assistant answers straight away, even when reception is busy.",
      "How long? What has she tried? Bladder problems or loss of strength? The same triage as online, following your centre’s arrangements.",
      "The assistant books the right duration and sends the intake, or transfers the call to the right person in your team with a summary."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the discussion of expectations and fears, examination and options. It recognises terms such as straight leg raise, facet injection, PCS and morphine equivalents.",
      "The note follows your structure: history, medication, examination, questionnaires, diagnosis and plan."
    ],
    "medication": [
      "Ingrid sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list and asks her to confirm it.",
      "The confirmed list is in the record. You see the opioid dose, the sleeping tablet she forgot and that she takes no blood thinners."
    ],
    "documentGeneration": [
      "Vesalius uses what the extended intake and Scribe recorded: Ingrid’s pain history, medication, questionnaires and plan.",
      "Consultation report, letter to the GP, programme referral, tapering schedule and occupational physician letter, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Ingrid receives questionnaires at months 1, 3, 6 and 12, tailored to her multidisciplinary programme and medication taper.",
      "Pain, interference, catastrophising and self-efficacy are compared with baseline. She also describes sleep, work and walking the dog.",
      "Bladder problems, fever after a procedure or an inflamed neurostimulator wound triggers an alert, as in G. Ganglion’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille le siège, la durée, les traitements essayés et leur durée d’effet, ainsi que les antalgiques.",
      "Des troubles urinaires ou une perte de force sont signalés immédiatement à votre équipe. Une suspicion de SDRC ou une douleur post-zostérienne est prioritaire.",
      "Chronique : une heure. Non chronique : trente minutes. Patient connu avec indication déjà posée par vous : cinq minutes. Une douleur diffuse va en médecine physique. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque algologue, salle d’intervention comprise.",
      "Un signe d’alerte est transmis immédiatement. Une suspicion de SDRC reçoit le premier créneau. Chaque type dispose de la bonne durée : 60, 30 ou 5 minutes.",
      "Ingrid a rempli son anamnèse approfondie. Avant une infiltration, la courte vérification est faite : aucun anticoagulant, fièvre ou nouveau symptôme."
    ],
    "preConsultation": [
      "Ingrid reçoit un message et répond quand elle le souhaite, dans sa langue et à son rythme. Aucune application à télécharger.",
      "Elle raconte son histoire ; l’assistant précise les traitements, leur effet, son sommeil, son travail et son ressenti, comme dans une anamnèse de la douleur.",
      "Vous commencez avec trois ans d’histoire sur une frise, ses médicaments et ses questionnaires sous les yeux."
    ],
    "voiceReception": [
      "Ingrid appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Depuis quand ? Quels traitements ? Troubles urinaires ou perte de force ? Le même triage qu’en ligne, selon les accords de votre centre.",
      "L’assistant réserve la bonne durée et envoie l’anamnèse, ou transfère à la bonne personne de votre équipe avec une synthèse."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit les attentes, les craintes, l’examen et les options. Il reconnaît Lasègue, infiltration facettaire, PCS et équivalents morphiniques.",
      "La note suit votre structure : anamnèse, médicaments, examen, questionnaires, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Ingrid envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande confirmation.",
      "La liste confirmée figure dans le dossier. Vous voyez la dose d’opioïde, le somnifère oublié et l’absence d’anticoagulants."
    ],
    "documentGeneration": [
      "Vesalius reprend l’histoire de la douleur, les médicaments, questionnaires et le plan consignés par l’anamnèse approfondie et le Scribe.",
      "Compte rendu, lettre au médecin traitant, orientation vers le programme, schéma de diminution et lettre au médecin du travail, selon vos modèles.",
      "Vous modifiez les documents et les versez au dossier patient."
    ],
    "smartFollowUp": [
      "Ingrid reçoit un questionnaire aux mois 1, 3, 6 et 12, adapté au programme multidisciplinaire et à la diminution médicamenteuse.",
      "Douleur, retentissement, catastrophisme et confiance sont comparés au bilan initial. Elle décrit aussi le sommeil, le travail et les promenades avec le chien.",
      "Troubles urinaires, fièvre après une intervention ou plaie inflammatoire du neurostimulateur déclenchent une alerte, comme chez G. Ganglion."
    ]
  }
};

export const PAIN_CLINIC_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Ingrid Sacrum, 48, chronische lage rugpijn · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Ingrid Sacrum, 48, chronic low back pain · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Ingrid Sacrum, 48 ans, lombalgie chronique · étape ${step} sur ${total}`,
};
