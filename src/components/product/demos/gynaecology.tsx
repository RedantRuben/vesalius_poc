'use client';

/**
 * Module demos for the gynaecology variant (source: sales, "Website-inhoud gynaecologie", §7). Every page follows Lea
 * Levator (62, retired childminder, three vaginal births, a bulge from the vagina and bladder symptoms) one step further,
 * from triage to a POP-Q and residual (cystocele stage III), a ring pessary with pelvic floor physiotherapy and the
 * follow-up at week 6; C. Douglas (postmenopausal bleeding) is the recurring red flag and U. Rethra raises the alert
 * after an anterior repair. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Lea keeps one avatar colour on every page, so visitors recognise her. */
const LEA = '#7B5EA7';
const LEA_SOFT = '#F3EFF9';
/** Red flags (C. Douglas, U. Rethra) share one red accent and the warning icon. */
const RED = APP.accent;
/** Patients who stay with the gynaecologists, those sent to other care, and a report that is no red flag. */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };
const NEUTRAL = { text: '#6B7385', bg: '#F0F1F4' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'LL' ? LEA : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function LeaTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="LL" size={24} />
        Lea Levator
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: urogynaecology, or care elsewhere                 */
/* ------------------------------------------------------------------ */

type Referral = 'urogyn' | 'physio' | 'colorectal' | 'fertility' | 'noFlag' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Bloedverlies vijf jaar na de menopauze. Krijgt voorrang: afspraak binnen de week, met echografie. Secretariaat neemt vandaag contact op.',
    referrals: { urogyn: 'Urogynaecologie', physio: 'Bekkenbodemkine', colorectal: 'Colorectale chirurgie', fertility: 'Fertiliteit', noFlag: 'Geen rode vlag' },
    rows: [
      'Bloedverlies vijf jaar na de menopauze, sinds een week, geen pijn',
      'Balgevoel vanuit de vagina sinds 8 maanden, vaak plassen, moeite met uitplassen, nooit kine',
      'Urineverlies bij sporten, 8 maanden na bevalling, geen balgevoel, nog geen kine',
      'Bal die uit de anus komt bij de stoelgang, soms bloed',
      '14 maanden kinderwens, onregelmatige cyclus',
      'Meer witte afscheiding sinds de pessariumwissel, geen geur, geen bloed',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Bleeding five years after the menopause. Gets priority: an appointment within the week, with an ultrasound. The secretariat is getting in touch today.',
    referrals: { urogyn: 'Urogynaecology', physio: 'Pelvic floor physio', colorectal: 'Colorectal surgery', fertility: 'Fertility', noFlag: 'No red flag' },
    rows: [
      'Bleeding five years after the menopause, for a week, no pain',
      'Vaginal bulge for 8 months, frequent urination, difficulty emptying, never had physio',
      'Urine leakage during sport, 8 months after giving birth, no bulge, no physio yet',
      'Bulge coming out of the anus when opening the bowels, sometimes blood',
      'Trying to conceive for 14 months, irregular cycle',
      'More white discharge since the pessary change, no odour, no blood',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Saignement cinq ans après la ménopause. Prioritaire : rendez-vous dans la semaine, avec échographie. Le secrétariat prend contact aujourd’hui.',
    referrals: { urogyn: 'Urogynécologie', physio: 'Rééducation périnéale', colorectal: 'Chirurgie colorectale', fertility: 'Fertilité', noFlag: 'Pas de signal d’alerte' },
    rows: [
      'Saignement cinq ans après la ménopause, depuis une semaine, pas de douleur',
      'Sensation de boule vaginale depuis 8 mois, mictions fréquentes, difficulté à vider la vessie, jamais de rééducation',
      'Fuites urinaires au sport, 8 mois après un accouchement, pas de boule, pas encore de rééducation',
      'Boule qui sort de l’anus à la selle, parfois du sang',
      'Désir de grossesse depuis 14 mois, cycle irrégulier',
      'Plus de pertes blanches depuis le changement de pessaire, pas d’odeur, pas de sang',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'C. Douglas', initials: 'CD', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'L. Levator', initials: 'LL', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'urogyn' },
  { name: 'P. Perineum', initials: 'PP', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'physio' },
  { name: 'R. Ectum', initials: 'RE', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'colorectal' },
  { name: 'T. Fallopius', initials: 'TF', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'fertility' },
  { name: 'O. Varium', initials: 'OV', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: 'noFlag' },
];

// Pelvic floor physio and colorectal surgery in another colour: not every patient lands in the gynaecologist's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = {
  urogyn: STAYS,
  fertility: STAYS,
  physio: ELSEWHERE,
  colorectal: ELSEWHERE,
  noFlag: NEUTRAL,
};

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function GynaecologyTriageDemo() {
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
                <PatientAvatar initials="CD" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">C. Douglas</span>
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
/* 2 · Agenda: a long slot with the urogynaecologist                   */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'maandag 9 november 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst en mictiedagboek ingevuld',
    elsewhere: '3 patiënten doorgestuurd naar andere zorg',
    types: [
      'Pessariumcontrole en -wissel',
      'Voorrang · bloedverlies na de menopauze · echografie',
      'Controle lichen sclerosus',
      'Nieuwe patiënte · verzakking en plasklachten',
      'Zelfde dag · plasproblemen na voorwandplastiek',
      'Urodynamisch onderzoek',
    ],
  },
  en: {
    date: 'Monday 9 November 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire and bladder diary completed',
    elsewhere: '3 patients referred to other care',
    types: [
      'Pessary check and change',
      'Priority · postmenopausal bleeding · ultrasound',
      'Lichen sclerosus check-up',
      'New patient · prolapse and bladder symptoms',
      'Same day · voiding problems after anterior repair',
      'Urodynamic study',
    ],
  },
  fr: {
    date: 'lundi 9 novembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire et calendrier mictionnel remplis',
    elsewhere: '3 patientes orientées vers d’autres soins',
    types: [
      'Contrôle et changement de pessaire',
      'Prioritaire · saignement après la ménopause · échographie',
      'Contrôle lichen scléreux',
      'Nouvelle patiente · prolapsus et troubles urinaires',
      'Le jour même · troubles mictionnels après cure de cystocèle',
      'Bilan urodynamique',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; lea?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'O. Varium', initials: 'OV', type: 0 },
  { room: 1, start: 0, len: 3, name: 'L. Levator', initials: 'LL', type: 3, lea: true },
  { room: 0, start: 1, len: 1, name: 'C. Douglas', initials: 'CD', type: 1, flag: true },
  { room: 2, start: 1, len: 1, name: 'U. Rethra', initials: 'UR', type: 4 },
  { room: 0, start: 2, len: 1, name: 'V. Ulva', initials: 'VU', type: 2 },
  { room: 2, start: 3, len: 1, name: 'S. Acrum', initials: 'SA', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.lea ? LEA : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.lea ? LEA_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.lea && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.lea && <PatientAvatar initials="LL" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.lea && ready && (
        // The tick links to the pre-consultation page; its label opens on hover.
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
        >
          <Check size={10} color="#1F9E6E" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[16rem]">{readyLabel}</span>
        </motion.span>
      )}
    </motion.div>
  );
}

export function GynaecologyAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Lea's questionnaire tick and the patients referred on
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
                  <VisitBlock key={visit.name} visit={visit} label={c.types[visit.type]} ready={done} readyLabel={c.ready} />
                ))}
            </div>
          ))}
        </div>
      </div>
      {/* P. Perineum, R. Ectum and T. Fallopius are not in this agenda: triage sent them to physio, colorectal surgery and fertility. */}
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
/* 3 · Pre-consultation: from the vagina, so urogynaecology            */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: { from: 'bot' | 'patient'; text: string }[];
  where: [string, string, string];
  yesNo: [string, string];
  summary: string;
  copy: string;
  tabs: [string, string, string];
  summaries: [SummarySection[], SummarySection[], SummarySection[]];
};

