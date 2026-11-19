'use client';

import { APP, AppCard, AppIcon } from '../app-ui';
import {
  AgendaCaseDemo, DocumentCaseDemo, ExampleTable, FollowUpCaseDemo,
  PreConsultationCaseDemo, REFERRAL_STYLE, RecoveryScoreBars, ScribeCaseDemo,
  TriageCaseDemo, VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import {
  CALLS, DOCUMENTS, FOLLOW_ALERT, FOLLOW_CHAT, FOLLOW_PLAN_INTRO, FOLLOW_PLAN_NOTE,
  FOLLOW_QUESTIONNAIRES, FOLLOW_ROWS, FOLLOW_SCORES, INTAKE_CHAT, INTAKE_SUMMARIES,
  LETTER, LETTER_PREVIEW, MEDICATION_CASE, SCRIBE_CHAT, SCRIBE_NOTE,
  TRIAGE_ALERT, TRIAGE_ROWS, VISITS, VOICE_CHAT, VOICE_TASK,
} from './pain-clinic-data';

const INGRID = { name: 'Ingrid Sacrum', initials: 'IS', dob: '09-02-1978', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  'Chronisch · 60 min': REFERRAL_STYLE.MKA,
  'Niet chronisch · 30 min': REFERRAL_STYLE.Orthognatisch,
  'Inspuiting · 5 min': REFERRAL_STYLE.Kinesitherapie,
  Voorrang: REFERRAL_STYLE.Voorrang,
};
const APPOINTMENTS = {
  'Chronisch · 60 min': { color: '#246459', background: '#E6F4F1' },
  'Niet chronisch · 30 min': { color: '#105D7C', background: '#EBF6F8' },
  'Inspuiting · 5 min': { color: '#91460B', background: '#FFF1E3' },
};
const DURATION_NOTE = 'Voorbeeldduur: elk centrum stelt de afspraaktypes zelf in.';

export function PainClinicTriageDemo() {
  return (
    <TriageCaseDemo
      patient={INGRID}
      rows={TRIAGE_ROWS}
      urgentInitials="CS"
      alert={{ name: 'C. Spinalis', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
      routingNote={DURATION_NOTE}
    />
  );
}

function AgendaDetails() {
  return (
    <div className="mt-2">
      <div className="mb-2 flex flex-wrap gap-2">
        {Object.keys(APPOINTMENTS).map(label => <span key={label} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${REFERRALS[label as keyof typeof APPOINTMENTS]}`}>{label}</span>)}
      </div>
      <p className="mb-3 text-[11px] text-[#949CB1]">{DURATION_NOTE}</p>
      <AppCard icon="calendar-alt" title="Procedureslots · Room 3" bodyClassName="p-3">
        <ExampleTable caption="Herhaalinspuitingen · Voorbeelddata" headers={['Uur', 'Patiënt', 'Reden']} rows={VISITS.filter(visit => visit.room === 3).map(visit => [visit.time, visit.name, visit.reason])} />
      </AppCard>
    </div>
  );
}

const HOURS = Array.from({ length: 11 }, (_, index) => {
  const minutes = 510 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});

export function PainClinicAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={INGRID}
      visits={VISITS}
      urgentInitials="CS"
      priorityInitials="RR"
      hours={HOURS}
      roomLabels={['Room 1 · consultatie', 'Room 2', 'Room 3 · ingrepen']}
      appointmentStyles={APPOINTMENTS}
      readyLabel="Uitgebreide intake ingevuld"
      referrals="1 patiënt doorgestuurd naar fysische geneeskunde"
      details={<AgendaDetails />}
    />
  );
}

function PainHistory() {
  const years = INTAKE_SUMMARIES[0].sections.find(([section]) => section === 'Pijnhistoriek')?.[1] ?? [];
  return (
    <div className="mt-2 overflow-x-auto" role="region" aria-label="Pijnhistoriek 2023 tot 2026" tabIndex={0}>
      <ol className="grid min-w-[42rem] grid-cols-4 gap-2 border-t border-[#E8EAEC] pt-2">
        {years.map(([year, detail]) => <li key={year} className="min-w-0">
          <p className="mb-2 text-[12px] font-semibold text-[#06ACC1]">{year}{year !== '2026' && <span className="ml-2 text-[#949CB1]" aria-hidden="true">→</span>}</p>
          <ul className="flex flex-col gap-1.5">{detail.split(' · ').map(treatment => <li key={treatment} className="rounded-lg bg-[#F4F5F8] px-2 py-1.5 text-[11px] leading-snug text-[#4E5670]">{treatment}</li>)}</ul>
        </li>)}
      </ol>
    </div>
  );
}

export function PainClinicPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={INGRID}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Pijnhistoriek', 'Impact']}
      highlightField="Verwachting"
      revealAt={{ 'Reden van consultatie': 2, Pijnhistoriek: 4, Impact: 6 }}
      finalOptions={[]}
      summaryAttachment={{ section: 'Pijnhistoriek', content: <PainHistory />, replaceFields: true }}
    />
  );
}

function CallLog() {
  return (
    <AppCard icon="phone" title="Gesprekken vandaag" bodyClassName="p-3">
      <p className="mb-3 text-[12px] text-[#4E5670]">Elke oproep eindigt in een ingeboekte afspraak of een doorschakeling naar een persoon.</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[35rem] table-fixed text-left text-[11px] leading-snug" aria-label="Gesprekken vandaag">
          <colgroup><col className="w-[18%]" /><col className="w-[25%]" /><col className="w-[37%]" /><col className="w-[20%]" /></colgroup>
          <thead className="bg-[#F4F5F8]"><tr>{['Naam', 'Triage', 'Afloop', 'Status'].map(label => <th key={label} scope="col" className="px-2 py-2">{label}</th>)}</tr></thead>
          <tbody className="divide-y divide-[#E8EAEC]">
            {CALLS.map(([sourceName, triage, outcome, status], index) => {
              const booked = status === 'Ingeboekt';
              const duration = outcome.match(/(60|30|5) min/)?.[1];
              return <tr key={sourceName} className={index === 0 ? 'bg-[#FFE7ED]/60' : ''}>
                <th scope="row" className="px-2 py-3 align-top font-medium">{sourceName.replace(' (rood)', '')}{index === 0 && <><AppIcon name="exclamation-triangle" size={11} color={APP.accent} className="ml-1 inline" /><span className="sr-only">Rode vlag</span></>}</th>
                <td className="px-2 py-3 align-top">{triage}</td>
                <td className="px-2 py-3 align-top">{outcome}</td>
                <td className="px-2 py-3 align-top"><span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${booked ? REFERRAL_STYLE.MKA : REFERRAL_STYLE.Kinesitherapie}`}>{status}{booked && duration && <> · {duration} min</>}</span></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </AppCard>
  );
}

export function PainClinicVoiceDemo() {
  return <VoiceCaseDemo patient={INGRID} chat={VOICE_CHAT} task={VOICE_TASK} callLog={<CallLog />} />;
}

export function PainClinicScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={INGRID}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Pijnkliniek"
      options={['Eerste consultatie chronisch', 'Consultatie niet chronisch', 'Procedure', 'Neuromodulatie']}
      questionnaire="Chronische pijn · uitgebreide intake"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function PainClinicMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={INGRID} />;
}

export function PainClinicDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={INGRID}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 3, 1]}
    />
  );
}

const MEASURES = [
  { label: 'BPI pijnintensiteit', max: 10, before: 6, after: 5.2 },
  { label: 'BPI interferentie', max: 10, before: 6.9, after: 5.1 },
  { label: 'PCS · catastroferen', max: 52, before: 31, after: 21 },
  { label: 'PSEQ · zelfeffectiviteit', max: 60, before: 22, after: 33, higherIsBetter: true },
];

export function PainClinicFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={INGRID}
      rows={FOLLOW_ROWS}
      initials={['GG', 'IS', 'SS', 'MM']}
      alert={{ name: 'G. Ganglion', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 3"
      charts={<div className="mb-3"><RecoveryScoreBars measures={MEASURES} period="Baseline → maand 3" color={INGRID.color} /></div>}
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Maand 3']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Multidisciplinair programma (Ingrid)"
      completedMoment="Maand 3, 6 en 12"
    />
  );
}
