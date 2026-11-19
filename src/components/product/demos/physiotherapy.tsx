'use client';

import { motion } from 'framer-motion';
import {
  AgendaCaseDemo, DocumentCaseDemo, ExampleTable, FollowUpCaseDemo,
  PreConsultationCaseDemo, REFERRAL_STYLE, ScribeCaseDemo, TriageCaseDemo, VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import { EASE, useSteps } from './shared';
import {
  DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT, INTAKE_SUMMARIES,
  LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE, SESSION_SCORES,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './physiotherapy-data';

const LOTTE = { name: 'Lotte Cruciatum', initials: 'LC', dob: '18-05-2002', color: '#2C766A' };
const EARLY_LOTTE = { ...LOTTE, stage: 'Vóór de eerste sessie' };
const REFERRALS = {
  'Arts vandaag': REFERRAL_STYLE.Spoed,
  Sportkine: REFERRAL_STYLE.MKA,
  'Manuele therapie': REFERRAL_STYLE.Kinesitherapie,
  Bekkenbodem: REFERRAL_STYLE.Orthognatisch,
  Huisbezoek: REFERRAL_STYLE['Normaal verloop'],
};

export function KinesitherapyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={EARLY_LOTTE}
      rows={TRIAGE_ROWS}
      urgentInitials="VP"
      alert={{ name: 'V. Poplitea', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

const HOURS = Array.from({ length: 23 }, (_, index) => {
  const minutes = 450 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});

export function KinesitherapyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={LOTTE}
      visits={VISITS}
      urgentInitials="VP"
      dayLabel="woensdag 11 november 2026"
      hours={HOURS}
      roomLabels={['Room 1 · sportkine', 'Room 2 · manuele therapie', 'Room 3 · bekkenbodem']}
      readyLabel="Check-in ingevuld"
      readyDetail="pijn 2/10"
      referrals="Reeks L. Cruciatum: ma-wo-do 18u00, volgende 6 weken ingepland"
    />
  );
}

export function KinesitherapyPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={EARLY_LOTTE}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Richtlijnen chirurg', 'Rode vlaggen']}
      highlightField="Steunen"
      highlightSections={['Richtlijnen chirurg']}
      revealAt={{ 'Reden van consultatie': 2, 'Richtlijnen chirurg': 2, 'Rode vlaggen': 6 }}
      options={{ after: 5, rows: [['Ja', 'Nee']], selected: 'Nee' }}
      finalOptions={[]}
    />
  );
}

function RescheduledSession() {
  const step = useSteps(1, 1000, 6500);
  return (
    <div className="mt-2 rounded-lg border border-[#E8EAEC] bg-white px-3 py-2.5 text-[12px]" aria-label="Verplaatste sessie · voorbeelddata">
      <p className="font-semibold">L. Cruciatum · zelfde kinesitherapeut</p>
      <p className={`mt-1 text-[#949CB1] ${step ? 'line-through' : ''}`}>Donderdag · 18u00</p>
      {step > 0 && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="mt-1 font-medium text-[#1F9E6E]">Vrijdag · 17u30 ✓</motion.p>}
      <p className="mt-1 text-[11px] text-[#4E5670]">Uw volgende sessies blijven zoals gepland.</p>
    </div>
  );
}

export function KinesitherapyVoiceDemo() {
  return <VoiceCaseDemo patient={{ ...LOTTE, stage: 'Vervolgsessie' }} chat={VOICE_CHAT} task={VOICE_TASK} taskDetail={<RescheduledSession />} />;
}

function SessionHistory() {
  return (
    <div className="mt-2 rounded-lg border border-[#E8EAEC] bg-white p-3">
      <p className="mb-2 rounded-lg bg-[#EBF6F8] px-3 py-2 text-[11px] text-[#246459]">Flexie 110° ↑ 8° · Extensie 0° = · Effusie 1+ =</p>
      <ExampleTable caption="Evolutie over de sessies · Voorbeelddata" headers={['Meting', 'Sessie 1 (dag 6)', 'Sessie 5 (week 2)', 'Sessie 9 (week 3)', 'Sessie 14 (week 5)']} rows={SESSION_SCORES} />
    </div>
  );
}

