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
} from './cardiology-data';

const MARC = { name: 'Marc Atrium', initials: 'MA', dob: '14-03-1960', color: '#2C766A' };
const REFERRALS = {
  'Zelfde dag': REFERRAL_STYLE.Spoed,
  Ritme: REFERRAL_STYLE.MKA,
  'Algemene cardiologie': REFERRAL_STYLE['Normaal verloop'],
  'Hartfalen en kleppen': REFERRAL_STYLE.MKA,
  'Gastro-enterologie': REFERRAL_STYLE.Orthognatisch,
};

export function CardiologyTriageDemo() {
  return <TriageCaseDemo patient={MARC} rows={TRIAGE_ROWS} urgentInitials="SS" alert={{ name: 'S. Sinus', detail: TRIAGE_ALERT }} referralStyles={REFERRALS} />;
}

export function CardiologyAgendaDemo() {
  return <AgendaCaseDemo patient={MARC} visits={VISITS} urgentInitials="SS" readyDetail="ECG huisarts toegevoegd" referrals="2 patiënten doorgestuurd naar een collega of andere dienst" />;
}

function SmartwatchScreenshot() {
  return (
    <figure className="mt-2 rounded-lg border border-[#E8EAEC] bg-[#F9FAFB] p-3" aria-label="Smartwatch-melding · Voorbeelddata">
      <figcaption className="text-[10px] font-medium text-[#4E5670]">Smartwatch · Voorbeelddata</figcaption>
      <svg viewBox="0 0 280 42" className="my-2 h-10 w-full" role="img" aria-label="Illustratie van een onregelmatig hartritme">
        <path d="M0 23h17l3-4 4 8 4-22 4 31 5-13h31l3-4 3 7 3-18 4 26 4-11h20l3-4 4 8 3-22 4 31 4-13h37l4-4 3 8 3-23 4 32 4-13h22l3-4 4 8 3-21 4 30 4-13h32" fill="none" stroke={MARC.color} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      <p className="text-[12px] font-semibold">Mogelijk voorkamerfibrillatie</p>
      <p className="mt-1 text-[10px] text-[#4E5670]">Marc Atrium · Melding op smartwatch</p>
    </figure>
  );
}

export function CardiologyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={MARC} chat={INTAKE_CHAT} summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Aanvallen', 'Slaap']}
      highlightField="Snurken"
      revealAt={{ 'Reden van consultatie': 2, Aanvallen: 4, Slaap: 5 }}
      summaryAttachment={{ section: 'Aanvallen', content: <SmartwatchScreenshot /> }}
    />
  );
}

export function CardiologyVoiceDemo() {
  return <VoiceCaseDemo patient={MARC} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function CardiologyScribeDemo() {
  return (
    <ScribeCaseDemo patient={MARC} chat={SCRIBE_CHAT} note={SCRIBE_NOTE}
      template="Cardiologie" options={['Ritme', 'Hartfalen', 'Borstpijn', 'Kleppen']}
      questionnaire="Hartkloppingen en ritme"
      noteLead={
        <div className="flex flex-wrap gap-2 px-1">
          {['CHA2DS2-VA 2', 'HAS-BLED 2', 'EHRA IIb'].map(score => <span key={score} className="rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10px] font-medium text-[#4E5670]">{score}</span>)}
        </div>
      }
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function CardiologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={MARC} />;
}

export function CardiologyDocumentDemo() {
  return <DocumentCaseDemo patient={MARC} documents={DOCUMENTS} letter={LETTER} letterPreview={LETTER_PREVIEW} generationOrder={[0, 2, 3, 1]} />;
}

const MEASURES = [{ label: 'AFEQT', max: 100, before: 54, after: 76, higherIsBetter: true }];

function Episodes() {
  return (
    <div className="mt-3 rounded-lg border border-[#E8EAEC] bg-[#F9FAFB] p-3">
      <p className="text-[11px] font-semibold">Aanvallen · smartwatch · Voorbeelddata</p>
      <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#4E5670]">
        <span>Baseline · 2 à 3 per week</span>
        <span className="flex gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-[#B5BCC7]" /><span className="h-2 w-2 rounded-full bg-[#B5BCC7]" /><span className="h-2 w-2 rounded-full border border-[#B5BCC7]" /></span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-[#4E5670]">
        <span>Maand 3 · 1 in de laatste 3 weken</span>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: MARC.color }} aria-hidden="true" />
      </div>
    </div>
  );
}

export function CardiologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo patient={MARC} rows={FOLLOW_ROWS} initials={['VP', 'MA', 'FP', 'ES']}
      alert={{ name: 'V. Pulmonalis', detail: FOLLOW_ALERT }} chat={FOLLOW_CHAT} checkInTitle="Check-in maand 3"
      charts={<div className="mb-3"><RecoveryScoreBars measures={MEASURES} period="Baseline → maand 3" color={MARC.color} /><Episodes /></div>}
      scores={FOLLOW_SCORES} scoreHeaders={['Meting', 'Baseline', 'Maand 3']}
      questionnaires={FOLLOW_QUESTIONNAIRES} planIntro={FOLLOW_PLAN_INTRO} planNote={FOLLOW_PLAN_NOTE}
      treatment="Antistolling + frequentiecontrole (Marc)" completedMoment="Maand 3"
    />
  );
}
