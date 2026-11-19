import type { MedicationCopy } from './medication';

export const TRIAGE_ROWS = [
  {
    "name": "S. Sinus",
    "initials": "SS",
    "channel": "telefoon",
    "summary": "Gisteren flauwgevallen tijdens het fietsen, voordien hartkloppingen",
    "referral": "Zelfde dag",
    "tasks": 1
  },
  {
    "name": "M. Atrium",
    "initials": "MA",
    "channel": "chat",
    "summary": "Onregelmatige hartkloppingen sinds twee maanden, VKF op ECG huisarts en smartwatch, niet flauwgevallen",
    "referral": "Ritme",
    "tasks": 0
  },
  {
    "name": "E. Systole",
    "initials": "ES",
    "channel": "chat",
    "summary": "Losse overslagen in rust, verder geen klachten, niet flauwgevallen",
    "referral": "Algemene cardiologie",
    "tasks": 0,
    "moment": "Geen rode vlag"
  },
  {
    "name": "M. Mitralis",
    "initials": "MM",
    "channel": "telefoon",
    "summary": "Toenemend kortademig, dikke enkels, gekend klepprobleem",
    "referral": "Hartfalen en kleppen",
    "tasks": 0
  },
  {
    "name": "O. Cardia",
    "initials": "OC",
    "channel": "chat",
    "summary": "Branderig gevoel achter het borstbeen na de maaltijd, inspanning gaat goed",
    "referral": "Gastro-enterologie",
    "tasks": 0
  },
  {
    "name": "F. Purkinje",
    "initials": "FP",
    "channel": "chat",
    "summary": "Vraag over afspraak",
    "referral": "Normaal verloop",
    "tasks": 0,
    "status": "IN_PROGRESS" as const
  }
];

export const TRIAGE_ALERT = "Gisteren flauwgevallen tijdens het fietsen, voordien hartkloppingen. Secretariaat plant vandaag een consult met ECG.";

