'use client';

/**
 * Module demos for the ophthalmology variant (source: sales, "Website-inhoud oogheelkunde", §7). Every page follows
 * Paul Lens (71, retired electrician, gradually blurred vision OD > OS) one step further, from triage to visual acuity,
 * slit lamp and biometry, a cataract operation on the right eye and the follow-up after both eyes; R. Retina (flashes,
 * new floaters and a shadow) is the recurring red flag and U. Uvea raises the alert after surgery. Same app UI as the
 * other demos. Every finding names the eye (OD / OS), as an ophthalmologist writes it.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Paul keeps one avatar colour on every page, so visitors recognise him. */
const PAUL = '#2C8C7A';
const PAUL_SOFT = '#E6F4F1';
/** Red flags (R. Retina, U. Uvea) share one red accent and the warning icon. */
const RED = APP.accent;
/** Patients who stay with the ophthalmologists, those sent to the orthoptist, and a report that is no red flag. */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };
const NEUTRAL = { text: '#6B7385', bg: '#F0F1F4' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'PL' ? PAUL : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function PaulTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="PL" size={24} />
        Paul Lens
      </span>
    </span>
  );
}

/** Visual acuity and eye pressure per eye, as a small OD / OS grid like in an ophthalmic record. */
function EyeGrid({ head, rows, note }: { head: string[]; rows: string[][]; note?: string }) {
  return (
    <div className="mt-1.5 inline-block rounded-lg border border-[#E8EAEC] bg-white overflow-hidden text-[11px]">
      <div className="grid gap-x-3 px-2.5 py-1 bg-[#F4F5F8] font-semibold text-[#4E5670]" style={{ gridTemplateColumns: `minmax(5.5rem,auto) repeat(${head.length - 1}, minmax(3.2rem,auto))` }}>
        {head.map((h, i) => (
          <span key={`${h}-${i}`} className={i ? 'text-center' : ''}>
            {h}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row[0]}
          className="grid gap-x-3 px-2.5 py-1 border-t border-[#E8EAEC] tabular-nums"
          style={{ gridTemplateColumns: `minmax(5.5rem,auto) repeat(${head.length - 1}, minmax(3.2rem,auto))` }}
        >
          {row.map((cell, i) => (
            <span key={i} className={i ? 'text-center font-medium' : 'text-[#4E5670]'}>
              {cell}
            </span>
          ))}
        </div>
      ))}
      {note && <p className="px-2.5 py-1 border-t border-[#E8EAEC] text-[10px] text-[#949CB1]">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: cataract, retina, glaucoma or the orthoptist      */
/* ------------------------------------------------------------------ */

type Referral = 'cataract' | 'retina' | 'glaucoma' | 'orthoptist' | 'noFlag' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Lichtflitsen, nieuwe vlekjes en een schaduw in het linkeroog sinds gisteren. Secretariaat geeft vandaag nog een plaats.',
    referrals: { cataract: 'Cataract', retina: 'Medische retina', glaucoma: 'Glaucoom', orthoptist: 'Orthoptist', noFlag: 'Geen rode vlag' },
    rows: [
      'Sinds gisteren lichtflitsen, nieuwe vlekjes en een schaduw onderaan, linkeroog',
      'Geleidelijk wazig OD > OS, verblinding bij tegenlicht, bril helpt niet meer',
      'Sinds twee weken rechte lijnen golvend, rechteroog (voorrang)',
      'Verhoogde oogdruk bij de opticien, moeder glaucoom, geen klachten',
      'Droge, branderige ogen bij beeldschermwerk, zicht goed',
      'Al jaren één zwevend vlekje, onveranderd, geen flitsen',
      'Vraag over afspraak',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Flashes of light, new floaters and a shadow in the left eye since yesterday. The secretariat is giving a slot today.',
    referrals: { cataract: 'Cataract', retina: 'Medical retina', glaucoma: 'Glaucoma', orthoptist: 'Orthoptist', noFlag: 'No red flag' },
    rows: [
      'Since yesterday flashes of light, new floaters and a shadow at the bottom, left eye',
      'Gradually blurred OD > OS, glare against the light, glasses no longer help',
      'Straight lines wavy for two weeks, right eye (priority)',
      'Raised eye pressure at the optician, mother had glaucoma, no symptoms',
      'Dry, burning eyes with screen work, vision good',
      'One floater for years, unchanged, no flashes',
      'Question about an appointment',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Éclairs lumineux, nouvelles mouches volantes et une ombre dans l’œil gauche depuis hier. Le secrétariat donne une place aujourd’hui.',
    referrals: { cataract: 'Cataracte', retina: 'Rétine médicale', glaucoma: 'Glaucome', orthoptist: 'Orthoptiste', noFlag: 'Pas de signal d’alerte' },
    rows: [
      'Depuis hier éclairs lumineux, nouvelles mouches volantes et une ombre en bas, œil gauche',
      'Vue progressivement floue OD > OG, éblouissement à contre-jour, les lunettes n’aident plus',
      'Lignes droites ondulées depuis deux semaines, œil droit (prioritaire)',
      'Pression oculaire élevée chez l’opticien, mère glaucomateuse, pas de plaintes',
      'Yeux secs et brûlants devant l’écran, bonne vue',
      'Une seule mouche volante depuis des années, inchangée, pas d’éclairs',
      'Question sur un rendez-vous',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'R. Retina', initials: 'RR', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'P. Lens', initials: 'PL', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'cataract' },
  { name: 'M. Macula', initials: 'MM', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'retina' },
  { name: 'O. Papil', initials: 'OP', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'glaucoma' },
  { name: 'C. Cornea', initials: 'CC', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'orthoptist' },
  { name: 'V. Vitreus', initials: 'VV', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'noFlag' },
  { name: 'K. Kapsel', initials: 'KK', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: '' },
];

// The orthoptist in another colour, so it is clear not every patient lands in the ophthalmologist's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = {
  cataract: STAYS,
  retina: STAYS,
  glaucoma: STAYS,
  orthoptist: ELSEWHERE,
  noFlag: NEUTRAL,
};

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function OphthalmologyTriageDemo() {
  const c = useLocalized(TRIAGE);
  // 1–7 rows arrive with their referral, 8 the red flag lights up and the attention card opens
  const step = useSteps(TRIAGE_ROWS.length + 1, 400, 150);
  const flagged = step > TRIAGE_ROWS.length;

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
                      {row.referral !== 'noFlag' && <AppIcon name="arrow-fork-down" size={10} color={tone.text} />}
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
                <PatientAvatar initials="RR" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">R. Retina</span>
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
/* 2 · Agenda: a longer slot with time for dilation and biometry       */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'maandag 9 november 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    dilation: 'Dilatatie',
    elsewhere: '3 patiënten doorgestuurd naar een collega',
    types: [
      'Controle dag 1 na cataractoperatie rechts',
      'Dringend · flitsen, nieuwe vlekjes en schaduw linkeroog',
      'Nieuwe patiënt · zwevend vlekje, gewone controle',
      'Nieuwe patiënt · cataract · dilatatie en biometrie',
      'YAG-laser · nastaar rechts',
      'Controle week 4 na cataractoperatie links',
    ],
  },
  en: {
    date: 'Monday 9 November 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    dilation: 'Dilation',
    elsewhere: '3 patients referred to a colleague',
    types: [
      'Day 1 check after cataract surgery, right eye',
      'Urgent · flashes, new floaters and shadow, left eye',
      'New patient · floater, routine check',
      'New patient · cataract · dilation and biometry',
      'YAG laser · posterior capsule opacification, right eye',
      'Week 4 check after cataract surgery, left eye',
    ],
  },
  fr: {
    date: 'lundi 9 novembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    dilation: 'Dilatation',
    elsewhere: '3 patients orientés vers un collègue',
    types: [
      'Contrôle J1 après opération de la cataracte, œil droit',
      'Urgent · éclairs, nouvelles mouches volantes et ombre, œil gauche',
      'Nouveau patient · mouche volante, contrôle habituel',
      'Nouveau patient · cataracte · dilatation et biométrie',
      'Laser YAG · cataracte secondaire, œil droit',
      'Contrôle semaine 4 après opération de la cataracte, œil gauche',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; paul?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'I. Iris', initials: 'II', type: 0 },
  { room: 1, start: 0, len: 3, name: 'P. Lens', initials: 'PL', type: 3, paul: true },
  { room: 0, start: 1, len: 1, name: 'R. Retina', initials: 'RR', type: 1, flag: true },
  { room: 2, start: 1, len: 1, name: 'K. Kapsel', initials: 'KK', type: 4 },
  { room: 0, start: 2, len: 1, name: 'V. Vitreus', initials: 'VV', type: 2 },
  { room: 2, start: 3, len: 1, name: 'S. Sclera', initials: 'SS', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabel, dilationLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string; dilationLabel: string }) {
  const accent = visit.paul ? PAUL : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.paul ? PAUL_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.paul && ready ? `${readyLabel} · ${dilationLabel}` : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.paul && <PatientAvatar initials="PL" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.paul && ready && (
        // The tick links to the pre-consultation page; its label opens on hover. Dilation is a label of its own.
        <span className="mt-2 flex flex-wrap items-center gap-1">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
          >
            <Check size={10} color="#1F9E6E" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[10rem]">{readyLabel}</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#2C8C7A]/30"
            style={{ color: PAUL }}
          >
            <AppIcon name="eye" size={10} color={PAUL} />
            {dilationLabel}
          </motion.span>
        </span>
      )}
    </motion.div>
  );
}

