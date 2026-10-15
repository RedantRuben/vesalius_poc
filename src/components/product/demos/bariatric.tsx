'use client';

/**
 * Module demos for the bariatric surgery variant (source: sales, "Website-inhoud bariatrie", §7). Every page follows
 * Mia Fundus (44, obesity with type 2 diabetes, hypertension and sleep apnoea) one step further, from triage to a year
 * after her Roux-en-Y gastric bypass; J. Jejunum (possible internal hernia after a bypass) is the recurring red flag.
 * The thread is the team: each discipline has its own small label in a fixed colour, so visitors see on every page
 * that surgeon, dietitian, psychologist, endocrinologist and pulmonologist work from one record. Same app UI as the
 * other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Mia keeps one avatar colour on every page, so visitors recognise her. */
const MIA = '#4F5BD5';
const MIA_SOFT = '#EEF0FD';
/** Red flags (J. Jejunum, D. Duodenum) share one red accent and the warning icon. */
const RED = APP.accent;
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };

/* ------------------------------------------------------------------ */
/* The team: one label per discipline, the same colour on every page   */
/* ------------------------------------------------------------------ */

type Discipline = 'surgeon' | 'dietitian' | 'psychologist' | 'endocrinologist' | 'pulmonologist';

const DISCIPLINE_COLOR: Record<Discipline, { text: string; bg: string }> = {
  surgeon: { text: '#0B759F', bg: '#EBF6F8' },
  dietitian: { text: '#1F8A5F', bg: '#E9F8F1' },
  psychologist: { text: '#9A3F93', bg: '#F8ECF7' },
  endocrinologist: { text: '#B4531A', bg: '#FDF1E7' },
  pulmonologist: { text: '#5E6E2A', bg: '#F1F4E6' },
};

const DISCIPLINES: Record<SiteLocale, Record<Discipline, string>> = {
  nl: { surgeon: 'Chirurg', dietitian: 'Diëtist', psychologist: 'Psycholoog', endocrinologist: 'Endocrinoloog', pulmonologist: 'Pneumoloog' },
  en: { surgeon: 'Surgeon', dietitian: 'Dietitian', psychologist: 'Psychologist', endocrinologist: 'Endocrinologist', pulmonologist: 'Pulmonologist' },
  fr: { surgeon: 'Chirurgien', dietitian: 'Diététicien', psychologist: 'Psychologue', endocrinologist: 'Endocrinologue', pulmonologist: 'Pneumologue' },
};

const TEAM: Discipline[] = ['surgeon', 'dietitian', 'psychologist', 'endocrinologist', 'pulmonologist'];

