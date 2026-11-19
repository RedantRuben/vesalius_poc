'use client';

import {
  AgendaCaseDemo, DocumentCaseDemo, FollowUpCaseDemo, PreConsultationCaseDemo,
  REFERRAL_STYLE, RecoveryScoreBars, ScribeCaseDemo, TriageCaseDemo, VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import {
  DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_NOTE, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT, INTAKE_SUMMARIES,
  LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './rheumatology-data';

const LIES = { name: 'Lies Carpus', initials: 'LC', dob: '14-03-1980', color: '#2C766A' };
const REFERRALS = {
  'Vandaag gezien': REFERRAL_STYLE.Spoed,
  Artritis: REFERRAL_STYLE.MKA,
  'Fysische geneeskunde': REFERRAL_STYLE.Kinesitherapie,
  Spondyloartritis: REFERRAL_STYLE.Orthognatisch,
  Voorrang: REFERRAL_STYLE['Normaal verloop'],
};

export function RheumatologyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={LIES}
      rows={TRIAGE_ROWS}
      urgentInitials="GT"
      alert={{ name: 'G. Temporalis', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function RheumatologyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={LIES}
      visits={VISITS}
      urgentInitials="GT"
      referrals="2 patiënten doorgestuurd naar een collega of andere dienst"
    />
  );
}

const HAND_OUTLINE = 'M32 124V92Q12 72 18 65Q22 60 28 66L38 78V36Q38 27 45 27Q52 27 52 36V62L53 18Q53 9 60 9Q67 9 67 18V60L68 14Q68 5 75 5Q82 5 82 14V62L83 28Q83 20 90 20Q97 20 97 28V83Q99 98 87 111L86 124Z';
const JOINTS = [
  { x: 45, y: 76, right: true, left: true },
  { x: 60, y: 76, right: true, left: true },
  { x: 75, y: 76, right: false, left: false },
  { x: 90, y: 76, right: false, left: false },
  { x: 60, y: 43, right: true, left: false },
  { x: 60, y: 117, right: true, left: false },
];

function JointDiagram() {
  return (
    <figure className="mx-auto mt-2 w-full max-w-60 rounded-lg border border-[#E8EAEC] bg-white p-2">
      <figcaption className="text-center text-[11px] font-semibold text-[#4E5670]">Gewrichtenschema · zelf aangeduid</figcaption>
      <svg viewBox="0 0 240 150" className="w-full" role="img" aria-label="Knokkels wijs- en middelvinger beide handen, middelste kootje middelvinger rechts en rechterpols gemarkeerd">
        {(['right', 'left'] as const).map(side => (
          <g key={side} transform={side === 'right' ? 'translate(0 5)' : 'translate(240 5) scale(-1 1)'}>
            <path d={HAND_OUTLINE} fill="#F4F6F8" stroke="#A1A9B5" strokeWidth="1.5" />
            {JOINTS.map(({ x, y, ...selected }) => <circle key={`${x}-${y}`} cx={x} cy={y} r={selected[side] ? 5 : 3} fill={selected[side] ? LIES.color : '#D5D9E0'} stroke="white" strokeWidth="1" />)}
          </g>
        ))}
        <text x="59" y="148" textAnchor="middle" fontSize="10" fill="#4E5670">Rechts</text>
        <text x="181" y="148" textAnchor="middle" fontSize="10" fill="#4E5670">Links</text>
      </svg>
      <p className="mt-1 text-[10px] leading-snug text-[#4E5670]">Ook gemeld: voetzolen bij de tenen.</p>
      <p className="mt-1 text-[9px] text-[#949CB1]">Voorbeelddata · groen = pijnlijk of gezwollen</p>
    </figure>
  );
}

export function RheumatologyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={LIES}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Gewrichten', 'Ontstekingsbeeld']}
      highlightField="Ochtendstijfheid"
      revealAt={{ 'Reden van consultatie': 2, Gewrichten: 5, Ontstekingsbeeld: 4 }}
      finalOptions={[]}
      finalContent={<JointDiagram />}
      summaryAttachment={{ section: 'Gewrichten', content: <JointDiagram /> }}
    />
  );
}

export function RheumatologyVoiceDemo() {
  return <VoiceCaseDemo patient={LIES} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function RheumatologyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={LIES}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Reumatologie"
      options={['Vroege artritis', 'Spondyloartritis', 'Bindweefselziekten', 'Jicht']}
      questionnaire="Vroege artritis"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function RheumatologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={LIES} />;
}

export function RheumatologyDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={LIES}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 3, 1]}
    />
  );
}

const MEASURES = [
  { label: 'RAPID3', max: 30, before: 17.3, after: 6.3 },
  { label: 'HAQ-DI', max: 3, before: 1.25, after: 0.5 },
  { label: 'Ochtendstijfheid', max: 120, before: 90, after: 15, suffix: ' min', showRange: false },
];

export function RheumatologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={LIES}
      rows={FOLLOW_ROWS}
      initials={['EO', 'LC', 'AG', 'TH']}
      alert={{ name: 'E. Olecranon', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 12"
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Baseline → week 12" color={LIES.color} />
          <p className="mt-3 text-[11px] leading-snug text-[#4E5670]">{FOLLOW_NOTE}</p>
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Week 12']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Methotrexaat (Lies)"
      completedMoment="Week 12"
    />
  );
}
