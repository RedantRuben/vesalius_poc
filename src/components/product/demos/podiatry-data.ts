import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {"name": "M. Metatarsus", "initials": "MM", "channel": "telefoon", "summary": "Diabetes type 2, wonde onder de bal van de grote teen, voet rood en warm sinds gisteren", "referral": "Vandaag contact", "tasks": 1},
  {"name": "S. Calcaneus", "initials": "SC", "channel": "chat", "summary": "Hielpijn rechts sinds 4 maanden, startpijn 's ochtends, loopster, verwezen door huisarts", "referral": "Biomechanica en sport", "tasks": 0},
  {"name": "B. Navicularis", "initials": "BN", "channel": "chat", "summary": "Pijn middenvoet bij elke stap sinds loopvolume verdubbelde, drukpijn op het bot · beeldvorming via de huisarts", "referral": "Advies huisarts", "tasks": 1},
  {"name": "N. Tibialis", "initials": "NT", "channel": "telefoon", "summary": "Branderige, tintelende voetzool, 's nachts erger · neurologie via de huisarts", "referral": "Advies huisarts", "tasks": 0},
  {"name": "K. Clavus", "initials": "KC", "channel": "chat", "summary": "Pijnlijke likdoorn onder de voorvoet, geen diabetes", "referral": "Voetverzorging", "tasks": 0},
  {"name": "A. Achilles", "initials": "AA", "channel": "chat", "summary": "Vraag over afspraak", "referral": "", "tasks": 0, "status": "IN_PROGRESS" as const},
];

