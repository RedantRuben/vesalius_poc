import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "M. Duodenum",
    "initials": "MD",
    "channel": "telefoon",
    "summary": "Zwarte stoelgang sinds gisteren, duizelig bij opstaan, neemt Xarelto",
    "referral": "Spoed",
    "tasks": 1
  },
  {
    "name": "E. Sigma",
    "initials": "ES",
    "channel": "chat",
    "summary": "Buikpijn die beter wordt na de stoelgang, wisselend stoelgangpatroon sinds 9 maanden, geen alarmsymptomen",
    "referral": "Darm",
    "tasks": 0
  },
  {
    "name": "L. Flexura",
    "initials": "LF",
    "channel": "chat",
    "summary": "Bloed bij de stoelgang, 5 kg afgevallen, 58 jaar",
    "referral": "Endoscopie (voorrang)",
    "tasks": 0
  },
  {
    "name": "A. Appendix",
    "initials": "AA",
    "channel": "telefoon",
    "summary": "Buikpijn die elke maand terugkomt rond de menstruatie",
    "referral": "Gynaecologie",
    "tasks": 0
  },
  {
    "name": "H. Hepar",
    "initials": "HH",
    "channel": "chat",
    "summary": "Verhoogde leverwaarden, geen klachten",
    "referral": "Hepatologie",
    "tasks": 0
  },
  {
    "name": "F. Fundus",
    "initials": "FF",
    "channel": "chat",
    "summary": "Vraag over afspraak",
    "referral": "",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Zwarte stoelgang sinds gisteren en duizelig bij opstaan, neemt Xarelto. Secretariaat belt nu en verwijst naar de spoedgevallendienst.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "I. Ileum",
    "initials": "II",
    "reason": "Controle ziekte van Crohn, biologische therapie"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "F. Fundus",
    "initials": "FF",
    "reason": "Zuurbranden, maagzuurremmer helpt"
  },
  {
    "room": 1,
    "slot": 2,
    "length": 1,
    "name": "H. Hepar",
    "initials": "HH",
    "reason": "Nieuwe patiënt · verhoogde leverwaarden"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "E. Sigma",
    "initials": "ES",
    "reason": "Nieuwe patiënte · prikkelbare darm"
  },
  {
    "room": 3,
    "slot": 0,
    "length": 2,
    "name": "L. Flexura",
    "initials": "LF",
    "reason": "Voorrang · coloscopie, bloed bij de stoelgang"
  },
  {
    "room": 3,
    "slot": 2,
    "length": 2,
    "name": "B. Bauhin",
    "initials": "BB",
    "reason": "Coloscopie, bevolkingsonderzoek"
  }
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Sinds een buikgriep in februari heb ik krampen in mijn buik en een opgeblazen gevoel. De ene dag diarree, dan weer dagen niets.",
  "Wordt de pijn minder nadat u naar het toilet bent geweest?",
  "Minder",
  "Welke afbeelding lijkt het meest op uw stoelgang? U mag er meerdere kiezen."
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Darm",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Krampende buikpijn, opgeblazen buik en wisselend stoelgangpatroon. Vraag van de huisarts: prikkelbaredarmsyndroom?"],
        ["Duur", "Negen maanden, begonnen na een buikgriep"],
      ]],
      ["Aard van de pijn", [
        ["Plaats en aard", "Linksonder, krampend, 7/10 tijdens een kramp"],
        ["Frequentie", "3 à 4 dagen per week"],
        ["Verband met stoelgang", "Beter na de stoelgang"],
      ]],
      ["Stoelgang", [
        ["Patroon", "Wisselend: dagen met diarree (Bristol 6, tot 4× per dag, aandrang 's ochtends), dan 2 dagen niets en harde stoelgang (Bristol 1 tot 2)"],
        ["Slijm / bloed", "Soms slijm / nooit bloed"],
      ]],
      ["Wanneer heb je klachten", [
        ["Erger bij", "Stress op het werk, boterhammen, uien en look, appels, vóór het lopen"],
        ["Beter bij", "Stoelgang, warmte, Buscopan een beetje"],
      ]],
      ["Rode vlaggen", [
        ["Bloed of zwarte stoelgang", "Nee"],
        ["Gewichtsverlies, nachtelijke klachten, koorts", "Nee"],
        ["Familie", "Geen darmkanker, chronische darmontsteking of coeliakie. Moeder \"gevoelige darmen\""],
      ]],
      ["Al onderzocht", [
        ["Bloedname huisarts", "Hemoglobine, CRP, ferritine en TSH normaal"],
        ["Calprotectine", "32 µg/g (normaal < 50)"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "2 maanden lactosevrij en 6 weken probiotica, zonder effect. Buscopan en Imodium bij nood."],
        ["Operaties", "Geen"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Cyclus", "Regelmatig, pijn niet cyclisch"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol / koffie", "Nee / 2 à 3 glazen per week / 3 tassen per dag"],
      ]],
      ["Impact", [
        ["Werk en vrije tijd", "Vermijdt vergaderingen 's ochtends en etentjes met vrienden. Loopt geen wedstrijden meer uit angst voor aandrang."],
      ]],
      ["Algemeen", [
        ["Beroep", "HR-medewerker bij een logistiek bedrijf"],
        ["Sport en hobby", "Lopen, 3× per week 10 km. Zingt in een koor."],
        ["Lengte / gewicht", "1,68 m / 61 kg, gewicht stabiel"],
        ["Leeftijd", "32 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["IBS-SSS", "320 (0 tot 500, lager = beter)"],
      ]],
    ],
  },
  {
    title: "Maag en slokdarm",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Zuurbranden en zuur oprispen na het eten en bij platliggen, sinds 6 maanden"],
      ]],
      ["Aard van de klachten", [
        ["Frequentie", "4 à 5 avonden per week"],
      ]],
      ["Rode vlaggen", [
        ["Slikklachten / gewichtsverlies / zwarte stoelgang", "Nee / nee / nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Pantoprazol 20 mg via de huisarts, helpt goed, klachten terug bij stoppen"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Vrachtwagenchauffeur / 45 jaar"],
      ]],
    ],
  },
  {
    title: "Lever",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Verhoogde leverwaarden bij een routinebloedname van de huisarts"],
      ]],
      ["Klachten", [
        ["Moeheid / geelzucht / jeuk", "Wat moe / nee / nee"],
      ]],
      ["Leefstijl", [
        ["Alcohol", "1 à 2 glazen per dag"],
        ["Lengte / gewicht", "1,76 m / 94 kg"],
      ]],
      ["Medische achtergrond", [
        ["Andere aandoeningen", "Diabetes type 2, hoge bloeddruk"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Zaakvoerder / 52 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts denkt dat ik een prikkelbare darm heb. Kan ik een afspraak krijgen bij de gastro-enteroloog?",
  "Vervelend om te horen. Wordt de buikpijn minder nadat u naar het toilet bent geweest?",
  "Ja, meestal wel.",
  "Heeft u bloed of zwarte stoelgang gezien, bent u ongewild afgevallen, of wordt u 's nachts wakker van diarree?",
  "Nee, dat niet.",
  "Dank u. Ik plan u in op de raadpleging darm en stuur u een korte vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak ingepland op de raadpleging darm: buikpijn die beter wordt na de stoelgang, geen alarmsymptomen";

export const SCRIBE_CHAT = [
  "Ik druk even op uw buik. Zeg maar waar het gevoelig is.",
  "Hier links onderaan. Na de stoelgang is het meestal weg.",
  "Uw bloedname en het stoelgangonderzoek zijn normaal. Een coloscopie is niet nodig.",
  "Dus het is niets ernstigs? Ik dacht echt dat er iets mis was."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Krampende buikpijn linksonder sinds negen maanden, begonnen na een buikgriep. Verwezen door dr. Claes met de vraag naar PDS. Pijn 3 à 4 dagen per week, 7/10 tijdens een kramp, beter na de stoelgang. Wisselend stoelgangpatroon: diarree (Bristol 6, tot 4× per dag, aandrang 's ochtends) afgewisseld met harde stoelgang (Bristol 1 tot 2). Opgeblazen buik 's avonds, soms slijm, nooit bloed. Erger bij stress en bepaalde voeding. Lactosevrij dieet en probiotica zonder effect. Geen gewichtsverlies, geen nachtelijke klachten, pijn niet cyclisch. Geen darmkanker, IBD of coeliakie in de familie. Lansoprazol 15 mg sinds een jaar. Geen bloedverdunners."
  ],
  [
    "Klinisch onderzoek",
    "Goede algemene indruk, 61 kg. Abdomen soepel, normale peristaltiek. Lichte diffuse drukpijn linkerfossa iliaca, geen weerstand, geen loslaatpijn, geen massa, geen hepatosplenomegalie."
  ],
  [
    "Aanvullende onderzoeken",
    "Labo huisarts: hemoglobine 13,4 g/dl, CRP < 1 mg/l, ferritine 38 µg/l, TSH normaal. Calprotectine 32 µg/g. Coeliakieserologie (tTG-IgA met totaal IgA) aangevraagd."
  ],
  [
    "Diagnose",
    "Prikkelbaredarmsyndroom met wisselend stoelgangpatroon (PDS-M) volgens Rome IV, mogelijk post-infectieus. Geen alarmsymptomen."
  ],
  [
    "Beleid",
    "Uitleg over PDS en de darm-brein-as. Geen coloscopie aangewezen. Low-FODMAP-dieet onder begeleiding van een diëtist: 6 weken eliminatie, daarna herintroductie. Psyllium 1 zakje per dag, langzaam opbouwen. Mebeverine 200 mg 2× per dag bij krampen, in plaats van Buscopan. Imodium enkel bij nood. Lansoprazol afbouwen in overleg met de huisarts. Herevaluatie na 3 maanden; bij onvoldoende effect neuromodulator of darmgerichte psychotherapie bespreken. Vangnet: contact bij bloed of zwarte stoelgang, gewichtsverlies, nachtelijke diarree of koorts. Opvolging met IBS-SSS."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Gastro-enterologie, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift",
    "Mebeverine 200 mg en psyllium",
    "Gegenereerd"
  ],
  [
    "Labo-aanvraag",
    "Coeliakieserologie (tTG-IgA met totaal IgA)",
    "Gegenereerd"
  ],
  [
    "Verwijzing diëtist",
    "Low-FODMAP-dieet onder begeleiding",
    "Nog niet gegenereerd"
  ],
  [
    "Uitleg voor de patiënt",
    "Wat PDS is, het dieet in drie fasen en wanneer contact opnemen",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Sigma voor krampende buikpijn en een wisselend stoelgangpatroon sinds negen maanden. Er zijn geen alarmsymptomen en de calprotectine is normaal; het beeld past bij een prikkelbaredarmsyndroom volgens Rome IV. We starten een low-FODMAP-dieet onder begeleiding en herevalueren over drie maanden.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënte Eva Sigma, geboren op 9 februari 1994, die ik recent op consultatie zag.",
  "REDEN VOOR CONTACT Verwezen met de vraag naar prikkelbaredarmsyndroom. Krampende buikpijn en een wisselend stoelgangpatroon sinds negen maanden.",
  "ANAMNESE Krampende buikpijn linksonder, drie à vier dagen per week, die verbetert na de stoelgang. Afwisselend diarree (Bristol 6, tot vier keer per dag, met aandrang 's ochtends) en enkele dagen harde stoelgang (Bristol 1 tot 2). Opgeblazen buik 's avonds, soms slijm, nooit bloed. Begonnen na een buikgriep in februari. Erger bij stress, boterhammen, uien en look. Geen gewichtsverlies, geen nachtelijke klachten, pijn niet cyclisch. Lactosevrij dieet en probiotica zonder effect. Neemt Buscopan en Imodium bij nood, daarnaast sinds een jaar lansoprazol 15 mg en Microgynon 30. Geen darmkanker, chronische darmontsteking of coeliakie in de familie. Geen allergieën. Ze loopt sinds de zomer geen wedstrijden meer en vermijdt etentjes uit angst voor aandrang.",
  "KLINISCH ONDERZOEK Goede algemene indruk, 61 kg. Soepel abdomen met normale peristaltiek. Lichte diffuse drukpijn in de linkerfossa iliaca, geen weerstand, geen massa, geen hepatosplenomegalie.",
  "AANVULLENDE ONDERZOEKEN Uw labo: hemoglobine, CRP, ferritine en TSH normaal. Calprotectine 32 µg/g. Coeliakieserologie aangevraagd.",
  "DIAGNOSE Prikkelbaredarmsyndroom met wisselend stoelgangpatroon (PDS-M) volgens de Rome IV-criteria, mogelijk post-infectieus. Geen alarmsymptomen.",
  "BELEID Een coloscopie is niet aangewezen. Eva start een low-FODMAP-dieet onder begeleiding van een diëtist, met psyllium en mebeverine 200 mg tweemaal daags bij krampen. Imodium enkel bij nood. Graag bouwen we samen de lansoprazol af; bij terugkerend zuurbranden kan ze die opnieuw nemen. Bij een positieve coeliakieserologie volgt een gastroscopie met biopsieën. Herevaluatie over drie maanden, met opvolging via de IBS-SSS. Bij onvoldoende effect bespreken we een laag gedoseerde neuromodulator of darmgerichte psychotherapie. Ze weet dat ze contact opneemt bij bloed bij de stoelgang, zwarte stoelgang, gewichtsverlies, nachtelijke diarree of koorts.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, gastro-enteroloog"
];

export const FOLLOW_ROWS = [
  [
    "P. Haustra",
    "Coloscopie met poliepectomie · dag 2"
  ],
  [
    "E. Sigma",
    "PDS, dieet + medicatie · week 6 · IBS-SSS ingevuld"
  ],
  [
    "I. Ileum",
    "Ziekte van Crohn, biologische therapie · maand 6"
  ],
  [
    "F. Fundus",
    "Reflux, maagzuurremmer · maand 3"
  ]
];

export const FOLLOW_ALERT = "Meldt helderrood bloed bij de stoelgang en toenemende buikpijn, twee dagen na een coloscopie met poliepectomie. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw buik sinds u het dieet volgt?",
  "Veel rustiger. Brood blijkt de grote boosdoener. Het dieet was zwaar in het begin.",
  "Fijn om te horen. Is er iets dat nog niet lukt?",
  "Ik ben weer gaan lopen, alleen durf ik nog geen wedstrijd.",
  "Heeft u bloed of zwarte stoelgang gezien, bent u afgevallen, of wordt u 's nachts wakker van diarree?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "IBS-SSS (0 tot 500, lager = beter)",
    "320",
    "210"
  ],
  [
    "Buikpijn (NRS 0 tot 10, lager = beter)",
    "7",
    "4"
  ],
  [
    "Dagen met pijn per week",
    "3 à 4",
    "2"
  ],
  [
    "Stoelgang (Bristol)",
    "Wisselend 1 tot 6",
    "Meestal 4 à 5"
  ],
  [
    "Imodium",
    "2 à 3× per week",
    "1× in 6 weken"
  ],
  [
    "Werk",
    "Vermijdt vergaderingen 's ochtends",
    "Gewoon"
  ],
  [
    "Lopen",
    "Geen wedstrijden meer",
    "Weer 3× per week"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Dieet + medicatie (Eva)",
    "Week 6",
    "Opvolging PDS, einde eliminatiefase",
    "IBS-SSS, stoelgang (Bristol, frequentie), effect van het dieet, mebeverine, Imodium-gebruik, werk, sport, open vragen, rode vlaggen"
  ],
  [
    "Dieet + medicatie (Eva)",
    "Maand 3 en 12",
    "Opvolging PDS + welzijn",
    "Idem, aangevuld met IBS-QOL en EQ-5D-5L"
  ],
  [
    "Neuromodulator (amitriptyline 10 mg)",
    "Week 2",
    "Start neuromodulator",
    "Sufheid, droge mond, constipatie, inname 's avonds"
  ],
  [
    "Neuromodulator (amitriptyline 10 mg)",
    "Week 8",
    "Effect neuromodulator",
    "IBS-SSS, dagen met pijn, slaap, verder of stoppen"
  ],
  [
    "Coloscopie",
    "Dag vóór",
    "Voorbereiding coloscopie",
    "Laxativum gestart, restenarm dieet, bloedverdunners volgens schema gestopt, vervoer geregeld"
  ],
  [
    "Coloscopie",
    "Dag 2",
    "Controle na coloscopie",
    "Buikpijn, bloed bij de stoelgang, koorts"
  ],
  [
    "Coloscopie",
    "Na het resultaat",
    "Ervaring coloscopie",
    "Uitleg over het resultaat begrepen, voorbereiding, PREM"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest hij later voor een neuromodulator of een coloscopie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De lansoprazol was ik vergeten, die kreeg ik vorig jaar van de huisarts voor zuurbranden.",
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
    "header": "Apotheek De Zwaan · Medicatieschema · E. Sigma, ° 09-02-1994",
    "rows": [
      [
        "Buscopan 10 mg omhulde tabletten",
        "1 tablet bij krampen, max. 3× per dag"
      ],
      [
        "Imodium 2 mg harde capsules",
        "1 capsule na een losse stoelgang, max. 6 per dag"
      ],
      [
        "Lansoprazole EG 15 mg maagsapresistente capsules",
        "1 capsule 's ochtends, vóór het ontbijt"
      ],
      [
        "Microgynon 30 omhulde tabletten",
        "1 tablet per dag, 21 dagen, 7 dagen stop"
      ]
    ]
  },
  "meds": [
    {
      "name": "Buscopan",
      "substance": "Butylscopolamine",
      "strength": "10 mg",
      "form": "Omhulde tablet",
      "frequency": "Bij krampen, max. 3× per dag",
      "indication": "Buikkrampen",
      "source": "Foto in chat",
      "chatLabel": "Buscopan 10 mg · bij krampen, max. 3× per dag"
    },
    {
      "name": "Imodium",
      "substance": "Loperamide",
      "strength": "2 mg",
      "form": "Capsule",
      "frequency": "Na een losse stoelgang, max. 6 per dag",
      "indication": "Diarree",
      "source": "Foto in chat",
      "chatLabel": "Imodium 2 mg · na een losse stoelgang, max. 6 per dag"
    },
    {
      "name": "Lansoprazole EG",
      "substance": "Lansoprazol",
      "strength": "15 mg",
      "form": "Maagsapresistente capsule",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Zuurbranden",
      "source": "Foto in chat",
      "chatLabel": "Lansoprazol 15 mg · 1× per dag ’s ochtends",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "Microgynon 30",
      "substance": "Ethinylestradiol + levonorgestrel",
      "strength": "0,03 mg / 0,15 mg",
      "form": "Omhulde tablet",
      "frequency": "1× per dag, 21 dagen",
      "indication": "Anticonceptie",
      "source": "Foto in chat",
      "chatLabel": "Microgynon 30 · 1× per dag"
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Maagzuurremmer",
      "value": "Lansoprazol, sinds een jaar dagelijks: indicatie herbekijken",
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
