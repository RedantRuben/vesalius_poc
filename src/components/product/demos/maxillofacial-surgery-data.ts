// Dutch product examples supplied in “Website-inhoud MKA-chirurgie”, §7.

export const TRIAGE_ROWS = [
  {"name": "H. Hyoid", "initials": "HH", "channel": "telefoon", "summary": "Snel toenemende zwelling onder de kaak links, moeilijk slikken, koorts", "referral": "Spoed", "tasks": 1},
  {"name": "L. Mandibula", "initials": "LM", "channel": "chat", "summary": "Derde ontsteking rond half doorgebroken verstandskies linksonder, panoramische foto bij de tandarts", "referral": "MKA", "tasks": 0},
  {"name": "C. Condylus", "initials": "CC", "channel": "chat", "summary": "Klikken en pijn vóór het oor bij kauwen, sinds 4 weken, nog niet behandeld", "referral": "Kinesitherapie", "tasks": 0},
  {"name": "S. Maxillaris", "initials": "SM", "channel": "telefoon", "summary": "Drukkende pijn in de wang, verstopte neus, koorts, geen tandprobleem", "referral": "NKO", "tasks": 0},
  {"name": "P. Gnathion", "initials": "PG", "channel": "chat", "summary": "Onderbeet, orthodontist vraagt advies kaakoperatie", "referral": "Orthognatisch", "tasks": 0},
  {"name": "L. Lingualis", "initials": "LL", "channel": "chat", "summary": "Zweer aan de tongrand die na 5 weken niet geneest", "referral": "Voorrang", "tasks": 1},
  {"name": "B. Buccinator", "initials": "BB", "channel": "chat", "summary": "Dag 2 na extractie, wang gezwollen, geen koorts, slikken gaat. Nazorgadvies gegeven.", "referral": "Normaal verloop", "tasks": 0},
];

export const TRIAGE_ALERT = "Snel toenemende zwelling onder de kaak, moeilijk slikken en koorts. Doorverwezen naar spoedgevallen, secretariaat verwittigd.";

export const VISITS = [
  {"room": 1, "slot": 0, "length": 1, "name": "R. Ramus", "initials": "RR", "reason": "Controle 6 weken na kaakfractuur"},
  {"room": 1, "slot": 1, "length": 1, "name": "L. Lingualis", "initials": "LL", "reason": "Voorrang · zweer tongrand, biopsie"},
  {"room": 1, "slot": 2, "length": 1, "name": "P. Molaris", "initials": "PM", "reason": "Implantaat 36, controle na 3 maanden"},
  {"room": 2, "slot": 0, "length": 2, "name": "L. Mandibula", "initials": "LM", "reason": "Nieuwe patiënt · verstandskiezen, CBCT"},
  {"room": 3, "slot": 1, "length": 1, "name": "A. Alveolaris", "initials": "AA", "reason": "Controle droge alveole na extractie 38"},
  {"room": 3, "slot": 3, "length": 1, "name": "M. Masseter", "initials": "MM", "reason": "Kaakgewricht, controle opbeetplaat"},
  {"room": 3, "slot": 4, "length": 1, "name": "H. Hyoid", "initials": "HH", "reason": "Wondcontrole na drainage op spoed"},
];

export const INTAKE_CHAT = [
  "Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?",
  "Sinds februari ontsteekt mijn tandvlees rond mijn verstandskies linksonder steeds opnieuw. Al drie keer, de laatste keer drie weken geleden.",
  "Hoe erg is de pijn tijdens zo'n ontsteking, op 10? En nu?",
  "Tijdens een ontsteking 8, nu 2.",
  "Voelt uw onderlip, kin of tong ergens doof of tintelend aan?",
];