export const TRIAGE_ALERT = "Diabetes met een wonde onder de grote teen en een rode, warme voet. Secretariaat belt vandaag terug.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1, "name": "A. Achilles", "initials": "AA", "reason": "Controle achillespees, steunzolen week 6"},
  {"room": 1, "slot": 1, "length": 1, "name": "M. Metatarsus", "initials": "MM", "reason": "Dringend · wonde bij diabetes, in afwachting van voetkliniek"},
  {"room": 1, "slot": 2, "length": 1, "name": "K. Clavus", "initials": "KC", "reason": "Voetverzorging, likdoorn"},
  {"room": 2, "slot": 0, "length": 2, "name": "S. Calcaneus", "initials": "SC", "reason": "Nieuwe patiënte · hielpijn, voet- en loopanalyse"},
  {"room": 3, "slot": 1, "length": 1, "name": "O. Unguis", "initials": "OU", "reason": "Nagelingreep teen rechts"},
  {"room": 3, "slot": 3, "length": 1, "name": "L. Hallux", "initials": "LH", "reason": "Afhalen steunzolen"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Al vier maanden pijn onder mijn rechterhiel. Het begon toen ik meer ging lopen, met nieuwe schoenen.",
  "Hoe erg is de pijn bij de eerste stappen 's ochtends, op 10? En na een lange werkdag?",
  "'s Ochtends 7, na een dienst van 12 uur een 6. Na tien minuten stappen zakt het naar 3.",
  "Voelt u tintelingen, branden of een doof gevoel in uw voet?",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Biomechanica en sport",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Pijn onder de hiel rechts, mediaal. Vermoeden van plantaire fasciitis volgens de huisarts, verwezen voor steunzolen."],
        ["Duur", "Vier maanden"],
        ["Zijde", "Rechts (links klachtenvrij)"],
      ]],
      ["Aard van de pijn", [
        ["Eerste stappen 's ochtends", "7/10, stekend, \"alsof ik op een steentje stap\""],
        ["Na 10 minuten stappen", "3/10"],
        ["Na een dienst van 12 uur", "6/10"],
      ]],
      ["Wanneer heb je pijn", [
        ["Erger bij", "Eerste stappen na rust, lang staan, blootsvoets op tegels, na het lopen"],
        ["Beter bij", "Inlopen, schoenen met wat hak, ijs, ibuprofen"],
      ]],
      ["Uitlokkend moment", [
        ["Begin", "Loopvolume van 20 naar 35 km per week, nieuwe loopschoenen met 4 mm drop"],
      ]],
      ["Rode vlaggen", [
        ["Tintelingen of doof gevoel", "Nee"],
        ["Zwelling, roodheid, nachtpijn", "Nee"],
        ["Diabetes, wonde aan de voet", "Nee"],
      ]],
      ["Schoeisel", [
        ["Loopschoenen", "4 mm drop, ±600 km"],
        ["Werkschoenen", "Klompen, twee jaar oud"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Twee weken rust, ijs, rekoefeningen van YouTube, ibuprofen. Telkens tijdelijk beter."],
        ["Beeldvorming elders", "Echo bij de huisarts, september 2026: plantaire fascia rechts 6,1 mm, links 3,4 mm"],
        ["Voorgeschiedenis", "Hypothyreoïdie sinds 2019, keizersnede 2012"],
        ["Allergieën", "Kleefpleister (jeuk en roodheid)"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Moeder reumatoïde artritis"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Nee / 3 glazen per week"],
      ]],
      ["Algemeen", [
        ["Beroep", "Verpleegkundige spoedgevallen, diensten van 10 tot 12 uur"],
        ["Sport", "Loopt 3× per week, ±30 km. Traint voor de 20 km door Brussel. Gestopt sinds drie weken."],
        ["Hobby", "Wandelen met de hond, tuinieren"],
        ["Lengte / gewicht", "1,68 m / 74 kg"],
        ["Leeftijd", "46 jaar"],
        ["Verwijzing", "Via dr. Peeters, huisarts"],
      ]],
      ["Baseline", [
        ["FFI", "48%"],
      ]],
    ],
  },
  {
    title: "Diabetische voet",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Jaarlijkse voetcontrole bij type 2-diabetes, eelt onder de voorvoet"],
      ]],
      ["Rode vlaggen", [
        ["Wonde of verkleuring", "Nee"],
        ["Rode, warme of gezwollen voet", "Nee"],
      ]],
      ["Neuropathie", [
        ["Tintelingen, doof gevoel", "Ja, beide voeten, 's avonds"],
      ]],
      ["Medische achtergrond", [
        ["Laatste HbA1c", "7,4% (augustus 2026)"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Gepensioneerd / 71 jaar"],
      ]],
    ],
  },
  {
    title: "Nagels en huid",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Ingegroeide teennagel grote teen rechts, rood en pijnlijk sinds 3 weken"],
      ]],
      ["Rode vlaggen", [
        ["Koorts, uitbreidende roodheid", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Bloedverdunners", "Ja, Xarelto 20 mg"],
        ["Eerdere behandeling", "Twee keer eerder ingegroeid, telkens zelf geknipt"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Bouwvakker / 38 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts denkt dat ik een plantaire fasciitis heb. Kan ik een afspraak maken voor steunzolen?",
  "Vervelend om te horen. Is de pijn het ergst bij de eerste stappen 's ochtends en wordt ze beter als u wat gestapt hebt?",
  "Ja, precies. 's Ochtends strompel ik, na tien minuten gaat het.",
  "Heeft u diabetes, of een wonde, zwelling of roodheid aan de voet?",
  "Nee, dat niet.",
  "Dank u. Ik plan u in voor een voet- en loopanalyse en stuur u een korte vragenlijst. Neem gerust uw loopschoenen en werkschoenen mee.",
];

export const VOICE_TASK = "Afspraak ingepland bij de podoloog, biomechanica en sport: hielpijn met startpijn, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Ik druk hier even aan de binnenkant van uw hiel. Zeg maar wat u voelt.",
  "Au, ja, daar zit het. Precies daar.",
  "Nu trek ik uw grote teen omhoog, terwijl u op uw voet staat.",
  "Dat trekt onder mijn voet, tot in de hiel.",
];

export const SCRIBE_NOTE = [
  ["Anamnese", "Pijn mediaal onder de hiel rechts sinds vier maanden. Verwezen door dr. Peeters met vermoeden van plantaire fasciitis, voor steunzolen. Startpijn 's ochtends 7/10, na 10 minuten stappen 3/10, na een dienst van 12 uur 6/10. Begonnen na toename loopvolume van 20 naar 35 km per week en nieuwe loopschoenen (4 mm drop). Verpleegkundige spoedgevallen, werkt in klompen. Rust, ijs, rekoefeningen en ibuprofen telkens tijdelijk beter. Geen tintelingen, zwelling of nachtpijn. Geen diabetes, geen bloedverdunners. Allergie voor kleefpleister."],
  ["Klinisch onderzoek (statisch)", "BMI 26,2. Drukpijn mediaal tuberculum calcanei rechts. Windlass-test rechts positief. Dorsiflexie enkel met gestrekte knie rechts 5°, links 10°. Met gebogen knie rechts 15°: Silfverskiöld positief. FPI-6 rechts +8, links +5. Navicular drop rechts 11 mm, links 7 mm. Squeeze-test calcaneus negatief. Tinel tarsaletunnel negatief. Achillespees pijnvrij. Sensibiliteit en pulsaties normaal."],
  ["Dynamisch onderzoek", "Verlengde pronatie in midstance rechts, vroege hielheffing rechts. Verhoogde drukpiek mediaal onder de hiel rechts."],
  ["Schoeisel", "Loopschoenen 4 mm drop, demping versleten na ±600 km. Klompen met versleten hielkap."],
  ["Aanvullende onderzoeken", "Echo (september 2026, via huisarts): plantaire fascia rechts 6,1 mm, links 3,4 mm."],
  ["Conclusie", "Plantaire fasciopathie rechts, met verhoogde pronatie en verkorte gastrocnemius."],
  ["Behandelplan", "Steunzolen op maat voor loop- en werkschoenen: mediale ondersteuning, diepe hielcup, zachte hielzone. Tijdelijk low-dye taping met hypoallergene tape. Oefenschema: rekken kuit en plantaire fascia, hielheffingen op een trede, om de andere dag. Schoenadvies: loopschoen 8 tot 10 mm drop, werkschoen met stevige hielkap. Lopen hervatten na twee weken pijnvrij stappen, opbouw max. 10% per week. Ibuprofen afbouwen, overleg huisarts. Herevaluatie na zes weken. Bij onvoldoende verbetering na drie maanden: via huisarts naar sportarts of fysische geneeskunde (shockwave). Vangnet: plotse scherpe pijn met zwelling onder de hiel, pijn in rust of 's nachts, tintelingen. Opvolging met FFI en NRS eerste stappen."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon Podologie, voor het patiëntendossier", "Gegenereerd"],
  ["Verslag aan de huisarts", "Bevindingen, conclusie en behandelplan voor de verwijzer", "Gegenereerd"],
  ["Zolenfiche", "Werkopdracht voor de vervaardiging van de steunzolen", "Gegenereerd"],
  ["Oefenschema", "Rek- en versterkingsoefeningen met schoenadvies, voor de patiënte", "Nog niet gegenereerd"],
  ["Attest mutualiteit", "Voor terugbetaling uit de aanvullende verzekering", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Calcaneus voor pijn onder de hiel rechts sinds vier maanden. Het onderzoek past bij een plantaire fasciopathie rechts, met verhoogde pronatie en een verkorte kuitspier. We starten met steunzolen op maat, oefeningen en schoenadvies, en herevalueren na zes weken.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënte Sara Calcaneus, geboren op 9 februari 1980, die ik recent op consultatie zag.",
  "REDEN VOOR CONTACT Verwezen met een vermoeden van plantaire fasciitis rechts, voor steunzolen. Pijn onder de hiel rechts sinds vier maanden.",
  "ANAMNESE Stekende pijn mediaal onder de hiel rechts, het ergst bij de eerste stappen 's ochtends (7/10) en na een dienst van 12 uur (6/10). Na tien minuten stappen beter (3/10). Begonnen na een toename van het loopvolume van 20 naar 35 km per week en nieuwe loopschoenen met weinig demping. Werkt als verpleegkundige op de spoedgevallen, lange diensten staand, in klompen. Twee weken rust, ijs, rekoefeningen en ibuprofen gaven telkens tijdelijk verbetering. Geen gevoelsstoornissen, geen zwelling, geen nachtpijn. Hypothyreoïdie, behandeld met levothyroxine. Neemt sinds vier maanden bijna dagelijks ibuprofen 400 mg en gebruikt diclofenacgel. Geen bloedverdunners, geen diabetes. Allergie voor kleefpleister.",
  "KLINISCH ONDERZOEK Drukpijn mediaal tuberculum calcanei rechts. Windlass-test rechts positief. Dorsiflexie van de enkel met gestrekte knie rechts 5°, links 10°, met gebogen knie rechts 15°: verkorte gastrocnemius. Foot Posture Index rechts +8, links +5. Navicular drop rechts 11 mm. Squeeze-test calcaneus negatief, Tinel ter hoogte van de tarsaletunnel negatief, achillespees pijnvrij. Loopanalyse: verlengde pronatie in midstance rechts en verhoogde drukpiek mediaal onder de hiel rechts. Loopschoenen met versleten demping.",
  "AANVULLENDE ONDERZOEKEN Echo (september 2026, via u): verdikte plantaire fascia rechts, 6,1 mm, links 3,4 mm.",
  "CONCLUSIE Plantaire fasciopathie rechts, met verhoogde pronatie en een verkorte gastrocnemius, uitgelokt door een snelle toename van het loopvolume, schoeisel en lange diensten staand.",
  "BELEID Steunzolen op maat voor loop- en werkschoenen, tijdelijk taping met hypoallergene tape, een oefenschema voor rekken en versterken, en schoenadvies. Lopen pas hervatten na twee weken pijnvrij stappen, met geleidelijke opbouw. Mevrouw neemt sinds vier maanden bijna dagelijks ibuprofen: ik stelde voor dat af te bouwen en dit met u te bespreken. Herevaluatie na zes weken. Bij onvoldoende verbetering na drie maanden stel ik voor haar naar een sportarts of fysische geneeskunde te verwijzen voor shockwavetherapie. Ze weet dat ze contact moet opnemen bij een plotse scherpe pijn met zwelling onder de hiel, pijn in rust of 's nachts, of tintelingen.",
  "Met vriendelijke groeten, Andreas Vesalius, podoloog",
];

export const FOLLOW_ROWS = [
  ["O. Unguis", "Nagelingreep · dag 2"],
  ["S. Calcaneus", "Steunzolen + oefeningen · week 6 · FFI ingevuld"],
  ["A. Achilles", "Steunzolen + oefeningen · maand 3"],
  ["L. Hallux", "Steunzolen · week 2 gewenning"],
];

export const FOLLOW_ALERT = "Meldt toenemende roodheid rond de teen en koorts (38,2 °C), twee dagen na de nagelingreep. Neemt Xarelto. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met de pijn onder uw hiel bij de eerste stappen 's ochtends?",
  "Veel beter. Nog een paar stappen voorzichtig, daarna lukt het.",
  "Fijn om te horen. Hoe gaat het met de zolen en de oefeningen?",
  "De zolen zitten goed in mijn nieuwe werkschoenen. De oefeningen doe ik meestal, behalve na een nachtdienst.",
  "Is er iets dat nog niet lukt?",
  "Blootsvoets in huis, dan voel ik het meteen. En ik durf nog niet langer dan 20 minuten te lopen.",
  "Heeft u een plotse scherpe pijn gehad, zwelling, of tintelingen in uw voet?",
  "Nee, niets van dat.",
];

export const FOLLOW_SCORES = [
  ["NRS eerste stappen (0 tot 10, lager = beter)", "7", "4"],
  ["NRS na een dienst (0 tot 10, lager = beter)", "6", "3"],
  ["FFI (0 tot 100%, lager = beter)", "48%", "30%"],
  ["Slaap", "Goed", "Goed"],
  ["Werk", "Volledig, met pijn na de dienst", "Volledig, minder pijn"],
  ["Lopen", "Gestopt", "2× 20 minuten per week"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Steunzolen + oefeningen (Sara)", "Week 2", "Gewenning steunzolen", "Past de zool in de schoen, drukplekken, blaren, draagtijd per dag"],
  ["Steunzolen + oefeningen (Sara)", "Week 6", "Opvolging hielpijn", "NRS eerste stappen en na een dienst, FFI, oefeningen gedaan, werk, lopen, open vragen, rode vlaggen"],
  ["Steunzolen + oefeningen (Sara)", "Maand 3 en 6", "Opvolging hielpijn + welzijn", "Idem, aangevuld met EQ-5D-5L en PREM"],
  ["Oefeningen + schoenadvies", "Week 4 en maand 3", "Opvolging oefentherapie", "NRS, FFI, hoe vaak de oefeningen lukten, schoenen"],
  ["Nagelingreep", "Dag 2", "Wondcontrole", "Roodheid, pus, koorts, pijn, bloeding (bij bloedverdunners)"],
  ["Nagelingreep", "Week 3", "Genezing", "Wonde gesloten, kan de schoen weer aan, terug aan het werk"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de podoloog kiest. Komen er later shockwavesessies via de huisarts bij, dan blijft de opvolging lopen.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat de rode vlaggen opnieuw na. Bij diabetes: elke keer de vraag naar een nieuwe wonde of verkleuring.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen of gebruikt u zalven? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De Euthyrox was ik vergeten, dat is voor mijn schildklier. De ibuprofen neem ik nu bijna elke dag.",
  "confirmed": "Bevestigd door patiënte",
  "followUps": [
    {
      "question": "Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    },
    {
      "question": "Bent u allergisch voor een geneesmiddel, pleister of tape?",
      "answer": "Van gewone kleefpleisters krijg ik jeuk en rode plekken."
    }
  ],
  "schedule": {
    "header": "Apotheek Sint-Anna · Medicatieschema · S. Calcaneus, ° 09-02-1980",
    "rows": [
      [
        "Euthyrox 75 microgram tabletten",
        "1 tablet 's ochtends nuchter, 30 minuten voor het ontbijt"
      ],
      [
        "Ibuprofen Sandoz 400 mg filmomhulde tabletten",
        "1 tablet bij pijn, max. 3× per dag, bij de maaltijd"
      ],
      [
        "Cetirizine EG 10 mg filmomhulde tabletten",
        "1 tablet per dag, april tot juli"
      ],
      [
        "Voltaren Emulgel 1% gel",
        "Dun aanbrengen op de hiel, 2 tot 3× per dag"
      ]
    ]
  },
  "meds": [
    {
      "name": "Euthyrox",
      "substance": "Levothyroxine",
      "strength": "75 µg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends nuchter",
      "indication": "Hypothyreoïdie",
      "source": "Foto in chat",
      "chatLabel": "Euthyrox 75 µg · 's ochtends nuchter"
    },
    {
      "name": "Ibuprofen Sandoz",
      "substance": "Ibuprofen",
      "strength": "400 mg",
      "form": "Tablet",
      "frequency": "Bij pijn, max. 3× per dag (nu bijna dagelijks)",
      "indication": "Pijn (NSAID)",
      "source": "Foto in chat",
      "chatLabel": "Ibuprofen 400 mg · bij pijn, max. 3× per dag"
    },
    {
      "name": "Cetirizine EG",
      "substance": "Cetirizine",
      "strength": "10 mg",
      "form": "Tablet",
      "frequency": "1× per dag, april tot juli",
      "indication": "Hooikoorts",
      "source": "Foto in chat",
      "chatLabel": "Cetirizine 10 mg · 1× per dag, april tot juli"
    },
    {
      "name": "Voltaren Emulgel",
      "substance": "Diclofenac",
      "strength": "1%",
      "form": "Gel",
      "frequency": "2 tot 3× per dag op de hiel",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Voltaren Emulgel · 2 à 3× per dag op de hiel"
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Allergieën",
      "value": "Kleefpleister: hypoallergene tape gebruiken (chat)",
      "tone": "warn"
    },
    {
      "label": "Bevestigd door patiënte",
      "value": "Ja"
    }
  ]
} satisfies Partial<MedicationCopy>;
