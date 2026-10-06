/**
 * Homepage copy for the orthopaedics variant (source: sales, "Website-inhoud orthopedie", 5 Oct 2026).
 * Dutch is the source text; English (British) and French are translations for sales to review.
 * Anything not listed here stays identical to the standard site.
 */

export type SiteLocale = 'en' | 'nl' | 'fr';

type ModuleKey =
  | 'smartTriage'
  | 'agenda'
  | 'preConsultation'
  | 'voiceReception'
  | 'scribe'
  | 'medication'
  | 'documentGeneration'
  | 'smartFollowUp';

import type { SpecialtyId } from '@/lib/specialty';

export interface SpecialtyUiCopy {
  promptTitle: string;
  promptBody: string;
  browse: string;
  switchLabel: string;
  /** Shown after picking a specialty without tailored content yet. */
  untailored: (label: string) => string;
  untailoredOther: string;
  ok: string;
  specialties: Record<SpecialtyId, string>;
}

/** Copy for the chooser itself (prompt + navbar switch). */
export const SPECIALTY_UI: Record<SiteLocale, SpecialtyUiCopy> = {
  nl: {
    promptTitle: 'Hallo! Wat is uw specialiteit?',
    promptBody: 'Zo stemmen we de voorbeelden af op uw praktijk.',
    browse: 'Gewoon rondkijken',
    switchLabel: 'Specialiteit',
    untailored: (label) => `Bedankt! Voor ${label} tonen we voorlopig onze algemene voorbeelden.`,
    untailoredOther: 'Bedankt! U ziet nu onze algemene voorbeelden.',
    ok: 'Oké',
    specialties: {
      orthopedics: 'Orthopedie',
      generalPractice: 'Huisartsgeneeskunde',
      ent: 'NKO',
      neurosurgery: 'Neurochirurgie',
      neurology: 'Neurologie',
      cardiology: 'Cardiologie',
      dermatology: 'Dermatologie',
      gynaecology: 'Gynaecologie',
      paediatrics: 'Pediatrie',
      ophthalmology: 'Oftalmologie',
      urology: 'Urologie',
      gastroenterology: 'Gastro-enterologie',
      internalMedicine: 'Inwendige geneeskunde',
      psychiatry: 'Psychiatrie',
      physicalMedicine: 'Fysische geneeskunde',
      other: 'Andere',
    },
  },
  en: {
    promptTitle: 'Hi! What is your speciality?',
    promptBody: 'So we can match the examples to your practice.',
    browse: 'Just browsing',
    switchLabel: 'Speciality',
    untailored: (label) => `Thanks! For ${label} we show our general examples for now.`,
    untailoredOther: 'Thanks! You are now seeing our general examples.',
    ok: 'OK',
    specialties: {
      orthopedics: 'Orthopaedics',
      generalPractice: 'General practice',
      ent: 'ENT',
      neurosurgery: 'Neurosurgery',
      neurology: 'Neurology',
      cardiology: 'Cardiology',
      dermatology: 'Dermatology',
      gynaecology: 'Gynaecology',
      paediatrics: 'Paediatrics',
      ophthalmology: 'Ophthalmology',
      urology: 'Urology',
      gastroenterology: 'Gastroenterology',
      internalMedicine: 'Internal medicine',
      psychiatry: 'Psychiatry',
      physicalMedicine: 'Physical medicine',
      other: 'Other',
    },
  },
  fr: {
    promptTitle: 'Bonjour ! Quelle est votre spécialité ?',
    promptBody: 'Pour adapter les exemples à votre pratique.',
    browse: 'Simplement visiter',
    switchLabel: 'Spécialité',
    untailored: (label) => `Merci ! Pour la spécialité ${label}, nous montrons pour l’instant nos exemples généraux.`,
    untailoredOther: 'Merci ! Vous voyez maintenant nos exemples généraux.',
    ok: 'OK',
    specialties: {
      orthopedics: 'Orthopédie',
      generalPractice: 'Médecine générale',
      ent: 'ORL',
      neurosurgery: 'Neurochirurgie',
      neurology: 'Neurologie',
      cardiology: 'Cardiologie',
      dermatology: 'Dermatologie',
      gynaecology: 'Gynécologie',
      paediatrics: 'Pédiatrie',
      ophthalmology: 'Ophtalmologie',
      urology: 'Urologie',
      gastroenterology: 'Gastro-entérologie',
      internalMedicine: 'Médecine interne',
      psychiatry: 'Psychiatrie',
      physicalMedicine: 'Médecine physique',
      other: 'Autre',
    },
  },
};

