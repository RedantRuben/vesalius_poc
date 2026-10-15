'use client';

/**
 * Module demos for the mental health variant (source: sales, "Website-inhoud geestelijke gezondheidszorg", §7). The care
 * provider is Andreas Vesalius, clinical psychologist in a group practice; this variant speaks of clients and sessions,
 * and "Dr." is kept for the GP only. Every page follows Lotte Amygdala (31, panic attacks) one step further; S. Cortex
 * (thoughts of suicide with a plan) is the only red accent. Calm, soft colours throughout. Two accents: the short intake
 * that brings each client to the right colleague, and the Scribe with its sentiment analysis.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Lotte keeps one calm avatar colour on every page, so visitors recognise her. */
const LOTTE = '#5A7FC0';
const LOTTE_SOFT = '#EDF2FA';
/** Only S. Cortex gets the red accent and the warning icon. */
const RED = APP.accent;
/** Clients who stay in the practice, and those sent elsewhere (psychiatrist, GP first). */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };

function ClientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'LA' ? LOTTE : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function LotteTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <ClientAvatar initials="LA" size={24} />
        Lotte Amygdala
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: the right client for the right colleague          */
/* ------------------------------------------------------------------ */

type Referral = 'anxiety' | 'trauma' | 'adhd' | 'psychiatrist' | 'gp' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Meldt gedachten om er niet meer te willen zijn, met een plan. Crisisnummers getoond in de chat. Het secretariaat neemt nu contact op.',
    referrals: { anxiety: 'Angst', trauma: 'Trauma', adhd: 'ADHD', psychiatrist: 'Psychiater', gp: 'Huisarts eerst' },
    rows: [
      'Gedachten om er niet meer te willen zijn, met een plan. Crisisnummers getoond in de chat',
      'Paniekaanvallen sinds 5 maanden, vermijding van trein en winkels, hart onderzocht',
      'Nachtmerries en flashbacks na verkeersongeval',
      'Hartkloppingen en pijn op de borst bij inspanning, nog niet onderzocht',
      'ADHD-vraag als volwassene',
      'Ernstige somberheid, herval na stoppen antidepressivum',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Reports thoughts of not wanting to be here any more, with a plan. Crisis numbers shown in the chat. The secretariat is getting in touch now.',
    referrals: { anxiety: 'Anxiety', trauma: 'Trauma', adhd: 'ADHD', psychiatrist: 'Psychiatrist', gp: 'GP first' },
    rows: [
      'Thoughts of not wanting to be here any more, with a plan. Crisis numbers shown in the chat',
      'Panic attacks for 5 months, avoiding trains and shops, heart checked',
      'Nightmares and flashbacks after a road accident',
      'Palpitations and chest pain on exertion, not yet investigated',
      'Question about ADHD as an adult',
      'Severe low mood, relapse after stopping an antidepressant',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Signale des pensées de ne plus vouloir être là, avec un plan. Numéros de crise affichés dans le chat. Le secrétariat prend contact maintenant.',
    referrals: { anxiety: 'Anxiété', trauma: 'Trauma', adhd: 'TDAH', psychiatrist: 'Psychiatre', gp: 'D’abord le médecin traitant' },
    rows: [
      'Pensées de ne plus vouloir être là, avec un plan. Numéros de crise affichés dans le chat',
      'Crises de panique depuis 5 mois, évitement du train et des magasins, cœur examiné',
      'Cauchemars et flashbacks après un accident de la route',
      'Palpitations et douleur thoracique à l’effort, pas encore examinées',
      'Question sur un TDAH à l’âge adulte',
      'Humeur très sombre, rechute après l’arrêt d’un antidépresseur',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'S. Cortex', initials: 'SC', channel: 'chat', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'L. Amygdala', initials: 'LA', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'anxiety' },
  { name: 'T. Thalamus', initials: 'TT', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'trauma' },
  { name: 'R. Insula', initials: 'RI', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'gp' },
  { name: 'N. Limbus', initials: 'NL', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'adhd' },
  { name: 'M. Hippocampus', initials: 'MH', channel: 'phone-incoming', tasks: 0, status: 'IN_PROGRESS', referral: 'psychiatrist' },
];

const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = { anxiety: STAYS, trauma: STAYS, adhd: STAYS, psychiatrist: ELSEWHERE, gp: ELSEWHERE };

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8.5rem_1fr_4.5rem_5rem] gap-3';

