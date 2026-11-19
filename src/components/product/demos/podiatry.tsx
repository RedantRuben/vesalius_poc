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
} from './podiatry-data';

const SARA = { name: 'Sara Calcaneus', initials: 'SC', dob: '09-02-1980', color: '#2C766A' };
const REFERRALS = {
  'Vandaag contact': REFERRAL_STYLE.Spoed,
  'Biomechanica en sport': REFERRAL_STYLE.MKA,
  'Advies huisarts': REFERRAL_STYLE.Kinesitherapie,
  Voetverzorging: REFERRAL_STYLE.Orthognatisch,
};

export function PodiatryTriageDemo() {
  return (
    <TriageCaseDemo
      patient={SARA}
      rows={TRIAGE_ROWS}
      urgentInitials="MM"
      alert={{ name: 'M. Metatarsus', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function PodiatryAgendaDemo() {
  return <AgendaCaseDemo patient={SARA} visits={VISITS} urgentInitials="MM" referrals="2 patiënten eerst naar de huisarts" />;
}

export function PodiatryPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={SARA}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Aard van de pijn', 'Rode vlaggen']}
      highlightField="Eerste stappen 's ochtends"
      revealAt={{ 'Reden van consultatie': 2, 'Aard van de pijn': 4 }}
    />
  );
}

export function PodiatryVoiceDemo() {
  return (
    <VoiceCaseDemo
      patient={SARA}
      chat={VOICE_CHAT}
      task={VOICE_TASK}
      chatFooter="Herinnering: loop- en werkschoenen meebrengen"
    />
  );
}

export function PodiatryScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={SARA}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Podologie"
      options={['Biomechanica en sport', 'Diabetische voet', 'Nagels en huid', 'Kinderpodologie']}
      questionnaire="Hielpijn"
      clinicianRole="Podoloog"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function PodiatryMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={SARA} />;
}

export function PodiatryDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={SARA}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 1]}
      featuredDocument={{
        index: 2,
        title: 'Zolenfiche',
        content: (
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-[#E8EAEC] bg-white px-4 py-3 text-[12px] leading-relaxed">
            <Image
              src="/demo/podiatry/orthotics.jpg"
              alt="Voetsilhouet met de mediale ondersteuning en de diepe hielcup in groen"
              width={64}
              height={64}
              className="shrink-0 object-contain"
            />
            <div>
              <p className="font-semibold">Steunzolen voor loop- en werkschoenen</p>
              <p className="text-[#4E5670]">Mediale ondersteuning, diepe hielcup en zachte hielzone.</p>
            </div>
          </div>
        ),
      }}
    />
  );
}

const MEASURES = [
  { label: 'NRS eerste stappen', max: 10, before: 7, after: 4 },
  { label: 'NRS na een dienst', max: 10, before: 6, after: 3 },
  { label: 'FFI', max: 100, before: 48, after: 30, suffix: '%' },
];

export function PodiatryFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={SARA}
      rows={FOLLOW_ROWS}
      initials={['OU', 'SC', 'AA', 'LH']}
      alert={{ name: 'O. Unguis', detail: FOLLOW_ALERT }}
      greeting="Hallo Andreas!"
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 6"
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Baseline → week 6" color={SARA.color} />
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Week 6']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Steunzolen + oefeningen (Sara)"
      completedMoment="Week 6"
    />
  );
}
