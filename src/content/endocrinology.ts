/**
 * Homepage copy for the endocrinology variant (source: sales, "Website-inhoud endocrinologie", 4 Nov 2026). Everything
 * follows Paul, 58, a lorry driver whose type 2 diabetes is slipping out of control on tablets, from triage to follow-up.
 * The key insight for endocrinologists: not every referral "for the hormones" belongs in the diabetes clinic; a lump in
 * the neck goes to the thyroid colleague, a question about weight-loss surgery to the obesity clinic. Dutch is the source
 * text; English (British) and French are translations for sales to review. Anything not listed here stays identical to
 * the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const ENDOCRINOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'endocrinoloog.',
      greeting: 'Hallo Paul! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?',
      patientMessage: 'Mijn huisarts stuurt me door. Mijn suiker blijft te hoog, ondanks mijn pillen.',
      assistantMessage: 'Dank u. Had u de afgelopen maand momenten waarop u plots beefde, zweette of honger kreeg? En heeft u een wonde aan uw voet?',
      noteBody:
        "Diabetes type 2 sinds 9 jaar, HbA1c 8,9% onder metformine en gliclazide. Drie hypo's de afgelopen maand tijdens het rijden. Monofilament verminderd beiderzijds, albumine/creatinine-ratio 52 mg/g…",
    },
    journey: {
      subtitle: 'Een patiënt met diabetes type 2 die ontspoort, van eerste melding tot een stabiele suiker. Vesalius doet het voorwerk, u blijft de arts.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het boeken',
          title: 'De juiste patiënt bij de juiste arts.',
          detail: "Diabetes die ontspoort onder tabletten, met hypo's: Paul gaat naar de diabetesraadpleging. Een knobbel in de hals gaat naar de collega schildklier.",
          part: 'Niets.',
        },
        {
          moment: 'Na de boeking',
          title: 'Een volledige intake, thuis en in zijn eigen taal.',
          detail: "Hypo's en wanneer ze gebeuren, tintelingen in de voeten, laatste oogcontrole, medicatie via foto, het labo van de huisarts als PDF.",
          part: 'Niets.',
        },
        {
          moment: 'Tijdens het consult',
          title: 'U onderzoekt. Vesalius luistert mee.',
          detail: 'De anamnese en het labo liggen al klaar. U begint meteen bij de voeten en de keuze van de behandeling.',
          part: 'Gewoon arts zijn.',
        },
        {
          moment: 'Na het consult',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Brief aan de huisarts, voorschriften, aanvraag terugbetaling, attest rijgeschiktheid en verwijzingen naar educator, podoloog en oogarts.',
          part: 'Nalezen en ondertekenen.',
        },
        {
          moment: 'Na de behandeling',
          title: 'Opgevolgd tussen de consulten, niet alleen in cijfers.',
          detail: "Hypo's, gewicht en diabetesdistress, maar ook slaap, werk achter het stuur en zijn duiven. De vragenlijsten volgen de gekozen behandeling.",
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één patiënt met diabetes type 2 door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage: 'Diabetes die ontspoort gaat naar de diabetesraadpleging. Een knobbel in de hals gaat naar de collega schildklier. Braken met ketonen gaat meteen naar het secretariaat.',
        agenda: 'Zijn afspraak komt op een vrijdag, wanneer hij niet in het buitenland rijdt, met een lang blok als nieuwe patiënt.',
        preConsultation: "Een chatbot stelt hem de vragen die bij diabetes tellen: hypo's, voeten, ogen, eetpatroon op de baan. Zijn labo stuurt hij mee als PDF.",
        voiceReception: 'Belt hij liever vanuit zijn cabine? Dezelfde triage en inplanning, via de telefoon.',
        scribe: "U onderzoekt zijn voeten en bespreekt het labo. Samen kiest u voor een injectie per week in plaats van de tablet die hypo's gaf. Vesalius noteert mee.",
        medication: 'Hij stuurt in de chat een foto van zijn medicatieschema. Zo blijkt dat hij twee tabletten gliclazide neemt, niet één, en ook allopurinol dat hij vergat te vermelden.',
        documentGeneration: 'De brief aan de huisarts, de voorschriften, de aanvraag terugbetaling en het attest voor zijn rijbewijs staan klaar.',
        smartFollowUp: "Hij meldt zijn hypo's, gewicht en diabetesdistress, en vertelt hoe het gaat met rijden, slapen en zijn duiven.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor endocrinologie.',
      focus: 'Focus binnen uw vakgebied (bv. diabetes, schildklier, bijnier en hypofyse)',
    },
  },
  en: {
    hero: {
      line1: 'Be an endocrinologist',
      line2: 'again.',
      greeting: "Hello Paul! I'm here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: 'My GP is referring me. My sugar stays too high, despite my tablets.',
      assistantMessage: 'Thank you. In the past month, were there moments when you suddenly felt shaky, sweaty or hungry? And do you have a wound on your foot?',
      noteBody:
        'Type 2 diabetes for 9 years, HbA1c 8.9% on metformin and gliclazide. Three hypos in the past month while driving. Monofilament reduced on both sides, albumin/creatinine ratio 52 mg/g…',
    },
    journey: {
      subtitle: 'A patient with type 2 diabetes slipping out of control, from first report to stable blood sugar. Vesalius does the groundwork, you stay the doctor.',
      icons: ICONS,
      steps: [
        {
          moment: 'When booking',
          title: 'The right patient for the right doctor.',
          detail: 'Diabetes slipping out of control on tablets, with hypos: Paul goes to the diabetes clinic. A lump in the neck goes to the thyroid colleague.',
          part: 'Nothing.',
        },
        {
          moment: 'After booking',
          title: 'A complete intake, at home and in his own language.',
          detail: 'Hypos and when they happen, tingling in the feet, last eye check, medication by photo, the GP’s bloods as a PDF.',
          part: 'Nothing.',
        },
        {
          moment: 'During the consultation',
          title: 'You examine. Vesalius listens.',
          detail: 'The history and bloods are already prepared. You start straight away with the feet and the choice of treatment.',
          part: 'Be the doctor.',
        },
        {
          moment: 'After the consultation',
          title: 'The paperwork writes itself.',
          detail: 'Letter to the GP, prescriptions, reimbursement request, fitness-to-drive certificate and referrals to the educator, podiatrist and ophthalmologist.',
          part: 'Review and sign.',
        },
        {
          moment: 'After treatment',
          title: 'Followed up between appointments, not just in numbers.',
          detail: 'Hypos, weight and diabetes distress, but also sleep, work behind the wheel and his pigeons. The questionnaires follow the chosen treatment.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient with type 2 diabetes through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage: 'Diabetes slipping out of control goes to the diabetes clinic. A lump in the neck goes to the thyroid colleague. Vomiting with ketones goes straight to the secretariat.',
        agenda: 'His appointment lands on a Friday, when he is not driving abroad, with a long slot as a new patient.',
        preConsultation: 'A chatbot asks him the questions that matter in diabetes: hypos, feet, eyes, eating on the road. He sends his bloods along as a PDF.',
        voiceReception: 'Prefers to call from his cab? The same triage and scheduling, by phone.',
        scribe: 'You examine his feet and discuss the bloods. Together you choose a weekly injection instead of the tablet that caused hypos. Vesalius takes notes.',
        medication: 'He sends a photo of his medication schedule in the chat. It turns out he takes two gliclazide tablets, not one, and also allopurinol he forgot to mention.',
        documentGeneration: 'The letter to the GP, the prescriptions, the reimbursement request and the certificate for his driving licence are ready.',
        smartFollowUp: 'He reports his hypos, weight and diabetes distress, and tells you how driving, sleep and his pigeons are going.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for endocrinology.',
      focus: 'Focus within your speciality (e.g. diabetes, thyroid, adrenal and pituitary)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'endocrinologue.',
      greeting: 'Bonjour Paul. Je suis là pour aider le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?',
      patientMessage: 'Mon médecin traitant m’envoie. Ma glycémie reste trop haute, malgré mes comprimés.',
      assistantMessage: 'Merci. Le mois dernier, avez-vous eu des moments où vous trembliez, transpiriez ou aviez soudain faim ? Et avez-vous une plaie au pied ?',
      noteBody:
        'Diabète de type 2 depuis 9 ans, HbA1c 8,9 % sous metformine et gliclazide. Trois hypoglycémies le mois dernier au volant. Monofilament diminué des deux côtés, rapport albumine/créatinine 52 mg/g…',
    },
    journey: {
      subtitle: 'Un patient dont le diabète de type 2 se déséquilibre, du premier signalement à une glycémie stable. Vesalius prépare le terrain, vous restez le médecin.',
      icons: ICONS,
      steps: [
        {
          moment: 'À la prise de rendez-vous',
          title: 'Le bon patient chez le bon médecin.',
          detail: 'Un diabète qui se déséquilibre sous comprimés, avec des hypoglycémies : Paul va à la consultation de diabétologie. Un nodule dans le cou va chez le collègue thyroïde.',
          part: 'Rien.',
        },
        {
          moment: 'Après la prise de rendez-vous',
          title: 'Une anamnèse complète, chez lui et dans sa langue.',
          detail: 'Les hypoglycémies et quand elles surviennent, les fourmillements dans les pieds, le dernier contrôle des yeux, les médicaments par photo, la biologie du médecin traitant en PDF.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la consultation',
          title: 'Vous examinez. Vesalius écoute.',
          detail: 'L’anamnèse et la biologie sont déjà prêtes. Vous commencez directement par les pieds et le choix du traitement.',
          part: 'Être médecin.',
        },
        {
          moment: 'Après la consultation',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Lettre au médecin traitant, prescriptions, demande de remboursement, certificat d’aptitude à la conduite et orientations vers l’éducateur, le podologue et l’ophtalmologue.',
          part: 'Relire et signer.',
        },
        {
          moment: 'Après le traitement',
          title: 'Suivi entre les consultations, pas seulement en chiffres.',
          detail: 'Hypoglycémies, poids et détresse liée au diabète, mais aussi le sommeil, le travail au volant et ses pigeons. Les questionnaires suivent le traitement choisi.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez un patient atteint de diabète de type 2 à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Un diabète qui se déséquilibre va à la consultation de diabétologie. Un nodule dans le cou va chez le collègue thyroïde. Des vomissements avec cétones vont directement au secrétariat.',
        agenda: 'Son rendez-vous tombe un vendredi, quand il ne roule pas à l’étranger, avec un long créneau comme nouveau patient.',
        preConsultation: 'Un chatbot lui pose les questions qui comptent dans le diabète : hypoglycémies, pieds, yeux, repas sur la route. Il envoie sa biologie en PDF.',
        voiceReception: 'Il préfère appeler depuis sa cabine ? Le même triage et la même planification, par téléphone.',
        scribe: 'Vous examinez ses pieds et discutez de la biologie. Ensemble, vous optez pour une injection hebdomadaire à la place du comprimé qui provoquait des hypoglycémies. Vesalius prend des notes.',
        medication: 'Il envoie dans le chat une photo de son schéma de médication. Il s’avère qu’il prend deux comprimés de gliclazide, pas un, ainsi que l’allopurinol qu’il avait oublié de mentionner.',
        documentGeneration: 'La lettre au médecin traitant, les prescriptions, la demande de remboursement et le certificat pour son permis de conduire sont prêts.',
        smartFollowUp: 'Il signale ses hypoglycémies, son poids et sa détresse liée au diabète, et raconte comment se passent la conduite, le sommeil et ses pigeons.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour l’endocrinologie.',
      focus: 'Domaine de prédilection (p. ex. diabète, thyroïde, surrénales et hypophyse)',
    },
  },
};
