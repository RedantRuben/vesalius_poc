'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AppButton, AppCard } from '../app-ui';
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
} from './dermatology-data';

const KOEN = { name: 'Koen Dermis', initials: 'KD', dob: '12-06-1982', color: '#2C766A' };
const REFERRALS = {
  Voorrang: REFERRAL_STYLE.Spoed,
  Inflammatoir: REFERRAL_STYLE.MKA,
  Reumatologie: REFERRAL_STYLE.Kinesitherapie,
  Allergologie: REFERRAL_STYLE.Orthognatisch,
  'Geen rode vlag': REFERRAL_STYLE['Normaal verloop'],
};

export function DermatologyTriageDemo() {
  return (
    <TriageCaseDemo
      patient={KOEN}
      rows={TRIAGE_ROWS}
      urgentInitials="MM"
      alert={{ name: 'M. Melanocyt', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
    />
  );
}

export function DermatologyAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={KOEN}
      visits={VISITS}
      urgentInitials="MM"
      referrals="2 patiënten doorgestuurd naar een collega"
    />
  );
}

const PHOTOS = [
  { src: '/demo/dermatology/elbow.jpg', label: 'Elleboog' },
  { src: '/demo/dermatology/scalp.jpg', label: 'Hoofdhuid' },
  { src: '/demo/dermatology/nails.jpg', label: 'Vingernagels' },
];

export function DermatologyPreConsultationDemo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [photo, setPhoto] = useState<(typeof PHOTOS)[number] | null>(null);

  return (
    <>
      <PreConsultationCaseDemo
        patient={KOEN}
        chat={INTAKE_CHAT}
        summaries={INTAKE_SUMMARIES}
        openSections={['Reden van consultatie', 'Huid', 'Eerdere behandelingen']}
        highlightField="Systemisch"
        revealAt={{ 'Reden van consultatie': 2, Huid: 6 }}
        options={{
          after: 3,
          rows: [['Hoofdhuid', 'Ellebogen', 'Knieën'], ['Rug', 'Plooien'], ['Handen of voeten', 'Nagels']],
        }}
        attachment={{
          line: 7,
          content: (
            <>
              <span className="flex gap-1.5">
                {PHOTOS.map(({ src, label }) => (
                  <Image key={src} src={src} alt={label} width={46} height={46} className="rounded-lg object-cover" />
                ))}
              </span>
              <span className="mt-1 block text-[10px]">Voorbeeldfoto’s</span>
            </>
          ),
        }}
        summaryAttachment={{
          section: 'Huid',
          content: (
            <div className="mt-2 pl-4">
              <div className="flex flex-wrap gap-2">
                {PHOTOS.map((example) => (
                  <button
                    type="button"
                    key={example.src}
                    aria-label={`Vergroot foto: ${example.label}`}
                    className="rounded-lg ring-1 ring-[#E8EAEC] hover:ring-[#06ACC1]"
                    onClick={() => {
                      setPhoto(example);
                      dialog.current?.showModal();
                    }}
                  >
                    <Image src={example.src} alt="" width={56} height={56} className="rounded-lg object-cover" />
                  </button>
                ))}
              </div>
              <p className="mt-1 text-[10px] text-[#949CB1]">Voorbeeldfoto’s</p>
            </div>
          ),
        }}
      />
      <dialog
        ref={dialog}
        aria-label={photo ? `Voorbeeldfoto: ${photo.label}` : 'Voorbeeldfoto'}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-xl bg-white p-0 backdrop:bg-[#0B1B3D]/50"
      >
        {photo && (
          <AppCard
            icon="camera"
            title={`Voorbeeldfoto · ${photo.label}`}
            action={<AppButton variant="subtle" onClick={() => dialog.current?.close()}>Sluiten</AppButton>}
          >
            <Image
              src={photo.src}
              alt={photo.label}
              width={768}
              height={768}
              sizes="(max-width: 540px) calc(100vw - 4rem), 480px"
              className="max-h-[70svh] w-full object-contain"
            />
          </AppCard>
        )}
      </dialog>
    </>
  );
}

export function DermatologyVoiceDemo() {
  return <VoiceCaseDemo patient={KOEN} chat={VOICE_CHAT} task={VOICE_TASK} />;
}

export function DermatologyScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={KOEN}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Dermatologie"
      options={['Psoriasis', 'Eczeem', 'Huidletsels', 'Dermatochirurgie']}
      questionnaire="Psoriasis, systemische therapie"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function DermatologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={KOEN} />;
}

export function DermatologyDocumentDemo() {
  return <DocumentCaseDemo patient={KOEN} documents={DOCUMENTS} letter={LETTER} letterPreview={LETTER_PREVIEW} />;
}

const MEASURES = [
  { label: 'DLQI', max: 30, before: 18, after: 2 },
  { label: 'NRS jeuk', max: 10, before: 6, after: 1 },
];

function DermatologyTrends() {
  return (
    <div className="mb-3">
      <RecoveryScoreBars measures={MEASURES} period="Baseline → week 16" color={KOEN.color} />
      <div className="mt-3 rounded-lg border border-[#E8EAEC] px-2.5 py-1.5">
        <p className="text-[10px] leading-tight text-[#949CB1]">PASI · door de arts gescoord · 0–72, lager = beter</p>
        <p className="text-[12px] tabular-nums">
          <span className="text-[#949CB1]">16,4</span> → <b style={{ color: KOEN.color }}>1,4</b>
        </p>
      </div>
    </div>
  );
}

export function DermatologyFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={KOEN}
      rows={FOLLOW_ROWS}
      initials={['RE', 'KD', 'UC', 'FF']}
      alert={{ name: 'R. Epidermis', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 16"
      charts={<DermatologyTrends />}
      scores={FOLLOW_SCORES.filter(([label]) => !label.startsWith('PASI'))}
      scoreHeaders={['Meting', 'Baseline', 'Week 4', 'Week 16']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      treatment="Biological (Koen)"
      completedMoment="Week 16"
    />
  );
}
