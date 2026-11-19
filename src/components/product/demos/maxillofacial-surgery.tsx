'use client';

import { AgendaCaseDemo, DocumentCaseDemo, FollowUpCaseDemo, PreConsultationCaseDemo, ScribeCaseDemo, TriageCaseDemo, VoiceCaseDemo } from './clinical-case';
import { MedicationChatDemo, MED_UI, type MedicationCopy } from './medication';
import {
  DOCUMENTS,
  FOLLOW_ALERT,
  FOLLOW_CHAT,
  FOLLOW_QUESTIONNAIRES,
  FOLLOW_ROWS,
  FOLLOW_SCORES,
  INTAKE_CHAT,
  INTAKE_SUMMARIES,
  LETTER,
  LETTER_PREVIEW,
  SCRIBE_CHAT,
  SCRIBE_NOTE,
  TRIAGE_ALERT,
  TRIAGE_ROWS,
  VISITS,
  VOICE_CHAT,
  VOICE_TASK,
} from './maxillofacial-surgery-data';

const LOTTE = { name: 'Lotte Mandibula', initials: 'LM', dob: '08-05-2002', color: '#2C766A' };

export function MkaTriageDemo() {
  return <TriageCaseDemo patient={LOTTE} rows={TRIAGE_ROWS} urgentInitials="HH" alert={{ name: 'H. Hyoid', detail: TRIAGE_ALERT }} />;
}

export function MkaAgendaDemo() {
  return (
    <AgendaCaseDemo patient={LOTTE} visits={VISITS} urgentInitials="HH" priorityInitials="LL" referrals="3 patiënten doorgestuurd naar een collega of andere dienst" />
  );
}

export function MkaPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={LOTTE}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Aard van de pijn', 'Mond en kaak']}
      highlightField="Gevoel lip, kin en tong"
      revealAt={{ 'Reden van consultatie': 2, 'Aard van de pijn': 4 }}
    />
  );
}

export function MkaVoiceDemo() {
  return <VoiceCaseDemo patient={LOTTE} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function MkaScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={LOTTE}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="MKA-chirurgie"
      options={['Verstandskiezen', 'Kaakgewricht', 'Implantologie', 'Traumatologie']}
      questionnaire="Verstandskiezen"
    />
  );
}

