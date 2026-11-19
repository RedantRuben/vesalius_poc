import type { MedicationCopy } from './medication';

// Fictional dermatology examples from the Dutch content brief.

export const TRIAGE_ROWS = [
  {"name": "M. Melanocyt", "initials": "MM", "channel": "telefoon", "summary": "Moedervlek op de rug, in drie maanden groter en donkerder, bloedt soms", "referral": "Voorrang", "tasks": 1},
  {"name": "K. Dermis", "initials": "KD", "channel": "chat", "summary": "Psoriasis sinds 22 jaar, erger, na zalven, lichttherapie en methotrexaat", "referral": "Inflammatoir", "tasks": 0},
  {"name": "A. Synovia", "initials": "AS", "channel": "chat", "summary": "Psoriasis met gezwollen vingers en ochtendstijfheid van een uur", "referral": "Reumatologie", "tasks": 0},
  {"name": "L. Stratum", "initials": "LS", "channel": "telefoon", "summary": "Handeczeem bij kapster, beter tijdens de vakantie", "referral": "Allergologie", "tasks": 0},
  {"name": "S. Keratose", "initials": "SK", "channel": "chat", "summary": "Bruine, ruwe plekjes op de rug, al jaren onveranderd → gewone plaats", "referral": "Geen rode vlag", "tasks": 0},
];

