'use client';

/**
 * Module demos for the orthopaedics variant (source: sales, "Website-inhoud orthopedie", §7). Every page follows
 * Mrs Hilde Femur (67, right hip, apixaban) one step further; R. Tibia (fever after a knee replacement) is the
 * recurring red flag. Same app UI as the standard demos, only the clinical story differs.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import { Check, EASE, useLocalized, useSteps } from './shared';

/** Mrs Femur keeps one avatar colour on every page, so visitors recognise her. */
const FEMUR = '#7E5BC2';
const FEMUR_SOFT = '#F2EDFA';
/** Red flags (R. Tibia, K. Patella) share one red accent and the warning icon. */
const RED = APP.accent;
const RED_SOFT = '#FFE7ED';

function PatientAvatar({ initials, flag = false, size = 22 }: { initials: string; flag?: boolean; size?: number }) {
  const color = initials === 'HF' ? FEMUR : flag ? RED : APP.secondary;
  return <Initials text={initials} size={size} color={color} />;
}

/** Amber marker for what matters before surgery (the anticoagulant), shared by pre-consultation and medication. */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF6E8] px-2 py-0.5 text-[10px] font-semibold text-[#C2410C] ring-1 ring-[#F59E0C]/40 whitespace-nowrap">
      <AppIcon name="pill" size={10} color="#C2410C" />
      {children}
    </span>
  );
}

function FemurTitle({ back, name = 'Hilde Femur' }: { back?: string; name?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[14px]">
      <span className="text-[#06ACC1]">←{back ? ` ${back}` : ''}</span>
      <span className="inline-flex items-center gap-2 font-medium">
        <PatientAvatar initials="HF" size={24} />
        {name}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Smart Triage: every complaint to the right surgeon              */
/* ------------------------------------------------------------------ */

const TRIAGE = {
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    attentionText: 'Koorts en een warme, gezwollen knie, 3 weken na een knieprothese. Wordt eerst gezien.',
    rows: [
      { summary: 'Koorts en een warme, gezwollen knie, 3 weken na een knieprothese', referral: '' },
      { summary: 'Pijn in de rechterlies sinds 8 maanden, erger bij wandelen', referral: 'Heupchirurg' },
      { summary: 'Schouderpijn bij het heffen van de arm', referral: 'Schouderchirurg' },
      { summary: 'Vraag over afspraak', referral: '' },
    ],
  },
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    attentionText: 'Fever and a warm, swollen knee, 3 weeks after a knee replacement. Seen first.',
    rows: [
      { summary: 'Fever and a warm, swollen knee, 3 weeks after a knee replacement', referral: '' },
      { summary: 'Pain in the right groin for 8 months, worse when walking', referral: 'Hip surgeon' },
      { summary: 'Shoulder pain when raising the arm', referral: 'Shoulder surgeon' },
      { summary: 'Question about appointment', referral: '' },
    ],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    attentionText: 'Fièvre et genou chaud et gonflé, 3 semaines après une prothèse de genou. Vu en priorité.',
    rows: [
      { summary: 'Fièvre et genou chaud et gonflé, 3 semaines après une prothèse de genou', referral: '' },
      { summary: 'Douleur à l’aine droite depuis 8 mois, pire à la marche', referral: 'Chirurgien de la hanche' },
      { summary: 'Douleur à l’épaule en levant le bras', referral: 'Chirurgien de l’épaule' },
      { summary: 'Question sur un rendez-vous', referral: '' },
    ],
  },
};

const TRIAGE_ROWS: { name: string; initials: string; channel: string; tasks: number; status: ScreeningStatus; flag?: boolean }[] = [
  { name: 'R. Tibia', initials: 'RT', channel: 'phone-incoming', tasks: 1, status: 'COMPLETED', flag: true },
  { name: 'H. Femur', initials: 'HF', channel: 'phone-incoming', tasks: 0, status: 'COMPLETED' },
  { name: 'L. Deltoïd', initials: 'LD', channel: 'chat', tasks: 1, status: 'COMPLETED' },
  { name: 'K. Kruisband', initials: 'KK', channel: 'chat', tasks: 0, status: 'IN_PROGRESS' },
];

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem] gap-3';

