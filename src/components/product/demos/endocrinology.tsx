'use client';

/**
 * Module demos for the endocrinology variant (source: sales, "Website-inhoud endocrinologie", §7). Every page follows
 * Paul Langerhans (58, international lorry driver and pigeon fancier, type 2 diabetes for nine years, HbA1c 8.9% on
 * metformin and gliclazide, three hypos behind the wheel) one step further, from triage to a foot examination and bloods,
 * semaglutide and empagliflozin instead of gliclazide, the paperwork for his licence and three months of follow-up;
 * I. Insula (type 1, vomiting with ketones) is the recurring red flag and D. Ductus raises the alert after starting
 * semaglutide. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Paul keeps one avatar colour on every page, so visitors recognise him. */
const PAUL = '#2F8F4E';
const PAUL_SOFT = '#E8F5EC';
/** Red flags (I. Insula, D. Ductus) share one red accent and the warning icon. */
const RED = APP.accent;
/** Patients who stay with the endocrinologists, those sent to another service, and a report that is no red flag. */
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
        Paul Langerhans
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: diabetes clinic, thyroid colleague or elsewhere   */
/* ------------------------------------------------------------------ */

type Referral = 'diabetes' | 'thyroid' | 'obesity' | 'regular' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Diabetes type 1, braakt sinds vannacht, ketonen 3,1 mmol/l. Secretariaat belt meteen terug en verwijst naar spoed.',
    referrals: { diabetes: 'Diabetes', thyroid: 'Schildklier', obesity: 'Obesitaskliniek', regular: 'Gewone plaats' },
    rows: [
      'Diabetes type 1, braakt sinds vannacht, ketonen 3,1 mmol/l',
      "Diabetes type 2, HbA1c 8,9% onder tabletten, 3 hypo's achter het stuur",
      'Voelbare knobbel in de hals, TSH normaal',
      'BMI 42, geen diabetes, vraagt naar een maagverkleining',
      'Eén glycemie van 245 mg/dl na een feest, geen klachten',
      'Vraag over afspraak',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Type 1 diabetes, vomiting since last night, ketones 3.1 mmol/l. The secretariat is calling back straight away and referring to A&E.',
    referrals: { diabetes: 'Diabetes', thyroid: 'Thyroid', obesity: 'Obesity clinic', regular: 'Regular slot' },
    rows: [
      'Type 1 diabetes, vomiting since last night, ketones 3.1 mmol/l',
      'Type 2 diabetes, HbA1c 8.9% on tablets, 3 hypos behind the wheel',
      'Palpable lump in the neck, TSH normal',
      'BMI 42, no diabetes, asking about weight-loss surgery',
      'One blood glucose of 245 mg/dl after a party, no symptoms',
      'Question about an appointment',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Diabète de type 1, vomit depuis cette nuit, cétones 3,1 mmol/l. Le secrétariat rappelle immédiatement et oriente vers les urgences.',
    referrals: { diabetes: 'Diabète', thyroid: 'Thyroïde', obesity: 'Clinique de l’obésité', regular: 'Place habituelle' },
    rows: [
      'Diabète de type 1, vomit depuis cette nuit, cétones 3,1 mmol/l',
      'Diabète de type 2, HbA1c 8,9 % sous comprimés, 3 hypoglycémies au volant',
      'Nodule palpable dans le cou, TSH normale',
      'IMC 42, pas de diabète, demande une chirurgie bariatrique',
      'Une glycémie de 245 mg/dl après une fête, pas de plaintes',
      'Question sur un rendez-vous',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'I. Insula', initials: 'II', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'P. Langerhans', initials: 'PL', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'diabetes' },
  { name: 'T. Thyreo', initials: 'TT', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'thyroid' },
  { name: 'O. Omentum', initials: 'OO', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'obesity' },
  { name: 'A. Acinus', initials: 'AA', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'regular' },
  { name: 'S. Suprarenalis', initials: 'SS', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: '' },
];

// The obesity clinic in another colour: not every patient lands in the endocrinologist's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = {
  diabetes: STAYS,
  thyroid: STAYS,
  obesity: ELSEWHERE,
  regular: NEUTRAL,
};

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8.5rem_1fr_4.5rem_5rem] gap-3';