// After her first answer the duration fills in; once she answers "vagina" the reason that decided the routing lights up.
const DURATION_AT = 2;
const WHERE_AT = 4;
/** Sections open by default on Lea's tab: reason, prolapse and bladder. */
const OPEN_BY_DEFAULT = [0, 1, 2];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: "Al acht maanden een gevoel alsof er een bal naar beneden zakt. 's Avonds is het het ergst." },
      { from: 'bot', text: 'Voelt of ziet u die bal vanuit de vagina, of vanuit de anus?' },
      { from: 'patient', text: 'Vagina. Ik voel hem bij het wassen.' },
      { from: 'bot', text: 'Moet u de bal soms terugduwen om goed te kunnen plassen?' },
    ],
    where: ['Vagina', 'Anus', 'Weet ik niet'],
    yesNo: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Urogynaecologie', 'Algemene gynaecologie', 'Fertiliteit'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', 'Balgevoel vanuit de vagina, voelt een bolletje bij het wassen. Vaak plassen en het gevoel dat de blaas niet leeg is. Vermoeden van verzakking volgens de huisarts.', {
              fillAt: WHERE_AT,
              mark: 'Bepaalde de routering',
            }),
            r('Duur', 'Acht maanden, geleidelijk erger', { fillAt: DURATION_AT }),
          ],
        },
        {
          title: 'Verzakking',
          rows: [
            r('Hinder', 'Drukkend gevoel, 3/10, geen echte pijn'),
            r('Erger bij', "'s Avonds, lang rechtstaan, tuinieren, kleinkinderen optillen", { fillAt: DURATION_AT }),
            r('Beter bij', "Liggen, 's ochtends"),
          ],
        },
        {
          title: 'Plassen',
          rows: [
            r('Frequentie', "9 à 10× overdag, 2 à 3× 's nachts"),
            r('Lediging', 'Trage straal, gevoel van onvolledige lediging, duwt de bal soms terug om uit te plassen'),
            r('Urineverlies', 'Soms enkele druppels bij hoesten of niezen, geen verlies bij aandrang'),
            r('Blaasontsteking', '2× in het afgelopen jaar'),
            r('Mictiedagboek (3 dagen)', "Gemiddeld 10× overdag en 2,7× 's nachts, porties 120 tot 250 ml, drinkt 1,6 l per dag"),
          ],
        },
        {
          title: 'Stoelgang',
          rows: [r('Verloop', 'Neiging tot verstopping, soms een zakje Movicol. Geen verlies van stoelgang of gas, hoeft niet te duwen om stoelgang te maken')],
        },
        { title: 'Seksualiteit', rows: [r('Verloop', 'Actief, minder vaak door gêne en droogte. Geen pijn')] },
        {
          title: 'Rode vlaggen',
          rows: [r('Bloedverlies na de menopauze', 'Nee'), r('Bloed in de urine', 'Nee'), r('Gewichtsverlies, toenemende buikomvang', 'Nee')],
        },
        {
          title: 'Gynaecologische achtergrond',
          rows: [
            r('Bevallingen', '3 vaginale bevallingen (1988, 1990 met tang, 1994), zwaarste baby 4,1 kg'),
            r('Menopauze', 'Op 51 jaar, nooit hormoonbehandeling'),
            r('Baarmoederhalsscreening', 'Laatste in 2024, normaal'),
          ],
        },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Eerdere behandeling', 'Geen bekkenbodemkine, geen pessarium'),
            r('Ziekten', 'Hoge bloeddruk, verhoogde cholesterol. Droge kriebelhoest sinds ongeveer een jaar'),
            r('Operaties', 'Galblaas verwijderd via kijkoperatie, 2009'),
            r('Allergieën', 'Pleisters (huidreactie)'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Moeder geopereerd voor een verzakking op 70 jaar'),
          ],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Nooit / 1 glas wijn in het weekend')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Gepensioneerd, was kinderverzorgster in een kinderdagverblijf'),
            r('Sport en hobby', 'Wandelclub (vroeger 10 km, nu max. 4 km), aquagym wekelijks, moestuin. Past 2 dagen per week op de kleinkinderen'),
            r('Lengte / gewicht', '1,64 m / 74 kg'),
            r('Leeftijd', '62 jaar'),
            r('Verwijzing', 'Via dr. Claes, huisarts'),
          ],
        },
        { title: 'Baseline', rows: [r('PFDI-20', '128 (0 tot 300, lager = beter)'), r('PFIQ-7', '95 (0 tot 300, lager = beter)')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Hevige menstruaties met stolsels, sinds een jaar')] },
        { title: 'Bloedverlies', rows: [r('Verloop', '7 dagen, op dag 2 elk uur een nachtverband')] },
        { title: 'Rode vlaggen', rows: [r('Bloedverlies tussen de menstruaties', 'Nee')] },
        { title: 'Gynaecologische achtergrond', rows: [r('Kinderwens', 'Nee')] },
        { title: 'Algemeen', rows: [r('Vermoeidheid', 'Ja, ijzertekort vastgesteld door de huisarts'), r('Beroep / leeftijd', 'Leerkracht / 45 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', '14 maanden kinderwens, niet zwanger')] },
        { title: 'Cyclus', rows: [r('Regelmaat', 'Onregelmatig, 35 tot 50 dagen')] },
        { title: 'Gynaecologische achtergrond', rows: [r('Eerdere zwangerschappen', 'Geen')] },
        { title: 'Partner', rows: [r('Spermaonderzoek', 'Nog niet gebeurd')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Grafisch ontwerper / 32 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'For eight months it has felt as if a ball is dropping down. It’s worst in the evening.' },
      { from: 'bot', text: 'Do you feel or see that bulge from the vagina, or from the anus?' },
      { from: 'patient', text: 'The vagina. I can feel it when I wash.' },
      { from: 'bot', text: 'Do you sometimes have to push the bulge back to empty your bladder properly?' },
    ],
    where: ['Vagina', 'Anus', 'Not sure'],
    yesNo: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Urogynaecology', 'General gynaecology', 'Fertility'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Bulge from the vagina, feels a lump when washing. Frequent urination and a feeling that the bladder is not empty. Suspected prolapse according to the GP.', {
              fillAt: WHERE_AT,
              mark: 'Decided the routing',
            }),
            r('Duration', 'Eight months, gradually getting worse', { fillAt: DURATION_AT }),
          ],
        },
        {
          title: 'Prolapse',
          rows: [
            r('Bother', 'Pressure, 3/10, no real pain'),
            r('Worse with', 'Evenings, standing for long, gardening, lifting the grandchildren', { fillAt: DURATION_AT }),
            r('Better with', 'Lying down, mornings'),
          ],
        },
        {
          title: 'Bladder',
          rows: [
            r('Frequency', '9 to 10 times by day, 2 to 3 times at night'),
            r('Emptying', 'Slow stream, feeling of incomplete emptying, sometimes pushes the bulge back to void'),
            r('Leakage', 'Sometimes a few drops when coughing or sneezing, no urge leakage'),
            r('Cystitis', 'Twice in the past year'),
            r('Bladder diary (3 days)', 'On average 10 times by day and 2.7 times at night, volumes 120 to 250 ml, drinks 1.6 l a day'),
          ],
        },
        {
          title: 'Bowel',
          rows: [r('Pattern', 'Tends to constipation, sometimes a sachet of Movicol. No faecal or flatus incontinence, no need to strain to open the bowels')],
        },
        { title: 'Sexual function', rows: [r('Pattern', 'Active, less often because of embarrassment and dryness. No pain')] },
        {
          title: 'Red flags',
          rows: [r('Postmenopausal bleeding', 'No'), r('Blood in the urine', 'No'), r('Weight loss, increasing abdominal girth', 'No')],
        },
        {
          title: 'Gynaecological history',
          rows: [
            r('Births', '3 vaginal births (1988, 1990 with forceps, 1994), heaviest baby 4.1 kg'),
            r('Menopause', 'At 51, never had hormone therapy'),
            r('Cervical screening', 'Last in 2024, normal'),
          ],
        },
        {
          title: 'Medical history',
          rows: [
            r('Previous treatment', 'No pelvic floor physiotherapy, no pessary'),
            r('Conditions', 'High blood pressure, raised cholesterol. Dry tickly cough for about a year'),
            r('Operations', 'Laparoscopic gallbladder removal, 2009'),
            r('Allergies', 'Plasters (skin reaction)'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Mother had prolapse surgery at 70'),
          ],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'Never / 1 glass of wine at the weekend')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Retired, was a childminder at a nursery'),
            r('Sport and hobbies', 'Walking club (used to do 10 km, now max. 4 km), aqua aerobics weekly, vegetable garden. Looks after the grandchildren 2 days a week'),
            r('Height / weight', '1.64 m / 74 kg'),
            r('Age', '62'),
            r('Referral', 'Via Dr Claes, GP'),
          ],
        },
        { title: 'Baseline', rows: [r('PFDI-20', '128 (0 to 300, lower = better)'), r('PFIQ-7', '95 (0 to 300, lower = better)')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Heavy periods with clots, for a year')] },
        { title: 'Bleeding', rows: [r('Pattern', '7 days, on day 2 a night pad every hour')] },
        { title: 'Red flags', rows: [r('Bleeding between periods', 'No')] },
        { title: 'Gynaecological history', rows: [r('Wish to conceive', 'No')] },
        { title: 'General', rows: [r('Tiredness', 'Yes, iron deficiency found by the GP'), r('Occupation / age', 'Teacher / 45')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Trying to conceive for 14 months, not pregnant')] },
        { title: 'Cycle', rows: [r('Regularity', 'Irregular, 35 to 50 days')] },
        { title: 'Gynaecological history', rows: [r('Previous pregnancies', 'None')] },
        { title: 'Partner', rows: [r('Semen analysis', 'Not done yet')] },
        { title: 'General', rows: [r('Occupation / age', 'Graphic designer / 32')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis huit mois, j’ai l’impression qu’une boule descend. C’est le soir que c’est le pire.' },
      { from: 'bot', text: 'Sentez-vous ou voyez-vous cette boule au niveau du vagin, ou de l’anus ?' },
      { from: 'patient', text: 'Le vagin. Je la sens en me lavant.' },
      { from: 'bot', text: 'Devez-vous parfois repousser la boule pour bien vider votre vessie ?' },
    ],
    where: ['Vagin', 'Anus', 'Je ne sais pas'],
    yesNo: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Urogynécologie', 'Gynécologie générale', 'Fertilité'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Sensation de boule au niveau du vagin, sent une petite boule en se lavant. Mictions fréquentes et impression que la vessie n’est pas vide. Suspicion de prolapsus selon le médecin traitant.', {
              fillAt: WHERE_AT,
              mark: 'A décidé de l’orientation',
            }),
            r('Durée', 'Huit mois, progressivement aggravée', { fillAt: DURATION_AT }),
          ],
        },
        {
          title: 'Prolapsus',
          rows: [
            r('Gêne', 'Sensation de pesanteur, 3/10, pas de vraie douleur'),
            r('Pire en cas de', 'Le soir, station debout prolongée, jardinage, porter les petits-enfants', { fillAt: DURATION_AT }),
            r('Mieux avec', 'Position couchée, le matin'),
          ],
        },
        {
          title: 'Miction',
          rows: [
            r('Fréquence', '9 à 10× le jour, 2 à 3× la nuit'),
            r('Vidange', 'Jet faible, sensation de vidange incomplète, repousse parfois la boule pour uriner'),
            r('Fuites', 'Parfois quelques gouttes à la toux ou à l’éternuement, pas de fuites par urgenturie'),
            r('Cystites', '2× au cours de l’année écoulée'),
            r('Calendrier mictionnel (3 jours)', 'En moyenne 10× le jour et 2,7× la nuit, volumes de 120 à 250 ml, boit 1,6 l par jour'),
          ],
        },
        {
          title: 'Transit',
          rows: [r('Évolution', 'Tendance à la constipation, parfois un sachet de Movicol. Pas d’incontinence aux selles ni aux gaz, pas besoin de pousser pour aller à selle')],
        },
        { title: 'Sexualité', rows: [r('Évolution', 'Active, moins souvent par gêne et sécheresse. Pas de douleur')] },
        {
          title: 'Signaux d’alerte',
          rows: [r('Saignement après la ménopause', 'Non'), r('Sang dans les urines', 'Non'), r('Perte de poids, augmentation du volume abdominal', 'Non')],
        },
        {
          title: 'Antécédents gynécologiques',
          rows: [
            r('Accouchements', '3 accouchements par voie basse (1988, 1990 avec forceps, 1994), plus gros bébé 4,1 kg'),
            r('Ménopause', 'À 51 ans, jamais de traitement hormonal'),
            r('Dépistage du col', 'Dernier en 2024, normal'),
          ],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Traitement antérieur', 'Pas de rééducation périnéale, pas de pessaire'),
            r('Affections', 'Hypertension, cholestérol élevé. Toux sèche irritative depuis environ un an'),
            r('Opérations', 'Cholécystectomie par cœlioscopie, 2009'),
            r('Allergies', 'Pansements adhésifs (réaction cutanée)'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Mère opérée d’un prolapsus à 70 ans'),
          ],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'Jamais / 1 verre de vin le week-end')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Retraitée, était puéricultrice en crèche'),
            r('Sport et loisirs', 'Club de marche (autrefois 10 km, maintenant max. 4 km), aquagym chaque semaine, potager. Garde ses petits-enfants 2 jours par semaine'),
            r('Taille / poids', '1,64 m / 74 kg'),
            r('Âge', '62 ans'),
            r('Orientation', 'Par le Dr Claes, médecin traitant'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('PFDI-20', '128 (0 à 300, plus bas = mieux)'), r('PFIQ-7', '95 (0 à 300, plus bas = mieux)')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Règles abondantes avec caillots, depuis un an')] },
        { title: 'Saignements', rows: [r('Évolution', '7 jours, le 2e jour une serviette de nuit toutes les heures')] },
        { title: 'Signaux d’alerte', rows: [r('Saignements entre les règles', 'Non')] },
        { title: 'Antécédents gynécologiques', rows: [r('Désir de grossesse', 'Non')] },
        { title: 'Général', rows: [r('Fatigue', 'Oui, carence en fer constatée par le médecin traitant'), r('Profession / âge', 'Enseignante / 45 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Désir de grossesse depuis 14 mois, pas enceinte')] },
        { title: 'Cycle', rows: [r('Régularité', 'Irrégulier, 35 à 50 jours')] },
        { title: 'Antécédents gynécologiques', rows: [r('Grossesses antérieures', 'Aucune')] },
        { title: 'Partenaire', rows: [r('Spermogramme', 'Pas encore fait')] },
        { title: 'Général', rows: [r('Profession / âge', 'Graphiste / 32 ans')] },
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

export function GynaecologyPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–5 the conversation: the vagina-or-anus question waits on its three buttons, the last one on Yes / No
  const step = useSteps(total, 1000, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Lea's tab opens on what matters first; long sections stay folded, the other two tabs are short and fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 7}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step === 3 && <Choices options={c.where} />}
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
              {i === 0 && <PatientAvatar initials="LL" size={18} />}
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
                            {marked && (
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
/* 4 · Voice Reception: she calls, she is booked with the urogynaecologist */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts denkt dat ik een verzakking heb. Kan ik een afspraak krijgen bij de gynaecoloog?' },
      { from: 'bot', text: 'Vervelend om te horen. Voelt u een bal vanuit de vagina, of vanuit de anus?' },
      { from: 'patient', text: 'Vanuit de vagina. En ik moet heel vaak plassen, maar mijn blaas voelt nooit leeg.' },
      { from: 'bot', text: 'Heeft u bloedverlies gehad na de menopauze, of lukt plassen soms helemaal niet meer?' },
      { from: 'patient', text: 'Nee, dat niet.' },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de urogynaecoloog en stuur u een korte vragenlijst en een mictiedagboek om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de urogynaecoloog: verzakking met plasklachten, geen rode vlaggen',
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
      { from: 'patient', text: 'Hello, my GP thinks I have a prolapse. Can I get an appointment with the gynaecologist?' },
      { from: 'bot', text: 'Sorry to hear that. Do you feel a bulge from the vagina, or from the anus?' },
      { from: 'patient', text: 'From the vagina. And I need to pass urine very often, but my bladder never feels empty.' },
      { from: 'bot', text: 'Have you had any bleeding after the menopause, or are there times you cannot pass urine at all?' },
      { from: 'patient', text: 'No, not that.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the urogynaecologist and send you a short questionnaire and a bladder diary to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the urogynaecologist: prolapse with bladder symptoms, no red flags',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant pense que j’ai un prolapsus. Puis-je avoir un rendez-vous chez le gynécologue ?' },
      { from: 'bot', text: 'Désolé de l’entendre. Sentez-vous une boule au niveau du vagin, ou de l’anus ?' },
      { from: 'patient', text: 'Au niveau du vagin. Et je dois uriner très souvent, mais ma vessie ne semble jamais vide.' },
      { from: 'bot', text: 'Avez-vous eu des saignements après la ménopause, ou vous arrive-t-il de ne plus pouvoir uriner du tout ?' },
      { from: 'patient', text: 'Non, pas ça.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez l’urogynécologue et je vous envoie un court questionnaire et un calendrier mictionnel pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez l’urogynécologue : prolapsus avec troubles urinaires, aucun signal d’alerte',
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

export function GynaecologyVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 62 19</span>
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
                <PatientAvatar initials="LL" size={18} />
                L. Levator
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
/* 5 · Scribe: POP-Q, cough test and residual in the note              */
/* ------------------------------------------------------------------ */

/** POP-Q as the classic three-by-three grid: Aa Ba C / gh pb tvl / Ap Bp D. */
const POPQ: [string, string][][] = [
  [
    ['Aa', '+2'],
    ['Ba', '+3'],
    ['C', '−5'],
  ],
  [
    ['gh', '4'],
    ['pb', '3'],
    ['tvl', '9'],
  ],
  [
    ['Ap', '−2'],
    ['Bp', '−2'],
    ['D', '−7'],
  ],
];

function PopqGrid() {
  return (
    <div className="mt-1.5 inline-grid grid-cols-3 rounded-lg border border-[#E8EAEC] bg-white overflow-hidden text-center" role="table" aria-label="POP-Q">
      {POPQ.flat().map(([point, value], i) => (
        <span key={point} role="cell" className={`w-[4.25rem] px-2 py-1 ${i % 3 ? 'border-l' : ''} ${i >= 3 ? 'border-t' : ''} border-[#E8EAEC]`}>
          <span className="block text-[10px] text-[#949CB1]">{point}</span>
          <span className={`block text-[12.5px] font-semibold tabular-nums ${point === 'Ba' || point === 'Aa' ? 'text-[#B4531A]' : ''}`}>{value}</span>
        </span>
      ))}
    </div>
  );
}

type NoteSection = { title: string; text: string; clamp: boolean; popq?: boolean };

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
    template: 'Gynaecologie',
    templates: ['Urogynaecologie', 'Algemene gynaecologie', 'Oncologie', 'Fertiliteit'],
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
      { who: 'doctor', text: 'Ik vraag u nu even te persen, alsof u naar het toilet gaat.' },
      { who: 'patient', text: 'Ja, nu voel ik hem weer zakken.' },
      { who: 'doctor', text: 'Ik duw de voorwand even terug. Hoest nu eens flink.' },
      { who: 'patient', text: 'Oei, nu verlies ik een beetje urine.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: "Balgevoel vanuit de vagina sinds acht maanden, geleidelijk erger, vooral 's avonds en na tillen of tuinieren. Verwezen door dr. Claes wegens vermoeden van verzakking. Frequentie 9 à 10× overdag, nycturie 2 à 3×, trage straal, gevoel van onvolledige lediging, soms digitale reductie om uit te plassen. Soms enkele druppels urineverlies bij hoesten, geen urge-incontinentie. 2 urineweginfecties in het afgelopen jaar. Neiging tot obstipatie, geen fecale incontinentie. G3P3, 3 vaginale partussen, waarvan 1 met forceps, zwaarste kind 4,1 kg. Menopauze op 51 jaar, geen HST, geen postmenopauzaal bloedverlies. Droge hoest sinds een jaar onder perindopril. Solifenacine sinds 6 maanden via de huisarts, weinig effect. Geen bloedverdunners. Geen eerdere bekkenbodemkine.",
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'BMI 27,5. Abdomen soepel, geen massa. Lichte vulvovaginale atrofie. Bij persen voorwand tot voorbij de hymen. Baarmoeder goed ondersteund, achterwand stadium I. Hoesttest bij gevulde blaas (300 ml): negatief zonder reductie, positief na reductie van de voorwand. Bekkenbodemspieren: Modified Oxford 2/5, goede relaxatie. Bimanueel: uterus normaal van grootte, geen adnexmassa.',
        clamp: true,
        popq: true,
      },
      {
        title: 'Aanvullende onderzoeken',
        text: 'Transvaginale echografie: uterus 6 cm, endometrium 3 mm, beide ovaria atroof, geen vrij vocht. Residu na mictie (bladderscan): 160 ml. Urinestrip: negatief.',
        clamp: true,
      },
      {
        title: 'Diagnose',
        text: 'Symptomatische cystocele, POP-Q stadium III, met obstructieve mictie (residu 160 ml) en occulte stressincontinentie. Lichte vulvovaginale atrofie.',
        clamp: false,
      },
      {
        title: 'Beleid',
        text: 'Opties besproken: bekkenbodemkine, pessarium en voorwandplastiek. Patiënte kiest eerst voor een pessarium. Ringpessarium met steunmembraan 70 mm geplaatst, comfortabel, residu na mictie 40 ml. Lokale oestrogenen 2× per week. Bekkenbodemkinesitherapie, 9 sessies. Aan de huisarts: solifenacine stoppen gezien het residu, perindopril omzetten naar een sartaan gezien de hoest. Controle na zes weken. Bij onvoldoende effect of wens tot een definitieve oplossing: voorwandplastiek bespreken, met aandacht voor de occulte stressincontinentie. Vangnet: contact bij bloedverlies, pijn, koorts, niet kunnen plassen of als het pessarium uitvalt. Opvolging met PFDI-20 en PGI-I.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '09-05-1964'],
      ['Vragenlijst', 'Verzakking en plasklachten'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Gynaecology',
    templates: ['Urogynaecology', 'General gynaecology', 'Oncology', 'Fertility'],
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
      { who: 'doctor', text: 'I’m going to ask you to bear down now, as if you’re going to the toilet.' },
      { who: 'patient', text: 'Yes, now I can feel it coming down again.' },
      { who: 'doctor', text: 'I’ll hold the front wall back for a moment. Now give a good cough.' },
      { who: 'patient', text: 'Oops, now I’m leaking a little urine.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Vaginal bulge for eight months, gradually worse, especially in the evening and after lifting or gardening. Referred by Dr Claes for suspected prolapse. Frequency 9 to 10 times by day, nocturia 2 to 3 times, slow stream, feeling of incomplete emptying, sometimes digital reduction to void. Occasionally a few drops of leakage on coughing, no urge incontinence. 2 urinary tract infections in the past year. Tends to constipation, no faecal incontinence. G3P3, 3 vaginal deliveries, 1 with forceps, heaviest baby 4.1 kg. Menopause at 51, no HRT, no postmenopausal bleeding. Dry cough for a year on perindopril. Solifenacin for 6 months via the GP, little effect. No anticoagulants. No previous pelvic floor physiotherapy.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'BMI 27.5. Abdomen soft, no mass. Mild vulvovaginal atrophy. On straining, anterior wall beyond the hymen. Uterus well supported, posterior wall stage I. Cough test with a full bladder (300 ml): negative without reduction, positive after reduction of the anterior wall. Pelvic floor muscles: Modified Oxford 2/5, good relaxation. Bimanual: uterus normal size, no adnexal mass.',
        clamp: true,
        popq: true,
      },
      {
        title: 'Further investigations',
        text: 'Transvaginal ultrasound: uterus 6 cm, endometrium 3 mm, both ovaries atrophic, no free fluid. Post-void residual (bladder scan): 160 ml. Urine dipstick: negative.',
        clamp: true,
      },
      {
        title: 'Diagnosis',
        text: 'Symptomatic cystocele, POP-Q stage III, with obstructed voiding (residual 160 ml) and occult stress incontinence. Mild vulvovaginal atrophy.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Options discussed: pelvic floor physiotherapy, pessary and anterior repair. Patient chooses a pessary first. Ring pessary with support 70 mm fitted, comfortable, post-void residual 40 ml. Local oestrogen twice a week. Pelvic floor physiotherapy, 9 sessions. To the GP: stop solifenacin given the residual, switch perindopril to a sartan given the cough. Review in six weeks. If insufficient effect or a wish for a definitive solution: discuss anterior repair, with attention to the occult stress incontinence. Safety net: get in touch with bleeding, pain, fever, inability to pass urine or if the pessary falls out. Follow-up with PFDI-20 and PGI-I.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '09-05-1964'],
      ['Questionnaire', 'Prolapse and bladder symptoms'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Gynécologie',
    templates: ['Urogynécologie', 'Gynécologie générale', 'Oncologie', 'Fertilité'],
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
      { who: 'doctor', text: 'Je vais vous demander de pousser, comme si vous alliez aux toilettes.' },
      { who: 'patient', text: 'Oui, là je la sens de nouveau descendre.' },
      { who: 'doctor', text: 'Je repousse un instant la paroi antérieure. Toussez fort maintenant.' },
      { who: 'patient', text: 'Oh, là je perds un peu d’urine.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Sensation de boule vaginale depuis huit mois, progressivement aggravée, surtout le soir et après avoir porté des charges ou jardiné. Adressée par le Dr Claes pour suspicion de prolapsus. Pollakiurie 9 à 10× le jour, nycturie 2 à 3×, jet faible, sensation de vidange incomplète, réduction digitale parfois nécessaire pour uriner. Parfois quelques gouttes de fuite à la toux, pas d’incontinence par urgenturie. 2 infections urinaires au cours de l’année écoulée. Tendance à la constipation, pas d’incontinence fécale. G3P3, 3 accouchements par voie basse dont 1 par forceps, plus gros enfant 4,1 kg. Ménopause à 51 ans, pas de THS, pas de saignement post-ménopausique. Toux sèche depuis un an sous périndopril. Solifénacine depuis 6 mois via le médecin traitant, peu d’effet. Pas d’anticoagulants. Pas de rééducation périnéale antérieure.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'IMC 27,5. Abdomen souple, pas de masse. Légère atrophie vulvo-vaginale. À la poussée, paroi antérieure au-delà de l’hymen. Utérus bien soutenu, paroi postérieure stade I. Test à la toux vessie pleine (300 ml) : négatif sans réduction, positif après réduction de la paroi antérieure. Muscles du plancher pelvien : Modified Oxford 2/5, bon relâchement. Toucher bimanuel : utérus de taille normale, pas de masse annexielle.',
        clamp: true,
        popq: true,
      },
      {
        title: 'Examens complémentaires',
        text: 'Échographie endovaginale : utérus 6 cm, endomètre 3 mm, ovaires atrophiques, pas de liquide libre. Résidu post-mictionnel (bladder scan) : 160 ml. Bandelette urinaire : négative.',
        clamp: true,
      },
      {
        title: 'Diagnostic',
        text: 'Cystocèle symptomatique, POP-Q stade III, avec dysurie obstructive (résidu 160 ml) et incontinence d’effort masquée. Légère atrophie vulvo-vaginale.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Options discutées : rééducation périnéale, pessaire et cure de cystocèle. La patiente opte d’abord pour un pessaire. Pessaire anneau avec membrane de soutien 70 mm posé, confortable, résidu post-mictionnel 40 ml. Œstrogènes locaux 2× par semaine. Rééducation périnéale, 9 séances. Au médecin traitant : arrêter la solifénacine vu le résidu, remplacer le périndopril par un sartan vu la toux. Contrôle après six semaines. En cas d’effet insuffisant ou de souhait d’une solution définitive : discuter une cure de cystocèle, en tenant compte de l’incontinence d’effort masquée. Filet de sécurité : prendre contact en cas de saignement, douleur, fièvre, impossibilité d’uriner ou si le pessaire tombe. Suivi avec PFDI-20 et PGI-I.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '09-05-1964'],
      ['Questionnaire', 'Prolapsus et troubles urinaires'],
      ['Langue', 'Français'],
    ],
  },
};

export function GynaecologyScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–4 transcript lines while recording, 5 generating, 6 note ready
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<LeaTitle back={c.back} />}>
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
                {/* Diagnosis and plan in full first; the rest shortened until "Show full note". The POP-Q grid stays visible. */}
                {[...c.sections.filter((s) => !s.clamp), ...c.sections.filter((s) => s.clamp)].map((section, i) => (
                  <motion.div key={section.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{section.title}</p>
                    {section.popq && <PopqGrid />}
                    <p className={`text-[12.5px] leading-relaxed ${section.popq ? 'mt-1.5' : ''} ${section.clamp && !full ? 'line-clamp-1 text-[#4E5670]' : ''}`}>{section.text}</p>
                  </motion.div>
                ))}
                <button type="button" onClick={() => setFull((f) => !f)} className="self-start px-1 text-[12px] font-medium text-[#06ACC1] hover:underline">
                  {full ? c.less : c.more}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title="Lea Levator" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: the bladder tablet she forgot, Movicol from the chat */
/* ------------------------------------------------------------------ */

const SCHEDULE_ROWS: [string, string][] = [
  ['Coversyl 5 mg filmomhulde tabletten', "1 tablet 's ochtends, voor het ontbijt"],
  ['Simvastatine EG 20 mg filmomhulde tabletten', "1 tablet 's avonds"],
  ['Vesicare 5 mg filmomhulde tabletten', '1 tablet per dag'],
  ['D-Cure 25.000 IE drinkbare oplossing', '1 ampul per maand'],
];

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 4 geneesmiddelen gevonden:',
    confirm: 'Ja. De Vesicare was ik vergeten, dat is de blaaspil van mijn huisarts. Ik neem ook soms een zakje Movicol als ik verstopt ben.',
    followUp: { question: 'Genoteerd, ik heb Movicol toegevoegd. Neemt u bloedverdunners, zoals Asaflow, Plavix, Xarelto of Eliquis?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    schedule: { header: 'Apotheek Het Kruispunt · Medicatieschema · L. Levator, ° 09-05-1964', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Coversyl', strength: '5 mg', substance: 'Perindopril', frequency: "1× per dag, 's ochtends", indication: 'Hoge bloeddruk', tag: { label: 'Kan kriebelhoest verklaren', tone: 'blue' } },
      { name: 'Simvastatine EG', strength: '20 mg', substance: 'Simvastatine', frequency: "1× per dag, 's avonds", indication: 'Cholesterol' },
      { name: 'Vesicare', strength: '5 mg', substance: 'Solifenacine', frequency: '1× per dag', indication: 'Overactieve blaas', tag: { label: 'Zelf vergeten', tone: 'amber' } },
      { name: 'D-Cure', strength: '25.000 IE', substance: 'Colecalciferol (vitamine D3)', frequency: '1× per maand', indication: 'Vitamine D-tekort' },
      { name: 'Movicol', strength: '13,8 g', substance: 'Macrogol + elektrolyten', frequency: 'Bij verstopping', indication: 'Verstopping', tag: { label: 'Vermeld in de chat', tone: 'blue' }, later: true },
    ],
    notes: [
      { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
      { label: 'Allergieën', value: 'Pleisters (huidreactie)' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 4 medicines:',
    confirm: 'Yes. I’d forgotten the Vesicare, that’s the bladder tablet from my GP. I also sometimes take a sachet of Movicol when I’m constipated.',
    followUp: { question: 'Noted, I’ve added Movicol. Do you take any blood thinners, such as Asaflow, Plavix, Xarelto or Eliquis?', choices: ['Yes', 'No'], answer: 'No' },
    schedule: { header: 'Apotheek Het Kruispunt · Medication schedule · L. Levator, b. 09-05-1964', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Coversyl', strength: '5 mg', substance: 'Perindopril', frequency: 'Once a day, in the morning', indication: 'High blood pressure', tag: { label: 'May explain the cough', tone: 'blue' } },
      { name: 'Simvastatine EG', strength: '20 mg', substance: 'Simvastatin', frequency: 'Once a day, in the evening', indication: 'Cholesterol' },
      { name: 'Vesicare', strength: '5 mg', substance: 'Solifenacin', frequency: 'Once a day', indication: 'Overactive bladder', tag: { label: 'Forgotten', tone: 'amber' } },
      { name: 'D-Cure', strength: '25,000 IU', substance: 'Colecalciferol (vitamin D3)', frequency: 'Once a month', indication: 'Vitamin D deficiency' },
      { name: 'Movicol', strength: '13.8 g', substance: 'Macrogol + electrolytes', frequency: 'When constipated', indication: 'Constipation', tag: { label: 'Mentioned in the chat', tone: 'blue' }, later: true },
    ],
    notes: [
      { label: 'Blood thinners', value: 'None (confirmed in the chat)', tone: 'ok' },
      { label: 'Allergies', value: 'Plasters (skin reaction)' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 4 médicaments :',
    confirm: 'Oui. J’avais oublié le Vesicare, c’est le médicament pour la vessie de mon médecin. Je prends aussi parfois un sachet de Movicol quand je suis constipée.',
    followUp: { question: 'C’est noté, j’ai ajouté le Movicol. Prenez-vous des anticoagulants, comme Asaflow, Plavix, Xarelto ou Eliquis ?', choices: ['Oui', 'Non'], answer: 'Non' },
    schedule: { header: 'Apotheek Het Kruispunt · Schéma de médication · L. Levator, née le 09-05-1964', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Coversyl', strength: '5 mg', substance: 'Périndopril', frequency: '1× par jour, le matin', indication: 'Hypertension', tag: { label: 'Peut expliquer la toux', tone: 'blue' } },
      { name: 'Simvastatine EG', strength: '20 mg', substance: 'Simvastatine', frequency: '1× par jour, le soir', indication: 'Cholestérol' },
      { name: 'Vesicare', strength: '5 mg', substance: 'Solifénacine', frequency: '1× par jour', indication: 'Vessie hyperactive', tag: { label: 'Oublié', tone: 'amber' } },
      { name: 'D-Cure', strength: '25 000 UI', substance: 'Colécalciférol (vitamine D3)', frequency: '1× par mois', indication: 'Carence en vitamine D' },
      { name: 'Movicol', strength: '13,8 g', substance: 'Macrogol + électrolytes', frequency: 'En cas de constipation', indication: 'Constipation', tag: { label: 'Mentionné dans le chat', tone: 'blue' }, later: true },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'Aucun (confirmé dans le chat)', tone: 'ok' },
      { label: 'Allergies', value: 'Pansements adhésifs (réaction cutanée)' },
    ],
  },
});

export function GynaecologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Lea Levator', initials: 'LL', dob: '09-05-1964', color: LEA }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, physio and oestrogen prescriptions           */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Gynaecologie, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Voorschrift bekkenbodemkinesitherapie', description: '9 sessies bekkenbodemtraining met leefadvies' },
      { label: 'Voorschrift lokale oestrogenen', description: 'Vaginale crème met estriol, 2× per week' },
      { label: 'Uitleg voor de patiënte', description: 'Verzorging van het pessarium en wanneer contact opnemen' },
      { label: 'Aanvraag opname', description: 'Voorwandplastiek, alleen bij keuze voor een ingreep' },
    ],
    previews: [
      'Diagnose: symptomatische cystocele, POP-Q stadium III, met obstructieve mictie (residu 160 ml) en occulte stressincontinentie. Beleid: ringpessarium 70 mm, lokale oestrogenen en bekkenbodemkine.',
      'Geachte collega, ik zag uw patiënte mevrouw Levator voor een balgevoel en plasklachten sinds acht maanden. Het onderzoek toont een cystocele stadium III met een residu van 160 ml. We starten met een pessarium en bekkenbodemkine, en zien haar terug na zes weken.',
      'Bekkenbodemkinesitherapie, 9 sessies: bekkenbodemtraining (Modified Oxford 2/5), blaastraining en leefadvies bij een pessarium.',
      'Estriol vaginale crème, 1 applicator 2× per week, langdurig, bij vulvovaginale atrofie en pessariumgebruik.',
      '',
      '',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënte Lea Levator, geboren op 9 mei 1964, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens een vermoeden van verzakking. Balgevoel vanuit de vagina en plasklachten sinds acht maanden.'],
        [
          'Anamnese',
          "Geleidelijk toenemend balgevoel, vooral 's avonds en na tillen of tuinieren, beter bij liggen. Plast 9 à 10 keer overdag en 2 à 3 keer 's nachts, met een trage straal en het gevoel van onvolledige lediging. Duwt de verzakking soms terug om uit te plassen. Het mictiedagboek bevestigt kleine porties van 120 tot 250 ml. Soms enkele druppels urineverlies bij hoesten, geen urge-incontinentie. Twee urineweginfecties in het afgelopen jaar. Neiging tot obstipatie, geen fecale incontinentie. Drie vaginale bevallingen, waarvan één met tang, zwaarste kind 4,1 kg. Menopauze op 51 jaar, nooit hormoonbehandeling, geen bloedverlies na de menopauze. Hoge bloeddruk en verhoogde cholesterol. Droge kriebelhoest sinds een jaar. Neemt perindopril, simvastatine, vitamine D en sinds zes maanden solifenacine, met weinig effect. Geen bloedverdunners. Allergie voor pleisters.",
        ],
        [
          'Klinisch onderzoek',
          'Lichte vulvovaginale atrofie. Bij persen daalt de voorwand tot voorbij de hymen. POP-Q: Aa +2, Ba +3, C −5, gh 4, pb 3, tvl 9, Ap −2, Bp −2, D −7. De baarmoeder is goed ondersteund, de achterwand toont een beperkte rectocele. Hoesttest met gevulde blaas negatief, maar positief na terugduwen van de voorwand. Bekkenbodemkracht 2 op 5 (Modified Oxford). Bimanueel onderzoek zonder bijzonderheden.',
        ],
        ['Aanvullende onderzoeken', 'Transvaginale echografie: normale uterus, endometrium 3 mm, atrofe ovaria. Residu na mictie 160 ml. Urinestrip negatief.'],
        ['Diagnose', 'Symptomatische cystocele, POP-Q stadium III, met obstructieve mictie en occulte stressincontinentie. Lichte vulvovaginale atrofie.'],
        [
          'Beleid',
          'We bespraken bekkenbodemkine, een pessarium en een voorwandplastiek. Lea koos eerst voor een pessarium. Een ringpessarium met steunmembraan (70 mm) werd geplaatst, zit comfortabel en het residu daalde naar 40 ml. Ze start lokale oestrogenen, twee keer per week, en bekkenbodemkinesitherapie. Mag ik u vragen de solifenacine te stoppen gezien het residu, en de perindopril om te zetten naar een sartaan gezien de kriebelhoest, die de verzakking kan verergeren? Controle na zes weken. Bij onvoldoende effect bespreken we een voorwandplastiek, met aandacht voor de occulte stressincontinentie. Ze weet dat ze contact moet opnemen bij bloedverlies, pijn, koorts, als plassen niet meer lukt of als het pessarium uitvalt.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, gynaecoloog',
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
      { label: 'Consultation report', description: 'Gynaecology template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Pelvic floor physiotherapy prescription', description: '9 sessions of pelvic floor training with lifestyle advice' },
      { label: 'Local oestrogen prescription', description: 'Vaginal estriol cream, twice a week' },
      { label: 'Explanation for the patient', description: 'Caring for the pessary and when to get in touch' },
      { label: 'Admission request', description: 'Anterior repair, only if surgery is chosen' },
    ],
    previews: [
      'Diagnosis: symptomatic cystocele, POP-Q stage III, with obstructed voiding (residual 160 ml) and occult stress incontinence. Plan: ring pessary 70 mm, local oestrogen and pelvic floor physiotherapy.',
      'Dear colleague, I saw your patient Mrs Levator for a bulge and bladder symptoms over the past eight months. Examination shows a stage III cystocele with a post-void residual of 160 ml. We are starting with a pessary and pelvic floor physiotherapy, and will see her again in six weeks.',
      'Pelvic floor physiotherapy, 9 sessions: pelvic floor training (Modified Oxford 2/5), bladder training and lifestyle advice with a pessary.',
      'Estriol vaginal cream, 1 applicator twice a week, long term, for vulvovaginal atrophy and pessary use.',
      '',
      '',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Lea Levator, born on 9 May 1964, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for a suspected prolapse. Vaginal bulge and bladder symptoms for eight months.'],
        [
          'History',
          'Gradually increasing bulge, especially in the evening and after lifting or gardening, better lying down. Passes urine 9 to 10 times by day and 2 to 3 times at night, with a slow stream and a feeling of incomplete emptying. Sometimes pushes the prolapse back to void. The bladder diary confirms small volumes of 120 to 250 ml. Occasionally a few drops of leakage on coughing, no urge incontinence. Two urinary tract infections in the past year. Tends to constipation, no faecal incontinence. Three vaginal births, one with forceps, heaviest baby 4.1 kg. Menopause at 51, never had hormone therapy, no postmenopausal bleeding. High blood pressure and raised cholesterol. Dry tickly cough for a year. Takes perindopril, simvastatin, vitamin D and, for six months, solifenacin with little effect. No anticoagulants. Allergic to plasters.',
        ],
        [
          'Clinical examination',
          'Mild vulvovaginal atrophy. On straining the anterior wall descends beyond the hymen. POP-Q: Aa +2, Ba +3, C −5, gh 4, pb 3, tvl 9, Ap −2, Bp −2, D −7. The uterus is well supported, the posterior wall shows a small rectocele. Cough test with a full bladder negative, but positive after reducing the anterior wall. Pelvic floor strength 2 out of 5 (Modified Oxford). Bimanual examination unremarkable.',
        ],
        ['Further investigations', 'Transvaginal ultrasound: normal uterus, endometrium 3 mm, atrophic ovaries. Post-void residual 160 ml. Urine dipstick negative.'],
        ['Diagnosis', 'Symptomatic cystocele, POP-Q stage III, with obstructed voiding and occult stress incontinence. Mild vulvovaginal atrophy.'],
        [
          'Plan',
          'We discussed pelvic floor physiotherapy, a pessary and an anterior repair. Lea chose a pessary first. A ring pessary with support (70 mm) was fitted, sits comfortably and the residual fell to 40 ml. She is starting local oestrogen twice a week and pelvic floor physiotherapy. May I ask you to stop the solifenacin given the residual, and to switch the perindopril to a sartan given the tickly cough, which can worsen the prolapse? Review in six weeks. If the effect is insufficient we will discuss an anterior repair, with attention to the occult stress incontinence. She knows to get in touch with bleeding, pain, fever, if she cannot pass urine or if the pessary falls out.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, gynaecologist',
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
      { label: 'Rapport de consultation', description: 'Modèle Gynécologie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Prescription de rééducation périnéale', description: '9 séances de rééducation périnéale avec conseils d’hygiène de vie' },
      { label: 'Prescription d’œstrogènes locaux', description: 'Crème vaginale à l’estriol, 2× par semaine' },
      { label: 'Explication pour la patiente', description: 'Entretien du pessaire et quand prendre contact' },
      { label: 'Demande d’admission', description: 'Cure de cystocèle, uniquement en cas de choix pour une intervention' },
    ],
    previews: [
      'Diagnostic : cystocèle symptomatique, POP-Q stade III, avec dysurie obstructive (résidu 160 ml) et incontinence d’effort masquée. Plan : pessaire anneau 70 mm, œstrogènes locaux et rééducation périnéale.',
      'Cher confrère, j’ai vu votre patiente Mme Levator pour une sensation de boule et des troubles urinaires depuis huit mois. L’examen montre une cystocèle de stade III avec un résidu de 160 ml. Nous commençons par un pessaire et une rééducation périnéale, et la revoyons dans six semaines.',
      'Rééducation périnéale, 9 séances : renforcement du plancher pelvien (Modified Oxford 2/5), rééducation vésicale et conseils d’hygiène de vie avec un pessaire.',
      'Crème vaginale à l’estriol, 1 applicateur 2× par semaine, au long cours, pour atrophie vulvo-vaginale et port d’un pessaire.',
      '',
      '',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patiente Lea Levator, née le 9 mai 1964, que j’ai vue récemment en consultation.',
      sections: [
        ['Motif de contact', 'Adressée pour une suspicion de prolapsus. Sensation de boule vaginale et troubles urinaires depuis huit mois.'],
        [
          'Anamnèse',
          'Sensation de boule progressivement croissante, surtout le soir et après avoir porté des charges ou jardiné, améliorée en position couchée. Urine 9 à 10 fois le jour et 2 à 3 fois la nuit, avec un jet faible et une sensation de vidange incomplète. Repousse parfois le prolapsus pour uriner. Le calendrier mictionnel confirme de petits volumes de 120 à 250 ml. Parfois quelques gouttes de fuite à la toux, pas d’incontinence par urgenturie. Deux infections urinaires au cours de l’année écoulée. Tendance à la constipation, pas d’incontinence fécale. Trois accouchements par voie basse, dont un par forceps, plus gros enfant 4,1 kg. Ménopause à 51 ans, jamais de traitement hormonal, pas de saignement après la ménopause. Hypertension et cholestérol élevé. Toux sèche irritative depuis un an. Prend du périndopril, de la simvastatine, de la vitamine D et, depuis six mois, de la solifénacine, avec peu d’effet. Pas d’anticoagulants. Allergie aux pansements adhésifs.',
        ],
        [
          'Examen clinique',
          'Légère atrophie vulvo-vaginale. À la poussée, la paroi antérieure descend au-delà de l’hymen. POP-Q : Aa +2, Ba +3, C −5, gh 4, pb 3, tvl 9, Ap −2, Bp −2, D −7. L’utérus est bien soutenu, la paroi postérieure montre une rectocèle limitée. Test à la toux vessie pleine négatif, mais positif après réduction de la paroi antérieure. Force du plancher pelvien 2 sur 5 (Modified Oxford). Toucher bimanuel sans particularité.',
        ],
        ['Examens complémentaires', 'Échographie endovaginale : utérus normal, endomètre 3 mm, ovaires atrophiques. Résidu post-mictionnel 160 ml. Bandelette urinaire négative.'],
        ['Diagnostic', 'Cystocèle symptomatique, POP-Q stade III, avec dysurie obstructive et incontinence d’effort masquée. Légère atrophie vulvo-vaginale.'],
        [
          'Plan',
          'Nous avons discuté de la rééducation périnéale, d’un pessaire et d’une cure de cystocèle. Lea a d’abord choisi un pessaire. Un pessaire anneau avec membrane de soutien (70 mm) a été posé, il est confortable et le résidu est descendu à 40 ml. Elle commence des œstrogènes locaux deux fois par semaine et une rééducation périnéale. Puis-je vous demander d’arrêter la solifénacine vu le résidu, et de remplacer le périndopril par un sartan vu la toux irritative, qui peut aggraver le prolapsus ? Contrôle après six semaines. En cas d’effet insuffisant, nous discuterons d’une cure de cystocèle, en tenant compte de l’incontinence d’effort masquée. Elle sait qu’elle doit prendre contact en cas de saignement, douleur, fièvre, impossibilité d’uriner ou si le pessaire tombe.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, gynécologue',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function GynaecologyDocumentDemo() {
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

  // Report and both prescriptions generate after the consultation; the letter lands on top, as the end frame. The
  // pessary leaflet and the admission request wait until the visitor generates them.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<LeaTitle />}>
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
/* 8 · Follow-up: U. Rethra raises an alert, Lea six weeks on          */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; lea?: boolean; items: Questionnaire[] };

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
    pfdi: string;
    pgii: string;
    pgiiValue: string;
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
      ['U. Rethra', 'Voorwandplastiek · dag 2'],
      ['L. Levator', 'Pessarium · week 6 · PFDI-20 ingevuld'],
      ['O. Varium', 'Pessarium · maand 6'],
      ['S. Acrum', 'Bekkenbodemkine · week 12'],
    ],
    alert: 'Kan sinds vanochtend niet meer plassen, buikpijn en koorts (38,4 °C), twee dagen na de voorwandplastiek. Neem contact op.',
    detail: 'L. Levator · pessarium',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met het balgevoel sinds het pessarium geplaatst is?' },
      { from: 'patient', text: "Ik voel het niet meer. Plassen gaat vlotter en 's nachts moet ik nog maar één keer." },
      { from: 'bot', text: 'Fijn om te horen. Is er iets dat nog niet lukt, of dat u stoort?' },
      { from: 'patient', text: 'Wat meer witte afscheiding dan vroeger. En de kleine optillen durf ik nog niet goed.' },
      { from: 'bot', text: 'Heeft u bloedverlies, pijn of koorts gehad, of is het pessarium eens uitgevallen?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Voorbeelddata',
    pfdi: 'PFDI-20',
    pgii: 'PGI-I',
    pgiiValue: 'Veel beter',
    life: [
      ["Plassen 's nachts", '2 à 3×', '1×'],
      ['Slaap', 'Onderbroken', 'Beter'],
      ['Wandelen', 'Max. 4 km', '8 km'],
      ['Hobby', 'Moestuin max. een uur', 'Halve dag in de moestuin'],
      ['Kleinkinderen', 'Optillen vermeden', 'Nog voorzichtig'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de arts kiest. Kiest Lea later voor een ingreep, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Pessarium',
        lea: true,
        items: [
          { moment: 'Week 1', name: 'Start pessarium', asks: 'Zit het comfortabel, plassen en stoelgang, uitgevallen, afscheiding, bloedverlies, pijn', current: true },
          { moment: 'Week 6', name: 'Opvolging pessarium', asks: "PFDI-20, PGI-I, afscheiding, seksualiteit, slaap, wandelen, hobby's, verder met het pessarium of niet, open vragen, rode vlaggen", current: true },
          { moment: 'Maand 6 en 12', name: 'Opvolging pessarium + welzijn', asks: 'Idem, aangevuld met PFIQ-7 en de reiniging of wissel van het pessarium' },
        ],
      },
      {
        name: 'Bekkenbodemkine',
        items: [{ moment: 'Week 12', name: 'Effect bekkenbodemkine', asks: 'PFDI-20, ICIQ-UI SF, oefeningen thuis, PGI-I' }],
      },
      {
        name: 'Operatie (voorwandplastiek)',
        items: [
          { moment: 'Dag 2', name: 'Controle na operatie', asks: 'Plassen, gevoel van een volle blaas, koorts, bloedverlies, pijn' },
          { moment: 'Week 6', name: 'Herstel na operatie', asks: 'PGI-I, tillen en activiteiten hervat, urineverlies bij hoesten, seksualiteit, open vragen' },
          { moment: 'Maand 3 en 12', name: 'Uitkomst na operatie', asks: 'PFDI-20, PFIQ-7, PGI-I, opnieuw balgevoel, tevredenheid, PREM' },
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
      ['U. Rethra', 'Anterior repair · day 2'],
      ['L. Levator', 'Pessary · week 6 · PFDI-20 completed'],
      ['O. Varium', 'Pessary · month 6'],
      ['S. Acrum', 'Pelvic floor physio · week 12'],
    ],
    alert: 'Unable to pass urine since this morning, abdominal pain and fever (38.4 °C), two days after the anterior repair. Please get in touch.',
    detail: 'L. Levator · pessary',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'How is the bulge since the pessary was fitted?' },
      { from: 'patient', text: 'I can’t feel it any more. Passing urine is easier and I only need to get up once at night.' },
      { from: 'bot', text: 'Good to hear. Is there anything that isn’t working yet, or that bothers you?' },
      { from: 'patient', text: 'A bit more white discharge than before. And I don’t quite dare to lift the little ones yet.' },
      { from: 'bot', text: 'Have you had any bleeding, pain or fever, or has the pessary ever fallen out?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Example data',
    pfdi: 'PFDI-20',
    pgii: 'PGI-I',
    pgiiValue: 'Much better',
    life: [
      ['Urination at night', '2 to 3 times', 'Once'],
      ['Sleep', 'Broken', 'Better'],
      ['Walking', 'Max. 4 km', '8 km'],
      ['Hobbies', 'Vegetable garden max. an hour', 'Half a day in the garden'],
      ['Grandchildren', 'Avoided lifting', 'Still careful'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the doctor chooses. If Lea later opts for surgery, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Pessary',
        lea: true,
        items: [
          { moment: 'Week 1', name: 'Starting the pessary', asks: 'Comfortable fit, bladder and bowel, fallen out, discharge, bleeding, pain', current: true },
          { moment: 'Week 6', name: 'Pessary follow-up', asks: 'PFDI-20, PGI-I, discharge, sexual function, sleep, walking, hobbies, continuing with the pessary or not, open questions, red flags', current: true },
          { moment: 'Months 6 and 12', name: 'Pessary follow-up + wellbeing', asks: 'As above, plus PFIQ-7 and cleaning or changing the pessary' },
        ],
      },
      {
        name: 'Pelvic floor physiotherapy',
        items: [{ moment: 'Week 12', name: 'Effect of pelvic floor physio', asks: 'PFDI-20, ICIQ-UI SF, exercises at home, PGI-I' }],
      },
      {
        name: 'Surgery (anterior repair)',
        items: [
          { moment: 'Day 2', name: 'Post-operative check', asks: 'Passing urine, feeling of a full bladder, fever, bleeding, pain' },
          { moment: 'Week 6', name: 'Recovery after surgery', asks: 'PGI-I, lifting and activities resumed, leakage on coughing, sexual function, open questions' },
          { moment: 'Months 3 and 12', name: 'Outcome after surgery', asks: 'PFDI-20, PFIQ-7, PGI-I, bulge returning, satisfaction, PREM' },
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
      ['U. Rethra', 'Cure de cystocèle · jour 2'],
      ['L. Levator', 'Pessaire · semaine 6 · PFDI-20 rempli'],
      ['O. Varium', 'Pessaire · mois 6'],
      ['S. Acrum', 'Rééducation périnéale · semaine 12'],
    ],
    alert: 'Ne peut plus uriner depuis ce matin, douleur abdominale et fièvre (38,4 °C), deux jours après la cure de cystocèle. Prenez contact.',
    detail: 'L. Levator · pessaire',
    checkin: 'Suivi semaine 6',
    chat: [
      { from: 'bot', text: 'Comment va la sensation de boule depuis la pose du pessaire ?' },
      { from: 'patient', text: 'Je ne la sens plus. J’urine plus facilement et je ne me lève plus qu’une fois la nuit.' },
      { from: 'bot', text: 'Ravi de l’entendre. Y a-t-il quelque chose qui ne va pas encore, ou qui vous gêne ?' },
      { from: 'patient', text: 'Un peu plus de pertes blanches qu’avant. Et je n’ose pas encore vraiment porter les petits.' },
      { from: 'bot', text: 'Avez-vous eu des saignements, des douleurs ou de la fièvre, ou le pessaire est-il déjà tombé ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    baseline: 'Référence',
    week6: 'Semaine 6',
    exampleData: 'Données d’exemple',
    pfdi: 'PFDI-20',
    pgii: 'PGI-I',
    pgiiValue: 'Beaucoup mieux',
    life: [
      ['Mictions la nuit', '2 à 3×', '1×'],
      ['Sommeil', 'Interrompu', 'Meilleur'],
      ['Marche', 'Max. 4 km', '8 km'],
      ['Loisirs', 'Potager max. une heure', 'Une demi-journée au potager'],
      ['Petits-enfants', 'Évitait de les porter', 'Encore prudente'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le médecin. Si Lea opte plus tard pour une intervention, le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Pessaire',
        lea: true,
        items: [
          { moment: 'Semaine 1', name: 'Début du pessaire', asks: 'Confort, miction et transit, pessaire tombé, pertes, saignement, douleur', current: true },
          { moment: 'Semaine 6', name: 'Suivi du pessaire', asks: 'PFDI-20, PGI-I, pertes, sexualité, sommeil, marche, loisirs, poursuite du pessaire ou non, questions ouvertes, signaux d’alerte', current: true },
          { moment: 'Mois 6 et 12', name: 'Suivi du pessaire + bien-être', asks: 'Idem, complété par le PFIQ-7 et le nettoyage ou changement du pessaire' },
        ],
      },
      {
        name: 'Rééducation périnéale',
        items: [{ moment: 'Semaine 12', name: 'Effet de la rééducation', asks: 'PFDI-20, ICIQ-UI SF, exercices à domicile, PGI-I' }],
      },
      {
        name: 'Opération (cure de cystocèle)',
        items: [
          { moment: 'Jour 2', name: 'Contrôle après l’opération', asks: 'Miction, sensation de vessie pleine, fièvre, saignement, douleur' },
          { moment: 'Semaine 6', name: 'Récupération après l’opération', asks: 'PGI-I, port de charges et activités repris, fuites à la toux, sexualité, questions ouvertes' },
          { moment: 'Mois 3 et 12', name: 'Résultat après l’opération', asks: 'PFDI-20, PFIQ-7, PGI-I, retour de la sensation de boule, satisfaction, PREM' },
        ],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'UR', flag: true, date: '09-11-2026, 09:12' },
  { initials: 'LL', flag: false, date: '09-11-2026, 08:20' },
  { initials: 'OV', flag: false, date: '06-11-2026, 11:40' },
  { initials: 'SA', flag: false, date: '05-11-2026, 16:05' },
];
const LEA_ROW = 1;
/** PFDI-20 at baseline and week 6 (sales' example data); the bar is value / 300, so a shorter bar is progress. */
const PFDI: [number, number] = [128, 62];
const PFDI_MAX = 300;

export function GynaecologyFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 U. Rethra's alert, 6 Lea's progress opens
  const step = useSteps(6, 850, 500);
  const alert = step >= 5;
  const [manual, setManual] = useState<boolean | null>(null);
  const detailOpen = manual ?? step >= 6;
  const shown = FOLLOW_ROWS.map((row, i) => ({ ...row, i, copy: c.rows[i] })).filter((row) => step >= FOLLOW_ROWS.length - row.i);
  const [before, after] = PFDI;

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
              const lea = row.i === LEA_ROW;
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
                  {lea ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#7B5EA7]/40 bg-[#F3EFF9]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>U. Rethra</b> · {c.alert}
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
                    <PatientAvatar initials="LL" size={20} />
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

                {/* PFDI-20: baseline in grey, week 6 in Lea's colour; a shorter bar is progress. PGI-I as a label beside it. */}
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
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: LEA }} />
                        {c.week6}
                      </span>
                    </span>
                  </div>
                  <p className="flex justify-between text-[11px] mb-1">
                    <span>
                      {c.pfdi} <span className="text-[#949CB1]">· 0–{PFDI_MAX}</span>
                    </span>
                    <span className="tabular-nums text-[#4E5670]">
                      {before} → <b className="text-[#2A3A51]">{after}</b>
                    </span>
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="h-2 rounded-full bg-[#F4F5F8] overflow-hidden">
                        <motion.span
                          className="block h-full rounded-full bg-[#D5D9E0]"
                          initial={{ width: 0 }}
                          animate={{ width: `${(before / PFDI_MAX) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                        />
                      </span>
                      <span className="h-2 rounded-full bg-[#F4F5F8] overflow-hidden">
                        <motion.span
                          className="block h-full rounded-full"
                          style={{ backgroundColor: LEA }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(after / PFDI_MAX) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5, ease: EASE }}
                        />
                      </span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                      className="shrink-0 inline-flex flex-col items-center rounded-lg px-2.5 py-1 ring-1 ring-[#7B5EA7]/30 bg-[#F3EFF9]"
                    >
                      <span className="text-[9.5px] text-[#4E5670]">{c.pgii} · 2</span>
                      <span className="text-[11.5px] font-semibold" style={{ color: LEA }}>
                        {c.pgiiValue}
                      </span>
                    </motion.span>
                  </div>
                  {/* Not only numbers: nights, sleep, walking, the vegetable garden and the grandchildren */}
                  <div className="mt-4 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.lea ? 'border-[#7B5EA7]/30 bg-[#F3EFF9]/70' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.lea && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#7B5EA7]/20">
                            <PatientAvatar initials="LL" size={12} />
                            Lea
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