export const INTAKE_SUMMARIES: { title: string; sections: [string, [string, string][]][] }[] = [
  {
    title: "Verstandskiezen",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Terugkerende ontsteking van het tandvlees rond de verstandskies linksonder. Verwezen door tandarts De Smet."],
        ["Duur", "Sinds februari, drie opstoten, laatste drie weken geleden"],
      ]],
      ["Aard van de pijn", [
        ["Tijdens een opstoot", "8/10, kloppend, uitstraling naar het linkeroor"],
        ["Nu", "2/10"],
      ]],
      ["Wanneer heb je pijn", [
        ["Erger bij", "Eten dat blijft steken, hard kauwen, vermoeid of gestresseerd"],
        ["Beter bij", "Spoelen met zout water, ibuprofen, antibiotica"],
      ]],
      ["Mond en kaak", [
        ["Mondopening", "Normaal, tijdens een opstoot maar 2 vingers"],
        ["Kaakgewricht", "Geen klikken, geen pijn vóór het oor"],
        ["Rechtsonder", "Eten blijft soms steken, nooit ontstoken"],
        ["Gevoel lip, kin en tong", "Normaal"],
      ]],
      ["Rode vlaggen", [
        ["Zwelling onder de kaak, slikken, ademen", "Nee"],
        ["Koorts nu", "Nee"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Tandarts: 2× amoxicilline, chloorhexidinespoeling"],
        ["Beeldvorming elders", "Panoramische foto bij tandarts De Smet, 16 oktober 2026"],
        ["Voorgeschiedenis", "Inspanningsastma, hooikoorts. Beugel van 12 tot 14 jaar, vaste retentiedraad onder"],
        ["Operaties en narcose", "Geen, nooit narcose gehad"],
        ["Allergieën", "Geen geneesmiddelallergie (graspollen)"],
        ["Bloedverdunners", "Nee"],
        ["Bloedingsneiging", "Nee, ook niet in de familie"],
      ]],
      ["Sociale anamnese", [
        ["Roken / alcohol", "Nee / 3 à 4 glazen per week"],
        ["Voorkeur verdoving", "Liefst onder narcose"],
      ]],
      ["Algemeen", [
        ["Beroep", "Leerkracht derde leerjaar"],
        ["Sport en hobby", "Hockey, 2× per week en wedstrijd op zondag. Zingt in een koor."],
        ["Lengte / gewicht", "1,68 m / 61 kg"],
        ["Leeftijd", "24 jaar"],
        ["Verwijzing", "Via dr. De Smet, tandarts"],
      ]],
      ["Baseline", [
        ["OHIP-14", "18 (0–56, lager = beter)"],
      ]],
    ],
  },
  {
    title: "Kaakgewricht",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Pijn in de kaakspieren beiderzijds, vooral 's ochtends, klikken rechts, sinds 7 maanden"],
      ]],
      ["Aard van de pijn", [
        ["Pijn", "6/10, erger bij kauwen en bij stress"],
      ]],
      ["Mond en kaak", [
        ["Mondopening", "3 vingers, beter in de loop van de dag"],
        ["Tandenknarsen", "Ja, volgens de partner"],
      ]],
      ["Medische achtergrond", [
        ["Eerdere behandeling", "Kinesitherapie, 6 sessies, opbeetplaat van de tandarts"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Boekhouder / 39 jaar"],
      ]],
    ],
  },
  {
    title: "Implantologie",
    sections: [
      ["Reden van consultatie", [
        ["Aanleiding", "Ontbrekende kies linksonder (36), 4 maanden geleden getrokken, wil een implantaat"],
      ]],
      ["Medische achtergrond", [
        ["Medicatie", "Alendronaat 70 mg wekelijks sinds 3 jaar (osteoporose)"],
        ["Bloedverdunners", "Nee"],
      ]],
      ["Sociale anamnese", [
        ["Roken", "10 sigaretten per dag"],
      ]],
      ["Algemeen", [
        ["Beroep / leeftijd", "Gepensioneerd postbode / 67 jaar"],
      ]],
    ],
  },
];

