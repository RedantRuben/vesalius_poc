'use client';

/**
 * Module demos for the nephrology variant (source: sales, "Website-inhoud nefrologie", §7). Every page follows Luc Nefron
 * (64, warehouseman and pigeon fancier, type 2 diabetes and hypertension, eGFR 58 → 38 in two years with albuminuria)
 * one step further, from triage to bloods and ultrasound (CKD G3b A3), kidney protection with an SGLT2 inhibitor, stopping
 * the ibuprofen, and three months of follow-up; H. Bowman (cola-coloured urine, oedema, creatinine tripled) is the
 * recurring red flag and P. Papil raises the alert after a kidney biopsy. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Luc keeps one avatar colour on every page, so visitors recognise him. */
const LUC = '#4C5FA8';
const LUC_SOFT = '#EEF0FA';
/** Red flags (H. Bowman, P. Papil) share one red accent and the warning icon. */
const RED = APP.accent;
/** Referrals that stay with the nephrologists or go to a colleague, advice for the GP, and a report that is no red flag. */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };
const NEUTRAL = { text: '#6B7385', bg: '#F0F1F4' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'LN' ? LUC : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function LucTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="LN" size={24} />
        Luc Nefron
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: nephrology, a colleague, or advice to the GP      */
/* ------------------------------------------------------------------ */

type Referral = 'nephrology' | 'gpAdvice' | 'urology' | 'hypertension' | 'noFlag' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Colakleurige urine, gezwollen benen en een creatinine die verdrievoudigde in een maand. Secretariaat neemt vandaag contact op.',
    referrals: { nephrology: 'Nefrologie', gpAdvice: 'Advies huisarts', urology: 'Urologie', hypertension: 'Hypertensie', noFlag: 'Geen rode vlag' },
    rows: [
      'Colakleurige urine sinds tien dagen, gezwollen benen, creatinine van 1,1 naar 3,4 mg/dl in een maand',
      'eGFR 58 → 38 in twee jaar, UACR 420 mg/g, diabetes en hypertensie, labo als foto',
      '83 jaar, eGFR 52, drie jaar stabiel, geen eiwit in de urine',
      'Krampende flankpijn naar de lies, vroeger een niersteen',
      'Bloeddruk 162/98 ondanks drie middelen, laag kalium',
      "Dikkere enkels 's avonds na een warme dag, gewicht stabiel, niet kortademig",
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Cola-coloured urine, swollen legs and a creatinine that tripled in a month. The secretariat is getting in touch today.',
    referrals: { nephrology: 'Nephrology', gpAdvice: 'GP advice', urology: 'Urology', hypertension: 'Hypertension', noFlag: 'No red flag' },
    rows: [
      'Cola-coloured urine for ten days, swollen legs, creatinine from 1.1 to 3.4 mg/dl in a month',
      'eGFR 58 → 38 over two years, UACR 420 mg/g, diabetes and hypertension, bloods as a photo',
      '83 years old, eGFR 52, stable for three years, no protein in the urine',
      'Cramping flank pain radiating to the groin, previous kidney stone',
      'Blood pressure 162/98 despite three drugs, low potassium',
      'Swollen ankles in the evening after a hot day, weight stable, not breathless',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Urines couleur cola, jambes gonflées et une créatinine qui a triplé en un mois. Le secrétariat prend contact aujourd’hui.',
    referrals: { nephrology: 'Néphrologie', gpAdvice: 'Avis médecin traitant', urology: 'Urologie', hypertension: 'Hypertension', noFlag: 'Pas de signal d’alerte' },
    rows: [
      'Urines couleur cola depuis dix jours, jambes gonflées, créatinine de 1,1 à 3,4 mg/dl en un mois',
      'DFGe 58 → 38 en deux ans, RAC 420 mg/g, diabète et hypertension, biologie en photo',
      '83 ans, DFGe 52, stable depuis trois ans, pas de protéinurie',
      'Douleur crampoïde du flanc irradiant vers l’aine, antécédent de calcul rénal',
      'Tension 162/98 malgré trois médicaments, potassium bas',
      'Chevilles plus gonflées le soir après une journée chaude, poids stable, pas essoufflé',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'H. Bowman', initials: 'HB', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'L. Nefron', initials: 'LN', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'nephrology' },
  { name: 'C. Cortex', initials: 'CC', channel: 'chat', tasks: 1, status: 'COMPLETED', referral: 'gpAdvice' },
  { name: 'U. Ureter', initials: 'UU', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'urology' },
  { name: 'A. Renalis', initials: 'AR', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'hypertension' },
  { name: 'S. Tubulus', initials: 'ST', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'noFlag' },
];

// Advice to the GP in another colour: not every referral lands in the nephrologist's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = {
  nephrology: STAYS,
  urology: STAYS,
  hypertension: STAYS,
  gpAdvice: ELSEWHERE,
  noFlag: NEUTRAL,
};

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function NephrologyTriageDemo() {
  const c = useLocalized(TRIAGE);
  // 1–6 rows arrive with their referral, 7 the red flag lights up and the attention card opens
  const step = useSteps(TRIAGE_ROWS.length + 1, 420, 150);
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
                <PatientAvatar initials="HB" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">H. Bowman</span>
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
/* 2 · Agenda: bloods in beforehand, ultrasound the same morning       */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'maandag 9 november 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: ['Vragenlijst ingevuld', 'Labo binnen'],
    elsewhere: '3 verwijzingen elders opgevangen',
    types: [
      'Controle na niertransplantatie',
      'Dringend · colakleurige urine, oedeem, creatinine snel gestegen',
      'Enkeloedeem, nierfunctie',
      'Nieuwe patiënt · dalende nierfunctie · labo en urine vooraf, echo nieren 08:30',
      'Predialyse · keuzegesprek',
      'Resultaat nierbiopsie',
    ],
  },
  en: {
    date: 'Monday 9 November 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: ['Questionnaire completed', 'Bloods in'],
    elsewhere: '3 referrals handled elsewhere',
    types: [
      'Check-up after kidney transplant',
      'Urgent · cola-coloured urine, oedema, creatinine rising fast',
      'Ankle oedema, kidney function',
      'New patient · declining kidney function · bloods and urine beforehand, renal ultrasound 08:30',
      'Pre-dialysis · decision conversation',
      'Kidney biopsy result',
    ],
  },
  fr: {
    date: 'lundi 9 novembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: ['Questionnaire rempli', 'Biologie reçue'],
    elsewhere: '3 orientations prises en charge ailleurs',
    types: [
      'Contrôle après greffe rénale',
      'Urgent · urines couleur cola, œdèmes, créatinine en hausse rapide',
      'Œdème des chevilles, fonction rénale',
      'Nouveau patient · fonction rénale en baisse · biologie et urines au préalable, échographie rénale 08:30',
      'Pré-dialyse · entretien de choix',
      'Résultat de la biopsie rénale',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; luc?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'R. Hilus', initials: 'RH', type: 0 },
  { room: 1, start: 0, len: 3, name: 'L. Nefron', initials: 'LN', type: 3, luc: true },
  { room: 0, start: 1, len: 1, name: 'H. Bowman', initials: 'HB', type: 1, flag: true },
  { room: 2, start: 1, len: 1, name: 'M. Henle', initials: 'MH', type: 4 },
  { room: 0, start: 2, len: 1, name: 'S. Tubulus', initials: 'ST', type: 2 },
  { room: 2, start: 3, len: 1, name: 'P. Papil', initials: 'PP', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabels }: { visit: Visit; label: string; ready: boolean; readyLabels: string[] }) {
  const accent = visit.luc ? LUC : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.luc ? LUC_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.luc && ready ? readyLabels.join(' · ') : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.luc && <PatientAvatar initials="LN" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.luc && ready && (
        // Two ticks: questionnaire and bloods; their labels open on hover.
        <span className="mt-1.5 flex flex-wrap items-center gap-1">
          {readyLabels.map((readyLabel, i) => (
            <motion.span
              key={readyLabel}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
            >
              <Check size={10} color="#1F9E6E" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[10rem]">{readyLabel}</span>
            </motion.span>
          ))}
        </span>
      )}
    </motion.div>
  );
}

export function NephrologyAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Luc's two ticks and the referrals handled elsewhere
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
                  <VisitBlock key={visit.name} visit={visit} label={c.types[visit.type]} ready={done} readyLabels={c.ready} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* C. Cortex, U. Ureter and A. Renalis are not in this agenda: advice to the GP, urology and the hypertension clinic. */}
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
/* 3 · Pre-consultation: bloods by photo, the eGFR trend, the NSAID    */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string; trend?: [string, string][] };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type ChatLine = { from: 'bot' | 'patient'; text: string; photo?: boolean };

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: ChatLine[];
  lab: { header: string; head: [string, string, string]; rows: [string, string, string][] };
  exampleData: string;
  yesNo: [string, string];
  summary: string;
  copy: string;
  tabs: [string, string, string];
  summaries: [SummarySection[], SummarySection[], SummarySection[]];
};

