'use client';

/**
 * Module demos for the neurosurgery variant (source: sales, "Website-inhoud neurochirurgie", §7). Every page follows
 * Tom Atlas (35, cervical disc herniation C5-C6 right) one step further; C. Equina (bladder problems, both legs) is
 * the recurring red flag. Same app UI as the standard and orthopaedics demos, only the clinical story differs.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Tom keeps one avatar colour on every page, so visitors recognise him. */
const TOM = '#4F5BD5';
const TOM_SOFT = '#EEF0FD';
/** Red flags (C. Equina, K. Discus) share one red accent and the warning icon. */
const RED = APP.accent;
const RED_SOFT = '#FFE7ED';

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'TA' ? TOM : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

/** Amber marker for the answer that decided the route (loss of strength). */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF6E8] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C] ring-1 ring-[#F59E0C]/40 whitespace-nowrap">
      <AppIcon name="arrow-fork-down" size={10} color="#C2410C" />
      {children}
    </span>
  );
}

function TomTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="TA" size={24} />
        Tom Atlas
      </span>
    </span>
  );
}

/** A phone frame for the patient chat (pre-consultation and medication). */
function Phone({ intro, progress, placeholder, fill, children }: { intro: string; progress: string; placeholder: string; fill: number; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[280px] md:w-[300px] rounded-[40px] bg-[#111] p-[9px] shadow-[0_40px_80px_-40px_rgba(42,58,81,0.6)]">
      <div className="rounded-[32px] bg-white overflow-hidden h-[540px] flex flex-col text-[#2A3A51]">
        <div className="pt-7 px-5 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vesalius-logo-with-text.svg" alt="" className="h-5 mx-auto" />
          <p className="text-[10px] text-[#949CB1] mt-2 leading-snug">{intro}</p>
        </div>
        <div className="px-4 mt-3 flex items-center gap-2">
          <span className="text-[10px] text-[#4E5670]">{progress}</span>
          <span className="flex-1 h-1 rounded-full bg-[#E8EAEC] overflow-hidden">
            <motion.span className="block h-full bg-[#06ACC1]" animate={{ width: `${fill}%` }} transition={{ duration: 0.6 }} />
          </span>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2.5">{children}</div>
        <div className="flex items-center gap-2 px-3 py-3 border-t border-[#E8EAEC]">
          <AppIcon name="upload" size={15} color={APP.primary} />
          <span className="flex-1 rounded-xl bg-[#F4F5F8] px-3 py-2 text-[11px] text-[#949CB1]">{placeholder}</span>
          <span className="w-8 h-8 rounded-lg bg-[#06ACC1]/40 flex items-center justify-center">
            <AppIcon name="send" size={14} color="#fff" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
      <Initials text="AV" size={24} />
      <div className="max-w-[80%] bg-[#F4F5F8] rounded-2xl px-3 py-2 text-[11.5px] leading-snug">{children}</div>
    </motion.div>
  );
}

export function PatientBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[78%] bg-[#06ACC1] text-white rounded-2xl px-3 py-2 text-[11.5px] leading-snug">
      {children}
    </motion.p>
  );
}

