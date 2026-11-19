import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const NEUROLOGY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht: plots of geleidelijk begonnen, gekend of nieuw patroon, bijkomende klachten, hoeveel dagen per maand.",
      "Een donderslaghoofdpijn of nieuwe uitval gaat meteen naar spoed. Een nieuwe hoofdpijn na 50 jaar met pijn bij kauwen krijgt dezelfde dag een plaats. Een gekende aura, zoals bij A. Calcarina, volgt de gewone weg.",
      "Migraine naar de hoofdpijnraadpleging. Een eerste aanval naar de collega epilepsie, een beverige hand naar bewegingsstoornissen, kaakpijn naar de tandarts. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke neuroloog.",
      "Een vermoeden van arteriitis temporalis krijgt dezelfde dag een plaats. Een nieuwe patiënte met chronische migraine krijgt een lang blok, met tijd voor het gesprek over preventie.",
      "Eva heeft haar vragenlijst en hoofdpijndagboek al ingevuld voor ze binnenkomt. U ziet wie klaar is."
    ],
    "preConsultation": [
      "Eva krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.",
      "Hoofdpijn op meer dan de helft van de dagen? Dan volgen vragen over pijnstillers, aura, triggers en eerdere preventie, zoals in een goede hoofdpijnanamnese.",
      "U opent het consult met haar hoofdpijnpatroon, eerdere behandelingen en medicatie op een rij."
    ],
    "voiceReception": [
      "Eva belt. De assistent neemt meteen op, ook als het secretariaat bezet is.",
      "Gekende hoofdpijn of nieuw? Plots begonnen? Koorts, krachtverlies, spraakproblemen? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Gekende migraine gaat in de agenda van de hoofdpijnraadpleging. Een donderslaghoofdpijn gaat meteen naar 112 en uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.",
      "Het volgt de anamnese, het neurologisch onderzoek en het gesprek over preventie, en kent termen als fundoscopie, aura en medicatie-overgebruikshoofdpijn.",
      "Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, aanvullende onderzoeken, diagnose en beleid."
    ],
    "medication": [
      "Eva stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen hoeveel triptanen ze neemt en dat ze een pil met oestrogeen gebruikt."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake en de Scribe over de migraine van Eva vastlegden, ook de eerdere preventieve behandelingen.",
      "Consultatieverslag, brief aan de huisarts, voorschrift, aanvraag terugbetaling en afbouwschema, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier."
    ],
    "smartFollowUp": [
      "Eva krijgt een vragenlijst in week 2 en 4 en in maand 3, 6 en 12, afgestemd op de afbouw en de CGRP-antistof.",
      "Haar migrainedagen, HIT-6 en MIDAS worden vergeleken met haar nulmeting van vóór het consult. Daarnaast vertelt ze hoe het gaat met slapen, werken en lopen.",
      "Een plotse, zeer hevige hoofdpijn, een andere aura of een hardnekkige bijwerking? Dan krijgt uw team een signaal, zoals bij V. Vagus."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius asks about sudden or gradual onset, an established or new pattern, associated symptoms and days affected each month.",
      "Thunderclap headache or new neurological symptoms go straight to emergency care. New headache after 50 with jaw pain on chewing gets a same-day appointment. Established aura, as in A. Calcarina’s case, follows the usual route.",
      "Migraine goes to the headache clinic, a first seizure to epilepsy, a tremulous hand to movement disorders, and jaw pain to the dentist. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each neurologist’s diary.",
      "Suspected temporal arteritis gets a same-day appointment. A new patient with chronic migraine gets a longer slot with time to discuss prevention.",
      "Eva has already completed her questionnaire and headache diary. You can see who is ready."
    ],
    "preConsultation": [
      "Eva receives a message and replies when it suits her, in her own language. There’s no app to download.",
      "Headache on more than half the days prompts questions about acute medication, aura, triggers and previous prevention, as in a headache history.",
      "You start the consultation with her headache pattern, previous treatments and medication in view."
    ],
    "voiceReception": [
      "Eva calls. The assistant answers straight away, even when reception is busy.",
      "Established headache or new? Sudden onset? Fever, weakness or speech problems? The assistant assesses urgency using clinical protocols.",
      "Established migraine goes into the headache clinic diary. Thunderclap headache is directed immediately to 112 and your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the consultation, then set it down.",
      "Vesalius follows the history, neurological examination and prevention discussion. It recognises terms such as fundoscopy, aura and medication-overuse headache.",
      "The note follows your structure: history, clinical examination, investigations, diagnosis and plan."
    ],
    "medication": [
      "Eva sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list and asks her to confirm it.",
      "The confirmed list is in the record. You see her triptan use and that she takes a pill containing oestrogen."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake and Scribe recorded about Eva’s migraine, including previous preventive treatments.",
      "Consultation report, letter to the GP, prescription, reimbursement application and medication reduction plan, using your templates.",
      "Make any edits you need and add the documents to the patient record."
    ],
    "smartFollowUp": [
      "Eva receives questionnaires at weeks 2 and 4 and months 3, 6 and 12, tailored to reducing acute medication and starting a CGRP antibody.",
      "Her migraine days, HIT-6 and MIDAS are compared with baseline. She also describes sleep, work and running.",
      "Sudden severe headache, a changed aura or a persistent adverse effect triggers an alert, as in V. Vagus’s case."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille le début soudain ou progressif, le caractère connu ou nouveau, les symptômes associés et les jours touchés par mois.",
      "Une céphalée en coup de tonnerre ou un nouveau déficit va aux urgences. Une nouvelle céphalée après 50 ans avec douleur à la mastication est vue le jour même. Une aura habituelle, comme chez A. Calcarina, suit le parcours normal.",
      "Une migraine va en consultation de céphalées, une première crise en épilepsie, une main tremblante en troubles du mouvement et une douleur de mâchoire chez le dentiste. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque neurologue.",
      "Une suspicion d’artérite temporale est vue le jour même. Une nouvelle patiente migraineuse chronique bénéficie d’un créneau long pour discuter de prévention.",
      "Eva a déjà rempli son questionnaire et son journal de céphalées. Vous voyez qui est prêt."
    ],
    "preConsultation": [
      "Eva reçoit un message et répond quand elle le souhaite, dans sa langue. Aucune application à télécharger.",
      "Des céphalées plus de la moitié des jours entraînent des questions sur les médicaments aigus, l’aura, les déclencheurs et la prévention antérieure.",
      "Vous commencez avec son profil de céphalées, les traitements précédents et ses médicaments sous les yeux."
    ],
    "voiceReception": [
      "Eva appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.",
      "Céphalée connue ou nouvelle ? Début soudain ? Fièvre, faiblesse ou troubles de parole ? L’urgence est évaluée selon les protocoles cliniques.",
      "Une migraine connue est inscrite en consultation de céphalées. Une céphalée en coup de tonnerre est orientée immédiatement vers le 112 et votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la consultation, puis posez l’appareil.",
      "Vesalius suit l’anamnèse, l’examen neurologique et la prévention. Il reconnaît fond d’œil, aura et céphalée par abus médicamenteux.",
      "La note suit votre structure : anamnèse, examen clinique, examens complémentaires, diagnostic et conduite à tenir."
    ],
    "medication": [
      "Eva envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande confirmation.",
      "La liste confirmée figure dans le dossier. Vous voyez sa consommation de triptans et la pilule contenant des œstrogènes."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse et le Scribe ont consigné sur la migraine d’Eva, y compris les préventions antérieures.",
      "Compte rendu, lettre au médecin traitant, ordonnance, demande de remboursement et schéma de réduction, selon vos modèles.",
      "Vous modifiez les documents et les versez au dossier patient."
    ],
    "smartFollowUp": [
      "Eva reçoit un questionnaire aux semaines 2 et 4 et aux mois 3, 6 et 12, adapté à la réduction des médicaments aigus et à l’anticorps anti-CGRP.",
      "Ses jours de migraine, HIT-6 et MIDAS sont comparés au bilan initial. Elle décrit aussi le sommeil, le travail et la course.",
      "Une céphalée soudaine et très intense, une aura différente ou un effet indésirable persistant déclenchent une alerte, comme chez V. Vagus."
    ]
  }
};

export const NEUROLOGY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Eva Trigeminus, 34, chronische migraine · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Eva Trigeminus, 34, chronic migraine · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Eva Trigeminus, 34 ans, migraine chronique · étape ${step} sur ${total}`,
};
