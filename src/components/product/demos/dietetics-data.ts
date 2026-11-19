import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {"name": "I. Langerhans", "initials": "IL", "channel": "telefoon", "summary": "Diabetes met insuline, twee hypo's deze week (58 en 63 mg/dl) sinds het nieuwe voedingsplan", "referral": "Vandaag contact", "tasks": 1},
  {"name": "L. Pancreas", "initials": "LP", "channel": "chat", "summary": "Diabetes type 2 sinds drie maanden, overgewicht, voorschrift van de huisarts", "referral": "Diabetes en gewicht", "tasks": 0},
  {"name": "C. Colon", "initials": "CC", "channel": "chat", "summary": "Opgeblazen buik, wisselende stoelgang, onderzoek gastro-enteroloog normaal", "referral": "Maag-darm", "tasks": 0},
  {"name": "J. Jejunum", "initials": "JJ", "channel": "chat", "summary": "Wil glutenvrij eten, vermoedt coeliakie, nooit getest · bloedtest bij de huisarts", "referral": "Huisarts eerst", "tasks": 0},
  {"name": "L. Fundus", "initials": "LF", "channel": "telefoon", "summary": "Wil afvallen bij BMI 18, braakt soms na het eten · huisarts en eetstoornisteam met voorrang", "referral": "Eetstoornisteam", "tasks": 1},
  {"name": "D. Duodenum", "initials": "DD", "channel": "chat", "summary": "Losse stoelgang sinds de start van metformine, verder goed → gewone plaats", "referral": "Geen rode vlag", "tasks": 0, "status": "IN_PROGRESS" as const},
];

