import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "C. Willis",
    "initials": "CW",
    "channel": "telefoon",
    "summary": "Plotse, ergste hoofdpijn ooit, binnen een minuut maximaal, sinds een uur",
    "referral": "Spoed",
    "tasks": 1
  },
  {
    "name": "E. Trigeminus",
    "initials": "ET",
    "channel": "chat",
    "summary": "Gekende migraine, nu 16 hoofdpijndagen per maand, pijnstillers op bijna elke hoofdpijndag",
    "referral": "Hoofdpijn",
    "tasks": 0
  },
  {
    "name": "G. Temporalis",
    "initials": "GT",
    "channel": "chat",
    "summary": "74, nieuwe hoofdpijn aan de slaap, pijn bij kauwen, wazig zien",
    "referral": "Zelfde dag",
    "tasks": 1
  },
  {
    "name": "A. Calcarina",
    "initials": "AC",
    "channel": "chat",
    "summary": "Migraine met aura, al jaren dezelfde zigzaglijnen",
    "referral": "Hoofdpijn",
    "tasks": 0,
    "moment": "Gewone plaats"
  },
  {
    "name": "M. Masseter",
    "initials": "MM",
    "channel": "telefoon",
    "summary": "Pijn rond de kaak bij kauwen, klikken, tandenknarsen",
    "referral": "Tandarts",
    "tasks": 0
  },
  {
    "name": "H. Hippocampus",
    "initials": "HH",
    "channel": "chat",
    "summary": "Eerste aanval met bewustzijnsverlies en schokken",
    "referral": "Epilepsie",
    "tasks": 0
  }
];