export function MentalTriageDemo() {
  const c = useLocalized(TRIAGE);
  // 1–6 rows arrive with their referral, 7 the red flag lights up and the attention card opens
  const step = useSteps(7, 420, 150);
  const flagged = step >= 7;

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
                  <ClientAvatar initials={row.initials} flag={row.flag} />
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
                <ClientAvatar initials="SC" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">S. Cortex</span>
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
/* 2 · Agenda: one column per psychologist, a long first session       */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1 · angst', 'Room 2 · trauma', 'Room 3 · ADHD'],
    ready: 'Vragenlijst ingevuld',
    elsewhere: '2 aanmeldingen doorgestuurd',
    types: [
      'Sessie 5 · signaal na check-in',
      'Eerste gesprek · paniekaanvallen',
      'Sessie 6 · sociale angst',
      'Dringend · crisisgesprek',
      'Eerste gesprek · trauma na ongeval',
      'Diagnostisch gesprek · ADHD',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1 · anxiety', 'Room 2 · trauma', 'Room 3 · ADHD'],
    ready: 'Questionnaire completed',
    elsewhere: '2 sign-ups referred on',
    types: [
      'Session 5 · alert after check-in',
      'First session · panic attacks',
      'Session 6 · social anxiety',
      'Urgent · crisis session',
      'First session · trauma after accident',
      'Diagnostic session · ADHD',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1 · anxiété', 'Room 2 · trauma', 'Room 3 · TDAH'],
    ready: 'Questionnaire rempli',
    elsewhere: '2 inscriptions orientées ailleurs',
    types: [
      'Séance 5 · alerte après le suivi',
      'Premier entretien · crises de panique',
      'Séance 6 · anxiété sociale',
      'Urgent · entretien de crise',
      'Premier entretien · trauma après accident',
      'Entretien diagnostique · TDAH',
    ],
  },
};

const ROOM_COLORS = ['#4A9AA5', '#8C7BB8', '#6E8A6A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const SLOT_PX = 40;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; lotte?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 2, name: 'P. Vagus', initials: 'PV', type: 0 },
  { room: 1, start: 0, len: 2, name: 'S. Cortex', initials: 'SC', type: 3, flag: true },
  { room: 2, start: 1, len: 2, name: 'N. Limbus', initials: 'NL', type: 5 },
  { room: 0, start: 2, len: 3, name: 'L. Amygdala', initials: 'LA', type: 1, lotte: true },
  { room: 1, start: 2, len: 2, name: 'T. Thalamus', initials: 'TT', type: 4 },
  { room: 0, start: 5, len: 1, name: 'D. Fornix', initials: 'DF', type: 2 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.lotte ? LOTTE : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.lotte ? LOTTE_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}14`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.lotte && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.lotte && <ClientAvatar initials="LA" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.lotte && ready && (
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

export function MentalAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 sessions appear, 7 Lotte's questionnaire tick and the sign-ups referred on
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
            <span key={room} className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] font-medium border-l-2" style={{ borderLeftColor: ROOM_COLORS[i] }}>
              <span className="truncate">{room}</span>
              <span className="w-5 h-5 shrink-0 rounded-full bg-[#06ACC1] text-white text-[10px] flex items-center justify-center tabular-nums">
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
                  <VisitBlock key={visit.name} visit={visit} label={c.types[visit.type]} ready={done} readyLabel={c.ready} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* R. Insula and M. Hippocampus are not in this agenda: triage sent them to the GP and the psychiatrist. */}
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
/* 3 · Pre-consultation: what is going on, before she walks in         */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: { from: 'bot' | 'patient'; text: string }[];
  safety: [string, string];
  summary: string;
  copy: string;
  tabs: [string, string, string];
  summaries: [SummarySection[], SummarySection[], SummarySection[]];
};

// After her second answer the complaint fills in, after the fourth what she avoids, after her tap the safety question.
const COMPLAINT_AT = 2;
const AVOIDANCE_AT = 4;
const SAFETY_AT = 6;
/** Sections open by default on Lotte's tab: request, complaint, avoidance and safety. */
const OPEN_BY_DEFAULT = [0, 1, 2, 10];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks vragen ter voorbereiding van uw eerste gesprek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen waarvoor u hulp zoekt, en sinds wanneer?' },
      { from: 'patient', text: 'Sinds vijf maanden krijg ik paniekaanvallen. De eerste was in de trein. Ik dacht echt dat ik doodging.' },
      { from: 'bot', text: 'Dat klinkt beangstigend. Zijn er plaatsen of dingen die u sindsdien vermijdt?' },
      { from: 'patient', text: 'De trein, de supermarkt op zaterdag. En ik ga niet meer lopen, mijn hartslag schrikt me af.' },
      { from: 'bot', text: 'Dank u om dat te delen. Ik stel deze vraag aan iedereen: heeft u soms gedachten dat u er niet meer wil zijn?' },
      { from: 'patient', text: 'Nee' },
    ],
    safety: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Angst en paniek', 'Trauma', 'ADHD'],
    summaries: [
      [
        { title: 'Hulpvraag', rows: [r('In eigen woorden', '"Ik wil weer alleen de trein durven nemen en terug gaan lopen."'), r('Verwijzing', 'Via dr. De Smet, huisarts. Raadde therapie aan')] },
        {
          title: 'Klacht',
          rows: [
            r('Aanvallen', 'Sinds 5 maanden, 3 à 4 per week, 10 à 20 minuten. Eerste aanval in de trein', { fillAt: COMPLAINT_AT }),
            r('Lichamelijk', 'Hartkloppingen, kortademigheid, tintelingen in de handen, duizelig'),
            r('Gedachte tijdens de aanval', '"Er is iets mis met mijn hart." Angst om flauw te vallen of te sterven', { fillAt: COMPLAINT_AT }),
          ],
        },
        {
          title: 'Vermijding',
          rows: [r('Plaatsen en activiteiten', 'Trein, supermarkt op drukke momenten, lopen', { fillAt: AVOIDANCE_AT }), r('Veiligheidsgedrag', 'Altijd water en Xanax in de handtas')],
        },
        { title: 'Uitlokkend', rows: [r('Erger bij', 'Slecht slapen, koffie (3 à 4 per dag), drukke periodes op het werk')] },
        { title: 'Lichamelijk', rows: [r('Onderzoek', 'Spoed, 5 maanden geleden: ECG, bloedname en schildklier normaal')] },
        { title: 'Middelen', rows: [r('Alcohol / roken / drugs', '1 à 2 glazen wijn per avond / nee / nee')] },
        { title: 'Medicatie', rows: [r('Kalmeermiddelen', 'Xanax 0,5 mg zo nodig, 1 à 2× per week')] },
        { title: 'Eerdere hulp', rows: [r('Wat al geprobeerd werd', '2 gesprekken met een psycholoog, 3 jaar geleden (examenstress). Ademhalingsapp')] },
        { title: 'Achtergrond', rows: [r('Familie', 'Moeder: angststoornis')] },
        { title: 'Slaap', rows: [r('Kwaliteit', "Moeilijk inslapen, 1× per week 's nachts wakker met hartkloppingen")] },
        { title: 'Veiligheid', rows: [r('Suïcidale gedachten', 'Nee', { fillAt: SAFETY_AT, mark: 'Bepaalt mee de routering' })] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Accountant, 4 dagen per week'),
            r('Sport en hobby', 'Liep 3× per week (gestopt). Zingt in een koor (2 maanden niet meer geweest)'),
            r('Leefsituatie', 'Woont samen, geen kinderen'),
            r('Leeftijd', '31 jaar'),
          ],
        },
        { title: 'Voorkeur', rows: [r('Behandeling', 'Liefst zonder medicatie')] },
        { title: 'Baseline', rows: [r('Scores (lager = beter, voorbeelddata)', 'PDSS-SR 17/28 · GAD-7 14/21 · PHQ-9 9/27 · WSAS 24/40')] },
      ],
      [
        { title: 'Hulpvraag', rows: [r('In eigen woorden', '"Ik wil weer kunnen slapen en met de auto rijden."')] },
        { title: 'Klacht', rows: [r('Aanleiding', 'Verkeersongeval, 4 maanden geleden'), r('Herbelevingen', "Nachtmerries 3× per week, flashbacks bij remmende auto's")] },
        { title: 'Vermijding', rows: [r('Wat', 'Rijdt niet meer zelf, vermijdt het kruispunt')] },
        { title: 'Baseline', rows: [r('PCL-5 (lager = beter)', '48/80')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Verpleegkundige / 38 jaar')] },
      ],
      [
        { title: 'Hulpvraag', rows: [r('In eigen woorden', '"Ik wil weten of ik ADHD heb."')] },
        { title: 'Klacht', rows: [r('Sinds de kindertijd', 'Ja, rapporten vermelden "dromerig, vergeet huiswerk"'), r('Impact', 'Deadlines missen, afspraken vergeten, sinds nieuwe job erger')] },
        { title: 'Baseline', rows: [r('ASRS deel A', '5 van 6 positief')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Projectmanager / 29 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of questions to prepare for your first session.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what you are looking for help with, and since when?' },
      { from: 'patient', text: 'For five months I’ve been having panic attacks. The first one was on the train. I really thought I was dying.' },
      { from: 'bot', text: 'That sounds frightening. Are there places or things you have been avoiding since?' },
      { from: 'patient', text: 'The train, the supermarket on Saturdays. And I’ve stopped running, my heart rate scares me.' },
      { from: 'bot', text: 'Thank you for sharing that. I ask everyone this question: do you sometimes have thoughts of not wanting to be here any more?' },
      { from: 'patient', text: 'No' },
    ],
    safety: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Anxiety and panic', 'Trauma', 'ADHD'],
    summaries: [
      [
        { title: 'Request for help', rows: [r('In her own words', '"I want to dare to take the train on my own again and go back to running."'), r('Referral', 'Via Dr De Smet, GP. Recommended therapy')] },
        {
          title: 'Complaint',
          rows: [
            r('Attacks', 'For 5 months, 3 to 4 a week, 10 to 20 minutes. First attack on the train', { fillAt: COMPLAINT_AT }),
            r('Physical', 'Palpitations, breathlessness, tingling in the hands, dizziness'),
            r('Thought during the attack', '"Something is wrong with my heart." Fear of fainting or dying', { fillAt: COMPLAINT_AT }),
          ],
        },
        {
          title: 'Avoidance',
          rows: [r('Places and activities', 'Train, supermarket at busy times, running', { fillAt: AVOIDANCE_AT }), r('Safety behaviours', 'Always water and Xanax in her handbag')],
        },
        { title: 'Triggers', rows: [r('Worse with', 'Poor sleep, coffee (3 to 4 a day), busy periods at work')] },
        { title: 'Physical', rows: [r('Investigations', 'A&E, 5 months ago: ECG, bloods and thyroid normal')] },
        { title: 'Substances', rows: [r('Alcohol / smoking / drugs', '1 to 2 glasses of wine an evening / no / no')] },
        { title: 'Medication', rows: [r('Sedatives', 'Xanax 0.5 mg as needed, once or twice a week')] },
        { title: 'Previous help', rows: [r('Already tried', '2 sessions with a psychologist, 3 years ago (exam stress). Breathing app')] },
        { title: 'Background', rows: [r('Family', 'Mother: anxiety disorder')] },
        { title: 'Sleep', rows: [r('Quality', 'Difficulty falling asleep, once a week awake at night with palpitations')] },
        { title: 'Safety', rows: [r('Suicidal thoughts', 'No', { fillAt: SAFETY_AT, mark: 'Helps decide the routing' })] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Accountant, 4 days a week'),
            r('Sport and hobbies', 'Ran 3 times a week (stopped). Sings in a choir (not been for 2 months)'),
            r('Living situation', 'Lives with her partner, no children'),
            r('Age', '31'),
          ],
        },
        { title: 'Preference', rows: [r('Treatment', 'Preferably without medication')] },
        { title: 'Baseline', rows: [r('Scores (lower = better, example data)', 'PDSS-SR 17/28 · GAD-7 14/21 · PHQ-9 9/27 · WSAS 24/40')] },
      ],
      [
        { title: 'Request for help', rows: [r('In their own words', '"I want to be able to sleep and drive again."')] },
        { title: 'Complaint', rows: [r('Cause', 'Road accident, 4 months ago'), r('Re-experiencing', 'Nightmares 3 times a week, flashbacks when cars brake')] },
        { title: 'Avoidance', rows: [r('What', 'No longer drives, avoids the junction')] },
        { title: 'Baseline', rows: [r('PCL-5 (lower = better)', '48/80')] },
        { title: 'General', rows: [r('Occupation / age', 'Nurse / 38')] },
      ],
      [
        { title: 'Request for help', rows: [r('In their own words', '"I want to know whether I have ADHD."')] },
        { title: 'Complaint', rows: [r('Since childhood', 'Yes, school reports mention "dreamy, forgets homework"'), r('Impact', 'Missing deadlines, forgetting appointments, worse since a new job')] },
        { title: 'Baseline', rows: [r('ASRS part A', '5 of 6 positive')] },
        { title: 'General', rows: [r('Occupation / age', 'Project manager / 29')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions pour préparer votre premier entretien.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire pour quoi vous cherchez de l’aide, et depuis quand ?' },
      { from: 'patient', text: 'Depuis cinq mois, je fais des crises de panique. La première, c’était dans le train. J’ai vraiment cru que j’allais mourir.' },
      { from: 'bot', text: 'Cela a dû être effrayant. Y a-t-il des endroits ou des choses que vous évitez depuis ?' },
      { from: 'patient', text: 'Le train, le supermarché le samedi. Et je ne cours plus, mon rythme cardiaque me fait peur.' },
      { from: 'bot', text: 'Merci de me le dire. Je pose cette question à tout le monde : vous arrive-t-il de penser que vous ne voulez plus être là ?' },
      { from: 'patient', text: 'Non' },
    ],
    safety: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Anxiété et panique', 'Trauma', 'TDAH'],
    summaries: [
      [
        {
          title: 'Demande d’aide',
          rows: [r('Dans ses mots', '« Je veux de nouveau oser prendre le train seule et recommencer à courir. »'), r('Orientation', 'Par le Dr De Smet, médecin traitant. A conseillé une thérapie')],
        },
        {
          title: 'Plainte',
          rows: [
            r('Crises', 'Depuis 5 mois, 3 à 4 par semaine, 10 à 20 minutes. Première crise dans le train', { fillAt: COMPLAINT_AT }),
            r('Physique', 'Palpitations, essoufflement, fourmillements dans les mains, vertiges'),
            r('Pensée pendant la crise', '« Quelque chose ne va pas avec mon cœur. » Peur de s’évanouir ou de mourir', { fillAt: COMPLAINT_AT }),
          ],
        },
        {
          title: 'Évitement',
          rows: [r('Lieux et activités', 'Train, supermarché aux heures de pointe, course à pied', { fillAt: AVOIDANCE_AT }), r('Comportements de sécurité', 'Toujours de l’eau et du Xanax dans son sac')],
        },
        { title: 'Déclencheurs', rows: [r('Pire en cas de', 'Mauvais sommeil, café (3 à 4 par jour), périodes chargées au travail')] },
        { title: 'Physique', rows: [r('Examens', 'Urgences, il y a 5 mois : ECG, prise de sang et thyroïde normaux')] },
        { title: 'Substances', rows: [r('Alcool / tabac / drogues', '1 à 2 verres de vin par soir / non / non')] },
        { title: 'Médicaments', rows: [r('Calmants', 'Xanax 0,5 mg si nécessaire, 1 à 2× par semaine')] },
        { title: 'Aide antérieure', rows: [r('Déjà essayé', '2 entretiens avec un psychologue, il y a 3 ans (stress des examens). Application de respiration')] },
        { title: 'Contexte', rows: [r('Famille', 'Mère : trouble anxieux')] },
        { title: 'Sommeil', rows: [r('Qualité', 'Difficultés d’endormissement, réveillée la nuit 1× par semaine avec des palpitations')] },
        { title: 'Sécurité', rows: [r('Pensées suicidaires', 'Non', { fillAt: SAFETY_AT, mark: 'Aide à décider de l’orientation' })] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Comptable, 4 jours par semaine'),
            r('Sport et loisirs', 'Courait 3× par semaine (arrêté). Chante dans une chorale (n’y est plus allée depuis 2 mois)'),
            r('Situation de vie', 'Vit en couple, pas d’enfants'),
            r('Âge', '31 ans'),
          ],
        },
        { title: 'Préférence', rows: [r('Traitement', 'De préférence sans médicaments')] },
        { title: 'Mesure de référence', rows: [r('Scores (plus bas = mieux, données d’exemple)', 'PDSS-SR 17/28 · GAD-7 14/21 · PHQ-9 9/27 · WSAS 24/40')] },
      ],
      [
        { title: 'Demande d’aide', rows: [r('Dans ses mots', '« Je veux de nouveau pouvoir dormir et conduire. »')] },
        { title: 'Plainte', rows: [r('Origine', 'Accident de la route, il y a 4 mois'), r('Reviviscences', 'Cauchemars 3× par semaine, flashbacks quand des voitures freinent')] },
        { title: 'Évitement', rows: [r('Quoi', 'Ne conduit plus, évite le carrefour')] },
        { title: 'Mesure de référence', rows: [r('PCL-5 (plus bas = mieux)', '48/80')] },
        { title: 'Général', rows: [r('Profession / âge', 'Infirmier / 38 ans')] },
      ],
      [
        { title: 'Demande d’aide', rows: [r('Dans ses mots', '« Je veux savoir si j’ai un TDAH. »')] },
        { title: 'Plainte', rows: [r('Depuis l’enfance', 'Oui, les bulletins mentionnent « rêveur, oublie ses devoirs »'), r('Impact', 'Échéances manquées, rendez-vous oubliés, pire depuis un nouvel emploi')] },
        { title: 'Mesure de référence', rows: [r('ASRS partie A', '5 sur 6 positifs')] },
        { title: 'Général', rows: [r('Profession / âge', 'Chef de projet / 29 ans')] },
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

export function MentalPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–5 the conversation, 6 she answers the safety question and it lands, marked, in the summary
  const step = useSteps(total, 1000, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Lotte's tab opens on what matters first; the other two tabs are short, so fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 6}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step === total - 1 && <Choices options={c.safety} />}
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
              {i === 0 && <ClientAvatar initials="LA" size={18} />}
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
                        const marked = row.mark && known;
                        return (
                          <div key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${marked ? 'my-1 -ml-1 pl-5 pr-2 py-1.5 rounded-lg bg-[#E9FFF7] ring-1 ring-[#37C18D]/30' : ''}`}>
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
                                className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-[#1F9E6E]"
                              >
                                <Check size={11} color="#1F9E6E" />
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
/* 4 · Voice Reception: answered while you are in session              */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts raadt me aan om met een psycholoog te praten over mijn paniekaanvallen. Kan ik een afspraak maken?' },
      { from: 'bot', text: 'Dat kan zeker. Komen de aanvallen in rust, of vooral bij inspanning? En werd uw hart al onderzocht?' },
      { from: 'patient', text: 'In rust, uit het niets. Op de spoed hebben ze alles nagekeken, dat was in orde.' },
      { from: 'bot', text: 'Dank u. Ik stel deze vraag aan iedereen: heeft u soms gedachten dat u er niet meer wil zijn?' },
      { from: 'patient', text: 'Nee, dat niet. Ik wil gewoon weer normaal kunnen leven.' },
      { from: 'bot', text: 'Dat begrijp ik. Ik plan u in bij onze psycholoog die gespecialiseerd is in angst, en stuur u een korte vragenlijst om het eerste gesprek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Eerste gesprek ingepland bij de psycholoog, focus angst: paniekaanvallen in rust, hart onderzocht, geen suïcidale gedachten',
    details: 'Screeningdetails',
    patient: 'Cliënt',
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
      { from: 'patient', text: 'Hello, my GP has advised me to talk to a psychologist about my panic attacks. Can I make an appointment?' },
      { from: 'bot', text: 'Certainly. Do the attacks come at rest, or mainly with exertion? And has your heart been checked?' },
      { from: 'patient', text: 'At rest, out of nowhere. They checked everything in A&E, it was fine.' },
      { from: 'bot', text: 'Thank you. I ask everyone this question: do you sometimes have thoughts of not wanting to be here any more?' },
      { from: 'patient', text: 'No, not that. I just want to be able to live normally again.' },
      { from: 'bot', text: 'I understand. I’ll book you in with our psychologist who specialises in anxiety, and send you a short questionnaire to prepare for the first session.' },
    ],
    tasks: 'Tasks',
    task: 'First session booked with the psychologist, focus anxiety: panic attacks at rest, heart checked, no suicidal thoughts',
    details: 'Screening details',
    patient: 'Client',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant me conseille de parler à un psychologue de mes crises de panique. Puis-je prendre rendez-vous ?' },
      { from: 'bot', text: 'Bien sûr. Les crises surviennent-elles au repos, ou surtout à l’effort ? Et votre cœur a-t-il déjà été examiné ?' },
      { from: 'patient', text: 'Au repos, de nulle part. Aux urgences, ils ont tout vérifié, c’était en ordre.' },
      { from: 'bot', text: 'Merci. Je pose cette question à tout le monde : vous arrive-t-il de penser que vous ne voulez plus être là ?' },
      { from: 'patient', text: 'Non, pas ça. Je veux juste pouvoir vivre normalement.' },
      { from: 'bot', text: 'Je comprends. Je vous inscris chez notre psychologue spécialisé en anxiété, et je vous envoie un court questionnaire pour préparer le premier entretien.' },
    ],
    tasks: 'Tâches',
    task: 'Premier entretien planifié chez le psychologue, spécialisation anxiété : crises de panique au repos, cœur examiné, pas de pensées suicidaires',
    details: 'Détails du dépistage',
    patient: 'Cliente',
    channel: 'Canal',
    incoming: 'Appel entrant',
    language: 'Langue',
    languageValue: 'Français',
    transfer: 'Transféré',
    transferValue: 'Pas nécessaire',
    transcript: 'Voir la transcription',
  },
};