export const VISITS = [
  {
    "room": 1,
    "slot": 0,
    "length": 1,
    "name": "F. Purkinje",
    "initials": "FP",
    "reason": "Controle na cardioversie"
  },
  {
    "room": 1,
    "slot": 1,
    "length": 1,
    "name": "S. Sinus",
    "initials": "SS",
    "reason": "Dringend · flauwgevallen tijdens inspanning"
  },
  {
    "room": 1,
    "slot": 3,
    "length": 1,
    "name": "E. Systole",
    "initials": "ES",
    "reason": "Overslagen · Holter aangevraagd"
  },
  {
    "room": 2,
    "slot": 0,
    "length": 2,
    "name": "M. Atrium",
    "initials": "MA",
    "reason": "Nieuwe patiënt · voorkamerfibrillatie · ECG en echo"
  },
  {
    "room": 3,
    "slot": 1,
    "length": 1,
    "name": "B. Bundel",
    "initials": "BB",
    "reason": "Pacemakercontrole"
  },
  {
    "room": 3,
    "slot": 3,
    "length": 1,
    "name": "V. Pulmonalis",
    "initials": "VP",
    "reason": "Controle na ablatie"
  }
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Sinds twee maanden heb ik aanvallen van hartkloppingen, twee à drie keer per week. Mijn horloge gaf een melding.",
  "Hoe lang duurt zo'n aanval meestal? En merkt u iets dat ze uitlokt?",
  "Een paar uur, één keer twee dagen. Vaak na een feest of een zware maaltijd.",
  "U mag gerust een screenshot sturen van de melding op uw horloge. Bent u ooit flauwgevallen tijdens een aanval?"
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Ritme",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Aanvallen van onregelmatige, snelle hartkloppingen. VKF vastgelegd op ECG door de huisarts."],
        ["Duur", "Twee maanden"],
      ]],
      ["Aanvallen", [
        ["Frequentie en duur", "2 à 3 per week, meestal enkele uren, één keer twee dagen. Laatste aanval vier dagen geleden."],
        ["Ritme", "Onregelmatig en snel"],
        ["Uitlokkend", "Alcohol, zware maaltijd, 's avonds in de zetel"],
        ["Vastgelegd", "Smartwatch: \"mogelijk voorkamerfibrillatie\" (screenshot). ECG huisarts: VKF, 118/min."],
      ]],
      ["Klachten", [
        ["Bijkomend", "Kortademig op een helling, sneller moe, minder vermogen op de fiets"],
      ]],
      ["Rode vlaggen", [
        ["Flauwvallen", "Nee"],
        ["Pijn op de borst", "Nee"],
        ["Kortademig in rust of plat liggen", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Bisoprolol 2,5 mg sinds 3 weken: aanvallen minder snel, niet minder vaak"],
        ["Voorgeschiedenis", "Hypertensie sinds 8 jaar, hoge cholesterol. Liesbreukoperatie rechts, 2019."],
        ["Bloedingen", "Nooit een ernstige bloeding, geen maagzweer"],
        ["Allergieën", "Nee"],
        ["Bloedverdunners", "Volgens patiënt nee (zie Medicatiebeheer: Asaflow)"],
        ["Familie", "Vader beroerte op 74. Zus hartritmestoornis."],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Ex-roker, 15 jaar gestopt / ±16 glazen per week"],
        ["Koffie", "3 tassen per dag"],
      ]],
      ["Slaap", [
        ["Snurken", "Luid, echtgenote ziet ademstops. Overdag moe."],
      ]],
      ["Algemeen", [
        ["Beroep", "Zelfstandig boekhouder, halftijds"],
        ["Sport en hobby", "Wielertoerist, 2× per week 60 km. Tuinieren. Past op de kleinkinderen."],
        ["Lengte / gewicht", "1,82 m / 88 kg"],
        ["Leeftijd", "66 jaar"],
        ["Verwijzing", "Via dr. Peeters, huisarts"],
      ]],
      ["Baseline", [
        ["AFEQT", "54 (0 tot 100, hoger = beter)"],
      ]],
    ],
  },
  {
    title: "Hartfalen",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Toenemend kortademig bij het stappen sinds 6 weken, dikke enkels"],
      ]],
      ["Klachten", [
        ["Plat liggen", "Slaapt met twee kussens"],
        ["Gewicht", "3 kg aangekomen in een maand"],
      ]],
      ["Medische achtergrond", [
        ["Voorgeschiedenis", "Gekende lekkende mitralisklep"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Gepensioneerd leraar / 74 jaar"],
      ]],
    ],
  },
  {
    title: "Borstpijn",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Branderig gevoel achter het borstbeen, sinds 3 maanden"],
      ]],
      ["Wanneer heb je pijn", [
        ["Erger bij", "Na de maaltijd, bij plat liggen, bij voorover buigen"],
        ["Bij inspanning", "Nee, fietsen en trappen gaan goed"],
      ]],
      ["Klachten", [
        ["Bijkomend", "Zuur oprispen"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Vrachtwagenchauffeur / 52 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn huisarts zag voorkamerfibrillatie op mijn ECG. Kan ik een afspraak krijgen bij de cardioloog?",
  "Vervelend om te horen. Bent u tijdens zo'n aanval ooit flauwgevallen, of heeft u pijn op de borst gehad?",
  "Nee, ik voel vooral mijn hart onregelmatig kloppen en ik ben sneller buiten adem.",
  "Bent u nu op dit moment kortademig in rust, of heeft u een scheve mond of moeite met spreken gehad?",
  "Nee, nu voel ik me goed.",
  "Dank u. Ik plan u in op de ritmeraadpleging en stuur u een korte vragenlijst om uw bezoek voor te bereiden."
];

export const VOICE_TASK = "Afspraak ingepland op de ritmeraadpleging: gekende VKF, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Uw ECG toont vandaag een normaal ritme. Op de echo is het hart goed, alleen de linker voorkamer is wat vergroot.",
  "En die aanvallen, zijn die gevaarlijk?",
  "Het risico is vooral een beroerte. Bij u is dat hoog genoeg om een bloedverdunner te starten. De Asaflow mag dan stoppen.",
  "Dat aspirientje? Dat wist ik niet."
];

export const SCRIBE_NOTE = [
  [
    "Anamnese",
    "Aanvallen van onregelmatige, snelle hartkloppingen sinds twee maanden, 2 à 3 per week, meestal enkele uren, eenmaal twee dagen. Uitgelokt door alcohol en zware maaltijden. Kortademig bij inspanning, sneller moe. Geen pijn op de borst, geen syncope. VKF 118/min op ECG huisarts, smartwatch-melding. Sinds 3 weken bisoprolol 2,5 mg: minder snel, niet minder vaak. Hypertensie, hypercholesterolemie. Alcohol ±16 eenheden per week. Luid snurken met ademstops. Neemt Asaflow 80 mg. Vader CVA op 74."
  ],
  [
    "Klinisch onderzoek",
    "Pols regelmatig, 64/min. Bloeddruk 148/88 mmHg. Harttonen regelmatig, geen souffle. Longen: vesiculair ademgeruis, geen crepitaties. Geen halsvenestuwing, geen enkeloedeem."
  ],
  [
    "Technische onderzoeken",
    "ECG: sinusritme 64/min, PR 180 ms, smal QRS, QTc 420 ms, geen ischemie. TTE: LVEF 58%, geen wandbewegingsstoornissen, LA licht gedilateerd (LAVI 38 ml/m²), geen relevant klepvitium. Labo: TSH 1,2 mU/l, eGFR 78 ml/min, Hb 14,6 g/dl."
  ],
  [
    "Risicoscores",
    "CHA2DS2-VA 2 (leeftijd, hypertensie). HAS-BLED 2. EHRA IIb."
  ],
  [
    "Diagnose",
    "Symptomatische paroxismale voorkamerfibrillatie. Arteriële hypertensie, onvoldoende gecontroleerd. Vermoeden van obstructief slaapapneu."
  ],
  [
    "Beleid",
    "Start apixaban 5 mg 2× per dag, stop Asaflow. Bisoprolol verder. Alcohol afbouwen, bloeddruk naar < 130/80 mmHg (overleg huisarts), gewicht. Aanvraag slaaponderzoek en Holter 7 dagen. Herevaluatie na 3 maanden, opvolging met AFEQT. Bij aanhoudende klachten: ritmecontrole bespreken, ablatie als optie. Vangnet: 112 bij pijn op de borst, syncope, plotse kortademigheid of tekenen van een beroerte. Dringend contact bij bloedingen."
  ]
];

export const DOCUMENTS = [
  [
    "Consultatieverslag",
    "Sjabloon Cardiologie, voor het patiëntendossier",
    "Gegenereerd"
  ],
  [
    "Brief aan de huisarts",
    "Bevindingen, diagnose en beleid voor de verwijzer",
    "Gegenereerd"
  ],
  [
    "Voorschrift apixaban",
    "Eliquis 5 mg, 2× per dag",
    "Gegenereerd"
  ],
  [
    "Aanvraag Holter 7 dagen",
    "Aantal en duur van de aanvallen in kaart brengen",
    "Gegenereerd"
  ],
  [
    "Aanvraag slaaponderzoek",
    "Vermoeden van obstructief slaapapneu",
    "Nog niet gegenereerd"
  ],
  [
    "Uitleg voor de patiënt",
    "Antistolling, wat te doen bij een aanval, wanneer 112 bellen",
    "Nog niet gegenereerd"
  ]
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënt de heer Atrium voor aanvallen van voorkamerfibrillatie sinds twee maanden. Met een CHA2DS2-VA van 2 starten we apixaban en stoppen we Asaflow. We pakken de risicofactoren aan en herevalueren over drie maanden.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënt Marc Atrium, geboren op 14 maart 1960, die ik recent op de ritmeraadpleging zag.",
  "REDEN VOOR CONTACT Verwezen wegens voorkamerfibrillatie, vastgelegd op uw ECG. Aanvallen van onregelmatige hartkloppingen sinds twee maanden.",
  "ANAMNESE Twee à drie aanvallen per week, meestal enkele uren, één keer twee dagen. Uitgelokt door alcohol en zware maaltijden. Kortademig bij inspanning op een helling, sneller moe. Geen pijn op de borst, nooit flauwgevallen. Sinds drie weken bisoprolol 2,5 mg: aanvallen minder snel, niet minder vaak. Gekend met hypertensie en hypercholesterolemie. Drinkt ongeveer 16 glazen alcohol per week. Snurkt luid met ademstops volgens zijn echtgenote. Neemt daarnaast Asaflow 80 mg. Vader had een beroerte op 74 jaar. Geen allergieën.",
  "KLINISCH ONDERZOEK Pols regelmatig, 64 per minuut. Bloeddruk 148/88 mmHg. Harttonen regelmatig, geen souffle. Geen tekenen van hartfalen.",
  "AANVULLENDE ONDERZOEKEN ECG: sinusritme 64 per minuut, normale geleidingstijden, geen ischemie. Echocardiografie: LVEF 58%, linker voorkamer licht gedilateerd, geen relevant klepvitium. Labo: TSH, nierfunctie en hemoglobine normaal.",
  "DIAGNOSE Symptomatische paroxismale voorkamerfibrillatie, EHRA IIb, CHA2DS2-VA 2. Arteriële hypertensie, onvoldoende gecontroleerd. Vermoeden van obstructief slaapapneu.",
  "BELEID We starten apixaban 5 mg tweemaal daags en stoppen Asaflow. Bisoprolol loopt verder. Graag uw hulp om de bloeddruk onder 130/80 mmHg te brengen. Marc wil zijn alcoholgebruik afbouwen. We vragen een slaaponderzoek en een Holter van zeven dagen aan. Herevaluatie over drie maanden. Bij aanhoudende klachten bespreken we ritmecontrole, met ablatie als optie. Hij weet dat hij 112 belt bij pijn op de borst, flauwvallen, plotse kortademigheid of tekenen van een beroerte, en dringend contact opneemt bij bloedingen.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, cardioloog"
];

export const FOLLOW_ROWS = [
  [
    "V. Pulmonalis",
    "Ablatie · week 3"
  ],
  [
    "M. Atrium",
    "Antistolling + frequentiecontrole · maand 3 · AFEQT ingevuld"
  ],
  [
    "F. Purkinje",
    "Cardioversie · week 4"
  ],
  [
    "E. Systole",
    "Overslagen · na Holter"
  ]
];

export const FOLLOW_ALERT = "Meldt koorts (38,6 °C) en pijn bij het slikken, drie weken na de ablatie. Neem vandaag contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met de hartkloppingen sinds uw vorige consult?",
  "Veel rustiger. Alleen na het communiefeest van mijn kleindochter had ik er nog een, na een uur was het over.",
  "Fijn om te horen. Neemt u de Eliquis elke ochtend en avond? En heeft u bloedingen of blauwe plekken gemerkt?",
  "Eén keer vergeten in het weekend. Geen bloedingen.",
  "Is er iets dat nog niet lukt zoals vroeger?",
  "De Kemmelberg op de fiets. Maar ik rijd weer mijn 60 km.",
  "Bent u flauwgevallen, of heeft u pijn op de borst of plots kortademig geweest?",
  "Nee, niets van dat."
];

