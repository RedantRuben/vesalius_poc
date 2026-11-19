import { ORTHO_HOME, type SiteLocale, type TailoredHomeCopy } from './orthopedics';

export const KINESITHERAPY_HOME: Record<SiteLocale, TailoredHomeCopy> = {
  "nl": {
    "hero": {
      "line1": "Wees opnieuw",
      "line2": "kinesitherapeut.",
      "greeting": "Hallo Lotte! Ik help de kinesitherapeut om uw eerste sessie voor te bereiden. Waarvoor komt u?",
      "patientMessage": "Ik ben drie dagen geleden geopereerd aan mijn kruisband rechts. Ik heb een voorschrift voor kine van dr. Claes.",
      "assistantMessage": "Dank u. Wat heeft de chirurg toegelaten: hoeveel mag u steunen en hoe ver mag u uw knie plooien? En wanneer kunt u komen: overdag of na 17 uur?",
      "noteBody": "Sessie 14, week 5 na VKB-reconstructie rechts. Pijn 2/10, zwelling stroke test 1+. Flexie 110° (vorige sessie 102°), extensie 0°. Stapt sinds maandag zonder krukken. Start fietsergometer zonder weerstand…",
      "intakeReady": "Samenvatting klaar voor de kinesitherapeut"
    },
    "journey": {
      "subtitle": "Een voetbalster na een kruisbandoperatie, van de eerste sessie tot terug op het veld. Vesalius doet het voorwerk, u blijft de kinesitherapeut.",
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
          "title": "De juiste patiënt bij de juiste kinesitherapeut.",
          "detail": "Kruisbandreconstructie, en ze kan pas na 17 uur: Lotte gaat naar de sportkine met avonduren. Rugpijn bij een ploegenarbeider gaat naar de collega manuele therapie, om half acht.",
          "part": "Niets."
        },
        {
          "moment": "Vóór de eerste sessie",
          "title": "Een volledige intake, thuis en in haar eigen taal.",
          "detail": "Wat de chirurg deed en toeliet, medicatie via een foto, haar doelen en de IKDC als nulmeting. Geen rode vlaggen.",
          "part": "Niets."
        },
        {
          "moment": "Bij elke sessie",
          "title": "U behandelt. Vesalius noteert mee.",
          "detail": "Elke sessienota zet flexie, extensie en zwelling naast die van de vorige keer.",
          "part": "Gewoon kinesitherapeut zijn."
        },
        {
          "moment": "Tussen de sessies",
          "title": "De administratie schrijft zichzelf.",
          "detail": "Evolutieverslag voor de chirurg, huisoefenschema en de kennisgeving voor de mutualiteit.",
          "part": "Nalezen en ondertekenen."
        },
        {
          "moment": "Over het hele traject",
          "title": "Effectiviteit gemeten, niet alleen gevoeld.",
          "detail": "IKDC, ACL-RSI en hoptests van week 2 tot terug op het veld, naast slaap, werk en voetbal. Een korte check-in vóór elke sessie vangt rode vlaggen op.",
          "part": "Bijsturen bij een signaal."
        }
      ]
    },
    "modules": {
      "subtitle": "Volg één patiënte na een kruisbandoperatie door alle modules, sessie na sessie. Ze werken naadloos samen, maar elke module is ook afzonderlijk beschikbaar.",
      "cards": {
        "smartTriage": "Een kruisbandrevalidatie gaat naar de sportkine met avonduren. Rugpijn bij een ploegenarbeider gaat naar de collega manuele therapie, om half acht. Wie eerst naar een arts moet, wordt gemarkeerd.",
        "agenda": "Haar reeks sessies staat op vaste avonden in de agenda van de sportkine, en schuift mee als ze een sessie verzet.",
        "preConsultation": "Vóór de eerste sessie: wat de chirurg deed en toeliet, haar doelen en de IKDC als nulmeting. Vóór elke volgende sessie: een check-in van een minuut over pijn, zwelling en huisoefeningen.",
        "voiceReception": "Moet ze een sessie verzetten? Ze belt, en de assistent vindt een nieuw moment bij dezelfde kinesitherapeut.",
        "scribe": "U behandelt haar knie. Vesalius schrijft de sessienota en zet flexie, extensie en zwelling naast die van de vorige sessie.",
        "medication": "Ze stuurt in de chat een foto van haar apotheekschema. De Clexane-spuitjes staan gemarkeerd tot dag 14, net als de pil die ze zelf niet vermeldde.",
        "documentGeneration": "Het evolutieverslag voor de chirurg, het huisoefenschema en de kennisgeving voor de mutualiteit staan klaar.",
        "smartFollowUp": "IKDC, ACL-RSI en hoptests van week 2 tot terug op het veld, naast hoe het gaat met slapen, werken en voetbal."
      },
      "groupLabels": [
        "Vóór de sessie",
        "Tijdens de sessie",
        "Na de sessie"
      ]
    },
    "finalCta": {
      ...ORTHO_HOME.nl.finalCta,
      "subtitle": "Test Vesalius een maand gratis. Laat uw gegevens achter, en binnen 24 uur werkt u met de standaardconfiguratie voor kinesitherapie.",
      "focus": "Focus binnen uw vakgebied (bv. sportkine, manuele therapie, bekkenbodem)"
    }
  },
  "en": {
    "hero": {
      "line1": "Be a physiotherapist",
      "line2": "again.",
      "greeting": "Hello Lotte! I’m helping the physiotherapist prepare for your first session. What are you coming in for?",
      "patientMessage": "I had surgery on my right cruciate ligament three days ago. Dr Claes gave me a physiotherapy prescription.",
      "assistantMessage": "Thank you. What has the surgeon allowed: how much weight can you put on the leg and how far can you bend your knee? When can you attend: during the day or after 5 pm?",
      "noteBody": "Session 14, week 5 after right ACL reconstruction. Pain 2/10, effusion stroke test 1+. Flexion 110° (previous session 102°), extension 0°. Walking without crutches since Monday. Starting the exercise bike without resistance…",
      "intakeReady": "Summary ready for the physiotherapist"
    },
    "journey": {
      "subtitle": "A footballer after cruciate ligament surgery, from her first session to returning to the pitch. Vesalius does the groundwork so you can focus on physiotherapy.",
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
          "title": "The right patient sees the right physiotherapist.",
          "detail": "ACL rehabilitation, available only after 5 pm: Lotte sees the sports physiotherapist with evening appointments. A shift worker with back pain sees the manual therapist at 7.30 am.",
          "part": "Nothing."
        },
        {
          "moment": "Before the first session",
          "title": "A full intake, at home and in her own language.",
          "detail": "What the surgeon did and allowed, medication from a photo, her goals and an IKDC baseline. No red flags.",
          "part": "Nothing."
        },
        {
          "moment": "At every session",
          "title": "You treat. Vesalius takes notes.",
          "detail": "Each session note compares flexion, extension and swelling with the previous session.",
          "part": "Just be the physiotherapist."
        },
        {
          "moment": "Between sessions",
          "title": "The paperwork writes itself.",
          "detail": "Progress report for the surgeon, home exercise programme and notification for the health insurance fund.",
          "part": "Review and sign."
        },
        {
          "moment": "Throughout rehabilitation",
          "title": "Effectiveness measured, beyond how it feels.",
          "detail": "IKDC, ACL-RSI and hop tests from week 2 to returning to the pitch, alongside sleep, work and football. A short check-in before each session catches red flags.",
          "part": "Adjust when an alert appears."
        }
      ]
    },
    "modules": {
      "subtitle": "Follow one patient after cruciate ligament surgery through all eight modules, session after session. They work together seamlessly and are also available individually.",
      "cards": {
        "smartTriage": "ACL rehabilitation goes to the sports physiotherapist with evening appointments. A shift worker with back pain sees the manual therapist at 7.30 am. Anyone who needs a doctor first is flagged.",
        "agenda": "Her series of sessions is booked on regular evenings in the sports physiotherapist’s diary and adjusts when a session is rescheduled.",
        "preConsultation": "Before the first session: the operation, the surgeon’s restrictions, her goals and an IKDC baseline. Before every later session: a one-minute check-in on pain, swelling and home exercises.",
        "voiceReception": "Need to reschedule a session? She calls and the assistant finds a new time with the same physiotherapist.",
        "scribe": "You treat her knee. Vesalius writes the session note and compares flexion, extension and swelling with the previous session.",
        "medication": "She sends a photo of her pharmacy’s medication schedule. Clexane injections are flagged until day 14, along with the contraceptive pill she did not mention.",
        "documentGeneration": "The progress report for the surgeon, home exercise programme and health insurance notification are ready.",
        "smartFollowUp": "IKDC, ACL-RSI and hop tests from week 2 to returning to the pitch, alongside sleep, work and football."
      },
      "groupLabels": [
        "Before the session",
        "During the session",
        "After the session"
      ]
    },
    "finalCta": {
      ...ORTHO_HOME.en.finalCta,
      "subtitle": "Try Vesalius free for a month. Leave your details and within 24 hours you will be working with our standard set-up for physiotherapy.",
      "focus": "Focus within your speciality (e.g. sports physiotherapy, manual therapy, pelvic floor)"
    }
  },
  "fr": {
    "hero": {
      "line1": "Redevenez",
      "line2": "kinésithérapeute.",
      "greeting": "Bonjour Lotte ! J’aide le kinésithérapeute à préparer votre première séance. Pourquoi venez-vous ?",
      "patientMessage": "J’ai été opérée du ligament croisé droit il y a trois jours. J’ai une prescription de kiné du Dr Claes.",
      "assistantMessage": "Merci. Qu’a autorisé le chirurgien : quel appui et quelle flexion du genou ? Quand pouvez-vous venir : en journée ou après 17 heures ?",
      "noteBody": "Séance 14, semaine 5 après reconstruction du LCA droit. Douleur 2/10, épanchement au stroke test 1+. Flexion 110° (séance précédente 102°), extension 0°. Marche sans béquilles depuis lundi. Début du vélo sans résistance…",
      "intakeReady": "Synthèse prête pour le kinésithérapeute"
    },
    "journey": {
      "subtitle": "Une footballeuse après une opération du ligament croisé, de la première séance au retour sur le terrain. Vesalius prépare le terrain pour que vous restiez kinésithérapeute.",
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
          "title": "Chaque patient est orienté vers le bon kinésithérapeute.",
          "detail": "Reconstruction du LCA et disponible seulement après 17 heures : Lotte va chez le kiné du sport en soirée. Un travailleur posté avec lombalgie voit le collègue en thérapie manuelle à 7 h 30.",
          "part": "Rien."
        },
        {
          "moment": "Avant la première séance",
          "title": "Une anamnèse complète, chez elle et dans sa langue.",
          "detail": "Le geste et les consignes du chirurgien, les médicaments par photo, ses objectifs et l’IKDC initial. Aucun signe d’alerte.",
          "part": "Rien."
        },
        {
          "moment": "À chaque séance",
          "title": "Vous traitez. Vesalius prend des notes.",
          "detail": "Chaque note compare la flexion, l’extension et le gonflement avec la séance précédente.",
          "part": "Être kinésithérapeute."
        },
        {
          "moment": "Entre les séances",
          "title": "Les documents se rédigent tout seuls.",
          "detail": "Rapport d’évolution pour le chirurgien, programme d’exercices à domicile et notification à la mutualité.",
          "part": "Relire et signer."
        },
        {
          "moment": "Tout au long du parcours",
          "title": "L’efficacité mesurée, au-delà du ressenti.",
          "detail": "IKDC, ACL-RSI et tests de saut de la semaine 2 au retour sur le terrain, avec sommeil, travail et football. Un bref suivi avant chaque séance repère les signes d’alerte.",
          "part": "Adapter en cas de signal."
        }
      ]
    },
    "modules": {
      "subtitle": "Suivez une patiente après une opération du ligament croisé à travers les huit modules, séance après séance. Ils fonctionnent ensemble et sont aussi disponibles séparément.",
      "cards": {
        "smartTriage": "La rééducation du LCA va chez le kiné du sport en soirée. Une lombalgie chez un travailleur posté va en thérapie manuelle à 7 h 30. Les patients devant d’abord voir un médecin sont signalés.",
        "agenda": "Sa série de séances est prévue à heures fixes le soir chez le kiné du sport et s’adapte si elle déplace une séance.",
        "preConsultation": "Avant la première séance : geste et consignes du chirurgien, objectifs et IKDC initial. Avant chaque séance suivante : une minute sur la douleur, le gonflement et les exercices à domicile.",
        "voiceReception": "Une séance à déplacer ? Elle appelle et l’assistant trouve un nouveau créneau chez le même kinésithérapeute.",
        "scribe": "Vous traitez son genou. Vesalius rédige la note et compare la flexion, l’extension et le gonflement avec la séance précédente.",
        "medication": "Elle envoie une photo du schéma de médication de sa pharmacie. Les injections de Clexane sont signalées jusqu’au jour 14, avec la pilule qu’elle n’avait pas mentionnée.",
        "documentGeneration": "Le rapport d’évolution pour le chirurgien, le programme à domicile et la notification à la mutualité sont prêts.",
        "smartFollowUp": "IKDC, ACL-RSI et tests de saut de la semaine 2 au retour sur le terrain, avec sommeil, travail et football."
      },
      "groupLabels": [
        "Avant la séance",
        "Pendant la séance",
        "Après la séance"
      ]
    },
    "finalCta": {
      ...ORTHO_HOME.fr.finalCta,
      "subtitle": "Testez Vesalius gratuitement pendant un mois. Laissez vos coordonnées, et en moins de 24 heures vous travaillez avec la configuration standard pour la kinésithérapie.",
      "focus": "Domaine de prédilection (p. ex. kiné du sport, thérapie manuelle, périnée)"
    }
  }
};
