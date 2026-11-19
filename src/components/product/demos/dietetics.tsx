'use client';

import Image from 'next/image';
import {
  AgendaCaseDemo,
  DocumentCaseDemo,
  FollowUpCaseDemo,
  PreConsultationCaseDemo,
  REFERRAL_STYLE,
  RecoveryScoreBars,
  ScribeCaseDemo,
  TriageCaseDemo,
  VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import {
  DOCUMENTS,
  FOLLOW_ALERT,
  FOLLOW_CHAT,
  FOLLOW_PLAN_INTRO,
  FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES,
  FOLLOW_ROWS,
  FOLLOW_SCORES,
  INTAKE_CHAT,
  INTAKE_SUMMARIES,
  LETTER,
  LETTER_PREVIEW,
  MEDICATION_CASE,
  SCRIBE_CHAT,
  SCRIBE_NOTE,
  TRIAGE_ALERT,
  TRIAGE_ROWS,
  VISITS,
  VOICE_CHAT,
  VOICE_TASK,
} from './dietetics-data';

const LUC = { name: 'Luc Pancreas', initials: 'LP', dob: '09-05-1968', color: '#2C766A' };
const REFERRALS = {
  'Vandaag contact': REFERRAL_STYLE.Spoed,
  'Diabetes en gewicht': REFERRAL_STYLE.MKA,
  'Maag-darm': REFERRAL_STYLE.Orthognatisch,
  'Huisarts eerst': REFERRAL_STYLE.Kinesitherapie,
  Eetstoornisteam: REFERRAL_STYLE.Kinesitherapie,
  'Geen rode vlag': REFERRAL_STYLE['Normaal verloop'],
};

export function DieteticsTriageDemo() {
  return (
    <TriageCaseDemo
      patient={LUC}
      rows={TRIAGE_ROWS}
      urgentInitials="IL"
      alert={{ name: 'I. Langerhans', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function DieteticsAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={LUC}
      visits={VISITS}
      urgentInitials="IL"
      referrals="2 patiënten eerst doorgestuurd naar de huisarts"
      readyLabel="Vragenlijst en maaltijdfoto's ontvangen"
      hours={['08:30', '09:00', '09:30', '10:00', '10:30']}
    />
  );
}

const MEALS = [
  { src: '/demo/dietetics/lunch.jpg', label: 'Middag · broodjes en cola' },
  { src: '/demo/dietetics/dinner.jpg', label: 'Avond · warm eten' },
  { src: '/demo/dietetics/snack.jpg', label: 'Avondsnack · chips' },
];

export function DieteticsPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={LUC}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Eetpatroon', 'Baseline']}
      highlightField="Dranken"
      revealAt={{ 'Reden van consultatie': 2, Eetpatroon: 4 }}
      finalOptions={['Ja', 'Liever niet']}
      summaryAttachment={{
        section: 'Eetpatroon',
        content: (
          <div className="mt-2 pl-4">
            <div className="flex flex-wrap gap-2">
              {MEALS.map(({ src, label }) => (
                <Image key={src} src={src} alt={label} width={56} height={56} className="rounded-lg object-cover ring-1 ring-[#E8EAEC]" />
              ))}
            </div>
            <p className="mt-1 text-[10px] text-[#949CB1]">Voorbeeldfoto’s · selectie uit het maaltijddagboek</p>
          </div>
        ),
      }}
    />
  );
}

export function DieteticsVoiceDemo() {
  return <VoiceCaseDemo patient={LUC} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function DieteticsScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={LUC}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Diëtiek"
      options={['Diabetes en gewicht', 'Maag-darm', 'Ondervoeding', 'Pediatrie']}
      questionnaire="Diabetes type 2 en gewicht"
      clinicianRole="Diëtist"
      speakers={['Diëtist', 'Patiënt', 'Diëtist', 'Partner', 'Patiënt']}
      featuredSections={['Diëtistische diagnose (PES)', 'Interventie']}
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function DieteticsMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={LUC} />;
}

export function DieteticsDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={LUC}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 1]}
    />
  );
}

const MEASURES = [
  { label: 'Gewicht (thuis gemeten)', max: 120, before: 98.4, after: 96.2, suffix: ' kg', showRange: false },
  { label: 'Buikomtrek (thuis gemeten)', max: 140, before: 112, after: 110, suffix: ' cm', showRange: false },
  { label: 'PAID-5', max: 20, before: 9, after: 7 },
];

export function DieteticsFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={LUC}
      rows={FOLLOW_ROWS}
      initials={['IL', 'LP', 'CC', 'PP']}
      alert={{ name: 'I. Langerhans', detail: FOLLOW_ALERT }}
      greeting="Hallo Andreas!"
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 6"
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Intake → week 6" color={LUC.color} />
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Intake', 'Week 6']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      plansTitle="Vragenlijsten per begeleiding"
      treatment="Diabetes en gewicht (Luc)"
      completedMoment="Week 6"
    />
  );
}