export const VOICE_CHAT = [
  "Hallo, mijn tandarts zegt dat mijn verstandskiezen eruit moeten. Kan ik een afspraak krijgen bij de kaakchirurg?",
  "Zeker. Is het tandvlees rond die kies ontstoken geweest, en heeft uw tandarts al een foto gemaakt?",
  "Ja, al drie keer ontstoken. En er is vorige maand een foto gemaakt.",
  "Heeft u nu een zwelling onder uw kaak, koorts, of moeite met slikken of uw mond openen?",
  "Nee, nu is het rustig.",
  "Dank u. Ik plan u in bij de MKA-chirurg en stuur u een korte vragenlijst om uw bezoek voor te bereiden.",
];

export const VOICE_TASK = "Afspraak ingepland bij de MKA-chirurg: terugkerende ontsteking rond verstandskies, foto bij de tandarts, geen rode vlaggen";

export const SCRIBE_CHAT = [
  "Doe uw mond eens zo ver mogelijk open. Mooi, 46 millimeter.",
  "Tijdens die ontsteking ging dat maar half.",
  "Ik raak nu uw onderlip en kin aan. Voelt dat links hetzelfde als rechts?",
  "Ja, helemaal hetzelfde.",
  "Op de 3D-foto ziet u dat de zenuw vlak naast de wortels van uw linkse kies loopt. Daarom bespreken we dat risico samen.",
];

export const SCRIBE_NOTE = [
  ["Anamnese", "Drie opstoten van pericoronitis rond 38 sinds februari, laatste drie weken geleden, behandeld met amoxicilline. Pijn tijdens opstoot 8/10 met uitstraling naar het linkeroor en beperkte mondopening, nu 2/10. Voedselretentie rechtsonder zonder ontsteking. Geen kaakgewrichtsklachten. Geen gevoelsstoornissen lip, kin of tong. Inspanningsastma, hooikoorts. Geen bloedverdunners, geen bloedingsneiging. Voorkeur voor narcose."],
  ["Klinisch onderzoek", "Extraoraal geen zwelling, geen palpabele lymfeklieren. Mondopening 46 mm. Kaakgewrichten zonder klikken of drukpijn. Sensibiliteit onderlip, kin en tong beiderzijds normaal. 38 partieel doorgebroken, operculum licht rood, geen pus. 48 partieel doorgebroken, voedselretentie distaal 47. 18 en 28 doorgebroken, in occlusie. Retentiedraad 33–43 intact."],
  ["Medische beeldvorming", "Panoramische foto (tandarts, 16-10-2026): 38 en 48 mesioangulair, partieel geïmpacteerd. Wortels 38 over de canalis mandibularis met onderbreking van de corticale begrenzing. CBCT: canalis linguaal van de wortels van 38, contact zonder insnoering. 48 op 2 mm van het kanaal. Geen cariës distaal 37 en 47."],
  ["Diagnose", "Recidiverende pericoronitis bij partieel geïmpacteerde 38. Partieel geïmpacteerde 48 met voedselretentie. Nauwe relatie 38 met de canalis mandibularis."],
  ["Beleid", "Verwijdering 38 en 48 in het dagziekenhuis onder algemene anesthesie. Risico's besproken, in het bijzonder gevoelsstoornis onderlip, kin en tong. Coronectomie 38 als peroperatieve optie. 18 en 28 behouden. Astma melden aan anesthesie. Postoperatief paracetamol en ibuprofen, chloorhexidine vanaf dag 2, attest. Opvolging dag 1, 3, 7 en maand 3. Vangnet: dringend contact bij nabloeding, toenemende zwelling met koorts, slik- of ademhalingsproblemen, toenemende pijn naar het oor."],
];

export const DOCUMENTS = [
  ["Consultatieverslag", "Sjabloon MKA-chirurgie, voor het patiëntendossier", "Gegenereerd"],
  ["Brief aan de tandarts", "Bevindingen, diagnose en beleid voor de verwijzer, kopie huisarts", "Gegenereerd"],
  ["Toestemmingsformulier", "Verwijdering verstandskiezen, met de besproken risico's", "Gegenereerd"],
  ["Opname dagziekenhuis", "Ingreep onder algemene anesthesie, met anesthesievragenlijst", "Gegenereerd"],
  ["Voorschrift", "Pijnstilling en chloorhexidinespoeling na de ingreep", "Nog niet gegenereerd"],
  ["Nazorg na extractie", "Uitleg voor de patiënt: koelen, eten, spoelen, wanneer dringend bellen", "Nog niet gegenereerd"],
  ["Attest arbeidsongeschiktheid", "Voor de school, na de ingreep", "Nog niet gegenereerd"],
];

