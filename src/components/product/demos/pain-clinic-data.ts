import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "C. Spinalis",
    "initials": "CS",
    "channel": "telefoon",
    "summary": "Rugpijn, sinds gisteren moeite met plassen en een doof gevoel in het zitvlak",
    "referral": "Spoed",
    "tasks": 1
  },
  {
    "name": "I. Sacrum",
    "initials": "IS",
    "channel": "telefoon",
    "summary": "Lage rugpijn sinds 3 jaar, 4 eerdere behandelaars, 2 infiltraties met kort effect, dagelijks tramadol",
    "referral": "Chronisch · 60 min",
    "tasks": 0
  },
  {
    "name": "M. Multifidus",
    "initials": "MM",
    "channel": "chat",
    "summary": "Lage rugpijn sinds 7 weken, eerste keer, enkel paracetamol en kine",
    "referral": "Niet chronisch · 30 min",
    "tasks": 0
  },
  {
    "name": "S. Sacroiliaca",
    "initials": "SS",
    "channel": "chat",
    "summary": "Gekende patiënt, SI-infiltratie in maart, 5 maanden ±70 % minder pijn, geen nieuwe klachten",
    "referral": "Inspuiting · 5 min",
    "tasks": 0,
    "referralTitle": "Indicatie gesteld door Dr. Vesalius in maart"
  },
  {
    "name": "R. Radius",
    "initials": "RR",
    "channel": "telefoon",
    "summary": "Hand gezwollen, rood en warm, zes weken na polsfractuur",
    "referral": "Voorrang",
    "tasks": 0
  },
  {
    "name": "T. Trapezius",
    "initials": "TT",
    "channel": "chat",
    "summary": "Vraag over afspraak",
    "referral": "",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Rugpijn met sinds gisteren moeite met plassen en een doof gevoel in het zitvlak. Patiënt kreeg het advies naar de spoed te gaan; secretariaat volgt op.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "time": "08:30",
    "name": "C. Spinalis",
    "initials": "CS",
    "reason": "Dringend · plasproblemen, doof gevoel in het zitvlak · doorgestuurd naar spoed"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 2,
    "time": "09:00",
    "name": "I. Sacrum",
    "initials": "IS",
    "reason": "Chronisch · eerste consultatie, lage rugpijn sinds 3 jaar",
    "appointmentType": "Chronisch · 60 min"
  },
  {
    "room": 1,
    "slot": 3,
    "length": 1,
    "time": "10:00",
    "name": "M. Multifidus",
    "initials": "MM",
    "reason": "Niet chronisch · lage rugpijn sinds 7 weken",
    "appointmentType": "Niet chronisch · 30 min"
  },
  {
    "room": 2,
    "slot": 1,
    "length": 1,
    "time": "09:00",
    "name": "R. Radius",
    "initials": "RR",
    "reason": "Vermoeden CRPS na polsfractuur"
  },
  {
    "room": 2,
    "slot": 2,
    "length": 1,
    "time": "09:30",
    "name": "G. Ganglion",
    "initials": "GG",
    "reason": "Wondcontrole neurostimulator"
  },
  {
    "room": 3,
    "slot": 9,
    "length": 0.16666666666666666,
    "time": "13:00",
    "name": "S. Sacroiliaca",
    "initials": "SS",
    "reason": "Inspuiting · herhaling SI-infiltratie rechts",
    "appointmentType": "Inspuiting · 5 min"
  },
  {
    "room": 3,
    "slot": 9.166666666666666,
    "length": 0.16666666666666666,
    "time": "13:05",
    "name": "P. Piriformis",
    "initials": "PP",
    "reason": "Inspuiting · herhaling",
    "appointmentType": "Inspuiting · 5 min"
  },
  {
    "room": 3,
    "slot": 9.333333333333334,
    "length": 0.16666666666666666,
    "time": "13:10",
    "name": "L. Facet",
    "initials": "LF",
    "reason": "Inspuiting · herhaling",
    "appointmentType": "Inspuiting · 5 min"
  }
];

