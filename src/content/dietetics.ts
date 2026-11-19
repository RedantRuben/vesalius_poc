import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const DIETETICS_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: "Wees opnieuw",
      line2: "diëtist.",
      greeting: "Hallo Luc! Ik help de diëtist om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      patientMessage: "Mijn huisarts heeft drie maanden geleden diabetes vastgesteld. Ik moet afvallen, maar ik weet niet waar te beginnen.",
      assistantMessage: "Dank u. Neemt u insuline of tabletten voor de suiker? En heeft u al eens een hypo gehad: trillen, zweten of plots veel honger?",
      intakeReady: "Samenvatting klaar voor de diëtist",
      noteBody: "Diabetes type 2 sinds drie maanden, metformine 850 mg 2× per dag. Gewicht 98,4 kg, BMI 31,1, buikomtrek 112 cm. HbA1c 7,8%. Slaat het ontbijt over, ±1 liter cola per dag, avondsnacks. Diagnose: overmatige inname van suikerhoudende dranken…",
    },
    journey: {
      subtitle: "Een patiënt met nieuw vastgestelde diabetes type 2, van eerste melding tot een nieuw eetpatroon. Vesalius doet het voorwerk, u blijft de diëtist.",
      icons: ICONS,
      steps: [
        {
          moment: "Bij het boeken",
          title: "De juiste patiënt bij de juiste diëtist.",
          detail: "Diabetes type 2 met een voorschrift van de huisarts: Luc gaat naar de diëtist diabetes en gewicht. Wie glutenvrij wil eten zonder diagnose, gaat eerst langs de huisarts voor een bloedtest.",
          part: "Niets.",
        },
        {
          moment: "Na de boeking",
          title: "Een volledige intake, thuis en in zijn eigen taal.",
          detail: "Een gewone werkdag, wat hij drinkt, drie dagen maaltijdfoto's in de chat, medicatie via een foto, zijn doel. Geen hypo's.",
          part: "Niets.",
        },
        {
          moment: "Tijdens het consult",
          title: "U begeleidt. Vesalius luistert mee.",
          detail: "De eetanamnese ligt al klaar. U meet, bespreekt zijn maaltijdfoto's en spreekt samen drie haalbare doelen af.",
          part: "Gewoon diëtist zijn.",
        },
        {
          moment: "Na het consult",
          title: "De administratie schrijft zichzelf.",
          detail: "Verslag aan de huisarts, een persoonlijk voedingsplan en het attest voor het ziekenfonds.",
          part: "Nalezen en ondertekenen.",
        },
        {
          moment: "Tussen de sessies",
          title: "Opvolging thuis, niet alleen op de weegschaal.",
          detail: "Gewicht en buikomtrek, maar ook PAID-5, cola per dag, slaap en fietsen met zijn kleinzoon. Hypo's worden elke keer opnieuw nagevraagd.",
          part: "Handelen bij een signaal.",
        },
      ],
    },
    modules: {
      subtitle: "Volg één patiënt met diabetes type 2 door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      cards: {
        smartTriage: "Diabetes type 2 met een voorschrift gaat naar de diëtist diabetes en gewicht. Prikkelbare darm gaat naar uw collega maag-darm. Wie hypo's meldt, wordt gemarkeerd.",
        agenda: "Zijn eerste consult komt als lang blok van een uur in de agenda van de diëtist diabetes en gewicht.",
        preConsultation: "Een chatbot vraagt naar zijn werkdag, wat hij drinkt, beweging en zijn doel. Drie dagen lang stuurt hij foto's van zijn maaltijden. U kent zijn bord nog voor hij binnenkomt.",
        voiceReception: "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        scribe: "U meet, bespreekt zijn maaltijdfoto's en spreekt samen drie doelen af. Vesalius noteert mee, in de structuur van een diëtistische nota.",
        medication: "Hij stuurt in de chat een foto van zijn medicatieschema. De medicatie staat gestructureerd in het dossier, ook de maagzuurremmer die hij zelf vergat. Geen middelen die hypo's geven.",
        documentGeneration: "Het verslag aan de huisarts, zijn persoonlijk voedingsplan en het attest voor het ziekenfonds staan klaar.",
        smartFollowUp: "Hij geeft zijn gewicht en buikomtrek door, vult de PAID-5 in en vertelt hoe het gaat met de cola, slapen en fietsen met zijn kleinzoon.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor diëtiek.",
      focus: "Focus binnen uw vakgebied (bv. diabetes en gewicht, maag-darm, pediatrie)",
    },
  },
  en: {
    hero: {
      line1: "Be a dietitian",
      line2: "again.",
      greeting: "Hello Luc! I’m here to help the dietitian prepare for your visit. What is the main reason for your appointment today?",
      patientMessage: "My GP diagnosed diabetes three months ago. I need to lose weight, but I don’t know where to start.",
      assistantMessage: "Thank you. Do you take insulin or tablets for diabetes? Have you ever had a hypo, with shaking, sweating or sudden hunger?",
      intakeReady: "Summary ready for the dietitian",
      noteBody: "Type 2 diabetes diagnosed three months ago, metformin 850 mg twice daily. Weight 98.4 kg, BMI 31.1, waist 112 cm. HbA1c 7.8%. Skips breakfast, about one litre of cola daily, evening snacks. Dietetic diagnosis: excessive intake of sugar-sweetened drinks…",
    },
    journey: {
      subtitle: "A patient with newly diagnosed type 2 diabetes, from his first message to new eating habits. Vesalius does the groundwork so you can focus on dietetics.",
      icons: ICONS,
      steps: [
        {
          moment: "At booking",
          title: "The right patient sees the right dietitian.",
          detail: "Type 2 diabetes with a GP referral: Luc goes to the diabetes and weight dietitian. Anyone wanting to go gluten-free without a diagnosis sees the GP for a blood test first.",
          part: "Nothing.",
        },
        {
          moment: "After booking",
          title: "A full intake, at home and in his own language.",
          detail: "A typical working day, what he drinks, three days of meal photos in the chat, a medication photo and his own goal. No hypos.",
          part: "Nothing.",
        },
        {
          moment: "During the consultation",
          title: "You guide. Vesalius listens.",
          detail: "The dietary history is ready. You take measurements, discuss his meal photos and agree three achievable goals together.",
          part: "Just be the dietitian.",
        },
        {
          moment: "After the consultation",
          title: "The paperwork writes itself.",
          detail: "A report to the GP, a personal nutrition plan and a certificate for his health insurer.",
          part: "Review and sign.",
        },
        {
          moment: "Between sessions",
          title: "Follow-up at home, beyond the scales.",
          detail: "Weight and waist measurement, alongside PAID-5, daily cola intake, sleep and cycling with his grandson. Hypos are checked at every follow-up.",
          part: "Act on an alert.",
        },
      ],
    },
    modules: {
      subtitle: "Follow one patient with type 2 diabetes through all eight modules. They work together seamlessly and are also available individually.",
      cards: {
        smartTriage: "Type 2 diabetes with a referral goes to the diabetes and weight dietitian. IBS goes to your gastrointestinal colleague. Anyone reporting hypos is flagged.",
        agenda: "His first consultation gets a full hour in the diabetes and weight dietitian’s diary.",
        preConsultation: "The chatbot asks about his working day, drinks, activity and goals. He sends photos of his meals over three days. You know what is on his plate before he arrives.",
        voiceReception: "Would he rather call? He gets the same triage and booking over the phone.",
        scribe: "You take measurements, discuss his meal photos and agree three goals together. Vesalius takes notes in the structure of a dietetic report.",
        medication: "He sends a photo of his medication schedule. The record includes the acid suppressant he forgot to mention. He takes no medicines associated with hypos.",
        documentGeneration: "The report to the GP, his personal nutrition plan and the health insurer certificate are ready.",
        smartFollowUp: "He reports his weight and waist measurement, completes the PAID-5 and tells you about cola, sleep and cycling with his grandson.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for dietetics.",
      focus: "Focus within your specialty (e.g. diabetes and weight, gastrointestinal, paediatrics)",
    },
  },
  fr: {
    hero: {
      line1: "Redevenez",
      line2: "diététicien.",
      greeting: "Bonjour Luc ! J’aide le diététicien à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      patientMessage: "Mon médecin a diagnostiqué un diabète il y a trois mois. Je dois perdre du poids, mais je ne sais pas par où commencer.",
      assistantMessage: "Merci. Prenez-vous de l’insuline ou des comprimés pour le diabète ? Avez-vous déjà eu une hypoglycémie avec tremblements, sueurs ou faim soudaine ?",
      intakeReady: "Résumé prêt pour le diététicien",
      noteBody: "Diabète de type 2 depuis trois mois, metformine 850 mg 2× par jour. Poids 98,4 kg, IMC 31,1, tour de taille 112 cm. HbA1c 7,8 %. Saute le petit-déjeuner, environ un litre de cola par jour, grignotages le soir. Diagnostic diététique : consommation excessive de boissons sucrées…",
    },
    journey: {
      subtitle: "Un patient avec un diabète de type 2 récemment diagnostiqué, du premier signalement à de nouvelles habitudes alimentaires. Vesalius prépare le terrain pour que vous puissiez vous consacrer à la diététique.",
      icons: ICONS,
      steps: [
        {
          moment: "À la prise de rendez-vous",
          title: "Chaque patient est orienté vers le bon diététicien.",
          detail: "Diabète de type 2 avec une prescription du médecin traitant : Luc est orienté vers le diététicien diabète et poids. Avant de manger sans gluten sans diagnostic, le patient voit le médecin traitant pour une prise de sang.",
          part: "Rien.",
        },
        {
          moment: "Après la prise de rendez-vous",
          title: "Une anamnèse complète, chez lui et dans sa langue.",
          detail: "Sa journée de travail, ses boissons, trois jours de photos de repas dans le chat, ses médicaments par photo et son objectif. Aucune hypoglycémie.",
          part: "Rien.",
        },
        {
          moment: "Pendant la consultation",
          title: "Vous accompagnez. Vesalius écoute.",
          detail: "L’anamnèse alimentaire est prête. Vous prenez les mesures, discutez de ses photos et fixez ensemble trois objectifs réalistes.",
          part: "Être diététicien.",
        },
        {
          moment: "Après la consultation",
          title: "Les documents se rédigent tout seuls.",
          detail: "Compte rendu au médecin traitant, plan alimentaire personnel et attestation pour la mutualité.",
          part: "Relire et signer.",
        },
        {
          moment: "Entre les séances",
          title: "Un suivi à domicile, au-delà de la balance.",
          detail: "Poids et tour de taille, mais aussi PAID-5, cola quotidien, sommeil et vélo avec son petit-fils. Les hypoglycémies sont recherchées à chaque suivi.",
          part: "Agir en cas d’alerte.",
        },
      ],
    },
    modules: {
      subtitle: "Suivez un patient atteint de diabète de type 2 à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      cards: {
        smartTriage: "Le diabète de type 2 avec prescription est orienté vers le diététicien diabète et poids. L’intestin irritable relève de votre collègue spécialisé en gastro-intestinal. Les hypoglycémies sont signalées.",
        agenda: "Sa première consultation bénéficie d’une heure complète dans l’agenda du diététicien diabète et poids.",
        preConsultation: "Le chatbot l’interroge sur sa journée, ses boissons, son activité et son objectif. Il envoie des photos de ses repas pendant trois jours. Vous connaissez son assiette avant son arrivée.",
        voiceReception: "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        scribe: "Vous prenez les mesures, discutez des photos de repas et fixez ensemble trois objectifs. Vesalius prend des notes dans la structure d’un compte rendu diététique.",
        medication: "Il envoie une photo de son schéma de médication. Le dossier reprend aussi l’antiacide qu’il avait oublié de mentionner. Il ne prend aucun médicament à risque d’hypoglycémie.",
        documentGeneration: "Le compte rendu au médecin traitant, son plan alimentaire personnel et l’attestation pour la mutualité sont prêts.",
        smartFollowUp: "Il transmet son poids et son tour de taille, remplit le PAID-5 et raconte comment se passent le cola, le sommeil et le vélo avec son petit-fils.",
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle: "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la diététique.",
      focus: "Domaine de prédilection (p. ex. diabète et poids, gastro-intestinal, pédiatrie)",
    },
  },
};