export function OrthoTriageDemo() {
  const c = useLocalized(TRIAGE);
  // 1–4 rows arrive with their referral, 5 the red flag lights up and the attention card opens
  const step = useSteps(5, 420, 150);
  const flagged = step >= 5;

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
            <span key={h} className={i > 2 ? 'hidden md:block' : ''}>{h}</span>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {TRIAGE_ROWS.map((row, i) => {
            if (step < i + 1) return null;
            const red = row.flag && flagged;
            const copy = c.rows[i];
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
                  <span className="text-[#4E5670] truncate">{copy.summary}</span>
                  {copy.referral && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                      className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-full bg-[#EBF6F8] px-2 py-0.5 text-[10px] font-semibold text-[#0B759F]"
                    >
                      <AppIcon name="arrow-fork-down" size={10} color="#0B759F" />
                      {copy.referral}
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
                <PatientAvatar initials="RT" flag size={32} />
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold mb-1">R. Tibia</span>
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
/* 2 · Agenda: the surgeons' day, Mrs Femur prepared, Tibia first      */
/* ------------------------------------------------------------------ */

const AGENDA = {
  nl: {
    date: 'vrijdag 25 september 2026',
    appointments: 'afspraken',
    views: ['Dag', 'Week', 'Maand'],
    perRoom: 'Per ruimte',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Vragenlijst ingevuld',
    types: ['Controle na knieprothese', 'Dringend · koorts na knieprothese', 'Controle na knie-artroscopie', 'Nieuwe patiënt · heup', 'Schouderpijn', 'Wondzorg na heupprothese'],
  },
  en: {
    date: 'Friday 25 September 2026',
    appointments: 'appointments',
    views: ['Day', 'Week', 'Month'],
    perRoom: 'Per room',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire completed',
    types: ['Check-up after knee replacement', 'Urgent · fever after knee replacement', 'Check-up after knee arthroscopy', 'New patient · hip', 'Shoulder pain', 'Wound care after hip replacement'],
  },
  fr: {
    date: 'vendredi 25 septembre 2026',
    appointments: 'réservations',
    views: ['Jour', 'Semaine', 'Mois'],
    perRoom: 'Par espace',
    rooms: ['Room 1', 'Room 2', 'Room 3'],
    ready: 'Questionnaire rempli',
    types: ['Contrôle après prothèse de genou', 'Urgent · fièvre après prothèse de genou', 'Contrôle après arthroscopie du genou', 'Nouveau patient · hanche', 'Douleur à l’épaule', 'Soins de plaie après prothèse de hanche'],
  },
};

const ROOM_COLORS = ['#4A90E2', '#9B7BC8', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

type Visit = { room: number; start: number; len: number; name: string; initials: string; type: number; femur?: boolean; urgent?: boolean };

// In order of appearance; R. Tibia drops in last, from triage.
const VISITS: Visit[] = [
  { room: 0, start: 0, len: 1, name: 'S. Cruciaat', initials: 'SC', type: 0 },
  { room: 1, start: 0, len: 3, name: 'H. Femur', initials: 'HF', type: 3, femur: true },
  { room: 2, start: 1, len: 1, name: 'L. Deltoïd', initials: 'LD', type: 4 },
  { room: 0, start: 2, len: 1, name: 'K. Patella', initials: 'KP', type: 2 },
  { room: 2, start: 3, len: 1, name: 'J. Acetabulum', initials: 'JA', type: 5 },
  { room: 0, start: 1, len: 1, name: 'R. Tibia', initials: 'RT', type: 1, urgent: true },
];

function VisitBlock({ visit, label, ready, readyLabel }: { visit: Visit; label: string; ready: boolean; readyLabel: string }) {
  const accent = visit.urgent ? RED : visit.femur ? FEMUR : ROOM_COLORS[visit.room];
  const background = visit.urgent ? RED_SOFT : visit.femur ? FEMUR_SOFT : `${ROOM_COLORS[visit.room]}1A`;
  return (
    <motion.div
      initial={visit.urgent ? { opacity: 0, y: -30, scale: 0.9 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={visit.urgent ? { type: 'spring', stiffness: 180, damping: 16 } : { duration: 0.35 }}
      className="group absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{ top: visit.start * SLOT_PX + 2, height: visit.len * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
      title={visit.femur && ready ? readyLabel : undefined}
    >
      <p className="font-semibold truncate flex items-center gap-1.5">
        {visit.urgent && <AppIcon name="exclamation-triangle" size={10} color={RED} />}
        {visit.femur && <PatientAvatar initials="HF" size={16} />}
        {visit.name}
      </p>
      <p className="truncate text-[#4E5670]">{label}</p>
      {visit.femur && ready && (
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

export function OrthoAgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–5 regular visits appear, 6 the urgent visit drops into Room 1 at 09:30, 7 Mrs Femur's questionnaire tick
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
            <span key={v} className={`px-2.5 py-1 rounded-full ${i === 0 ? 'bg-[#EBF6F8]' : 'text-[#949CB1]'}`}>{v}</span>
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
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Pre-consultation: the hip chat, and summaries per complaint     */
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
      { from: 'patient', text: 'Al een maand of acht pijn in mijn rechterheup, vooral bij het wandelen en de trap op.' },
      { from: 'bot', text: 'Waar voelt u de pijn precies?' },
      { from: 'patient', text: 'Vooral in mijn lies, en soms trekt het naar de zijkant.' },
      { from: 'bot', text: 'Lukt het nog om zelf uw sokken en schoenen aan te trekken?' },
    ],
    suggestions: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    marker: 'Bloedverdunner',
    tabs: ['Heup', 'Knie', 'Schouder'],
    summaries: [
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Pijn in de rechterheup, vooral bij wandelen en traplopen. Geleidelijk begonnen, zonder val of ongeval.'), r('Duur', 'Ongeveer 8 maanden')] },
        {
          title: 'Aard van de pijn',
          rows: [r('Heup', 'Rechts'), r('Liespijn', 'Ja, zeurend, erger na het wandelen'), r('Laterale pijn', 'Nee'), r('Rugpijn', 'Nee'), r('C-sign', 'Ja, wijst de pijn aan van de lies naar de zijkant van de heup')],
        },
        {
          title: 'Wanneer heb je pijn',
          rows: [
            r('Opstaan', 'Ja, stijf bij het opstaan, beter na enkele minuten'),
            r('Slapen', 'Soms, wordt wakker bij het draaien op de rechterzij'),
            r('Uitstraling', 'Soms tot boven de knie'),
            r('Trap', 'Ja, vooral naar boven'),
            r('Auto', 'Ja, het instappen is moeilijk'),
            r('Schoenen aandoen', 'Ja, sokken en schoenen aantrekken lukt moeilijk'),
          ],
        },
        { title: 'Mobiliteit en stabiliteit', rows: [r('Mobiliteit', 'Kan ongeveer 1 kilometer wandelen'), r('Hulpmiddel', 'Nee'), r('Manken', 'Ja, na een tiental minuten wandelen')] },
        {
          title: 'Medische achtergrond',
          rows: [
            r('Operaties', 'Geen'),
            r('Eerdere behandeling', 'Kinesitherapie en paracetamol, weinig effect. Eén infiltratie in de heup, 3 maanden geleden, kort effect.'),
            r('Allergieën', 'Nee'),
            r('Bloedverdunners', 'Ja, apixaban 5 mg, 2× per dag (voorkamerfibrillatie)', true),
            r('Roken', 'Nee'),
            r('Alcohol', 'Af en toe een glas wijn in het weekend'),
            r('Familiaal', 'Moeder had heupslijtage en kreeg een heupprothese'),
          ],
        },
        {
          title: 'Algemeen',
          rows: [
            r('Beroep', 'Gepensioneerd, vroeger lerares'),
            r('Sport', 'Wandelen en zwemmen. Wandelen lukt steeds minder.'),
            r('Lengte / gewicht', '1,65 m / 72 kg'),
            r('Leeftijd', '67 jaar'),
            r('Verwijzing', 'Via de huisarts, wegens aanhoudende klachten'),
          ],
        },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Knie verdraaid tijdens het voetballen, 3 weken geleden'), r('Knie', 'Links')] },
        { title: 'Mechanische klachten', rows: [r('Slotklachten', 'Ja, de knie blokkeert soms bij het strekken'), r('Doorzakken', 'Af en toe, bij draaien'), r('Zwelling', 'Ja, na het sporten')] },
        { title: 'Sport en werk', rows: [r('Sport', 'Voetbal, 2× per week, sindsdien gestopt'), r('Beroep', 'Magazijnier')] },
        { title: 'Algemeen', rows: [r('Leeftijd', '34 jaar')] },
      ],
      [
        { title: 'Reden van consultatie', rows: [r('Aanleiding', 'Pijn in de rechterschouder bij het heffen van de arm, sinds 2 maanden'), r('Trauma', 'Nee')] },
        { title: 'Wanneer heb je pijn', rows: [r('Boven het hoofd reiken', 'Ja'), r('Liggen op de schouder', 'Ja, wordt ’s nachts wakker'), r('Kracht', 'Minder kracht bij tillen')] },
        { title: 'Voorgeschiedenis', rows: [r('Eerdere behandeling', 'Kinesitherapie, 6 sessies, weinig effect')] },
        { title: 'Werk', rows: [r('Beroep', 'Kapster, werkt veel met de armen omhoog')] },
        { title: 'Algemeen', rows: [r('Leeftijd', '52 jaar')] },
      ],
    ],
  },
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your complaints and how long you have had them?' },
      { from: 'patient', text: 'For about eight months, pain in my right hip, mostly when walking and going up stairs.' },
      { from: 'bot', text: 'Where exactly do you feel the pain?' },
      { from: 'patient', text: 'Mostly in my groin, and sometimes it pulls towards the side.' },
      { from: 'bot', text: 'Can you still put on your socks and shoes yourself?' },
    ],
    suggestions: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    marker: 'Anticoagulant',
    tabs: ['Hip', 'Knee', 'Shoulder'],
    summaries: [
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Pain in the right hip, mostly when walking and climbing stairs. Came on gradually, without a fall or accident.'), r('Duration', 'About 8 months')] },
        {
          title: 'Nature of the pain',
          rows: [r('Hip', 'Right'), r('Groin pain', 'Yes, aching, worse after walking'), r('Lateral pain', 'No'), r('Back pain', 'No'), r('C-sign', 'Yes, points to the pain from the groin to the side of the hip')],
        },
        {
          title: 'When does it hurt',
          rows: [
            r('Getting up', 'Yes, stiff when getting up, better after a few minutes'),
            r('Sleeping', 'Sometimes, wakes when turning onto the right side'),
            r('Radiation', 'Sometimes to above the knee'),
            r('Stairs', 'Yes, mostly going up'),
            r('Car', 'Yes, getting in is difficult'),
            r('Putting on shoes', 'Yes, putting on socks and shoes is difficult'),
          ],
        },
        { title: 'Mobility and stability', rows: [r('Mobility', 'Can walk about 1 kilometre'), r('Walking aid', 'No'), r('Limping', 'Yes, after about ten minutes of walking')] },
        {
          title: 'Medical history',
          rows: [
            r('Operations', 'None'),
            r('Previous treatment', 'Physiotherapy and paracetamol, little effect. One hip injection 3 months ago, short-lived effect.'),
            r('Allergies', 'No'),
            r('Anticoagulants', 'Yes, apixaban 5 mg twice daily (atrial fibrillation)', true),
            r('Smoking', 'No'),
            r('Alcohol', 'An occasional glass of wine at the weekend'),
            r('Family history', 'Mother had hip osteoarthritis and a hip replacement'),
          ],
        },
        {
          title: 'General',
          rows: [
            r('Occupation', 'Retired, former teacher'),
            r('Sport', 'Walking and swimming. Walking is getting harder.'),
            r('Height / weight', '1.65 m / 72 kg'),
            r('Age', '67'),
            r('Referral', 'Via the GP, for persistent complaints'),
          ],
        },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Twisted knee playing football, 3 weeks ago'), r('Knee', 'Left')] },
        { title: 'Mechanical symptoms', rows: [r('Locking', 'Yes, the knee sometimes locks when straightening'), r('Giving way', 'Now and then, when turning'), r('Swelling', 'Yes, after sport')] },
        { title: 'Sport and work', rows: [r('Sport', 'Football, twice a week, stopped since'), r('Occupation', 'Warehouse worker')] },
        { title: 'General', rows: [r('Age', '34')] },
      ],
      [
        { title: 'Reason for consultation', rows: [r('Cause', 'Pain in the right shoulder when raising the arm, for 2 months'), r('Trauma', 'No')] },
        { title: 'When does it hurt', rows: [r('Reaching overhead', 'Yes'), r('Lying on the shoulder', 'Yes, wakes at night'), r('Strength', 'Less strength when lifting')] },
        { title: 'History', rows: [r('Previous treatment', 'Physiotherapy, 6 sessions, little effect')] },
        { title: 'Work', rows: [r('Occupation', 'Hairdresser, works a lot with her arms raised')] },
        { title: 'General', rows: [r('Age', '52')] },
      ],
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos plaintes et depuis quand vous en souffrez ?' },
      { from: 'patient', text: 'Depuis environ huit mois, une douleur à la hanche droite, surtout en marchant et en montant les escaliers.' },
      { from: 'bot', text: 'Où ressentez-vous exactement la douleur ?' },
      { from: 'patient', text: 'Surtout dans l’aine, et parfois ça tire vers le côté.' },
      { from: 'bot', text: 'Arrivez-vous encore à mettre vous-même vos chaussettes et vos chaussures ?' },
    ],
    suggestions: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    marker: 'Anticoagulant',
    tabs: ['Hanche', 'Genou', 'Épaule'],
    summaries: [
      [
        {
          title: 'Motif de consultation',
          rows: [r('Déclencheur', 'Douleur à la hanche droite, surtout à la marche et dans les escaliers. Apparue progressivement, sans chute ni accident.'), r('Durée', 'Environ 8 mois')],
        },
        {
          title: 'Nature de la douleur',
          rows: [
            r('Hanche', 'Droite'),
            r('Douleur à l’aine', 'Oui, sourde, pire après la marche'),
            r('Douleur latérale', 'Non'),
            r('Douleur lombaire', 'Non'),
            r('C-sign', 'Oui, montre la douleur de l’aine vers le côté de la hanche'),
          ],
        },
        {
          title: 'Quand avez-vous mal',
          rows: [
            r('Au lever', 'Oui, raide au lever, mieux après quelques minutes'),
            r('Sommeil', 'Parfois, se réveille en se tournant sur le côté droit'),
            r('Irradiation', 'Parfois jusqu’au-dessus du genou'),
            r('Escaliers', 'Oui, surtout en montant'),
            r('Voiture', 'Oui, monter en voiture est difficile'),
            r('Se chausser', 'Oui, mettre chaussettes et chaussures est difficile'),
          ],
        },
        { title: 'Mobilité et stabilité', rows: [r('Mobilité', 'Peut marcher environ 1 kilomètre'), r('Aide à la marche', 'Non'), r('Boiterie', 'Oui, après une dizaine de minutes de marche')] },
        {
          title: 'Antécédents médicaux',
          rows: [
            r('Opérations', 'Aucune'),
            r('Traitement antérieur', 'Kinésithérapie et paracétamol, peu d’effet. Une infiltration de la hanche il y a 3 mois, effet bref.'),
            r('Allergies', 'Non'),
            r('Anticoagulants', 'Oui, apixaban 5 mg, 2× par jour (fibrillation auriculaire)', true),
            r('Tabac', 'Non'),
            r('Alcool', 'Un verre de vin de temps en temps le week-end'),
            r('Antécédents familiaux', 'Sa mère avait une arthrose de hanche et a reçu une prothèse'),
          ],
        },
        {
          title: 'Général',
          rows: [
            r('Profession', 'Retraitée, ancienne enseignante'),
            r('Sport', 'Marche et natation. La marche devient plus difficile.'),
            r('Taille / poids', '1,65 m / 72 kg'),
            r('Âge', '67 ans'),
            r('Orientation', 'Par le médecin traitant, pour des plaintes persistantes'),
          ],
        },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Genou tordu en jouant au football, il y a 3 semaines'), r('Genou', 'Gauche')] },
        { title: 'Symptômes mécaniques', rows: [r('Blocages', 'Oui, le genou se bloque parfois en extension'), r('Dérobements', 'De temps en temps, en pivotant'), r('Gonflement', 'Oui, après le sport')] },
        { title: 'Sport et travail', rows: [r('Sport', 'Football, 2× par semaine, arrêté depuis'), r('Profession', 'Magasinier')] },
        { title: 'Général', rows: [r('Âge', '34 ans')] },
      ],
      [
        { title: 'Motif de consultation', rows: [r('Déclencheur', 'Douleur à l’épaule droite en levant le bras, depuis 2 mois'), r('Traumatisme', 'Non')] },
        { title: 'Quand avez-vous mal', rows: [r('Atteindre au-dessus de la tête', 'Oui'), r('Couché sur l’épaule', 'Oui, se réveille la nuit'), r('Force', 'Moins de force pour soulever')] },
        { title: 'Antécédents', rows: [r('Traitement antérieur', 'Kinésithérapie, 6 séances, peu d’effet')] },
        { title: 'Travail', rows: [r('Profession', 'Coiffeuse, travaille souvent les bras levés')] },
        { title: 'Général', rows: [r('Âge', '52 ans')] },
      ],
    ],
  },
};

/** The open hip sections fill in as the chat goes: section 0 after the first answer, section 1 after the second. */
const FILL_AT = [2, 4];

export function OrthoPreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const steps = c.chat.length;
  const step = useSteps(steps, 900, 400);
  const [tab, setTab] = useState(0);
  // Per tab: the first two sections start open, the rest closed with a counter.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const isOpen = (i: number) => open[`${tab}-${i}`] ?? i < 2;
  const toggle = (i: number) => setOpen((o) => ({ ...o, [`${tab}-${i}`]: !isOpen(i) }));
  const sections = c.summaries[tab];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      <div className="mx-auto w-[280px] md:w-[300px] rounded-[40px] bg-[#111] p-[9px] shadow-[0_40px_80px_-40px_rgba(42,58,81,0.6)]">
        <div className="rounded-[32px] bg-white overflow-hidden h-[520px] flex flex-col text-[#2A3A51]">
          <div className="pt-7 px-5 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vesalius-logo-with-text.svg" alt="" className="h-5 mx-auto" />
            <p className="text-[10px] text-[#949CB1] mt-2 leading-snug">{c.intro}</p>
          </div>
          <div className="px-4 mt-3 flex items-center gap-2">
            <span className="text-[10px] text-[#4E5670]">{c.progress}</span>
            <span className="flex-1 h-1 rounded-full bg-[#E8EAEC] overflow-hidden">
              <motion.span className="block h-full bg-[#06ACC1]" animate={{ width: `${8 + (step / steps) * 40}%` }} transition={{ duration: 0.6 }} />
            </span>
          </div>
          <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2.5">
            {c.chat.slice(0, step).map((msg, i) =>
              msg.from === 'bot' ? (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                  <Initials text="AV" size={24} />
                  <p className="max-w-[80%] bg-[#F4F5F8] rounded-2xl px-3 py-2 text-[11.5px] leading-snug">{msg.text}</p>
                </motion.div>
              ) : (
                <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[78%] bg-[#06ACC1] text-white rounded-2xl px-3 py-2 text-[11.5px] leading-snug">
                  {msg.text}
                </motion.p>
              ),
            )}
            {step >= steps && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center gap-2 pt-1">
                {c.suggestions.map((s) => (
                  <span key={s} className="px-5 py-1.5 rounded-lg ring-1 ring-[#06ACC1] text-[#06ACC1] text-[11px] font-medium">{s}</span>
                ))}
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-3 border-t border-[#E8EAEC]">
            <AppIcon name="upload" size={15} color={APP.primary} />
            <span className="flex-1 rounded-xl bg-[#F4F5F8] px-3 py-2 text-[11px] text-[#949CB1]">{c.placeholder}</span>
            <span className="w-8 h-8 rounded-lg bg-[#06ACC1]/40 flex items-center justify-center">
              <AppIcon name="send" size={14} color="#fff" />
            </span>
          </div>
        </div>
      </div>

      <AppCard icon="chat" title={c.summary} action={<AppButton variant="subtle" icon="copy">{c.copy}</AppButton>} bodyClassName="px-4 pb-2">
        {/* One summary template per complaint */}
        <div className="flex gap-5 border-b border-[#E8EAEC] text-[13px] -mx-4 px-4" role="tablist">
          {c.tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`py-2.5 -mb-px inline-flex items-center gap-1.5 border-b-2 transition-colors ${tab === i ? 'border-[#06ACC1] text-[#2A3A51] font-medium' : 'border-transparent text-[#949CB1] hover:text-[#2A3A51]'}`}
            >
              {i === 0 && <PatientAvatar initials="HF" size={18} />}
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
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} className="overflow-hidden">
                    <div className="pt-1.5">
                      {section.rows.map((row) => (
                        <p key={row.label} className={`text-[12.5px] leading-relaxed pl-4 ${row.flag ? '-mx-1 px-1 pl-5 rounded-md bg-[#FFF6E8]' : ''}`}>
                          <span className="font-semibold">{row.label}:</span>{' '}
                          {known ? (
                            <motion.span initial={{ opacity: 0, backgroundColor: 'rgba(6,172,193,0.25)' }} animate={{ opacity: 1, backgroundColor: 'rgba(6,172,193,0)' }} transition={{ duration: 1.2 }}>
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
/* 4 · Voice Reception: she calls, she is booked, nobody had to step in */
/* ------------------------------------------------------------------ */

const VOICE = {
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, ik heb al maanden pijn in mijn heup. Kan ik een afspraak krijgen bij de orthopedist?' },
      { from: 'bot', text: 'Vervelend om te horen. Is de pijn plots begonnen, na een val of een ongeval?' },
      { from: 'patient', text: 'Nee, het is geleidelijk erger geworden.' },
      { from: 'bot', text: 'Dank u. Ik plan u in bij de heupchirurg en stuur u een korte vragenlijst om uw bezoek voor te bereiden.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak ingepland bij de heupchirurg: geleidelijke heuppijn rechts, geen trauma',
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
      { from: 'patient', text: 'Hello, my hip has been hurting for months. Can I get an appointment with the orthopaedic surgeon?' },
      { from: 'bot', text: 'I’m sorry to hear that. Did the pain start suddenly, after a fall or an accident?' },
      { from: 'patient', text: 'No, it has gradually got worse.' },
      { from: 'bot', text: 'Thank you. I’ll book you in with the hip surgeon and send you a short questionnaire to prepare for your visit.' },
    ],
    tasks: 'Tasks',
    task: 'Appointment booked with the hip surgeon: gradual right hip pain, no trauma',
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
      { from: 'patient', text: 'Bonjour, j’ai mal à la hanche depuis des mois. Puis-je avoir un rendez-vous chez l’orthopédiste ?' },
      { from: 'bot', text: 'Je suis désolé de l’entendre. La douleur a-t-elle commencé brutalement, après une chute ou un accident ?' },
      { from: 'patient', text: 'Non, elle s’est aggravée progressivement.' },
      { from: 'bot', text: 'Merci. Je vous inscris chez le chirurgien de la hanche et je vous envoie un court questionnaire pour préparer votre visite.' },
    ],
    tasks: 'Tâches',
    task: 'Rendez-vous planifié chez le chirurgien de la hanche : douleur progressive de la hanche droite, sans traumatisme',
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

export function OrthoVoiceDemo() {
  const c = useLocalized(VOICE);
  // 1–4 transcript, 5 the booking appears as a done task, 6 completed
  const step = useSteps(6, 1000, 500);
  const status: ScreeningStatus = step >= 6 ? 'COMPLETED' : step >= 1 ? 'IN_PROGRESS' : 'STARTED';

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
            <span className="block text-sm font-semibold">+32 4•• •• 12 34</span>
            <span className="block text-[11px] text-white/60">{step >= 1 ? c.answered : c.calling}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {c.lines.slice(0, Math.min(step, 4)).map((line, i) => (
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
          {step >= 5 ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5 rounded-lg bg-[#E9FFF7] px-3 py-2.5 text-[12px]">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }} className="mt-0.5 w-4 h-4 rounded-full bg-[#37C18D] text-white flex items-center justify-center shrink-0">
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
                <PatientAvatar initials="HF" size={18} />
                H. Femur
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
              step >= 6 ? (
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
/* 5 · Scribe: the hip examination, a note in the Orthopaedics template */
/* ------------------------------------------------------------------ */

const SCRIBE = {
  nl: {
    back: 'Terug',
    consultation: 'Consultatie',
    template: 'Orthopedie',
    templates: ['Heup', 'Knie', 'Schouder', 'Rug'],
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
      { who: 'doctor', text: 'Waar zit de pijn precies?' },
      { who: 'patient', text: 'Hier in de lies, en soms tot boven mijn knie.' },
      { who: 'doctor', text: 'Ik draai uw heup even naar binnen. Zeg maar als het pijn doet.' },
      { who: 'patient', text: 'Au, ja, daar zit het.' },
    ],
    sections: [
      {
        title: 'Anamnese',
        text: 'Rechter heuppijn sinds 8 maanden, zonder trauma. Liespijn met C-sign, uitstraling tot boven de knie, ochtendstijfheid. Moeite met sokken en schoenen, instappen in de auto en trap op. Wandelafstand ongeveer 1 km, mankt na 10 minuten. Kiné, paracetamol en infiltratie (3 maanden geleden) met kort effect. Apixaban voor voorkamerfibrillatie. Moeder heupprothese.',
        clamp: true,
      },
      {
        title: 'Klinisch onderzoek',
        text: 'Antalgisch gangpatroon rechts. Endorotatie pijnlijk en sterk beperkt rechts, flexie beperkt tot 90°. FADIR positief rechts. Geen drukpijn trochanter major. Knie rechts zonder afwijkingen. Lumbale wervelzuil soepel, neurologisch onderzoek normaal.',
        clamp: true,
      },
      {
        title: 'Medische beeldvorming',
        text: 'RX bekken en axiale opname rechterheup: uitgesproken gewrichtsspleetvernauwing, osteofyten en subchondrale sclerose. Geen tekenen van avasculaire necrose of fractuur.',
        clamp: true,
      },
      { title: 'Diagnose', text: 'Gevorderde coxartrose rechts, Kellgren-Lawrence graad 4.', clamp: false },
      {
        title: 'Beleid',
        text: 'Conservatieve behandeling uitgeput. Totale heupprothese rechts besproken, met herstel en risico’s. Patiënte akkoord. Preoperatieve consultatie anesthesie. Apixaban tijdig stoppen volgens schema. Opvolging na de ingreep met HOOS en pijnscores.',
        clamp: false,
      },
    ],
    patientCard: [['Geboortedatum', '14-03-1959'], ['Vragenlijst', 'Heup'], ['Taal', 'Nederlands']],
  },
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'Orthopaedics',
    templates: ['Hip', 'Knee', 'Shoulder', 'Back'],
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
      { who: 'doctor', text: 'Where exactly is the pain?' },
      { who: 'patient', text: 'Here in the groin, and sometimes down to just above my knee.' },
      { who: 'doctor', text: 'I’m going to turn your hip inwards. Tell me if it hurts.' },
      { who: 'patient', text: 'Ouch, yes, that’s where it is.' },
    ],
    sections: [
      {
        title: 'History',
        text: 'Right hip pain for 8 months, no trauma. Groin pain with C-sign, radiating to above the knee, morning stiffness. Difficulty with socks and shoes, getting into the car and climbing stairs. Walking distance about 1 km, limps after 10 minutes. Physiotherapy, paracetamol and an injection (3 months ago) with short-lived effect. Apixaban for atrial fibrillation. Mother had a hip replacement.',
        clamp: true,
      },
      {
        title: 'Clinical examination',
        text: 'Antalgic gait on the right. Internal rotation painful and markedly restricted on the right, flexion limited to 90°. FADIR positive on the right. No tenderness over the greater trochanter. Right knee unremarkable. Lumbar spine supple, neurological examination normal.',
        clamp: true,
      },
      {
        title: 'Medical imaging',
        text: 'X-ray of the pelvis and axial view of the right hip: marked joint space narrowing, osteophytes and subchondral sclerosis. No signs of avascular necrosis or fracture.',
        clamp: true,
      },
      { title: 'Diagnosis', text: 'Advanced osteoarthritis of the right hip, Kellgren-Lawrence grade 4.', clamp: false },
      {
        title: 'Plan',
        text: 'Conservative treatment exhausted. Total hip replacement on the right discussed, including recovery and risks. Patient agrees. Pre-operative anaesthesia consultation. Stop apixaban in good time according to protocol. Follow-up after surgery with HOOS and pain scores.',
        clamp: false,
      },
    ],
    patientCard: [['Date of birth', '14-03-1959'], ['Questionnaire', 'Hip'], ['Language', 'English']],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Orthopédie',
    templates: ['Hanche', 'Genou', 'Épaule', 'Dos'],
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
      { who: 'doctor', text: 'Où se situe exactement la douleur ?' },
      { who: 'patient', text: 'Ici, dans l’aine, et parfois jusqu’au-dessus du genou.' },
      { who: 'doctor', text: 'Je vais tourner votre hanche vers l’intérieur. Dites-moi si ça fait mal.' },
      { who: 'patient', text: 'Aïe, oui, c’est là.' },
    ],
    sections: [
      {
        title: 'Anamnèse',
        text: 'Douleur de la hanche droite depuis 8 mois, sans traumatisme. Douleur inguinale avec C-sign, irradiant jusqu’au-dessus du genou, raideur matinale. Difficultés pour les chaussettes et chaussures, pour monter en voiture et dans les escaliers. Périmètre de marche d’environ 1 km, boiterie après 10 minutes. Kinésithérapie, paracétamol et infiltration (il y a 3 mois) avec effet bref. Apixaban pour fibrillation auriculaire. Mère porteuse d’une prothèse de hanche.',
        clamp: true,
      },
      {
        title: 'Examen clinique',
        text: 'Boiterie antalgique à droite. Rotation interne douloureuse et nettement limitée à droite, flexion limitée à 90°. FADIR positif à droite. Pas de douleur à la palpation du grand trochanter. Genou droit sans particularité. Rachis lombaire souple, examen neurologique normal.',
        clamp: true,
      },
      {
        title: 'Imagerie médicale',
        text: 'Radiographie du bassin et incidence axiale de la hanche droite : pincement articulaire marqué, ostéophytes et sclérose sous-chondrale. Pas de signe de nécrose avasculaire ni de fracture.',
        clamp: true,
      },
      { title: 'Diagnostic', text: 'Coxarthrose avancée droite, Kellgren-Lawrence grade 4.', clamp: false },
      {
        title: 'Plan',
        text: 'Traitement conservateur épuisé. Prothèse totale de hanche droite discutée, avec la convalescence et les risques. Patiente d’accord. Consultation préopératoire d’anesthésie. Arrêt de l’apixaban à temps selon le schéma. Suivi après l’intervention avec le HOOS et des scores de douleur.',
        clamp: false,
      },
    ],
    patientCard: [['Date de naissance', '14-03-1959'], ['Questionnaire', 'Hanche'], ['Langue', 'Français']],
  },
};

/** The template button: a click shows that the template is set up per joint. */
function TemplatePicker({ label, options }: { label: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <span ref={ref} className="relative">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="rounded-lg ring-1 ring-[#E8EAEC] px-2.5 py-1 text-[11px] hover:bg-[#F9FAFB]">
        {label} ▾
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 z-20 w-40 rounded-lg bg-white ring-1 ring-[#E8EAEC] shadow-[0_12px_24px_-12px_rgba(42,58,81,0.4)] py-1"
          >
            {options.map((option, i) => (
              <span key={option} className={`flex items-center justify-between px-3 py-1.5 text-[11.5px] ${i === 0 ? 'text-[#06ACC1] font-medium' : 'text-[#2A3A51]'}`}>
                {label} · {option}
                {i === 0 && <Check size={11} color={APP.primary} />}
              </span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function OrthoScribeDemo() {
  const c = useLocalized(SCRIBE);
  // 1–4 transcript lines while recording, 5 recording stops + generating, 6 note ready
  const step = useSteps(6, 1000, 500);
  const recording = step < 5;
  const [full, setFull] = useState(false);

  return (
    <AppFrame active="interactions" title={<FemurTitle back={c.back} />}>
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
              <AppButton variant="subtle" icon="eye">{c.showTranscript}</AppButton>
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
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg bg-[#EBF6F8] px-3 py-2.5 text-[12px] flex items-center gap-2 min-h-[48px]">
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
                  <AppButton variant="subtle" icon="copy">{c.copy}</AppButton>
                </div>
                {c.sections.map((section, i) => (
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

        <AppCard icon="user" title="Hilde Femur" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Medication: her photo becomes a list, the anticoagulant marked  */
/* ------------------------------------------------------------------ */

const MEDICATION = {
  nl: {
    title: 'Medicatie',
    upload: 'Upload',
    takePhoto: 'Maak een foto',
    drag: 'of sleep een afbeelding hiernaartoe',
    process: 'Verwerk',
    list: 'Medicatie lijst',
    copy: 'Kopieer naar het klembord',
    prescription: 'Voorschrift',
    dose: 'Dosering',
    mandatory: 'Verplicht',
    yes: 'Ja',
    no: 'Nee',
    marker: 'Bloedverdunner',
    meds: [
      { name: 'Apixaban 5 mg', prescription: '2× per dag', dose: '1 tablet', mandatory: true, anticoagulant: true },
      { name: 'Bisoprolol 2,5 mg', prescription: '1× per dag, ’s ochtends', dose: '1 tablet', mandatory: true, anticoagulant: false },
      { name: 'Paracetamol 1 g', prescription: 'Tot 3× per dag, bij pijn', dose: '1 tablet', mandatory: false, anticoagulant: false },
    ],
  },
  en: {
    title: 'Medication',
    upload: 'Upload',
    takePhoto: 'Take a photo',
    drag: 'Or drag and drop an image here.',
    process: 'Process',
    list: 'Medication list',
    copy: 'Copy to clipboard',
    prescription: 'Prescription',
    dose: 'Dosage',
    mandatory: 'Mandatory',
    yes: 'Yes',
    no: 'No',
    marker: 'Anticoagulant',
    meds: [
      { name: 'Apixaban 5 mg', prescription: 'Twice daily', dose: '1 tablet', mandatory: true, anticoagulant: true },
      { name: 'Bisoprolol 2.5 mg', prescription: 'Once daily, in the morning', dose: '1 tablet', mandatory: true, anticoagulant: false },
      { name: 'Paracetamol 1 g', prescription: 'Up to 3× daily, for pain', dose: '1 tablet', mandatory: false, anticoagulant: false },
    ],
  },
  fr: {
    title: 'Médicaments',
    upload: 'Charger',
    takePhoto: 'Prendre une photo',
    drag: 'Ou faites glisser une image ici.',
    process: 'Traiter',
    list: 'Liste de médicaments',
    copy: 'Copier dans le presse-papiers',
    prescription: 'Ordonnance',
    dose: 'Dosage',
    mandatory: 'Obligatoire',
    yes: 'Oui',
    no: 'Non',
    marker: 'Anticoagulant',
    meds: [
      { name: 'Apixaban 5 mg', prescription: '2× par jour', dose: '1 comprimé', mandatory: true, anticoagulant: true },
      { name: 'Bisoprolol 2,5 mg', prescription: '1× par jour, le matin', dose: '1 comprimé', mandatory: true, anticoagulant: false },
      { name: 'Paracétamol 1 g', prescription: 'Jusqu’à 3× par jour, en cas de douleur', dose: '1 comprimé', mandatory: false, anticoagulant: false },
    ],
  },
};

export function OrthoMedicationDemo() {
  const c = useLocalized(MEDICATION);
  // 1 photo arrives from the chat, 2 processing, 3–5 results
  const step = useSteps(5, 900, 500);

  return (
    <AppFrame
      active="medication"
      title={c.title}
      subtitle={
        <span className="inline-flex items-center gap-1.5">
          <PatientAvatar initials="HF" size={14} />
          Hilde Femur · 14-03-1959
        </span>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-start">
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[4/3] rounded-xl bg-white border border-[#E8EAEC] overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div key="empty" exit={{ opacity: 0 }} className="flex flex-col items-center gap-1 text-center px-3">
                  <AppIcon name="upload" size={26} color={APP.darkGrey} />
                  <span className="text-[11px] text-[#06ACC1] flex items-center gap-1">
                    <AppIcon name="upload" size={11} color={APP.primary} />
                    {c.upload}
                  </span>
                  <span className="text-[11px] text-[#06ACC1] flex items-center gap-1">
                    <AppIcon name="camera" size={11} color={APP.primary} />
                    {c.takePhoto}
                  </span>
                  <span className="text-[10px] text-[#4E5670]">{c.drag}</span>
                </motion.div>
              ) : (
                <motion.div key="photo" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-2 rounded-lg bg-[#FBF8F1] -rotate-2 p-3 flex flex-col gap-1.5">
                  {c.meds.map((med) => (
                    <p key={med.name} className="font-display italic text-[15px] leading-tight text-slate-700">{med.name}</p>
                  ))}
                  {step === 2 && (
                    <motion.span
                      className="absolute inset-x-0 h-[2px] bg-[#06ACC1] shadow-[0_0_12px_3px_rgba(6,172,193,0.5)]"
                      animate={{ top: ['8%', '92%', '8%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AppButton className="w-fit py-2" variant={step >= 1 ? 'primary' : 'subtle'}>
            {step === 2 ? (
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <AppIcon name="refresh-double" size={13} color="#fff" />
              </motion.span>
            ) : null}
            {c.process}
          </AppButton>
        </div>

        <AppCard bodyClassName="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[14px] font-bold">{c.list}</span>
            <AppButton variant="subtle" icon="copy">{c.copy}</AppButton>
          </div>
          {c.meds.map((med, i) =>
            step >= 3 + i ? (
              <motion.div key={med.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex flex-col gap-0.5 text-[12.5px] border-b border-[#E8EAEC] pb-3 last:border-0 last:pb-0">
                <span className="flex flex-wrap items-center gap-2">
                  <strong>
                    {i + 1}. {med.name}
                  </strong>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#37C18D]" />
                  {med.anticoagulant && <Marker>{c.marker}</Marker>}
                </span>
                <span>
                  {c.prescription}: {med.prescription}
                </span>
                <span>
                  {c.dose}: {med.dose}
                </span>
                <span>
                  {c.mandatory}: {med.mandatory ? c.yes : c.no}
                </span>
              </motion.div>
            ) : (
              <div key={med.name} className="flex flex-col gap-1.5 pb-3">
                <span className="h-3 w-40 rounded-full bg-[#F4F5F8]" />
                <span className="h-2.5 w-56 rounded-full bg-[#F4F5F8]" />
              </div>
            ),
          )}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · Documents: report and GP letter ready, the full letter on click */
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
      { label: 'Consultatieverslag', description: 'Sjabloon Orthopedie, voor het patiëntendossier' },
      { label: 'Brief aan de huisarts', description: 'Bevindingen, diagnose en beleid voor de verwijzer' },
      { label: 'Uitleg voor de patiënt', description: 'Begrijpelijke uitleg over de ingreep en het herstel' },
      { label: 'Pre-operatieve checklist', description: 'Wat in orde moet zijn voor de ingreep' },
    ],
    previews: [
      'Diagnose: gevorderde coxartrose rechts, Kellgren-Lawrence graad 4. Beleid: totale heupprothese rechts, preoperatieve consultatie anesthesie, apixaban tijdig stoppen volgens schema.',
      'Geachte collega, ik zag uw patiënte mevrouw Femur voor pijn in de rechterheup sinds 8 maanden. De RX toont een gevorderde coxartrose rechts. Na uitputting van de conservatieve behandeling plannen we een totale heupprothese rechts.',
      'Uw heuppijn komt door slijtage van het heupgewricht. Bij de ingreep krijgt u een nieuw heupgewricht. Hieronder leest u hoe u zich voorbereidt en wat u na de operatie mag verwachten.',
      'Preoperatieve consultatie anesthesie · Apixaban stoppen volgens schema · Krukken en hulpmiddelen thuis klaarzetten.',
    ],
    letter: {
      greeting: 'Geachte collega,',
      intro: 'Ik schrijf u over uw patiënte Hilde Femur, geboren op 14 maart 1959, die ik recent op consultatie zag.',
      sections: [
        ['Reden voor contact', 'Pijn in de rechterheup sinds ongeveer 8 maanden, vooral bij wandelen en traplopen, zonder trauma. Verwezen wegens aanhoudende klachten.'],
        [
          'Anamnese',
          'Liespijn met C-sign en uitstraling tot boven de knie, ochtendstijfheid. Moeite met sokken en schoenen aantrekken en met instappen in de auto. Wandelafstand ongeveer 1 km, mankt na 10 minuten. Kinesitherapie, paracetamol en een infiltratie drie maanden geleden gaven kort effect. Neemt apixaban voor voorkamerfibrillatie. Moeder kreeg een heupprothese.',
        ],
        [
          'Klinisch onderzoek',
          'Antalgisch gangpatroon rechts. Endorotatie pijnlijk en sterk beperkt, flexie beperkt tot 90°. FADIR positief rechts. Geen drukpijn ter hoogte van de trochanter major. Knie rechts zonder afwijkingen. Lumbale wervelzuil soepel, neurologisch onderzoek normaal.',
        ],
        ['Aanvullende onderzoeken', 'RX bekken en axiale opname rechterheup: uitgesproken gewrichtsspleetvernauwing, osteofyten en subchondrale sclerose. Geen tekenen van avasculaire necrose of fractuur.'],
        ['Diagnose', 'Gevorderde coxartrose rechts, Kellgren-Lawrence graad 4.'],
        [
          'Beleid',
          'De conservatieve behandeling is uitgeput. Na bespreking van het herstel en de risico’s kiest mevrouw Femur voor een totale heupprothese rechts. Ze wordt gezien op de preoperatieve consultatie anesthesie. De apixaban wordt tijdig gestopt volgens schema. Na de ingreep volgen we haar herstel op met de HOOS en pijnscores.',
        ],
      ],
      closing: 'Met vriendelijke groeten, Dr. Andreas Vesalius, orthopedisch chirurg',
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
      { label: 'Consultation report', description: 'Orthopaedics template, for the patient record' },
      { label: 'Letter to the GP', description: 'Findings, diagnosis and plan for the referring doctor' },
      { label: 'Explanation for the patient', description: 'Plain-language explanation of the operation and recovery' },
      { label: 'Pre-operative checklist', description: 'What needs to be in place before the operation' },
    ],
    previews: [
      'Diagnosis: advanced osteoarthritis of the right hip, Kellgren-Lawrence grade 4. Plan: total hip replacement on the right, pre-operative anaesthesia consultation, stop apixaban in good time according to protocol.',
      'Dear colleague, I saw your patient Mrs Femur for pain in the right hip for 8 months. The X-ray shows advanced osteoarthritis of the right hip. With conservative treatment exhausted, we are planning a total hip replacement on the right.',
      'Your hip pain is caused by wear of the hip joint. During the operation you will receive a new hip joint. Below you can read how to prepare and what to expect after the operation.',
      'Pre-operative anaesthesia consultation · Stop apixaban according to protocol · Crutches and aids ready at home.',
    ],
    letter: {
      greeting: 'Dear colleague,',
      intro: 'I am writing to you about your patient Hilde Femur, born on 14 March 1959, whom I recently saw in clinic.',
      sections: [
        ['Reason for contact', 'Pain in the right hip for about 8 months, mostly when walking and climbing stairs, without trauma. Referred for persistent complaints.'],
        [
          'History',
          'Groin pain with C-sign and radiation to above the knee, morning stiffness. Difficulty putting on socks and shoes and getting into the car. Walking distance about 1 km, limps after 10 minutes. Physiotherapy, paracetamol and an injection three months ago gave short-lived relief. Takes apixaban for atrial fibrillation. Her mother had a hip replacement.',
        ],
        [
          'Clinical examination',
          'Antalgic gait on the right. Internal rotation painful and markedly restricted, flexion limited to 90°. FADIR positive on the right. No tenderness over the greater trochanter. Right knee unremarkable. Lumbar spine supple, neurological examination normal.',
        ],
        ['Further investigations', 'X-ray of the pelvis and axial view of the right hip: marked joint space narrowing, osteophytes and subchondral sclerosis. No signs of avascular necrosis or fracture.'],
        ['Diagnosis', 'Advanced osteoarthritis of the right hip, Kellgren-Lawrence grade 4.'],
        [
          'Plan',
          'Conservative treatment has been exhausted. After discussing recovery and risks, Mrs Femur has opted for a total hip replacement on the right. She will be seen at the pre-operative anaesthesia consultation. Apixaban will be stopped in good time according to protocol. After surgery we will follow her recovery with the HOOS and pain scores.',
        ],
      ],
      closing: 'Kind regards, Dr Andreas Vesalius, orthopaedic surgeon',
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
      { label: 'Rapport de consultation', description: 'Modèle Orthopédie, pour le dossier patient' },
      { label: 'Lettre au médecin traitant', description: 'Constatations, diagnostic et plan pour le médecin référent' },
      { label: 'Explication pour la patiente', description: 'Explication claire de l’intervention et de la convalescence' },
      { label: 'Check-list préopératoire', description: 'Ce qui doit être en ordre avant l’intervention' },
    ],
    previews: [
      'Diagnostic : coxarthrose avancée droite, Kellgren-Lawrence grade 4. Plan : prothèse totale de hanche droite, consultation préopératoire d’anesthésie, arrêt de l’apixaban à temps selon le schéma.',
      'Cher confrère, j’ai vu votre patiente Mme Femur pour une douleur de la hanche droite depuis 8 mois. La radiographie montre une coxarthrose avancée droite. Le traitement conservateur étant épuisé, nous planifions une prothèse totale de hanche droite.',
      'Votre douleur à la hanche est due à l’usure de l’articulation. Lors de l’intervention, vous recevrez une nouvelle articulation de hanche. Vous lirez ci-dessous comment vous préparer et à quoi vous attendre après l’opération.',
      'Consultation préopératoire d’anesthésie · Arrêt de l’apixaban selon le schéma · Béquilles et aides prêtes à la maison.',
    ],
    letter: {
      greeting: 'Cher confrère,',
      intro: 'Je vous écris au sujet de votre patiente Hilde Femur, née le 14 mars 1959, que j’ai vue récemment en consultation.',
      sections: [
        ['Motif du contact', 'Douleur de la hanche droite depuis environ 8 mois, surtout à la marche et dans les escaliers, sans traumatisme. Adressée pour des plaintes persistantes.'],
        [
          'Anamnèse',
          'Douleur inguinale avec C-sign et irradiation jusqu’au-dessus du genou, raideur matinale. Difficultés pour mettre chaussettes et chaussures et pour monter en voiture. Périmètre de marche d’environ 1 km, boiterie après 10 minutes. La kinésithérapie, le paracétamol et une infiltration il y a trois mois ont eu un effet bref. Prend de l’apixaban pour une fibrillation auriculaire. Sa mère a reçu une prothèse de hanche.',
        ],
        [
          'Examen clinique',
          'Boiterie antalgique à droite. Rotation interne douloureuse et nettement limitée, flexion limitée à 90°. FADIR positif à droite. Pas de douleur à la palpation du grand trochanter. Genou droit sans particularité. Rachis lombaire souple, examen neurologique normal.',
        ],
        ['Examens complémentaires', 'Radiographie du bassin et incidence axiale de la hanche droite : pincement articulaire marqué, ostéophytes et sclérose sous-chondrale. Pas de signe de nécrose avasculaire ni de fracture.'],
        ['Diagnostic', 'Coxarthrose avancée droite, Kellgren-Lawrence grade 4.'],
        [
          'Plan',
          'Le traitement conservateur est épuisé. Après discussion de la convalescence et des risques, Mme Femur opte pour une prothèse totale de hanche droite. Elle sera vue en consultation préopératoire d’anesthésie. L’apixaban sera arrêté à temps selon le schéma. Après l’intervention, nous suivrons sa convalescence avec le HOOS et des scores de douleur.',
        ],
      ],
      closing: 'Bien confraternellement, Dr Andreas Vesalius, chirurgien orthopédiste',
    },
  },
};

type DocState = 'idle' | 'generating' | 'generated';
const LETTER = 1;

export function OrthoDocumentDemo() {
  const c = useLocalized(DOCS);
  const [states, setStates] = useState<DocState[]>(['idle', 'idle', 'idle', 'idle']);
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

  // Report and GP letter generate after the consultation; the letter lands on top, as the end frame.
  useEffect(() => {
    const list = timers.current;
    const first = setTimeout(() => generate(0), 900);
    const second = setTimeout(() => generate(LETTER), 2500);
    return () => {
      clearTimeout(first);
      clearTimeout(second);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame active="interactions" title={<FemurTitle />}>
      <div className="bg-white rounded-xl border border-[#E8EAEC]">
        <div className="flex gap-5 px-4 border-b border-[#E8EAEC] text-[13px]">
          {c.tabs.map((tab, i) => (
            <span key={tab} className={`py-2.5 ${i === 2 ? 'border-b-2 border-[#06ACC1] text-[#2A3A51]' : 'text-[#4E5670]'}`}>{tab}</span>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <p className="text-[14px] font-semibold">{c.title}</p>
              <p className="text-[11.5px] text-[#4E5670] max-w-md leading-snug mt-0.5">{c.description}</p>
            </div>
            <AppButton variant="bordered" icon="plus">{c.open}</AppButton>
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
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${state === 'generated' ? 'bg-[#E9FFF7] text-[#37C18D]' : 'bg-[#F4F5F8] text-[#949CB1]'}`}>
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
/* 8 · Follow-up: K. Patella raises an alert, Mrs Femur recovers        */
/* ------------------------------------------------------------------ */

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
      ['K. Patella', 'Knie-artroscopie · dag 5'],
      ['H. Femur', 'Heupprothese · week 6 · HOOS ingevuld'],
      ['R. Trochanter', 'Heupprothese · dag 7'],
      ['J. Acetabulum', 'Heupprothese · dag 14'],
    ],
    alert: 'Meldt roodheid en zwelling rond de wonde, en koorts (38,4 °C). Neem contact op.',
    detail: 'H. Femur · heupprothese rechts',
    checkin: 'Check-in dag 3',
    chat: [
      { from: 'bot', text: 'Hoe gaat het vandaag met uw heup?' },
      { from: 'patient', text: 'Goed. Ik wandel met krukken tot in de keuken en de wonde is droog.' },
      { from: 'bot', text: 'Fijn om te horen. Hebt u koorts gehad of is de pijn toegenomen?' },
      { from: 'patient', text: 'Nee, de pijn wordt elke dag wat minder.' },
    ],
    hoos: 'HOOS-scores',
    scale: '0 tot 100, 100 = geen klachten',
    before: 'Vóór de ingreep',
    week6: 'Week 6',
    exampleData: 'Voorbeelddata',
    subscales: ['Pijn', 'Symptomen', 'Dagelijkse activiteiten', 'Sport en recreatie', 'Kwaliteit van leven'],
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
      ['K. Patella', 'Knee arthroscopy · day 5'],
      ['H. Femur', 'Hip replacement · week 6 · HOOS completed'],
      ['R. Trochanter', 'Hip replacement · day 7'],
      ['J. Acetabulum', 'Hip replacement · day 14'],
    ],
    alert: 'Reports redness and swelling around the wound, and fever (38.4 °C). Please get in touch.',
    detail: 'H. Femur · right hip replacement',
    checkin: 'Check-in day 3',
    chat: [
      { from: 'bot', text: 'How is your hip today?' },
      { from: 'patient', text: 'Good. I walk with crutches as far as the kitchen and the wound is dry.' },
      { from: 'bot', text: 'Good to hear. Have you had a fever, or has the pain increased?' },
      { from: 'patient', text: 'No, the pain gets a little less every day.' },
    ],
    hoos: 'HOOS scores',
    scale: '0 to 100, 100 = no symptoms',
    before: 'Before surgery',
    week6: 'Week 6',
    exampleData: 'Example data',
    subscales: ['Pain', 'Symptoms', 'Activities of daily living', 'Sport and recreation', 'Quality of life'],
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
      ['K. Patella', 'Arthroscopie du genou · jour 5'],
      ['H. Femur', 'Prothèse de hanche · semaine 6 · HOOS rempli'],
      ['R. Trochanter', 'Prothèse de hanche · jour 7'],
      ['J. Acetabulum', 'Prothèse de hanche · jour 14'],
    ],
    alert: 'Signale une rougeur et un gonflement autour de la plaie, et de la fièvre (38,4 °C). Prenez contact.',
    detail: 'H. Femur · prothèse de hanche droite',
    checkin: 'Suivi jour 3',
    chat: [
      { from: 'bot', text: 'Comment va votre hanche aujourd’hui ?' },
      { from: 'patient', text: 'Bien. Je marche avec des béquilles jusqu’à la cuisine et la plaie est sèche.' },
      { from: 'bot', text: 'Ravi de l’entendre. Avez-vous eu de la fièvre ou la douleur a-t-elle augmenté ?' },
      { from: 'patient', text: 'Non, la douleur diminue un peu chaque jour.' },
    ],
    hoos: 'Scores HOOS',
    scale: '0 à 100, 100 = aucune plainte',
    before: 'Avant l’intervention',
    week6: 'Semaine 6',
    exampleData: 'Données d’exemple',
    subscales: ['Douleur', 'Symptômes', 'Activités quotidiennes', 'Sport et loisirs', 'Qualité de vie'],
  },
};

const FOLLOW_ROWS = [
  { initials: 'KP', flag: true, date: '25-09-2026, 09:41' },
  { initials: 'HF', flag: false, date: '25-09-2026, 08:15' },
  { initials: 'RT', flag: false, date: '24-09-2026, 10:05' },
  { initials: 'JA', flag: false, date: '23-09-2026, 09:30' },
];
// HOOS before surgery → week 6 (sales' example data)
const HOOS = [
  [35, 70],
  [40, 65],
  [38, 68],
  [20, 40],
  [19, 50],
];
const FEMUR_ROW = 1;

export function OrthoFollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 screenings land (oldest first, newest on top), 5 K. Patella's alert, 6 Mrs Femur's recovery opens
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
              const femur = row.i === FEMUR_ROW;
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
                  {femur ? (
                    <button
                      type="button"
                      aria-expanded={detailOpen}
                      onClick={() => setManual(!detailOpen)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${detailOpen ? 'border-[#7E5BC2]/40 bg-[#F2EDFA]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
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
                    <b>K. Patella</b> · {c.alert}
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
            <div className="pt-4">
              <AppCard
                icon="user"
                title={
                  <span className="inline-flex items-center gap-2">
                    <PatientAvatar initials="HF" size={20} />
                    {c.detail}
                  </span>
                }
                action={<span className="text-[10.5px] font-medium text-[#949CB1]">{c.exampleData}</span>}
                bodyClassName="p-4 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-5"
              >
                {/* The day-3 check-in, in natural language */}
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

                {/* HOOS: baseline in grey, week 6 in the accent colour */}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <p className="text-[12.5px] font-semibold">
                      {c.hoos} <span className="font-normal text-[#949CB1] text-[11px]">· {c.scale}</span>
                    </p>
                    <span className="flex items-center gap-3 text-[10.5px] text-[#4E5670]">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-[#D5D9E0]" />
                        {c.before}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: FEMUR }} />
                        {c.week6}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {c.subscales.map((label, i) => {
                      const [before, after] = HOOS[i];
                      return (
                        <div key={label}>
                          <p className="flex justify-between text-[11px] mb-1">
                            <span>{label}</span>
                            <span className="tabular-nums text-[#4E5670]">
                              {before} → <b className="text-[#2A3A51]">{after}</b>
                            </span>
                          </p>
                          <div className="flex flex-col gap-0.5">
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span className="block h-full rounded-full bg-[#D5D9E0]" initial={{ width: 0 }} animate={{ width: `${before}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: EASE }} />
                            </span>
                            <span className="h-1.5 rounded-full bg-[#F4F5F8] overflow-hidden">
                              <motion.span className="block h-full rounded-full" style={{ backgroundColor: FEMUR }} initial={{ width: 0 }} animate={{ width: `${after}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: EASE }} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AppCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppFrame>
  );
}