export function MentalVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 64 09</span>
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
                <ClientAvatar initials="LA" size={18} />
                L. Amygdala
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
/* 5 · Scribe: the note, and how the session felt                      */
/* ------------------------------------------------------------------ */

type NoteSection = { title: string; text: string; clamp: boolean };
/** Soft tones per phase; deliberately no red or green and no numbers, so it reads as a help for re-reading, not a measurement. */
const TONE_COLORS = [
  { bg: '#ECE8F8', text: '#5E50A6' },
  { bg: '#F8EBE1', text: '#9A5B36' },
  { bg: '#E0F0F2', text: '#2D7480' },
  { bg: '#F1EBD9', text: '#7D6935' },
  { bg: '#E3ECF9', text: '#3B66A8' },
];

type ScribeCopy = {
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
  sentiment: {
    title: string;
    hint: string;
    phases: [string, string, string][];
    talk: string;
    client: string;
    psychologist: string;
    split: [number, number];
    focus: string;
    focusText: string;
    footer: string;
  };
};

const SCRIBE: Record<SiteLocale, ScribeCopy> = {
  nl: {
    back: 'Terug',
    consultation: 'Sessie',
    template: 'Psychologisch intakeverslag',
    templates: ['Psychologisch intakeverslag', 'Sessieverslag', 'Afsluitend verslag'],
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
    doctor: 'Psycholoog',
    patient: 'Cliënt',
    lines: [
      { who: 'doctor', text: 'Wat gaat er door u heen als uw hart begint te bonzen in de trein?' },
      { who: 'patient', text: 'Dat er iets mis is met mijn hart. Dat ik ga flauwvallen en dat niemand me helpt.' },
      { who: 'doctor', text: 'En wat doet u dan?' },
      { who: 'patient', text: 'Ik stap uit bij de volgende halte. Sindsdien neem ik de auto.' },
      { who: 'doctor', text: 'Op de spoed was uw hart in orde. Wat u voelt is paniek: heel vervelend, maar niet gevaarlijk. Door de trein te vermijden, krijgt u nooit de kans om dat te ervaren.' },
      { who: 'patient', text: 'Dus mijn hart is echt in orde? Maar ik durf echt niet terug die trein op.' },
    ],
    sections: [
      { title: 'Hulpvraag', text: 'Leren omgaan met paniekaanvallen, weer alleen de trein nemen en terug gaan lopen. Liefst zonder medicatie. Verwezen door dr. De Smet.', clamp: true },
      {
        title: 'Klachtbeschrijving',
        text: 'Paniekaanvallen sinds vijf maanden, eerste in de trein, nu 3 à 4 per week. Hartkloppingen, kortademigheid, tintelingen, angst om flauw te vallen of te sterven. Vermijdt trein, drukke winkels en lopen. Veiligheidsgedrag: water en Xanax in de handtas. Xanax zo nodig 1 à 2× per week, 1 à 2 glazen wijn per avond, 3 à 4 koffie per dag. Slaapt onrustig. Lichamelijk onderzoek op de spoed normaal.',
        clamp: true,
      },
      { title: 'Observatie', text: 'Verzorgd, goed contact, open. Angstig tijdens het vertellen over de eerste aanval, opgelucht na de uitleg. Gemotiveerd.', clamp: true },
      { title: 'Risico-inschatting', text: 'Geen suïcidale gedachten, geen plan. Geen gevaar voor anderen.', clamp: true },
      {
        title: 'Functieanalyse',
        text: 'Situatie: trein, drukte. Lichamelijk: hartkloppingen. Gedachte: "er is iets mis met mijn hart". Gevoel: paniek. Gedrag: uitstappen, vermijden, Xanax. Gevolg: kortdurende opluchting, angst blijft bestaan en breidt uit.',
        clamp: false,
      },
      { title: 'Diagnostische indruk', text: 'Paniekstoornis met agorafobie.', clamp: true },
      {
        title: 'Behandelplan',
        text: 'Cognitieve gedragstherapie, 10 sessies: psycho-educatie, ademhaling, cognitieve herstructurering van catastrofale gedachten, interoceptieve exposure (hartslag opdrijven), daarna exposure in vivo (trein, supermarkt, lopen). Veiligheidsgedrag afbouwen, Xanax afbouwen in overleg met de huisarts. Koffie en alcohol beperken. Opvolging na elke sessie met PDSS-SR, en GAD-7 en WSAS bij sessie 4, 8 en 10.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '14-03-1995'],
      ['Vragenlijst', 'Angst en paniek'],
      ['Taal', 'Nederlands'],
    ],
    sentiment: {
      title: 'Sentimentanalyse',
      hint: 'Beweeg over een fase om de zin te lezen',
      phases: [
        ['Hulpvraag', 'Angstig', '"Ik dacht echt dat ik doodging in die trein."'],
        ['Vermijding en werk', 'Gespannen, beschaamd', '"Ik schaam me dat ik niet meer met de trein durf."'],
        ['Uitleg over paniek', 'Opgelucht', '"Dus mijn hart is echt in orde?"'],
        ['Voorstel exposure', 'Weerstand', '"Maar ik durf echt niet terug die trein op."'],
        ['Afspraken', 'Hoopvol', '"Ik wil gewoon weer kunnen lopen."'],
      ],
      talk: 'Spreektijd',
      client: 'Cliënt',
      psychologist: 'psycholoog',
      split: [61, 39],
      focus: 'Aandachtspunt',
      focusText: 'Weerstand bij exposure in de trein. Start met interoceptieve oefeningen thuis en bouw op.',
      footer: 'Voorbeelddata · ondersteunend, geen diagnose',
    },
  },
  en: {
    back: 'Back',
    consultation: 'Session',
    template: 'Psychological intake report',
    templates: ['Psychological intake report', 'Session note', 'Closing report'],
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
    doctor: 'Psychologist',
    patient: 'Client',
    lines: [
      { who: 'doctor', text: 'What goes through your mind when your heart starts pounding on the train?' },
      { who: 'patient', text: 'That something is wrong with my heart. That I’m going to faint and nobody will help me.' },
      { who: 'doctor', text: 'And what do you do then?' },
      { who: 'patient', text: 'I get off at the next stop. Since then I’ve been taking the car.' },
      { who: 'doctor', text: 'In A&E your heart was fine. What you feel is panic: very unpleasant, but not dangerous. By avoiding the train, you never get the chance to experience that.' },
      { who: 'patient', text: 'So my heart really is fine? But I really don’t dare get back on that train.' },
    ],
    sections: [
      { title: 'Request for help', text: 'Learning to cope with panic attacks, taking the train on her own again and going back to running. Preferably without medication. Referred by Dr De Smet.', clamp: true },
      {
        title: 'Description of complaints',
        text: 'Panic attacks for five months, the first on the train, now 3 to 4 a week. Palpitations, breathlessness, tingling, fear of fainting or dying. Avoids trains, busy shops and running. Safety behaviours: water and Xanax in her handbag. Xanax as needed once or twice a week, 1 to 2 glasses of wine an evening, 3 to 4 coffees a day. Sleeps restlessly. Physical examination in A&E normal.',
        clamp: true,
      },
      { title: 'Observation', text: 'Well presented, good rapport, open. Anxious when describing the first attack, relieved after the explanation. Motivated.', clamp: true },
      { title: 'Risk assessment', text: 'No suicidal thoughts, no plan. No danger to others.', clamp: true },
      {
        title: 'Functional analysis',
        text: 'Situation: train, crowds. Physical: palpitations. Thought: "something is wrong with my heart". Feeling: panic. Behaviour: getting off, avoiding, Xanax. Consequence: short-term relief, the anxiety persists and spreads.',
        clamp: false,
      },
      { title: 'Diagnostic impression', text: 'Panic disorder with agoraphobia.', clamp: true },
      {
        title: 'Treatment plan',
        text: 'Cognitive behavioural therapy, 10 sessions: psychoeducation, breathing, cognitive restructuring of catastrophic thoughts, interoceptive exposure (raising the heart rate), then in vivo exposure (train, supermarket, running). Reduce safety behaviours, taper Xanax in consultation with the GP. Limit coffee and alcohol. Follow-up after every session with the PDSS-SR, and the GAD-7 and WSAS at sessions 4, 8 and 10.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '14-03-1995'],
      ['Questionnaire', 'Anxiety and panic'],
      ['Language', 'English'],
    ],
    sentiment: {
      title: 'Sentiment analysis',
      hint: 'Hover over a phase to read the sentence',
      phases: [
        ['Request for help', 'Anxious', '"I really thought I was dying on that train."'],
        ['Avoidance and work', 'Tense, ashamed', '"I’m ashamed that I don’t dare take the train any more."'],
        ['Explaining panic', 'Relieved', '"So my heart really is fine?"'],
        ['Proposing exposure', 'Resistance', '"But I really don’t dare get back on that train."'],
        ['Agreements', 'Hopeful', '"I just want to be able to run again."'],
      ],
      talk: 'Speaking time',
      client: 'Client',
      psychologist: 'psychologist',
      split: [61, 39],
      focus: 'Point of attention',
      focusText: 'Resistance to exposure on the train. Start with interoceptive exercises at home and build up.',
      footer: 'Example data · supportive, not a diagnosis',
    },
  },
  fr: {
    back: 'Retour',
    consultation: 'Séance',
    template: 'Rapport d’accueil psychologique',
    templates: ['Rapport d’accueil psychologique', 'Note de séance', 'Rapport de clôture'],
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
    doctor: 'Psychologue',
    patient: 'Cliente',
    lines: [
      { who: 'doctor', text: 'Qu’est-ce qui vous passe par la tête quand votre cœur se met à battre fort dans le train ?' },
      { who: 'patient', text: 'Que quelque chose ne va pas avec mon cœur. Que je vais m’évanouir et que personne ne m’aidera.' },
      { who: 'doctor', text: 'Et que faites-vous alors ?' },
      { who: 'patient', text: 'Je descends à l’arrêt suivant. Depuis, je prends la voiture.' },
      { who: 'doctor', text: 'Aux urgences, votre cœur était en ordre. Ce que vous ressentez, c’est de la panique : très désagréable, mais pas dangereux. En évitant le train, vous n’avez jamais l’occasion de le vivre.' },
      { who: 'patient', text: 'Donc mon cœur va vraiment bien ? Mais je n’ose vraiment pas remonter dans ce train.' },
    ],
    sections: [
      { title: 'Demande d’aide', text: 'Apprendre à gérer les crises de panique, reprendre seule le train et recommencer à courir. De préférence sans médicaments. Adressée par le Dr De Smet.', clamp: true },
      {
        title: 'Description des plaintes',
        text: 'Crises de panique depuis cinq mois, la première dans le train, aujourd’hui 3 à 4 par semaine. Palpitations, essoufflement, fourmillements, peur de s’évanouir ou de mourir. Évite le train, les magasins bondés et la course. Comportements de sécurité : eau et Xanax dans son sac. Xanax si nécessaire 1 à 2× par semaine, 1 à 2 verres de vin par soir, 3 à 4 cafés par jour. Sommeil agité. Examen physique aux urgences normal.',
        clamp: true,
      },
      { title: 'Observation', text: 'Soignée, bon contact, ouverte. Anxieuse en racontant la première crise, soulagée après l’explication. Motivée.', clamp: true },
      { title: 'Évaluation du risque', text: 'Pas de pensées suicidaires, pas de plan. Pas de danger pour autrui.', clamp: true },
      {
        title: 'Analyse fonctionnelle',
        text: 'Situation : train, foule. Physique : palpitations. Pensée : « quelque chose ne va pas avec mon cœur ». Émotion : panique. Comportement : descendre, éviter, Xanax. Conséquence : soulagement à court terme, l’angoisse persiste et s’étend.',
        clamp: false,
      },
      { title: 'Impression diagnostique', text: 'Trouble panique avec agoraphobie.', clamp: true },
      {
        title: 'Plan de traitement',
        text: 'Thérapie cognitivo-comportementale, 10 séances : psychoéducation, respiration, restructuration cognitive des pensées catastrophiques, exposition intéroceptive (augmenter le rythme cardiaque), puis exposition in vivo (train, supermarché, course). Réduire les comportements de sécurité, diminuer le Xanax en concertation avec le médecin traitant. Limiter café et alcool. Suivi après chaque séance avec le PDSS-SR, et le GAD-7 et le WSAS aux séances 4, 8 et 10.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '14-03-1995'],
      ['Questionnaire', 'Anxiété et panique'],
      ['Langue', 'Français'],
    ],
    sentiment: {
      title: 'Analyse du ressenti',
      hint: 'Survolez une phase pour lire la phrase',
      phases: [
        ['Demande d’aide', 'Anxieuse', '« J’ai vraiment cru que j’allais mourir dans ce train. »'],
        ['Évitement et travail', 'Tendue, honteuse', '« J’ai honte de ne plus oser prendre le train. »'],
        ['Explication de la panique', 'Soulagée', '« Donc mon cœur va vraiment bien ? »'],
        ['Proposition d’exposition', 'Résistance', '« Mais je n’ose vraiment pas remonter dans ce train. »'],
        ['Accords', 'Pleine d’espoir', '« Je veux juste pouvoir courir à nouveau. »'],
      ],
      talk: 'Temps de parole',
      client: 'Cliente',
      psychologist: 'psychologue',
      split: [61, 39],
      focus: 'Point d’attention',
      focusText: 'Résistance à l’exposition dans le train. Commencer par des exercices intéroceptifs à la maison et progresser.',
      footer: 'Données d’exemple · aide à la relecture, pas un diagnostic',
    },
  },
};

/** The emotional course over the five phases of the session; each phase shows its literal sentence on hover or focus. */
function SentimentCard({ c }: { c: ScribeCopy['sentiment'] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.45, ease: EASE }}>
      <AppCard icon="chart" title={c.title} bodyClassName="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-5 gap-1.5" onMouseLeave={() => setActive(null)}>
          {c.phases.map(([phase, tone], i) => (
            <motion.button
              key={phase}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              title={c.phases[i][2]}
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.35 }}
              className={`rounded-lg px-2 py-2 text-left transition-shadow ${active === i ? 'ring-2 ring-offset-1' : ''}`}
              style={{ backgroundColor: TONE_COLORS[i].bg, ['--tw-ring-color' as string]: `${TONE_COLORS[i].text}55` }}
            >
              <span className="block text-[10px] text-[#4E5670] leading-tight">{phase}</span>
              <span className="block text-[11.5px] font-semibold leading-tight mt-0.5" style={{ color: TONE_COLORS[i].text }}>
                {tone}
              </span>
            </motion.button>
          ))}
        </div>
        <p className="min-h-[34px] rounded-lg bg-[#F9FAFB] px-3 py-2 text-[12px] leading-snug">
          {active === null ? <span className="text-[#949CB1]">{c.hint}</span> : <span className="italic text-[#2A3A51]">{c.phases[active][2]}</span>}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-3 text-[11.5px]">
          <div>
            <p className="text-[#949CB1] mb-1">{c.talk}</p>
            <span className="flex h-2 rounded-full overflow-hidden bg-[#F4F5F8]">
              <motion.span className="block h-full" style={{ backgroundColor: LOTTE }} initial={{ width: 0 }} animate={{ width: `${c.split[0]}%` }} transition={{ delay: 1, duration: 0.8, ease: EASE }} />
              <span className="block h-full flex-1 bg-[#C9D3E3]" />
            </span>
            <p className="mt-1 text-[#4E5670]">
              {c.client} {c.split[0]}% · {c.psychologist} {c.split[1]}%
            </p>
          </div>
          <div>
            <p className="text-[#949CB1] mb-1">{c.focus}</p>
            <p className="leading-snug">{c.focusText}</p>
          </div>
        </div>
        <p className="text-[10.5px] text-[#949CB1]">{c.footer}</p>
      </AppCard>
    </motion.div>
  );
}

