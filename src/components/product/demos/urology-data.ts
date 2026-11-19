import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {"name": "R. Etentio", "initials": "RE", "channel": "telefoon", "summary": "Sinds vanochtend niet meer kunnen plassen, pijnlijke onderbuik", "referral": "Spoed", "tasks": 1},
  {"name": "P. Prostata", "initials": "PP", "channel": "chat", "summary": "Zwakke straal, 's nachts 3× op, plassen lukt, geen koorts, PSA normaal", "referral": "Plasklachten", "tasks": 0},
  {"name": "V. Esicula", "initials": "VE", "channel": "chat", "summary": "PSA 7,8 ng/ml bij de huisarts, geen klachten · voorrang", "referral": "Uro-oncologie", "tasks": 0},
  {"name": "U. Reter", "initials": "UR", "channel": "telefoon", "summary": "Koliekpijn in de linkerflank, gekende nierstenen, geen koorts", "referral": "Endo-urologie", "tasks": 0},
  {"name": "L. Evator", "initials": "LE", "channel": "chat", "summary": "Urineverlies bij hoesten, verzakkingsgevoel", "referral": "Bekkenbodem", "tasks": 0},
  {"name": "S. Eminalis", "initials": "SE", "channel": "chat", "summary": "Eenmalig bloed in het sperma, 36 jaar, verder geen klachten → gewone plaats", "referral": "Geen rode vlag", "tasks": 0, "status": "IN_PROGRESS" as const},
];

