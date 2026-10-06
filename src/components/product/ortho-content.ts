import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

/**
 * Module pages, orthopaedics variant (source: sales, "Website-inhoud orthopedie", §7). Step titles stay as in the
 * standard copy; only the bodies follow Mrs Femur. Dutch is the source, English and French are translations.
 */
export const ORTHO_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  nl: {
    smartTriage: [
      'Via intake, chat of telefoon verzamelt Vesalius de klacht: welk gewricht, sinds wanneer, na een val of een ingreep?',
      'Koorts na een prothese krijgt voorrang. Een heupklacht die geleidelijk erger wordt, zoals bij mevrouw Femur, volgt de gewone weg.',
      'Heup naar de heupchirurg, schouder naar de schouderchirurg. Uw team ziet waarom.',
    ],
    agenda: [
      'Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke chirurg.',
      'Koorts na een prothese krijgt het vroegste moment. Een heupklacht die geleidelijk erger wordt, krijgt een gewone plaats als nieuwe patiënt.',
      'Mevrouw Femur heeft haar vragenlijst al ingevuld voor ze binnenkomt. U ziet wie klaar is.',
    ],
    preConsultation: [
      'Mevrouw Femur krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.',
      'Pijn in de lies? Dan volgen vragen over stijfheid, wandelafstand en sokken aantrekken, zoals in een goede heupanamnese.',
      'U opent het consult met haar klachten, eerdere behandelingen en medicatie op een rij.',
    ],
    voiceReception: [
      'Mevrouw Femur belt. De assistent neemt meteen op, ook als het secretariaat bezet is.',
      'Plots of geleidelijk? Na een val? Kan ze nog steunen? Zo wordt de urgentie ingeschat, volgens klinische protocollen.',
      'Een heupklacht die geleidelijk erger wordt, gaat meteen in de agenda van de heupchirurg. Een rode vlag gaat naar uw team.',
    ],
    scribe: [
      'Op uw smartphone of computer, bij het begin van het consult. Leg hem daarna gewoon neer.',
      'Het volgt de anamnese, het onderzoek van de heup en de bespreking van de röntgenfoto, en kent termen als FADIR en Kellgren-Lawrence.',
      'Aan het einde staat de nota klaar in uw eigen structuur: anamnese, klinisch onderzoek, beeldvorming, diagnose en beleid.',
    ],
    medication: [
      'Mevrouw Femur stuurt via de chat een foto van haar medicatielijst. Een doosje of handgeschreven notitie kan ook.',
      'Naam, dosis, vorm en frequentie worden gelezen en gestructureerd, ook de apixaban.',
      'De lijst staat in het dossier, klaar voor de planning van de ingreep.',
    ],
    documentGeneration: [
      'Vesalius gebruikt wat de intake en de Scribe over de heup van mevrouw Femur vastlegden.',
      'Consultatieverslag, brief aan de huisarts, uitleg voor de patiënte en de pre-op checklist, volgens uw sjablonen.',
      'U past aan wat u wilt en zet het in het patiëntendossier.',
    ],
    smartFollowUp: [
      'Na de heupprothese krijgt mevrouw Femur korte check-ins op dag 1, 3, 7 en 14, en de HOOS in week 6, maand 3 en jaar 1.',
      'Haar HOOS-scores worden berekend en vergeleken met haar nulmeting van vóór de ingreep en met het verwachte herstel.',
      'Roodheid aan de wonde, koorts of toenemende pijn? Dan krijgt uw team een signaal, zoals bij K. Patella.',
    ],
  },
  en: {
    smartTriage: [
      'Through intake, chat or phone, Vesalius collects the complaint: which joint, since when, after a fall or an operation?',
      'Fever after a joint replacement takes priority. A hip complaint that slowly gets worse, like Mrs Femur’s, follows the usual route.',
      'Hip to the hip surgeon, shoulder to the shoulder surgeon. Your team can see why.',
    ],
    agenda: [
      'Bookings from intake, triage and the phone assistant come together in each surgeon’s agenda.',
      'Fever after a joint replacement gets the earliest slot. A hip complaint that slowly gets worse gets a regular new-patient slot.',
      'Mrs Femur has already completed her questionnaire before she walks in. You can see who is ready.',
    ],
    preConsultation: [
      'Mrs Femur receives a message and answers when it suits her, in her own language. No app to download.',
      'Groin pain? Then come questions on stiffness, walking distance and putting on socks, as in a good hip history.',
      'You open the consultation with her complaints, previous treatments and medication laid out.',
    ],
    voiceReception: [
      'Mrs Femur calls. The assistant picks up straight away, even when the secretariat is busy.',
      'Sudden or gradual? After a fall? Can she still bear weight? That is how urgency is assessed, following clinical protocols.',
      'A hip complaint that slowly gets worse goes straight into the hip surgeon’s agenda. A red flag goes to your team.',
    ],
    scribe: [
      'On your phone or computer, at the start of the consultation. Then simply put it down.',
      'It follows the history, the hip examination and the discussion of the X-ray, and knows terms such as FADIR and Kellgren-Lawrence.',
      'At the end, the note is ready in your own structure: history, clinical examination, imaging, diagnosis and plan.',
    ],
    medication: [
      'Mrs Femur sends a photo of her medication list in the chat. A box or a handwritten note works too.',
      'Name, dose, form and frequency are read and structured, including the apixaban.',
      'The list is in the record, ready for planning the operation.',
    ],
    documentGeneration: [
      'Vesalius uses what the intake and the Scribe captured about Mrs Femur’s hip.',
      'Consultation report, letter to the GP, an explanation for the patient and the pre-op checklist, following your templates.',
      'You adjust what you want and add it to the patient record.',
    ],
    smartFollowUp: [
      'After her hip replacement, Mrs Femur gets short check-ins on days 1, 3, 7 and 14, and the HOOS at week 6, month 3 and year 1.',
      'Her HOOS scores are calculated and compared with her baseline from before the operation and with the expected recovery.',
      'Redness at the wound, fever or increasing pain? Then your team gets an alert, as with K. Patella.',
    ],
  },
  fr: {
    smartTriage: [
      'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte : quelle articulation, depuis quand, après une chute ou une intervention ?',
      'Une fièvre après une prothèse est prioritaire. Une douleur de hanche qui s’aggrave progressivement, comme chez Mme Femur, suit le circuit habituel.',
      'La hanche au chirurgien de la hanche, l’épaule au chirurgien de l’épaule. Votre équipe voit pourquoi.',
    ],
    agenda: [
      'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque chirurgien.',
      'Une fièvre après une prothèse obtient le premier créneau. Une douleur de hanche qui s’aggrave progressivement obtient une place normale de nouveau patient.',
      'Mme Femur a déjà rempli son questionnaire avant d’entrer. Vous voyez qui est prêt.',
    ],
    preConsultation: [
      'Mme Femur reçoit un message et répond quand cela lui convient, dans sa langue. Aucune application à télécharger.',
      'Une douleur à l’aine ? Suivent alors des questions sur la raideur, le périmètre de marche et l’enfilage des chaussettes, comme dans une bonne anamnèse de hanche.',
      'Vous ouvrez la consultation avec ses plaintes, ses traitements antérieurs et ses médicaments en un coup d’œil.',
    ],
    voiceReception: [
      'Mme Femur appelle. L’assistant décroche immédiatement, même quand le secrétariat est occupé.',
      'Brutal ou progressif ? Après une chute ? Peut-elle encore s’appuyer ? C’est ainsi que l’urgence est évaluée, selon des protocoles cliniques.',
      'Une douleur de hanche qui s’aggrave progressivement va directement dans l’agenda du chirurgien de la hanche. Un signal d’alerte va à votre équipe.',
    ],
    scribe: [
      'Sur votre smartphone ou votre ordinateur, au début de la consultation. Puis posez-le simplement.',
      'Il suit l’anamnèse, l’examen de la hanche et la discussion de la radiographie, et connaît des termes comme FADIR et Kellgren-Lawrence.',
      'À la fin, la note est prête dans votre propre structure : anamnèse, examen clinique, imagerie, diagnostic et plan.',
    ],
    medication: [
      'Mme Femur envoie via le chat une photo de sa liste de médicaments. Une boîte ou une note manuscrite convient aussi.',
      'Nom, dose, forme et fréquence sont lus et structurés, y compris l’apixaban.',
      'La liste est dans le dossier, prête pour la planification de l’intervention.',
    ],
    documentGeneration: [
      'Vesalius utilise ce que l’anamnèse et le Scribe ont consigné sur la hanche de Mme Femur.',
      'Rapport de consultation, lettre au médecin traitant, explication pour la patiente et check-list préopératoire, selon vos modèles.',
      'Vous ajustez ce que vous voulez et l’ajoutez au dossier patient.',
    ],
    smartFollowUp: [
      'Après sa prothèse de hanche, Mme Femur reçoit de courts suivis aux jours 1, 3, 7 et 14, et le HOOS à la semaine 6, au mois 3 et à un an.',
      'Ses scores HOOS sont calculés et comparés à sa mesure de référence d’avant l’intervention et au rétablissement attendu.',
      'Rougeur de la plaie, fièvre ou douleur croissante ? Votre équipe reçoit alors une alerte, comme pour K. Patella.',
    ],
  },
};

/** The line under each mock-up that ties the eight pages together. */
export const ORTHO_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van mevrouw Femur, 67, heupklachten · stap ${step} van ${total}`,
  en: (step, total) => `Example: the journey of Mrs Femur, 67, hip complaints · step ${step} of ${total}`,
  fr: (step, total) => `Exemple : le parcours de Mme Femur, 67 ans, douleurs de hanche · étape ${step} sur ${total}`,
};
