'use client';

/**
 * Module demos for the physical medicine variant (source: sales, "Website-inhoud fysische geneeskunde", §7). Every page
 * follows Sofie Fascia (41, fibromyalgia) one step further; G. Temporalis (possible giant cell arteritis) is the
 * recurring red flag. The weight lies on the intake (two years of history, over several evenings) and the long first
 * consultation, so those two pages carry the most. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Sofie keeps one avatar colour on every page, so visitors recognise her. */
const SOFIE = '#4F5BD5';
const SOFIE_SOFT = '#EEF0FD';
/** Red flags (G. Temporalis, P. Phalanx) share one red accent and the warning icon. */
const RED = APP.accent;
/** Patients sent elsewhere (rheumatology, the GP for bloods first) stand apart from those who stay. */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'SF' ? SOFIE : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function SofieTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="SF" size={24} />
        Sofie Fascia
      </span>
    </span>
  );
}

/** A phone frame for the patient chat; the header shows progress, as a bar or as the intake's chapters. */
function Phone({ intro, header, placeholder, children }: { intro: string; header: React.ReactNode; placeholder: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[280px] md:w-[300px] rounded-[40px] bg-[#111] p-[9px] shadow-[0_40px_80px_-40px_rgba(42,58,81,0.6)]">
      <div className="rounded-[32px] bg-white overflow-hidden h-[540px] flex flex-col text-[#2A3A51]">
        <div className="pt-7 px-5 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vesalius-logo-with-text.svg" alt="" className="h-5 mx-auto" />
          <p className="text-[10px] text-[#949CB1] mt-2 leading-snug">{intro}</p>
        </div>
        <div className="px-4 mt-3">{header}</div>
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

function ProgressBar({ label, fill }: { label: string; fill: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[10px] text-[#4E5670]">{label}</span>
      <span className="flex-1 h-1 rounded-full bg-[#E8EAEC] overflow-hidden">
        <motion.span className="block h-full bg-[#06ACC1]" animate={{ width: `${fill}%` }} transition={{ duration: 0.6 }} />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Pain map: the 19 regions of the Widespread Pain Index               */
/* ------------------------------------------------------------------ */

type Region =
  | 'jawR'
  | 'jawL'
  | 'shoulderR'
  | 'shoulderL'
  | 'upperArmR'
  | 'upperArmL'
  | 'lowerArmR'
  | 'lowerArmL'
  | 'hipR'
  | 'hipL'
  | 'upperLegR'
  | 'upperLegL'
  | 'lowerLegR'
  | 'lowerLegL'
  | 'neck'
  | 'upperBack'
  | 'lowerBack'
  | 'chest'
  | 'abdomen';

type Shape = { x: number; y: number; w: number; h: number; r: number };
const box = (x: number, y: number, w: number, h: number, r = 3): Shape => ({ x, y, w, h, r });

// Front view, patient's right on the viewer's left. The trunk is chest and abdomen in front, upper and lower back behind.
const LIMBS: [Region, Shape][] = [
  ['shoulderR', box(15, 21.5, 14, 6)],
  ['shoulderL', box(31, 21.5, 14, 6)],
  ['upperArmR', box(11.5, 28, 7, 17, 3.5)],
  ['upperArmL', box(41.5, 28, 7, 17, 3.5)],
  ['lowerArmR', box(9.5, 46, 7, 18, 3.5)],
  ['lowerArmL', box(43.5, 46, 7, 18, 3.5)],
  ['hipR', box(21, 52, 8.5, 8)],
  ['hipL', box(30.5, 52, 8.5, 8)],
  ['upperLegR', box(21, 61, 8.5, 25, 4)],
  ['upperLegL', box(30.5, 61, 8.5, 25, 4)],
  ['lowerLegR', box(21.5, 87, 7.5, 30, 3.5)],
  ['lowerLegL', box(31, 87, 7.5, 30, 3.5)],
];
const FRONT: [Region, Shape][] = [['neck', box(27, 16.5, 6, 4.5, 1.5)], ['chest', box(22, 28, 16, 11, 2)], ['abdomen', box(22, 40, 16, 11, 2)], ...LIMBS];
const BACK: [Region, Shape][] = [['upperBack', box(22, 28, 16, 11, 2)], ['lowerBack', box(22, 40, 16, 11, 2)]];

/** Sofie marks 13 of the 19 regions, in all five body zones. */
const SOFIE_REGIONS = new Set<Region>(['neck', 'shoulderL', 'shoulderR', 'upperArmL', 'upperArmR', 'lowerArmR', 'upperBack', 'lowerBack', 'hipL', 'hipR', 'upperLegL', 'upperLegR', 'lowerLegR']);

function Figure({ regions, selected, side, width }: { regions: [Region, Shape][]; selected: Set<Region>; side: 'front' | 'back'; width: number }) {
  const shapes = side === 'back' ? [...LIMBS.map(([, s]) => s)] : [];
  return (
    <svg width={width} height={(width * 124) / 60} viewBox="0 0 60 124" aria-hidden="true">
      <circle cx="30" cy="9" r="7" fill="#F4F5F8" stroke="#D5D9E0" strokeWidth="0.6" />
      {side === 'front' &&
        (['jawR', 'jawL'] as Region[]).map((id, i) => (
          <ellipse key={id} cx={i === 0 ? 27 : 33} cy="13.5" rx="2.6" ry="1.8" fill={selected.has(id) ? SOFIE : '#E1E4EA'} style={{ transition: 'fill 0.5s' }} />
        ))}
      {/* Behind: the limbs as silhouette only, so each region is counted once */}
      {shapes.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} fill="#F4F5F8" stroke="#E1E4EA" strokeWidth="0.5" />
      ))}
      {side === 'back' && <rect x="27" y="16.5" width="6" height="4.5" rx="1.5" fill="#F4F5F8" stroke="#E1E4EA" strokeWidth="0.5" />}
      {regions.map(([id, s]) => (
        <rect key={id} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r} fill={selected.has(id) ? SOFIE : '#E1E4EA'} stroke="#fff" strokeWidth="0.8" style={{ transition: 'fill 0.5s' }} />
      ))}
    </svg>
  );
}

function BodyMap({ selected, width = 44, labels }: { selected: Set<Region>; width?: number; labels?: [string, string] }) {
  return (
    <span className="inline-flex items-end gap-2">
      {(['front', 'back'] as const).map((side, i) => (
        <span key={side} className="flex flex-col items-center gap-1">
          <Figure regions={side === 'front' ? FRONT : BACK} selected={selected} side={side} width={width} />
          {labels && <span className="text-[9px] text-[#949CB1]">{labels[i]}</span>}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: chronic pain stays, inflammation goes elsewhere   */
/* ------------------------------------------------------------------ */

type Referral = 'chronic' | 'back' | 'rheuma' | 'bloods' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText:
      'Nieuwe hoofdpijn aan de slaap en pijn bij het kauwen, sinds drie weken stijf in schouders en heupen. Geen problemen met zien. Mogelijk reuscelarteritis. Secretariaat neemt vandaag contact op voor doorverwijzing.',
    referrals: { chronic: 'Chronische pijn', back: 'Rugrevalidatie', rheuma: 'Reumatologie', bloods: 'Eerst bloedname' },
    rows: [
      '72 jaar, sinds drie weken stijf in schouders en heupen, nieuwe hoofdpijn aan de slaap, pijn bij het kauwen',
      'Pijn overal sinds twee jaar, korte ochtendstijfheid, geen zwelling, bloedname en reumatoloog normaal',
      'Nachtelijke rugpijn die beter wordt door te bewegen, ochtendstijfheid langer dan een uur',
      'Vermoeidheid en spierpijn, kouwelijk, nog nooit een bloedname',
      'Chronische lage rugpijn, doorgestuurd door neurochirurgie, geen chirurgische indicatie',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText:
      'New headache at the temple and pain when chewing, stiff in the shoulders and hips for three weeks. No problems with vision. Possible giant cell arteritis. The secretariat is getting in touch today to refer.',
    referrals: { chronic: 'Chronic pain', back: 'Spinal rehabilitation', rheuma: 'Rheumatology', bloods: 'Blood test first' },
    rows: [
      '72, stiff in the shoulders and hips for three weeks, new headache at the temple, pain when chewing',
      'Pain everywhere for two years, short morning stiffness, no swelling, bloods and rheumatologist normal',
      'Back pain at night that improves with movement, morning stiffness longer than an hour',
      'Fatigue and muscle pain, feels the cold, never had a blood test',
      'Chronic low back pain, referred by neurosurgery, no surgical indication',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText:
      'Nouvelle céphalée temporale et douleur à la mastication, raideur des épaules et des hanches depuis trois semaines. Pas de troubles visuels. Possible artérite à cellules géantes. Le secrétariat prend contact aujourd’hui pour l’orienter.',
    referrals: { chronic: 'Douleur chronique', back: 'Revalidation du dos', rheuma: 'Rhumatologie', bloods: 'D’abord une prise de sang' },
    rows: [
      '72 ans, raideur des épaules et des hanches depuis trois semaines, nouvelle céphalée temporale, douleur à la mastication',
      'Douleurs partout depuis deux ans, raideur matinale courte, pas de gonflement, prise de sang et rhumatologue normaux',
      'Lombalgie nocturne qui s’améliore en bougeant, raideur matinale de plus d’une heure',
      'Fatigue et douleurs musculaires, frileuse, jamais de prise de sang',
      'Lombalgie chronique, adressé par la neurochirurgie, pas d’indication chirurgicale',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'G. Temporalis', initials: 'GT', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'S. Fascia', initials: 'SF', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'chronic' },
  { name: 'S. Iliaca', initials: 'SI', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'rheuma' },
  { name: 'T. Thyroidea', initials: 'TT', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'bloods' },
  { name: 'L. Lumbalis', initials: 'LL', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: 'back' },
];

const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = { chronic: STAYS, back: STAYS, rheuma: ELSEWHERE, bloods: ELSEWHERE };

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function PhysioTriageDemo() {
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
                      className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
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
            className="mt-3 md:ml-auto md:w-[420px] shadow-[0_24px_40px_-20px_rgba(42,58,81,0.5)] rounded-xl"
          >
            <AppCard tone="widget" icon="exclamation-triangle" title={c.attention}>
              <div className="flex items-start gap-3">
                <PatientAvatar initials="GT" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">G. Temporalis</span>
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
/* 2 · Agenda: a long first consultation, three patients elsewhere     */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    elsewhere: '3 patiënten elders geholpen',
    types: [
      'Nieuwe patiënt · chronische rugpijn',
      'Nieuwe patiënt · chronische wijdverspreide pijn',
      'Controle na infiltratie',
      'Nieuwe patiënt · chronische nekpijn',
      'Tussentijdse controle · revalidatieprogramma',
      'Sportrevalidatie · 4 maanden na kruisbandreconstructie',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    elsewhere: '3 patients helped elsewhere',
    types: [
      'New patient · chronic back pain',
      'New patient · chronic widespread pain',
      'Check-up after injection',
      'New patient · chronic neck pain',
      'Interim check-up · rehabilitation programme',
      'Sports rehabilitation · 4 months after ACL reconstruction',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    elsewhere: '3 patients aidés ailleurs',
    types: [
      'Nouveau patient · lombalgie chronique',
      'Nouvelle patiente · douleurs diffuses chroniques',
      'Contrôle après infiltration',
      'Nouveau patient · cervicalgie chronique',
      'Contrôle intermédiaire · programme de revalidation',
      'Revalidation sportive · 4 mois après reconstruction du LCA',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#9B7BC8', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; sofie?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'L. Lumbalis', initials: 'LL', type: 0 },
  { room: 1, start: 0, len: 3, name: 'S. Fascia', initials: 'SF', type: 1, sofie: true },
  { room: 2, start: 1, len: 1, name: 'B. Trochanter', initials: 'BT', type: 2 },
  { room: 0, start: 1, len: 1, name: 'K. Cervicalis', initials: 'KC', type: 3 },
  { room: 0, start: 2, len: 1, name: 'P. Phalanx', initials: 'PP', type: 4 },
  { room: 2, start: 3, len: 1, name: 'M. Quadriceps', initials: 'MQ', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.sofie ? SOFIE : ROOM_COLORS[visit.room];
  const background = visit.sofie ? SOFIE_SOFT : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.sofie && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.sofie && <PatientAvatar initials="SF" size={16} />}
        {visit.name}
      </p>
      <p className={visit.sofie ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.sofie && ready && (
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

export function PhysioAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Sofie's questionnaire tick and the patients helped elsewhere
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
      {/* G. Temporalis, S. Iliaca and T. Thyroidea are not in this agenda: triage already sent them on. */}
      <p className="mt-2.5 px-1 flex items-center gap-1.5 text-[11px] text-[#949CB1] min-h-[16px]">
        {step >= 7 && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5">
            <AppIcon name="arrow-fork-down" size={11} color={ELSEWHERE.text} />
            {c.elsewhere}
          </motion.span>
        )}
      </p>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Pre-consultation: two years of history, over several evenings   */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string): SummaryRow => ({ label, value });

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  evenings: [string, string];
  session1: { from: 'bot' | 'patient'; text: string; map?: boolean }[];
  rested: string[];
  marked: string;
  chapters: { label: string; state: 'done' | 'busy' | 'todo' }[];
  session2: { from: 'bot' | 'patient'; text: string }[];
  resume: string[];
  summary: string;
  copy: string;
  tabs: string[];
  summaries: SummarySection[][];
  chronology: { title: string; intro: string; items: [string, string, string][] };
  acr: {
    title: string;
    exampleData: string;
    views: [string, string];
    wpi: string;
    zones: string;
    rows: [string, string, string][];
    sss: string;
    status: string;
  };
  questions: { title: string; intro: string; items: string[] };
};

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    evenings: ['Avond 1', 'Avond 2'],
    session1: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: 'Al twee jaar pijn overal. Nek, schouders, rug, benen. En ik ben altijd moe.' },
      { from: 'bot', text: 'Duid op de figuur aan waar u de voorbije week pijn had.', map: true },
      { from: 'patient', text: '13 regio’s aangeduid', map: true },
      { from: 'bot', text: 'Wordt u uitgerust wakker?' },
    ],
    rested: ['Nooit', 'Soms', 'Meestal', 'Altijd'],
    marked: '13 van 19',
    chapters: [
      { label: 'Klacht en pijnkaart', state: 'done' },
      { label: 'Eerdere zorg', state: 'busy' },
      { label: 'Medicatie', state: 'todo' },
      { label: 'Slaap en stemming', state: 'todo' },
      { label: 'Werk en gezin', state: 'todo' },
    ],
    session2: [
      { from: 'bot', text: 'Welkom terug, Sofie. Gisteren stopten we bij uw eerdere behandelingen. Zullen we daar verdergaan?' },
      { from: 'patient', text: 'Ja' },
      { from: 'bot', text: 'U vertelde over de kinesitherapie. Heeft u daarna nog andere behandelingen of medicatie geprobeerd?' },
      { from: 'patient', text: 'Pregabaline, van de huisarts. Daar werd ik duizelig van.' },
      { from: 'bot', text: 'Dank u. Hoe lang heeft u dat genomen?' },
    ],
    resume: ['Ja', 'Later'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Chronische pijn', 'Rugrevalidatie', 'Sportrevalidatie'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [r('Aanleiding', 'Wijdverspreide pijn met vermoeidheid en niet-herstellende slaap. Vraag van de huisarts: diagnose en behandelplan.'), r('Duur', 'Twee jaar, geleidelijk erger')],
        },
        { title: 'Aard van de pijn', rows: [r('Pijn', 'Gemiddeld 7/10, ergste 9/10. Diep, zeurend, brandend in de schouders'), r('Pijnkaart', '13 van 19 regio’s, in 5 van 5 lichaamszones')] },
        {
          title: 'Wanneer heb je pijn',
          rows: [r('Erger bij', 'Lang zitten aan de computer, stress, koud en vochtig weer, een drukke week, slecht slapen'), r('Beter bij', 'Warm bad, rustig wandelen, een goede nacht')],
        },
        {
          title: 'Klachten',
          rows: [
            r('Slaap en vermoeidheid', 'Wordt 3 à 4 keer per nacht wakker, nooit uitgerust'),
            r('Concentratie', 'Vergeet dingen op het werk, moeite met lange teksten'),
            r('Ochtendstijfheid en zwelling', '15 minuten, geen gezwollen of warme gewrichten'),
          ],
        },
        { title: 'Criteria ACR 2016', rows: [r('WPI / SSS', '13/19 / 9/12, klachten langer dan 3 maanden. Diagnose door de arts')] },
        {
          title: 'Voorgeschiedenis van de klacht',
          rows: [
            r('Al onderzocht', 'Bloedname augustus 2026 (CRP, BSE, TSH, CK normaal), RX lumbaal 2025, reumatoloog 2025: geen inflammatoir lijden'),
            r('Al geprobeerd', '12 sessies kine (kort effect), ibuprofen (maagklachten), pregabaline (duizelig, gewichtstoename)'),
          ],
        },
        { title: 'Rode vlaggen', rows: [r('Koorts, gewichtsverlies, nachtzweten', 'Nee'), r('Andere meldingen', 'Wisselende tintelingen in handen en voeten, zonder krachtverlies')] },
        {
          title: 'Medische achtergrond',
          rows: [r('Voorgeschiedenis', 'Prikkelbare darm, keizersnede (2015)'), r('Allergieën / bloedverdunners', 'Nee / nee'), r('Familie', 'Moeder: trage schildklier')],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Nee / zelden')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Administratief bediende, 4/5 sinds zes maanden, 14 dagen afwezig in het laatste kwartaal'),
            r('Gezin, sport en hobby', 'Twee kinderen (8 en 11). Zwom twee keer per week, gestopt. Zingt in een koor'),
            r('Lengte / gewicht', '1,67 m / 72 kg'),
            r('Leeftijd', '41 jaar'),
            r('Verwijzing', 'Via dr. Verhaeghe, huisarts'),
          ],
        },
        { title: 'Baseline', rows: [r('FIQR / PSQI', '64/100 / 15/21 (hoger = ernstiger)')] },
        { title: 'Verwachting', rows: [r('In haar woorden', '"Dat iemand me eindelijk uitlegt wat ik heb, en wat ik zelf kan doen."')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Lage rugpijn zonder uitstraling sinds 14 maanden. Doorgestuurd door neurochirurgie: geen chirurgische indicatie')] },
        { title: 'Aard van de pijn', rows: [r('Rugpijn', '6/10')] },
        { title: 'Medische achtergrond', rows: [r('Eerdere behandeling', 'Kinesitherapie, 18 sessies, weinig effect')] },
        { title: 'Algemeen', rows: [r('Werk', 'Magazijnier, sinds 3 maanden arbeidsongeschikt'), r('Beroep / leeftijd', 'Magazijnier / 47 jaar')] },
        { title: 'Baseline', rows: [r('Oswestry', '42% (lager = beter)')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Revalidatie na voorste kruisbandreconstructie links, 4 maanden geleden')] },
        { title: 'Klachten', rows: [r('Instabiliteit', 'Nee'), r('Zwelling na inspanning', 'Licht, na lopen')] },
        { title: 'Algemeen', rows: [r('Sport / doel', 'Voetbal, provinciale reeks / terug naar wedstrijden'), r('Beroep / leeftijd', 'Student / 24 jaar')] },
      ],
    ],
    chronology: {
      title: 'Chronologie van eerdere zorg',
      intro: 'Twee jaar zorg, in de volgorde waarin het gebeurde.',
      items: [
        ['Voorjaar 2024', 'Huisarts', 'Start klachten nek en schouders. Ibuprofen, gestopt wegens maagklachten'],
        ['Najaar 2024', 'Kinesitherapeut, 12 sessies', 'Massage en oefeningen, kortdurend effect'],
        ['Voorjaar 2025', 'RX lumbale wervelzuil', 'Lichte discopathie L5-S1'],
        ['Zomer 2025', 'Huisarts', 'Pregabaline, na zes weken gestopt wegens duizeligheid en gewichtstoename'],
        ['Najaar 2025', 'Reumatoloog', 'Geen inflammatoir lijden. RF, anti-CCP en ANF negatief'],
        ['Voorjaar 2026', 'Werk', 'Van voltijds naar 4/5'],
        ['Augustus 2026', 'Bloedname via huisarts', 'CRP, BSE, bloedbeeld, TSH, CK, vitamine D normaal'],
        ['September 2026', 'Huisarts, dr. Verhaeghe', 'Verwijzing naar fysische geneeskunde'],
      ],
    },
    acr: {
      title: 'ACR 2016-criteria',
      exampleData: 'Voorbeelddata',
      views: ['Voor', 'Achter'],
      wpi: 'Pijnkaart (WPI)',
      zones: 'Regio’s',
      rows: [
        ['Vermoeidheid', 'Ernstig', '3'],
        ['Niet uitgerust wakker worden', 'Ernstig', '3'],
        ['Concentratie en geheugen', 'Licht', '1'],
        ['Hoofdpijn, buikkrampen, somberheid (laatste 6 maanden)', 'Ja, ja, nee', '2'],
        ['Duur', 'Twee jaar', '> 3 maanden'],
      ],
      sss: 'Symptom Severity Scale (SSS)',
      status: 'Voldoet aan de ACR 2016-criteria (WPI ≥ 7 en SSS ≥ 5, pijn in minstens 4 van 5 regio’s, minstens 3 maanden). De diagnose blijft bij de arts.',
    },
    questions: {
      title: 'Vragen van de patiënt',
      intro: 'Wat Sofie zelf wil bespreken, in haar woorden:',
      items: ['Is het iets ernstigs? Niemand vindt iets.', 'Mag ik nog sporten, of maak ik het erger?', 'Hoe lang hou ik dit nog vol op het werk?'],
    },
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    evenings: ['Evening 1', 'Evening 2'],
    session1: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'Pain everywhere for two years. Neck, shoulders, back, legs. And I’m always tired.' },
      { from: 'bot', text: 'Mark on the figure where you had pain in the past week.', map: true },
      { from: 'patient', text: '13 regions marked', map: true },
      { from: 'bot', text: 'Do you wake up feeling rested?' },
    ],
    rested: ['Never', 'Sometimes', 'Usually', 'Always'],
    marked: '13 of 19',
    chapters: [
      { label: 'Complaint and pain map', state: 'done' },
      { label: 'Previous care', state: 'busy' },
      { label: 'Medication', state: 'todo' },
      { label: 'Sleep and mood', state: 'todo' },
      { label: 'Work and family', state: 'todo' },
    ],
    session2: [
      { from: 'bot', text: 'Welcome back, Sofie. Yesterday we stopped at your previous treatments. Shall we carry on from there?' },
      { from: 'patient', text: 'Yes' },
      { from: 'bot', text: 'You told me about the physiotherapy. Did you try any other treatments or medication after that?' },
      { from: 'patient', text: 'Pregabalin, from my GP. It made me dizzy.' },
      { from: 'bot', text: 'Thank you. How long did you take it?' },
    ],
    resume: ['Yes', 'Later'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Chronic pain', 'Spinal rehabilitation', 'Sports rehabilitation'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [r('Cause', 'Widespread pain with fatigue and unrefreshing sleep. GP’s question: diagnosis and treatment plan.'), r('Duration', 'Two years, gradually worse')],
        },
        { title: 'Nature of the pain', rows: [r('Pain', 'Average 7/10, worst 9/10. Deep, aching, burning in the shoulders'), r('Pain map', '13 of 19 regions, in 5 of 5 body zones')] },
        {
          title: 'When does it hurt',
          rows: [r('Worse with', 'Sitting at the computer for long, stress, cold and damp weather, a busy week, poor sleep'), r('Better with', 'A warm bath, gentle walking, a good night')],
        },
        {
          title: 'Complaints',
          rows: [
            r('Sleep and fatigue', 'Wakes 3 to 4 times a night, never rested'),
            r('Concentration', 'Forgets things at work, difficulty with long texts'),
            r('Morning stiffness and swelling', '15 minutes, no swollen or warm joints'),
          ],
        },
        { title: 'ACR 2016 criteria', rows: [r('WPI / SSS', '13/19 / 9/12, symptoms for more than 3 months. Diagnosis by the doctor')] },
        {
          title: 'History of the complaint',
          rows: [
            r('Already investigated', 'Bloods August 2026 (CRP, ESR, TSH, CK normal), lumbar X-ray 2025, rheumatologist 2025: no inflammatory disease'),
            r('Already tried', '12 physiotherapy sessions (short effect), ibuprofen (stomach complaints), pregabalin (dizzy, weight gain)'),
          ],
        },
        { title: 'Red flags', rows: [r('Fever, weight loss, night sweats', 'No'), r('Other reports', 'Intermittent tingling in hands and feet, without weakness')] },
        {
          title: 'Medical history',
          rows: [r('Past history', 'Irritable bowel, caesarean section (2015)'), r('Allergies / anticoagulants', 'No / no'), r('Family history', 'Mother: underactive thyroid')],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'No / rarely')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Administrative clerk, 4 days a week for six months, 14 days absent in the last quarter'),
            r('Family, sport and hobbies', 'Two children (8 and 11). Swam twice a week, stopped. Sings in a choir'),
            r('Height / weight', '1.67 m / 72 kg'),
            r('Age', '41'),
            r('Referral', 'Via Dr Verhaeghe, GP'),
          ],
        },
        { title: 'Baseline', rows: [r('FIQR / PSQI', '64/100 / 15/21 (higher = more severe)')] },
        { title: 'Expectation', rows: [r('In her words', '"For someone to finally explain what I have, and what I can do myself."')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Low back pain without radiation for 14 months. Referred by neurosurgery: no surgical indication')] },
        { title: 'Nature of the pain', rows: [r('Back pain', '6/10')] },
        { title: 'Medical history', rows: [r('Previous treatment', 'Physiotherapy, 18 sessions, little effect')] },
        { title: 'General', rows: [r('Work', 'Warehouse worker, off sick for 3 months'), r('Occupation / age', 'Warehouse worker / 47')] },
        { title: 'Baseline', rows: [r('Oswestry', '42% (lower = better)')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Rehabilitation after left ACL reconstruction, 4 months ago')] },
        { title: 'Complaints', rows: [r('Instability', 'No'), r('Swelling after exercise', 'Slight, after running')] },
        { title: 'General', rows: [r('Sport / goal', 'Football, regional league / back to matches'), r('Occupation / age', 'Student / 24')] },
      ],
    ],
    chronology: {
      title: 'Chronology of previous care',
      intro: 'Two years of care, in the order it happened.',
      items: [
        ['Spring 2024', 'GP', 'Neck and shoulder complaints start. Ibuprofen, stopped due to stomach complaints'],
        ['Autumn 2024', 'Physiotherapist, 12 sessions', 'Massage and exercises, short-lived effect'],
        ['Spring 2025', 'Lumbar spine X-ray', 'Mild L5-S1 disc degeneration'],
        ['Summer 2025', 'GP', 'Pregabalin, stopped after six weeks due to dizziness and weight gain'],
        ['Autumn 2025', 'Rheumatologist', 'No inflammatory disease. RF, anti-CCP and ANA negative'],
        ['Spring 2026', 'Work', 'From full-time to 4 days a week'],
        ['August 2026', 'Bloods via the GP', 'CRP, ESR, blood count, TSH, CK, vitamin D normal'],
        ['September 2026', 'GP, Dr Verhaeghe', 'Referral to physical medicine'],
      ],
    },
    acr: {
      title: 'ACR 2016 criteria',
      exampleData: 'Example data',
      views: ['Front', 'Back'],
      wpi: 'Pain map (WPI)',
      zones: 'Regions',
      rows: [
        ['Fatigue', 'Severe', '3'],
        ['Waking unrefreshed', 'Severe', '3'],
        ['Concentration and memory', 'Mild', '1'],
        ['Headache, abdominal cramps, low mood (last 6 months)', 'Yes, yes, no', '2'],
        ['Duration', 'Two years', '> 3 months'],
      ],
      sss: 'Symptom Severity Scale (SSS)',
      status: 'Meets the ACR 2016 criteria (WPI ≥ 7 and SSS ≥ 5, pain in at least 4 of 5 regions, at least 3 months). The diagnosis stays with the doctor.',
    },
    questions: {
      title: 'Questions from the patient',
      intro: 'What Sofie wants to discuss, in her own words:',
      items: ['Is it something serious? Nobody finds anything.', 'Can I still exercise, or am I making it worse?', 'How much longer can I keep this up at work?'],
    },
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    evenings: ['Soir 1', 'Soir 2'],
    session1: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis deux ans, j’ai mal partout. Nuque, épaules, dos, jambes. Et je suis toujours fatiguée.' },
      { from: 'bot', text: 'Indiquez sur la figure où vous avez eu mal la semaine dernière.', map: true },
      { from: 'patient', text: '13 régions indiquées', map: true },
      { from: 'bot', text: 'Vous réveillez-vous reposée ?' },
    ],
    rested: ['Jamais', 'Parfois', 'Souvent', 'Toujours'],
    marked: '13 sur 19',
    chapters: [
      { label: 'Plainte et carte de la douleur', state: 'done' },
      { label: 'Soins antérieurs', state: 'busy' },
      { label: 'Médicaments', state: 'todo' },
      { label: 'Sommeil et humeur', state: 'todo' },
      { label: 'Travail et famille', state: 'todo' },
    ],
    session2: [
      { from: 'bot', text: 'Bon retour, Sofie. Hier, nous nous sommes arrêtées à vos traitements antérieurs. On reprend à partir de là ?' },
      { from: 'patient', text: 'Oui' },
      { from: 'bot', text: 'Vous m’avez parlé de la kinésithérapie. Avez-vous essayé d’autres traitements ou médicaments ensuite ?' },
      { from: 'patient', text: 'La prégabaline, du médecin traitant. Ça me donnait des vertiges.' },
      { from: 'bot', text: 'Merci. Pendant combien de temps l’avez-vous prise ?' },
    ],
    resume: ['Oui', 'Plus tard'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Douleur chronique', 'Revalidation du dos', 'Revalidation sportive'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Douleurs diffuses avec fatigue et sommeil non réparateur. Question du médecin traitant : diagnostic et plan de traitement.'),
            r('Durée', 'Deux ans, aggravation progressive'),
          ],
        },
        {
          title: 'Nature de la douleur',
          rows: [r('Douleur', 'En moyenne 7/10, au pire 9/10. Profonde, sourde, brûlante dans les épaules'), r('Carte de la douleur', '13 régions sur 19, dans 5 zones corporelles sur 5')],
        },
        {
          title: 'Quand avez-vous mal',
          rows: [
            r('Pire en cas de', 'Position assise prolongée à l’ordinateur, stress, temps froid et humide, semaine chargée, mauvais sommeil'),
            r('Mieux avec', 'Bain chaud, marche tranquille, une bonne nuit'),
          ],
        },
        {
          title: 'Plaintes',
          rows: [
            r('Sommeil et fatigue', 'Se réveille 3 à 4 fois par nuit, jamais reposée'),
            r('Concentration', 'Oublie des choses au travail, difficultés avec les longs textes'),
            r('Raideur matinale et gonflement', '15 minutes, pas d’articulations gonflées ni chaudes'),
          ],
        },
        { title: 'Critères ACR 2016', rows: [r('WPI / SSS', '13/19 / 9/12, plaintes depuis plus de 3 mois. Diagnostic par le médecin')] },
        {
          title: 'Historique de la plainte',
          rows: [
            r('Déjà examiné', 'Prise de sang août 2026 (CRP, VS, TSH, CK normaux), RX lombaire 2025, rhumatologue 2025 : pas d’affection inflammatoire'),
            r('Déjà essayé', '12 séances de kiné (effet bref), ibuprofène (troubles gastriques), prégabaline (vertiges, prise de poids)'),
          ],
        },
        {
          title: 'Signaux d’alerte',
          rows: [r('Fièvre, perte de poids, sueurs nocturnes', 'Non'), r('Autres signalements', 'Fourmillements variables dans les mains et les pieds, sans perte de force')],
        },
        {
          title: 'Antécédents médicaux',
          rows: [r('Antécédents', 'Côlon irritable, césarienne (2015)'), r('Allergies / anticoagulants', 'Non / non'), r('Antécédents familiaux', 'Mère : hypothyroïdie')],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'Non / rarement')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Employée administrative, à 4/5 depuis six mois, 14 jours d’absence au dernier trimestre'),
            r('Famille, sport et loisirs', 'Deux enfants (8 et 11 ans). Nageait deux fois par semaine, a arrêté. Chante dans une chorale'),
            r('Taille / poids', '1,67 m / 72 kg'),
            r('Âge', '41 ans'),
            r('Orientation', 'Par le Dr Verhaeghe, médecin traitant'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('FIQR / PSQI', '64/100 / 15/21 (plus haut = plus sévère)')] },
        { title: 'Attente', rows: [r('Dans ses mots', '« Que quelqu’un m’explique enfin ce que j’ai, et ce que je peux faire moi-même. »')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Lombalgie sans irradiation depuis 14 mois. Adressé par la neurochirurgie : pas d’indication chirurgicale')] },
        { title: 'Nature de la douleur', rows: [r('Lombalgie', '6/10')] },
        { title: 'Antécédents médicaux', rows: [r('Traitement antérieur', 'Kinésithérapie, 18 séances, peu d’effet')] },
        { title: 'Général', rows: [r('Travail', 'Magasinier, en incapacité de travail depuis 3 mois'), r('Profession / âge', 'Magasinier / 47 ans')] },
        { title: 'Mesure de référence', rows: [r('Oswestry', '42 % (plus bas = mieux)')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Revalidation après reconstruction du ligament croisé antérieur gauche, il y a 4 mois')] },
        { title: 'Plaintes', rows: [r('Instabilité', 'Non'), r('Gonflement après l’effort', 'Léger, après la course')] },
        { title: 'Général', rows: [r('Sport / objectif', 'Football, série provinciale / retour à la compétition'), r('Profession / âge', 'Étudiant / 24 ans')] },
      ],
    ],
    chronology: {
      title: 'Chronologie des soins antérieurs',
      intro: 'Deux ans de soins, dans l’ordre où ils ont eu lieu.',
      items: [
        ['Printemps 2024', 'Médecin traitant', 'Début des plaintes à la nuque et aux épaules. Ibuprofène, arrêté pour troubles gastriques'],
        ['Automne 2024', 'Kinésithérapeute, 12 séances', 'Massages et exercices, effet de courte durée'],
        ['Printemps 2025', 'RX du rachis lombaire', 'Discopathie légère L5-S1'],
        ['Été 2025', 'Médecin traitant', 'Prégabaline, arrêtée après six semaines pour vertiges et prise de poids'],
        ['Automne 2025', 'Rhumatologue', 'Pas d’affection inflammatoire. FR, anti-CCP et AAN négatifs'],
        ['Printemps 2026', 'Travail', 'Du temps plein à 4/5'],
        ['Août 2026', 'Prise de sang via le médecin traitant', 'CRP, VS, hémogramme, TSH, CK, vitamine D normaux'],
        ['Septembre 2026', 'Médecin traitant, Dr Verhaeghe', 'Orientation vers la médecine physique'],
      ],
    },
    acr: {
      title: 'Critères ACR 2016',
      exampleData: 'Données d’exemple',
      views: ['Face', 'Dos'],
      wpi: 'Carte de la douleur (WPI)',
      zones: 'Régions',
      rows: [
        ['Fatigue', 'Sévère', '3'],
        ['Réveil non reposé', 'Sévère', '3'],
        ['Concentration et mémoire', 'Légère', '1'],
        ['Céphalées, crampes abdominales, humeur dépressive (6 derniers mois)', 'Oui, oui, non', '2'],
        ['Durée', 'Deux ans', '> 3 mois'],
      ],
      sss: 'Symptom Severity Scale (SSS)',
      status: 'Répond aux critères ACR 2016 (WPI ≥ 7 et SSS ≥ 5, douleur dans au moins 4 régions sur 5, au moins 3 mois). Le diagnostic reste celui du médecin.',
    },
    questions: {
      title: 'Questions de la patiente',
      intro: 'Ce que Sofie veut aborder, dans ses propres mots :',
      items: ['Est-ce grave ? Personne ne trouve rien.', 'Puis-je encore faire du sport, ou est-ce que j’aggrave les choses ?', 'Combien de temps vais-je encore tenir au travail ?'],
    },
  },
};

/** The open sections fill in as the chat goes: the reason after the first answer, the pain map after the second. */
const FILL_AT = [2, 4];
const SESSION_1 = 5;

function IntakeChat({ c, step }: { c: IntakeCopy; step: number }) {
  return (
    <>
      {c.session1.slice(0, Math.min(step, SESSION_1)).map((msg, i) =>
        msg.from === 'bot' ? (
          <BotBubble key={i}>
            {msg.text}
            {msg.map && (
              <span className="mt-2 flex justify-center rounded-xl bg-white py-2">
                <BodyMap selected={new Set()} width={34} />
              </span>
            )}
          </BotBubble>
        ) : msg.map ? (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end rounded-2xl bg-[#06ACC1] p-1.5">
            <span className="flex justify-center rounded-xl bg-white px-3 py-2">
              <BodyMap selected={SOFIE_REGIONS} width={34} />
            </span>
            <span className="block px-1.5 pt-1 text-[11px] text-white">{msg.text}</span>
          </motion.div>
        ) : (
          <PatientBubble key={i}>{msg.text}</PatientBubble>
        ),
      )}
      {step === SESSION_1 && (
        // Four answers: tighter than the usual yes / no pair, so they fit the phone
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-1.5 pt-1">
          {c.rested.map((option) => (
            <span key={option} className="px-2.5 py-1.5 rounded-lg ring-1 ring-[#06ACC1] text-[#06ACC1] text-[11px] font-medium">
              {option}
            </span>
          ))}
        </motion.div>
      )}
    </>
  );
}

function ResumeChat({ c, step }: { c: IntakeCopy; step: number }) {
  return (
    <>
      {c.session2.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
      {step === 1 && <Choices options={c.resume} />}
    </>
  );
}

function Chapters({ chapters }: { chapters: IntakeCopy['chapters'] }) {
  return (
    <span className="flex flex-wrap gap-1">
      {chapters.map((ch) => (
        <span
          key={ch.label}
          className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
            ch.state === 'done' ? 'bg-[#E9FFF7] text-[#1F9E6E]' : ch.state === 'busy' ? 'bg-[#EBF6F8] text-[#0B759F] ring-1 ring-[#06ACC1]/40' : 'bg-[#F4F5F8] text-[#949CB1]'
          }`}
        >
          {ch.state === 'done' && <Check size={8} color="#1F9E6E" />}
          {ch.state === 'busy' && <span className="w-1.5 h-1.5 rounded-full bg-[#06ACC1] animate-pulse" />}
          {ch.label}
        </span>
      ))}
    </span>
  );
}

export function PhysioPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = SESSION_1 + c.session2.length;
  // 1–5 the first evening (with the pain map), 6–10 she picks up the next evening where she left off
  const step = useSteps(total, 900, 400);
  const [manualEvening, setManualEvening] = useState<number | null>(null);
  const evening = manualEvening ?? (step > SESSION_1 ? 1 : 0);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? i < 2;
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));
  const mapped = step >= 4;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
        <div className="flex flex-col items-center gap-3">
          {/* She fills it in over several evenings; the second evening picks up where she stopped */}
          <span className="inline-flex rounded-full bg-[#F4F5F8] p-0.5 text-[11px]" role="tablist">
            {c.evenings.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={evening === i}
                onClick={() => setManualEvening(i)}
                className={`px-3 py-1 rounded-full transition-colors ${evening === i ? 'bg-white text-[#2A3A51] font-medium shadow-sm' : 'text-[#949CB1] hover:text-[#2A3A51]'}`}
              >
                {label}
              </button>
            ))}
          </span>
          <Phone
            intro={c.intro}
            placeholder={c.placeholder}
            header={evening === 0 ? <ProgressBar label={c.progress} fill={8 + Math.min(step, SESSION_1) * 4} /> : <Chapters chapters={c.chapters} />}
          >
            <AnimatePresence mode="wait">
              <motion.div key={evening} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col justify-end gap-2.5 shrink-0">
                {evening === 0 ? <IntakeChat c={c} step={manualEvening === 0 ? SESSION_1 : step} /> : <ResumeChat c={c} step={Math.max(0, step - SESSION_1)} />}
              </motion.div>
            </AnimatePresence>
          </Phone>
        </div>

        <AppCard icon="chat" title={c.summary} action={<AppButton variant="subtle" icon="copy">{c.copy}</AppButton>} bodyClassName="px-4 pb-2">
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
                {i === 0 && <PatientAvatar initials="SF" size={18} />}
                {label}
              </button>
            ))}
          </div>
          {sections.map((section, i) => {
            const expanded = isOpen(i);
            const known = tab !== 0 || i >= FILL_AT.length || step >= FILL_AT[i];
            return (
              <div key={`${tab}-${section.title}`} className="py-2.5 border-b border-[#E8EAEC] last:border-0">
                <button type="button" onClick={() => toggle(i)} aria-expanded={expanded} className="w-full flex items-center gap-1.5 text-[13px] text-[#06ACC1] text-left">
                  <span className={`text-[9px] transition-transform ${expanded ? '' : '-rotate-90'}`} aria-hidden="true">
                    ▼
                  </span>
                  {section.title}
                  {!expanded && <span className="text-[#949CB1]">· {section.rows.length}</span>}
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
                          <p key={row.label} className="text-[12.5px] leading-relaxed pl-4">
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

      {/* What the doctor would otherwise reconstruct at the start of the consultation */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_0.85fr] gap-4 items-start">
        <AppCard icon="history" title={c.chronology.title} bodyClassName="px-4 py-3">
          <p className="text-[11px] text-[#949CB1] mb-3">{c.chronology.intro}</p>
          <ol className="relative">
            {c.chronology.items.map(([when, who, what], i) => (
              <li key={when + who} className="relative pl-5 pb-3 last:pb-0">
                {i < c.chronology.items.length - 1 && <span className="absolute left-[4.5px] top-3 bottom-0 w-px bg-[#E8EAEC]" />}
                <span className={`absolute left-0 top-[5px] w-2.5 h-2.5 rounded-full ring-2 ring-white ${i === c.chronology.items.length - 1 ? 'bg-[#06ACC1]' : 'bg-[#B9C0CC]'}`} />
                <span className="block text-[10.5px] font-semibold text-[#0B759F] tabular-nums">{when}</span>
                <span className="block text-[11.5px] font-medium leading-snug">{who}</span>
                <span className="block text-[11px] text-[#4E5670] leading-snug">{what}</span>
              </li>
            ))}
          </ol>
        </AppCard>

        <AppCard icon="clipboard-notes" title={c.acr.title} action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.acr.exampleData}</span>} bodyClassName="px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <BodyMap selected={mapped ? SOFIE_REGIONS : new Set()} width={58} labels={c.acr.views} />
            <div className="flex-1 flex flex-col gap-2 text-[11.5px]">
              <p className="flex items-baseline justify-between gap-2 border-b border-[#E8EAEC] pb-1.5">
                <span>{c.acr.wpi}</span>
                <b className="tabular-nums text-[13px]">{mapped ? '13/19' : '…'}</b>
              </p>
              <p className="flex items-baseline justify-between gap-2 border-b border-[#E8EAEC] pb-1.5">
                <span>{c.acr.zones}</span>
                <b className="tabular-nums text-[13px]">{mapped ? '5/5' : '…'}</b>
              </p>
              <p className="flex items-baseline justify-between gap-2">
                <span>{c.acr.sss}</span>
                <b className="tabular-nums text-[13px]">9/12</b>
              </p>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-[#E8EAEC] border-y border-[#E8EAEC]">
            {c.acr.rows.map(([part, answer, score]) => (
              <p key={part} className="grid grid-cols-[1fr_auto] gap-x-3 py-1.5 text-[11px]">
                <span>
                  <span className="block leading-snug">{part}</span>
                  <span className="block text-[#949CB1]">{answer}</span>
                </span>
                <span className="font-semibold tabular-nums self-center">{score}</span>
              </p>
            ))}
          </div>
          <p className="flex items-start gap-2 rounded-lg bg-[#E9FFF7] px-2.5 py-2 text-[11px] leading-snug text-[#1F6E4F]">
            <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#37C18D] flex items-center justify-center shrink-0">
              <Check size={8} color="#fff" />
            </span>
            {c.acr.status}
          </p>
        </AppCard>

        <AppCard icon="message-user" title={c.questions.title} bodyClassName="px-4 py-3 flex flex-col gap-2.5">
          <p className="text-[11px] text-[#949CB1]">{c.questions.intro}</p>
          {c.questions.items.map((q) => (
            <blockquote key={q} className="relative rounded-xl bg-[#F4F5F8] pl-7 pr-3 py-2.5 text-[12px] leading-snug">
              <span className="absolute left-2.5 top-1 font-display text-[22px] leading-none text-[#4F5BD5]/60" aria-hidden="true">
                “
              </span>
              {q}
            </blockquote>
          ))}
          <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[#949CB1]">
            <PatientAvatar initials="SF" size={14} />
            Sofie Fascia
          </span>
        </AppCard>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Voice Reception: she calls, she is booked, nobody had to step in */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts denkt dat ik fibromyalgie heb. Kan ik een afspraak krijgen bij fysische geneeskunde?' },
      { from: 'bot', text: 'Vervelend om te horen. Hoe lang bent u ’s ochtends stijf, en worden uw gewrichten soms dik of warm?' },
      { from: 'patient', text: 'Een kwartiertje. Dik worden ze niet.' },
      { from: 'bot', text: 'Werd er al een bloedname gedaan of bent u al bij een reumatoloog geweest?' },
      { from: 'patient', text: 'Allebei. Alles was normaal.' },
      {
        from: 'bot',
        text: 'Dank u. Ik plan u in voor een eerste consult bij de arts voor chronische pijn en stuur u een vragenlijst om uw bezoek voor te bereiden. U mag die in meerdere keren invullen.',
      },
    ],
    tasks: 'Taken',
    task: 'Eerste consult ingepland bij de arts voor chronische pijn: wijdverspreide pijn, bloedname en reumatoloog normaal, geen rode vlaggen',
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
      { from: 'patient', text: 'Hello, my GP thinks I have fibromyalgia. Can I get an appointment with physical medicine?' },
      { from: 'bot', text: 'I’m sorry to hear that. How long are you stiff in the morning, and do your joints ever become swollen or warm?' },
      { from: 'patient', text: 'About a quarter of an hour. They don’t swell.' },
      { from: 'bot', text: 'Have you already had a blood test or seen a rheumatologist?' },
      { from: 'patient', text: 'Both. Everything was normal.' },
      {
        from: 'bot',
        text: 'Thank you. I’ll book you a first consultation with the chronic pain doctor and send you a questionnaire to prepare for your visit. You can fill it in over several sittings.',
      },
    ],
    tasks: 'Tasks',
    task: 'First consultation booked with the chronic pain doctor: widespread pain, bloods and rheumatologist normal, no red flags',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant pense que j’ai une fibromyalgie. Puis-je avoir un rendez-vous en médecine physique ?' },
      { from: 'bot', text: 'Je suis désolé de l’entendre. Combien de temps êtes-vous raide le matin, et vos articulations deviennent-elles parfois gonflées ou chaudes ?' },
      { from: 'patient', text: 'Un petit quart d’heure. Elles ne gonflent pas.' },
      { from: 'bot', text: 'Avez-vous déjà fait une prise de sang ou consulté un rhumatologue ?' },
      { from: 'patient', text: 'Les deux. Tout était normal.' },
      {
        from: 'bot',
        text: 'Merci. Je vous inscris pour une première consultation chez le médecin de la douleur chronique et je vous envoie un questionnaire pour préparer votre visite. Vous pouvez le remplir en plusieurs fois.',
      },
    ],
    tasks: 'Tâches',
    task: 'Première consultation planifiée chez le médecin de la douleur chronique : douleurs diffuses, prise de sang et rhumatologue normaux, aucun signal d’alerte',
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

export function PhysioVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 87 12</span>
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
                <PatientAvatar initials="SF" size={18} />
                S. Fascia
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
/* 5 · Scribe: a conversation, not a dictation                         */
/* ------------------------------------------------------------------ */

type NoteSection = { title: string; text?: string; rows?: [string, string][]; clamp: boolean };

const SCRIBE: Record<
  SiteLocale,
  {
    back: string;
    consultation: string;
    template: string;
    templates: string[];
    autoDetect: string;
    stop: string;
    start: string;
    showTranscript: string;
    microphone: string;
    generating: string;
    generatedWith: string;
    copy: string;
    more: string;
    less: string;
    doctor: string;
    patient: string;
    lines: { who: 'doctor' | 'patient'; text: string }[];
    sections: NoteSection[];
    patientCard: [string, string][];
  }
> = {
  nl: {
    back: 'Terug',
    consultation: 'Consultatie',
    template: 'Fysische geneeskunde',
    templates: ['Chronische pijn', 'Rugrevalidatie', 'Sportrevalidatie', 'Neurologische revalidatie'],
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
      { who: 'doctor', text: 'Ik heb uw vragenlijst gelezen. U heeft al heel wat geprobeerd. Wat is op dit moment het zwaarste?' },
      { who: 'patient', text: 'De moeheid. ’s Avonds heb ik niets meer over voor de kinderen.' },
      { who: 'doctor', text: 'Ik druk even op een paar plaatsen. Zeg maar wat u voelt.' },
      { who: 'patient', text: 'Daar ook. Eigenlijk overal waar u drukt.' },
      { who: 'doctor', text: 'Uw gewrichten zijn niet gezwollen en uw kracht is goed. Er is geen schade. Uw zenuwstelsel staat als het ware te gevoelig afgesteld.' },
      { who: 'patient', text: 'Dus het zit niet tussen mijn oren? En mag ik nog sporten?' },
      { who: 'doctor', text: 'De pijn is echt. Bewegen maakt het niet erger, maar we bouwen het rustig op. Daarom stel ik een programma van twaalf weken voor.' },
      { who: 'patient', text: 'En de tramadol?' },
      { who: 'doctor', text: 'Die bouwen we af over twee weken. Ik schrijf het schema voor u uit.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Wijdverspreide pijn sinds twee jaar in nek, schouders, armen, onderrug, heupen en bovenbenen, gemiddeld 7/10. Niet-herstellende slaap, vermoeidheid, concentratieklachten. Ochtendstijfheid 15 minuten, geen gezwollen gewrichten, geen inflammatoire rugpijn. Eerder 12 sessies kine met kort effect, ibuprofen gestopt (maagklachten), pregabaline gestopt (duizelig, gewichtstoename). Tramadol ± 4 dagen per week, zolpidem indien nodig. Werkt 4/5 met recente afwezigheden. Geen bloedverdunners.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Vermoeide indruk, goed contact. Diffuse drukpijn over nek-, schoudergordel-, gluteale en paravertebrale spieren, gegeneraliseerde hyperalgesie. Geen synovitis. Normale gewrichtsmobiliteit, soepele wervelzuil. Kracht normaal, ook proximaal. Reflexen symmetrisch, sensibiliteit intact. Geen hypermobiliteit (Beighton 2/9). Geen struma. Geen huidafwijkingen, geen psoriasis.',
        clamp: true,
      },
      {
        title: 'Aanvullende onderzoeken',
        text: 'Labo augustus 2026: CRP, BSE, bloedbeeld, TSH, CK, vitamine D normaal. RX lumbaal 2025: lichte discopathie L5-S1, niet verklarend. Reumatologisch advies 2025: geen inflammatoir lijden, RF, anti-CCP en ANF negatief. WPI 13/19, SSS 9/12, FIQR 64, PSQI 15.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Fibromyalgie (ACR 2016), met niet-herstellende slaap en deconditionering.', clamp: false },
      {
        title: 'Beleid',
        text: 'Uitleg over fibromyalgie en nociplastische pijn. Multidisciplinair revalidatieprogramma van 12 weken: oefentherapie met graduele opbouw, aquatherapie, ergotherapie, psycholoog. Kinesitherapie Fb-lijst. Redomex 10 mg behouden, bij onvoldoende effect op de slaap optrekken naar 25 mg. Tramadol afbouwen over twee weken: beperkt effect, en in combinatie met amitriptyline risico op serotonerge bijwerkingen. Zolpidem afbouwen met slaaphygiëne. Bij onvoldoende effect op de pijn: duloxetine overwegen. Werk 4/5 behouden. Opvolging week 2, week 6, maand 3, 6 en 12 met FIQR en PSQI. Vangnet: contact bij gezwollen gewrichten, koorts, gewichtsverlies, toenemend krachtverlies of als het psychisch niet meer gaat.',
        clamp: false,
      },
      {
        title: 'Besproken met de patiënt',
        rows: [
          ['Uitleg gegeven', 'Fibromyalgie als nociplastische pijn: de pijn is echt, er is geen schade aan gewrichten of spieren. Bewegen is veilig, graduele opbouw.'],
          [
            'Vragen van de patiënt',
            '"Is het iets ernstigs?" Nee, geen schade, wel een echte aandoening. "Mag ik nog sporten?" Ja, rustig opbouwen, zwemmen is een goede keuze. "Hoe lang hou ik het vol op het werk?" 4/5 behouden, ergotherapeut bekijkt de werkplek.',
          ],
          ['Afspraken', 'Start revalidatieprogramma binnen drie weken. Tramadol afbouwen over twee weken volgens schema. Stilnoct afbouwen, slaaphygiëne. Redomex blijft, eventueel optrekken naar 25 mg.'],
          ['Doel in haar woorden', '"Terug twee keer per week zwemmen, en ’s avonds energie hebben voor de kinderen."'],
          ['Volgende contacten', 'Vragenlijst na twee weken (afbouw), na zes weken en na drie maanden'],
        ],
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '14-03-1985'],
      ['Vragenlijst', 'Chronische pijn en fibromyalgie'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Physical medicine',
    templates: ['Chronic pain', 'Spinal rehabilitation', 'Sports rehabilitation', 'Neurological rehabilitation'],
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
      { who: 'doctor', text: 'I’ve read your questionnaire. You’ve already tried quite a lot. What is the hardest thing right now?' },
      { who: 'patient', text: 'The tiredness. In the evening I have nothing left for the children.' },
      { who: 'doctor', text: 'I’m going to press on a few places. Tell me what you feel.' },
      { who: 'patient', text: 'There too. Actually everywhere you press.' },
      { who: 'doctor', text: 'Your joints aren’t swollen and your strength is good. There’s no damage. Your nervous system is, as it were, set too sensitively.' },
      { who: 'patient', text: 'So it’s not all in my head? And can I still exercise?' },
      { who: 'doctor', text: 'The pain is real. Moving won’t make it worse, but we’ll build it up gently. That’s why I’m proposing a twelve-week programme.' },
      { who: 'patient', text: 'And the tramadol?' },
      { who: 'doctor', text: 'We’ll taper it over two weeks. I’ll write out the schedule for you.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Widespread pain for two years in the neck, shoulders, arms, lower back, hips and thighs, average 7/10. Unrefreshing sleep, fatigue, difficulty concentrating. Morning stiffness 15 minutes, no swollen joints, no inflammatory back pain. Previously 12 physiotherapy sessions with short effect, ibuprofen stopped (stomach complaints), pregabalin stopped (dizziness, weight gain). Tramadol about 4 days a week, zolpidem as needed. Works 4 days a week with recent absences. No anticoagulants.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Tired appearance, good rapport. Diffuse tenderness over the neck, shoulder girdle, gluteal and paravertebral muscles, generalised hyperalgesia. No synovitis. Normal joint mobility, supple spine. Strength normal, including proximally. Reflexes symmetrical, sensation intact. No hypermobility (Beighton 2/9). No goitre. No skin abnormalities, no psoriasis.',
        clamp: true,
      },
      {
        title: 'Further investigations',
        text: 'Bloods August 2026: CRP, ESR, blood count, TSH, CK, vitamin D normal. Lumbar X-ray 2025: mild L5-S1 disc degeneration, not explanatory. Rheumatology opinion 2025: no inflammatory disease, RF, anti-CCP and ANA negative. WPI 13/19, SSS 9/12, FIQR 64, PSQI 15.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Fibromyalgia (ACR 2016), with unrefreshing sleep and deconditioning.', clamp: false },
      {
        title: 'Plan',
        text: 'Explanation of fibromyalgia and nociplastic pain. Twelve-week multidisciplinary rehabilitation programme: graded exercise therapy, aquatherapy, occupational therapy, psychologist. Physiotherapy under the Fb list. Continue Redomex 10 mg, increase to 25 mg if insufficient effect on sleep. Taper tramadol over two weeks: limited effect, and risk of serotonergic side effects in combination with amitriptyline. Taper zolpidem with sleep hygiene. If insufficient effect on pain: consider duloxetine. Keep working 4 days a week. Follow-up at week 2, week 6, and months 3, 6 and 12 with FIQR and PSQI. Safety net: contact for swollen joints, fever, weight loss, increasing weakness or if she can no longer cope mentally.',
        clamp: false,
      },
      {
        title: 'Discussed with the patient',
        rows: [
          ['Explanation given', 'Fibromyalgia as nociplastic pain: the pain is real, there is no damage to joints or muscles. Movement is safe, build up gradually.'],
          [
            'Patient’s questions',
            '"Is it something serious?" No, no damage, but a real condition. "Can I still exercise?" Yes, build up gently, swimming is a good choice. "How long can I keep going at work?" Keep 4 days a week, the occupational therapist will look at the workplace.',
          ],
          ['Agreements', 'Start the rehabilitation programme within three weeks. Taper tramadol over two weeks according to the schedule. Taper Stilnoct, sleep hygiene. Redomex stays, possibly increased to 25 mg.'],
          ['Goal in her words', '"Back to swimming twice a week, and having energy for the children in the evening."'],
          ['Next contacts', 'Questionnaire after two weeks (tapering), after six weeks and after three months'],
        ],
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '14-03-1985'],
      ['Questionnaire', 'Chronic pain and fibromyalgia'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Médecine physique',
    templates: ['Douleur chronique', 'Revalidation du dos', 'Revalidation sportive', 'Revalidation neurologique'],
    autoDetect: 'Détection automatique',
    stop: 'Arrêter l’enregistrement',
    start: 'Démarrer l’enregistrement',
    showTranscript: 'Afficher la transcription',
    microphone: 'Microphone MacBook Pro',
    generating: 'Génération en cours',
    generatedWith: 'Généré avec le modèle',
    copy: 'Copier le résumé',
    more: 'Afficher la note complète',
    less: 'Afficher moins',
    doctor: 'Médecin',
    patient: 'Patiente',
    lines: [
      { who: 'doctor', text: 'J’ai lu votre questionnaire. Vous avez déjà essayé beaucoup de choses. Qu’est-ce qui est le plus pénible en ce moment ?' },
      { who: 'patient', text: 'La fatigue. Le soir, je n’ai plus rien pour les enfants.' },
      { who: 'doctor', text: 'Je vais appuyer à quelques endroits. Dites-moi ce que vous ressentez.' },
      { who: 'patient', text: 'Là aussi. En fait, partout où vous appuyez.' },
      { who: 'doctor', text: 'Vos articulations ne sont pas gonflées et votre force est bonne. Il n’y a pas de lésion. Votre système nerveux est en quelque sorte réglé trop sensible.' },
      { who: 'patient', text: 'Donc ce n’est pas dans ma tête ? Et je peux encore faire du sport ?' },
      { who: 'doctor', text: 'La douleur est réelle. Bouger ne l’aggrave pas, mais on va progresser doucement. C’est pourquoi je vous propose un programme de douze semaines.' },
      { who: 'patient', text: 'Et le tramadol ?' },
      { who: 'doctor', text: 'On le diminue sur deux semaines. Je vous écris le schéma.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Douleurs diffuses depuis deux ans à la nuque, aux épaules, aux bras, au bas du dos, aux hanches et aux cuisses, en moyenne 7/10. Sommeil non réparateur, fatigue, troubles de la concentration. Raideur matinale 15 minutes, pas d’articulations gonflées, pas de lombalgie inflammatoire. Auparavant 12 séances de kiné avec effet bref, ibuprofène arrêté (troubles gastriques), prégabaline arrêtée (vertiges, prise de poids). Tramadol ± 4 jours par semaine, zolpidem si nécessaire. Travaille à 4/5 avec des absences récentes. Pas d’anticoagulants.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Aspect fatigué, bon contact. Sensibilité diffuse à la pression des muscles de la nuque, de la ceinture scapulaire, fessiers et paravertébraux, hyperalgésie généralisée. Pas de synovite. Mobilité articulaire normale, rachis souple. Force normale, y compris proximale. Réflexes symétriques, sensibilité intacte. Pas d’hypermobilité (Beighton 2/9). Pas de goitre. Pas d’anomalies cutanées, pas de psoriasis.',
        clamp: true,
      },
      {
        title: 'Examens complémentaires',
        text: 'Biologie août 2026 : CRP, VS, hémogramme, TSH, CK, vitamine D normaux. RX lombaire 2025 : discopathie légère L5-S1, non explicative. Avis rhumatologique 2025 : pas d’affection inflammatoire, FR, anti-CCP et AAN négatifs. WPI 13/19, SSS 9/12, FIQR 64, PSQI 15.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Fibromyalgie (ACR 2016), avec sommeil non réparateur et déconditionnement.', clamp: false },
      {
        title: 'Plan',
        text: 'Explication de la fibromyalgie et de la douleur nociplastique. Programme de revalidation multidisciplinaire de 12 semaines : thérapie par l’exercice progressive, aquathérapie, ergothérapie, psychologue. Kinésithérapie liste Fb. Maintien du Redomex 10 mg, à augmenter à 25 mg si effet insuffisant sur le sommeil. Sevrage du tramadol sur deux semaines : effet limité, et risque d’effets sérotoninergiques en association avec l’amitriptyline. Sevrage du zolpidem avec hygiène du sommeil. Si effet insuffisant sur la douleur : envisager la duloxétine. Maintien du travail à 4/5. Suivi à la semaine 2, la semaine 6, aux mois 3, 6 et 12 avec FIQR et PSQI. Filet de sécurité : contact en cas d’articulations gonflées, de fièvre, de perte de poids, de perte de force croissante ou si elle ne tient plus psychologiquement.',
        clamp: false,
      },
      {
        title: 'Discuté avec la patiente',
        rows: [
          ['Explication donnée', 'La fibromyalgie comme douleur nociplastique : la douleur est réelle, il n’y a pas de lésion des articulations ni des muscles. Bouger est sans danger, progression graduelle.'],
          [
            'Questions de la patiente',
            '« Est-ce grave ? » Non, pas de lésion, mais une vraie affection. « Puis-je encore faire du sport ? » Oui, en progressant doucement, la natation est un bon choix. « Combien de temps vais-je tenir au travail ? » Maintenir le 4/5, l’ergothérapeute examine le poste de travail.',
          ],
          ['Accords', 'Début du programme de revalidation dans les trois semaines. Sevrage du tramadol sur deux semaines selon le schéma. Sevrage du Stilnoct, hygiène du sommeil. Le Redomex est maintenu, éventuellement augmenté à 25 mg.'],
          ['Objectif dans ses mots', '« Reprendre la natation deux fois par semaine, et avoir de l’énergie pour les enfants le soir. »'],
          ['Prochains contacts', 'Questionnaire après deux semaines (sevrage), après six semaines et après trois mois'],
        ],
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '14-03-1985'],
      ['Questionnaire', 'Douleur chronique et fibromyalgie'],
      ['Langue', 'Français'],
    ],
  },
};

export function PhysioScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–9 transcript lines while recording (question, explanation, counter-question), 10 generating, 11 note ready
  const step = useSteps(lines + 2, 850, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<SofieTitle back={c.back} />}>
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
            {recording ? (
              <motion.div key="transcript" exit={{ opacity: 0 }} className="rounded-lg bg-[#F9FAFB] border border-[#E8EAEC] p-3 flex flex-col gap-2.5 min-h-[190px]">
                {c.lines.slice(0, step).map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="text-[12px] leading-snug">
                    <span className={`font-semibold ${line.who === 'doctor' ? 'text-[#06ACC1]' : 'text-[#0B759F]'}`}>{line.who === 'doctor' ? c.doctor : c.patient}: </span>
                    {line.text}
                  </motion.p>
                ))}
              </motion.div>
            ) : step === lines + 1 ? (
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
                {/* Diagnosis, plan and what was discussed in full first; the rest shortened until "Show full note" */}
                {[...c.sections.filter((s) => !s.clamp), ...c.sections.filter((s) => s.clamp)].map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{section.title}</p>
                    {section.rows ? (
                      <dl className="mt-1 rounded-lg bg-[#F9FAFB] border border-[#E8EAEC] px-3 py-1 divide-y divide-[#E8EAEC]">
                        {section.rows.map(([label, text]) => (
                          <div key={label} className="grid grid-cols-1 sm:grid-cols-[9.5rem_1fr] gap-x-3 py-1.5 text-[12px] leading-relaxed">
                            <dt className="font-semibold">{label}</dt>
                            <dd>{text}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <p className={`text-[12.5px] leading-relaxed ${section.clamp && !full ? 'line-clamp-1 text-[#4E5670]' : ''}`}>{section.text}</p>
                    )}
                  </motion.div>
                ))}
                <button type="button" onClick={() => setFull((f) => !f)} className="self-start px-1 text-[12px] font-medium text-[#06ACC1] hover:underline">
                  {full ? c.less : c.more}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title="Sofie Fascia" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: her photo, the opioid and what she forgot          */
/* ------------------------------------------------------------------ */

const MEDICATION = medicationCopy({
  nl: {
    found: 'Dank u, ik herken 5 geneesmiddelen:',
    confirm: 'Ja. De Stilnoct en de D-Cure was ik vergeten.',
    meds: [
      { name: 'Redomex', strength: '10 mg', substance: 'Amitriptyline', frequency: '1× per dag, ’s avonds', indication: 'Pijn en slaap' },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracetamol', frequency: 'Bij pijn, max. 3× per dag', indication: 'Pijn' },
      { name: 'Tramadol EG', strength: '50 mg', substance: 'Tramadol', frequency: 'Bij hevige pijn, max. 2× per dag', indication: 'Pijn', tag: { label: 'Opioïd', tone: 'blue' } },
      { name: 'Stilnoct', strength: '10 mg', substance: 'Zolpidem', frequency: '’s Avonds indien nodig', indication: 'Slaap', tag: { label: 'Zelf vergeten', tone: 'amber' } },
      { name: 'D-Cure', strength: '25.000 IE', substance: 'Colecalciferol', frequency: '1× per maand', indication: 'Vitamine D', tag: { label: 'Zelf vergeten', tone: 'amber' } },
    ],
  },
  en: {
    found: 'Thank you, I recognise 5 medicines:',
    confirm: 'Yes. I’d forgotten the Stilnoct and the D-Cure.',
    meds: [
      { name: 'Redomex', strength: '10 mg', substance: 'Amitriptyline', frequency: 'Once a day, in the evening', indication: 'Pain and sleep' },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracetamol', frequency: 'For pain, max. 3× a day', indication: 'Pain' },
      { name: 'Tramadol EG', strength: '50 mg', substance: 'Tramadol', frequency: 'For severe pain, max. twice a day', indication: 'Pain', tag: { label: 'Opioid', tone: 'blue' } },
      { name: 'Stilnoct', strength: '10 mg', substance: 'Zolpidem', frequency: 'In the evening as needed', indication: 'Sleep', tag: { label: 'Forgotten', tone: 'amber' } },
      { name: 'D-Cure', strength: '25,000 IU', substance: 'Colecalciferol', frequency: 'Once a month', indication: 'Vitamin D', tag: { label: 'Forgotten', tone: 'amber' } },
    ],
  },
  fr: {
    found: 'Merci, je reconnais 5 médicaments :',
    confirm: 'Oui. J’avais oublié le Stilnoct et le D-Cure.',
    meds: [
      { name: 'Redomex', strength: '10 mg', substance: 'Amitriptyline', frequency: '1× par jour, le soir', indication: 'Douleur et sommeil' },
      { name: 'Dafalgan Forte', strength: '1 g', substance: 'Paracétamol', frequency: 'En cas de douleur, max. 3× par jour', indication: 'Douleur' },
      { name: 'Tramadol EG', strength: '50 mg', substance: 'Tramadol', frequency: 'En cas de forte douleur, max. 2× par jour', indication: 'Douleur', tag: { label: 'Opioïde', tone: 'blue' } },
      { name: 'Stilnoct', strength: '10 mg', substance: 'Zolpidem', frequency: 'Le soir si nécessaire', indication: 'Sommeil', tag: { label: 'Oublié', tone: 'amber' } },
      { name: 'D-Cure', strength: '25.000 UI', substance: 'Colécalciférol', frequency: '1× par mois', indication: 'Vitamine D', tag: { label: 'Oublié', tone: 'amber' } },
    ],
  },
});

export function PhysioMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Sofie Fascia', initials: 'SF', dob: '14-03-1985', color: SOFIE }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, programme referral, physio, tapering         */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Fysische geneeskunde, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Verwijzing revalidatieprogramma', description: 'Multidisciplinair programma van 12 weken, met de scores van de intake' },
      { label: 'Voorschrift kinesitherapie', description: 'Oefentherapie met graduele opbouw, Fb-lijst' },
      { label: 'Afbouwschema', description: 'Tramadol over twee weken, zolpidem met slaaphygiëne' },
      { label: 'Uitleg voor de patiënt', description: 'Wat fibromyalgie is, pacing, slaap en wanneer contact opnemen' },
      { label: 'Verslag adviserend arts', description: 'Diagnose, behandelplan en werkregime voor het ziekenfonds' },
    ],
    previews: [
      'Diagnose: fibromyalgie (ACR 2016), met niet-herstellende slaap en deconditionering. Beleid: multidisciplinair revalidatieprogramma van 12 weken, afbouw tramadol en zolpidem, Redomex behouden, werk 4/5.',
      'Geachte collega, ik zag uw patiënte mevrouw Fascia voor wijdverspreide pijn sinds twee jaar, met vermoeidheid en niet-herstellende slaap. Klinisch en biologisch zijn er geen tekenen van inflammatoir lijden, en ze voldoet aan de ACR 2016-criteria voor fibromyalgie. Ze start in een multidisciplinair revalidatieprogramma van twaalf weken.',
      'Multidisciplinair revalidatieprogramma van 12 weken: oefentherapie, aquatherapie, ergotherapie en psycholoog. Scores bij intake: WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
      'Oefentherapie met graduele opbouw, Fb-lijst, wegens fibromyalgie met deconditionering. Aandacht voor pacing en aquatherapie.',
      'Tramadol 50 mg: week 1 maximaal 1 capsule per dag, week 2 stoppen. Zolpidem: afbouwen samen met de afspraken over slaaphygiëne.',
      'Uw pijn is echt, maar er is geen schade aan uw gewrichten of spieren. Bewegen is veilig als u het rustig opbouwt. Hieronder leest u hoe u uw energie verdeelt over de dag, wat helpt om beter te slapen en wanneer u ons contacteert.',
      'Fibromyalgie volgens de ACR 2016-criteria. Multidisciplinair revalidatieprogramma van 12 weken gestart. Werkhervatting: 4/5 behouden, ergotherapeut bekijkt de werkplek.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënte Sofie Fascia, geboren op 14 maart 1985, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens wijdverspreide pijn sinds twee jaar, met vermoeidheid en niet-herstellende slaap. Vraag naar diagnose en behandelplan.'],
        [
          'Anamnese',
          'Pijn in nek, schouders, armen, onderrug, heupen en bovenbenen, gemiddeld 7 op 10, wisselend met goede en slechte dagen. Erger bij lang zitten, stress en slecht slapen. Ochtendstijfheid van een kwartier, geen gezwollen gewrichten, geen nachtelijke inflammatoire rugpijn. Uitgeput bij het opstaan, wordt drie à vier keer per nacht wakker, concentratieklachten op het werk. Eerder 12 sessies kinesitherapie met kortdurend effect. Ibuprofen gestopt wegens maagklachten, pregabaline wegens duizeligheid en gewichtstoename. Neemt amitriptyline 10 mg ’s avonds, paracetamol bij pijn, tramadol 50 mg ongeveer vier dagen per week, zolpidem 10 mg ’s avonds indien nodig en maandelijks vitamine D. Prikkelbare darm, keizersnede in 2015. Werkt sinds zes maanden 4/5, met recente afwezigheden. Geen allergieën, geen bloedverdunners.',
        ],
        [
          'Klinisch onderzoek',
          'Diffuse drukpijn over de spieren van nek, schoudergordel, gluteale en paravertebrale regio, met gegeneraliseerde hyperalgesie. Geen synovitis. Normale gewrichtsmobiliteit en soepele wervelzuil. Kracht normaal, ook proximaal. Neurologisch onderzoek normaal. Geen hypermobiliteit, geen struma, geen huidafwijkingen.',
        ],
        [
          'Aanvullende onderzoeken',
          'Labo augustus 2026: CRP, BSE, bloedbeeld, TSH, CK en vitamine D normaal. RX lumbale wervelzuil 2025: lichte discopathie L5-S1, niet verklarend. Reumatologisch advies 2025: geen inflammatoir lijden, RF, anti-CCP en ANF negatief. Vragenlijsten: WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
        ],
        ['Diagnose', 'Fibromyalgie volgens de ACR 2016-criteria, met niet-herstellende slaap en deconditionering.'],
        [
          'Beleid',
          'Ik heb Sofie uitgelegd dat haar pijn echt is, maar niet wijst op schade aan gewrichten of spieren. Ze start in een multidisciplinair revalidatieprogramma van twaalf weken met oefentherapie, aquatherapie, ergotherapie en begeleiding door de psycholoog. Kinesitherapie wordt voorgeschreven via de Fb-lijst. Amitriptyline 10 mg ’s avonds blijft; bij onvoldoende effect op de slaap kan dit naar 25 mg. Tramadol bouwen we af over twee weken, gezien het beperkte effect en de combinatie met amitriptyline. Ook zolpidem bouwen we af, met aandacht voor slaaphygiëne. Bij onvoldoende effect op de pijn is duloxetine een volgende stap. Paracetamol mag zo nodig. Ze behoudt haar werkregime van 4/5. Opvolging na twee weken (afbouw), zes weken en drie maanden. Ze neemt contact op bij nieuwe gezwollen gewrichten, koorts, onverklaard gewichtsverlies, toenemend krachtverlies of als het psychisch niet meer gaat.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, fysisch geneesheer',
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
      { label: 'Consultation report', description: 'Physical medicine template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Rehabilitation programme referral', description: 'Twelve-week multidisciplinary programme, with the intake scores' },
      { label: 'Physiotherapy prescription', description: 'Graded exercise therapy, Fb list' },
      { label: 'Tapering schedule', description: 'Tramadol over two weeks, zolpidem with sleep hygiene' },
      { label: 'Explanation for the patient', description: 'What fibromyalgia is, pacing, sleep and when to get in touch' },
      { label: 'Report for the medical adviser', description: 'Diagnosis, treatment plan and work arrangement for the health insurer' },
    ],
    previews: [
      'Diagnosis: fibromyalgia (ACR 2016), with unrefreshing sleep and deconditioning. Plan: twelve-week multidisciplinary rehabilitation programme, taper tramadol and zolpidem, continue Redomex, work 4 days a week.',
      'Dear colleague, I saw your patient Mrs Fascia for widespread pain for two years, with fatigue and unrefreshing sleep. There are no clinical or biological signs of inflammatory disease, and she meets the ACR 2016 criteria for fibromyalgia. She is starting a twelve-week multidisciplinary rehabilitation programme.',
      'Twelve-week multidisciplinary rehabilitation programme: exercise therapy, aquatherapy, occupational therapy and psychologist. Intake scores: WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
      'Graded exercise therapy, Fb list, for fibromyalgia with deconditioning. Attention to pacing and aquatherapy.',
      'Tramadol 50 mg: week 1 at most 1 capsule a day, week 2 stop. Zolpidem: taper together with the agreements on sleep hygiene.',
      'Your pain is real, but there is no damage to your joints or muscles. Moving is safe if you build it up gently. Below you can read how to spread your energy over the day, what helps you sleep better and when to contact us.',
      'Fibromyalgia according to the ACR 2016 criteria. Twelve-week multidisciplinary rehabilitation programme started. Work: continue 4 days a week, the occupational therapist will look at the workplace.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Sofie Fascia, born on 14 March 1985, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for widespread pain for two years, with fatigue and unrefreshing sleep. Request for a diagnosis and treatment plan.'],
        [
          'History',
          'Pain in the neck, shoulders, arms, lower back, hips and thighs, average 7 out of 10, alternating good and bad days. Worse with prolonged sitting, stress and poor sleep. Morning stiffness of a quarter of an hour, no swollen joints, no inflammatory back pain at night. Exhausted on waking, wakes three to four times a night, difficulty concentrating at work. Previously 12 physiotherapy sessions with short-lived effect. Ibuprofen stopped due to stomach complaints, pregabalin due to dizziness and weight gain. Takes amitriptyline 10 mg in the evening, paracetamol for pain, tramadol 50 mg about four days a week, zolpidem 10 mg in the evening as needed and monthly vitamin D. Irritable bowel, caesarean section in 2015. Has worked 4 days a week for six months, with recent absences. No allergies, no anticoagulants.',
        ],
        [
          'Clinical examination',
          'Diffuse tenderness over the muscles of the neck, shoulder girdle, gluteal and paravertebral regions, with generalised hyperalgesia. No synovitis. Normal joint mobility and a supple spine. Strength normal, including proximally. Neurological examination normal. No hypermobility, no goitre, no skin abnormalities.',
        ],
        [
          'Further investigations',
          'Bloods August 2026: CRP, ESR, blood count, TSH, CK and vitamin D normal. Lumbar spine X-ray 2025: mild L5-S1 disc degeneration, not explanatory. Rheumatology opinion 2025: no inflammatory disease, RF, anti-CCP and ANA negative. Questionnaires: WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
        ],
        ['Diagnosis', 'Fibromyalgia according to the ACR 2016 criteria, with unrefreshing sleep and deconditioning.'],
        [
          'Plan',
          'I explained to Sofie that her pain is real, but does not indicate damage to joints or muscles. She is starting a twelve-week multidisciplinary rehabilitation programme with exercise therapy, aquatherapy, occupational therapy and support from the psychologist. Physiotherapy is prescribed under the Fb list. Amitriptyline 10 mg in the evening continues; if the effect on sleep is insufficient, it can go to 25 mg. We are tapering tramadol over two weeks, given its limited effect and the combination with amitriptyline. We are also tapering zolpidem, with attention to sleep hygiene. If the effect on pain is insufficient, duloxetine is a next step. Paracetamol as needed. She keeps working 4 days a week. Follow-up after two weeks (tapering), six weeks and three months. She will get in touch with new swollen joints, fever, unexplained weight loss, increasing weakness or if she can no longer cope mentally.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, rehabilitation physician',
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
      { label: 'Rapport de consultation', description: 'Modèle Médecine physique, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Orientation programme de revalidation', description: 'Programme multidisciplinaire de 12 semaines, avec les scores de l’anamnèse' },
      { label: 'Prescription de kinésithérapie', description: 'Thérapie par l’exercice progressive, liste Fb' },
      { label: 'Schéma de sevrage', description: 'Tramadol sur deux semaines, zolpidem avec hygiène du sommeil' },
      { label: 'Explication pour la patiente', description: 'Ce qu’est la fibromyalgie, le pacing, le sommeil et quand prendre contact' },
      { label: 'Rapport pour le médecin-conseil', description: 'Diagnostic, plan de traitement et régime de travail pour la mutualité' },
    ],
    previews: [
      'Diagnostic : fibromyalgie (ACR 2016), avec sommeil non réparateur et déconditionnement. Plan : programme de revalidation multidisciplinaire de 12 semaines, sevrage du tramadol et du zolpidem, maintien du Redomex, travail à 4/5.',
      'Cher confrère, j’ai vu votre patiente Mme Fascia pour des douleurs diffuses depuis deux ans, avec fatigue et sommeil non réparateur. Il n’y a pas de signes cliniques ni biologiques d’affection inflammatoire, et elle répond aux critères ACR 2016 de la fibromyalgie. Elle commence un programme de revalidation multidisciplinaire de douze semaines.',
      'Programme de revalidation multidisciplinaire de 12 semaines : thérapie par l’exercice, aquathérapie, ergothérapie et psychologue. Scores à l’anamnèse : WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
      'Thérapie par l’exercice progressive, liste Fb, pour fibromyalgie avec déconditionnement. Attention au pacing et à l’aquathérapie.',
      'Tramadol 50 mg : semaine 1 au maximum 1 gélule par jour, semaine 2 arrêt. Zolpidem : sevrage en même temps que les accords sur l’hygiène du sommeil.',
      'Votre douleur est réelle, mais il n’y a pas de lésion de vos articulations ni de vos muscles. Bouger est sans danger si vous progressez doucement. Vous lirez ci-dessous comment répartir votre énergie sur la journée, ce qui aide à mieux dormir et quand nous contacter.',
      'Fibromyalgie selon les critères ACR 2016. Programme de revalidation multidisciplinaire de 12 semaines débuté. Travail : maintien du 4/5, l’ergothérapeute examine le poste de travail.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patiente Sofie Fascia, née le 14 mars 1985, que j’ai vue récemment en consultation.',
      sections: [
        ['Motif du contact', 'Adressée pour des douleurs diffuses depuis deux ans, avec fatigue et sommeil non réparateur. Demande de diagnostic et de plan de traitement.'],
        [
          'Anamnèse',
          'Douleurs à la nuque, aux épaules, aux bras, au bas du dos, aux hanches et aux cuisses, en moyenne 7 sur 10, avec des bons et des mauvais jours. Aggravées par la position assise prolongée, le stress et le mauvais sommeil. Raideur matinale d’un quart d’heure, pas d’articulations gonflées, pas de lombalgie inflammatoire nocturne. Épuisée au lever, se réveille trois à quatre fois par nuit, troubles de la concentration au travail. Auparavant 12 séances de kinésithérapie avec effet de courte durée. Ibuprofène arrêté pour troubles gastriques, prégabaline pour vertiges et prise de poids. Prend de l’amitriptyline 10 mg le soir, du paracétamol en cas de douleur, du tramadol 50 mg environ quatre jours par semaine, du zolpidem 10 mg le soir si nécessaire et de la vitamine D mensuelle. Côlon irritable, césarienne en 2015. Travaille à 4/5 depuis six mois, avec des absences récentes. Pas d’allergies, pas d’anticoagulants.',
        ],
        [
          'Examen clinique',
          'Sensibilité diffuse à la pression des muscles de la nuque, de la ceinture scapulaire, des régions fessières et paravertébrales, avec hyperalgésie généralisée. Pas de synovite. Mobilité articulaire normale et rachis souple. Force normale, y compris proximale. Examen neurologique normal. Pas d’hypermobilité, pas de goitre, pas d’anomalies cutanées.',
        ],
        [
          'Examens complémentaires',
          'Biologie août 2026 : CRP, VS, hémogramme, TSH, CK et vitamine D normaux. RX du rachis lombaire 2025 : discopathie légère L5-S1, non explicative. Avis rhumatologique 2025 : pas d’affection inflammatoire, FR, anti-CCP et AAN négatifs. Questionnaires : WPI 13/19, SSS 9/12, FIQR 64/100, PSQI 15/21.',
        ],
        ['Diagnostic', 'Fibromyalgie selon les critères ACR 2016, avec sommeil non réparateur et déconditionnement.'],
        [
          'Plan',
          'J’ai expliqué à Sofie que sa douleur est réelle, mais qu’elle ne traduit pas de lésion des articulations ni des muscles. Elle commence un programme de revalidation multidisciplinaire de douze semaines avec thérapie par l’exercice, aquathérapie, ergothérapie et accompagnement par le psychologue. La kinésithérapie est prescrite via la liste Fb. L’amitriptyline 10 mg le soir est maintenue ; en cas d’effet insuffisant sur le sommeil, elle peut passer à 25 mg. Nous réduisons le tramadol sur deux semaines, vu son effet limité et l’association avec l’amitriptyline. Nous réduisons aussi le zolpidem, avec une attention à l’hygiène du sommeil. En cas d’effet insuffisant sur la douleur, la duloxétine est une étape suivante. Paracétamol si nécessaire. Elle conserve son régime de travail à 4/5. Suivi après deux semaines (sevrage), six semaines et trois mois. Elle prendra contact en cas de nouvelles articulations gonflées, de fièvre, de perte de poids inexpliquée, de perte de force croissante ou si elle ne tient plus psychologiquement.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, médecin spécialiste en médecine physique',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function PhysioDocumentDemo() {
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
      }, 1200),
    );
  };

  // Report, programme referral and physio prescription generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<SofieTitle />}>
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
/* 8 · Follow-up: P. Phalanx raises an alert, Sofie six weeks in       */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; sofie?: boolean; items: Questionnaire[] };

const FOLLOW: Record<
  SiteLocale,
  {
    hello: string;
    calm: string;
    urgent: string;
    screenings: string;
    alerts: string;
    noAlerts: string;
    viewAll: string;
    rows: [string, string][];
    alert: string;
    detail: string;
    checkin: string;
    chat: { from: 'bot' | 'patient'; text: string }[];
    scores: string;
    lowerBetter: string;
    baseline: string;
    week6: string;
    exampleData: string;
    measures: string[];
    life: [string, string, string][];
    plans: string;
    plansIntro: string;
    plansNote: string;
    completed: string;
    treatments: Treatment[];
  }
> = {
  nl: {
    hello: 'Hallo Dr. Vesalius!',
    calm: 'U hebt geen urgente interacties',
    urgent: 'U hebt 1 waarschuwingstaak',
    screenings: 'Recente Screenings',
    alerts: 'Waarschuwingstaken',
    noAlerts: 'Geen waarschuwingstaken.',
    viewAll: 'Bekijk alle',
    rows: [
      ['P. Phalanx', 'Revalidatieprogramma · maand 3'],
      ['S. Fascia', 'Revalidatieprogramma · week 6 · FIQR ingevuld'],
      ['B. Trochanter', 'Infiltratie · week 3'],
      ['M. Quadriceps', 'Sportrevalidatie · maand 4'],
    ],
    alert: 'Meldt sinds twee weken gezwollen vingergewrichten in beide handen en ochtendstijfheid van meer dan een uur. Mogelijk inflammatoir. Neem contact op.',
    detail: 'S. Fascia · revalidatieprogramma',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met u sinds de start van het programma?' },
      { from: 'patient', text: 'Beter dan ik dacht. Ik begrijp nu waarom het pijn doet. En ik heb geen tramadol meer nodig.' },
      { from: 'bot', text: 'Fijn om te horen. Is er iets dat nog niet lukt?' },
      { from: 'patient', text: 'Slapen. Ik word nog vaak wakker. En na een drukke werkdag ben ik op.' },
      { from: 'bot', text: 'Heeft u gemerkt dat gewrichten dik of warm worden, of bent u ’s ochtends langer stijf dan vroeger?' },
      { from: 'patient', text: 'Nee, dat niet.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Voorbeelddata',
    measures: ['NRS gemiddelde pijn', 'FIQR', 'PSQI slaap'],
    life: [
      ['Werk', '4/5, 14 dagen afwezig in het laatste kwartaal', '4/5, minder afwezig'],
      ['Sport', 'Gestopt met zwemmen', 'Aquatherapie in het programma'],
      ['Medicatie', 'Tramadol, Stilnoct, Redomex', 'Tramadol gestopt'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die u kiest. Wijzigt het beleid, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Multidisciplinair programma',
        sofie: true,
        items: [
          { moment: 'Week 2', name: 'Controle afbouw medicatie', asks: 'Ontwenningsklachten, slaap, pijn, nog nodig?', current: true },
          { moment: 'Week 6', name: 'Tussentijdse opvolging', asks: 'NRS, FIQR, PSQI, deelname aan het programma, pacing, werk, open vragen, rode vlaggen', current: true },
          { moment: 'Maand 3', name: 'Evaluatie programma', asks: 'FIQR, PSQI, PCS, HADS, EQ-5D-5L, werk, sport, ervaring met het programma (PREM)' },
          { moment: 'Maand 6 en 12', name: 'Langetermijnopvolging', asks: 'FIQR, PSQI, PCS, werk, sport en hobby’s, open vragen' },
        ],
      },
      {
        name: 'Kinesitherapie en thuisoefeningen',
        items: [{ moment: 'Week 6 en maand 3', name: 'Opvolging oefentherapie', asks: 'NRS, FIQR, therapietrouw thuisoefeningen, open vragen' }],
      },
      {
        name: 'Infiltratie (bv. trochanter)',
        items: [
          { moment: 'Dag 2', name: 'Controle na infiltratie', asks: 'Koorts, roodheid, zwelling, meer pijn dan voordien' },
          { moment: 'Week 3', name: 'Effect infiltratie', asks: 'Hoeveel de pijn daalde en hoe lang, NRS' },
        ],
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
      ['P. Phalanx', 'Rehabilitation programme · month 3'],
      ['S. Fascia', 'Rehabilitation programme · week 6 · FIQR completed'],
      ['B. Trochanter', 'Injection · week 3'],
      ['M. Quadriceps', 'Sports rehabilitation · month 4'],
    ],
    alert: 'Reports swollen finger joints in both hands for two weeks and morning stiffness of more than an hour. Possibly inflammatory. Please get in touch.',
    detail: 'S. Fascia · rehabilitation programme',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'How have you been since the programme started?' },
      { from: 'patient', text: 'Better than I expected. I understand now why it hurts. And I don’t need tramadol any more.' },
      { from: 'bot', text: 'Good to hear. Is there anything that isn’t working yet?' },
      { from: 'patient', text: 'Sleeping. I still wake up often. And after a busy day at work I’m worn out.' },
      { from: 'bot', text: 'Have you noticed any joints becoming swollen or warm, or are you stiff for longer in the morning than before?' },
      { from: 'patient', text: 'No, not that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Example data',
    measures: ['NRS average pain', 'FIQR', 'PSQI sleep'],
    life: [
      ['Work', '4 days a week, 14 days absent in the last quarter', '4 days a week, fewer absences'],
      ['Sport', 'Stopped swimming', 'Aquatherapy in the programme'],
      ['Medication', 'Tramadol, Stilnoct, Redomex', 'Tramadol stopped'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment you choose. If the plan changes, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Multidisciplinary programme',
        sofie: true,
        items: [
          { moment: 'Week 2', name: 'Medication tapering check', asks: 'Withdrawal symptoms, sleep, pain, still needed?', current: true },
          { moment: 'Week 6', name: 'Interim follow-up', asks: 'NRS, FIQR, PSQI, programme attendance, pacing, work, open questions, red flags', current: true },
          { moment: 'Month 3', name: 'Programme evaluation', asks: 'FIQR, PSQI, PCS, HADS, EQ-5D-5L, work, sport, experience of the programme (PREM)' },
          { moment: 'Months 6 and 12', name: 'Long-term follow-up', asks: 'FIQR, PSQI, PCS, work, sport and hobbies, open questions' },
        ],
      },
      {
        name: 'Physiotherapy and home exercises',
        items: [{ moment: 'Week 6 and month 3', name: 'Exercise therapy follow-up', asks: 'NRS, FIQR, adherence to home exercises, open questions' }],
      },
      {
        name: 'Injection (e.g. trochanter)',
        items: [
          { moment: 'Day 2', name: 'Check after injection', asks: 'Fever, redness, swelling, more pain than before' },
          { moment: 'Week 3', name: 'Effect of injection', asks: 'How much the pain fell and for how long, NRS' },
        ],
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
      ['P. Phalanx', 'Programme de revalidation · mois 3'],
      ['S. Fascia', 'Programme de revalidation · semaine 6 · FIQR rempli'],
      ['B. Trochanter', 'Infiltration · semaine 3'],
      ['M. Quadriceps', 'Revalidation sportive · mois 4'],
    ],
    alert: 'Signale depuis deux semaines des articulations des doigts gonflées aux deux mains et une raideur matinale de plus d’une heure. Possiblement inflammatoire. Prenez contact.',
    detail: 'S. Fascia · programme de revalidation',
    checkin: 'Suivi semaine 6',
    chat: [
      { from: 'bot', text: 'Comment allez-vous depuis le début du programme ?' },
      { from: 'patient', text: 'Mieux que je ne pensais. Je comprends maintenant pourquoi j’ai mal. Et je n’ai plus besoin de tramadol.' },
      { from: 'bot', text: 'Ravi de l’entendre. Y a-t-il quelque chose qui ne va pas encore ?' },
      { from: 'patient', text: 'Le sommeil. Je me réveille encore souvent. Et après une journée de travail chargée, je suis épuisée.' },
      { from: 'bot', text: 'Avez-vous remarqué des articulations gonflées ou chaudes, ou êtes-vous raide plus longtemps le matin qu’avant ?' },
      { from: 'patient', text: 'Non, pas ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    baseline: 'Référence',
    week6: 'Semaine 6',
    exampleData: 'Données d’exemple',
    measures: ['NRS douleur moyenne', 'FIQR', 'PSQI sommeil'],
    life: [
      ['Travail', '4/5, 14 jours d’absence au dernier trimestre', '4/5, moins d’absences'],
      ['Sport', 'A arrêté la natation', 'Aquathérapie dans le programme'],
      ['Médicaments', 'Tramadol, Stilnoct, Redomex', 'Tramadol arrêté'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement que vous choisissez. Si le plan change, le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Programme multidisciplinaire',
        sofie: true,
        items: [
          { moment: 'Semaine 2', name: 'Contrôle du sevrage', asks: 'Symptômes de sevrage, sommeil, douleur, encore nécessaire ?', current: true },
          { moment: 'Semaine 6', name: 'Suivi intermédiaire', asks: 'NRS, FIQR, PSQI, participation au programme, pacing, travail, questions ouvertes, signaux d’alerte', current: true },
          { moment: 'Mois 3', name: 'Évaluation du programme', asks: 'FIQR, PSQI, PCS, HADS, EQ-5D-5L, travail, sport, expérience du programme (PREM)' },
          { moment: 'Mois 6 et 12', name: 'Suivi à long terme', asks: 'FIQR, PSQI, PCS, travail, sport et loisirs, questions ouvertes' },
        ],
      },
      {
        name: 'Kinésithérapie et exercices à domicile',
        items: [{ moment: 'Semaine 6 et mois 3', name: 'Suivi de la thérapie par l’exercice', asks: 'NRS, FIQR, observance des exercices à domicile, questions ouvertes' }],
      },
      {
        name: 'Infiltration (p. ex. trochanter)',
        items: [
          { moment: 'Jour 2', name: 'Contrôle après infiltration', asks: 'Fièvre, rougeur, gonflement, plus de douleur qu’avant' },
          { moment: 'Semaine 3', name: 'Effet de l’infiltration', asks: 'De combien la douleur a diminué et pendant combien de temps, NRS' },
        ],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'PP', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'SF', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'BT', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'MQ', flag: false, date: '23-09-2026, 09:30' },
];
// Baseline → week 6 (sales' example data); the bar is value / max, so a shorter bar is progress.
const SCORES: { max: number; values: [number, number] }[] = [
  { max: 10, values: [7, 6] },
  { max: 100, values: [64, 57] },
  { max: 21, values: [15, 13] },
];
const SOFIE_ROW = 1;

export function PhysioFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 P. Phalanx's alert, 6 Sofie's progress opens
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
              const sofie = row.i === SOFIE_ROW;
              const body = (
                <>
                  <PatientAvatar initials={row.initials} flag={row.flag} size={30} />
                  <span className="flex-1 min-w-0 text-left">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-semibold truncate">
                      {row.copy[0]}
                      {red && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#949CB1] min-w-0">
                      <AppIcon name="calendar-alt" size={11} color={APP.darkGrey} />
                      <span className="truncate">
                        {row.copy[1]} · {row.date}
                      </span>
                    </span>
                  </span>
                </>
              );
              return (
                <motion.div key={row.i} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  {sofie ? (
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
                    <b>P. Phalanx</b> · {c.alert}
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
                    <PatientAvatar initials="SF" size={20} />
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

                {/* Scores: baseline in grey, week 6 in Sofie's colour; here a shorter bar is progress */}
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
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: SOFIE }} />
                        {c.week6}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const { max, values } = SCORES[i];
                      const [before, after] = values;
                      return (
                        <div key={label}>
                          <p className="flex justify-between text-[11px] mb-1">
                            <span>
                              {label} <span className="text-[#949CB1]">· 0–{max}</span>
                            </span>
                            <span className="tabular-nums text-[#4E5670]">
                              {before} → <b className="text-[#2A3A51]">{after}</b>
                            </span>
                          </p>
                          <div className="flex flex-col gap-0.5">
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span
                                className="block h-full rounded-full bg-[#D5D9E0]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(before / max) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }}
                              />
                            </span>
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span
                                className="block h-full rounded-full"
                                style={{ backgroundColor: SOFIE }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(after / max) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: EASE }}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Not only numbers: work, swimming and her medication */}
                  <div className="mt-4 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                    {c.life.map(([label, before, after]) => (
                      <p key={label} className="grid grid-cols-[5rem_1fr] gap-2 py-1.5 text-[11px]">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  {c.treatments.map((treatment) => (
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.sofie ? 'border-[#4F5BD5]/30 bg-[#EEF0FD]/60' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.sofie && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#4F5BD5]/20">
                            <PatientAvatar initials="SF" size={12} />
                            Sofie
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
