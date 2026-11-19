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
} from './sports-medicine-data';

const KOEN = { name: 'Koen Soleus', initials: 'KS', dob: '08-05-1984', color: '#2C766A' };
const REFERRALS = {
  'Vandaag contact': REFERRAL_STYLE.Spoed,
  Sportarts: REFERRAL_STYLE.MKA,
  'Orthopedie voet en enkel': REFERRAL_STYLE.Kinesitherapie,
  'Fysische geneeskunde': REFERRAL_STYLE.Orthognatisch,
};

export function SportsMedicineTriageDemo() {
  return (
    <TriageCaseDemo
      patient={KOEN}
      rows={TRIAGE_ROWS}
      urgentInitials="VS"
      alert={{ name: 'V. Septum', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function SportsMedicineAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={KOEN}
      visits={VISITS}
      urgentInitials="VS"
      readyLabel="Sportintake en VISA-A ingevuld"
      referrals="2 patiënten doorgestuurd naar een andere dienst"
    />
  );
}

export function SportsMedicinePreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={KOEN}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Sportanamnese', 'Rode vlaggen']}
      highlightField="Trainingsvolume"
      revealAt={{ 'Reden van consultatie': 2, Sportanamnese: 4, 'Rode vlaggen': 7 }}
    />
  );
}

export function SportsMedicineVoiceDemo() {
  return <VoiceCaseDemo patient={KOEN} chat={VOICE_CHAT} task={VOICE_TASK} taskDetail="Lang blok met echo" />;
}

const NOTE_TABLES = {
  'Functionele testen': {
    headers: ['Meting', 'Rechts', 'Links', 'Verschil'],
    rows: [
      ['Single-leg heel raise', '14 · pijn 5/10', '28 · pijnvrij', '50% minder rechts'],
      ['Hinken · 10×', 'Pijn 4/10', 'Pijnvrij', '—'],
      ['Knie-tot-muur', '9 cm', '11 cm', '2 cm'],
    ],
  },
  Echografie: {
    headers: ['Meting', 'Rechts', 'Links', 'Verschil'],
    rows: [['AP-diameter achillespees', '8,9 mm', '5,4 mm', '3,5 mm']],
  },
};

export function SportsMedicineScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={KOEN}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Sportgeneeskunde"
      options={['Overbelasting pees en spier', 'Acuut letsel', 'Gewricht', 'Sportkeuring']}
      questionnaire="Overbelasting pees"
      featuredSections={['Functionele testen', 'Diagnose', 'Beleid']}
      noteTables={NOTE_TABLES}
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function SportsMedicineMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={KOEN} />;
}

export function SportsMedicineDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={KOEN}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 1]}
    />
  );
}

const MEASURES = [
  { label: 'VISA-A', max: 100, before: 48, after: 63, higherIsBetter: true },
  { label: 'NRS pijn na het lopen', max: 10, before: 6, after: 2 },
];

export function SportsMedicineFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={KOEN}
      rows={FOLLOW_ROWS}
      initials={['DP', 'KS', 'SG', 'BF']}
      alert={{ name: 'D. Peroneus', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 6"
      checkInNote={FOLLOW_QUOTE}
      charts={<div className="mb-3"><RecoveryScoreBars measures={MEASURES} period="Baseline → week 6" color={KOEN.color} /></div>}
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Week 6']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Oefentherapie + belastingsmanagement (Koen)"
      completedMoment="Week 6"
    />
  );
}
