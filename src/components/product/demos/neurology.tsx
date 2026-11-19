'use client';

import {
  AgendaCaseDemo, DocumentCaseDemo, FollowUpCaseDemo, PreConsultationCaseDemo,
  REFERRAL_STYLE, RecoveryScoreBars, ScribeCaseDemo, TriageCaseDemo, VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import {
  DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT, INTAKE_SUMMARIES,
  LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './neurology-data';

const EVA = { name: 'Eva Trigeminus', initials: 'ET', dob: '22-06-1992', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  Hoofdpijn: REFERRAL_STYLE.MKA,
  'Zelfde dag': REFERRAL_STYLE.Spoed,
  Tandarts: REFERRAL_STYLE.Kinesitherapie,
  Epilepsie: REFERRAL_STYLE.Orthognatisch,
};

export function NeurologyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={EVA}
      rows={TRIAGE_ROWS}
      urgentInitials="CW"
      alert={{ name: 'C. Willis', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function NeurologyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={EVA}
      visits={VISITS}
      urgentInitials="GT"
      referrals="1 patiënt naar spoed, 2 doorgestuurd naar een collega"
    />
  );
}

export function NeurologyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={EVA}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Hoofdpijnpatroon', 'Acute medicatie']}
      highlightField="Dagen per maand"
      revealAt={{ 'Reden van consultatie': 2, Hoofdpijnpatroon: 4, 'Acute medicatie': 4 }}
      options={{ after: 5, rows: [['Ja', 'Nee']], selected: 'Ja' }}
      finalOptions={[]}
    />
  );
}

export function NeurologyVoiceDemo() {
  return <VoiceCaseDemo patient={EVA} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function NeurologyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={EVA}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Neurologie"
      options={['Hoofdpijn', 'Epilepsie', 'Bewegingsstoornissen', 'Neuromusculair']}
      questionnaire="Hoofdpijn"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function NeurologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={EVA} />;
}

export function NeurologyDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={EVA}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 3, 1]}
      documentBadges={{ 3: 'Ingevuld vanuit de intake' }}
    />
  );
}

const MEASURES = [
  { label: 'Migrainedagen per maand', max: 31, before: 10, after: 4, showRange: false },
  { label: 'HIT-6', min: 36, max: 78, before: 67, after: 55 },
  { label: 'MIDAS', max: 60, before: 48, after: 14, showRange: false },
];

export function NeurologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={EVA}
      rows={FOLLOW_ROWS}
      initials={['VV', 'ET', 'OB', 'AC']}
      alert={{ name: 'V. Vagus', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 3"
      charts={<div className="mb-3"><RecoveryScoreBars measures={MEASURES} period="Baseline → maand 3" color={EVA.color} /></div>}
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Maand 3']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="CGRP-antistof (Eva)"
      completedMoment="Maand 3"
    />
  );
}
