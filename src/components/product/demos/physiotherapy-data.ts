import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "V. Poplitea",
    "initials": "VP",
    "channel": "chat",
    "summary": "Check-in vóór sessie 4: dag 10 na VKB-reconstructie, sinds gisteren pijnlijke, warme, gezwollen kuit",
    "referral": "Arts vandaag",
    "moment": "Sessie geannuleerd",
    "tasks": 1
  },
  {
    "name": "L. Cruciatum",
    "initials": "LC",
    "channel": "chat",
    "summary": "VKB-reconstructie rechts met meniscushechting, voorschrift dr. Claes, kan enkel na 17u30",
    "referral": "Sportkine",
    "moment": "ma-wo-do 18u00",
    "tasks": 0
  },
  {
    "name": "R. Lumbalis",
    "initials": "RL",
    "channel": "chat",
    "summary": "Lage rugpijn sinds 3 weken, geen uitstraling, werkt in ploegen",
    "referral": "Manuele therapie",
    "moment": "di en vr 7u30",
    "tasks": 0
  },
  {
    "name": "P. Pelvis",
    "initials": "PP",
    "channel": "telefoon",
    "summary": "Urineverlies bij lopen en springen, 4 maanden na de bevalling",
    "referral": "Bekkenbodem",
    "moment": "Woensdagvoormiddag",
    "tasks": 0
  },
  {
    "name": "S. Scapula",
    "initials": "SS",
    "channel": "chat",
    "summary": "Schouderprothese 6 weken geleden, rijdt niet meer",
    "referral": "Huisbezoek",
    "moment": "Huisbezoek",
    "tasks": 0
  },
  {
    "name": "T. Talus",
    "initials": "TT",
    "channel": "chat",
    "summary": "Enkel verzwikt bij basket, kan doorstappen",
    "referral": "Sportkine",
    "moment": "woensdag 14u00",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Dag 10 na een VKB-reconstructie, sinds gisteren een pijnlijke, warme, gezwollen kuit. Sessie geannuleerd. Secretariaat belt de chirurg vandaag.";

export const VISITS = [
  {
    "room": 1,
    "slot": 13,
    "length": 1,
    "time": "14:00",
    "name": "T. Talus",
    "initials": "TT",
    "reason": "Nieuwe patiënt · enkelverstuiking"
  },
  {
    "room": 1,
    "slot": 20,
    "length": 1,
    "time": "17:30",
    "name": "M. Quadriceps",
    "initials": "MQ",
    "reason": "Sessie 22 · na meniscectomie"
  },
  {
    "room": 1,
    "slot": 21,
    "length": 1,
    "time": "18:00",
    "name": "L. Cruciatum",
    "initials": "LC",
    "reason": "Sessie 2 · VKB-reconstructie · reeks ma-wo-do"
  },
  {
    "room": 1,
    "slot": 22,
    "length": 1,
    "time": "18:30",
    "name": "V. Poplitea",
    "initials": "VP",
    "reason": "Geannuleerd · kuitpijn, doorverwezen naar de chirurg",
    "cancelled": true
  },
  {
    "room": 2,
    "slot": 0,
    "length": 1,
    "time": "07:30",
    "name": "R. Lumbalis",
    "initials": "RL",
    "reason": "Nieuwe patiënt · lage rugpijn"
  },
  {
    "room": 2,
    "slot": 6,
    "length": 1,
    "time": "10:30",
    "name": "S. Scapula",
    "initials": "SS",
    "reason": "Huisbezoek · schouderprothese"
  },
  {
    "room": 3,
    "slot": 4,
    "length": 1,
    "time": "09:30",
    "name": "P. Pelvis",
    "initials": "PP",
    "reason": "Nieuwe patiënt · bekkenbodem na bevalling"
  }
];

export const INTAKE_CHAT = [
  "Wat heeft dr. Claes precies gedaan tijdens de operatie, en wat mag u van hem al doen?",
  "Nieuwe kruisband met een pees uit mijn hamstrings, en mijn meniscus is gehecht. Vier weken met twee krukken en een brace tot 90 graden.",
  "Dank u. Hoeveel pijn heeft u nu, op 10, in rust en als u beweegt?",
  "In rust 3, bij bewegen 6.",
  "Heeft u pijn of zwelling in uw kuit, koorts, of komt er vocht uit de wonde?",
  "Nee",
  "Wat wilt u op het einde van de revalidatie weer kunnen?",
  "Volgend seizoen terug voetballen. En zonder schrik de trap af."
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Knie na operatie",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Revalidatie na VKB-reconstructie rechts (hamstringpees) met hechting van de mediale meniscus, 3 dagen geleden. Voorschrift dr. Claes, orthopedisch chirurg."],
        ["Ontstaan", "Tien weken geleden tijdens een match: draaibeweging zonder contact, \"plop\", zwelling binnen het uur."],
      ]],
      ["Richtlijnen chirurg", [
        ["Steunen", "Partieel, met 2 krukken, 4 weken"],
        ["Plooien", "Brace 0 tot 90°, 4 weken. Geen belaste diepe hurk tot maand 4 (meniscushechting)."],
        ["Hamstrings", "Geen weerstand tot week 6 (donorpees)"],
      ]],
      ["Aard van de pijn", [
        ["Pijn", "3/10 in rust, 6/10 bij bewegen"],
        ["Zwelling", "Ja, koelt 4 keer per dag"],
      ]],
      ["Rode vlaggen", [
        ["Kuit, koorts, wonde", "Geen kuitpijn, geen koorts, wonde droog"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere blessures", "Enkelverstuiking links, 2021, kine gehad"],
        ["Medicatie", "Zie medicatielijst (foto in de chat). Bloedverdunner: Clexane tot dag 14."],
        ["Allergieën", "Geen"],
      ]],
      ["Algemeen", [
        ["Beroep", "Bediende bij een verzekeraar, voltijds, 8u30 tot 17u00. Kan de eerste weken thuiswerken."],
        ["Sport", "Voetbal, spits in een damesploeg: 3 trainingen en 1 match per week (Tegner 9 vóór de blessure)"],
        ["Doel", "Volgend seizoen terug spelen. Zonder schrik de trap af."],
        ["Beschikbaarheid", "Weekdagen na 17u30, zaterdagvoormiddag. Mag 6 weken niet rijden, partner brengt haar."],
        ["Beenvoorkeur", "Rechts"],
        ["Lengte / gewicht", "1,68 m / 61 kg"],
        ["Leeftijd", "24 jaar"],
      ]],
      ["Baseline", [
        ["IKDC", "31 (0 tot 100, hoger = beter)"],
        ["ACL-RSI", "38 (0 tot 100, hoger = beter)"],
        ["PSFS", "Trap afgaan 2, joggen 0, draaien op rechterbeen 0 (0 tot 10, hoger = beter)"],
      ]],
    ],
  },
  {
    title: "Rug en nek",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Lage rugpijn sinds 3 weken, na het tillen van een doos. Geen uitstraling onder de knie."],
      ]],
      ["Aard van de pijn", [
        ["Pijn", "6/10"],
      ]],
      ["Rode vlaggen", [
        ["Zitvlak, plassen, kracht", "Geen doof gevoel, plassen normaal, geen krachtverlies"],
      ]],
      ["Baseline", [
        ["STarT Back", "Laag risico"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Magazijnier in ploegen / 46 jaar"],
        ["Beschikbaarheid", "Vóór 8u00 of na 14u00"],
      ]],
    ],
  },
  {
    title: "Bekkenbodem",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Urineverlies bij lopen en springen sinds de bevalling, 4 maanden geleden"],
      ]],
      ["Medische achtergrond", [
        ["Bevalling", "Vaginaal, scheurtje graad 2"],
      ]],
      ["Baseline", [
        ["ICIQ-UI SF", "9 (0 tot 21, lager = beter)"],
      ]],
      ["Algemeen", [
        ["Doel", "Terug lopen met haar loopgroep"],
        ["Beroep / leeftijd", "Leerkracht, in zwangerschapsverlof / 34 jaar"],
        ["Beschikbaarheid", "Woensdagvoormiddag"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, met Lotte Cruciatum. Ik moet donderdag langer werken. Kan mijn sessie van 18 uur verschoven worden?",
  "Natuurlijk. Ik kan u vrijdag om 17u30 inplannen bij Andreas Vesalius, of donderdag om 19u00. Wat past u het best?",
  "Vrijdag 17u30 is goed.",
  "Genoteerd. Nog even: heeft u pijn of zwelling in uw kuit, of koorts?",
  "Nee, alles goed.",
  "Dank u. U krijgt een bevestiging via WhatsApp. Uw volgende sessies blijven zoals gepland."
];

export const VOICE_TASK = "Sessie verplaatst naar vrijdag 17u30, zelfde kinesitherapeut. Geen rode vlaggen.";

export const SCRIBE_CHAT = [
  "Hoe was je knie na dinsdag?",
  "'s Ochtends wat stijf, maar niet dikker. Ik heb mijn oefeningen vijf keer gedaan.",
  "Ik plooi je knie nu verder. Zeg maar stop.",
  "Ja, tot daar.",
  "Honderdtien graden. Acht meer dan dinsdag."
];

export const SCRIBE_NOTE = [
  [
    "Subjectief",
    "Week 5 na VKB-reconstructie rechts (hamstringpees) met hechting mediale meniscus. Pijn 2/10, ochtendstijfheid, geen toename van de zwelling na sessie 13. Huisoefeningen 5 van 7 dagen. Sinds maandag binnenshuis zonder krukken, buiten nog 1 kruk. Geen kuitpijn, geen koorts. Werkt halftijds van thuis."
  ],
  [
    "Objectief",
    "Wonde gesloten, rustig. Effusie stroke test 1+ (sessie 13: 1+). Extensie 0° (=). Flexie 110° actief-geassisteerd (sessie 13: 102°). Geen extension lag. Patellamobiliteit licht verminderd naar craniaal. Gangbeeld zonder kruk: kortere standfase rechts. Kuit soepel, niet pijnlijk."
  ],
  [
    "Behandeling",
    "Patellamobilisaties. Actief-geassisteerde flexie (heel slides). Fietsergometer zonder weerstand, 10 minuten: eerste volledige omwenteling. Leg press bilateraal 0 tot 60°, 3 × 12. Mini-squats 0 tot 45°. Gangtraining zonder krukken. Hamstrings nog zonder weerstand (protocol tot week 6)."
  ],
  [
    "Evaluatie",
    "Op schema. Criteria voor fase 2 bijna bereikt: volledige extensie, flexie ≥ 110°, geen extension lag, effusie ≤ 1+. Gangbeeld zonder krukken nog niet volledig normaal."
  ],
  [
    "Plan",
    "Krukken buiten afbouwen zodra het gangbeeld normaal is. Huisoefenschema aangepast: dagelijks fietsen, step-ups 10 cm. Geen belaste diepe hurk voorbij 90° tot maand 4 (meniscushechting). Volgende sessie: gangbeeld hertesten, start isometrie hamstrings vanaf week 6. Evolutieverslag klaarzetten voor de controle bij dr. Claes in week 6."
  ]
];

export const SESSION_SCORES = [
  [
    "Pijn (0 tot 10, lager = beter)",
    "4",
    "3",
    "3",
    "2"
  ],
  [
    "Effusie (stroke test)",
    "2+",
    "2+",
    "1+",
    "1+"
  ],
  [
    "Extensie",
    "−5°",
    "−3°",
    "0°",
    "0°"
  ],
  [
    "Flexie",
    "70°",
    "80°",
    "90° (limiet brace)",
    "110°"
  ],
  [
    "Extension lag",
    "10°",
    "5°",
    "0°",
    "0°"
  ],
  [
    "Gang",
    "2 krukken, partieel",
    "2 krukken, partieel",
    "2 krukken, partieel",
    "Zonder krukken binnen"
  ]
];

export const DOCUMENTS = [
  [
    "Evolutieverslag",
    "Metingen, evolutie en plan voor dr. Claes, controle maand 3",
    "Gegenereerd"
  ],
  [
    "Huisoefenschema fase 3",
    "Oefeningen met herhalingen, voor thuis en in de fitness",
    "Gegenereerd"
  ],
  [
    "Kennisgeving adviserend arts",
    "Voor de mutualiteit, bij de start van de reeks",
    "Gegenereerd"
  ],
  [
    "Verslag terugkeer naar sport",
    "Hoptests, kracht en ACL-RSI, voor de patiënt en haar trainer",
    "Nog niet gegenereerd"
  ],
  [
    "Eindbilan",
    "Afsluiting van de reeks, voor de chirurg en de huisarts",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte dokter Claes, uw patiënte Lotte Cruciatum volgt sinds dag 6 na haar VKB-reconstructie rechts kinesitherapie bij ons, in totaal 32 sessies. Ze heeft volledige extensie, 135° flexie en geen effusie. Het quadricepskrachttekort (LSI 64%) is het belangrijkste werkpunt voor de volgende fase.";

export const LETTER = [
  "Geachte dokter Claes,",
  "Ik schrijf u over uw patiënte Lotte Cruciatum, geboren op 18 mei 2002, die bij ons kinesitherapie volgt na de VKB-reconstructie die u drie maanden geleden uitvoerde.",
  "REDEN VOOR CONTACT Evolutieverslag na drie maanden revalidatie, voor haar controle. VKB-reconstructie rechts met hamstringpees en hechting van de mediale meniscus. Kinesitherapie gestart op dag 6, 32 sessies.",
  "ANAMNESE Geen pijn in rust, 1 tot 2 op 10 na training. Geen instabiliteitsgevoel, geen slotklachten. Stappen, trappen en fietsen zonder klachten. Sinds week 7 opnieuw voltijds aan het werk. Huisoefeningen gemiddeld vijf dagen per week. Geen pijnstilling meer. Clexane gestopt op dag 14, zonder kuitklachten. Neemt de pil. Geen allergieën.",
  "KLINISCH ONDERZOEK Geen effusie (stroke test 0). Extensie 0°, flexie 135° (links 145°). Normaal gangbeeld. Single leg squat rechts met lichte dynamische valgus. Y-balance anterieur 6 cm korter rechts.",
  "AANVULLENDE ONDERZOEKEN Isometrische kracht met handdynamometer bij 60° knieflexie: quadriceps LSI 64%, hamstrings LSI 82%. IKDC 58 (week 2: 31). ACL-RSI 49 (week 2: 38). PSFS: trap afgaan 7, joggen 2, draaien op het rechterbeen 0.",
  "DIAGNOSE Normaal verloop drie maanden na VKB-reconstructie rechts met meniscushechting. Resterend quadricepskrachttekort en dynamische valgus. Psychologische bereidheid om te sporten nog laag.",
  "BELEID Overgang naar fase 3: progressieve krachttraining, looptraining en neuromusculaire training, 2 sessies per week. Geen belaste diepe hurk tot maand 4. Start bilaterale sprongoefeningen zodra de quadriceps LSI 70% haalt. Hoptests en krachtmeting opnieuw bij maand 6. Terugkeer naar groepstraining pas wanneer de hoptests en kracht 90% van de andere zijde halen en de ACL-RSI besproken is, ten vroegste rond maand 9. Lotte weet dat ze contact opneemt bij nieuwe zwelling, door de knie zakken of slotklachten.",
  "Met vriendelijke groeten, Andreas Vesalius, kinesitherapeut",
  "cc dr. Maes, huisarts"
];

export const FOLLOW_ROWS = [
  [
    "V. Poplitea",
    "VKB-reconstructie · check-in vóór sessie 4"
  ],
  [
    "L. Cruciatum",
    "VKB-reconstructie · maand 9 · IKDC en ACL-RSI ingevuld"
  ],
  [
    "M. Quadriceps",
    "Meniscectomie · check-in vóór sessie 23 · knie iets dikker (géén rode vlag)"
  ],
  [
    "R. Lumbalis",
    "Lage rugpijn · tussenevaluatie sessie 6"
  ],
  [
    "P. Pelvis",
    "Bekkenbodem · week 6"
  ]
];

export const FOLLOW_ALERT = "Meldt sinds gisteren een pijnlijke, warme, gezwollen kuit, dag 10 na een VKB-reconstructie. Sessie geannuleerd, chirurg vandaag. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw knie sinds de vorige meting?",
  "Goed! Ik train mee met de groep, zonder contact. Ik voel me sterker dan ik dacht.",
  "Fijn om te horen. Is er iets dat u nog tegenhoudt?",
  "Een duel aangaan. In mijn hoofd zie ik het nog altijd gebeuren.",
  "Is uw knie de laatste tijd door gezakt, dik geworden of geblokkeerd?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "IKDC (0 tot 100, hoger = beter)",
    "31",
    "58",
    "74",
    "87"
  ],
  [
    "ACL-RSI (0 tot 100, hoger = beter)",
    "38",
    "49",
    "61",
    "76"
  ],
  [
    "Pijn na training, NRS (0 tot 10, lager = beter)",
    "6",
    "2",
    "1",
    "1"
  ],
  [
    "PSFS draaien op rechterbeen (0 tot 10, hoger = beter)",
    "0",
    "0",
    "4",
    "8"
  ],
  [
    "Quadriceps LSI, gemeten door de kine (hoger = beter)",
    "–",
    "64%",
    "81%",
    "93%"
  ],
  [
    "Hoptests LSI, laagste van 4, gemeten door de kine (hoger = beter)",
    "–",
    "–",
    "84%",
    "95%"
  ],
  [
    "Slaap",
    "Wakker van de pijn",
    "Goed",
    "Goed",
    "Goed"
  ],
  [
    "Werk",
    "Halftijds thuiswerk",
    "Voltijds",
    "Voltijds",
    "Voltijds"
  ],
  [
    "Voetbal",
    "–",
    "Looptraining",
    "Individuele voetbaltraining",
    "Groepstraining zonder contact"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "VKB-reconstructie (Lotte)",
    "Vóór elke sessie",
    "Check-in",
    "Pijn, zwelling, huisoefeningen gedaan, kuitpijn of koorts, vraag voor de kine"
  ],
  [
    "VKB-reconstructie (Lotte)",
    "Week 2",
    "Nulmeting",
    "IKDC, ACL-RSI, PSFS, Tegner vóór de blessure, doelen"
  ],
  [
    "VKB-reconstructie (Lotte)",
    "Maand 3, 6 en 9",
    "Mijlpaal VKB",
    "IKDC, ACL-RSI, PSFS, slaap, werk, sport, open vragen, rode vlaggen"
  ],
  [
    "VKB-reconstructie (Lotte)",
    "Maand 12",
    "Uitkomst VKB + welzijn",
    "Idem, aangevuld met EQ-5D-5L, Tegner nu, PREM"
  ],
  [
    "Lage rugpijn",
    "Start, sessie 6, einde reeks",
    "Opvolging rug",
    "ODI, NRS, PSFS, STarT Back bij de start, ervaren effect"
  ],
  [
    "Lage rugpijn",
    "3 maanden na de laatste sessie",
    "Na afsluiten",
    "ODI, werk, terugval, PREM"
  ],
  [
    "Bekkenbodem na bevalling",
    "Start, week 6, einde",
    "Opvolging bekkenbodem",
    "ICIQ-UI SF, lopen en springen, open vragen, PREM aan het einde"
  ],
  [
    "Enkelverstuiking",
    "Start, week 4, maand 3",
    "Opvolging enkel",
    "FAAM, CAIT vanaf week 4, terugkeer naar sport, opnieuw verzwikt"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt het traject dat de kinesitherapeut kiest. Vóór elke sessie komt een korte check-in, op de mijlpalen een volledige vragenlijst.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja. De pil had ik niet vermeld, ik dacht niet dat dat telde.",
  "followUps": [
    {
      "question": "Genoteerd, dat is nuttig om te weten. U neemt Clexane als bloedverdunner na de operatie. Neemt u nog andere bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek Sint-Jan · Medicatieschema · L. Cruciatum, ° 18-05-2002",
    "rows": [
      [
        "Clexane 40 mg/0,4 ml oplossing voor injectie, voorgevulde spuit",
        "1 spuit per dag, onderhuids, 's avonds, tot 14 dagen na de operatie"
      ],
      [
        "Dafalgan Forte 1 g tabletten",
        "1 tablet bij pijn, max. 4× per dag"
      ],
      [
        "Brufen 600 mg filmomhulde tabletten",
        "1 tablet 2× per dag, tijdens de maaltijd, 5 dagen"
      ],
      [
        "Microgynon 30 omhulde tabletten",
        "1 tablet per dag"
      ]
    ]
  },
  "meds": [
    {
      "name": "Clexane",
      "substance": "Enoxaparine",
      "strength": "40 mg/0,4 ml",
      "form": "Voorgevulde spuit",
      "frequency": "1× per dag, 's avonds, tot dag 14",
      "indication": "Tromboseprofylaxe na operatie",
      "source": "Foto in chat",
      "chatLabel": "Clexane 40 mg · 1 spuitje per dag tot dag 14",
      "tag": {
        "label": "Tot dag 14",
        "tone": "amber"
      }
    },
    {
      "name": "Dafalgan Forte",
      "substance": "Paracetamol",
      "strength": "1 g",
      "form": "Tablet",
      "frequency": "Bij pijn, max. 4× per dag",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Dafalgan Forte 1 g · bij pijn, max. 4× per dag"
    },
    {
      "name": "Brufen",
      "substance": "Ibuprofen",
      "strength": "600 mg",
      "form": "Tablet",
      "frequency": "2× per dag, bij de maaltijd, 5 dagen",
      "indication": "Pijn en zwelling (NSAID)",
      "source": "Foto in chat",
      "chatLabel": "Brufen 600 mg · 2× per dag bij de maaltijd, 5 dagen"
    },
    {
      "name": "Microgynon 30",
      "substance": "Ethinylestradiol + levonorgestrel",
      "strength": "0,03 mg / 0,15 mg",
      "form": "Tablet",
      "frequency": "1× per dag",
      "indication": "Anticonceptie",
      "source": "Foto in chat",
      "chatLabel": "Microgynon 30 · 1 tablet per dag",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
      }
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Clexane 40 mg tot dag 14 (gemarkeerd)",
      "tone": "warn"
    },
    {
      "label": "Tromboserisico",
      "value": "Verhoogd: operatie, beperkte mobiliteit en de pil. Kuit nagaan bij elke check-in.",
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
