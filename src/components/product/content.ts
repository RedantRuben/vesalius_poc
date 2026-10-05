import type { ModuleKey } from '@/lib/modules';

export type SiteLocale = 'en' | 'nl' | 'fr';

type Item = { title: string; body: string };

export interface ModuleCopy {
  headline: string;
  description: string;
  without: string;
  with: string;
  steps: [Item, Item, Item];
}

export const UI = {
  en: {
    without: 'Without Vesalius',
    with: 'With Vesalius',
    howItWorks: 'How it works',
    next: 'Next in the journey',
    previous: 'Previous',
    exampleData: 'Example data',
    replay: 'Replay',
    primaryCta: 'Create your assistant',
    secondaryCta: 'Request a demo',
    keyboardHint: 'Use ← → to browse modules',
    modulesNav: 'Vesalius modules',
    ofTotal: 'of',
  },
  nl: {
    without: 'Zonder Vesalius',
    with: 'Met Vesalius',
    howItWorks: 'Zo werkt het',
    next: 'Volgende in het traject',
    previous: 'Vorige',
    exampleData: 'Voorbeelddata',
    replay: 'Opnieuw',
    primaryCta: 'Maak uw assistent aan',
    secondaryCta: 'Vraag een demo aan',
    keyboardHint: 'Gebruik ← → om te bladeren',
    modulesNav: 'Vesalius-modules',
    ofTotal: 'van',
  },
  fr: {
    without: 'Sans Vesalius',
    with: 'Avec Vesalius',
    howItWorks: 'Comment ça marche',
    next: 'Suite du parcours',
    previous: 'Précédent',
    exampleData: 'Données d’exemple',
    replay: 'Rejouer',
    primaryCta: 'Créez votre assistant',
    secondaryCta: 'Demander une démo',
    keyboardHint: 'Utilisez ← → pour naviguer',
    modulesNav: 'Modules Vesalius',
    ofTotal: 'sur',
  },
} as const;

export type UiCopy = (typeof UI)[SiteLocale];