export const LETTER_PREVIEW = "Geachte collega, ik zag uw patiënte mevrouw Mandibula voor een terugkerende ontsteking rond de verstandskies linksonder. De CBCT toont de wortels van 38 in contact met de canalis mandibularis, zonder insnoering. We verwijderen 38 en 48 in het dagziekenhuis onder algemene anesthesie.";

export const LETTER = [
  "Geachte collega,",
  "Ik schrijf u over uw patiënte Lotte Mandibula, geboren op 8 mei 2002, die ik recent op consultatie zag.",
  "REDEN VOOR CONTACT Verwezen wegens terugkerende ontsteking rond de verstandskies linksonder (38). Drie opstoten in negen maanden.",
  "ANAMNESE Drie episodes van pericoronitis rond 38 sinds februari, telkens met pijn tot 8 op 10, uitstraling naar het linkeroor en beperkte mondopening. Twee keer behandeld met amoxicilline en chloorhexidine, laatste kuur afgerond in oktober. Rechtsonder blijft soms voedsel steken, zonder ontsteking. Geen klachten van het kaakgewricht. Geen gevoelsstoornissen van lip, kin of tong. Voorgeschiedenis: inspanningsastma, hooikoorts, orthodontische behandeling met vaste retentiedraad onder. Medicatie: orale anticonceptie, salbutamol bij inspanning, cetirizine in het pollenseizoen, ibuprofen bij pijn (goed verdragen). Geen bloedverdunners, geen bloedingsneiging, geen geneesmiddelallergie. Rookt niet.",
  "KLINISCH ONDERZOEK Extraoraal geen zwelling, geen palpabele lymfeklieren. Mondopening 46 mm. Kaakgewrichten zonder klikken of drukpijn. Sensibiliteit van onderlip, kin en tong beiderzijds normaal. Intraoraal: 38 partieel doorgebroken met licht geïrriteerd operculum, geen pus. 48 partieel doorgebroken met voedselretentie distaal van 47. 18 en 28 volledig doorgebroken en in occlusie. Retentiedraad intact.",
  "AANVULLENDE ONDERZOEKEN Panoramische foto (16 oktober 2026, uw praktijk): 38 en 48 mesioangulair en partieel geïmpacteerd. Wortels van 38 projecteren over de canalis mandibularis, met onderbreking van de corticale begrenzing. CBCT: canalis mandibularis linguaal van de wortels van 38, in contact zonder insnoering. 48 op 2 mm van het kanaal. Geen cariës distaal van 37 en 47, geen cysteuze afwijking.",
  "DIAGNOSE Recidiverende pericoronitis bij partieel geïmpacteerde 38. Partieel geïmpacteerde 48 met voedselretentie. Nauwe relatie van 38 met de canalis mandibularis.",
  "BELEID Chirurgische verwijdering van 38 en 48 in het dagziekenhuis onder algemene anesthesie, op voorkeur van de patiënte. De risico's werden besproken, in het bijzonder een tijdelijke en zelden blijvende gevoelsstoornis van onderlip, kin of tong. Coronectomie van 38 blijft een peroperatieve optie. 18 en 28 blijven behouden; graag uw opvolging van eventuele elongatie. De anesthesist wordt op de hoogte gebracht van haar astma. Na de ingreep krijgt ze paracetamol en ibuprofen gedurende enkele dagen, chloorhexidinespoeling vanaf dag 2 en een attest arbeidsongeschiktheid. Opvolging via vragenlijsten op dag 1, 3 en 7 en na drie maanden. Ze weet dat ze dringend contact opneemt bij een nabloeding die niet stopt, toenemende zwelling met koorts, moeite met slikken of ademen, of toenemende pijn naar het oor na enkele dagen.",
  "Met vriendelijke groeten, Dr. Andreas Vesalius, MKA-chirurg",
  "Kopie: dr. Claes, huisarts",
];

