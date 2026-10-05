'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import { EASE, useLocalized, useSteps } from './shared';

/* ------------------------------------------------------------------ */
/* Smart Triage: the "Instroom" screenings list, urgent case surfaces  */
/* ------------------------------------------------------------------ */

const TRIAGE = {
  en: {
    title: 'Screenings',
    perDay: 'Per day',
    asList: 'As list',
    head: ['Channel', 'Name', 'Summary', 'Open tasks', 'Status'],
    attention: 'Attention',
    urgent: 'Today',
    trail: [
      ['09:01', 'Knee swollen after a fall yesterday, cannot bear weight'],
      ['09:01', 'Flagged for a same-day appointment'],
      ['09:02', 'Secretariat notified to plan today'],
    ],
    rows: ['Swollen knee after a fall, cannot bear weight', 'Migraine, worse this week', 'Repeat prescription', 'Question about appointment'],
  },
  nl: {
    title: 'Screenings',
    perDay: 'Per Dag',
    asList: 'Als Lijst',
    head: ['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'],
    attention: 'Aandacht',
    urgent: 'Vandaag',
    trail: [
      ['09:01', 'Knie gezwollen na een val gisteren, kan er niet op steunen'],
      ['09:01', 'Gemarkeerd voor een afspraak vandaag'],
      ['09:02', 'Secretariaat verwittigd om vandaag in te plannen'],
    ],
    rows: ['Gezwollen knie na een val, kan er niet op steunen', 'Migraine, erger deze week', 'Herhaalvoorschrift', 'Vraag over afspraak'],
  },
  fr: {
    title: 'Dépistages',
    perDay: 'Par jour',
    asList: 'En liste',
    head: ['Canal', 'Nom', 'Résumé', 'Tâches ouvertes', 'Statut'],
    attention: 'Attention',
    urgent: 'Aujourd’hui',
    trail: [
      ['09:01', 'Genou gonflé après une chute hier, ne peut pas s’appuyer dessus'],
      ['09:01', 'Signalé pour un rendez-vous aujourd’hui'],
      ['09:02', 'Secrétariat prévenu pour planifier aujourd’hui'],
    ],
    rows: ['Genou gonflé après une chute, ne peut pas s’appuyer dessus', 'Migraine, pire cette semaine', 'Renouvellement d’ordonnance', 'Question sur un rendez-vous'],
  },
};

const TRIAGE_ROWS = [
  { name: 'M. Peeters', channel: 'phone-incoming', tasks: 1, urgent: true },
  { name: 'A. El Amrani', channel: 'chat', tasks: 0, urgent: false },
  { name: 'L. Dubois', channel: 'chat', tasks: 1, urgent: false },
  { name: 'K. Janssens', channel: 'phone-incoming', tasks: 0, urgent: false },
];

const TRIAGE_GRID = 'grid grid-cols-[3rem_1fr_2fr] md:grid-cols-[3.5rem_1fr_2.2fr_5rem_5.5rem] gap-3';

