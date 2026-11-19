import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "G. Temporalis",
    "initials": "GT",
    "channel": "telefoon",
    "summary": "74 jaar, nieuwe hoofdpijn aan de slaap, pijn bij kauwen, sinds gisteren wazig zien rechts",
    "referral": "Vandaag gezien",
    "tasks": 1
  },
  {
    "name": "L. Carpus",
    "initials": "LC",
    "channel": "chat",
    "summary": "Gezwollen knokkels aan beide handen, 90 minuten ochtendstijfheid, anti-CCP positief",
    "referral": "Artritis",
    "tasks": 0,
    "moment": "Voorrang"
  },
  {
    "name": "F. Myalgia",
    "initials": "FM",
    "channel": "chat",
    "summary": "Pijn overal, moe, geen zwelling, bloedname normaal",
    "referral": "Fysische geneeskunde",
    "tasks": 0
  },
  {
    "name": "S. Iliaca",
    "initials": "SI",
    "channel": "telefoon",
    "summary": "Lage rugpijn sinds 2 jaar, 's nachts erger, beter door bewegen",
    "referral": "Spondyloartritis",
    "tasks": 0
  },
  {
    "name": "T. Hallux",
    "initials": "TH",
    "channel": "chat",
    "summary": "Gekende jicht, opstoot grote teen, geen koorts",
    "referral": "Voorrang",
    "tasks": 0
  }
];

