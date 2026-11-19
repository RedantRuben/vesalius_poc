import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const PAIN_CLINIC_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "algoloog.",
      "greeting": "Hallo Ingrid! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak?",
      "patientMessage": "Al drie jaar pijn in mijn onderrug, tot achter in mijn rechterdij. Ik ben al bij vier dokters geweest.",
      "assistantMessage": "Dank u. Neemt u de tijd: welke behandelingen heeft u al gehad, en hoe lang hielpen ze?",
      "noteBody": "Chronische lage rugpijn sinds drie jaar, uitstraling naar de rechterdij tot de knie. Vier eerdere behandelaars, twee facetinfiltraties met ±3 weken effect. Tramadol 2 × 100 mg. Lasègue negatief, neurologisch normaal. PCS 31, PSEQ 22…",
      "intakeReady": "Samenvatting klaar voor de arts · eerste consultatie 60 min"
    },
    "journey": {
      "subtitle": "Een patiënte met drie jaar rugpijn, van eerste melding tot een leven met minder pijn. Vesalius doet het voorwerk, u blijft de arts.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "Bij het boeken",
          "title": "De juiste aandacht voor elke patiënt.",
          "detail": "Drie jaar pijn, vier artsen, dagelijks tramadol: Ingrid krijgt een eerste consultatie van een uur. Een recente rugpijn krijgt een halfuur, een gekende patiënt die enkel zijn inspuiting nodig heeft vijf minuten.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Haar volledige verhaal, op haar gemak.",
          "detail": "Thuis, in haar eigen tempo: hoe het begon, wat al geprobeerd werd en hoe lang het hielp, medicatie via foto, slaap, werk en zorgen. U krijgt een geordende pijnhistoriek.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U luistert. Vesalius noteert.",
          "detail": "Haar verhaal ligt al klaar. Het uur gaat naar het gesprek, het onderzoek en een gedeelde beslissing.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, verwijzing naar het multidisciplinaire programma, afbouwschema en een brief voor de arbeidsarts.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Opgevolgd, niet alleen in cijfers.",
          "detail": "Pijn en interferentie, maar ook slaap, werk, wandelen met de hond en het koor. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënte met chronische rugpijn door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Chronisch, niet chronisch of enkel een inspuiting: elke patiënt krijgt het juiste afspraaktype. Wie elders thuishoort of niet mag wachten, wordt eruit gehaald.",
        "agenda": "Ingrid krijgt een blok van een uur. Een herhaalinspuiting past in vijf minuten. Uw agenda klopt met wat elke patiënt nodig heeft.",
        "preConsultation": "Ingrid vertelt haar verhaal thuis, op haar gemak: hoe het begon, wat ze al probeerde en hoe lang het hielp, hoe ze slaapt en werkt. U krijgt drie jaar pijnhistoriek op één pagina.",
        "voiceReception": "Een digitale tweeling van uw secretariaat aan de telefoon: triëren, inplannen, verplaatsen, vragen beantwoorden, taken aanmaken. Wat een mens moet zien, wordt doorgeschakeld.",
        "scribe": "U bespreekt haar verwachtingen, onderzoekt haar rug en kiest samen voor een multidisciplinair programma. Vesalius noteert mee.",
        "medication": "Ze stuurt in de chat een foto van haar medicatieschema. Ook het slaapmiddel dat ze zelf niet vermeldde staat in het dossier, naast tramadol en pregabaline.",
        "documentGeneration": "De brief aan de huisarts, de verwijzing naar kine en psycholoog, het afbouwschema en de brief voor de arbeidsarts staan klaar.",
        "smartFollowUp": "Ze vult haar pijnscores en vragenlijsten in, en vertelt hoe het gaat met slapen, werken en wandelen met de hond."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor de pijnkliniek.",
      "focus": "Focus binnen uw vakgebied (bv. interventionele pijnbehandeling, neuromodulatie, multidisciplinaire revalidatie, kankerpijn)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a pain physician",
      "line2": "again.",
      "greeting": "Hello Ingrid! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment?",
      "patientMessage": "I’ve had pain in my lower back and down the back of my right thigh for three years. I’ve already seen four doctors.",
      "assistantMessage": "Thank you. Take your time: which treatments have you had, and how long did they help?",
      "noteBody": "Chronic low back pain for three years, radiating to the right thigh as far as the knee. Four previous clinicians, two facet injections with around three weeks of benefit. Tramadol 100 mg twice daily. Negative straight leg raise, normal neurology. PCS 31, PSEQ 22…",
      "intakeReady": "Summary ready for the doctor · first consultation 60 min"
    },
    "journey": {
      "subtitle": "A patient with three years of back pain, from her first message to a life with less pain. Vesalius does the groundwork so you can focus on her care.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "At booking",
          "title": "The right attention for every patient.",
          "detail": "Three years of pain, four doctors and daily tramadol: Ingrid gets a one-hour first consultation. Recent back pain gets half an hour; an established patient needing only an injection gets five minutes.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "Her full story, at her own pace.",
          "detail": "At home, in her own time: how it started, what she tried and how long it helped, medication from a photo, sleep, work and worries. You receive an organised pain history.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You listen. Vesalius takes notes.",
          "detail": "Her story is ready. The hour is spent on discussion, examination and a shared decision.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, referral to the multidisciplinary programme, tapering schedule and letter to the occupational physician.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow-up, beyond the scores.",
          "detail": "Pain and interference, alongside sleep, work, walking the dog and choir. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with chronic back pain through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "Chronic pain, recent pain or an injection only: every patient gets the right appointment type. Anyone needing different care or urgent attention is identified.",
        "agenda": "Ingrid gets a one-hour appointment. A repeat injection fits into five minutes. Your diary reflects what each patient needs.",
        "preConsultation": "Ingrid tells her story at home, at her own pace: how it started, what she tried, how long it helped, sleep and work. You get three years of pain history on one page.",
        "voiceReception": "A digital twin of reception on the phone: triage, booking, rescheduling, answering questions and creating tasks. Anything needing a person is transferred.",
        "scribe": "You discuss her expectations, examine her back and choose a multidisciplinary programme together. Vesalius takes notes.",
        "medication": "She sends a photo of her medication schedule. The sleeping tablet she did not mention is recorded alongside tramadol and pregabalin.",
        "documentGeneration": "The letter to the GP, physiotherapy and psychology referral, tapering schedule and occupational physician letter are ready.",
        "smartFollowUp": "She completes pain scores and questionnaires and describes sleep, work and walking the dog."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for pain clinics.",
      "focus": "Focus within your speciality (e.g. interventional pain management, neuromodulation, multidisciplinary rehabilitation, cancer pain)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "algologue.",
      "greeting": "Bonjour Ingrid ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous ?",
      "patientMessage": "J’ai mal dans le bas du dos et derrière la cuisse droite depuis trois ans. J’ai déjà vu quatre médecins.",
      "assistantMessage": "Merci. Prenez votre temps : quels traitements avez-vous déjà reçus, et combien de temps ont-ils aidé ?",
      "noteBody": "Lombalgie chronique depuis trois ans, irradiation à la cuisse droite jusqu’au genou. Quatre praticiens précédents, deux infiltrations facettaires avec environ trois semaines d’effet. Tramadol 100 mg deux fois par jour. Lasègue négatif, examen neurologique normal. PCS 31, PSEQ 22…",
      "intakeReady": "Synthèse prête pour le médecin · première consultation 60 min"
    },
    "journey": {
      "subtitle": "Une patiente avec trois ans de lombalgie, du premier signalement à une vie moins douloureuse. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
      "icons": [
        "route",
        "chat",
        "mic",
        "doc",
        "pulse"
      ],
      "steps": [
        {
          "moment": "À la prise de rendez-vous",
          "title": "L’attention adaptée à chaque patient.",
          "detail": "Trois ans de douleur, quatre médecins et du tramadol quotidien : Ingrid reçoit une première consultation d’une heure. Une lombalgie récente prend trente minutes, une infiltration seule chez un patient connu cinq minutes.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Toute son histoire, à son rythme.",
          "detail": "À domicile : le début, les traitements essayés et leur durée d’effet, les médicaments par photo, le sommeil, le travail et les inquiétudes. Vous recevez une histoire de la douleur structurée.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous écoutez. Vesalius prend des notes.",
          "detail": "Son histoire est prête. L’heure est consacrée à l’échange, à l’examen et à une décision partagée.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, orientation vers le programme multidisciplinaire, schéma de diminution et lettre au médecin du travail.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "Un suivi au-delà des chiffres.",
          "detail": "Douleur et retentissement, mais aussi sommeil, travail, promenades avec le chien et chorale. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez une patiente avec une lombalgie chronique à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Chronique, non chronique ou infiltration seule : chaque patient reçoit le bon type de rendez-vous. Ceux qui relèvent d’un autre service ou ne peuvent attendre sont repérés.",
        "agenda": "Ingrid bénéficie d’une heure. Une infiltration répétée prend cinq minutes. Votre agenda reflète les besoins de chacun.",
        "preConsultation": "Ingrid raconte son histoire à domicile, à son rythme : début, essais, durée d’effet, sommeil et travail. Vous recevez trois ans d’histoire sur une page.",
        "voiceReception": "Un jumeau numérique du secrétariat au téléphone : triage, rendez-vous, déplacements, questions et tâches. Ce qui nécessite une personne est transféré.",
        "scribe": "Vous discutez de ses attentes, examinez son dos et choisissez ensemble un programme multidisciplinaire. Vesalius prend des notes.",
        "medication": "Elle envoie une photo de son schéma de médication. Le somnifère oublié apparaît dans le dossier avec le tramadol et la prégabaline.",
        "documentGeneration": "La lettre au médecin traitant, l’orientation vers le kiné et le psychologue, le schéma de diminution et la lettre au médecin du travail sont prêts.",
        "smartFollowUp": "Elle remplit ses scores et questionnaires et raconte comment se passent le sommeil, le travail et les promenades avec le chien."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la clinique de la douleur.",
      "focus": "Domaine de prédilection (p. ex. traitement interventionnel de la douleur, neuromodulation, réadaptation multidisciplinaire, douleur cancéreuse)"
    }
  }
};
