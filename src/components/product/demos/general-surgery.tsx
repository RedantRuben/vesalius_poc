'use client';

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
} from './general-surgery-data';

const DIRK = { name: 'Dirk Inguinalis', initials: 'DI', dob: '22-06-1970', color: '#2C766A' };
const REFERRALS = {
  Spoed: REFERRAL_STYLE.Spoed,
  Buikwand: REFERRAL_STYLE.MKA,
  Sportgeneeskunde: REFERRAL_STYLE.Kinesitherapie,
  Orthopedie: REFERRAL_STYLE.Kinesitherapie,
  'Gewone plaats': REFERRAL_STYLE['Normaal verloop'],
  Hepatobiliair: REFERRAL_STYLE.Orthognatisch,
};

export function GeneralSurgeryTriageDemo() {
  return (
    <TriageCaseDemo
      patient={DIRK}
      rows={TRIAGE_ROWS}
      urgentInitials="SF"
      alert={{ name: 'S. Femoralis', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function GeneralSurgeryAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={DIRK}
      visits={VISITS}
      urgentInitials="SF"
      referrals="1 patiënt naar spoed, 2 doorgestuurd naar een collega"
      readyDetail="echo toegevoegd"
    />
  );
}

export function GeneralSurgeryPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={DIRK}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Reden van consultatie', 'Zwelling', 'Aard van de pijn']}
      highlightField="Gaat terug"
      revealAt={{ 'Reden van consultatie': 2, Zwelling: 4, 'Aard van de pijn': 6 }}
      options={{ after: 3, rows: [['Ja', 'Nee', 'Weet ik niet']] }}
      finalOptions={[]}
    />
  );
}

export function GeneralSurgeryVoiceDemo() {
  return <VoiceCaseDemo patient={DIRK} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function GeneralSurgeryScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={DIRK}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Heelkunde"
      options={['Buikwand', 'Galblaas', 'Colorectaal', 'Proctologie', 'Kleine heelkunde']}
      questionnaire="Liesbreuk"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function GeneralSurgeryMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={DIRK} />;
}

export function GeneralSurgeryDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={DIRK}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={LETTER_PREVIEW}
      generationOrder={[0, 2, 1]}
      featuredDocument={{
        index: 2,
        title: 'Aanvraag opname',
        content: (
          <div className="mt-2 space-y-2.5 rounded-lg border border-[#E8EAEC] bg-white px-4 py-3 text-[12px] leading-relaxed">
            <p>Dagziekenhuis · laparoscopisch herstel met mat (TEP) rechts · ASA II</p>
            <p className="font-medium text-[#B4531A]">Allergie: pleisters</p>
            <p className="font-medium text-[#B4531A]">Tamsulosine · verder nemen rond de ingreep, zoals besproken met Dr. Vesalius</p>
          </div>
        ),
      }}
    />
  );
}

const MEASURES = [
  { label: 'EuraHS-QoL', max: 90, before: 34, after: 5 },
  { label: 'Carolinas Comfort Scale (maand 3)', max: 115, before: null, after: 6 },
  { label: 'NRS pijn lies bij tillen', max: 10, before: 5, after: 1 },
];

export function GeneralSurgeryFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={DIRK}
      rows={FOLLOW_ROWS}
      initials={['RI', 'DI', 'KP', 'NU']}
      alert={{ name: 'R. Ilioinguinalis', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in maand 3"
      charts={
        <div className="mb-3">
          <RecoveryScoreBars measures={MEASURES} period="Baseline → maand 3" color={DIRK.color} />
        </div>
      }
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline', 'Maand 3']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      planNote={FOLLOW_PLAN_NOTE}
      treatment="Laparoscopisch herstel (Dirk)"
      completedMoment="Maand 3 en 12"
    />
  );
}
