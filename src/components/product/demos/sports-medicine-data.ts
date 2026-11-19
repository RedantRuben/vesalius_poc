import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "V. Septum",
    "initials": "VS",
    "channel": "telefoon",
    "summary": "Gisteren bijna flauwgevallen met druk op de borst tijdens een beklimming met de fiets",
    "referral": "Vandaag contact",
    "tasks": 1
  },
  {
    "name": "K. Soleus",
    "initials": "KS",
    "channel": "chat",
    "summary": "Geleidelijke pijn in de achillespees rechts sinds 3 maanden, kan lopen, geen knal",
    "referral": "Sportarts",
    "tasks": 0
  },
  {
    "name": "P. Plantaris",
    "initials": "PP",
    "channel": "telefoon",
    "summary": "Plotse knal achteraan de kuit tijdens padel, kan niet op de tenen staan",
    "referral": "Orthopedie voet en enkel",
    "tasks": 1,
    "moment": "Voorrang"
  },
  {
    "name": "L. Lumbalis",
    "initials": "LL",
    "channel": "chat",
    "summary": "Lage rugpijn na tuinieren, sport niet",
    "referral": "Fysische geneeskunde",
    "tasks": 0
  },
  {
    "name": "F. Fascia",
    "initials": "FF",
    "channel": "chat",
    "summary": "Hielpijn bij de eerste stappen 's ochtends, sinds 6 weken",
    "referral": "Sportarts",
    "tasks": 0
  },
  {
    "name": "B. Femoris",
    "initials": "BF",
    "channel": "chat",
    "summary": "Vraag over afspraak",
    "referral": "",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Bijna flauwgevallen met druk op de borst tijdens inspanning. Secretariaat neemt vandaag contact op: ECG en overleg met de sportcardioloog.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "J. Sartorius",
    "initials": "JS",
    "reason": "Sportmedisch onderzoek · voetbal, ECG"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "V. Septum",
    "initials": "VS",
    "reason": "Dringend · bijna flauwgevallen bij inspanning, ECG"
  },
  {
    "room": 1,
    "slot": 2,
    "length": 1,
    "name": "F. Fascia",
    "initials": "FF",
    "reason": "Nieuwe patiënt · hielpijn"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "K. Soleus",
    "initials": "KS",
    "reason": "Nieuwe patiënt · achillespees, echografie"
  },
  {
    "room": 3,
    "slot": 1,
    "length": 1,
    "name": "B. Femoris",
    "initials": "BF",
    "reason": "Terugkeer naar sport · hamstring, week 4"
  },
  {
    "room": 3,
    "slot": 3,
    "length": 1,
    "name": "S. Gastrocnemius",
    "initials": "SG",
    "reason": "Schokgolftherapie · sessie 2"
  }
];