function DisciplineTag({ d, className = '' }: { d: Discipline; className?: string }) {
  const label = useLocalized(DISCIPLINES)[d];
  const { text, bg } = DISCIPLINE_COLOR[d];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-semibold whitespace-nowrap ${className}`} style={{ color: text, backgroundColor: bg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: text }} />
      {label}
    </span>
  );
}

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'MF' ? MIA : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function MiaTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="MF" size={24} />
        Mia Fundus
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: not every referral lands in the surgical pathway  */
/* ------------------------------------------------------------------ */

type Referral = 'bariatric' | 'endo' | 'revision' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Plots krampende buikpijn en braken, 14 maanden na een bypass. Mogelijk interne hernia: spoed, het secretariaat belt meteen terug.',
    referrals: { bariatric: 'Bariatrisch traject', endo: 'Endocrinologie', revision: 'Revisiechirurgie' },
    rows: [
      '14 maanden na bypass, sinds vanochtend krampende buikpijn en braken',
      'BMI 41,1 met diabetes, hypertensie en slaapapneu, 18 maanden diëtist zonder blijvend resultaat',
      'BMI 33, geen comorbiditeit',
      'Sleeve in 2019, reflux en 15 kg bijgekomen',
      'Vraag over infosessie',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Sudden cramping abdominal pain and vomiting, 14 months after a bypass. Possible internal hernia: urgent, the secretariat is calling back straight away.',
    referrals: { bariatric: 'Bariatric pathway', endo: 'Endocrinology', revision: 'Revisional surgery' },
    rows: [
      '14 months after bypass, cramping abdominal pain and vomiting since this morning',
      'BMI 41.1 with diabetes, hypertension and sleep apnoea, 18 months with a dietitian without lasting results',
      'BMI 33, no comorbidity',
      'Sleeve in 2019, reflux and 15 kg regained',
      'Question about the information session',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Douleurs abdominales crampoïdes soudaines et vomissements, 14 mois après un bypass. Possible hernie interne : urgent, le secrétariat rappelle immédiatement.',
    referrals: { bariatric: 'Parcours bariatrique', endo: 'Endocrinologie', revision: 'Chirurgie de révision' },
    rows: [
      '14 mois après un bypass, douleurs abdominales crampoïdes et vomissements depuis ce matin',
      'IMC 41,1 avec diabète, hypertension et apnée du sommeil, 18 mois de diététicien sans résultat durable',
      'IMC 33, pas de comorbidité',
      'Sleeve en 2019, reflux et 15 kg repris',
      'Question sur la séance d’information',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'J. Jejunum', initials: 'JJ', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'M. Fundus', initials: 'MF', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'bariatric' },
  { name: 'A. Antrum', initials: 'AA', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'endo' },
  { name: 'C. Cardia', initials: 'CC', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'revision' },
  { name: 'O. Omentum', initials: 'OO', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: '' },
];

// Endocrinology in its own colour (the endocrinologist's), so it is clear not every referral goes to surgery.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = { bariatric: STAYS, revision: STAYS, endo: DISCIPLINE_COLOR.endocrinologist };

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function BariatricTriageDemo() {
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
                <PatientAvatar initials="JJ" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">J. Jejunum</span>
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
/* 2 · Agenda: one pathway across the agendas of the disciplines       */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perColumn: 'Per discipline',
    ready: 'Intake ingevuld',
    elsewhere: '1 aanmelding doorgestuurd naar endocrinologie',
    types: [
      'Controle maand 3 na bypass',
      'Dringend · krampende buikpijn 14 maanden na bypass',
      'Nieuwe patiënt · revisie na sleeve',
      'Traject bariatrie · consult 1 van 3',
      'Controle maand 4 na sleeve · supplementen',
      'Traject bariatrie · pre-operatieve evaluatie',
      'Traject bariatrie · eetbuien',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perColumn: 'Per discipline',
    ready: 'Intake completed',
    elsewhere: '1 referral sent on to endocrinology',
    types: [
      'Check-up month 3 after bypass',
      'Urgent · cramping abdominal pain 14 months after bypass',
      'New patient · revision after sleeve',
      'Bariatric pathway · consultation 1 of 3',
      'Check-up month 4 after sleeve · supplements',
      'Bariatric pathway · pre-operative assessment',
      'Bariatric pathway · binge eating',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perColumn: 'Par discipline',
    ready: 'Anamnèse remplie',
    elsewhere: '1 inscription orientée vers l’endocrinologie',
    types: [
      'Contrôle mois 3 après bypass',
      'Urgent · douleurs abdominales crampoïdes 14 mois après bypass',
      'Nouveau patient · révision après sleeve',
      'Parcours bariatrique · consultation 1 sur 3',
      'Contrôle mois 4 après sleeve · suppléments',
      'Parcours bariatrique · évaluation préopératoire',
      'Parcours bariatrique · hyperphagie',
    ],
  },
};

const COLUMNS: Discipline[] = ['surgeon', 'dietitian', 'psychologist'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const SLOT_PX = 40;

type Visit = { col: number; start: number; len: number; name: string; initials: string; type: number; mia?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { col: 0, start: 0, len: 1, name: 'K. Pylorus', initials: 'KP', type: 0 },
  { col: 1, start: 0, len: 3, name: 'M. Fundus', initials: 'MF', type: 3, mia: true },
  { col: 0, start: 1, len: 2, name: 'J. Jejunum', initials: 'JJ', type: 1, flag: true },
  { col: 2, start: 3, len: 2, name: 'M. Fundus', initials: 'MF', type: 5, mia: true },
  { col: 1, start: 3, len: 1, name: 'I. Ileum', initials: 'II', type: 4 },
  { col: 0, start: 3, len: 2, name: 'C. Cardia', initials: 'CC', type: 2 },
  { col: 2, start: 5, len: 1, name: 'O. Omentum', initials: 'OO', type: 6 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const color = DISCIPLINE_COLOR[COLUMNS[visit.col]].text;
  const accent = visit.mia ? MIA : visit.flag ? RED : color;
  const background = visit.mia ? MIA_SOFT : visit.flag ? '#FFE7ED' : `${color}14`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight transition-shadow duration-500"
      style={{
        top: visit.start * SLOT_PX + 2,
        height: visit.len * SLOT_PX - 4,
        backgroundColor: background,
        borderLeft: `3px solid ${accent}`,
        // Mia's dietitian and psychologist appointments are one pathway: both light up in her colour together
        boxShadow: visit.mia && ready ? `0 0 0 1.5px ${MIA}66` : undefined,
      }}
      title={visit.mia && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.mia && <PatientAvatar initials="MF" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.mia && ready && (
        // The tick links to the pre-consultation page; its label opens on hover.
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
        >
          <Check size={10} color="#1F9E6E" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[10rem]">{readyLabel}</span>
        </motion.span>
      )}
    </motion.div>
  );
}

export function BariatricAgendaDemo() {
  const c = useLocalized(AGENDA);
  const labels = useLocalized(DISCIPLINES);
  // 1–7 visits appear, 8 Mia's two appointments light up together, her intake ticks and the referral sent on shows
  const step = useSteps(8, 480, 400);
  const shown = VISITS.slice(0, Math.min(step, VISITS.length));
  const linked = step >= 8;

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
          <span className="ml-1 px-2.5 py-1 rounded-full bg-[#EBF6F8]">{c.perColumn}</span>
        </span>
      }
    >
      <div className="bg-white rounded-xl border border-[#E8EAEC] overflow-hidden">
        <div className="grid grid-cols-[3.25rem_1fr_1fr_1fr] border-b border-[#E8EAEC]">
          <span />
          {COLUMNS.map((d, i) => (
            <span key={d} className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] font-medium border-l-2" style={{ borderLeftColor: DISCIPLINE_COLOR[d].text }}>
              <span className="truncate">{labels[d]}</span>
              <span className="w-5 h-5 shrink-0 rounded-full bg-[#06ACC1] text-white text-[10px] flex items-center justify-center tabular-nums">
                {shown.filter((v) => v.col === i).length}
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
          {COLUMNS.map((d, col) => (
            <div key={d} className="relative border-l border-[#E8EAEC]" style={{ height: HOURS.length * SLOT_PX }}>
              {HOURS.map((h, i) => (
                <span key={h} className="absolute inset-x-0 border-t border-dashed border-[#E8EAEC]" style={{ top: i * SLOT_PX }} />
              ))}
              {shown
                .filter((v) => v.col === col)
                .map((visit) => (
                  <VisitBlock key={`${col}-${visit.name}`} visit={visit} label={c.types[visit.type]} ready={linked} readyLabel={c.ready} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* A. Antrum is not in this agenda: triage sent her to endocrinology's medical programme. */}
      <p className="mt-2.5 px-1 flex items-center gap-1.5 text-[11px] text-[#949CB1] min-h-[16px]">
        {linked && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5">
            <AppIcon name="arrow-fork-down" size={11} color={DISCIPLINE_COLOR.endocrinologist.text} />
            {c.elsewhere}
          </motion.span>
        )}
      </p>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Pre-consultation: one shared intake, a short list per discipline */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: { from: 'bot' | 'patient'; text: string }[];
  reflux: string[];
  summary: string;
  copy: string;
  sharedWith: string;
  shared: string;
  summaries: [SummarySection[], SummarySection[], SummarySection[], SummarySection[]];
};

// After the second answer the weight history fills in, after the fourth the previous attempts, after her tap the reflux.
const WEIGHT_AT = 2;
const ATTEMPTS_AT = 4;
const REFLUX_AT = 6;
/** Tabs after the shared intake, one per discipline. */
const TABS: Discipline[] = ['dietitian', 'psychologist', 'endocrinologist'];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks vragen ter voorbereiding van uw traject.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Hoe is uw gewicht door de jaren heen veranderd, en wat was uw hoogste gewicht?' },
      { from: 'patient', text: 'Te zwaar sinds mijn puberteit. Na mijn twee zwangerschappen kwam er 20 kilo bij. Mijn hoogste gewicht was 116 kilo, twee jaar geleden.' },
      { from: 'bot', text: 'Welke pogingen om gewicht te verliezen deed u al, onder begeleiding, en hoe lang?' },
      { from: 'patient', text: '18 maanden bij een diëtist, min 14 kilo. En 9 maanden een prikpen, min 9 kilo. Beide keren kwam het terug.' },
      { from: 'bot', text: 'Hebt u last van zuurbranden of oprispingen?' },
      { from: 'patient', text: 'Meerdere keren per week' },
    ],
    reflux: ['Nooit', 'Soms', 'Meerdere keren per week'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    sharedWith: 'Zichtbaar voor',
    shared: 'Gedeelde intake',
    summaries: [
      [
        {
          title: 'Reden van aanmelding',
          rows: [r('Hulpvraag', '"Terug kunnen spelen met de kinderen zonder buiten adem te zijn, en van mijn diabetespillen af."'), r('Verwijzing', 'Via dr. Claes, huisarts')],
        },
        {
          title: 'Gewicht',
          rows: [
            r('Lengte / gewicht / BMI', '1,65 m / 112 kg / 41,1'),
            r('Verloop', 'Overgewicht sinds de puberteit, +20 kg na twee zwangerschappen, hoogste gewicht 116 kg (2023)', { fillAt: WEIGHT_AT }),
          ],
        },
        {
          title: 'Eerdere pogingen',
          rows: [
            r('Begeleid', 'Diëtist 18 maanden (−14 kg), semaglutide 9 maanden (−9 kg, gestopt wegens misselijkheid), Weight Watchers 2x. Telkens gewichtsherstel', {
              fillAt: ATTEMPTS_AT,
            }),
          ],
        },
        {
          title: 'Comorbiditeit',
          rows: [
            r('Diabetes', 'Type 2 sinds 2020, laatste HbA1c 7,4%'),
            r('Bloeddruk', 'Hypertensie sinds 2021, onder behandeling'),
            r('Slaapapneu', 'Sinds 2024, CPAP elke nacht'),
            r('Reflux', "Zuurbranden 3 tot 4 keer per week, 's nachts erger, ondanks maagbeschermer", { fillAt: REFLUX_AT, mark: 'Weegt mee in de keuze sleeve of bypass' }),
            r('Gewrichten', 'Pijn in beide knieën bij trappen'),
          ],
        },
        {
          title: 'Medische achtergrond',
          rows: [r('Buikoperaties', 'Keizersnede 2012'), r('Bloedverdunners', 'Nee'), r('Allergieën', 'Nee'), r('Familie', 'Moeder diabetes type 2, vader hartinfarct op 58 jaar')],
        },
        {
          title: 'Sociale anamnese',
          rows: [r('Roken / alcohol', 'Nooit gerookt / 1 glas wijn per week'), r('Kinderwens / anticonceptie', 'Geen kinderwens / de pil'), r('Steun thuis', 'Partner steunt het traject en komt mee naar de infosessie')],
        },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Administratief bediende boekhouding, zittend werk, voltijds'),
            r('Beweging en hobby', 'Wandelt met de hond, aquagym (gestopt wegens kortademigheid). Kookt graag, zingt in een koor'),
            r('Leeftijd', '44 jaar'),
          ],
        },
        { title: 'Baseline', rows: [r('IWQOL-Lite', '42 (0 tot 100, hoger = beter)')] },
      ],
      [
        { title: 'Eetpatroon', rows: [r('Maaltijden', 'Drie maaltijden, ontbijt vaak overgeslagen'), r('Tussendoor', "Snacken 's avonds, vooral na een drukke dag")] },
        { title: 'Dranken', rows: [r('Frisdrank', 'Ongeveer 1 liter per dag')] },
        { title: 'Eiwitten', rows: [r('Inname', 'Laag, weinig vlees, vis of zuivel')] },
        { title: 'Eetgedrag', rows: [r('Uit emotie', "Soms uit verveling 's avonds")] },
      ],
      [
        { title: 'Stemming', rows: [r('Laatste maanden', 'Stabiel')] },
        { title: 'Eetgedrag', rows: [r('Eetbuien', 'Nee')] },
        { title: 'Verwachtingen', rows: [r('Van de ingreep', '"Ik weet dat het een hulpmiddel is, geen wondermiddel."')] },
        { title: 'Steun', rows: [r('Thuis', 'Partner betrokken, kinderen weten ervan')] },
      ],
      [
        { title: 'Diabetes', rows: [r('Behandeling', 'Metformine en dapagliflozine'), r('Controle', "HbA1c 7,4%, geen hypo's")] },
        { title: 'Schildklier', rows: [r('Voorgeschiedenis', 'Nooit afwijkend')] },
        { title: 'Slaap', rows: [r('CPAP', 'Elke nacht, minder slaperig overdag sinds de CPAP')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of questions to prepare for your pathway.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'How has your weight changed over the years, and what was your highest weight?' },
      { from: 'patient', text: 'Overweight since my teens. After my two pregnancies I put on 20 kilos. My highest weight was 116 kilos, two years ago.' },
      { from: 'bot', text: 'What attempts to lose weight have you made with support, and for how long?' },
      { from: 'patient', text: '18 months with a dietitian, minus 14 kilos. And 9 months on an injection pen, minus 9 kilos. Both times it came back.' },
      { from: 'bot', text: 'Do you suffer from heartburn or acid coming up?' },
      { from: 'patient', text: 'Several times a week' },
    ],
    reflux: ['Never', 'Sometimes', 'Several times a week'],
    summary: 'Summary',
    copy: 'Copy the summary',
    sharedWith: 'Visible to',
    shared: 'Shared intake',
    summaries: [
      [
        {
          title: 'Reason for referral',
          rows: [r('Request for help', '"To play with the children again without getting out of breath, and to come off my diabetes tablets."'), r('Referral', 'Via Dr Claes, GP')],
        },
        {
          title: 'Weight',
          rows: [
            r('Height / weight / BMI', '1.65 m / 112 kg / 41.1'),
            r('History', 'Overweight since her teens, +20 kg after two pregnancies, highest weight 116 kg (2023)', { fillAt: WEIGHT_AT }),
          ],
        },
        {
          title: 'Previous attempts',
          rows: [
            r('Supported', 'Dietitian 18 months (−14 kg), semaglutide 9 months (−9 kg, stopped due to nausea), Weight Watchers twice. Weight regained each time', {
              fillAt: ATTEMPTS_AT,
            }),
          ],
        },
        {
          title: 'Comorbidity',
          rows: [
            r('Diabetes', 'Type 2 since 2020, latest HbA1c 7.4%'),
            r('Blood pressure', 'Hypertension since 2021, on treatment'),
            r('Sleep apnoea', 'Since 2024, CPAP every night'),
            r('Reflux', 'Heartburn 3 to 4 times a week, worse at night, despite a stomach protector', { fillAt: REFLUX_AT, mark: 'Weighs in the choice between sleeve and bypass' }),
            r('Joints', 'Pain in both knees on stairs'),
          ],
        },
        {
          title: 'Medical history',
          rows: [r('Abdominal surgery', 'Caesarean section 2012'), r('Anticoagulants', 'No'), r('Allergies', 'No'), r('Family history', 'Mother type 2 diabetes, father heart attack at 58')],
        },
        {
          title: 'Social history',
          rows: [
            r('Smoking / alcohol', 'Never smoked / 1 glass of wine a week'),
            r('Plans for pregnancy / contraception', 'None / the pill'),
            r('Support at home', 'Partner supports the pathway and is coming to the information session'),
          ],
        },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Accounts administrator, desk job, full-time'),
            r('Exercise and hobbies', 'Walks the dog, aqua aerobics (stopped due to breathlessness). Loves cooking, sings in a choir'),
            r('Age', '44'),
          ],
        },
        { title: 'Baseline', rows: [r('IWQOL-Lite', '42 (0 to 100, higher = better)')] },
      ],
      [
        { title: 'Eating pattern', rows: [r('Meals', 'Three meals, often skips breakfast'), r('In between', 'Snacks in the evening, especially after a busy day')] },
        { title: 'Drinks', rows: [r('Soft drinks', 'About 1 litre a day')] },
        { title: 'Protein', rows: [r('Intake', 'Low, little meat, fish or dairy')] },
        { title: 'Eating behaviour', rows: [r('Emotional eating', 'Sometimes out of boredom in the evening')] },
      ],
      [
        { title: 'Mood', rows: [r('Recent months', 'Stable')] },
        { title: 'Eating behaviour', rows: [r('Binge eating', 'No')] },
        { title: 'Expectations', rows: [r('Of the operation', '"I know it’s a tool, not a miracle cure."')] },
        { title: 'Support', rows: [r('At home', 'Partner involved, the children know about it')] },
      ],
      [
        { title: 'Diabetes', rows: [r('Treatment', 'Metformin and dapagliflozin'), r('Control', 'HbA1c 7.4%, no hypos')] },
        { title: 'Thyroid', rows: [r('History', 'Never abnormal')] },
        { title: 'Sleep', rows: [r('CPAP', 'Every night, less sleepy during the day since the CPAP')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions pour préparer votre parcours.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Comment votre poids a-t-il évolué au fil des années, et quel a été votre poids le plus élevé ?' },
      { from: 'patient', text: 'En surpoids depuis l’adolescence. Après mes deux grossesses, j’ai pris 20 kilos. Mon poids le plus élevé était de 116 kilos, il y a deux ans.' },
      { from: 'bot', text: 'Quelles tentatives de perte de poids avez-vous déjà faites avec un accompagnement, et pendant combien de temps ?' },
      { from: 'patient', text: '18 mois chez un diététicien, moins 14 kilos. Et 9 mois de stylo injecteur, moins 9 kilos. Les deux fois, c’est revenu.' },
      { from: 'bot', text: 'Souffrez-vous de brûlures d’estomac ou de remontées acides ?' },
      { from: 'patient', text: 'Plusieurs fois par semaine' },
    ],
    reflux: ['Jamais', 'Parfois', 'Plusieurs fois par semaine'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    sharedWith: 'Visible pour',
    shared: 'Anamnèse partagée',
    summaries: [
      [
        {
          title: 'Motif de l’inscription',
          rows: [
            r('Demande', '« Pouvoir rejouer avec les enfants sans être essoufflée, et arrêter mes comprimés pour le diabète. »'),
            r('Orientation', 'Par le Dr Claes, médecin traitant'),
          ],
        },
        {
          title: 'Poids',
          rows: [
            r('Taille / poids / IMC', '1,65 m / 112 kg / 41,1'),
            r('Évolution', 'Surpoids depuis l’adolescence, +20 kg après deux grossesses, poids maximal 116 kg (2023)', { fillAt: WEIGHT_AT }),
          ],
        },
        {
          title: 'Tentatives antérieures',
          rows: [
            r('Accompagnées', 'Diététicien 18 mois (−14 kg), sémaglutide 9 mois (−9 kg, arrêté pour nausées), Weight Watchers 2 fois. Reprise de poids à chaque fois', {
              fillAt: ATTEMPTS_AT,
            }),
          ],
        },
        {
          title: 'Comorbidités',
          rows: [
            r('Diabète', 'Type 2 depuis 2020, dernière HbA1c 7,4 %'),
            r('Tension artérielle', 'Hypertension depuis 2021, sous traitement'),
            r('Apnée du sommeil', 'Depuis 2024, CPAP chaque nuit'),
            r('Reflux', 'Brûlures d’estomac 3 à 4 fois par semaine, pires la nuit, malgré un protecteur gastrique', { fillAt: REFLUX_AT, mark: 'Pèse dans le choix entre sleeve et bypass' }),
            r('Articulations', 'Douleur aux deux genoux dans les escaliers'),
          ],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Chirurgie abdominale', 'Césarienne 2012'),
            r('Anticoagulants', 'Non'),
            r('Allergies', 'Non'),
            r('Antécédents familiaux', 'Mère diabète de type 2, père infarctus à 58 ans'),
          ],
        },
        {
          title: 'Anamnèse sociale',
          rows: [
            r('Tabac / alcool', 'N’a jamais fumé / 1 verre de vin par semaine'),
            r('Désir de grossesse / contraception', 'Non / la pilule'),
            r('Soutien à la maison', 'Le partenaire soutient le parcours et vient à la séance d’information'),
          ],
        },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Employée administrative en comptabilité, travail assis, temps plein'),
            r('Activité et loisirs', 'Promène le chien, aquagym (arrêtée pour essoufflement). Aime cuisiner, chante dans une chorale'),
            r('Âge', '44 ans'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('IWQOL-Lite', '42 (0 à 100, plus haut = mieux)')] },
      ],
      [
        { title: 'Habitudes alimentaires', rows: [r('Repas', 'Trois repas, saute souvent le petit-déjeuner'), r('Entre les repas', 'Grignotage le soir, surtout après une journée chargée')] },
        { title: 'Boissons', rows: [r('Sodas', 'Environ 1 litre par jour')] },
        { title: 'Protéines', rows: [r('Apport', 'Faible, peu de viande, de poisson ou de produits laitiers')] },
        { title: 'Comportement alimentaire', rows: [r('Émotionnel', 'Parfois par ennui le soir')] },
      ],
      [
        { title: 'Humeur', rows: [r('Derniers mois', 'Stable')] },
        { title: 'Comportement alimentaire', rows: [r('Crises d’hyperphagie', 'Non')] },
        { title: 'Attentes', rows: [r('De l’intervention', '« Je sais que c’est un outil, pas un remède miracle. »')] },
        { title: 'Soutien', rows: [r('À la maison', 'Partenaire impliqué, les enfants sont au courant')] },
      ],
      [
        { title: 'Diabète', rows: [r('Traitement', 'Metformine et dapagliflozine'), r('Contrôle', 'HbA1c 7,4 %, pas d’hypoglycémies')] },
        { title: 'Thyroïde', rows: [r('Antécédents', 'Jamais anormale')] },
        { title: 'Sommeil', rows: [r('CPAP', 'Chaque nuit, moins somnolente en journée depuis la CPAP')] },
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

export function BariatricPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const labels = useLocalized(DISCIPLINES);
  const total = c.chat.length;
  // 1–5 the conversation, 6 she taps her answer on reflux and it lands, marked, in the shared intake
  const step = useSteps(total, 1000, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // The shared intake opens on weight, attempts and comorbidity; the discipline tabs are short, so fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? i >= 1 && i <= 3 : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));
  const tabs = [c.shared, ...TABS.map((d) => labels[d])];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 6}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step === total - 1 && (
          // Three answers, tighter than the usual yes / no pair, so they fit the phone
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-1.5 pt-1">
            {c.reflux.map((option) => (
              <span key={option} className="px-2.5 py-1.5 rounded-lg ring-1 ring-[#06ACC1] text-[#06ACC1] text-[11px] font-medium">
                {option}
              </span>
            ))}
          </motion.div>
        )}
      </Phone>

      <AppCard icon="chat" title={c.summary} action={<AppButton variant="subtle" icon="copy">{c.copy}</AppButton>} bodyClassName="px-4 pb-2">
        {/* One record for the whole team */}
        <p className="flex flex-wrap items-center gap-1.5 py-2.5 border-b border-[#E8EAEC] -mx-4 px-4 text-[11px] text-[#949CB1]">
          <AppIcon name="users-group" size={13} color={APP.darkGrey} />
          {c.sharedWith}
          {TEAM.map((d) => (
            <DisciplineTag key={d} d={d} />
          ))}
        </p>
        <div className="flex gap-5 border-b border-[#E8EAEC] text-[13px] -mx-4 px-4 overflow-x-auto" role="tablist">
          {tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`py-2.5 -mb-px shrink-0 inline-flex items-center gap-1.5 border-b-2 transition-colors ${tab === i ? 'border-[#06ACC1] text-[#2A3A51] font-medium' : 'border-transparent text-[#949CB1] hover:text-[#2A3A51]'}`}
            >
              {i === 0 ? <PatientAvatar initials="MF" size={18} /> : <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DISCIPLINE_COLOR[TABS[i - 1]].text }} />}
              {label}
            </button>
          ))}
        </div>
        {sections.map((section, i) => {
          const expanded = isOpen(i);
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
                      {section.rows.map((row) => {
                        const known = tab !== 0 || !row.fillAt || step >= row.fillAt;
                        const marked = row.mark && known;
                        return (
                          <div key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${marked ? 'my-1 -ml-1 pl-5 pr-2 py-1.5 rounded-lg bg-[#FFF6E8] ring-1 ring-[#F59E0C]/30' : ''}`}>
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
                            {marked && (
                              <motion.span
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-[#C2410C]"
                              >
                                <AppIcon name="warning" size={11} color="#C2410C" />
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
/* 4 · Voice Reception: she calls, the pathway starts by itself        */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts heeft me doorverwezen voor een maagverkleining. Hoe begin ik daaraan?' },
      { from: 'bot', text: 'Fijn dat u belt. Mag ik uw lengte en gewicht vragen? En wordt u behandeld voor suikerziekte, hoge bloeddruk of slaapapneu?' },
      { from: 'patient', text: '1,65 meter en 112 kilo. Ik heb diabetes en ik slaap met een CPAP.' },
      { from: 'bot', text: 'Dank u. Hebt u al eerder een ingreep aan uw maag gehad?' },
      { from: 'patient', text: 'Nee, nog nooit.' },
      {
        from: 'bot',
        text: 'Dan plan ik u in voor de infosessie van het obesitasteam. U krijgt ook een vragenlijst via WhatsApp, zodat de diëtist, de psycholoog en de chirurg uw traject kunnen voorbereiden.',
      },
    ],
    tasks: 'Taken',
    task: 'Ingepland voor de infosessie bariatrie: BMI 41, diabetes en slaapapneu, geen eerdere ingreep.',
    done: ['Infosessie ingepland', 'Intake verstuurd'],
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
      { from: 'patient', text: 'Hello, my GP has referred me for weight-loss surgery. How do I get started?' },
      { from: 'bot', text: 'Thank you for calling. May I ask your height and weight? And are you being treated for diabetes, high blood pressure or sleep apnoea?' },
      { from: 'patient', text: '1.65 metres and 112 kilos. I have diabetes and I sleep with a CPAP.' },
      { from: 'bot', text: 'Thank you. Have you had an operation on your stomach before?' },
      { from: 'patient', text: 'No, never.' },
      {
        from: 'bot',
        text: 'Then I’ll book you into the obesity team’s information session. You’ll also receive a questionnaire on WhatsApp, so the dietitian, the psychologist and the surgeon can prepare your pathway.',
      },
    ],
    tasks: 'Tasks',
    task: 'Booked into the bariatric information session: BMI 41, diabetes and sleep apnoea, no previous surgery.',
    done: ['Information session booked', 'Intake sent'],
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant m’a orientée pour une chirurgie de l’obésité. Comment est-ce que je commence ?' },
      { from: 'bot', text: 'Merci de votre appel. Puis-je vous demander votre taille et votre poids ? Et êtes-vous traitée pour un diabète, une hypertension ou une apnée du sommeil ?' },
      { from: 'patient', text: '1,65 mètre et 112 kilos. J’ai du diabète et je dors avec une CPAP.' },
      { from: 'bot', text: 'Merci. Avez-vous déjà été opérée de l’estomac ?' },
      { from: 'patient', text: 'Non, jamais.' },
      {
        from: 'bot',
        text: 'Je vous inscris alors à la séance d’information de l’équipe obésité. Vous recevrez aussi un questionnaire via WhatsApp, pour que le diététicien, le psychologue et le chirurgien puissent préparer votre parcours.',
      },
    ],
    tasks: 'Tâches',
    task: 'Inscrite à la séance d’information bariatrique : IMC 41, diabète et apnée du sommeil, pas d’intervention antérieure.',
    done: ['Séance d’information planifiée', 'Anamnèse envoyée'],
    details: 'Détails du dépistage',
    patient: 'Patiente',
    channel: 'Canal',
    incoming: 'Appel entrant',
    language: 'Langue',
    languageValue: 'Français',
    transfer: 'Transféré',
    transferValue: 'Pas nécessaire',
    transcript: 'Voir la transcription',
  },
};