const MEDICATION: MedicationCopy = {
  ...MED_UI.nl,
  scrollableTranscript: true,
  ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
  found: 'Dank u, ik heb 4 geneesmiddelen gevonden:',
  confirm: 'Ja. De pil was ik vergeten, en de antibiotica zijn op. Als het pijn doet neem ik ook Nurofen.',
  followUp: {
    question: 'Genoteerd. Neemt u bloedverdunners, zoals Asaflow, Marevan, Xarelto of Eliquis?',
    choices: ['Ja', 'Nee'],
    answer: 'Nee.',
  },
  schedule: {
    header: 'Apotheek De Meersen · Medicatieschema · L. Mandibula, ° 08-05-2002',
    rows: [
      ['Microgynon 30 omhulde tabletten', '1 tablet per dag, 21 dagen, dan 7 dagen stop'],
      ['Ventolin 100 µg/dosis aërosol', '1 à 2 pufjes bij benauwdheid, vóór het sporten'],
      ['Cetirizine EG 10 mg filmomhulde tabletten', '1 tablet per dag in het pollenseizoen'],
      ['Amoxicilline Sandoz 500 mg capsules', '1 capsule 3× per dag gedurende 7 dagen (afgeleverd 14-10-2026)'],
    ],
  },
  meds: [
    {
      name: 'Microgynon 30',
      strength: '0,15 mg / 0,03 mg',
      substance: 'Levonorgestrel + ethinylestradiol',
      form: 'Tablet',
      frequency: '1× per dag, 21 dagen, 7 dagen stop',
      indication: 'Anticonceptie',
      source: 'Foto in chat',
      chatLabel: 'Microgynon 30 · 1× per dag',
    },
    {
      name: 'Ventolin',
      strength: '100 µg per dosis',
      substance: 'Salbutamol',
      form: 'Aërosol',
      frequency: 'Bij benauwdheid, vóór het sporten',
      indication: 'Inspanningsastma',
      source: 'Foto in chat',
      chatLabel: 'Ventolin · pufjes bij benauwdheid',
    },
    {
      name: 'Cetirizine EG',
      strength: '10 mg',
      substance: 'Cetirizine',
      form: 'Tablet',
      frequency: '1× per dag in het pollenseizoen',
      indication: 'Hooikoorts',
      source: 'Foto in chat',
      chatLabel: 'Cetirizine 10 mg · 1× per dag in het pollenseizoen',
    },
    {
      name: 'Amoxicilline Sandoz',
      strength: '500 mg',
      substance: 'Amoxicilline',
      form: 'Capsule',
      frequency: '3× per dag, 7 dagen (afgerond oktober)',
      indication: 'Ontsteking verstandskies',
      source: 'Foto in chat',
      chatLabel: 'Amoxicilline 500 mg · 3× per dag gedurende 7 dagen (oktober)',
    },
    {
      name: 'Nurofen',
      strength: '400 mg',
      substance: 'Ibuprofen',
      form: 'Tablet',
      frequency: 'Bij pijn, max. 3× per dag',
      indication: 'Pijn',
      later: true,
      tag: { label: 'Bron: chat', tone: 'blue' },
    },
  ],
  notes: [
    { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
    { label: 'Allergieën', value: 'Geen geneesmiddelallergie' },
    { label: 'Aandacht bij narcose', value: 'Inspanningsastma, Ventolin meebrengen', tone: 'warn' },
    { label: 'Bevestigd door patiënt', value: 'Ja' },
  ],
};

export function MkaMedicationDemo() {
  return <MedicationChatDemo copy={{ nl: MEDICATION, en: MEDICATION, fr: MEDICATION }} patient={LOTTE} />;
}

export function MkaDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={LOTTE}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      consentRisks={['Gevoelsstoornis van onderlip, kin of tong', 'Nabloeding', 'Zwelling en infectie']}
    />
  );
}

function RecoveryTrend({ label, values, max }: { label: string; values: [number, number, number]; max: number }) {
  const x = [16, 90, 164];
  const points = values.map((value, index) => [x[index], 55 - value / max * 43]);
  return (
    <figure className="min-w-0 rounded-lg bg-[#F4F6F8] px-2 py-2">
      <figcaption className="text-center text-[11px] font-semibold">{label}</figcaption>
      <svg viewBox="0 0 180 64" className="mx-auto w-full max-w-48" aria-hidden="true">
        <line x1="16" x2="164" y1={points[0][1]} y2={points[0][1]} stroke="#A1A9B5" strokeDasharray="3 4" />
        <polyline points={points.map((point) => point.join(',')).join(' ')} fill="none" stroke={LOTTE.color} strokeWidth="2.5" />
        {points.map(([cx, cy], index) => <circle key={cx} cx={cx} cy={cy} r="3.5" fill={index === 0 ? '#737E8F' : LOTTE.color} />)}
      </svg>
      <div className="grid grid-cols-3 gap-0.5 text-center text-[9px] leading-tight text-[#4E5670]" aria-hidden="true">
        <span>Vooraf</span><span>Dag 3</span><span>Dag 7</span>
      </div>
    </figure>
  );
}

export function MkaFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={LOTTE}
      rows={FOLLOW_ROWS}
      initials={['AA', 'LM', 'BB', 'MM', 'PM']}
      alert={{ name: 'A. Alveolaris', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in dag 7"
      charts={
        <div className="mb-3 grid grid-cols-2 gap-2">
          <RecoveryTrend label="Pijn (NRS)" values={[2, 5, 1]} max={10} />
          <RecoveryTrend label="Mondopening (vingers)" values={[3, 1.5, 3]} max={4} />
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Vóór de ingreep', 'Dag 3', 'Dag 7']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro="De opvolging volgt de behandeling die de arts kiest. Kiest de arts voor een andere aanpak, dan schakelt de opvolging mee."
      treatment="Extractie verstandskiezen (Lotte)"
      completedMoment="Dag 7"
    />
  );
}
