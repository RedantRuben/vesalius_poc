'use client';

import { motion } from 'framer-motion';
import { APP, AppIcon } from '../app-ui';
import {
  AgendaCaseDemo,
  DocumentCaseDemo,
  FollowUpCaseDemo,
  PreConsultationCaseDemo,
  REFERRAL_STYLE,
  ScribeCaseDemo,
  TriageCaseDemo,
  VoiceCaseDemo,
} from './clinical-case';
import { MedicationChatDemo, MED_UI } from './medication';
import { EASE } from './shared';
import {
  DOCUMENTS,
  FOLLOW_ALERT,
  FOLLOW_CHAT,
  FOLLOW_PLAN_INTRO,
  FOLLOW_QUESTIONNAIRES,
  FOLLOW_ROWS,
  FOLLOW_SCORES,
  INTAKE_ATTENTION,
  INTAKE_CHAT,
  INTAKE_SUMMARIES,
  LETTER,
  MEDICATION_CASE,
  PATIENT_INSTRUCTIONS,
  SCRIBE_CHAT,
  SCRIBE_NOTE,
  TRIAGE_ALERT,
  TRIAGE_ROWS,
  VISITS,
  VOICE_CHAT,
  VOICE_TASK,
} from './anaesthesia-data';

const FRANS = { name: 'Frans Larynx', initials: 'FL', dob: '09-02-1958', color: '#2C766A' };
const REFERRALS = {
  'Vandaag contact': REFERRAL_STYLE.Spoed,
  Raadpleging: REFERRAL_STYLE.MKA,
  'Op dossier': REFERRAL_STYLE['Normaal verloop'],
  Telefonisch: REFERRAL_STYLE.Orthognatisch,
};

export function AnaesthesiaTriageDemo() {
  return (
    <TriageCaseDemo
      patient={FRANS}
      rows={TRIAGE_ROWS}
      urgentInitials="CO"
      alert={{ name: 'C. Oronaria', detail: TRIAGE_ALERT }}
      referralStyles={REFERRALS}
      routingNote="Voorgestelde pre-op volgens de afspraken van uw dienst. De anesthesist bevestigt of past aan."
    />
  );
}

export function AnaesthesiaAgendaDemo() {
  return (
    <AgendaCaseDemo
      patient={FRANS}
      visits={VISITS}
      urgentInitials="CO"
      referrals="6 patiënten beoordeeld op dossier, zonder raadpleging"
      readyDetail="3 aandachtspunten"
      decision="Raadpleging bevestigd door Dr. Vesalius"
    />
  );
}

