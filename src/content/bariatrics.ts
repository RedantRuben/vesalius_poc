/**
 * Homepage copy for the bariatric surgery variant (source: sales, "Website-inhoud bariatrie", 14 Oct 2026). Everything
 * follows Mia, 44, with obesity, diabetes and sleep apnoea, from referral to lifelong follow-up after a gastric bypass.
 * The thread is the multidisciplinary pathway: surgeon, endocrinologist, dietitian, psychologist and pulmonologist work
 * from one intake and one record, so the timeline shows "Who" instead of "Your part". Dutch is the source text; English
 * (British) and French are translations for sales to review. Anything not listed here stays identical to the standard site.
 */

import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

const ICONS: TailoredHomeCopy['journey']['icons'] = ['route', 'chat', 'mic', 'doc', 'pulse'];

export const BARIATRIC_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  nl: {
    hero: {
      line1: 'Wees opnieuw',
      line2: 'bariatrisch chirurg.',
      greeting: 'Hallo Mia! Ik help het team om uw traject voor te bereiden. Wat is de belangrijkste reden voor uw aanmelding?',
      patientMessage: 'Ik weeg 112 kilo en ben 1,65 m. Ik heb al jaren alles geprobeerd: diëtist, Weight Watchers, een prikpen. Het komt telkens terug.',
      assistantMessage: 'Dank u om dat te delen. Wordt u behandeld voor suikerziekte, hoge bloeddruk of slaapapneu? En hoe lang werd u begeleid door een diëtist?',
      noteBody:
        'BMI 40,0 na −3 kg bij de diëtist. Diabetes type 2, hypertensie, slaapapneu met CPAP. Reflux met hiatushernia 2 cm op gastroscopie. Psycholoog en endocrinoloog akkoord, MDO positief. Voorstel: laparoscopische Roux-en-Y gastric bypass…',
      intakeReady: 'Samenvatting klaar voor het team',
    },
    journey: {
      subtitle: 'Een patiënte met obesitas, diabetes en slaapapneu, van aanmelding tot jaren na haar bypass. Zes disciplines, één intake, één dossier.',
      icons: ICONS,
      partLabel: 'Wie',
      steps: [
        {
          moment: 'Bij de aanmelding',
          title: 'Het juiste traject, van bij de start.',
          detail:
            'BMI 41 met diabetes en slaapapneu, 18 maanden diëtist zonder blijvend resultaat: Mia start het bariatrisch traject. Bij BMI 32 zonder comorbiditeit gaat de patiënt naar het medisch obesitasprogramma van endocrinologie.',
          part: 'Obesitascoördinator',
        },
        {
          moment: 'Na de aanmelding',
          title: 'Eén intake voor het hele team.',
          detail:
            'Gewichtsverloop, eerdere pogingen, medicatie via foto, slaapapneu, reflux, kinderwens. Daarna een korte vragenlijst per discipline. Niemand stelt dezelfde vraag twee keer.',
          part: 'Chirurg, diëtist, psycholoog, endocrinoloog, pneumoloog',
        },
        {
          moment: 'Tijdens het traject',
          title: 'Elke discipline begint waar de vorige stopte.',
          detail: 'Diëtist, psycholoog en endocrinoloog zien de intake en elkaars verslagen. Vesalius noteert mee tijdens elk consult. Het MDO heeft alles op één plek.',
          part: 'Het hele team, MDO',
        },
        {
          moment: 'Na het MDO',
          title: 'De administratie schrijft zichzelf.',
          detail: 'MDO-verslag uit de verslagen van alle disciplines, brief aan de huisarts, voorschriften en de uitleg over de voorbereiding.',
          part: 'Chirurg: nalezen en ondertekenen',
        },
        {
          moment: 'Na de ingreep',
          title: 'Levenslang opgevolgd, niet alleen op de weegschaal.',
          detail: 'Gewicht, levenskwaliteit en supplementen, maar ook eten, slapen, werk en zingen in het koor. De vragenlijsten volgen de ingreep.',
          part: 'Chirurg, diëtist, huisarts: handelen bij een signaal',
        },
      ],
    },
    modules: {
      subtitle:
        'Volg één patiënte door het volledige bariatrisch traject. De modules werken naadloos samen voor het hele team, maar elke module is ook afzonderlijk beschikbaar.',
      cards: {
        smartTriage:
          'BMI 41 met diabetes en slaapapneu gaat naar het bariatrisch traject. Zonder comorbiditeit gaat de patiënt naar het medisch obesitasprogramma. Een eerdere sleeve met reflux gaat naar de revisiechirurg.',
        agenda: 'Infosessie, diëtist, psycholoog, endocrinoloog en chirurg: haar afspraken staan in de juiste volgorde, zodat het MDO alles heeft.',
        preConsultation:
          'Eén intake die het hele team ziet, daarna een korte vragenlijst per discipline. Gewichtsverloop, eerdere pogingen, reflux, slaapapneu en kinderwens liggen klaar vóór het eerste consult.',
        voiceReception: 'Belt ze liever? Dezelfde vragen en de juiste plaats in het traject, via de telefoon.',
        scribe: 'Bij de diëtist, de psycholoog en de chirurg noteert Vesalius mee, elk in de structuur van de eigen discipline.',
        medication:
          'Ze stuurt in de chat een foto van haar apotheekschema. Ook de maagbeschermer en de pil die ze vergat, staan in het dossier. Forxiga stoppen vóór de ingreep, de pil vervangen.',
        documentGeneration: 'Het MDO-verslag, de brief aan de huisarts, de voorschriften en de uitleg over de voorbereiding staan klaar.',
        smartFollowUp: 'Gewicht, levenskwaliteit en supplementen, maar ook hoe eten, slapen, werken en zingen gaan. Levenslang, met een signaal naar het team wanneer het telt.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.nl.finalCta,
      subtitle: 'Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt uw team met de standaardconfiguratie voor bariatrie.',
      focus: 'Focus binnen uw vakgebied (bv. primaire bariatrie, revisiechirurgie, metabole chirurgie)',
    },
  },
  en: {
    hero: {
      line1: 'Be a bariatric surgeon',
      line2: 'again.',
      greeting: "Hello Mia! I'm here to help the team prepare your pathway. What is the main reason for your referral?",
      patientMessage: 'I weigh 112 kilos and I’m 1.65 m tall. I’ve tried everything for years: a dietitian, Weight Watchers, an injection pen. It always comes back.',
      assistantMessage: 'Thank you for sharing that. Are you being treated for diabetes, high blood pressure or sleep apnoea? And how long were you supported by a dietitian?',
      noteBody:
        'BMI 40.0 after −3 kg with the dietitian. Type 2 diabetes, hypertension, sleep apnoea on CPAP. Reflux with a 2 cm hiatus hernia on gastroscopy. Psychologist and endocrinologist in agreement, MDT positive. Proposal: laparoscopic Roux-en-Y gastric bypass…',
      intakeReady: 'Summary ready for the team',
    },
    journey: {
      subtitle: 'A patient with obesity, diabetes and sleep apnoea, from referral to years after her bypass. Six disciplines, one intake, one record.',
      icons: ICONS,
      partLabel: 'Who',
      steps: [
        {
          moment: 'At referral',
          title: 'The right pathway, from the start.',
          detail:
            'BMI 41 with diabetes and sleep apnoea, 18 months with a dietitian without lasting results: Mia starts the bariatric pathway. With BMI 32 and no comorbidity, the patient goes to endocrinology’s medical obesity programme.',
          part: 'Obesity coordinator',
        },
        {
          moment: 'After referral',
          title: 'One intake for the whole team.',
          detail:
            'Weight history, previous attempts, medication by photo, sleep apnoea, reflux, plans for pregnancy. Then a short questionnaire per discipline. Nobody asks the same question twice.',
          part: 'Surgeon, dietitian, psychologist, endocrinologist, pulmonologist',
        },
        {
          moment: 'During the pathway',
          title: 'Each discipline starts where the last one stopped.',
          detail: 'Dietitian, psychologist and endocrinologist see the intake and each other’s reports. Vesalius takes notes in every consultation. The MDT has everything in one place.',
          part: 'The whole team, MDT',
        },
        {
          moment: 'After the MDT',
          title: 'The paperwork writes itself.',
          detail: 'MDT report from every discipline’s notes, letter to the GP, prescriptions and the explanation of how to prepare.',
          part: 'Surgeon: review and sign',
        },
        {
          moment: 'After surgery',
          title: 'Followed for life, not just on the scales.',
          detail: 'Weight, quality of life and supplements, but also eating, sleep, work and singing in the choir. The questionnaires follow the operation.',
          part: 'Surgeon, dietitian, GP: act when flagged',
        },
      ],
    },
    modules: {
      subtitle: 'Follow one patient through the whole bariatric pathway. The modules work together seamlessly for the whole team, and each module is also available on its own.',
      cards: {
        smartTriage:
          'BMI 41 with diabetes and sleep apnoea goes to the bariatric pathway. Without comorbidity, the patient goes to the medical obesity programme. A previous sleeve with reflux goes to the revision surgeon.',
        agenda: 'Information session, dietitian, psychologist, endocrinologist and surgeon: her appointments are in the right order, so the MDT has everything.',
        preConsultation:
          'One intake the whole team sees, then a short questionnaire per discipline. Weight history, previous attempts, reflux, sleep apnoea and plans for pregnancy are ready before the first consultation.',
        voiceReception: 'Prefers to call? The same questions and the right place in the pathway, by phone.',
        scribe: 'With the dietitian, the psychologist and the surgeon, Vesalius takes notes, each in their own discipline’s structure.',
        medication:
          'She sends a photo of her pharmacy schedule in the chat. The stomach protector and the pill she forgot are in the record too. Stop Forxiga before surgery, replace the pill.',
        documentGeneration: 'The MDT report, the letter to the GP, the prescriptions and the explanation of how to prepare are ready.',
        smartFollowUp: 'Weight, quality of life and supplements, but also how eating, sleep, work and singing are going. For life, with an alert to the team when it matters.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.en.finalCta,
      subtitle: 'Try Vesalius free for a month. Leave your details and within 24 hours your team will be working with our standard set-up for bariatric surgery.',
      focus: 'Focus within your speciality (e.g. primary bariatric surgery, revisional surgery, metabolic surgery)',
    },
  },
  fr: {
    hero: {
      line1: 'Redevenez',
      line2: 'chirurgien bariatrique.',
      greeting: 'Bonjour Mia. J’aide l’équipe à préparer votre parcours. Quel est le motif principal de votre inscription ?',
      patientMessage: 'Je pèse 112 kilos pour 1,65 m. J’essaie tout depuis des années : diététicien, Weight Watchers, un stylo injecteur. Ça revient toujours.',
      assistantMessage: 'Merci de nous le dire. Êtes-vous traitée pour un diabète, une hypertension ou une apnée du sommeil ? Et combien de temps avez-vous été suivie par un diététicien ?',
      noteBody:
        'IMC 40,0 après −3 kg chez le diététicien. Diabète de type 2, hypertension, apnée du sommeil sous CPAP. Reflux avec hernie hiatale de 2 cm à la gastroscopie. Psychologue et endocrinologue d’accord, RCP favorable. Proposition : bypass gastrique Roux-en-Y par laparoscopie…',
      intakeReady: 'Résumé prêt pour l’équipe',
    },
    journey: {
      subtitle: 'Une patiente atteinte d’obésité, de diabète et d’apnée du sommeil, de l’inscription à des années après son bypass. Six disciplines, une anamnèse, un dossier.',
      icons: ICONS,
      partLabel: 'Qui',
      steps: [
        {
          moment: 'À l’inscription',
          title: 'Le bon parcours, dès le départ.',
          detail:
            'IMC 41 avec diabète et apnée du sommeil, 18 mois de diététicien sans résultat durable : Mia entre dans le parcours bariatrique. Avec un IMC de 32 sans comorbidité, le patient va au programme médical de l’obésité de l’endocrinologie.',
          part: 'Coordinateur obésité',
        },
        {
          moment: 'Après l’inscription',
          title: 'Une seule anamnèse pour toute l’équipe.',
          detail:
            'Évolution du poids, tentatives antérieures, médicaments par photo, apnée du sommeil, reflux, désir de grossesse. Ensuite un court questionnaire par discipline. Personne ne pose deux fois la même question.',
          part: 'Chirurgien, diététicien, psychologue, endocrinologue, pneumologue',
        },
        {
          moment: 'Pendant le parcours',
          title: 'Chaque discipline reprend là où la précédente s’est arrêtée.',
          detail: 'Diététicien, psychologue et endocrinologue voient l’anamnèse et les rapports des autres. Vesalius prend des notes à chaque consultation. La RCP a tout au même endroit.',
          part: 'Toute l’équipe, RCP',
        },
        {
          moment: 'Après la RCP',
          title: 'L’administratif se rédige tout seul.',
          detail: 'Rapport de RCP à partir des rapports de toutes les disciplines, lettre au médecin traitant, prescriptions et explication de la préparation.',
          part: 'Chirurgien : relire et signer',
        },
        {
          moment: 'Après l’intervention',
          title: 'Suivie à vie, pas seulement sur la balance.',
          detail: 'Poids, qualité de vie et suppléments, mais aussi l’alimentation, le sommeil, le travail et le chant à la chorale. Les questionnaires suivent l’intervention.',
          part: 'Chirurgien, diététicien, médecin traitant : agir en cas d’alerte',
        },
      ],
    },
    modules: {
      subtitle:
        'Suivez une patiente à travers tout le parcours bariatrique. Les modules fonctionnent ensemble sans effort pour toute l’équipe, et chaque module est aussi disponible séparément.',
      cards: {
        smartTriage:
          'Un IMC de 41 avec diabète et apnée du sommeil va au parcours bariatrique. Sans comorbidité, le patient va au programme médical de l’obésité. Une sleeve antérieure avec reflux va au chirurgien de révision.',
        agenda: 'Séance d’information, diététicien, psychologue, endocrinologue et chirurgien : ses rendez-vous sont dans le bon ordre, pour que la RCP ait tout.',
        preConsultation:
          'Une anamnèse que toute l’équipe voit, puis un court questionnaire par discipline. Évolution du poids, tentatives antérieures, reflux, apnée du sommeil et désir de grossesse sont prêts avant la première consultation.',
        voiceReception: 'Elle préfère appeler ? Les mêmes questions et la bonne place dans le parcours, par téléphone.',
        scribe: 'Chez le diététicien, le psychologue et le chirurgien, Vesalius prend des notes, chacun dans la structure de sa propre discipline.',
        medication:
          'Elle envoie dans le chat une photo de son schéma de pharmacie. Le protecteur gastrique et la pilule qu’elle avait oubliés figurent aussi dans le dossier. Arrêter Forxiga avant l’intervention, remplacer la pilule.',
        documentGeneration: 'Le rapport de RCP, la lettre au médecin traitant, les prescriptions et l’explication de la préparation sont prêts.',
        smartFollowUp: 'Poids, qualité de vie et suppléments, mais aussi comment se passent l’alimentation, le sommeil, le travail et le chant. À vie, avec une alerte à l’équipe quand cela compte.',
      },
    },
    finalCta: {
      ...ORTHO_HOME.fr.finalCta,
      subtitle:
        'Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures votre équipe travaille avec la configuration standard pour la chirurgie bariatrique.',
      focus: 'Domaine de prédilection (p. ex. chirurgie bariatrique primaire, chirurgie de révision, chirurgie métabolique)',
    },
  },
};