export const FOLLOW_SCORES = [
  [
    "AFEQT (0 tot 100, hoger = beter)",
    "54",
    "76"
  ],
  [
    "Aanvallen",
    "2 à 3 per week",
    "1 in de laatste 3 weken (smartwatch)"
  ],
  [
    "Alcohol",
    "±16 glazen per week",
    "±4 glazen per week"
  ],
  [
    "Gewicht",
    "88 kg",
    "85 kg"
  ],
  [
    "Slaap",
    "Snurken, overdag moe",
    "CPAP sinds 6 weken, uitgeruster"
  ],
  [
    "Werk",
    "Halftijds, moe",
    "Halftijds, zonder klachten"
  ],
  [
    "Hobby",
    "Helling lukt niet, kortere ritten",
    "Weer 60 km, rustiger tempo"
  ]
];

export const FOLLOW_QUESTIONNAIRES = [
  [
    "Antistolling + frequentiecontrole (Marc)",
    "Week 2",
    "Start antistolling",
    "Inname 2× per dag, vergeten dosissen, bloedingen, blauwe plekken, bijwerkingen"
  ],
  [
    "Antistolling + frequentiecontrole (Marc)",
    "Maand 3",
    "Opvolging VKF",
    "AFEQT, aantal en duur van de aanvallen, smartwatch, therapietrouw, alcohol, gewicht, slaap, werk, hobby's, open vragen"
  ],
  [
    "Antistolling + frequentiecontrole (Marc)",
    "Maand 12",
    "Opvolging VKF + welzijn",
    "Idem, aangevuld met EQ-5D-5L"
  ],
  [
    "Elektrische cardioversie",
    "Dag 2",
    "Controle na cardioversie",
    "Ritme, huidirritatie, duizeligheid"
  ],
  [
    "Elektrische cardioversie",
    "Week 4",
    "Ritme en antistolling",
    "Nieuwe aanvallen, antistolling zonder onderbreking genomen"
  ],
  [
    "Ablatie",
    "Dag 2",
    "Controle na ablatie",
    "Lies, pijn op de borst, kortademigheid, koorts"
  ],
  [
    "Ablatie",
    "Week 2 tot 4",
    "Herstel na ablatie",
    "Koorts, pijn bij slikken, neurologische klachten, nieuwe aanvallen"
  ],
  [
    "Ablatie",
    "Maand 3 en 12",
    "Uitkomst na ablatie",
    "AFEQT, EQ-5D-5L, nieuwe aanvallen, tevredenheid, PREM"
  ]
];