export const TRIAGE_ALERT = "Kan sinds vanochtend niet meer plassen, pijnlijke onderbuik. Gevraagd meteen naar spoedgevallen te gaan. Secretariaat is verwittigd.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1, "name": "D. Etrusor", "initials": "DE", "reason": "Wissel verblijfssonde"},
  {"room": 1, "slot": 1, "length": 1, "name": "R. Etentio", "initials": "RE", "reason": "Dringend · na retentie op spoed, sonde geplaatst"},
  {"room": 1, "slot": 2, "length": 1, "name": "S. Eminalis", "initials": "SE", "reason": "Nieuwe patiënt · bloed in het sperma"},
  {"room": 2, "slot": 0, "length": 2, "name": "P. Prostata", "initials": "PP", "reason": "Nieuwe patiënt · plasklachten, flow en residu"},
  {"room": 3, "slot": 1, "length": 1, "name": "M. Eatus", "initials": "ME", "reason": "Controle na HoLEP, maand 3"},
  {"room": 3, "slot": 3, "length": 1, "name": "N. Ephros", "initials": "NE", "reason": "Echo-controle nier"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Al meer dan een jaar een zwakke straal. Het komt moeilijk op gang en het druppelt na. 's Nachts moet ik drie keer op.",
  "Heeft u soms zo'n dringende aandrang dat u het niet kunt ophouden? En verliest u weleens urine?",
  "Aandrang soms, maar ik verlies nooit urine.",
  "Dank u. Wilt u de komende drie dagen een plasdagboek bijhouden? Ik stuur u telkens een berichtje: hoe laat, hoeveel u plast en wat u drinkt.",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Plasklachten",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Zwakke straal, moeilijk op gang komen, nadruppelen, gevoel van onvolledige lediging. Onvoldoende effect van tamsulosine volgens de huisarts."],
        ["Duur", "Ruim een jaar, geleidelijk erger"],
      ]],
      ["Plasklachten", [
        ["Overdag", "Om de 1,5 à 2 uur, soms dringend"],
        ["'s Nachts", "3 keer, soms 4"],
        ["Urineverlies", "Nee"],
        ["Ooit niet kunnen plassen of een sonde", "Nee"],
      ]],
      ["Rode vlaggen", [
        ["Koorts, bloed in de urine", "Nee / nooit gezien"],
        ["Urineweginfecties, nierstenen", "Nee"],
      ]],
      ["PSA", [
        ["Laatste waarde", "2,1 ng/ml, 6 weken geleden (huisarts). Twee jaar geleden 1,8 ng/ml"],
      ]],
      ["Impact", [
        ["Dagelijks leven", "Moet tijdens het fietsen om de 15 km stoppen. Moe op het werk door onderbroken slaap"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Tamsulosine 0,4 mg sinds 2 maanden: straal iets beter, nachtelijk plassen onveranderd. Prostaserene van de drogist, geen effect"],
        ["Voorgeschiedenis", "Hoge bloeddruk, cholesterol. Geen diabetes, geen neurologische aandoening"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Vader prostaatoperatie op 72, geen prostaatkanker gekend"],
      ]],
      ["Seksuele functie", [
        ["Erectie en zaadlozing", "Normaal. Vindt het belangrijk dat dit zo blijft"],
      ]],
      ["Sociale anamnese", [
        ["Drinken", "±2,4 liter per dag, 3 tassen thee na het avondeten, wijn in het weekend"],
      ]],
      ["Algemeen", [
        ["Beroep", "Technisch tekenaar bij een studiebureau"],
        ["Sport en hobby", "Recreatief fietser, zondag 50 tot 70 km. Moestuin"],
        ["Lengte / gewicht", "1,78 m / 84 kg"],
        ["Leeftijd", "64 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["IPSS", "19 (0 tot 35, lager = beter) · levenskwaliteit 4 (0 tot 6, lager = beter)"],
      ]],
    ],
  },
  {
    title: "Stenen",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Koliekpijn in de linkerflank, uitstralend naar de lies, sinds 2 dagen"],
      ]],
      ["Aard van de pijn", [
        ["Pijnscore", "7/10, golvend"],
      ]],
      ["Rode vlaggen", [
        ["Koorts of rillingen", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere stenen", "Twee keer, laatste in 2023, spontaan uitgeplast"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Vrachtwagenchauffeur / 44 jaar"],
      ]],
    ],
  },
  {
    title: "Urineverlies",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Urineverlies bij hoesten, niezen en springen, sinds 2 jaar"],
      ]],
      ["Plasklachten", [
        ["Aandrang", "Zelden"],
      ]],
      ["Klachten", [
        ["Verzakkingsgevoel", "Ja, 's avonds een zwaar gevoel"],
      ]],
      ["Medische achtergrond", [
        ["Bevallingen", "3 vaginale bevallingen"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Kleuterjuf / 58 jaar"],
      ]],
    ],
  },
];

export const DIARY = [
  ["Plasbeurten overdag (7 tot 23 uur)", "9"],
  ["Plasbeurten 's nachts", "3"],
  ["Volume per plasbeurt", "120 tot 260 ml"],
  ["Totaal per 24 uur", "2.650 ml"],
  ["'s Nachts (incl. eerste ochtendplas)", "1.000 ml (38% van het totaal)"],
  ["Gedronken", "2.400 ml, waarvan 750 ml na 19 uur"],
];

export const VOICE_CHAT = [
  "Goeiedag, mijn huisarts stuurt me door voor mijn prostaat. Ik moet 's nachts zo vaak plassen. Kan ik een afspraak krijgen?",
  "Vervelend om te horen. Lukt het plassen op dit moment nog, en heeft u koorts of pijn in uw rug of zij?",
  "Plassen lukt, maar traag. Koorts heb ik niet.",
  "Heeft u ooit bloed in uw urine gezien? En weet u of er al een PSA-waarde bepaald is?",
  "Nooit bloed. De PSA was 2,1, zei de dokter.",
  "Dank u. Ik plan u in op de raadpleging plasklachten en stuur u een korte vragenlijst en een plasdagboek om uw bezoek voor te bereiden.",
];