export const MODULE_COPY: Record<SiteLocale, Record<ModuleKey, ModuleCopy>> = {
  en: {
    smartTriage: {
      headline: 'The right patient, first.',
      description: 'Intelligent urgency assessment that prioritizes patients based on clinical need, so the right patient sees the right doctor at the right time.',
      without: 'Everyone waits in the same queue. Critical cases can be delayed while routine questions take up the slots.',
      with: 'Urgent cases are planned first, routine questions go where they belong and waiting times drop.',
      steps: [
        { title: 'Symptoms come in', body: 'Through intake, chat or phone, Vesalius collects the complaint and the relevant history.' },
        { title: 'Urgency is assessed', body: 'Symptoms, history and risk factors are weighed into a clinical urgency level.' },
        { title: 'Routed to the right care', body: 'Emergency, specialist, GP or self-care advice, and your team can see why.' },
      ],
    },
    agenda: {
      headline: 'A calm day, planned for you.',
      description: 'Intelligently manage appointments and optimise your schedule based on individual patient needs.',
      without: 'Manual scheduling, no-shows, overlaps and unexpected gaps. The stress starts before the first patient arrives.',
      with: 'One organised overview of your day, with priorities respected and the preparation already done.',
      steps: [
        { title: 'Requests land in one place', body: 'Bookings from intake, triage and the phone assistant arrive in a single agenda.' },
        { title: 'Priorities are respected', body: 'Cases flagged as urgent by Smart Triage get the earliest suitable slot.' },
        { title: 'Every visit is prepared', body: 'Appointments link to the pre-consultation, so you see who is ready.' },
      ],
    },
    preConsultation: {
      headline: 'Meet your patient before they walk in.',
      description: 'An intelligent intake over WhatsApp gathers the patient’s history before the appointment and structures it for your review.',
      without: 'You walk in blind, spend the first minutes on basic questions and work around language barriers.',
      with: 'You start with a structured summary of the complaint and the history, in your own language.',
      steps: [
        { title: 'An invite on WhatsApp', body: 'No app to download. The patient answers when it suits them, in their own language.' },
        { title: 'A real conversation', body: 'Vesalius asks follow-up questions based on each answer, like a good intake would.' },
        { title: 'A summary in the record', body: 'You open the consultation with a clear overview of complaints and history.' },
      ],
    },
    voiceReception: {
      headline: 'Every call answered. None put on hold.',
      description: 'An AI phone assistant that answers patient calls, asks the right questions to assess urgency and books directly in your agenda.',
      without: 'The phone keeps ringing. Routine bookings crowd the line while urgent callers wait on hold.',
      with: 'Routine calls are handled and booked, urgent ones reach the right person and the front desk can breathe.',
      steps: [
        { title: 'The call is answered', body: 'The assistant picks up immediately. No waiting line.' },
        { title: 'The right questions', body: 'It asks what matters to assess urgency, following clinical protocols.' },
        { title: 'Booked or routed', body: 'Routine requests go straight into your agenda. Urgent or complex calls go to your team.' },
      ],
    },
    scribe: {
      headline: 'Look at your patient. Not at your screen.',
      description: 'Vesalius Scribe listens in the background and turns your natural conversation into a structured clinical note.',
      without: 'You type while you listen, look at the screen instead of the patient and finish notes after hours.',
      with: 'You keep eye contact. When the patient leaves, the note is ready for your review.',
      steps: [
        { title: 'Tap record', body: 'On your phone or your computer. Then put it down.' },
        { title: 'Vesalius listens', body: 'It follows the conversation, tells doctor and patient apart and knows medical terms.' },
        { title: 'A note to review', body: 'At the end, a structured clinical note is waiting for you.' },
      ],
    },
    medication: {
      headline: 'One photo. The whole medication list.',
      description: 'Snap a photo of a medication box, a printed list or handwritten notes. Vesalius extracts the details into a structured list.',
      without: 'Retyping medication from boxes, printed lists and handwriting. Slow, and easy to get wrong.',
      with: 'One photo becomes a structured medication list in the record, without retyping.',
      steps: [
        { title: 'Snap a photo', body: 'Of a box, a printed list or handwritten notes.' },
        { title: 'Details extracted', body: 'Name, dosage, form and frequency are read and structured.' },
        { title: 'Into the record', body: 'The list goes straight into the patient record.' },
      ],
    },
    documentGeneration: {
      headline: 'The paperwork writes itself.',
      description: 'Turn consultations into structured medical documents: SOAP notes, referral letters and summaries.',
      without: 'Hours of typing notes, letters and summaries after every consultation.',
      with: 'The drafts are ready when the consultation ends. You review, adjust and export.',
      steps: [
        { title: 'From the consultation', body: 'Vesalius uses what the Scribe and the intake captured.' },
        { title: 'Drafted in your format', body: 'SOAP note, referral letter or summary, following your templates.' },
        { title: 'Review and export', body: 'Adjust what you want, then send it to the patient record.' },
      ],
    },
    smartFollowUp: {
      headline: 'Recovery, followed quietly.',
      description: 'Automated check-ins that flag at-risk patients, with alerts when responses deviate so your team can intervene early.',
      without: 'Once patients go home, recovery is hard to follow. Complications surface late, sometimes as emergencies.',
      with: 'Every patient is checked in on. Deviations are flagged early, so your team can act in time.',
      steps: [
        { title: 'Check-ins on schedule', body: 'Questionnaires go out based on the procedure and the expected recovery.' },
        { title: 'Answers compared', body: 'Each response is compared with the expected recovery path.' },
        { title: 'Alerts when it matters', body: 'Your team is alerted only when something deviates.' },
      ],
    },
  },
  nl: {
    smartTriage: {
      headline: 'De juiste patiënt eerst.',
      description: 'Intelligente urgentie-inschatting die patiënten prioriteert op basis van klinische nood, zodat de juiste patiënt op het juiste moment bij de juiste arts komt.',
      without: 'Iedereen wacht in dezelfde rij. Kritieke gevallen lopen vertraging op terwijl routinevragen de plaatsen innemen.',
      with: 'Dringende gevallen worden eerst ingepland, routinevragen komen op de juiste plek terecht en wachttijden dalen.',
      steps: [
        { title: 'Klachten komen binnen', body: 'Via intake, chat of telefoon verzamelt Vesalius de klacht en de relevante voorgeschiedenis.' },
        { title: 'Urgentie wordt ingeschat', body: 'Symptomen, voorgeschiedenis en risicofactoren leiden tot een klinisch urgentieniveau.' },
        { title: 'Doorverwezen naar de juiste zorg', body: 'Spoed, specialist, huisarts of zelfzorgadvies, en uw team ziet waarom.' },
      ],
    },
    agenda: {
      headline: 'Een rustige dag, voor u gepland.',
      description: 'Beheer afspraken slim en optimaliseer uw planning op basis van de noden van elke patiënt.',
      without: 'Handmatig plannen, no-shows, overlappingen en onverwachte gaten. De stress begint nog voor de eerste patiënt er is.',
      with: 'Eén overzichtelijke dag, met respect voor prioriteiten en de voorbereiding al gedaan.',
      steps: [
        { title: 'Alle aanvragen op één plek', body: 'Afspraken uit intake, triage en de telefoonassistent komen samen in één agenda.' },
        { title: 'Prioriteiten gerespecteerd', body: 'Wat Smart Triage als dringend markeert, krijgt het vroegste geschikte moment.' },
        { title: 'Elk bezoek voorbereid', body: 'Afspraken zijn gekoppeld aan de pre-consultatie, dus u ziet wie klaar is.' },
      ],
    },
    preConsultation: {
      headline: 'Leer uw patiënt kennen voor hij binnenstapt.',
      description: 'Een slimme intake via WhatsApp verzamelt de voorgeschiedenis vóór de afspraak en structureert die voor u.',
      without: 'U stapt blind binnen, besteedt de eerste minuten aan basisvragen en werkt rond taalbarrières.',
      with: 'U start met een gestructureerde samenvatting van de klacht en de voorgeschiedenis, in uw eigen taal.',
      steps: [
        { title: 'Een uitnodiging via WhatsApp', body: 'Geen app te downloaden. De patiënt antwoordt wanneer het past, in zijn eigen taal.' },
        { title: 'Een echt gesprek', body: 'Vesalius stelt vervolgvragen op basis van elk antwoord, zoals een goede intake.' },
        { title: 'Een samenvatting in het dossier', body: 'U opent de consultatie met een helder overzicht van klachten en voorgeschiedenis.' },
      ],
    },
    voiceReception: {
      headline: 'Elke oproep beantwoord. Niemand in de wacht.',
      description: 'Een AI-telefoonassistent die oproepen beantwoordt, de juiste vragen stelt om urgentie in te schatten en rechtstreeks in uw agenda boekt.',
      without: 'De telefoon blijft rinkelen. Routineafspraken bezetten de lijn terwijl dringende bellers in de wacht staan.',
      with: 'Routineoproepen worden afgehandeld en ingepland, dringende komen bij de juiste persoon en het secretariaat ademt weer.',
      steps: [
        { title: 'De oproep wordt beantwoord', body: 'De assistent neemt meteen op. Geen wachtrij.' },
        { title: 'De juiste vragen', body: 'Hij vraagt wat nodig is om urgentie in te schatten, volgens klinische protocollen.' },
        { title: 'Ingepland of doorgeschakeld', body: 'Routinevragen gaan meteen in uw agenda. Dringende of complexe oproepen gaan naar uw team.' },
      ],
    },
    scribe: {
      headline: 'Kijk naar uw patiënt. Niet naar uw scherm.',
      description: 'Vesalius Scribe luistert op de achtergrond mee en zet uw natuurlijke gesprek om in een gestructureerde klinische nota.',
      without: 'U typt terwijl u luistert, kijkt naar het scherm in plaats van naar de patiënt en werkt nota’s af na de uren.',
      with: 'U houdt oogcontact. Wanneer de patiënt vertrekt, staat de nota klaar voor uw controle.',
      steps: [
        { title: 'Tik op opnemen', body: 'Op uw smartphone of computer. Leg hem daarna gewoon neer.' },
        { title: 'Vesalius luistert mee', body: 'Het volgt het gesprek, onderscheidt arts en patiënt en kent medische termen.' },
        { title: 'Een nota om na te lezen', body: 'Aan het einde wacht een gestructureerde klinische nota op u.' },
      ],
    },
    medication: {
      headline: 'Eén foto. De volledige medicatielijst.',
      description: 'Neem een foto van een doosje, een geprinte lijst of handgeschreven notities. Vesalius zet de gegevens om in een gestructureerde lijst.',
      without: 'Medicatie overtypen van doosjes, geprinte lijsten en handschrift. Traag, en snel fout.',
      with: 'Eén foto wordt een gestructureerde medicatielijst in het dossier, zonder overtypen.',
      steps: [
        { title: 'Neem een foto', body: 'Van een doosje, een geprinte lijst of handgeschreven notities.' },
        { title: 'Gegevens herkend', body: 'Naam, dosis, vorm en frequentie worden gelezen en gestructureerd.' },
        { title: 'In het dossier', body: 'De lijst gaat rechtstreeks naar het patiëntendossier.' },
      ],
    },
    documentGeneration: {
      headline: 'De administratie schrijft zichzelf.',
      description: 'Zet consultaties om in gestructureerde medische documenten: SOAP-nota’s, verwijsbrieven en samenvattingen.',
      without: 'Uren nota’s, brieven en samenvattingen typen na elke consultatie.',
      with: 'De ontwerpen staan klaar wanneer de consultatie eindigt. U leest na, past aan en exporteert.',
      steps: [
        { title: 'Vanuit de consultatie', body: 'Vesalius gebruikt wat de Scribe en de intake hebben vastgelegd.' },
        { title: 'In uw formaat', body: 'SOAP-nota, verwijsbrief of samenvatting, volgens uw sjablonen.' },
        { title: 'Nalezen en exporteren', body: 'Pas aan wat u wilt en stuur het naar het patiëntendossier.' },
      ],
    },
    smartFollowUp: {
      headline: 'Herstel, rustig opgevolgd.',
      description: 'Automatische check-ins die risicopatiënten markeren, met een signaal zodra antwoorden afwijken, zodat uw team vroeg kan ingrijpen.',
      without: 'Eens patiënten thuis zijn, is herstel moeilijk te volgen. Complicaties duiken laat op, soms als spoedgeval.',
      with: 'Elke patiënt wordt opgevolgd. Afwijkingen worden vroeg gemarkeerd, zodat uw team op tijd kan handelen.',
      steps: [
        { title: 'Check-ins op schema', body: 'Vragenlijsten gaan uit volgens de ingreep en het verwachte herstel.' },
        { title: 'Antwoorden vergeleken', body: 'Elk antwoord wordt vergeleken met het verwachte herstelverloop.' },
        { title: 'Een signaal wanneer het telt', body: 'Uw team krijgt enkel een signaal als er iets afwijkt.' },
      ],
    },
  },
  fr: {
    smartTriage: {
      headline: 'Le bon patient, en premier.',
      description: 'Une évaluation intelligente de l’urgence qui priorise les patients selon leur besoin clinique, pour que chacun voie le bon médecin au bon moment.',
      without: 'Tout le monde attend dans la même file. Les cas critiques prennent du retard pendant que les questions de routine occupent les créneaux.',
      with: 'Les cas urgents sont planifiés en premier, les questions de routine vont au bon endroit et l’attente diminue.',
      steps: [
        { title: 'Les symptômes arrivent', body: 'Via l’anamnèse, le chat ou le téléphone, Vesalius recueille la plainte et les antécédents utiles.' },
        { title: 'L’urgence est évaluée', body: 'Symptômes, antécédents et facteurs de risque donnent un niveau d’urgence clinique.' },
        { title: 'Orienté vers les bons soins', body: 'Urgences, spécialiste, généraliste ou conseils d’autosoins, et votre équipe voit pourquoi.' },
      ],
    },
    agenda: {
      headline: 'Une journée sereine, planifiée pour vous.',
      description: 'Gérez vos rendez-vous intelligemment et optimisez votre planning selon les besoins de chaque patient.',
      without: 'Planification manuelle, absences, chevauchements et trous imprévus. Le stress commence avant le premier patient.',
      with: 'Une vue claire de votre journée, avec les priorités respectées et la préparation déjà faite.',
      steps: [
        { title: 'Toutes les demandes au même endroit', body: 'Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans un seul agenda.' },
        { title: 'Les priorités respectées', body: 'Les cas urgents signalés par le triage obtiennent le premier créneau adapté.' },
        { title: 'Chaque visite préparée', body: 'Les rendez-vous sont liés à la pré-consultation : vous voyez qui est prêt.' },
      ],
    },
    preConsultation: {
      headline: 'Rencontrez votre patient avant qu’il n’entre.',
      description: 'Une anamnèse intelligente via WhatsApp recueille les antécédents avant le rendez-vous et les structure pour vous.',
      without: 'Vous entrez à l’aveugle, passez les premières minutes sur des questions de base et contournez la barrière de la langue.',
      with: 'Vous commencez avec un résumé structuré de la plainte et des antécédents, dans votre langue.',
      steps: [
        { title: 'Une invitation sur WhatsApp', body: 'Aucune application à télécharger. Le patient répond quand il veut, dans sa langue.' },
        { title: 'Une vraie conversation', body: 'Vesalius pose des questions de suivi selon chaque réponse, comme une bonne anamnèse.' },
        { title: 'Un résumé dans le dossier', body: 'Vous ouvrez la consultation avec une vue claire des plaintes et des antécédents.' },
      ],
    },
    voiceReception: {
      headline: 'Chaque appel répondu. Personne en attente.',
      description: 'Un assistant téléphonique IA qui répond aux patients, pose les bonnes questions pour évaluer l’urgence et planifie directement dans votre agenda.',
      without: 'Le téléphone sonne sans arrêt. Les rendez-vous de routine saturent la ligne pendant que les appels urgents attendent.',
      with: 'Les appels de routine sont traités et planifiés, les urgents arrivent à la bonne personne et le secrétariat respire.',
      steps: [
        { title: 'L’appel est pris', body: 'L’assistant décroche immédiatement. Pas de file d’attente.' },
        { title: 'Les bonnes questions', body: 'Il demande l’essentiel pour évaluer l’urgence, selon des protocoles cliniques.' },
        { title: 'Planifié ou transféré', body: 'Les demandes de routine vont dans votre agenda. Les appels urgents ou complexes vont à votre équipe.' },
      ],
    },
    scribe: {
      headline: 'Regardez votre patient. Pas votre écran.',
      description: 'Le Scribe Vesalius écoute en arrière-plan et transforme votre conversation naturelle en note clinique structurée.',
      without: 'Vous tapez en écoutant, regardez l’écran plutôt que le patient et terminez vos notes après les heures.',
      with: 'Vous gardez le contact visuel. Quand le patient part, la note attend votre validation.',
      steps: [
        { title: 'Lancez l’enregistrement', body: 'Sur votre smartphone ou votre ordinateur. Puis posez-le.' },
        { title: 'Vesalius écoute', body: 'Il suit la conversation, distingue médecin et patient et connaît le vocabulaire médical.' },
        { title: 'Une note à relire', body: 'À la fin, une note clinique structurée vous attend.' },
      ],
    },
    medication: {
      headline: 'Une photo. Toute la liste de médicaments.',
      description: 'Photographiez une boîte, une liste imprimée ou des notes manuscrites. Vesalius en extrait une liste structurée.',
      without: 'Ressaisir les médicaments depuis des boîtes, des listes et de l’écriture manuscrite. Lent, et source d’erreurs.',
      with: 'Une photo devient une liste de médicaments structurée dans le dossier, sans ressaisie.',
      steps: [
        { title: 'Prenez une photo', body: 'D’une boîte, d’une liste imprimée ou de notes manuscrites.' },
        { title: 'Détails extraits', body: 'Nom, dosage, forme et fréquence sont lus et structurés.' },
        { title: 'Dans le dossier', body: 'La liste va directement dans le dossier du patient.' },
      ],
    },
    documentGeneration: {
      headline: 'L’administratif se rédige tout seul.',
      description: 'Transformez les consultations en documents médicaux structurés : notes SOAP, lettres de référence et résumés.',
      without: 'Des heures à taper notes, lettres et résumés après chaque consultation.',
      with: 'Les brouillons sont prêts à la fin de la consultation. Vous relisez, ajustez et exportez.',
      steps: [
        { title: 'À partir de la consultation', body: 'Vesalius utilise ce que le Scribe et l’anamnèse ont capturé.' },
        { title: 'Dans votre format', body: 'Note SOAP, lettre de référence ou résumé, selon vos modèles.' },
        { title: 'Relire et exporter', body: 'Ajustez ce que vous voulez, puis envoyez-le au dossier patient.' },
      ],
    },
    smartFollowUp: {
      headline: 'Une convalescence suivie en toute discrétion.',
      description: 'Des suivis automatiques qui signalent les patients à risque, avec une alerte dès qu’une réponse s’écarte, pour intervenir tôt.',
      without: 'Une fois le patient rentré, sa convalescence est difficile à suivre. Les complications apparaissent tard, parfois en urgence.',
      with: 'Chaque patient est suivi. Les écarts sont signalés tôt, pour que votre équipe agisse à temps.',
      steps: [
        { title: 'Des suivis planifiés', body: 'Les questionnaires partent selon l’intervention et la convalescence attendue.' },
        { title: 'Réponses comparées', body: 'Chaque réponse est comparée au parcours de rétablissement attendu.' },
        { title: 'Une alerte quand ça compte', body: 'Votre équipe n’est alertée qu’en cas d’écart.' },
      ],
    },
  },
};