export function EndocrinologyTriageDemo() {
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
                      {row.referral !== 'regular' && <AppIcon name="arrow-fork-down" size={10} color={tone.text} />}
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
                <PatientAvatar initials="II" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">I. Insula</span>
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
/* 2 · Agenda: a Friday, when he is not driving abroad                 */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 13 november 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld · labo ontvangen',
    elsewhere: '2 patiënten doorgestuurd naar een collega of andere dienst',
    types: [
      'Controle prolactinoom',
      'Dringend · diabetes type 1 na ketoacidose, nazorg',
      'Controle na start basale insuline',
      'Nieuwe patiënt · diabetes type 2, intensivering',
      'Diabetische voet, wondcontrole',
      'Nieuwe patiënt · verhoogde glycemie',
    ],
  },
  en: {
    date: 'Friday 13 November 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed · bloods received',
    elsewhere: '2 patients referred to a colleague or another service',
    types: [
      'Prolactinoma check-up',
      'Urgent · type 1 diabetes after ketoacidosis, aftercare',
      'Check-up after starting basal insulin',
      'New patient · type 2 diabetes, intensification',
      'Diabetic foot, wound check',
      'New patient · raised blood glucose',
    ],
  },
  fr: {
    date: 'vendredi 13 novembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli · biologie reçue',
    elsewhere: '2 patients orientés vers un collègue ou un autre service',
    types: [
      'Contrôle prolactinome',
      'Urgent · diabète de type 1 après acidocétose, suivi',
      'Contrôle après début d’insuline basale',
      'Nouveau patient · diabète de type 2, intensification',
      'Pied diabétique, contrôle de plaie',
      'Nouveau patient · glycémie élevée',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; paul?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'H. Hypofyse', initials: 'HH', type: 0 },
  { room: 1, start: 0, len: 3, name: 'P. Langerhans', initials: 'PL', type: 3, paul: true },
  { room: 0, start: 1, len: 1, name: 'I. Insula', initials: 'II', type: 1, flag: true },
  { room: 2, start: 1, len: 1, name: 'P. Plantaris', initials: 'PP', type: 4 },
  { room: 0, start: 2, len: 1, name: 'B. Beta', initials: 'BB', type: 2 },
  { room: 2, start: 3, len: 1, name: 'A. Acinus', initials: 'AA', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.paul ? PAUL : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.paul ? PAUL_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.paul && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.paul && <PatientAvatar initials="PL" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.paul && ready && (
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

export function EndocrinologyAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Paul's tick and the patients referred on
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
      {/* T. Thyreo and O. Omentum are not in this agenda: triage sent them to the thyroid colleague and the obesity clinic. */}
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
/* 3 · Pre-consultation: hypos behind the wheel, feet, bloods as PDF   */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string };
type SummarySection = { title: string; rows: SummaryRow[] };
const r = (label: string, value: string, extra: Partial<SummaryRow> = {}): SummaryRow => ({ label, value, ...extra });

type ChatLine = { from: 'bot' | 'patient'; text: string; pdf?: boolean };

type IntakeCopy = {
  intro: string;
  progress: string;
  placeholder: string;
  chat: ChatLine[];
  pdfMeta: string;
  yesNo: [string, string];
  summary: string;
  copy: string;
  tabs: [string, string, string];
  summaries: [SummarySection[], SummarySection[], SummarySection[]];
};

// Reason after his first answer, the hypos after the second, his feet after the tap, the bloods once the PDF lands.
const REASON_AT = 2;
const HYPOS_AT = 4;
const FEET_AT = 6;
const PDF_AT = 8;
/** Sections open by default on Paul's tab: reason, hypos, complications and attachments. */
const OPEN_BY_DEFAULT = [0, 1, 3, 8];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw afspraak en sinds wanneer u diabetes heeft?' },
      { from: 'patient', text: 'Diabetes type 2 sinds 2017. Mijn suiker blijft te hoog en de laatste tijd word ik soms beverig achter het stuur.' },
      { from: 'bot', text: 'Hoe vaak gebeurde dat de afgelopen maand, en had u daarbij hulp van iemand anders nodig?' },
      { from: 'patient', text: 'Drie keer, telkens laat in de namiddag als ik niet gegeten had. Ik heb het zelf opgelost met druivensuiker.' },
      { from: 'bot', text: 'Voelt u tintelingen, een branderig gevoel of gevoelloosheid in uw voeten?' },
      { from: 'patient', text: 'Ja' },
      { from: 'bot', text: 'Heeft u recente bloedresultaten van uw huisarts? U mag ze hier als foto of PDF sturen.' },
      { from: 'patient', text: 'Labo dr. Claes.pdf', pdf: true },
    ],
    pdfMeta: 'PDF · 2 pagina’s · voorbeelddata',
    yesNo: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Diabetes', 'Schildklier', 'Bijnier'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', "Onvoldoende gereguleerde diabetes type 2 met hypo's. Verwezen door de huisarts voor intensivering.", { fillAt: REASON_AT }),
            r('Duur', 'Diabetes sinds 2017. HbA1c 7,4% (2024) → 8,1% (2025) → 8,9% (vorige maand)', { fillAt: REASON_AT }),
          ],
        },
        {
          title: "Hypo's",
          rows: [
            r('Frequentie', '3× de afgelopen maand, laat in de namiddag, na een overgeslagen maaltijd', { fillAt: HYPOS_AT }),
            r('Ernst', 'Beven, zweten, honger. Eenmaal 58 mg/dl. Zelf opgelost, nooit hulp van anderen', { fillAt: HYPOS_AT }),
            r('Situatie', 'Tijdens het rijden (beroepschauffeur, rijbewijs CE)', { fillAt: HYPOS_AT, mark: 'Bepaalt mee de keuze van de behandeling' }),
          ],
        },
        { title: 'Hyperglycemie', rows: [r('Klachten', "Dorst, 's nachts 2× plassen, moe na lange ritten, soms wazig zicht")] },
        {
          title: 'Complicaties',
          rows: [
            r('Voeten', "Tintelingen en branderig gevoel in de tenen, beiderzijds, 's nachts, sinds 6 maanden. Geen wonden", { fillAt: FEET_AT }),
            r('Ogen', 'Laatste oogcontrole 2022'),
          ],
        },
        { title: 'Rode vlaggen', rows: [r('Braken, buikpijn, ketonen', 'Nee'), r('Wonde of rode, warme voet', 'Nee')] },
        {
          title: 'Leefstijl',
          rows: [r('Eetpatroon', 'Onregelmatig, wegrestaurants, slaat het middagmaal geregeld over'), r('Roken / alcohol', '15 sigaretten per dag / ±6 pinten per week')],
        },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Eerdere behandeling', 'Metformine sinds 2017, gliclazide sinds 2021. Eén diëtistsessie in 2018'),
            r('Voorgeschiedenis', 'Hypertensie, hypercholesterolemie, jicht, nierstenen (2012)'),
            r('Allergieën', 'Penicilline (huiduitslag)'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Moeder diabetes type 2, vader hartinfarct op 61'),
          ],
        },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Internationaal vrachtwagenchauffeur, vaak 2 à 3 dagen in het buitenland'),
            r("Hobby's", 'Duivenmelker, vissen'),
            r('Lengte / gewicht', '1,78 m / 112 kg'),
            r('Leeftijd', '58 jaar'),
            r('Verwijzing', 'Via dr. Claes, huisarts'),
          ],
        },
        { title: 'Bijlagen', rows: [r('Labo', 'PDF van de huisarts (3 weken oud)', { fillAt: PDF_AT })] },
        {
          title: 'Baseline',
          rows: [r('PAID-5 (0–20, lager = beter)', '9 (voorbeelddata)'), r('DTSQs (0–36, hoger = beter)', '17 (voorbeelddata)'), r('WHO-5 (0–100, hoger = beter)', '44 (voorbeelddata)')],
        },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Voelbare knobbel links in de hals, sinds 2 maanden opgemerkt bij het scheren')] },
        { title: 'Klachten', rows: [r('Slikken / stem', 'Geen slikklachten, geen heesheid'), r('Schildklierfunctie', 'Geen hartkloppingen, geen gewichtsverandering')] },
        { title: 'Labo', rows: [r('TSH', 'Normaal (huisarts)')] },
        { title: 'Medische achtergrond', rows: [r('Familie', 'Moeder schildklieroperatie')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Bouwkundig tekenaar / 39 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Toevallig letsel van 2,3 cm aan de linkerbijnier op een CT van de buik')] },
        {
          title: 'Klachten',
          rows: [r('Aanvallen', 'Geen aanvallen van hoofdpijn, zweten en hartkloppingen'), r('Bloeddruk', 'Hoog, onder 3 middelen'), r('Lichaam', 'Geen blauwe plekken, geen spierzwakte')],
        },
        { title: 'Labo', rows: [r('Kalium', 'Licht verlaagd (huisarts)')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Gepensioneerd postbode / 63 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me the reason for your appointment and how long you have had diabetes?' },
      { from: 'patient', text: 'Type 2 diabetes since 2017. My sugar stays too high and lately I sometimes get shaky behind the wheel.' },
      { from: 'bot', text: 'How often did that happen in the past month, and did you need help from anyone else?' },
      { from: 'patient', text: 'Three times, always late in the afternoon when I hadn’t eaten. I sorted it myself with glucose tablets.' },
      { from: 'bot', text: 'Do you feel tingling, burning or numbness in your feet?' },
      { from: 'patient', text: 'Yes' },
      { from: 'bot', text: 'Do you have recent blood results from your GP? You can send them here as a photo or PDF.' },
      { from: 'patient', text: 'Bloods Dr Claes.pdf', pdf: true },
    ],
    pdfMeta: 'PDF · 2 pages · example data',
    yesNo: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Diabetes', 'Thyroid', 'Adrenal'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Poorly controlled type 2 diabetes with hypos. Referred by the GP for intensification.', { fillAt: REASON_AT }),
            r('Duration', 'Diabetes since 2017. HbA1c 7.4% (2024) → 8.1% (2025) → 8.9% (last month)', { fillAt: REASON_AT }),
          ],
        },
        {
          title: 'Hypos',
          rows: [
            r('Frequency', '3 times in the past month, late afternoon, after a skipped meal', { fillAt: HYPOS_AT }),
            r('Severity', 'Shaking, sweating, hunger. Once 58 mg/dl. Self-treated, never needed help from others', { fillAt: HYPOS_AT }),
            r('Situation', 'While driving (professional driver, category CE licence)', { fillAt: HYPOS_AT, mark: 'Helps decide the treatment' }),
          ],
        },
        { title: 'Hyperglycaemia', rows: [r('Symptoms', 'Thirst, passing urine twice at night, tired after long drives, sometimes blurred vision')] },
        {
          title: 'Complications',
          rows: [r('Feet', 'Tingling and burning in the toes, both sides, at night, for 6 months. No wounds', { fillAt: FEET_AT }), r('Eyes', 'Last eye check 2022')],
        },
        { title: 'Red flags', rows: [r('Vomiting, abdominal pain, ketones', 'No'), r('Wound or red, hot foot', 'No')] },
        {
          title: 'Lifestyle',
          rows: [r('Eating pattern', 'Irregular, roadside restaurants, often skips lunch'), r('Smoking / alcohol', '15 cigarettes a day / about 6 beers a week')],
        },
        {
          title: 'Medical history',
          rows: [
            r('Previous treatment', 'Metformin since 2017, gliclazide since 2021. One dietitian session in 2018'),
            r('Past history', 'Hypertension, hypercholesterolaemia, gout, kidney stones (2012)'),
            r('Allergies', 'Penicillin (rash)'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Mother type 2 diabetes, father heart attack at 61'),
          ],
        },
        {
          title: 'General',
          rows: [
            r('Occupation', 'International lorry driver, often 2 to 3 days abroad'),
            r('Hobbies', 'Pigeon fancier, fishing'),
            r('Height / weight', '1.78 m / 112 kg'),
            r('Age', '58'),
            r('Referral', 'Via Dr Claes, GP'),
          ],
        },
        { title: 'Attachments', rows: [r('Bloods', 'PDF from the GP (3 weeks old)', { fillAt: PDF_AT })] },
        {
          title: 'Baseline',
          rows: [r('PAID-5 (0–20, lower = better)', '9 (example data)'), r('DTSQs (0–36, higher = better)', '17 (example data)'), r('WHO-5 (0–100, higher = better)', '44 (example data)')],
        },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Palpable lump on the left of the neck, noticed while shaving 2 months ago')] },
        { title: 'Symptoms', rows: [r('Swallowing / voice', 'No swallowing problems, no hoarseness'), r('Thyroid function', 'No palpitations, no weight change')] },
        { title: 'Bloods', rows: [r('TSH', 'Normal (GP)')] },
        { title: 'Medical history', rows: [r('Family history', 'Mother had thyroid surgery')] },
        { title: 'General', rows: [r('Occupation / age', 'Architectural draughtsman / 39')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Incidental 2.3 cm lesion of the left adrenal gland on an abdominal CT')] },
        {
          title: 'Symptoms',
          rows: [r('Episodes', 'No episodes of headache, sweating and palpitations'), r('Blood pressure', 'High, on 3 drugs'), r('Body', 'No bruising, no muscle weakness')],
        },
        { title: 'Bloods', rows: [r('Potassium', 'Slightly low (GP)')] },
        { title: 'General', rows: [r('Occupation / age', 'Retired postman / 63')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire le motif de votre rendez-vous et depuis quand vous avez du diabète ?' },
      { from: 'patient', text: 'Diabète de type 2 depuis 2017. Ma glycémie reste trop haute et ces derniers temps je tremble parfois au volant.' },
      { from: 'bot', text: 'Combien de fois est-ce arrivé le mois dernier, et avez-vous eu besoin de l’aide de quelqu’un ?' },
      { from: 'patient', text: 'Trois fois, toujours en fin d’après-midi quand je n’avais pas mangé. Je me suis débrouillé seul avec du sucre de raisin.' },
      { from: 'bot', text: 'Ressentez-vous des fourmillements, une sensation de brûlure ou un engourdissement dans les pieds ?' },
      { from: 'patient', text: 'Oui' },
      { from: 'bot', text: 'Avez-vous des résultats de prise de sang récents de votre médecin traitant ? Vous pouvez les envoyer ici en photo ou en PDF.' },
      { from: 'patient', text: 'Biologie Dr Claes.pdf', pdf: true },
    ],
    pdfMeta: 'PDF · 2 pages · données d’exemple',
    yesNo: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Diabète', 'Thyroïde', 'Surrénale'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Diabète de type 2 mal équilibré avec hypoglycémies. Adressé par le médecin traitant pour intensification.', { fillAt: REASON_AT }),
            r('Durée', 'Diabète depuis 2017. HbA1c 7,4 % (2024) → 8,1 % (2025) → 8,9 % (le mois dernier)', { fillAt: REASON_AT }),
          ],
        },
        {
          title: 'Hypoglycémies',
          rows: [
            r('Fréquence', '3× le mois dernier, en fin d’après-midi, après un repas sauté', { fillAt: HYPOS_AT }),
            r('Gravité', 'Tremblements, sueurs, faim. Une fois 58 mg/dl. Résolues seul, jamais besoin d’aide', { fillAt: HYPOS_AT }),
            r('Situation', 'Au volant (chauffeur professionnel, permis CE)', { fillAt: HYPOS_AT, mark: 'Oriente le choix du traitement' }),
          ],
        },
        { title: 'Hyperglycémie', rows: [r('Plaintes', 'Soif, 2 mictions la nuit, fatigué après de longs trajets, parfois vision floue')] },
        {
          title: 'Complications',
          rows: [
            r('Pieds', 'Fourmillements et brûlures dans les orteils, des deux côtés, la nuit, depuis 6 mois. Pas de plaies', { fillAt: FEET_AT }),
            r('Yeux', 'Dernier contrôle ophtalmologique en 2022'),
          ],
        },
        { title: 'Signaux d’alerte', rows: [r('Vomissements, douleur abdominale, cétones', 'Non'), r('Plaie ou pied rouge et chaud', 'Non')] },
        {
          title: 'Mode de vie',
          rows: [r('Alimentation', 'Irrégulière, restoroutes, saute souvent le repas de midi'), r('Tabac / alcool', '15 cigarettes par jour / environ 6 bières par semaine')],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Traitement antérieur', 'Metformine depuis 2017, gliclazide depuis 2021. Une séance chez la diététicienne en 2018'),
            r('Antécédents', 'Hypertension, hypercholestérolémie, goutte, calculs rénaux (2012)'),
            r('Allergies', 'Pénicilline (éruption cutanée)'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Mère diabète de type 2, père infarctus à 61 ans'),
          ],
        },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Chauffeur poids lourd international, souvent 2 à 3 jours à l’étranger'),
            r('Loisirs', 'Colombophile, pêche'),
            r('Taille / poids', '1,78 m / 112 kg'),
            r('Âge', '58 ans'),
            r('Orientation', 'Par le Dr Claes, médecin traitant'),
          ],
        },
        { title: 'Pièces jointes', rows: [r('Biologie', 'PDF du médecin traitant (3 semaines)', { fillAt: PDF_AT })] },
        {
          title: 'Mesure de référence',
          rows: [
            r('PAID-5 (0–20, plus bas = mieux)', '9 (données d’exemple)'),
            r('DTSQs (0–36, plus haut = mieux)', '17 (données d’exemple)'),
            r('WHO-5 (0–100, plus haut = mieux)', '44 (données d’exemple)'),
          ],
        },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Nodule palpable à gauche dans le cou, remarqué en se rasant il y a 2 mois')] },
        { title: 'Plaintes', rows: [r('Déglutition / voix', 'Pas de troubles de la déglutition, pas d’enrouement'), r('Fonction thyroïdienne', 'Pas de palpitations, pas de variation de poids')] },
        { title: 'Biologie', rows: [r('TSH', 'Normale (médecin traitant)')] },
        { title: 'Antécédents médicaux', rows: [r('Antécédents familiaux', 'Mère opérée de la thyroïde')] },
        { title: 'Général', rows: [r('Profession / âge', 'Dessinateur en bâtiment / 39 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Lésion fortuite de 2,3 cm de la surrénale gauche sur un scanner abdominal')] },
        {
          title: 'Plaintes',
          rows: [r('Crises', 'Pas de crises de céphalées, sueurs et palpitations'), r('Tension', 'Élevée, sous 3 médicaments'), r('Corps', 'Pas d’ecchymoses, pas de faiblesse musculaire')],
        },
        { title: 'Biologie', rows: [r('Potassium', 'Légèrement bas (médecin traitant)')] },
        { title: 'Général', rows: [r('Profession / âge', 'Facteur retraité / 63 ans')] },
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