export const TRIAGE_ALERT = "Nieuwe hoofdpijn met wazig zien en pijn bij kauwen, 74 jaar. Secretariaat neemt meteen contact op: vandaag nog gezien.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "R. Synovia",
    "initials": "RS",
    "reason": "Controle reumatoïde artritis onder biological"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "G. Temporalis",
    "initials": "GT",
    "reason": "Dringend · hoofdpijn en wazig zien, vermoeden reuscelarteritis"
  },
  {
    "room": 1,
    "slot": 2,
    "length": 1,
    "name": "T. Hallux",
    "initials": "TH",
    "reason": "Jichtopstoot grote teen"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "L. Carpus",
    "initials": "LC",
    "reason": "Nieuwe patiënte · vroege artritis"
  },
  {
    "room": 3,
    "slot": 1,
    "length": 1,
    "name": "A. Genu",
    "initials": "AG",
    "reason": "Echogeleide infiltratie knie"
  },
  {
    "room": 3,
    "slot": 3,
    "length": 1,
    "name": "O. Trabecula",
    "initials": "OT",
    "reason": "Osteoporose, bespreking DEXA"
  }
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Sinds drie maanden pijnlijke en gezwollen vingers aan beide handen. 's Ochtends ben ik heel stijf.",
  "Hoe lang duurt het 's ochtends voor uw handen weer soepel zijn?",
  "Ongeveer anderhalf uur. Pas na het ontbijt kan ik een vuist maken.",
  "Duid op het schema aan welke gewrichten gezwollen of pijnlijk zijn."
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Artritis",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Pijnlijke, gezwollen vingers aan beide handen en de rechterpols. Verhoogde CRP en positieve anti-CCP volgens de huisarts."],
        ["Duur", "Drie maanden, geleidelijk erger"],
      ]],
      ["Gewrichten", [
        ["Zelf aangeduid", "Knokkels wijs- en middelvinger beide handen, middelste kootje middelvinger rechts, rechterpols, voetzolen bij de tenen"],
        ["Patroon", "Beide kanten, zichtbare zwelling"],
      ]],
      ["Ontstekingsbeeld", [
        ["Ochtendstijfheid", "± 90 minuten"],
        ["Beter bij", "Bewegen, warm water, Apranax (deels)"],
        ["Erger bij", "Rust, 's ochtends, lang typen. 's Nachts wakker van de handen"],
      ]],
      ["Aard van de pijn", [
        ["Pijn / vermoeidheid", "6/10 / 7/10"],
      ]],
      ["Functie", [
        ["Dagelijks leven", "Potten openen, knoopjes, sleutel omdraaien lukt moeilijk"],
      ]],
      ["Extra-articulair", [
        ["Huid, darm, ogen", "Geen psoriasis, geen darmklachten, geen oogontsteking, geen huiduitslag bij zon, geen Raynaud"],
      ]],
      ["Rode vlaggen", [
        ["Koorts", "Nee"],
        ["Gewichtsverlies", "2 kg zonder dieet"],
      ]],
      ["Onderzoeken elders", [
        ["Labo huisarts, 3 weken geleden", "CRP 18 mg/L, BSE 32 mm/u, RF 45 IE/mL, anti-CCP > 200 U/mL"],
        ["Beeldvorming", "Geen"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Apranax 550 mg 2× per dag sinds 6 weken, helpt deels. Dafalgan bij nood."],
        ["Voorgeschiedenis", "Twee bevallingen, geen operaties"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Tante reumatoïde artritis, moeder trage schildklier"],
        ["Anticonceptie / kinderwens", "Pil / geen kinderwens"],
        ["Infecties en vaccinaties", "Geen hepatitis of tbc gekend, griepvaccin vorig jaar"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Rookte tot 38 jaar / 1 à 2 glazen per week"],
      ]],
      ["Algemeen", [
        ["Beroep", "Boekhouder bij een sociaal secretariaat, veel typen en muiswerk"],
        ["Sport en hobby", "Padel 1× per week, piano. Beide gestopt."],
        ["Handdominantie", "Rechts"],
        ["Lengte / gewicht", "1,68 m / 64 kg"],
        ["Leeftijd", "46 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["RAPID3 / HAQ-DI", "17,3 / 1,25"],
      ]],
    ],
  },
  {
    title: "Spondyloartritis",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Lage rugpijn sinds 2 jaar, 's nachts erger, wordt wakker in de tweede helft van de nacht"],
      ]],
      ["Ontstekingsbeeld", [
        ["Beter bij / erger bij", "Bewegen / rust"],
        ["Ochtendstijfheid", "± 45 minuten"],
      ]],
      ["Extra-articulair", [
        ["Ogen", "Eén keer een pijnlijk rood oog, behandeld door de oogarts"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Kinesitherapie, ibuprofen helpt goed"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Verpleegkundige / 27 jaar"],
      ]],
    ],
  },
  {
    title: "Jicht",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Rode, gezwollen grote teen rechts sinds gisteren, kan geen schoen aan"],
      ]],
      ["Rode vlaggen", [
        ["Koorts", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerder", "Jicht gekend, laatste opstoot vorig jaar. Allopurinol gestopt"],
      ]],
      ["Onderzoeken elders", [
        ["Labo", "Urinezuur 8,4 mg/dl (huisarts, 2025)"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Vrachtwagenchauffeur / 58 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts vond iets in mijn bloed en denkt aan reuma. Kan ik een afspraak krijgen bij de reumatoloog?",
  "Vervelend om te horen. Zijn uw gewrichten gezwollen, of alleen pijnlijk? En hoe lang bent u 's ochtends stijf?",
  "Mijn knokkels zijn dik, aan beide handen. 's Ochtends ben ik anderhalf uur stijf.",
  "Heeft u koorts, of is één gewricht plots rood en warm geworden?",
  "Nee, dat niet.",
  "Dank u. Ik plan u met voorrang in bij de artritisraadpleging en stuur u een korte vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak met voorrang ingepland in de artritisraadpleging: gezwollen gewrichten aan beide handen, lange ochtendstijfheid, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Ik knijp even zachtjes in uw hand, ter hoogte van de knokkels. Doet dat pijn?",
  "Ja, aan beide kanten. Vooral aan mijn wijs- en middelvinger.",
  "Probeer eens een vuist te maken.",
  "Verder lukt niet, rechts voelt het stijf en dik."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Pijn en zwelling van MCP2 en MCP3 beiderzijds en de rechterpols sinds drie maanden, ochtendstijfheid ± 90 minuten. Verwezen door dr. Claes wegens verhoogde CRP en positieve anti-CCP. 's Nachts wakker van de handen, vermoeidheid 7/10, 2 kg gewichtsverlies, geen koorts. Apranax helpt deels. Geen psoriasis, darmklachten, uveïtis, fotosensibiliteit of Raynaud. Ex-roker. Tante met RA. Neemt Yasmin. Geen bloedverdunners, geen allergieën."
  ],
  [
    "Klinisch onderzoek",
    "Synovitis MCP2 en MCP3 beiderzijds, PIP3 rechts en rechterpols. 6 gezwollen en 8 drukpijnlijke gewrichten (28-gewrichtentelling). Squeeze test MCP en MTP beiderzijds positief. Onvolledige vuistsluiting rechts. Geen reumanoduli, geen Heberden- of Bouchard-knobbels, geen psoriasis. Tinel en Phalen negatief."
  ],
  [
    "Labo",
    "CRP 18 mg/L, BSE 32 mm/u, RF 45 IE/mL, anti-CCP > 200 U/mL. Nier- en leverfunctie en bloedbeeld normaal."
  ],
  [
    "Medische beeldvorming",
    "Echo handen en polsen: synovitis graad 2 met power Doppler in MCP2 en MCP3 beiderzijds en de rechterpols, tenosynovitis ECU rechts, geen erosies. RX handen en voeten: geen erosies."
  ],
  [
    "Ziekteactiviteit",
    "DAS28-CRP 4,9 (matig). ACR/EULAR 2010: 8/10."
  ],
  [
    "Diagnose",
    "Vroege seropositieve reumatoïde artritis, matige ziekteactiviteit, zonder erosies."
  ],
  [
    "Beleid",
    "Start methotrexaat 15 mg 1× per week (vrijdag), na 4 weken 20 mg. Foliumzuur 5 mg 1× per week (zaterdag). Overbrugging Medrol 16 mg, afbouw over 8 weken. Apranax stoppen, Dafalgan bij nood. Vóór start: serologie hepatitis B en C, RX thorax. Griep- en pneumokokkenvaccin aanbevolen. Anticonceptie loopt verder. Bloedname na 2, 4, 8 en 12 weken, nadien om de 3 maanden. Ergotherapie. Herevaluatie week 12 met DAS28, doel remissie. Vangnet: meteen contact bij koorts, keelpijn, mondaften, droge hoest of kortademigheid. Opvolging met RAPID3, HAQ-DI en ochtendstijfheid."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Reumatologie, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift methotrexaat en foliumzuur",
    "Weekschema met vaste innamedag",
    "Gegenereerd"
  ],
  [
    "Afbouwschema Medrol",
    "16 mg, afbouw over 8 weken",
    "Gegenereerd"
  ],
  [
    "Labo-aanvraag met monitoringschema",
    "Bloedbeeld, lever- en nierfunctie na 2, 4, 8 en 12 weken",
    "Nog niet gegenereerd"
  ],
  [
    "Uitleg voor de patiënte",
    "Methotrexaat, foliumzuur en wanneer meteen bellen",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Carpus voor pijnlijke, gezwollen vingers aan beide handen sinds drie maanden. Klinisch en echografisch is er synovitis van zes gewrichten, met een sterk positieve anti-CCP. We starten methotrexaat en herevalueren op week 12, met remissie als doel.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënte Lies Carpus, geboren op 14 maart 1980, die ik recent op consultatie zag.",
  "REDEN VOOR CONTACT Verwezen wegens pijnlijke, gezwollen vingers aan beide handen sinds drie maanden, met een verhoogde CRP en een sterk positieve anti-CCP.",
  "ANAMNESE Sinds drie maanden pijn en zwelling van de knokkels van wijs- en middelvinger aan beide handen en van de rechterpols, met ochtendstijfheid van ongeveer anderhalf uur. 's Nachts wakker van de handen. Uitgesproken vermoeidheid en 2 kg gewichtsverlies, geen koorts. Potten openen en knoopjes lukken moeilijk; padel en piano heeft ze gestaakt. Apranax helpt deels. Geen psoriasis, darmklachten, oogontsteking, huiduitslag of Raynaud. Rookte tot haar 38ste. Tante met reumatoïde artritis. Neemt daarnaast Yasmin als anticonceptie en maandelijks D-Cure. Geen bloedverdunners, geen allergieën.",
  "KLINISCH ONDERZOEK Synovitis van MCP2 en MCP3 beiderzijds, PIP3 rechts en de rechterpols: 6 gezwollen en 8 drukpijnlijke gewrichten. Squeeze test van MCP en MTP beiderzijds positief. Onvolledige vuistsluiting rechts. Geen reumanoduli, geen tekenen van artrose of psoriasis.",
  "AANVULLENDE ONDERZOEKEN Labo: CRP 18 mg/L, BSE 32 mm/u, RF 45 IE/mL, anti-CCP > 200 U/mL, nier- en leverfunctie normaal. Echografie: synovitis met power-Doppler-signaal in MCP2 en MCP3 beiderzijds en de rechterpols, tenosynovitis ECU rechts, geen erosies. RX handen en voeten: geen erosies. DAS28-CRP 4,9.",
  "DIAGNOSE Vroege seropositieve reumatoïde artritis, matige ziekteactiviteit, zonder erosies.",
  "BELEID We starten methotrexaat 15 mg eenmaal per week op vrijdag, met foliumzuur 5 mg op zaterdag, en verhogen na vier weken naar 20 mg. Ter overbrugging krijgt ze Medrol 16 mg, af te bouwen over acht weken; Apranax mag stoppen. Vóór de start vragen we een serologie voor hepatitis B en C en een RX thorax. Griep- en pneumokokkenvaccinatie zijn aanbevolen. Haar anticonceptie loopt verder; bij een kinderwens overleggen we eerst. Graag een bloedname (bloedbeeld, lever- en nierfunctie) na 2, 4, 8 en 12 weken, nadien om de drie maanden; het aanvraagformulier heeft ze meegekregen. Ze start ergotherapie voor gewrichtsbescherming. Herevaluatie op week 12, met als doel remissie. Ze weet dat ze meteen contact moet opnemen bij koorts, keelpijn, mondaften, droge hoest of kortademigheid.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, reumatoloog"
];

export const FOLLOW_ROWS = [
  [
    "E. Olecranon",
    "Methotrexaat · week 8"
  ],
  [
    "L. Carpus",
    "Methotrexaat · week 12 · RAPID3 ingevuld"
  ],
  [
    "A. Genu",
    "Infiltratie knie · week 3"
  ],
  [
    "T. Hallux",
    "Jicht · maand 3"
  ]
];

export const FOLLOW_ALERT = "Meldt koorts (38,6 °C), keelpijn en mondaften, acht weken na de start van methotrexaat. Bloedname vandaag nodig. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw handen sinds de start van de behandeling?",
  "Veel beter. 's Ochtends ben ik na een kwartiertje soepel, en ik slaap weer door.",
  "Fijn om te horen. Is er iets dat nog niet lukt?",
  "Piano spelen gaat nog stroef. En de dag na mijn methotrexaat ben ik wat misselijk.",
  "Dank u, dat geef ik door aan de arts. Had u de voorbije weken koorts, keelpijn, mondaften of een droge hoest?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "RAPID3 (0 tot 30, lager = beter)",
    "17,3",
    "6,3"
  ],
  [
    "HAQ-DI (0 tot 3, lager = beter)",
    "1,25",
    "0,50"
  ],
  [
    "Ochtendstijfheid (minuten, korter = beter)",
    "90",
    "15"
  ],
  [
    "NRS vermoeidheid (0 tot 10, lager = beter)",
    "7",
    "4"
  ],
  [
    "Slaap",
    "Wakker van de handen",
    "Slaapt door"
  ],
  [
    "Werk",
    "Typen en muis pijnlijk",
    "Volledig, met korte pauzes"
  ],
  [
    "Hobby",
    "Geen padel, geen piano",
    "Padel opnieuw, piano stroef"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Methotrexaat (Lies)",
    "Week 2",
    "Start methotrexaat",
    "Inname op de juiste dag, foliumzuur, misselijkheid, mondaften, herinnering bloedname, koorts en infecties"
  ],
  [
    "Methotrexaat (Lies)",
    "Week 6",
    "Opvolging artritis",
    "RAPID3, ochtendstijfheid, gewrichtenschema, vermoeidheid, slaap, werk, hobby's, open vragen, rode vlaggen"
  ],
  [
    "Methotrexaat (Lies)",
    "Week 12",
    "Vóór de herevaluatie",
    "Idem, aangevuld met HAQ-DI"
  ],
  [
    "Methotrexaat",
    "Maand 6 en 12",
    "Opvolging + welzijn",
    "Idem, aangevuld met EQ-5D-5L en PREM"
  ],
  [
    "Overbruggende corticoïden",
    "Week 4 en 8",
    "Afbouwschema",
    "Afbouw volgens schema, slaap, stemming, opflakkering bij het afbouwen"
  ],
  [
    "Infiltratie",
    "Dag 2",
    "Controle na infiltratie",
    "Koorts, roodheid, meer pijn of zwelling dan voordien"
  ],
  [
    "Infiltratie",
    "Week 3",
    "Effect infiltratie",
    "Pijn en zwelling, hoe lang het effect duurde"
  ],
  [
    "Biologisch geneesmiddel",
    "Maandelijks, eerste 6 maanden",
    "Opvolging biological",
    "Infecties, injectieplaats, toediening, RAPID3"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest de arts later voor een infiltratie of een biologisch geneesmiddel, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const FOLLOW_NOTE = "Misselijkheid de dag na methotrexaat is geen rode vlag: het staat genoteerd voor het consult van week 12, zonder signaal naar het secretariaat.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De pil en de vitamine D was ik vergeten, daar denk ik niet meer aan.",
  "followUps": [
    {
      "question": "Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Het Kruispunt · Medicatieschema · L. Carpus, ° 14-03-1980",
    "rows": [
      [
        "Apranax 550 mg tabletten",
        "1 tablet 2× per dag, bij de maaltijd"
      ],
      [
        "Dafalgan Forte 1 g tabletten",
        "1 tablet bij pijn, max. 3× per dag"
      ],
      [
        "Yasmin 0,03 mg/3 mg filmomhulde tabletten",
        "1 tablet per dag, 21 dagen, dan 7 dagen stop"
      ],
      [
        "D-Cure 25.000 IE drinkbare oplossing",
        "1 ampul per maand"
      ]
    ]
  },
  "meds": [
    {
      "name": "Apranax",
      "substance": "Naproxen",
      "strength": "550 mg",
      "form": "Tablet",
      "frequency": "2× per dag, bij de maaltijd",
      "indication": "Pijn en ontsteking (NSAID)",
      "source": "Foto in chat",
      "chatLabel": "Apranax 550 mg · 2× per dag bij de maaltijd"
    },
    {
      "name": "Dafalgan Forte",
      "substance": "Paracetamol",
      "strength": "1 g",
      "form": "Tablet",
      "frequency": "Bij pijn, max. 3× per dag",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Dafalgan Forte 1 g · bij pijn, max. 3× per dag"
    },
    {
      "name": "Yasmin",
      "substance": "Ethinylestradiol + drospirenon",
      "strength": "0,03 mg / 3 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 21 dagen, 7 dagen stop",
      "indication": "Anticonceptie",
      "source": "Foto in chat",
      "chatLabel": "Yasmin · 1× per dag",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "D-Cure",
      "substance": "Colecalciferol",
      "strength": "25.000 IE",
      "form": "Drinkbare oplossing",
      "frequency": "1× per maand",
      "indication": "Vitamine D",
      "source": "Foto in chat",
      "chatLabel": "D-Cure 25.000 IE · 1 ampul per maand",
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
      "label": "Anticonceptie",
      "value": "Yasmin (telt bij de start van methotrexaat)",
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
