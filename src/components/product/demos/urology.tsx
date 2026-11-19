'use client';

import { AppCard, DetailRow } from '../app-ui';
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
  DIARY,
  DOCUMENTS,
  FOLLOW_ALERT,
  FOLLOW_CHAT,
  FOLLOW_COMMENT,
  FOLLOW_PLAN_INTRO,
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
} from './urology-data';

const PAUL = { name: 'Paul Prostata', initials: 'PP', dob: '22-06-1962', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  Plasklachten: REFERRAL_STYLE.MKA,
  'Uro-oncologie': REFERRAL_STYLE.Orthognatisch,
  'Endo-urologie': REFERRAL_STYLE.Orthognatisch,
  Bekkenbodem: REFERRAL_STYLE.Kinesitherapie,
  'Geen rode vlag': REFERRAL_STYLE['Normaal verloop'],
};

export function UrologyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={PAUL}
      rows={TRIAGE_ROWS}
      urgentInitials="RE"
      alert={{ name: 'R. Etentio', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function UrologyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={PAUL}
      visits={VISITS}
      urgentInitials="RE"
      referrals="3 patiënten doorgestuurd naar een collega"
      readyLabel="IPSS en plasdagboek ingevuld"
    />
  );
}

function BladderDiary() {
  return (
    <AppCard
      icon="clipboard-notes"
      title="Plasdagboek · gemiddelde van 3 dagen"
      action={<span className="text-[10.5px] font-medium text-[#949CB1]">Voorbeelddata</span>}
      className="my-3"
      bodyClassName="px-3 py-2"
    >
      {DIARY.map(([label, value]) => (
        <DetailRow key={label} label={label} value={label.startsWith("'s Nachts") ? <mark className="rounded-sm bg-[#EBF6F8] font-medium text-inherit">{value}</mark> : value} />
      ))}
    </AppCard>
  );
}

export function UrologyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={PAUL}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Plasklachten', 'Baseline']}
      highlightField="IPSS"
      revealAt={{ 'Reden van consultatie': 2, Plasklachten: 4 }}
      finalOptions={['Ja, start vandaag', 'Liever morgen']}
      summaryLead={<BladderDiary />}
    />
  );
}

export function UrologyVoiceDemo() {
  return <VoiceCaseDemo patient={PAUL} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function UrologyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={PAUL}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Urologie"
      options={['Plasklachten', 'Stenen', 'Uro-oncologie', 'Bekkenbodem']}
      questionnaire="Plasklachten man (met plasdagboek)"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function UrologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={PAUL} />;
}

export function UrologyDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={PAUL}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 1]}
      letterHighlight="Let op: dutasteride halveert de PSA-waarde; bij een latere controle de waarde verdubbelen."
    />
  );
}

const MEASURES = [
  { label: 'IPSS', max: 35, before: 19, after: 10 },
  { label: 'Levenskwaliteit IPSS', max: 6, before: 4, after: 2 },
];

function NocturiaTrend() {
  return (
    <div className="mt-3 rounded-lg border border-[#E8EAEC] px-2.5 py-1.5">
      <p className="text-[10px] leading-tight text-[#949CB1]">Nocturie</p>
      <p className="flex flex-wrap items-center gap-2 text-[12px] tabular-nums">
        <span className="text-[#4E5670]"><span aria-hidden="true">☾ ☾ ☾ </span>3× per nacht</span>
        <span aria-hidden="true">→</span>
        <b style={{ color: PAUL.color }}><span aria-hidden="true">☾ <span className="text-[#D5D9E0]">☾ ☾ </span></span>1× per nacht</b>
      </p>
    </div>
  );
}

export function UrologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={PAUL}
      rows={FOLLOW_ROWS}
      initials={['TR', 'PP', 'ME', 'DE']}
      alert={{ name: 'T. Rigonum', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 6"
      checkInNote={FOLLOW_COMMENT}
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Baseline → maand 6" color={PAUL.color} />
          <NocturiaTrend />
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Maand 6']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      treatment="Medicatie (Paul)"
      completedMoment="Maand 6"
    />
  );
}