export function Choices({ options }: { options: string[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center gap-2 pt-1">
      {options.map((s) => (
        <span key={s} className="px-4 py-1.5 rounded-lg ring-1 ring-[#06ACC1] text-[#06ACC1] text-[11px] font-medium">
          {s}
        </span>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: not every neck goes to the neurosurgeon           */
/* ------------------------------------------------------------------ */

type Referral = 'spine' | 'physical' | 'nerves' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Uitstraling in beide benen en sinds gisteren moeite met plassen. Secretariaat neemt vandaag contact op.',
    referrals: { spine: 'Wervelkolom', physical: 'Fysische geneeskunde', nerves: 'Perifere zenuwen' },
    rows: [
      'Lage rugpijn met uitstraling in beide benen, sinds gisteren moeite met plassen',
      'Nekpijn met uitstraling tot in duim en wijsvinger, krachtverlies, 8 sessies kine zonder effect',
      'Nekpijn zonder uitstraling, sinds 3 weken, nog geen behandeling',
      'Tintelingen in de hand, vooral ’s nachts, geen nekpijn',
      'Vraag over afspraak',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Radiating pain in both legs and difficulty passing urine since yesterday. The secretariat is getting in touch today.',
    referrals: { spine: 'Spine', physical: 'Physical medicine', nerves: 'Peripheral nerves' },
    rows: [
      'Low back pain radiating into both legs, difficulty passing urine since yesterday',
      'Neck pain radiating to thumb and index finger, loss of strength, 8 physiotherapy sessions without effect',
      'Neck pain without radiation, for 3 weeks, no treatment yet',
      'Tingling in the hand, mostly at night, no neck pain',
      'Question about appointment',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Irradiation dans les deux jambes et difficultés à uriner depuis hier. Le secrétariat prend contact aujourd’hui.',
    referrals: { spine: 'Rachis', physical: 'Médecine physique', nerves: 'Nerfs périphériques' },
    rows: [
      'Lombalgie irradiant dans les deux jambes, difficultés à uriner depuis hier',
      'Cervicalgie irradiant jusqu’au pouce et à l’index, perte de force, 8 séances de kiné sans effet',
      'Cervicalgie sans irradiation, depuis 3 semaines, pas encore de traitement',
      'Fourmillements dans la main, surtout la nuit, sans cervicalgie',
      'Question sur un rendez-vous',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'C. Equina', initials: 'CE', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'T. Atlas', initials: 'TA', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'spine' },
  { name: 'F. Facet', initials: 'FF', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'physical' },
  { name: 'N. Medianus', initials: 'NM', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'nerves' },
  { name: 'L. Ischias', initials: 'LI', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: '' },
];

// Physical medicine stands out: not every patient ends up in the neurosurgeon's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = {
  spine: { bg: '#EBF6F8', text: '#0B759F' },
  nerves: { bg: '#EBF6F8', text: '#0B759F' },
  physical: { bg: '#FDF1E7', text: '#B4531A' },
};

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function NeuroTriageDemo() {
  const c = useLocalized(TRIAGE);
  // 1–5 rows arrive with their referral, 6 the red flag lights up and the attention card opens
  const step = useSteps(6, 420, 150);
  const flagged = step >= 6;

  return (
    <AppFrame
      active="screening"
      title={c.title}
      actions={
        <span className="hidden md:flex items-center gap-1 text-[11px]">
          <span className="px-2.5 py-1 rounded-full text-[#949CB1]">{c.perDay}</span>
          <span className="px-2.5 py-1 rounded-full bg-[#EBF6F8] text-[#2A3A51]">{c.asList}</span>
        </span>
      }
    >
      <div className="bg-white rounded-xl border border-[#E8EAEC] overflow-hidden">
        <div className={`${TRIAGE_GRID} px-4 py-2.5 bg-[#F4F5F8] text-[11px] font-medium text-[#2A3A51]`}>
          {c.head.map((h, i) => (
            <span key={h} className={i > 2 ? 'hidden md:block' : ''}>
              {h}
            </span>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {TRIAGE_ROWS.map((row, i) => {
            if (step < i + 1) return null;
            const red = row.flag && flagged;
            const tone = row.referral ? REFERRAL_TONE[row.referral] : null;
            return (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.28, ease: EASE }}
                className={`${TRIAGE_GRID} px-4 py-3 border-t border-[#E8EAEC] items-center text-[12px] transition-colors duration-300 ${red ? 'bg-[#FFE7ED]/60' : ''}`}
              >
                <span className="flex items-center gap-1">
                  <AppIcon name={row.channel} size={15} color={APP.primary} />
                  {red && <AppIcon name="exclamation-triangle" size={13} color={RED} />}
                </span>
                <span className="flex items-center gap-2 min-w-0">
                  <PatientAvatar initials={row.initials} flag={row.flag} />
                  <span className="font-medium truncate">{row.name}</span>
                </span>
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-[#4E5670] truncate">{c.rows[i]}</span>
                  {row.referral && tone && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                      className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: tone.bg, color: tone.text }}
                    >
                      <AppIcon name="arrow-fork-down" size={10} color={tone.text} />
                      {c.referrals[row.referral]}
                    </motion.span>
                  )}
                </span>
                <span className="hidden md:block tabular-nums">{row.tasks}</span>
                <span className="hidden md:block">
                  <StatusChip status={row.status} />
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {flagged && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-3 md:ml-auto md:w-[400px] shadow-[0_24px_40px_-20px_rgba(42,58,81,0.5)] rounded-xl"
          >
            <AppCard tone="widget" icon="exclamation-triangle" title={c.attention}>
              <div className="flex items-start gap-3">
                <PatientAvatar initials="CE" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">C. Equina</span>
                  <span className="block text-[11.5px] leading-snug text-[#4E5670]">{c.attentionText}</span>
                </span>
              </div>
            </AppCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Agenda: Tom prepared, C. Equina first, two patients elsewhere   */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    referred: '2 patiënten doorgestuurd naar een collega',
    types: [
      'Controle na ACDF',
      'Dringend · plasproblemen en uitval in beide benen',
      'Lumbale hernia, beenpijn',
      'Nieuwe patiënt · cervicale hernia',
      'Controle na infiltratie',
      'Wondcontrole na lumbale ingreep',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    referred: '2 patients referred to a colleague',
    types: [
      'Check-up after ACDF',
      'Urgent · bladder problems and weakness in both legs',
      'Lumbar disc herniation, leg pain',
      'New patient · cervical disc herniation',
      'Check-up after injection',
      'Wound check after lumbar surgery',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    referred: '2 patients orientés vers un confrère',
    types: [
      'Contrôle après ACDF',
      'Urgent · troubles urinaires et déficit des deux jambes',
      'Hernie lombaire, douleur de jambe',
      'Nouveau patient · hernie cervicale',
      'Contrôle après infiltration',
      'Contrôle de plaie après chirurgie lombaire',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#9B7BC8', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; tom?: boolean; urgent?: boolean };

// In order of appearance; C. Equina drops in last, from triage.
const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'K. Discus', initials: 'KD', type: 0 },
  { room: 1, start: 0, len: 3, name: 'T. Atlas', initials: 'TA', type: 3, tom: true },
  { room: 2, start: 1, len: 1, name: 'S. Foramen', initials: 'SF', type: 4 },
  { room: 0, start: 2, len: 1, name: 'L. Ischias', initials: 'LI', type: 2 },
  { room: 2, start: 3, len: 1, name: 'D. Lamina', initials: 'DL', type: 5 },
  { room: 0, start: 1, len: 1, name: 'C. Equina', initials: 'CE', type: 1, urgent: true },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.urgent ? RED : visit.tom ? TOM : ROOM_COLORS[visit.room];
  const background = visit.urgent ? RED_SOFT : visit.tom ? TOM_SOFT : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={visit.urgent ? { opacity: 0, y: -30, scale: 0.9 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={visit.urgent ? { type: 'spring', stiffness: 180, damping: 16 } : { duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.tom && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.urgent && <AppIcon name="exclamation-triangle" size={10} color={RED} />}
        {visit.tom && <PatientAvatar initials="TA" size={16} />}
        {visit.name}
      </p>
      <p className="truncate text-[#4E5670]">{label}</p>
      {visit.tom && ready && (
        // The tick links to the pre-consultation page; its label opens on hover.
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
        >
          <Check size={10} color="#1F9E6E" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[10rem]">{readyLabel}</span>
        </motion.span>
      )}
    </motion.div>
  );
}

export function NeuroAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–5 regular visits appear, 6 the urgent visit drops into Room 1 at 09:30, 7 Tom's questionnaire tick and the referrals
  const step = useSteps(7, 520, 400);
  const shown = VISITS.slice(0, Math.min(step, VISITS.length));

  return (
    <AppFrame
      active="visits"
      title={
        <span>
          {c.date} <span className="text-[#E8EAEC]">|</span>{' '}
          <motion.span key={shown.length} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[#06ACC1] inline-block">
            {shown.length}
          </motion.span>{' '}
          {c.appointments}
        </span>
      }
      actions={
        <span className="hidden md:flex items-center gap-1 text-[11px]">
          {c.views.map((v, i) => (
            <span key={v} className={`px-2.5 py-1 rounded-full ${i === 0 ? 'bg-[#EBF6F8]' : 'text-[#949CB1]'}`}>
              {v}
            </span>
          ))}
          <span className="ml-1 px-2.5 py-1 rounded-full bg-[#EBF6F8]">{c.perRoom}</span>
        </span>
      }
    >
      <div className="bg-white rounded-xl border border-[#E8EAEC] overflow-hidden">
        <div className="grid grid-cols-[3.25rem_1fr_1fr_1fr] border-b border-[#E8EAEC]">
          <span />
          {c.rooms.map((room, i) => (
            <span key={room} className="flex items-center justify-between px-3 py-2 text-[11px] font-medium border-l-2" style={{ borderLeftColor: ROOM_COLORS[i] }}>
              {room}
              <span className="w-5 h-5 rounded-full bg-[#06ACC1] text-white text-[10px] flex items-center justify-center tabular-nums">
                {shown.filter((v) => v.room === i).length}
              </span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[3.25rem_1fr_1fr_1fr]">
          <div>
            {HOURS.map((h) => (
              <p key={h} className="text-[10.5px] font-medium tabular-nums text-right pr-2 pt-1" style={{ height: SLOT_PX }}>
                {h}
              </p>
            ))}
          </div>
          {[0, 1, 2].map((room) => (
            <div key={room} className="relative border-l border-[#E8EAEC]" style={{ height: HOURS.length * SLOT_PX }}>
              {HOURS.map((h, i) => (
                <span key={h} className="absolute inset-x-0 border-t border-dashed border-[#E8EAEC]" style={{ top: i * SLOT_PX }} />
              ))}
              {shown
                .filter((v) => v.room === room)
                .map((visit) => (
                  <VisitBlock key={visit.name} visit={visit} label={c.types[visit.type]} ready={step >= 7} readyLabel={c.ready} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* F. Facet and N. Medianus are not in this agenda: triage already sent them on. */}
      <p className="mt-2.5 px-1 flex items-center gap-1.5 text-[11px] text-[#949CB1] min-h-[16px]">
        {step >= 7 && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5">
            <AppIcon name="arrow-fork-down" size={11} color={APP.darkGrey} />
            {c.referred}
          </motion.span>
        )}
      </p>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Pre-consultation: the neck chat, and summaries per region       */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; flag?: boolean };
type SummarySection = { title: string; rows: SummaryRow[] };

const r = (label: string, value: string, flag = false): SummaryRow => ({ label, value, flag });

const INTAKE: Record<
  'nl' | 'en' | 'fr',
  {
    intro: string;
    progress: string;
    placeholder: string;
    chat: { from: 'bot' | 'patient'; text: string }[];
    suggestions: string[];
    summary: string;
    copy: string;
    marker: string;
    tabs: string[];
    summaries: SummarySection[][];
  }
> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: 'Al vier maanden pijn in mijn nek die uitstraalt naar mijn rechterarm, tot in mijn duim en wijsvinger.' },
      { from: 'bot', text: 'Hoe erg is de pijn in uw arm, op 10? En in uw nek?' },
      { from: 'patient', text: 'Mijn arm 7, mijn nek 5.' },
      { from: 'bot', text: 'Heeft u minder kracht in uw arm of hand?' },
    ],
    suggestions: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    marker: 'Bepaalt de routering',
    tabs: ['Cervicaal', 'Lumbaal', 'Perifere zenuwen'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [r('Aanleiding', 'Nekpijn met uitstraling naar de rechterarm, vooral duim en wijsvinger. Vermoeden van nekhernia volgens de huisarts.'), r('Duur', 'Vier maanden')],
        },
        {
          title: 'Aard van de pijn',
          rows: [r('Armpijn', '7/10, schietend, met tintelingen, soms gevoelloos'), r('Nekpijn', '5/10, zeurend'), r('Uitstraling', 'Tot in duim en wijsvinger rechts')],
        },
        {
          title: 'Wanneer heb je pijn',
          rows: [
            r('Erger bij', 'Lang aan het bureau zitten, typen, nek voorover buigen, hoofd naar rechts draaien'),
            r('Beter bij', 'Rust, warmte, andere zithouding, rechtstaan, ibuprofen'),
          ],
        },
        {
          title: 'Neurologie',
          rows: [
            r('Krachtverlies', 'Ja, lichte krachtvermindering bij vastnemen', true),
            r('Gevoel', 'Doof gevoel in de rechterhand'),
            r('Gang en evenwicht', 'Normaal, lichte duizeligheid bij opstaan'),
          ],
        },
        { title: 'Rode vlaggen', rows: [r('Plas- en stoelgang', 'Geen problemen'), r('Koorts, nachtpijn, gewichtsverlies', 'Nee')] },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Eerdere behandeling', '8 sessies kinesitherapie, zonder blijvend effect. Ibuprofen 400 mg, 1 à 2 keer per dag.'),
            r('Operaties', 'Appendectomie, 3 jaar geleden'),
            r('Allergieën', 'Nee'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Vader hoge bloeddruk, moeder diabetes type 2'),
          ],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Nee / 2 à 3 glazen per week')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Systeembeheerder bij een IT-bedrijf'),
            r('Sport en hobby', 'Voetbal wekelijks, af en toe fietsen. Gitaar spelen.'),
            r('Handdominantie', 'Rechts'),
            r('Lengte / gewicht', '1,79 m / 83 kg'),
            r('Leeftijd', '35 jaar'),
            r('Verwijzing', 'Via dr. Van Acker, huisarts'),
          ],
        },
        { title: 'Baseline', rows: [r('NDI', '36%')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Lage rugpijn met uitstraling naar het linkerbeen, tot in de voet, sinds 7 weken')] },
        { title: 'Aard van de pijn', rows: [r('Beenpijn / rugpijn', '8/10 / 4/10')] },
        { title: 'Neurologie', rows: [r('Krachtverlies', 'Nee')] },
        { title: 'Rode vlaggen', rows: [r('Plas- en stoelgang', 'Geen problemen')] },
        { title: 'Medische achtergrond', rows: [r('Eerdere behandeling', 'Kinesitherapie, 6 sessies, weinig effect')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Verpleegkundige / 42 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Tintelingen in duim, wijs- en middelvinger links, sinds 5 maanden')] },
        { title: 'Wanneer heb je pijn', rows: [r('’s Nachts', 'Ja, wordt wakker en schudt de hand uit')] },
        { title: 'Aard van de pijn', rows: [r('Nekpijn', 'Nee')] },
        { title: 'Neurologie', rows: [r('Kracht', 'Laat soms dingen vallen')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Kapster / 51 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'For four months I’ve had pain in my neck that radiates into my right arm, down to my thumb and index finger.' },
      { from: 'bot', text: 'How bad is the pain in your arm, out of 10? And in your neck?' },
      { from: 'patient', text: 'My arm 7, my neck 5.' },
      { from: 'bot', text: 'Do you have less strength in your arm or hand?' },
    ],
    suggestions: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    marker: 'Decides the route',
    tabs: ['Cervical', 'Lumbar', 'Peripheral nerves'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [r('Cause', 'Neck pain radiating to the right arm, mainly thumb and index finger. Suspected cervical disc herniation according to the GP.'), r('Duration', 'Four months')],
        },
        {
          title: 'Nature of the pain',
          rows: [r('Arm pain', '7/10, shooting, with tingling, sometimes numb'), r('Neck pain', '5/10, aching'), r('Radiation', 'Down to the right thumb and index finger')],
        },
        {
          title: 'When does it hurt',
          rows: [
            r('Worse with', 'Sitting at the desk for long periods, typing, bending the neck forward, turning the head to the right'),
            r('Better with', 'Rest, warmth, a different sitting position, standing up, ibuprofen'),
          ],
        },
        {
          title: 'Neurology',
          rows: [
            r('Loss of strength', 'Yes, slightly weaker grip', true),
            r('Sensation', 'Numb feeling in the right hand'),
            r('Gait and balance', 'Normal, slight dizziness when standing up'),
          ],
        },
        { title: 'Red flags', rows: [r('Bladder and bowel', 'No problems'), r('Fever, night pain, weight loss', 'No')] },
        {
          title: 'Medical history',
          rows: [
            r('Previous treatment', '8 physiotherapy sessions, without lasting effect. Ibuprofen 400 mg, once or twice a day.'),
            r('Operations', 'Appendectomy, 3 years ago'),
            r('Allergies', 'No'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Father high blood pressure, mother type 2 diabetes'),
          ],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'No / 2 to 3 glasses a week')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'System administrator at an IT company'),
            r('Sport and hobbies', 'Football weekly, occasional cycling. Plays the guitar.'),
            r('Handedness', 'Right'),
            r('Height / weight', '1.79 m / 83 kg'),
            r('Age', '35'),
            r('Referral', 'Via Dr Van Acker, GP'),
          ],
        },
        { title: 'Baseline', rows: [r('NDI', '36%')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Low back pain radiating to the left leg, down to the foot, for 7 weeks')] },
        { title: 'Nature of the pain', rows: [r('Leg pain / back pain', '8/10 / 4/10')] },
        { title: 'Neurology', rows: [r('Loss of strength', 'No')] },
        { title: 'Red flags', rows: [r('Bladder and bowel', 'No problems')] },
        { title: 'Medical history', rows: [r('Previous treatment', 'Physiotherapy, 6 sessions, little effect')] },
        { title: 'General', rows: [r('Occupation / age', 'Nurse / 42')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Tingling in the left thumb, index and middle finger, for 5 months')] },
        { title: 'When does it hurt', rows: [r('At night', 'Yes, wakes up and shakes the hand out')] },
        { title: 'Nature of the pain', rows: [r('Neck pain', 'No')] },
        { title: 'Neurology', rows: [r('Strength', 'Sometimes drops things')] },
        { title: 'General', rows: [r('Occupation / age', 'Hairdresser / 51')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis quatre mois, j’ai mal à la nuque, et la douleur irradie dans mon bras droit, jusqu’au pouce et à l’index.' },
      { from: 'bot', text: 'Sur 10, à combien évaluez-vous la douleur dans votre bras ? Et dans votre nuque ?' },
      { from: 'patient', text: 'Le bras 7, la nuque 5.' },
      { from: 'bot', text: 'Avez-vous moins de force dans le bras ou la main ?' },
    ],
    suggestions: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    marker: 'Détermine l’orientation',
    tabs: ['Cervical', 'Lombaire', 'Nerfs périphériques'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Cervicalgie irradiant vers le bras droit, surtout le pouce et l’index. Suspicion de hernie cervicale selon le médecin traitant.'),
            r('Durée', 'Quatre mois'),
          ],
        },
        {
          title: 'Nature de la douleur',
          rows: [r('Douleur du bras', '7/10, fulgurante, avec fourmillements, parfois engourdi'), r('Douleur de la nuque', '5/10, sourde'), r('Irradiation', 'Jusqu’au pouce et à l’index droits')],
        },
        {
          title: 'Quand avez-vous mal',
          rows: [
            r('Pire en cas de', 'Position assise prolongée au bureau, frappe au clavier, flexion de la nuque, rotation de la tête vers la droite'),
            r('Mieux avec', 'Repos, chaleur, autre position assise, se lever, ibuprofène'),
          ],
        },
        {
          title: 'Neurologie',
          rows: [
            r('Perte de force', 'Oui, légère diminution de la force de préhension', true),
            r('Sensibilité', 'Engourdissement de la main droite'),
            r('Marche et équilibre', 'Normaux, léger vertige en se levant'),
          ],
        },
        { title: 'Signaux d’alerte', rows: [r('Mictions et selles', 'Aucun problème'), r('Fièvre, douleur nocturne, perte de poids', 'Non')] },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Traitement antérieur', '8 séances de kinésithérapie, sans effet durable. Ibuprofène 400 mg, 1 à 2 fois par jour.'),
            r('Opérations', 'Appendicectomie, il y a 3 ans'),
            r('Allergies', 'Non'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Père hypertendu, mère diabétique de type 2'),
          ],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'Non / 2 à 3 verres par semaine')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Administrateur système dans une entreprise informatique'),
            r('Sport et loisirs', 'Football chaque semaine, vélo de temps en temps. Joue de la guitare.'),
            r('Latéralité', 'Droitier'),
            r('Taille / poids', '1,79 m / 83 kg'),
            r('Âge', '35 ans'),
            r('Orientation', 'Par le Dr Van Acker, médecin traitant'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('NDI', '36 %')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Lombalgie irradiant vers la jambe gauche, jusqu’au pied, depuis 7 semaines')] },
        { title: 'Nature de la douleur', rows: [r('Douleur de jambe / de dos', '8/10 / 4/10')] },
        { title: 'Neurologie', rows: [r('Perte de force', 'Non')] },
        { title: 'Signaux d’alerte', rows: [r('Mictions et selles', 'Aucun problème')] },
        { title: 'Antécédents médicaux', rows: [r('Traitement antérieur', 'Kinésithérapie, 6 séances, peu d’effet')] },
        { title: 'Général', rows: [r('Profession / âge', 'Infirmière / 42 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Fourmillements du pouce, de l’index et du majeur gauches, depuis 5 mois')] },
        { title: 'Quand avez-vous mal', rows: [r('La nuit', 'Oui, se réveille et secoue la main')] },
        { title: 'Nature de la douleur', rows: [r('Cervicalgie', 'Non')] },
        { title: 'Neurologie', rows: [r('Force', 'Laisse parfois tomber des objets')] },
        { title: 'Général', rows: [r('Profession / âge', 'Coiffeuse / 51 ans')] },
      ],
    ],
  },
};

/** The open neck sections fill in as the chat goes: section 0 after the first answer, section 1 after the second. */
const FILL_AT = [2, 4];

export function NeuroPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const steps = c.chat.length;
  const step = useSteps(steps, 900, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  // Per tab: the first two sections start open, plus the one holding the answer that decided the route.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (i < 2 || sections[i].rows.some((row) => row.flag));
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={8 + (step / steps) * 40}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step >= steps && <Choices options={c.suggestions} />}
      </Phone>

      <AppCard icon="chat" title={c.summary} action={<AppButton variant="subtle" icon="copy">{c.copy}</AppButton>} bodyClassName="px-4 pb-2">
        {/* One summary template per region */}
        <div className="flex gap-5 border-b border-[#E8EAEC] text-[13px] -mx-4 px-4 overflow-x-auto" role="tablist">
          {c.tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`py-2.5 -mb-px shrink-0 inline-flex items-center gap-1.5 border-b-2 transition-colors ${tab === i ? 'border-[#06ACC1] text-[#2A3A51] font-medium' : 'border-transparent text-[#949CB1] hover:text-[#2A3A51]'}`}
            >
              {i === 0 && <PatientAvatar initials="TA" size={18} />}
              {label}
            </button>
          ))}
        </div>
        {sections.map((section, i) => {
          const expanded = isOpen(i);
          const known = tab !== 0 || i >= FILL_AT.length || step >= FILL_AT[i];
          const flagged = section.rows.find((row) => row.flag);
          return (
            <div key={`${tab}-${section.title}`} className="py-2.5 border-b border-[#E8EAEC] last:border-0">
              <button type="button" onClick={() => toggle(i)} aria-expanded={expanded} className="w-full flex items-center gap-1.5 text-[13px] text-[#06ACC1] text-left">
                <span className={`text-[9px] transition-transform ${expanded ? '' : '-rotate-90'}`} aria-hidden="true">
                  ▼
                </span>
                {section.title}
                {!expanded && <span className="text-[#949CB1]">· {section.rows.length}</span>}
                {!expanded && flagged && (
                  <span className="ml-auto">
                    <Marker>{c.marker}</Marker>
                  </span>
                )}
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1.5">
                      {section.rows.map((row) => (
                        <p key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${row.flag ? '-mx-1 px-1 pl-5 rounded-md bg-[#FFF6E8]' : ''}`}>
                          <span className="font-semibold">{row.label}:</span>{' '}
                          {known ? (
                            <motion.span
                              initial={{ opacity: 0, backgroundColor: 'rgba(6,172,193,0.25)' }}
                              animate={{ opacity: 1, backgroundColor: 'rgba(6,172,193,0)' }}
                              transition={{ duration: 1.2 }}
                            >
                              {row.value}
                            </motion.span>
                          ) : (
                            <span className="text-[#949CB1]">…</span>
                          )}
                          {row.flag && (
                            <span className="ml-1.5 align-middle">
                              <Marker>{c.marker}</Marker>
                            </span>
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </AppCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Voice Reception: he calls, he is booked, nobody had to step in  */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts denkt dat ik een hernia in mijn nek heb. Kan ik een afspraak krijgen bij de neurochirurg?' },
      { from: 'bot', text: 'Vervelend om te horen. Straalt de pijn uit naar uw arm, en heeft u minder kracht in uw arm of hand?' },
      { from: 'patient', text: 'Ja, tot in mijn duim. En vastnemen gaat minder goed.' },
      { from: 'bot', text: 'Heeft u problemen met plassen of stoelgang, of stapt u onzekerder dan vroeger?' },
      { from: 'patient', text: 'Nee, dat niet.' },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de wervelkolomchirurg en stuur u een korte vragenlijst om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de wervelkolomchirurg: nekpijn met uitstraling en krachtverlies, geen rode vlaggen',
    details: 'Screeningdetails',
    patient: 'Patiënt',
    channel: 'Kanaal',
    incoming: 'Inkomend gesprek',
    language: 'Taal',
    languageValue: 'Nederlands',
    transfer: 'Doorverbonden',
    transferValue: 'Niet nodig',
    transcript: 'Bekijk transcriptie',
  },
  en: {
    calling: 'Incoming call',
    answered: 'Vesalius is answering',
    lines: [
      { from: 'patient', text: 'Hello, my GP thinks I have a herniated disc in my neck. Can I get an appointment with the neurosurgeon?' },
      { from: 'bot', text: 'I’m sorry to hear that. Does the pain radiate into your arm, and do you have less strength in your arm or hand?' },
      { from: 'patient', text: 'Yes, down to my thumb. And gripping is harder.' },
      { from: 'bot', text: 'Do you have any problems passing urine or with your bowels, or are you less steady on your feet than before?' },
      { from: 'patient', text: 'No, not that.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the spine surgeon and send you a short questionnaire to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the spine surgeon: neck pain with radiation and loss of strength, no red flags',
    details: 'Screening details',
    patient: 'Patient',
    channel: 'Channel',
    incoming: 'Incoming call',
    language: 'Language',
    languageValue: 'English',
    transfer: 'Forwarded',
    transferValue: 'Not needed',
    transcript: 'View transcription',
  },
  fr: {
    calling: 'Appel entrant',
    answered: 'Vesalius répond',
    lines: [
      { from: 'patient', text: 'Bonjour, mon médecin traitant pense que j’ai une hernie cervicale. Puis-je avoir un rendez-vous chez le neurochirurgien ?' },
      { from: 'bot', text: 'Je suis désolé de l’entendre. La douleur irradie-t-elle dans votre bras, et avez-vous moins de force dans le bras ou la main ?' },
      { from: 'patient', text: 'Oui, jusqu’au pouce. Et j’ai plus de mal à saisir les objets.' },
      { from: 'bot', text: 'Avez-vous des difficultés pour uriner ou aller à la selle, ou marchez-vous de façon moins assurée qu’avant ?' },
      { from: 'patient', text: 'Non, pas ça.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez le chirurgien du rachis et je vous envoie un court questionnaire pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez le chirurgien du rachis : cervicalgie avec irradiation et perte de force, aucun signal d’alerte',
    details: 'Détails du dépistage',
    patient: 'Patient',
    channel: 'Canal',
    incoming: 'Appel entrant',
    language: 'Langue',
    languageValue: 'Français',
    transfer: 'Transféré',
    transferValue: 'Pas nécessaire',
    transcript: 'Voir la transcription',
  },
};

export function NeuroVoiceDemo() {
  const c = useLocalized(VOICE);
  const lines = c.lines.length;
  // 1–6 transcript, 7 the booking appears as a done task, 8 completed
  const step = useSteps(lines + 2, 1000, 500);
  const status: ScreeningStatus = step >= lines + 2 ? 'COMPLETED' : step >= 1 ? 'IN_PROGRESS' : 'STARTED';

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5">
      <div className="rounded-[18px] bg-[#2A3A51] text-white p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <span className="relative w-11 h-11">
            <motion.span className="absolute inset-0 rounded-full border border-[#5FD4E2]" animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
            <span className="relative w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
              <AppIcon name="phone-incoming" size={18} color="#fff" />
            </span>
          </span>
          <span>
            <span className="block text-sm font-semibold">+32 4•• •• 56 78</span>
            <span className="block text-[11px] text-white/60">{step >= 1 ? c.answered : c.calling}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {c.lines.slice(0, Math.min(step, lines)).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-snug ${line.from === 'bot' ? 'self-end bg-[#06ACC1] text-white' : 'self-start bg-white/10 text-white/90'}`}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <StatusChip status={status} />
        </div>
        <AppCard icon="list-checked" title={c.tasks} bodyClassName="p-3">
          {step >= lines + 1 ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5 rounded-lg bg-[#E9FFF7] px-3 py-2.5 text-[12px]">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                className="mt-0.5 w-4 h-4 rounded-full bg-[#37C18D] text-white flex items-center justify-center shrink-0"
              >
                <Check size={10} color="#fff" />
              </motion.span>
              <span>{c.task}</span>
            </motion.div>
          ) : (
            <p className="text-[12px] text-[#949CB1] px-1 py-1">…</p>
          )}
        </AppCard>
        <AppCard icon="file-medical-alt" title={c.details} bodyClassName="px-4 py-2">
          <DetailRow
            label={c.patient}
            value={
              <span className="inline-flex items-center gap-1.5">
                <PatientAvatar initials="TA" size={18} />
                T. Atlas
              </span>
            }
          />
          <DetailRow
            label={c.channel}
            value={
              <span className="inline-flex items-center gap-1.5">
                <AppIcon name="phone-incoming" size={13} color={APP.primary} />
                {c.incoming}
              </span>
            }
          />
          <DetailRow label={c.language} value={c.languageValue} />
          <DetailRow
            label={c.transfer}
            value={
              step >= lines + 2 ? (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#37C18D] font-medium">
                  {c.transferValue}
                </motion.span>
              ) : (
                '-'
              )
            }
          />
        </AppCard>
        <AppButton className="w-full py-2.5">{c.transcript}</AppButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Scribe: the neurological examination, a Neurosurgery note       */
/* ------------------------------------------------------------------ */

const SCRIBE = {
  nl: {
    back: 'Terug',
    consultation: 'Consultatie',
    template: 'Neurochirurgie',
    templates: ['Cervicaal', 'Lumbaal', 'Craniaal', 'Perifere zenuwen'],
    autoDetect: 'Automatisch detecteren',
    stop: 'Stop opname',
    start: 'Start opname',
    showTranscript: 'Toon transcript',
    microphone: 'MacBook Pro-microfoon',
    generating: 'Aan het genereren',
    generatedWith: 'Gegenereerd met sjabloon',
    copy: 'Samenvatting kopiëren',
    more: 'Toon volledige nota',
    less: 'Toon minder',
    doctor: 'Arts',
    patient: 'Patiënt',
    lines: [
      { who: 'doctor', text: 'Ik kantel uw hoofd even naar rechts en duw zachtjes. Zeg maar wat u voelt.' },
      { who: 'patient', text: 'Ja, daar schiet het in mijn arm, tot in mijn duim.' },
      { who: 'doctor', text: 'Duw nu uw pols omhoog tegen mijn hand.' },
      { who: 'patient', text: 'Rechts gaat dat minder goed, hé.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Nekpijn met uitstraling naar de rechterarm, vooral duim en wijsvinger, sinds vier maanden. Verwezen door dr. Van Acker wegens vermoeden van nekhernia. Zeurende nekpijn (5/10), schietende armpijn met tintelingen (7/10), soms gevoelloosheid. Erger bij lang zitten, typen, voorover buigen en draaien naar rechts. 8 sessies kine en ibuprofen zonder blijvend effect. Geen koorts, nachtpijn, gewichtsverlies of plas- en stoelgangproblemen. Geen bloedverdunners.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Antalgische houding, lichte beperking actieve mobiliteit. Drukpijn paravertebraal cervicaal rechts. Rotatie en lateroflexie rechts beperkt en pijnlijk, extensie reproduceert de uitstraling. Spurling rechts positief. Hypesthesie duim en wijsvinger rechts (dermatoom C6). Lichte krachtsvermindering polsextensie en elleboogflexie rechts. Biceps- en brachioradialisreflex rechts verminderd. Hoffmann negatief, gang normaal, geen lange baantekens.',
        clamp: true,
      },
      {
        title: 'Medische beeldvorming',
        text: 'MRI cervicale wervelzuil: rechtszijdige paramediane discushernia C5-C6 met compressie van de C6-wortel. Geen myelumcompressie, geen andere pathologie.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Cervicale radiculopathie C6 rechts door discushernia C5-C6.', clamp: false },
      {
        title: 'Beleid',
        text: 'Conservatieve aanpak uitgelegd. Pijnstilling optimaliseren, NSAID in vast schema. Gerichte kinesitherapie met houdingsadvies. Ergonomieadvies werkplek. Actief blijven binnen de pijngrens. Herevaluatie binnen zes weken. Bij onvoldoende verbetering: epidurale infiltratie of chirurgisch advies bespreken. Vangnet: dringend terugkomen bij toenemend krachtverlies, uitval in armen of benen, loopstoornissen of plas- en stoelgangproblemen. Opvolging met NDI en pijnscores.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '22-06-1991'],
      ['Vragenlijst', 'Cervicale hernia'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Neurosurgery',
    templates: ['Cervical', 'Lumbar', 'Cranial', 'Peripheral nerves'],
    autoDetect: 'Auto-detect',
    stop: 'Stop recording',
    start: 'Start recording',
    showTranscript: 'Show transcript',
    microphone: 'MacBook Pro Microphone',
    generating: 'Generating',
    generatedWith: 'Generated with template',
    copy: 'Copy the summary',
    more: 'Show full note',
    less: 'Show less',
    doctor: 'Doctor',
    patient: 'Patient',
    lines: [
      { who: 'doctor', text: 'I’m going to tilt your head to the right and press gently. Tell me what you feel.' },
      { who: 'patient', text: 'Yes, there it shoots into my arm, down to my thumb.' },
      { who: 'doctor', text: 'Now push your wrist up against my hand.' },
      { who: 'patient', text: 'That’s weaker on the right, isn’t it.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Neck pain radiating to the right arm, mainly thumb and index finger, for four months. Referred by Dr Van Acker for a suspected cervical disc herniation. Aching neck pain (5/10), shooting arm pain with tingling (7/10), sometimes numbness. Worse with prolonged sitting, typing, bending forward and turning to the right. 8 physiotherapy sessions and ibuprofen without lasting effect. No fever, night pain, weight loss or bladder and bowel problems. No anticoagulants.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Antalgic posture, slightly restricted active mobility. Paravertebral cervical tenderness on the right. Rotation and lateral flexion to the right restricted and painful, extension reproduces the radiating pain. Spurling positive on the right. Hypoaesthesia of the right thumb and index finger (C6 dermatome). Mild weakness of wrist extension and elbow flexion on the right. Biceps and brachioradialis reflexes reduced on the right. Hoffmann negative, normal gait, no long tract signs.',
        clamp: true,
      },
      {
        title: 'Medical imaging',
        text: 'MRI of the cervical spine: right paramedian C5-C6 disc herniation compressing the C6 root. No cord compression, no other pathology.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Right C6 cervical radiculopathy due to a C5-C6 disc herniation.', clamp: false },
      {
        title: 'Plan',
        text: 'Conservative approach explained. Optimise pain relief, NSAID on a fixed schedule. Targeted physiotherapy with postural advice. Workplace ergonomic advice. Stay active within the pain limit. Reassessment within six weeks. If insufficient improvement: discuss an epidural injection or a surgical opinion. Safety net: return urgently with increasing weakness, deficit in arms or legs, gait disturbance or bladder and bowel problems. Follow-up with NDI and pain scores.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '22-06-1991'],
      ['Questionnaire', 'Cervical disc herniation'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Neurochirurgie',
    templates: ['Cervical', 'Lombaire', 'Crânien', 'Nerfs périphériques'],
    autoDetect: 'Détection automatique',
    stop: 'Arrêter l’enregistrement',
    start: 'Commencer l’enregistrement',
    showTranscript: 'Afficher la transcription',
    microphone: 'Microphone MacBook Pro',
    generating: 'Génération en cours',
    generatedWith: 'Généré avec le modèle',
    copy: 'Copier le résumé',
    more: 'Afficher la note complète',
    less: 'Afficher moins',
    doctor: 'Médecin',
    patient: 'Patient',
    lines: [
      { who: 'doctor', text: 'Je vais incliner votre tête vers la droite et appuyer doucement. Dites-moi ce que vous ressentez.' },
      { who: 'patient', text: 'Oui, là ça part dans mon bras, jusqu’au pouce.' },
      { who: 'doctor', text: 'Maintenant, poussez votre poignet vers le haut contre ma main.' },
      { who: 'patient', text: 'À droite, c’est moins fort, hein.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Cervicalgie irradiant vers le bras droit, surtout le pouce et l’index, depuis quatre mois. Adressé par le Dr Van Acker pour suspicion de hernie cervicale. Cervicalgie sourde (5/10), douleur fulgurante du bras avec fourmillements (7/10), parfois engourdissement. Aggravée par la position assise prolongée, la frappe au clavier, la flexion antérieure et la rotation vers la droite. 8 séances de kinésithérapie et ibuprofène sans effet durable. Pas de fièvre, de douleur nocturne, de perte de poids ni de troubles mictionnels ou intestinaux. Pas d’anticoagulants.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Attitude antalgique, légère limitation de la mobilité active. Douleur paravertébrale cervicale droite à la palpation. Rotation et inclinaison latérale droites limitées et douloureuses, l’extension reproduit l’irradiation. Spurling positif à droite. Hypoesthésie du pouce et de l’index droits (dermatome C6). Légère diminution de force de l’extension du poignet et de la flexion du coude à droite. Réflexes bicipital et stylo-radial diminués à droite. Hoffmann négatif, marche normale, pas de signes pyramidaux.',
        clamp: true,
      },
      {
        title: 'Imagerie médicale',
        text: 'IRM du rachis cervical : hernie discale C5-C6 paramédiane droite comprimant la racine C6. Pas de compression médullaire, pas d’autre pathologie.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Radiculopathie cervicale C6 droite sur hernie discale C5-C6.', clamp: false },
      {
        title: 'Plan',
        text: 'Approche conservatrice expliquée. Optimiser l’antalgie, AINS à horaire fixe. Kinésithérapie ciblée avec conseils posturaux. Conseils d’ergonomie au poste de travail. Rester actif dans la limite de la douleur. Réévaluation dans les six semaines. En cas d’amélioration insuffisante : discuter une infiltration épidurale ou un avis chirurgical. Filet de sécurité : revenir en urgence en cas de perte de force croissante, de déficit des bras ou des jambes, de troubles de la marche ou de troubles mictionnels ou intestinaux. Suivi par NDI et scores de douleur.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '22-06-1991'],
      ['Questionnaire', 'Hernie cervicale'],
      ['Langue', 'Français'],
    ],
  },
};

export function NeuroScribeDemo() {
  const c = useLocalized(SCRIBE);
  // 1–4 transcript lines while recording, 5 recording stops + generating, 6 note ready
  const step = useSteps(6, 1000, 500);
  const recording = step < 5;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<TomTitle back={c.back} />}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <AppCard
          icon="microphone"
          title={c.consultation}
          bodyClassName="p-4 flex flex-col gap-3"
          action={
            <span className="hidden md:flex items-center gap-1.5">
              <TemplatePicker label={c.template} options={c.templates} />
              <span className="rounded-lg ring-1 ring-[#E8EAEC] px-2.5 py-1 text-[11px]">{c.autoDetect}</span>
              <AppButton variant={recording ? 'danger' : 'subtle'} icon="microphone">
                {recording ? c.stop : c.start}
              </AppButton>
            </span>
          }
        >
          {recording && (
            <div className="flex items-center gap-3">
              <AppButton variant="subtle" icon="eye">
                {c.showTranscript}
              </AppButton>
              <span className="flex items-center gap-2 text-[11px] text-[#4E5670]">
                <span className="w-3 h-3 rounded-full bg-[#DE3C4B] animate-pulse" />
                {c.microphone}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step < 5 ? (
              <motion.div key="transcript" exit={{ opacity: 0 }} className="rounded-lg bg-[#F9FAFB] border border-[#E8EAEC] p-3 flex flex-col gap-2.5 min-h-[190px]">
                {c.lines.slice(0, step).map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="text-[12px] leading-snug">
                    <span className={`font-semibold ${line.who === 'doctor' ? 'text-[#06ACC1]' : 'text-[#0B759F]'}`}>{line.who === 'doctor' ? c.doctor : c.patient}: </span>
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>
            ) : step === 5 ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-lg bg-[#EBF6F8] px-3 py-2.5 text-[12px] flex items-center gap-2 min-h-[48px]"
              >
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <AppIcon name="refresh-double" size={14} color={APP.primary} />
                </motion.span>
                {c.generating}
              </motion.div>
            ) : (
              <motion.div key="summary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <div className="flex items-center justify-between rounded-lg bg-[#F4F5F8] px-3 py-2 text-[11px]">
                  <span>
                    {c.generatedWith} <b>{c.template}</b>
                  </span>
                  <AppButton variant="subtle" icon="copy">
                    {c.copy}
                  </AppButton>
                </div>
                {/* Diagnosis and plan in full first; the rest shortened until "Show full note" */}
                {[...c.sections.filter((s) => !s.clamp), ...c.sections.filter((s) => s.clamp)].map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{section.title}</p>
                    <p className={`text-[12.5px] leading-relaxed ${section.clamp && !full ? 'line-clamp-1 text-[#4E5670]' : ''}`}>{section.text}</p>
                  </motion.div>
                ))}
                <button type="button" onClick={() => setFull((f) => !f)} className="self-start px-1 text-[12px] font-medium text-[#06ACC1] hover:underline">
                  {full ? c.less : c.more}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title="Tom Atlas" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: his photo, and the stomach protector he forgot     */
/* ------------------------------------------------------------------ */

const MEDICATION = medicationCopy({
  nl: {
    found: 'Dank u, ik herken 3 geneesmiddelen:',
    confirm: 'Ja, klopt. De pantoprazol was ik vergeten, die neem ik voor mijn maag.',
    meds: [
      { name: 'Ibuprofen', strength: '400 mg', substance: 'Ibuprofen', frequency: '1 à 2× per dag, bij de maaltijd', indication: 'Pijn (NSAID)' },
      { name: 'Pantoprazol', strength: '20 mg', substance: 'Pantoprazol', frequency: '1× per dag, ’s ochtends', indication: 'Maagbescherming', tag: { label: 'Zelf vergeten', tone: 'amber' } },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracetamol', frequency: 'Bij pijn, max. 3× per dag', indication: 'Pijn' },
    ],
  },
  en: {
    found: 'Thank you, I recognise 3 medicines:',
    confirm: 'Yes, that’s right. I’d forgotten the pantoprazole, I take it for my stomach.',
    meds: [
      { name: 'Ibuprofen', strength: '400 mg', substance: 'Ibuprofen', frequency: 'Once or twice a day, with meals', indication: 'Pain (NSAID)' },
      { name: 'Pantoprazole', strength: '20 mg', substance: 'Pantoprazole', frequency: 'Once a day, in the morning', indication: 'Stomach protection', tag: { label: 'Forgotten', tone: 'amber' } },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracetamol', frequency: 'For pain, max. 3× a day', indication: 'Pain' },
    ],
  },
  fr: {
    found: 'Merci, je reconnais 3 médicaments :',
    confirm: 'Oui, c’est exact. J’avais oublié le pantoprazole, je le prends pour mon estomac.',
    meds: [
      { name: 'Ibuprofène', strength: '400 mg', substance: 'Ibuprofène', frequency: '1 à 2× par jour, au repas', indication: 'Douleur (AINS)' },
      { name: 'Pantoprazole', strength: '20 mg', substance: 'Pantoprazole', frequency: '1× par jour, le matin', indication: 'Protection gastrique', tag: { label: 'Oublié', tone: 'amber' } },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracétamol', frequency: 'En cas de douleur, max. 3× par jour', indication: 'Douleur' },
    ],
  },
});

export function NeuroMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Tom Atlas', initials: 'TA', dob: '22-06-1991', color: TOM }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: report, GP letter and physio ready, letter on click  */
/* ------------------------------------------------------------------ */

const DOCS = {
  nl: {
    tabs: ['Input', 'Output', 'Documenten'],
    title: 'Documentsjablonen',
    description: 'Deze sjablonen kunnen als document gegenereerd worden voor deze interactie. Gegenereerde documenten verschijnen in de lijst hieronder.',
    open: 'Document genereren',
    generate: 'Genereren',
    regenerate: 'Opnieuw genereren',
    generated: 'Gegenereerd',
    notGenerated: 'Nog niet gegenereerd',
    today: 'Vandaag',
    more: 'Toon volledige brief',
    less: 'Toon minder',
    templates: [
      { label: 'Consultatieverslag', description: 'Sjabloon Neurochirurgie, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Voorschrift kinesitherapie', description: 'Gerichte kine met houdingsadvies' },
      { label: 'Uitleg voor de patiënt', description: 'Ergonomieadvies en wanneer dringend terugkomen' },
      { label: 'Attest werkaanpassing', description: 'Aangepaste werkplek en pauzes' },
    ],
    previews: [
      'Diagnose: cervicale radiculopathie C6 rechts door discushernia C5-C6. Beleid: conservatieve aanpak, NSAID in vast schema, gerichte kine met houdingsadvies, herevaluatie binnen zes weken.',
      'Geachte collega, ik zag uw patiënt de heer Atlas voor nekpijn met uitstraling naar de rechterarm sinds vier maanden. De MRI toont een discushernia C5-C6 rechts met compressie van de C6-wortel. We starten een conservatieve aanpak en herevalueren binnen zes weken.',
      'Gerichte kinesitherapie cervicaal met houdingsadvies, wegens cervicale radiculopathie C6 rechts door discushernia C5-C6.',
      'De pijn in uw nek en arm komt door een hernia die op een zenuw drukt. Bij de meeste mensen verbetert dat zonder operatie. Hieronder leest u hoe u uw werkplek aanpast en wanneer u dringend terugkomt.',
      'Aangepaste werkplek met het scherm op ooghoogte en regelmatige pauzes, tot de herevaluatie binnen zes weken.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënt Tom Atlas, geboren op 22 juni 1991, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens een vermoeden van nekhernia. Nekpijn met uitstraling naar de rechterarm, vooral naar duim en wijsvinger, sinds vier maanden.'],
        [
          'Anamnese',
          'Zeurende nekpijn met schietende pijn en tintelingen naar de rechterarm, soms gevoelloosheid. Pijnscore 5 tot 7 op 10. Erger bij lang zitten, typen, voorover buigen en het hoofd naar rechts draaien. Beter bij rust, warmte en ibuprofen. 8 sessies kinesitherapie zonder blijvend effect. Geen koorts, nachtpijn, gewichtsverlies of plas- en stoelgangproblemen. Appendectomie drie jaar geleden. Neemt daarnaast pantoprazol als maagbescherming en paracetamol bij pijn. Geen allergieën, rookt niet.',
        ],
        [
          'Klinisch onderzoek',
          'Antalgische houding van de nek met lichte beperking van de actieve mobiliteit. Spurling rechts positief, met reproductie van pijn en tintelingen naar duim en wijsvinger. Hypesthesie duim en wijsvinger rechts, passend bij dermatoom C6. Lichte krachtsvermindering bij polsextensie en elleboogflexie rechts. Biceps- en brachioradialisreflex rechts verminderd. Geen tekenen van myelopathie: Hoffmann negatief, gang normaal.',
        ],
        ['Aanvullende onderzoeken', 'MRI cervicale wervelzuil: rechtszijdige paramediane discushernia C5-C6 met compressie van de C6-wortel. Geen myelumcompressie.'],
        ['Diagnose', 'Cervicale radiculopathie C6 rechts door discushernia C5-C6.'],
        [
          'Beleid',
          'De meeste cervicale radiculopathieën verbeteren met een conservatieve aanpak. We optimaliseren de pijnstilling en starten gerichte kinesitherapie met houdingsadvies. Tom kreeg ergonomieadvies voor zijn werkplek. Herevaluatie binnen zes weken. Bij onvoldoende verbetering bespreken we een epidurale infiltratie of chirurgisch advies. Hij weet dat hij dringend moet terugkomen bij toenemend krachtverlies, uitval in armen of benen, loopstoornissen of plas- en stoelgangproblemen.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, neurochirurg',
    },
  },
  en: {
    tabs: ['Input', 'Output', 'Documents'],
    title: 'Document templates',
    description: 'These templates can be used to generate a document for this interaction. Generated documents appear in the list below.',
    open: 'Generate document',
    generate: 'Generate',
    regenerate: 'Regenerate',
    generated: 'Generated',
    notGenerated: 'Not generated yet',
    today: 'Today',
    more: 'Show full letter',
    less: 'Show less',
    templates: [
      { label: 'Consultation report', description: 'Neurosurgery template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Physiotherapy prescription', description: 'Targeted physiotherapy with postural advice' },
      { label: 'Explanation for the patient', description: 'Ergonomic advice and when to come back urgently' },
      { label: 'Work adjustment certificate', description: 'Adapted workstation and breaks' },
    ],
    previews: [
      'Diagnosis: right C6 cervical radiculopathy due to a C5-C6 disc herniation. Plan: conservative approach, NSAID on a fixed schedule, targeted physiotherapy with postural advice, reassessment within six weeks.',
      'Dear colleague, I saw your patient Mr Atlas for neck pain radiating to the right arm for four months. The MRI shows a right C5-C6 disc herniation compressing the C6 root. We are starting a conservative approach and will reassess within six weeks.',
      'Targeted cervical physiotherapy with postural advice, for a right C6 cervical radiculopathy due to a C5-C6 disc herniation.',
      'The pain in your neck and arm comes from a herniated disc pressing on a nerve. For most people this improves without surgery. Below you can read how to adjust your workplace and when to come back urgently.',
      'Adapted workstation with the screen at eye level and regular breaks, until the reassessment within six weeks.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Tom Atlas, born on 22 June 1991, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for a suspected cervical disc herniation. Neck pain radiating to the right arm, mainly to the thumb and index finger, for four months.'],
        [
          'History',
          'Aching neck pain with shooting pain and tingling into the right arm, sometimes numbness. Pain score 5 to 7 out of 10. Worse with prolonged sitting, typing, bending forward and turning the head to the right. Better with rest, warmth and ibuprofen. 8 physiotherapy sessions without lasting effect. No fever, night pain, weight loss or bladder and bowel problems. Appendectomy three years ago. Also takes pantoprazole for stomach protection and paracetamol for pain. No allergies, non-smoker.',
        ],
        [
          'Clinical examination',
          'Antalgic posture of the neck with slightly restricted active mobility. Spurling positive on the right, reproducing pain and tingling to the thumb and index finger. Hypoaesthesia of the right thumb and index finger, consistent with the C6 dermatome. Mild weakness of wrist extension and elbow flexion on the right. Biceps and brachioradialis reflexes reduced on the right. No signs of myelopathy: Hoffmann negative, normal gait.',
        ],
        ['Further investigations', 'MRI of the cervical spine: right paramedian C5-C6 disc herniation compressing the C6 root. No cord compression.'],
        ['Diagnosis', 'Right C6 cervical radiculopathy due to a C5-C6 disc herniation.'],
        [
          'Plan',
          'Most cervical radiculopathies improve with a conservative approach. We are optimising pain relief and starting targeted physiotherapy with postural advice. Tom received ergonomic advice for his workplace. Reassessment within six weeks. If there is insufficient improvement, we will discuss an epidural injection or a surgical opinion. He knows to return urgently with increasing weakness, deficit in the arms or legs, gait disturbance or bladder and bowel problems.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, neurosurgeon',
    },
  },
  fr: {
    tabs: ['Input', 'Output', 'Documents'],
    title: 'Modèles de documents',
    description: 'Ces modèles permettent de générer un document pour cette interaction. Les documents générés apparaissent dans la liste ci-dessous.',
    open: 'Générer un document',
    generate: 'Générer',
    regenerate: 'Régénérer',
    generated: 'Généré',
    notGenerated: 'Pas encore généré',
    today: 'Aujourd’hui',
    more: 'Afficher la lettre complète',
    less: 'Afficher moins',
    templates: [
      { label: 'Rapport de consultation', description: 'Modèle Neurochirurgie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Prescription de kinésithérapie', description: 'Kinésithérapie ciblée avec conseils posturaux' },
      { label: 'Explication pour le patient', description: 'Conseils d’ergonomie et quand revenir en urgence' },
      { label: 'Certificat d’aménagement du travail', description: 'Poste de travail adapté et pauses' },
    ],
    previews: [
      'Diagnostic : radiculopathie cervicale C6 droite sur hernie discale C5-C6. Plan : approche conservatrice, AINS à horaire fixe, kinésithérapie ciblée avec conseils posturaux, réévaluation dans les six semaines.',
      'Cher confrère, j’ai vu votre patient M. Atlas pour une cervicalgie irradiant vers le bras droit depuis quatre mois. L’IRM montre une hernie discale C5-C6 droite comprimant la racine C6. Nous débutons une approche conservatrice et réévaluerons dans les six semaines.',
      'Kinésithérapie cervicale ciblée avec conseils posturaux, pour une radiculopathie cervicale C6 droite sur hernie discale C5-C6.',
      'La douleur dans votre nuque et votre bras vient d’une hernie qui appuie sur un nerf. Chez la plupart des gens, cela s’améliore sans opération. Vous lirez ci-dessous comment adapter votre poste de travail et quand revenir en urgence.',
      'Poste de travail adapté, avec l’écran à hauteur des yeux et des pauses régulières, jusqu’à la réévaluation dans les six semaines.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patient Tom Atlas, né le 22 juin 1991, que j’ai vu récemment en consultation.',
      sections: [
        ['Motif du contact', 'Adressé pour suspicion de hernie cervicale. Cervicalgie irradiant vers le bras droit, surtout vers le pouce et l’index, depuis quatre mois.'],
        [
          'Anamnèse',
          'Cervicalgie sourde avec douleur fulgurante et fourmillements dans le bras droit, parfois engourdissement. Score de douleur de 5 à 7 sur 10. Aggravée par la position assise prolongée, la frappe au clavier, la flexion antérieure et la rotation de la tête vers la droite. Améliorée par le repos, la chaleur et l’ibuprofène. 8 séances de kinésithérapie sans effet durable. Pas de fièvre, de douleur nocturne, de perte de poids ni de troubles mictionnels ou intestinaux. Appendicectomie il y a trois ans. Prend également du pantoprazole en protection gastrique et du paracétamol en cas de douleur. Pas d’allergies, non-fumeur.',
        ],
        [
          'Examen clinique',
          'Attitude antalgique de la nuque avec légère limitation de la mobilité active. Spurling positif à droite, reproduisant la douleur et les fourmillements vers le pouce et l’index. Hypoesthésie du pouce et de l’index droits, compatible avec le dermatome C6. Légère diminution de force de l’extension du poignet et de la flexion du coude à droite. Réflexes bicipital et stylo-radial diminués à droite. Pas de signes de myélopathie : Hoffmann négatif, marche normale.',
        ],
        ['Examens complémentaires', 'IRM du rachis cervical : hernie discale C5-C6 paramédiane droite comprimant la racine C6. Pas de compression médullaire.'],
        ['Diagnostic', 'Radiculopathie cervicale C6 droite sur hernie discale C5-C6.'],
        [
          'Plan',
          'La plupart des radiculopathies cervicales s’améliorent avec une approche conservatrice. Nous optimisons l’antalgie et débutons une kinésithérapie ciblée avec conseils posturaux. Tom a reçu des conseils d’ergonomie pour son poste de travail. Réévaluation dans les six semaines. En cas d’amélioration insuffisante, nous discuterons d’une infiltration épidurale ou d’un avis chirurgical. Il sait qu’il doit revenir en urgence en cas de perte de force croissante, de déficit des bras ou des jambes, de troubles de la marche ou de troubles mictionnels ou intestinaux.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, neurochirurgien',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function NeuroDocumentDemo() {
  const c = useLocalized(DOCS);
  const [states, setStates] = useState<DocState[]>(() => c.templates.map(() => 'idle'));
  const [order, setOrder] = useState<number[]>([]);
  const [fullLetter, setFullLetter] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const generate = (i: number) => {
    setStates((s) => s.map((v, k) => (k === i ? 'generating' : v)));
    timers.current.push(
      setTimeout(() => {
        setStates((s) => s.map((v, k) => (k === i ? 'generated' : v)));
        setOrder((o) => [i, ...o.filter((k) => k !== i)]);
      }, 1300),
    );
  };

  // Report, physio prescription and GP letter generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [
      setTimeout(() => generate(0), 900),
      setTimeout(() => generate(2), 2100),
      setTimeout(() => generate(LETTER), 3300),
    ];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<TomTitle />}>
      <div className="bg-white rounded-xl border border-[#E8EAEC]">
        <div className="flex gap-5 px-4 border-b border-[#E8EAEC] text-[13px]">
          {c.tabs.map((tab, i) => (
            <span key={tab} className={`py-2.5 ${i === 2 ? 'border-b-2 border-[#06ACC1] text-[#2A3A51]' : 'text-[#4E5670]'}`}>
              {tab}
            </span>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-semibold">{c.title}</p>
              <p className="text-[11.5px] text-[#4E5670] max-w-md leading-snug mt-0.5">{c.description}</p>
            </div>
            <AppButton variant="bordered" icon="plus">
              {c.open}
            </AppButton>
          </div>

          <div className="flex flex-col gap-2">
            {c.templates.map((template, i) => {
              const state = states[i];
              return (
                <div key={template.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#E8EAEC] px-3 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 rounded-md bg-[#EBF6F8] text-[#06ACC1] text-[10px] font-bold px-1.5 py-1">DOC</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[12.5px] font-medium">{template.label}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${state === 'generated' ? 'bg-[#E9FFF7] text-[#37C18D]' : 'bg-[#F4F5F8] text-[#949CB1]'}`}
                        >
                          {state === 'generated' ? c.generated : c.notGenerated}
                        </span>
                      </span>
                      <span className="block text-[11px] text-[#949CB1] truncate">{template.description}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={state === 'generating'}
                    onClick={() => generate(i)}
                    className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#06ACC1] hover:underline disabled:opacity-60"
                  >
                    {state === 'generating' ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <AppIcon name="refresh-double" size={13} color={APP.primary} />
                      </motion.span>
                    ) : (
                      <AppIcon name={state === 'generated' ? 'refresh-double' : 'plus'} size={13} color={APP.primary} />
                    )}
                    {state === 'generated' ? c.regenerate : c.generate}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <AnimatePresence initial={false}>
              {order.map((i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex items-start gap-3 rounded-lg bg-[#F9FAFB] border border-[#E8EAEC] px-3 py-2.5"
                >
                  <AppIcon name="file-check-alt" size={18} color={APP.primary} className="mt-0.5" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-medium">
                      {c.templates[i].label} <span className="text-[#949CB1] font-normal">· {c.today}</span>
                    </span>
                    {i === LETTER && fullLetter ? (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 block rounded-lg bg-white border border-[#E8EAEC] px-4 py-3 text-[12px] leading-relaxed text-[#2A3A51]">
                        <span className="block">{c.letter.greeting}</span>
                        <span className="block mt-2">{c.letter.intro}</span>
                        {c.letter.sections.map(([heading, text]) => (
                          <span key={heading} className="block mt-2.5">
                            <span className="block text-[13px] font-semibold tracking-[0.06em] [font-variant-caps:all-small-caps] text-[#0B759F]">{heading}</span>
                            {text}
                          </span>
                        ))}
                        <span className="block mt-3">{c.letter.closing}</span>
                      </motion.span>
                    ) : (
                      <span className="block text-[11.5px] text-[#4E5670] leading-snug">{c.previews[i]}</span>
                    )}
                    {i === LETTER && (
                      <button type="button" onClick={() => setFullLetter((f) => !f)} className="mt-1.5 text-[12px] font-medium text-[#06ACC1] hover:underline">
                        {fullLetter ? c.less : c.more}
                      </button>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 8 · Follow-up: K. Discus raises an alert, Tom recovers              */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };

const FOLLOW = {
  nl: {
    hello: 'Hallo Dr. Vesalius!',
    calm: 'U hebt geen urgente interacties',
    urgent: 'U hebt 1 waarschuwingstaak',
    screenings: 'Recente Screenings',
    alerts: 'Waarschuwingstaken',
    noAlerts: 'Geen waarschuwingstaken.',
    viewAll: 'Bekijk alle',
    rows: [
      ['K. Discus', 'ACDF · week 2'],
      ['T. Atlas', 'Hernia conservatief · week 6 · NDI ingevuld'],
      ['S. Foramen', 'Infiltratie · week 3'],
      ['L. Ischias', 'Hernia conservatief · maand 3'],
    ],
    alert: 'Meldt toenemende slikklachten en koorts (38,3 °C), twee weken na de ACDF. Neem contact op.',
    detail: 'T. Atlas · hernia conservatief',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met de pijn in uw arm sinds uw vorige consult?' },
      { from: 'patient', text: 'Een stuk beter. Typen gaat al vlotter sinds mijn scherm hoger staat.' },
      { from: 'bot', text: 'Fijn om te horen. Is er iets dat nog niet lukt?' },
      { from: 'patient', text: 'Gitaar spelen. Mijn duim voelt nog wat dof.' },
      { from: 'bot', text: 'Heeft u minder kracht gekregen, of moeite met stappen of plassen?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Voorbeelddata',
    measures: ['NRS arm', 'NRS nek', 'NDI'],
    life: [
      ['Slaap', 'Onrustig', 'Beter'],
      ['Werk', 'Volledig, met pijn', 'Volledig, met aangepaste werkplek'],
      ['Hobby', 'Geen gitaar, geen voetbal', 'Nog geen gitaar'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die u kiest. Kiest u later voor een infiltratie of een ingreep, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Conservatief',
        tom: true,
        items: [
          { moment: 'Week 6', name: 'Opvolging hernia conservatief', asks: 'NRS arm en nek, NDI, effect van de kine, medicatiegebruik, werk, slaap, hobby’s, open vragen, rode vlaggen', current: true },
          { moment: 'Maand 3 en 12', name: 'Opvolging hernia + welzijn', asks: 'Idem, aangevuld met EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'Infiltratie',
        items: [
          { moment: 'Dag 2', name: 'Controle na infiltratie', asks: 'Hoofdpijn, koorts, meer pijn of minder kracht dan voordien' },
          { moment: 'Week 3', name: 'Effect infiltratie', asks: 'Hoeveel de armpijn daalde en hoe lang, NRS arm en nek' },
        ] as Questionnaire[],
      },
      {
        name: 'Operatie (ACDF)',
        items: [
          { moment: 'Week 2', name: 'Postoperatieve controle', asks: 'Slikklachten, heesheid, wonde, koorts, armpijn, krachtverlies' },
          { moment: 'Week 6', name: 'Herstel na operatie', asks: 'NRS arm en nek, NDI, werkhervatting, open vragen' },
          { moment: 'Maand 3 en 12', name: 'Uitkomst na operatie', asks: 'NDI, EQ-5D-5L, tevredenheid, PREM' },
        ] as Questionnaire[],
      },
    ],
  },
  en: {
    hello: 'Hello Dr Vesalius!',
    calm: 'You have no urgent interactions',
    urgent: 'You have 1 alert task',
    screenings: 'Recent Screenings',
    alerts: 'Alert Tasks',
    noAlerts: 'No alert tasks.',
    viewAll: 'View all',
    rows: [
      ['K. Discus', 'ACDF · week 2'],
      ['T. Atlas', 'Disc herniation, conservative · week 6 · NDI completed'],
      ['S. Foramen', 'Injection · week 3'],
      ['L. Ischias', 'Disc herniation, conservative · month 3'],
    ],
    alert: 'Reports increasing difficulty swallowing and fever (38.3 °C), two weeks after the ACDF. Please get in touch.',
    detail: 'T. Atlas · disc herniation, conservative',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'How has the pain in your arm been since your last consultation?' },
      { from: 'patient', text: 'A lot better. Typing is already easier since I raised my screen.' },
      { from: 'bot', text: 'Good to hear. Is there anything you still can’t do?' },
      { from: 'patient', text: 'Play the guitar. My thumb still feels a bit numb.' },
      { from: 'bot', text: 'Have you lost any strength, or had trouble walking or passing urine?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Example data',
    measures: ['NRS arm', 'NRS neck', 'NDI'],
    life: [
      ['Sleep', 'Restless', 'Better'],
      ['Work', 'Full-time, with pain', 'Full-time, with an adapted workstation'],
      ['Hobbies', 'No guitar, no football', 'No guitar yet'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment you choose. If you later opt for an injection or surgery, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Conservative',
        tom: true,
        items: [
          {
            moment: 'Week 6',
            name: 'Follow-up, conservative disc treatment',
            asks: 'NRS arm and neck, NDI, effect of physiotherapy, medication use, work, sleep, hobbies, open questions, red flags',
            current: true,
          },
          { moment: 'Months 3 and 12', name: 'Disc follow-up + wellbeing', asks: 'As above, plus EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'Injection',
        items: [
          { moment: 'Day 2', name: 'Check after injection', asks: 'Headache, fever, more pain or less strength than before' },
          { moment: 'Week 3', name: 'Effect of injection', asks: 'How much the arm pain fell and for how long, NRS arm and neck' },
        ] as Questionnaire[],
      },
      {
        name: 'Surgery (ACDF)',
        items: [
          { moment: 'Week 2', name: 'Post-operative check', asks: 'Swallowing problems, hoarseness, wound, fever, arm pain, loss of strength' },
          { moment: 'Week 6', name: 'Recovery after surgery', asks: 'NRS arm and neck, NDI, return to work, open questions' },
          { moment: 'Months 3 and 12', name: 'Outcome after surgery', asks: 'NDI, EQ-5D-5L, satisfaction, PREM' },
        ] as Questionnaire[],
      },
    ],
  },
  fr: {
    hello: 'Bonjour Dr Vesalius !',
    calm: 'Vous n’avez aucune interaction urgente',
    urgent: 'Vous avez 1 tâche d’alerte',
    screenings: 'Dépistages Récents',
    alerts: 'Tâches d’alerte',
    noAlerts: 'Aucune tâche d’alerte.',
    viewAll: 'Voir tout',
    rows: [
      ['K. Discus', 'ACDF · semaine 2'],
      ['T. Atlas', 'Hernie, conservateur · semaine 6 · NDI rempli'],
      ['S. Foramen', 'Infiltration · semaine 3'],
      ['L. Ischias', 'Hernie, conservateur · mois 3'],
    ],
    alert: 'Signale des troubles de la déglutition croissants et de la fièvre (38,3 °C), deux semaines après l’ACDF. Prenez contact.',
    detail: 'T. Atlas · hernie, traitement conservateur',
    checkin: 'Suivi semaine 6',
    chat: [
      { from: 'bot', text: 'Comment va la douleur dans votre bras depuis votre dernière consultation ?' },
      { from: 'patient', text: 'Beaucoup mieux. Taper au clavier est déjà plus facile depuis que mon écran est plus haut.' },
      { from: 'bot', text: 'Ravi de l’entendre. Y a-t-il quelque chose qui ne va pas encore ?' },
      { from: 'patient', text: 'Jouer de la guitare. Mon pouce est encore un peu engourdi.' },
      { from: 'bot', text: 'Avez-vous perdu de la force, ou avez-vous du mal à marcher ou à uriner ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    baseline: 'Référence',
    week6: 'Semaine 6',
    exampleData: 'Données d’exemple',
    measures: ['NRS bras', 'NRS nuque', 'NDI'],
    life: [
      ['Sommeil', 'Agité', 'Meilleur'],
      ['Travail', 'À temps plein, avec douleur', 'À temps plein, poste adapté'],
      ['Loisirs', 'Ni guitare ni football', 'Pas encore de guitare'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement que vous choisissez. Si vous optez plus tard pour une infiltration ou une intervention, le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Conservateur',
        tom: true,
        items: [
          {
            moment: 'Semaine 6',
            name: 'Suivi hernie, traitement conservateur',
            asks: 'NRS bras et nuque, NDI, effet de la kiné, prise de médicaments, travail, sommeil, loisirs, questions ouvertes, signaux d’alerte',
            current: true,
          },
          { moment: 'Mois 3 et 12', name: 'Suivi hernie + bien-être', asks: 'Idem, complété par l’EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'Infiltration',
        items: [
          { moment: 'Jour 2', name: 'Contrôle après infiltration', asks: 'Céphalées, fièvre, plus de douleur ou moins de force qu’avant' },
          { moment: 'Semaine 3', name: 'Effet de l’infiltration', asks: 'De combien la douleur du bras a diminué et pendant combien de temps, NRS bras et nuque' },
        ] as Questionnaire[],
      },
      {
        name: 'Opération (ACDF)',
        items: [
          { moment: 'Semaine 2', name: 'Contrôle postopératoire', asks: 'Troubles de la déglutition, enrouement, plaie, fièvre, douleur du bras, perte de force' },
          { moment: 'Semaine 6', name: 'Convalescence après opération', asks: 'NRS bras et nuque, NDI, reprise du travail, questions ouvertes' },
          { moment: 'Mois 3 et 12', name: 'Résultat après opération', asks: 'NDI, EQ-5D-5L, satisfaction, PREM' },
        ] as Questionnaire[],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'KD', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'TA', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'SF', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'LI', flag: false, date: '23-09-2026, 09:30' },
];
// Baseline → week 6 (sales' example data); the bar is value / max, so a shorter bar is progress.
const SCORES: { max: number; unit: string; values: [number, number] }[] = [
  { max: 10, unit: '', values: [7, 4] },
  { max: 10, unit: '', values: [5, 3] },
  { max: 100, unit: '%', values: [36, 24] },
];
const TOM_ROW = 1;

export function NeuroFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 K. Discus's alert, 6 Tom's recovery opens
  const step = useSteps(6, 850, 500);
  const alert = step >= 5;
  const [manual, setManual] = useState<boolean | null>(null);
  const detailOpen = manual ?? step >= 6;
  const shown = FOLLOW_ROWS.map((row, i) => ({ ...row, i, copy: c.rows[i] })).filter((row) => step >= FOLLOW_ROWS.length - row.i);

  return (
    <AppFrame
      active="dashboard"
      title={c.hello}
      subtitle={
        <span className={`inline-flex items-center gap-1 ${alert ? 'text-[#DE3C4B]' : ''}`}>
          <AppIcon name="exclamation-triangle" size={11} color={alert ? '#DE3C4B' : APP.darkGrey} />
          {alert ? c.urgent : c.calm}
        </span>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <AppCard tone="widget" icon="clipboard-notes" title={c.screenings} bodyClassName="p-3 flex flex-col gap-2 min-h-[236px]">
          <AnimatePresence initial={false}>
            {shown.map((row) => {
              const red = row.flag && alert;
              const tom = row.i === TOM_ROW;
              const body = (
                <>
                  <PatientAvatar initials={row.initials} flag={row.flag} size={30} />
                  <span className="flex-1 min-w-0 text-left">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-semibold truncate">
                      {row.copy[0]}
                      {red && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#949CB1] truncate">
                      <AppIcon name="calendar-alt" size={11} color={APP.darkGrey} />
                      {row.copy[1]} · {row.date}
                    </span>
                  </span>
                </>
              );
              return (
                <motion.div key={row.i} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  {tom ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#4F5BD5]/40 bg-[#EEF0FD]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
                    >
                      {body}
                    </button>
                  ) : (
                    <div className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${red ? 'border-[#DE3C4B]/40 bg-[#FFE7ED]/50' : 'border-[#E8EAEC]'}`}>{body}</div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </AppCard>

        <AppCard tone="widget" icon="exclamation-triangle" title={c.alerts} bodyClassName="p-3 min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {alert ? (
              <motion.div key="alert" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: EASE }} className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 rounded-lg bg-[#FFE7ED] px-3 py-2.5 text-[12px]">
                  <AppIcon name="exclamation-triangle" size={15} color={APP.accent} className="mt-0.5" />
                  <span>
                    <b>K. Discus</b> · {c.alert}
                  </span>
                </div>
                <AppButton className="w-full py-2">{c.viewAll}</AppButton>
              </motion.div>
            ) : (
              <motion.p key="none" exit={{ opacity: 0 }} className="text-[12px] text-[#949CB1] text-center">
                {c.noAlerts}
              </motion.p>
            )}
          </AnimatePresence>
        </AppCard>
      </div>

      <AnimatePresence initial={false}>
        {detailOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
            <div className="pt-4 flex flex-col gap-4">
              <AppCard
                icon="user"
                title={
                  <span className="inline-flex items-center gap-2">
                    <PatientAvatar initials="TA" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5"
              >
                {/* The week-6 check-in, in natural language */}
                <div>
                  <p className="text-[11px] font-medium text-[#949CB1] mb-2">{c.checkin}</p>
                  <div className="flex flex-col gap-2">
                    {c.chat.map((msg, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.2, duration: 0.35 }}
                        className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${msg.from === 'bot' ? 'self-start bg-[#F4F5F8]' : 'self-end bg-[#06ACC1] text-white'}`}
                      >
                        {msg.text}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Scores: baseline in grey, week 6 in Tom's colour; here a shorter bar is progress */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">
                      {c.scores}{' '}
                      <span className="ml-1 inline-flex items-center rounded-full bg-[#E9FFF7] px-2 py-0.5 text-[10.5px] font-semibold text-[#1F9E6E] align-middle">↓ {c.lowerBetter}</span>
                    </p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.baseline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: TOM }} />
                        {c.week6}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const { max, unit, values } = SCORES[i];
                      const [before, after] = values;
                      return (
                        <div key={label}>
                          <p className="flex justify-between text-[11px] mb-1">
                            <span>
                              {label} <span className="text-[#949CB1]">· 0–{max}{unit}</span>
                            </span>
                            <span className="tabular-nums text-[#4E5670]">
                              {before}
                              {unit} → <b className="text-[#2A3A51]">{after}{unit}</b>
                            </span>
                          </p>
                          <div className="flex flex-col gap-0.5">
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span className="block h-full rounded-full bg-[#D5D9E0]" initial={{ width: 0 }} animate={{ width: `${(before / max) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }} />
                            </span>
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span className="block h-full rounded-full" style={{ backgroundColor: TOM }} initial={{ width: 0 }} animate={{ width: `${(after / max) * 100}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: EASE }} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Not only numbers: sleep, work and the guitar */}
                  <div className="mt-4 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                    {c.life.map(([label, before, after]) => (
                      <p key={label} className="grid grid-cols-[4.5rem_1fr] gap-2 py-1.5 text-[11px]">
                        <span className="text-[#949CB1]">{label}</span>
                        <span>
                          <span className="text-[#949CB1]">{before}</span> → <b className="font-semibold">{after}</b>
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </AppCard>

              {/* The follow-up switches with the treatment the doctor chooses */}
              <AppCard icon="list-checked" title={c.plans} bodyClassName="p-4">
                <p className="text-[11.5px] text-[#4E5670] leading-snug mb-3 max-w-xl">{c.plansIntro}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {c.treatments.map((treatment) => (
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.tom ? 'border-[#4F5BD5]/30 bg-[#EEF0FD]/60' : 'border-[#E8EAEC]'}`}>
                      <p className="flex items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.tom && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#4F5BD5]/20">
                            <PatientAvatar initials="TA" size={12} />
                            Tom
                          </span>
                        )}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {treatment.items.map((item) => (
                          <li key={item.moment + item.name} className="text-[11px] leading-snug">
                            <span className="flex flex-wrap items-center gap-1.5">
                              <span className="font-semibold tabular-nums text-[#0B759F]">{item.moment}</span>
                              <span className="font-medium">{item.name}</span>
                              {item.current && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E9FFF7] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#1F9E6E]">
                                  <Check size={9} color="#1F9E6E" />
                                  {c.completed}
                                </span>
                              )}
                            </span>
                            <span className="block text-[#949CB1]">{item.asks}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#4E5670]">
                  <AppIcon name="exclamation-triangle" size={11} color={APP.darkGrey} />
                  {c.plansNote}
                </p>
              </AppCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppFrame>
  );
}
