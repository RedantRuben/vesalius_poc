import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const SPORTS_MEDICINE_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "sportarts.",
      "greeting": "Hallo Koen! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Al drie maanden pijn en stijfheid boven mijn rechterhiel, vooral 's ochtends en bij het begin van het lopen. Ik train voor een marathon.",
      "assistantMessage": "Dank u. Is de pijn geleidelijk gekomen, of voelde u plots een knal of een trap tegen uw kuit? En kunt u op de tenen van uw rechtervoet staan?",
      "noteBody": "Midportion achillespeespijn rechts sinds drie maanden, na een opbouw van 30 naar 55 km per week. Ochtendstijfheid 30 minuten. Verdikking 3 tot 5 cm boven de insertie, Thompson negatief. Heel raise rechts 14, links 28. Echo: AP-diameter 8,9 mm…"
    },
    "journey": {
      "subtitle": "Een loper met achillespeespijn, van eerste melding tot terug op schema. Vesalius doet het voorwerk, u blijft de arts.",
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
          "title": "De juiste patiënt bij de juiste arts.",
          "detail": "Geleidelijke pijn, kan nog lopen, geen knal: Koen gaat naar de sportarts. Een plotse knal en niet meer op de tenen kunnen staan gaat met voorrang naar orthopedie.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige sportintake, thuis en in zijn eigen taal.",
          "detail": "Trainingsvolume van de laatste weken, nieuwe schoenen, ochtendstijfheid, VISA-A als nulmeting. Op de foto van zijn medicatie staat een antibioticum dat hij vergat.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De sportanamnese ligt al klaar. U begint meteen bij palpatie, heel raise test en echo. De nota volgt uw vaste sjabloon.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift kine en een belastingsschema met pijngrens voor Koen.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Herstel thuis opgevolgd, niet alleen in cijfers.",
          "detail": "VISA-A op week 2, 6 en 12, maar ook kilometers, ochtendstijfheid, werk en de marathon. De vragenlijsten volgen de gekozen behandeling.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één loper met achillespeespijn door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Een overbelaste pees gaat naar de sportarts. Een plotse knal achteraan de kuit gaat met voorrang naar orthopedie. Wie bijna flauwviel bij inspanning, wordt meteen gemarkeerd.",
        "agenda": "Zijn afspraak komt in een langer blok, met tijd voor echografie.",
        "preConsultation": "Elke sporter krijgt dezelfde sportanamnese: sport, trainingsvolume, recente wijzigingen, eerdere blessures. Daarna vragen die bij een pees tellen, en de VISA-A als nulmeting.",
        "voiceReception": "Belt hij liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U onderzoekt zijn pees, telt de heel raises en bekijkt de echo. Vesalius noteert mee in uw vaste sjabloon Sportgeneeskunde, links en rechts naast elkaar.",
        "medication": "Hij stuurt in de chat een foto van het medicatieschema van zijn apotheek. Daarop staat een recente kuur ciprofloxacine die hij zelf niet vermeldde, een gekende risicofactor voor peesklachten.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift voor kine en zijn belastingsschema met pijngrens staan klaar.",
        "smartFollowUp": "Op vaste momenten vult hij de VISA-A in, en vertelt hij hoeveel hij loopt, hoe stijf de pees 's ochtends is en hoe het met de marathon gaat."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor sportgeneeskunde.",
      "focus": "Focus binnen uw vakgebied (bv. sportletsels, inspanningstesten, sportkeuring)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a sports physician",
      "line2": "again.",
      "greeting": "Hello Koen! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "I’ve had pain and stiffness above my right heel for three months, especially in the morning and when I start running. I’m training for a marathon.",
      "assistantMessage": "Thank you. Did the pain develop gradually, or did you suddenly feel a snap or a kick in your calf? Can you stand on the toes of your right foot?",
      "noteBody": "Right midportion Achilles pain for three months after increasing from 30 to 55 km per week. Morning stiffness for 30 minutes. Thickening 3–5 cm above the insertion, negative Thompson test. Heel raises: right 14, left 28. Ultrasound: AP diameter 8.9 mm…"
    },
    "journey": {
      "subtitle": "A runner with Achilles pain, from his first message to getting back on track. Vesalius does the groundwork so you can focus on his care.",
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
          "title": "The right patient sees the right clinician.",
          "detail": "Gradual pain, still able to run, no snap: Koen sees the sports physician. A sudden snap and inability to stand on tiptoes receive priority in orthopaedics.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full sports intake, at home and in his own language.",
          "detail": "Recent training volume, new shoes, morning stiffness and a VISA-A baseline. His medication photo shows an antibiotic course he forgot to mention.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "His sports history is ready. You start with palpation, heel raises and ultrasound. The note follows your usual template.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, physiotherapy prescription and a loading plan with a pain limit for Koen.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Follow recovery at home, beyond the scores.",
          "detail": "VISA-A at weeks 2, 6 and 12, alongside mileage, morning stiffness, work and the marathon. The questionnaires follow the treatment chosen.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one runner with Achilles pain through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "An overloaded tendon goes to the sports physician. A sudden snap in the calf receives priority in orthopaedics. Near-fainting during exercise is flagged immediately.",
        "agenda": "His appointment gets a longer slot, with time for ultrasound.",
        "preConsultation": "Every athlete receives the same sports history: sport, training volume, recent changes and previous injuries. Tendon-specific questions follow, with a VISA-A baseline.",
        "voiceReception": "Would he rather call? He gets the same triage and booking over the phone.",
        "scribe": "You examine his tendon, count heel raises and review the ultrasound. Vesalius records it in your Sports medicine template, with left and right side by side.",
        "medication": "He sends a photo of his pharmacy’s medication schedule. It includes a recent ciprofloxacin course he did not mention, a recognised risk factor for tendon symptoms.",
        "documentGeneration": "The letter to the GP, physiotherapy prescription and loading plan with a pain limit are ready.",
        "smartFollowUp": "He completes the VISA-A at set times and describes his mileage, morning stiffness and marathon plans."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for sports medicine.",
      "focus": "Focus within your speciality (e.g. sports injuries, exercise testing, pre-participation screening)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "médecin du sport.",
      "greeting": "Bonjour Koen ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "J’ai mal et une raideur au-dessus du talon droit depuis trois mois, surtout le matin et au début de la course. Je prépare un marathon.",
      "assistantMessage": "Merci. La douleur est-elle venue progressivement, ou avez-vous ressenti un claquement ou un coup dans le mollet ? Pouvez-vous vous mettre sur la pointe du pied droit ?",
      "noteBody": "Douleur du corps du tendon d’Achille droit depuis trois mois, après une augmentation de 30 à 55 km par semaine. Raideur matinale de 30 minutes. Épaississement à 3–5 cm de l’insertion, Thompson négatif. Élévations du talon : droite 14, gauche 28. Échographie : diamètre AP 8,9 mm…"
    },
    "journey": {
      "subtitle": "Un coureur avec une douleur achilléenne, du premier signalement au retour à son programme. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
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
          "title": "Chaque patient est orienté vers le bon professionnel.",
          "detail": "Douleur progressive, course encore possible, sans claquement : Koen voit le médecin du sport. Un claquement soudain avec impossibilité de se mettre sur la pointe du pied donne priorité en orthopédie.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse sportive complète, chez lui et dans sa langue.",
          "detail": "Volume récent, nouvelles chaussures, raideur matinale et VISA-A initial. La photo des médicaments révèle un antibiotique oublié.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse sportive est prête. Vous commencez par la palpation, les élévations du talon et l’échographie. La note suit votre modèle habituel.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, prescription de kinésithérapie et programme de charge avec seuil de douleur pour Koen.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "La récupération suivie à domicile, au-delà des scores.",
          "detail": "VISA-A aux semaines 2, 6 et 12, mais aussi kilomètres, raideur matinale, travail et marathon. Les questionnaires suivent le traitement choisi.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez un coureur avec une douleur achilléenne à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Un tendon surchargé va chez le médecin du sport. Un claquement soudain du mollet donne priorité en orthopédie. Un malaise à l’effort est signalé immédiatement.",
        "agenda": "Son rendez-vous bénéficie d’un créneau plus long, avec le temps nécessaire à l’échographie.",
        "preConsultation": "Chaque sportif reçoit la même anamnèse : sport, volume, changements récents et blessures antérieures. Puis viennent les questions sur le tendon et le VISA-A initial.",
        "voiceReception": "Il préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous examinez le tendon, comptez les élévations du talon et regardez l’échographie. Vesalius remplit votre modèle Médecine du sport, droite et gauche côte à côte.",
        "medication": "Il envoie une photo du schéma de médication de sa pharmacie. Elle révèle une cure récente de ciprofloxacine oubliée, facteur de risque connu de symptômes tendineux.",
        "documentGeneration": "La lettre au médecin traitant, la prescription de kinésithérapie et le programme de charge avec seuil de douleur sont prêts.",
        "smartFollowUp": "Il remplit le VISA-A à intervalles fixes et décrit ses kilomètres, la raideur matinale et son projet de marathon."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la médecine du sport.",
      "focus": "Domaine de prédilection (p. ex. lésions sportives, tests d'effort, examen médico-sportif)"
    }
  }
};
