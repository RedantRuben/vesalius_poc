'use client';

/**
 * Module demos for the ENT variant (source: sales, "Website-inhoud NKO", §7). Every page follows Sven Septum (46,
 * chronic rhinosinusitis with nasal polyps) one step further; C. Cochlea (sudden deafness, right ear) is the recurring
 * red flag. Ear, nose & sinus and throat & voice keep one chip colour each. Same app UI as the other demos.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ENT_SUBDOMAINS, type EntSubdomain } from '@/content/ent';
import type { SiteLocale } from '@/content/orthopedics';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import { TemplatePicker } from './ortho';
import { Check, EASE, useLocalized, useSteps } from './shared';
import { MedicationChatDemo, medicationCopy } from './medication';

/** Sven keeps one avatar colour on every page, so visitors recognise him. */
const SVEN = '#4F5BD5';
const SVEN_SOFT = '#EEF0FD';
/** Red flags (C. Cochlea, E. Ethmoid) share one red accent and the warning icon. */
const RED = APP.accent;
const RED_SOFT = '#FFE7ED';
/** Allergology stands apart: not every patient ends up with an ENT surgeon. */
const ELSEWHERE = { text: '#B4531A', bg: '#FDF1E7' };

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'SS' ? SVEN : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

function useSiteLocale(): SiteLocale {
  const locale = useLocale();
  return locale === 'nl' || locale === 'fr' ? locale : 'en';
}