export interface OrthoHomeCopy {
  hero: {
    line1: string;
    line2: string;
    patientMessage: string;
    assistantMessage: string;
    noteBody: string;
  };
  journey: {
    subtitle: string;
    steps: { moment: string; title: string; detail: string; part: string }[];
  };
  modules: {
    subtitle: string;
    cards: Record<ModuleKey, string>;
  };
  finalCta: {
    subtitle: string;
    personRole: string;
    personLine: string;
    primary: string;
    secondary: string;
  };
}

export const ORTHO_HOME: Record<SiteLocale, OrthoHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'orthopedist.',
      patientMessage: 'Ik heb al drie maanden pijn aan mijn rechterknie, vooral bij het opstaan en na het wandelen.',
      assistantMessage: 'Dank u. Voelt u de pijn soms ook in de lies of aan de voorkant van het dijbeen? En lukt het nog om zelf uw sokken aan te trekken?',
      noteBody:
        'Patiënt meldt sinds drie maanden pijn aan de rechterknie, met uitstraling naar de lies en moeite met het aantrekken van sokken. Kniestatus zonder afwijkingen. Pijnlijke, beperkte endorotatie van de rechterheup…',
    },
    journey: {
      subtitle: 'Een patiënte met tintelende vingers, van eerste melding tot herstel. Vesalius doet het voorwerk, u blijft de arts.',
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'Een volledige intake, thuis en in haar eigen taal.',
          detail: "Klachten, voorgeschiedenis, medicatie en werk. Welke vingers, wakker 's nachts, kracht bij het grijpen.",
          part: 'Niets.',
        },
        {
          moment: 'Meteen na de intake',
          title: 'Een rode vlag? Dan sneller op consult.',
          detail: 'Ze meldt dat haar duim voortdurend gevoelloos is en krachtverlies. Dat wordt gemarkeerd als rode vlag: zij moet sneller gezien worden, door de handchirurg.',
          part: 'Een blik.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese ligt al klaar. U begint meteen bij het onderzoek.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, uitleg voor de patiënte en het attest voor het werk.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Herstel thuis opgevolgd.',
          detail: 'Ze krijgt dezelfde vragen opnieuw, en een korte bevraging over hoe ze haar zorg ervaren heeft.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënte met heupklachten door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage: 'Heupklachten gaan naar de heupchirurg, schouderklachten naar de schouderchirurg. Wie sneller gezien moet worden, wordt gemarkeerd.',
        agenda: 'Haar afspraak komt op het juiste moment in de agenda van de heupchirurg.',
        preConsultation:
          "Een chatbot stelt haar de vragen die bij een heup tellen: pijn in de lies, stijfheid 's ochtends, wandelafstand, sokken aantrekken. U weet wat er scheelt nog voor ze binnenkomt.",
        voiceReception: 'Belt ze liever? Dezelfde triage en inplanning, via de telefoon.',
        scribe: 'U onderzoekt haar heup en bespreekt de röntgenfoto. Samen kiest u voor een heupprothese. Vesalius noteert mee.',
        medication: 'Haar medicatielijst stuurde ze als foto in de chat. Die staat al gestructureerd in het dossier, ook de bloedverdunner die telt voor de ingreep.',
        documentGeneration: 'De brief aan de huisarts, de uitleg voor de patiënte en de notities voor het EPD staan klaar.',
        smartFollowUp: 'Na de ingreep vult ze de HOOS en een pijnscore in, zodat u haar herstel ziet evolueren.',
      },
    },
    finalCta: {
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor orthopedie.',
      personRole: 'Customer Success, Vesalius.ai',
      personLine: 'Ik breng alles in gereedheid, op maat van uw noden.',
      primary: 'Start uw gratis maand',
      secondary: 'Maak uw assistent aan',
    },
  },
  en: {
    hero: {
      line1: 'Be an orthopaedic surgeon',
      line2: 'again.',
      patientMessage: 'My right knee has been hurting for three months, mostly when I stand up and after walking.',
      assistantMessage: 'Thank you. Do you sometimes also feel the pain in your groin or at the front of your thigh? And can you still put on your socks yourself?',
      noteBody:
        'Patient reports right knee pain for three months, radiating to the groin, with difficulty putting on socks. Knee examination unremarkable. Painful, restricted internal rotation of the right hip…',
    },
    journey: {
      subtitle: 'A patient with tingling fingers, from first report to recovery. Vesalius does the groundwork, you stay the doctor.',
      steps: [
        {
          moment: 'When booking',
          title: 'A complete intake, at home and in her own language.',
          detail: 'Complaints, history, medication and work. Which fingers, woken at night, grip strength.',
          part: 'Nothing.',
        },
        {
          moment: 'Right after the intake',
          title: 'A red flag? Then an earlier consultation.',
          detail: 'She reports a constantly numb thumb and loss of strength. That is flagged as a red flag: she needs to be seen sooner, by the hand surgeon.',
          part: 'A glance.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history is already prepared. You start straight with the examination.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, an explanation for the patient and the certificate for her employer.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Recovery followed at home.',
          detail: 'She gets the same questions again, plus a short survey on how she experienced her care.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with hip complaints through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage: 'Hip complaints go to the hip surgeon, shoulder complaints to the shoulder surgeon. Anyone who needs to be seen sooner is flagged.',
        agenda: 'Her appointment lands at the right moment in the hip surgeon’s agenda.',
        preConsultation:
          'A chatbot asks her the questions that matter for a hip: groin pain, morning stiffness, walking distance, putting on socks. You know what is wrong before she walks in.',
        voiceReception: 'Prefers to call? The same triage and scheduling, by phone.',
        scribe: 'You examine her hip and discuss the X-ray. Together you decide on a hip replacement. Vesalius takes the notes.',
        medication: 'She sent her medication list as a photo in the chat. It is already structured in the record, including the anticoagulant that matters for surgery.',
        documentGeneration: 'The letter to the GP, the explanation for the patient and the notes for the patient record are ready.',
        smartFollowUp: 'After surgery she completes the HOOS and a pain score, so you can see her recovery progress.',
      },
    },
    finalCta: {
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for orthopaedics.',
      personRole: 'Customer Success, Vesalius.ai',
      personLine: 'I will get everything ready, tailored to your needs.',
      primary: 'Start your free month',
      secondary: 'Create your assistant',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'chirurgien orthopédiste.',
      patientMessage: 'J’ai mal au genou droit depuis trois mois, surtout en me levant et après la marche.',
      assistantMessage: 'Merci. Ressentez-vous parfois aussi la douleur dans l’aine ou à l’avant de la cuisse ? Et arrivez-vous encore à mettre vos chaussettes vous-même ?',
      noteBody:
        'Le patient signale une douleur au genou droit depuis trois mois, irradiant vers l’aine, avec des difficultés à mettre ses chaussettes. Examen du genou sans particularité. Rotation interne de la hanche droite douloureuse et limitée…',
    },
    journey: {
      subtitle: 'Une patiente aux doigts qui fourmillent, du premier signalement à la guérison. Vesalius prépare le terrain, vous restez le médecin.',
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Une anamnèse complète, chez elle et dans sa langue.',
          detail: 'Plaintes, antécédents, médicaments et travail. Quels doigts, réveillée la nuit, force de préhension.',
          part: 'Rien.',
        },
        {
          moment: 'Juste après l’anamnèse',
          title: 'Un signal d’alerte ? Alors une consultation plus rapide.',
          detail: 'Elle signale un pouce constamment engourdi et une perte de force. C’est signalé comme alerte : elle doit être vue plus vite, par le chirurgien de la main.',
          part: 'Un coup d’œil.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse est déjà prête. Vous commencez directement par l’examen.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, explication pour la patiente et certificat pour son employeur.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Convalescence suivie à domicile.',
          detail: 'Elle reçoit à nouveau les mêmes questions, et un court questionnaire sur la manière dont elle a vécu ses soins.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez une patiente souffrant de la hanche à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage: 'Les plaintes de hanche vont au chirurgien de la hanche, celles de l’épaule au chirurgien de l’épaule. Ceux qui doivent être vus plus vite sont signalés.',
        agenda: 'Son rendez-vous arrive au bon moment dans l’agenda du chirurgien de la hanche.',
        preConsultation:
          'Un chatbot lui pose les questions qui comptent pour une hanche : douleur à l’aine, raideur matinale, périmètre de marche, mettre ses chaussettes. Vous savez ce qui ne va pas avant même qu’elle n’entre.',
        voiceReception: 'Elle préfère appeler ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous examinez sa hanche et discutez de la radiographie. Ensemble, vous optez pour une prothèse de hanche. Vesalius prend les notes.',
        medication: 'Elle a envoyé sa liste de médicaments en photo dans le chat. Elle est déjà structurée dans le dossier, y compris l’anticoagulant qui compte pour l’intervention.',
        documentGeneration: 'La lettre au médecin traitant, l’explication pour la patiente et les notes pour le dossier patient sont prêtes.',
        smartFollowUp: 'Après l’intervention, elle remplit le HOOS et un score de douleur, pour que vous voyiez son rétablissement évoluer.',
      },
    },
    finalCta: {
      subtitle:
        'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l’orthopédie.',
      personRole: 'Customer Success, Vesalius.ai',
      personLine: 'Je prépare tout, sur mesure selon vos besoins.',
      primary: 'Commencez votre mois gratuit',
      secondary: 'Créez votre assistant',
    },
  },
};

