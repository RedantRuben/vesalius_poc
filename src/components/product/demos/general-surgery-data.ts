import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {"name": "S. Femoralis", "initials": "SF", "channel": "telefoon", "summary": "Harde, pijnlijke zwelling in de lies links sinds vanochtend, gaat niet meer terug, twee keer gebraakt", "referral": "Spoed", "tasks": 1},
  {"name": "D. Inguinalis", "initials": "DI", "channel": "chat", "summary": "Zwelling lies rechts sinds 5 maanden, verdwijnt bij liggen, trekt bij tillen, echo: liesbreuk", "referral": "Buikwand", "tasks": 0},
  {"name": "A. Adductor", "initials": "AA", "channel": "chat", "summary": "Liespijn bij sprinten en trappen, geen zwelling, voetballer", "referral": "Sportgeneeskunde", "tasks": 0},
  {"name": "C. Acetabulum", "initials": "CA", "channel": "telefoon", "summary": "Liespijn bij stappen, startpijn, stijve heup", "referral": "Orthopedie", "tasks": 0},
  {"name": "N. Umbilicus", "initials": "NU", "channel": "chat", "summary": "Navelbreuk iets groter, zacht, gaat vanzelf terug", "referral": "Gewone plaats", "tasks": 0},
  {"name": "G. Cysticus", "initials": "GC", "channel": "chat", "summary": "Krampende pijn rechtsboven na vette maaltijden", "referral": "Hepatobiliair", "tasks": 0, "status": "IN_PROGRESS" as const},
];