export function OphthalmologyAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Paul's questionnaire tick, dilation label and the patients referred on
  const step = useSteps(7, 520, 400);
  const shown = VISITS.slice(0, Math.min(step, VISITS.length));
  const done = step >= 7;

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
                  <VisitBlock key={visit.name} visit={visit} label={c.types[visit.type]} ready={done} readyLabel={c.ready} dilationLabel={c.dilation} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* M. Macula, O. Papil and C. Cornea are not in this agenda: triage sent them to medical retina, glaucoma and the orthoptist. */}
      <p className="mt-2.5 px-1 flex items-center gap-1.5 text-[11px] text-[#949CB1] min-h-[16px]">
        {done && (
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
/* 3 · Pre-consultation: no distortion, no flashes, so cataract        */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string; highlight?: boolean };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: { from: 'bot' | 'patient'; text: string }[];
  yesNo: [string, string];
  summary: string;
  copy: string;
  tabs: [string, string, string];
  summaries: [SummarySection[], SummarySection[], SummarySection[]];
};

// After his first answer the reason fills in, after the second one his driving, and with the last question the red
// flags that decided the routing light up.
const REASON_AT = 2;
const DRIVING_AT = 4;
const FLAGS_AT = 5;
/** Sections open by default on Paul's tab: reason, symptoms and red flags. */
const OPEN_BY_DEFAULT = [0, 1, 4];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: "Ik zie al acht maanden steeds waziger, vooral met mijn rechteroog. 's Avonds verblinden de lichten van tegenliggers me." },
      { from: 'bot', text: "Rijdt u nog met de auto, overdag en 's avonds?" },
      { from: 'patient', text: "Overdag wel. 's Avonds rij ik al twee maanden niet meer, ook niet naar mijn kaartclub." },
      { from: 'bot', text: 'Lijken rechte lijnen, zoals deurstijlen of tegels, soms krom of golvend?' },
    ],
    yesNo: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Cataract', 'Medische retina', 'Glaucoom'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', 'Geleidelijk wazig zicht, rechts meer dan links. Vermoeden van cataract volgens de huisarts.', { fillAt: REASON_AT }),
            r('Duur', 'Acht maanden, langzaam erger', { fillAt: REASON_AT }),
            r('Welk oog', 'Beide, rechts erger', { fillAt: REASON_AT }),
          ],
        },
        {
          title: 'Klachten',
          rows: [
            r('Verblinding', "Koplampen van tegenliggers, halo's rond lichten", { fillAt: REASON_AT }),
            r('Kleuren', 'Doffer, "alles is wat geler"'),
            r('Lezen', 'Krant lezen moeizaam, ook met leesbril, heeft meer licht nodig'),
          ],
        },
        {
          title: 'Dagelijks leven',
          rows: [
            r('Autorijden', "Overdag ja. 's Avonds gestopt sinds twee maanden", { fillAt: DRIVING_AT }),
            r("Hobby's", 'Fijne maten aflezen bij houtbewerking lastig, kaarten lezen in zwak licht'),
          ],
        },
        { title: 'Bril', rows: [r('Laatste meting', 'Nieuwe bril bij de opticien zes maanden geleden, hielp enkele weken')] },
        {
          title: 'Rode vlaggen',
          rows: [
            r('Vervormd zien', 'Nee', { fillAt: FLAGS_AT, mark: 'Bepaalde de routering' }),
            r('Flitsen, nieuwe vlekken, schaduw', 'Nee', { fillAt: FLAGS_AT, highlight: true }),
            r('Pijn of rood oog', 'Nee'),
          ],
        },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Oogvoorgeschiedenis', 'Geen oogoperaties, geen laser, geen lui oog, geen trauma. Altijd licht verziend'),
            r('Aandoeningen', 'Diabetes type 2 sinds 9 jaar (HbA1c 6,9%), hoge bloeddruk, cholesterol, goedaardige prostaatvergroting'),
            r('Allergieën', 'Nee'),
            r('Bloedverdunners', 'Geen anticoagulantia. Neemt Asaflow 80 mg'),
            r('Familie', 'Moeder maculadegeneratie op hoge leeftijd. Geen glaucoom gekend'),
          ],
        },
        {
          title: 'Voor de ingreep',
          rows: [r('Kan plat liggen', 'Ja, 20 minuten zonder probleem'), r('Vervoer', 'Zoon brengt en haalt hem'), r('Wens', 'Zonder bril in de verte, leesbril aanvaardbaar')],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Nooit gerookt / 1 glas wijn per dag')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Gepensioneerd elektricien'),
            r('Sport en hobby', 'Houtbewerking, kaarten in de kaartclub, fietsen met zijn vrouw, elke ochtend de krant'),
            r('Handdominantie', 'Rechts'),
            r('Lengte / gewicht', '1,76 m / 84 kg'),
            r('Leeftijd', '71 jaar'),
            r('Verwijzing', 'Via dr. Claes, huisarts, na advies van de opticien'),
          ],
        },
        { title: 'Baseline', rows: [r('Catquest-9SF', 'Rasch-score 0,8 (lager = beter, voorbeelddata)')] },
      ],
      [
        {
          title: 'Reden van consultatie',
          rows: [r('Aanleiding', 'Sinds twee weken rechte lijnen golvend in het rechteroog, vlek in het midden bij lezen'), r('Welk oog', 'Rechts')],
        },
        { title: 'Rode vlaggen', rows: [r('Flitsen, nieuwe vlekken, schaduw', 'Nee')] },
        { title: 'Medische achtergrond', rows: [r('Familie', 'Zus maculadegeneratie'), r('Roken', 'Gestopt 10 jaar geleden')] },
        { title: 'Algemeen', rows: [r('Leeftijd', '78 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Verhoogde oogdruk gemeten bij de opticien (24 en 25 mmHg), geen klachten')] },
        { title: 'Medische achtergrond', rows: [r('Familie', 'Moeder glaucoom, op latere leeftijd blind aan één oog'), r('Medicatie', 'Geen oogdruppels. Geen cortisone')] },
        { title: 'Bril', rows: [r('Sterkte', 'Bijziend, −4,00 beiderzijds')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Boekhouder / 58 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'For eight months my sight has been getting blurrier, especially in my right eye. In the evening the headlights of oncoming cars dazzle me.' },
      { from: 'bot', text: 'Do you still drive, during the day and in the evening?' },
      { from: 'patient', text: 'During the day, yes. I haven’t driven in the evening for two months, not even to my card club.' },
      { from: 'bot', text: 'Do straight lines, such as door frames or tiles, ever look bent or wavy?' },
    ],
    yesNo: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Cataract', 'Medical retina', 'Glaucoma'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Gradually blurred vision, right more than left. Suspected cataract according to the GP.', { fillAt: REASON_AT }),
            r('Duration', 'Eight months, slowly getting worse', { fillAt: REASON_AT }),
            r('Which eye', 'Both, right worse', { fillAt: REASON_AT }),
          ],
        },
        {
          title: 'Symptoms',
          rows: [
            r('Glare', 'Headlights of oncoming cars, halos around lights', { fillAt: REASON_AT }),
            r('Colours', 'Duller, "everything is a bit yellower"'),
            r('Reading', 'Reading the newspaper is hard, even with reading glasses, needs more light'),
          ],
        },
        {
          title: 'Daily life',
          rows: [
            r('Driving', 'During the day, yes. Stopped driving in the evening two months ago', { fillAt: DRIVING_AT }),
            r('Hobbies', 'Hard to read fine measurements when woodworking, reading cards in dim light'),
          ],
        },
        { title: 'Glasses', rows: [r('Last test', 'New glasses from the optician six months ago, helped for a few weeks')] },
        {
          title: 'Red flags',
          rows: [
            r('Distorted vision', 'No', { fillAt: FLAGS_AT, mark: 'Decided the routing' }),
            r('Flashes, new floaters, shadow', 'No', { fillAt: FLAGS_AT, highlight: true }),
            r('Pain or red eye', 'No'),
          ],
        },
        {
          title: 'Medical history',
          rows: [
            r('Eye history', 'No eye surgery, no laser, no lazy eye, no trauma. Always slightly long-sighted'),
            r('Conditions', 'Type 2 diabetes for 9 years (HbA1c 6.9%), high blood pressure, cholesterol, benign prostatic enlargement'),
            r('Allergies', 'No'),
            r('Anticoagulants', 'No anticoagulants. Takes Asaflow 80 mg'),
            r('Family history', 'Mother had macular degeneration in old age. No known glaucoma'),
          ],
        },
        {
          title: 'Before the procedure',
          rows: [r('Can lie flat', 'Yes, 20 minutes without a problem'), r('Transport', 'His son drops him off and picks him up'), r('Wish', 'No glasses for distance, reading glasses acceptable')],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'Never smoked / 1 glass of wine a day')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Retired electrician'),
            r('Sport and hobbies', 'Woodworking, cards at the card club, cycling with his wife, the newspaper every morning'),
            r('Handedness', 'Right'),
            r('Height / weight', '1.76 m / 84 kg'),
            r('Age', '71'),
            r('Referral', 'Via Dr Claes, GP, on the optician’s advice'),
          ],
        },
        { title: 'Baseline', rows: [r('Catquest-9SF', 'Rasch score 0.8 (lower = better, example data)')] },
      ],
      [
        {
          title: 'Reason for consultation',
          rows: [r('Cause', 'Straight lines wavy in the right eye for two weeks, a spot in the centre when reading'), r('Which eye', 'Right')],
        },
        { title: 'Red flags', rows: [r('Flashes, new floaters, shadow', 'No')] },
        { title: 'Medical history', rows: [r('Family history', 'Sister has macular degeneration'), r('Smoking', 'Stopped 10 years ago')] },
        { title: 'General', rows: [r('Age', '78')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Raised eye pressure measured at the optician (24 and 25 mmHg), no symptoms')] },
        { title: 'Medical history', rows: [r('Family history', 'Mother had glaucoma, blind in one eye later in life'), r('Medication', 'No eye drops. No steroids')] },
        { title: 'Glasses', rows: [r('Prescription', 'Short-sighted, −4.00 both eyes')] },
        { title: 'General', rows: [r('Occupation / age', 'Accountant / 58')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis huit mois, ma vue devient de plus en plus floue, surtout de l’œil droit. Le soir, les phares des voitures en face m’éblouissent.' },
      { from: 'bot', text: 'Conduisez-vous encore, en journée et le soir ?' },
      { from: 'patient', text: 'En journée, oui. Le soir, je ne conduis plus depuis deux mois, même pas pour aller à mon club de cartes.' },
      { from: 'bot', text: 'Les lignes droites, comme les montants de porte ou le carrelage, vous paraissent-elles parfois courbes ou ondulées ?' },
    ],
    yesNo: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Cataracte', 'Rétine médicale', 'Glaucome'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Vue progressivement floue, la droite plus que la gauche. Suspicion de cataracte selon le médecin traitant.', { fillAt: REASON_AT }),
            r('Durée', 'Huit mois, lentement aggravée', { fillAt: REASON_AT }),
            r('Quel œil', 'Les deux, le droit plus atteint', { fillAt: REASON_AT }),
          ],
        },
        {
          title: 'Plaintes',
          rows: [
            r('Éblouissement', 'Phares des voitures en face, halos autour des lumières', { fillAt: REASON_AT }),
            r('Couleurs', 'Plus ternes, « tout est un peu plus jaune »'),
            r('Lecture', 'Lire le journal est difficile, même avec des lunettes de lecture, a besoin de plus de lumière'),
          ],
        },
        {
          title: 'Vie quotidienne',
          rows: [
            r('Conduite', 'En journée, oui. Arrêtée le soir depuis deux mois', { fillAt: DRIVING_AT }),
            r('Loisirs', 'Difficile de lire les mesures fines en menuiserie, de lire les cartes sous faible éclairage'),
          ],
        },
        { title: 'Lunettes', rows: [r('Dernière mesure', 'Nouvelles lunettes chez l’opticien il y a six mois, utiles quelques semaines')] },
        {
          title: 'Signaux d’alerte',
          rows: [
            r('Vision déformée', 'Non', { fillAt: FLAGS_AT, mark: 'A décidé de l’orientation' }),
            r('Éclairs, nouvelles mouches, ombre', 'Non', { fillAt: FLAGS_AT, highlight: true }),
            r('Douleur ou œil rouge', 'Non'),
          ],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Antécédents oculaires', 'Aucune chirurgie oculaire, pas de laser, pas d’amblyopie, pas de traumatisme. Toujours légèrement hypermétrope'),
            r('Affections', 'Diabète de type 2 depuis 9 ans (HbA1c 6,9 %), hypertension, cholestérol, hypertrophie bénigne de la prostate'),
            r('Allergies', 'Non'),
            r('Anticoagulants', 'Pas d’anticoagulants. Prend Asaflow 80 mg'),
            r('Antécédents familiaux', 'Mère atteinte de DMLA à un âge avancé. Pas de glaucome connu'),
          ],
        },
        {
          title: 'Avant l’intervention',
          rows: [r('Peut rester allongé', 'Oui, 20 minutes sans problème'), r('Transport', 'Son fils le dépose et vient le chercher'), r('Souhait', 'Sans lunettes de loin, lunettes de lecture acceptables')],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'N’a jamais fumé / 1 verre de vin par jour')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Électricien retraité'),
            r('Sport et loisirs', 'Menuiserie, cartes au club, vélo avec sa femme, le journal chaque matin'),
            r('Latéralité', 'Droitier'),
            r('Taille / poids', '1,76 m / 84 kg'),
            r('Âge', '71 ans'),
            r('Orientation', 'Par le Dr Claes, médecin traitant, sur conseil de l’opticien'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('Catquest-9SF', 'Score de Rasch 0,8 (plus bas = mieux, données d’exemple)')] },
      ],
      [
        {
          title: 'Motif de consultation',
          rows: [r('Déclencheur', 'Lignes droites ondulées dans l’œil droit depuis deux semaines, tache au centre en lisant'), r('Quel œil', 'Droit')],
        },
        { title: 'Signaux d’alerte', rows: [r('Éclairs, nouvelles mouches, ombre', 'Non')] },
        { title: 'Antécédents médicaux', rows: [r('Antécédents familiaux', 'Sœur atteinte de DMLA'), r('Tabac', 'Arrêté il y a 10 ans')] },
        { title: 'Général', rows: [r('Âge', '78 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Pression oculaire élevée mesurée chez l’opticien (24 et 25 mmHg), pas de plaintes')] },
        { title: 'Antécédents médicaux', rows: [r('Antécédents familiaux', 'Mère glaucomateuse, aveugle d’un œil à un âge avancé'), r('Médicaments', 'Pas de collyres. Pas de cortisone')] },
        { title: 'Lunettes', rows: [r('Correction', 'Myope, −4,00 des deux côtés')] },
        { title: 'Général', rows: [r('Profession / âge', 'Comptable / 58 ans')] },
      ],
    ],
  },
};

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