export const VOICE_TASK = "Afspraak ingepland op de raadpleging plasklachten: zwakke straal en nachtelijk plassen, PSA 2,1 ng/ml, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Uw flow haalt maximaal 9 milliliter per seconde, en er blijft 90 milliliter in de blaas na het plassen.",
  "Is dat veel?",
  "Het past bij een vergrote prostaat. Wat opvalt in uw dagboek: meer dan een derde van uw urine maakt u 's nachts. Die bloeddrukpil neemt u 's avonds, hé?",
  "Ja, bij het avondeten. Samen met mijn thee.",
];

export const SCRIBE_NOTE = [
  ["Anamnese", "Zwakke straal, moeilijk op gang komen, nadruppelen en onvolledige lediging sinds ruim een jaar. Overdag om de 1,5 à 2 uur, nocturie 3×. Soms aandrang, geen urineverlies. Verwezen door dr. Claes wegens onvoldoende effect van tamsulosine 0,4 mg (sinds 2 maanden). Geen urineweginfecties, nooit hematurie, geen retentie. PSA 2,1 ng/ml. IPSS 19, levenskwaliteit 4. Plasdagboek: nachtelijke polyurie-index 38%, 750 ml vocht na 19 uur. Loortan Plus 's avonds. Geen bloedverdunners. Erectie en ejaculatie normaal."],
  ["Klinisch onderzoek", "Abdomen soepel, blaas niet palpabel. Uitwendig genitaal normaal. Rectaal toucher: prostaat vergroot, geschat 50 ml, glad, elastisch, symmetrisch, geen noduli, niet pijnlijk. Urinestick negatief."],
  ["Aanvullende onderzoeken", "Uroflowmetrie: Qmax 9 ml/s, uitgeplast volume 240 ml, afgeplatte curve. Residu 90 ml (bladderscan). Echografie: prostaatvolume 52 ml, blaaswand niet verdikt, geen hydronefrose. PSA-densiteit 0,04. Creatinine 0,94 mg/dl."],
  ["Diagnose", "Mictie- en opslagklachten door benigne prostaathyperplasie (52 ml), IPSS 19. Nachtelijke polyurie, mee door avondinname van hydrochloorthiazide en vochtinname na 19 uur."],
  ["Beleid", "Tamsulosine vervangen door Combodart 0,5 mg/0,4 mg 1× per dag, effect na 3 tot 6 maanden, uitleg bijwerkingen. Loortan Plus voortaan 's ochtends (overleg huisarts). Minder drinken na 19 uur, totaal niet minderen. Prostaserene mag stoppen. PSA halveert onder dutasteride: bij controle verdubbelen. Oogarts verwittigen bij een geplande cataractoperatie. Herevaluatie na 6 maanden met IPSS, dagboek, flow en residu, bij onvoldoende effect TURP of HoLEP bespreken. Vangnet: spoed bij niet meer kunnen plassen, zelfde dag bij koorts met pijn bij plassen, contact bij zichtbaar bloed in de urine."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon Urologie, voor het patiëntendossier", "Gegenereerd"],
  ["Brief aan de huisarts", "Bevindingen, diagnose en beleid voor de verwijzer", "Gegenereerd"],
  ["Voorschrift", "Combodart 0,5 mg/0,4 mg", "Gegenereerd"],
  ["Uitleg voor de patiënt", "Wat de medicatie doet, bijwerkingen, drinkadvies en wanneer dringend contact", "Nog niet gegenereerd"],
  ["Aanvraag controle", "Uroflowmetrie en residu na 6 maanden", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Prostata voor plasklachten met onvoldoende effect van tamsulosine. Flow en echo passen bij een goedaardig vergrote prostaat van 52 ml. Het plasdagboek toont daarnaast een nachtelijke polyurie, mee door de avondinname van zijn plastablet.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Paul Prostata, geboren op 22 juni 1962, die ik recent op de raadpleging plasklachten zag.",
  "REDEN VOOR CONTACT Verwezen wegens plasklachten met onvoldoende effect van tamsulosine.",
  "ANAMNESE Sinds ruim een jaar geleidelijk toenemend een zwakke straal, moeilijk op gang komen, nadruppelen en een gevoel van onvolledige lediging. Overdag om de anderhalf à twee uur plassen, 's nachts drie keer. Nooit urineverlies, geen urineweginfecties, nooit zichtbaar bloed. Sinds twee maanden tamsulosine 0,4 mg: straal iets beter, nachtelijk plassen onveranderd. IPSS 19, levenskwaliteit 4. Het plasdagboek van drie dagen toont een nachtelijke polyurie (index 38%); hij drinkt 750 ml na 19 uur en neemt Loortan Plus 's avonds. Gekend met hypertensie en hypercholesterolemie. Geen bloedverdunners. Erectie en zaadlozing normaal. Geen allergieën.",
  "KLINISCH ONDERZOEK Blaas niet palpabel. Rectaal toucher: prostaat vergroot, ongeveer 50 ml, glad, elastisch, symmetrisch, geen noduli. Urinestick negatief.",
  "AANVULLENDE ONDERZOEKEN Uroflowmetrie: Qmax 9 ml/s bij een uitgeplast volume van 240 ml, afgeplatte curve. Residu 90 ml. Echografie: prostaatvolume 52 ml, geen hydronefrose. PSA 2,1 ng/ml, creatinine normaal.",
  "DIAGNOSE Mictie- en opslagklachten door benigne prostaathyperplasie (52 ml), IPSS 19. Nachtelijke polyurie, mee door de avondinname van hydrochloorthiazide.",
  "BELEID We vervangen tamsulosine door Combodart 0,5 mg/0,4 mg eenmaal daags. Graag uw akkoord om Loortan Plus voortaan 's ochtends te laten innemen. Paul drinkt voortaan minder na 19 uur. Prostaserene mag stoppen. Let op: dutasteride halveert de PSA-waarde; bij een latere controle de waarde verdubbelen. Bij een geplande cataractoperatie graag de oogarts verwittigen. Herevaluatie over zes maanden met IPSS, flow en residu; bij onvoldoende effect bespreken we een ingreep. Hij weet dat hij naar spoedgevallen gaat als plassen niet meer lukt, en dezelfde dag contact opneemt bij koorts met pijn bij het plassen.",
  "Met vriendelijke groeten,",
  "Dr. Andreas Vesalius, uroloog",
];

export const FOLLOW_ROWS = [
  ["T. Rigonum", "TURP · week 2"],
  ["P. Prostata", "Medicatie · maand 6 · IPSS ingevuld"],
  ["M. Eatus", "HoLEP · maand 3"],
  ["D. Etrusor", "Verblijfssonde · week 6"],
];

export const FOLLOW_ALERT = "Meldt opnieuw bloed met stolsels in de urine en moeizaam plassen, elf dagen na de TURP. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe vaak moet u 's nachts nog op sinds uw vorige consult?",
  "Meestal maar één keer meer. Sinds ik die bloeddrukpil 's ochtends neem, slaap ik door tot vijf uur.",
  "Fijn om te horen. Merkt u bijwerkingen van de nieuwe medicatie?",
  "Minder zaad bij het vrijen. Dat had de dokter gezegd, dus dat valt mee.",
  "Heeft u koorts gehad, bloed in uw urine gezien, of kon u ooit niet plassen?",
  "Nee, niets van dat.",
];

export const FOLLOW_COMMENT = "Dat het die avondpil was, had ik nooit gedacht. Op de zondagsrit moet ik niet meer de eerste zijn die afstapt.";

export const FOLLOW_SCORES = [
  ["IPSS (0 tot 35, lager = beter)", "19", "10"],
  ["Levenskwaliteit IPSS (0 tot 6, lager = beter)", "4", "2"],
  ["Nocturie", "3× per nacht", "1× per nacht"],
  ["Slaap", "Onderbroken, moe op het werk", "Slaapt door tot 5 uur"],
  ["Werk", "Voltijds, moe", "Voltijds, uitgerust"],
  ["Fietsen", "Om de 15 km stoppen", "Rit van 60 km zonder stop"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Leefstijl en afwachten", "Maand 6 en 12", "Opvolging plasklachten", "IPSS, nocturie, drinkpatroon, ooit niet kunnen plassen, open vragen, rode vlaggen"],
  ["Medicatie (Paul)", "Week 6", "Start combinatietherapie", "Inname, duizeligheid bij opstaan, zaadlozing en libido, nocturie sinds de bloeddrukpil 's ochtends"],
  ["Medicatie (Paul)", "Maand 6", "Effect medicatie", "IPSS + levenskwaliteit, nocturie, plasdagboek, slaap, werk, fietsen, open vragen, rode vlaggen"],
  ["Medicatie (Paul)", "Maand 12", "Opvolging + welzijn", "Idem, aangevuld met EQ-5D-5L en PREM"],
  ["TURP of HoLEP", "Dag 2 na ontslag", "Controle na de ingreep", "Plassen lukt, bloed of stolsels, koorts, pijn"],
  ["TURP of HoLEP", "Week 2", "Herstel", "Late nabloeding, branderig plassen, aandrang"],
  ["TURP of HoLEP", "Week 6", "Continentie", "Urineverlies, aandrang, droge zaadlozing"],
  ["TURP of HoLEP", "Maand 3 en 12", "Uitkomst na de ingreep", "IPSS, EQ-5D-5L, tevredenheid, PREM"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest hij later voor een ingreep, dan schakelt de opvolging mee.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 3 geneesmiddelen gevonden:",
  "confirm": "Ja. En ik neem ook Prostaserene van de drogist, één capsule per dag.",
  "followUp": {
    "question": "Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto, Eliquis of Asaflow?",
    "choices": [
      "Ja",
      "Nee"
    ],
    "answer": "Nee"
  },
  "schedule": {
    "header": "Apotheek Het Kruispunt · Medicatieschema · P. Prostata, ° 22-06-1962",
    "rows": [
      [
        "Tamsulosine Sandoz 0,4 mg capsules met gereguleerde afgifte",
        "1 capsule per dag, na het ontbijt"
      ],
      [
        "Loortan Plus 50 mg/12,5 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ],
      [
        "Crestor 10 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ]
    ]
  },
  "meds": [
    {
      "name": "Tamsulosine Sandoz",
      "substance": "Tamsulosine",
      "strength": "0,4 mg",
      "form": "Capsule, gereguleerde afgifte",
      "frequency": "1× per dag, na het ontbijt",
      "indication": "Plasklachten (prostaat)",
      "source": "Foto in chat",
      "chatLabel": "Tamsulosine 0,4 mg · 1× per dag na het ontbijt"
    },
    {
      "name": "Loortan Plus",
      "substance": "Losartan + hydrochloorthiazide",
      "strength": "50 mg / 12,5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Hoge bloeddruk",
      "source": "Foto in chat",
      "chatLabel": "Loortan Plus 50 mg/12,5 mg · 1× per dag 's avonds",
      "highlightDetails": true
    },
    {
      "name": "Crestor",
      "substance": "Rosuvastatine",
      "strength": "10 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Cholesterol",
      "source": "Foto in chat",
      "chatLabel": "Crestor 10 mg · 1× per dag 's avonds"
    },
    {
      "name": "Prostaserene",
      "substance": "Serenoa repens (extract)",
      "strength": "320 mg",
      "form": "Capsule",
      "frequency": "1× per dag",
      "indication": "Plasklachten (zelfzorg, drogist)",
      "source": "Chat",
      "later": true,
      "tag": {
        "label": "Aangevuld in de chat",
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
      "label": "Plastablet",
      "value": "Hydrochloorthiazide (in Loortan Plus), 's avonds ingenomen",
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