export const INTAKE_CHAT = [
  "Vertel gerust in uw eigen woorden hoe het begonnen is en wat er sindsdien gebeurd is. U mag stoppen en later verdergaan.",
  "In 2023 tilde ik een bewoner die viel. Ik voelde iets schieten en sindsdien is het nooit meer weggegaan. Ik ben bij vier dokters geweest. Iedereen zegt dat ze op de scan niets ernstigs zien.",
  "Dank u om dat te delen. U kreeg twee infiltraties in 2024. Hoe lang voelde u verschil?",
  "Een week of drie. Daarna was het terug zoals voordien.",
  "Wat zou u het liefst weer kunnen doen?",
  "Met de hond naar het bos zonder na te denken. En ik wil van die pillen af."
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Chronisch",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Chronische lage rugpijn sinds 2023 (tilincident op het werk). Verwezen door dr. Verhaeghe, huisarts: \"al veel geprobeerd, tramadol loopt op\"."],
        ["Duur", "Drie jaar"],
        ["Verwachting", "\"Weer met de hond naar het bos zonder na te denken. Van die pillen af.\""],
      ]],
      ["Aard van de pijn", [
        ["Locatie en uitstraling", "Lage rug, meest rechts, tot de achterkant van de rechterdij, niet onder de knie. Geen tintelingen."],
        ["NRS laatste week", "Nu 6 · gemiddeld 6 · ergste 8 · minste 4"],
        ["Type", "Zeurend, soms stekend"],
      ]],
      ["Wanneer heb je pijn", [
        ["Erger bij", "Lang zitten (auto > 30 min), lang staan, tillen, vooroverbuigen"],
        ["Beter bij", "Afwisselen van houding, warmte, op de zij liggen met een kussen tussen de knieën"],
        ["Nacht en ochtend", "Wordt 3 × per nacht wakker bij het draaien. Ochtendstijfheid ±15 minuten."],
      ]],
      ["Pijnhistoriek", [
        ["2023", "Huisarts · orthopedist (MRI) · neurochirurg: geen operatie nodig · kine 18 sessies: even beter"],
        ["2024", "Fysisch geneesheer · kine 18 sessies: even beter · 2 facetinfiltraties L4-L5 en L5-S1: ±3 weken effect · start tramadol"],
        ["2025", "Osteopaat 4 ×: geen effect · start pregabaline: \"weet niet of het helpt, wel suf\" · tramadol opgedreven tot 2 × 100 mg"],
        ["2026", "Halftijds werk sinds april · gestopt met het koor in de zomer"],
      ]],
      ["Medicatie", [
        ["Huidig", "Tramadol, paracetamol, pregabaline, lormetazepam, pantoprazol, levothyroxine (via foto in de chat, bevestigd)"],
        ["Gestopt", "Ibuprofen (2023, maagklachten)"],
      ]],
      ["Impact", [
        ["Slaap / werk", "Slecht, 3 × wakker / zorgkundige, 50 %, tillen lukt niet"],
        ["Hobby's", "Wandelt nog 15 min met de hond (vroeger 1 uur). Koor gestopt."],
      ]],
      ["Gele vlaggen", [
        ["Stemming en gedachten", "Prikkelbaar. Piekert 's avonds: \"wat als het nooit beter wordt\". Durft niet meer te bukken."],
      ]],
      ["Rode vlaggen", [
        ["Plas- en stoelgang, koorts, gewichtsverlies, krachtverlies", "Nee"],
        ["Melding (geen rode vlag)", "Rechterbeen voelt zwaar na lang staan. Geen krachtverlies of gevoelloosheid."],
      ]],
      ["Medische achtergrond", [
        ["Voorgeschiedenis", "Sectio (2010), hypothyreoïdie"],
        ["Allergieën / bloedverdunners", "Geen / geen"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Nee / 1 à 2 glazen per week"],
      ]],
      ["Algemeen", [
        ["Beroep", "Zorgkundige in een woonzorgcentrum"],
        ["Gezin en hobby's", "Gehuwd, twee tieners. Wandelen met de hond, koor."],
        ["Lengte / gewicht / leeftijd", "1,68 m / 79 kg / 48 jaar"],
      ]],
      ["Baseline", [
        ["Vragenlijsten (voorbeelddata)", "BPI intensiteit 6,0 · BPI interferentie 6,9 (lager = beter) · painDETECT 11 · PCS 31 (lager = beter) · PSEQ 22 (hoger = beter) · HADS angst 9, depressie 8 (lager = beter)"],
      ]],
    ],
  },
  {
    title: "Niet chronisch",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Lage rugpijn sinds 7 weken, begonnen na een verhuis"],
      ]],
      ["Aard van de pijn", [
        ["NRS / uitstraling", "6/10 / geen"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Paracetamol, kine sinds 2 weken (4 sessies)"],
      ]],
      ["Rode vlaggen", [
        ["Plas- en stoelgang, koorts, krachtverlies", "Nee"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Bediende / 41 jaar"],
      ]],
    ],
  },
  {
    title: "Inspuiting",
    sections: [
      ["Vorige inspuiting", [
        ["Wat en wanneer", "SI-infiltratie rechts, maart 2026"],
        ["Effect", "±70 % minder pijn, gedurende vijf maanden"],
      ]],
      ["Nu", [
        ["Klacht", "Dezelfde pijn op dezelfde plaats, sinds 3 weken terug"],
        ["Nieuwe klachten", "Geen"],
      ]],
      ["Veiligheid", [
        ["Bloedverdunners / allergieën / koorts", "Geen / geen / nee"],
      ]],
      ["Algemeen", [
        ["Leeftijd", "66 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts stuurt me door naar de pijnkliniek voor mijn rug. Kan ik een afspraak maken?",
  "Natuurlijk. Hoe lang heeft u deze pijn al, en welke behandelingen heeft u al gehad?",
  "Drie jaar. Kine, twee inspuitingen, en ik neem elke dag tramadol.",
  "Dank u. Heeft u de laatste tijd problemen met plassen of stoelgang, een doof gevoel in het zitvlak of minder kracht in uw benen?",
  "Nee, dat niet.",
  "Dan plan ik een eerste consultatie van een uur, zodat de arts de tijd heeft voor uw volledige verhaal. Het eerste vrije uur bij Dr. Vesalius is donderdag 22 oktober om 14 uur. Past dat?",
  "Ja, dat past.",
  "U staat genoteerd. U krijgt een bevestiging en een vragenlijst via WhatsApp, die u in uw eigen tempo kunt invullen."
];

export const VOICE_TASK = "Afspraak ingeboekt: do 22/10, 14:00, Dr. Vesalius (chronisch · 60 min) · bevestiging en intake verstuurd · geen rode vlaggen";

export const CALLS = [
  [
    "C. Spinalis (rood)",
    "Rugpijn, sinds gisteren moeite met plassen",
    "Advies naar de spoed te gaan, doorgeschakeld naar het secretariaat met samenvatting",
    "Doorgeschakeld"
  ],
  [
    "I. Sacrum",
    "Chronisch: 3 jaar pijn, eerdere behandelingen, opioïden",
    "Ingeboekt · 60 min · intake verstuurd",
    "Ingeboekt"
  ],
  [
    "R. Radius",
    "Vermoeden CRPS na polsfractuur",
    "Doorgeschakeld naar de pijnverpleegkundige voor een afspraak met voorrang",
    "Doorgeschakeld"
  ],
  [
    "M. Multifidus",
    "Niet chronisch: rugpijn sinds 7 weken",
    "Ingeboekt · 30 min · intake verstuurd",
    "Ingeboekt"
  ],
  [
    "S. Sacroiliaca",
    "Gekende patiënt, indicatie herhaling SI-infiltratie, geen nieuwe klachten",
    "Ingeboekt · procedureslot 5 min · voorbereidingsinstructies verstuurd",
    "Ingeboekt"
  ]
];

export const SCRIBE_CHAT = [
  "U schreef dat de infiltraties maar drie weken hielpen. Wat verwacht u zelf van een volgende?",
  "Eerlijk? Niet veel meer. Ik wil vooral weer kunnen bewegen zonder bang te zijn.",
  "Dan stel ik voor dat we daar op inzetten: kine die stap voor stap opbouwt, en een psycholoog die helpt met de schrik.",
  "En de pillen? Ik voel me suf van die Lyrica."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Chronische lage rugpijn sinds 2023 na een tilincident, meest rechts, met uitstraling naar de achterkant van de rechterdij tot de knie, zonder tintelingen. NRS gemiddeld 6, ergste 8. Erger bij lang zitten, staan, tillen en vooroverbuigen. Drie keer per nacht wakker. Eerder: orthopedie, neurochirurgie (geen chirurgische indicatie), fysische geneeskunde, 2 × 18 sessies kine met tijdelijk effect, 2 facetinfiltraties (2024) met ±3 weken effect, osteopathie zonder effect. Halftijds aan het werk. Bewegingsangst, piekert over de toekomst. Geen rode vlaggen."
  ],
  [
    "Medicatie",
    "Tramadol retard 100 mg 2×/dag, paracetamol 1 g 3×/dag, pregabaline 75 mg 2×/dag (sufheid, onduidelijk effect), lormetazepam 1 mg 's avonds, pantoprazol 20 mg, levothyroxine 75 µg. Geen bloedverdunners, geen allergieën."
  ],
  [
    "Klinisch onderzoek",
    "Normale gang, hielen- en tenengang mogelijk. Lumbale flexie beperkt door pijn (vingertop-vloerafstand 30 cm), extensie pijnlijk. Diffuse drukpijn paravertebraal L4-S1, rechts meer dan links. Lasègue negatief beiderzijds. Kracht, sensibiliteit en reflexen onderste ledematen normaal en symmetrisch."
  ],
  [
    "Beeldvorming",
    "MRI lumbaal (maart 2023, elders): discopathie L4-L5 en L5-S1, lichte facetartrose, geen wortelcompressie."
  ],
  [
    "Vragenlijsten",
    "BPI intensiteit 6,0, interferentie 6,9 · painDETECT 11 · PCS 31 · PSEQ 22 · HADS angst 9, depressie 8."
  ],
  [
    "Diagnose",
    "Chronische lage rugpijn met pseudoradiculaire uitstraling rechts, zonder aanwijzingen voor radiculopathie of neuropathische pijn. Uitgesproken impact op slaap en werk. Gele vlaggen: bewegingsangst, catastroferen, lage zelfeffectiviteit."
  ],
  [
    "Beleid",
    "Gedeelde beslissing: multidisciplinair programma (kine met graduele activiteitsopbouw, pijneducatie, psycholoog). Geen nieuwe infiltratie. Pregabaline afbouwen over vier weken. Tramadol voorlopig behouden, afbouw zodra het programma loopt. Lormetazepam: afbouw bespreken met de huisarts. Overleg met de arbeidsarts over aangepast werk. Vangnet: plas- of stoelgangproblemen, gevoelloosheid in het zitvlak, krachtverlies, koorts of erge sufheid. Opvolging maand 1, 3, 6 en 12."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Pijnkliniek, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Pijnhistoriek, bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Verwijzing multidisciplinair programma",
    "Kinesitherapie met graduele activiteitsopbouw en psycholoog",
    "Gegenereerd"
  ],
  [
    "Afbouwschema pregabaline",
    "Stap voor stap over vier weken, in begrijpelijke taal",
    "Gegenereerd"
  ],
  [
    "Brief aan de arbeidsarts",
    "Aangepast werk: minder tillen, progressieve opbouw",
    "Nog niet gegenereerd"
  ],
  [
    "Uitleg voor de patiënt",
    "Wat chronische pijn is, het plan en wanneer meteen contact opnemen",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Sacrum voor een eerste multidisciplinaire evaluatie van haar chronische lage rugpijn sinds drie jaar. Er zijn geen aanwijzingen voor radiculopathie of neuropathische pijn. Samen kozen we voor een multidisciplinair programma en een herziening van haar medicatie, zonder nieuwe infiltratie.";

export const LETTER = [
  "Geachte collega,",
  "Ik zag uw patiënte Ingrid Sacrum, geboren op 9 februari 1978, op de pijnkliniek voor een eerste multidisciplinaire evaluatie.",
  "REDEN VOOR CONTACT Chronische lage rugpijn sinds drie jaar, met een opgedreven tramadoldosis. Vraag naar advies over verdere aanpak.",
  "ANAMNESE Lage rugpijn sinds een tilincident op het werk in 2023, meest rechts, met uitstraling naar de achterkant van de rechterdij tot de knie, zonder tintelingen. NRS gemiddeld 6, ergste 8. Erger bij lang zitten, staan, tillen en vooroverbuigen. Beter bij afwisselen van houding en warmte. Ochtendstijfheid 15 minuten. Wordt drie keer per nacht wakker. Eerder gezien door orthopedie, neurochirurgie (geen chirurgische indicatie) en fysische geneeskunde. Twee reeksen kinesitherapie met tijdelijk effect, twee facetinfiltraties L4-L5 en L5-S1 in 2024 met ongeveer drie weken effect, osteopathie zonder effect. Medicatie: tramadol retard 100 mg 2×/dag, paracetamol 1 g 3×/dag, pregabaline 75 mg 2×/dag (onduidelijk effect, wel sufheid), lormetazepam 1 mg 's avonds, pantoprazol 20 mg, levothyroxine 75 µg. Geen bloedverdunners, geen allergieën. Werkt halftijds als zorgkundige. Wandelt nog 15 minuten met de hond, is gestopt met het koor. Piekert over de toekomst en vermijdt bukken.",
  "KLINISCH ONDERZOEK Normale gang. Lumbale flexie beperkt door pijn, vingertop-vloerafstand 30 cm. Extensie pijnlijk. Diffuse paravertebrale drukpijn L4-S1, rechts meer dan links. Lasègue negatief beiderzijds. Kracht, sensibiliteit en reflexen onderste ledematen normaal en symmetrisch.",
  "AANVULLENDE ONDERZOEKEN MRI lumbaal (maart 2023): discopathie L4-L5 en L5-S1, lichte facetartrose, geen wortelcompressie. Vragenlijsten: BPI pijnintensiteit 6,0 en interferentie 6,9; painDETECT 11; PCS 31; PSEQ 22; HADS angst 9, depressie 8.",
  "DIAGNOSE Chronische lage rugpijn met pseudoradiculaire uitstraling rechts, zonder aanwijzingen voor radiculopathie of neuropathische pijn, met uitgesproken impact op slaap en werk. Gele vlaggen: bewegingsangst, catastroferen, lage zelfeffectiviteit.",
  "BELEID Samen met mevrouw besloten tot een multidisciplinair programma (kinesitherapie met graduele activiteitsopbouw, pijneducatie, begeleiding door de psycholoog). Geen nieuwe infiltratie. Pregabaline wordt over vier weken afgebouwd (schema meegegeven). Tramadol voorlopig ongewijzigd, afbouw gepland zodra het programma loopt. Graag uw hulp bij een geleidelijke afbouw van lormetazepam; de combinatie met tramadol en pregabaline verhoogt het risico op sufheid. Overleg met de arbeidsarts over aangepast werk loopt. Opvolging via vragenlijsten na één, drie, zes en twaalf maanden, en een consult na drie maanden. Mevrouw weet dat ze meteen contact moet opnemen bij plas- of stoelgangproblemen, gevoelloosheid in het zitvlak, krachtverlies, koorts of erge sufheid.",
  "Met collegiale groeten, Dr. Andreas Vesalius, algoloog"
];

export const FOLLOW_ROWS = [
  [
    "G. Ganglion",
    "Neurostimulator · week 3"
  ],
  [
    "I. Sacrum",
    "Multidisciplinair programma · maand 3 · BPI en PCS ingevuld"
  ],
  [
    "S. Sacroiliaca",
    "SI-infiltratie · week 3"
  ],
  [
    "M. Multifidus",
    "Kine en pijneducatie · week 6"
  ]
];

export const FOLLOW_ALERT = "Meldt een rode, vochtige wonde en koorts (38,2 °C), drie weken na de plaatsing van de neurostimulator. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met de pijn sinds u met het programma begon?",
  "De pijn is er nog, maar ik ben er minder bang van. Sinds de Lyrica weg is, ben ik helderder.",
  "Fijn om te horen. Wat lukt nu beter dan drie maanden geleden?",
  "Ik wandel weer 25 minuten met de hond. Bukken durf ik terug, voorzichtig.",
  "Heeft u problemen met plassen of stoelgang, of minder kracht in uw benen gekregen?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "BPI pijnintensiteit (0 tot 10, lager = beter)",
    "6,0",
    "5,2"
  ],
  [
    "BPI interferentie (0 tot 10, lager = beter)",
    "6,9",
    "5,1"
  ],
  [
    "PCS, catastroferen (0 tot 52, lager = beter)",
    "31",
    "21"
  ],
  [
    "PSEQ, zelfeffectiviteit (0 tot 60, hoger = beter)",
    "22",
    "33"
  ],
  [
    "Slaap",
    "3 × per nacht wakker",
    "2 × per nacht wakker"
  ],
  [
    "Werk",
    "50 %",
    "50 %, overleg aangepast werk loopt"
  ],
  [
    "Wandelen met de hond",
    "15 min",
    "25 min"
  ],
  [
    "Medicatie",
    "Tramadol 200 mg, pregabaline, lormetazepam",
    "Tramadol 200 mg, pregabaline gestopt, lormetazepam in afbouw"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Multidisciplinair programma (Ingrid)",
    "Maand 1",
    "Start programma",
    "Deelname kine en psycholoog, activiteiten, slaap, open vragen, rode vlaggen"
  ],
  [
    "Multidisciplinair programma (Ingrid)",
    "Maand 3, 6 en 12",
    "Opvolging chronische pijn + welzijn",
    "BPI, PCS, PSEQ, HADS, EQ-5D-5L, globale verandering (PGIC), werk, slaap, hobby's, open vragen, PREM op maand 12"
  ],
  [
    "Medicatieafbouw",
    "Week 1, 2 en 4 na elke stap",
    "Afbouw",
    "Pijn, slaap, onrust, zweten, misselijkheid, sufheid, inname volgens schema"
  ],
  [
    "Infiltratie of RF-denervatie",
    "Dag 1",
    "Controle na procedure",
    "Koorts, toenemende pijn, krachtverlies, gevoelloosheid"
  ],
  [
    "Infiltratie of RF-denervatie",
    "Week 3 en maand 3",
    "Effect procedure",
    "Hoeveel minder pijn en hoe lang, BPI-interferentie, PGIC"
  ],
  [
    "Neuromodulatie",
    "Proefperiode, dagelijks",
    "Proefevaluatie",
    "Pijnscore, % pijnvermindering, slaap, activiteit, wonde"
  ],
  [
    "Neuromodulatie",
    "Week 2, maand 3, 6 en 12",
    "Opvolging neuromodulatie",
    "Wonde, koorts, BPI, PSEQ, EQ-5D-5L, tevredenheid"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest hij later voor een procedure of neuromodulatie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 6 geneesmiddelen gevonden:",
  "confirm": "Ja. De Loramet was ik vergeten, dat is maar een slaappilletje. En de Pantomed is voor mijn maag.",
  "followUps": [
    {
      "question": "Genoteerd, ook een slaappil is belangrijk voor de arts. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Sint-Jan · Medicatieschema · I. Sacrum, ° 09-02-1978",
    "rows": [
      [
        "Contramal Retard 100 mg tabletten met verlengde afgifte",
        "1 tablet om 8 u en om 20 u"
      ],
      [
        "Dafalgan Forte 1 g tabletten",
        "1 tablet 3× per dag"
      ],
      [
        "Lyrica 75 mg harde capsules",
        "1 capsule 's ochtends en 's avonds"
      ],
      [
        "L-Thyroxine Christiaens 75 µg tabletten",
        "1 tablet 's ochtends, nuchter"
      ],
      [
        "Loramet 1 mg tabletten",
        "1 tablet bij het slapengaan"
      ],
      [
        "Pantomed 20 mg maagsapresistente tabletten",
        "1 tablet 's ochtends, voor het ontbijt"
      ]
    ]
  },
  "meds": [
    {
      "name": "Contramal Retard",
      "substance": "Tramadol",
      "strength": "100 mg",
      "form": "Tablet met verlengde afgifte",
      "frequency": "2× per dag (8 u, 20 u)",
      "indication": "Pijn (opioïd)",
      "source": "Foto in chat",
      "chatLabel": "Contramal Retard 100 mg · 2× per dag"
    },
    {
      "name": "Dafalgan Forte",
      "substance": "Paracetamol",
      "strength": "1 g",
      "form": "Tablet",
      "frequency": "3× per dag",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Dafalgan Forte 1 g · 3× per dag"
    },
    {
      "name": "Lyrica",
      "substance": "Pregabaline",
      "strength": "75 mg",
      "form": "Capsule",
      "frequency": "2× per dag",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Lyrica 75 mg · 2× per dag"
    },
    {
      "name": "L-Thyroxine Christiaens",
      "substance": "Levothyroxine",
      "strength": "75 µg",
      "form": "Tablet",
      "frequency": "1× per dag, nuchter",
      "indication": "Schildklier",
      "source": "Foto in chat",
      "chatLabel": "L-Thyroxine 75 µg · 1× per dag nuchter"
    },
    {
      "name": "Loramet",
      "substance": "Lormetazepam",
      "strength": "1 mg",
      "form": "Tablet",
      "frequency": "1× per dag, bij het slapengaan",
      "indication": "Slaap (benzodiazepine)",
      "source": "Foto in chat",
      "chatLabel": "Loramet 1 mg · ’s avonds",
      "tag": {
        "label": "Zelf niet vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "Pantomed",
      "substance": "Pantoprazol",
      "strength": "20 mg",
      "form": "Maagsapresistente tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Maagbescherming",
      "source": "Foto in chat",
      "chatLabel": "Pantomed 20 mg · 1× per dag"
    }
  ],
  "notes": [
    {
      "label": "Opioïden",
      "value": "Tramadol 200 mg per dag"
    },
    {
      "label": "Aandachtspunt",
      "value": "Opioïd + pregabaline + benzodiazepine",
      "tone": "warn"
    },
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Allergieën",
      "value": "Geen"
    },
    {
      "label": "Bevestigd door patiënt",
      "value": "Ja"
    }
  ]
} satisfies Partial<MedicationCopy>;
