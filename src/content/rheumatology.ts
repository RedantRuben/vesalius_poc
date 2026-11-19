import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const RHEUMATOLOGY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "reumatoloog.",
      "greeting": "Hallo Lies! Ik help de arts om uw bezoek voor te bereiden. Wat is de belangrijkste reden voor uw afspraak vandaag?",
      "patientMessage": "Al drie maanden pijnlijke, gezwollen vingers aan beide handen. 's Ochtends kan ik geen vuist maken.",
      "assistantMessage": "Dank u. Hoe lang duurt het 's ochtends voor uw handen weer soepel zijn? En ziet u zwelling aan uw knokkels?",
      "noteBody": "Pijn en zwelling MCP en PIP beide handen sinds drie maanden, ochtendstijfheid 90 minuten. Squeeze test MCP beiderzijds positief, 6 gezwollen en 8 drukpijnlijke gewrichten. Anti-CCP > 200 U/mL, CRP 18 mg/L. Echo: synovitis met Doppler MCP2-3 beiderzijds…"
    },
    "journey": {
      "subtitle": "Een patiënte met beginnende reumatoïde artritis, van eerste melding tot remissie. Vesalius doet het voorwerk, u blijft de arts.",
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
          "detail": "Gezwollen knokkels aan beide handen, anderhalf uur ochtendstijfheid, anti-CCP positief: Lies krijgt voorrang in de artritisraadpleging. Pijn overal zonder zwelling gaat naar fysische geneeskunde.",
          "part": "Niets."
        },
        {
          "moment": "Na de boeking",
          "title": "Een volledige intake, thuis en in haar eigen taal.",
          "detail": "Ochtendstijfheid in minuten, de gewrichten zelf aangeduid op een schema, het labo van de huisarts, medicatie via foto. Psoriasis, darm en ogen nagevraagd.",
          "part": "Niets."
        },
        {
          "moment": "Tijdens het consult",
          "title": "U onderzoekt. Vesalius luistert mee.",
          "detail": "De anamnese ligt al klaar. U begint meteen met de gewrichtentelling en de echo.",
          "part": "Gewoon arts zijn."
        },
        {
          "moment": "Na het consult",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Brief aan de huisarts, voorschrift methotrexaat en foliumzuur, het afbouwschema van de corticoïden en de labo-aanvraag met monitoringschema.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Na de behandeling",
          "title": "Op weg naar remissie, thuis opgevolgd.",
          "detail": "RAPID3 en ochtendstijfheid, maar ook vermoeidheid, werk en piano spelen. Elke check-in vraagt naar koorts en infecties onder methotrexaat.",
          "part": "Handelen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënte met beginnende reumatoïde artritis door alle modules. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Gezwollen gewrichten met lange ochtendstijfheid krijgen voorrang in de artritisraadpleging. Pijn overal zonder zwelling gaat naar fysische geneeskunde. Een nieuwe hoofdpijn met wazig zien gaat meteen naar het secretariaat.",
        "agenda": "Haar afspraak komt met voorrang in de agenda, met een lang blok voor een nieuwe patiënte.",
        "preConsultation": "Een chatbot stelt haar de vragen die bij een artritis tellen: ochtendstijfheid in minuten, welke gewrichten, psoriasis, darm en ogen, het labo van de huisarts. U weet wat er speelt nog voor ze binnenkomt.",
        "voiceReception": "Belt ze liever? Dezelfde triage en inplanning, via de telefoon.",
        "scribe": "U telt de gezwollen gewrichten, doet de echo en bespreekt het labo. Samen kiest u voor methotrexaat. Vesalius noteert mee.",
        "medication": "Zij stuurt in de chat een foto van het medicatieschema van haar apotheek. De medicatie staat gestructureerd in het dossier, ook de pil en de vitamine D die ze zelf vergat te vermelden. Dat telt bij de start van methotrexaat.",
        "documentGeneration": "De brief aan de huisarts, het voorschrift voor methotrexaat en foliumzuur, het afbouwschema van Medrol en de labo-aanvraag staan klaar.",
        "smartFollowUp": "Zij vult de RAPID3 in en vertelt hoe het gaat met haar ochtendstijfheid, vermoeidheid, werk en piano. Bij koorts of keelpijn onder methotrexaat krijgt uw team een signaal."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor reumatologie.",
      "focus": "Focus binnen uw vakgebied (bv. vroege artritis, spondyloartritis, bindweefselziekten)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a rheumatologist",
      "line2": "again.",
      "greeting": "Hello Lies! I’m here to help the doctor prepare for your visit. What is the main reason for your appointment today?",
      "patientMessage": "I’ve had painful, swollen fingers on both hands for three months. In the morning I can’t make a fist.",
      "assistantMessage": "Thank you. How long does it take for your hands to loosen up in the morning? Can you see swelling around your knuckles?",
      "noteBody": "Pain and swelling in the MCP and PIP joints of both hands for three months, morning stiffness for 90 minutes. Bilateral positive MCP squeeze test, 6 swollen and 8 tender joints. Anti-CCP > 200 U/mL, CRP 18 mg/L. Ultrasound: synovitis with Doppler in MCP2–3 bilaterally…"
    },
    "journey": {
      "subtitle": "A patient with early rheumatoid arthritis, from her first message to remission. Vesalius does the groundwork so you can focus on her care.",
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
          "detail": "Swollen knuckles on both hands, 90 minutes of morning stiffness and positive anti-CCP: Lies gets priority at the arthritis clinic. Widespread pain without swelling goes to physical medicine.",
          "part": "Nothing."
        },
        {
          "moment": "After booking",
          "title": "A full intake, at home and in her own language.",
          "detail": "Morning stiffness in minutes, joints marked on a diagram, the GP’s blood results and medication from a photo. Skin, bowel and eye symptoms checked.",
          "part": "Nothing."
        },
        {
          "moment": "During the consultation",
          "title": "You examine. Vesalius listens.",
          "detail": "The history is ready. You start straight away with the joint count and ultrasound.",
          "part": "Just be the doctor."
        },
        {
          "moment": "After the consultation",
          "title": "The paperwork writes itself.",
          "detail": "Letter to the GP, methotrexate and folic acid prescription, steroid taper and blood test request with a monitoring schedule.",
          "part": "Review and sign."
        },
        {
          "moment": "After treatment",
          "title": "Progress towards remission, followed at home.",
          "detail": "RAPID3 and morning stiffness, alongside fatigue, work and piano playing. Every check-in asks about fever and infections on methotrexate.",
          "part": "Act on an alert."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient with early rheumatoid arthritis through all eight modules. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "Swollen joints with prolonged morning stiffness get priority at the arthritis clinic. Widespread pain without swelling goes to physical medicine. New headache with blurred vision is flagged to reception immediately.",
        "agenda": "Her appointment gets priority and a longer new patient slot.",
        "preConsultation": "The chatbot asks the questions that matter in arthritis: morning stiffness in minutes, affected joints, psoriasis, bowel and eyes, and the GP’s blood results. You know what is going on before she arrives.",
        "voiceReception": "Would she rather call? She gets the same triage and booking over the phone.",
        "scribe": "You count swollen joints, perform ultrasound and discuss the blood results. Together you choose methotrexate. Vesalius takes notes.",
        "medication": "She sends a photo of her pharmacy’s medication schedule. The record includes the contraceptive pill and vitamin D she forgot to mention, relevant when starting methotrexate.",
        "documentGeneration": "The letter to the GP, methotrexate and folic acid prescription, Medrol taper and blood test request are ready.",
        "smartFollowUp": "She completes RAPID3 and describes morning stiffness, fatigue, work and piano. Fever or a sore throat on methotrexate triggers an alert for your team."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for rheumatology.",
      "focus": "Focus within your speciality (e.g. early arthritis, spondyloarthritis, connective tissue diseases)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "rhumatologue.",
      "greeting": "Bonjour Lies ! J’aide le médecin à préparer votre visite. Quel est le motif principal de votre rendez-vous aujourd’hui ?",
      "patientMessage": "J’ai les doigts douloureux et gonflés aux deux mains depuis trois mois. Le matin, je ne peux pas fermer le poing.",
      "assistantMessage": "Merci. Combien de temps faut-il pour que vos mains retrouvent leur souplesse le matin ? Voyez-vous un gonflement des articulations des doigts ?",
      "noteBody": "Douleur et gonflement des MCP et IPP des deux mains depuis trois mois, raideur matinale de 90 minutes. Squeeze test MCP positif bilatéralement, 6 articulations gonflées et 8 douloureuses. Anti-CCP > 200 U/mL, CRP 18 mg/L. Échographie : synovite avec Doppler MCP2–3 bilatérales…"
    },
    "journey": {
      "subtitle": "Une patiente avec une polyarthrite rhumatoïde débutante, du premier signalement à la rémission. Vesalius prépare le terrain pour que vous puissiez vous consacrer à ses soins.",
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
          "detail": "Articulations des doigts gonflées aux deux mains, 90 minutes de raideur matinale et anti-CCP positifs : Lies est prioritaire en consultation d’arthrite. Une douleur diffuse sans gonflement va en médecine physique.",
          "part": "Rien."
        },
        {
          "moment": "Après la prise de rendez-vous",
          "title": "Une anamnèse complète, chez elle et dans sa langue.",
          "detail": "Raideur matinale en minutes, articulations indiquées sur un schéma, bilan du généraliste et médicaments par photo. Psoriasis, intestin et yeux sont abordés.",
          "part": "Rien."
        },
        {
          "moment": "Pendant la consultation",
          "title": "Vous examinez. Vesalius écoute.",
          "detail": "L’anamnèse est prête. Vous commencez directement par le compte articulaire et l’échographie.",
          "part": "Être médecin."
        },
        {
          "moment": "Après la consultation",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Lettre au médecin traitant, prescription de méthotrexate et d’acide folique, schéma de diminution des corticoïdes et demande de bilan avec calendrier de surveillance.",
          "part": "Relire et signer."
        },
        {
          "moment": "Après le traitement",
          "title": "Vers la rémission, avec un suivi à domicile.",
          "detail": "RAPID3 et raideur matinale, mais aussi fatigue, travail et piano. Chaque suivi interroge la fièvre et les infections sous méthotrexate.",
          "part": "Agir en cas d’alerte."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez une patiente avec une polyarthrite rhumatoïde débutante à travers les huit modules. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "Des articulations gonflées avec longue raideur matinale donnent priorité en consultation d’arthrite. Une douleur diffuse sans gonflement va en médecine physique. Une nouvelle céphalée avec vision floue est signalée immédiatement au secrétariat.",
        "agenda": "Son rendez-vous est prioritaire, avec un créneau long de nouvelle patiente.",
        "preConsultation": "Le chatbot pose les questions importantes : raideur matinale en minutes, articulations, psoriasis, intestin, yeux et bilan du généraliste. Vous savez ce qui se passe avant son arrivée.",
        "voiceReception": "Elle préfère appeler ? Le même triage et la même prise de rendez-vous se font par téléphone.",
        "scribe": "Vous comptez les articulations gonflées, réalisez l’échographie et discutez du bilan. Vous choisissez ensemble le méthotrexate. Vesalius prend des notes.",
        "medication": "Elle envoie une photo du schéma de médication de sa pharmacie. Le dossier reprend la pilule et la vitamine D oubliées, importantes à l’instauration du méthotrexate.",
        "documentGeneration": "La lettre au médecin traitant, la prescription de méthotrexate et d’acide folique, le schéma de Medrol et la demande de bilan sont prêts.",
        "smartFollowUp": "Elle remplit le RAPID3 et décrit sa raideur matinale, sa fatigue, son travail et le piano. Fièvre ou mal de gorge sous méthotrexate déclenchent une alerte."
      }
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la rhumatologie.",
      "focus": "Domaine de prédilection (p. ex. arthrite débutante, spondyloarthrite, connectivites)"
    }
  }
};