export function MentalScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–6 transcript lines while recording, 7 generating, 8 note ready with the sentiment analysis below
  const step = useSteps(lines + 2, 1100, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<LotteTitle back={c.back} />}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <div className="flex flex-col gap-4 min-w-0">
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
                  <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F4F5F8] px-3 py-2 text-[11px]">
                    <span>
                      {c.generatedWith} <b>{c.template}</b>
                    </span>
                    <AppButton variant="subtle" icon="copy">
                      {c.copy}
                    </AppButton>
                  </div>
                  {/* Functional analysis and treatment plan in full first; the rest shortened until "Show full note" */}
                  {[...c.sections.filter((s) => !s.clamp), ...c.sections.filter((s) => s.clamp)].map((section, i) => (
                    <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.12 }} className="px-1">
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

          {step >= lines + 2 && <SentimentCard c={c.sentiment} />}
        </div>

        <AppCard icon="user" title="Lotte Amygdala" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: a sedative as needed, and the pill she forgot       */
/* ------------------------------------------------------------------ */

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen of supplementen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 3 middelen gevonden:',
    confirm: 'Ja, klopt. De pil was ik vergeten te vermelden. De Xanax neem ik 1 à 2 keer per week.',
    confirmed: 'Bevestigd door cliënt',
    followUp: { question: 'Genoteerd. Neemt u nog iets anders om te kalmeren of te slapen, ook zonder voorschrift?', choices: ['Ja', 'Nee'], answer: "Nee. Wel 's avonds een glas wijn." },
    meds: [
      { name: 'Xanax', strength: '0,5 mg', substance: 'Alprazolam', frequency: 'Zo nodig, 1 à 2× per week', indication: 'Angst (kalmeermiddel)', tag: { label: 'Zo nodig', tone: 'amber' } },
      { name: 'Microgynon 30', strength: '0,15 / 0,03 mg', substance: 'Levonorgestrel / ethinylestradiol', frequency: '1× per dag, 21 dagen', indication: 'Anticonceptie', tag: { label: 'Zelf vergeten', tone: 'blue' } },
      { name: 'Magnesium', strength: '300 mg', substance: 'Magnesium', frequency: '1× per dag', indication: 'Supplement' },
    ],
    notes: [
      { label: 'Kalmeermiddelen', value: 'Xanax zo nodig, 1 à 2× per week (afbouw in overleg met de huisarts)', tone: 'warn' },
      { label: 'Alcohol', value: '1 à 2 glazen wijn per avond (gemeld in de chat)' },
      { label: 'Allergieën', value: 'Geen' },
    ],
  },
  en: {
    ask: 'Do you take any medicines or supplements? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 3 products:',
    confirm: 'Yes, that’s right. I’d forgotten to mention the pill. I take the Xanax once or twice a week.',
    confirmed: 'Confirmed by client',
    followUp: { question: 'Noted. Do you take anything else to calm down or to sleep, including without a prescription?', choices: ['Yes', 'No'], answer: 'No. But a glass of wine in the evening.' },
    meds: [
      { name: 'Xanax', strength: '0.5 mg', substance: 'Alprazolam', frequency: 'As needed, once or twice a week', indication: 'Anxiety (sedative)', tag: { label: 'As needed', tone: 'amber' } },
      { name: 'Microgynon 30', strength: '0.15 / 0.03 mg', substance: 'Levonorgestrel / ethinylestradiol', frequency: 'Once a day, 21 days', indication: 'Contraception', tag: { label: 'Forgotten', tone: 'blue' } },
      { name: 'Magnesium', strength: '300 mg', substance: 'Magnesium', frequency: 'Once a day', indication: 'Supplement' },
    ],
    notes: [
      { label: 'Sedatives', value: 'Xanax as needed, once or twice a week (taper in consultation with the GP)', tone: 'warn' },
      { label: 'Alcohol', value: '1 to 2 glasses of wine an evening (mentioned in the chat)' },
      { label: 'Allergies', value: 'None' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ou des compléments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 3 produits :',
    confirm: 'Oui, c’est exact. J’avais oublié de mentionner la pilule. Le Xanax, je le prends 1 à 2 fois par semaine.',
    confirmed: 'Confirmé par la cliente',
    followUp: { question: 'C’est noté. Prenez-vous autre chose pour vous calmer ou dormir, même sans ordonnance ?', choices: ['Oui', 'Non'], answer: 'Non. Mais un verre de vin le soir.' },
    meds: [
      { name: 'Xanax', strength: '0,5 mg', substance: 'Alprazolam', frequency: 'Si nécessaire, 1 à 2× par semaine', indication: 'Anxiété (calmant)', tag: { label: 'Si nécessaire', tone: 'amber' } },
      { name: 'Microgynon 30', strength: '0,15 / 0,03 mg', substance: 'Lévonorgestrel / éthinylestradiol', frequency: '1× par jour, 21 jours', indication: 'Contraception', tag: { label: 'Oublié', tone: 'blue' } },
      { name: 'Magnésium', strength: '300 mg', substance: 'Magnésium', frequency: '1× par jour', indication: 'Complément' },
    ],
    notes: [
      { label: 'Calmants', value: 'Xanax si nécessaire, 1 à 2× par semaine (sevrage en concertation avec le médecin traitant)', tone: 'warn' },
      { label: 'Alcool', value: '1 à 2 verres de vin par soir (signalé dans le chat)' },
      { label: 'Allergies', value: 'Aucune' },
    ],
  },
});