export const INTAKE_CHAT = [
  "Welke sport doet u, en hoeveel trainde u per week de laatste twee maanden?",
  "Lopen, vier keer per week. In de zomer ben ik in zes weken van 30 naar 55 km per week gegaan, met intervallen en heuvels. Nu nog een kilometer of 25, met pijn.",
  "Is er in die periode nog iets veranderd, zoals uw schoenen of de ondergrond?",
  "Nieuwe schoenen in juli, met minder hak.",
  "Hoe lang is uw pees 's ochtends stijf, en hoeveel pijn heeft u op 10 bij het begin van het lopen?",
  "Een halfuur. Bij de start 6, na een paar kilometer 3.",
  "Heeft u ooit een plotse knal gevoeld, of kon u niet meer op uw tenen staan?"
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Overbelasting",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Pijn en stijfheid achillespees rechts, een paar cm boven de hiel. Verwezen door de huisarts."],
        ["Duur en ontstaan", "Drie maanden, geleidelijk. Sinds eind september erger. Geen knal"],
      ]],
      ["Sportanamnese", [
        ["Sport en niveau", "Lopen, recreatief, loopclub, 4× per week"],
        ["Trainingsvolume", "Van 30 naar 55 km per week in 6 weken, nu ±25 km met pijn"],
        ["Recente wijzigingen", "Intervallen en heuvels toegevoegd, nieuwe schoenen met drop 4 mm (was 10 mm)"],
        ["Doel", "Marathon van Rotterdam, april 2027"],
      ]],
      ["Aard van de pijn", [
        ["Ochtendstijfheid", "30 minuten"],
        ["Pijn (NRS)", "Start lopen 6/10, na 2 km 3/10, de ochtend erna 6/10"],
        ["Erger bij", "Start van het lopen, heuvels, intervallen, trappen op de werf"],
        ["Beter bij", "Inwarmen, rust, ibuprofen"],
      ]],
      ["Rode vlaggen", [
        ["Knal, niet op de tenen staan", "Nee"],
        ["Klachten bij inspanning (borst, hartkloppingen, flauwvallen)", "Nee"],
        ["Andere melding", "Kuitkrampen 's nachts na een lange duurloop, zonder zwelling (geen rode vlag)"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Twee weken rust, ijs, stretching. Ibuprofen soms vóór het lopen. Geen kine"],
        ["Eerdere blessures", "Enkelverstuiking rechts, 2015, hersteld"],
        ["Beeldvorming elders", "Geen"],
        ["Allergieën / bloedverdunners", "Geen / nee"],
        ["Familie", "Vader hypertensie. Geen plotse dood vóór 50"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Nooit / 3 à 4 glazen per week"],
      ]],
      ["Algemeen", [
        ["Beroep", "Projectleider bouwbedrijf, half bureau, half werf"],
        ["Lengte / gewicht", "1,84 m / 79 kg"],
        ["Leeftijd", "42 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["VISA-A", "48 (0–100, hoger = beter)"],
      ]],
    ],
  },
  {
    title: "Acuut letsel",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Enkelverstuiking rechts tijdens een voetbalmatch, gisteren"],
      ]],
      ["Sportanamnese", [
        ["Sport en niveau", "Voetbal, provinciaal, 3× per week"],
      ]],
      ["Mechanisme", [
        ["Hoe", "Voet naar binnen omgeslagen bij een sprong"],
        ["Doorstappen / zwelling binnen het uur", "Nee / ja"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere verstuikingen", "Twee keer dezelfde enkel"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Magazijnier / 29 jaar"],
      ]],
    ],
  },
  {
    title: "Sportkeuring",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Sportmedisch onderzoek voor de voetbalclub"],
      ]],
      ["Sportanamnese", [
        ["Sport en niveau", "Voetbal, U18, 4× per week"],
      ]],
      ["Cardiovasculair", [
        ["Klachten bij inspanning", "Geen"],
        ["Plotse dood in de familie vóór 50", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere blessures", "Groeipijn knie (Osgood-Schlatter), 2023"],
      ]],
      ["Algemeen", [
        ["Leeftijd", "17 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, ik heb al een tijd last van mijn achillespees en mijn huisarts stuurt me naar de sportarts. Kan ik een afspraak maken?",
  "Vervelend om te horen. Is de pijn geleidelijk gekomen, of voelde u plots een knal achteraan uw been? En kunt u op uw tenen staan?",
  "Geleidelijk. Op mijn tenen staan lukt, maar rechts doet het pijn.",
  "Heeft u bij inspanning ooit pijn of druk op de borst gehad, hartkloppingen, of bent u bijna flauwgevallen?",
  "Nee, nooit.",
  "Dank u. Ik plan u in bij de sportarts, in een langere afspraak zodat er tijd is voor een echografie. U krijgt een vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak ingepland bij de sportarts, lang blok met echo: geleidelijke achillespeespijn, geen knal, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Ik knijp even in uw pees, van onder naar boven. Zeg maar waar het het meest pijn doet.",
  "Daar, een paar centimeter boven de hiel. Dat knobbeltje voel ik 's ochtends ook.",
  "Ga nu op uw rechterbeen staan en kom zo vaak mogelijk op de tenen. Ik tel mee.",
  "… veertien. Dan brandt het.",
  "Links haalde u er achtentwintig, zonder pijn. Dan kijken we nu met de echo."
];

export const SCRIBE_NOTE = [
  [
    "Sportanamnese",
    "Recreatieve loper, loopclub, 4× per week. Opbouw van 30 naar 55 km per week in 6 weken, met intervallen en heuvels. Nieuwe schoenen met lagere drop (4 mm, was 10 mm). Doel: marathon van Rotterdam, april 2027. Nu ±25 km per week met pijn."
  ],
  [
    "Anamnese",
    "Geleidelijke pijn en stijfheid achillespees rechts sinds drie maanden, sinds eind september erger, kort na een kuur ciprofloxacine. Ochtendstijfheid 30 minuten. NRS 6/10 bij de start, 3/10 na inwarmen, 6/10 de ochtend erna. Geen knal. Ibuprofen soms vóór het lopen. Geen klachten bij inspanning die op het hart wijzen. Geen bloedverdunners."
  ],
  [
    "Klinisch onderzoek",
    "Normaal gangpatroon. Spoelvormige, drukpijnlijke verdikking achillespees rechts, 3 tot 5 cm boven de insertie. Arc sign en Royal London Hospital test positief. Insertie niet drukpijnlijk. Thompson negatief beiderzijds. Knie-tot-muur rechts 9 cm, links 11 cm. Kuiten soepel, geen zwelling."
  ],
  [
    "Functionele testen",
    "Single-leg heel raise: rechts 14 met pijn 5/10, links 28 zonder pijn (verschil 50%). Hinken 10×: rechts pijn 4/10, links pijnvrij."
  ],
  [
    "Echografie",
    "Achillespees rechts verdikt in het midportion, AP-diameter 8,9 mm (links 5,4 mm). Hypo-echogene zone over 2 cm, neovascularisatie op power Doppler. Geen partiële ruptuur. Insertie en bursa normaal."
  ],
  [
    "Diagnose",
    "Midportion achillestendinopathie rechts bij overbelasting. Recente fluorochinolonkuur als bijkomende risicofactor."
  ],
  [
    "Beleid",
    "Oefentherapie via kine: kuitversterking met zware, trage herhalingen, 3× per week, 12 weken. Blijven lopen binnen pijngrens 3/10, de ochtend erna niet stijver. Geen intervallen of heuvels. Tijdelijk schoenen met drop 8 à 10 mm. Geen ibuprofen vóór het lopen. Fluorochinolonen vermijden. Geen corticoïdinfiltratie. Beslissing marathonplan in week 12. Bij onvoldoende verbetering: schokgolftherapie. Vangnet: dringend contact bij een plotse knal of als hij niet meer op de tenen kan staan. Opvolging met VISA-A."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Sportgeneeskunde, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift kinesitherapie",
    "Oefentherapie, kuitversterking met zware, trage herhalingen",
    "Gegenereerd"
  ],
  [
    "Belastingsschema voor de patiënt",
    "Pijngrens, opbouw lopen, oefeningen en wanneer dringend contact",
    "Nog niet gegenereerd"
  ],
  [
    "Attest voor de club",
    "Aangepaste training, geen wedstrijden tot herevaluatie",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Soleus voor pijn in de achillespees rechts sinds drie maanden, na een snelle opbouw van zijn looptraining. De echografie toont een midportion achillestendinopathie zonder partiële ruptuur. We starten oefentherapie met belastingsmanagement en herevalueren in week 12.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Koen Soleus, geboren op 8 mei 1984, die ik recent op de raadpleging sportgeneeskunde zag.",
  "REDEN VOOR CONTACT Verwezen wegens pijn in de achillespees rechts sinds drie maanden. Recreatieve loper in voorbereiding op een marathon.",
  "ANAMNESE Geleidelijk ontstane pijn en stijfheid boven de rechterhiel, na een opbouw van 30 naar 55 km per week in zes weken, met intervallen en heuveltraining, en een wissel naar loopschoenen met een lagere drop. Ochtendstijfheid van 30 minuten. Pijn 6 op 10 bij de start van het lopen, warmt in, opnieuw 6 op 10 na het lopen en de ochtend erna. Sinds eind september duidelijk erger, kort na een behandeling met ciprofloxacine voor een prostaatontsteking. Geen knal, geen trauma. Neemt soms ibuprofen vóór het lopen. Hooikoorts, behandeld met cetirizine. Geen klachten op de borst, geen hartkloppingen of flauwvallen bij inspanning. Geen allergieën, geen bloedverdunners.",
  "KLINISCH ONDERZOEK Spoelvormige, drukpijnlijke verdikking van de achillespees rechts, 3 tot 5 cm boven de insertie. Arc sign en Royal London Hospital test positief. Aanhechting niet drukpijnlijk. Thompson-test negatief, pees intact. Single-leg heel raise test: rechts 14 herhalingen met pijn, links 28 zonder pijn. Dorsiflexie enkel rechts licht beperkt.",
  "AANVULLENDE ONDERZOEKEN Echografie: verdikte achillespees rechts in het midportion (AP-diameter 8,9 mm, links 5,4 mm), hypo-echogene zone over 2 cm met neovascularisatie. Geen partiële ruptuur, insertie en bursa normaal.",
  "DIAGNOSE Midportion achillestendinopathie rechts, bij overbelasting. Recente fluorochinolonkuur als bijkomende risicofactor.",
  "BELEID We starten oefentherapie bij de kinesitherapeut met kuitversterking volgens zware, trage herhalingen, drie keer per week gedurende twaalf weken. Koen blijft lopen binnen een pijngrens van 3 op 10, zonder intervallen of heuvels, en bouwt op volgens een belastingsschema. Hij schakelt tijdelijk terug naar schoenen met een hogere drop en neemt geen ibuprofen meer vóór het lopen. Graag vermijden we fluorochinolonen in de toekomst. Corticoïdinfiltraties zijn niet aangewezen. Herevaluatie in week 12, waar we ook het marathonplan bespreken. Bij onvoldoende verbetering komt schokgolftherapie in aanmerking. Hij weet dat hij dringend contact opneemt bij een plotse knal achteraan de kuit of als hij niet meer op zijn tenen kan staan.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, sportarts"
];

export const FOLLOW_ROWS = [
  [
    "D. Peroneus",
    "Enkelverstuiking · week 2"
  ],
  [
    "K. Soleus",
    "Achillespees, oefentherapie · week 6 · VISA-A ingevuld"
  ],
  [
    "S. Gastrocnemius",
    "Schokgolftherapie · na sessie 1"
  ],
  [
    "B. Femoris",
    "Hamstringletsel · week 4"
  ]
];

export const FOLLOW_ALERT = "Meldt een warme, gezwollen en pijnlijke kuit, twee weken na een enkelverstuiking in een brace. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe lang is uw pees 's ochtends nog stijf?",
  "Na een kwartier is het weg. Vroeger was dat een halfuur.",
  "Lukte het om uw kuitoefeningen te doen, en hoe voelde de pees na uw langste loop deze week?",
  "Drie keer per week, zoals afgesproken. Zondag tien kilometer rustig, pijn 2 op 10, en de ochtend erna niet stijver.",
  "Fijn om te horen. Heeft u een plotse knal gevoeld, of kon u niet meer op uw tenen staan?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "VISA-A (0 tot 100, hoger = beter)",
    "48",
    "63"
  ],
  [
    "NRS pijn na het lopen (0 tot 10, lager = beter)",
    "6",
    "2"
  ],
  [
    "Ochtendstijfheid",
    "30 minuten",
    "15 minuten"
  ],
  [
    "Kilometers per week",
    "±25, met pijn",
    "20, binnen de pijngrens"
  ],
  [
    "Werk",
    "Trappen op de werf pijnlijk",
    "Zonder klachten"
  ],
  [
    "Sportdoel",
    "Marathon onzeker",
    "Beslissing in week 12"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Oefentherapie + belastingsmanagement (Koen)",
    "Week 2",
    "Start belastingsschema",
    "Pijn tijdens en na het lopen, ochtendstijfheid, oefeningen gedaan, kilometers, rode vlaggen"
  ],
  [
    "Oefentherapie + belastingsmanagement (Koen)",
    "Week 6",
    "Opvolging achillespees",
    "VISA-A, NRS, ochtendstijfheid, kilometers, kine, slaap, werk, open vragen, rode vlaggen"
  ],
  [
    "Oefentherapie + belastingsmanagement (Koen)",
    "Week 12 en maand 6",
    "Terugkeer naar sport + welzijn",
    "VISA-A, sportniveau vergeleken met vóór de blessure, wedstrijdplan, EQ-5D-5L, PREM (maand 6)"
  ],
  [
    "Schokgolftherapie",
    "Na sessie 1",
    "Controle na schokgolf",
    "Pijn tijdens en na de sessie, zwelling, blauwe plek"
  ],
  [
    "Schokgolftherapie",
    "Week 12 na de laatste sessie",
    "Effect schokgolf",
    "VISA-A, NRS, kilometers"
  ],
  [
    "Enkelverstuiking",
    "Week 2",
    "Controle enkel",
    "Zwelling, belasten, brace, pijn of zwelling in de kuit"
  ],
  [
    "Enkelverstuiking",
    "Week 6 en maand 3",
    "Terugkeer naar sport",
    "CAIT, doorzakken, sportniveau, open vragen"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest, met op vaste momenten dezelfde gevalideerde vragenlijst. Kiest hij later voor schokgolftherapie, dan schakelt de opvolging mee. Elk letsel heeft zijn eigen standaard.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const FOLLOW_QUOTE = "De ochtenden zijn veel beter. Ik had nooit gedacht dat ik mocht blijven lopen, maar met die pijngrens weet ik eindelijk wanneer ik moet stoppen.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen, of nam u de laatste maanden een kuur? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 3 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. Die Ciproxine was voor een prostaatontsteking, ik dacht niet dat dat ertoe deed. De ibuprofen neem ik soms voor het lopen.",
  "followUps": [
    {
      "question": "Genoteerd, de arts ziet het. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Sint-Jan · Medicatieschema · K. Soleus, ° 08-05-1984",
    "rows": [
      [
        "Ibuprofen EG 400 mg filmomhulde tabletten",
        "1 tablet bij pijn, max. 3× per dag, tijdens de maaltijd"
      ],
      [
        "Cetirizine EG 10 mg filmomhulde tabletten",
        "1 tablet per dag, april tot juli"
      ],
      [
        "Ciproxine 500 mg filmomhulde tabletten",
        "1 tablet 2× per dag, 14 dagen (afgeleverd 05-09-2026)"
      ]
    ]
  },
  "meds": [
    {
      "name": "Ibuprofen EG",
      "substance": "Ibuprofen",
      "strength": "400 mg",
      "form": "Tablet",
      "frequency": "Bij pijn, max. 3× per dag",
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
      "name": "Ciproxine",
      "substance": "Ciprofloxacine",
      "strength": "500 mg",
      "form": "Tablet",
      "frequency": "2× per dag, 14 dagen, afgerond 19-09-2026",
      "indication": "Prostaatontsteking (antibioticum, fluorochinolon)",
      "source": "Foto in chat",
      "chatLabel": "Ciproxine 500 mg · 2× per dag, 14 dagen, in september",
      "tag": {
        "label": "Niet zelf vermeld · kuur afgerond",
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
      "label": "Recent antibioticum",
      "value": "Fluorochinolon (Ciproxine), afgerond 19-09-2026: risicofactor voor peesklachten",
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