export function KinesitherapyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={{ ...LOTTE, stage: 'Sessie 14 · week 5' }}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Kinesitherapie · vervolgsessie"
      templateOptionPrefix="Kinesitherapie"
      templateSelected={1}
      options={['Eerste onderzoek', 'Vervolgsessie', 'Tussentijdse evaluatie', 'Eindbilan']}
      questionnaire="Knie na VKB-reconstructie"
      clinicianRole="Kinesitherapeut"
      sessionLabel="14 · week 5"
      featuredSections={['Evaluatie', 'Plan']}
      noteFooter={<SessionHistory />}
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function KinesitherapyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={{ ...LOTTE, stage: 'Eerste sessie · dag 6' }} />;
}

export function KinesitherapyDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={{ ...LOTTE, stage: '32 sessies · maand 3' }}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[2, 1, 0]}
      letterIndex={0}
      letterHighlight="IKDC 58 (week 2: 31). ACL-RSI 49 (week 2: 38)."
    />
  );
}

const MILESTONES = ['Week 2', 'Maand 3', 'Maand 6', 'Maand 9'];

function RecoveryTrend({ label, values, measured = false }: { label: string; values: (number | null)[]; measured?: boolean }) {
  const points = values.flatMap((value, index) => value === null ? [] : [{ x: 16 + index * 49.3, y: 55 - value * 0.43, value, index }]);
  return (
    <figure className="min-w-0 rounded-lg bg-[#F4F6F8] px-2 py-2" aria-label={`${label}: ${values.map((v, i) => `${MILESTONES[i]} ${v === null ? 'niet gemeten' : v}`).join(', ')}`}>
      <figcaption className="text-center text-[11px] font-semibold">{label}</figcaption>
      <p className="text-center text-[9px] text-[#4E5670]">↑ hoger = beter{measured ? ' · gemeten door de kine' : ' · PROM'}</p>
      <svg viewBox="0 0 180 70" className="mx-auto w-full max-w-48" aria-hidden="true">
        {measured && <><line x1="16" x2="164" y1="16.3" y2="16.3" stroke="#A1A9B5" strokeDasharray="3 4" /><text x="164" y="11" textAnchor="end" fontSize="8" fill="#4E5670">90%</text></>}
        <polyline points={points.map(({ x, y }) => `${x},${y}`).join(' ')} fill="none" stroke={LOTTE.color} strokeWidth="2.5" />
        {points.map(({ x, y, value, index }) => <g key={index}><circle cx={x} cy={y} r="3.5" fill={index === 0 ? '#737E8F' : LOTTE.color} /><text x={x} y={y + 12} textAnchor="middle" fontSize="8" fill="#4E5670">{value}{measured ? '%' : ''}</text></g>)}
      </svg>
      <div className="grid grid-cols-4 gap-0.5 text-center text-[9px] leading-tight text-[#4E5670]" aria-hidden="true">{['W2', 'M3', 'M6', 'M9'].map(label => <span key={label}>{label}</span>)}</div>
    </figure>
  );
}

export function KinesitherapyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={{ ...LOTTE, stage: 'Maand 9' }}
      rows={FOLLOW_ROWS}
      initials={['VP', 'LC', 'MQ', 'RL', 'PP']}
      alert={{ name: 'V. Poplitea', detail: FOLLOW_ALERT }}
      greeting="Hallo Andreas!"
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 9"
      charts={
        <div className="mb-3">
          <p className="mb-2 text-[11px] text-[#949CB1]">Week 2 → maand 3, 6 en 9 · Voorbeelddata</p>
          <div className="grid grid-cols-2 gap-2">
          <RecoveryTrend label="IKDC · 0–100" values={[31, 58, 74, 87]} />
          <RecoveryTrend label="ACL-RSI · 0–100" values={[38, 49, 61, 76]} />
          <RecoveryTrend label="Quadriceps LSI" values={[null, 64, 81, 93]} measured />
          <RecoveryTrend label="Hoptests LSI" values={[null, null, 84, 95]} measured />
          </div>
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Week 2', 'Maand 3', 'Maand 6', 'Maand 9']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="VKB-reconstructie (Lotte)"
      completedMoment="Maand 3, 6 en 9"
    />
  );
}