export function MentalMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Lotte Amygdala', initials: 'LA', dob: '14-03-1995', color: LOTTE }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: the GP report, with the client's consent             */
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
    consent: 'Met toestemming van de cliënt',
    more: 'Toon volledig verslag',
    less: 'Toon minder',
    templates: [
      { label: 'Intakeverslag', description: 'Sjabloon Psychologisch intakeverslag, voor het cliëntendossier' },
      { label: 'Verslag aan de huisarts', description: 'Hulpvraag, indruk en behandelplan, met toestemming van de cliënt' },
      { label: 'Behandelplan', description: 'Doelen, aanpak en aantal sessies, in begrijpelijke taal' },
      { label: 'Uitleg voor de cliënt', description: 'Wat paniek is, wat te doen bij een aanval, crisisnummers' },
      { label: 'Oefenschema', description: 'Interoceptieve oefeningen voor thuis, week 1 tot 3' },
    ],
    previews: [
      'Diagnostische indruk: paniekstoornis met agorafobie. Behandelplan: cognitieve gedragstherapie, 10 sessies, met interoceptieve exposure en daarna exposure in de trein, de supermarkt en bij het lopen.',
      'Geachte collega, ik zag uw patiënte mevrouw Amygdala voor een intakegesprek wegens paniekaanvallen sinds vijf maanden. Het beeld past bij een paniekstoornis met agorafobie. We starten een cognitieve gedragstherapie van tien sessies.',
      'Uw doel: weer alleen de trein nemen en terug gaan lopen. We werken tien sessies samen: eerst begrijpen wat paniek is en hoe u rustig ademt, daarna stap voor stap oefenen met wat u nu vermijdt.',
      'Een paniekaanval voelt gevaarlijk, maar is het niet. Hier leest u wat er in uw lichaam gebeurt, wat u kunt doen tijdens een aanval, en wie u kunt bellen als het echt niet meer gaat.',
      'Week 1: twee keer per dag een minuut ter plaatse lopen om uw hartslag op te drijven, en noteren wat u voelt. Week 2 en 3: langer en intenser, tot de angst vanzelf daalt.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Met haar toestemming schrijf ik u over uw patiënte Lotte Amygdala, geboren op 14 maart 1995, die ik recent zag voor een intakegesprek.',
      sections: [
        ['Reden voor contact', 'Aangemeld op uw advies wegens paniekaanvallen sinds vijf maanden. Haar hulpvraag: weer alleen de trein durven nemen en terug gaan lopen, liefst zonder medicatie.'],
        [
          'Anamnese',
          'Sinds vijf maanden paniekaanvallen, de eerste in de trein, nu 3 à 4 per week. Hartkloppingen, kortademigheid, tintelingen en angst om flauw te vallen of te sterven. Uitgesproken vermijding van trein, drukke winkels en lopen, met veiligheidsgedrag (water en alprazolam in de handtas). Gebruikt alprazolam 0,5 mg zo nodig, 1 à 2 keer per week, daarnaast 1 à 2 glazen wijn per avond en 3 à 4 koffie per dag. Slaapt onrustig. Lichamelijk onderzoek op de spoed (ECG, bloedname, TSH) was normaal. Moeder heeft een angststoornis. Neemt verder Microgynon 30 en magnesium. Geen suïcidale gedachten.',
        ],
        ['Observatie', 'Verzorgd, goed contact, open. Angstig bij het vertellen over de eerste aanval, opgelucht na uitleg over paniek. Geen aanwijzingen voor psychotische kenmerken. Gemotiveerd voor behandeling.'],
        ['Vragenlijsten', 'PDSS-SR 17/28, GAD-7 14/21, PHQ-9 9/27, WSAS 24/40 (hoe lager, hoe beter).'],
        ['Diagnostische indruk', 'Paniekstoornis met agorafobie.'],
        [
          'Behandelplan',
          'Cognitieve gedragstherapie, tien sessies: psycho-educatie, cognitieve herstructurering, interoceptieve exposure en daarna exposure in de trein, de supermarkt en bij het lopen. Graag uw advies bij het afbouwen van de alprazolam, die exposure kan ondermijnen. Advies om koffie en alcohol te beperken. Na elke sessie volg ik haar vooruitgang op met korte vragenlijsten. Lotte weet dat ze contact opneemt, of u of de crisisdienst contacteert, bij gedachten om niet meer te willen leven.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Andreas Vesalius, klinisch psycholoog',
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
    consent: 'With the client’s consent',
    more: 'Show full report',
    less: 'Show less',
    templates: [
      { label: 'Intake report', description: 'Psychological intake report template, for the client record' },
      { label: 'Report to the GP', description: 'Request for help, impression and treatment plan, with the client’s consent' },
      { label: 'Treatment plan', description: 'Goals, approach and number of sessions, in plain language' },
      { label: 'Explanation for the client', description: 'What panic is, what to do during an attack, crisis numbers' },
      { label: 'Exercise schedule', description: 'Interoceptive exercises for home, weeks 1 to 3' },
    ],
    previews: [
      'Diagnostic impression: panic disorder with agoraphobia. Treatment plan: cognitive behavioural therapy, 10 sessions, with interoceptive exposure and then exposure on the train, in the supermarket and while running.',
      'Dear colleague, I saw your patient Ms Amygdala for an intake session because of panic attacks for five months. The picture fits a panic disorder with agoraphobia. We are starting ten sessions of cognitive behavioural therapy.',
      'Your goal: taking the train on your own again and going back to running. We will work together for ten sessions: first understanding what panic is and how to breathe calmly, then practising step by step with what you now avoid.',
      'A panic attack feels dangerous, but it is not. Here you can read what happens in your body, what you can do during an attack, and who to call if you really cannot cope.',
      'Week 1: twice a day, run on the spot for a minute to raise your heart rate, and note what you feel. Weeks 2 and 3: longer and more intense, until the anxiety falls by itself.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'With her consent, I am writing to you about your patient Lotte Amygdala, born on 14 March 1995, whom I recently saw for an intake session.',
      sections: [
        ['Reason for contact', 'Signed up on your advice because of panic attacks for five months. Her request for help: to dare to take the train on her own again and go back to running, preferably without medication.'],
        [
          'History',
          'Panic attacks for five months, the first on the train, now 3 to 4 a week. Palpitations, breathlessness, tingling and fear of fainting or dying. Marked avoidance of trains, busy shops and running, with safety behaviours (water and alprazolam in her handbag). Uses alprazolam 0.5 mg as needed, once or twice a week, plus 1 to 2 glasses of wine an evening and 3 to 4 coffees a day. Sleeps restlessly. Physical examination in A&E (ECG, bloods, TSH) was normal. Her mother has an anxiety disorder. Also takes Microgynon 30 and magnesium. No suicidal thoughts.',
        ],
        ['Observation', 'Well presented, good rapport, open. Anxious when describing the first attack, relieved after the explanation of panic. No signs of psychotic features. Motivated for treatment.'],
        ['Questionnaires', 'PDSS-SR 17/28, GAD-7 14/21, PHQ-9 9/27, WSAS 24/40 (the lower, the better).'],
        ['Diagnostic impression', 'Panic disorder with agoraphobia.'],
        [
          'Treatment plan',
          'Cognitive behavioural therapy, ten sessions: psychoeducation, cognitive restructuring, interoceptive exposure and then exposure on the train, in the supermarket and while running. I would welcome your advice on tapering the alprazolam, which can undermine exposure. Advice to limit coffee and alcohol. After every session I follow her progress with short questionnaires. Lotte knows to get in touch, or to contact you or the crisis service, if she has thoughts of not wanting to live.',
        ],
      ],
      closing: 'Kind regards, Andreas Vesalius, clinical psychologist',
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
    consent: 'Avec l’accord de la cliente',
    more: 'Afficher le rapport complet',
    less: 'Afficher moins',
    templates: [
      { label: 'Rapport d’accueil', description: 'Modèle Rapport d’accueil psychologique, pour le dossier du client' },
      { label: 'Rapport au médecin traitant', description: 'Demande d’aide, impression et plan de traitement, avec l’accord du client' },
      { label: 'Plan de traitement', description: 'Objectifs, approche et nombre de séances, en langage clair' },
      { label: 'Explication pour le client', description: 'Ce qu’est la panique, que faire pendant une crise, numéros de crise' },
      { label: 'Schéma d’exercices', description: 'Exercices intéroceptifs à la maison, semaines 1 à 3' },
    ],
    previews: [
      'Impression diagnostique : trouble panique avec agoraphobie. Plan de traitement : thérapie cognitivo-comportementale, 10 séances, avec exposition intéroceptive puis exposition dans le train, au supermarché et en courant.',
      'Cher confrère, j’ai vu votre patiente Mme Amygdala pour un entretien d’accueil en raison de crises de panique depuis cinq mois. Le tableau correspond à un trouble panique avec agoraphobie. Nous commençons une thérapie cognitivo-comportementale de dix séances.',
      'Votre objectif : reprendre seule le train et recommencer à courir. Nous travaillons ensemble pendant dix séances : d’abord comprendre ce qu’est la panique et comment respirer calmement, puis s’exercer pas à pas avec ce que vous évitez aujourd’hui.',
      'Une crise de panique semble dangereuse, mais elle ne l’est pas. Vous lirez ici ce qui se passe dans votre corps, ce que vous pouvez faire pendant une crise, et qui appeler si cela ne va vraiment plus.',
      'Semaine 1 : deux fois par jour, courir sur place une minute pour augmenter votre rythme cardiaque, et noter ce que vous ressentez. Semaines 2 et 3 : plus longtemps et plus intensément, jusqu’à ce que l’angoisse diminue d’elle-même.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Avec son accord, je vous écris au sujet de votre patiente Lotte Amygdala, née le 14 mars 1995, que j’ai vue récemment pour un entretien d’accueil.',
      sections: [
        ['Motif de contact', 'Inscrite sur votre conseil en raison de crises de panique depuis cinq mois. Sa demande : oser de nouveau prendre seule le train et recommencer à courir, de préférence sans médicaments.'],
        [
          'Anamnèse',
          'Crises de panique depuis cinq mois, la première dans le train, aujourd’hui 3 à 4 par semaine. Palpitations, essoufflement, fourmillements et peur de s’évanouir ou de mourir. Évitement marqué du train, des magasins bondés et de la course, avec des comportements de sécurité (eau et alprazolam dans son sac). Prend de l’alprazolam 0,5 mg si nécessaire, 1 à 2 fois par semaine, ainsi que 1 à 2 verres de vin par soir et 3 à 4 cafés par jour. Sommeil agité. L’examen physique aux urgences (ECG, prise de sang, TSH) était normal. Sa mère souffre d’un trouble anxieux. Prend aussi Microgynon 30 et du magnésium. Pas de pensées suicidaires.',
        ],
        ['Observation', 'Soignée, bon contact, ouverte. Anxieuse en racontant la première crise, soulagée après l’explication de la panique. Pas de signes de caractéristiques psychotiques. Motivée pour le traitement.'],
        ['Questionnaires', 'PDSS-SR 17/28, GAD-7 14/21, PHQ-9 9/27, WSAS 24/40 (plus c’est bas, mieux c’est).'],
        ['Impression diagnostique', 'Trouble panique avec agoraphobie.'],
        [
          'Plan de traitement',
          'Thérapie cognitivo-comportementale, dix séances : psychoéducation, restructuration cognitive, exposition intéroceptive puis exposition dans le train, au supermarché et en courant. Votre avis serait le bienvenu pour diminuer l’alprazolam, qui peut compromettre l’exposition. Conseil de limiter café et alcool. Après chaque séance, je suis ses progrès avec de courts questionnaires. Lotte sait qu’elle doit prendre contact, ou vous contacter ou contacter le service de crise, en cas de pensées de ne plus vouloir vivre.',
        ],
      ],
      closing: 'Bien confraternellement, Andreas Vesalius, psychologue clinicien',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function MentalDocumentDemo() {
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

  // Intake report and treatment plan generate after the session; the GP report lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(LETTER), 2900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  const consentTag = (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF2FA] px-2 py-0.5 text-[10px] font-medium text-[#3B66A8]">
      <Check size={9} color="#3B66A8" />
      {c.consent}
    </span>
  );

  return (
    <AppFrame active="interactions" title={<LotteTitle />}>
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
                    <span className="flex flex-wrap items-center gap-2 text-[12.5px] font-medium">
                      <span>
                        {c.templates[i].label} <span className="text-[#949CB1] font-normal">· {c.today}</span>
                      </span>
                      {i === LETTER && consentTag}
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
/* 8 · Follow-up: P. Vagus raises an alert, Lotte after session 8      */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; lotte?: boolean; items: Questionnaire[] };

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
    after8: string;
    exampleData: string;
    measures: string[];
    moments: [string, string, string];
    life: [string, string, string, string][];
    plans: string;
    plansIntro: string;
    plansNote: string;
    completed: string;
    treatments: Treatment[];
  }
> = {
  nl: {
    hello: 'Hallo Andreas!',
    calm: 'U hebt geen urgente interacties',
    urgent: 'U hebt 1 waarschuwingstaak',
    screenings: 'Recente Screenings',
    alerts: 'Waarschuwingstaken',
    noAlerts: 'Geen waarschuwingstaken.',
    viewAll: 'Bekijk alle',
    rows: [
      ['P. Vagus', 'CGT depressie · na sessie 4'],
      ['L. Amygdala', 'CGT paniek · na sessie 8 · PDSS-SR ingevuld'],
      ['T. Thalamus', 'EMDR trauma · na sessie 3'],
      ['D. Fornix', 'CGT sociale angst · na sessie 6'],
    ],
    alert: 'Meldt na sessie 4 dat hij veel somberder is en nauwelijks slaapt. Antwoordt "soms denk ik dat het niet meer hoeft", zonder plan. Neem contact op vóór de volgende sessie.',
    detail: 'L. Amygdala · CGT paniek',
    checkin: 'Check-in na sessie 8',
    chat: [
      { from: 'bot', text: 'Hoe ging het deze week met de oefeningen?' },
      { from: 'patient', text: 'Ik ben met mijn vriend de trein naar Gent genomen. Mijn hart ging tekeer, maar er gebeurde niets.' },
      { from: 'bot', text: 'Dat is een grote stap. Wat lukt nog niet?' },
      { from: 'patient', text: 'Alleen de trein nemen. Dat is voor volgende week.' },
      { from: 'bot', text: 'Hoe heeft u de laatste sessie ervaren?' },
      { from: 'patient', text: 'Goed, ik voelde me gehoord. Het oefenschema helpt.' },
      { from: 'bot', text: 'Heeft u gedachten gehad dat u er niet meer wil zijn?' },
      { from: 'patient', text: 'Nee.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    baseline: 'Baseline',
    after8: 'Na sessie 8',
    exampleData: 'Voorbeelddata',
    measures: ['PDSS-SR', 'GAD-7', 'WSAS'],
    moments: ['Baseline', 'Na sessie 4', 'Na sessie 8'],
    life: [
      ['Aanvallen per week', '3 à 4', '2', '1'],
      ['Xanax per week', '1 à 2', '1', '0'],
      ['Trein, lopen, koor', 'Vermijdt alles', 'Loopt 1× per week', 'Trein met partner, loopt 2× per week'],
      ['Sessie-evaluatie', '–', 'Gehoord, oefeningen moeilijk', 'Gehoord, oefenschema helpt'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de psycholoog kiest. Na elke sessie een korte check-in, op vaste momenten een uitgebreidere meting.',
    plansNote: 'Elke vragenlijst vraagt opnieuw naar gedachten aan zelfdoding.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'CGT paniek',
        lotte: true,
        items: [
          { moment: 'Na elke sessie', name: 'Korte check-in', asks: 'PDSS-SR, aantal aanvallen, oefeningen gedaan, sessie-evaluatie, veiligheidsvraag', current: true },
          { moment: 'Sessie 4, 8 en 10', name: 'Tussentijdse meting', asks: 'GAD-7, WSAS, vermijding (trein, winkels, lopen), Xanax-gebruik, open vragen', current: true },
          { moment: '3 maanden na afsluiting', name: 'Follow-up', asks: 'PDSS-SR, GAD-7, WSAS, EQ-5D-5L, terugval, tevredenheid, PREM' },
        ],
      },
      {
        name: 'EMDR trauma',
        items: [
          { moment: 'Na elke sessie', name: 'Korte check-in', asks: 'Nachtmerries, herbelevingen, slaap, sessie-evaluatie, veiligheidsvraag' },
          { moment: 'Sessie 4 en afsluiting', name: 'Tussentijdse meting', asks: 'PCL-5, WSAS, open vragen' },
        ],
      },
      {
        name: 'Kortdurende begeleiding (stress)',
        items: [{ moment: 'Sessie 1, 3 en 5', name: 'Opvolging welzijn', asks: 'PHQ-9, GAD-7, slaap, werk, open vragen' }],
      },
    ],
  },
  en: {
    hello: 'Hello Andreas!',
    calm: 'You have no urgent interactions',
    urgent: 'You have 1 alert task',
    screenings: 'Recent Screenings',
    alerts: 'Alert Tasks',
    noAlerts: 'No alert tasks.',
    viewAll: 'View all',
    rows: [
      ['P. Vagus', 'CBT depression · after session 4'],
      ['L. Amygdala', 'CBT panic · after session 8 · PDSS-SR completed'],
      ['T. Thalamus', 'EMDR trauma · after session 3'],
      ['D. Fornix', 'CBT social anxiety · after session 6'],
    ],
    alert: 'Reports after session 4 that he is much lower in mood and hardly sleeping. Answers "sometimes I think there’s no point any more", without a plan. Get in touch before the next session.',
    detail: 'L. Amygdala · CBT panic',
    checkin: 'Check-in after session 8',
    chat: [
      { from: 'bot', text: 'How did the exercises go this week?' },
      { from: 'patient', text: 'I took the train to Ghent with my boyfriend. My heart was racing, but nothing happened.' },
      { from: 'bot', text: 'That is a big step. What isn’t working yet?' },
      { from: 'patient', text: 'Taking the train on my own. That’s for next week.' },
      { from: 'bot', text: 'How did you experience the last session?' },
      { from: 'patient', text: 'Good, I felt heard. The exercise schedule helps.' },
      { from: 'bot', text: 'Have you had thoughts of not wanting to be here any more?' },
      { from: 'patient', text: 'No.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    baseline: 'Baseline',
    after8: 'After session 8',
    exampleData: 'Example data',
    measures: ['PDSS-SR', 'GAD-7', 'WSAS'],
    moments: ['Baseline', 'After session 4', 'After session 8'],
    life: [
      ['Attacks per week', '3 to 4', '2', '1'],
      ['Xanax per week', '1 to 2', '1', '0'],
      ['Train, running, choir', 'Avoids everything', 'Runs once a week', 'Train with partner, runs twice a week'],
      ['Session evaluation', '–', 'Heard, exercises difficult', 'Heard, exercise schedule helps'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the psychologist chooses. A short check-in after every session, and a fuller measurement at set moments.',
    plansNote: 'Every questionnaire asks again about thoughts of suicide.',
    completed: 'Completed',
    treatments: [
      {
        name: 'CBT panic',
        lotte: true,
        items: [
          { moment: 'After every session', name: 'Short check-in', asks: 'PDSS-SR, number of attacks, exercises done, session evaluation, safety question', current: true },
          { moment: 'Sessions 4, 8 and 10', name: 'Interim measurement', asks: 'GAD-7, WSAS, avoidance (train, shops, running), Xanax use, open questions', current: true },
          { moment: '3 months after ending', name: 'Follow-up', asks: 'PDSS-SR, GAD-7, WSAS, EQ-5D-5L, relapse, satisfaction, PREM' },
        ],
      },
      {
        name: 'EMDR trauma',
        items: [
          { moment: 'After every session', name: 'Short check-in', asks: 'Nightmares, re-experiencing, sleep, session evaluation, safety question' },
          { moment: 'Session 4 and ending', name: 'Interim measurement', asks: 'PCL-5, WSAS, open questions' },
        ],
      },
      {
        name: 'Brief support (stress)',
        items: [{ moment: 'Sessions 1, 3 and 5', name: 'Wellbeing follow-up', asks: 'PHQ-9, GAD-7, sleep, work, open questions' }],
      },
    ],
  },
  fr: {
    hello: 'Bonjour Andreas !',
    calm: 'Vous n’avez aucune interaction urgente',
    urgent: 'Vous avez 1 tâche d’alerte',
    screenings: 'Dépistages Récents',
    alerts: 'Tâches d’alerte',
    noAlerts: 'Aucune tâche d’alerte.',
    viewAll: 'Voir tout',
    rows: [
      ['P. Vagus', 'TCC dépression · après la séance 4'],
      ['L. Amygdala', 'TCC panique · après la séance 8 · PDSS-SR rempli'],
      ['T. Thalamus', 'EMDR trauma · après la séance 3'],
      ['D. Fornix', 'TCC anxiété sociale · après la séance 6'],
    ],
    alert: 'Signale après la séance 4 qu’il est beaucoup plus sombre et dort à peine. Répond « parfois je me dis que ça ne sert plus à rien », sans plan. Prenez contact avant la prochaine séance.',
    detail: 'L. Amygdala · TCC panique',
    checkin: 'Suivi après la séance 8',
    chat: [
      { from: 'bot', text: 'Comment se sont passés les exercices cette semaine ?' },
      { from: 'patient', text: 'J’ai pris le train pour Gand avec mon copain. Mon cœur s’emballait, mais il ne s’est rien passé.' },
      { from: 'bot', text: 'C’est un grand pas. Qu’est-ce qui ne va pas encore ?' },
      { from: 'patient', text: 'Prendre le train seule. Ce sera pour la semaine prochaine.' },
      { from: 'bot', text: 'Comment avez-vous vécu la dernière séance ?' },
      { from: 'patient', text: 'Bien, je me suis sentie écoutée. Le schéma d’exercices m’aide.' },
      { from: 'bot', text: 'Avez-vous eu des pensées de ne plus vouloir être là ?' },
      { from: 'patient', text: 'Non.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    baseline: 'Référence',
    after8: 'Après la séance 8',
    exampleData: 'Données d’exemple',
    measures: ['PDSS-SR', 'GAD-7', 'WSAS'],
    moments: ['Référence', 'Après la séance 4', 'Après la séance 8'],
    life: [
      ['Crises par semaine', '3 à 4', '2', '1'],
      ['Xanax par semaine', '1 à 2', '1', '0'],
      ['Train, course, chorale', 'Évite tout', 'Court 1× par semaine', 'Train avec son partenaire, court 2× par semaine'],
      ['Évaluation de la séance', '–', 'Écoutée, exercices difficiles', 'Écoutée, le schéma d’exercices aide'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le psychologue. Un court suivi après chaque séance, et une mesure plus complète à des moments fixes.',
    plansNote: 'Chaque questionnaire demande à nouveau s’il y a des pensées suicidaires.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'TCC panique',
        lotte: true,
        items: [
          { moment: 'Après chaque séance', name: 'Court suivi', asks: 'PDSS-SR, nombre de crises, exercices faits, évaluation de la séance, question de sécurité', current: true },
          { moment: 'Séances 4, 8 et 10', name: 'Mesure intermédiaire', asks: 'GAD-7, WSAS, évitement (train, magasins, course), usage du Xanax, questions ouvertes', current: true },
          { moment: '3 mois après la fin', name: 'Suivi', asks: 'PDSS-SR, GAD-7, WSAS, EQ-5D-5L, rechute, satisfaction, PREM' },
        ],
      },
      {
        name: 'EMDR trauma',
        items: [
          { moment: 'Après chaque séance', name: 'Court suivi', asks: 'Cauchemars, reviviscences, sommeil, évaluation de la séance, question de sécurité' },
          { moment: 'Séance 4 et fin', name: 'Mesure intermédiaire', asks: 'PCL-5, WSAS, questions ouvertes' },
        ],
      },
      {
        name: 'Accompagnement court (stress)',
        items: [{ moment: 'Séances 1, 3 et 5', name: 'Suivi du bien-être', asks: 'PHQ-9, GAD-7, sommeil, travail, questions ouvertes' }],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'PV', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'LA', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'TT', flag: false, date: '24-09-2026, 19:05' },
  { initials: 'DF', flag: false, date: '23-09-2026, 18:30' },
];
// Baseline → after session 4 → after session 8 (sales' example data); the bars compare baseline with session 8, so a shorter bar is progress.
const SCORES: { max: number; values: [number, number, number] }[] = [
  { max: 28, values: [17, 13, 8] },
  { max: 21, values: [14, 11, 7] },
  { max: 40, values: [24, 19, 11] },
];
const LOTTE_ROW = 1;

export function MentalFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 P. Vagus' alert, 6 Lotte's progress opens
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
              const lotte = row.i === LOTTE_ROW;
              const body = (
                <>
                  <ClientAvatar initials={row.initials} flag={row.flag} size={30} />
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
                  {lotte ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#5A7FC0]/40 bg-[#EDF2FA]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>P. Vagus</b> · {c.alert}
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
                    <ClientAvatar initials="LA" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5"
              >
                {/* The check-in after session 8, in natural language */}
                <div>
                  <p className="text-[11px] font-medium text-[#949CB1] mb-2">{c.checkin}</p>
                  <div className="flex flex-col gap-2">
                    {c.chat.map((msg, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.18, duration: 0.35 }}
                        className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${msg.from === 'bot' ? 'self-start bg-[#F4F5F8]' : 'self-end bg-[#06ACC1] text-white'}`}
                      >
                        {msg.text}
                      </motion.p>
                    ))}
                  </div>
                </div>

                {/* Scores: baseline in grey, after session 8 in Lotte's colour; a shorter bar is progress */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">
                      {c.scores}{' '}
                      <span className="ml-1 inline-flex items-center rounded-full bg-[#EDF2FA] px-2 py-0.5 text-[10.5px] font-semibold text-[#3B66A8] align-middle">↓ {c.lowerBetter}</span>
                    </p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.baseline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: LOTTE }} />
                        {c.after8}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const { max, values } = SCORES[i];
                      const [before, mid, after] = values;
                      return (
                        <div key={label}>
                          <p className="flex justify-between text-[11px] mb-1">
                            <span>
                              {label} <span className="text-[#949CB1]">· 0–{max}</span>
                            </span>
                            <span className="tabular-nums text-[#4E5670]">
                              {before} → {mid} → <b className="text-[#2A3A51]">{after}</b>
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
                                style={{ backgroundColor: LOTTE }}
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
                  {/* Not only scores: attacks, Xanax, the train and how she experienced the sessions */}
                  <div className="mt-4 overflow-x-auto">
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
                        {c.life.map(([label, ...values]) => (
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

              {/* The follow-up follows the treatment the psychologist chooses */}
              <AppCard icon="list-checked" title={c.plans} bodyClassName="p-4">
                <p className="text-[11.5px] text-[#4E5670] leading-snug mb-3 max-w-xl">{c.plansIntro}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  {c.treatments.map((treatment) => (
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.lotte ? 'border-[#5A7FC0]/30 bg-[#EDF2FA]/70' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.lotte && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#5A7FC0]/20">
                            <ClientAvatar initials="LA" size={12} />
                            Lotte
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
