/**
 * Homepage copy for the mental health variant (source: sales, "Website-inhoud geestelijke gezondheidszorg", 14 Oct 2026).
 * The care provider is a psychologist, not a doctor, so this variant speaks of clients and sessions. Everything follows
 * Lotte, 31, with panic attacks, from a short intake that brings her to the right psychologist to follow-up after her
 * sessions. Dutch is the source text; English (British) and French are translations for sales to review. Anything not
 * listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const MENTAL_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'psycholoog.',
      greeting: 'Hallo Lotte! Ik help uw psycholoog om het eerste gesprek voor te bereiden. Waarvoor zoekt u hulp?',
      patientMessage: 'Al vijf maanden krijg ik paniekaanvallen. Mijn hart gaat dan tekeer en ik denk dat ik flauwval.',
      assistantMessage: 'Dank u. Komen die hartkloppingen in rust en zonder duidelijke aanleiding, of vooral bij inspanning? En vermijdt u sindsdien bepaalde plaatsen?',
      noteBody:
        'Hulpvraag: paniekaanvallen sinds vijf maanden, 3 à 4 per week, met vermijding van trein en drukke winkels. Hart onderzocht op de spoed, normaal. Wil leren omgaan met de aanvallen zonder medicatie…',
      intakeReady: 'Samenvatting klaar voor de psycholoog',
    },
    journey: {
      subtitle: 'Een cliënt met paniekaanvallen, van de eerste aanmelding tot ze weer alleen de trein neemt. Vesalius doet het voorwerk, u blijft de therapeut.',
      icons: ICONS,
      steps: [
        {
          moment: 'Bij het aanmelden',
          title: 'De juiste cliënt bij de juiste psycholoog.',
          detail:
            'Paniek met vermijding: Lotte komt bij de collega met focus op angst. Trauma gaat naar de EMDR-collega, een ernstige depressie met medicatievraag naar de psychiater. Wie aan zelfdoding denkt, krijgt meteen hulp.',
          part: 'Niets.',
        },
        {
          moment: 'Na de aanmelding',
          title: 'Een volledige intake, thuis en in haar eigen tempo.',
          detail: 'Aanvallen, wat ze vermijdt, alcohol en koffie, medicatie via foto, wat de spoed al onderzocht. Veiligheid altijd nagevraagd.',
          part: 'Niets.',
        },
        {
          moment: 'Tijdens de sessie',
          title: 'U luistert. Vesalius noteert mee.',
          detail: 'De anamnese ligt al klaar. Naast de nota ziet u het emotionele verloop van de sessie, met de zinnen die het verschil maakten.',
          part: 'Gewoon therapeut zijn.',
        },
        {
          moment: 'Na de sessie',
          title: 'De administratie schrijft zichzelf.',
          detail: 'Verslag aan de huisarts, behandelplan, uitleg over paniek en het oefenschema voor thuis.',
          part: 'Nalezen en versturen.',
        },
        {
          moment: 'Tussen de sessies',
          title: 'Vooruitgang opgevolgd, niet alleen in cijfers.',
          detail: 'Paniekscores, maar ook de trein, het lopen en het koor. Na elke sessie een korte check-in, veiligheid telkens opnieuw nagevraagd.',
          part: 'Handelen bij een signaal.',
        },
      ],
    },
    modules: {
      subtitle: 'Volg één cliënt met paniekaanvallen door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'Een paar vragen bij de aanmelding: paniek naar de collega met focus op angst, trauma naar EMDR, hartklachten bij inspanning eerst naar de huisarts. Wie aan zelfdoding denkt, krijgt meteen hulp.',
        agenda: 'Haar eerste gesprek komt in de agenda van de juiste psycholoog, met een lang blok voor de intake.',
        preConsultation: 'Een chatbot vraagt naar haar aanvallen, wat ze vermijdt, alcohol en koffie, en of ze aan zelfdoding denkt. U weet wat er speelt nog voor ze binnenkomt.',
        voiceReception: 'Belt ze liever? Dezelfde korte intake en inplanning, via de telefoon.',
        scribe: 'U luistert naar haar verhaal en legt uit wat paniek is. Vesalius noteert mee en toont het emotionele verloop van de sessie.',
        medication: 'Ze stuurt in de chat een foto van het medicatieschema van haar apotheek. U ziet de Xanax die ze zo nodig neemt, en de pil die ze zelf vergat te vermelden.',
        documentGeneration: 'Het verslag aan de huisarts, het behandelplan en een uitleg over paniek met oefenschema staan klaar.',
        smartFollowUp:
          'Na elke sessie een korte check-in: paniekscores, hoe het gaat met de trein en het koor, en hoe ze de sessie ervoer. Veiligheid wordt telkens opnieuw nagevraagd.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor psychologen.',
      focus: 'Focus binnen uw vakgebied (bv. angst en paniek, trauma, relatie en gezin, kinderen en jongeren)',
    },
  },
  en: {
    hero: {
      line1: 'Be a psychologist',
      line2: 'again.',
      greeting: "Hello Lotte! I'm here to help your psychologist prepare for your first session. What are you looking for help with?",
      patientMessage: 'For five months I’ve been having panic attacks. My heart races and I think I’m going to faint.',
      assistantMessage: 'Thank you. Do the palpitations come at rest and without a clear trigger, or mainly with exertion? And have you been avoiding certain places since?',
      noteBody:
        'Request for help: panic attacks for five months, 3 to 4 a week, avoiding trains and busy shops. Heart checked in A&E, normal. Wants to learn to cope with the attacks without medication…',
      intakeReady: 'Summary ready for the psychologist',
    },
    journey: {
      subtitle: 'A client with panic attacks, from first sign-up to taking the train on her own again. Vesalius does the groundwork, you stay the therapist.',
      icons: ICONS,
      steps: [
        {
          moment: 'At sign-up',
          title: 'The right client for the right psychologist.',
          detail:
            'Panic with avoidance: Lotte goes to the colleague who focuses on anxiety. Trauma goes to the EMDR colleague, severe depression with a question about medication to the psychiatrist. Anyone thinking about suicide gets help straight away.',
          part: 'Nothing.',
        },
        {
          moment: 'After sign-up',
          title: 'A complete intake, at home and at her own pace.',
          detail: 'Attacks, what she avoids, alcohol and coffee, medication by photo, what A&E already checked. Safety always asked about.',
          part: 'Nothing.',
        },
        {
          moment: 'During the session',
          title: 'You listen. Vesalius takes notes.',
          detail: 'The history is already prepared. Next to the note you see the emotional course of the session, with the sentences that made the difference.',
          part: 'Be the therapist.',
        },
        {
          moment: 'After the session',
          title: 'The paperwork writes itself.',
          detail: 'Report to the GP, treatment plan, an explanation of panic and the exercise schedule for home.',
          part: 'Review and send.',
        },
        {
          moment: 'Between sessions',
          title: 'Progress followed up, not just in numbers.',
          detail: 'Panic scores, but also the train, running and the choir. A short check-in after every session, with safety asked about every time.',
          part: 'Act when flagged.',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one client with panic attacks through every module. They work together seamlessly, and each module is also available on its own.',
      cards: {
        smartTriage:
          'A few questions at sign-up: panic to the colleague who focuses on anxiety, trauma to EMDR, heart symptoms on exertion to the GP first. Anyone thinking about suicide gets help straight away.',
        agenda: 'Her first session goes into the right psychologist’s agenda, with a long slot for the intake.',
        preConsultation: 'A chatbot asks about her attacks, what she avoids, alcohol and coffee, and whether she has thoughts of suicide. You know what is going on before she walks in.',
        voiceReception: 'Prefers to call? The same short intake and scheduling, by phone.',
        scribe: 'You listen to her story and explain what panic is. Vesalius takes notes and shows the emotional course of the session.',
        medication: 'She sends a photo of her pharmacy’s medication schedule in the chat. You see the Xanax she takes as needed, and the pill she forgot to mention.',
        documentGeneration: 'The report to the GP, the treatment plan and an explanation of panic with an exercise schedule are ready.',
        smartFollowUp: 'A short check-in after every session: panic scores, how the train and the choir are going, and how she experienced the session. Safety is asked about every time.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for psychologists.',
      focus: 'Focus within your speciality (e.g. anxiety and panic, trauma, couples and families, children and young people)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'psychologue.',
      greeting: 'Bonjour Lotte. J’aide votre psychologue à préparer le premier entretien. Pour quoi cherchez-vous de l’aide ?',
      patientMessage: 'Depuis cinq mois, je fais des crises de panique. Mon cœur s’emballe et je crois que je vais m’évanouir.',
      assistantMessage: 'Merci. Ces palpitations surviennent-elles au repos et sans raison apparente, ou surtout à l’effort ? Et évitez-vous certains endroits depuis ?',
      noteBody:
        'Demande d’aide : crises de panique depuis cinq mois, 3 à 4 par semaine, avec évitement du train et des magasins bondés. Cœur examiné aux urgences, normal. Souhaite apprendre à gérer les crises sans médicaments…',
      intakeReady: 'Résumé prêt pour le psychologue',
    },
    journey: {
      subtitle: 'Une cliente souffrant de crises de panique, de la première inscription jusqu’à ce qu’elle reprenne seule le train. Vesalius prépare le terrain, vous restez le thérapeute.',
      icons: ICONS,
      steps: [
        {
          moment: 'À l’inscription',
          title: 'Le bon client chez le bon psychologue.',
          detail:
            'Panique avec évitement : Lotte va chez le collègue spécialisé en anxiété. Le trauma va au collègue EMDR, une dépression sévère avec une question de médicaments au psychiatre. Toute personne qui pense au suicide reçoit immédiatement de l’aide.',
          part: 'Rien.',
        },
        {
          moment: 'Après l’inscription',
          title: 'Une anamnèse complète, chez elle et à son rythme.',
          detail: 'Crises, ce qu’elle évite, alcool et café, médicaments par photo, ce que les urgences ont déjà examiné. La sécurité toujours vérifiée.',
          part: 'Rien.',
        },
        {
          moment: 'Pendant la séance',
          title: 'Vous écoutez. Vesalius prend des notes.',
          detail: 'L’anamnèse est déjà prête. À côté de la note, vous voyez le déroulement émotionnel de la séance, avec les phrases qui ont fait la différence.',
          part: 'Être thérapeute.',
        },
        {
          moment: 'Après la séance',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Rapport au médecin traitant, plan de traitement, explication de la panique et schéma d’exercices à la maison.',
          part: 'Relire et envoyer.',
        },
        {
          moment: 'Entre les séances',
          title: 'Des progrès suivis, pas seulement en chiffres.',
          detail: 'Scores de panique, mais aussi le train, la course et la chorale. Un court suivi après chaque séance, la sécurité vérifiée à chaque fois.',
          part: 'Agir en cas d’alerte.',
        },
      ],
    },
    modules: {
      subtitle: 'Suivez une cliente souffrant de crises de panique à travers tous les modules. Ils fonctionnent ensemble sans effort, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Quelques questions à l’inscription : la panique vers le collègue spécialisé en anxiété, le trauma vers l’EMDR, des plaintes cardiaques à l’effort d’abord vers le médecin traitant. Toute personne qui pense au suicide reçoit immédiatement de l’aide.',
        agenda: 'Son premier entretien arrive dans l’agenda du bon psychologue, avec un long créneau pour l’anamnèse.',
        preConsultation:
          'Un chatbot l’interroge sur ses crises, ce qu’elle évite, l’alcool et le café, et si elle pense au suicide. Vous savez ce qui se passe avant même qu’elle n’entre.',
        voiceReception: 'Elle préfère appeler ? La même courte anamnèse et la même planification, par téléphone.',
        scribe: 'Vous écoutez son histoire et expliquez ce qu’est la panique. Vesalius prend des notes et montre le déroulement émotionnel de la séance.',
        medication: 'Elle envoie dans le chat une photo du schéma de médication de sa pharmacie. Vous voyez le Xanax qu’elle prend si nécessaire, et la pilule qu’elle avait oublié de mentionner.',
        documentGeneration: 'Le rapport au médecin traitant, le plan de traitement et une explication de la panique avec schéma d’exercices sont prêts.',
        smartFollowUp:
          'Un court suivi après chaque séance : scores de panique, comment se passent le train et la chorale, et comment elle a vécu la séance. La sécurité est vérifiée à chaque fois.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: 'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour les psychologues.',
      focus: 'Domaine de prédilection (p. ex. anxiété et panique, trauma, couple et famille, enfants et adolescents)',
    },
  },
};