export function TriageDemo() {
  const c = useLocalized(TRIAGE);
  const step = useSteps(5, 380, 150);
  const statusOf = (i: number): ScreeningStatus => {
    if (i === 0) return step >= 3 ? 'IN_PROGRESS' : 'STARTED';
    if (i === 3) return 'IN_PROGRESS';
    return 'COMPLETED';
  };
  const visible = TRIAGE_ROWS.map((_, i) => step >= [1, 2, 3, 5][i]);

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
      <div className="relative">
        <div className="bg-white rounded-xl border border-[#E8EAEC] overflow-hidden">
          <div className={`${TRIAGE_GRID} px-4 py-2.5 bg-[#F4F5F8] text-[11px] font-medium text-[#2A3A51]`}>
            {c.head.map((h, i) => (
              <span key={h} className={i > 2 ? 'hidden md:block' : ''}>{h}</span>
            ))}
          </div>
          <AnimatePresence initial={false}>
            {TRIAGE_ROWS.map(
              (row, i) =>
                visible[i] && (
                  <motion.div
                    key={row.name}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className={`${TRIAGE_GRID} px-4 py-3 border-t border-[#E8EAEC] items-center text-[12px] transition-colors duration-300 ${row.urgent && step >= 4 ? 'bg-[#FFE7ED]/60' : ''}`}
                  >
                    <span className="flex items-center gap-1">
                      <AppIcon name={row.channel} size={15} color={APP.primary} />
                      {row.urgent && step >= 4 && <AppIcon name="exclamation-triangle" size={13} color={APP.accent} />}
                    </span>
                    <span className="font-medium truncate">{row.name}</span>
                    <span className="text-[#4E5670] truncate">{c.rows[i]}</span>
                    <span className="hidden md:block tabular-nums">{row.tasks}</span>
                    <span className="hidden md:block">
                      {row.urgent && step >= 4 ? (
                        <motion.span
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap bg-[#FFF6E8] text-[#C2410C] ring-1 ring-[#F59E0C]/40"
                        >
                          {c.urgent}
                        </motion.span>
                      ) : (
                        <StatusChip status={statusOf(i)} />
                      )}
                    </span>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-3 md:ml-auto md:w-[400px] shadow-[0_24px_40px_-20px_rgba(42,58,81,0.5)] rounded-xl"
            >
              <AppCard tone="widget" icon="exclamation-triangle" title={c.attention}>
                <div className="flex items-start gap-3">
                  <Initials text="MP" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-semibold mb-1.5">M. Peeters</span>
                    <ol className="flex flex-col gap-1">
                      {c.trail.map(([time, what], k) => (
                        <motion.li
                          key={what}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + k * 0.25, duration: 0.3 }}
                          className="flex gap-2.5 text-[11px] leading-snug"
                        >
                          <span className="tabular-nums text-[#949CB1] shrink-0">{time}</span>
                          <span className={k === 1 ? 'font-semibold text-[#0B1B3D]' : 'text-[#4E5670]'}>{what}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </span>
                </div>
              </AppCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Agenda: "Afspraken" day view per room; an urgent visit slots in     */
/* ------------------------------------------------------------------ */

const AGENDA = {
  en: { date: 'Friday 25 September 2026', appointments: 'appointments', views: ['Day', 'Week', 'Month'], perRoom: 'Per room', rooms: ['Room 1', 'Room 2', 'Room 3'], urgent: 'Urgent', types: ['Follow-up', 'Swollen knee after a fall', 'New patient', 'Knee pain', 'Check-up', 'Wound care'] },
  nl: { date: 'vrijdag 25 september 2026', appointments: 'afspraken', views: ['Dag', 'Week', 'Maand'], perRoom: 'Per ruimte', rooms: ['Room 1', 'Room 2', 'Room 3'], urgent: 'Dringend', types: ['Opvolging', 'Gezwollen knie na val', 'Nieuwe patiënt', 'Kniepijn', 'Controle', 'Wondzorg'] },
  fr: { date: 'vendredi 25 septembre 2026', appointments: 'réservations', views: ['Jour', 'Semaine', 'Mois'], perRoom: 'Par espace', rooms: ['Room 1', 'Room 2', 'Room 3'], urgent: 'Urgent', types: ['Suivi', 'Genou gonflé après une chute', 'Nouveau patient', 'Douleur au genou', 'Contrôle', 'Soins de plaie'] },
};

type AgendaCopy = (typeof AGENDA)['en'];

// Room colours match the room swatches in the Afspraken filter.
const ROOM_COLORS = ['#4A90E2', '#9B7BC8', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;

const VISITS = [
  { room: 0, start: 0, len: 1, name: 'S. Janssens', type: 0 },
  { room: 1, start: 0, len: 2, name: 'A. El Amrani', type: 2 },
  { room: 2, start: 1, len: 1, name: 'L. Dubois', type: 3 },
  { room: 0, start: 2, len: 1, name: 'K. Peeters', type: 4 },
  { room: 2, start: 3, len: 1, name: 'J. Claes', type: 5 },
];

function VisitBlock({ c, room, start, len, name, type, urgent = false }: { c: AgendaCopy; room: number; start: number; len: number; name: string; type: number; urgent?: boolean }) {
  return (
    <motion.div
      initial={urgent ? { opacity: 0, y: -30, scale: 0.9 } : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={urgent ? { type: 'spring', stiffness: 180, damping: 16 } : { duration: 0.35 }}
      className="absolute left-1 right-1 rounded-md px-2 py-1 overflow-hidden text-[10.5px] leading-tight"
      style={{
        top: start * SLOT_PX + 2,
        height: len * SLOT_PX - 4,
        backgroundColor: urgent ? '#FFE7ED' : `${ROOM_COLORS[room]}1A`,
        borderLeft: `3px solid ${urgent ? APP.accent : ROOM_COLORS[room]}`,
      }}
    >
      <p className="font-semibold truncate">{name}</p>
      <p className="truncate text-[#4E5670]">{urgent ? `${c.urgent} · ${c.types[type]}` : c.types[type]}</p>
    </motion.div>
  );
}

export function AgendaDemo() {
  const c = useLocalized(AGENDA);
  // 1–5 visits appear, 6: urgent visit from triage drops into Room 1 at 09:30
  const step = useSteps(6, 550, 400);
  const count = Math.min(step, 5) + (step >= 6 ? 1 : 0);

  return (
    <AppFrame
      active="visits"
      title={
        <span>
          {c.date} <span className="text-[#E8EAEC]">|</span>{' '}
          <motion.span key={count} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[#06ACC1] inline-block">
            {count}
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
                {VISITS.filter((v, k) => v.room === i && step >= k + 1).length + (i === 0 && step >= 6 ? 1 : 0)}
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
              {VISITS.map((visit, k) => visit.room === room && step >= k + 1 && <VisitBlock key={visit.name} c={c} {...visit} />)}
              {room === 0 && step >= 6 && <VisitBlock c={c} room={0} start={1} len={1} name="M. Peeters" type={1} urgent />}
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Pre Consultation: the real patient chat, and the summary it builds  */
/* ------------------------------------------------------------------ */

const INTAKE = {
  en: {
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    chat: [
      { from: 'bot', text: 'Can you tell me what caused your knee complaints and how long you have had them?' },
      { from: 'patient', text: 'My knee has hurt for about a week, after walking.' },
      { from: 'bot', text: 'Which knee hurts?' },
      { from: 'patient', text: 'Both' },
      { from: 'bot', text: 'Does the pain come and go, or is it always there?' },
      { from: 'patient', text: 'It comes and goes.' },
      { from: 'bot', text: 'What kind of pain is it? For example stabbing, burning or aching?' },
      { from: 'patient', text: 'Mostly aching, sometimes stabbing.' },
      { from: 'bot', text: 'Can you rate the pain from 1 to 10?' },
      { from: 'patient', text: '7' },
      { from: 'bot', text: 'Does your knee feel warm?' },
      { from: 'patient', text: 'No' },
      { from: 'bot', text: 'Is your knee swollen?' },
      { from: 'patient', text: 'A little, mostly in the evening.' },
      { from: 'bot', text: 'Is there anything you can no longer do because of it?' },
      { from: 'patient', text: 'Walking more than a kilometre, and taking the stairs.' },
      { from: 'bot', text: 'Are you taking anything for the pain?' },
      { from: 'patient', text: 'Paracetamol when needed.' },
      { from: 'bot', text: 'Thank you. Your answers have been passed on to the doctor for your appointment.' },
    ],
    suggestions: ['Yes', 'No'],
    summary: 'Summary',
    copy: 'Copy the summary',
    ready: 'Ready for the doctor',
    sections: [
      { title: 'Reason for consultation', rows: [['Cause', 'The knee complaints started after walking.'], ['Duration', 'About a week']] },
      {
        title: 'Nature of the pain',
        rows: [['Knee', 'Both'], ['Pattern', 'Comes and goes'], ['Type of pain', 'Aching, sometimes stabbing'], ['Pain score', '7'], ['Warmth', 'No'], ['Swollen', 'Slightly, in the evening']],
      },
      { title: 'General', rows: [['Limited activities', 'Walking more than 1 km, stairs'], ['Medication', 'Paracetamol when needed']] },
    ],
  },
  nl: {
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    chat: [
      { from: 'bot', text: 'Kunt u mij vertellen wat de aanleiding is van uw knieklachten en sinds wanneer u daar last van heeft?' },
      { from: 'patient', text: 'Mijn knie doet pijn sinds ongeveer een week, na het wandelen.' },
      { from: 'bot', text: 'Welke knie doet pijn?' },
      { from: 'patient', text: 'Beide' },
      { from: 'bot', text: 'Komt de pijn en gaat die weer weg, of is die constant aanwezig?' },
      { from: 'patient', text: 'De pijn komt en gaat.' },
      { from: 'bot', text: 'Wat voor soort pijn ervaart u? Bijvoorbeeld stekend, brandend of zeurend?' },
      { from: 'patient', text: 'Vooral zeurend en soms stekend.' },
      { from: 'bot', text: 'Kunt u de pijn een cijfer geven tussen 1 en 10?' },
      { from: 'patient', text: '7' },
      { from: 'bot', text: 'Voelt uw knie warm aan?' },
      { from: 'patient', text: 'Nee' },
      { from: 'bot', text: 'Is uw knie gezwollen?' },
      { from: 'patient', text: 'Een beetje, vooral ’s avonds.' },
      { from: 'bot', text: 'Is er iets dat u hierdoor niet meer kunt?' },
      { from: 'patient', text: 'Meer dan een kilometer wandelen, en trappen lopen.' },
      { from: 'bot', text: 'Neemt u iets tegen de pijn?' },
      { from: 'patient', text: 'Paracetamol als het nodig is.' },
      { from: 'bot', text: 'Dank u. Uw antwoorden zijn doorgegeven aan de arts voor uw afspraak.' },
    ],
    suggestions: ['Ja', 'Nee'],
    summary: 'Samenvatting',
    copy: 'Samenvatting kopiëren',
    ready: 'Klaar voor de arts',
    sections: [
      { title: 'Reden van consultatie', rows: [['Aanleiding', 'De knieklachten begonnen na het wandelen.'], ['Duur', 'Ongeveer een week']] },
      {
        title: 'Aard van de pijn',
        rows: [['Knie', 'Beide'], ['Pijn', 'De pijn komt en gaat.'], ['Soort pijn', 'Zeurend en soms stekend'], ['Pijnscore', '7'], ['Warmte', 'Nee'], ['Gezwollen', 'Licht, vooral ’s avonds']],
      },
      { title: 'Algemeen', rows: [['Activiteit niet kunnen', 'Meer dan 1 km wandelen, trappen'], ['Medicatie', 'Paracetamol indien nodig']] },
    ],
  },
  fr: {
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    chat: [
      { from: 'bot', text: 'Pouvez-vous me dire ce qui a déclenché vos douleurs au genou et depuis quand ?' },
      { from: 'patient', text: 'Mon genou me fait mal depuis environ une semaine, après la marche.' },
      { from: 'bot', text: 'Quel genou vous fait mal ?' },
      { from: 'patient', text: 'Les deux' },
      { from: 'bot', text: 'La douleur va-t-elle et vient-elle, ou est-elle constante ?' },
      { from: 'patient', text: 'Elle va et vient.' },
      { from: 'bot', text: 'Quel type de douleur ressentez-vous ? Par exemple lancinante, brûlante ou sourde ?' },
      { from: 'patient', text: 'Surtout sourde, parfois lancinante.' },
      { from: 'bot', text: 'Pouvez-vous noter la douleur de 1 à 10 ?' },
      { from: 'patient', text: '7' },
      { from: 'bot', text: 'Votre genou est-il chaud au toucher ?' },
      { from: 'patient', text: 'Non' },
      { from: 'bot', text: 'Votre genou est-il gonflé ?' },
      { from: 'patient', text: 'Un peu, surtout le soir.' },
      { from: 'bot', text: 'Y a-t-il quelque chose que vous ne pouvez plus faire à cause de cela ?' },
      { from: 'patient', text: 'Marcher plus d’un kilomètre, et monter les escaliers.' },
      { from: 'bot', text: 'Prenez-vous quelque chose contre la douleur ?' },
      { from: 'patient', text: 'Du paracétamol si nécessaire.' },
      { from: 'bot', text: 'Merci. Vos réponses ont été transmises au médecin pour votre rendez-vous.' },
    ],
    suggestions: ['Oui', 'Non'],
    summary: 'Résumé',
    copy: 'Copier le résumé',
    ready: 'Prêt pour le médecin',
    sections: [
      { title: 'Motif de consultation', rows: [['Déclencheur', 'Les douleurs au genou ont commencé après la marche.'], ['Durée', 'Environ une semaine']] },
      {
        title: 'Nature de la douleur',
        rows: [['Genou', 'Les deux'], ['Évolution', 'Va et vient'], ['Type de douleur', 'Sourde, parfois lancinante'], ['Score de douleur', '7'], ['Chaleur', 'Non'], ['Gonflement', 'Léger, surtout le soir']],
      },
      { title: 'Général', rows: [['Activités limitées', 'Marcher plus d’1 km, escaliers'], ['Médicaments', 'Paracétamol si nécessaire']] },
    ],
  },
};

const INTAKE_STEPS = INTAKE.en.chat.length;
// Index of the bot question answered with a Yes/No suggestion ("Does your knee feel warm?").
const SUGGESTION_AT = 10;

/** Rows known after `step` messages: the first answer fills two rows, every later answer one more. */
const filledRows = (step: number, total: number) => (step < 2 ? 0 : Math.min(total, Math.floor(step / 2) + 1));

export function PreConsultationDemo() {
  const c = useLocalized(INTAKE);
  const step = useSteps(INTAKE_STEPS, 750, 400);
  const rows = c.sections.flatMap((section) => section.rows.map(([label]) => `${section.title}-${label}`));
  const filled = filledRows(step, rows.length);
  const done = step >= INTAKE_STEPS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 items-start">
      {/* Patient side: the web chat as the patient sees it */}
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
              <motion.span className="block h-full bg-[#06ACC1]" animate={{ width: `${8 + (step / INTAKE_STEPS) * 92}%` }} transition={{ duration: 0.6 }} />
            </span>
          </div>
          <div
            className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2.5"
            style={{ maskImage: 'linear-gradient(to bottom, transparent 0, black 48px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, black 48px)' }}
          >
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
            {step === SUGGESTION_AT + 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 pt-1">
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

      {/* Clinician side: the Samenvatting card on the interaction */}
      <AppCard
        icon="chat"
        title={c.summary}
        action={
          done ? (
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-1.5 rounded-full bg-[#E9FFF7] px-2.5 py-1 text-[11px] font-semibold text-[#1F9E6E]">
              <AppIcon name="circle-check" size={12} color="#1F9E6E" />
              {c.ready}
            </motion.span>
          ) : (
            <AppButton variant="subtle" icon="copy">{c.copy}</AppButton>
          )
        }
        bodyClassName="px-4 py-2"
      >
        {c.sections.map((section) => (
          <div key={section.title} className="py-3 border-b border-[#E8EAEC] last:border-0">
            <p className="flex items-center gap-1.5 text-[13px] text-[#06ACC1] mb-1.5">
              <span className="text-[9px]" aria-hidden="true">▼</span>
              {section.title}
            </p>
            {section.rows.map(([label, value]) => {
              const known = rows.indexOf(`${section.title}-${label}`) < filled;
              return (
                <p key={label} className="text-[12.5px] leading-relaxed pl-4">
                  <span className="font-semibold">{label}:</span>{' '}
                  {known ? (
                    <motion.span initial={{ opacity: 0, backgroundColor: 'rgba(6,172,193,0.25)' }} animate={{ opacity: 1, backgroundColor: 'rgba(6,172,193,0)' }} transition={{ duration: 1.2 }}>
                      {value}
                    </motion.span>
                  ) : (
                    <span className="text-[#949CB1]">…</span>
                  )}
                </p>
              );
            })}
          </div>
        ))}
      </AppCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Voice Reception: incoming call becomes a screening with a task      */
/* ------------------------------------------------------------------ */

const VOICE = {
  en: {
    calling: 'Incoming call',
    answered: 'Vesalius is answering',
    lines: [
      { from: 'patient', text: 'Hi, my knee has been swollen since yesterday. Can I get an appointment?' },
      { from: 'bot', text: 'I’m sorry to hear that. Can you still put weight on it?' },
      { from: 'patient', text: 'Yes, but it hurts when I walk.' },
      { from: 'bot', text: 'Thank you. I’ll put you through to the secretariat to book a slot.' },
    ],
    tasks: 'Tasks',
    task: 'Plan appointment within 48h: swollen knee, painful when walking',
    details: 'Screening details',
    channel: 'Channel',
    incoming: 'Incoming call',
    language: 'Language',
    languageValue: 'English',
    transfer: 'Forwarded',
    transferValue: 'Secretariat · connected',
    transcript: 'View transcription',
  },
  nl: {
    calling: 'Inkomende oproep',
    answered: 'Vesalius neemt op',
    lines: [
      { from: 'patient', text: 'Hallo, mijn knie is sinds gisteren gezwollen. Kan ik een afspraak krijgen?' },
      { from: 'bot', text: 'Vervelend om te horen. Kunt u er nog op steunen?' },
      { from: 'patient', text: 'Ja, maar het doet pijn als ik stap.' },
      { from: 'bot', text: 'Dank u. Ik verbind u door met het secretariaat om een afspraak in te plannen.' },
    ],
    tasks: 'Taken',
    task: 'Afspraak inplannen binnen 48u: gezwollen knie, pijnlijk bij stappen',
    details: 'Screeningdetails',
    channel: 'Kanaal',
    incoming: 'Inkomend gesprek',
    language: 'Taal',
    languageValue: 'Nederlands',
    transfer: 'Doorverbonden',
    transferValue: 'Secretariaat · verbonden',
    transcript: 'Bekijk transcriptie',
  },
  fr: {
    calling: 'Appel entrant',
    answered: 'Vesalius répond',
    lines: [
      { from: 'patient', text: 'Bonjour, mon genou est gonflé depuis hier. Puis-je avoir un rendez-vous ?' },
      { from: 'bot', text: 'Je suis désolé. Pouvez-vous encore vous appuyer dessus ?' },
      { from: 'patient', text: 'Oui, mais ça fait mal quand je marche.' },
      { from: 'bot', text: 'Merci. Je vous transfère au secrétariat pour fixer un rendez-vous.' },
    ],
    tasks: 'Tâches',
    task: 'Planifier un rendez-vous sous 48 h : genou gonflé, douloureux à la marche',
    details: 'Détails du dépistage',
    channel: 'Canal',
    incoming: 'Appel entrant',
    language: 'Langue',
    languageValue: 'Français',
    transfer: 'Transféré',
    transferValue: 'Secrétariat · connecté',
    transcript: 'Voir la transcription',
  },
};

export function VoiceDemo() {
  const c = useLocalized(VOICE);
  // 1–4 transcript, 5 task, 6 forwarded
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
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5 rounded-lg bg-[#FFF6E8] px-3 py-2.5 text-[12px]">
              <AppIcon name="warning" size={15} color="#F59E0C" className="mt-0.5" />
              <span>{c.task}</span>
            </motion.div>
          ) : (
            <p className="text-[12px] text-[#949CB1] px-1 py-1">…</p>
          )}
        </AppCard>
        <AppCard icon="file-medical-alt" title={c.details} bodyClassName="px-4 py-2">
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