/** The "free month" form, used by the closing CTA in every variant and opened from the pricing card. */
export const FREE_MONTH_FORM = {
  nl: {
    title: 'Gratis maand',
    name: 'Naam',
    email: 'E-mail',
    phone: 'Telefoonnummer',
    specialty: 'Specialiteit',
    focus: 'Focus binnen uw vakgebied (bv. knie, heup, schouder)',
    organisation: 'Ziekenhuis of praktijk',
    remarks: 'Nog iets dat ik moet weten?',
    send: 'Verstuur',
    sending: 'Bezig met versturen…',
    thanks: 'Bedankt! Ik neem snel contact met u op, zodat u binnen 24 uur kunt starten.',
    signature: 'Quinten',
    error: 'Er ging iets mis. Probeer het opnieuw of mail help@vesalius.health.',
    required: 'Verplicht veld',
  },
  en: {
    title: 'Free month',
    name: 'Name',
    email: 'Email',
    phone: 'Phone number',
    specialty: 'Speciality',
    focus: 'Focus within your speciality (e.g. knee, hip, shoulder)',
    organisation: 'Hospital or practice',
    remarks: 'Anything else I should know?',
    send: 'Send',
    sending: 'Sending…',
    thanks: 'Thank you! I will be in touch shortly so you can start within 24 hours.',
    signature: 'Quinten',
    error: 'Something went wrong. Please try again or email help@vesalius.health.',
    required: 'Required',
  },
  fr: {
    title: 'Mois gratuit',
    name: 'Nom',
    email: 'E-mail',
    phone: 'Numéro de téléphone',
    specialty: 'Spécialité',
    focus: 'Domaine de prédilection (p. ex. genou, hanche, épaule)',
    organisation: 'Hôpital ou cabinet',
    remarks: 'Autre chose que je devrais savoir ?',
    send: 'Envoyer',
    sending: 'Envoi en cours…',
    thanks: 'Merci ! Je vous recontacte rapidement pour que vous puissiez commencer dans les 24 heures.',
    signature: 'Quinten',
    error: 'Une erreur est survenue. Réessayez ou écrivez à help@vesalius.health.',
    required: 'Champ obligatoire',
  },
} as const;