// After his first answer the reason fills in; once the assistant has read the photo, the eGFR trend and the NSAID that
// changes the plan light up.
const REASON_AT = 2;
const READ_AT = 5;
/** Sections open by default on Luc's tab: reason, symptoms and painkillers. */
const OPEN_BY_DEFAULT = [0, 1, 4];
const EGFR_TREND_NL: [string, string][] = [
  ['58', 'sep 2024'],
  ['49', 'okt 2025'],
  ['38', 'okt 2026'],
];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen waarom uw huisarts u doorverwijst?' },
      { from: 'patient', text: 'Mijn nieren gaan achteruit en er zit eiwit in mijn urine. Ik voel er zelf weinig van.' },
      { from: 'bot', text: 'Heeft u uw laatste bloeduitslagen? U mag een foto of PDF sturen. Oudere uitslagen helpen ook, om het verloop te zien.' },
      { from: 'patient', text: 'Labo okt 2026 en okt 2025', photo: true },
      { from: 'bot', text: 'Dank u, ik lees een eGFR van 38 nu en 49 vorig jaar. Meet u thuis uw bloeddruk?' },
    ],
    lab: {
      header: 'Laboresultaten · L. Nefron',
      head: ['', 'okt 2026', 'okt 2025'],
      rows: [
        ['Creatinine', '1,87', '1,52'],
        ['eGFR', '38', '49'],
        ['UACR', '420', '310'],
        ['Kalium', '5,1', '4,8'],
        ['HbA1c', '7,6', '7,4'],
      ],
    },
    exampleData: 'Voorbeelddata',
    yesNo: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Nierfunctie', 'Hypertensie', 'Transplantatie'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', 'Dalende nierfunctie en eiwit in de urine, vastgesteld door de huisarts', { fillAt: REASON_AT }),
            r('Verloop nierfunctie', 'ml/min/1,73 m². UACR 420 mg/g. Bron: foto in de chat', { fillAt: READ_AT, trend: EGFR_TREND_NL }),
          ],
        },
        {
          title: 'Klachten',
          rows: [
            r('Algemeen', 'Sneller moe sinds een halfjaar', { fillAt: REASON_AT }),
            r('Plassen', '2× per nacht, soms schuimende urine, geen bloed gezien, geen pijn'),
            r('Oedeem', "'s Avonds dikke enkels, 's ochtends weg"),
          ],
        },
        { title: 'Bloeddruk', rows: [r('Thuismetingen', 'Meet zelden, laatste 148/86 mmHg')] },
        { title: 'Diabetes', rows: [r('Sinds / controle', 'Type 2 sinds 2016, HbA1c 7,6%. Oogarts 2025: lichte retinopathie. Tintelingen in beide voeten')] },
        {
          title: 'Pijnstillers',
          rows: [r("NSAID's", 'Ja, Brufen 600 mg bijna dagelijks voor de rechterknie (via foto medicatieschema)', { fillAt: READ_AT, mark: 'Verandert het beleid' })],
        },
        { title: 'Rode vlaggen', rows: [r('Plassen / bloed / kortademig', 'Plast normaal, geen bloed of donkere urine, niet kortademig')] },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Voorgeschiedenis', 'Hypertensie sinds 2014, hypercholesterolemie, knieartrose rechts, appendectomie 1978. Geen nierstenen of urineweginfecties'),
            r('Allergieën', 'Nee'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Moeder diabetes. Geen nierziekte, geen cystenieren, niemand aan de dialyse'),
          ],
        },
        {
          title: 'Sociale anamnese',
          rows: [r('Roken / alcohol', 'Ex-roker sinds 2014 (25 pakjaren) / 1 à 2 pintjes in het weekend'), r('Zout en voeding', 'Eet graag hartig, 4× per week een kant-en-klare maaltijd')],
        },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Magazijnier bij een bouwmaterialenhandel, volgend jaar met pensioen'),
            r('Hobby', 'Duivenmelker (40 duiven), petanque'),
            r('Lengte / gewicht', '1,76 m / 94 kg'),
            r('Leeftijd', '64 jaar'),
            r('Verwijzing', 'Via dr. Claes, huisarts'),
          ],
        },
        { title: 'Baseline', rows: [r('KDQOL-36', 'Last van de nierziekte 56 · Symptomen en problemen 79 (0 tot 100, hoger = beter, voorbeelddata)')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Bloeddruk niet onder controle ondanks drie middelen, sinds 2 jaar')] },
        { title: 'Bloeddruk', rows: [r('Thuismetingen', 'Gemiddeld 162/98 mmHg')] },
        { title: 'Labo', rows: [r('Kalium', '3,2 mmol/l (laag)')] },
        { title: 'Klachten', rows: [r('Algemeen', "Spierkrampen, hoofdpijn 's ochtends")] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Verpleegkundige / 38 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Jaarlijkse controle, twee jaar na niertransplantatie')] },
        { title: 'Medicatie', rows: [r('Immunosuppressie', 'Tacrolimus en mycofenolaat, geen dosis vergeten')] },
        { title: 'Klachten', rows: [r('Koorts / pijn ter hoogte van de nier', 'Nee')] },
        { title: 'Plassen', rows: [r('Hoeveelheid', 'Normaal')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Bediende / 61 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me why your GP is referring you?' },
      { from: 'patient', text: 'My kidneys are getting worse and there’s protein in my urine. I don’t notice much myself.' },
      { from: 'bot', text: 'Do you have your latest blood results? You can send a photo or a PDF. Older results help too, to see the trend.' },
      { from: 'patient', text: 'Bloods Oct 2026 and Oct 2025', photo: true },
      { from: 'bot', text: 'Thank you, I can see an eGFR of 38 now and 49 last year. Do you measure your blood pressure at home?' },
    ],
    lab: {
      header: 'Lab results · L. Nefron',
      head: ['', 'Oct 2026', 'Oct 2025'],
      rows: [
        ['Creatinine', '1.87', '1.52'],
        ['eGFR', '38', '49'],
        ['UACR', '420', '310'],
        ['Potassium', '5.1', '4.8'],
        ['HbA1c', '7.6', '7.4'],
      ],
    },
    exampleData: 'Example data',
    yesNo: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Kidney function', 'Hypertension', 'Transplantation'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Declining kidney function and protein in the urine, found by the GP', { fillAt: REASON_AT }),
            r('Kidney function trend', 'ml/min/1.73 m². UACR 420 mg/g. Source: photo in the chat', {
              fillAt: READ_AT,
              trend: [
                ['58', 'Sep 2024'],
                ['49', 'Oct 2025'],
                ['38', 'Oct 2026'],
              ],
            }),
          ],
        },
        {
          title: 'Symptoms',
          rows: [
            r('General', 'More tired for the past six months', { fillAt: REASON_AT }),
            r('Passing urine', 'Twice a night, sometimes frothy urine, no blood seen, no pain'),
            r('Oedema', 'Swollen ankles in the evening, gone by morning'),
          ],
        },
        { title: 'Blood pressure', rows: [r('Home readings', 'Rarely measures, last 148/86 mmHg')] },
        { title: 'Diabetes', rows: [r('Since / check-ups', 'Type 2 since 2016, HbA1c 7.6%. Eye check 2025: mild retinopathy. Tingling in both feet')] },
        {
          title: 'Painkillers',
          rows: [r('NSAIDs', 'Yes, Brufen 600 mg almost daily for the right knee (from the medication schedule photo)', { fillAt: READ_AT, mark: 'Changes the plan' })],
        },
        { title: 'Red flags', rows: [r('Urine / blood / breathless', 'Passes urine normally, no blood or dark urine, not breathless')] },
        {
          title: 'Medical history',
          rows: [
            r('Past history', 'Hypertension since 2014, hypercholesterolaemia, right knee osteoarthritis, appendicectomy 1978. No kidney stones or urinary tract infections'),
            r('Allergies', 'No'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Mother had diabetes. No kidney disease, no polycystic kidneys, nobody on dialysis'),
          ],
        },
        {
          title: 'Social history',
          rows: [r('Smoking / alcohol', 'Ex-smoker since 2014 (25 pack-years) / 1 to 2 beers at the weekend'), r('Salt and diet', 'Likes savoury food, a ready meal 4 times a week')],
        },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Warehouseman at a builders’ merchant, retiring next year'),
            r('Hobbies', 'Pigeon fancier (40 pigeons), pétanque'),
            r('Height / weight', '1.76 m / 94 kg'),
            r('Age', '64'),
            r('Referral', 'Via Dr Claes, GP'),
          ],
        },
        { title: 'Baseline', rows: [r('KDQOL-36', 'Burden of kidney disease 56 · Symptoms and problems 79 (0 to 100, higher = better, example data)')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Blood pressure not controlled despite three drugs, for 2 years')] },
        { title: 'Blood pressure', rows: [r('Home readings', 'Average 162/98 mmHg')] },
        { title: 'Bloods', rows: [r('Potassium', '3.2 mmol/l (low)')] },
        { title: 'Symptoms', rows: [r('General', 'Muscle cramps, headache in the morning')] },
        { title: 'General', rows: [r('Occupation / age', 'Nurse / 38')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Annual check-up, two years after kidney transplant')] },
        { title: 'Medication', rows: [r('Immunosuppression', 'Tacrolimus and mycophenolate, no doses missed')] },
        { title: 'Symptoms', rows: [r('Fever / pain over the kidney', 'No')] },
        { title: 'Passing urine', rows: [r('Amount', 'Normal')] },
        { title: 'General', rows: [r('Occupation / age', 'Office worker / 61')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire pourquoi votre médecin traitant vous oriente ?' },
      { from: 'patient', text: 'Mes reins se dégradent et il y a des protéines dans mes urines. Je ne ressens pas grand-chose.' },
      { from: 'bot', text: 'Avez-vous vos derniers résultats de prise de sang ? Vous pouvez envoyer une photo ou un PDF. Des résultats plus anciens aident aussi, pour voir l’évolution.' },
      { from: 'patient', text: 'Biologie oct. 2026 et oct. 2025', photo: true },
      { from: 'bot', text: 'Merci, je lis un DFGe de 38 maintenant et de 49 l’an dernier. Mesurez-vous votre tension à domicile ?' },
    ],
    lab: {
      header: 'Résultats de laboratoire · L. Nefron',
      head: ['', 'oct. 2026', 'oct. 2025'],
      rows: [
        ['Créatinine', '1,87', '1,52'],
        ['DFGe', '38', '49'],
        ['RAC', '420', '310'],
        ['Potassium', '5,1', '4,8'],
        ['HbA1c', '7,6', '7,4'],
      ],
    },
    exampleData: 'Données d’exemple',
    yesNo: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Fonction rénale', 'Hypertension', 'Transplantation'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Fonction rénale en baisse et protéines dans les urines, constatées par le médecin traitant', { fillAt: REASON_AT }),
            r('Évolution de la fonction rénale', 'ml/min/1,73 m². RAC 420 mg/g. Source : photo dans le chat', {
              fillAt: READ_AT,
              trend: [
                ['58', 'sept. 2024'],
                ['49', 'oct. 2025'],
                ['38', 'oct. 2026'],
              ],
            }),
          ],
        },
        {
          title: 'Plaintes',
          rows: [
            r('Général', 'Plus vite fatigué depuis six mois', { fillAt: REASON_AT }),
            r('Mictions', '2× par nuit, parfois des urines mousseuses, pas de sang vu, pas de douleur'),
            r('Œdèmes', 'Chevilles gonflées le soir, disparu le matin'),
          ],
        },
        { title: 'Tension', rows: [r('Mesures à domicile', 'Mesure rarement, dernière 148/86 mmHg')] },
        { title: 'Diabète', rows: [r('Depuis / suivi', 'Type 2 depuis 2016, HbA1c 7,6 %. Ophtalmologue 2025 : rétinopathie légère. Fourmillements dans les deux pieds')] },
        {
          title: 'Antidouleurs',
          rows: [r('AINS', 'Oui, Brufen 600 mg presque tous les jours pour le genou droit (via photo du schéma de médication)', { fillAt: READ_AT, mark: 'Change le plan' })],
        },
        { title: 'Signaux d’alerte', rows: [r('Mictions / sang / essoufflement', 'Urine normalement, pas de sang ni d’urines foncées, pas essoufflé')] },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Antécédents', 'Hypertension depuis 2014, hypercholestérolémie, gonarthrose droite, appendicectomie 1978. Pas de calculs rénaux ni d’infections urinaires'),
            r('Allergies', 'Non'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Mère diabétique. Pas de maladie rénale, pas de polykystose, personne en dialyse'),
          ],
        },
        {
          title: 'Anamnèse sociale',
          rows: [r('Tabac / alcool', 'Ex-fumeur depuis 2014 (25 paquets-années) / 1 à 2 bières le week-end'), r('Sel et alimentation', 'Aime manger salé, un plat préparé 4× par semaine')],
        },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Magasinier chez un négociant en matériaux de construction, à la retraite l’an prochain'),
            r('Loisirs', 'Colombophile (40 pigeons), pétanque'),
            r('Taille / poids', '1,76 m / 94 kg'),
            r('Âge', '64 ans'),
            r('Orientation', 'Par le Dr Claes, médecin traitant'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('KDQOL-36', 'Fardeau de la maladie rénale 56 · Symptômes et problèmes 79 (0 à 100, plus haut = mieux, données d’exemple)')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Tension non contrôlée malgré trois médicaments, depuis 2 ans')] },
        { title: 'Tension', rows: [r('Mesures à domicile', 'En moyenne 162/98 mmHg')] },
        { title: 'Biologie', rows: [r('Potassium', '3,2 mmol/l (bas)')] },
        { title: 'Plaintes', rows: [r('Général', 'Crampes musculaires, maux de tête le matin')] },
        { title: 'Général', rows: [r('Profession / âge', 'Infirmière / 38 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Contrôle annuel, deux ans après une greffe rénale')] },
        { title: 'Médicaments', rows: [r('Immunosuppression', 'Tacrolimus et mycophénolate, aucune dose oubliée')] },
        { title: 'Plaintes', rows: [r('Fièvre / douleur au niveau du rein', 'Non')] },
        { title: 'Mictions', rows: [r('Volume', 'Normal')] },
        { title: 'Général', rows: [r('Profession / âge', 'Employé / 61 ans')] },
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

/** Luc's photo of his lab results, as an image in a chat message: a printed sheet, slightly turned, on the table. */
function LabPhoto({ lab, caption, label }: { lab: IntakeCopy['lab']; caption: string; label: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease: EASE }} className="self-end w-[150px] rounded-2xl bg-[#06ACC1] p-1.5">
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#C9C2B4]">
        <div className="absolute inset-x-2 top-2 bottom-1.5 rotate-[-2deg] rounded-[3px] bg-[#FDFCF8] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.45)] px-1.5 py-1 text-[#2A3A51] blur-[0.25px]">
          <p className="text-[5.5px] font-bold leading-tight border-b border-[#2A3A51]/30 pb-0.5 mb-0.5">{lab.header}</p>
          {[lab.head, ...lab.rows].map((row, i) => (
            <p key={i} className={`grid grid-cols-[1.4fr_1fr_1fr] text-[5px] leading-[1.45] tabular-nums ${i === 0 ? 'font-semibold text-[#4E5670]' : ''}`}>
              {row.map((cell, k) => (
                <span key={k} className={k ? 'text-right' : ''}>
                  {cell}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <p className="px-1.5 pt-1 text-[9px] text-white/90 leading-tight">{caption}</p>
      <p className="px-1.5 text-[8.5px] text-white/70">{label}</p>
    </motion.div>
  );
}

/** The eGFR trend as three small values with arrows: 58 → 49 → 38. */
function EgfrTrend({ trend }: { trend: [string, string][] }) {
  return (
    <span className="my-1 flex flex-wrap items-center gap-1.5">
      {trend.map(([value, when], i) => (
        <span key={when} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-[#949CB1]">→</span>}
          <span className={`inline-flex flex-col items-center rounded-md px-2 py-0.5 ring-1 ${i === trend.length - 1 ? 'ring-[#4C5FA8]/40 bg-[#EEF0FA]' : 'ring-[#E8EAEC] bg-white'}`}>
            <b className="text-[13px] tabular-nums leading-tight" style={i === trend.length - 1 ? { color: LUC } : undefined}>
              {value}
            </b>
            <span className="text-[9px] text-[#949CB1] leading-tight">{when}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

export function NephrologyPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–5 the conversation: the photo of his bloods arrives at 4, the assistant reads it at 5 and asks about home readings
  const step = useSteps(total, 1100, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Luc's tab opens on what matters first; long sections stay folded, the other two tabs are short and fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 7}>
        {c.chat
          .slice(0, step)
          .map((msg, i) =>
            msg.photo ? (
              <LabPhoto key={i} lab={c.lab} caption={msg.text} label={c.exampleData} />
            ) : msg.from === 'bot' ? (
              <BotBubble key={i}>{msg.text}</BotBubble>
            ) : (
              <PatientBubble key={i}>{msg.text}</PatientBubble>
            ),
          )}
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
              {i === 0 && <PatientAvatar initials="LN" size={18} />}
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
                        const marked = row.mark && known && tab === 0;
                        return (
                          <div key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${marked ? 'my-1 -ml-1 pl-5 pr-2 py-1.5 rounded-lg bg-[#FFF6E8] ring-1 ring-[#F59E0C]/40' : ''}`}>
                            <span className="font-semibold">{row.label}:</span>{' '}
                            {known ? (
                              <motion.span
                                initial={{ opacity: 0, backgroundColor: 'rgba(6,172,193,0.25)' }}
                                animate={{ opacity: 1, backgroundColor: 'rgba(6,172,193,0)' }}
                                transition={{ duration: 1.2 }}
                              >
                                {row.trend && <EgfrTrend trend={row.trend} />}
                                {row.value}
                              </motion.span>
                            ) : (
                              <span className="text-[#949CB1]">…</span>
                            )}
                            {marked && (
                              <motion.span
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-[#C2410C]"
                              >
                                <AppIcon name="exclamation-triangle" size={11} color="#C2410C" />
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
/* 4 · Voice Reception: he calls, he is booked with bloods beforehand  */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Goeiedag, mijn huisarts stuurt mij door naar de nefroloog. Mijn nieren gaan achteruit, zegt hij.' },
      { from: 'bot', text: 'Dank u om te bellen. Ziet u bloed in uw urine, of is uw urine donker of colakleurig?' },
      { from: 'patient', text: 'Nee, dat niet. Soms wat schuim.' },
      { from: 'bot', text: 'Plast u de laatste dagen veel minder dan gewoonlijk, of bent u kortademig?' },
      { from: 'patient', text: "Nee, alleen 's avonds wat dikke enkels." },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de nefroloog. U krijgt een bericht met een korte vragenlijst en een labo-aanvraag voor een week vooraf.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de nefroloog: dalende nierfunctie, geen rode vlaggen. Labo en urinestaal een week vooraf',
    task2: 'Labo-aanvraag verstuurd',
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
      { from: 'patient', text: 'Good morning, my GP is referring me to the nephrologist. He says my kidneys are getting worse.' },
      { from: 'bot', text: 'Thank you for calling. Do you see blood in your urine, or is your urine dark or cola-coloured?' },
      { from: 'patient', text: 'No, not that. Sometimes a bit of froth.' },
      { from: 'bot', text: 'Have you been passing much less urine than usual over the last few days, or are you breathless?' },
      { from: 'patient', text: 'No, just a bit of swelling round the ankles in the evening.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the nephrologist. You’ll get a message with a short questionnaire and a blood test request for a week beforehand.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the nephrologist: declining kidney function, no red flags. Bloods and urine sample a week beforehand',
    task2: 'Lab request sent',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant m’envoie chez le néphrologue. Il dit que mes reins se dégradent.' },
      { from: 'bot', text: 'Merci d’appeler. Voyez-vous du sang dans vos urines, ou vos urines sont-elles foncées ou couleur cola ?' },
      { from: 'patient', text: 'Non, pas ça. Parfois un peu de mousse.' },
      { from: 'bot', text: 'Urinez-vous beaucoup moins que d’habitude ces derniers jours, ou êtes-vous essoufflé ?' },
      { from: 'patient', text: 'Non, juste les chevilles un peu gonflées le soir.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez le néphrologue. Vous recevrez un message avec un court questionnaire et une demande de prise de sang pour une semaine avant.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez le néphrologue : fonction rénale en baisse, aucun signal d’alerte. Prise de sang et échantillon d’urine une semaine avant',
    task2: 'Demande de biologie envoyée',
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

function DoneTask({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="flex items-start gap-2.5 rounded-lg bg-[#E9FFF7] px-3 py-2.5 text-[12px]">
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: delay + 0.15 }}
        className="mt-0.5 w-4 h-4 rounded-full bg-[#37C18D] text-white flex items-center justify-center shrink-0"
      >
        <Check size={10} color="#fff" />
      </motion.span>
      <span>{text}</span>
    </motion.div>
  );
}

export function NephrologyVoiceDemo() {
  const c = useLocalized(VOICE);
  const lines = c.lines.length;
  // 1–6 transcript, 7 the booking and the lab request appear as done tasks, 8 completed
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
            <span className="block text-sm font-semibold">+32 4•• •• 64 22</span>
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
        <AppCard icon="list-checked" title={c.tasks} bodyClassName="p-3 flex flex-col gap-2">
          {step >= lines + 1 ? (
            <>
              <DoneTask text={c.task} delay={0} />
              <DoneTask text={c.task2} delay={0.4} />
            </>
          ) : (
            <p className="text-[12px] text-[#949CB1] px-1 py-1">…</p>
          )}
        </AppCard>
        <AppCard icon="file-medical-alt" title={c.details} bodyClassName="px-4 py-2">
          <DetailRow
            label={c.patient}
            value={
              <span className="inline-flex items-center gap-1.5">
                <PatientAvatar initials="LN" size={18} />
                L. Nefron
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
/* 5 · Scribe: oedema, bloods and ultrasound in the note               */
/* ------------------------------------------------------------------ */

type NoteSection = { title: string; text: string; clamp: boolean };

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
    template: 'Nefrologie',
    templates: ['Chronische nierziekte', 'Hypertensie', 'Transplantatie', 'Dialyse'],
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
      { who: 'doctor', text: 'Ik druk even op uw enkels. Ziet u, er blijft een putje staan.' },
      { who: 'patient', text: "Dat is 's avonds altijd zo. 's Morgens is het weg." },
      { who: 'doctor', text: 'Uw nierfunctie is gedaald naar 38, en de ibuprofen voor uw knie helpt daar niet bij. Daar stoppen we mee.' },
      { who: 'patient', text: 'Maar wat neem ik dan voor mijn knie?' },
      { who: 'doctor', text: 'Paracetamol. En we starten een pil die uw nieren beschermt.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: "Verwezen door dr. Claes wegens dalende nierfunctie (eGFR 58 in 2024, 49 in 2025, 38 nu) en albuminurie (UACR 420 mg/g). Sneller moe, nycturie 2×, soms schuimende urine, 's avonds enkeloedeem. Geen macroscopische hematurie, geen flankpijn. Type 2-diabetes sinds 2016 met lichte retinopathie, hypertensie sinds 2014. Ibuprofen 600 mg bijna dagelijks voor knieartrose rechts. Thuisbloeddruk rond 148/86 mmHg. Zoutrijke voeding. Geen bloedverdunners.",
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Bloeddruk 152/88 mmHg, pols 76/min regelmatig. Gewicht 94 kg, BMI 30,3. Lichte putjesoedeem van beide enkels. Geen souffle boven de nierarteriën. Perifere pulsaties palpabel. Verminderd vibratiezin aan beide voeten.',
        clamp: true,
      },
      {
        title: 'Labo',
        text: 'Creatinine 1,87 mg/dl, eGFR 38 ml/min/1,73 m², UACR 420 mg/g, kalium 5,1 mmol/l, bicarbonaat 22 mmol/l, hemoglobine 12,4 g/dl, PTH 88 pg/ml, vitamine D 18 ng/ml, HbA1c 7,6%. Sediment: geen erytrocyten, geen cilinders.',
        clamp: true,
      },
      {
        title: 'Beeldvorming',
        text: 'Echo nieren: rechts 10,8 cm, links 11,1 cm, cortex licht hyperechogeen, geen hydronefrose, geen stenen, residu 30 ml.',
        clamp: true,
      },
      {
        title: 'Diagnose',
        text: 'Chronische nierziekte G3b A3, meest waarschijnlijk diabetische nierziekte met hypertensieve component, versneld door NSAID-gebruik. Hypertensie onvoldoende gecontroleerd. Vitamine D-tekort. Geen aanwijzingen voor glomerulonefritis: geen biopsie. KFRE 2,6% na 2 jaar, 11,6% na 5 jaar.',
        clamp: false,
      },
      {
        title: 'Beleid',
        text: 'Stop ibuprofen, paracetamol voor de knie. Start dapagliflozine 10 mg. Perindopril naar 10 mg. Metformine naar 500 mg 2× per dag. Bloeddrukdoel < 130/80 mmHg met thuismetingen. Zout < 5 g per dag, verwijzing diëtist. Vitamine D maandelijks. Ziektedagregels uitgelegd. Zorgtraject opstarten. Creatinine en kalium na 2 weken, herevaluatie na 3 maanden met UACR. Vangnet: dringend contact bij veel minder plassen, bloed in de urine, snelle gewichtstoename of kortademigheid. Opvolging met KDQOL-36.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '22-06-1962'],
      ['Vragenlijst', 'Chronische nierziekte'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Nephrology',
    templates: ['Chronic kidney disease', 'Hypertension', 'Transplantation', 'Dialysis'],
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
      { who: 'doctor', text: 'I’m just pressing on your ankles. See, a little dent stays behind.' },
      { who: 'patient', text: 'It’s always like that in the evening. By morning it’s gone.' },
      { who: 'doctor', text: 'Your kidney function has dropped to 38, and the ibuprofen for your knee isn’t helping. We’re going to stop that.' },
      { who: 'patient', text: 'But what do I take for my knee then?' },
      { who: 'doctor', text: 'Paracetamol. And we’ll start a tablet that protects your kidneys.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Referred by Dr Claes for declining kidney function (eGFR 58 in 2024, 49 in 2025, 38 now) and albuminuria (UACR 420 mg/g). More tired, nocturia twice, sometimes frothy urine, ankle oedema in the evening. No macroscopic haematuria, no flank pain. Type 2 diabetes since 2016 with mild retinopathy, hypertension since 2014. Ibuprofen 600 mg almost daily for right knee osteoarthritis. Home blood pressure around 148/86 mmHg. High-salt diet. No anticoagulants.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Blood pressure 152/88 mmHg, pulse 76/min regular. Weight 94 kg, BMI 30.3. Mild pitting oedema of both ankles. No renal artery bruit. Peripheral pulses palpable. Reduced vibration sense in both feet.',
        clamp: true,
      },
      {
        title: 'Bloods',
        text: 'Creatinine 1.87 mg/dl, eGFR 38 ml/min/1.73 m², UACR 420 mg/g, potassium 5.1 mmol/l, bicarbonate 22 mmol/l, haemoglobin 12.4 g/dl, PTH 88 pg/ml, vitamin D 18 ng/ml, HbA1c 7.6%. Sediment: no red cells, no casts.',
        clamp: true,
      },
      {
        title: 'Imaging',
        text: 'Renal ultrasound: right 10.8 cm, left 11.1 cm, cortex slightly hyperechoic, no hydronephrosis, no stones, residual 30 ml.',
        clamp: true,
      },
      {
        title: 'Diagnosis',
        text: 'Chronic kidney disease G3b A3, most likely diabetic kidney disease with a hypertensive component, accelerated by NSAID use. Hypertension insufficiently controlled. Vitamin D deficiency. No evidence of glomerulonephritis: no biopsy. KFRE 2.6% at 2 years, 11.6% at 5 years.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Stop ibuprofen, paracetamol for the knee. Start dapagliflozin 10 mg. Perindopril to 10 mg. Metformin to 500 mg twice a day. Blood pressure target < 130/80 mmHg with home readings. Salt < 5 g a day, dietitian referral. Monthly vitamin D. Sick day rules explained. Start the care pathway. Creatinine and potassium after 2 weeks, review after 3 months with UACR. Safety net: get in touch urgently if passing much less urine, blood in the urine, rapid weight gain or breathlessness. Follow-up with the KDQOL-36.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '22-06-1962'],
      ['Questionnaire', 'Chronic kidney disease'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Néphrologie',
    templates: ['Maladie rénale chronique', 'Hypertension', 'Transplantation', 'Dialyse'],
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
      { who: 'doctor', text: 'J’appuie un instant sur vos chevilles. Vous voyez, il reste un petit creux.' },
      { who: 'patient', text: 'C’est toujours comme ça le soir. Le matin, c’est parti.' },
      { who: 'doctor', text: 'Votre fonction rénale est descendue à 38, et l’ibuprofène pour votre genou n’aide pas. Nous allons l’arrêter.' },
      { who: 'patient', text: 'Mais qu’est-ce que je prends alors pour mon genou ?' },
      { who: 'doctor', text: 'Du paracétamol. Et nous commençons un comprimé qui protège vos reins.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Adressé par le Dr Claes pour une fonction rénale en baisse (DFGe 58 en 2024, 49 en 2025, 38 maintenant) et une albuminurie (RAC 420 mg/g). Plus vite fatigué, nycturie 2×, parfois urines mousseuses, œdème des chevilles le soir. Pas d’hématurie macroscopique, pas de douleur lombaire. Diabète de type 2 depuis 2016 avec rétinopathie légère, hypertension depuis 2014. Ibuprofène 600 mg presque tous les jours pour une gonarthrose droite. Tension à domicile autour de 148/86 mmHg. Alimentation riche en sel. Pas d’anticoagulants.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Tension 152/88 mmHg, pouls 76/min régulier. Poids 94 kg, IMC 30,3. Léger œdème prenant le godet aux deux chevilles. Pas de souffle sur les artères rénales. Pouls périphériques palpables. Sensibilité vibratoire diminuée aux deux pieds.',
        clamp: true,
      },
      {
        title: 'Biologie',
        text: 'Créatinine 1,87 mg/dl, DFGe 38 ml/min/1,73 m², RAC 420 mg/g, potassium 5,1 mmol/l, bicarbonates 22 mmol/l, hémoglobine 12,4 g/dl, PTH 88 pg/ml, vitamine D 18 ng/ml, HbA1c 7,6 %. Sédiment : pas d’hématies, pas de cylindres.',
        clamp: true,
      },
      {
        title: 'Imagerie',
        text: 'Échographie rénale : droite 10,8 cm, gauche 11,1 cm, cortex légèrement hyperéchogène, pas d’hydronéphrose, pas de calculs, résidu 30 ml.',
        clamp: true,
      },
      {
        title: 'Diagnostic',
        text: 'Maladie rénale chronique G3b A3, très probablement néphropathie diabétique avec composante hypertensive, accélérée par la prise d’AINS. Hypertension insuffisamment contrôlée. Carence en vitamine D. Pas d’argument pour une glomérulonéphrite : pas de biopsie. KFRE 2,6 % à 2 ans, 11,6 % à 5 ans.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Arrêt de l’ibuprofène, paracétamol pour le genou. Début de dapagliflozine 10 mg. Périndopril à 10 mg. Metformine à 500 mg 2× par jour. Objectif tensionnel < 130/80 mmHg avec mesures à domicile. Sel < 5 g par jour, orientation vers la diététicienne. Vitamine D mensuelle. Règles des jours de maladie expliquées. Démarrage du trajet de soins. Créatinine et potassium après 2 semaines, réévaluation après 3 mois avec RAC. Filet de sécurité : contact urgent en cas de forte baisse de la diurèse, de sang dans les urines, de prise de poids rapide ou d’essoufflement. Suivi avec le KDQOL-36.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '22-06-1962'],
      ['Questionnaire', 'Maladie rénale chronique'],
      ['Langue', 'Français'],
    ],
  },
};

export function NephrologyScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–5 transcript lines while recording, 6 generating, 7 note ready
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<LucTitle back={c.back} />}>
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

        <AppCard icon="user" title="Luc Nefron" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: the ibuprofen, and metformin too high for his eGFR  */
/* ------------------------------------------------------------------ */

const SCHEDULE_ROWS: [string, string][] = [
  ['Metformax 850 mg tabletten', "1 tablet 's ochtends en 's avonds, bij de maaltijd"],
  ['Diamicron 60 mg tabletten met gereguleerde afgifte', "1 tablet 's ochtends, bij het ontbijt"],
  ['Coversyl 5 mg filmomhulde tabletten', "1 tablet 's ochtends"],
  ['Amlor 10 mg capsules', "1 capsule 's ochtends"],
  ['Atorvastatine EG 40 mg filmomhulde tabletten', "1 tablet 's avonds"],
  ['Brufen 600 mg filmomhulde tabletten', '1 tablet bij pijn, max. 3× per dag, tijdens de maaltijd'],
];

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 6 geneesmiddelen gevonden:',
    confirm: 'Ja. Die Brufen is voor mijn knie, die neem ik sinds de zomer bijna elke dag.',
    followUp: { question: 'Genoteerd. Neemt u bloedverdunners, zoals Asaflow, Clopidogrel, Marevan, Xarelto of Eliquis?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    schedule: { header: 'Apotheek Ter Beke · Medicatieschema · L. Nefron, ° 22-06-1962', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× per dag', indication: 'Diabetes', tag: { label: 'Te hoog voor eGFR 38', tone: 'amber' } },
      { name: 'Diamicron', strength: '60 mg', substance: 'Gliclazide', frequency: "1× per dag, 's ochtends", indication: 'Diabetes' },
      { name: 'Coversyl', strength: '5 mg', substance: 'Perindopril', frequency: "1× per dag, 's ochtends", indication: 'Bloeddruk, nierbescherming' },
      { name: 'Amlor', strength: '10 mg', substance: 'Amlodipine', frequency: "1× per dag, 's ochtends", indication: 'Bloeddruk' },
      { name: 'Atorvastatine EG', strength: '40 mg', substance: 'Atorvastatine', frequency: "1× per dag, 's avonds", indication: 'Cholesterol' },
      { name: 'Brufen', strength: '600 mg', substance: 'Ibuprofen', frequency: 'Zo nodig, nu bijna dagelijks 1 à 2', indication: 'Kniepijn (NSAID)', tag: { label: 'NSAID · bijna dagelijks', tone: 'amber' } },
    ],
    notes: [
      { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
      { label: 'Nierfunctie', value: 'NSAID: Brufen bijna dagelijks · Metformax boven de maximumdosis voor eGFR 38', tone: 'warn' },
      { label: 'Allergieën', value: 'Geen' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 6 medicines:',
    confirm: 'Yes. That Brufen is for my knee, I’ve been taking it almost every day since the summer.',
    followUp: { question: 'Noted. Do you take any blood thinners, such as Asaflow, Clopidogrel, Marevan, Xarelto or Eliquis?', choices: ['Yes', 'No'], answer: 'No' },
    schedule: { header: 'Apotheek Ter Beke · Medication schedule · L. Nefron, b. 22-06-1962', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformin', frequency: 'Twice a day', indication: 'Diabetes', tag: { label: 'Too high for eGFR 38', tone: 'amber' } },
      { name: 'Diamicron', strength: '60 mg', substance: 'Gliclazide', frequency: 'Once a day, in the morning', indication: 'Diabetes' },
      { name: 'Coversyl', strength: '5 mg', substance: 'Perindopril', frequency: 'Once a day, in the morning', indication: 'Blood pressure, kidney protection' },
      { name: 'Amlor', strength: '10 mg', substance: 'Amlodipine', frequency: 'Once a day, in the morning', indication: 'Blood pressure' },
      { name: 'Atorvastatine EG', strength: '40 mg', substance: 'Atorvastatin', frequency: 'Once a day, in the evening', indication: 'Cholesterol' },
      { name: 'Brufen', strength: '600 mg', substance: 'Ibuprofen', frequency: 'As needed, now 1 to 2 almost daily', indication: 'Knee pain (NSAID)', tag: { label: 'NSAID · almost daily', tone: 'amber' } },
    ],
    notes: [
      { label: 'Blood thinners', value: 'None (confirmed in the chat)', tone: 'ok' },
      { label: 'Kidney function', value: 'NSAID: Brufen almost daily · Metformax above the maximum dose for eGFR 38', tone: 'warn' },
      { label: 'Allergies', value: 'None' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 6 médicaments :',
    confirm: 'Oui. Ce Brufen, c’est pour mon genou, j’en prends presque tous les jours depuis l’été.',
    followUp: { question: 'C’est noté. Prenez-vous des anticoagulants, comme Asaflow, Clopidogrel, Marevan, Xarelto ou Eliquis ?', choices: ['Oui', 'Non'], answer: 'Non' },
    schedule: { header: 'Apotheek Ter Beke · Schéma de médication · L. Nefron, né le 22-06-1962', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× par jour', indication: 'Diabète', tag: { label: 'Trop élevé pour DFGe 38', tone: 'amber' } },
      { name: 'Diamicron', strength: '60 mg', substance: 'Gliclazide', frequency: '1× par jour, le matin', indication: 'Diabète' },
      { name: 'Coversyl', strength: '5 mg', substance: 'Périndopril', frequency: '1× par jour, le matin', indication: 'Tension, néphroprotection' },
      { name: 'Amlor', strength: '10 mg', substance: 'Amlodipine', frequency: '1× par jour, le matin', indication: 'Tension' },
      { name: 'Atorvastatine EG', strength: '40 mg', substance: 'Atorvastatine', frequency: '1× par jour, le soir', indication: 'Cholestérol' },
      { name: 'Brufen', strength: '600 mg', substance: 'Ibuprofène', frequency: 'Si besoin, actuellement 1 à 2 presque tous les jours', indication: 'Douleur au genou (AINS)', tag: { label: 'AINS · presque quotidien', tone: 'amber' } },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'Aucun (confirmé dans le chat)', tone: 'ok' },
      { label: 'Fonction rénale', value: 'AINS : Brufen presque tous les jours · Metformax au-dessus de la dose maximale pour un DFGe de 38', tone: 'warn' },
      { label: 'Allergies', value: 'Aucune' },
    ],
  },
});

export function NephrologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Luc Nefron', initials: 'LN', dob: '22-06-1962', color: LUC }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, prescriptions, lab request, dietitian        */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Nefrologie, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Voorschriften', description: 'Forxiga 10 mg, Coversyl 10 mg, Metformax 500 mg, D-Cure 25.000 IE' },
      { label: 'Labo-aanvraag', description: 'Creatinine en kalium na 2 weken, nierlabo met UACR na 3 maanden' },
      { label: 'Verwijzing diëtist', description: 'Zoutbeperking, eiwit 0,8 g/kg' },
      { label: 'Zorgtraject chronische nierinsufficiëntie', description: 'Contract huisarts, nefroloog en patiënt' },
      { label: 'Uitleg voor de patiënt', description: 'Ziektedagregels, welke pijnstillers wel en niet, zoutarm eten' },
    ],
    previews: [
      'Diagnose: chronische nierziekte G3b A3, meest waarschijnlijk diabetische nierziekte met hypertensieve component, versneld door NSAID-gebruik. Beleid: stop ibuprofen, start dapagliflozine 10 mg, perindopril naar 10 mg.',
      'Geachte collega, ik zag uw patiënt de heer Nefron voor een dalende nierfunctie, van eGFR 58 naar 38 in twee jaar, met albuminurie. Het beeld past bij een diabetische nierziekte, versneld door dagelijks ibuprofengebruik. We stoppen de ibuprofen en starten dapagliflozine; graag creatinine en kalium over twee weken.',
      'Forxiga 10 mg, 1× per dag. Coversyl 10 mg, 1× per dag. Metformax 500 mg, 2× per dag. D-Cure 25.000 IE, 1 ampul per maand.',
      'Over 2 weken: creatinine, eGFR, kalium. Over 3 maanden: nierfunctie, ionogram, bicarbonaat, hemoglobine, HbA1c, UACR.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënt Luc Nefron, geboren op 22 juni 1962, die ik recent op de raadpleging nefrologie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens dalende nierfunctie (eGFR 58 in 2024, 49 in 2025, 38 ml/min/1,73 m² nu) en albuminurie (UACR 420 mg/g).'],
        [
          'Anamnese',
          "Weinig klachten: sneller moe, nycturie 2×, af en toe schuimende urine, 's avonds enkeloedeem. Geen macroscopische hematurie, geen flankpijn. Type 2-diabetes sinds 2016 met lichte retinopathie, hypertensie sinds 2014, hypercholesterolemie. Neemt sinds de zomer bijna dagelijks ibuprofen 600 mg voor knieartrose rechts. Thuisbloeddruk rond 148/86 mmHg. Eet zoutrijk. Ex-roker. Geen nierziekte in de familie. Geen allergieën, geen bloedverdunners.",
        ],
        [
          'Klinisch onderzoek',
          'Bloeddruk 152/88 mmHg, pols 76 per minuut regelmatig. Gewicht 94 kg, BMI 30,3. Lichte putjesoedeem van beide enkels. Geen souffle boven de nierarteriën. Verminderd vibratiezin aan beide voeten.',
        ],
        [
          'Aanvullende onderzoeken',
          'Labo: creatinine 1,87 mg/dl, eGFR 38, UACR 420 mg/g, kalium 5,1 mmol/l, bicarbonaat 22 mmol/l, hemoglobine 12,4 g/dl, PTH 88 pg/ml, vitamine D 18 ng/ml, HbA1c 7,6%. Urinesediment rustig. Echo nieren: symmetrische nieren van normale grootte, cortex licht hyperechogeen, geen hydronefrose, geen stenen.',
        ],
        ['Diagnose', 'Chronische nierziekte G3b A3, meest waarschijnlijk diabetische nierziekte met hypertensieve component, versneld door NSAID-gebruik. Arteriële hypertensie, onvoldoende gecontroleerd. Vitamine D-tekort.'],
        [
          'Beleid',
          'We stoppen ibuprofen en vervangen het door paracetamol. We starten dapagliflozine 10 mg en verhogen perindopril naar 10 mg; graag creatinine en kalium over twee weken. Een lichte daling van de eGFR in de eerste weken is verwacht. Metformine verlagen we naar 500 mg tweemaal daags. Bloeddrukdoel onder 130/80 mmHg, met thuismetingen. Luc gaat naar de diëtist voor zoutbeperking. Start vitamine D 25.000 IE maandelijks. Graag starten we samen een zorgtraject chronische nierinsufficiëntie op. Luc kent de ziektedagregels. Herevaluatie over drie maanden met labo en UACR; bij blijvende albuminurie overwegen we finerenone. Hij neemt dringend contact op bij veel minder plassen, bloed in de urine, snelle gewichtstoename, kortademigheid of spierzwakte met hartkloppingen.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, nefroloog',
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
      { label: 'Consultation report', description: 'Nephrology template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Prescriptions', description: 'Forxiga 10 mg, Coversyl 10 mg, Metformax 500 mg, D-Cure 25,000 IU' },
      { label: 'Lab request', description: 'Creatinine and potassium after 2 weeks, renal panel with UACR after 3 months' },
      { label: 'Dietitian referral', description: 'Salt restriction, protein 0.8 g/kg' },
      { label: 'Chronic kidney disease care pathway', description: 'Agreement between GP, nephrologist and patient' },
      { label: 'Explanation for the patient', description: 'Sick day rules, which painkillers are and are not safe, low-salt eating' },
    ],
    previews: [
      'Diagnosis: chronic kidney disease G3b A3, most likely diabetic kidney disease with a hypertensive component, accelerated by NSAID use. Plan: stop ibuprofen, start dapagliflozin 10 mg, perindopril to 10 mg.',
      'Dear colleague, I saw your patient Mr Nefron for declining kidney function, from eGFR 58 to 38 over two years, with albuminuria. The picture fits diabetic kidney disease, accelerated by daily ibuprofen use. We are stopping the ibuprofen and starting dapagliflozin; please check creatinine and potassium in two weeks.',
      'Forxiga 10 mg, once a day. Coversyl 10 mg, once a day. Metformax 500 mg, twice a day. D-Cure 25,000 IU, 1 ampoule a month.',
      'In 2 weeks: creatinine, eGFR, potassium. In 3 months: kidney function, electrolytes, bicarbonate, haemoglobin, HbA1c, UACR.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Luc Nefron, born on 22 June 1962, whom I recently saw in the nephrology clinic.',
      sections: [
        ['Reason for contact', 'Referred for declining kidney function (eGFR 58 in 2024, 49 in 2025, 38 ml/min/1.73 m² now) and albuminuria (UACR 420 mg/g).'],
        [
          'History',
          'Few symptoms: more tired, nocturia twice, occasionally frothy urine, ankle oedema in the evening. No macroscopic haematuria, no flank pain. Type 2 diabetes since 2016 with mild retinopathy, hypertension since 2014, hypercholesterolaemia. Has taken ibuprofen 600 mg almost daily since the summer for right knee osteoarthritis. Home blood pressure around 148/86 mmHg. High-salt diet. Ex-smoker. No family history of kidney disease. No allergies, no anticoagulants.',
        ],
        [
          'Clinical examination',
          'Blood pressure 152/88 mmHg, pulse 76 per minute regular. Weight 94 kg, BMI 30.3. Mild pitting oedema of both ankles. No renal artery bruit. Reduced vibration sense in both feet.',
        ],
        [
          'Further investigations',
          'Bloods: creatinine 1.87 mg/dl, eGFR 38, UACR 420 mg/g, potassium 5.1 mmol/l, bicarbonate 22 mmol/l, haemoglobin 12.4 g/dl, PTH 88 pg/ml, vitamin D 18 ng/ml, HbA1c 7.6%. Urine sediment bland. Renal ultrasound: symmetrical kidneys of normal size, cortex slightly hyperechoic, no hydronephrosis, no stones.',
        ],
        ['Diagnosis', 'Chronic kidney disease G3b A3, most likely diabetic kidney disease with a hypertensive component, accelerated by NSAID use. Arterial hypertension, insufficiently controlled. Vitamin D deficiency.'],
        [
          'Plan',
          'We are stopping ibuprofen and replacing it with paracetamol. We are starting dapagliflozin 10 mg and increasing perindopril to 10 mg; please check creatinine and potassium in two weeks. A slight fall in eGFR in the first weeks is expected. We are reducing metformin to 500 mg twice daily. Blood pressure target below 130/80 mmHg, with home readings. Luc will see the dietitian for salt restriction. Start vitamin D 25,000 IU monthly. We would like to start a chronic kidney disease care pathway together. Luc knows the sick day rules. Review in three months with bloods and UACR; if albuminuria persists we will consider finerenone. He will get in touch urgently if passing much less urine, blood in the urine, rapid weight gain, breathlessness or muscle weakness with palpitations.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, nephrologist',
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
      { label: 'Rapport de consultation', description: 'Modèle Néphrologie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Prescriptions', description: 'Forxiga 10 mg, Coversyl 10 mg, Metformax 500 mg, D-Cure 25 000 UI' },
      { label: 'Demande de biologie', description: 'Créatinine et potassium après 2 semaines, bilan rénal avec RAC après 3 mois' },
      { label: 'Orientation vers la diététicienne', description: 'Restriction sodée, protéines 0,8 g/kg' },
      { label: 'Trajet de soins insuffisance rénale chronique', description: 'Contrat entre médecin traitant, néphrologue et patient' },
      { label: 'Explication pour le patient', description: 'Règles des jours de maladie, quels antidouleurs oui ou non, manger peu salé' },
    ],
    previews: [
      'Diagnostic : maladie rénale chronique G3b A3, très probablement néphropathie diabétique avec composante hypertensive, accélérée par la prise d’AINS. Plan : arrêt de l’ibuprofène, début de dapagliflozine 10 mg, périndopril à 10 mg.',
      'Cher confrère, j’ai vu votre patient M. Nefron pour une fonction rénale en baisse, d’un DFGe de 58 à 38 en deux ans, avec albuminurie. Le tableau évoque une néphropathie diabétique, accélérée par la prise quotidienne d’ibuprofène. Nous arrêtons l’ibuprofène et commençons la dapagliflozine ; merci de contrôler créatinine et potassium dans deux semaines.',
      'Forxiga 10 mg, 1× par jour. Coversyl 10 mg, 1× par jour. Metformax 500 mg, 2× par jour. D-Cure 25 000 UI, 1 ampoule par mois.',
      'Dans 2 semaines : créatinine, DFGe, potassium. Dans 3 mois : fonction rénale, ionogramme, bicarbonates, hémoglobine, HbA1c, RAC.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patient Luc Nefron, né le 22 juin 1962, que j’ai vu récemment en consultation de néphrologie.',
      sections: [
        ['Motif de contact', 'Adressé pour une fonction rénale en baisse (DFGe 58 en 2024, 49 en 2025, 38 ml/min/1,73 m² maintenant) et une albuminurie (RAC 420 mg/g).'],
        [
          'Anamnèse',
          'Peu de plaintes : plus vite fatigué, nycturie 2×, parfois des urines mousseuses, œdème des chevilles le soir. Pas d’hématurie macroscopique, pas de douleur lombaire. Diabète de type 2 depuis 2016 avec rétinopathie légère, hypertension depuis 2014, hypercholestérolémie. Prend depuis l’été presque tous les jours de l’ibuprofène 600 mg pour une gonarthrose droite. Tension à domicile autour de 148/86 mmHg. Mange salé. Ex-fumeur. Pas de maladie rénale dans la famille. Pas d’allergies, pas d’anticoagulants.',
        ],
        [
          'Examen clinique',
          'Tension 152/88 mmHg, pouls 76 par minute régulier. Poids 94 kg, IMC 30,3. Léger œdème prenant le godet aux deux chevilles. Pas de souffle sur les artères rénales. Sensibilité vibratoire diminuée aux deux pieds.',
        ],
        [
          'Examens complémentaires',
          'Biologie : créatinine 1,87 mg/dl, DFGe 38, RAC 420 mg/g, potassium 5,1 mmol/l, bicarbonates 22 mmol/l, hémoglobine 12,4 g/dl, PTH 88 pg/ml, vitamine D 18 ng/ml, HbA1c 7,6 %. Sédiment urinaire calme. Échographie rénale : reins symétriques de taille normale, cortex légèrement hyperéchogène, pas d’hydronéphrose, pas de calculs.',
        ],
        ['Diagnostic', 'Maladie rénale chronique G3b A3, très probablement néphropathie diabétique avec composante hypertensive, accélérée par la prise d’AINS. Hypertension artérielle insuffisamment contrôlée. Carence en vitamine D.'],
        [
          'Plan',
          'Nous arrêtons l’ibuprofène et le remplaçons par du paracétamol. Nous commençons la dapagliflozine 10 mg et augmentons le périndopril à 10 mg ; merci de contrôler créatinine et potassium dans deux semaines. Une légère baisse du DFGe dans les premières semaines est attendue. Nous réduisons la metformine à 500 mg deux fois par jour. Objectif tensionnel sous 130/80 mmHg, avec mesures à domicile. Luc verra la diététicienne pour la restriction sodée. Début de vitamine D 25 000 UI mensuelle. Nous souhaitons démarrer ensemble un trajet de soins insuffisance rénale chronique. Luc connaît les règles des jours de maladie. Réévaluation dans trois mois avec biologie et RAC ; en cas d’albuminurie persistante, nous envisagerons la finérénone. Il prendra contact en urgence en cas de forte baisse de la diurèse, de sang dans les urines, de prise de poids rapide, d’essoufflement ou de faiblesse musculaire avec palpitations.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, néphrologue',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function NephrologyDocumentDemo() {
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

  // Report, prescriptions and lab request generate after the consultation; the letter lands on top, as the end frame.
  // Dietitian referral, care pathway and patient leaflet wait until the visitor generates them.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<LucTitle />}>
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
/* 8 · Follow-up: P. Papil raises an alert, Luc three months on        */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; luc?: boolean; items: Questionnaire[] };

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
    noFlag: string;
    alert: string;
    detail: string;
    checkin: string;
    chat: { from: 'bot' | 'patient'; text: string }[];
    scores: string;
    higherBetter: string;
    baseline: string;
    month3: string;
    exampleData: string;
    measures: string[];
    vitals: [string, string, string][];
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
      ['P. Papil', 'Nierbiopsie · dag 1'],
      ['L. Nefron', 'Nierbescherming · maand 3 · KDQOL-36 ingevuld'],
      ['M. Henle', 'Predialyse · maand 6 · POS-S Renal ingevuld'],
      ['L. Nefron', 'Nierbescherming · week 2 · vaker plassen, uitleg gegeven'],
    ],
    noFlag: 'Geen rode vlag',
    alert: 'Meldt bloed met klonters in de urine en duizeligheid, een dag na de nierbiopsie. Neem contact op.',
    detail: 'L. Nefron · nierbescherming',
    checkin: 'Check-in maand 3',
    chat: [
      { from: 'bot', text: 'Hoe gaat het sinds uw vorige consult?' },
      { from: 'patient', text: "Beter. Ik ben minder moe na een shift, en mijn enkels zijn 's avonds niet meer dik." },
      { from: 'bot', text: 'Fijn om te horen. Hoe gaat het met uw knie zonder de Brufen?' },
      { from: 'patient', text: 'Die pillen had ik nooit als een probleem gezien. Nu neem ik paracetamol en het gaat. De manden met de duiven draag ik niet meer, ik heb een kar gekocht.' },
      { from: 'bot', text: 'Plast u veel minder dan vroeger, ziet u bloed in uw urine, of bent u kortademig?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    higherBetter: 'hoger = beter',
    baseline: 'Baseline',
    month3: 'Maand 3',
    exampleData: 'Voorbeelddata',
    measures: ['KDQOL-36 Last van de nierziekte', 'KDQOL-36 Symptomen en problemen', 'EQ-5D-5L VAS'],
    vitals: [
      ['Thuisbloeddruk', '148/86', '128/78 mmHg'],
      ['Gewicht', '94', '91 kg'],
    ],
    life: [
      ['Pijnstillers', 'Brufen bijna dagelijks', 'Paracetamol 2× per week'],
      ['Zout', '4× per week kant-en-klaar', '1× per week'],
      ['Werk', 'Moe na een shift', 'Minder moe'],
      ['Hobby', 'Draagt de duivenmanden', 'Met een kar'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de arts kiest. Is later een nierbiopsie nodig, of begint de voorbereiding op dialyse of transplantatie, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Nierbescherming',
        luc: true,
        items: [
          {
            moment: 'Week 2',
            name: 'Start nierbescherming',
            asks: 'Inname nieuwe medicatie, duizeligheid, vaker plassen, genitale jeuk of branderigheid, thuisbloeddruk, gewicht, pijnstillers, herinnering labo',
            current: true,
          },
          { moment: 'Maand 3', name: 'Opvolging nierfunctie', asks: "KDQOL-36, thuisbloeddruk, gewicht, enkels, zout, pijnstillers, slaap, werk, hobby's, open vragen, rode vlaggen", current: true },
          { moment: 'Maand 12', name: 'Opvolging nierfunctie + welzijn', asks: 'Idem, aangevuld met EQ-5D-5L en PREM' },
        ],
      },
      {
        name: 'Nierbiopsie',
        items: [
          { moment: 'Dag 1', name: 'Controle na biopsie', asks: 'Bloed in de urine, flankpijn, duizeligheid, verband' },
          { moment: 'Week 2', name: 'Voor het resultaatgesprek', asks: 'Klachten, vragen voor het gesprek' },
        ],
      },
      {
        name: 'Voorbereiding dialyse of transplantatie',
        items: [{ moment: 'Elke 3 maanden', name: 'Predialyse', asks: 'POS-S Renal, KDQOL-36, voorkeur dialyse, transplantatie of conservatief, vragen over de keuze, mantelzorg' }],
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
      ['P. Papil', 'Kidney biopsy · day 1'],
      ['L. Nefron', 'Kidney protection · month 3 · KDQOL-36 completed'],
      ['M. Henle', 'Pre-dialysis · month 6 · POS-S Renal completed'],
      ['L. Nefron', 'Kidney protection · week 2 · passing urine more often, explained'],
    ],
    noFlag: 'No red flag',
    alert: 'Reports blood with clots in the urine and dizziness, a day after the kidney biopsy. Please get in touch.',
    detail: 'L. Nefron · kidney protection',
    checkin: 'Check-in month 3',
    chat: [
      { from: 'bot', text: 'How have things been since your last appointment?' },
      { from: 'patient', text: 'Better. I’m less tired after a shift, and my ankles aren’t swollen in the evening any more.' },
      { from: 'bot', text: 'Good to hear. How is your knee without the Brufen?' },
      { from: 'patient', text: 'I’d never seen those pills as a problem. Now I take paracetamol and it’s fine. I don’t carry the pigeon baskets any more, I’ve bought a trolley.' },
      { from: 'bot', text: 'Are you passing much less urine than before, seeing blood in your urine, or feeling breathless?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    higherBetter: 'higher = better',
    baseline: 'Baseline',
    month3: 'Month 3',
    exampleData: 'Example data',
    measures: ['KDQOL-36 Burden of kidney disease', 'KDQOL-36 Symptoms and problems', 'EQ-5D-5L VAS'],
    vitals: [
      ['Home blood pressure', '148/86', '128/78 mmHg'],
      ['Weight', '94', '91 kg'],
    ],
    life: [
      ['Painkillers', 'Brufen almost daily', 'Paracetamol twice a week'],
      ['Salt', 'Ready meal 4 times a week', 'Once a week'],
      ['Work', 'Tired after a shift', 'Less tired'],
      ['Hobbies', 'Carries the pigeon baskets', 'With a trolley'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the doctor chooses. If a kidney biopsy is needed later, or preparation for dialysis or transplantation begins, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Kidney protection',
        luc: true,
        items: [
          {
            moment: 'Week 2',
            name: 'Starting kidney protection',
            asks: 'Taking the new medication, dizziness, passing urine more often, genital itching or burning, home blood pressure, weight, painkillers, lab reminder',
            current: true,
          },
          { moment: 'Month 3', name: 'Kidney function follow-up', asks: 'KDQOL-36, home blood pressure, weight, ankles, salt, painkillers, sleep, work, hobbies, open questions, red flags', current: true },
          { moment: 'Month 12', name: 'Kidney function follow-up + wellbeing', asks: 'As above, plus EQ-5D-5L and PREM' },
        ],
      },
      {
        name: 'Kidney biopsy',
        items: [
          { moment: 'Day 1', name: 'Check after biopsy', asks: 'Blood in the urine, flank pain, dizziness, dressing' },
          { moment: 'Week 2', name: 'Before the results appointment', asks: 'Symptoms, questions for the appointment' },
        ],
      },
      {
        name: 'Preparing for dialysis or transplantation',
        items: [{ moment: 'Every 3 months', name: 'Pre-dialysis', asks: 'POS-S Renal, KDQOL-36, preference for dialysis, transplantation or conservative care, questions about the choice, carers' }],
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
      ['P. Papil', 'Biopsie rénale · jour 1'],
      ['L. Nefron', 'Néphroprotection · mois 3 · KDQOL-36 rempli'],
      ['M. Henle', 'Pré-dialyse · mois 6 · POS-S Renal rempli'],
      ['L. Nefron', 'Néphroprotection · semaine 2 · urine plus souvent, explication donnée'],
    ],
    noFlag: 'Pas de signal d’alerte',
    alert: 'Signale du sang avec des caillots dans les urines et des vertiges, un jour après la biopsie rénale. Prenez contact.',
    detail: 'L. Nefron · néphroprotection',
    checkin: 'Suivi mois 3',
    chat: [
      { from: 'bot', text: 'Comment cela se passe-t-il depuis votre dernière consultation ?' },
      { from: 'patient', text: 'Mieux. Je suis moins fatigué après une journée de travail, et mes chevilles ne gonflent plus le soir.' },
      { from: 'bot', text: 'Ravi de l’entendre. Comment va votre genou sans le Brufen ?' },
      { from: 'patient', text: 'Je n’avais jamais vu ces comprimés comme un problème. Maintenant je prends du paracétamol et ça va. Je ne porte plus les paniers de pigeons, j’ai acheté un chariot.' },
      { from: 'bot', text: 'Urinez-vous beaucoup moins qu’avant, voyez-vous du sang dans vos urines, ou êtes-vous essoufflé ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    higherBetter: 'plus haut = mieux',
    baseline: 'Référence',
    month3: 'Mois 3',
    exampleData: 'Données d’exemple',
    measures: ['KDQOL-36 Fardeau de la maladie rénale', 'KDQOL-36 Symptômes et problèmes', 'EQ-5D-5L EVA'],
    vitals: [
      ['Tension à domicile', '148/86', '128/78 mmHg'],
      ['Poids', '94', '91 kg'],
    ],
    life: [
      ['Antidouleurs', 'Brufen presque tous les jours', 'Paracétamol 2× par semaine'],
      ['Sel', 'Plat préparé 4× par semaine', '1× par semaine'],
      ['Travail', 'Fatigué après une journée', 'Moins fatigué'],
      ['Loisirs', 'Porte les paniers de pigeons', 'Avec un chariot'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le médecin. Si une biopsie rénale devient nécessaire, ou si la préparation à la dialyse ou à la greffe commence, le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Néphroprotection',
        luc: true,
        items: [
          {
            moment: 'Semaine 2',
            name: 'Début de la néphroprotection',
            asks: 'Prise du nouveau traitement, vertiges, mictions plus fréquentes, démangeaisons ou brûlures génitales, tension à domicile, poids, antidouleurs, rappel biologie',
            current: true,
          },
          { moment: 'Mois 3', name: 'Suivi de la fonction rénale', asks: 'KDQOL-36, tension à domicile, poids, chevilles, sel, antidouleurs, sommeil, travail, loisirs, questions ouvertes, signaux d’alerte', current: true },
          { moment: 'Mois 12', name: 'Suivi de la fonction rénale + bien-être', asks: 'Idem, complété par l’EQ-5D-5L et le PREM' },
        ],
      },
      {
        name: 'Biopsie rénale',
        items: [
          { moment: 'Jour 1', name: 'Contrôle après biopsie', asks: 'Sang dans les urines, douleur au flanc, vertiges, pansement' },
          { moment: 'Semaine 2', name: 'Avant l’entretien de résultat', asks: 'Plaintes, questions pour l’entretien' },
        ],
      },
      {
        name: 'Préparation à la dialyse ou à la greffe',
        items: [{ moment: 'Tous les 3 mois', name: 'Pré-dialyse', asks: 'POS-S Renal, KDQOL-36, préférence dialyse, greffe ou traitement conservateur, questions sur le choix, aidants' }],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'PP', flag: true, date: '09-11-2026, 08:47' },
  { initials: 'LN', flag: false, date: '09-11-2026, 08:15' },
  { initials: 'MH', flag: false, date: '06-11-2026, 14:30' },
  { initials: 'LN', flag: false, date: '03-09-2026, 19:10', noFlag: true },
];
const LUC_ROW = 1;
// Baseline → month 3 (sales' example data), 0 to 100; here a longer bar is progress.
const SCORES: [number, number][] = [
  [56, 69],
  [79, 85],
  [62, 72],
];

export function NephrologyFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 P. Papil's alert, 6 Luc's progress opens
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
              const luc = row.i === LUC_ROW;
              const body = (
                <>
                  <PatientAvatar initials={row.initials} flag={row.flag} size={30} />
                  <span className="flex-1 min-w-0 text-left">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-semibold truncate">
                      {row.copy[0]}
                      {red && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
                      {row.noFlag && (
                        <span className="rounded-full px-1.5 py-px text-[9.5px] font-semibold" style={{ backgroundColor: NEUTRAL.bg, color: NEUTRAL.text }}>
                          {c.noFlag}
                        </span>
                      )}
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
                  {luc ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#4C5FA8]/40 bg-[#EEF0FA]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>P. Papil</b> · {c.alert}
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
                    <PatientAvatar initials="LN" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5"
              >
                {/* The month-3 check-in, in natural language */}
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

                {/* Scores: baseline in grey, month 3 in Luc's colour; here a longer bar is progress */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">
                      {c.scores}{' '}
                      <span className="ml-1 inline-flex items-center rounded-full bg-[#E9FFF7] px-2 py-0.5 text-[10.5px] font-semibold text-[#1F9E6E] align-middle">↑ {c.higherBetter}</span>
                    </p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.baseline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: LUC }} />
                        {c.month3}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const [before, after] = SCORES[i];
                      return (
                        <div key={label}>
                          <p className="flex justify-between gap-2 text-[11px] mb-1">
                            <span>
                              {label} <span className="text-[#949CB1]">· 0–100</span>
                            </span>
                            <span className="shrink-0 tabular-nums text-[#4E5670]">
                              {before} → <b className="text-[#2A3A51]">{after}</b>
                            </span>
                          </p>
                          <div className="flex flex-col gap-0.5">
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span
                                className="block h-full rounded-full bg-[#D5D9E0]"
                                initial={{ width: 0 }}
                                animate={{ width: `${before}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }}
                              />
                            </span>
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span
                                className="block h-full rounded-full"
                                style={{ backgroundColor: LUC }}
                                initial={{ width: 0 }}
                                animate={{ width: `${after}%` }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: EASE }}
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Home blood pressure and weight as two small figures with an arrow */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {c.vitals.map(([label, was, now]) => (
                      <div key={label} className="rounded-lg border border-[#E8EAEC] px-2.5 py-1.5">
                        <p className="text-[10px] text-[#949CB1]">{label}</p>
                        <p className="text-[12px] tabular-nums">
                          <span className="text-[#949CB1]">{was}</span> → <b style={{ color: LUC }}>{now}</b>
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Not only numbers: painkillers, salt, work and the pigeons */}
                  <div className="mt-3 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                    {c.life.map(([label, was, now]) => (
                      <p key={label} className="grid grid-cols-[6.5rem_1fr] gap-2 py-1.5 text-[11px]">
                        <span className="text-[#949CB1]">{label}</span>
                        <span>
                          <span className="text-[#949CB1]">{was}</span> → <b className="font-semibold">{now}</b>
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.luc ? 'border-[#4C5FA8]/30 bg-[#EEF0FA]/70' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.luc && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#4C5FA8]/20">
                            <PatientAvatar initials="LN" size={12} />
                            Luc
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
