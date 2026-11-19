import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "P. Pleura",
    "initials": "PP",
    "channel": "telefoon",
    "summary": "Plots kortademig, stekende pijn bij inademen, gezwollen kuit, vorige week lange vlucht",
    "referral": "Spoed",
    "tasks": 1
  },
  {
    "name": "P. Bronchus",
    "initials": "PB",
    "channel": "chat",
    "summary": "Kortademig bij inspanning sinds 2 jaar, ochtendhoest met slijm, rookt, 2 opstoten vorige winter",
    "referral": "COPD",
    "tasks": 0
  },
  {
    "name": "L. Lobus",
    "initials": "LL",
    "channel": "chat",
    "summary": "Kortademig bij plat liggen, slaapt op drie kussens, dikke enkels",
    "referral": "Cardiologie",
    "tasks": 0
  },
  {
    "name": "A. Alveolus",
    "initials": "AA",
    "channel": "telefoon",
    "summary": "Piepen en hoesten 's nachts en bij inspanning, hooikoorts, rookt niet",
    "referral": "Astma",
    "tasks": 0
  },
  {
    "name": "H. Hilus",
    "initials": "HH",
    "channel": "chat",
    "summary": "Bloedsporen in het slijm, 6 kg afgevallen, rookt al 50 jaar",
    "referral": "Thoracale oncologie",
    "tasks": 1,
    "moment": "Voorrang"
  },
  {
    "name": "C. Carina",
    "initials": "CC",
    "channel": "chat",
    "summary": "Vraag over afspraak",
    "referral": "",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Plots kortademig met stekende pijn bij inademen en een gezwollen kuit, na een lange vlucht. Patiënt verwezen naar 112, secretariaat verwittigd.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "D. Diafragma",
    "initials": "DD",
    "reason": "Controle na opname voor opstoot"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "H. Hilus",
    "initials": "HH",
    "reason": "Voorrang · bloedsporen in het slijm en gewichtsverlies"
  },
  {
    "room": 1,
    "slot": 2,
    "length": 1,
    "name": "C. Carina",
    "initials": "CC",
    "reason": "Hoest sinds 5 weken"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "P. Bronchus",
    "initials": "PB",
    "reason": "Nieuwe patiënt · COPD · spirometrie"
  },
  {
    "room": 3,
    "slot": 1,
    "length": 1,
    "name": "B. Bronchiolus",
    "initials": "BB",
    "reason": "Controle COPD na opstoot"
  },
  {
    "room": 3,
    "slot": 3,
    "length": 1,
    "name": "E. Epiglottis",
    "initials": "EE",
    "reason": "Opvolging longrevalidatie"
  }
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Al twee jaar word ik steeds sneller kortademig. Na één trap moet ik stoppen.",
  "Hoe ver kunt u nog wandelen op vlak terrein, zonder te stoppen?",
  "Een 500 meter. Vroeger deed ik 2 km met de hond.",
  "Hoe vaak moest u het voorbije jaar antibiotica of cortisone nemen voor uw longen?"
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "COPD",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Toenemende kortademigheid bij inspanning en ochtendhoest met slijm. Vermoeden van COPD volgens de huisarts."],
        ["Duur", "Kortademigheid twee jaar, hoest al jaren"],
      ]],
      ["Klachten", [
        ["Kortademigheid", "Stopt na één trap, wandelt 500 m (mMRC 2). Niet in rust, niet bij plat liggen"],
        ["Hoest en slijm", "Elke ochtend, wit slijm, een eetlepel. Geen bloed"],
        ["Piepen", "Soms, bij kou en 's ochtends"],
      ]],
      ["Opstoten", [
        ["Voorbije jaar", "2: januari bij de huisarts, maart op spoed (niet opgenomen). Telkens antibiotica en Medrol"],
      ]],
      ["Rode vlaggen", [
        ["Bloed opgehoest", "Nee"],
        ["Gewichtsverlies, koorts, nachtzweten", "Nee"],
        ["Pijn op de borst, dikke enkels", "Nee"],
      ]],
      ["Roken", [
        ["Status", "Rookt nog, 15 sigaretten per dag. Sinds zijn 17de: ±45 pakjaren"],
        ["Stoppogingen", "2, zonder hulp, hield het 3 weken vol"],
      ]],
      ["Blootstelling", [
        ["Beroep", "38 jaar lasser, lasdampen, vaak zonder afzuiging"],
        ["Thuis", "Hond. Geen vogels, geen schimmel"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Spiriva sinds 6 maanden, \"iets beter\". Ventolin 4 à 5 keer per dag, zonder voorzetkamer"],
        ["Eerdere onderzoeken", "RX thorax in maart, AZ Sint-Maarten. Nooit een longfunctietest"],
        ["Voorgeschiedenis", "Hypertensie, prostaatvergroting"],
        ["Vaccinaties", "Griep vorig jaar. Pneumokokken, COVID-19, RSV: weet het niet"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Vader COPD, moeder diabetes"],
      ]],
      ["Algemeen", [
        ["Beroep", "Gepensioneerd lasser, sinds vorig jaar"],
        ["Hobby's", "Wandelen met de hond, vissen aan het kanaal, kleinkinderen op woensdag"],
        ["Lengte / gewicht", "1,74 m / 71 kg, gewicht stabiel"],
        ["Leeftijd", "64 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["CAT", "22 (0 tot 40, lager = beter)"],
      ]],
    ],
  },
  {
    title: "Astma",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Piepen en hoesten 's nachts en bij inspanning, sinds 6 maanden"],
      ]],
      ["Klachten", [
        ["Nachtelijke klachten", "2 à 3 nachten per week wakker van hoest"],
        ["Uitlokkers", "Lopen in de kou, stof, katten, lente"],
      ]],
      ["Roken", [
        ["Status", "Nooit gerookt"],
      ]],
      ["Medische achtergrond", [
        ["Allergie", "Hooikoorts sinds de kindertijd"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Kleuterjuf / 32 jaar"],
      ]],
    ],
  },
  {
    title: "Chronische hoest",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Droge hoest sinds 5 weken, na een verkoudheid"],
      ]],
      ["Rode vlaggen", [
        ["Bloed, koorts, gewichtsverlies", "Nee"],
      ]],
      ["Klachten", [
        ["Kortademigheid", "Nee"],
        ["Reflux, loopneus", "Soms zuur oprispen"],
      ]],
      ["Medicatie", [
        ["Bloeddrukmiddel", "Geen ACE-remmer"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Callcentermedewerker / 41 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts denkt dat ik COPD heb. Kan ik een afspraak krijgen bij de longarts?",
  "Vervelend om te horen. Wanneer bent u kortademig: bij inspanning, in rust, of als u plat ligt?",
  "Bij inspanning. Een trap, of wandelen met de hond.",
  "Heeft u bloed opgehoest, koorts gehad of bent u ongewild vermagerd?",
  "Nee, dat niet.",
  "Dank u. Ik plan u in op de COPD-raadpleging, met tijd voor een longfunctietest, en stuur u een korte vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak ingepland op de COPD-raadpleging met spirometrie: kortademig bij inspanning, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Uw longfunctie toont een vernauwing die niet verdwijnt na de puffer. Dat past bij COPD.",
  "Is dat van het lassen of van het roken?",
  "Vooral het roken, het lassen speelt mee. Toon me eens hoe u uw Ventolin neemt.",
  "Zo, gewoon puffen en inademen.",
  "U ademt te snel in. Met een voorzetkamer komt er veel meer in uw longen."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Sinds twee jaar progressieve inspanningsdyspneu, stopt na één trap, wandelt 500 m (mMRC 2). Chronische ochtendhoest met wit sputum, geen hemoptoe. Twee matige exacerbaties het voorbije jaar (antibiotica en methylprednisolon, één spoedbezoek zonder opname). Tiotropium sinds 6 maanden met beperkt effect, salbutamol 4 à 5× per dag zonder voorzetkamer. Actief roker, 45 pakjaren. 38 jaar lasser. Geen gewichtsverlies, geen orthopneu, geen enkeloedeem. CAT 22."
  ],
  [
    "Klinisch onderzoek",
    "Ademfrequentie 18/min, SpO2 93% in rust. BMI 23,5. Verlengd expirium, verminderd vesiculair ademgeruis bilateraal, enkele expiratoire wheezing basaal. Geen crepitaties. Geen clubbing, geen oedeem. Harttonen regelmatig. Inhalatietechniek: salbutamol te snelle inademing en slechte coördinatie; Respimat zonder adempauze. Gecorrigeerd."
  ],
  [
    "Longfunctie",
    "Spirometrie na bronchodilatatie: FEV1 1,52 l (51%), FVC 3,10 l (80%), FEV1/FVC 0,49. Reversibiliteit +90 ml (6%). DLCO 58%. 6MWT 380 m, desaturatie tot 89%."
  ],
  [
    "Beeldvorming en labo",
    "CT thorax lage dosis: centrilobulair emfyseem bovenkwabben, geen verdachte nodus. Eosinofielen 220/µl, alfa-1-antitrypsine normaal, NT-proBNP 95 pg/ml."
  ],
  [
    "Diagnose",
    "COPD GOLD 2, groep E, met emfyseem. Actief roker. Lichte inspanningsdesaturatie."
  ],
  [
    "Beleid",
    "Tiotropium vervangen door tiotropium/olodaterol (Spiolto Respimat) 2 inhalaties 1× per dag. Geen ICS nu (eosinofielen 220/µl), heroverwegen bij nieuwe opstoot. Salbutamol met voorzetkamer. Rookstop: tabacoloog, nicotinepleister 21 mg en kauwgom. Ambulante longrevalidatie. Vaccinaties via huisarts. Actieplan bij opstoot. Plasklachten opvolgen (dutasteride/tamsulosine). Herevaluatie na 3 maanden met spirometrie. Vangnet: 112 bij ernstige dyspneu in rust, cyanose of sufheid; zelfde dag contact bij opstoot of bloed in het sputum."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Pneumologie, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift",
    "Spiolto Respimat en voorzetkamer",
    "Gegenereerd"
  ],
  [
    "Aanvraag longrevalidatie",
    "Ambulante revalidatie, 3 maanden",
    "Gegenereerd"
  ],
  [
    "Verwijzing tabacoloog",
    "Rookstopbegeleiding met nicotinevervanging",
    "Nog niet gegenereerd"
  ],
  [
    "Actieplan bij een opstoot",
    "Voor de patiënt: wat doen en wanneer bellen",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Bronchus voor toenemende kortademigheid bij inspanning en chronische hoest. De spirometrie bevestigt COPD GOLD 2, met twee opstoten het voorbije jaar. We starten tiotropium/olodaterol, longrevalidatie en rookstopbegeleiding, en herevalueren over drie maanden.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Paul Bronchus, geboren op 22 augustus 1962, die ik recent op de COPD-raadpleging zag.",
  "REDEN VOOR CONTACT Verwezen wegens toenemende kortademigheid bij inspanning en chronische hoest, met vermoeden van COPD.",
  "ANAMNESE Sinds twee jaar geleidelijk toenemende kortademigheid: moet na één trap stoppen, wandelt nog 500 meter (mMRC 2). Elke ochtend hoest met wit slijm, geen bloed. Het voorbije jaar twee opstoten, behandeld met antibiotica en methylprednisolon, waarvan één op de spoedgevallen zonder opname. Sinds zes maanden tiotropium met beperkt effect; gebruikt salbutamol vier à vijf keer per dag, zonder voorzetkamer. Actief roker, ongeveer 45 pakjaren, twee eerdere stoppogingen zonder hulp. 38 jaar lasser. Gekend met hypertensie en prostaatvergroting (dutasteride/tamsulosine). Vader had COPD. Geen allergieën, geen bloedverdunners. CAT 22.",
  "KLINISCH ONDERZOEK Ademfrequentie 18 per minuut, saturatie 93% in rust. Verlengd expirium, verminderd ademgeruis, enkele expiratoire wheezing basaal. Geen crepitaties, geen tekenen van hartfalen. Inhalatietechniek onvoldoende, gecorrigeerd.",
  "AANVULLENDE ONDERZOEKEN Spirometrie na bronchodilatatie: FEV1 1,52 l (51%), FVC 3,10 l (80%), FEV1/FVC 0,49, niet significant reversibel. DLCO 58%. Zes-minutenwandeltest 380 m met desaturatie tot 89%. CT thorax: centrilobulair emfyseem in de bovenkwabben, geen verdachte letsels. Eosinofielen 220/µl, alfa-1-antitrypsine normaal, NT-proBNP normaal.",
  "DIAGNOSE COPD GOLD 2, groep E, met emfyseem. Actief roker. Lichte desaturatie bij inspanning.",
  "BELEID We vervangen tiotropium door tiotropium/olodaterol (Spiolto Respimat), twee inhalaties eenmaal daags. Salbutamol voortaan met voorzetkamer. Geen inhalatiecorticoïd op dit moment; we heroverwegen dit bij een nieuwe opstoot. Paul wil stoppen met roken: hij gaat naar de tabacoloog en start nicotinevervanging. We vragen ambulante longrevalidatie aan. Graag uw hulp voor de vaccinaties tegen griep, pneumokokken, COVID-19 en RSV. Hij kreeg een schriftelijk actieplan bij een opstoot. Gezien de prostaatvergroting volgen we plasklachten op. Herevaluatie over drie maanden met spirometrie. Hij weet dat hij 112 belt bij ernstige kortademigheid in rust, blauwe lippen of sufheid, en dezelfde dag contact opneemt bij een opstoot of bloed in het slijm.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, pneumoloog"
];

export const FOLLOW_ROWS = [
  [
    "B. Bronchiolus",
    "COPD · maand 3"
  ],
  [
    "P. Bronchus",
    "Inhalatietherapie + rookstop · maand 3 · CAT ingevuld"
  ],
  [
    "D. Diafragma",
    "Na opname voor opstoot · week 4"
  ],
  [
    "E. Epiglottis",
    "Longrevalidatie · einde"
  ]
];

export const FOLLOW_ALERT = "Meldt sinds twee dagen meer kortademigheid, groen slijm en koorts (38,4 °C). Mogelijke opstoot. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw ademhaling sinds uw vorige consult?",
  "Beter. Ik rook al zeven weken niet meer, en de Ventolin heb ik nog maar één keer per dag nodig.",
  "Proficiat. Is er iets dat nog niet lukt?",
  "Het hele rondje met de hond. Ik haal nu 1 km, met één pauze.",
  "Heeft u bloed opgehoest, koorts gehad, of meer of groen slijm?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "CAT (0 tot 40, lager = beter)",
    "22",
    "15"
  ],
  [
    "mMRC (0 tot 4, lager = beter)",
    "2",
    "2"
  ],
  [
    "Opstoten",
    "2 het voorbije jaar",
    "0"
  ],
  [
    "Roken",
    "15 sigaretten per dag",
    "Rookvrij sinds 7 weken"
  ],
  [
    "Noodpuffer",
    "4 à 5× per dag",
    "1× per dag"
  ],
  [
    "Wandelen met de hond",
    "500 m",
    "1 km met één pauze"
  ],
  [
    "Longrevalidatie",
    "n.v.t.",
    "30 van 36 sessies"
  ],
  [
    "Vissen",
    "Lukt niet meer",
    "Met de auto tot aan het water"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Inhalatietherapie + rookstop (Paul)",
    "Week 2",
    "Start nieuwe inhalator",
    "Inname, techniek, droge mond, plasklachten, noodpuffer, rookstatus"
  ],
  [
    "Inhalatietherapie + rookstop (Paul)",
    "Maand 3",
    "Opvolging COPD",
    "CAT, mMRC, opstoten, rookstatus, noodpuffer, wandelafstand, slaap, hobby's, open vragen, rode vlaggen"
  ],
  [
    "Inhalatietherapie + rookstop (Paul)",
    "Maand 12",
    "Opvolging COPD + welzijn",
    "Idem, aangevuld met EQ-5D-5L en vaccinaties"
  ],
  [
    "Longrevalidatie",
    "Start",
    "Doelen revalidatie",
    "CAT, mMRC, persoonlijke doelen"
  ],
  [
    "Longrevalidatie",
    "Einde (maand 3)",
    "Uitkomst revalidatie",
    "CAT, mMRC, doelen bereikt, PREM"
  ],
  [
    "Na opname voor opstoot",
    "Dag 3 na ontslag",
    "Thuis na opname",
    "Kortademigheid, cortisone en antibiotica afgewerkt, actieplan, controle afgesproken"
  ],
  [
    "Na opname voor opstoot",
    "Week 4",
    "Herstel na opstoot",
    "CAT, terug op het oude niveau, rode vlaggen"
  ],
  [
    "Rookstop",
    "Week 1, 4 en 12",
    "Rookvrij",
    "Rookstatus, ontwenning, nicotinevervanging, steun"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Wordt Paul later opgenomen voor een opstoot, of start hij longrevalidatie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const FOLLOW_QUOTE = "Ik had nooit gedacht dat ik zou stoppen met roken. De pleisters helpen, en in de revalidatie zie ik mannen die er slechter aan toe zijn. Dat is genoeg motivatie.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen of puffers? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja. De Duodart was ik vergeten, die is voor de plas. De Ventolin neem ik nu wel 4 à 5 keer per dag.",
  "followUps": [
    {
      "question": "Genoteerd. Gebruikt u de Ventolin met een voorzetkamer?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    },
    {
      "question": "Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Sint-Jozef · Medicatieschema · P. Bronchus, ° 22-08-1962",
    "rows": [
      [
        "Spiriva Respimat 2,5 microgram oplossing voor inhalatie",
        "2 inhalaties 1× per dag, 's ochtends"
      ],
      [
        "Ventolin 100 microgram aërosol",
        "1 à 2 puffs bij kortademigheid"
      ],
      [
        "Amlor 5 mg capsules",
        "1 capsule 's ochtends"
      ],
      [
        "Duodart 0,5 mg/0,4 mg harde capsules",
        "1 capsule 's avonds"
      ]
    ]
  },
  "meds": [
    {
      "name": "Spiriva Respimat",
      "substance": "Tiotropium",
      "strength": "2,5 µg per inhalatie",
      "form": "Inhalatievloeistof (Respimat)",
      "frequency": "2 inhalaties 1× per dag, 's ochtends",
      "indication": "COPD (onderhoud)",
      "source": "Foto in chat",
      "chatLabel": "Spiriva Respimat 2,5 µg · 2 inhalaties 1× per dag ’s ochtends"
    },
    {
      "name": "Ventolin",
      "substance": "Salbutamol",
      "strength": "100 µg per puff",
      "form": "Dosisaërosol",
      "frequency": "Bij nood, nu 4 à 5× per dag, zonder voorzetkamer",
      "indication": "Kortademigheid (noodpuffer)",
      "source": "Foto in chat + chat",
      "chatLabel": "Ventolin 100 µg · 1 à 2 puffs bij kortademigheid"
    },
    {
      "name": "Amlor",
      "substance": "Amlodipine",
      "strength": "5 mg",
      "form": "Capsule",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hypertensie",
      "source": "Foto in chat",
      "chatLabel": "Amlor 5 mg · 1× per dag ’s ochtends"
    },
    {
      "name": "Duodart",
      "substance": "Dutasteride + tamsulosine",
      "strength": "0,5 mg / 0,4 mg",
      "form": "Capsule",
      "frequency": "1× per dag, 's avonds",
      "indication": "Prostaatvergroting",
      "source": "Foto in chat",
      "chatLabel": "Duodart 0,5 mg/0,4 mg · 1× per dag ’s avonds",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
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
      "label": "Let op",
      "value": "Tiotropium bij prostaatvergroting: plasklachten nagaan",
      "tone": "warn"
    },
    {
      "label": "Noodpuffer",
      "value": "4 à 5× per dag, zonder voorzetkamer",
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