export const TRIAGE_ALERT = "Moedervlek die in drie maanden groter en donkerder werd en soms bloedt. Secretariaat plant met voorrang in.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1, "name": "S. Keratose", "initials": "SK", "reason": "Nieuwe patiënt · plekjes op de rug"},
  {"room": 1, "slot": 1, "length": 1, "name": "M. Melanocyt", "initials": "MM", "reason": "Voorrang · moedervlek die snel veranderde"},
  {"room": 1, "slot": 2, "length": 1, "name": "R. Epidermis", "initials": "RE", "reason": "Controle biological"},
  {"room": 2, "slot": 0, "length": 2, "name": "K. Dermis", "initials": "KD", "reason": "Nieuwe patiënt · psoriasis, systemische therapie"},
  {"room": 3, "slot": 1, "length": 1, "name": "U. Corneum", "initials": "UC", "reason": "Lichttherapie · sessie 12"},
  {"room": 3, "slot": 3, "length": 1, "name": "B. Basalis", "initials": "BB", "reason": "Excisie basaalcelcarcinoom neus"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Ik heb psoriasis sinds mijn 22e, maar het laatste jaar is het veel erger. De zalven helpen niet meer.",
  "Waar op uw lichaam heeft u plekken?",
  "Hoofdhuid, ellebogen, knieën, onderrug en mijn nagels.",
  "Hoe erg was de jeuk de afgelopen week, op 10?",
  "Een 6. 's Nachts word ik er wakker van.",
  "Wilt u een foto sturen van de plekken die u het meeste last geven? Dat helpt de arts om uw bezoek voor te bereiden.",
  "(3 foto's in de chat: ellebogen, hoofdhuid, vingernagels)",
  "Dank u, de foto's zitten bij uw dossier. Heeft u pijnlijke of gezwollen gewrichten, of is een vinger of teen soms helemaal gezwollen?",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Psoriasis",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Plaquepsoriasis die niet meer onder controle is. Verwezen door de huisarts voor verdere behandeling."],
        ["Duur", "Sinds zijn 22e, erger sinds 14 maanden"],
      ]],
      ["Huid", [
        ["Lokalisatie", "Hoofdhuid tot achter de oren, ellebogen, knieën, onderrug, bilnaad, vingernagels. 3 foto's in de chat (ellebogen, hoofdhuid, vingernagels)"],
        ["Jeuk", "6/10, 's nachts erger, 2 à 3 nachten per week wakker"],
        ["Uitlokkend", "Stress, winter, krabben"],
        ["Verlichtend", "Zon in de zomervakantie, zalven tijdelijk"],
      ]],
      ["Eerdere behandelingen", [
        ["Lokaal", "Daivobet, nu Enstilar en Xamiol: onvoldoende"],
        ["Lichttherapie", "UVB-nb in 2023, 30 sessies: bijna gaaf, recidief na 4 maanden"],
        ["Systemisch", "Methotrexaat 15 mg/week, december 2025 tot juni 2026: matig effect, misselijkheid, gestegen leverwaarden, gestopt"],
      ]],
      ["Gewrichten", [
        ["PEST", "1 (putjes in de nagels). Geen gezwollen gewrichten, vingers of tenen, geen hielpijn"],
      ]],
      ["Screening", [
        ["Infecties en voorgeschiedenis", "Nooit tuberculose of contact ermee, geen hepatitis, geen recidiverende infecties, geen kanker, geen hartfalen, geen darmziekte"],
        ["Vaccinaties", "Tetanus 2019, geen griepvaccin"],
      ]],
      ["Rode vlaggen", [
        ["Koorts, uitgebreide roodheid, pustels", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Voorgeschiedenis", "Hypertensie sinds 14 maanden. Knieartroscopie links, 2016"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Vader psoriasis, moeder diabetes type 2"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "10 sigaretten per dag / 8 à 10 glazen per week"],
      ]],
      ["Welzijn", [
        ["Impact", "Draagt geen korte broek meer in de les, geeft geen zwemles meer, vermijdt het zwembad"],
      ]],
      ["Algemeen", [
        ["Beroep", "Leerkracht lichamelijke opvoeding"],
        ["Sport en hobby", "Padel 2× per week. Zwom vroeger wekelijks. Koken."],
        ["Lengte / gewicht", "1,84 m / 96 kg"],
        ["Leeftijd", "44 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["DLQI (0 tot 30, lager = beter)", "18"],
      ]],
    ],
  },
  {
    title: "Eczeem",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Rode, schilferende handen met kloven, sinds 8 maanden"],
      ]],
      ["Huid", [
        ["Lokalisatie", "Rug van beide handen en tussen de vingers"],
        ["Verloop", "Beter tijdens de vakantie, erger na een werkweek"],
        ["Jeuk", "7/10"],
      ]],
      ["Medische achtergrond", [
        ["Atopie", "Hooikoorts als kind"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Kapster / 38 jaar"],
      ]],
    ],
  },
  {
    title: "Huidletsels",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Moedervlek op de rug die veranderd is, opgemerkt door partner"],
      ]],
      ["Letsel", [
        ["Verandering", "In drie maanden groter en donkerder, rand onregelmatig"],
        ["Bloeden", "Soms, na het afdrogen"],
      ]],
      ["Risico", [
        ["Zonverbranding", "Vaak verbrand als kind, zonnebank in zijn twintiger jaren"],
        ["Familie", "Zus melanoom op 50"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Dakwerker / 58 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts stuurt me door voor mijn psoriasis. De zalven werken niet meer. Kan ik een afspraak krijgen bij de dermatoloog?",
  "Vervelend om te horen. Heeft u al lichttherapie of een behandeling met tabletten of injecties gehad?",
  "Ja, lichttherapie en daarna methotrexaat. Dat heb ik moeten stoppen.",
  "Heeft u op dit moment koorts, of is uw huid plots over bijna heel uw lichaam rood?",
  "Nee, dat niet.",
  "Dank u. Ik plan u in op de raadpleging voor psoriasis en stuur u een korte vragenlijst om uw bezoek voor te bereiden.",
];

export const VOICE_TASK = "Afspraak ingepland op de raadpleging inflammatoire huidziekten: psoriasis na lichttherapie en methotrexaat, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Mag ik uw handen even zien? Die putjes in uw nagels, heeft u die al lang?",
  "Een paar jaar. Ik dacht dat dat van het sporten kwam.",
  "En doen uw vingers of hielen 's ochtends soms pijn, of zijn ze stijf?",
  "Nee, dat niet. Het is vooral de jeuk, en dat iedereen kijkt in de les.",
];

export const SCRIBE_NOTE = [
  ["Anamnese", "Plaquepsoriasis sinds zijn 22e, duidelijk erger sinds 14 maanden. Verwezen door dr. Claes. Jeuk 6/10, 's nachts wakker. Lokaal: Enstilar en Xamiol, onvoldoende. UVB-nb 2023: recidief na 4 maanden. Methotrexaat 15 mg/week december 2025 tot juni 2026: matig effect, misselijkheid, ALT 2,5× de bovengrens, gestopt. Geen gewrichtsklachten (PEST 1). Hypertensie onder bisoprolol sinds 14 maanden. Rookt 10 sigaretten per dag. Vader psoriasis. Geen bloedverdunners, geen allergieën."],
  ["Klinisch onderzoek", "Scherp begrensde erythematosquameuze plaques op beide ellebogen en knieën (tot 8 cm), lumbosacraal en in de bilnaad. Dikke schilfering van de hoofdhuid tot over de haargrens en achter beide oren. Putjes op 6 vingernagels, distale onycholyse op 2. Geen pustels, geen erytrodermie, handpalmen en voetzolen vrij. Geen synovitis, geen dactylitis, geen drukpijn aan de achillespezen."],
  ["Scores", "PASI 16,4 (0 tot 72, lager = beter). BSA 14%. sPGA 3. DLQI 18 (ingevuld bij de intake)."],
  ["Aanvullende onderzoeken", "Screening vóór biological aangevraagd: bloedbeeld, lever- en nierfunctie, CRP, hepatitis B en C, hiv, Quantiferon, RX thorax."],
  ["Diagnose", "Matig-ernstige chronische plaquepsoriasis met nagelpsoriasis, na falen van lokale therapie, UVB-nb en methotrexaat. Geen aanwijzingen voor artritis psoriatica."],
  ["Beleid", "Start risankizumab 150 mg subcutaan op week 0 en 4, daarna elke 12 weken, na goedkeuring van de terugbetaling. Lokale therapie verder op restletsels. Overleg huisarts om bisoprolol te vervangen. Griepvaccin vóór de start, rookstop en gewicht besproken. Herevaluatie week 16 met PASI en DLQI. Vangnet: dezelfde dag contact bij koorts of een ernstige infectie, dringend bij een huid die over het hele lichaam rood wordt of bij pustels."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon Dermatologie, voor het patiëntendossier", "Gegenereerd"],
  ["Brief aan de huisarts", "Bevindingen, diagnose en beleid voor de verwijzer", "Gegenereerd"],
  ["Aanvraag tot terugbetaling biological", "PASI, BSA, DLQI en eerdere behandelingen uit het dossier", "Gegenereerd"],
  ["Aanvraag screening", "Bloedbeeld, lever- en nierfunctie, hepatitis, hiv, Quantiferon, RX thorax", "Gegenereerd"],
  ["Uitleg voor de patiënt", "De injecties, infecties en vaccinaties, en wanneer contact opnemen", "Nog niet gegenereerd"],
  ["Voorschrift biological", "Na goedkeuring van de terugbetaling", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Dermis voor plaquepsoriasis die onvoldoende onder controle is, ondanks lokale therapie, lichttherapie en methotrexaat. De PASI bedraagt 16,4 en de DLQI 18. We starten een biological na goedkeuring van de terugbetaling en herevalueren op week 16.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Koen Dermis, geboren op 12 juni 1982, die ik recent op de raadpleging zag.",
  "REDEN VOOR CONTACT Verwezen wegens plaquepsoriasis die onvoldoende onder controle is, ondanks lokale therapie, lichttherapie en methotrexaat.",
  "ANAMNESE Psoriasis sinds zijn 22e, duidelijk erger sinds ongeveer 14 maanden. Plekken op hoofdhuid, ellebogen, knieën, onderrug en bilnaad, met nagelafwijkingen. Jeuk 6 op 10, 's nachts wakker. UVB-nb in 2023 gaf een recidief na vier maanden. Methotrexaat 15 mg per week van december 2025 tot juni 2026: matige verbetering, misselijkheid en een ALT tot 2,5 keer de bovengrens, daarom gestopt. Geen gewrichtsklachten (PEST 1). Hypertensie onder bisoprolol 5 mg sinds 14 maanden. Rookt 10 sigaretten per dag. Vader had psoriasis. Geen allergieën, geen bloedverdunners. Zijn DLQI is 18: hij draagt geen korte broek meer in de les en zwemt niet meer.",
  "KLINISCH ONDERZOEK Scherp begrensde erythematosquameuze plaques op ellebogen, knieën, lumbosacraal en in de bilnaad. Uitgebreide schilfering van de hoofdhuid. Putjes op zes vingernagels, onycholyse op twee. Geen pustels, geen erytrodermie. Geen synovitis of dactylitis. PASI 16,4, BSA 14%, sPGA 3.",
  "AANVULLENDE ONDERZOEKEN Screening vóór biological: bloedbeeld, lever- en nierfunctie normaal, hepatitis B en C en hiv negatief, Quantiferon negatief, RX thorax zonder afwijkingen.",
  "DIAGNOSE Matig-ernstige chronische plaquepsoriasis met nagelpsoriasis, na falen van lokale therapie, UVB-nb en methotrexaat. Geen aanwijzingen voor artritis psoriatica.",
  "BELEID We starten risankizumab 150 mg subcutaan op week 0 en week 4, daarna elke twaalf weken, na goedkeuring van de terugbetaling. De lokale therapie loopt verder op restletsels. Bètablokkers kunnen psoriasis verergeren: graag uw overweging om bisoprolol te vervangen door een ander antihypertensivum. Koen krijgt vóór de start een griepvaccin; rookstop en gewicht zijn besproken. Herevaluatie op week 16. Hij weet dat hij dezelfde dag contact opneemt bij koorts of een ernstige infectie, en dringend bij een huid die plots over het hele lichaam rood wordt of bij pustels.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, dermatoloog",
];

export const FOLLOW_ROWS = [
  ["R. Epidermis", "Biological (adalimumab) · maand 6"],
  ["K. Dermis", "Biological · week 16 · DLQI ingevuld"],
  ["U. Corneum", "Lichttherapie · na 30 sessies"],
  ["F. Follikel", "Methotrexaat · week 2"],
];

export const FOLLOW_ALERT = "Meldt koorts (38,6 °C) en hoest sinds drie dagen, onder adalimumab. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw huid sinds de start van de injecties?",
  "Veel beter. Op mijn ellebogen zie je bijna niets meer, alleen mijn nagels zijn nog niet mooi.",
  "Fijn om te horen. Is er iets wat u nu weer doet en eerst niet meer?",
  "Ik heb voor het eerst in jaren weer in korte broek lesgegeven. De leerlingen hadden niets door, ik wel.",
  "Heeft u de afgelopen weken koorts gehad, of een infectie waarvoor u naar de huisarts moest?",
  "Een verkoudheid, maar geen koorts.",
];

export const FOLLOW_SCORES = [
  ["DLQI (0 tot 30, lager = beter)", "18", "9", "2"],
  ["NRS jeuk (0 tot 10, lager = beter)", "6", "3", "1"],
  ["PASI, door de arts gescoord (0 tot 72, lager = beter)", "16,4", "–", "1,4"],
  ["Slaap", "2 à 3 nachten per week wakker van jeuk", "1 nacht per week", "Slaapt door"],
  ["Werk", "Geen korte broek, geen zwemles", "Idem", "Weer in korte broek"],
  ["Sport", "Padel, zwemt niet meer", "Padel", "Padel, zwemmen gepland"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Lokale therapie", "Week 6", "Opvolging lokale therapie", "Gebruik en hoeveelheid, irritatie, DLQI, NRS jeuk"],
  ["Lichttherapie (UVB-nb)", "Na 10 sessies", "Controle lichttherapie", "Roodheid, branderigheid, gemiste sessies"],
  ["Lichttherapie (UVB-nb)", "Na 30 sessies", "Effect lichttherapie", "DLQI, NRS jeuk, tevredenheid"],
  ["Methotrexaat", "Week 2", "Start methotrexaat", "Misselijkheid, foliumzuur genomen, aften, infecties"],
  ["Methotrexaat", "Maand 1, 2 en 3", "Bloedcontrole en effect", "Herinnering bloedafname, bijwerkingen; maand 3 ook DLQI"],
  ["Biological (Koen)", "Vóór elke injectie", "Check vóór injectie", "Koorts of infectie, geplande ingreep, vaccinatie"],
  ["Biological (Koen)", "Week 4", "Tweede injectie", "Injectieplaats, infecties, DLQI, NRS jeuk"],
  ["Biological (Koen)", "Week 16", "Effect biological", "DLQI, NRS jeuk, slaap, werk, sport, infecties, open vragen"],
  ["Biological (Koen)", "Maand 12", "Opvolging + welzijn", "DLQI, EQ-5D-5L, gewrichtsklachten (PEST), tevredenheid, PREM"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Krijgt een patiënt lichttherapie of methotrexaat, dan schakelt de opvolging mee.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen of gebruikt u zalven? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de verpakkingen.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De bisoprolol was ik vergeten, die is van de huisarts voor mijn bloeddruk.",
  "followUp": {
    "question": "Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
    "choices": [
      "Ja",
      "Nee"
    ],
    "answer": "Nee"
  },
  "schedule": {
    "header": "Apotheek Sint-Jan · Medicatieschema · K. Dermis, ° 12-06-1982",
    "rows": [
      [
        "Enstilar 50 µg/g + 0,5 mg/g schuim voor cutaan gebruik",
        "1× per dag op de plekken, 4 weken; daarna 2× per week"
      ],
      [
        "Xamiol 50 µg/g + 0,5 mg/g gel",
        "1× per dag op de hoofdhuid"
      ],
      [
        "Bisoprolol EG 5 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Dexeryl crème",
        "2× per dag op de huid"
      ]
    ]
  },
  "meds": [
    {
      "name": "Enstilar",
      "substance": "Calcipotriol + betamethason",
      "strength": "50 µg/g + 0,5 mg/g",
      "form": "Schuim, cutaan",
      "frequency": "1× per dag, daarna 2× per week",
      "indication": "Psoriasis (lichaam)",
      "source": "Foto in chat",
      "chatLabel": "Enstilar schuim · 1× per dag op de plekken"
    },
    {
      "name": "Xamiol",
      "substance": "Calcipotriol + betamethason",
      "strength": "50 µg/g + 0,5 mg/g",
      "form": "Gel, cutaan",
      "frequency": "1× per dag",
      "indication": "Psoriasis (hoofdhuid)",
      "source": "Foto in chat",
      "chatLabel": "Xamiol gel · 1× per dag op de hoofdhuid"
    },
    {
      "name": "Bisoprolol EG",
      "substance": "Bisoprolol",
      "strength": "5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hypertensie",
      "source": "Foto in chat",
      "chatLabel": "Bisoprolol 5 mg · 1× per dag 's ochtends",
      "tag": {
        "label": "Let op: bètablokker",
        "tone": "amber"
      }
    },
    {
      "name": "Dexeryl",
      "substance": "Glycerol + vaseline + paraffine",
      "strength": "–",
      "form": "Crème",
      "frequency": "2× per dag",
      "indication": "Droge huid (verzorging)",
      "source": "Foto in chat",
      "chatLabel": "Dexeryl crème · 2× per dag"
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
      "value": "Bètablokker (bisoprolol): kan psoriasis verergeren",
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