export const FOLLOW_PLAN_INTRO = "De opvolging volgt de behandeling die de arts kiest. Kiest hij later voor een cardioversie of een ablatie, dan schakelt de opvolging mee.";

export const FOLLOW_PLAN_NOTE = "Elke vragenlijst gaat opnieuw de rode vlaggen na.";

export const MEDICATION_CASE = {
  "scrollableTranscript": true,
  "ask": "Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.",
  "found": "Dank u, ik heb 4 geneesmiddelen gevonden:",
  "confirm": "Ja, klopt. De Asaflow was ik vergeten, dat is maar een aspirientje.",
  "followUps": [
    {
      "question": "Genoteerd. Asaflow is een plaatjesremmer, ik zet dat apart voor de arts. Neemt u nog andere bloedverdunners, zoals Marevan, Xarelto of Eliquis?",
      "choices": [
        "Ja",
        "Nee"
      ],
      "answer": "Nee"
    }
  ],
  "schedule": {
    "header": "Apotheek De Brug · Medicatieschema · M. Atrium, ° 14-03-1960",
    "rows": [
      [
        "Co-Diovane 160 mg/12,5 mg filmomhulde tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Atorvastatine Sandoz 20 mg filmomhulde tabletten",
        "1 tablet 's avonds"
      ],
      [
        "Bisoprolol EG 2,5 mg tabletten",
        "1 tablet 's ochtends"
      ],
      [
        "Asaflow 80 mg maagsapresistente tabletten",
        "1 tablet 's middags"
      ]
    ]
  },
  "meds": [
    {
      "name": "Co-Diovane",
      "substance": "Valsartan + hydrochloorthiazide",
      "strength": "160 mg / 12,5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hoge bloeddruk",
      "source": "Foto in chat",
      "chatLabel": "Co-Diovane 160/12,5 mg · 1× per dag 's ochtends"
    },
    {
      "name": "Atorvastatine Sandoz",
      "substance": "Atorvastatine",
      "strength": "20 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's avonds",
      "indication": "Cholesterol",
      "source": "Foto in chat",
      "chatLabel": "Atorvastatine 20 mg · 1× per dag 's avonds"
    },
    {
      "name": "Bisoprolol EG",
      "substance": "Bisoprolol",
      "strength": "2,5 mg",
      "form": "Tablet",
      "frequency": "1× per dag, 's ochtends",
      "indication": "Hartritme (frequentiecontrole)",
      "source": "Foto in chat",
      "chatLabel": "Bisoprolol 2,5 mg · 1× per dag 's ochtends"
    },
    {
      "name": "Asaflow",
      "substance": "Acetylsalicylzuur",
      "strength": "80 mg",
      "form": "Maagsapresistente tablet",
      "frequency": "1× per dag, 's middags",
      "indication": "Plaatjesremmer",
      "source": "Foto in chat",
      "chatLabel": "Asaflow 80 mg · 1× per dag 's middags",
      "tag": {
        "label": "Plaatjesremmer",
        "tone": "amber"
      }
    }
  ],
  "notes": [
    {
      "label": "Anticoagulantia",
      "value": "Geen (bevestigd in de chat)",
      "tone": "ok"
    },
    {
      "label": "Plaatjesremmers",
      "value": "Asaflow 80 mg (gemarkeerd)",
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
