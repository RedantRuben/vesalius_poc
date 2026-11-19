'use client';

import { useState } from 'react';
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
  DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT, INTAKE_SUMMARIES,
  LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './gastroenterology-data';

const EVA = { name: 'Eva Sigma', initials: 'ES', dob: '09-02-1994', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  Darm: REFERRAL_STYLE.MKA,
  'Endoscopie (voorrang)': REFERRAL_STYLE.Voorrang,
  Gynaecologie: REFERRAL_STYLE.Kinesitherapie,
  Hepatologie: REFERRAL_STYLE.Orthognatisch,
};

export function GastroTriageDemo() {
  return (
    <TriageCaseDemo
      patient={EVA}
      rows={TRIAGE_ROWS}
      urgentInitials="MD"
      alert={{ name: 'M. Duodenum', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function GastroAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={EVA}
      visits={VISITS}
      urgentInitials="LF"
      roomLabels={['Room 1', 'Room 2', 'Room 3 (endoscopie)']}
      referrals="1 patiënt naar de spoed, 1 doorgestuurd naar een andere dienst"
    />
  );
}

const BRISTOL_LABELS = ['Losse harde keutels', 'Worstvormig, klonterig', 'Worstvormig, met barstjes', 'Glad en zacht', 'Zachte stukjes', 'Brijige stukjes', 'Waterig'];

function BristolShape({ type }: { type: number }) {
  return (
    <svg viewBox="0 0 64 28" className="h-7 w-full" aria-hidden="true" fill="#91460B">
      {type === 1 ? <><circle cx="14" cy="10" r="5" /><circle cx="31" cy="18" r="5" /><circle cx="48" cy="9" r="5" /></> :
        type === 2 ? <><ellipse cx="19" cy="14" rx="9" ry="8" /><ellipse cx="31" cy="13" rx="9" ry="8" /><ellipse cx="44" cy="14" rx="9" ry="8" /></> :
        type === 3 ? <><rect x="8" y="7" width="48" height="14" rx="7" /><path d="m22 7 3 6-4 3m20-9-4 7 4 7" stroke="white" strokeWidth="1.5" fill="none" /></> :
        type === 4 ? <rect x="8" y="8" width="48" height="12" rx="6" /> :
        type === 5 ? <><ellipse cx="15" cy="14" rx="8" ry="6" /><ellipse cx="34" cy="10" rx="8" ry="6" /><ellipse cx="49" cy="18" rx="7" ry="5" /></> :
        type === 6 ? <path d="m8 10 8-5 8 4 8-5 9 5 10-2 6 7-6 8-10-3-8 4-9-5-9 3-8-6Z" opacity=".7" /> :
        <><path d="M7 11q8-6 16 0t16 0 18 0v9q-8 5-18 0t-16 0-16 0Z" opacity=".45" /><circle cx="20" cy="6" r="2" /><circle cx="44" cy="5" r="2" /></>}
    </svg>
  );
}

function BristolChoices() {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div role="group" aria-label="Bristol-schaal · kies één of meerdere types" className="grid grid-cols-4 gap-2 pt-1">
      {BRISTOL_LABELS.map((label, index) => {
        const type = index + 1;
        const active = selected.includes(type);
        return <button key={type} type="button" aria-label={`Bristol type ${type}: ${label}`} aria-pressed={active} onClick={() => setSelected(current => active ? current.filter(value => value !== type) : [...current, type])} className={`rounded-lg px-1 py-1.5 text-[11px] font-medium text-[#06ACC1] ring-1 ring-[#06ACC1] ${active ? 'bg-[#EBF6F8]' : ''}`}>
          <BristolShape type={type} />Type {type}
        </button>;
      })}
    </div>
  );
}

export function GastroPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={EVA}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Aard van de pijn', 'Rode vlaggen']}
      highlightField="Verband met stoelgang"
      highlightSections={['Rode vlaggen']}
      revealAt={{ 'Reden van consultatie': 2, 'Aard van de pijn': 4 }}
      options={{ after: 3, rows: [['Minder', 'Erger', 'Geen verschil']], selected: 'Minder' }}
      finalOptions={[]}
      finalContent={<BristolChoices />}
    />
  );
}

export function GastroVoiceDemo() {
  return <VoiceCaseDemo patient={EVA} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function GastroScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={EVA}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Gastro-enterologie"
      options={['Darm', 'Maag en slokdarm', 'Lever', 'Endoscopie']}
      questionnaire="Prikkelbare darm"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function GastroMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={EVA} />;
}

export function GastroDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={EVA}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 3, 1]}
    />
  );
}

const MEASURES = [
  { label: 'IBS-SSS', max: 500, before: 320, after: 210 },
  { label: 'Buikpijn (NRS)', max: 10, before: 7, after: 4 },
];

function BristolProgress() {
  return (
    <div className="mt-3 text-[11px] text-[#4E5670]" aria-label="Stoelgang volgens Bristol · voorbeelddata">
      <p className="mb-2 font-semibold">Stoelgang (Bristol) · Voorbeelddata</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { period: 'Baseline · wisselend 1 tot 6', types: [1, 6] },
          { period: 'Week 6 · meestal 4 à 5', types: [4, 5] },
        ].map(({ period, types }) => <div key={period} className="rounded-lg border border-[#E8EAEC] px-2 py-2">
          <p>{period}</p>
          <div className="mt-1 flex gap-2">{types.map(type => <span key={type} className="min-w-0 flex-1 text-center"><BristolShape type={type} />{type}</span>)}</div>
        </div>)}
      </div>
    </div>
  );
}

export function GastroFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={EVA}
      rows={FOLLOW_ROWS}
      initials={['PH', 'ES', 'II', 'FF']}
      alert={{ name: 'P. Haustra', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 6"
      charts={<div className="mb-3"><RecoveryScoreBars measures={MEASURES} period="Baseline → week 6" color={EVA.color} /><BristolProgress /></div>}
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Week 6']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Dieet + medicatie (Eva)"
      completedMoment="Week 6"
    />
  );
}