export const TRIAGE_ALERT = "Twee hypo's deze week onder insuline, sinds het nieuwe voedingsplan. Secretariaat neemt vandaag contact op met de patiënt en de huisarts.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1, "name": "I. Langerhans", "initials": "IL", "reason": "Dringend · hypo's onder insuline, huisarts verwittigd"},
  {"room": 1, "slot": 1, "length": 2, "name": "L. Pancreas", "initials": "LP", "reason": "Nieuwe patiënt · diabetes type 2"},
  {"room": 1, "slot": 4, "length": 1, "name": "D. Duodenum", "initials": "DD", "reason": "Opvolging diabetes, losse stoelgang"},
  {"room": 2, "slot": 1, "length": 2, "name": "C. Colon", "initials": "CC", "reason": "Nieuwe patiënt · prikkelbare darm, low-FODMAP"},
  {"room": 2, "slot": 3, "length": 1, "name": "V. Villus", "initials": "VV", "reason": "Herintroductie FODMAP, week 8"},
  {"room": 3, "slot": 2, "length": 1, "name": "P. Pylorus", "initials": "PP", "reason": "Opvolging ondervoeding na opname"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen waarvoor u komt en wat uw huisarts heeft gezegd?",
  "Drie maanden geleden diabetes vastgesteld bij een bloedname. Ik neem nu metformine en moet van de dokter afvallen.",
  "Hoe ziet een gewone werkdag eruit: wanneer eet u, en wat drinkt u doorheen de dag?",
  "Ik begin om 6 uur, dus ontbijt sla ik over. Op het werk drink ik cola, wel een liter per dag. Om 12 uur een broodje, 's avonds warm eten en daarna iets voor de tv.",
  "Dank u. Wilt u de komende drie dagen een foto sturen van alles wat u eet en drinkt? Zo kijkt de diëtist met u naar uw echte bord.",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Diabetes en gewicht",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Diabetes type 2, drie maanden geleden vastgesteld bij een routinebloedname. Moet afvallen volgens de huisarts."],
        ["Voorschrift", "Ja, van dr. Claes, huisarts"],
        ["Labo (foto in de chat)", "HbA1c 7,8%, nuchtere glycemie 148 mg/dl, LDL 118 mg/dl, triglyceriden 210 mg/dl"],
      ]],
      ["Eetpatroon", [
        ["Ontbijt", "Overgeslagen. Koffie met twee suikers om 5u30"],
        ["Middag", "Twee broodjes, twee keer per week frietjes met een snack"],
        ["Avond", "Warm eten om 18u30, weinig groenten. Chips of koekjes voor de tv, 4 à 5 avonden per week"],
        ["Dranken", "±1 liter cola per dag op het werk"],
        ["Alcohol", "±8 pintjes per week, vooral in het weekend"],
        ["Maaltijdfoto's", "17 foto's over drie dagen. Eerste maaltijd telkens om 12 uur"],
        ["Wie kookt", "Zijn vrouw. Zij komt mee naar het consult"],
      ]],
      ["Gewicht", [
        ["Gewicht thuis / lengte", "98 kg / 1,78 m"],
        ["Gewichtsverloop", "82 kg op 40 jaar, +16 kg sinds hij 8 jaar geleden zittend werk kreeg. Nooit een dieet gevolgd"],
      ]],
      ["Beweging", [
        ["Stappen", "±3.000 per dag. Fietst niet meer sinds 8 jaar"],
      ]],
      ["Rode vlaggen", [
        ["Hypo's", "Nooit, geen insuline"],
        ["Ongewild gewichtsverlies, slikklachten", "Nee"],
        ["Eetstoornisscreening (SCOFF)", "0 van 5"],
      ]],
      ["Medische achtergrond", [
        ["Voorgeschiedenis", "Hoge bloeddruk, cholesterol. Losse stoelgang in de eerste weken van metformine, nu beter"],
        ["Allergieën en intoleranties", "Geen"],
        ["Familie", "Moeder diabetes type 2, vader hartinfarct op 62"],
      ]],
      ["Algemeen", [
        ["Beroep", "Planner bij een transportbedrijf, zittend, begint om 6 uur"],
        ["Hobby", "Hengelen. Wil weer fietsen met zijn kleinzoon"],
        ["Leeftijd", "58 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
        ["Doel in eigen woorden", "\"Weer met Mats kunnen fietsen, en geen extra pillen.\""],
      ]],
      ["Baseline", [
        ["PAID-5 (0–20, lager = beter)", "9"],
      ]],
    ],
  },
  {
    title: "Maag-darm",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Opgeblazen buik en wisselende stoelgang, sinds 2 jaar"],
        ["Onderzoeken", "Coloscopie en coeliakietest normaal (gastro-enteroloog)"],
      ]],
      ["Klachten", [
        ["Erger bij", "Uien, look, brood, appels"],
        ["IBS-SSS (0–500, lager = beter)", "310"],
      ]],
      ["Rode vlaggen", [
        ["Bloed bij de stoelgang, gewichtsverlies", "Nee"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Leerkracht / 34 jaar"],
      ]],
    ],
  },
  {
    title: "Ondervoeding",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Ongewild 6 kg afgevallen na een ziekenhuisopname voor longontsteking"],
      ]],
      ["Gewicht", [
        ["Gewicht nu / vóór de opname", "52 kg / 58 kg"],
      ]],
      ["Eetpatroon", [
        ["Eetlust", "Weinig. Eet halve porties, slaat het avondeten soms over"],
      ]],
      ["Rode vlaggen", [
        ["Slikklachten", "Nee"],
      ]],
      ["Sociale anamnese", [
        ["Woonsituatie", "Woont alleen, warme maaltijden aan huis"],
      ]],
      ["Algemeen", [
        ["Leeftijd", "81 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Goeiedag, mijn huisarts heeft me een voorschrift gegeven voor de diëtist. Ik heb suikerziekte.",
  "Fijn dat u belt. Neemt u insuline of tabletten voor de suiker, en heeft u al eens een hypo gehad: trillen, zweten of plots veel honger?",
  "Alleen metformine. Een hypo heb ik nog nooit gehad.",
  "Bent u de laatste tijd veel vermagerd zonder het te willen, of heeft u moeite met slikken?",
  "Nee, integendeel.",
  "Dank u. Ik plan u in bij de diëtist diabetes en gewicht en stuur u een korte vragenlijst om uw bezoek voor te bereiden.",
];

export const VOICE_TASK = "Afspraak ingepland bij de diëtist diabetes en gewicht: diabetes type 2 met voorschrift, geen hypo's, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Op uw foto van dinsdag zie ik om tien uur een fles cola. Is dat elke dag zo?",
  "Ja, die staat altijd naast mijn computer. Een liter, soms meer.",
  "In een liter cola zit ongeveer 106 gram suiker, zo'n 26 suikerklontjes. Wat zou u in de plaats kunnen drinken?",
  "Thuis drinkt hij wel graag bruiswater.",
  "Met een schijfje citroen, ja. Dat kan ik meenemen naar het werk.",
];

export const SCRIBE_NOTE = [
  ["Assessment", "Diabetes type 2 sinds drie maanden (HbA1c 7,8%), metformine 850 mg 2× per dag. Verwezen door dr. Claes. Gewicht 98,4 kg, lengte 1,78 m, BMI 31,1, buikomtrek 112 cm, vetpercentage 33% (bio-impedantie). Labo: nuchtere glycemie 148 mg/dl, LDL 118 mg/dl, triglyceriden 210 mg/dl, eGFR 84. Werkt vanaf 6 uur, slaat het ontbijt over, neemt metformine met koffie op een lege maag. ±1 liter cola per dag (±420 kcal, ±106 g suiker), avondsnacks op 4 à 5 avonden, ±8 pintjes per week, groenten ±100 g per dag. Geschatte inname ±2.900 kcal per dag. ±3.000 stappen per dag. Geen hypo's, SCOFF 0/5. Echtgenote kookt en is aanwezig."],
  ["Diëtistische diagnose (PES)", "1. Overmatige inname van suikerhoudende dranken, door gewoonte op het werk, blijkend uit ±1 liter cola per dag en een HbA1c van 7,8%. 2. Onregelmatig eetpatroon, door werk vanaf 6 uur, blijkend uit een eerste maaltijd om 12 uur, avondsnacks en metformine op een lege maag. 3. Lichamelijke inactiviteit, door zittend werk, blijkend uit ±3.000 stappen per dag."],
  ["Interventie", "Drie doelen samen afgesproken: cola twee weken halveren, daarna bruiswater met citroen of cola zero. Ontbijt op het werk om 7 uur (volkorenbrood met kaas of yoghurt met havermout), metformine bij dat ontbijt. Avondsnack vervangen door een handvol noten of een yoghurt, chips enkel in het weekend. Bordmodel besproken met de echtgenote. Bier hooguit 4 per week. Dagelijks 20 minuten wandelen na het avondeten. Doel: 5 à 7% gewichtsverlies in zes maanden."],
  ["Monitoring en evaluatie", "Vragenlijst week 2. Tweede sessie na zes weken. Gewicht en buikomtrek thuis (meetlint meegegeven). HbA1c via de huisarts na drie maanden. Vraag aan de huisarts: vitamine B12 nakijken, Bewegen op Verwijzing overwegen. Vangnet: contact bij ongewild snel vermageren, veel dorst en plassen of braken. Past de huisarts de medicatie aan, dan opnieuw bespreken van hypo's."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon Diëtiek, voor het patiëntendossier", "Gegenereerd"],
  ["Brief aan de huisarts", "Bevindingen, doelen en twee vragen voor de verwijzer", "Gegenereerd"],
  ["Persoonlijk voedingsplan", "Drie doelen, een voorbeelddag en een boodschappenlijst", "Gegenereerd"],
  ["Attest voor het ziekenfonds", "Prestatie en datum voor de terugbetaling", "Nog niet gegenereerd"],
  ["Kaart \"Suiker in dranken\"", "Suikerklontjes per drank, voor op de koelkast", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte dokter Claes, ik zag uw patiënt de heer Pancreas voor begeleiding bij diabetes type 2 en overgewicht. Zijn grootste suikerbron is een liter cola per dag, en hij neemt metformine op een lege maag. We spraken drie haalbare doelen af en zien elkaar terug over zes weken.";

export const LETTER = [
  "Geachte dokter Claes,",
  "Ik schrijf u over uw patiënt Luc Pancreas, geboren op 9 mei 1968, die ik op uw voorschrift zag voor begeleiding bij diabetes type 2 en overgewicht.",
  "REDEN VOOR CONTACT Diabetes type 2, drie maanden geleden vastgesteld (HbA1c 7,8%), met overgewicht. Gestart met metformine.",
  "ANAMNESE Werkt als planner vanaf 6 uur, zittend. Slaat het ontbijt over en neemt metformine 's ochtends met koffie, op een lege maag. Drinkt ongeveer een liter cola per dag op het werk. Avondsnacks op vier à vijf avonden per week, ongeveer acht pintjes per week. Weinig groenten. Ongeveer 3.000 stappen per dag. Sinds acht jaar 16 kg aangekomen. Nooit een hypo, geen ongewild gewichtsverlies, eetstoornisscreening negatief. Neemt daarnaast al jaren omeprazol voor maagzuur. Wil weer kunnen fietsen met zijn kleinzoon.",
  "KLINISCH ONDERZOEK Gewicht 98,4 kg, lengte 1,78 m, BMI 31,1. Buikomtrek 112 cm. Vetpercentage 33% (bio-impedantie).",
  "AANVULLENDE ONDERZOEKEN Uw labo: HbA1c 7,8%, nuchtere glycemie 148 mg/dl, LDL 118 mg/dl, triglyceriden 210 mg/dl, eGFR 84 ml/min. Geschatte inname ongeveer 2.900 kcal per dag, waarvan ongeveer 420 kcal en 106 g suiker uit cola.",
  "DIAGNOSE Overmatige inname van suikerhoudende dranken. Onregelmatig eetpatroon met een eerste maaltijd om 12 uur en avondsnacks. Lichamelijke inactiviteit.",
  "BELEID We spraken drie doelen af: cola afbouwen naar water of cola zero, een ontbijt op het werk met metformine erbij, en de avondsnack vervangen. Het bordmodel werd met zijn echtgenote besproken, zij kookt. Daarnaast dagelijks 20 minuten wandelen. Doel is 5 à 7% gewichtsverlies in zes maanden. Twee vragen: wilt u vitamine B12 laten nakijken, gezien metformine en langdurig omeprazol, en een verwijzing naar Bewegen op Verwijzing overwegen? Tweede sessie over zes weken, tussendoor volg ik op via een vragenlijst. Past u de diabetesmedicatie aan, dan bespreek ik graag het risico op hypo's met hem.",
  "Met vriendelijke groeten, Andreas Vesalius, diëtist",
];

export const FOLLOW_ROWS = [
  ["I. Langerhans", "Diabetes en gewicht · week 2"],
  ["L. Pancreas", "Diabetes en gewicht · week 6 · PAID-5 ingevuld"],
  ["C. Colon", "Low-FODMAP · week 2, eliminatiefase"],
  ["P. Pylorus", "Ondervoeding · maand 1"],
];

export const FOLLOW_ALERT = "Meldt twee hypo's (58 en 63 mg/dl) sinds het nieuwe voedingsplan, onder insuline. Neem contact op en verwittig de huisarts.";

export const FOLLOW_CHAT = [
  "Hoe lukt het met uw drie doelen sinds het vorige consult?",
  "De cola is de grootste stap. Ik drink nu bruiswater met citroen, en op vrijdag één cola zero.",
  "Knap. Is er iets dat nog niet lukt?",
  "De chips 's avonds. Als ik moe ben van het werk, grijp ik er toch naar.",
  "Heeft u trillen, zweten of plots veel honger gehad, of bent u veel vermagerd zonder het te willen?",
  "Nee, niets van dat. Wel ben ik zondag voor het eerst met mijn kleinzoon gaan fietsen.",
];

export const FOLLOW_SCORES = [
  ["Gewicht (thuis gemeten)", "98,4 kg", "96,2 kg"],
  ["Buikomtrek (thuis gemeten)", "112 cm", "110 cm"],
  ["PAID-5 (0 tot 20, lager = beter)", "9", "7"],
  ["Cola", "±1 liter per dag", "0,33 liter zero per dag"],
  ["Ontbijt op werkdagen", "0 van 5", "4 van 5"],
  ["Stappen per dag", "±3.000", "±4.500"],
  ["Slaap", "Valt 's avonds in de zetel in slaap", "Gaat vroeger naar bed"],
  ["Hobby", "Fietst niet", "Eerste fietstocht met zijn kleinzoon, 8 km"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Diabetes en gewicht (Luc)", "Week 2", "Eerste stappen", "Hoe lukt elk doel, cola per dag, ontbijt, klachten van metformine, hypo's, open vragen"],
  ["Diabetes en gewicht (Luc)", "Week 6", "Voor de tweede sessie", "Gewicht, buikomtrek, maaltijdfoto's van twee dagen, PAID-5, beweging"],
  ["Diabetes en gewicht (Luc)", "Maand 3 en 6", "Opvolging diabetes en gewicht", "Gewicht, buikomtrek, HbA1c van de huisarts, PAID-5, slaap, werk, hobby's, open vragen"],
  ["Diabetes en gewicht (Luc)", "Maand 12", "Opvolging + welzijn", "Idem, aangevuld met EQ-5D-5L en PREM"],
  ["Low-FODMAP", "Week 2", "Eliminatiefase", "Klachten, wat lukt niet, vragen over producten"],
  ["Low-FODMAP", "Week 6", "Einde eliminatie", "IBS-SSS (0 tot 500, lager = beter), klaar voor herintroductie"],
  ["Low-FODMAP", "Week 6 tot 12", "Herintroductie", "Per FODMAP-groep: wat getest werd, klachten van 0 tot 10"],
  ["Low-FODMAP", "Maand 6", "Uitkomst", "IBS-SSS, EQ-5D-5L, PREM"],
  ["Ondervoeding", "Week 1", "Bijvoeding", "Gewicht, eetlust, bijvoeding genomen, slikken"],
  ["Ondervoeding", "Maand 1 en 3", "Opvolging ondervoeding", "Gewicht, eetlust, kracht, gevallen, open vragen"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de begeleiding die de diëtist kiest. Elke begeleiding heeft haar eigen vragenlijsten op haar eigen momenten.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na: hypo's, ongewild gewichtsverlies, braken na het eten.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De omeprazol was ik vergeten, die neem ik al jaren voor mijn maag. Mijn metformine neem ik wel 's ochtends met mijn koffie.",
  "photoMessage": "Een pil voor de suiker, een voor de cholesterol en een voor de bloeddruk.",
  "followUp": {
    "question": "Genoteerd. Neemt u bloedverdunners, zoals Marcoumar, Sintrom of Xarelto, of insuline of tabletten zoals Uni Diamicron?",
    "choices": [
      "Ja",
      "Nee"
    ],
    "answer": "Nee"
  },
  "schedule": {
    "header": "Apotheek Ter Leie · Medicatieschema · L. Pancreas, ° 09-05-1968",
    "rows": [
      [
        "Metformax 850 mg tabletten",
        "1 tablet 's ochtends en 's avonds, bij de maaltijd"
      ],
      [
        "Atorvastatine EG 20 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ],
      [
        "Coversyl 5 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Omeprazole EG 20 mg maagsapresistente capsules",
        "1 capsule 's ochtends, voor het ontbijt"
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
      "indication": "Diabetes type 2",
      "source": "Foto in chat",
      "chatLabel": "Metformax 850 mg · 2× per dag bij de maaltijd"
    },
    {
      "name": "Atorvastatine EG",
      "substance": "Atorvastatine",
      "strength": "20 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Cholesterol",
      "source": "Foto in chat",
      "chatLabel": "Atorvastatine 20 mg · ’s avonds"
    },
    {
      "name": "Coversyl",
      "substance": "Perindopril",
      "strength": "5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hoge bloeddruk",
      "source": "Foto in chat",
      "chatLabel": "Coversyl 5 mg · ’s ochtends"
    },
    {
      "name": "Omeprazole EG",
      "substance": "Omeprazol",
      "strength": "20 mg",
      "form": "Maagsapresistente capsule",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Maagzuur",
      "source": "Foto in chat",
      "chatLabel": "Omeprazol 20 mg · ’s ochtends voor het ontbijt",
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
      "label": "Middelen met hyporisico (insuline, sulfonylureum)",
      "value": "Geen",
      "tone": "ok"
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