export function BariatricVoiceDemo() {
  const c = useLocalized(VOICE);
  const lines = c.lines.length;
  // 1–6 transcript, 7 and 8 the two tasks tick off, 9 completed without anyone stepping in
  const step = useSteps(lines + 3, 1000, 500);
  const status: ScreeningStatus = step >= lines + 3 ? 'COMPLETED' : step >= 1 ? 'IN_PROGRESS' : 'STARTED';

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
            <span className="block text-sm font-semibold">+32 4•• •• 31 58</span>
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
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-1 text-[12px] leading-snug text-[#4E5670]">
                {c.task}
              </motion.p>
              {c.done.map((label, i) =>
                step >= lines + 1 + i ? (
                  <motion.div key={label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 rounded-lg bg-[#E9FFF7] px-3 py-2 text-[12px] font-medium">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
                      className="w-4 h-4 rounded-full bg-[#37C18D] text-white flex items-center justify-center shrink-0"
                    >
                      <Check size={10} color="#fff" />
                    </motion.span>
                    {label}
                  </motion.div>
                ) : null,
              )}
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
                <PatientAvatar initials="MF" size={18} />
                M. Fundus
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
              step >= lines + 3 ? (
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
/* 5 · Scribe: the surgeon after the MDT, the whole team in the note   */
/* ------------------------------------------------------------------ */

type NoteSection = { title: string; text?: string; rows?: [Discipline, string][]; clamp: boolean };

const SCRIBE: Record<
  SiteLocale,
  {
    back: string;
    consultation: string;
    template: string;
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
    template: 'Bariatrie',
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
      { who: 'doctor', text: 'Het team heeft uw dossier besproken. Door uw zuurbranden en de kleine breuk aan uw maag raden we een bypass aan, geen sleeve.' },
      { who: 'patient', text: 'En die pil die ik neem, mag die blijven?' },
      { who: 'doctor', text: 'Die stopt u vier weken voor de ingreep. Na een bypass werkt de pil minder goed, dus we bespreken een alternatief.' },
      { who: 'patient', text: 'Oké. Dan bel ik mijn huisarts voor een spiraal.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Verwezen door dr. Claes voor obesitas met comorbiditeit. Overgewicht sinds de puberteit, +20 kg na twee zwangerschappen, hoogste gewicht 116 kg. Diëtist 18 maanden (−14 kg) en semaglutide 9 maanden (−9 kg), telkens gewichtsherstel. Diabetes type 2, hypertensie, slaapapneu met CPAP, reflux 3 tot 4 keer per week ondanks PPI. Keizersnede 2012. Geen bloedverdunners. Gebruikt orale anticonceptie.',
        clamp: true,
      },
      {
        title: 'Pre-operatieve evaluatie',
        rows: [
          ['dietitian', '3 consulten: eetpatroon aangepast, frisdrank afgebouwd, −3 kg.'],
          ['psychologist', 'Geen contra-indicatie, geen eetbuien, realistische verwachtingen.'],
          ['endocrinologist', 'Secundaire oorzaken uitgesloten, akkoord.'],
          ['pulmonologist', 'CPAP goed verdragen.'],
        ],
        clamp: false,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Gewicht 109 kg, lengte 1,65 m, BMI 40,0, taille 116 cm. Bloeddruk 138/86 mmHg. Centrale adipositas. Buik soepel, Pfannenstiel-litteken, geen hernia.',
        clamp: true,
      },
      {
        title: 'Aanvullende onderzoeken',
        text: 'Bloedname: HbA1c 7,4%, vitamine D 18 ng/mL, ferritine 38 µg/L. Gastroscopie: hiatushernia 2 cm, oesofagitis graad A, H. pylori negatief. Echo abdomen: steatosis hepatis, geen galstenen. MDO: positief advies.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Obesitas klasse III (BMI 40,0) met diabetes type 2, hypertensie, obstructief slaapapneu en refluxziekte met kleine hiatushernia.', clamp: false },
      {
        title: 'Beleid',
        text: 'Laparoscopische Roux-en-Y gastric bypass met herstel van de hiatushernia, gekozen boven een sleeve wegens reflux. Informed consent besproken. Twee weken eiwitrijk dieet vóór de ingreep. Dapagliflozine stoppen 3 dagen vóór de ingreep. Pil stoppen 4 weken vóór de ingreep, alternatief via huisarts. Vitamine D starten. CPAP meebrengen. Levenslang supplementen en jaarlijkse bloedname. Vangnet: koorts, hartslag boven 120, toenemende buikpijn, aanhoudend braken of kortademigheid: onmiddellijk contact.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '14-03-1982'],
      ['Vragenlijst', 'Traject bariatrie'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Bariatric surgery',
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
      { who: 'doctor', text: 'The team has discussed your case. Because of your heartburn and the small hernia at your stomach, we recommend a bypass, not a sleeve.' },
      { who: 'patient', text: 'And the pill I take, can I keep taking it?' },
      { who: 'doctor', text: 'You stop it four weeks before the operation. After a bypass the pill works less well, so we’ll discuss an alternative.' },
      { who: 'patient', text: 'OK. Then I’ll call my GP about a coil.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Referred by Dr Claes for obesity with comorbidity. Overweight since her teens, +20 kg after two pregnancies, highest weight 116 kg. Dietitian 18 months (−14 kg) and semaglutide 9 months (−9 kg), weight regained each time. Type 2 diabetes, hypertension, sleep apnoea on CPAP, reflux 3 to 4 times a week despite a PPI. Caesarean section 2012. No anticoagulants. Uses oral contraception.',
        clamp: true,
      },
      {
        title: 'Pre-operative assessment',
        rows: [
          ['dietitian', '3 consultations: eating pattern adjusted, soft drinks cut down, −3 kg.'],
          ['psychologist', 'No contraindication, no binge eating, realistic expectations.'],
          ['endocrinologist', 'Secondary causes excluded, in agreement.'],
          ['pulmonologist', 'CPAP well tolerated.'],
        ],
        clamp: false,
      },
      {
        title: 'Clinical examination',
        text: 'Weight 109 kg, height 1.65 m, BMI 40.0, waist 116 cm. Blood pressure 138/86 mmHg. Central adiposity. Abdomen soft, Pfannenstiel scar, no hernia.',
        clamp: true,
      },
      {
        title: 'Further investigations',
        text: 'Bloods: HbA1c 7.4%, vitamin D 18 ng/mL, ferritin 38 µg/L. Gastroscopy: 2 cm hiatus hernia, grade A oesophagitis, H. pylori negative. Abdominal ultrasound: hepatic steatosis, no gallstones. MDT: positive advice.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Class III obesity (BMI 40.0) with type 2 diabetes, hypertension, obstructive sleep apnoea and reflux disease with a small hiatus hernia.', clamp: false },
      {
        title: 'Plan',
        text: 'Laparoscopic Roux-en-Y gastric bypass with hiatus hernia repair, chosen over a sleeve because of reflux. Informed consent discussed. Two weeks of high-protein diet before surgery. Stop dapagliflozin 3 days before surgery. Stop the pill 4 weeks before surgery, alternative via the GP. Start vitamin D. Bring the CPAP. Lifelong supplements and annual bloods. Safety net: fever, heart rate above 120, increasing abdominal pain, persistent vomiting or breathlessness: get in touch immediately.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '14-03-1982'],
      ['Questionnaire', 'Bariatric pathway'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Chirurgie bariatrique',
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
      { who: 'doctor', text: 'L’équipe a discuté de votre dossier. À cause de vos brûlures d’estomac et de la petite hernie à l’estomac, nous recommandons un bypass, pas une sleeve.' },
      { who: 'patient', text: 'Et la pilule que je prends, je peux la garder ?' },
      { who: 'doctor', text: 'Vous l’arrêtez quatre semaines avant l’intervention. Après un bypass, la pilule fonctionne moins bien, nous allons donc discuter d’une alternative.' },
      { who: 'patient', text: 'D’accord. J’appellerai mon médecin traitant pour un stérilet.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Adressée par le Dr Claes pour obésité avec comorbidités. Surpoids depuis l’adolescence, +20 kg après deux grossesses, poids maximal 116 kg. Diététicien 18 mois (−14 kg) et sémaglutide 9 mois (−9 kg), reprise de poids à chaque fois. Diabète de type 2, hypertension, apnée du sommeil sous CPAP, reflux 3 à 4 fois par semaine malgré un IPP. Césarienne 2012. Pas d’anticoagulants. Contraception orale.',
        clamp: true,
      },
      {
        title: 'Évaluation préopératoire',
        rows: [
          ['dietitian', '3 consultations : habitudes alimentaires adaptées, sodas réduits, −3 kg.'],
          ['psychologist', 'Pas de contre-indication, pas d’hyperphagie, attentes réalistes.'],
          ['endocrinologist', 'Causes secondaires exclues, d’accord.'],
          ['pulmonologist', 'CPAP bien tolérée.'],
        ],
        clamp: false,
      },
      {
        title: 'Examen clinique',
        text: 'Poids 109 kg, taille 1,65 m, IMC 40,0, tour de taille 116 cm. Tension artérielle 138/86 mmHg. Adiposité centrale. Abdomen souple, cicatrice de Pfannenstiel, pas de hernie.',
        clamp: true,
      },
      {
        title: 'Examens complémentaires',
        text: 'Biologie : HbA1c 7,4 %, vitamine D 18 ng/mL, ferritine 38 µg/L. Gastroscopie : hernie hiatale de 2 cm, œsophagite de grade A, H. pylori négatif. Échographie abdominale : stéatose hépatique, pas de calculs biliaires. RCP : avis favorable.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Obésité de classe III (IMC 40,0) avec diabète de type 2, hypertension, apnée obstructive du sommeil et reflux avec petite hernie hiatale.', clamp: false },
      {
        title: 'Plan',
        text: 'Bypass gastrique Roux-en-Y par laparoscopie avec cure de la hernie hiatale, préféré à une sleeve en raison du reflux. Consentement éclairé discuté. Deux semaines de régime hyperprotéiné avant l’intervention. Arrêter la dapagliflozine 3 jours avant l’intervention. Arrêter la pilule 4 semaines avant l’intervention, alternative via le médecin traitant. Débuter la vitamine D. Apporter la CPAP. Suppléments à vie et prise de sang annuelle. Filet de sécurité : fièvre, fréquence cardiaque au-dessus de 120, douleur abdominale croissante, vomissements persistants ou essoufflement : contact immédiat.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '14-03-1982'],
      ['Questionnaire', 'Parcours bariatrique'],
      ['Langue', 'Français'],
    ],
  },
};

export function BariatricScribeDemo() {
  const c = useLocalized(SCRIBE);
  const labels = useLocalized(DISCIPLINES);
  const lines = c.lines.length;
  // 1–4 transcript lines while recording, 5 generating, 6 note ready
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);
  // Diagnosis and plan in full first, then the team's assessment; the rest shortened until "Show full note"
  const order = [...c.sections.filter((s) => !s.clamp && !s.rows), ...c.sections.filter((s) => s.rows), ...c.sections.filter((s) => s.clamp)];

  return (
    <AppFrame active="interactions" title={<MiaTitle back={c.back} />}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <AppCard
          icon="microphone"
          title={c.consultation}
          bodyClassName="p-4 flex flex-col gap-3"
          action={
            <span className="hidden md:flex items-center gap-1.5">
              {/* Each discipline notes in its own structure */}
              <TemplatePicker label={c.template} options={(['surgeon', 'dietitian', 'psychologist', 'endocrinologist'] as const).map((d) => labels[d])} />
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
                {order.map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{section.title}</p>
                    {section.rows ? (
                      <dl className="mt-1 rounded-lg bg-[#F9FAFB] border border-[#E8EAEC] px-3 py-1 divide-y divide-[#E8EAEC]">
                        {section.rows.map(([d, text]) => (
                          <div key={d} className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1 py-1.5 text-[12px] leading-relaxed items-baseline">
                            <dt>
                              <DisciplineTag d={d} />
                            </dt>
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

        <AppCard icon="user" title="Mia Fundus" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: what she forgot is what counts for surgery          */
/* ------------------------------------------------------------------ */

const STOP_NL = { label: 'Stoppen vóór ingreep', tone: 'amber' } as const;
const STOP_EN = { label: 'Stop before surgery', tone: 'amber' } as const;
const STOP_FR = { label: 'Arrêter avant l’intervention', tone: 'amber' } as const;

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 6 geneesmiddelen gevonden:',
    confirm: 'Ja. Pantomed en de pil was ik vergeten, die neem ik al jaren.',
    followUp: { question: 'Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× per dag, bij de maaltijd', indication: 'Diabetes type 2' },
      { name: 'Forxiga', strength: '10 mg', substance: 'Dapagliflozine', frequency: '1× per dag, ’s ochtends', indication: 'Diabetes type 2', tag: STOP_NL },
      { name: 'Lisinopril EG', strength: '20 mg', substance: 'Lisinopril', frequency: '1× per dag', indication: 'Hypertensie' },
      { name: 'Atorvastatine Sandoz', strength: '20 mg', substance: 'Atorvastatine', frequency: '1× per dag, ’s avonds', indication: 'Cholesterol' },
      { name: 'Pantomed', strength: '40 mg', substance: 'Pantoprazol', frequency: '1× per dag, voor het ontbijt', indication: 'Reflux', tag: { label: 'Zelf vergeten', tone: 'blue' } },
      { name: 'Microgynon 30', strength: '0,03 / 0,15 mg', substance: 'Ethinylestradiol / levonorgestrel', frequency: '1× per dag', indication: 'Anticonceptie', tag: STOP_NL },
    ],
    notes: [
      { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
      { label: 'Allergieën', value: 'Geen' },
      { label: 'Aandacht voor de ingreep', value: 'Forxiga 3 dagen vóór de ingreep stoppen · pil 4 weken vóór de ingreep stoppen', tone: 'warn' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 6 medicines:',
    confirm: 'Yes. I’d forgotten the Pantomed and the pill, I’ve taken those for years.',
    followUp: { question: 'Noted. Do you take anticoagulants, such as Marevan, Xarelto or Eliquis?', choices: ['Yes', 'No'], answer: 'No' },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformin', frequency: 'Twice a day, with meals', indication: 'Type 2 diabetes' },
      { name: 'Forxiga', strength: '10 mg', substance: 'Dapagliflozin', frequency: 'Once a day, in the morning', indication: 'Type 2 diabetes', tag: STOP_EN },
      { name: 'Lisinopril EG', strength: '20 mg', substance: 'Lisinopril', frequency: 'Once a day', indication: 'Hypertension' },
      { name: 'Atorvastatine Sandoz', strength: '20 mg', substance: 'Atorvastatin', frequency: 'Once a day, in the evening', indication: 'Cholesterol' },
      { name: 'Pantomed', strength: '40 mg', substance: 'Pantoprazole', frequency: 'Once a day, before breakfast', indication: 'Reflux', tag: { label: 'Forgotten', tone: 'blue' } },
      { name: 'Microgynon 30', strength: '0.03 / 0.15 mg', substance: 'Ethinylestradiol / levonorgestrel', frequency: 'Once a day', indication: 'Contraception', tag: STOP_EN },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'None (confirmed in the chat)', tone: 'ok' },
      { label: 'Allergies', value: 'None' },
      { label: 'Attention for surgery', value: 'Stop Forxiga 3 days before surgery · stop the pill 4 weeks before surgery', tone: 'warn' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 6 médicaments :',
    confirm: 'Oui. J’avais oublié le Pantomed et la pilule, je les prends depuis des années.',
    followUp: { question: 'C’est noté. Prenez-vous des anticoagulants, comme Marevan, Xarelto ou Eliquis ?', choices: ['Oui', 'Non'], answer: 'Non' },
    meds: [
      { name: 'Metformax', strength: '850 mg', substance: 'Metformine', frequency: '2× par jour, au repas', indication: 'Diabète de type 2' },
      { name: 'Forxiga', strength: '10 mg', substance: 'Dapagliflozine', frequency: '1× par jour, le matin', indication: 'Diabète de type 2', tag: STOP_FR },
      { name: 'Lisinopril EG', strength: '20 mg', substance: 'Lisinopril', frequency: '1× par jour', indication: 'Hypertension' },
      { name: 'Atorvastatine Sandoz', strength: '20 mg', substance: 'Atorvastatine', frequency: '1× par jour, le soir', indication: 'Cholestérol' },
      { name: 'Pantomed', strength: '40 mg', substance: 'Pantoprazole', frequency: '1× par jour, avant le petit-déjeuner', indication: 'Reflux', tag: { label: 'Oublié', tone: 'blue' } },
      { name: 'Microgynon 30', strength: '0,03 / 0,15 mg', substance: 'Éthinylestradiol / lévonorgestrel', frequency: '1× par jour', indication: 'Contraception', tag: STOP_FR },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'Aucun (confirmé dans le chat)', tone: 'ok' },
      { label: 'Allergies', value: 'Aucune' },
      { label: 'Attention pour l’intervention', value: 'Arrêter Forxiga 3 jours avant l’intervention · arrêter la pilule 4 semaines avant l’intervention', tone: 'warn' },
    ],
  },
});

export function BariatricMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Mia Fundus', initials: 'MF', dob: '14-03-1982', color: MIA }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: the MDT report, built from the whole team            */
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
      { label: 'MDO-verslag', description: 'Samengesteld uit de verslagen van chirurg, diëtist, psycholoog, endocrinoloog en pneumoloog' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Voorschriften', description: 'Vitamine D, supplementen na de ingreep, bloedname' },
      { label: 'Uitleg voor de patiënt', description: 'Voorbereiding: eiwitrijk dieet, medicatie stoppen, CPAP meebrengen' },
      { label: 'Attest arbeidsongeschiktheid', description: 'Herstel na de ingreep' },
    ],
    previews: [
      'MDO: positief advies. Diëtist, psycholoog, endocrinoloog en pneumoloog: geen contra-indicaties. Voorstel: laparoscopische Roux-en-Y gastric bypass met herstel van de hiatushernia, wegens reflux gekozen boven een sleeve.',
      'Geachte collega, ik zag uw patiënte mevrouw Fundus in het kader van het bariatrisch traject. Na evaluatie door diëtist, psycholoog, endocrinoloog en pneumoloog gaf het MDO een positief advies. Wegens reflux met een kleine hiatushernia plannen we een laparoscopische Roux-en-Y gastric bypass.',
      'Vitamine D-suppletie, nu te starten. Na de ingreep levenslang multivitamine, calcium met vitamine D en vitamine B12. Bloedname vóór de ingreep en daarna jaarlijks.',
      'Twee weken vóór de ingreep volgt u een eiwitrijk, energiearm dieet. Forxiga stopt u drie dagen vóór de ingreep, de pil vier weken ervoor. Breng uw CPAP mee naar het ziekenhuis.',
      'Arbeidsongeschikt vanaf de dag van de ingreep, voor vier weken, voor herstel na een laparoscopische gastric bypass.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënte Mia Fundus, geboren op 14 maart 1982, die ik recent op consultatie zag in het kader van het bariatrisch traject.',
      sections: [
        ['Reden voor contact', 'Verwezen voor obesitas met comorbiditeit.'],
        [
          'Anamnese',
          'Overgewicht sinds de puberteit, gewichtstoename na twee zwangerschappen, hoogste gewicht 116 kg. Eerdere pogingen: 18 maanden begeleiding door een diëtist (−14 kg, volledig teruggekomen) en 9 maanden semaglutide (−9 kg, gestopt wegens misselijkheid, teruggekomen). Diabetes type 2 sinds 2020, hypertensie sinds 2021, obstructief slaapapneu sinds 2024 met CPAP, reflux 3 tot 4 keer per week ondanks pantoprazol. Keizersnede in 2012. Geen bloedverdunners, geen allergieën. Medicatie: metformine 850 mg 2× per dag, dapagliflozine 10 mg, lisinopril 20 mg, atorvastatine 20 mg, pantoprazol 40 mg, Microgynon 30.',
        ],
        ['Klinisch onderzoek', 'Gewicht 109 kg, lengte 1,65 m, BMI 40,0, taille 116 cm. Bloeddruk 138/86 mmHg. Centrale adipositas. Buik soepel, Pfannenstiel-litteken, geen hernia.'],
        [
          'Aanvullende onderzoeken',
          'Bloedname: HbA1c 7,4%, vitamine D 18 ng/mL, ferritine 38 µg/L, overige waarden normaal. Gastroscopie: hiatushernia 2 cm, oesofagitis graad A, H. pylori negatief. Echo abdomen: steatosis hepatis, geen galstenen. Diëtist, psycholoog, endocrinoloog en pneumoloog: geen contra-indicaties. MDO: positief advies.',
        ],
        ['Diagnose', 'Obesitas klasse III (BMI 40,0) met diabetes type 2, hypertensie, obstructief slaapapneu en refluxziekte met kleine hiatushernia.'],
        [
          'Beleid',
          'Laparoscopische Roux-en-Y gastric bypass met herstel van de hiatushernia, gepland binnen zes weken. Twee weken vóór de ingreep een eiwitrijk, energiearm dieet. Dapagliflozine stoppen drie dagen vóór de ingreep. Microgynon stoppen vier weken vóór de ingreep; na een bypass is orale anticonceptie minder betrouwbaar, graag een alternatief bespreken, bv. een spiraal. Geen zwangerschap gedurende 12 tot 18 maanden. Vitamine D-suppletie nu starten. Na de ingreep levenslang multivitamine, calcium met vitamine D en vitamine B12, en een jaarlijkse bloedname. De diabetesmedicatie wordt na de ingreep afgebouwd volgens de glycemie. Mia weet dat ze onmiddellijk contact opneemt bij koorts, een hartslag boven 120, toenemende buikpijn, aanhoudend braken, kortademigheid of pijn in de kuit.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, bariatrisch chirurg',
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
      { label: 'MDT report', description: 'Compiled from the reports of the surgeon, dietitian, psychologist, endocrinologist and pulmonologist' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Prescriptions', description: 'Vitamin D, supplements after surgery, bloods' },
      { label: 'Explanation for the patient', description: 'Preparation: high-protein diet, stopping medication, bringing the CPAP' },
      { label: 'Fit note', description: 'Recovery after surgery' },
    ],
    previews: [
      'MDT: positive advice. Dietitian, psychologist, endocrinologist and pulmonologist: no contraindications. Proposal: laparoscopic Roux-en-Y gastric bypass with hiatus hernia repair, chosen over a sleeve because of reflux.',
      'Dear colleague, I saw your patient Mrs Fundus as part of the bariatric pathway. After assessment by the dietitian, psychologist, endocrinologist and pulmonologist, the MDT gave positive advice. Because of reflux with a small hiatus hernia, we are planning a laparoscopic Roux-en-Y gastric bypass.',
      'Vitamin D supplementation, to start now. After surgery, lifelong multivitamin, calcium with vitamin D and vitamin B12. Bloods before surgery and yearly after that.',
      'For two weeks before surgery you follow a high-protein, low-energy diet. You stop Forxiga three days before surgery and the pill four weeks before. Bring your CPAP to the hospital.',
      'Unfit for work from the day of surgery, for four weeks, to recover after a laparoscopic gastric bypass.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Mia Fundus, born on 14 March 1982, whom I recently saw in clinic as part of the bariatric pathway.',
      sections: [
        ['Reason for contact', 'Referred for obesity with comorbidity.'],
        [
          'History',
          'Overweight since her teens, weight gain after two pregnancies, highest weight 116 kg. Previous attempts: 18 months with a dietitian (−14 kg, fully regained) and 9 months of semaglutide (−9 kg, stopped due to nausea, regained). Type 2 diabetes since 2020, hypertension since 2021, obstructive sleep apnoea since 2024 on CPAP, reflux 3 to 4 times a week despite pantoprazole. Caesarean section in 2012. No anticoagulants, no allergies. Medication: metformin 850 mg twice a day, dapagliflozin 10 mg, lisinopril 20 mg, atorvastatin 20 mg, pantoprazole 40 mg, Microgynon 30.',
        ],
        ['Clinical examination', 'Weight 109 kg, height 1.65 m, BMI 40.0, waist 116 cm. Blood pressure 138/86 mmHg. Central adiposity. Abdomen soft, Pfannenstiel scar, no hernia.'],
        [
          'Further investigations',
          'Bloods: HbA1c 7.4%, vitamin D 18 ng/mL, ferritin 38 µg/L, other values normal. Gastroscopy: 2 cm hiatus hernia, grade A oesophagitis, H. pylori negative. Abdominal ultrasound: hepatic steatosis, no gallstones. Dietitian, psychologist, endocrinologist and pulmonologist: no contraindications. MDT: positive advice.',
        ],
        ['Diagnosis', 'Class III obesity (BMI 40.0) with type 2 diabetes, hypertension, obstructive sleep apnoea and reflux disease with a small hiatus hernia.'],
        [
          'Plan',
          'Laparoscopic Roux-en-Y gastric bypass with hiatus hernia repair, planned within six weeks. A high-protein, low-energy diet for two weeks before surgery. Stop dapagliflozin three days before surgery. Stop Microgynon four weeks before surgery; after a bypass, oral contraception is less reliable, so please discuss an alternative, e.g. a coil. No pregnancy for 12 to 18 months. Start vitamin D supplementation now. After surgery, lifelong multivitamin, calcium with vitamin D and vitamin B12, and yearly bloods. The diabetes medication will be reduced after surgery according to blood glucose. Mia knows to get in touch immediately with fever, a heart rate above 120, increasing abdominal pain, persistent vomiting, breathlessness or calf pain.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, bariatric surgeon',
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
      { label: 'Rapport de RCP', description: 'Composé à partir des rapports du chirurgien, du diététicien, du psychologue, de l’endocrinologue et du pneumologue' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Prescriptions', description: 'Vitamine D, suppléments après l’intervention, prise de sang' },
      { label: 'Explication pour la patiente', description: 'Préparation : régime hyperprotéiné, arrêt de médicaments, apporter la CPAP' },
      { label: 'Certificat d’incapacité de travail', description: 'Convalescence après l’intervention' },
    ],
    previews: [
      'RCP : avis favorable. Diététicien, psychologue, endocrinologue et pneumologue : pas de contre-indication. Proposition : bypass gastrique Roux-en-Y par laparoscopie avec cure de la hernie hiatale, préféré à une sleeve en raison du reflux.',
      'Cher confrère, j’ai vu votre patiente Mme Fundus dans le cadre du parcours bariatrique. Après évaluation par le diététicien, le psychologue, l’endocrinologue et le pneumologue, la RCP a rendu un avis favorable. En raison d’un reflux avec une petite hernie hiatale, nous prévoyons un bypass gastrique Roux-en-Y par laparoscopie.',
      'Supplémentation en vitamine D, à débuter maintenant. Après l’intervention, multivitamine, calcium avec vitamine D et vitamine B12 à vie. Prise de sang avant l’intervention, puis chaque année.',
      'Pendant les deux semaines avant l’intervention, vous suivez un régime hyperprotéiné et pauvre en énergie. Vous arrêtez Forxiga trois jours avant l’intervention et la pilule quatre semaines avant. Apportez votre CPAP à l’hôpital.',
      'Incapacité de travail à partir du jour de l’intervention, pendant quatre semaines, pour la convalescence après un bypass gastrique par laparoscopie.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patiente Mia Fundus, née le 14 mars 1982, que j’ai vue récemment en consultation dans le cadre du parcours bariatrique.',
      sections: [
        ['Motif de contact', 'Adressée pour obésité avec comorbidités.'],
        [
          'Anamnèse',
          'Surpoids depuis l’adolescence, prise de poids après deux grossesses, poids maximal 116 kg. Tentatives antérieures : 18 mois d’accompagnement par un diététicien (−14 kg, entièrement repris) et 9 mois de sémaglutide (−9 kg, arrêté pour nausées, repris). Diabète de type 2 depuis 2020, hypertension depuis 2021, apnée obstructive du sommeil depuis 2024 sous CPAP, reflux 3 à 4 fois par semaine malgré le pantoprazole. Césarienne en 2012. Pas d’anticoagulants, pas d’allergies. Médicaments : metformine 850 mg 2× par jour, dapagliflozine 10 mg, lisinopril 20 mg, atorvastatine 20 mg, pantoprazole 40 mg, Microgynon 30.',
        ],
        ['Examen clinique', 'Poids 109 kg, taille 1,65 m, IMC 40,0, tour de taille 116 cm. Tension artérielle 138/86 mmHg. Adiposité centrale. Abdomen souple, cicatrice de Pfannenstiel, pas de hernie.'],
        [
          'Examens complémentaires',
          'Biologie : HbA1c 7,4 %, vitamine D 18 ng/mL, ferritine 38 µg/L, autres valeurs normales. Gastroscopie : hernie hiatale de 2 cm, œsophagite de grade A, H. pylori négatif. Échographie abdominale : stéatose hépatique, pas de calculs biliaires. Diététicien, psychologue, endocrinologue et pneumologue : pas de contre-indication. RCP : avis favorable.',
        ],
        ['Diagnostic', 'Obésité de classe III (IMC 40,0) avec diabète de type 2, hypertension, apnée obstructive du sommeil et reflux avec petite hernie hiatale.'],
        [
          'Plan',
          'Bypass gastrique Roux-en-Y par laparoscopie avec cure de la hernie hiatale, prévu dans les six semaines. Régime hyperprotéiné et pauvre en énergie pendant les deux semaines précédant l’intervention. Arrêter la dapagliflozine trois jours avant l’intervention. Arrêter Microgynon quatre semaines avant l’intervention ; après un bypass, la contraception orale est moins fiable, merci de discuter d’une alternative, p. ex. un stérilet. Pas de grossesse pendant 12 à 18 mois. Débuter dès maintenant une supplémentation en vitamine D. Après l’intervention, multivitamine, calcium avec vitamine D et vitamine B12 à vie, et une prise de sang annuelle. Les antidiabétiques seront réduits après l’intervention selon la glycémie. Mia sait qu’elle doit prendre contact immédiatement en cas de fièvre, de fréquence cardiaque au-dessus de 120, de douleur abdominale croissante, de vomissements persistants, d’essoufflement ou de douleur au mollet.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, chirurgien bariatrique',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const MDT = 0;
const LETTER = 1;

export function BariatricDocumentDemo() {
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

  // MDT report and prescriptions generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(MDT), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(LETTER), 2900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<MiaTitle />}>
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
                      {/* The MDT report shows the five disciplines it is built from */}
                      {i === MDT ? (
                        <span className="mt-1 flex flex-wrap gap-1">
                          {TEAM.map((d) => (
                            <DisciplineTag key={d} d={d} />
                          ))}
                        </span>
                      ) : (
                        <span className="block text-[11px] text-[#949CB1] truncate">{template.description}</span>
                      )}
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
/* 8 · Follow-up: two alerts, Mia a year after her bypass              */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; mia?: boolean; items: Questionnaire[] };

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
    alertTexts: [string, string];
    detail: string;
    checkin: string;
    chat: { from: 'bot' | 'patient'; text: string }[];
    scores: string;
    exampleData: string;
    moments: [string, string, string];
    measured: string;
    lowerBetter: string;
    higherBetter: string;
    weight: string;
    iwqol: string;
    table: [string, string, string, string][];
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
    urgent: 'U hebt 2 waarschuwingstaken',
    screenings: 'Recente Screenings',
    alerts: 'Waarschuwingstaken',
    noAlerts: 'Geen waarschuwingstaken.',
    viewAll: 'Bekijk alle',
    rows: [
      ['J. Jejunum', 'Bypass · maand 14'],
      ['D. Duodenum', 'Sleeve · dag 9'],
      ['M. Fundus', 'Bypass · maand 12 · vragenlijst ingevuld'],
      ['I. Ileum', 'Sleeve · maand 4 · doorgestuurd naar diëtist'],
      ['K. Pylorus', 'Bypass · maand 3'],
    ],
    alertTexts: [
      'Meldt sinds vanochtend krampende buikpijn en braken, 14 maanden na de bypass. Mogelijk interne hernia: neem nu contact op.',
      'Houdt sinds gisteren geen drinken binnen, minder dan een halve liter per dag. Neem vandaag contact op.',
    ],
    detail: 'M. Fundus · bypass',
    checkin: 'Check-in maand 12',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met eten sinds uw vorige check-in?' },
      { from: 'patient', text: 'Goed. Kleine porties, eerst de eiwitten. Frisdrank drink ik niet meer.' },
      { from: 'bot', text: 'Fijn. Wat lukt nu dat een jaar geleden niet lukte?' },
      { from: 'patient', text: 'Ik zing de lange stukken in het koor weer in één adem. En aquagym doe ik weer elke week.' },
      { from: 'bot', text: 'Neemt u uw supplementen nog elke dag? En hebt u buikpijn, braken of zwarte stoelgang gehad?' },
      { from: 'patient', text: 'Ja, elke dag. En nee, niets van dat.' },
    ],
    scores: 'Verloop',
    exampleData: 'Voorbeelddata',
    moments: ['Vóór ingreep', 'Maand 3', 'Maand 12'],
    measured: 'gemeten',
    lowerBetter: 'lager = beter',
    higherBetter: 'hoger = beter',
    weight: 'Gewicht',
    iwqol: 'IWQOL-Lite',
    table: [
      ['%TWL sinds aanmelding (gemeten)', '3%', '16%', '30%'],
      ['HbA1c (labo, lager = beter)', '7,4%', '6,3%', '5,7%'],
      ['EQ-5D-5L VAS (hoger = beter)', '55', '68', '82'],
      ['Slaap', 'CPAP, moe', 'Beter', 'Uitgerust, CPAP-herevaluatie gepland'],
      ['Werk', 'Voltijds, moe na de dag', 'Hervat na 4 weken', 'Voltijds, meer energie'],
      ['Hobby', 'Geen aquagym, buiten adem in het koor', 'Wandelt langer met de hond', 'Aquagym en koor'],
      ['Supplementen', '–', 'Dagelijks', 'Dagelijks, B12 elke 3 maanden'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die het team kiest, en loopt levenslang. Diëtist en chirurg zien dezelfde antwoorden.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Bypass',
        mia: true,
        items: [
          { moment: 'Dag 2 en week 1', name: 'Controle na ingreep', asks: 'Hoeveel drinken lukt, braken, pijn, wonde, koorts, hartslag', current: true },
          { moment: 'Week 4 en 6', name: 'Overgang naar vaste voeding (diëtist)', asks: 'Eiwitinname, verdragen voeding, dumping, supplementen', current: true },
          { moment: 'Maand 3, 6 en 12', name: 'Opvolging bypass + welzijn', asks: 'Gewicht, IWQOL-Lite, EQ-5D-5L, eten, slaap, werk, hobby’s, supplementen, open vragen', current: true },
          { moment: 'Jaarlijks, levenslang', name: 'Jaarlijkse controle', asks: 'Gewicht, supplementen, bloedname, krampende buikpijn, PREM' },
        ],
      },
      {
        name: 'Sleeve',
        items: [
          { moment: 'Dag 2 en week 1', name: 'Controle na ingreep', asks: 'Drinken, braken, pijn, wonde, koorts' },
          { moment: 'Maand 3, 6, 12, daarna jaarlijks', name: 'Opvolging sleeve', asks: 'Gewicht, reflux (GERD-HRQL, lager = beter), IWQOL-Lite, supplementen' },
        ],
      },
      {
        name: 'Medisch programma (leefstijl, GLP-1)',
        items: [{ moment: 'Maand 3, 6 en 12', name: 'Opvolging medisch traject', asks: 'Gewicht, verdraagzaamheid medicatie, IWQOL-Lite, EQ-5D-5L' }],
      },
    ],
  },
  en: {
    hello: 'Hello Dr Vesalius!',
    calm: 'You have no urgent interactions',
    urgent: 'You have 2 alert tasks',
    screenings: 'Recent Screenings',
    alerts: 'Alert Tasks',
    noAlerts: 'No alert tasks.',
    viewAll: 'View all',
    rows: [
      ['J. Jejunum', 'Bypass · month 14'],
      ['D. Duodenum', 'Sleeve · day 9'],
      ['M. Fundus', 'Bypass · month 12 · questionnaire completed'],
      ['I. Ileum', 'Sleeve · month 4 · sent to the dietitian'],
      ['K. Pylorus', 'Bypass · month 3'],
    ],
    alertTexts: [
      'Reports cramping abdominal pain and vomiting since this morning, 14 months after the bypass. Possible internal hernia: get in touch now.',
      'Unable to keep fluids down since yesterday, less than half a litre a day. Get in touch today.',
    ],
    detail: 'M. Fundus · bypass',
    checkin: 'Check-in month 12',
    chat: [
      { from: 'bot', text: 'How has eating been going since your last check-in?' },
      { from: 'patient', text: 'Well. Small portions, protein first. I don’t drink soft drinks any more.' },
      { from: 'bot', text: 'Good. What can you do now that you couldn’t a year ago?' },
      { from: 'patient', text: 'I can sing the long passages in the choir in one breath again. And I’m back at aqua aerobics every week.' },
      { from: 'bot', text: 'Are you still taking your supplements every day? And have you had abdominal pain, vomiting or black stools?' },
      { from: 'patient', text: 'Yes, every day. And no, none of that.' },
    ],
    scores: 'Progress',
    exampleData: 'Example data',
    moments: ['Before surgery', 'Month 3', 'Month 12'],
    measured: 'measured',
    lowerBetter: 'lower = better',
    higherBetter: 'higher = better',
    weight: 'Weight',
    iwqol: 'IWQOL-Lite',
    table: [
      ['%TWL since referral (measured)', '3%', '16%', '30%'],
      ['HbA1c (lab, lower = better)', '7.4%', '6.3%', '5.7%'],
      ['EQ-5D-5L VAS (higher = better)', '55', '68', '82'],
      ['Sleep', 'CPAP, tired', 'Better', 'Rested, CPAP review planned'],
      ['Work', 'Full-time, tired after the day', 'Back after 4 weeks', 'Full-time, more energy'],
      ['Hobbies', 'No aqua aerobics, out of breath in the choir', 'Walks the dog for longer', 'Aqua aerobics and choir'],
      ['Supplements', '–', 'Daily', 'Daily, B12 every 3 months'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the team chooses, and continues for life. Dietitian and surgeon see the same answers.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Bypass',
        mia: true,
        items: [
          { moment: 'Day 2 and week 1', name: 'Post-operative check', asks: 'How much she can drink, vomiting, pain, wound, fever, heart rate', current: true },
          { moment: 'Weeks 4 and 6', name: 'Move to solid food (dietitian)', asks: 'Protein intake, foods tolerated, dumping, supplements', current: true },
          { moment: 'Months 3, 6 and 12', name: 'Bypass follow-up + wellbeing', asks: 'Weight, IWQOL-Lite, EQ-5D-5L, eating, sleep, work, hobbies, supplements, open questions', current: true },
          { moment: 'Yearly, for life', name: 'Annual check-up', asks: 'Weight, supplements, bloods, cramping abdominal pain, PREM' },
        ],
      },
      {
        name: 'Sleeve',
        items: [
          { moment: 'Day 2 and week 1', name: 'Post-operative check', asks: 'Drinking, vomiting, pain, wound, fever' },
          { moment: 'Months 3, 6, 12, then yearly', name: 'Sleeve follow-up', asks: 'Weight, reflux (GERD-HRQL, lower = better), IWQOL-Lite, supplements' },
        ],
      },
      {
        name: 'Medical programme (lifestyle, GLP-1)',
        items: [{ moment: 'Months 3, 6 and 12', name: 'Medical pathway follow-up', asks: 'Weight, medication tolerance, IWQOL-Lite, EQ-5D-5L' }],
      },
    ],
  },
  fr: {
    hello: 'Bonjour Dr Vesalius !',
    calm: 'Vous n’avez aucune interaction urgente',
    urgent: 'Vous avez 2 tâches d’alerte',
    screenings: 'Dépistages Récents',
    alerts: 'Tâches d’alerte',
    noAlerts: 'Aucune tâche d’alerte.',
    viewAll: 'Voir tout',
    rows: [
      ['J. Jejunum', 'Bypass · mois 14'],
      ['D. Duodenum', 'Sleeve · jour 9'],
      ['M. Fundus', 'Bypass · mois 12 · questionnaire rempli'],
      ['I. Ileum', 'Sleeve · mois 4 · orientée vers le diététicien'],
      ['K. Pylorus', 'Bypass · mois 3'],
    ],
    alertTexts: [
      'Signale depuis ce matin des douleurs abdominales crampoïdes et des vomissements, 14 mois après le bypass. Possible hernie interne : prenez contact maintenant.',
      'Ne garde plus les liquides depuis hier, moins d’un demi-litre par jour. Prenez contact aujourd’hui.',
    ],
    detail: 'M. Fundus · bypass',
    checkin: 'Suivi mois 12',
    chat: [
      { from: 'bot', text: 'Comment se passe l’alimentation depuis votre dernier suivi ?' },
      { from: 'patient', text: 'Bien. Petites portions, les protéines d’abord. Je ne bois plus de sodas.' },
      { from: 'bot', text: 'Très bien. Qu’arrivez-vous à faire maintenant que vous ne pouviez pas il y a un an ?' },
      { from: 'patient', text: 'Je chante à nouveau les longs passages à la chorale d’une seule respiration. Et je refais de l’aquagym chaque semaine.' },
      { from: 'bot', text: 'Prenez-vous toujours vos suppléments chaque jour ? Et avez-vous eu des douleurs abdominales, des vomissements ou des selles noires ?' },
      { from: 'patient', text: 'Oui, chaque jour. Et non, rien de tout ça.' },
    ],
    scores: 'Évolution',
    exampleData: 'Données d’exemple',
    moments: ['Avant l’intervention', 'Mois 3', 'Mois 12'],
    measured: 'mesuré',
    lowerBetter: 'plus bas = mieux',
    higherBetter: 'plus haut = mieux',
    weight: 'Poids',
    iwqol: 'IWQOL-Lite',
    table: [
      ['%TWL depuis l’inscription (mesuré)', '3 %', '16 %', '30 %'],
      ['HbA1c (labo, plus bas = mieux)', '7,4 %', '6,3 %', '5,7 %'],
      ['EQ-5D-5L EVA (plus haut = mieux)', '55', '68', '82'],
      ['Sommeil', 'CPAP, fatiguée', 'Mieux', 'Reposée, réévaluation de la CPAP prévue'],
      ['Travail', 'Temps plein, fatiguée en fin de journée', 'Reprise après 4 semaines', 'Temps plein, plus d’énergie'],
      ['Loisirs', 'Pas d’aquagym, essoufflée à la chorale', 'Promène le chien plus longtemps', 'Aquagym et chorale'],
      ['Suppléments', '–', 'Chaque jour', 'Chaque jour, B12 tous les 3 mois'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par l’équipe, et dure toute la vie. Diététicien et chirurgien voient les mêmes réponses.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Bypass',
        mia: true,
        items: [
          { moment: 'Jour 2 et semaine 1', name: 'Contrôle après l’intervention', asks: 'Quantité bue, vomissements, douleur, plaie, fièvre, fréquence cardiaque', current: true },
          { moment: 'Semaines 4 et 6', name: 'Passage à l’alimentation solide (diététicien)', asks: 'Apport en protéines, aliments tolérés, dumping, suppléments', current: true },
          { moment: 'Mois 3, 6 et 12', name: 'Suivi du bypass + bien-être', asks: 'Poids, IWQOL-Lite, EQ-5D-5L, alimentation, sommeil, travail, loisirs, suppléments, questions ouvertes', current: true },
          { moment: 'Chaque année, à vie', name: 'Contrôle annuel', asks: 'Poids, suppléments, prise de sang, douleurs abdominales crampoïdes, PREM' },
        ],
      },
      {
        name: 'Sleeve',
        items: [
          { moment: 'Jour 2 et semaine 1', name: 'Contrôle après l’intervention', asks: 'Boire, vomissements, douleur, plaie, fièvre' },
          { moment: 'Mois 3, 6, 12, puis chaque année', name: 'Suivi de la sleeve', asks: 'Poids, reflux (GERD-HRQL, plus bas = mieux), IWQOL-Lite, suppléments' },
        ],
      },
      {
        name: 'Programme médical (mode de vie, GLP-1)',
        items: [{ moment: 'Mois 3, 6 et 12', name: 'Suivi du parcours médical', asks: 'Poids, tolérance des médicaments, IWQOL-Lite, EQ-5D-5L' }],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'JJ', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'DD', flag: true, date: '25-09-2026, 08:52' },
  { initials: 'MF', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'II', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'KP', flag: false, date: '23-09-2026, 09:30' },
];
const MIA_ROW = 2;
const FLAGGED = FOLLOW_ROWS.map((row, i) => ({ ...row, i })).filter((row) => row.flag);

/** Three measured points as a small line; the arrow and label say which way is progress. */
function Trend({ label, unit, values, moments, direction, directionLabel, measured }: { label: string; unit: string; values: [number, number, number]; moments: [string, string, string]; direction: 'down' | 'up'; directionLabel: string; measured?: string }) {
  const W = 220;
  const H = 64;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const y = (v: number) => 10 + ((max - v) / (max - min || 1)) * (H - 20);
  const x = (i: number) => 14 + (i * (W - 28)) / 2;
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  return (
    <div className="rounded-xl border border-[#E8EAEC] px-3 py-2.5">
      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold">
        {label}
        {measured && <span className="rounded-full bg-[#F4F5F8] px-1.5 py-px text-[9.5px] font-medium text-[#4E5670]">{measured}</span>}
        <span className="ml-auto inline-flex items-center rounded-full bg-[#E9FFF7] px-2 py-0.5 text-[10px] font-semibold text-[#1F9E6E]">
          {direction === 'down' ? '↓' : '↑'} {directionLabel}
        </span>
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16 mt-1" aria-hidden="true">
        <motion.polyline points={points} fill="none" stroke={MIA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3, ease: EASE }} />
        {values.map((v, i) => (
          <motion.circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill={i === 2 ? MIA : '#fff'} stroke={MIA} strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.3 }} />
        ))}
      </svg>
      <div className="grid grid-cols-3 text-center text-[10px] text-[#949CB1]">
        {values.map((v, i) => (
          <span key={i}>
            <b className={`block text-[12px] tabular-nums ${i === 2 ? 'text-[#2A3A51]' : 'text-[#4E5670]'}`}>
              {v}
              {unit}
            </b>
            {moments[i]}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BariatricFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–5 screenings land (oldest first, newest on top), 6 the two alerts, 7 Mia's year opens
  const step = useSteps(7, 750, 500);
  const alert = step >= 6;
  const [manual, setManual] = useState<boolean | null>(null);
  const detailOpen = manual ?? step >= 7;
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
        <AppCard tone="widget" icon="clipboard-notes" title={c.screenings} bodyClassName="p-3 flex flex-col gap-2 min-h-[288px]">
          <AnimatePresence initial={false}>
            {shown.map((row) => {
              const red = row.flag && alert;
              const mia = row.i === MIA_ROW;
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
                  {mia ? (
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
              <motion.div key="alert" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: EASE }} className="flex flex-col gap-2">
                {FLAGGED.map((row, k) => (
                  <motion.div
                    key={row.i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: k * 0.2 }}
                    className="flex items-start gap-2.5 rounded-lg bg-[#FFE7ED] px-3 py-2.5 text-[12px]"
                  >
                    <AppIcon name="exclamation-triangle" size={15} color={APP.accent} className="mt-0.5" />
                    <span>
                      <b>{c.rows[row.i][0]}</b> · {c.alertTexts[k]}
                    </span>
                  </motion.div>
                ))}
                <AppButton className="w-full py-2 mt-1">{c.viewAll}</AppButton>
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
                    <PatientAvatar initials="MF" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-5"
              >
                {/* The month-12 check-in, in natural language */}
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

                {/* Weight down is progress, quality of life up: each line says which way it reads */}
                <div>
                  <p className="text-[12.5px] font-semibold mb-2">{c.scores}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Trend label={c.weight} unit=" kg" values={[109, 94, 79]} moments={c.moments} direction="down" directionLabel={c.lowerBetter} measured={c.measured} />
                    <Trend label={c.iwqol} unit="" values={[42, 58, 80]} moments={c.moments} direction="up" directionLabel={c.higherBetter} />
                  </div>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="text-[#949CB1] text-left">
                          <th className="font-medium py-1 pr-2" />
                          {c.moments.map((m) => (
                            <th key={m} className="font-medium py-1 px-1.5">
                              {m}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                        {c.table.map(([label, ...values]) => (
                          <tr key={label} className="align-top">
                            <td className="py-1.5 pr-2 text-[#4E5670]">{label}</td>
                            {values.map((v, i) => (
                              <td key={i} className={`py-1.5 px-1.5 tabular-nums ${i === 2 ? 'font-semibold' : 'text-[#949CB1]'}`}>
                                {v}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AppCard>

              {/* The follow-up follows the operation the team chose, for life */}
              <AppCard icon="list-checked" title={c.plans} bodyClassName="p-4">
                <p className="text-[11.5px] text-[#4E5670] leading-snug mb-3 max-w-xl">{c.plansIntro}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  {c.treatments.map((treatment) => (
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.mia ? 'border-[#4F5BD5]/30 bg-[#EEF0FD]/60' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.mia && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#4F5BD5]/20">
                            <PatientAvatar initials="MF" size={12} />
                            Mia
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
