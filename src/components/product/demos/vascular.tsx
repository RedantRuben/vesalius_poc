'use client';

/**
 * Module demos for the vascular surgery variant (source: sales, "Website-inhoud vaatchirurgie", §7). Every page follows
 * Greet Saphena (52, primary school teacher, symptomatic varicose veins on the left) one step further, from triage to a
 * duplex, an endovenous ablation and three months of follow-up; D. Femoralis (suddenly swollen, painful leg after a long
 * flight) is the recurring red flag. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import type { SiteLocale } from '@/content/orthopedics';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Greet keeps one avatar colour on every page, so visitors recognise her. */
const GREET = '#6B5CC8';
const GREET_SOFT = '#F0EEFB';
/** Red flags (D. Femoralis, S. Parva) share one red accent and the warning icon. */
const RED = APP.accent;
/** Patients who stay with the vascular surgeons, and those sent to the aesthetic clinic. */
const STAYS = { text: '#0B759F', bg: '#EBF6F8' };
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'GS' ? GREET : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function GreetTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="GS" size={24} />
        Greet Saphena
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: venous, arterial or aesthetic                     */
/* ------------------------------------------------------------------ */

type Referral = 'venous' | 'arterial' | 'aesthetic' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Plots dik, pijnlijk linkerbeen sinds gisteren, na een lange vlucht. Geen kortademigheid. Secretariaat plant vandaag een duplex.',
    referrals: { venous: 'Veneus', arterial: 'Arterieel', aesthetic: 'Esthetisch' },
    rows: [
      'Plots dik, pijnlijk linkerbeen sinds gisteren, na een lange vlucht',
      "Zware benen en enkelzwelling links 's avonds, spataders, steunkousen zonder voldoende effect",
      'Fijne adertjes aan de dijen, geen klachten, vraag naar het uitzicht',
      'Kuitpijn na 200 meter stappen, weg bij stilstaan, rookt',
      'Vraag over afspraak',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Suddenly swollen, painful left leg since yesterday, after a long flight. No breathlessness. The secretariat is booking a duplex today.',
    referrals: { venous: 'Venous', arterial: 'Arterial', aesthetic: 'Aesthetic' },
    rows: [
      'Suddenly swollen, painful left leg since yesterday, after a long flight',
      'Heavy legs and left ankle swelling in the evening, varicose veins, compression stockings not effective enough',
      'Fine thread veins on the thighs, no symptoms, question about appearance',
      'Calf pain after walking 200 metres, gone when standing still, smokes',
      'Question about an appointment',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Jambe gauche soudain gonflée et douloureuse depuis hier, après un long vol. Pas d’essoufflement. Le secrétariat planifie un écho-Doppler aujourd’hui.',
    referrals: { venous: 'Veineux', arterial: 'Artériel', aesthetic: 'Esthétique' },
    rows: [
      'Jambe gauche soudain gonflée et douloureuse depuis hier, après un long vol',
      'Jambes lourdes et gonflement de la cheville gauche le soir, varices, bas de contention insuffisamment efficaces',
      'Fines varicosités aux cuisses, pas de plaintes, question sur l’aspect',
      'Douleur au mollet après 200 mètres de marche, disparaît à l’arrêt, fume',
      'Question sur un rendez-vous',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'D. Femoralis', initials: 'DF', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'G. Saphena', initials: 'GS', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'venous' },
  { name: 'V. Venula', initials: 'VV', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'aesthetic' },
  { name: 'P. Tibialis', initials: 'PT', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'arterial' },
  { name: 'K. Perforans', initials: 'KP', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: '' },
];

// Aesthetic in another colour, so it is clear not every question about veins lands in the vascular surgeon's agenda.
const REFERRAL_TONE: Record<Exclude<Referral, ''>, { bg: string; text: string }> = { venous: STAYS, arterial: STAYS, aesthetic: ELSEWHERE };

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function VascularTriageDemo() {
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
                <PatientAvatar initials="DF" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">D. Femoralis</span>
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
/* 2 · Agenda: a long slot with time for the duplex                    */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    elsewhere: '2 patiënten doorgestuurd naar een collega',
    types: [
      'Duplexcontrole na ablatie',
      'Dringend · dik, pijnlijk been, duplex',
      'Nieuwe patiënt · wonde binnenenkel (voorrang)',
      'Nieuwe patiënt · spataders links, duplex',
      'Controle na ablatie · maand 3',
      'Sclerotherapie zijtakken',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    elsewhere: '2 patients referred to a colleague',
    types: [
      'Duplex check after ablation',
      'Urgent · swollen, painful leg, duplex',
      'New patient · wound inner ankle (priority)',
      'New patient · varicose veins left, duplex',
      'Check-up after ablation · month 3',
      'Sclerotherapy of side branches',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    elsewhere: '2 patients orientés vers un collègue',
    types: [
      'Contrôle écho-Doppler après ablation',
      'Urgent · jambe gonflée et douloureuse, écho-Doppler',
      'Nouveau patient · plaie malléole interne (prioritaire)',
      'Nouvelle patiente · varices gauches, écho-Doppler',
      'Contrôle après ablation · mois 3',
      'Sclérothérapie des collatérales',
    ],
  },
};

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; greet?: boolean; flag?: boolean };

const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'S. Parva', initials: 'SP', type: 0 },
  { room: 1, start: 0, len: 3, name: 'G. Saphena', initials: 'GS', type: 3, greet: true },
  { room: 0, start: 1, len: 1, name: 'D. Femoralis', initials: 'DF', type: 1, flag: true },
  { room: 2, start: 1, len: 1, name: 'M. Recurrens', initials: 'MR', type: 4 },
  { room: 0, start: 2, len: 2, name: 'K. Perforans', initials: 'KP', type: 2 },
  { room: 2, start: 3, len: 1, name: 'J. Arcus', initials: 'JA', type: 5 },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.greet ? GREET : visit.flag ? RED : ROOM_COLORS[visit.room];
  const background = visit.greet ? GREET_SOFT : visit.flag ? '#FFE7ED' : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.greet && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.greet && <PatientAvatar initials="GS" size={16} />}
        {visit.flag && <AppIcon name="exclamation-triangle" size={11} color={RED} />}
        {visit.name}
      </p>
      <p className={visit.len > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{label}</p>
      {visit.greet && ready && (
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

export function VascularAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–6 visits appear, 7 Greet's questionnaire tick and the patients referred on
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
      {/* V. Venula and P. Tibialis are not in this agenda: triage sent them to the aesthetic clinic and the arterial colleague. */}
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
/* 3 · Pre-consultation: symptoms or appearance, asked apart           */
/* ------------------------------------------------------------------ */

type SummaryRow = { label: string; value: string; fillAt?: number; mark?: string };
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

// After the second answer the reason fills in, after the fourth "symptoms or appearance", after her tap the thrombosis question.
const REASON_AT = 2;
const ROUTING_AT = 4;
const THROMBOSIS_AT = 6;
/** Sections open by default on Greet's tab: reason, symptoms, red flags and medical history. */
const OPEN_BY_DEFAULT = [0, 1, 3, 4];

const INTAKE: Record<SiteLocale, IntakeCopy> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: "Al jaren zware benen 's avonds, vooral links. Sinds twee jaar zwelt mijn enkel op en de spataders aan mijn kuit worden erger." },
      { from: 'bot', text: 'Wat stoort u het meest: de klachten, het uitzicht, of allebei?' },
      { from: 'patient', text: 'Vooral dat zware gevoel na een dag voor de klas. Het uitzicht stoort me ook wel.' },
      { from: 'bot', text: 'Heeft u ooit een trombose of een ontsteking van een ader gehad?' },
      { from: 'patient', text: 'Nee' },
    ],
    yesNo: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    tabs: ['Varices', 'Arterieel', 'Wonde'],
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', "Zware, vermoeide benen 's avonds, links meer dan rechts. Enkelzwelling links en spataders aan knie en kuit links. Verwezen door de huisarts na zes maanden steunkousen.", { fillAt: REASON_AT }),
            r('Duur', 'Zware benen al jaren, zwelling sinds twee jaar', { fillAt: REASON_AT }),
            r('Klachten of uitzicht', 'Vooral de klachten, ook het uitzicht', { fillAt: ROUTING_AT, mark: 'Bepaalde de routering' }),
          ],
        },
        {
          title: 'Klachten',
          rows: [
            r('Zwaar gevoel', '6/10 op het einde van de dag'),
            r('Zwelling', "Enkel links, 's avonds, 's ochtends weg"),
            r('Andere', 'Nachtelijke kuitkrampen 2 à 3 keer per week, jeuk aan het onderbeen links'),
          ],
        },
        {
          title: 'Wanneer heb je klachten',
          rows: [r('Erger bij', 'Lang staan in de klas, warm weer, einde van de dag'), r('Beter bij', 'Benen omhoog, wandelen, koude douche, steunkousen')],
        },
        {
          title: 'Rode vlaggen',
          rows: [r('Plots dik of pijnlijk been', 'Nee'), r('Pijnlijke rode streng, wonde, bloeding', 'Nee'), r('Kuitpijn bij stappen', 'Nee')],
        },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Eerdere behandeling', 'Steunkousen klasse 2 (knielengte) sinds 6 maanden, draagt ze 3 dagen per week: warm en moeilijk aan te trekken. Daflon 500 mg 2× per dag. Nooit sclerotherapie of ingreep.'),
            r('Trombose of flebitis', 'Nee', { fillAt: THROMBOSIS_AT }),
            r('Zwangerschappen', '2, klachten erger na de tweede'),
            r('Aandoeningen', 'Trage schildklier'),
            r('Allergieën', 'Pleisters (huidirritatie)'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Moeder spataders (geopereerd rond 50 jaar), vader hoge bloeddruk'),
            r('Beeldvorming elders', 'Geen'),
          ],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Nee / 1 à 2 glazen per week')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Leerkracht 5de leerjaar, staat het grootste deel van de dag'),
            r('Sport en hobby', 'Dagelijks wandelen met de hond (max. 30 minuten), fietsen in het weekend, tuinieren'),
            r('Lengte / gewicht', '1,68 m / 74 kg'),
            r('Leeftijd', '52 jaar'),
            r('Verwijzing', 'Via dr. Claeys, huisarts'),
          ],
        },
        { title: 'Baseline', rows: [r('AVVQ', '22 (0 tot 100, lager = beter)')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Krampende pijn in de rechterkuit na 200 meter stappen, weg na een minuut stilstaan, sinds 6 maanden')] },
        { title: 'Klachten', rows: [r("Pijn in rust of 's nachts", 'Nee')] },
        { title: 'Rode vlaggen', rows: [r('Wonde aan voet of tenen', 'Nee')] },
        { title: 'Medische achtergrond', rows: [r('Risicofactoren', 'Rookt 20 sigaretten per dag, diabetes type 2')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Vrachtwagenchauffeur / 63 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Wonde aan de binnenkant van de linkerenkel, sinds 8 weken, geneest niet')] },
        { title: 'Klachten', rows: [r('Huid rond de wonde', 'Bruin verkleurd en hard')] },
        { title: 'Medische achtergrond', rows: [r('Eerdere behandeling', 'Verbanden via de thuisverpleging, geen compressie'), r('Trombose', 'Nee')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Gepensioneerd / 71 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'For years I’ve had heavy legs in the evening, especially the left. For two years my ankle has been swelling and the varicose veins on my calf are getting worse.' },
      { from: 'bot', text: 'What bothers you most: the symptoms, the appearance, or both?' },
      { from: 'patient', text: 'Mostly that heavy feeling after a day in front of the class. The appearance bothers me a bit too.' },
      { from: 'bot', text: 'Have you ever had a thrombosis or an inflamed vein?' },
      { from: 'patient', text: 'No' },
    ],
    yesNo: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    tabs: ['Varicose veins', 'Arterial', 'Wound'],
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Heavy, tired legs in the evening, left more than right. Left ankle swelling and varicose veins on the left knee and calf. Referred by the GP after six months of compression stockings.', { fillAt: REASON_AT }),
            r('Duration', 'Heavy legs for years, swelling for two years', { fillAt: REASON_AT }),
            r('Symptoms or appearance', 'Mainly the symptoms, the appearance too', { fillAt: ROUTING_AT, mark: 'Decided the routing' }),
          ],
        },
        {
          title: 'Symptoms',
          rows: [r('Heavy feeling', '6/10 at the end of the day'), r('Swelling', 'Left ankle, in the evening, gone by morning'), r('Other', 'Night-time calf cramps 2 to 3 times a week, itching of the left lower leg')],
        },
        {
          title: 'When are the symptoms there',
          rows: [r('Worse with', 'Standing for long in the classroom, warm weather, end of the day'), r('Better with', 'Legs up, walking, a cold shower, compression stockings')],
        },
        {
          title: 'Red flags',
          rows: [r('Suddenly swollen or painful leg', 'No'), r('Painful red cord, wound, bleeding', 'No'), r('Calf pain on walking', 'No')],
        },
        {
          title: 'Medical history',
          rows: [
            r('Previous treatment', 'Class 2 compression stockings (knee length) for 6 months, wears them 3 days a week: hot and hard to put on. Daflon 500 mg twice a day. Never sclerotherapy or surgery.'),
            r('Thrombosis or phlebitis', 'No', { fillAt: THROMBOSIS_AT }),
            r('Pregnancies', '2, symptoms worse after the second'),
            r('Conditions', 'Underactive thyroid'),
            r('Allergies', 'Plasters (skin irritation)'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Mother varicose veins (operated at around 50), father high blood pressure'),
            r('Imaging elsewhere', 'None'),
          ],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'No / 1 to 2 glasses a week')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Year 6 teacher, on her feet most of the day'),
            r('Sport and hobbies', 'Walks the dog daily (max. 30 minutes), cycles at weekends, gardening'),
            r('Height / weight', '1.68 m / 74 kg'),
            r('Age', '52'),
            r('Referral', 'Via Dr Claeys, GP'),
          ],
        },
        { title: 'Baseline', rows: [r('AVVQ', '22 (0 to 100, lower = better)')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Cramping pain in the right calf after walking 200 metres, gone after a minute standing still, for 6 months')] },
        { title: 'Symptoms', rows: [r('Pain at rest or at night', 'No')] },
        { title: 'Red flags', rows: [r('Wound on foot or toes', 'No')] },
        { title: 'Medical history', rows: [r('Risk factors', 'Smokes 20 cigarettes a day, type 2 diabetes')] },
        { title: 'General', rows: [r('Occupation / age', 'Lorry driver / 63')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Wound on the inside of the left ankle, for 8 weeks, not healing')] },
        { title: 'Symptoms', rows: [r('Skin around the wound', 'Brown discoloured and hard')] },
        { title: 'Medical history', rows: [r('Previous treatment', 'Dressings by the district nurse, no compression'), r('Thrombosis', 'No')] },
        { title: 'General', rows: [r('Occupation / age', 'Retired / 71')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis des années, j’ai les jambes lourdes le soir, surtout la gauche. Depuis deux ans, ma cheville gonfle et les varices de mon mollet s’aggravent.' },
      { from: 'bot', text: 'Qu’est-ce qui vous gêne le plus : les plaintes, l’aspect, ou les deux ?' },
      { from: 'patient', text: 'Surtout cette sensation de lourdeur après une journée devant la classe. L’aspect me gêne aussi un peu.' },
      { from: 'bot', text: 'Avez-vous déjà eu une thrombose ou une inflammation d’une veine ?' },
      { from: 'patient', text: 'Non' },
    ],
    yesNo: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    tabs: ['Varices', 'Artériel', 'Plaie'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Jambes lourdes et fatiguées le soir, la gauche plus que la droite. Gonflement de la cheville gauche et varices au genou et au mollet gauches. Adressée par le médecin traitant après six mois de bas de contention.', { fillAt: REASON_AT }),
            r('Durée', 'Jambes lourdes depuis des années, gonflement depuis deux ans', { fillAt: REASON_AT }),
            r('Plaintes ou aspect', 'Surtout les plaintes, aussi l’aspect', { fillAt: ROUTING_AT, mark: 'A décidé de l’orientation' }),
          ],
        },
        {
          title: 'Plaintes',
          rows: [
            r('Lourdeur', '6/10 en fin de journée'),
            r('Gonflement', 'Cheville gauche, le soir, disparu le matin'),
            r('Autres', 'Crampes nocturnes au mollet 2 à 3 fois par semaine, démangeaisons de la jambe gauche'),
          ],
        },
        {
          title: 'Quand avez-vous des plaintes',
          rows: [r('Pire en cas de', 'Station debout prolongée en classe, temps chaud, fin de journée'), r('Mieux avec', 'Jambes surélevées, marche, douche froide, bas de contention')],
        },
        {
          title: 'Signaux d’alerte',
          rows: [r('Jambe soudain gonflée ou douloureuse', 'Non'), r('Cordon rouge douloureux, plaie, saignement', 'Non'), r('Douleur au mollet à la marche', 'Non')],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Traitement antérieur', 'Bas de contention classe 2 (jusqu’au genou) depuis 6 mois, portés 3 jours par semaine : chauds et difficiles à enfiler. Daflon 500 mg 2× par jour. Jamais de sclérothérapie ni d’intervention.'),
            r('Thrombose ou phlébite', 'Non', { fillAt: THROMBOSIS_AT }),
            r('Grossesses', '2, plaintes aggravées après la deuxième'),
            r('Affections', 'Hypothyroïdie'),
            r('Allergies', 'Pansements adhésifs (irritation cutanée)'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Mère varices (opérée vers 50 ans), père hypertension'),
            r('Imagerie ailleurs', 'Aucune'),
          ],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'Non / 1 à 2 verres par semaine')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Institutrice de 5e primaire, debout la plus grande partie de la journée'),
            r('Sport et loisirs', 'Promène le chien chaque jour (max. 30 minutes), vélo le week-end, jardinage'),
            r('Taille / poids', '1,68 m / 74 kg'),
            r('Âge', '52 ans'),
            r('Orientation', 'Par le Dr Claeys, médecin traitant'),
          ],
        },
        { title: 'Mesure de référence', rows: [r('AVVQ', '22 (0 à 100, plus bas = mieux)')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Douleur crampoïde au mollet droit après 200 mètres de marche, disparaît après une minute d’arrêt, depuis 6 mois')] },
        { title: 'Plaintes', rows: [r('Douleur au repos ou la nuit', 'Non')] },
        { title: 'Signaux d’alerte', rows: [r('Plaie au pied ou aux orteils', 'Non')] },
        { title: 'Antécédents médicaux', rows: [r('Facteurs de risque', 'Fume 20 cigarettes par jour, diabète de type 2')] },
        { title: 'Général', rows: [r('Profession / âge', 'Chauffeur poids lourd / 63 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Plaie à la face interne de la cheville gauche, depuis 8 semaines, ne guérit pas')] },
        { title: 'Plaintes', rows: [r('Peau autour de la plaie', 'Brune et indurée')] },
        { title: 'Antécédents médicaux', rows: [r('Traitement antérieur', 'Pansements par l’infirmière à domicile, pas de compression'), r('Thrombose', 'Non')] },
        { title: 'Général', rows: [r('Profession / âge', 'Retraité / 71 ans')] },
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

export function VascularPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const total = c.chat.length;
  // 1–5 the conversation, 6 she answers the thrombosis question; the routing answer stays marked
  const step = useSteps(total, 1000, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Greet's tab opens on what matters first; long sections stay folded, the other two tabs are short and fully open
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? (tab === 0 ? OPEN_BY_DEFAULT.includes(i) : true);
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={10 + step * 6}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step === total - 1 && <Choices options={c.yesNo} />}
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
              {i === 0 && <PatientAvatar initials="GS" size={18} />}
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
/* 4 · Voice Reception: she calls, she is booked with the duplex       */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn huisarts stuurt me door voor mijn spataders. Kan ik een afspraak krijgen bij de vaatchirurg?' },
      { from: 'bot', text: 'Dat kan. Heeft u vooral last van zware of gezwollen benen, of gaat het vooral om het uitzicht?' },
      { from: 'patient', text: "Zware benen 's avonds, en mijn enkel zwelt op." },
      { from: 'bot', text: 'Is uw been plots dik en pijnlijk geworden, of heeft u een rode, pijnlijke streng of een wonde?' },
      { from: 'patient', text: 'Nee, dat niet.' },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de veneuze vaatchirurg, met tijd voor een echo van uw aders, en stuur u een korte vragenlijst om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de veneuze vaatchirurg (lang blok met duplex): spataders met zware benen en zwelling, geen rode vlaggen',
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
      { from: 'patient', text: 'Hello, my GP is referring me for my varicose veins. Can I get an appointment with the vascular surgeon?' },
      { from: 'bot', text: 'Certainly. Are you mainly bothered by heavy or swollen legs, or is it mostly about the appearance?' },
      { from: 'patient', text: 'Heavy legs in the evening, and my ankle swells up.' },
      { from: 'bot', text: 'Has your leg suddenly become swollen and painful, or do you have a red, painful cord or a wound?' },
      { from: 'patient', text: 'No, not that.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the venous surgeon, with time for an ultrasound of your veins, and send you a short questionnaire to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the venous surgeon (long slot with duplex): varicose veins with heavy legs and swelling, no red flags',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant m’envoie pour mes varices. Puis-je avoir un rendez-vous chez le chirurgien vasculaire ?' },
      { from: 'bot', text: 'Bien sûr. Souffrez-vous surtout de jambes lourdes ou gonflées, ou s’agit-il surtout de l’aspect ?' },
      { from: 'patient', text: 'Les jambes lourdes le soir, et ma cheville gonfle.' },
      { from: 'bot', text: 'Votre jambe est-elle soudain devenue gonflée et douloureuse, ou avez-vous un cordon rouge et douloureux ou une plaie ?' },
      { from: 'patient', text: 'Non, pas ça.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez le chirurgien veineux, avec le temps pour une échographie de vos veines, et je vous envoie un court questionnaire pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez le chirurgien veineux (long créneau avec écho-Doppler) : varices avec jambes lourdes et gonflement, aucun signal d’alerte',
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

export function VascularVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 52 74</span>
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
                <PatientAvatar initials="GS" size={18} />
                G. Saphena
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
/* 5 · Scribe: the duplex, said out loud, in the note                  */
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
    template: 'Vaatchirurgie',
    templates: ['Veneus', 'Arterieel', 'Wondzorg', 'Vaattoegang'],
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
      { who: 'doctor', text: 'Ik knijp even in uw kuit. Ziet u op het scherm hoe het bloed in deze grote ader terugloopt?' },
      { who: 'patient', text: "Is dat waarom mijn benen 's avonds zo zwaar zijn?" },
      { who: 'doctor', text: 'Ja. Uw diepe aders werken goed, dus we kunnen deze ader van binnenuit dichtmaken, in dagopname.' },
      { who: 'patient', text: 'En dan mag ik die kousen weglaten?' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Zware, vermoeide benen op het einde van de dag, links meer dan rechts, sinds jaren. Enkelzwelling links ’s avonds sinds twee jaar, nachtelijke kuitkrampen, jeuk onderbeen links. Varices knie en kuit links, erger na tweede zwangerschap. Staand beroep (leerkracht). Verwezen door dr. Claeys. Steunkousen klasse 2 sinds 6 maanden, slecht verdragen, en Daflon zonder voldoende effect. Geen trombose of flebitis, geen claudicatio. Hormonale substitutie (Femoston). Geen bloedverdunners. Moeder varices.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Staand: kronkelende varices mediaal knie en kuit links, in het gebied van de VSM, diameter > 3 mm. Enkeloedeem links met putjes. Geen pigmentatie, eczeem, lipodermatosclerose of ulcus. Rechts enkele teleangiëctasieën. A. dorsalis pedis en a. tibialis posterior beiderzijds goed palpabel.',
        clamp: true,
      },
      {
        title: 'Duplex',
        text: 'VSM links insufficiënt van de saphenofemorale junctie tot midkuit, reflux 2,5 s, diameter 7 mm in de dij. VSP links competent. Diep veneus systeem doorgankelijk en competent, geen tekenen van doorgemaakte trombose. VSM rechts competent.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Primaire veneuze insufficiëntie VSM links, CEAP C3 Ep As Pr.', clamp: false },
      {
        title: 'Beleid',
        text: 'Endoveneuze radiofrequente ablatie VSM links met flebectomie van zijtakken, in dagopname onder tumescentie-anesthesie. Steunkousen tot de ingreep, nadien steunkous klasse 2 overdag gedurende 2 weken. Tromboseprofylaxe met enoxaparine 40 mg gedurende 7 dagen, gezien hormonale substitutie. Duplexcontrole na 1 week. Vangnet: plots dik, pijnlijk been, kortademigheid of pijn op de borst: spoed. Pijnlijke rode streng: contact opnemen. Opvolging met AVVQ.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '14-03-1974'],
      ['Vragenlijst', 'Varices'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Vascular surgery',
    templates: ['Venous', 'Arterial', 'Wound care', 'Vascular access'],
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
      { who: 'doctor', text: 'I’m going to squeeze your calf. Can you see on the screen how the blood flows back down in this large vein?' },
      { who: 'patient', text: 'Is that why my legs are so heavy in the evening?' },
      { who: 'doctor', text: 'Yes. Your deep veins work well, so we can close this vein from the inside, as a day case.' },
      { who: 'patient', text: 'And then can I stop wearing those stockings?' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Heavy, tired legs at the end of the day, left more than right, for years. Left ankle swelling in the evening for two years, night-time calf cramps, itching of the left lower leg. Varicose veins on the left knee and calf, worse after the second pregnancy. Works on her feet (teacher). Referred by Dr Claeys. Class 2 compression stockings for 6 months, poorly tolerated, and Daflon without sufficient effect. No thrombosis or phlebitis, no claudication. Hormone replacement therapy (Femoston). No anticoagulants. Mother had varicose veins.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Standing: tortuous varicose veins medial knee and calf on the left, in the GSV territory, diameter > 3 mm. Pitting oedema of the left ankle. No pigmentation, eczema, lipodermatosclerosis or ulcer. A few telangiectasias on the right. Dorsalis pedis and posterior tibial pulses well palpable on both sides.',
        clamp: true,
      },
      {
        title: 'Duplex',
        text: 'Left GSV incompetent from the saphenofemoral junction to mid-calf, reflux 2.5 s, diameter 7 mm in the thigh. Left SSV competent. Deep venous system patent and competent, no signs of previous thrombosis. Right GSV competent.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Primary venous insufficiency of the left GSV, CEAP C3 Ep As Pr.', clamp: false },
      {
        title: 'Plan',
        text: 'Endovenous radiofrequency ablation of the left GSV with phlebectomy of side branches, as a day case under tumescent anaesthesia. Compression stockings until the procedure, then a class 2 stocking during the day for 2 weeks. Thrombosis prophylaxis with enoxaparin 40 mg for 7 days, given hormone replacement therapy. Duplex check after 1 week. Safety net: suddenly swollen, painful leg, breathlessness or chest pain: A&E. Painful red cord: get in touch. Follow-up with the AVVQ.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '14-03-1974'],
      ['Questionnaire', 'Varicose veins'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Chirurgie vasculaire',
    templates: ['Veineux', 'Artériel', 'Soins des plaies', 'Abord vasculaire'],
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
      { who: 'doctor', text: 'Je vais presser votre mollet. Vous voyez à l’écran comment le sang reflue dans cette grande veine ?' },
      { who: 'patient', text: 'C’est pour ça que mes jambes sont si lourdes le soir ?' },
      { who: 'doctor', text: 'Oui. Vos veines profondes fonctionnent bien, nous pouvons donc fermer cette veine de l’intérieur, en hôpital de jour.' },
      { who: 'patient', text: 'Et ensuite, je pourrai arrêter ces bas ?' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Jambes lourdes et fatiguées en fin de journée, la gauche plus que la droite, depuis des années. Gonflement de la cheville gauche le soir depuis deux ans, crampes nocturnes au mollet, démangeaisons de la jambe gauche. Varices au genou et au mollet gauches, aggravées après la deuxième grossesse. Métier debout (institutrice). Adressée par le Dr Claeys. Bas de contention classe 2 depuis 6 mois, mal tolérés, et Daflon sans effet suffisant. Pas de thrombose ni de phlébite, pas de claudication. Traitement hormonal substitutif (Femoston). Pas d’anticoagulants. Mère variqueuse.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Debout : varices tortueuses à la face interne du genou et du mollet gauches, dans le territoire de la GVS, diamètre > 3 mm. Œdème prenant le godet à la cheville gauche. Pas de pigmentation, d’eczéma, de lipodermatosclérose ni d’ulcère. Quelques télangiectasies à droite. Pouls pédieux et tibiaux postérieurs bien palpables des deux côtés.',
        clamp: true,
      },
      {
        title: 'Écho-Doppler',
        text: 'GVS gauche incontinente de la jonction saphéno-fémorale à mi-mollet, reflux 2,5 s, diamètre 7 mm à la cuisse. PVS gauche continente. Réseau veineux profond perméable et continent, sans signe de thrombose ancienne. GVS droite continente.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Insuffisance veineuse primaire de la GVS gauche, CEAP C3 Ep As Pr.', clamp: false },
      {
        title: 'Plan',
        text: 'Ablation endoveineuse par radiofréquence de la GVS gauche avec phlébectomie des collatérales, en hôpital de jour sous anesthésie par tumescence. Bas de contention jusqu’à l’intervention, puis bas classe 2 en journée pendant 2 semaines. Prophylaxie de la thrombose par énoxaparine 40 mg pendant 7 jours, vu le traitement hormonal substitutif. Contrôle écho-Doppler après 1 semaine. Filet de sécurité : jambe soudain gonflée et douloureuse, essoufflement ou douleur thoracique : urgences. Cordon rouge douloureux : prendre contact. Suivi avec l’AVVQ.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '14-03-1974'],
      ['Questionnaire', 'Varices'],
      ['Langue', 'Français'],
    ],
  },
};

export function VascularScribeDemo() {
  const c = useLocalized(SCRIBE);
  const lines = c.lines.length;
  // 1–4 transcript lines while recording, 5 generating, 6 note ready
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<GreetTitle back={c.back} />}>
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

        <AppCard icon="user" title="Greet Saphena" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: the hormone therapy she forgot, for the ablation    */
/* ------------------------------------------------------------------ */

const MEDICATION = medicationCopy({
  nl: {
    ask: 'Neemt u geneesmiddelen? U mag gewoon een foto sturen van uw medicatieschema, een voorschrift of de doosjes.',
    found: 'Dank u, ik heb 3 geneesmiddelen gevonden:',
    confirm: 'Ja, klopt. De Femoston was ik vergeten, dat neem ik voor de overgang.',
    followUp: { question: 'Genoteerd. Neemt u bloedverdunners, zoals Marevan, Xarelto of Eliquis?', choices: ['Ja', 'Nee'], answer: 'Nee' },
    meds: [
      { name: 'L-Thyroxine Christiaens', strength: '75 µg', substance: 'Levothyroxine', frequency: "1× per dag, 's ochtends nuchter", indication: 'Trage schildklier' },
      { name: 'Daflon', strength: '500 mg', substance: 'Diosmine / hesperidine', frequency: '2× per dag, bij de maaltijd', indication: 'Veneuze klachten' },
      { name: 'Femoston 1/10', strength: '1 mg / 10 mg', substance: 'Estradiol / dydrogesteron', frequency: '1× per dag', indication: 'Overgangsklachten (hormonale substitutie)', tag: { label: 'Zelf vergeten', tone: 'amber' } },
    ],
    notes: [
      { label: 'Bloedverdunners', value: 'Geen (bevestigd in de chat)', tone: 'ok' },
      { label: 'Let op voor de ingreep', value: 'Hormonale substitutie: verhoogd tromboserisico', tone: 'warn' },
      { label: 'Allergieën', value: 'Pleisters (huidirritatie)' },
    ],
  },
  en: {
    ask: 'Do you take any medicines? You can simply send a photo of your medication schedule, a prescription or the boxes.',
    found: 'Thank you, I found 3 medicines:',
    confirm: 'Yes, that’s right. I’d forgotten the Femoston, I take it for the menopause.',
    followUp: { question: 'Noted. Do you take anticoagulants, such as Marevan, Xarelto or Eliquis?', choices: ['Yes', 'No'], answer: 'No' },
    meds: [
      { name: 'L-Thyroxine Christiaens', strength: '75 µg', substance: 'Levothyroxine', frequency: 'Once a day, in the morning on an empty stomach', indication: 'Underactive thyroid' },
      { name: 'Daflon', strength: '500 mg', substance: 'Diosmin / hesperidin', frequency: 'Twice a day, with meals', indication: 'Venous symptoms' },
      { name: 'Femoston 1/10', strength: '1 mg / 10 mg', substance: 'Estradiol / dydrogesterone', frequency: 'Once a day', indication: 'Menopausal symptoms (HRT)', tag: { label: 'Forgotten', tone: 'amber' } },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'None (confirmed in the chat)', tone: 'ok' },
      { label: 'Note for the procedure', value: 'Hormone replacement therapy: increased risk of thrombosis', tone: 'warn' },
      { label: 'Allergies', value: 'Plasters (skin irritation)' },
    ],
  },
  fr: {
    ask: 'Prenez-vous des médicaments ? Vous pouvez simplement envoyer une photo de votre schéma de médication, d’une ordonnance ou des boîtes.',
    found: 'Merci, j’ai trouvé 3 médicaments :',
    confirm: 'Oui, c’est exact. J’avais oublié le Femoston, je le prends pour la ménopause.',
    followUp: { question: 'C’est noté. Prenez-vous des anticoagulants, comme Marevan, Xarelto ou Eliquis ?', choices: ['Oui', 'Non'], answer: 'Non' },
    meds: [
      { name: 'L-Thyroxine Christiaens', strength: '75 µg', substance: 'Lévothyroxine', frequency: '1× par jour, le matin à jeun', indication: 'Hypothyroïdie' },
      { name: 'Daflon', strength: '500 mg', substance: 'Diosmine / hespéridine', frequency: '2× par jour, au repas', indication: 'Plaintes veineuses' },
      { name: 'Femoston 1/10', strength: '1 mg / 10 mg', substance: 'Estradiol / dydrogestérone', frequency: '1× par jour', indication: 'Troubles de la ménopause (THS)', tag: { label: 'Oublié', tone: 'amber' } },
    ],
    notes: [
      { label: 'Anticoagulants', value: 'Aucun (confirmé dans le chat)', tone: 'ok' },
      { label: 'Attention pour l’intervention', value: 'Traitement hormonal substitutif : risque accru de thrombose', tone: 'warn' },
      { label: 'Allergies', value: 'Pansements adhésifs (irritation cutanée)' },
    ],
  },
});

export function VascularMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Greet Saphena', initials: 'GS', dob: '14-03-1974', color: GREET }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: letter, admission request, prescriptions             */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Vaatchirurgie, met duplexbevindingen, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Opnameaanvraag dagziekenhuis', description: 'Endoveneuze ablatie VSM links met flebectomie' },
      { label: 'Voorschriften', description: 'Steunkous klasse 2 en enoxaparine 40 mg na de ingreep' },
      { label: 'Uitleg voor de patiënt', description: 'Voorbereiding, nazorg en wanneer dringend contact opnemen' },
      { label: 'Attest arbeidsongeschiktheid', description: '5 dagen na de ingreep' },
    ],
    previews: [
      'Diagnose: primaire veneuze insufficiëntie VSM links, CEAP C3 Ep As Pr. Duplex: reflux van de saphenofemorale junctie tot midkuit, diep veneus systeem competent. Beleid: endoveneuze radiofrequente ablatie in dagopname.',
      'Geachte collega, ik zag uw patiënte mevrouw Saphena voor zware benen en enkelzwelling links, ondanks zes maanden steunkousen. De duplex toont een insufficiëntie van de vena saphena magna links, met een competent diep veneus systeem. We plannen een endoveneuze ablatie in dagopname.',
      'Dagopname voor endoveneuze radiofrequente ablatie van de vena saphena magna links met flebectomie van de zijtakken, onder tumescentie-anesthesie. Hormonale substitutie: tromboseprofylaxe voorzien.',
      'Steunkous klasse 2 (dijlengte), overdag gedurende 2 weken na de ingreep. Enoxaparine 40 mg subcutaan, 1× per dag gedurende 7 dagen.',
      'Op de dag van de ingreep mag u licht ontbijten. Na de ingreep wandelt u elke dag en draagt u overdag uw steunkous. Bel meteen bij een plots dik, pijnlijk been, kortademigheid of pijn op de borst.',
      'Arbeidsongeschikt gedurende 5 dagen vanaf de dag van de ingreep, voor herstel na een endoveneuze ablatie.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënte Greet Saphena, geboren op 14 maart 1974, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens symptomatische varices links, ondanks zes maanden compressietherapie.'],
        [
          'Anamnese',
          'Al jaren zware, vermoeide benen op het einde van de dag, links meer dan rechts. Sinds twee jaar enkelzwelling links ’s avonds, nachtelijke kuitkrampen en jeuk aan het onderbeen. De varices werden erger na de tweede zwangerschap. Mevrouw werkt als leerkracht en staat het grootste deel van de dag. Steunkousen klasse 2 sinds zes maanden, die ze slecht verdraagt, en Daflon zonder voldoende effect. Geen trombose of flebitis in de voorgeschiedenis, geen claudicatio. Trage schildklier onder levothyroxine. Neemt daarnaast Femoston als hormonale substitutie. Geen bloedverdunners. Allergie voor pleisters. Moeder had varices.',
        ],
        [
          'Klinisch onderzoek',
          'Staand onderzoek toont kronkelende varices mediaal aan knie en kuit links, in het gebied van de vena saphena magna. Enkeloedeem links met putjes. Geen pigmentatie, eczeem, lipodermatosclerose of ulcus. Rechts enkele teleangiëctasieën. Perifere pulsaties beiderzijds goed palpabel.',
        ],
        [
          'Aanvullende onderzoeken',
          'Veneuze duplex: insufficiëntie van de vena saphena magna links van de saphenofemorale junctie tot midkuit, reflux 2,5 seconden, diameter 7 mm in de dij. Vena saphena parva links competent. Diep veneus systeem doorgankelijk en competent, zonder tekenen van doorgemaakte trombose. Vena saphena magna rechts competent.',
        ],
        ['Diagnose', 'Primaire veneuze insufficiëntie van de vena saphena magna links, CEAP C3 Ep As Pr.'],
        [
          'Beleid',
          'Gezien de klachten ondanks compressietherapie plannen we een endoveneuze radiofrequente ablatie van de vena saphena magna links met flebectomie van de zijtakken, in dagopname onder lokale verdoving. Na de ingreep draagt mevrouw twee weken overdag een steunkous klasse 2. Gezien de hormonale substitutie krijgt ze zeven dagen enoxaparine 40 mg als tromboseprofylaxe. Duplexcontrole na één week. Zij weet dat ze dringend contact moet opnemen bij een plots dik, pijnlijk been, kortademigheid of pijn op de borst.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, vaatchirurg',
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
      { label: 'Consultation report', description: 'Vascular surgery template, with duplex findings, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Day-case admission request', description: 'Endovenous ablation of the left GSV with phlebectomy' },
      { label: 'Prescriptions', description: 'Class 2 compression stocking and enoxaparin 40 mg after the procedure' },
      { label: 'Explanation for the patient', description: 'Preparation, aftercare and when to get in touch urgently' },
      { label: 'Fit note', description: '5 days after the procedure' },
    ],
    previews: [
      'Diagnosis: primary venous insufficiency of the left GSV, CEAP C3 Ep As Pr. Duplex: reflux from the saphenofemoral junction to mid-calf, deep venous system competent. Plan: endovenous radiofrequency ablation as a day case.',
      'Dear colleague, I saw your patient Mrs Saphena for heavy legs and left ankle swelling, despite six months of compression stockings. The duplex shows incompetence of the left great saphenous vein, with a competent deep venous system. We are planning an endovenous ablation as a day case.',
      'Day-case admission for endovenous radiofrequency ablation of the left great saphenous vein with phlebectomy of side branches, under tumescent anaesthesia. Hormone replacement therapy: thrombosis prophylaxis planned.',
      'Class 2 compression stocking (thigh length), during the day for 2 weeks after the procedure. Enoxaparin 40 mg subcutaneously, once a day for 7 days.',
      'On the day of the procedure you may have a light breakfast. Afterwards, walk every day and wear your compression stocking during the day. Call straight away with a suddenly swollen, painful leg, breathlessness or chest pain.',
      'Unfit for work for 5 days from the day of the procedure, to recover after an endovenous ablation.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Greet Saphena, born on 14 March 1974, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for symptomatic varicose veins on the left, despite six months of compression therapy.'],
        [
          'History',
          'Heavy, tired legs at the end of the day for years, left more than right. For two years left ankle swelling in the evening, night-time calf cramps and itching of the lower leg. The varicose veins worsened after the second pregnancy. Mrs Saphena works as a teacher and is on her feet most of the day. Class 2 compression stockings for six months, which she tolerates poorly, and Daflon without sufficient effect. No history of thrombosis or phlebitis, no claudication. Underactive thyroid on levothyroxine. Also takes Femoston as hormone replacement therapy. No anticoagulants. Allergic to plasters. Her mother had varicose veins.',
        ],
        [
          'Clinical examination',
          'Standing examination shows tortuous varicose veins medially at the left knee and calf, in the territory of the great saphenous vein. Pitting oedema of the left ankle. No pigmentation, eczema, lipodermatosclerosis or ulcer. A few telangiectasias on the right. Peripheral pulses well palpable on both sides.',
        ],
        [
          'Further investigations',
          'Venous duplex: incompetence of the left great saphenous vein from the saphenofemoral junction to mid-calf, reflux 2.5 seconds, diameter 7 mm in the thigh. Left small saphenous vein competent. Deep venous system patent and competent, without signs of previous thrombosis. Right great saphenous vein competent.',
        ],
        ['Diagnosis', 'Primary venous insufficiency of the left great saphenous vein, CEAP C3 Ep As Pr.'],
        [
          'Plan',
          'Given the symptoms despite compression therapy, we are planning endovenous radiofrequency ablation of the left great saphenous vein with phlebectomy of the side branches, as a day case under local anaesthesia. After the procedure, Mrs Saphena will wear a class 2 compression stocking during the day for two weeks. Given the hormone replacement therapy, she will receive enoxaparin 40 mg for seven days as thrombosis prophylaxis. Duplex check after one week. She knows to get in touch urgently with a suddenly swollen, painful leg, breathlessness or chest pain.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, vascular surgeon',
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
      { label: 'Rapport de consultation', description: 'Modèle Chirurgie vasculaire, avec les résultats de l’écho-Doppler, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Demande d’admission en hôpital de jour', description: 'Ablation endoveineuse de la GVS gauche avec phlébectomie' },
      { label: 'Prescriptions', description: 'Bas de contention classe 2 et énoxaparine 40 mg après l’intervention' },
      { label: 'Explication pour la patiente', description: 'Préparation, soins après l’intervention et quand prendre contact en urgence' },
      { label: 'Certificat d’incapacité de travail', description: '5 jours après l’intervention' },
    ],
    previews: [
      'Diagnostic : insuffisance veineuse primaire de la GVS gauche, CEAP C3 Ep As Pr. Écho-Doppler : reflux de la jonction saphéno-fémorale à mi-mollet, réseau veineux profond continent. Plan : ablation endoveineuse par radiofréquence en hôpital de jour.',
      'Cher confrère, j’ai vu votre patiente Mme Saphena pour des jambes lourdes et un gonflement de la cheville gauche, malgré six mois de bas de contention. L’écho-Doppler montre une incontinence de la grande veine saphène gauche, avec un réseau veineux profond continent. Nous prévoyons une ablation endoveineuse en hôpital de jour.',
      'Hôpital de jour pour ablation endoveineuse par radiofréquence de la grande veine saphène gauche avec phlébectomie des collatérales, sous anesthésie par tumescence. Traitement hormonal substitutif : prophylaxie de la thrombose prévue.',
      'Bas de contention classe 2 (jusqu’à la cuisse), en journée pendant 2 semaines après l’intervention. Énoxaparine 40 mg en sous-cutané, 1× par jour pendant 7 jours.',
      'Le jour de l’intervention, vous pouvez prendre un petit-déjeuner léger. Ensuite, marchez chaque jour et portez votre bas de contention en journée. Appelez immédiatement en cas de jambe soudain gonflée et douloureuse, d’essoufflement ou de douleur thoracique.',
      'Incapacité de travail de 5 jours à partir du jour de l’intervention, pour la convalescence après une ablation endoveineuse.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patiente Greet Saphena, née le 14 mars 1974, que j’ai vue récemment en consultation.',
      sections: [
        ['Motif de contact', 'Adressée pour des varices symptomatiques à gauche, malgré six mois de thérapie de compression.'],
        [
          'Anamnèse',
          'Depuis des années, jambes lourdes et fatiguées en fin de journée, la gauche plus que la droite. Depuis deux ans, gonflement de la cheville gauche le soir, crampes nocturnes au mollet et démangeaisons de la jambe. Les varices se sont aggravées après la deuxième grossesse. Madame est institutrice et passe la plus grande partie de la journée debout. Bas de contention classe 2 depuis six mois, qu’elle tolère mal, et Daflon sans effet suffisant. Pas d’antécédent de thrombose ni de phlébite, pas de claudication. Hypothyroïdie sous lévothyroxine. Prend aussi Femoston comme traitement hormonal substitutif. Pas d’anticoagulants. Allergie aux pansements adhésifs. Sa mère avait des varices.',
        ],
        [
          'Examen clinique',
          'L’examen debout montre des varices tortueuses à la face interne du genou et du mollet gauches, dans le territoire de la grande veine saphène. Œdème prenant le godet à la cheville gauche. Pas de pigmentation, d’eczéma, de lipodermatosclérose ni d’ulcère. Quelques télangiectasies à droite. Pouls périphériques bien palpables des deux côtés.',
        ],
        [
          'Examens complémentaires',
          'Écho-Doppler veineux : incontinence de la grande veine saphène gauche de la jonction saphéno-fémorale à mi-mollet, reflux de 2,5 secondes, diamètre de 7 mm à la cuisse. Petite veine saphène gauche continente. Réseau veineux profond perméable et continent, sans signe de thrombose ancienne. Grande veine saphène droite continente.',
        ],
        ['Diagnostic', 'Insuffisance veineuse primaire de la grande veine saphène gauche, CEAP C3 Ep As Pr.'],
        [
          'Plan',
          'Vu les plaintes malgré la thérapie de compression, nous prévoyons une ablation endoveineuse par radiofréquence de la grande veine saphène gauche avec phlébectomie des collatérales, en hôpital de jour sous anesthésie locale. Après l’intervention, madame portera un bas de contention classe 2 en journée pendant deux semaines. Vu le traitement hormonal substitutif, elle recevra de l’énoxaparine 40 mg pendant sept jours en prophylaxie de la thrombose. Contrôle écho-Doppler après une semaine. Elle sait qu’elle doit prendre contact en urgence en cas de jambe soudain gonflée et douloureuse, d’essoufflement ou de douleur thoracique.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, chirurgien vasculaire',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function VascularDocumentDemo() {
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

  // Report, admission request and prescriptions generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 1900), setTimeout(() => generate(3), 2900), setTimeout(() => generate(LETTER), 3900)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<GreetTitle />}>
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
/* 8 · Follow-up: S. Parva raises an alert, Greet three months on      */
/* ------------------------------------------------------------------ */

type Questionnaire = { moment: string; name: string; asks: string; current?: boolean };
type Treatment = { name: string; greet?: boolean; items: Questionnaire[] };

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
    month3: string;
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
      ['S. Parva', 'Endoveneuze ablatie · dag 2'],
      ['G. Saphena', 'Endoveneuze ablatie · maand 3 · AVVQ ingevuld'],
      ['J. Arcus', 'Sclerotherapie · week 2'],
      ['M. Recurrens', 'Compressie · maand 3'],
    ],
    alert: 'Meldt sinds vanochtend een pijnlijke, gezwollen kuit links, twee dagen na de ablatie. Duplex vandaag aangewezen. Neem contact op.',
    detail: 'G. Saphena · endoveneuze ablatie',
    checkin: 'Check-in maand 3',
    chat: [
      { from: 'bot', text: 'Hoe voelen uw benen nu op het einde van een schooldag?' },
      { from: 'patient', text: 'Veel lichter. Ik hoef ze niet meer omhoog te leggen als ik thuiskom.' },
      { from: 'bot', text: "Fijn om te horen. En 's nachts, heeft u nog krampen?" },
      { from: 'patient', text: 'Nee, die zijn weg. Ik wandel weer een uur met de hond.' },
      { from: 'bot', text: 'Heeft u een dik of pijnlijk been gehad, of een rode, pijnlijke streng?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    baseline: 'Baseline',
    month3: 'Maand 3',
    exampleData: 'Voorbeelddata',
    measures: ['AVVQ', "Zwaar gevoel 's avonds (NRS)"],
    life: [
      ['EQ-5D-5L VAS (hoger = beter)', '70', '85'],
      ['Enkelzwelling', 'Elke avond', 'Niet meer'],
      ['Slaap', 'Krampen 2 à 3 nachten per week', 'Geen krampen'],
      ['Werk', 'Benen omhoog na school', 'Volledige dag zonder klachten'],
      ['Hobby', 'Wandeling met de hond max. 30 minuten', 'Weer lange wandelingen'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die de arts kiest. Wordt het compressie, sclerotherapie of een ablatie, dan schakelt de opvolging mee.',
    plansNote: 'Elke vragenlijst gaat opnieuw de rode vlaggen na.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Endoveneuze ablatie',
        greet: true,
        items: [
          { moment: 'Dag 2', name: 'Controle na ablatie', asks: 'Pijn, blauwe plekken, kuitpijn of zwelling, kortademigheid, steunkous gedragen, enoxaparine ingenomen', current: true },
          { moment: 'Week 1', name: 'Herstel na ablatie (bij de duplexcontrole)', asks: 'Pijn in de dij, wandelen, werkhervatting, open vragen', current: true },
          { moment: 'Maand 3 en 12', name: 'Uitkomst na ablatie', asks: "AVVQ, zwaar gevoel, EQ-5D-5L, zwelling, werk, hobby's, tevredenheid, nieuwe spataders, PREM", current: true },
        ],
      },
      {
        name: 'Compressie',
        items: [{ moment: 'Maand 3 en 12', name: 'Opvolging varices conservatief', asks: 'AVVQ, zwaar gevoel, gebruik en verdraagzaamheid van de steunkousen, zwelling, werk, open vragen' }],
      },
      {
        name: 'Sclerotherapie',
        items: [
          { moment: 'Week 2', name: 'Controle na sclerotherapie', asks: 'Pijnlijke rode streng, verkleuring, blauwe plekken' },
          { moment: 'Maand 3', name: 'Resultaat sclerotherapie', asks: 'Tevredenheid, nieuwe adertjes, AVVQ' },
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
      ['S. Parva', 'Endovenous ablation · day 2'],
      ['G. Saphena', 'Endovenous ablation · month 3 · AVVQ completed'],
      ['J. Arcus', 'Sclerotherapy · week 2'],
      ['M. Recurrens', 'Compression · month 3'],
    ],
    alert: 'Reports a painful, swollen left calf since this morning, two days after the ablation. Duplex indicated today. Please get in touch.',
    detail: 'G. Saphena · endovenous ablation',
    checkin: 'Check-in month 3',
    chat: [
      { from: 'bot', text: 'How do your legs feel now at the end of a school day?' },
      { from: 'patient', text: 'Much lighter. I don’t need to put them up any more when I get home.' },
      { from: 'bot', text: 'Good to hear. And at night, do you still get cramps?' },
      { from: 'patient', text: 'No, they’ve gone. I’m walking the dog for an hour again.' },
      { from: 'bot', text: 'Have you had a swollen or painful leg, or a red, painful cord?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    baseline: 'Baseline',
    month3: 'Month 3',
    exampleData: 'Example data',
    measures: ['AVVQ', 'Heavy feeling in the evening (NRS)'],
    life: [
      ['EQ-5D-5L VAS (higher = better)', '70', '85'],
      ['Ankle swelling', 'Every evening', 'Gone'],
      ['Sleep', 'Cramps 2 to 3 nights a week', 'No cramps'],
      ['Work', 'Legs up after school', 'Full day without symptoms'],
      ['Hobbies', 'Walking the dog max. 30 minutes', 'Long walks again'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment the doctor chooses. Whether it is compression, sclerotherapy or an ablation, the follow-up switches with it.',
    plansNote: 'Every questionnaire checks the red flags again.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Endovenous ablation',
        greet: true,
        items: [
          { moment: 'Day 2', name: 'Check after ablation', asks: 'Pain, bruising, calf pain or swelling, breathlessness, stocking worn, enoxaparin taken', current: true },
          { moment: 'Week 1', name: 'Recovery after ablation (at the duplex check)', asks: 'Pain in the thigh, walking, return to work, open questions', current: true },
          { moment: 'Months 3 and 12', name: 'Outcome after ablation', asks: 'AVVQ, heavy feeling, EQ-5D-5L, swelling, work, hobbies, satisfaction, new varicose veins, PREM', current: true },
        ],
      },
      {
        name: 'Compression',
        items: [{ moment: 'Months 3 and 12', name: 'Conservative varicose vein follow-up', asks: 'AVVQ, heavy feeling, use and tolerance of the stockings, swelling, work, open questions' }],
      },
      {
        name: 'Sclerotherapy',
        items: [
          { moment: 'Week 2', name: 'Check after sclerotherapy', asks: 'Painful red cord, discolouration, bruising' },
          { moment: 'Month 3', name: 'Result of sclerotherapy', asks: 'Satisfaction, new thread veins, AVVQ' },
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
      ['S. Parva', 'Ablation endoveineuse · jour 2'],
      ['G. Saphena', 'Ablation endoveineuse · mois 3 · AVVQ rempli'],
      ['J. Arcus', 'Sclérothérapie · semaine 2'],
      ['M. Recurrens', 'Compression · mois 3'],
    ],
    alert: 'Signale depuis ce matin un mollet gauche douloureux et gonflé, deux jours après l’ablation. Écho-Doppler indiqué aujourd’hui. Prenez contact.',
    detail: 'G. Saphena · ablation endoveineuse',
    checkin: 'Suivi mois 3',
    chat: [
      { from: 'bot', text: 'Comment se sentent vos jambes maintenant à la fin d’une journée d’école ?' },
      { from: 'patient', text: 'Beaucoup plus légères. Je n’ai plus besoin de les surélever en rentrant.' },
      { from: 'bot', text: 'Ravi de l’entendre. Et la nuit, avez-vous encore des crampes ?' },
      { from: 'patient', text: 'Non, elles ont disparu. Je promène de nouveau le chien pendant une heure.' },
      { from: 'bot', text: 'Avez-vous eu une jambe gonflée ou douloureuse, ou un cordon rouge et douloureux ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    baseline: 'Référence',
    month3: 'Mois 3',
    exampleData: 'Données d’exemple',
    measures: ['AVVQ', 'Lourdeur le soir (NRS)'],
    life: [
      ['EQ-5D-5L EVA (plus haut = mieux)', '70', '85'],
      ['Gonflement de la cheville', 'Chaque soir', 'Plus du tout'],
      ['Sommeil', 'Crampes 2 à 3 nuits par semaine', 'Plus de crampes'],
      ['Travail', 'Jambes surélevées après l’école', 'Journée complète sans plaintes'],
      ['Loisirs', 'Promenade du chien max. 30 minutes', 'De nouveau de longues promenades'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement choisi par le médecin. Compression, sclérothérapie ou ablation : le suivi change avec lui.',
    plansNote: 'Chaque questionnaire revérifie les signaux d’alerte.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Ablation endoveineuse',
        greet: true,
        items: [
          { moment: 'Jour 2', name: 'Contrôle après ablation', asks: 'Douleur, hématomes, douleur ou gonflement du mollet, essoufflement, bas porté, énoxaparine prise', current: true },
          { moment: 'Semaine 1', name: 'Récupération après ablation (au contrôle écho-Doppler)', asks: 'Douleur à la cuisse, marche, reprise du travail, questions ouvertes', current: true },
          { moment: 'Mois 3 et 12', name: 'Résultat après ablation', asks: 'AVVQ, lourdeur, EQ-5D-5L, gonflement, travail, loisirs, satisfaction, nouvelles varices, PREM', current: true },
        ],
      },
      {
        name: 'Compression',
        items: [{ moment: 'Mois 3 et 12', name: 'Suivi conservateur des varices', asks: 'AVVQ, lourdeur, usage et tolérance des bas, gonflement, travail, questions ouvertes' }],
      },
      {
        name: 'Sclérothérapie',
        items: [
          { moment: 'Semaine 2', name: 'Contrôle après sclérothérapie', asks: 'Cordon rouge douloureux, coloration, hématomes' },
          { moment: 'Mois 3', name: 'Résultat de la sclérothérapie', asks: 'Satisfaction, nouvelles varicosités, AVVQ' },
        ],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'SP', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'GS', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'JA', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'MR', flag: false, date: '23-09-2026, 09:30' },
];
// Baseline → month 3 (sales' example data); the bar is value / max, so a shorter bar is progress.
const SCORES: { max: number; values: [number, number] }[] = [
  { max: 100, values: [22, 7] },
  { max: 10, values: [6, 1] },
];
const GREET_ROW = 1;

export function VascularFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 S. Parva's alert, 6 Greet's progress opens
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
              const greet = row.i === GREET_ROW;
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
                  {greet ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#6B5CC8]/40 bg-[#F0EEFB]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>S. Parva</b> · {c.alert}
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
                    <PatientAvatar initials="GS" size={20} />
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

                {/* Scores: baseline in grey, month 3 in Greet's colour; here a shorter bar is progress */}
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
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: GREET }} />
                        {c.month3}
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
                                style={{ backgroundColor: GREET }}
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
                  {/* Not only numbers: quality of life, swelling, sleep, a school day and the dog */}
                  <div className="mt-4 flex flex-col divide-y divide-[#E8EAEC] border-t border-[#E8EAEC]">
                    {c.life.map(([label, before, after]) => (
                      <p key={label} className="grid grid-cols-[6.5rem_1fr] gap-2 py-1.5 text-[11px]">
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${treatment.greet ? 'border-[#6B5CC8]/30 bg-[#F0EEFB]/70' : 'border-[#E8EAEC]'}`}>
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {treatment.greet && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#6B5CC8]/20">
                            <PatientAvatar initials="GS" size={12} />
                            Greet
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