function AnaesthesiaAttention() {
  return (
    <div className="border-b border-[#E8EAEC] py-2.5">
      <p className="mb-1.5 text-[13px] font-medium text-[#2A3A51]">Aandachtspunten voor de anesthesist</p>
      <ul className="space-y-1">
        {INTAKE_ATTENTION.map(([label, detail]) => (
          <li key={label} className="flex items-start gap-2 text-[12.5px] leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59E0C]" aria-hidden="true" />
            <span><b className="font-semibold">{label}:</b> {detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnaesthesiaPreConsultationDemo() {
  return (
    <PreConsultationCaseDemo
      patient={FRANS}
      chat={INTAKE_CHAT}
      summaries={INTAKE_SUMMARIES}
      openSections={['Ingreep', 'Inspanning', 'Slaap']}
      highlightField="Trappen"
      revealAt={{ Ingreep: 1, Inspanning: 4 }}
      options={{ after: 3, rows: [['Mijn adem', 'Mijn hart', 'Iets anders']], selected: 'Iets anders' }}
      finalOptions={['Ja', 'Nee', 'Weet ik niet']}
      summaryLead={<AnaesthesiaAttention />}
    />
  );
}

export function AnaesthesiaVoiceDemo() {
  return <VoiceCaseDemo patient={FRANS} chat={VOICE_CHAT} task={VOICE_TASK} taskDetail="Vragenlijst verstuurd via WhatsApp" />;
}

export function AnaesthesiaScribeDemo() {
  return (
    <ScribeCaseDemo
      patient={FRANS}
      chat={SCRIBE_CHAT}
      note={SCRIBE_NOTE}
      template="Pre-op anesthesie"
      options={['Pre-op anesthesie', 'Dagchirurgie', 'Telefonische pre-op']}
      questionnaire="Pre-op raadpleging"
      featuredSource="Uit uw woorden · Dr. Vesalius"
    />
  );
}

const MEDICATION = { ...MED_UI.nl, ...MEDICATION_CASE };
const MEDICATION_BY_LOCALE = { nl: MEDICATION, en: MEDICATION, fr: MEDICATION };

export function AnaesthesiaMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION_BY_LOCALE} patient={FRANS} />;
}

const INSTRUCTION_ICONS = ['calendar', 'clock-three', 'pill', 'list-checked', 'phone'];

export function AnaesthesiaDocumentDemo() {
  return (
    <DocumentCaseDemo
      patient={FRANS}
      documents={DOCUMENTS}
      letter={LETTER}
      letterPreview={DOCUMENTS[1][1]}
      generationOrder={[0, 1, 2]}
      letterToggle="Toon brief aan de huisarts"
      featuredDocument={{
        index: 2,
        title: 'Instructies voor Frans',
        content: (
          <div className="mt-2 space-y-2.5 rounded-lg border border-[#E8EAEC] bg-white px-4 py-3 text-[12px] leading-relaxed">
            {PATIENT_INSTRUCTIONS.map(([title, detail], index) => (
              <div key={title} className="flex items-start gap-2">
                <AppIcon name={INSTRUCTION_ICONS[index]} size={14} color={APP.primary} className="mt-0.5" />
                <div>
                  <p className="font-semibold">{title}</p>
                  <p>{detail}</p>
                  {title === 'Uw medicatie' && <p className="text-[#4E5670]">Zoals besproken met Dr. Vesalius</p>}
                </div>
              </div>
            ))}
          </div>
        ),
      }}
    />
  );
}

const RECOVERY_TIMELINE = ['Dag −7', 'Dag −1', 'Ingreep', 'Dag 1 na ontslag', 'Week 2'];

function AnaesthesiaRecovery() {
  return (
    <div className="mb-3">
      <ol className="mb-3 flex flex-wrap items-center gap-1.5 text-[10px]" aria-label="Opvolging rond de ingreep">
        {RECOVERY_TIMELINE.map((label) => (
          <li key={label} className={`rounded-full px-2 py-0.5 font-medium ${label === 'Ingreep' ? 'bg-[#EBF6F8] text-[#0B759F]' : 'bg-[#F4F5F8] text-[#4E5670]'}`}>
            {label}
          </li>
        ))}
      </ol>
      <p className="mb-1 flex justify-between gap-2 text-[11px]">
        <span className="inline-flex flex-wrap items-center gap-1.5">
          QoR-15 <span className="text-[#949CB1]">· 0–150</span>
          <span className="rounded-full bg-[#E9FFF7] px-1.5 py-px text-[9.5px] font-semibold text-[#1F9E6E]">↑ hoger = beter</span>
        </span>
        <span className="shrink-0 tabular-nums text-[#4E5670]">122 → <b className="text-[#2A3A51]">128</b></span>
      </p>
      <div className="flex flex-col gap-0.5" aria-hidden="true">
        <span className="h-1.5 overflow-hidden rounded-full bg-[#F4F5F8]">
          <motion.span className="block h-full rounded-full bg-[#D5D9E0]" initial={{ width: 0 }} animate={{ width: `${122 / 150 * 100}%` }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} />
        </span>
        <span className="h-1.5 overflow-hidden rounded-full bg-[#F4F5F8]">
          <motion.span className="block h-full rounded-full" style={{ backgroundColor: FRANS.color }} initial={{ width: 0 }} animate={{ width: `${128 / 150 * 100}%` }} transition={{ duration: 1, delay: 0.5, ease: EASE }} />
        </span>
      </div>
      <p className="mt-1 text-[10px] text-[#949CB1]">Baseline → week 2</p>
    </div>
  );
}

export function AnaesthesiaFollowUpDemo() {
  return (
    <FollowUpCaseDemo
      patient={FRANS}
      rows={FOLLOW_ROWS}
      initials={['DU', 'FL', 'MV', 'EP']}
      alert={{ name: 'D. Ura', detail: FOLLOW_ALERT }}
      chat={FOLLOW_CHAT}
      checkInTitle="Check-in week 2"
      charts={<AnaesthesiaRecovery />}
      scores={FOLLOW_SCORES}
      scoreHeaders={['Meting', 'Baseline (pre-op)', 'Dag 1 na ontslag', 'Week 2']}
      questionnaires={FOLLOW_QUESTIONNAIRES}
      planIntro={FOLLOW_PLAN_INTRO}
      treatment="Opname (Frans)"
      completedMoment="Dag 1 na ontslag"
    />
  );
}