export function OphthalmologyPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–5 the conversation; the last question waits on Yes / No while the red flags that decided the routing light up
  const step = useSteps(total, 1000, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Paul's tab opens on what matters first; long sections stay folded, the other two tabs are short and fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 7}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step === total && <Choices options={c.yesNo} />}
      </Phone>

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
              {i === 0 && <PatientAvatar initials="PL" size={18} />}
              {label}
            </button>
          ))}
        </div>
        {sections.map((section, i) => {
          const expanded = isOpen(i);
          return (
            <div key={`${tab}-${section.title}-${i}`} className="py-2.5 border-b border-[#E8EAEC] last:border-0">
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
                      {section.rows.map((row) => {
                        const known = tab !== 0 || !row.fillAt || step >= row.fillAt;
                        const marked = (row.mark || row.highlight) && known && tab === 0;
                        return (
                          <div key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${marked ? 'my-1 -ml-1 pl-5 pr-2 py-1.5 rounded-lg bg-[#EBF6F8] ring-1 ring-[#06ACC1]/30' : ''}`}>
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
                            {marked && row.mark && (
                              <motion.span
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-[#0B759F]"
                              >
                                <AppIcon name="arrow-fork-down" size={11} color="#0B759F" />
                                {row.mark}
                              </motion.span>
                            )}
                          </div>
                        );
                      })}
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
/* 4 · Voice Reception: he calls, he is booked with time for drops     */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Goedendag, mijn huisarts denkt dat ik staar heb. Kan ik een afspraak krijgen bij de oogarts?' },
      { from: 'bot', text: 'Zeker. Is uw zicht geleidelijk achteruitgegaan, of plots? En gaat het om één oog of beide?' },
      { from: 'patient', text: 'Geleidelijk, al maanden. Beide ogen, maar rechts is het erger.' },
      { from: 'bot', text: 'Ziet u lichtflitsen, nieuwe vlekjes of een schaduw? Of is uw oog pijnlijk of rood?' },
      { from: 'patient', text: "Nee, dat niet. Alleen alles wazig, en 's avonds die lichten." },
      {
        from: 'bot',
        text: 'Dank u. Ik plan u in op de cataractraadpleging, met wat extra tijd voor de oogdruppels. U krijgt een korte vragenlijst om uw bezoek voor te bereiden. Kom niet zelf met de auto: na de druppels ziet u een paar uur wazig.',
      },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland op de cataractraadpleging (lang blok, dilatatie): geleidelijk wazig zicht, geen rode vlaggen',
    advice: 'Advies gegeven: niet zelf met de auto',
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
      { from: 'patient', text: 'Good morning, my GP thinks I have a cataract. Can I get an appointment with the eye doctor?' },
      { from: 'bot', text: 'Certainly. Has your sight got worse gradually, or suddenly? And is it one eye or both?' },
      { from: 'patient', text: 'Gradually, for months. Both eyes, but the right is worse.' },
      { from: 'bot', text: 'Do you see flashes of light, new floaters or a shadow? Or is your eye painful or red?' },
      { from: 'patient', text: 'No, not that. Just everything blurry, and those lights in the evening.' },
      {
        from: 'bot',
        text: 'Thank you. I’ll book you into the cataract clinic, with some extra time for the eye drops. You’ll get a short questionnaire to prepare for your visit. Don’t drive yourself: after the drops your sight will be blurred for a few hours.',
      },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked at the cataract clinic (long slot, dilation): gradually blurred vision, no red flags',
    advice: 'Advice given: don’t drive yourself',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant pense que j’ai une cataracte. Puis-je avoir un rendez-vous chez l’ophtalmologue ?' },
      { from: 'bot', text: 'Bien sûr. Votre vue a-t-elle baissé progressivement, ou brutalement ? Et s’agit-il d’un œil ou des deux ?' },
      { from: 'patient', text: 'Progressivement, depuis des mois. Les deux yeux, mais le droit est pire.' },
      { from: 'bot', text: 'Voyez-vous des éclairs lumineux, de nouvelles mouches volantes ou une ombre ? Ou votre œil est-il douloureux ou rouge ?' },
      { from: 'patient', text: 'Non, pas ça. Juste tout est flou, et ces lumières le soir.' },
      {
        from: 'bot',
        text: 'Merci. Je vous inscris à la consultation cataracte, avec un peu plus de temps pour les gouttes. Vous recevrez un court questionnaire pour préparer votre visite. Ne venez pas en voiture vous-même : après les gouttes, votre vue sera floue pendant quelques heures.',
      },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié à la consultation cataracte (long créneau, dilatation) : vue progressivement floue, aucun signal d’alerte',
    advice: 'Conseil donné : ne pas conduire soi-même',
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

export function OphthalmologyVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 71 05</span>
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
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-[#E9FFF7] px-3 py-2.5 text-[12px]">
              <span className="flex items-start gap-2.5">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                  className="mt-0.5 w-4 h-4 rounded-full bg-[#37C18D] text-white flex items-center justify-center shrink-0"
                >
                  <Check size={10} color="#fff" />
                </motion.span>
                <span>{c.task}</span>
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 ml-[26px] inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium text-[#4E5670] ring-1 ring-[#E8EAEC]"
              >
                <AppIcon name="eye" size={11} color={APP.darkGrey} />
                {c.advice}
              </motion.span>
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
                <PatientAvatar initials="PL" size={18} />
                P. Lens
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
/* 5 · Scribe: visual acuity, slit lamp and biometry in the note       */
/* ------------------------------------------------------------------ */

type NoteSection = { title: string; text: string; clamp: boolean; grid?: { head: string[]; rows: string[][] } };

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
    template: 'Oogheelkunde',
    templates: ['Cataract', 'Medische retina', 'Glaucoom', 'Cornea'],
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
      { who: 'doctor', text: 'Uw rechterlens is duidelijk troebel, dat verklaart de verblinding. Uw netvlies en macula zien er goed uit, ook geen tekens van diabetes in het oog.' },
      { who: 'patient', text: 'Dus een operatie helpt?' },
      { who: 'doctor', text: 'Ja. We beginnen met rechts. U neemt Omic voor de prostaat: dat mag u gewoon blijven nemen, wij houden er rekening mee tijdens de ingreep.' },
      { who: 'patient', text: 'Goed. En kan ik daarna zonder bril?' },
      { who: 'doctor', text: 'Voor de verte meestal wel. Voor de krant blijft een leesbril nodig.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Geleidelijk wazig zicht OD > OS sinds acht maanden. Verwezen door dr. Claes wegens vermoeden van cataract. Verblinding door tegenliggers, halo’s, kleuren doffer. Rijdt ’s avonds niet meer sinds twee maanden. Lezen moeizaam ondanks nieuwe bril (zes maanden geleden). Geen vervormd zien, flitsen, vlekken, pijn of rood oog. DM2 (HbA1c 6,9%), HT, hypercholesterolemie, BPH. Medicatie o.a. tamsulosine 0,4 mg en Asaflow 80 mg. Geen anticoagulantia, geen allergieën.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Refractie OD S −0,50 C −0,50 × 90 (vroeger S +1,00, myope verschuiving), OS S +0,75 C −0,25 × 85. Spleetlamp: cornea helder, voorkamer diep en rustig, iris normaal. Nucleaire cataract OD graad 3 (LOCS III NO3 NC3), OS graad 2. Pupil na dilatatie OD 6 mm. Fundus: papil vitaal, C/D 0,3 ODS, macula zonder afwijkingen, geen diabetische retinopathie, periferie aanliggend.',
        clamp: true,
        grid: {
          head: ['', 'OD', 'OS'],
          rows: [
            ['Visus sc', '3/10', '6/10'],
            ['Visus cc', '4/10', '7/10'],
            ['Oogdruk', '16 mmHg', '17 mmHg'],
          ],
        },
      },
      {
        title: 'Aanvullende onderzoeken',
        text: 'OCT macula: normaal foveaal profiel ODS, geen oedeem. Biometrie OD: axiale lengte 23,4 mm, K1 43,50 D, K2 44,00 D, voorkamerdiepte 2,9 mm. Lens +21,5 D monofocaal, refractiedoel −0,25.',
        clamp: true,
      },
      {
        title: 'Diagnose',
        text: 'Seniele nucleaire cataract ODS, OD > OS, met functionele hinder. DM2 zonder diabetische retinopathie. Tamsulosine: risico op intraoperatief floppy-irissyndroom.',
        clamp: false,
      },
      {
        title: 'Beleid',
        text: 'Phaco-emulsificatie met monofocaal lensimplant +21,5 D OD in dagopname, onder druppelverdoving. IFIS-voorzorgen: intracamerale mydriatica, irishaakjes klaar. Tamsulosine niet stoppen, Asaflow loopt door. Na de ingreep Tobradex 4× per dag, afbouwend over vier weken, en Yellox 2× per dag gedurende vier weken. Controle dag 1 en week 1. OS vier tot zes weken later, na evaluatie. Nieuwe leesbril vier weken na het tweede oog. Vangnet: dringend bellen bij toenemende pijn, rood oog, zicht dat achteruitgaat, flitsen of een schaduw. Opvolging met Catquest-9SF.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '03-05-1955'],
      ['Vragenlijst', 'Cataract'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Ophthalmology',
    templates: ['Cataract', 'Medical retina', 'Glaucoma', 'Cornea'],
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
      { who: 'doctor', text: 'Your right lens is clearly cloudy, which explains the glare. Your retina and macula look good, and there are no signs of diabetes in the eye.' },
      { who: 'patient', text: 'So an operation will help?' },
      { who: 'doctor', text: 'Yes. We’ll start with the right eye. You take Omic for your prostate: you can simply keep taking it, we’ll take it into account during the procedure.' },
      { who: 'patient', text: 'Good. And will I manage without glasses afterwards?' },
      { who: 'doctor', text: 'For distance, usually yes. For the newspaper you’ll still need reading glasses.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Gradually blurred vision OD > OS for eight months. Referred by Dr Claes for suspected cataract. Glare from oncoming headlights, halos, duller colours. Has not driven in the evening for two months. Reading difficult despite new glasses (six months ago). No distortion, flashes, floaters, pain or red eye. T2DM (HbA1c 6.9%), hypertension, hypercholesterolaemia, BPH. Medication includes tamsulosin 0.4 mg and Asaflow 80 mg. No anticoagulants, no allergies.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Refraction OD S −0.50 C −0.50 × 90 (previously S +1.00, myopic shift), OS S +0.75 C −0.25 × 85. Slit lamp: cornea clear, anterior chamber deep and quiet, iris normal. Nuclear cataract OD grade 3 (LOCS III NO3 NC3), OS grade 2. Pupil after dilation OD 6 mm. Fundus: healthy disc, C/D 0.3 OU, macula unremarkable, no diabetic retinopathy, periphery flat.',
        clamp: true,
        grid: {
          head: ['', 'OD', 'OS'],
          rows: [
            ['VA unaided', '3/10', '6/10'],
            ['VA corrected', '4/10', '7/10'],
            ['IOP', '16 mmHg', '17 mmHg'],
          ],
        },
      },
      {
        title: 'Further investigations',
        text: 'Macular OCT: normal foveal profile OU, no oedema. Biometry OD: axial length 23.4 mm, K1 43.50 D, K2 44.00 D, anterior chamber depth 2.9 mm. Lens +21.5 D monofocal, refractive target −0.25.',
        clamp: true,
      },
      {
        title: 'Diagnosis',
        text: 'Age-related nuclear cataract OU, OD > OS, with functional impairment. T2DM without diabetic retinopathy. Tamsulosin: risk of intraoperative floppy iris syndrome.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Phacoemulsification with monofocal lens implant +21.5 D OD as a day case, under topical anaesthesia. IFIS precautions: intracameral mydriatics, iris hooks ready. Do not stop tamsulosin, Asaflow continues. After the procedure Tobradex 4 times a day, tapering over four weeks, and Yellox twice a day for four weeks. Check on day 1 and at week 1. OS four to six weeks later, after evaluation. New reading glasses four weeks after the second eye. Safety net: call urgently with increasing pain, a red eye, worsening vision, flashes or a shadow. Follow-up with the Catquest-9SF.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '03-05-1955'],
      ['Questionnaire', 'Cataract'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Ophtalmologie',
    templates: ['Cataracte', 'Rétine médicale', 'Glaucome', 'Cornée'],
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
    patient: 'Patient',
    lines: [
      { who: 'doctor', text: 'Votre cristallin droit est nettement opacifié, ce qui explique l’éblouissement. Votre rétine et votre macula sont belles, et il n’y a aucun signe de diabète dans l’œil.' },
      { who: 'patient', text: 'Donc une opération va aider ?' },
      { who: 'doctor', text: 'Oui. Nous commençons par l’œil droit. Vous prenez de l’Omic pour la prostate : vous pouvez continuer à le prendre, nous en tenons compte pendant l’intervention.' },
      { who: 'patient', text: 'Bien. Et je pourrai me passer de lunettes ensuite ?' },
      { who: 'doctor', text: 'De loin, en général oui. Pour le journal, il vous faudra encore des lunettes de lecture.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Baisse progressive de l’acuité visuelle OD > OG depuis huit mois. Adressé par le Dr Claes pour suspicion de cataracte. Éblouissement par les phares, halos, couleurs ternes. Ne conduit plus le soir depuis deux mois. Lecture difficile malgré de nouvelles lunettes (il y a six mois). Pas de métamorphopsies, d’éclairs, de mouches volantes, de douleur ni d’œil rouge. DT2 (HbA1c 6,9 %), HTA, hypercholestérolémie, HBP. Traitement notamment tamsulosine 0,4 mg et Asaflow 80 mg. Pas d’anticoagulants, pas d’allergies.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Réfraction OD S −0,50 C −0,50 × 90 (auparavant S +1,00, myopisation), OG S +0,75 C −0,25 × 85. Lampe à fente : cornée claire, chambre antérieure profonde et calme, iris normal. Cataracte nucléaire OD grade 3 (LOCS III NO3 NC3), OG grade 2. Pupille après dilatation OD 6 mm. Fond d’œil : papille saine, C/D 0,3 ODG, macula sans particularité, pas de rétinopathie diabétique, périphérie à plat.',
        clamp: true,
        grid: {
          head: ['', 'OD', 'OG'],
          rows: [
            ['AV sc', '3/10', '6/10'],
            ['AV cc', '4/10', '7/10'],
            ['PIO', '16 mmHg', '17 mmHg'],
          ],
        },
      },
      {
        title: 'Examens complémentaires',
        text: 'OCT maculaire : profil fovéolaire normal ODG, pas d’œdème. Biométrie OD : longueur axiale 23,4 mm, K1 43,50 D, K2 44,00 D, profondeur de chambre antérieure 2,9 mm. Implant +21,5 D monofocal, cible réfractive −0,25.',
        clamp: true,
      },
      {
        title: 'Diagnostic',
        text: 'Cataracte nucléaire sénile ODG, OD > OG, avec gêne fonctionnelle. DT2 sans rétinopathie diabétique. Tamsulosine : risque de syndrome de l’iris flasque peropératoire.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Phacoémulsification avec implant monofocal +21,5 D OD en hôpital de jour, sous anesthésie topique. Précautions IFIS : mydriatiques intracamérulaires, crochets à iris prêts. Ne pas arrêter la tamsulosine, l’Asaflow est poursuivi. Après l’intervention, Tobradex 4× par jour en diminution sur quatre semaines, et Yellox 2× par jour pendant quatre semaines. Contrôle à J1 et à la semaine 1. OG quatre à six semaines plus tard, après évaluation. Nouvelles lunettes de lecture quatre semaines après le deuxième œil. Filet de sécurité : appeler en urgence en cas de douleur croissante, d’œil rouge, de baisse de la vue, d’éclairs ou d’une ombre. Suivi avec le Catquest-9SF.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '03-05-1955'],
      ['Questionnaire', 'Cataracte'],
      ['Langue', 'Français'],
    ],
  },
};

export function OphthalmologyScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–5 transcript lines while recording, 6 generating, 7 note ready
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<PaulTitle back={c.back} />}>
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
                {/* Diagnosis and plan in full first; the rest shortened until "Show full note". Visual acuity and IOP stay visible as an OD / OS grid. */}
                {[...c.sections.filter((s) => !s.clamp), ...c.sections.filter((s) => s.clamp)].map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{section.title}</p>
                    {section.grid && <EyeGrid head={section.grid.head} rows={section.grid.rows} />}
                    <p className={`text-[12.5px] leading-relaxed ${section.grid ? 'mt-1.5' : ''} ${section.clamp && !full ? 'line-clamp-1 text-[#4E5670]' : ''}`}>{section.text}</p>
                  </motion.div>
                ))}
                <button type="button" onClick={() => setFull((f) => !f)} className="self-start px-1 text-[12px] font-medium text-[#06ACC1] hover:underline">
                  {full ? c.less : c.more}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title="Paul Lens" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: the tamsulosin he forgot, for the operation         */
/* ------------------------------------------------------------------ */

const SCHEDULE_ROWS = {
  nl: [
    ['Metformax 850 mg tabletten', "1 tablet 's ochtends en 's avonds, bij de maaltijd"],
    ['Amlor 5 mg tabletten', "1 tablet 's ochtends"],
    ['Atorvastatine EG 20 mg filmomhulde tabletten', "1 tablet 's avonds"],
    ['Omic 0,4 mg capsules met gereguleerde afgifte', '1 capsule na het ontbijt'],
    ['Asaflow 80 mg maagsapresistente tabletten', "1 tablet 's middags"],
  ] as [string, string][],
};

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 5 geneesmiddelen gevonden:',
    confirm: 'Ja, klopt. De Omic was ik vergeten, maar dat is voor de plas, niet voor de ogen.',
    followUps: [
      { question: 'Genoteerd, dat is goed om te weten voor de arts. Neemt u naast Asaflow nog andere bloedverdunners, zoals Marevan, Xarelto, Eliquis of Plavix?', choices: ['Ja', 'Nee'], answer: 'Nee' },
      { question: 'Gebruikt u oogdruppels?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    ],
    schedule: { header: 'Apotheek De Vaart · Medicatieschema · P. Lens, ° 03-05-1955', rows: SCHEDULE_ROWS.nl },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× per dag, bij de maaltijd', indication: 'Diabetes type 2' },
      { name: 'Amlor', strength: '5 mg', substance: 'Amlodipine', frequency: "1× per dag, 's ochtends", indication: 'Hoge bloeddruk' },
      { name: 'Atorvastatine EG', strength: '20 mg', substance: 'Atorvastatine', frequency: "1× per dag, 's avonds", indication: 'Cholesterol' },
      {
        name: 'Omic',
        strength: '0,4 mg',
        substance: 'Tamsulosine',
        frequency: '1× per dag, na het ontbijt',
        indication: 'Prostaat (plasklachten)',
        tag: { label: 'Let op voor de ingreep', tone: 'amber' },
      },
      { name: 'Asaflow', strength: '80 mg', substance: 'Acetylsalicylzuur', frequency: "1× per dag, 's middags", indication: 'Plaatjesremmer' },
    ],
    notes: [
      { label: 'Let op voor de ingreep', value: 'Tamsulosine (alfablokker): risico op floppy iris. Niet stoppen', tone: 'warn' },
      { label: 'Bloedverdunners', value: 'Geen anticoagulantia (bevestigd in de chat). Plaatjesremmer Asaflow 80 mg', tone: 'ok' },
      { label: 'Oogdruppels', value: 'Geen' },
      { label: 'Allergieën', value: 'Geen' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 5 medicines:',
    confirm: 'Yes, that’s right. I’d forgotten the Omic, but that’s for my waterworks, not for my eyes.',
    followUps: [
      { question: 'Noted, that’s good for the doctor to know. Besides Asaflow, do you take any other blood thinners, such as Marevan, Xarelto, Eliquis or Plavix?', choices: ['Yes', 'No'], answer: 'No' },
      { question: 'Do you use eye drops?', choices: ['Yes', 'No'], answer: 'No' },
    ],
    schedule: { header: 'Apotheek De Vaart · Medication schedule · P. Lens, b. 03-05-1955', rows: SCHEDULE_ROWS.nl },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformin', frequency: 'Twice a day, with meals', indication: 'Type 2 diabetes' },
      { name: 'Amlor', strength: '5 mg', substance: 'Amlodipine', frequency: 'Once a day, in the morning', indication: 'High blood pressure' },
      { name: 'Atorvastatine EG', strength: '20 mg', substance: 'Atorvastatin', frequency: 'Once a day, in the evening', indication: 'Cholesterol' },
      {
        name: 'Omic',
        strength: '0.4 mg',
        substance: 'Tamsulosin',
        frequency: 'Once a day, after breakfast',
        indication: 'Prostate (urinary symptoms)',
        tag: { label: 'Note for the procedure', tone: 'amber' },
      },
      { name: 'Asaflow', strength: '80 mg', substance: 'Acetylsalicylic acid', frequency: 'Once a day, at midday', indication: 'Antiplatelet' },
    ],
    notes: [
      { label: 'Note for the procedure', value: 'Tamsulosin (alpha blocker): risk of floppy iris. Do not stop', tone: 'warn' },
      { label: 'Blood thinners', value: 'No anticoagulants (confirmed in the chat). Antiplatelet Asaflow 80 mg', tone: 'ok' },
      { label: 'Eye drops', value: 'None' },
      { label: 'Allergies', value: 'None' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 5 médicaments :',
    confirm: 'Oui, c’est exact. J’avais oublié l’Omic, mais c’est pour uriner, pas pour les yeux.',
    followUps: [
      { question: 'C’est noté, c’est bon à savoir pour le médecin. En plus de l’Asaflow, prenez-vous d’autres anticoagulants, comme Marevan, Xarelto, Eliquis ou Plavix ?', choices: ['Oui', 'Non'], answer: 'Non' },
      { question: 'Utilisez-vous des gouttes pour les yeux ?', choices: ['Oui', 'Non'], answer: 'Non' },
    ],
    schedule: { header: 'Apotheek De Vaart · Schéma de médication · P. Lens, né le 03-05-1955', rows: SCHEDULE_ROWS.nl },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× par jour, au repas', indication: 'Diabète de type 2' },
      { name: 'Amlor', strength: '5 mg', substance: 'Amlodipine', frequency: '1× par jour, le matin', indication: 'Hypertension' },
      { name: 'Atorvastatine EG', strength: '20 mg', substance: 'Atorvastatine', frequency: '1× par jour, le soir', indication: 'Cholestérol' },
      {
        name: 'Omic',
        strength: '0,4 mg',
        substance: 'Tamsulosine',
        frequency: '1× par jour, après le petit-déjeuner',
        indication: 'Prostate (troubles urinaires)',
        tag: { label: 'Attention pour l’intervention', tone: 'amber' },
      },
      { name: 'Asaflow', strength: '80 mg', substance: 'Acide acétylsalicylique', frequency: '1× par jour, à midi', indication: 'Antiagrégant plaquettaire' },
    ],
    notes: [
      { label: 'Attention pour l’intervention', value: 'Tamsulosine (alphabloquant) : risque d’iris flasque. Ne pas arrêter', tone: 'warn' },
      { label: 'Anticoagulants', value: 'Pas d’anticoagulants (confirmé dans le chat). Antiagrégant Asaflow 80 mg', tone: 'ok' },
      { label: 'Collyres', value: 'Aucun' },
      { label: 'Allergies', value: 'Aucune' },
    ],
  },
});

export function OphthalmologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Paul Lens', initials: 'PL', dob: '03-05-1955', color: PAUL }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, day-case request, eye drops                  */
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
    ifis: 'IFIS-voorzorgen (tamsulosine)',
    ifisSource: 'Uit de medicatiefoto',
    templates: [
      { label: 'Consultatieverslag', description: 'Sjabloon Oogheelkunde, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Aanvraag dagopname', description: 'Cataractoperatie rechts, lens +21,5 D, IFIS-voorzorgen' },
      { label: 'Voorschrift oogdruppels', description: 'Tobradex en Yellox voor na de operatie' },
      { label: 'Druppelschema voor de patiënt', description: 'Welke druppel, hoe vaak, vier weken afbouwend' },
      { label: 'Informatie en toestemming', description: 'Uitleg over de cataractoperatie en toestemmingsformulier' },
    ],
    previews: [
      'Diagnose: seniele nucleaire cataract ODS, OD > OS, met functionele hinder. Visus cc OD 4/10, OS 7/10. Beleid: phaco-emulsificatie met monofocaal lensimplant +21,5 D OD in dagopname.',
      'Geachte collega, ik zag uw patiënt de heer Lens voor geleidelijk wazig zicht, rechts meer dan links. Er is een nucleaire cataract beiderzijds, rechts graad 3, zonder diabetische retinopathie. We plannen een cataractoperatie rechts met lensimplant, het linkeroog volgt later.',
      'Dagopname voor phaco-emulsificatie OD met monofocaal lensimplant +21,5 D, refractiedoel −0,25, onder druppelverdoving. Intracamerale mydriatica en irishaakjes klaar.',
      'Tobradex oogdruppels OD, 4× per dag, afbouwend over vier weken. Yellox oogdruppels OD, 2× per dag gedurende vier weken.',
      '',
      '',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënt Paul Lens, geboren op 3 mei 1955, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens vermoeden van cataract. Geleidelijk wazig zicht sinds acht maanden, rechts meer dan links.'],
        [
          'Anamnese',
          'Geleidelijk wazig zicht, verblinding door tegenliggers en halo’s rond lichten. Rijdt sinds twee maanden niet meer ’s avonds. Kleuren doffer, lezen moeizaam ondanks een nieuwe bril van zes maanden geleden. Geen vervormd zien, flitsen, vlekken, pijn of rood oog. Diabetes type 2 (HbA1c 6,9%), hypertensie, hypercholesterolemie, goedaardige prostaatvergroting. Medicatie: metformine 850 mg 2× per dag, amlodipine 5 mg, atorvastatine 20 mg, tamsulosine 0,4 mg, acetylsalicylzuur 80 mg. Geen allergieën. Geen anticoagulantia.',
        ],
        [
          'Klinisch onderzoek',
          'Visus met correctie OD 4/10, OS 7/10. Myope verschuiving rechts (S −0,50 C −0,50 × 90, vroeger S +1,00). Oogdruk 16 en 17 mmHg. Cornea helder, voorkamer diep en rustig. Nucleaire cataract graad 3 rechts, graad 2 links. Beperkte pupildilatatie rechts. Fundus: papil vitaal, macula zonder afwijkingen, geen diabetische retinopathie.',
        ],
        ['Aanvullende onderzoeken', 'OCT macula: normaal foveaal profiel beiderzijds, geen oedeem. Biometrie rechts: axiale lengte 23,4 mm, berekende lenssterkte +21,5 D.'],
        ['Diagnose', 'Seniele nucleaire cataract beiderzijds, rechts meer dan links, met functionele hinder. Diabetes type 2 zonder diabetische retinopathie.'],
        [
          'Beleid',
          'We plannen een cataractoperatie rechts met lensimplant in dagopname, onder druppelverdoving. Door de tamsulosine is er een risico op een slappe iris tijdens de ingreep; we nemen daar de nodige voorzorgen voor. De tamsulosine en de acetylsalicylzuur mogen gewoon doorlopen. Na de operatie gebruikt hij vier weken oogdruppels volgens schema. Het linkeroog volgt vier tot zes weken later. Hij weet dat hij dringend moet bellen bij toenemende pijn, een rood oog, achteruitgang van het zicht, lichtflitsen of een schaduw.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, oogarts',
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
    ifis: 'IFIS precautions (tamsulosin)',
    ifisSource: 'From the medication photo',
    templates: [
      { label: 'Consultation report', description: 'Ophthalmology template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Day-case request', description: 'Cataract surgery right eye, lens +21.5 D, IFIS precautions' },
      { label: 'Eye-drop prescription', description: 'Tobradex and Yellox for after the operation' },
      { label: 'Drop schedule for the patient', description: 'Which drop, how often, tapering over four weeks' },
      { label: 'Information and consent', description: 'Explanation of cataract surgery and consent form' },
    ],
    previews: [
      'Diagnosis: age-related nuclear cataract OU, OD > OS, with functional impairment. Corrected VA OD 4/10, OS 7/10. Plan: phacoemulsification with monofocal lens implant +21.5 D OD as a day case.',
      'Dear colleague, I saw your patient Mr Lens for gradually blurred vision, right more than left. There is a nuclear cataract in both eyes, grade 3 on the right, without diabetic retinopathy. We are planning cataract surgery on the right eye with a lens implant; the left eye will follow later.',
      'Day-case admission for phacoemulsification OD with monofocal lens implant +21.5 D, refractive target −0.25, under topical anaesthesia. Intracameral mydriatics and iris hooks ready.',
      'Tobradex eye drops OD, 4 times a day, tapering over four weeks. Yellox eye drops OD, twice a day for four weeks.',
      '',
      '',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Paul Lens, born on 3 May 1955, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for suspected cataract. Gradually blurred vision for eight months, right more than left.'],
        [
          'History',
          'Gradually blurred vision, glare from oncoming headlights and halos around lights. Has not driven in the evening for two months. Duller colours, reading difficult despite new glasses six months ago. No distortion, flashes, floaters, pain or red eye. Type 2 diabetes (HbA1c 6.9%), hypertension, hypercholesterolaemia, benign prostatic enlargement. Medication: metformin 850 mg twice a day, amlodipine 5 mg, atorvastatin 20 mg, tamsulosin 0.4 mg, acetylsalicylic acid 80 mg. No allergies. No anticoagulants.',
        ],
        [
          'Clinical examination',
          'Corrected visual acuity OD 4/10, OS 7/10. Myopic shift on the right (S −0.50 C −0.50 × 90, previously S +1.00). Intraocular pressure 16 and 17 mmHg. Cornea clear, anterior chamber deep and quiet. Nuclear cataract grade 3 on the right, grade 2 on the left. Limited pupil dilation on the right. Fundus: healthy disc, macula unremarkable, no diabetic retinopathy.',
        ],
        ['Further investigations', 'Macular OCT: normal foveal profile in both eyes, no oedema. Biometry right eye: axial length 23.4 mm, calculated lens power +21.5 D.'],
        ['Diagnosis', 'Age-related nuclear cataract in both eyes, right more than left, with functional impairment. Type 2 diabetes without diabetic retinopathy.'],
        [
          'Plan',
          'We are planning cataract surgery on the right eye with a lens implant as a day case, under topical anaesthesia. Because of the tamsulosin there is a risk of a floppy iris during the procedure; we will take the necessary precautions. The tamsulosin and the acetylsalicylic acid can simply continue. After the operation he will use eye drops for four weeks according to a schedule. The left eye will follow four to six weeks later. He knows to call urgently with increasing pain, a red eye, worsening vision, flashes of light or a shadow.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, ophthalmologist',
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
    ifis: 'Précautions IFIS (tamsulosine)',
    ifisSource: 'Issu de la photo des médicaments',
    templates: [
      { label: 'Rapport de consultation', description: 'Modèle Ophtalmologie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Demande d’hôpital de jour', description: 'Opération de la cataracte œil droit, implant +21,5 D, précautions IFIS' },
      { label: 'Prescription de collyres', description: 'Tobradex et Yellox pour après l’opération' },
      { label: 'Schéma de gouttes pour le patient', description: 'Quelle goutte, à quelle fréquence, dégressif sur quatre semaines' },
      { label: 'Information et consentement', description: 'Explication de l’opération de la cataracte et formulaire de consentement' },
    ],
    previews: [
      'Diagnostic : cataracte nucléaire sénile ODG, OD > OG, avec gêne fonctionnelle. AV cc OD 4/10, OG 7/10. Plan : phacoémulsification avec implant monofocal +21,5 D OD en hôpital de jour.',
      'Cher confrère, j’ai vu votre patient M. Lens pour une baisse progressive de la vue, à droite plus qu’à gauche. Il présente une cataracte nucléaire bilatérale, de grade 3 à droite, sans rétinopathie diabétique. Nous prévoyons une opération de la cataracte de l’œil droit avec implant ; l’œil gauche suivra plus tard.',
      'Hôpital de jour pour phacoémulsification OD avec implant monofocal +21,5 D, cible réfractive −0,25, sous anesthésie topique. Mydriatiques intracamérulaires et crochets à iris prêts.',
      'Collyre Tobradex OD, 4× par jour, dégressif sur quatre semaines. Collyre Yellox OD, 2× par jour pendant quatre semaines.',
      '',
      '',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patient Paul Lens, né le 3 mai 1955, que j’ai vu récemment en consultation.',
      sections: [
        ['Motif de contact', 'Adressé pour suspicion de cataracte. Baisse progressive de la vue depuis huit mois, à droite plus qu’à gauche.'],
        [
          'Anamnèse',
          'Baisse progressive de la vue, éblouissement par les phares et halos autour des lumières. Ne conduit plus le soir depuis deux mois. Couleurs plus ternes, lecture difficile malgré de nouvelles lunettes il y a six mois. Pas de vision déformée, d’éclairs, de mouches volantes, de douleur ni d’œil rouge. Diabète de type 2 (HbA1c 6,9 %), hypertension, hypercholestérolémie, hypertrophie bénigne de la prostate. Traitement : metformine 850 mg 2× par jour, amlodipine 5 mg, atorvastatine 20 mg, tamsulosine 0,4 mg, acide acétylsalicylique 80 mg. Pas d’allergies. Pas d’anticoagulants.',
        ],
        [
          'Examen clinique',
          'Acuité visuelle corrigée OD 4/10, OG 7/10. Myopisation à droite (S −0,50 C −0,50 × 90, auparavant S +1,00). Pression oculaire 16 et 17 mmHg. Cornée claire, chambre antérieure profonde et calme. Cataracte nucléaire grade 3 à droite, grade 2 à gauche. Dilatation pupillaire limitée à droite. Fond d’œil : papille saine, macula sans particularité, pas de rétinopathie diabétique.',
        ],
        ['Examens complémentaires', 'OCT maculaire : profil fovéolaire normal des deux côtés, pas d’œdème. Biométrie droite : longueur axiale 23,4 mm, puissance d’implant calculée +21,5 D.'],
        ['Diagnostic', 'Cataracte nucléaire sénile bilatérale, à droite plus qu’à gauche, avec gêne fonctionnelle. Diabète de type 2 sans rétinopathie diabétique.'],
        [
          'Plan',
          'Nous prévoyons une opération de la cataracte de l’œil droit avec implant en hôpital de jour, sous anesthésie topique. En raison de la tamsulosine, il existe un risque d’iris flasque pendant l’intervention ; nous prenons les précautions nécessaires. La tamsulosine et l’acide acétylsalicylique peuvent être poursuivis. Après l’opération, il utilisera des gouttes pendant quatre semaines selon un schéma. L’œil gauche suivra quatre à six semaines plus tard. Il sait qu’il doit appeler en urgence en cas de douleur croissante, d’œil rouge, de baisse de la vue, d’éclairs lumineux ou d’une ombre.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, ophtalmologue',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;
const ADMISSION = 2;

export function OphthalmologyDocumentDemo() {
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

  // Report, day-case request and eye-drop prescription generate after the consultation; the letter lands on top, as the
  // end frame. The drop schedule and the consent form wait until the visitor generates them.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(ADMISSION), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<PaulTitle />}>
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
                      <span className="block text-[11.5px] text-[#4E5670] leading-snug">{c.previews[i] || c.templates[i].description}</span>
                    )}
                    {i === ADMISSION && (
                      // The precaution the medication photo brought to light, with where it came from.
                      <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF6E8] px-2 py-0.5 font-semibold text-[#C2410C] ring-1 ring-[#F59E0C]/40">
                          <AppIcon name="exclamation-triangle" size={10} color="#C2410C" />
                          {c.ifis}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10.5px] text-[#949CB1]">
                          <AppIcon name="camera" size={11} color={APP.darkGrey} />
                          {c.ifisSource}
                        </span>
                      </span>
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
/* 8 · Follow-up: U. Uvea raises an alert, Paul one month on           */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; paul?: boolean; items: Questionnaire[] };

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
    moments: [string, string, string];
    exampleData: string;
    catquest: string;
    acuity: string;
    acuityBy: string;
    eyes: [string, string];
    acuityValues: [string, string, string][];
    life: [string, string, string, string][];
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
      ['U. Uvea', 'Cataractoperatie links · dag 3'],
      ['P. Lens', 'Cataractoperatie rechts · maand 1 · vragenlijst ingevuld'],
      ['K. Kapsel', 'YAG-laser · week 1'],
      ['S. Sclera', 'Cataractoperatie links · maand 3 · Catquest-9SF ingevuld'],
    ],
    alert: 'Meldt toenemende pijn, een rood linkeroog en zicht dat sinds gisteren achteruitgaat, drie dagen na de cataractoperatie. Secretariaat geeft vandaag nog een plaats.',
    detail: 'P. Lens · cataractoperatie rechts',
    checkin: 'Check-in maand 1 na de operatie rechts',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met het zicht in uw rechteroog sinds de operatie?' },
      { from: 'patient', text: 'Veel beter. De kleuren zijn terug, alles is witter. Maar het verschil met mijn linkeroog is nu groot, dat is vreemd bij het lezen.' },
      { from: 'bot', text: "Dank u. Rijdt u 's avonds weer met de auto?" },
      { from: 'patient', text: 'Een kort stukje, op een weg die ik ken. Links verblinden de lichten nog.' },
      { from: 'bot', text: 'Heeft u pijn, een rood oog, lichtflitsen of een schaduw gemerkt?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
      { from: 'bot', text: 'Wilt u dat de arts het linkeroog ook bespreekt?' },
      { from: 'patient', text: 'Ja, graag zo snel mogelijk.' },
    ],
    scores: 'Catquest-9SF',
    lowerBetter: 'lager = beter',
    moments: ['Baseline', 'Maand 1 na OD', 'Maand 3 na OS'],
    exampleData: 'Voorbeelddata',
    catquest: 'Rasch-score',
    acuity: 'Visus met correctie',
    acuityBy: 'door de arts gemeten, hoger = beter',
    eyes: ['OD', 'OS'],
    acuityValues: [
      ['4/10', '9/10', '10/10'],
      ['7/10', '7/10', '9/10'],
    ],
    life: [
      ["Verblinding 's avonds", 'Sterk', 'Rechts weg, links nog', 'Weg'],
      ["Autorijden 's avonds", 'Gestopt', 'Kort, vertrouwd traject', 'Terug naar de kaartclub'],
      ['Lezen', 'Moeizaam', 'Beter met leesbril', 'Krant met nieuwe leesbril'],
      ['Houtbewerking', 'Maten aflezen lastig', 'Beter', 'Zonder moeite'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de arts kiest. Kiest hij voor afwachten met een aangepaste bril, of later voor een YAG-laser, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Afwachten met aangepaste bril',
        items: [{ moment: 'Maand 6 en 12', name: 'Opvolging beginnende cataract', asks: 'Catquest-9SF, verblinding, rijden, lezen, rode vlaggen' }],
      },
      {
        name: 'Cataractoperatie',
        paul: true,
        items: [
          { moment: 'Dag 1', name: 'Controle na de operatie', asks: 'Pijn, rood oog, zicht, druppels gestart, flitsen of schaduw', current: true },
          { moment: 'Week 1', name: 'Druppels en herstel', asks: 'Druppelschema gevolgd, zicht, prikken, rode vlaggen', current: true },
          { moment: 'Maand 1', name: 'Herstel eerste oog', asks: 'Zicht, verschil met het andere oog, rijden, lezen, wens tweede oog, open vragen', current: true },
          { moment: 'Maand 3 na het tweede oog', name: 'Uitkomst cataractoperatie', asks: 'Catquest-9SF, EQ-5D-5L, bril nog nodig, tevredenheid, PREM', current: true },
        ],
      },
      {
        name: 'YAG-laser (nastaar)',
        items: [{ moment: 'Week 1', name: 'Controle na YAG-laser', asks: 'Zicht, nieuwe vlekken of flitsen, schaduw' }],
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
      ['U. Uvea', 'Cataract surgery left eye · day 3'],
      ['P. Lens', 'Cataract surgery right eye · month 1 · questionnaire completed'],
      ['K. Kapsel', 'YAG laser · week 1'],
      ['S. Sclera', 'Cataract surgery left eye · month 3 · Catquest-9SF completed'],
    ],
    alert: 'Reports increasing pain, a red left eye and vision getting worse since yesterday, three days after cataract surgery. The secretariat is giving a slot today.',
    detail: 'P. Lens · cataract surgery right eye',
    checkin: 'Check-in month 1 after surgery on the right eye',
    chat: [
      { from: 'bot', text: 'How is the sight in your right eye since the operation?' },
      { from: 'patient', text: 'Much better. The colours are back, everything is whiter. But the difference with my left eye is big now, which is odd when reading.' },
      { from: 'bot', text: 'Thank you. Are you driving in the evening again?' },
      { from: 'patient', text: 'A short stretch, on a road I know. On the left the lights still dazzle me.' },
      { from: 'bot', text: 'Have you noticed any pain, a red eye, flashes of light or a shadow?' },
      { from: 'patient', text: 'No, none of that.' },
      { from: 'bot', text: 'Would you like the doctor to discuss the left eye as well?' },
      { from: 'patient', text: 'Yes, as soon as possible please.' },
    ],
    scores: 'Catquest-9SF',
    lowerBetter: 'lower = better',
    moments: ['Baseline', 'Month 1 after OD', 'Month 3 after OS'],
    exampleData: 'Example data',
    catquest: 'Rasch score',
    acuity: 'Corrected visual acuity',
    acuityBy: 'measured by the doctor, higher = better',
    eyes: ['OD', 'OS'],
    acuityValues: [
      ['4/10', '9/10', '10/10'],
      ['7/10', '7/10', '9/10'],
    ],
    life: [
      ['Glare in the evening', 'Severe', 'Gone on the right, still on the left', 'Gone'],
      ['Driving at night', 'Stopped', 'Short, familiar route', 'Back to the card club'],
      ['Reading', 'Difficult', 'Better with reading glasses', 'Newspaper with new reading glasses'],
      ['Woodworking', 'Hard to read measurements', 'Better', 'Effortless'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the doctor chooses. Whether it is watchful waiting with adjusted glasses, or later a YAG laser, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Watchful waiting with adjusted glasses',
        items: [{ moment: 'Months 6 and 12', name: 'Early cataract follow-up', asks: 'Catquest-9SF, glare, driving, reading, red flags' }],
      },
      {
        name: 'Cataract surgery',
        paul: true,
        items: [
          { moment: 'Day 1', name: 'Post-operative check', asks: 'Pain, red eye, vision, drops started, flashes or shadow', current: true },
          { moment: 'Week 1', name: 'Drops and recovery', asks: 'Drop schedule followed, vision, stinging, red flags', current: true },
          { moment: 'Month 1', name: 'Recovery of the first eye', asks: 'Vision, difference with the other eye, driving, reading, wish for the second eye, open questions', current: true },
          { moment: 'Month 3 after the second eye', name: 'Outcome of cataract surgery', asks: 'Catquest-9SF, EQ-5D-5L, glasses still needed, satisfaction, PREM', current: true },
        ],
      },
      {
        name: 'YAG laser (posterior capsule opacification)',
        items: [{ moment: 'Week 1', name: 'Check after YAG laser', asks: 'Vision, new floaters or flashes, shadow' }],
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
      ['U. Uvea', 'Opération de la cataracte œil gauche · jour 3'],
      ['P. Lens', 'Opération de la cataracte œil droit · mois 1 · questionnaire rempli'],
      ['K. Kapsel', 'Laser YAG · semaine 1'],
      ['S. Sclera', 'Opération de la cataracte œil gauche · mois 3 · Catquest-9SF rempli'],
    ],
    alert: 'Signale une douleur croissante, un œil gauche rouge et une vue qui baisse depuis hier, trois jours après l’opération de la cataracte. Le secrétariat donne une place aujourd’hui.',
    detail: 'P. Lens · opération de la cataracte œil droit',
    checkin: 'Suivi mois 1 après l’opération de l’œil droit',
    chat: [
      { from: 'bot', text: 'Comment va la vue de votre œil droit depuis l’opération ?' },
      { from: 'patient', text: 'Beaucoup mieux. Les couleurs sont revenues, tout est plus blanc. Mais la différence avec mon œil gauche est grande maintenant, c’est étrange pour lire.' },
      { from: 'bot', text: 'Merci. Conduisez-vous de nouveau le soir ?' },
      { from: 'patient', text: 'Un petit trajet, sur une route que je connais. À gauche, les lumières m’éblouissent encore.' },
      { from: 'bot', text: 'Avez-vous remarqué une douleur, un œil rouge, des éclairs lumineux ou une ombre ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
      { from: 'bot', text: 'Souhaitez-vous que le médecin discute aussi de l’œil gauche ?' },
      { from: 'patient', text: 'Oui, le plus vite possible.' },
    ],
    scores: 'Catquest-9SF',
    lowerBetter: 'plus bas = mieux',
    moments: ['Référence', 'Mois 1 après OD', 'Mois 3 après OG'],
    exampleData: 'Données d’exemple',
    catquest: 'Score de Rasch',
    acuity: 'Acuité visuelle corrigée',
    acuityBy: 'mesurée par le médecin, plus haut = mieux',
    eyes: ['OD', 'OG'],
    acuityValues: [
      ['4/10', '9/10', '10/10'],
      ['7/10', '7/10', '9/10'],
    ],
    life: [
      ['Éblouissement le soir', 'Fort', 'Disparu à droite, encore à gauche', 'Disparu'],
      ['Conduite le soir', 'Arrêtée', 'Court trajet connu', 'De retour au club de cartes'],
      ['Lecture', 'Difficile', 'Mieux avec lunettes de lecture', 'Le journal avec de nouvelles lunettes'],
      ['Menuiserie', 'Mesures difficiles à lire', 'Mieux', 'Sans effort'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le médecin. Surveillance avec des lunettes adaptées, ou plus tard un laser YAG : le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Surveillance avec lunettes adaptées',
        items: [{ moment: 'Mois 6 et 12', name: 'Suivi de cataracte débutante', asks: 'Catquest-9SF, éblouissement, conduite, lecture, signaux d’alerte' }],
      },
      {
        name: 'Opération de la cataracte',
        paul: true,
        items: [
          { moment: 'Jour 1', name: 'Contrôle après l’opération', asks: 'Douleur, œil rouge, vue, gouttes commencées, éclairs ou ombre', current: true },
          { moment: 'Semaine 1', name: 'Gouttes et récupération', asks: 'Schéma de gouttes suivi, vue, picotements, signaux d’alerte', current: true },
          { moment: 'Mois 1', name: 'Récupération du premier œil', asks: 'Vue, différence avec l’autre œil, conduite, lecture, souhait pour le deuxième œil, questions ouvertes', current: true },
          { moment: 'Mois 3 après le deuxième œil', name: 'Résultat de l’opération de la cataracte', asks: 'Catquest-9SF, EQ-5D-5L, lunettes encore nécessaires, satisfaction, PREM', current: true },
        ],
      },
      {
        name: 'Laser YAG (cataracte secondaire)',
        items: [{ moment: 'Semaine 1', name: 'Contrôle après laser YAG', asks: 'Vue, nouvelles mouches ou éclairs, ombre' }],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'UU', flag: true, date: '09-11-2026, 08:52' },
  { initials: 'PL', flag: false, date: '09-11-2026, 08:10' },
  { initials: 'KK', flag: false, date: '06-11-2026, 14:20' },
  { initials: 'SS', flag: false, date: '05-11-2026, 10:05' },
];
const PAUL_ROW = 1;
/** Catquest-9SF Rasch scores at baseline, month 1 after OD and month 3 after OS (sales' example data); lower is better. */
const CATQUEST = [0.8, -0.9, -2.1];
const CQ_MAX = 1.5;
const CQ_MIN = -3;
const fmt = (value: number, locale: SiteLocale) => (locale === 'en' ? value.toFixed(1) : value.toFixed(1).replace('.', ',')).replace('-', '−');

/** Catquest-9SF as a line over three measurements: baseline grey, the latest in Paul's colour; down is progress. */
function CatquestLine({ moments, locale, label }: { moments: string[]; locale: SiteLocale; label: string }) {
  const W = 300;
  const H = 120;
  const PAD_X = 30;
  const PAD_Y = 16;
  const x = (i: number) => PAD_X + (i * (W - PAD_X * 2)) / (CATQUEST.length - 1);
  const y = (v: number) => PAD_Y + ((CQ_MAX - v) / (CQ_MAX - CQ_MIN)) * (H - PAD_Y * 2);
  const path = CATQUEST.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${label}: ${CATQUEST.map((v) => fmt(v, locale)).join(' → ')}`}>
        {/* zero line, for orientation */}
        <line x1={PAD_X - 12} x2={W - PAD_X + 12} y1={y(0)} y2={y(0)} stroke="#E8EAEC" strokeDasharray="3 3" />
        <text x={PAD_X - 16} y={y(0) + 3} fontSize="9" fill="#949CB1" textAnchor="end">
          0
        </text>
        <motion.path d={path} fill="none" stroke={PAUL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }} />
        {CATQUEST.map((v, i) => {
          const first = i === 0;
          const last = i === CATQUEST.length - 1;
          return (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.4 }}>
              <circle cx={x(i)} cy={y(v)} r={last ? 5.5 : 4.5} fill={first ? '#D5D9E0' : last ? PAUL : '#fff'} stroke={first ? '#B7BDC8' : PAUL} strokeWidth={2} />
              <text x={x(i)} y={y(v) - 10} fontSize="10.5" fontWeight={last ? 700 : 500} fill={last ? PAUL : '#4E5670'} textAnchor="middle" className="tabular-nums">
                {fmt(v, locale)}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className="grid grid-cols-3 text-[10px] text-[#949CB1] text-center leading-tight -mt-1">
        {moments.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export function OphthalmologyFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  const locale = useLocale() as SiteLocale;
  // 1–4 screenings land (oldest first, newest on top), 5 U. Uvea's alert, 6 Paul's progress opens
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
              const paul = row.i === PAUL_ROW;
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
                  {paul ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'bg-[#E6F4F1]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
                      style={detailOpen ? { borderColor: `${PAUL}66` } : undefined}
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
                    <b>U. Uvea</b> · {c.alert}
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
                    <PatientAvatar initials="PL" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5"
              >
                {/* The month-1 check-in, in natural language */}
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

                {/* Catquest-9SF as a line (lower = better), visual acuity per eye beside it, then daily life */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <p className="text-[12.5px] font-semibold">
                      {c.scores} <span className="font-normal text-[#949CB1]">· {c.catquest}</span>
                    </p>
                    <span className="inline-flex items-center rounded-full bg-[#E9FFF7] px-2 py-0.5 text-[10.5px] font-semibold text-[#1F9E6E]">↓ {c.lowerBetter}</span>
                  </div>
                  <CatquestLine moments={c.moments} locale={locale} label={c.scores} />

                  <p className="mt-4 mb-0.5 text-[11.5px] font-semibold">
                    {c.acuity} <span className="font-normal text-[#949CB1]">· {c.acuityBy}</span>
                  </p>
                  <EyeGrid head={['', ...c.moments]} rows={c.acuityValues.map((values, i) => [c.eyes[i], ...values])} />

                  {/* Not only numbers: glare, driving at night, the newspaper and woodworking */}
                  <div className="mt-4 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                    {c.life.map(([label, before, month1, month3]) => (
                      <p key={label} className="grid grid-cols-[6.5rem_1fr] gap-2 py-1.5 text-[11px]">
                        <span className="text-[#949CB1]">{label}</span>
                        <span>
                          <span className="text-[#949CB1]">{before}</span> → <span>{month1}</span> → <b className="font-semibold">{month3}</b>
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.paul ? 'bg-[#E6F4F1]/70' : 'border-[#E8EAEC]'}`} style={treatment.paul ? { borderColor: `${PAUL}4D` } : undefined}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.paul && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#2C8C7A]/20">
                            <PatientAvatar initials="PL" size={12} />
                            Paul
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
