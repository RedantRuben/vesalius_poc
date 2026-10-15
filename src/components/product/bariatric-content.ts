import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';
import { ORTHO_STEPS } from './ortho-content';

/**
 * Module pages, bariatric surgery variant (source: sales, "Website-inhoud bariatrie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Mia Fundus. Dutch is the source, English and French are translations.
 */
export const BARIATRIC_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius lengte, gewicht, comorbiditeit, eerdere pogingen en eerdere ingrepen.',
      'Buikpijn of braken na een bariatrische ingreep krijgt voorrang. Een nieuwe aanmelding zoals Mia volgt de gewone weg.',
      'Een indicatie voor chirurgie naar het bariatrisch traject. Zonder comorbiditeit naar het medisch obesitasprogramma. Na een eerdere ingreep naar de revisiechirurg. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van chirurg, diëtist, psycholoog en endocrinoloog.',
      'Buikpijn na een bypass krijgt het vroegste moment. Afspraken van één traject worden gebundeld, zodat Mia niet vijf keer apart moet komen.',
      'Mia heeft haar intake en de vragenlijst van de diëtist al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Mia krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.',
      'Eerst de vragen die het hele team nodig heeft: gewichtsverloop, eerdere pogingen, comorbiditeit, medicatie. Daarna een korte vragenlijst per discipline.',
      'Chirurg, diëtist, psycholoog en endocrinoloog openen hetzelfde dossier. Niemand stelt dezelfde vraag twee keer.',
    ],
    voiceReception: [
      'Mia belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Lengte en gewicht, comorbiditeit, een eerdere ingreep? Na een ingreep ook: buikpijn, braken, kan u drinken? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Een nieuwe aanmelding gaat meteen naar de infosessie en krijgt de intake. Buikpijn na een bypass gaat naar uw team.',
    ],
    scribe: [
      ORTHO_STEPS.nl.scribe[0],
      'Het volgt de bespreking van het MDO-advies, het klinisch onderzoek en de keuze van de ingreep, en kent termen als Roux-en-Y, hiatushernia en %TWL.',
      'Aan het einde staat de nota klaar in uw eigen structuur, met de bevindingen van diëtist, psycholoog en endocrinoloog erbij.',
    ],
    medication: [
      'Mia stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.',
      'De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.',
      'De bevestigde lijst staat in het dossier van het hele team. De chirurg ziet wat vóór de ingreep moet stoppen, de endocrinoloog ziet de diabetesmedicatie die na de ingreep afgebouwd wordt.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake, de vragenlijsten per discipline en de Scribe over het traject van Mia vastlegden.',
      'MDO-verslag, brief aan de huisarts, voorschriften, uitleg over de voorbereiding en het attest, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Mia krijgt vragenlijsten op dag 2, week 1, 4 en 6, maand 3, 6 en 12, en daarna elk jaar, afgestemd op haar bypass.',
      'Haar gewicht en levenskwaliteit worden vergeleken met haar nulmeting van vóór de ingreep. Daarnaast vertelt ze hoe het gaat met eten, slapen, werken en zingen.',
      'Buikpijn, braken of niet kunnen drinken na een ingreep? Dan krijgt uw team een signaal, zoals bij J. Jejunum. Haarverlies of vragen over voeding gaan naar de diëtist.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects height, weight, comorbidity, previous attempts and previous operations.',
      'Abdominal pain or vomiting after bariatric surgery gets priority. A new referral like Mia follows the usual route.',
      'An indication for surgery to the bariatric pathway. Without comorbidity to the medical obesity programme. After previous surgery to the revision surgeon. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in the agendas of the surgeon, dietitian, psychologist and endocrinologist.',
      'Abdominal pain after a bypass gets the earliest slot. Appointments in one pathway are grouped, so Mia does not have to come in five separate times.',
      'Mia has already completed her intake and the dietitian’s questionnaire before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Mia receives a message and answers when it suits her, in her own language. No app to download.',
      'First the questions the whole team needs: weight history, previous attempts, comorbidity, medication. Then a short questionnaire per discipline.',
      'Surgeon, dietitian, psychologist and endocrinologist open the same record. Nobody asks the same question twice.',
    ],
    voiceReception: [
      'Mia calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Height and weight, comorbidity, previous surgery? After surgery also: abdominal pain, vomiting, can you drink? That is how urgency is assessed, following clinical protocols.',
      'A new referral goes straight to the information session and receives the intake. Abdominal pain after a bypass goes to your team.',
    ],
    scribe: [
      ORTHO_STEPS.en.scribe[0],
      'It follows the discussion of the MDT advice, the clinical examination and the choice of operation, and knows terms such as Roux-en-Y, hiatus hernia and %TWL.',
      'At the end, the note is ready in your own structure, with the findings of the dietitian, psychologist and endocrinologist included.',
    ],
    medication: [
      'Mia sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.',
      'The assistant reads the name, active substance, strength, form and frequency, shows the list in the chat and asks whether it is correct.',
      'The confirmed list is in the record for the whole team. The surgeon sees what must stop before surgery, the endocrinologist sees the diabetes medication that will be reduced afterwards.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake, the questionnaires per discipline and the Scribe captured about Mia’s pathway.',
      'MDT report, letter to the GP, prescriptions, explanation of how to prepare and the certificate, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'Mia gets questionnaires on day 2, at weeks 1, 4 and 6, months 3, 6 and 12, and every year after that, matched to her bypass.',
      'Her weight and quality of life are compared with her baseline from before surgery. She also tells you how eating, sleep, work and singing are going.',
      'Abdominal pain, vomiting or unable to drink after surgery? Then your team gets an alert, as with J. Jejunum. Hair loss or questions about food go to the dietitian.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la taille, le poids, les comorbidités, les tentatives et les interventions antérieures.',
      'Une douleur abdominale ou des vomissements après une chirurgie bariatrique sont prioritaires. Une nouvelle inscription comme celle de Mia suit le circuit habituel.',
      'Une indication chirurgicale vers le parcours bariatrique. Sans comorbidité vers le programme médical de l’obésité. Après une intervention antérieure vers le chirurgien de révision. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda du chirurgien, du diététicien, du psychologue et de l’endocrinologue.',
      'Une douleur abdominale après un bypass obtient le créneau le plus proche. Les rendez-vous d’un même parcours sont regroupés, pour que Mia ne doive pas venir cinq fois séparément.',
      'Mia a déjà rempli son anamnèse et le questionnaire du diététicien avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Mia reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'D’abord les questions dont toute l’équipe a besoin : évolution du poids, tentatives antérieures, comorbidités, médicaments. Ensuite un court questionnaire par discipline.',
      'Chirurgien, diététicien, psychologue et endocrinologue ouvrent le même dossier. Personne ne pose deux fois la même question.',
    ],
    voiceReception: [
      'Mia appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Taille et poids, comorbidités, une intervention antérieure ? Après une intervention aussi : douleur abdominale, vomissements, pouvez-vous boire ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une nouvelle inscription va directement à la séance d’information et reçoit l’anamnèse. Une douleur abdominale après un bypass va à votre équipe.',
    ],
    scribe: [
      ORTHO_STEPS.fr.scribe[0],
      'Il suit la discussion de l’avis de la RCP, l’examen clinique et le choix de l’intervention, et connaît des termes comme Roux-en-Y, hernie hiatale et %TWL.',
      'À la fin, la note est prête dans votre propre structure, avec les constatations du diététicien, du psychologue et de l’endocrinologue.',
    ],
    medication: [
      'Mia envoie dans le chat une photo du schéma de médication de sa pharmacie, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.',
      'L’assistant lit le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste dans le chat et demande si elle est correcte.',
      'La liste confirmée est dans le dossier de toute l’équipe. Le chirurgien voit ce qui doit être arrêté avant l’intervention, l’endocrinologue voit les antidiabétiques qui seront réduits ensuite.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse, les questionnaires par discipline et le Scribe ont consigné sur le parcours de Mia.',
      'Rapport de RCP, lettre au médecin traitant, prescriptions, explication de la préparation et certificat, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Mia reçoit des questionnaires au jour 2, aux semaines 1, 4 et 6, aux mois 3, 6 et 12, puis chaque année, adaptés à son bypass.',
      'Son poids et sa qualité de vie sont comparés à sa mesure de référence d’avant l’intervention. Elle raconte aussi comment se passent l’alimentation, le sommeil, le travail et le chant.',
      'Douleur abdominale, vomissements ou impossible de boire après une intervention ? Votre équipe reçoit alors une alerte, comme pour J. Jejunum. Une chute de cheveux ou des questions sur l’alimentation vont au diététicien.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const BARIATRIC_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Mia Fundus, 44, obesitas met diabetes · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Mia Fundus, 44, obesity with diabetes · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Mia Fundus, 44 ans, obésité avec diabète · étape ${step} sur ${total}`,
};
