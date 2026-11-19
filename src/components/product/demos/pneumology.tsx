'use client';

import {
  AgendaCaseDemo, DocumentCaseDemo, FollowUpCaseDemo, PreConsultationCaseDemo,
  REFERRAL_STYLE, RecoveryScoreBars, ScribeCaseDemo, TriageCaseDemo, VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import {
  DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_QUOTE, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT,
  INTAKE_SUMMARIES, LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './pneumology-data';

const PAUL = { name: 'Paul Bronchus', initials: 'PB', dob: '22-08-1962', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  COPD: REFERRAL_STYLE.MKA,
  Cardiologie: REFERRAL_STYLE.Kinesitherapie,
  Astma: REFERRAL_STYLE.Orthognatisch,
  'Thoracale oncologie': REFERRAL_STYLE.Orthognatisch,
};

export function PneumologyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={PAUL}
      rows={TRIAGE_ROWS}
      urgentInitials="PP"
      alert={{ name: 'P. Pleura', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function PneumologyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={PAUL}
      visits={VISITS}
      urgentInitials="HH"
      referrals="2 patiënten doorgestuurd naar een collega"
    />
  );
}

export function PneumologyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={PAUL}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Opstoten', 'Medische achtergrond']}
      highlightField={['Voorbije jaar', 'Eerdere behandeling']}
      revealAt={{ 'Reden van consultatie': 2, Opstoten: 5, 'Medische achtergrond': 5 }}
      finalOptions={['Nooit', '1 keer', '2 keer of meer']}
    />
  );
}

export function PneumologyVoiceDemo() {
  return <VoiceCaseDemo patient={PAUL} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function PneumologyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={PAUL}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Pneumologie"
      options={['COPD', 'Astma', 'Slaapapneu', 'Thoracale oncologie']}
      questionnaire="COPD"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function PneumologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={PAUL} />;
}

export function PneumologyDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={PAUL}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 3, 1]}
    />
  );
}

const MEASURES = [
  { label: 'CAT', max: 40, before: 22, after: 15 },
  { label: 'mMRC', max: 4, before: 2, after: 2 },
];

export function PneumologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={PAUL}
      rows={FOLLOW_ROWS}
      initials={['BB', 'PB', 'DD', 'EE']}
      alert={{ name: 'B. Bronchiolus', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 3"
      checkInNote={FOLLOW_QUOTE}
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Baseline → maand 3" color={PAUL.color} />
          <p className="mt-3"><span className="inline-flex rounded-full bg-[#E9FFF7] px-2 py-0.5 text-[10px] font-semibold text-[#1F9E6E]">Rookvrij · 7 weken</span></p>
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Maand 3']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Inhalatietherapie + rookstop (Paul)"
      completedMoment="Maand 3"
    />
  );
}