export const FOLLOW_ROWS = [
  ["A. Alveolaris", "Extractie 38 · dag 4"],
  ["L. Mandibula", "Extractie verstandskiezen · dag 7 · PoSSe ingevuld"],
  ["B. Buccinator", "Extractie 48 · dag 2 · normaal verloop"],
  ["M. Masseter", "Kaakgewricht conservatief · week 6"],
  ["P. Molaris", "Implantaat 36 · maand 3"],
];

export const FOLLOW_ALERT = "Meldt toenemende, kloppende pijn uitstralend naar het oor en een slechte smaak, vier dagen na de extractie van 38. Neem contact op.";

export const FOLLOW_CHAT = [
  "Hoe gaat het met de pijn sinds de ingreep?",
  "Veel beter. De derde dag zag ik eruit als een hamster, maar sinds gisteren eet ik weer pasta.",
  "Fijn om te horen. Wordt de pijn de laatste dagen weer erger, of straalt ze uit naar uw oor?",
  "Nee, het wordt elke dag beter.",
  "Voelt uw onderlip, kin of tong nog anders aan dan vroeger?",
  "Nee, die tinteling van dag 3 is weg. Mag ik zondag al hockeyen met mijn mondbeschermer?",
];

export const FOLLOW_SCORES = [
  ["NRS pijn (0 tot 10, lager = beter)", "2", "5", "1"],
  ["Zwelling", "Geen", "Duidelijk, beide wangen", "Bijna weg"],
  ["Mondopening (vingerbreedtes, hoger = beter)", "3", "1,5", "3"],
  ["Gevoel onderlip en kin", "Normaal", "Lichte tinteling links", "Normaal"],
  ["PoSSe (0 tot 100, lager = beter)", "–", "–", "24"],
  ["Eten", "Normaal", "Soep en pap", "Zacht, pasta"],
  ["Slaap", "Goed", "Onrustig", "Goed"],
  ["Werk", "Lesgeven", "Thuis, met attest", "Terug aan het werk"],
  ["Hockey", "2× per week", "Gestopt", "Vanaf week 2"],
];

export const FOLLOW_QUESTIONNAIRES = [
  ["Extractie verstandskiezen (Lotte)", "Dag 1", "Avond na de ingreep", "Nabloeding, pijn, misselijkheid na narcose, pijnstilling genomen"],
  ["Extractie verstandskiezen (Lotte)", "Dag 3", "Herstel na extractie", "NRS pijn, zwelling, mondopening, koorts, gevoel lip, kin en tong, eten"],
  ["Extractie verstandskiezen (Lotte)", "Dag 7", "Herstel + PoSSe", "PoSSe, pijn die toeneemt naar het oor, werk, sport, open vragen"],
  ["Extractie verstandskiezen (Lotte)", "Maand 3", "Uitkomst", "OHIP-14, gevoel lip en tong, tevredenheid, PREM"],
  ["Kaakgewricht conservatief", "Week 6", "Opvolging kaakgewricht", "JFLS-8, NRS pijn, mondopening, klikken, opbeetplaat gedragen, stress, slaap"],
  ["Kaakgewricht conservatief", "Maand 3", "Opvolging kaakgewricht + welzijn", "Idem, aangevuld met OHIP-14"],
  ["Implantaat", "Week 1", "Na plaatsing", "Pijn, zwelling, bloeding, wonde, roken"],
  ["Implantaat", "Maand 3", "Vóór de kroon", "Comfort, ontsteking rond het implantaat, OHIP-14"],
  ["Implantaat", "Jaar 1", "Uitkomst", "OHIP-14, kauwen, tevredenheid, PREM"],
];