export const TRIAGE_ALERT = "Harde, pijnlijke zwelling in de lies die niet meer terug gaat, met braken. Mogelijk ingeklemde breuk. Patiënte is doorgestuurd naar spoedgevallen, secretariaat verwittigd.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 0.6666666666666666, "time": "09:00", "name": "N. Umbilicus", "initials": "NU", "reason": "Nieuwe patiënt · navelbreuk"},
  {"room": 1, "slot": 0.6666666666666666, "length": 1, "time": "09:20", "name": "R. Ilioinguinalis", "initials": "RI", "reason": "Pijn na open liesbreukherstel"},
  {"room": 1, "slot": 2, "length": 1, "time": "10:00", "name": "K. Poupart", "initials": "KP", "reason": "Controle 6 weken na TEP"},
  {"room": 2, "slot": 0, "length": 1.3333333333333333, "time": "09:00", "name": "D. Inguinalis", "initials": "DI", "reason": "Nieuwe patiënt · liesbreuk rechts"},
  {"room": 2, "slot": 1.3333333333333333, "length": 1, "time": "09:40", "name": "M. Rectus", "initials": "MR", "reason": "Littekenbreuk na laparotomie"},
  {"room": 3, "slot": 1, "length": 1, "time": "09:30", "name": "L. Lipoma", "initials": "LL", "reason": "Excisie lipoom rug · lokale verdoving"},
  {"room": 3, "slot": 2.5, "length": 1, "time": "10:15", "name": "P. Pilonidalis", "initials": "PP", "reason": "Wondcontrole na sinus pilonidalis"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Al vijf maanden een zwelling in mijn lies rechts. Sinds mijn dochter verhuisde, ik heb veel gesleurd.",
  "Verdwijnt de zwelling als u neerligt of ze zachtjes terugduwt?",
  "Ja. 's Morgens zie ik niets.",
  "Hoeveel pijn heeft u, op 10? In rust, en als u iets zwaars heft?",
  "In rust 2. Als ik zakken hef op het werk een 5, en 's avonds trekt het.",
  "Speelt u een blaasinstrument, of moet u vaak persen bij het plassen of bij de stoelgang?",
  "Trompet in de harmonie. En plassen gaat wat trager, daarvoor neem ik iets van de huisarts.",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Buikwand",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Zwelling in de lies rechts. Liesbreuk op echo volgens de huisarts."],
        ["Zijde", "Rechts. Links niets opgemerkt"],
        ["Duur", "Vijf maanden, langzaam groter"],
      ]],
      ["Zwelling", [
        ["Gaat terug", "Ja, bij liggen. Nooit vast blijven zitten"],
      ]],
      ["Aard van de pijn", [
        ["Pijn", "2/10 in rust, 5/10 bij tillen, trekkend, soms naar het scrotum"],
      ]],
      ["Wanneer heb je pijn", [
        ["Erger bij", "Tillen, hoesten, lange repetitie met de trompet, einde van de werkdag"],
        ["Beter bij", "Neerliggen, breukband"],
      ]],
      ["Rode vlaggen", [
        ["Hard, pijnlijk, braken", "Nee"],
      ]],
      ["Beeldvorming elders", [
        ["Echo", "Echo lies, radiologiepraktijk, 12 oktober 2026"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Breukband (helpt wat, schuurt). Dafalgan zo nodig"],
        ["Operaties", "Appendectomie op 14 jaar, narcose zonder problemen"],
        ["Voorgeschiedenis", "Hypertensie, cholesterol, goedaardige prostaatvergroting"],
        ["Allergieën", "Pleisters (rode huid)"],
        ["Bloedverdunners", "Nee"],
        ["Familie", "Vader en broer geopereerd aan een liesbreuk"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Ex-roker sinds 6 jaar / 4 à 5 pinten per week"],
        ["Thuis na dagopname", "Echtgenote brengt en haalt hem, is er de eerste nacht"],
      ]],
      ["Algemeen", [
        ["Beroep", "Magazijnier in een bouwmarkt, tilt dagelijks tot 25 kg"],
        ["Sport en hobby", "Trompet in de harmonie, padel op zaterdag"],
        ["Lengte / gewicht", "1,78 m / 84 kg"],
        ["Leeftijd", "56 jaar"],
        ["Verwijzing", "Via dr. Claes, huisarts"],
      ]],
      ["Baseline", [
        ["EuraHS-QoL (0–90, lager = beter)", "34 (voorbeelddata)"],
      ]],
    ],
  },
  {
    title: "Galblaas",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Krampende pijn rechtsboven, uitstralend naar de rug, na vette maaltijden, sinds 3 maanden"],
      ]],
      ["Aard van de pijn", [
        ["Duur aanval", "1 à 3 uur, 4 aanvallen in totaal"],
      ]],
      ["Rode vlaggen", [
        ["Koorts, geelzucht, donkere urine", "Nee"],
      ]],
      ["Beeldvorming elders", [
        ["Echo buik", "Meerdere galstenen, galblaaswand niet verdikt"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Kok / 47 jaar"],
      ]],
    ],
  },
  {
    title: "Proctologie",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Helderrood bloed op het toiletpapier en pijn bij de stoelgang, sinds 6 weken"],
      ]],
      ["Stoelgang", [
        ["Patroon", "Onveranderd, wel harde stoelgang"],
      ]],
      ["Rode vlaggen", [
        ["Gewichtsverlies, bloed gemengd met stoelgang", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Coloscopie", "Nooit"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Vrachtwagenchauffeur / 39 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts zegt dat ik een liesbreuk heb. Kan ik een afspraak krijgen bij de chirurg?",
  "Vervelend om te horen. Ziet u een zwelling in de lies, en verdwijnt die als u neerligt?",
  "Ja, rechts. Als ik lig, is ze weg.",
  "Is de zwelling vandaag hard of pijnlijk geworden, of moet u braken?",
  "Nee, dat niet. Het trekt alleen als ik hef.",
  "Dank u. Ik plan u in op de buikwandraadpleging en stuur u een korte vragenlijst om uw bezoek voor te bereiden. Wordt de zwelling ooit hard en pijnlijk en gaat ze niet meer terug, ga dan meteen naar spoed.",
];

export const VOICE_TASK = "Afspraak ingepland op de buikwandraadpleging: liesbreuk rechts, reponibel, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Blijft u even rechtop staan. Ik leg mijn vingers op uw lies. Wilt u eens hoesten?",
  "Daar, voelt u dat? Zo komt hij ook op het werk naar buiten.",
  "Ja, een duidelijke impuls rechts. Links voel ik niets. Gaat u nu even op de rug liggen.",
  "Kijk, nu is hij weer weg.",
];

export const SCRIBE_NOTE = [
  ["Anamnese", "Zwelling in de lies rechts sinds vijf maanden, langzaam groter. Verwezen door dr. Claes na echo. Trekkende pijn, 2/10 in rust, 5/10 bij tillen en op het einde van de werkdag, soms naar het scrotum. Verdwijnt bij liggen, nooit vast blijven zitten. Magazijnier, tilt tot 25 kg. Trompet en padel beperkt. Breukband helpt wat. Hypertensie, hypercholesterolemie, goedaardige prostaatvergroting (tamsulosine). Appendectomie op 14 jaar. Geen bloedverdunners. Allergie voor pleisters."],
  ["Klinisch onderzoek", "Staand: rechts een zachte zwelling boven het ligament van Poupart, met impuls bij hoesten, tot aan de bovenpool van het scrotum. Spontaan reponibel in rugligging, niet pijnlijk. Links geen zwelling, geen impuls. Femorale regio beiderzijds vrij. Testikels normaal, geen hydrocèle. Buik soepel, litteken appendectomie zonder littekenbreuk. Heupen vrij, adductoren niet gevoelig."],
  ["Medische beeldvorming", "Echo lies (12 oktober 2026): indirecte liesbreuk rechts, halsdiameter 2,1 cm, inhoud omentum. Links geen breuk."],
  ["Diagnose", "Symptomatische, reponibele indirecte liesbreuk rechts (EHS PL2). ASA II."],
  ["Beleid", "Laparoscopisch herstel met mat (TEP) rechts in dagopname, links wordt nagekeken. Tamsulosine verder, ook rond de ingreep. Geen aanpassing van de medicatie. Hypoallergene pleisters. Anesthesieconsult. Zwaar tillen en trompet na ongeveer twee weken, padel na drie weken, attest arbeidsongeschiktheid twee weken. Vangnet: vóór de ingreep meteen naar spoed als de zwelling hard en pijnlijk blijft zitten; na de ingreep bellen bij problemen met plassen, koorts, pus of toenemende buikpijn. Opvolging met EuraHS-QoL en Carolinas Comfort Scale."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon Heelkunde, voor het patiëntendossier", "Gegenereerd"],
  ["Brief aan de huisarts", "Bevindingen, diagnose en beleid voor de verwijzer", "Gegenereerd"],
  ["Aanvraag opname", "Dagziekenhuis, TEP rechts met mat, ASA II, allergie pleisters", "Gegenereerd"],
  ["Attest arbeidsongeschiktheid", "Twee weken, geen zwaar tillen", "Nog niet gegenereerd"],
  ["Uitleg voor de patiënt", "Voorbereiding, nuchter zijn, wat na de ingreep normaal is, wanneer bellen", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Inguinalis voor een zwelling in de lies rechts sinds vijf maanden. Klinisch en op echo gaat het om een reponibele indirecte liesbreuk rechts. We plannen een laparoscopisch herstel met mat in dagopname.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Dirk Inguinalis, geboren op 22 juni 1970, die ik recent op de buikwandraadpleging zag.",
  "REDEN VOOR CONTACT Verwezen wegens een zwelling in de lies rechts, op echo een indirecte liesbreuk.",
  "ANAMNESE Sinds vijf maanden een zwelling in de lies rechts, langzaam groter geworden. Trekkende pijn, 5 op 10 bij tillen en op het einde van de werkdag, 2 op 10 in rust. De zwelling verdwijnt als hij ligt en is nooit vast blijven zitten. Werkt als magazijnier en tilt dagelijks tot 25 kg. Speelt trompet en padel, beide beperkt door de klachten. Breukband helpt wat. Gekend met hypertensie, hypercholesterolemie en goedaardige prostaatvergroting, waarvoor tamsulosine. Appendectomie op jonge leeftijd. Geen bloedverdunners. Allergie voor pleisters. Vader en broer werden aan een liesbreuk geopereerd.",
  "KLINISCH ONDERZOEK Rechts een zachte, reponibele zwelling boven het ligament van Poupart met impuls bij hoesten, tot aan het scrotum. Links geen breuk. Femorale regio vrij. Testikels normaal. Buik soepel, geen littekenbreuk. Heupen en adductoren zonder afwijkingen.",
  "AANVULLENDE ONDERZOEKEN Echo lies (12 oktober 2026): indirecte liesbreuk rechts, halsdiameter 2,1 cm, inhoud omentum. Links geen breuk.",
  "DIAGNOSE Symptomatische, reponibele indirecte liesbreuk rechts (EHS PL2).",
  "BELEID We plannen een laparoscopisch herstel met mat (TEP) rechts in dagopname; links wordt tijdens de ingreep nagekeken. Tamsulosine loopt verder, ook rond de ingreep, gezien het risico op urineretentie. Geen aanpassing van de medicatie nodig. Hij hervat zwaar tillen en de trompet na ongeveer twee weken, padel na drie weken; een attest arbeidsongeschiktheid van twee weken is meegegeven. Hij weet dat hij vóór de ingreep meteen naar spoedgevallen gaat als de zwelling hard en pijnlijk wordt en niet meer terug gaat, en dat hij na de ingreep belt bij problemen met plassen, koorts, wondproblemen of toenemende buikpijn. We volgen hem op na de ingreep, onder meer met de EuraHS-QoL en de Carolinas Comfort Scale.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, chirurg",
];

export const FOLLOW_ROWS = [
  ["R. Ilioinguinalis", "Open herstel (Lichtenstein) · maand 3"],
  ["D. Inguinalis", "TEP rechts · maand 3 · EuraHS-QoL en Carolinas Comfort Scale ingevuld"],
  ["K. Poupart", "TEP · week 6"],
  ["N. Umbilicus", "Afwachtend beleid · maand 6"],
];

export const FOLLOW_ALERT = "Meldt brandende, schietende pijn van de lies naar het scrotum, drie maanden na een open liesbreukherstel. Slaapt er slecht door. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met uw lies, drie maanden na de operatie?",
  "Goed. Ik hef weer zakken cement op het werk, zonder breukband.",
  "Fijn om te horen. Is er iets dat nog niet lukt zoals vroeger?",
  "Bij de hoge noten op de repetitie voel ik soms nog een klein trekje. Maar het wordt elke week minder.",
  "Heeft u een zwelling teruggezien, of een brandende pijn naar het scrotum of de dij?",
  "Nee, niets van dat.",
];

export const FOLLOW_SCORES = [
  ["EuraHS-QoL (0 tot 90, lager = beter)", "34", "5"],
  ["Carolinas Comfort Scale (0 tot 115, lager = beter)", "n.v.t. (pas na de ingreep)", "6"],
  ["NRS pijn lies bij tillen (0 tot 10, lager = beter)", "5", "1"],
  ["Werk", "Vermijdt de zwaarste zakken", "Volledig, hervat op dag 15"],
  ["Trompet", "Lange stukken lukken niet", "Volledige repetities"],
  ["Padel", "Stopt na een uur", "Hervat in week 4"],
  ["Recidief", "n.v.t.", "Geen"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Afwachtend beleid", "Maand 6", "Opvolging breuk", "Groter geworden, pijn bij tillen, beperking in werk en sport, ooit niet terug gegaan, EuraHS-QoL"],
  ["Afwachtend beleid", "Maand 12", "Opvolging breuk + welzijn", "Idem, aangevuld met EQ-5D-5L en de vraag of hij nu een operatie wil"],
  ["Laparoscopisch herstel (Dirk)", "Dag 1", "Controle na dagopname", "Plassen gelukt, pijn (NRS), pijnstilling, wondjes, koorts, misselijkheid"],
  ["Laparoscopisch herstel (Dirk)", "Week 1", "Herstel thuis", "Blauwe verkleuring, zwelling, stoelgang, wandelen, autorijden"],
  ["Laparoscopisch herstel (Dirk)", "Week 3", "Werk en sport", "Werk hervat, tillen, trompet, padel, pijn"],
  ["Laparoscopisch herstel (Dirk)", "Maand 3 en 12", "Uitkomst na herstel", "EuraHS-QoL, Carolinas Comfort Scale, NRS, chronische pijn, recidief, EQ-5D-5L, PREM"],
  ["Open herstel (Lichtenstein)", "Dag 1 en week 2", "Controle en wonde", "Plassen, pijn, wonde, gevoelsstoornis in lies of scrotum"],
  ["Open herstel (Lichtenstein)", "Maand 3", "Chronische pijn", "Brandende of schietende pijn naar scrotum of dij, Carolinas Comfort Scale, EuraHS-QoL"],
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest de patiënt eerst voor afwachten en later toch voor een operatie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na. Een blauwe verkleuring in week 1 of een zachte zwelling in week 2 is na een liesbreukoperatie normaal: dan krijgt de patiënt uitleg, geen alarm.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. Die tamsulosine was ik vergeten, dat is voor de prostaat.",
  "followUps": [
    {
      "question": "Genoteerd. Neemt u bloedverdunners of plaatjesremmers, zoals Asaflow, Plavix, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    },
    {
      "question": "Dank u. Bent u allergisch voor geneesmiddelen, latex of pleisters?",
      "answer": "Van pleisters krijg ik een rode huid."
    }
  ],
  "schedule": {
    "header": "Apotheek Het Anker · Medicatieschema · D. Inguinalis, ° 22-06-1970",
    "rows": [
      [
        "Amlodipine Sandoz 5 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Atorvastatine EG 20 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ],
      [
        "Tamsulosine Sandoz 0,4 mg capsules met gereguleerde afgifte",
        "1 capsule 's avonds"
      ],
      [
        "Dafalgan 1 g tabletten",
        "Zo nodig, max. 3 per dag"
      ]
    ]
  },
  "meds": [
    {
      "name": "Amlodipine Sandoz",
      "substance": "Amlodipine",
      "strength": "5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hypertensie",
      "source": "Foto in chat",
      "chatLabel": "Amlodipine 5 mg · 1× per dag ’s ochtends"
    },
    {
      "name": "Atorvastatine EG",
      "substance": "Atorvastatine",
      "strength": "20 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Cholesterol",
      "source": "Foto in chat",
      "chatLabel": "Atorvastatine 20 mg · 1× per dag ’s avonds"
    },
    {
      "name": "Tamsulosine Sandoz",
      "substance": "Tamsulosine",
      "strength": "0,4 mg",
      "form": "Capsule met gereguleerde afgifte",
      "frequency": "1× per dag, 's avonds",
      "indication": "Prostaatvergroting",
      "source": "Foto in chat",
      "chatLabel": "Tamsulosine 0,4 mg · 1× per dag ’s avonds",
      "tag": {
        "label": "Niet zelf vermeld",
        "tone": "amber"
      }
    },
    {
      "name": "Dafalgan",
      "substance": "Paracetamol",
      "strength": "1 g",
      "form": "Tablet",
      "frequency": "Zo nodig, max. 3× per dag",
      "indication": "Pijn",
      "source": "Foto in chat",
      "chatLabel": "Dafalgan 1 g · zo nodig, max. 3× per dag"
    }
  ],
  "notes": [
    {
      "label": "Bloedverdunners",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Plaatjesremmers",
      "value": "Geen",
      "tone": "ok"
    },
    {
      "label": "Aandacht voor de ingreep",
      "value": "Tamsulosine: prostaatvergroting, verder nemen rond de ingreep",
      "tone": "warn"
    },
    {
      "label": "Allergieën",
      "value": "Pleisters (via chat)",
      "tone": "warn"
    },
    {
      "label": "Bevestigd door patiënt",
      "value": "Ja"
    }
  ]
} satisfies Partial<MedicationCopy>;