export const TRIAGE_ALERT = "Plotse, zeer hevige hoofdpijn, binnen een minuut maximaal. Doorverwezen naar 112, secretariaat verwittigd.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "O. Botulinus",
    "initials": "OB",
    "reason": "Botulinetoxine, sessie 4"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "G. Temporalis",
    "initials": "GT",
    "reason": "Dringend · nieuwe hoofdpijn, pijn bij kauwen, wazig zien"
  },
  {
    "room": 1,
    "slot": 2,
    "length": 1,
    "name": "S. Nigra",
    "initials": "SN",
    "reason": "Nieuwe patiënt · tremor rechterhand"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "E. Trigeminus",
    "initials": "ET",
    "reason": "Nieuwe patiënt · chronische migraine"
  },
  {
    "room": 3,
    "slot": 1,
    "length": 1,
    "name": "A. Calcarina",
    "initials": "AC",
    "reason": "Migraine met aura"
  },
  {
    "room": 3,
    "slot": 3,
    "length": 1,
    "name": "V. Vagus",
    "initials": "VV",
    "reason": "Controle CGRP-antistof"
  }
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Ik heb al migraine sinds mijn zestiende, maar de laatste vier maanden is het bijna om de andere dag.",
  "Op hoeveel dagen had u de voorbije maand hoofdpijn? En op hoeveel daarvan nam u een pijnstiller of triptan?",
  "Een dag of 16. Ik neem bijna altijd iets, anders red ik het niet op het werk.",
  "Ziet u soms lichtflitsen of zigzaglijnen voor de hoofdpijn begint?",
  "Ja, een paar keer per jaar. Altijd hetzelfde, een twintigtal minuten."
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Hoofdpijn",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Migraine die de laatste vier maanden veel vaker komt. Vraag naar preventie volgens de huisarts."],
        ["Duur", "Migraine sinds de leeftijd van 16 jaar, toename sinds vier maanden"],
      ]],
      ["Hoofdpijnpatroon", [
        ["Hoofdpijndagen", "16 per maand, waarvan 10 met migrainekenmerken"],
        ["Kenmerken", "Kloppend, meestal links, NRS 8 tijdens een aanval. Misselijk, licht- en geluidsgevoelig, erger bij trappen lopen"],
        ["Duur aanval", "24 tot 48 uur zonder behandeling"],
        ["Aura", "2 à 3 keer per jaar zigzaglijnen rechts, 20 minuten, altijd identiek"],
        ["Triggers", "Menstruatie, slaaptekort, overgeslagen maaltijd, werkdruk, rode wijn"],
      ]],
      ["Acute medicatie", [
        ["Dagen per maand", "Triptan op ±11 dagen, ibuprofen op ±5 andere dagen"],
      ]],
      ["Eerdere preventie", [
        ["Propranolol", "2019, 3 maanden: moe, koude handen, geen effect"],
        ["Amitriptyline 25 mg", "2021, 4 maanden: suf, 4 kg bijgekomen"],
        ["Topiramaat 50 mg", "2023, 2 maanden: tintelingen, woordvindingsproblemen"],
        ["Andere", "Kinesitherapie nek, acupunctuur: tijdelijk beter"],
      ]],
      ["Beeldvorming elders", [
        ["MRI hersenen", "Radiologie Centrum Noord, maart 2021: normaal"],
      ]],
      ["Rode vlaggen", [
        ["Plots begin, koorts, uitval", "Nee"],
        ["Erger bij liggen, hoesten of persen", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Anticonceptie", "Combinatiepil (via foto medicatie)"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Moeder migraine"],
      ]],
      ["Sociale anamnese", [
        ["Koffie / alcohol", "4 à 5 tassen per dag / 2 à 3 glazen per week"],
        ["Slaap", "±6 uur, slecht inslapen, wakker van de jongste"],
      ]],
      ["Algemeen", [
        ["Beroep", "Boekhouder, 4/5, veel schermwerk. 6 dagen afwezig in 3 maanden"],
        ["Gezin", "Partner, twee kinderen van 4 en 7"],
        ["Sport", "Loopt 2× per week 5 km, yoga"],
        ["Leeftijd", "34 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["HIT-6 / MIDAS", "67 / 48 (lager = beter)"],
      ]],
    ],
  },
  {
    title: "Epilepsie",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Eerste aanval met bewustzijnsverlies en schokken, vorige zaterdag"],
      ]],
      ["Aanval", [
        ["Getuige", "Vriendin: armen en benen schokten ongeveer een minuut, daarna verward"],
        ["Uitlokkend", "Twee nachten weinig slaap, festival"],
        ["Tongbeet / incontinentie", "Ja, zijkant tong / nee"],
      ]],
      ["Rode vlaggen", [
        ["Nieuwe aanval, hoofdpijn, koorts", "Nee"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Student, rijdt met de auto / 22 jaar"],
      ]],
    ],
  },
  {
    title: "Bewegingsstoornissen",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Beven van de rechterhand in rust, sinds een jaar"],
      ]],
      ["Klachten", [
        ["Bijkomend", "Trager stappen, kleiner handschrift, minder reuk"],
        ["Slaap", "Slaat 's nachts om zich heen volgens de partner"],
      ]],
      ["Medische achtergrond", [
        ["Medicatie", "Geen medicatie die beven kan uitlokken"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Gepensioneerd schrijnwerker / 67 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts verwijst me door voor mijn migraine. Kan ik een afspraak maken bij de neuroloog?",
  "Vervelend om te horen. Is dit uw gekende hoofdpijn, of is er recent iets veranderd aan hoe ze aanvoelt?",
  "Het is dezelfde migraine, maar ze komt veel vaker. Bijna om de andere dag.",
  "Begon de hoofdpijn ooit plots, op een minuut tijd heel hevig? Of had u koorts, krachtverlies of moeite met spreken?",
  "Nee, dat niet.",
  "Dank u. Ik plan u in op de hoofdpijnraadpleging en stuur u een korte vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak ingepland op de hoofdpijnraadpleging: gekende migraine die vaker komt, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "U neemt op ongeveer zestien dagen per maand iets tegen de hoofdpijn. Dat kan de hoofdpijn zelf in stand houden.",
  "Dus hoe meer ik neem, hoe vaker ik hoofdpijn heb?",
  "Precies. We bouwen dat af en starten tegelijk een maandelijkse injectie die aanvallen voorkomt.",
  "En de pil? Die mag ik gewoon verder nemen?",
  "Met uw aura raad ik een pil zonder oestrogeen aan. Dat bespreekt u best met uw huisarts."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Migraine sinds de leeftijd van 16 jaar, toename sinds vier maanden. Verwezen door dr. Claes voor preventie. 16 hoofdpijndagen per maand, waarvan 10 met migrainekenmerken: kloppend, meestal links, NRS 8, misselijkheid, foto- en fonofobie. 2 à 3 keer per jaar typische visuele aura van 20 minuten. Triptan op ±11 dagen, ibuprofen op ±5 dagen per maand. Propranolol, amitriptyline en topiramaat gestopt wegens geen effect of bijwerkingen. Combinatiepil. Geen bloedverdunners. HIT-6 67, MIDAS 48."
  ],
  [
    "Klinisch onderzoek",
    "Bloeddruk 118/74 mmHg. Hersenzenuwen normaal. Fundoscopie: scherpe papillen. Kracht, sensibiliteit en reflexen symmetrisch normaal, geen pathologische reflexen. Coördinatie en gang normaal. Geen meningeale prikkeling. Gevoelige nek- en schouderspieren links. Slaapslagaders soepel, niet gevoelig."
  ],
  [
    "Aanvullende onderzoeken",
    "Geen nieuwe beeldvorming aangewezen. MRI hersenen 2021: normaal."
  ],
  [
    "Diagnose",
    "Chronische migraine met zeldzame aanvallen met typische aura. Medicatie-overgebruikshoofdpijn."
  ],
  [
    "Beleid",
    "Uitleg medicatie-overgebruik, acute medicatie tot hooguit 2 dagen per week volgens afbouwschema. Start erenumab 70 mg subcutaan maandelijks, aanvraag terugbetaling. Combinatiepil afgeraden wegens aura, overleg huisarts over anticonceptie zonder oestrogeen. Hoofdpijndagboek via de opvolging. Koffie afbouwen, regelmatige slaap en maaltijden. Herevaluatie na 3 maanden. Vangnet: 112 bij plotse, zeer hevige hoofdpijn, krachtverlies, spraakstoornis of een aura die anders is of langer dan een uur duurt."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Neurologie, hoofdpijn, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift",
    "Erenumab (Aimovig) 70 mg, maandelijks subcutaan",
    "Gegenereerd"
  ],
  [
    "Aanvraag terugbetaling",
    "Hoofdpijndagen en eerdere preventieve behandelingen, uit de intake",
    "Gegenereerd"
  ],
  [
    "Afbouwschema acute medicatie",
    "Hoeveel dagen per week, wat te doen bij een zware aanval",
    "Nog niet gegenereerd"
  ],
  [
    "Attest werkgever",
    "Schermwerk en pauzes",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Trigeminus voor migraine die de laatste vier maanden veel vaker komt. Ze heeft 16 hoofdpijndagen per maand en neemt op bijna al die dagen acute medicatie. We bouwen de acute medicatie af en starten een CGRP-antistof.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënte Eva Trigeminus, geboren op 22 juni 1992, die ik recent op de hoofdpijnraadpleging zag.",
  "REDEN VOOR CONTACT Verwezen wegens toenemende migraine ondanks meerdere preventieve behandelingen, met de vraag naar verdere preventie.",
  "ANAMNESE Migraine sinds de leeftijd van zestien jaar. De laatste vier maanden 16 hoofdpijndagen per maand, waarvan 10 met migrainekenmerken: kloppend, meestal links, met misselijkheid, licht- en geluidsgevoeligheid. Twee à drie keer per jaar een typische visuele aura van twintig minuten, altijd identiek. Triggers: menstruatie, slaaptekort, overgeslagen maaltijden en werkdruk. Neemt sumatriptan op ongeveer 11 dagen per maand en ibuprofen op ongeveer 5 andere dagen. Propranolol, amitriptyline en topiramaat werden geprobeerd en gestopt wegens onvoldoende effect of bijwerkingen. MRI van de hersenen in 2021 was normaal. Gebruikt een combinatiepil (Microgynon 30). Moeder heeft migraine. Geen allergieën. Zes dagen werkverzuim in de laatste drie maanden. HIT-6 67, MIDAS 48.",
  "KLINISCH ONDERZOEK Bloeddruk 118/74 mmHg. Normaal algemeen en neurologisch onderzoek, fundoscopie zonder papiloedeem. Gevoelige nek- en schouderspieren.",
  "AANVULLENDE ONDERZOEKEN Geen nieuwe beeldvorming aangewezen. MRI hersenen 2021: normaal.",
  "DIAGNOSE Chronische migraine met zeldzame aanvallen met typische aura. Medicatie-overgebruikshoofdpijn.",
  "BELEID We bespraken het medicatie-overgebruik: Eva beperkt acute medicatie tot hooguit twee dagen per week, volgens het meegegeven afbouwschema. We starten erenumab 70 mg subcutaan eenmaal per maand en vragen de terugbetaling aan. Gezien de migraine met aura raden we de combinatiepil af; graag uw hulp of die van haar gynaecoloog bij de keuze van een anticonceptie zonder oestrogeen. Ze houdt haar hoofdpijndagboek bij via de digitale opvolging. Herevaluatie over drie maanden; bij onvoldoende effect bespreken we een andere CGRP-antistof of botulinetoxine. Ze weet dat ze 112 belt bij een plotse, zeer hevige hoofdpijn, krachtverlies, spraakstoornissen of een aura die anders is dan gewoonlijk.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, neuroloog"
];

export const FOLLOW_ROWS = [
  [
    "V. Vagus",
    "CGRP-antistof · week 6"
  ],
  [
    "E. Trigeminus",
    "CGRP-antistof · maand 3 · HIT-6 ingevuld"
  ],
  [
    "O. Botulinus",
    "Botulinetoxine · week 12, vóór sessie 5"
  ],
  [
    "A. Calcarina",
    "Orale preventie · week 6"
  ]
];

export const FOLLOW_ALERT = "Meldt hardnekkige obstipatie sinds de tweede injectie, al 8 dagen geen stoelgang, buikpijn. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met de hoofdpijn sinds uw vorige consult?",
  "Veel beter. Ik had deze maand maar 4 echte migrainedagen.",
  "Fijn om te horen. Lukt het om de pijnstillers op hooguit twee dagen per week te houden?",
  "Ja. De eerste weken waren zwaar, nu lukt het goed.",
  "Is er iets dat nog niet lukt zoals u zou willen?",
  "Ik heb terug ja gezegd op het verjaardagsfeest van mijn zus, zonder schrik dat ik zou moeten afzeggen. Alleen rond mijn regels blijft het lastig.",
  "Had u een hoofdpijn die plots heel hevig begon, of een aura die anders was dan gewoonlijk?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "Migrainedagen per maand (lager = beter)",
    "10",
    "4"
  ],
  [
    "Hoofdpijndagen per maand (lager = beter)",
    "16",
    "7"
  ],
  [
    "Dagen met acute medicatie (lager = beter)",
    "16",
    "4"
  ],
  [
    "HIT-6 (36 tot 78, lager = beter)",
    "67",
    "55"
  ],
  [
    "MIDAS (lager = beter)",
    "48",
    "14"
  ],
  [
    "Slaap",
    "±6 uur, slecht inslapen",
    "±7 uur"
  ],
  [
    "Werk",
    "6 dagen afwezig in 3 maanden",
    "Geen afwezigheid"
  ],
  [
    "Sport",
    "Lopen vaak afgezegd",
    "Weer 2× per week"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Afbouw acute medicatie (Eva)",
    "Week 2",
    "Afbouw",
    "Hoofdpijn in de afbouwfase, dagen met medicatie, slaap, misselijkheid, hulp nodig?"
  ],
  [
    "CGRP-antistof (Eva)",
    "Week 4",
    "Na de eerste injectie",
    "Injectieplaats, obstipatie, andere bijwerkingen, migrainedagen"
  ],
  [
    "CGRP-antistof (Eva)",
    "Maand 3",
    "Evaluatie",
    "Migrainedagen, HIT-6, MIDAS, acute medicatie, slaap, werk, sport, open vragen, rode vlaggen"
  ],
  [
    "CGRP-antistof (Eva)",
    "Maand 6 en 12",
    "Opvolging + welzijn",
    "Idem, aangevuld met EQ-5D-5L en PREM"
  ],
  [
    "Orale preventie",
    "Week 6 en maand 3",
    "Bijwerkingen en effect",
    "Bijwerkingen, migrainedagen, HIT-6"
  ],
  [
    "Botulinetoxine",
    "Week 2",
    "Na de sessie",
    "Nekpijn, hangend ooglid, migrainedagen"
  ],
  [
    "Botulinetoxine",
    "Elke 12 weken, vóór de volgende sessie",
    "Effect",
    "Migrainedagen, HIT-6, MIDAS"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest hij later voor botulinetoxine of een andere preventie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 3 geneesmiddelen gevonden:",
  "confirm": "Ja. De pil was ik vergeten, die zie ik niet als medicatie. Ik neem ook elke dag magnesium, dat koop ik zelf.",
  "followUps": [
    {
      "question": "Genoteerd, ik voeg magnesium 300 mg toe. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Het Anker · Medicatieschema · E. Trigeminus, ° 22-06-1992",
    "rows": [
      [
        "Sumatriptan Sandoz 50 mg filmomhulde tabletten",
        "1 tablet bij aanval, max. 2 per dag · afgeleverd 4 × 6 tabletten sinds 9 september"
      ],
      [
        "Ibuprofen EG 400 mg filmomhulde tabletten",
        "1 tablet bij hoofdpijn, max. 3 per dag"
      ],
      [
        "Microgynon 30 omhulde tabletten",
        "1 tablet per dag, 21 dagen, 7 dagen stop"
      ]
    ]
  },
  "meds": [
    {
      "name": "Sumatriptan Sandoz",
      "substance": "Sumatriptan",
      "strength": "50 mg",
      "form": "Tablet",
      "frequency": "Bij aanval, ±11 dagen per maand",
      "indication": "Migraine-aanval",
      "source": "Foto in chat",
      "chatLabel": "Sumatriptan 50 mg · bij een aanval"
    },
    {
      "name": "Ibuprofen EG",
      "substance": "Ibuprofen",
      "strength": "400 mg",
      "form": "Tablet",
      "frequency": "Bij hoofdpijn, ±5 dagen per maand",
      "indication": "Hoofdpijn (NSAID)",
      "source": "Foto in chat",
      "chatLabel": "Ibuprofen 400 mg · bij hoofdpijn"
    },
    {
      "name": "Microgynon 30",
      "substance": "Levonorgestrel + ethinylestradiol",
      "strength": "0,15 mg / 0,03 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 21 dagen",
      "indication": "Anticonceptie",
      "source": "Foto in chat",
      "chatLabel": "Microgynon 30 · 1× per dag",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "Magnesium",
      "substance": "Magnesium",
      "strength": "300 mg",
      "form": "Tablet",
      "frequency": "1× per dag",
      "indication": "Zelfzorg migraine",
      "source": "Chat",
      "chatLabel": "Magnesium 300 mg · 1× per dag",
      "later": true,
      "tag": {
        "label": "Bron: chat",
        "tone": "blue"
      }
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Acute medicatie",
      "value": "Op 16 dagen per maand, triptan op ±11 (gemarkeerd)",
      "tone": "warn"
    },
    {
      "label": "Anticonceptie",
      "value": "Combinatiepil met oestrogeen bij migraine met aura (gemarkeerd)",
      "tone": "warn"
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
