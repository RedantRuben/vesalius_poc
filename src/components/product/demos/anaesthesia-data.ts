import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {"name": "C. Oronaria", "initials": "CO", "channel": "chat", "summary": "Liesbreuk gepland. Sinds twee weken drukkend gevoel op de borst bij de trap", "referral": "Vandaag contact", "tasks": 1},
  {"name": "F. Larynx", "initials": "FL", "channel": "chat", "summary": "Knieprothese. Diabetes met wekelijkse injectie, snurken met ademstops, trappen beperkt door de knie", "referral": "Raadpleging", "tasks": 0},
  {"name": "E. Pidura", "initials": "EP", "channel": "chat", "summary": "Kniearthroscopie. Geen aandachtspunten gemeld", "referral": "Op dossier", "tasks": 0},
  {"name": "M. Vagus", "initials": "MV", "channel": "chat", "summary": "Galblaas. Vorige keer erg misselijk na narcose (aandachtspunt)", "referral": "Raadpleging", "tasks": 0, "attention": true},
  {"name": "T. Rachea", "initials": "TR", "channel": "telefoon", "summary": "Schildklier. Vragen over haar medicatie", "referral": "Telefonisch", "tasks": 0},
  {"name": "A. Orta", "initials": "AO", "channel": "chat", "summary": "Vraag over afspraak", "referral": "", "tasks": 0, "status": "IN_PROGRESS" as const},
];

export const TRIAGE_ALERT = "Sinds twee weken een drukkend gevoel op de borst bij de trap, ingreep over drie weken. Secretariaat neemt vandaag contact op. De anesthesist beslist over de verdere stappen.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1.3333333333333333, "time": "09:00", "name": "F. Larynx", "initials": "FL", "reason": "Pre-op · knieprothese · 3 aandachtspunten"},
  {"room": 1, "slot": 1.3333333333333333, "length": 1, "time": "09:40", "name": "M. Vagus", "initials": "MV", "reason": "Pre-op · galblaas · misselijkheid na vorige narcose"},
  {"room": 2, "slot": 0, "length": 1, "time": "09:00", "name": "C. Oronaria", "initials": "CO", "reason": "Dringend · nieuwe klachten bij inspanning, liesbreuk gepland"},
  {"room": 2, "slot": 1, "length": 1, "time": "09:30", "name": "A. Orta", "initials": "AO", "reason": "Pre-op · vaatchirurgie"},
  {"room": 3, "slot": 0, "length": 0.6666666666666666, "time": "09:00", "name": "T. Rachea", "initials": "TR", "reason": "Telefonische pre-op · schildklier"},
  {"room": 3, "slot": 0.6666666666666666, "length": 1, "time": "09:20", "name": "D. Ura", "initials": "DU", "reason": "Terugbelafspraak na ruggenprik"},
];

export const INTAKE_CHAT = [
  "Kunt u twee trappen op zonder te stoppen?",
  "Traag. Halverwege stop ik even.",
  "Stopt u omdat u buiten adem bent, of door iets anders?",
  "Iets anders: mijn knie. Van adem gaat het nog.",
  "Dank u. Snurkt u, en heeft iemand al gezien dat u soms stopt met ademen als u slaapt?",
];

