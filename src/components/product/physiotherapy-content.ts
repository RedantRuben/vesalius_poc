import type { ModuleKey } from '@/lib/modules';
import type { SiteLocale } from './content';

export const KINESITHERAPY_STEPS: Record<SiteLocale, Record<ModuleKey, [string, string, string]>> = {
  "nl": {
    "smartTriage": [
      "Via intake, chat of telefoon verzamelt Vesalius de klacht, het voorschrift, wat de chirurg toeliet en wanneer de patiënt kan komen.",
      "Een pijnlijke, gezwollen kuit na een operatie gaat vandaag naar de arts, niet naar de oefenzaal. Een verzwikte enkel waarop iemand nog stapt, krijgt een gewone plaats.",
      "Elke patiënt komt bij de kinesitherapeut met de juiste vaardigheid, op een uur dat past: sportkine na 17 uur, manuele therapie voor de ochtendploeg, bekkenbodem, of een huisbezoek. Uw team ziet waarom."
    ],
    "agenda": [
      "Afspraken uit intake, triage en de telefoonassistent komen samen in de agenda van elke kinesitherapeut in de praktijk.",
      "Een reeks sessies staat vooraf op vaste momenten die passen bij het werk van de patiënt. Wordt er een sessie verzet, dan schuift de reeks mee. Een rode vlag haalt een patiënt uit de reeks en naar de arts.",
      "Lotte vult vóór elke sessie een korte check-in in. U ziet wie klaar is, en hoe de knie zich voelde sinds de vorige keer."
    ],
    "preConsultation": [
      "Lotte krijgt een bericht en antwoordt wanneer het haar past, in haar eigen taal. Geen app te downloaden.",
      "Na een operatie? Dan volgen vragen over wat de chirurg deed en toeliet, pijn, zwelling en haar doelen, zoals in een goed kinesitherapeutisch eerste onderzoek. Vóór elke volgende sessie volgt een check-in van een minuut.",
      "U begint de eerste sessie met haar richtlijnen, rode vlaggen, doelen en nulmeting op een rij."
    ],
    "voiceReception": [
      "Lotte belt tijdens haar middagpauze. De assistent neemt meteen op, ook als u midden in een sessie staat.",
      "Welk moment past? Bij welke kinesitherapeut? En bij wie net geopereerd is: pijn in de kuit of koorts? Zo wordt de urgentie ingeschat, volgens klinische protocollen.",
      "Een verzette sessie gaat meteen in de agenda van dezelfde kinesitherapeut. Een rode vlag gaat naar uw team."
    ],
    "scribe": [
      "Op uw smartphone of computer, bij het begin van de sessie. Leg hem daarna gewoon neer en behandel.",
      "Het volgt wat de patiënt vertelt, wat u meet en wat u doet, en kent termen als stroke test, extension lag en leg press.",
      "Aan het einde staat de sessienota klaar, met de metingen naast die van de vorige sessies. U ziet in één oogopslag of de patiënt vooruitgaat."
    ],
    "medication": [
      "Lotte stuurt in de chat een foto van het medicatieschema van haar apotheek, zoals in WhatsApp. Een voorschrift, doosje of PDF kan ook.",
      "De assistent leest naam, werkzame stof, sterkte, vorm en frequentie uit, toont de lijst in de chat en vraagt of ze klopt.",
      "De bevestigde lijst staat in het dossier. U ziet meteen dat ze een bloedverdunner neemt tot dag 14, en dat de pil haar tromboserisico verhoogt."
    ],
    "documentGeneration": [
      "Vesalius gebruikt wat de intake, de check-ins en 32 sessienota's over de knie van Lotte vastlegden.",
      "Evolutieverslag, huisoefenschema, kennisgeving voor de mutualiteit, verslag terugkeer naar sport en eindbilan, volgens uw sjablonen.",
      "U past aan wat u wilt en zet het in het patiëntendossier, of stuurt het naar de chirurg."
    ],
    "smartFollowUp": [
      "Lotte krijgt vóór elke sessie een check-in van een minuut, en op week 2, maand 3, 6, 9 en 12 een volledige vragenlijst.",
      "Haar IKDC, ACL-RSI en uw eigen metingen worden vergeleken met haar nulmeting. Zo ziet u, en ziet zij, of de revalidatie werkt. Daarnaast vertelt ze hoe het gaat met slapen, werken en voetbal.",
      "Een pijnlijke, gezwollen kuit na een operatie? Dan krijgt uw team een signaal, zoals bij V. Poplitea. Een knie die iets dikker is na een zware sessie wordt genoteerd voor de volgende sessie, zonder alarm."
    ]
  },
  "en": {
    "smartTriage": [
      "Through intake, chat or phone, Vesalius collects the symptoms, prescription, the surgeon’s restrictions and the patient’s availability.",
      "A painful, swollen calf after surgery needs a doctor today, rather than the exercise room. A sprained ankle that still bears weight gets a routine appointment.",
      "Each patient sees a physiotherapist with the right skills at a suitable time: evening sports physiotherapy, early manual therapy for shift workers, pelvic floor care or a home visit. Your team can see why."
    ],
    "agenda": [
      "Bookings from intake, triage and the phone assistant come together in each physiotherapist’s diary.",
      "A series is booked at regular times around the patient’s work. Rescheduling adjusts the series. A red flag takes a patient out of the series and to a doctor.",
      "Lotte completes a short check-in before every session. You see who is ready and how the knee has felt since last time."
    ],
    "preConsultation": [
      "Lotte receives a message and replies when it suits her, in her own language. There’s no app to download.",
      "After surgery, the assistant asks about the operation and restrictions, pain, swelling and goals, as in a physiotherapy assessment. Each later session has a one-minute check-in.",
      "You start the first session with the surgeon’s instructions, red flags, goals and baseline in view."
    ],
    "voiceReception": [
      "Lotte calls during her lunch break. The assistant answers straight away, even while you are treating someone.",
      "Which time suits her? Which physiotherapist? For a recent operation: calf pain or fever? The assistant assesses urgency using clinical protocols.",
      "The rescheduled session goes straight into the same physiotherapist’s diary. A red flag is passed to your team."
    ],
    "scribe": [
      "Tap record on your phone or computer at the start of the session, then set it down and treat.",
      "Vesalius follows what the patient says, what you measure and what you do. It recognises terms such as stroke test, extension lag and leg press.",
      "The session note is ready with measurements alongside previous sessions. You can see progress at a glance."
    ],
    "medication": [
      "Lotte sends a photo of her pharmacy’s medication schedule in the chat, as she would on WhatsApp. A prescription, a box or a PDF works too.",
      "The assistant reads the name, active ingredient, strength, form and frequency, shows the list in the chat and asks her to confirm it.",
      "The confirmed list is in the record. You see the blood thinner until day 14 and that the contraceptive pill increases her thrombosis risk."
    ],
    "documentGeneration": [
      "Vesalius uses what the intake, check-ins and 32 session notes recorded about Lotte’s knee.",
      "Progress report, home exercise programme, health insurance notification, return-to-sport report and discharge assessment, using your templates.",
      "Make any edits you need and add the documents to the patient record or send them to the surgeon."
    ],
    "smartFollowUp": [
      "Lotte gets a one-minute check-in before each session and full questionnaires at week 2 and months 3, 6, 9 and 12.",
      "Her IKDC, ACL-RSI and your measurements are compared with her baseline, so you both see whether rehabilitation is working. She also describes sleep, work and football.",
      "A painful, swollen calf after surgery triggers an alert, as in V. Poplitea’s case. A slightly swollen knee after a demanding session is noted for next time, without an alarm."
    ]
  },
  "fr": {
    "smartTriage": [
      "Par l’anamnèse, le chat ou le téléphone, Vesalius recueille les plaintes, la prescription, les consignes du chirurgien et les disponibilités du patient.",
      "Un mollet douloureux et gonflé après une opération nécessite un médecin aujourd’hui, pas la salle d’exercices. Une entorse permettant encore l’appui reçoit un rendez-vous habituel.",
      "Chaque patient voit le kinésithérapeute compétent au bon horaire : kiné du sport en soirée, thérapie manuelle tôt le matin, périnée ou visite à domicile. Votre équipe voit le motif."
    ],
    "agenda": [
      "Les rendez-vous issus de l’anamnèse, du triage et de l’assistant téléphonique arrivent dans l’agenda de chaque kinésithérapeute.",
      "Une série est prévue à heures fixes selon le travail du patient. Une séance déplacée adapte la série. Un signal d’alerte interrompt la série et oriente vers le médecin.",
      "Lotte remplit un bref suivi avant chaque séance. Vous voyez qui est prêt et comment le genou a réagi depuis la dernière fois."
    ],
    "preConsultation": [
      "Lotte reçoit un message et répond quand elle le souhaite, dans sa langue. Aucune application à télécharger.",
      "Après une opération, les questions portent sur le geste, les consignes, la douleur, le gonflement et les objectifs. Chaque séance suivante est précédée d’un suivi d’une minute.",
      "Vous commencez la première séance avec les consignes, signes d’alerte, objectifs et mesures initiales sous les yeux."
    ],
    "voiceReception": [
      "Lotte appelle pendant sa pause de midi. L’assistant décroche immédiatement, même en pleine séance.",
      "Quel horaire convient ? Chez quel kinésithérapeute ? Après une opération récente : mollet douloureux ou fièvre ? L’urgence est évaluée selon les protocoles cliniques.",
      "La séance déplacée est inscrite directement chez le même kinésithérapeute. Un signe d’alerte est transmis à votre équipe."
    ],
    "scribe": [
      "Lancez l’enregistrement sur votre téléphone ou ordinateur au début de la séance, puis posez l’appareil et traitez.",
      "Vesalius suit les propos du patient, vos mesures et vos gestes. Il reconnaît des termes comme stroke test, extension lag et leg press.",
      "La note est prête avec les mesures comparées aux séances précédentes. Vous voyez les progrès en un coup d’œil."
    ],
    "medication": [
      "Lotte envoie une photo du schéma de médication de sa pharmacie dans le chat, comme sur WhatsApp. Une ordonnance, une boîte ou un PDF conviennent aussi.",
      "L’assistant relève le nom, la substance active, le dosage, la forme et la fréquence, affiche la liste et demande à Lotte de la confirmer.",
      "La liste confirmée figure dans le dossier. Vous voyez l’anticoagulant jusqu’au jour 14 et le risque thrombotique augmenté par la pilule."
    ],
    "documentGeneration": [
      "Vesalius reprend ce que l’anamnèse, les suivis et 32 notes de séance ont consigné sur le genou de Lotte.",
      "Rapport d’évolution, programme à domicile, notification à la mutualité, rapport de retour au sport et bilan final, selon vos modèles.",
      "Vous modifiez les documents et les versez au dossier ou les envoyez au chirurgien."
    ],
    "smartFollowUp": [
      "Lotte reçoit un suivi d’une minute avant chaque séance et des questionnaires complets à la semaine 2 et aux mois 3, 6, 9 et 12.",
      "Son IKDC, son ACL-RSI et vos mesures sont comparés au bilan initial. Vous voyez ensemble si la rééducation fonctionne. Elle raconte aussi le sommeil, le travail et le football.",
      "Un mollet douloureux et gonflé après une opération déclenche une alerte, comme chez V. Poplitea. Un léger gonflement après une séance intense est noté pour la suivante, sans alarme."
    ]
  }
};

export const KINESITHERAPY_TRAJECTORY: Record<SiteLocale, (step: number, total: number) => string> = {
  nl: (step, total) => `Voorbeeld: het traject van Lotte Cruciatum, 24, kruisbandreconstructie · stap ${step} van ${total}`,
  en: (step, total) => `Example in Dutch: Lotte Cruciatum, 24, ACL reconstruction · step ${step} of ${total}`,
  fr: (step, total) => `Exemple en néerlandais : Lotte Cruciatum, 24 ans, reconstruction du LCA · étape ${step} sur ${total}`,
};