/** Ear, nose & sinus or throat & voice, in its fixed colour. */
function SubdomainChip({ id, icon = true, wrap = false }: { id: EntSubdomain; icon?: boolean; wrap?: boolean }) {
  const locale = useSiteLocale();
  const tone = ENT_SUBDOMAINS[id];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${wrap ? 'min-w-0 leading-tight md:whitespace-nowrap' : 'shrink-0 whitespace-nowrap'}`}
      style={{ backgroundColor: tone.bg, color: tone.text }}
    >
      {icon && <AppIcon name="arrow-fork-down" size={10} color={tone.text} />}
      {tone.label[locale]}
    </span>
  );
}

/** Amber marker for an answer that decided the route or matters for surgery. */
function Marker({ children, icon = 'arrow-fork-down' }: { children: React.ReactNode; icon?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF6E8] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C] ring-1 ring-[#F59E0C]/40 whitespace-nowrap">
      <AppIcon name={icon} size={10} color="#C2410C" />
      {children}
    </span>
  );
}

function SvenTitle({ back }: { back?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="SS" size={24} />
        Sven Septum
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

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
      <Initials text="AV" size={24} />
      <div className="max-w-[80%] bg-[#F4F5F8] rounded-2xl px-3 py-2 text-[11.5px] leading-snug">{children}</div>
    </motion.div>
  );
}

function PatientBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[78%] bg-[#06ACC1] text-white rounded-2xl px-3 py-2 text-[11.5px] leading-snug">
      {children}
    </motion.p>
  );
}

function Choices({ options }: { options: string[] }) {
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
/* 1 · Smart Triage: ear, nose or throat, and one patient elsewhere     */
/* ------------------------------------------------------------------ */

type Referral = EntSubdomain | 'allergy' | '';

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Sinds gisteren plots doof aan het rechteroor, met oorsuizen. Secretariaat neemt vandaag contact op.',
    allergy: 'Allergologie',
    rows: [
      'Sinds gisteren plots doof aan het rechteroor, oorsuizen',
      'Verstopte neus beiderzijds sinds 14 maanden, reukverlies, spray en 2 antibioticakuren zonder blijvend effect',
      'Kind van 4, hoort slecht, 3 oorontstekingen dit jaar (ingevuld door moeder)',
      '6 keelontstekingen in het voorbije jaar, telkens antibiotica',
      'Niezen en loopneus enkel in het voorjaar, nog geen neusspray',
      'Hees sinds 5 weken, rookt · voorrang',
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Suddenly deaf in the right ear since yesterday, with tinnitus. The secretariat is getting in touch today.',
    allergy: 'Allergology',
    rows: [
      'Suddenly deaf in the right ear since yesterday, tinnitus',
      'Nose blocked on both sides for 14 months, loss of smell, spray and 2 courses of antibiotics without lasting effect',
      'Child of 4, hears poorly, 3 ear infections this year (completed by his mother)',
      '6 throat infections in the past year, antibiotics each time',
      'Sneezing and runny nose only in spring, no nasal spray yet',
      'Hoarse for 5 weeks, smoker · priority',
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Surdité brutale de l’oreille droite depuis hier, avec acouphènes. Le secrétariat prend contact aujourd’hui.',
    allergy: 'Allergologie',
    rows: [
      'Surdité brutale de l’oreille droite depuis hier, acouphènes',
      'Nez bouché des deux côtés depuis 14 mois, perte de l’odorat, spray et 2 cures d’antibiotiques sans effet durable',
      'Enfant de 4 ans, entend mal, 3 otites cette année (rempli par sa mère)',
      '6 angines au cours de l’année écoulée, antibiotiques à chaque fois',
      'Éternuements et nez qui coule uniquement au printemps, pas encore de spray nasal',
      'Enroué depuis 5 semaines, fumeur · prioritaire',
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; referral: Referral; flag?: boolean }[] = [
  { name: 'C. Cochlea', initials: 'CC', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', referral: '', flag: true },
  { name: 'S. Septum', initials: 'SS', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'nose' },
  { name: 'M. Malleus', initials: 'MM', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'ear' },
  { name: 'T. Tonsil', initials: 'TT', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED', referral: 'throat' },
  { name: 'R. Concha', initials: 'RC', channel: 'chat', tasks: 0, status: 'COMPLETED', referral: 'allergy' },
  { name: 'L. Larynx', initials: 'LL', channel: 'chat', tasks: 0, status: 'IN_PROGRESS', referral: 'throat' },
];

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function EntTriageDemo() {
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
                  {row.referral && (
                    <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.3 }} className="hidden sm:inline-flex shrink-0">
                      {row.referral === 'allergy' ? (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
                          style={{ backgroundColor: ELSEWHERE.bg, color: ELSEWHERE.text }}
                        >
                          <AppIcon name="arrow-fork-down" size={10} color={ELSEWHERE.text} />
                          {c.allergy}
                        </span>
                      ) : (
                        <SubdomainChip id={row.referral} />
                      )}
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
                <PatientAvatar initials="CC" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">C. Cochlea</span>
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
/* 2 · Agenda: one column per focus, Sven prepared, C. Cochlea today   */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    referred: '1 patiënt doorgestuurd naar allergologie',
    types: [
      'Nieuwe patiënt · vocht achter het trommelvlies, gehoortest',
      'Nieuwe patiënt · chronische sinusitis, endoscopie',
      'Nieuwe patiënt · herhaalde keelontstekingen',
      'Controle na sinusoperatie',
      'Voorrang · heesheid sinds 5 weken',
      'Dringend · plots doof aan het rechteroor',
    ],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    referred: '1 patient referred to allergology',
    types: [
      'New patient · fluid behind the eardrum, hearing test',
      'New patient · chronic sinusitis, endoscopy',
      'New patient · recurrent throat infections',
      'Check-up after sinus surgery',
      'Priority · hoarse for 5 weeks',
      'Urgent · suddenly deaf in the right ear',
    ],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    referred: '1 patient orienté vers l’allergologie',
    types: [
      'Nouveau patient · liquide derrière le tympan, test auditif',
      'Nouveau patient · sinusite chronique, endoscopie',
      'Nouveau patient · angines à répétition',
      'Contrôle après chirurgie des sinus',
      'Prioritaire · enroué depuis 5 semaines',
      'Urgent · surdité brutale de l’oreille droite',
    ],
  },
};

// Each column is one ENT surgeon with their own focus: ear, nose & sinus, throat & voice.
const ROOM_FOCUS: EntSubdomain[] = ['ear', 'nose', 'throat'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; sven?: boolean; urgent?: boolean };

// In order of appearance; C. Cochlea drops in last, from triage.
const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'M. Malleus', initials: 'MM', type: 0 },
  { room: 1, start: 0, len: 2, name: 'S. Septum', initials: 'SS', type: 1, sven: true },
  { room: 2, start: 1, len: 1, name: 'T. Tonsil', initials: 'TT', type: 2 },
  { room: 1, start: 2, len: 1, name: 'E. Ethmoid', initials: 'EE', type: 3 },
  { room: 2, start: 2, len: 1, name: 'L. Larynx', initials: 'LL', type: 4 },
  { room: 0, start: 1, len: 1, name: 'C. Cochlea', initials: 'CC', type: 5, urgent: true },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const focus = ENT_SUBDOMAINS[ROOM_FOCUS[visit.room]];
  const accent = visit.urgent ? RED : visit.sven ? SVEN : focus.text;
  const background = visit.urgent ? RED_SOFT : visit.sven ? SVEN_SOFT : focus.bg;
  return (
    <motion.div
      initial={visit.urgent ? { opacity: 0, y: -30, scale: 0.9 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={visit.urgent ? { type: 'spring', stiffness: 180, damping: 16 } : { duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.sven && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.urgent && <AppIcon name="exclamation-triangle" size={10} color={RED} />}
        {visit.sven && <PatientAvatar initials="SS" size={16} />}
        {visit.name}
      </p>
      <p className="truncate text-[#4E5670]">{label}</p>
      {visit.sven && ready && (
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

export function EntAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–5 regular visits appear, 6 the urgent visit drops into Room 1 at 09:30, 7 Sven's questionnaire tick and the referral
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
            <span key={room} className="flex flex-col gap-1 px-2 md:px-3 py-2 text-[11px] font-medium border-l-2 min-w-0" style={{ borderLeftColor: ENT_SUBDOMAINS[ROOM_FOCUS[i]].text }}>
              <span className="flex items-center justify-between gap-2">
                {room}
                <span className="w-5 h-5 rounded-full bg-[#06ACC1] text-white text-[10px] flex items-center justify-center tabular-nums">
                  {shown.filter((v) => v.room === i).length}
                </span>
              </span>
              <span className="flex min-w-0">
                <SubdomainChip id={ROOM_FOCUS[i]} icon={false} wrap />
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
      {/* R. Concha is not in this agenda: triage already sent him to allergology. */}
      <p className="mt-2.5 px-1 flex items-center gap-1.5 text-[11px] text-[#949CB1] min-h-[16px]">
        {step >= 7 && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5">
            <AppIcon name="arrow-fork-down" size={11} color={ELSEWHERE.text} />
            {c.referred}
          </motion.span>
        )}
      </p>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Pre-consultation: the sinus chat, and summaries per subdomain   */
/* ------------------------------------------------------------------ */

type Mark = 'route' | 'surgery';
type SummaryRow = { label: string; value: string; mark?: Mark };
type SummarySection = { title: string; rows: SummaryRow[] };

const r = (label: string, value: string, mark?: Mark): SummaryRow => ({ label, value, mark });

const INTAKE: Record<
  SiteLocale,
  {
    intro: string;
    progress: string;
    placeholder: string;
    chat: { from: 'bot' | 'patient'; text: string }[];
    suggestions: string[];
    summary: string;
    copy: string;
    marks: Record<Mark, string>;
    summaries: SummarySection[][];
  }
> = {
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw klachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: 'Mijn neus zit al meer dan een jaar dicht, aan beide kanten. En ik ruik bijna niets meer.' },
      { from: 'bot', text: 'Hoe goed ruikt u nog, op 10? En hoe verstopt is uw neus, op 10?' },
      { from: 'patient', text: 'Ruiken 1, verstopt 8.' },
      { from: 'bot', text: 'Heeft u astma, of wordt u kortademig van aspirine of ibuprofen?' },
    ],
    suggestions: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    marks: { route: 'Bepaalt de routering', surgery: 'Telt voor de ingreep' },
    summaries: [
      [
        {
          title: 'Reden van consultatie',
          rows: [
            r('Aanleiding', 'Verstopte neus aan beide kanten en reukverlies. Verwezen door de huisarts na behandeling zonder blijvend effect.'),
            r('Duur', 'Verstopping 14 maanden, reukverlies 8 maanden'),
          ],
        },
        {
          title: 'Klachten',
          rows: [
            r('Neusverstopping', '8/10, beide kanten, het hele jaar door', 'route'),
            r('Reuk', '1/10, proeft ook minder'),
            r('Bijkomend', 'Slijm achter in de keel, drukgevoel ter hoogte van voorhoofd en wangen, snurken'),
            r('Bloed', 'Soms wat bloed in de zakdoek bij het snuiten, aan beide kanten, sinds hij neusspray gebruikt'),
          ],
        },
        {
          title: 'Rode vlaggen',
          rows: [r('Eenzijdig bloederig slijm', 'Nee'), r('Zwelling rond het oog, dubbelzien, minder zicht', 'Nee'), r('Hevige hoofdpijn met koorts', 'Nee')],
        },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Eerdere behandeling', 'Nasonex sinds 6 maanden (niet altijd dagelijks), neusspoelingen, 2 antibioticakuren, 1 kuur Medrol: reuk kwam twee weken terug'),
            r('Beeldvorming', 'CT sinussen, extern, augustus 2026, op vraag van de huisarts'),
            r('Astma', 'Ja, sinds 3 jaar, onder Symbicort'),
            r('Operaties', 'Geen eerdere neusoperaties'),
            r('Allergieën', 'Kortademig na ibuprofen. Hooikoorts als kind', 'surgery'),
            r('Bloedverdunners', 'Nee'),
            r('Familie', 'Moeder astma'),
          ],
        },
        { title: 'Sociale anamnese', rows: [r('Roken / alcohol', 'Gestopt 10 jaar geleden / 4 à 5 glazen per week')] },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Boekhouder bij een accountantskantoor'),
            r('Sport en hobby', 'Fietst in het weekend met een wielertoeristenclub. Kookt graag.'),
            r('Lengte / gewicht', '1,82 m / 88 kg'),
            r('Leeftijd', '46 jaar'),
            r('Verwijzing', 'Via dr. Claeys, huisarts'),
          ],
        },
        { title: 'Impact', rows: [r('Slaap en hobby', 'Slaapt slecht, fietst minder ver. "Ik ruik niet meer wat er in de pan zit."')] },
        { title: 'Baseline', rows: [r('SNOT-22', '58 (0 tot 110, lager = beter)')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Hoort slecht sinds de winter, zet de tv luider. Ingevuld door de moeder')] },
        {
          title: 'Klachten',
          rows: [r('Oorontstekingen', '3 dit jaar, telkens met antibiotica'), r('Snurken / mondademhaling', 'Ja / ja'), r('Spraak', 'Juf merkt dat hij minder duidelijk spreekt')],
        },
        { title: 'Rode vlaggen', rows: [r('Scheve mond, zwelling achter het oor', 'Nee')] },
        { title: 'Algemeen', rows: [r('Leeftijd', '4 jaar, eerste kleuterklas')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Herhaalde keelontstekingen')] },
        { title: 'Klachten', rows: [r('Aantal', '6 in de voorbije 12 maanden, telkens met koorts en antibiotica'), r('Gemist', '9 lesdagen en 2 stagedagen')] },
        { title: 'Rode vlaggen', rows: [r('Ademnood, niet kunnen slikken', 'Nee')] },
        { title: 'Medische achtergrond', rows: [r('Bloedverdunners', 'Nee')] },
        { title: 'Algemeen', rows: [r('Beroep / leeftijd', 'Studente verpleegkunde / 24 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'My nose has been blocked for more than a year, on both sides. And I can hardly smell anything any more.' },
      { from: 'bot', text: 'How well can you still smell, out of 10? And how blocked is your nose, out of 10?' },
      { from: 'patient', text: 'Smell 1, blocked 8.' },
      { from: 'bot', text: 'Do you have asthma, or do you get short of breath from aspirin or ibuprofen?' },
    ],
    suggestions: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    marks: { route: 'Decides the route', surgery: 'Matters for surgery' },
    summaries: [
      [
        {
          title: 'Reason for consultation',
          rows: [
            r('Cause', 'Nose blocked on both sides and loss of smell. Referred by the GP after treatment without lasting effect.'),
            r('Duration', 'Blockage 14 months, loss of smell 8 months'),
          ],
        },
        {
          title: 'Complaints',
          rows: [
            r('Nasal obstruction', '8/10, both sides, all year round', 'route'),
            r('Smell', '1/10, taste reduced too'),
            r('Other', 'Mucus at the back of the throat, pressure over the forehead and cheeks, snoring'),
            r('Blood', 'Sometimes a little blood in the tissue when blowing his nose, both sides, since using nasal spray'),
          ],
        },
        {
          title: 'Red flags',
          rows: [r('Blood-stained mucus on one side', 'No'), r('Swelling around the eye, double vision, reduced vision', 'No'), r('Severe headache with fever', 'No')],
        },
        {
          title: 'Medical history',
          rows: [
            r('Previous treatment', 'Nasonex for 6 months (not always daily), nasal rinses, 2 courses of antibiotics, 1 course of Medrol: smell came back for two weeks'),
            r('Imaging', 'CT of the sinuses, external, August 2026, requested by the GP'),
            r('Asthma', 'Yes, for 3 years, on Symbicort'),
            r('Operations', 'No previous nasal surgery'),
            r('Allergies', 'Short of breath after ibuprofen. Hay fever as a child', 'surgery'),
            r('Anticoagulants', 'No'),
            r('Family history', 'Mother has asthma'),
          ],
        },
        { title: 'Social history', rows: [r('Smoking / alcohol', 'Stopped 10 years ago / 4 to 5 glasses a week')] },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Bookkeeper at an accountancy firm'),
            r('Sport and hobbies', 'Cycles at weekends with a cycling club. Enjoys cooking.'),
            r('Height / weight', '1.82 m / 88 kg'),
            r('Age', '46'),
            r('Referral', 'Via Dr Claeys, GP'),
          ],
        },
        { title: 'Impact', rows: [r('Sleep and hobbies', 'Sleeps badly, cycles shorter distances. "I can no longer smell what’s in the pan."')] },
        { title: 'Baseline', rows: [r('SNOT-22', '58 (0 to 110, lower = better)')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Has heard poorly since the winter, turns the TV up. Completed by his mother')] },
        {
          title: 'Complaints',
          rows: [r('Ear infections', '3 this year, antibiotics each time'), r('Snoring / mouth breathing', 'Yes / yes'), r('Speech', 'His teacher notices he speaks less clearly')],
        },
        { title: 'Red flags', rows: [r('Facial droop, swelling behind the ear', 'No')] },
        { title: 'General', rows: [r('Age', '4, first year of nursery school')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Recurrent throat infections')] },
        { title: 'Complaints', rows: [r('Number', '6 in the past 12 months, each with fever and antibiotics'), r('Missed', '9 days of classes and 2 days of placement')] },
        { title: 'Red flags', rows: [r('Difficulty breathing, unable to swallow', 'No')] },
        { title: 'Medical history', rows: [r('Anticoagulants', 'No')] },
        { title: 'General', rows: [r('Occupation / age', 'Nursing student / 24')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Mon nez est bouché depuis plus d’un an, des deux côtés. Et je ne sens presque plus rien.' },
      { from: 'bot', text: 'Sur 10, à combien évaluez-vous encore votre odorat ? Et à quel point votre nez est-il bouché, sur 10 ?' },
      { from: 'patient', text: 'Odorat 1, bouché 8.' },
      { from: 'bot', text: 'Avez-vous de l’asthme, ou êtes-vous essoufflé après de l’aspirine ou de l’ibuprofène ?' },
    ],
    suggestions: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    marks: { route: 'Détermine l’orientation', surgery: 'Compte pour l’intervention' },
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [
            r('Déclencheur', 'Nez bouché des deux côtés et perte de l’odorat. Adressé par le médecin traitant après un traitement sans effet durable.'),
            r('Durée', 'Obstruction 14 mois, perte de l’odorat 8 mois'),
          ],
        },
        {
          title: 'Plaintes',
          rows: [
            r('Obstruction nasale', '8/10, des deux côtés, toute l’année', 'route'),
            r('Odorat', '1/10, goût diminué aussi'),
            r('Autres', 'Mucosités dans l’arrière-gorge, pression au niveau du front et des joues, ronflements'),
            r('Sang', 'Parfois un peu de sang dans le mouchoir en se mouchant, des deux côtés, depuis l’utilisation du spray nasal'),
          ],
        },
        {
          title: 'Signaux d’alerte',
          rows: [
            r('Mucosités sanglantes d’un seul côté', 'Non'),
            r('Gonflement autour de l’œil, vision double, baisse de la vue', 'Non'),
            r('Céphalées intenses avec fièvre', 'Non'),
          ],
        },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Traitement antérieur', 'Nasonex depuis 6 mois (pas toujours quotidiennement), rinçages nasaux, 2 cures d’antibiotiques, 1 cure de Medrol : l’odorat est revenu deux semaines'),
            r('Imagerie', 'Scanner des sinus, externe, août 2026, à la demande du médecin traitant'),
            r('Asthme', 'Oui, depuis 3 ans, sous Symbicort'),
            r('Opérations', 'Aucune chirurgie nasale antérieure'),
            r('Allergies', 'Essoufflé après l’ibuprofène. Rhume des foins dans l’enfance', 'surgery'),
            r('Anticoagulants', 'Non'),
            r('Antécédents familiaux', 'Mère asthmatique'),
          ],
        },
        { title: 'Anamnèse sociale', rows: [r('Tabac / alcool', 'Arrêté il y a 10 ans / 4 à 5 verres par semaine')] },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Comptable dans une fiduciaire'),
            r('Sport et loisirs', 'Roule le week-end avec un club cyclotouriste. Aime cuisiner.'),
            r('Taille / poids', '1,82 m / 88 kg'),
            r('Âge', '46 ans'),
            r('Orientation', 'Par le Dr Claeys, médecin traitant'),
          ],
        },
        { title: 'Impact', rows: [r('Sommeil et loisirs', 'Dort mal, roule moins loin. « Je ne sens plus ce qu’il y a dans la poêle. »')] },
        { title: 'Mesure de référence', rows: [r('SNOT-22', '58 (0 à 110, plus bas = mieux)')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Entend mal depuis l’hiver, monte le son de la télé. Rempli par la mère')] },
        {
          title: 'Plaintes',
          rows: [r('Otites', '3 cette année, antibiotiques à chaque fois'), r('Ronflements / respiration buccale', 'Oui / oui'), r('Langage', 'L’institutrice remarque qu’il parle moins distinctement')],
        },
        { title: 'Signaux d’alerte', rows: [r('Bouche de travers, gonflement derrière l’oreille', 'Non')] },
        { title: 'Général', rows: [r('Âge', '4 ans, première maternelle')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Angines à répétition')] },
        { title: 'Plaintes', rows: [r('Nombre', '6 au cours des 12 derniers mois, chaque fois avec fièvre et antibiotiques'), r('Absences', '9 jours de cours et 2 jours de stage')] },
        { title: 'Signaux d’alerte', rows: [r('Détresse respiratoire, impossibilité d’avaler', 'Non')] },
        { title: 'Antécédents médicaux', rows: [r('Anticoagulants', 'Non')] },
        { title: 'Général', rows: [r('Profession / âge', 'Étudiante infirmière / 24 ans')] },
      ],
    ],
  },
};

/** The tabs follow the three subdomains; Sven's (nose & sinus) opens first. */
const INTAKE_TABS: EntSubdomain[] = ['nose', 'ear', 'throat'];
/** The open sinus sections fill in as the chat goes: section 0 after the first answer, section 1 after the second. */
const FILL_AT = [2, 4];
const MARK_ICON: Record<Mark, string> = { route: 'arrow-fork-down', surgery: 'pill' };

export function EntPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const locale = useSiteLocale();
  const steps = c.chat.length;
  const step = useSteps(steps, 900, 400);
  const [tab, setTab] = useState(0);
  const sections = c.summaries[tab];
  // Per tab: the first two sections start open; long ones stay folded, showing their marker in the header.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? i < 2;
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={8 + (step / steps) * 40}>
        {c.chat.slice(0, step).map((msg, i) => (msg.from === 'bot' ? <BotBubble key={i}>{msg.text}</BotBubble> : <PatientBubble key={i}>{msg.text}</PatientBubble>))}
        {step >= steps && <Choices options={c.suggestions} />}
      </Phone>

      <AppCard icon="chat" title={c.summary} action={<AppButton variant="subtle" icon="copy">{c.copy}</AppButton>} bodyClassName="px-4 pb-2">
        {/* One summary template per subdomain */}
        <div className="flex gap-5 border-b border-[#E8EAEC] text-[13px] -mx-4 px-4 overflow-x-auto" role="tablist">
          {INTAKE_TABS.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`py-2.5 -mb-px shrink-0 inline-flex items-center gap-1.5 border-b-2 transition-colors ${tab === i ? 'border-[#06ACC1] text-[#2A3A51] font-medium' : 'border-transparent text-[#949CB1] hover:text-[#2A3A51]'}`}
            >
              {i === 0 ? <PatientAvatar initials="SS" size={18} /> : <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ENT_SUBDOMAINS[id].text }} />}
              {ENT_SUBDOMAINS[id].label[locale]}
            </button>
          ))}
        </div>
        {sections.map((section, i) => {
          const expanded = isOpen(i);
          const known = tab !== 0 || i >= FILL_AT.length || step >= FILL_AT[i];
          const marked = section.rows.find((row) => row.mark);
          return (
            <div key={`${tab}-${section.title}`} className="py-2.5 border-b border-[#E8EAEC] last:border-0">
              <button type="button" onClick={() => toggle(i)} aria-expanded={expanded} className="w-full flex items-center gap-1.5 text-[13px] text-[#06ACC1] text-left">
                <span className={`text-[9px] transition-transform ${expanded ? '' : '-rotate-90'}`} aria-hidden="true">
                  ▼
                </span>
                {section.title}
                {!expanded && <span className="text-[#949CB1]">· {section.rows.length}</span>}
                {!expanded && marked?.mark && (
                  <span className="ml-auto">
                    <Marker icon={MARK_ICON[marked.mark]}>{c.marks[marked.mark]}</Marker>
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
                        <p key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${row.mark ? '-mx-1 px-1 pl-5 rounded-md bg-[#FFF6E8]' : ''}`}>
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
                          {row.mark && (
                            <span className="ml-1.5 align-middle">
                              <Marker icon={MARK_ICON[row.mark]}>{c.marks[row.mark]}</Marker>
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
      { from: 'patient', text: 'Hallo, mijn huisarts stuurt me door naar de NKO. Mijn neus zit al meer dan een jaar dicht en ik ruik bijna niets meer.' },
      { from: 'bot', text: 'Vervelend om te horen. Zit de verstopping aan beide kanten, en heeft u al een behandeling gehad?' },
      { from: 'patient', text: 'Aan beide kanten. Neusspray en twee keer antibiotica, maar het komt altijd terug.' },
      { from: 'bot', text: 'Heeft u bloederig slijm aan één kant, of zwelling rond uw oog?' },
      { from: 'patient', text: 'Nee, dat niet.' },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de NKO-arts voor neus en sinussen, en stuur u een korte vragenlijst om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de NKO-arts voor neus & sinus: chronische verstopping en reukverlies, geen rode vlaggen',
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
      { from: 'patient', text: 'Hello, my GP is referring me to ENT. My nose has been blocked for more than a year and I can hardly smell anything any more.' },
      { from: 'bot', text: 'I’m sorry to hear that. Is it blocked on both sides, and have you already had any treatment?' },
      { from: 'patient', text: 'Both sides. Nasal spray and antibiotics twice, but it always comes back.' },
      { from: 'bot', text: 'Do you have blood-stained mucus on one side, or swelling around your eye?' },
      { from: 'patient', text: 'No, not that.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the ENT surgeon for nose and sinuses, and send you a short questionnaire to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the nose and sinus ENT surgeon: chronic blockage and loss of smell, no red flags',
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
      { from: 'patient', text: 'Bonjour, mon médecin traitant m’envoie chez l’ORL. Mon nez est bouché depuis plus d’un an et je ne sens presque plus rien.' },
      { from: 'bot', text: 'Je suis désolé de l’entendre. Le nez est-il bouché des deux côtés, et avez-vous déjà reçu un traitement ?' },
      { from: 'patient', text: 'Des deux côtés. Un spray nasal et deux fois des antibiotiques, mais ça revient toujours.' },
      { from: 'bot', text: 'Avez-vous des mucosités sanglantes d’un seul côté, ou un gonflement autour de l’œil ?' },
      { from: 'patient', text: 'Non, pas ça.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez l’ORL spécialisé nez et sinus, et je vous envoie un court questionnaire pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez l’ORL nez & sinus : obstruction chronique et perte de l’odorat, aucun signal d’alerte',
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

export function EntVoiceDemo() {
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
            <span className="block text-sm font-semibold">+32 4•• •• 21 43</span>
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
              <span className="flex flex-col items-start gap-1.5">
                <span>{c.task}</span>
                <SubdomainChip id="nose" />
              </span>
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
                <PatientAvatar initials="SS" size={18} />
                S. Septum
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
/* 5 · Scribe: endoscopy and CT, an ENT note                           */
/* ------------------------------------------------------------------ */

const SCRIBE = {
  nl: {
    back: 'Terug',
    consultation: 'Consultatie',
    template: 'NKO',
    templates: ['Oor', 'Neus & sinus', 'Keel & stem'],
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
      { who: 'doctor', text: 'Ik kijk even met de camera in uw neus. Dat kriebelt wat, maar het doet geen pijn.' },
      { who: 'patient', text: 'Oké.' },
      { who: 'doctor', text: 'Ik zie aan beide kanten poliepen, tot onder de middelste neusschelp. Daarom zit uw neus dicht en ruikt u niets.' },
      { who: 'patient', text: 'Kan dat weg?' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Neusverstopping beiderzijds sinds 14 maanden, reukverlies sinds 8 maanden. Verwezen door dr. Claeys. Postnasale drip, drukgevoel frontaal en maxillair, snurken. Nasonex sinds 6 maanden, neusspoelingen, 2 antibioticakuren en 1 kuur Medrol met tijdelijk effect. Astma sinds 3 jaar (Symbicort). Kortademig na ibuprofen. Geen bloedverdunners. Geen eenzijdige klachten, geen zwelling rond het oog. SNOT-22: 58.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Rhinoscopie anterior: poliepen zichtbaar beiderzijds, septum licht naar links, niet obstructief. Nasale endoscopie: bilaterale neuspoliepen tot onder de onderrand van de middelste neusschelp (Nasal Polyp Score 3 + 3), helder slijm, geen pus. Otoscopie beiderzijds normaal. Mond en keel normaal. Geen palpabele halsklieren.',
        clamp: true,
      },
      {
        title: 'Medische beeldvorming',
        text: 'CT sinussen (extern, augustus 2026): opacificatie van de ethmoïdcellen en maxillaire sinussen beiderzijds, frontale sinussen gedeeltelijk. Lund-Mackay 16/24. Geen botdestructie.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Chronische rhinosinusitis met neuspoliepen, bilateraal. Astma. NSAID-intolerantie.', clamp: false },
      {
        title: 'Beleid',
        text: 'Onvoldoende effect van maximale medicamenteuze behandeling. Voorstel functionele endoscopische sinuschirurgie (FESS) bilateraal, uitgelegd en aanvaard. Nasonex en neusspoelingen verder, ook na de ingreep. Pijnstilling na de ingreep zonder NSAID’s. Bij terugkeer van de poliepen: biologische behandeling bespreken. Vangnet: dringend contact bij een bloedneus die niet stopt, zwelling rond het oog, minder zicht, helder vocht uit de neus of hevige hoofdpijn met koorts. Opvolging met SNOT-22 en reukscore.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Geboortedatum', '14-03-1980'],
      ['Vragenlijst', 'Chronische sinusitis'],
      ['Taal', 'Nederlands'],
    ],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'ENT',
    templates: ['Ear', 'Nose & sinus', 'Throat & voice'],
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
      { who: 'doctor', text: 'I’m just going to look inside your nose with the camera. It tickles a little, but it doesn’t hurt.' },
      { who: 'patient', text: 'Okay.' },
      { who: 'doctor', text: 'I can see polyps on both sides, reaching below the middle turbinate. That’s why your nose is blocked and you can’t smell anything.' },
      { who: 'patient', text: 'Can they be removed?' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Bilateral nasal obstruction for 14 months, loss of smell for 8 months. Referred by Dr Claeys. Postnasal drip, frontal and maxillary pressure, snoring. Nasonex for 6 months, nasal rinses, 2 courses of antibiotics and 1 course of Medrol with temporary effect. Asthma for 3 years (Symbicort). Short of breath after ibuprofen. No anticoagulants. No unilateral symptoms, no periorbital swelling. SNOT-22: 58.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Anterior rhinoscopy: polyps visible bilaterally, septum slightly deviated to the left, not obstructive. Nasal endoscopy: bilateral nasal polyps extending below the lower edge of the middle turbinate (Nasal Polyp Score 3 + 3), clear mucus, no pus. Otoscopy normal bilaterally. Mouth and throat normal. No palpable cervical lymph nodes.',
        clamp: true,
      },
      {
        title: 'Medical imaging',
        text: 'CT of the sinuses (external, August 2026): opacification of the ethmoid cells and maxillary sinuses bilaterally, frontal sinuses partially. Lund-Mackay 16/24. No bone destruction.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Chronic rhinosinusitis with nasal polyps, bilateral. Asthma. NSAID intolerance.', clamp: false },
      {
        title: 'Plan',
        text: 'Insufficient effect of maximal medical therapy. Bilateral functional endoscopic sinus surgery (FESS) proposed, explained and accepted. Continue Nasonex and nasal rinses, also after surgery. Post-operative pain relief without NSAIDs. If the polyps recur: discuss biological treatment. Safety net: urgent contact for a nosebleed that will not stop, swelling around the eye, reduced vision, clear fluid from the nose or severe headache with fever. Follow-up with SNOT-22 and smell score.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date of birth', '14-03-1980'],
      ['Questionnaire', 'Chronic sinusitis'],
      ['Language', 'English'],
    ],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'ORL',
    templates: ['Oreille', 'Nez & sinus', 'Gorge & voix'],
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
      { who: 'doctor', text: 'Je regarde un instant dans votre nez avec la caméra. Ça chatouille un peu, mais ça ne fait pas mal.' },
      { who: 'patient', text: 'D’accord.' },
      { who: 'doctor', text: 'Je vois des polypes des deux côtés, jusque sous le cornet moyen. C’est pour ça que votre nez est bouché et que vous ne sentez rien.' },
      { who: 'patient', text: 'On peut les enlever ?' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Obstruction nasale bilatérale depuis 14 mois, perte de l’odorat depuis 8 mois. Adressé par le Dr Claeys. Rhinorrhée postérieure, pression frontale et maxillaire, ronflements. Nasonex depuis 6 mois, rinçages nasaux, 2 cures d’antibiotiques et 1 cure de Medrol avec effet temporaire. Asthme depuis 3 ans (Symbicort). Essoufflé après l’ibuprofène. Pas d’anticoagulants. Pas de plaintes unilatérales, pas de gonflement périorbitaire. SNOT-22 : 58.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Rhinoscopie antérieure : polypes visibles des deux côtés, septum légèrement dévié vers la gauche, non obstructif. Endoscopie nasale : polypes nasaux bilatéraux dépassant le bord inférieur du cornet moyen (Nasal Polyp Score 3 + 3), mucus clair, pas de pus. Otoscopie normale des deux côtés. Bouche et gorge normales. Pas d’adénopathies cervicales palpables.',
        clamp: true,
      },
      {
        title: 'Imagerie médicale',
        text: 'Scanner des sinus (externe, août 2026) : opacification des cellules ethmoïdales et des sinus maxillaires des deux côtés, sinus frontaux partiellement. Lund-Mackay 16/24. Pas de lyse osseuse.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Rhinosinusite chronique avec polypes nasaux, bilatérale. Asthme. Intolérance aux AINS.', clamp: false },
      {
        title: 'Plan',
        text: 'Effet insuffisant d’un traitement médical maximal. Chirurgie endoscopique fonctionnelle des sinus (FESS) bilatérale proposée, expliquée et acceptée. Poursuite du Nasonex et des rinçages nasaux, y compris après l’intervention. Antalgie postopératoire sans AINS. En cas de récidive des polypes : discuter d’un traitement biologique. Filet de sécurité : contact urgent en cas de saignement de nez qui ne s’arrête pas, de gonflement autour de l’œil, de baisse de la vue, d’écoulement clair par le nez ou de céphalées intenses avec fièvre. Suivi par SNOT-22 et score d’odorat.',
        clamp: false,
      },
    ],
    patientCard: [
      ['Date de naissance', '14-03-1980'],
      ['Questionnaire', 'Sinusite chronique'],
      ['Langue', 'Français'],
    ],
  },
};

export function EntScribeDemo() {
  const c = useLocalized(SCRIBE);
  // 1–4 transcript lines while recording, 5 recording stops + generating, 6 note ready
  const step = useSteps(6, 1000, 500);
  const recording = step < 5;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<SvenTitle back={c.back} />}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <AppCard
          icon="microphone"
          title={c.consultation}
          bodyClassName="p-4 flex flex-col gap-3"
          action={
            <span className="hidden md:flex items-center gap-1.5">
              <TemplatePicker label={c.template} options={c.templates} selected={1} />
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

        <AppCard icon="user" title="Sven Septum" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: his photo, and the allergy tablet he forgot        */
/* ------------------------------------------------------------------ */

const MEDICATION = medicationCopy({
  nl: {
    found: 'Dank u, ik herken 3 geneesmiddelen:',
    confirm: 'Ja. De Aerius was ik vergeten, die neem ik alleen in de lente.',
    meds: [
      { name: 'Nasonex', strength: '50 µg', substance: 'Mometasonfuroaat', frequency: '2 sprays per neusgat, 1× per dag', indication: 'Neuspoliepen' },
      { name: 'Symbicort', strength: '200/6 µg', substance: 'Budesonide + formoterol', frequency: '1 inhalatie, 2× per dag', indication: 'Astma' },
      { name: 'Aerius', strength: '5 mg', substance: 'Desloratadine', frequency: '1× per dag, in het voorjaar', indication: 'Hooikoorts', tag: { label: 'Zelf vergeten', tone: 'amber' } },
    ],
  },
  en: {
    found: 'Thank you, I recognise 3 medicines:',
    confirm: 'Yes. I’d forgotten the Aerius, I only take it in spring.',
    meds: [
      { name: 'Nasonex', strength: '50 µg', substance: 'Mometasone furoate', frequency: '2 sprays per nostril, once a day', indication: 'Nasal polyps' },
      { name: 'Symbicort', strength: '200/6 µg', substance: 'Budesonide + formoterol', frequency: '1 inhalation, twice a day', indication: 'Asthma' },
      { name: 'Aerius', strength: '5 mg', substance: 'Desloratadine', frequency: 'Once a day, in spring', indication: 'Hay fever', tag: { label: 'Forgotten', tone: 'amber' } },
    ],
  },
  fr: {
    found: 'Merci, je reconnais 3 médicaments :',
    confirm: 'Oui. J’avais oublié l’Aerius, je ne le prends qu’au printemps.',
    meds: [
      { name: 'Nasonex', strength: '50 µg', substance: 'Furoate de mométasone', frequency: '2 pulvérisations par narine, 1× par jour', indication: 'Polypes nasaux' },
      { name: 'Symbicort', strength: '200/6 µg', substance: 'Budésonide + formotérol', frequency: '1 inhalation, 2× par jour', indication: 'Asthme' },
      { name: 'Aerius', strength: '5 mg', substance: 'Desloratadine', frequency: '1× par jour, au printemps', indication: 'Rhume des foins', tag: { label: 'Oublié', tone: 'amber' } },
    ],
  },
});

export function EntMedicationDemo() {
  return <MedicationChatDemo copy={MEDICATION} patient={{ name: 'Sven Septum', initials: 'SS', dob: '14-03-1980', color: SVEN }} />;
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: report, surgical proposal and GP letter ready        */
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
      { label: 'Consultatieverslag', description: 'Sjabloon NKO, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Operatievoorstel FESS', description: 'Ingreep, opnameaanvraag, astma en NSAID-intolerantie vermeld' },
      { label: 'Uitleg voor de patiënt', description: 'Nazorg na de sinusoperatie en wanneer dringend bellen' },
      { label: 'Attest arbeidsongeschiktheid', description: '1 week na de ingreep' },
    ],
    previews: [
      'Diagnose: chronische rhinosinusitis met neuspoliepen, bilateraal. Astma. NSAID-intolerantie. Beleid: FESS bilateraal, Nasonex en neusspoelingen verder, pijnstilling zonder NSAID’s.',
      'Geachte collega, ik zag uw patiënt de heer Septum voor een verstopte neus en reukverlies, ondanks medicamenteuze behandeling. De endoscopie toont bilaterale neuspoliepen, de CT een uitgebreide sinusitis. We stellen een functionele endoscopische sinuschirurgie voor.',
      'Functionele endoscopische sinuschirurgie (FESS) bilateraal, met opnameaanvraag. Aandachtspunten: astma onder Symbicort, NSAID-intolerantie, geen bloedverdunners.',
      'Na de operatie is uw neus enkele dagen verstopt. Spoel uw neus zoals afgesproken. Bel ons meteen bij een bloedneus die niet stopt, zwelling rond het oog of minder zicht.',
      'Arbeidsongeschikt gedurende 1 week na de ingreep.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënt Sven Septum, geboren op 14 maart 1980, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Verwezen wegens chronische neusverstopping en reukverlies, ondanks medicamenteuze behandeling.'],
        [
          'Anamnese',
          'Verstopte neus beiderzijds sinds 14 maanden, reukverlies sinds 8 maanden. Postnasale drip, drukgevoel ter hoogte van voorhoofd en wangen, snurken. Nasonex sinds 6 maanden, neusspoelingen, twee antibioticakuren en één kuur Medrol, met telkens slechts tijdelijk effect. Astma sinds drie jaar, onder Symbicort. Aerius in het voorjaar. Kortademig na ibuprofen. Geen bloedverdunners. Gestopt met roken tien jaar geleden. SNOT-22 bij aanmelding: 58.',
        ],
        [
          'Klinisch onderzoek',
          'Rhinoscopie anterior: poliepen zichtbaar beiderzijds, septum licht naar links, niet obstructief. Nasale endoscopie: bilaterale neuspoliepen tot onder de onderrand van de middelste neusschelp (Nasal Polyp Score 3 + 3), helder slijm, geen pus. Otoscopie, mond en keel normaal. Geen halsklieren.',
        ],
        [
          'Aanvullende onderzoeken',
          'CT sinussen (extern, augustus 2026): opacificatie van de ethmoïdcellen en maxillaire sinussen beiderzijds, frontale sinussen gedeeltelijk. Lund-Mackay 16/24. Geen botdestructie.',
        ],
        ['Diagnose', 'Chronische rhinosinusitis met neuspoliepen, bilateraal. Astma. NSAID-intolerantie.'],
        [
          'Beleid',
          'Gezien het onvoldoende effect van de medicamenteuze behandeling stellen wij een functionele endoscopische sinuschirurgie (FESS) bilateraal voor. Nasonex en neusspoelingen lopen verder, ook na de ingreep. Pijnstilling na de ingreep zonder NSAID’s. Bij terugkeer van de poliepen bespreken wij een biologische behandeling. Sven weet dat hij dringend contact moet opnemen bij een bloedneus die niet stopt, zwelling rond het oog, minder zicht, helder vocht uit de neus of hevige hoofdpijn met koorts. De opvolging gebeurt met de SNOT-22 en een reukscore.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, NKO-arts',
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
      { label: 'Consultation report', description: 'ENT template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Surgical proposal FESS', description: 'Procedure, admission request, asthma and NSAID intolerance noted' },
      { label: 'Explanation for the patient', description: 'Aftercare after sinus surgery and when to call urgently' },
      { label: 'Certificate of incapacity for work', description: '1 week after surgery' },
    ],
    previews: [
      'Diagnosis: chronic rhinosinusitis with nasal polyps, bilateral. Asthma. NSAID intolerance. Plan: bilateral FESS, continue Nasonex and nasal rinses, pain relief without NSAIDs.',
      'Dear colleague, I saw your patient Mr Septum for a blocked nose and loss of smell, despite medical treatment. Endoscopy shows bilateral nasal polyps, the CT extensive sinusitis. We are proposing functional endoscopic sinus surgery.',
      'Bilateral functional endoscopic sinus surgery (FESS), with admission request. Points of attention: asthma on Symbicort, NSAID intolerance, no anticoagulants.',
      'After the operation your nose will be blocked for a few days. Rinse your nose as agreed. Call us straight away for a nosebleed that will not stop, swelling around the eye or reduced vision.',
      'Unfit for work for 1 week after surgery.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Sven Septum, born on 14 March 1980, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Referred for chronic nasal obstruction and loss of smell, despite medical treatment.'],
        [
          'History',
          'Nose blocked on both sides for 14 months, loss of smell for 8 months. Postnasal drip, pressure over the forehead and cheeks, snoring. Nasonex for 6 months, nasal rinses, two courses of antibiotics and one course of Medrol, each with only temporary effect. Asthma for three years, on Symbicort. Aerius in spring. Short of breath after ibuprofen. No anticoagulants. Stopped smoking ten years ago. SNOT-22 at referral: 58.',
        ],
        [
          'Clinical examination',
          'Anterior rhinoscopy: polyps visible bilaterally, septum slightly deviated to the left, not obstructive. Nasal endoscopy: bilateral nasal polyps extending below the lower edge of the middle turbinate (Nasal Polyp Score 3 + 3), clear mucus, no pus. Otoscopy, mouth and throat normal. No cervical lymph nodes.',
        ],
        [
          'Further investigations',
          'CT of the sinuses (external, August 2026): opacification of the ethmoid cells and maxillary sinuses bilaterally, frontal sinuses partially. Lund-Mackay 16/24. No bone destruction.',
        ],
        ['Diagnosis', 'Chronic rhinosinusitis with nasal polyps, bilateral. Asthma. NSAID intolerance.'],
        [
          'Plan',
          'Given the insufficient effect of medical treatment, we are proposing bilateral functional endoscopic sinus surgery (FESS). Nasonex and nasal rinses continue, also after surgery. Post-operative pain relief without NSAIDs. If the polyps recur, we will discuss biological treatment. Sven knows to get in touch urgently for a nosebleed that will not stop, swelling around the eye, reduced vision, clear fluid from the nose or severe headache with fever. Follow-up is with the SNOT-22 and a smell score.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, ENT surgeon',
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
      { label: 'Rapport de consultation', description: 'Modèle ORL, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Proposition opératoire FESS', description: 'Intervention, demande d’hospitalisation, asthme et intolérance aux AINS mentionnés' },
      { label: 'Explication pour le patient', description: 'Soins après la chirurgie des sinus et quand appeler en urgence' },
      { label: 'Certificat d’incapacité de travail', description: '1 semaine après l’intervention' },
    ],
    previews: [
      'Diagnostic : rhinosinusite chronique avec polypes nasaux, bilatérale. Asthme. Intolérance aux AINS. Plan : FESS bilatérale, poursuite du Nasonex et des rinçages nasaux, antalgie sans AINS.',
      'Cher confrère, j’ai vu votre patient M. Septum pour un nez bouché et une perte de l’odorat, malgré un traitement médical. L’endoscopie montre des polypes nasaux bilatéraux, le scanner une sinusite étendue. Nous proposons une chirurgie endoscopique fonctionnelle des sinus.',
      'Chirurgie endoscopique fonctionnelle des sinus (FESS) bilatérale, avec demande d’hospitalisation. Points d’attention : asthme sous Symbicort, intolérance aux AINS, pas d’anticoagulants.',
      'Après l’opération, votre nez sera bouché pendant quelques jours. Rincez-vous le nez comme convenu. Appelez-nous immédiatement en cas de saignement de nez qui ne s’arrête pas, de gonflement autour de l’œil ou de baisse de la vue.',
      'Incapacité de travail d’une semaine après l’intervention.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patient Sven Septum, né le 14 mars 1980, que j’ai vu récemment en consultation.',
      sections: [
        ['Motif du contact', 'Adressé pour une obstruction nasale chronique et une perte de l’odorat, malgré un traitement médical.'],
        [
          'Anamnèse',
          'Nez bouché des deux côtés depuis 14 mois, perte de l’odorat depuis 8 mois. Rhinorrhée postérieure, pression au niveau du front et des joues, ronflements. Nasonex depuis 6 mois, rinçages nasaux, deux cures d’antibiotiques et une cure de Medrol, chaque fois avec un effet seulement temporaire. Asthme depuis trois ans, sous Symbicort. Aerius au printemps. Essoufflé après l’ibuprofène. Pas d’anticoagulants. A arrêté de fumer il y a dix ans. SNOT-22 à l’inscription : 58.',
        ],
        [
          'Examen clinique',
          'Rhinoscopie antérieure : polypes visibles des deux côtés, septum légèrement dévié vers la gauche, non obstructif. Endoscopie nasale : polypes nasaux bilatéraux dépassant le bord inférieur du cornet moyen (Nasal Polyp Score 3 + 3), mucus clair, pas de pus. Otoscopie, bouche et gorge normales. Pas d’adénopathies cervicales.',
        ],
        [
          'Examens complémentaires',
          'Scanner des sinus (externe, août 2026) : opacification des cellules ethmoïdales et des sinus maxillaires des deux côtés, sinus frontaux partiellement. Lund-Mackay 16/24. Pas de lyse osseuse.',
        ],
        ['Diagnostic', 'Rhinosinusite chronique avec polypes nasaux, bilatérale. Asthme. Intolérance aux AINS.'],
        [
          'Plan',
          'Vu l’effet insuffisant du traitement médical, nous proposons une chirurgie endoscopique fonctionnelle des sinus (FESS) bilatérale. Le Nasonex et les rinçages nasaux se poursuivent, y compris après l’intervention. Antalgie postopératoire sans AINS. En cas de récidive des polypes, nous discuterons d’un traitement biologique. Sven sait qu’il doit nous contacter en urgence en cas de saignement de nez qui ne s’arrête pas, de gonflement autour de l’œil, de baisse de la vue, d’écoulement clair par le nez ou de céphalées intenses avec fièvre. Le suivi se fait par le SNOT-22 et un score d’odorat.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, ORL',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function EntDocumentDemo() {
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

  // Report, surgical proposal and GP letter generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const queued = [setTimeout(() => generate(0), 900), setTimeout(() => generate(2), 2100), setTimeout(() => generate(LETTER), 3300)];
    return () => {
      queued.forEach(clearTimeout);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<SvenTitle />}>
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
/* 8 · Follow-up: E. Ethmoid raises an alert, Sven breathes again      */
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
      ['E. Ethmoid', 'FESS · dag 2'],
      ['S. Septum', 'FESS · week 6 · SNOT-22 ingevuld'],
      ['M. Malleus', 'Trommelvliesbuisjes · maand 3 · OM-6 ingevuld door moeder'],
      ['T. Tonsil', 'Tonsillectomie · week 2'],
    ],
    alert: 'Meldt een bloedneus die na 20 minuten niet stopt, twee dagen na de FESS. Kreeg het advies naar de spoed te gaan. Neem contact op.',
    detail: 'S. Septum · FESS',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'Hoe gaat het met uw neus sinds de ingreep?' },
      { from: 'patient', text: 'Ik adem weer door mijn neus, ook ’s nachts. Mijn vrouw zegt dat ik minder snurk.' },
      { from: 'bot', text: 'Fijn om te horen. En uw reuk?' },
      { from: 'patient', text: 'Die komt terug. Gisteren rook ik de uien in de pan.' },
      { from: 'bot', text: 'Heeft u nog bloedneuzen gehad, zwelling rond uw ogen of last van uw zicht?' },
      { from: 'patient', text: 'Nee, niets van dat.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lager = beter',
    higherBetter: 'hoger = beter',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Voorbeelddata',
    measures: ['SNOT-22', 'Reuk', 'Neusverstopping'],
    life: [
      ['Slaap', 'Slecht, snurkt', 'Beter'],
      ['Werk', 'Volledig, vermoeid', 'Volledig (1 week thuis na de ingreep)'],
      ['Hobby', 'Fietst minder, ruikt niet bij het koken', 'Fietst weer, ruikt deels'],
    ],
    plans: 'Vragenlijsten per behandeling',
    plansIntro: 'De opvolging volgt de behandeling die u kiest. Komen de poliepen terug en start een biologische behandeling, dan schakelt de opvolging mee.',
    plansNote:
      'Elke vragenlijst gaat opnieuw de rode vlaggen na. Voor de andere subdomeinen staan eigen vragenlijsten klaar, bv. OM-6 na trommelvliesbuisjes (ingevuld door de ouder) en een controle op nabloeding na een tonsillectomie.',
    completed: 'Ingevuld',
    treatments: [
      {
        name: 'Conservatief',
        items: [
          { moment: 'Maand 3', name: 'Opvolging chronische sinusitis', asks: 'SNOT-22, reuk, gebruik neusspray, antibioticakuren, slaap, open vragen, rode vlaggen' },
          { moment: 'Maand 12', name: 'Opvolging + welzijn', asks: 'Idem, aangevuld met EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'FESS',
        sven: true,
        items: [
          { moment: 'Dag 2', name: 'Controle na sinuschirurgie', asks: 'Bloedneus, pijn, koorts, zwelling rond het oog, zicht, helder vocht uit de neus, lukt het spoelen' },
          { moment: 'Week 6', name: 'Herstel na FESS', asks: 'SNOT-22, reuk, neusademhaling, slaap, werkhervatting, open vragen', current: true },
          { moment: 'Maand 3 en 12', name: 'Uitkomst na FESS', asks: 'SNOT-22, reuk, EQ-5D-5L, gebruik neusspray, tevredenheid, PREM' },
        ] as Questionnaire[],
      },
      {
        name: 'Biologische behandeling (bij terugkeer)',
        items: [{ moment: 'Maand 3 en 6 na de start', name: 'Effect biologische behandeling', asks: 'SNOT-22, reuk, astmaklachten, bijwerkingen, open vragen' }] as Questionnaire[],
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
      ['E. Ethmoid', 'FESS · day 2'],
      ['S. Septum', 'FESS · week 6 · SNOT-22 completed'],
      ['M. Malleus', 'Grommets · month 3 · OM-6 completed by his mother'],
      ['T. Tonsil', 'Tonsillectomy · week 2'],
    ],
    alert: 'Reports a nosebleed that has not stopped after 20 minutes, two days after the FESS. Advised to go to A&E. Please get in touch.',
    detail: 'S. Septum · FESS',
    checkin: 'Check-in week 6',
    chat: [
      { from: 'bot', text: 'How has your nose been since the operation?' },
      { from: 'patient', text: 'I can breathe through my nose again, at night too. My wife says I snore less.' },
      { from: 'bot', text: 'Good to hear. And your sense of smell?' },
      { from: 'patient', text: 'It’s coming back. Yesterday I could smell the onions in the pan.' },
      { from: 'bot', text: 'Have you had any more nosebleeds, swelling around your eyes or trouble with your vision?' },
      { from: 'patient', text: 'No, none of that.' },
    ],
    scores: 'Scores',
    lowerBetter: 'lower = better',
    higherBetter: 'higher = better',
    baseline: 'Baseline',
    week6: 'Week 6',
    exampleData: 'Example data',
    measures: ['SNOT-22', 'Smell', 'Nasal obstruction'],
    life: [
      ['Sleep', 'Poor, snores', 'Better'],
      ['Work', 'Full-time, tired', 'Full-time (1 week off after surgery)'],
      ['Hobbies', 'Cycles less, can’t smell when cooking', 'Cycling again, smells partly'],
    ],
    plans: 'Questionnaires per treatment',
    plansIntro: 'Follow-up follows the treatment you choose. If the polyps come back and biological treatment starts, the follow-up switches with it.',
    plansNote:
      'Every questionnaire checks the red flags again. The other subdomains have their own questionnaires ready, e.g. OM-6 after grommets (completed by the parent) and a check for bleeding after a tonsillectomy.',
    completed: 'Completed',
    treatments: [
      {
        name: 'Conservative',
        items: [
          { moment: 'Month 3', name: 'Chronic sinusitis follow-up', asks: 'SNOT-22, smell, nasal spray use, courses of antibiotics, sleep, open questions, red flags' },
          { moment: 'Month 12', name: 'Follow-up + wellbeing', asks: 'As above, plus EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'FESS',
        sven: true,
        items: [
          { moment: 'Day 2', name: 'Check after sinus surgery', asks: 'Nosebleed, pain, fever, swelling around the eye, vision, clear fluid from the nose, managing the rinses' },
          { moment: 'Week 6', name: 'Recovery after FESS', asks: 'SNOT-22, smell, nasal breathing, sleep, return to work, open questions', current: true },
          { moment: 'Months 3 and 12', name: 'Outcome after FESS', asks: 'SNOT-22, smell, EQ-5D-5L, nasal spray use, satisfaction, PREM' },
        ] as Questionnaire[],
      },
      {
        name: 'Biological treatment (if recurrent)',
        items: [{ moment: 'Months 3 and 6 after starting', name: 'Effect of biological treatment', asks: 'SNOT-22, smell, asthma symptoms, side effects, open questions' }] as Questionnaire[],
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
      ['E. Ethmoid', 'FESS · jour 2'],
      ['S. Septum', 'FESS · semaine 6 · SNOT-22 rempli'],
      ['M. Malleus', 'Aérateurs transtympaniques · mois 3 · OM-6 rempli par sa mère'],
      ['T. Tonsil', 'Amygdalectomie · semaine 2'],
    ],
    alert: 'Signale un saignement de nez qui ne s’arrête pas après 20 minutes, deux jours après la FESS. A reçu le conseil d’aller aux urgences. Prenez contact.',
    detail: 'S. Septum · FESS',
    checkin: 'Suivi semaine 6',
    chat: [
      { from: 'bot', text: 'Comment va votre nez depuis l’intervention ?' },
      { from: 'patient', text: 'Je respire de nouveau par le nez, la nuit aussi. Ma femme dit que je ronfle moins.' },
      { from: 'bot', text: 'Ravi de l’entendre. Et votre odorat ?' },
      { from: 'patient', text: 'Il revient. Hier, j’ai senti les oignons dans la poêle.' },
      { from: 'bot', text: 'Avez-vous encore eu des saignements de nez, un gonflement autour des yeux ou des troubles de la vue ?' },
      { from: 'patient', text: 'Non, rien de tout ça.' },
    ],
    scores: 'Scores',
    lowerBetter: 'plus bas = mieux',
    higherBetter: 'plus haut = mieux',
    baseline: 'Référence',
    week6: 'Semaine 6',
    exampleData: 'Données d’exemple',
    measures: ['SNOT-22', 'Odorat', 'Obstruction nasale'],
    life: [
      ['Sommeil', 'Mauvais, ronfle', 'Meilleur'],
      ['Travail', 'À temps plein, fatigué', 'À temps plein (1 semaine à la maison après l’intervention)'],
      ['Loisirs', 'Roule moins, ne sent rien en cuisinant', 'Roule de nouveau, sent en partie'],
    ],
    plans: 'Questionnaires par traitement',
    plansIntro: 'Le suivi s’adapte au traitement que vous choisissez. Si les polypes récidivent et qu’un traitement biologique débute, le suivi change avec lui.',
    plansNote:
      'Chaque questionnaire revérifie les signaux d’alerte. Les autres sous-domaines ont leurs propres questionnaires, p. ex. l’OM-6 après des aérateurs transtympaniques (rempli par le parent) et un contrôle de saignement après une amygdalectomie.',
    completed: 'Rempli',
    treatments: [
      {
        name: 'Conservateur',
        items: [
          { moment: 'Mois 3', name: 'Suivi sinusite chronique', asks: 'SNOT-22, odorat, utilisation du spray nasal, cures d’antibiotiques, sommeil, questions ouvertes, signaux d’alerte' },
          { moment: 'Mois 12', name: 'Suivi + bien-être', asks: 'Idem, complété par l’EQ-5D-5L' },
        ] as Questionnaire[],
      },
      {
        name: 'FESS',
        sven: true,
        items: [
          {
            moment: 'Jour 2',
            name: 'Contrôle après chirurgie des sinus',
            asks: 'Saignement de nez, douleur, fièvre, gonflement autour de l’œil, vue, écoulement clair par le nez, rinçages possibles',
          },
          { moment: 'Semaine 6', name: 'Convalescence après FESS', asks: 'SNOT-22, odorat, respiration nasale, sommeil, reprise du travail, questions ouvertes', current: true },
          { moment: 'Mois 3 et 12', name: 'Résultat après FESS', asks: 'SNOT-22, odorat, EQ-5D-5L, utilisation du spray nasal, satisfaction, PREM' },
        ] as Questionnaire[],
      },
      {
        name: 'Traitement biologique (en cas de récidive)',
        items: [{ moment: 'Mois 3 et 6 après le début', name: 'Effet du traitement biologique', asks: 'SNOT-22, odorat, symptômes d’asthme, effets secondaires, questions ouvertes' }] as Questionnaire[],
      },
    ],
  },
};

const FOLLOW_ROWS = [
  { initials: 'EE', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'SS', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'MM', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'TT', flag: false, date: '23-09-2026, 09:30' },
];
// Baseline → week 6 (sales' example data). The bar is value / max: for SNOT-22 and obstruction a shorter bar is progress, for smell a longer one.
const SCORES: { max: number; values: [number, number]; better: 'lower' | 'higher' }[] = [
  { max: 110, values: [58, 31], better: 'lower' },
  { max: 10, values: [1, 5], better: 'higher' },
  { max: 10, values: [8, 3], better: 'lower' },
];
const SVEN_ROW = 1;

export function EntFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 E. Ethmoid's alert, 6 Sven's recovery opens
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
              const sven = row.i === SVEN_ROW;
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
                      <span className="truncate">
                        {row.copy[1]} · {row.date}
                      </span>
                    </span>
                  </span>
                </>
              );
              return (
                <motion.div key={row.i} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                  {sven ? (
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
                    <b>E. Ethmoid</b> · {c.alert}
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
                    <PatientAvatar initials="SS" size={20} />
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

                {/* Scores: baseline in grey, week 6 in Sven's colour; each bar says which way is better */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">{c.scores}</p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.baseline}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: SVEN }} />
                        {c.week6}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.measures.map((label, i) => {
                      const { max, values, better } = SCORES[i];
                      const [before, after] = values;
                      return (
                        <div key={label}>
                          <p className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 text-[11px] mb-1">
                            <span className="inline-flex flex-wrap items-center gap-1.5">
                              {label} <span className="text-[#949CB1]">· 0–{max}</span>
                              <span className="inline-flex items-center rounded-full bg-[#E9FFF7] px-1.5 py-px text-[9.5px] font-semibold text-[#1F9E6E]">
                                {better === 'lower' ? `↓ ${c.lowerBetter}` : `↑ ${c.higherBetter}`}
                              </span>
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
                                style={{ backgroundColor: SVEN }}
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
                  {/* Not only numbers: sleep, work, cycling and cooking */}
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
                    <div key={treatment.name} className={`rounded-xl border px-3 py-2.5 ${'sven' in treatment ? 'border-[#4F5BD5]/30 bg-[#EEF0FD]/60' : 'border-[#E8EAEC]'}`}>
                      <p className="flex items-center gap-1.5 text-[12px] font-semibold mb-2">
                        {treatment.name}
                        {'sven' in treatment && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-[#4F5BD5]/20">
                            <PatientAvatar initials="SS" size={12} />
                            Sven
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
                <p className="mt-3 flex items-start gap-1.5 text-[11px] text-[#4E5670] leading-snug">
                  <AppIcon name="exclamation-triangle" size={11} color={APP.darkGrey} className="mt-0.5 shrink-0" />
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