/** The GP's bloods as a PDF attachment in a chat message: an icon, the file name and a small meta line. */
function PdfMessage({ name, meta }: { name: string; meta: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="self-end max-w-[80%] flex items-center gap-2.5 rounded-2xl bg-[#06ACC1] px-2.5 py-2 text-white"
    >
      <span className="shrink-0 w-8 h-10 rounded-md bg-white flex flex-col items-center justify-center">
        <AppIcon name="file-medical-alt" size={14} color="#DE3C4B" />
        <span className="text-[7px] font-bold text-[#DE3C4B] leading-none mt-0.5">PDF</span>
      </span>
      <span className="min-w-0">
        <span className="block text-[11.5px] font-medium truncate">{name}</span>
        <span className="block text-[9.5px] text-white/75">{meta}</span>
      </span>
    </motion.div>
  );
}

export function EndocrinologyPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–8 the conversation: the feet question waits on Yes / No at 5, the PDF of his bloods lands at 8
  const step = useSteps(total, 950, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Paul's tab opens on what matters first; long sections stay folded, the other two tabs are short and fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 5}>
        {c.chat
          .slice(0, step)
          .map((msg, i) =>
            msg.pdf ? (
              <PdfMessage key={i} name={msg.text} meta={c.pdfMeta} />
            ) : msg.from === 'bot' ? (
              <BotBubble key={i}>{msg.text}</BotBubble>
            ) : (
              <PatientBubble key={i}>{msg.text}</PatientBubble>
            ),
          )}
        {step === 5 && <Choices options={c.yesNo} />}
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
                        const marked = row.mark && known && tab === 0;
                        const attachment = tab === 0 && row.fillAt === PDF_AT;
                        return (
                          <div key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${marked ? 'my-1 -ml-1 pl-5 pr-2 py-1.5 rounded-lg bg-[#EBF6F8] ring-1 ring-[#06ACC1]/30' : ''}`}>
                            <span className="font-semibold">{row.label}:</span>{' '}
                            {known ? (
                              <motion.span
                                initial={{ opacity: 0, backgroundColor: 'rgba(6,172,193,0.25)' }}
                                animate={{ opacity: 1, backgroundColor: 'rgba(6,172,193,0)' }}
                                transition={{ duration: 1.2 }}
                                className={attachment ? 'inline-flex items-center gap-1' : undefined}
                              >
                                {attachment && <AppIcon name="file-medical-alt" size={12} color="#DE3C4B" />}
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
/* 4 · Voice Reception: he calls from his cab, booked on a Friday      */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts stuurt me door omdat mijn suiker te hoog blijft. Kan ik een afspraak krijgen bij de endocrinoloog?' },
      { from: 'bot', text: 'Vervelend om te horen. Heeft u diabetes type 1 of type 2, en neemt u tabletten, injecties of insuline?' },
      { from: 'patient', text: 'Type 2, alleen tabletten. Maar ik word soms beverig onder het rijden.' },
      { from: 'bot', text: 'Had u daarbij ooit hulp nodig van iemand anders? En heeft u een wonde aan uw voet?' },
      { from: 'patient', text: 'Nee, ik eet dan iets. En geen wonde. Ik rij vrachtwagen, kan het op een vrijdag?' },
      { from: 'bot', text: 'Dank u. Ik plan u in op vrijdag bij de diabetesraadpleging en stuur u een korte vragenlijst om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: "Afspraak ingepland bij de diabetesraadpleging op vrijdag: diabetes type 2 onder tabletten met hypo's, geen rode vlaggen",
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
      { from: 'patient', text: 'Hello, my GP is referring me because my sugar stays too high. Can I get an appointment with the endocrinologist?' },
      { from: 'bot', text: 'Sorry to hear that. Do you have type 1 or type 2 diabetes, and do you take tablets, injections or insulin?' },
      { from: 'patient', text: 'Type 2, tablets only. But I sometimes get shaky while driving.' },
      { from: 'bot', text: 'Have you ever needed help from someone else when that happened? And do you have a wound on your foot?' },
      { from: 'patient', text: 'No, I just eat something. And no wound. I drive a lorry, could it be on a Friday?' },
      { from: 'bot', text: 'Thank you. I’ll book you into the diabetes clinic on Friday and send you a short questionnaire to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked at the diabetes clinic on Friday: type 2 diabetes on tablets with hypos, no red flags',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant m’envoie parce que ma glycémie reste trop haute. Puis-je avoir un rendez-vous chez l’endocrinologue ?' },
      { from: 'bot', text: 'Désolé de l’entendre. Avez-vous un diabète de type 1 ou de type 2, et prenez-vous des comprimés, des injections ou de l’insuline ?' },
      { from: 'patient', text: 'Type 2, seulement des comprimés. Mais je tremble parfois en conduisant.' },
      { from: 'bot', text: 'Avez-vous déjà eu besoin de l’aide de quelqu’un à ce moment-là ? Et avez-vous une plaie au pied ?' },
      { from: 'patient', text: 'Non, je mange quelque chose. Et pas de plaie. Je suis chauffeur poids lourd, ce serait possible un vendredi ?' },
      { from: 'bot', text: 'Merci. Je vous inscris vendredi à la consultation de diabétologie et je vous envoie un court questionnaire pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié vendredi à la consultation de diabétologie : diabète de type 2 sous comprimés avec hypoglycémies, aucun signal d’alerte',
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

export function EndocrinologyVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 58 09</span>
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
                <PatientAvatar initials="PL" size={18} />
                P. Langerhans
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
/* 5 · Scribe: the monofilament and the choice of treatment            */
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
    template: 'Endocrinologie',
    templates: ['Diabetes', 'Schildklier', 'Bijnier en hypofyse', 'Obesitas'],
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
      { who: 'doctor', text: 'Ik raak nu met dit draadje enkele plaatsen onder uw voet aan. Zeg maar wanneer u iets voelt.' },
      { who: 'patient', text: 'Rechts voel ik het. Links… daar niet, en daar ook niet.' },
      { who: 'doctor', text: "Die hypo's onder het rijden komen waarschijnlijk van de gliclazide. Daar stoppen we mee." },
      { who: 'patient', text: 'En dan? Ik wil mijn rijbewijs niet kwijt.' },
      { who: 'doctor', text: "We starten een tablet die ook uw nieren beschermt, en een spuitje één keer per week. Die geven zelf geen hypo's." },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: "Diabetes type 2 sinds 2017, verwezen door dr. Claes voor intensivering. HbA1c stijgend tot 8,9% onder metformine 2 × 1000 mg en gliclazide 120 mg. Drie hypoglycemieën de afgelopen maand tijdens het rijden, na overgeslagen maaltijden, zelf opgelost. Dorst, nycturie 2×, vermoeidheid. Sinds 6 maanden tintelingen en branderig gevoel in beide voeten, 's nachts. Laatste oogcontrole 2022. Hypertensie, hypercholesterolemie, jicht. Rookt 15 sigaretten per dag. Beroepschauffeur, rijbewijs CE. Geen bloedverdunners. Allergie penicilline.",
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Gewicht 112 kg, BMI 35,3, buikomtrek 121 cm. Bloeddruk 146/88 mmHg, pols 82/min regelmatig. Schildklier niet vergroot. Voeten: droge huid, eelt onder MTP1 rechts zonder wonde, geen deformaties. Pulsaties a. dorsalis pedis en a. tibialis posterior beiderzijds palpabel. Monofilament niet gevoeld op 2/4 plaatsen links en 1/4 rechts. Vibratiezin verminderd aan beide grote tenen. Achillespeesreflexen zwak.',
        clamp: true,
      },
      {
        title: 'Labo',
        text: 'HbA1c 8,9% (74 mmol/mol). Nuchtere glycemie 186 mg/dl. eGFR 74 ml/min/1,73 m². Albumine/creatinine-ratio 52 mg/g. LDL 96 mg/dl, triglyceriden 245 mg/dl. ALT 52 U/l. Vitamine B12 238 pg/ml. TSH 1,8 mU/l.',
        clamp: true,
      },
      {
        title: 'Diagnose',
        text: 'Diabetes mellitus type 2, onvoldoende gereguleerd, met hypoglycemieën onder sulfonylurea bij een beroepschauffeur. Diabetische nierziekte G2A2. Distale sensibele polyneuropathie, voetrisicoklasse 1. Obesitas graad II. Hypertensie, onvoldoende gecontroleerd. Actief roker.',
        clamp: false,
      },
      {
        title: 'Beleid',
        text: 'Stop gliclazide. Start empagliflozine 10 mg 1× per dag en semaglutide 0,25 mg 1× per week, na 4 weken 0,5 mg. Metformine verder. Verwijzing diabeteseducator, diëtist, podoloog, oogarts en tabakoloog. Aanvraag terugbetaling. Attest rijgeschiktheid groep 2. Labo en herevaluatie na 3 maanden. Vangnet: empagliflozine stoppen bij braken, diarree of niet kunnen eten; dringend contact bij hevige buikpijn naar de rug of een nieuwe voetwonde. Opvolging met PAID-5, DTSQ en WHO-5.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '09-02-1968'],
      ['Vragenlijst', 'Diabetes type 2'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Endocrinology',
    templates: ['Diabetes', 'Thyroid', 'Adrenal and pituitary', 'Obesity'],
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
      { who: 'doctor', text: 'I’m going to touch a few places under your foot with this filament. Tell me when you feel something.' },
      { who: 'patient', text: 'On the right I can feel it. On the left… not there, and not there either.' },
      { who: 'doctor', text: 'Those hypos while driving are probably from the gliclazide. We’re going to stop it.' },
      { who: 'patient', text: 'And then what? I don’t want to lose my licence.' },
      { who: 'doctor', text: 'We’ll start a tablet that also protects your kidneys, and an injection once a week. Neither causes hypos on its own.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Type 2 diabetes since 2017, referred by Dr Claes for intensification. HbA1c rising to 8.9% on metformin 1000 mg twice daily and gliclazide 120 mg. Three hypoglycaemic episodes in the past month while driving, after skipped meals, self-treated. Thirst, nocturia twice, tiredness. Tingling and burning in both feet at night for 6 months. Last eye check 2022. Hypertension, hypercholesterolaemia, gout. Smokes 15 cigarettes a day. Professional driver, category CE licence. No anticoagulants. Penicillin allergy.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Weight 112 kg, BMI 35.3, waist 121 cm. Blood pressure 146/88 mmHg, pulse 82/min regular. Thyroid not enlarged. Feet: dry skin, callus under right MTP1 without a wound, no deformities. Dorsalis pedis and posterior tibial pulses palpable on both sides. Monofilament not felt at 2/4 sites on the left and 1/4 on the right. Reduced vibration sense at both great toes. Ankle reflexes weak.',
        clamp: true,
      },
      {
        title: 'Bloods',
        text: 'HbA1c 8.9% (74 mmol/mol). Fasting glucose 186 mg/dl. eGFR 74 ml/min/1.73 m². Albumin/creatinine ratio 52 mg/g. LDL 96 mg/dl, triglycerides 245 mg/dl. ALT 52 U/l. Vitamin B12 238 pg/ml. TSH 1.8 mU/l.',
        clamp: true,
      },
      {
        title: 'Diagnosis',
        text: 'Type 2 diabetes mellitus, poorly controlled, with hypoglycaemia on a sulfonylurea in a professional driver. Diabetic kidney disease G2A2. Distal sensory polyneuropathy, foot risk class 1. Class II obesity. Hypertension, insufficiently controlled. Current smoker.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Stop gliclazide. Start empagliflozin 10 mg once daily and semaglutide 0.25 mg once weekly, 0.5 mg after 4 weeks. Continue metformin. Refer to diabetes educator, dietitian, podiatrist, ophthalmologist and smoking cessation service. Reimbursement request. Group 2 fitness-to-drive certificate. Bloods and review after 3 months. Safety net: stop empagliflozin with vomiting, diarrhoea or being unable to eat; urgent contact with severe abdominal pain radiating to the back or a new foot wound. Follow-up with PAID-5, DTSQ and WHO-5.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '09-02-1968'],
      ['Questionnaire', 'Type 2 diabetes'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Endocrinologie',
    templates: ['Diabète', 'Thyroïde', 'Surrénales et hypophyse', 'Obésité'],
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
      { who: 'doctor', text: 'Je touche maintenant quelques endroits sous votre pied avec ce petit fil. Dites-moi quand vous sentez quelque chose.' },
      { who: 'patient', text: 'À droite, je le sens. À gauche… pas là, et pas là non plus.' },
      { who: 'doctor', text: 'Ces hypoglycémies au volant viennent probablement du gliclazide. Nous allons l’arrêter.' },
      { who: 'patient', text: 'Et ensuite ? Je ne veux pas perdre mon permis.' },
      { who: 'doctor', text: 'Nous commençons un comprimé qui protège aussi vos reins, et une piqûre une fois par semaine. Ils ne donnent pas d’hypoglycémies par eux-mêmes.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Diabète de type 2 depuis 2017, adressé par le Dr Claes pour intensification. HbA1c en hausse jusqu’à 8,9 % sous metformine 2 × 1000 mg et gliclazide 120 mg. Trois hypoglycémies le mois dernier au volant, après des repas sautés, résolues seul. Soif, nycturie 2×, fatigue. Depuis 6 mois, fourmillements et brûlures dans les deux pieds la nuit. Dernier contrôle ophtalmologique en 2022. Hypertension, hypercholestérolémie, goutte. Fume 15 cigarettes par jour. Chauffeur professionnel, permis CE. Pas d’anticoagulants. Allergie à la pénicilline.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Poids 112 kg, IMC 35,3, tour de taille 121 cm. Tension 146/88 mmHg, pouls 82/min régulier. Thyroïde non augmentée. Pieds : peau sèche, durillon sous la MTP1 droite sans plaie, pas de déformations. Pouls pédieux et tibiaux postérieurs palpables des deux côtés. Monofilament non perçu sur 2/4 sites à gauche et 1/4 à droite. Sensibilité vibratoire diminuée aux deux gros orteils. Réflexes achilléens faibles.',
        clamp: true,
      },
      {
        title: 'Biologie',
        text: 'HbA1c 8,9 % (74 mmol/mol). Glycémie à jeun 186 mg/dl. DFGe 74 ml/min/1,73 m². Rapport albumine/créatinine 52 mg/g. LDL 96 mg/dl, triglycérides 245 mg/dl. ALAT 52 U/l. Vitamine B12 238 pg/ml. TSH 1,8 mU/l.',
        clamp: true,
      },
      {
        title: 'Diagnostic',
        text: 'Diabète de type 2 mal équilibré, avec hypoglycémies sous sulfamide chez un chauffeur professionnel. Maladie rénale diabétique G2A2. Polyneuropathie sensitive distale, grade de risque podologique 1. Obésité de grade II. Hypertension insuffisamment contrôlée. Fumeur actif.',
        clamp: false,
      },
      {
        title: 'Plan',
        text: 'Arrêt du gliclazide. Début d’empagliflozine 10 mg 1× par jour et de sémaglutide 0,25 mg 1× par semaine, 0,5 mg après 4 semaines. Poursuite de la metformine. Orientation vers l’éducateur en diabétologie, la diététicienne, le podologue, l’ophtalmologue et le tabacologue. Demande de remboursement. Certificat d’aptitude à la conduite groupe 2. Biologie et réévaluation après 3 mois. Filet de sécurité : arrêter l’empagliflozine en cas de vomissements, diarrhée ou impossibilité de manger ; contact urgent en cas de douleur abdominale intense irradiant dans le dos ou de nouvelle plaie au pied. Suivi avec PAID-5, DTSQ et WHO-5.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '09-02-1968'],
      ['Questionnaire', 'Diabète de type 2'],
      ['Langue', 'Français'],
    ],
  },
};

export function EndocrinologyScribeDemo() {
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

        <AppCard icon="user" title="Paul Langerhans" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: two gliclazide tablets, and the allopurinol         */
/* ------------------------------------------------------------------ */

const SCHEDULE_ROWS: [string, string][] = [
  ['Metformine Sandoz 1000 mg filmomhulde tabletten', "1 tablet 's ochtends en 's avonds, bij de maaltijd"],
  ['Uni Diamicron 60 mg tabletten met gereguleerde afgifte', "2 tabletten 's ochtends, bij het ontbijt"],
  ['Coversyl Plus 10 mg/2,5 mg filmomhulde tabletten', "1 tablet 's ochtends"],
  ['Rosuvastatine EG 10 mg filmomhulde tabletten', "1 tablet 's avonds"],
  ['Zyloric 300 mg tabletten', "1 tablet 's avonds"],
];

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 5 geneesmiddelen gevonden:',
    confirm: 'Ja, klopt. Die Zyloric was ik vergeten, dat is voor mijn jicht. En van de Diamicron neem ik er inderdaad twee.',
    followUp: { question: 'Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    schedule: { header: 'Apotheek De Kade · Medicatieschema · P. Langerhans, ° 09-02-1968', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformine Sandoz', strength: '1000 mg', substance: 'Metformine', frequency: '2× per dag, bij de maaltijd', indication: 'Diabetes type 2' },
      {
        name: 'Uni Diamicron',
        strength: '60 mg (2 tabletten = 120 mg)',
        substance: 'Gliclazide',
        frequency: "1× per dag, 's ochtends",
        indication: 'Diabetes type 2 (sulfonylurea)',
        tag: { label: 'Hypo-risico', tone: 'amber' },
      },
      { name: 'Coversyl Plus', strength: '10 mg / 2,5 mg', substance: 'Perindopril + indapamide', frequency: "1× per dag, 's ochtends", indication: 'Hypertensie' },
      { name: 'Rosuvastatine EG', strength: '10 mg', substance: 'Rosuvastatine', frequency: "1× per dag, 's avonds", indication: 'Cholesterol' },
      { name: 'Zyloric', strength: '300 mg', substance: 'Allopurinol', frequency: "1× per dag, 's avonds", indication: 'Jicht', tag: { label: 'Zelf vergeten', tone: 'amber' } },
    ],
    notes: [
      { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
      { label: 'Hypoglycemierisico', value: 'Uni Diamicron (sulfonylurea), 120 mg per dag', tone: 'warn' },
      { label: 'Allergieën', value: 'Penicilline (huiduitslag)' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 5 medicines:',
    confirm: 'Yes, that’s right. I’d forgotten the Zyloric, that’s for my gout. And yes, I take two of the Diamicron.',
    followUp: { question: 'Noted. Do you take any blood thinners, such as Marevan, Xarelto or Eliquis?', choices: ['Yes', 'No'], answer: 'No' },
    schedule: { header: 'Apotheek De Kade · Medication schedule · P. Langerhans, b. 09-02-1968', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformine Sandoz', strength: '1000 mg', substance: 'Metformin', frequency: 'Twice a day, with meals', indication: 'Type 2 diabetes' },
      {
        name: 'Uni Diamicron',
        strength: '60 mg (2 tablets = 120 mg)',
        substance: 'Gliclazide',
        frequency: 'Once a day, in the morning',
        indication: 'Type 2 diabetes (sulfonylurea)',
        tag: { label: 'Hypo risk', tone: 'amber' },
      },
      { name: 'Coversyl Plus', strength: '10 mg / 2.5 mg', substance: 'Perindopril + indapamide', frequency: 'Once a day, in the morning', indication: 'Hypertension' },
      { name: 'Rosuvastatine EG', strength: '10 mg', substance: 'Rosuvastatin', frequency: 'Once a day, in the evening', indication: 'Cholesterol' },
      { name: 'Zyloric', strength: '300 mg', substance: 'Allopurinol', frequency: 'Once a day, in the evening', indication: 'Gout', tag: { label: 'Forgotten', tone: 'amber' } },
    ],
    notes: [
      { label: 'Blood thinners', value: 'None (confirmed in the chat)', tone: 'ok' },
      { label: 'Hypoglycaemia risk', value: 'Uni Diamicron (sulfonylurea), 120 mg a day', tone: 'warn' },
      { label: 'Allergies', value: 'Penicillin (rash)' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 5 médicaments :',
    confirm: 'Oui, c’est exact. J’avais oublié le Zyloric, c’est pour ma goutte. Et du Diamicron, j’en prends bien deux.',
    followUp: { question: 'C’est noté. Prenez-vous des anticoagulants, comme Marevan, Xarelto ou Eliquis ?', choices: ['Oui', 'Non'], answer: 'Non' },
    schedule: { header: 'Apotheek De Kade · Schéma de médication · P. Langerhans, né le 09-02-1968', rows: SCHEDULE_ROWS },
    meds: [
      { name: 'Metformine Sandoz', strength: '1000 mg', substance: 'Metformine', frequency: '2× par jour, au repas', indication: 'Diabète de type 2' },
      {
        name: 'Uni Diamicron',
        strength: '60 mg (2 comprimés = 120 mg)',
        substance: 'Gliclazide',
        frequency: '1× par jour, le matin',
        indication: 'Diabète de type 2 (sulfamide)',
        tag: { label: 'Risque d’hypo', tone: 'amber' },
      },
      { name: 'Coversyl Plus', strength: '10 mg / 2,5 mg', substance: 'Périndopril + indapamide', frequency: '1× par jour, le matin', indication: 'Hypertension' },
      { name: 'Rosuvastatine EG', strength: '10 mg', substance: 'Rosuvastatine', frequency: '1× par jour, le soir', indication: 'Cholestérol' },
      { name: 'Zyloric', strength: '300 mg', substance: 'Allopurinol', frequency: '1× par jour, le soir', indication: 'Goutte', tag: { label: 'Oublié', tone: 'amber' } },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'Aucun (confirmé dans le chat)', tone: 'ok' },
      { label: 'Risque d’hypoglycémie', value: 'Uni Diamicron (sulfamide), 120 mg par jour', tone: 'warn' },
      { label: 'Allergies', value: 'Pénicilline (éruption cutanée)' },
    ],
  },
});

export function EndocrinologyMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Paul Langerhans', initials: 'PL', dob: '09-02-1968', color: PAUL }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, prescriptions, reimbursement, licence        */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Endocrinologie, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Voorschriften', description: 'Jardiance 10 mg en Ozempic 0,25/0,5 mg' },
      { label: 'Aanvraag terugbetaling', description: 'Hoofdstuk IV, met HbA1c en voorgaande behandeling' },
      { label: 'Attest rijgeschiktheid', description: 'Groep 2, voor de arbeidsgeneesheer' },
      { label: 'Verwijzingen', description: 'Diabeteseducator, diëtist, podoloog, oogarts, tabakoloog' },
      { label: 'Uitleg voor de patiënt', description: "Het spuitje, hypo's herkennen, wat te doen als u ziek bent" },
    ],
    previews: [
      'Diagnose: diabetes mellitus type 2, onvoldoende gereguleerd, met hypoglycemieën onder sulfonylurea bij een beroepschauffeur. Beleid: stop gliclazide, start empagliflozine 10 mg en semaglutide 0,25 mg per week.',
      'Geachte collega, ik zag uw patiënt de heer Langerhans voor onvoldoende gereguleerde diabetes type 2 (HbA1c 8,9%) met hypoglycemieën tijdens het rijden. We stoppen gliclazide en starten empagliflozine en semaglutide. Labo en herevaluatie over drie maanden.',
      "Jardiance 10 mg, 1× per dag 's ochtends. Ozempic 0,25 mg, 1× per week gedurende 4 weken, daarna 0,5 mg 1× per week.",
      'Aanvraag terugbetaling hoofdstuk IV voor semaglutide: diabetes type 2, HbA1c 8,9% ondanks metformine en sulfonylurea gedurende meer dan 3 maanden, BMI 35,3.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënt Paul Langerhans, geboren op 9 februari 1968, die ik recent op de diabetesraadpleging zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens onvoldoende gereguleerde diabetes type 2 (HbA1c 8,9%) onder metformine en gliclazide, met hypoglycemieën.'],
        [
          'Anamnese',
          "Diabetes type 2 sinds 2017, HbA1c stijgend van 7,4% naar 8,9% over twee jaar. Dorst, nycturie 2× per nacht, vermoeidheid. De afgelopen maand drie hypoglycemieën tijdens het rijden, telkens na een overgeslagen maaltijd, zelf opgelost. Hij neemt 120 mg gliclazide per dag. Sinds een half jaar tintelingen en een branderig gevoel in beide voeten, 's nachts. Laatste oogcontrole in 2022. Gekend met hypertensie, hypercholesterolemie en jicht (allopurinol). Rookt 15 sigaretten per dag, ±6 pinten per week. Werkt als internationaal vrachtwagenchauffeur met onregelmatige maaltijden. Moeder diabetes type 2, vader hartinfarct op 61 jaar. Allergie voor penicilline. Geen bloedverdunners.",
        ],
        [
          'Klinisch onderzoek',
          'Gewicht 112 kg, BMI 35,3, buikomtrek 121 cm. Bloeddruk 146/88 mmHg. Voeten: eelt onder MTP1 rechts zonder wonde, pulsaties beiderzijds palpabel. Monofilament niet gevoeld op 2 van 4 plaatsen links en 1 van 4 rechts, vibratiezin verminderd aan beide grote tenen.',
        ],
        ['Aanvullende onderzoeken', 'Labo: HbA1c 8,9%, nuchtere glycemie 186 mg/dl, eGFR 74 ml/min, albumine/creatinine-ratio 52 mg/g, LDL 96 mg/dl, triglyceriden 245 mg/dl, ALT 52 U/l, vitamine B12 laag-normaal.'],
        [
          'Diagnose',
          'Diabetes mellitus type 2, onvoldoende gereguleerd, met hypoglycemieën onder sulfonylurea. Diabetische nierziekte G2A2. Distale sensibele polyneuropathie, voetrisicoklasse 1. Obesitas graad II. Hypertensie, onvoldoende gecontroleerd. Actief roker.',
        ],
        [
          'Beleid',
          'We stoppen gliclazide en starten empagliflozine 10 mg 1× per dag en semaglutide 0,25 mg 1× per week, op te bouwen naar 0,5 en daarna 1 mg. Metformine loopt verder. Graag uw hulp om de bloeddruk onder 130/80 mmHg te brengen. Paul wordt gezien door de diabeteseducator, de diëtist en de podoloog; we vroegen een oogonderzoek aan en hij wil een tabakoloog zien. Het attest rijgeschiktheid voor de arbeidsgeneesheer is opgemaakt. Labo en herevaluatie over drie maanden. Hij weet dat hij empagliflozine tijdelijk stopt bij braken, diarree of als hij niet kan eten, en dat hij dringend contact opneemt bij hevige buikpijn of een nieuwe wonde aan de voet.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, endocrinoloog',
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
      { label: 'Consultation report', description: 'Endocrinology template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Prescriptions', description: 'Jardiance 10 mg and Ozempic 0.25/0.5 mg' },
      { label: 'Reimbursement request', description: 'Chapter IV, with HbA1c and previous treatment' },
      { label: 'Fitness-to-drive certificate', description: 'Group 2, for the occupational physician' },
      { label: 'Referrals', description: 'Diabetes educator, dietitian, podiatrist, ophthalmologist, smoking cessation' },
      { label: 'Explanation for the patient', description: 'The injection, recognising hypos, what to do when you are ill' },
    ],
    previews: [
      'Diagnosis: type 2 diabetes mellitus, poorly controlled, with hypoglycaemia on a sulfonylurea in a professional driver. Plan: stop gliclazide, start empagliflozin 10 mg and semaglutide 0.25 mg weekly.',
      'Dear colleague, I saw your patient Mr Langerhans for poorly controlled type 2 diabetes (HbA1c 8.9%) with hypoglycaemia while driving. We are stopping gliclazide and starting empagliflozin and semaglutide. Bloods and review in three months.',
      'Jardiance 10 mg, once a day in the morning. Ozempic 0.25 mg, once a week for 4 weeks, then 0.5 mg once a week.',
      'Chapter IV reimbursement request for semaglutide: type 2 diabetes, HbA1c 8.9% despite metformin and a sulfonylurea for more than 3 months, BMI 35.3.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Paul Langerhans, born on 9 February 1968, whom I recently saw in the diabetes clinic.',
      sections: [
        ['Reason for contact', 'Referred for poorly controlled type 2 diabetes (HbA1c 8.9%) on metformin and gliclazide, with hypoglycaemia.'],
        [
          'History',
          'Type 2 diabetes since 2017, HbA1c rising from 7.4% to 8.9% over two years. Thirst, nocturia twice a night, tiredness. Three hypoglycaemic episodes in the past month while driving, each after a skipped meal, self-treated. He takes 120 mg of gliclazide a day. Tingling and burning in both feet at night for six months. Last eye check in 2022. Known hypertension, hypercholesterolaemia and gout (allopurinol). Smokes 15 cigarettes a day, about 6 beers a week. Works as an international lorry driver with irregular meals. Mother type 2 diabetes, father heart attack at 61. Penicillin allergy. No anticoagulants.',
        ],
        [
          'Clinical examination',
          'Weight 112 kg, BMI 35.3, waist 121 cm. Blood pressure 146/88 mmHg. Feet: callus under right MTP1 without a wound, pulses palpable on both sides. Monofilament not felt at 2 of 4 sites on the left and 1 of 4 on the right, reduced vibration sense at both great toes.',
        ],
        ['Further investigations', 'Bloods: HbA1c 8.9%, fasting glucose 186 mg/dl, eGFR 74 ml/min, albumin/creatinine ratio 52 mg/g, LDL 96 mg/dl, triglycerides 245 mg/dl, ALT 52 U/l, vitamin B12 low-normal.'],
        [
          'Diagnosis',
          'Type 2 diabetes mellitus, poorly controlled, with hypoglycaemia on a sulfonylurea. Diabetic kidney disease G2A2. Distal sensory polyneuropathy, foot risk class 1. Class II obesity. Hypertension, insufficiently controlled. Current smoker.',
        ],
        [
          'Plan',
          'We are stopping gliclazide and starting empagliflozin 10 mg once daily and semaglutide 0.25 mg once weekly, building up to 0.5 and then 1 mg. Metformin continues. We would appreciate your help in bringing his blood pressure below 130/80 mmHg. Paul will see the diabetes educator, the dietitian and the podiatrist; we have requested an eye examination and he would like to see a smoking cessation adviser. The fitness-to-drive certificate for the occupational physician has been completed. Bloods and review in three months. He knows to stop empagliflozin temporarily with vomiting, diarrhoea or if he cannot eat, and to get in touch urgently with severe abdominal pain or a new wound on his foot.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, endocrinologist',
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
      { label: 'Rapport de consultation', description: 'Modèle Endocrinologie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Prescriptions', description: 'Jardiance 10 mg et Ozempic 0,25/0,5 mg' },
      { label: 'Demande de remboursement', description: 'Chapitre IV, avec HbA1c et traitement antérieur' },
      { label: 'Certificat d’aptitude à la conduite', description: 'Groupe 2, pour le médecin du travail' },
      { label: 'Orientations', description: 'Éducateur en diabétologie, diététicienne, podologue, ophtalmologue, tabacologue' },
      { label: 'Explication pour le patient', description: 'L’injection, reconnaître une hypoglycémie, que faire quand vous êtes malade' },
    ],
    previews: [
      'Diagnostic : diabète de type 2 mal équilibré, avec hypoglycémies sous sulfamide chez un chauffeur professionnel. Plan : arrêt du gliclazide, début d’empagliflozine 10 mg et de sémaglutide 0,25 mg par semaine.',
      'Cher confrère, j’ai vu votre patient M. Langerhans pour un diabète de type 2 mal équilibré (HbA1c 8,9 %) avec des hypoglycémies au volant. Nous arrêtons le gliclazide et commençons l’empagliflozine et le sémaglutide. Biologie et réévaluation dans trois mois.',
      'Jardiance 10 mg, 1× par jour le matin. Ozempic 0,25 mg, 1× par semaine pendant 4 semaines, puis 0,5 mg 1× par semaine.',
      'Demande de remboursement chapitre IV pour le sémaglutide : diabète de type 2, HbA1c 8,9 % malgré metformine et sulfamide depuis plus de 3 mois, IMC 35,3.',
      '',
      '',
      '',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patient Paul Langerhans, né le 9 février 1968, que j’ai vu récemment en consultation de diabétologie.',
      sections: [
        ['Motif de contact', 'Adressé pour un diabète de type 2 mal équilibré (HbA1c 8,9 %) sous metformine et gliclazide, avec hypoglycémies.'],
        [
          'Anamnèse',
          'Diabète de type 2 depuis 2017, HbA1c en hausse de 7,4 % à 8,9 % en deux ans. Soif, nycturie 2× par nuit, fatigue. Le mois dernier, trois hypoglycémies au volant, chaque fois après un repas sauté, résolues seul. Il prend 120 mg de gliclazide par jour. Depuis six mois, fourmillements et brûlures dans les deux pieds la nuit. Dernier contrôle ophtalmologique en 2022. Connu pour hypertension, hypercholestérolémie et goutte (allopurinol). Fume 15 cigarettes par jour, environ 6 bières par semaine. Chauffeur poids lourd international aux repas irréguliers. Mère diabète de type 2, père infarctus à 61 ans. Allergie à la pénicilline. Pas d’anticoagulants.',
        ],
        [
          'Examen clinique',
          'Poids 112 kg, IMC 35,3, tour de taille 121 cm. Tension 146/88 mmHg. Pieds : durillon sous la MTP1 droite sans plaie, pouls palpables des deux côtés. Monofilament non perçu sur 2 sites sur 4 à gauche et 1 sur 4 à droite, sensibilité vibratoire diminuée aux deux gros orteils.',
        ],
        ['Examens complémentaires', 'Biologie : HbA1c 8,9 %, glycémie à jeun 186 mg/dl, DFGe 74 ml/min, rapport albumine/créatinine 52 mg/g, LDL 96 mg/dl, triglycérides 245 mg/dl, ALAT 52 U/l, vitamine B12 à la limite inférieure.'],
        [
          'Diagnostic',
          'Diabète de type 2 mal équilibré, avec hypoglycémies sous sulfamide. Maladie rénale diabétique G2A2. Polyneuropathie sensitive distale, grade de risque podologique 1. Obésité de grade II. Hypertension insuffisamment contrôlée. Fumeur actif.',
        ],
        [
          'Plan',
          'Nous arrêtons le gliclazide et commençons l’empagliflozine 10 mg 1× par jour et le sémaglutide 0,25 mg 1× par semaine, à augmenter à 0,5 puis 1 mg. La metformine est poursuivie. Merci de nous aider à ramener sa tension sous 130/80 mmHg. Paul verra l’éducateur en diabétologie, la diététicienne et le podologue ; nous avons demandé un examen ophtalmologique et il souhaite voir un tabacologue. Le certificat d’aptitude à la conduite pour le médecin du travail est établi. Biologie et réévaluation dans trois mois. Il sait qu’il doit arrêter temporairement l’empagliflozine en cas de vomissements, diarrhée ou s’il ne peut pas manger, et prendre contact en urgence en cas de douleur abdominale intense ou de nouvelle plaie au pied.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, endocrinologue',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function EndocrinologyDocumentDemo() {
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

  // Report, prescriptions and reimbursement request generate after the consultation; the letter lands on top, as the end
  // frame. Licence certificate, referrals and patient leaflet wait until the visitor generates them.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
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
/* 8 · Follow-up: D. Ductus raises an alert, Paul three months on      */
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
    higherBetter: string;
    baseline: string;
    month3: string;
    exampleData: string;
    measures: string[];
    keyFigures: [string, string, string][];
    labNote: string;
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
      ['D. Ductus', 'GLP-1-agonist · week 3'],
      ['P. Langerhans', 'GLP-1 + SGLT2 · maand 3 · PAID-5 ingevuld'],
      ['B. Beta', 'Basale insuline · titratie week 2'],
      ['A. Acinus', 'Leefstijl + metformine · maand 3'],
    ],
    alert: 'Meldt hevige buikpijn die naar de rug uitstraalt en braken, drie weken na de start van semaglutide. Neem vandaag contact op.',
    detail: 'P. Langerhans · GLP-1 + SGLT2',
    checkin: 'Check-in maand 3',
    chat: [
      { from: 'bot', text: 'Hoe gaat het sinds uw vorige consult? Had u nog momenten waarop u beefde of zweette?' },
      { from: 'patient', text: 'Geen enkele keer meer. Geen trillende handen meer op de snelweg.' },
      { from: 'bot', text: 'Fijn om te horen. Hoe verdraagt u het spuitje?' },
      { from: 'patient', text: 'De eerste weken was ik wat misselijk na het eten, nu niet meer. Mijn broek zit losser, mijn vrouw heeft het ook gezien.' },
      { from: 'bot', text: 'Had u buikpijn die naar de rug uitstraalt, braken, of een wonde aan uw voet?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    higherBetter: 'hoger = beter',
    baseline: 'Baseline',
    month3: 'Maand 3',
    exampleData: 'Voorbeelddata',
    measures: ['PAID-5', 'DTSQs', 'WHO-5'],
    keyFigures: [
      ['HbA1c', '8,9%', '7,1%'],
      ["Hypo's per maand", '3', '0'],
      ['Gewicht', '112 kg', '104 kg'],
    ],
    labNote: 'HbA1c uit het labo, geen vragenlijst',
    life: [
      ['Slaap', '2× per nacht plassen', 'Hooguit 1×'],
      ['Werk', "Hypo's achter het stuur", "Rijdt zonder hypo's"],
      ['Roken', '15 per dag', '8 per dag, begeleiding tabakoloog'],
      ['Hobby', 'Duiven, moe na ritten', 'Duiven, meer energie in het weekend'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de arts kiest. Schakelt hij later over op insuline, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'GLP-1 + SGLT2',
        paul: true,
        items: [
          { moment: 'Week 2', name: 'Start nieuwe behandeling', asks: "Misselijkheid, braken, eetlust, injectie gelukt, plassen en dorst, genitale jeuk, hypo's, rode vlaggen", current: true },
          { moment: 'Week 6', name: 'Dosisverhoging', asks: 'Verdragen van 0,5 mg, gewicht, glycemiemetingen, buikpijn', current: true },
          { moment: 'Maand 3', name: 'Opvolging diabetes', asks: "PAID-5, DTSQ, WHO-5, hypo's, gewicht, roken, voeten, werk en rijden, open vragen", current: true },
          { moment: 'Maand 12', name: 'Jaarlijkse opvolging + welzijn', asks: 'PAID-5, DTSQ, WHO-5, EQ-5D-5L, oog- en voetcontrole gebeurd, PREM' },
        ],
      },
      {
        name: 'Leefstijl + orale therapie',
        items: [{ moment: 'Maand 3 en 6', name: 'Opvolging leefstijl', asks: 'Gewicht, beweging, voeding, maag-darmklachten, PAID-5' }],
      },
      {
        name: 'Basale insuline',
        items: [
          { moment: 'Dag 3, daarna wekelijks tot week 6', name: 'Titratie insuline', asks: "Nuchtere glycemie (foto van de meter of sensor), dosis, nachtelijke hypo's, injectieplaats" },
          { moment: 'Maand 3', name: 'Opvolging insuline', asks: "DTSQ, PAID-5, angst voor hypo's, rijden, WHO-5" },
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
      ['D. Ductus', 'GLP-1 agonist · week 3'],
      ['P. Langerhans', 'GLP-1 + SGLT2 · month 3 · PAID-5 completed'],
      ['B. Beta', 'Basal insulin · titration week 2'],
      ['A. Acinus', 'Lifestyle + metformin · month 3'],
    ],
    alert: 'Reports severe abdominal pain radiating to the back and vomiting, three weeks after starting semaglutide. Please get in touch today.',
    detail: 'P. Langerhans · GLP-1 + SGLT2',
    checkin: 'Check-in month 3',
    chat: [
      { from: 'bot', text: 'How have things been since your last appointment? Have you had any more moments of shaking or sweating?' },
      { from: 'patient', text: 'Not once. No more shaky hands on the motorway.' },
      { from: 'bot', text: 'Good to hear. How are you getting on with the injection?' },
      { from: 'patient', text: 'The first few weeks I felt a bit sick after eating, not any more. My trousers are looser, my wife has noticed too.' },
      { from: 'bot', text: 'Have you had abdominal pain radiating to your back, vomiting, or a wound on your foot?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    higherBetter: 'higher = better',
    baseline: 'Baseline',
    month3: 'Month 3',
    exampleData: 'Example data',
    measures: ['PAID-5', 'DTSQs', 'WHO-5'],
    keyFigures: [
      ['HbA1c', '8.9%', '7.1%'],
      ['Hypos per month', '3', '0'],
      ['Weight', '112 kg', '104 kg'],
    ],
    labNote: 'HbA1c from the lab, not a questionnaire',
    life: [
      ['Sleep', 'Up twice a night to pass urine', 'Once at most'],
      ['Work', 'Hypos behind the wheel', 'Drives without hypos'],
      ['Smoking', '15 a day', '8 a day, with smoking cessation support'],
      ['Hobbies', 'Pigeons, tired after drives', 'Pigeons, more energy at weekends'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the doctor chooses. If he later switches to insulin, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'GLP-1 + SGLT2',
        paul: true,
        items: [
          { moment: 'Week 2', name: 'Starting the new treatment', asks: 'Nausea, vomiting, appetite, injection done, passing urine and thirst, genital itching, hypos, red flags', current: true },
          { moment: 'Week 6', name: 'Dose increase', asks: 'Tolerating 0.5 mg, weight, glucose readings, abdominal pain', current: true },
          { moment: 'Month 3', name: 'Diabetes follow-up', asks: 'PAID-5, DTSQ, WHO-5, hypos, weight, smoking, feet, work and driving, open questions', current: true },
          { moment: 'Month 12', name: 'Annual follow-up + wellbeing', asks: 'PAID-5, DTSQ, WHO-5, EQ-5D-5L, eye and foot checks done, PREM' },
        ],
      },
      {
        name: 'Lifestyle + oral therapy',
        items: [{ moment: 'Months 3 and 6', name: 'Lifestyle follow-up', asks: 'Weight, exercise, diet, gastrointestinal symptoms, PAID-5' }],
      },
      {
        name: 'Basal insulin',
        items: [
          { moment: 'Day 3, then weekly until week 6', name: 'Insulin titration', asks: 'Fasting glucose (photo of the meter or sensor), dose, night-time hypos, injection site' },
          { moment: 'Month 3', name: 'Insulin follow-up', asks: 'DTSQ, PAID-5, fear of hypos, driving, WHO-5' },
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
      ['D. Ductus', 'Agoniste GLP-1 · semaine 3'],
      ['P. Langerhans', 'GLP-1 + SGLT2 · mois 3 · PAID-5 rempli'],
      ['B. Beta', 'Insuline basale · titration semaine 2'],
      ['A. Acinus', 'Mode de vie + metformine · mois 3'],
    ],
    alert: 'Signale une douleur abdominale intense irradiant dans le dos et des vomissements, trois semaines après le début du sémaglutide. Prenez contact aujourd’hui.',
    detail: 'P. Langerhans · GLP-1 + SGLT2',
    checkin: 'Suivi mois 3',
    chat: [
      { from: 'bot', text: 'Comment cela se passe-t-il depuis votre dernière consultation ? Avez-vous encore eu des moments où vous trembliez ou transpiriez ?' },
      { from: 'patient', text: 'Plus une seule fois. Plus de mains tremblantes sur l’autoroute.' },
      { from: 'bot', text: 'Ravi de l’entendre. Comment supportez-vous la piqûre ?' },
      { from: 'patient', text: 'Les premières semaines, j’avais un peu la nausée après manger, plus maintenant. Mon pantalon est plus lâche, ma femme l’a remarqué aussi.' },
      { from: 'bot', text: 'Avez-vous eu une douleur abdominale irradiant dans le dos, des vomissements, ou une plaie au pied ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    higherBetter: 'plus haut = mieux',
    baseline: 'Référence',
    month3: 'Mois 3',
    exampleData: 'Données d’exemple',
    measures: ['PAID-5', 'DTSQs', 'WHO-5'],
    keyFigures: [
      ['HbA1c', '8,9 %', '7,1 %'],
      ['Hypos par mois', '3', '0'],
      ['Poids', '112 kg', '104 kg'],
    ],
    labNote: 'HbA1c issue de la biologie, pas d’un questionnaire',
    life: [
      ['Sommeil', 'Se lève 2× la nuit pour uriner', 'Une fois au maximum'],
      ['Travail', 'Hypoglycémies au volant', 'Conduit sans hypoglycémie'],
      ['Tabac', '15 par jour', '8 par jour, accompagnement tabacologue'],
      ['Loisirs', 'Pigeons, fatigué après les trajets', 'Pigeons, plus d’énergie le week-end'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le médecin. S’il passe plus tard à l’insuline, le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'GLP-1 + SGLT2',
        paul: true,
        items: [
          {
            moment: 'Semaine 2',
            name: 'Début du nouveau traitement',
            asks: 'Nausées, vomissements, appétit, injection réussie, mictions et soif, démangeaisons génitales, hypoglycémies, signaux d’alerte',
            current: true,
          },
          { moment: 'Semaine 6', name: 'Augmentation de dose', asks: 'Tolérance de 0,5 mg, poids, glycémies, douleur abdominale', current: true },
          { moment: 'Mois 3', name: 'Suivi du diabète', asks: 'PAID-5, DTSQ, WHO-5, hypoglycémies, poids, tabac, pieds, travail et conduite, questions ouvertes', current: true },
          { moment: 'Mois 12', name: 'Suivi annuel + bien-être', asks: 'PAID-5, DTSQ, WHO-5, EQ-5D-5L, contrôle des yeux et des pieds fait, PREM' },
        ],
      },
      {
        name: 'Mode de vie + traitement oral',
        items: [{ moment: 'Mois 3 et 6', name: 'Suivi du mode de vie', asks: 'Poids, activité physique, alimentation, troubles digestifs, PAID-5' }],
      },
      {
        name: 'Insuline basale',
        items: [
          { moment: 'Jour 3, puis chaque semaine jusqu’à la semaine 6', name: 'Titration de l’insuline', asks: 'Glycémie à jeun (photo du lecteur ou du capteur), dose, hypoglycémies nocturnes, site d’injection' },
          { moment: 'Mois 3', name: 'Suivi de l’insuline', asks: 'DTSQ, PAID-5, peur des hypoglycémies, conduite, WHO-5' },
        ],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'DD', flag: true, date: '13-11-2026, 08:42' },
  { initials: 'PL', flag: false, date: '13-11-2026, 07:55' },
  { initials: 'BB', flag: false, date: '12-11-2026, 18:20' },
  { initials: 'AA', flag: false, date: '10-11-2026, 09:15' },
];
const PAUL_ROW = 1;
/** Baseline → month 3 (sales' example data). The reading direction differs per questionnaire. */
const SCORES: { max: number; values: [number, number]; lowerBetter: boolean }[] = [
  { max: 20, values: [9, 4], lowerBetter: true },
  { max: 36, values: [17, 29], lowerBetter: false },
  { max: 100, values: [44, 64], lowerBetter: false },
];

export function EndocrinologyFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 D. Ductus's alert, 6 Paul's progress opens
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
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#2F8F4E]/40 bg-[#E8F5EC]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>D. Ductus</b> · {c.alert}
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

                {/* Three questionnaires, each with its own reading direction; baseline grey, month 3 in Paul's colour */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">{c.scores}</p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.baseline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: PAUL }} />
                        {c.month3}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const { max, values, lowerBetter } = SCORES[i];
                      const [before, after] = values;
                      return (
                        <div key={label}>
                          <p className="flex justify-between gap-2 text-[11px] mb-1">
                            <span className="inline-flex flex-wrap items-center gap-1.5">
                              {label} <span className="text-[#949CB1]">· 0–{max}</span>
                              <span className="rounded-full bg-[#E9FFF7] px-1.5 py-px text-[9.5px] font-semibold text-[#1F9E6E]">
                                {lowerBetter ? `↓ ${c.lowerBetter}` : `↑ ${c.higherBetter}`}
                              </span>
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
                                animate={{ width: `${(before / max) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }}
                              />
                            </span>
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span
                                className="block h-full rounded-full"
                                style={{ backgroundColor: PAUL }}
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
                  {/* HbA1c, hypos and weight apart, as small key figures */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {c.keyFigures.map(([label, was, now]) => (
                      <div key={label} className="rounded-lg border border-[#E8EAEC] px-2.5 py-1.5">
                        <p className="text-[10px] text-[#949CB1] leading-tight">{label}</p>
                        <p className="text-[12px] tabular-nums">
                          <span className="text-[#949CB1]">{was}</span> → <b style={{ color: PAUL }}>{now}</b>
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-[#949CB1]">{c.labNote}</p>
                  {/* Not only numbers: sleep, driving, smoking and the pigeons */}
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.paul ? 'border-[#2F8F4E]/30 bg-[#E8F5EC]/70' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.paul && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#2F8F4E]/20">
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