export const INTAKE_ATTENTION = [
  ["Slaap", "Snurkt luid, zijn vrouw ziet ademstops, valt overdag in slaap voor de tv"],
  ["Medicatie", "Diabetesmedicatie, waaronder een wekelijkse injectie (zondag)"],
  ["Vorige narcose", "2015: \"lang suf\", niet misselijk"],
  ["Allergie", "Pleisters: rode, jeukende huid"],
  ["Gebit", "Uitneembare bovenprothese"],
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Pre-op · Frans Larynx",
    sections: [
      ["Ingreep", [
        ["Gepland", "Totale knieprothese links, 2 december, dr. Claes (orthopedie)"],
      ]],
      ["Eerdere anesthesie", [
        ["Operaties", "Appendectomie (1975). Liesbreuk rechts (2015), algemene narcose"],
        ["Verloop", "2015: lang suf na het wakker worden. Niet misselijk. Geen problemen met intubatie gemeld"],
        ["Familie", "Geen problemen bij narcose gekend"],
      ]],
      ["Hart en bloedvaten", [
        ["Klachten", "Geen pijn op de borst, geen hartkloppingen, nooit flauwgevallen, geen dikke enkels"],
        ["Voorgeschiedenis", "Hoge bloeddruk sinds 12 jaar"],
      ]],
      ["Inspanning", [
        ["Trappen", "Twee trappen lukt traag, stopt halverwege door de knie, niet door de adem"],
        ["Wandelen", "15 minuten met de hond, licht kortademig bij snel stappen"],
      ]],
      ["Longen", [
        ["Klachten", "Geen astma of COPD, geen recente verkoudheid"],
      ]],
      ["Slaap", [
        ["Snurken", "Luid, ademstops gezien door zijn vrouw, overdag slaperig"],
      ]],
      ["Andere", [
        ["Diabetes", "Type 2 sinds 2017, laatste HbA1c \"rond de 7\""],
        ["Maag", "Soms zuurbranden 's avonds"],
      ]],
      ["Allergieën", [
        ["Allergieën", "Pleisters (huidirritatie). Geen geneesmiddelen, geen latex"],
      ]],
      ["Gebit", [
        ["Gebit", "Uitneembare bovenprothese"],
      ]],
      ["Medicatie", [
        ["Medicatie", "7 geneesmiddelen, via foto in de chat (zie Medicatiebeheer)"],
        ["Bloedverdunners", "Nee"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Ex-roker sinds 2010 / 1 pint per dag"],
        ["Thuis", "Woont met zijn vrouw, rijwoning met trap. Zij brengt hem en haalt hem op"],
      ]],
      ["Algemeen", [
        ["Lengte / gewicht", "1,74 m / 104 kg"],
        ["Leeftijd", "68 jaar"],
      ]],
      ["Vragen", [
        ["Vraag aan de anesthesist", "\"De vorige keer was ik lang suf. Moet ik weer helemaal onder zeil?\""],
      ]],
      ["Baseline", [
        ["QoR-15", "122 (0 tot 150, hoger = beter)"],
      ]],
    ],
  },
  {
    title: "Kleine ingreep · E. Pidura",
    sections: [
      ["Ingreep", [
        ["Gepland", "Kniearthroscopie rechts, dagchirurgie"],
      ]],
      ["Aandachtspunten", [["Gemeld", "Geen"]]],
      ["Eerdere anesthesie", [
        ["Verloop", "Verstandskiezen onder narcose (2014), geen problemen"],
      ]],
      ["Medicatie", [
        ["Medicatie", "Geen"],
      ]],
      ["Algemeen", [
        ["Leeftijd / beroep", "32 jaar / leerkracht"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Goeiedag, ik krijg in december een nieuwe knie en ik moet eerst nog langs de anesthesie.",
  "Dat regel ik graag voor u. Heeft u de laatste weken pijn op de borst gehad, of bent u kortademiger geworden?",
  "Nee, dat niet. Alleen mijn knie.",
  "Neemt u bloedverdunners?",
  "Nee. Wel pillen voor de suiker en de bloeddruk.",
  "Dank u. Ik plan u in op de pre-op raadpleging en stuur u een vragenlijst. U mag daarin ook een foto van uw medicatieschema sturen.",
];

export const VOICE_TASK = "Ingepland op de pre-op raadpleging: knieprothese 2 december, geen nieuwe klachten van hart of adem, vragenlijst verstuurd";

export const SCRIBE_CHAT = [
  "U schreef dat u de vorige keer lang suf was. Daarom stel ik voor om met een ruggenprik te werken, met iets om te slapen erbij.",
  "Dus ik moet niet helemaal onder zeil?",
  "Nee. Doet u uw mond eens wijd open en steek uw tong uit. Uw bovenprothese mag u op de dag zelf uitdoen.",
  "Dat is goed. En mijn spuitje van zondag?",
  "Dat schrijf ik op uw blad, samen met uw andere medicatie.",
];

export const SCRIBE_NOTE = [
  ["Geplande ingreep", "Totale knieprothese links, 2 december, dr. Claes."],
  ["Voorgeschiedenis", "Diabetes type 2, arteriële hypertensie, hypercholesterolemie. Ex-roker. Geen cardiale voorgeschiedenis."],
  ["Eerdere anesthesie", "Algemene narcose 2015 (liesbreuk): traag wakker, niet misselijk. Geen problemen met de luchtweg gemeld."],
  ["Medicatie", "Metformine, empagliflozine, semaglutide wekelijks, lisinopril, amlodipine, atorvastatine, paracetamol bij pijn. Geen bloedverdunners."],
  ["Functionele capaciteit", "Twee trappen traag, beperkt door de knie, niet door kortademigheid."],
  ["Klinisch onderzoek", "Bloeddruk 146/84 mmHg, pols 72/min regelmatig, saturatie 96%. Normale cardiopulmonale auscultatie, geen oedeem. Luchtweg: mondopening ruim, Mallampati II, nek vrij beweeglijk, uitneembare bovenprothese. Halsomtrek 44 cm."],
  ["Aanvullende onderzoeken", "ECG: sinusritme zonder afwijkingen. Labo: HbA1c 7,4%, nierfunctie en hemoglobine normaal."],
  ["Beoordeling", "Geschikt voor de geplande ingreep. Snurken met geziene ademstops: aandachtspunt rond de ingreep."],
  ["Plan", "Spinale verdoving met lichte sedatie, patiënt akkoord. Medicatie-afspraken rond de ingreep besproken en meegegeven, ook voor de wekelijkse injectie. Nuchterinstructies meegegeven. Dag van de ingreep: pleisterallergie, bovenprothese, snurken. Na de ingreep: slaaponderzoek via de huisarts. Vangnet: contact bij koorts, verkoudheid of nieuwe klachten van hart of adem vóór de ingreep."],
];

export const DOCUMENTS = [
  ["Pre-op verslag", "Sjabloon Pre-op anesthesie, voor het dossier en de chirurg", "Gegenereerd"],
  ["Brief aan de huisarts", "Bevindingen, beoordeling en vraag naar opvolging na de ingreep", "Gegenereerd"],
  ["Instructies voor de patiënt", "Nuchter blijven, medicatie zoals besproken, wat meebrengen", "Gegenereerd"],
  ["Aanvraag slaaponderzoek", "Via de huisarts, na de ingreep", "Nog niet gegenereerd"],
];

export const PATIENT_INSTRUCTIONS = [
  ["Uw ingreep", "Nieuwe knie links, op 2 december. Kom naar het onthaal op het uur dat het ziekenhuis u laat weten."],
  ["Nuchter blijven", "Vanaf het uur dat de anesthesist met u afsprak, niets meer eten."],
  ["Uw medicatie", "Welke medicatie u doorneemt en welke u tijdelijk stopt, ook uw spuitje van zondag, zoals besproken met de anesthesist."],
  ["Meebrengen", "Uw medicatieschema, een pyjama en pantoffels. Uw bovenprothese mag u op de dag zelf uitdoen."],
  ["Laat het ons weten", "Bij koorts, een verkoudheid of nieuwe klachten van hart of adem vóór de ingreep."],
];

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Frans Larynx, geboren op 9 februari 1958, die ik recent op de pre-operatieve raadpleging zag.",
  "REDEN VOOR CONTACT Pre-operatieve beoordeling voor een totale knieprothese links, gepland op 2 december door dr. Claes.",
  "ANAMNESE Gekend met diabetes type 2, arteriële hypertensie en hypercholesterolemie. Ex-roker. Geen cardiale voorgeschiedenis, geen pijn op de borst, geen kortademigheid in rust. Twee trappen lukt, beperkt door de knie. Snurkt luid met ademstops gezien door zijn echtgenote, overdag slaperig. Vorige narcose in 2015 zonder problemen, wel traag wakker. Neemt metformine, empagliflozine, wekelijks semaglutide, lisinopril, amlodipine, atorvastatine en paracetamol bij pijn. Geen bloedverdunners. Huidreactie op pleisters.",
  "KLINISCH ONDERZOEK Bloeddruk 146/84 mmHg, pols 72 per minuut, regelmatig. Normale cardiopulmonale auscultatie, geen oedeem. Luchtweg zonder bijzonderheden, uitneembare bovenprothese.",
  "AANVULLENDE ONDERZOEKEN ECG: sinusritme zonder afwijkingen. Labo: HbA1c 7,4%, nierfunctie en hemoglobine normaal.",
  "DIAGNOSE Geschikt voor de geplande ingreep. Snurken met geziene ademstops en slaperigheid overdag, nog niet onderzocht.",
  "BELEID De ingreep gebeurt onder spinale verdoving met lichte sedatie. Frans kreeg schriftelijke afspraken mee over zijn medicatie rond de ingreep en over nuchter blijven. Graag verdere evaluatie van zijn slaap na de ingreep, met een slaaponderzoek. Hij weet dat hij contact opneemt bij koorts, een verkoudheid of nieuwe klachten van hart of adem vóór de ingreep.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, anesthesist",
];

export const FOLLOW_ROWS = [
  ["D. Ura", "Spinale verdoving · dag 1"],
  ["F. Larynx", "Knieprothese, spinale verdoving · week 2 · QoR-15 ingevuld"],
  ["M. Vagus", "Galblaas, algemene anesthesie · dag 1 · niet misselijk"],
  ["E. Pidura", "Kniearthroscopie, dagchirurgie · dag -1 · herinnering nuchter verstuurd"],
];

export const FOLLOW_ALERT = "Meldt hoofdpijn die erger wordt bij rechtop zitten en beter bij liggen, de dag na de ruggenprik. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het sinds uw operatie?",
  "Goed. Ik wandel al een rondje in de straat met één kruk.",
  "Fijn om te horen. Hoe heeft u de verdoving beleefd?",
  "De ruggenprik viel beter mee dan gedacht. Ik was deze keer meteen helder. Alleen de eerste nacht had ik veel pijn aan mijn knie.",
  "Heeft u koorts gehad, of bent u kortademig geweest?",
  "Nee, niets van dat.",
];

export const FOLLOW_SCORES = [
  ["QoR-15 (0 tot 150, hoger = beter)", "122", "104", "128"],
  ["NRS pijn knie (0 tot 10, lager = beter)", "6", "5", "3"],
  ["Misselijkheid", "n.v.t.", "Nee", "Nee"],
  ["Slaap", "Snurken, moe overdag", "Onrustig door de knie", "Beter, slaaponderzoek aangevraagd"],
  ["Wandelen", "15 minuten, met pijn", "Met krukken, in huis", "Met één kruk, rondje in de straat"],
  ["Ervaring (PREM)", "n.v.t.", "n.v.t.", "Instructies duidelijk, angst besproken, wachttijd op de dag zelf lang"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Alle ingrepen", "Dag -7", "Herinnering en check", "Afspraken van de anesthesist herhaald, vervoer geregeld, nog vragen, rode vlaggen"],
  ["Alle ingrepen", "Dag -1", "Herinnering nuchter", "Aankomstuur, nuchter zoals afgesproken, koorts of ziek?"],
  ["Algemene anesthesie, dagchirurgie", "Dag 1", "Controle na dagchirurgie", "Pijn (NRS), misselijkheid, plassen, keelpijn, slaap, QoR-15"],
  ["Spinale verdoving of zenuwblok", "Dag 1", "Controle na locoregionale anesthesie", "Gevoel en kracht terug, hoofdpijn bij rechtop zitten, pijn op de prikplaats"],
  ["Opname (Frans)", "Dag 1 na ontslag", "Herstel thuis", "QoR-15, pijn (NRS), misselijkheid, slaap, verwardheid, open vragen"],
  ["Alle ingrepen", "Week 2", "Ervaring", "PREM: informatie vooraf, angst, comfort bij wakker worden, pijnstilling, open vragen"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de anesthesietechniek en het type opname die de anesthesist kiest.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 7 geneesmiddelen gevonden:",
  "confirm": "Ja. Die Ozempic was ik vergeten, dat is een spuitje, geen pil.",
  "followUp": {
    "question": "Genoteerd, de anesthesist ziet het bovenaan uw dossier. Neemt u bloedverdunners, zoals Marevan, Xarelto, Eliquis of Asaflow?",
    "choices": [
      "Ja",
      "Nee"
    ],
    "answer": "Nee"
  },
  "schedule": {
    "header": "Apotheek Het Anker · Medicatieschema · F. Larynx, ° 09-02-1958",
    "rows": [
      [
        "Metformax 850 mg tabletten",
        "1 tablet 's ochtends en 's avonds, bij de maaltijd"
      ],
      [
        "Jardiance 10 mg filmomhulde tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Ozempic 1 mg oplossing voor injectie in voorgevulde pen",
        "1 injectie per week, op zondag"
      ],
      [
        "Lisinopril Sandoz 20 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Amlodipine EG 5 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Atorvastatine EG 40 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ],
      [
        "Dafalgan Forte 1 g tabletten",
        "1 tablet bij pijn, max. 3× per dag"
      ]
    ]
  },
  "meds": [
    {
      "name": "Metformax",
      "substance": "Metformine",
      "strength": "850 mg",
      "form": "Tablet",
      "frequency": "2× per dag, bij de maaltijd",
      "indication": "Diabetes",
      "source": "Foto in chat",
      "chatLabel": "Metformax 850 mg · 2× per dag"
    },
    {
      "name": "Jardiance",
      "substance": "Empagliflozine",
      "strength": "10 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Diabetes",
      "source": "Foto in chat",
      "chatLabel": "Jardiance 10 mg · ’s ochtends"
    },
    {
      "name": "Ozempic",
      "substance": "Semaglutide",
      "strength": "1 mg",
      "form": "Injectiepen",
      "frequency": "1× per week, zondag",
      "indication": "Diabetes",
      "source": "Foto in chat",
      "chatLabel": "Ozempic 1 mg · 1 injectie per week op zondag",
      "tag": {
        "label": "Door patiënt niet vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "Lisinopril Sandoz",
      "substance": "Lisinopril",
      "strength": "20 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Bloeddruk",
      "source": "Foto in chat",
      "chatLabel": "Lisinopril 20 mg · ’s ochtends"
    },
    {
      "name": "Amlodipine EG",
      "substance": "Amlodipine",
      "strength": "5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Bloeddruk",
      "source": "Foto in chat",
      "chatLabel": "Amlodipine 5 mg · ’s ochtends"
    },
    {
      "name": "Atorvastatine EG",
      "substance": "Atorvastatine",
      "strength": "40 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Cholesterol",
      "source": "Foto in chat",
      "chatLabel": "Atorvastatine 40 mg · ’s avonds"
    },
    {
      "name": "Dafalgan Forte",
      "substance": "Paracetamol",
      "strength": "1 g",
      "form": "Tablet",
      "frequency": "Bij pijn, max. 3× per dag",
      "indication": "Pijn (knie)",
      "source": "Foto in chat",
      "chatLabel": "Dafalgan Forte 1 g · bij pijn"
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Diabetesmedicatie",
      "value": "3, waarvan 1 wekelijkse injectie (gemarkeerd voor de anesthesist)",
      "tone": "warn"
    },
    {
      "label": "Allergieën",
      "value": "Pleisters (huidirritatie)"
    },
    {
      "label": "Bevestigd door patiënt",
      "value": "Ja"
    }
  ]
} satisfies Partial<MedicationCopy>;
