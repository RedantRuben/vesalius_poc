'use client';

import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow, Initials, StatusChip, type ScreeningStatus } from '../app-ui';
import { BotBubble, Choices, PatientBubble } from './neuro';
import { TemplatePicker } from './ortho';
import { Check, EASE, useSteps } from './shared';
import { MED_UI, Phone } from './medication';
import { useProfessionCopy } from '@/content/tailored';

type DemoPatient = { name: string; initials: string; dob: string; color: string; stage?: string };
type TriageRow = { name: string; initials: string; channel: string; summary: string; referral: string; referralTitle?: string; tasks: number; moment?: string; status?: ScreeningStatus; attention?: boolean };
type Visit = { room: number; slot: number; length: number; name: string; initials: string; reason: string; time?: string; cancelled?: boolean; appointmentType?: string };
type IntakeSummary = { title: string; sections: [string, [string, string][]][] };

function Patient({ patient, initials = patient.initials, name = patient.name, urgent = false }: { patient: DemoPatient; initials?: string; name?: string; urgent?: boolean }) {
  return (
    <span className="inline-flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-semibold">
      <Initials
        text={initials}
        size={24}
        color={initials === patient.initials ? patient.color : urgent ? '#C82247' : APP.secondary}
      />
      <span>{name}</span>
      {initials === patient.initials && patient.stage && <span className="rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10px] font-medium text-[#4E5670]">{patient.stage}</span>}
      {urgent && <AppIcon name="exclamation-triangle" size={14} color={APP.accent} />}
    </span>
  );
}

function Warning({ patient, name, initials, title, detail }: { patient: DemoPatient; name: string; initials: string; title: string; detail: string }) {
  return (
    <AppCard title={title} icon="exclamation-triangle" tone="widget">
      <p className="text-xs"><Patient patient={patient} name={name} initials={initials} urgent /></p>
      <p className="mt-2 text-xs leading-relaxed">{detail}</p>
    </AppCard>
  );
}

export const REFERRAL_STYLE = {
  Spoed: 'bg-[#FFE7ED] text-[#A91C3B]',
  MKA: 'bg-[#E6F4F1] text-[#246459]',
  Kinesitherapie: 'bg-[#FFF1E3] text-[#91460B]',
  NKO: 'bg-[#FFF1E3] text-[#91460B]',
  Orthognatisch: 'bg-[#EBF6F8] text-[#105D7C]',
  Voorrang: 'bg-[#FFF1E3] text-[#91460B]',
  'Normaal verloop': 'bg-[#F1F2F5] text-[#50596B]',
} as const;

const TRIAGE_GRID = 'grid grid-cols-[2.5rem_1fr_1.6fr] gap-3 md:grid-cols-[3rem_8rem_1fr_4.5rem_5rem]';

export function TriageCaseDemo({ patient, rows, urgentInitials, alert, routingNote, referralStyles = REFERRAL_STYLE }: {
  patient: DemoPatient;
  rows: TriageRow[];
  urgentInitials: string;
  alert: { name: string; detail: string };
  referralStyles?: Record<string, string>;
  routingNote?: string;
}) {
  const step = useSteps(rows.length + 1, 400, 150);
  const flagged = step > rows.length;
  return (
    <AppFrame active="screening" title="Screenings" actions={
      <span className="hidden items-center gap-1 text-[11px] md:flex">
        <span className="rounded-full px-2.5 py-1 text-[#949CB1]">Per dag</span>
        <span className="rounded-full bg-[#EBF6F8] px-2.5 py-1">Als lijst</span>
      </span>
    }>
      <div className="overflow-hidden rounded-xl border border-[#E8EAEC] bg-white" role="table" aria-label="Screenings">
        <div className={`${TRIAGE_GRID} bg-[#F4F5F8] px-4 py-2.5 text-[11px] font-medium`} role="row">
          {['Kanaal', 'Naam', 'Samenvatting', 'Openstaande taken', 'Status'].map((label, index) => (
            <span key={label} className={index > 2 ? 'hidden md:block' : ''} role="columnheader">{label}</span>
          ))}
        </div>
        {rows.slice(0, step).map(({ name, initials, channel, summary, referral, referralTitle, moment, tasks, status, attention }) => {
          const red = initials === urgentInitials && flagged;
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.28, ease: EASE }}
              className={`${TRIAGE_GRID} items-center border-t border-[#E8EAEC] px-4 py-3 text-[12px] ${red ? 'bg-[#FFE7ED]/60' : ''}`}
              role="row"
            >
              <span className="flex items-center gap-1" aria-label={channel} role="cell">
                <AppIcon name={channel === 'telefoon' ? 'phone' : 'chat'} size={15} color={APP.primary} />
                {red && <AppIcon name="exclamation-triangle" size={13} color={APP.accent} />}
              </span>
              <span className="flex min-w-0 items-center gap-2" role="cell">
                <Initials text={initials} size={22} color={initials === patient.initials ? patient.color : initials === urgentInitials ? APP.accent : APP.secondary} />
                <span className="truncate font-medium" title={name}>{name}</span>
              </span>
              <span className="flex min-w-0 flex-wrap items-center gap-1.5 lg:flex-nowrap" role="cell">
                <span className="min-w-0 truncate text-[#4E5670]" title={summary}>{summary}</span>
                {referral && <motion.span
                  title={referralTitle}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${referralStyles[referral]}`}
                >
                  {attention && <span className="mr-1 text-[#F59E0C]" title="Aandachtspunt" aria-label="Aandachtspunt">●</span>}
                  {referral}
                </motion.span>}
                {moment && <span className="inline-flex shrink-0 rounded-full bg-[#F1F2F5] px-2 py-0.5 text-[10px] font-semibold text-[#50596B]">{moment}</span>}
              </span>
              <span className="hidden tabular-nums md:block" role="cell">{tasks}</span>
              <span className="hidden md:block" role="cell"><StatusChip status={status ?? "COMPLETED"} /></span>
            </motion.div>
          );
        })}
      </div>
      {flagged && routingNote && <p className="mt-2.5 px-1 text-[11px] text-[#949CB1]">{routingNote}</p>}
      {flagged && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-3 rounded-xl shadow-[0_24px_40px_-20px_rgba(42,58,81,0.5)] md:ml-auto md:w-[420px]"
        >
          <Warning patient={patient} name={alert.name} initials={urgentInitials} title="Aandacht" detail={alert.detail} />
        </motion.div>
      )}
    </AppFrame>
  );
}

const ROOM_COLORS = ['#4A90E2', '#4A9AA5', '#7C8B3A'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00'];
const SLOT_PX = 44;
const ROOM_GRID = 'grid grid-cols-[3.25rem_repeat(3,minmax(0,1fr))]';

export function AgendaCaseDemo({ patient, visits, urgentInitials, priorityInitials, referrals, readyDetail, decision, readyLabel = 'Vragenlijst ingevuld', hours = HOURS, roomLabels, dayLabel = 'maandag 9 november 2026', appointmentStyles, details }: {
  patient: DemoPatient;
  visits: Visit[];
  urgentInitials: string;
  priorityInitials?: string;
  referrals: string;
  readyDetail?: string;
  readyLabel?: string;
  hours?: string[];
  roomLabels?: [string, string, string];
  dayLabel?: string;
  appointmentStyles?: Record<string, { color: string; background: string }>;
  details?: ReactNode;
  decision?: string;
}) {
  const step = useSteps(visits.length + 1, 520, 400);
  const shown = visits.slice(0, step);
  const ready = step > visits.length;

  return (
    <AppFrame
      active="visits"
      title={
        <span>
          {dayLabel} <span className="text-[#E8EAEC]">|</span>{' '}
          <motion.span key={shown.length} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-[#06ACC1]">
            {shown.length}
          </motion.span>{' '}
          afspraken
        </span>
      }
      actions={
        <span className="hidden items-center gap-1 text-[11px] md:flex">
          {['Dag', 'Week', 'Maand'].map((view, index) => (
            <span key={view} className={`rounded-full px-2.5 py-1 ${index === 0 ? 'bg-[#EBF6F8]' : 'text-[#949CB1]'}`}>{view}</span>
          ))}
          <span className="ml-1 rounded-full bg-[#EBF6F8] px-2.5 py-1">Per ruimte</span>
        </span>
      }
    >
      <div className="overflow-x-auto rounded-xl border border-[#E8EAEC] bg-white">
        <div className="min-w-[35rem]">
          <div className={`${ROOM_GRID} border-b border-[#E8EAEC]`}>
            <span />
            {ROOM_COLORS.map((color, index) => {
              const room = index + 1;
              return (
                <span key={room} className="flex items-center justify-between border-l-2 px-3 py-2 text-[11px] font-medium" style={{ borderLeftColor: color }}>
                  {roomLabels?.[index] ?? `Room ${room}`}
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#06ACC1] text-[10px] tabular-nums text-white">
                    {shown.filter((visit) => visit.room === room).length}
                  </span>
                </span>
              );
            })}
          </div>
          <div className={ROOM_GRID}>
            <div>
              {hours.map((hour) => (
                <p key={hour} className="pr-2 pt-1 text-right text-[10.5px] font-medium tabular-nums" style={{ height: SLOT_PX }}>{hour}</p>
              ))}
            </div>
            {ROOM_COLORS.map((color, index) => (
              <div key={color} className="relative border-l border-[#E8EAEC]" style={{ height: hours.length * SLOT_PX }}>
                {hours.map((hour, slot) => (
                  <span key={hour} className="absolute inset-x-0 border-t border-dashed border-[#E8EAEC]" style={{ top: slot * SLOT_PX }} />
                ))}
                {shown.filter((visit) => visit.room === index + 1).map((visit) => {
                  const mainPatient = visit.initials === patient.initials;
                  const urgent = visit.initials === urgentInitials;
                  const priority = visit.initials === priorityInitials;
                  const appointmentStyle = visit.appointmentType ? appointmentStyles?.[visit.appointmentType] : undefined;
                  const compact = Boolean(appointmentStyle) && visit.length < 0.5;
                  const accent = appointmentStyle?.color ?? (mainPatient ? patient.color : urgent ? APP.accent : priority ? '#F59E0C' : color);
                  const background = appointmentStyle?.background ?? (mainPatient ? '#E6F4F1' : urgent ? '#FFE7ED' : priority ? '#FFF6E8' : `${color}1A`);
                  return (
                    <motion.div
                      key={visit.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      tabIndex={(mainPatient && ready) || compact ? 0 : undefined}
                      role={compact ? 'group' : undefined}
                      aria-label={compact ? `${visit.time} · ${visit.name} · ${visit.appointmentType} · ${visit.reason}` : undefined}
                      data-duration-minutes={visit.length * 30}
                      title={mainPatient && ready ? [visit.reason, readyLabel, readyDetail, decision].filter(Boolean).join(' · ') : compact ? `${visit.time} · ${visit.name} · ${visit.appointmentType} · ${visit.reason}` : visit.reason}
                      className={`group absolute left-1 right-1 overflow-hidden rounded-md px-2 ${compact ? 'py-0' : 'py-1'} text-[10.5px] leading-tight ${visit.cancelled ? 'line-through' : ''}`}
                      style={{ top: visit.slot * SLOT_PX + 2, height: visit.length * SLOT_PX - 4, backgroundColor: background, borderLeft: `3px solid ${accent}` }}
                    >
                      <p className="flex items-center gap-1.5 truncate font-semibold">
                        {mainPatient && <Initials text={patient.initials} color={patient.color} size={16} />}
                        {urgent && <AppIcon name="exclamation-triangle" size={11} color={APP.accent} />}
                        {mainPatient && ready && visit.length <= 1 && <Check size={10} />}
                        {visit.time && <time dateTime={visit.time}>{visit.time}</time>}
                        {visit.length < 1 ? (
                          <>
                            <span className="shrink-0">{visit.name}</span>
                            <span className="truncate font-normal text-[#4E5670]">· {visit.reason}</span>
                          </>
                        ) : visit.name}
                      </p>
                      {visit.length >= 1 && <p className={visit.length > 1 ? 'text-[#4E5670]' : 'truncate text-[#4E5670]'}>{visit.reason}</p>}
                      {mainPatient && ready && visit.length > 1 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#1F9E6E] ring-1 ring-[#37C18D]/30"
                        >
                          <Check size={10} />
                          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[10rem] group-focus:max-w-[10rem]">{readyLabel}</span>
                          {readyDetail && <span className="hidden whitespace-nowrap group-hover:inline group-focus:inline">· {readyDetail}</span>}
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2.5 min-h-[16px] px-1 text-[11px] text-[#949CB1]">
        {ready && (
          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5">
            <AppIcon name="arrow-fork-down" size={11} color="#B4531A" />
            {referrals}
          </motion.span>
        )}
      </p>
      {details}
    </AppFrame>
  );
}

function Chat({ lines, count, options, attachment }: {
  lines: string[];
  count: number;
  options?: { after: number; rows: string[][]; selected?: string };
  attachment?: { line: number; content: ReactNode };
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {lines.slice(0, count).map((message, index) => {
        if (attachment?.line === index) return <PatientBubble key={message}>{attachment.content}</PatientBubble>;
        const assistant = index % 2 === 0;
        return assistant ? (
          <BotBubble key={message}><span className="sr-only">Assistent: </span>{message}</BotBubble>
        ) : (
          <PatientBubble key={message}><span className="sr-only">Patiënt: </span>{message}</PatientBubble>
        );
      })}
      {options && (count === options.after || (count === options.after + 1 && options.selected)) && options.rows.map((row) => (
        <Choices key={row[0]} options={row} selected={count > options.after ? options.selected : undefined} />
      ))}
    </div>
  );
}

export function PreConsultationCaseDemo({ patient, chat, summaries, openSections, highlightField, revealAt, options, attachment, summaryAttachment, summaryLead, finalContent, highlightSections = [], finalOptions = ['Ja', 'Nee'] }: {
  patient: DemoPatient;
  chat: string[];
  summaries: IntakeSummary[];
  openSections: string[];
  highlightField: string | string[];
  revealAt: Record<string, number>;
  options?: { after: number; rows: string[][]; selected?: string };
  attachment?: { line: number; content: ReactNode };
  summaryAttachment?: { section: string; content: ReactNode; replaceFields?: boolean };
  summaryLead?: ReactNode;
  finalContent?: ReactNode;
  highlightSections?: string[];
  finalOptions?: string[];
}) {
  const step = useSteps(chat.length, 1000, 400);
  const [summary, setSummary] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const activeSummary = summaries[summary];
  const summaryId = useId();
  const { intro, progress, placeholder } = MED_UI.nl;

  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[300px_minmax(0,1fr)]">
      <Phone intro={intro} progress={progress} placeholder={placeholder} fill={10 + step * 7} scrollableTranscript={Boolean(attachment || finalContent) || chat.length > 5}>
        <Chat lines={chat} count={step} options={options} attachment={attachment} />
        {step === chat.length && finalContent}
        {step === chat.length && finalOptions.length > 0 && <Choices options={finalOptions} />}
      </Phone>

      <AppCard
        icon="chat"
        title="Samenvatting"
        action={<AppButton variant="subtle" icon="copy">Kopieer</AppButton>}
        bodyClassName="px-4 pb-2"
      >
        <div className="-mx-4 flex gap-5 overflow-x-auto border-b border-[#E8EAEC] px-4 text-[13px]" role="tablist" aria-label="Voorbeeldvragenlijst">
          {summaries.map(({ title }, index) => (
            <button
              key={title}
              type="button"
              role="tab"
              id={`${summaryId}-${index}`}
              aria-selected={summary === index}
              aria-controls={summaryId}
              onClick={() => setSummary(index)}
              className={`-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 py-2.5 transition-colors ${summary === index ? 'border-[#06ACC1] font-medium text-[#2A3A51]' : 'border-transparent text-[#949CB1] hover:text-[#2A3A51]'}`}
            >
              {index === 0 && <Initials text={patient.initials} color={patient.color} size={18} />}
              {title}
            </button>
          ))}
        </div>
        <div id={summaryId} role="tabpanel" aria-labelledby={`${summaryId}-${summary}`}>
          {summary === 0 && step === chat.length && summaryLead}
          {activeSummary.sections.map(([title, fields]) => {
            const key = `${summary}-${title}`;
            const open = expanded[key] ?? (summary !== 0 || openSections.includes(title));
            return (
              <div key={key} className="border-b border-[#E8EAEC] py-2.5 last:border-0">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setExpanded((current) => ({ ...current, [key]: !open }))}
                  className="flex w-full items-center gap-1.5 text-left text-[13px] text-[#06ACC1]"
                >
                  <span className={`text-[9px] transition-transform ${open ? '' : '-rotate-90'}`} aria-hidden="true">▼</span>
                  {title}
                  {!open && <span className="text-[#949CB1]">· {fields.length}</span>}
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1.5">
                        {!(summary === 0 && summaryAttachment?.section === title && summaryAttachment.replaceFields) && fields.map(([label, value]) => {
                          const known = summary !== 0 || step >= (revealAt[title] ?? chat.length);
                          const marked = known && ((Array.isArray(highlightField) ? highlightField.includes(label) : label === highlightField) || (summary === 0 && highlightSections.includes(title)));
                          return (
                            <p key={label} className={`pl-4 text-[12.5px] leading-relaxed ${marked ? 'my-1 -ml-1 rounded-lg bg-[#EBF6F8] py-1.5 pl-5 pr-2 ring-1 ring-[#06ACC1]/30' : ''}`}>
                              <b className="font-semibold">{label}:</b>{' '}{known ? value : '…'}
                            </p>
                          );
                        })}
                        {summary === 0 && summaryAttachment?.section === title && step >= (attachment ? attachment.line + 1 : chat.length) && summaryAttachment.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </AppCard>
    </div>
  );
}

export function VoiceCaseDemo({ patient, chat, task, taskDetail, chatFooter, callLog }: { patient: DemoPatient; chat: string[]; task: string; taskDetail?: ReactNode; chatFooter?: string; callLog?: ReactNode }) {
  const lines = chat.length;
  const step = useSteps(lines + 2, 1000, 500);
  const complete = step >= lines + 2;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col rounded-[18px] bg-[#2A3A51] p-5 text-white">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <AppIcon name="phone-incoming" size={18} color="#fff" />
          </span>
          <span>
            <span className="block text-sm font-semibold">+32 4•• •• 71 05</span>
            <span className="block text-[11px] text-white/60">{step >= 1 ? 'Oproep beantwoord' : 'Inkomende oproep…'}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {chat.slice(0, step).map((message, index) => (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-snug ${index % 2 ? 'self-end bg-[#06ACC1] text-white' : 'self-start bg-white/10 text-white/90'}`}
            >
              {message}
            </motion.p>
          ))}
        </div>
        {step > lines && chatFooter && <p className="mt-3 text-[11px] text-white/60">{chatFooter}</p>}
      </div>

      <div className="flex flex-col gap-3">
        <div><StatusChip status={complete ? 'COMPLETED' : step >= 1 ? 'IN_PROGRESS' : 'STARTED'} /></div>
        <AppCard icon="list-checked" title="Taken" bodyClassName="p-3">
          {step > lines ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 rounded-lg bg-[#E9FFF7] px-3 py-2.5 text-[12px]"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#37C18D]">
                <Check size={10} color="#fff" />
              </span>
              {taskDetail ? <div>{task}<div className="mt-1 font-medium">{taskDetail}</div></div> : task}
            </motion.div>
          ) : <p className="px-1 py-1 text-[12px] text-[#949CB1]">…</p>}
        </AppCard>
        <AppCard icon="file-medical-alt" title="Details" bodyClassName="px-4 py-2">
          <DetailRow label="Patiënt" value={<Patient patient={patient} />} />
          <DetailRow label="Kanaal" value={
            <span className="inline-flex items-center gap-1.5">
              <AppIcon name="phone-incoming" size={13} color={APP.primary} /> Inkomend gesprek
            </span>
          } />
          <DetailRow label="Taal" value="Nederlands" />
          <DetailRow label="Doorverbonden" value={complete ? <span className="font-medium text-[#1F9E6E]">Niet nodig</span> : '–'} />
        </AppCard>
        <AppButton className="w-full py-2.5">Toon transcript</AppButton>
      </div>
      {callLog && <div className="md:col-span-2">{callLog}</div>}
    </div>
  );
}

export function ScribeCaseDemo({ patient, chat, note, template, options, questionnaire, featuredSource, clinicianRole = 'Arts', speakers, featuredSections, noteLead, noteFooter, templateOptionPrefix, templateSelected = 0, sessionLabel, noteTables }: {
  patient: DemoPatient;
  chat: string[];
  note: string[][];
  template: string;
  options: string[];
  questionnaire: string;
  featuredSource?: string;
  clinicianRole?: string;
  speakers?: string[];
  featuredSections?: string[];
  noteLead?: ReactNode;
  noteFooter?: ReactNode;
  templateOptionPrefix?: string;
  templateSelected?: number;
  sessionLabel?: string;
  noteTables?: Partial<Record<string, { headers: string[]; rows: string[][] }>>;
}) {
  const professionalRole = useProfessionCopy(clinicianRole, 'reader');
  const lines = chat.length;
  const step = useSteps(lines + 2, 1300, 500);
  const recording = step <= lines;
  const [full, setFull] = useState(false);
  const primary = featuredSections ? note.filter(([title]) => featuredSections.includes(title)) : note.slice(-2);
  const secondary = featuredSections ? note.filter(([title]) => !featuredSections.includes(title)) : note.slice(0, -2);

  return (
    <AppFrame active="interactions" title={<Patient patient={patient} />}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
        <AppCard
          icon="microphone"
          title={sessionLabel ? 'Sessie' : 'Consultatie'}
          bodyClassName="flex flex-col gap-3 p-4"
          action={
            <span className="flex items-center gap-1.5">
              <TemplatePicker label={template} options={options} optionPrefix={templateOptionPrefix} selected={templateSelected} />
              <span className="hidden rounded-lg px-2.5 py-1 text-[11px] ring-1 ring-[#E8EAEC] md:inline">Automatisch</span>
              <AppButton variant={recording ? 'danger' : 'subtle'} icon="microphone" className="hidden md:inline-flex">
                {recording ? 'Stop' : 'Opnemen'}
              </AppButton>
            </span>
          }
        >
          {recording && (
            <div className="flex items-center gap-3">
              <AppButton variant="subtle" icon="eye">Toon transcript</AppButton>
              <span className="flex items-center gap-2 text-[11px] text-[#4E5670]">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#DE3C4B]" />
                Microfoon actief
              </span>
            </div>
          )}
          <AnimatePresence mode="wait">
            {recording ? (
              <motion.div key="transcript" exit={{ opacity: 0 }} className="flex min-h-[190px] flex-col gap-2.5 rounded-lg border border-[#E8EAEC] bg-[#F9FAFB] p-3">
                {chat.slice(0, step).map((message, index) => (
                  <motion.p key={message} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-[12px] leading-snug">
                    <span className={`font-semibold ${index % 2 ? 'text-[#0B759F]' : 'text-[#06ACC1]'}`}>{speakers?.[index] ?? (index % 2 ? 'Patiënt' : professionalRole)}: </span>
                    {message}
                  </motion.p>
                ))}
              </motion.div>
            ) : step === lines + 1 ? (
              <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-[48px] items-center gap-2 rounded-lg bg-[#EBF6F8] px-3 py-2.5 text-[12px]">
                <AppIcon name="refresh-double" size={14} color={APP.primary} />
                Nota wordt gegenereerd…
              </motion.div>
            ) : (
              <motion.div key="summary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F4F5F8] px-3 py-2 text-[11px]">
                  <span>Gegenereerd met sjabloon <b>{template}</b></span>
                  <AppButton variant="subtle" icon="copy">Kopieer</AppButton>
                </div>
                {noteLead}
                {[...primary, ...secondary].map(([title, detail], index) => (
                  <section key={title} className="px-1">
                    <h3 className="text-[12.5px] text-[#06ACC1]">
                      {title}
                      {featuredSource && index < primary.length && (
                        <span className="ml-2 rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10px] font-medium text-[#4E5670]">{featuredSource}</span>
                      )}
                    </h3>
                    {noteTables?.[title] && <ExampleTable caption={`${title} · Voorbeelddata`} headers={noteTables[title].headers} rows={noteTables[title].rows} />}
                    <p className={`text-[12.5px] leading-relaxed ${index >= primary.length && !full ? 'line-clamp-1 text-[#4E5670]' : ''}`}>{detail}</p>
                  </section>
                ))}
                <button type="button" aria-expanded={full} onClick={() => setFull(!full)} className="self-start px-1 text-[12px] font-medium text-[#06ACC1] hover:underline">
                  {full ? 'Toon minder' : 'Toon volledige nota'}
                </button>
                {noteFooter}
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title={<Patient patient={patient} />} bodyClassName="px-4 py-2" className="self-start">
          <DetailRow label="Geboortedatum" value={patient.dob} />
          <DetailRow label="Vragenlijst" value={questionnaire} />
          {sessionLabel && <DetailRow label="Sessie" value={sessionLabel} />}
          <DetailRow label="Taal" value="Nederlands" />
        </AppCard>
      </div>
    </AppFrame>
  );
}

const LETTER_SECTIONS = ['REDEN VOOR CONTACT', 'ANAMNESE', 'KLINISCH ONDERZOEK', 'AANVULLENDE ONDERZOEKEN', 'DIAGNOSE', 'CONCLUSIE', 'BELEID'];

export function DocumentCaseDemo({ patient, documents, letter, letterPreview, consentRisks, generationOrder = [0, 3, 2, 1], featuredDocument, letterToggle = 'Toon volledige brief', letterIndex = 1, letterHighlight, documentBadges }: {
  patient: DemoPatient;
  documents: string[][];
  letter: string[];
  letterPreview: string;
  consentRisks?: string[];
  generationOrder?: number[];
  featuredDocument?: { index: number; title: string; content: ReactNode };
  letterToggle?: string;
  letterIndex?: number;
  letterHighlight?: string;
  documentBadges?: Partial<Record<number, string>>;
}) {
  const step = useSteps(generationOrder.length, 1000, 900);
  const [fullLetter, setFullLetter] = useState(false);
  const [fullConsent, setFullConsent] = useState(false);
  const generated = generationOrder.slice(0, step);
  const tabs = ['Consultatie', 'Verslag', 'Documenten'];

  return (
    <AppFrame active="interactions" title={<Patient patient={patient} />}>
      <div className="rounded-xl border border-[#E8EAEC] bg-white">
        <div className="flex gap-5 overflow-x-auto border-b border-[#E8EAEC] px-4 text-[13px]">
          {tabs.map((tab) => (
            <span key={tab} className={`py-2.5 ${tab === 'Documenten' ? 'border-b-2 border-[#06ACC1] text-[#2A3A51]' : 'text-[#4E5670]'}`}>{tab}</span>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-[14px] font-semibold">Documentsjablonen</p>
            <AppButton variant="bordered" icon="plus">Sjablonen openen</AppButton>
          </div>
          <div className="flex flex-col gap-2">
            {documents.map(([label, description, status], index) => {
              const complete = generated.includes(index);
              return (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-[#E8EAEC] px-3 py-2.5">
                  <span className="shrink-0 rounded-md bg-[#EBF6F8] px-1.5 py-1 text-[10px] font-bold text-[#06ACC1]">DOC</span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[12.5px] font-medium">{label}</span>
                      {documentBadges?.[index] && <span className="rounded-full bg-[#F4F5F8] px-2 py-0.5 text-[10px] font-semibold text-[#4E5670]">{documentBadges[index]}</span>}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${complete ? 'bg-[#E9FFF7] text-[#1F9E6E]' : 'bg-[#F4F5F8] text-[#949CB1]'}`}>
                        {complete ? status : generationOrder.includes(index) ? 'Wordt gegenereerd…' : status}
                      </span>
                    </span>
                    <span className="block text-[11px] text-[#949CB1]">{description}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {[...generated].reverse().map((index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-start gap-3 rounded-lg border border-[#E8EAEC] bg-[#F9FAFB] px-3 py-2.5"
              >
                <AppIcon name="file-check-alt" size={18} color={APP.primary} className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium">{featuredDocument?.index === index ? featuredDocument.title : documents[index][0]} <span className="font-normal text-[#949CB1]">· Vandaag</span></p>
                  {featuredDocument?.index === index ? featuredDocument.content : index === letterIndex && fullLetter ? (
                    <div className="mt-2 space-y-2.5 rounded-lg border border-[#E8EAEC] bg-white px-4 py-3 text-[12px] leading-relaxed">
                      {letter.map((paragraph) => {
                        const heading = LETTER_SECTIONS.find((section) => paragraph.startsWith(`${section} `));
                        return heading ? (
                          <section key={heading}>
                            <h3 className="text-[13px] font-semibold tracking-[0.06em] text-[#0B759F] [font-variant-caps:all-small-caps]">{heading.toLowerCase()}</h3>
                            <p>
                              {letterHighlight && paragraph.includes(letterHighlight) ? (
                                <>{paragraph.slice(heading.length + 1, paragraph.indexOf(letterHighlight))}<mark className="rounded-sm bg-[#EBF6F8] text-inherit">{letterHighlight}</mark>{paragraph.slice(paragraph.indexOf(letterHighlight) + letterHighlight.length)}</>
                              ) : paragraph.slice(heading.length + 1)}
                            </p>
                          </section>
                        ) : <p key={paragraph}>{paragraph}</p>;
                      })}
                    </div>
                  ) : <p className="text-[11.5px] leading-snug text-[#4E5670]">{index === letterIndex ? letterPreview : documents[index][1]}</p>}
                  {index === letterIndex && (
                    <button type="button" aria-expanded={fullLetter} onClick={() => setFullLetter(!fullLetter)} className="mt-1.5 text-[12px] font-medium text-[#06ACC1] hover:underline">
                      {fullLetter ? 'Toon minder' : letterToggle}
                    </button>
                  )}
                  {index === 2 && consentRisks && (
                    <>
                      <button type="button" aria-expanded={fullConsent} onClick={() => setFullConsent(!fullConsent)} className="mt-1.5 text-[12px] font-medium text-[#06ACC1] hover:underline">
                        {fullConsent ? 'Verberg besproken risico’s' : 'Toon besproken risico’s'}
                      </button>
                      {fullConsent && (
                        <ul className="mt-2 space-y-1.5 text-xs">
                          {consentRisks.map((risk) => (
                            <li key={risk} className="flex items-center gap-2"><Check color="#246459" /> {risk}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export function RecoveryScoreBars({ measures, period, color, locale = 'nl' }: {
  measures: { label: string; min?: number; max: number; before: number | null; after: number; suffix?: string; showRange?: boolean; higherIsBetter?: boolean }[];
  period: string;
  color: string;
  locale?: string;
}) {
  return (
    <>
      <p className="mb-2 text-[11px] text-[#949CB1]">{period}</p>
      <div className="flex flex-col gap-2">
        {measures.map(({ label, min = 0, max, before, after, suffix = '', showRange = true, higherIsBetter = false }, index) => (
          <div key={label}>
            <p className="mb-1 flex justify-between gap-2 text-[11px]">
              <span className="inline-flex flex-wrap items-center gap-1.5">
                {label} {showRange && <span className="text-[#949CB1]">· {min}–{max}{suffix}</span>}
                <span className="rounded-full bg-[#E9FFF7] px-1.5 py-px text-[9.5px] font-semibold text-[#1F9E6E]">{higherIsBetter ? '↑ hoger = beter' : '↓ lager = beter'}</span>
              </span>
              <span className="shrink-0 tabular-nums text-[#4E5670]">
                {before !== null && <>{before.toLocaleString(locale)}{suffix} → </>}<b className="text-[#2A3A51]">{after.toLocaleString(locale)}{suffix}</b>
              </span>
            </p>
            <div className="flex flex-col gap-0.5" aria-hidden="true">
              {before !== null && <span className="h-1.5 overflow-hidden rounded-full bg-[#F4F5F8]">
                <motion.span
                  className="block h-full rounded-full bg-[#D5D9E0]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(before - min) / (max - min) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: EASE }}
                />
              </span>}
              <span className="h-1.5 overflow-hidden rounded-full bg-[#F4F5F8]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(after - min) / (max - min) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.08, ease: EASE }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ExampleTable({ caption, headers, rows }: {
  caption: ReactNode;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
    <table className={`w-full table-fixed text-left text-[11px] leading-snug ${headers.length > 4 ? 'min-w-[35rem]' : ''}`}>
      <caption className="pb-2 text-left font-semibold">{caption}</caption>
      <colgroup>
        {headers.map((header, index) => <col key={header} style={{ width: `${index === 0 ? 34 : 66 / (headers.length - 1)}%` }} />)}
      </colgroup>
      <thead className="bg-[#F4F5F8]">
        <tr>{headers.map((header) => <th key={header} scope="col" className="break-words px-1 py-2 sm:px-2">{header}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-[#E8EAEC]">
        {rows.map(([label, ...values]) => (
          <tr key={`${label}-${values[0]}`}>
            <th scope="row" className="break-words px-1 py-2 align-top sm:px-2 font-medium">{label}</th>
            {values.map((value, index) => <td key={headers[index + 1]} className="break-words px-1 py-2 align-top sm:px-2">{value}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export function FollowUpCaseDemo({ patient, rows, initials, alert, chat, checkInTitle, charts, scores, scoreHeaders, questionnaires, planIntro, treatment, completedMoment, checkInNote, greeting = 'Hallo Dr. Vesalius!', planNote = 'Elke vragenlijst gaat opnieuw de rode vlaggen na.', plansTitle = 'Vragenlijsten per behandeling' }: {
  patient: DemoPatient;
  rows: string[][];
  initials: string[];
  alert: { name: string; detail: string };
  chat: string[];
  checkInTitle: string;
  checkInNote?: string;
  charts: ReactNode;
  scores: string[][];
  scoreHeaders: string[];
  questionnaires: string[][];
  planIntro: string;
  treatment: string;
  completedMoment: string;
  greeting?: string;
  planNote?: string;
  plansTitle?: string;
}) {
  const professionalPlanIntro = useProfessionCopy(planIntro, 'reader');
  const professionalScores = useProfessionCopy(scores, 'reader');
  const step = useSteps(rows.length + 2, 720, 450);
  const hasAlert = step > rows.length;
  const [showLotte, setShowLotte] = useState<boolean | null>(null);
  const open = showLotte ?? step >= rows.length + 2;
  const checkInId = useId();

  return (
    <AppFrame
      active="dashboard"
      title={greeting}
      subtitle={
        <span className={`inline-flex items-center gap-1 ${hasAlert ? 'text-[#DE3C4B]' : ''}`}>
          <AppIcon name="exclamation-triangle" size={11} color={hasAlert ? '#DE3C4B' : APP.darkGrey} />
          {hasAlert ? 'U hebt 1 waarschuwingstaak' : 'Geen waarschuwingstaken'}
        </span>
      }
    >
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        <AppCard tone="widget" icon="clipboard-notes" title="Recente screenings" bodyClassName="flex min-h-[236px] flex-col gap-2 p-3">
          {rows.map(([name, reason], index) => {
            if (step < rows.length - index) return null;
            const mainPatient = initials[index] === patient.initials;
            const red = index === 0 && hasAlert;
            const row = (
              <>
                <Initials text={initials[index]} size={30} color={mainPatient ? patient.color : red ? APP.accent : APP.secondary} />
                <span className="min-w-0 flex-1 text-left">
                  <span className="flex items-center gap-1.5 text-[12.5px] font-semibold">
                    {name}
                    {red && <AppIcon name="exclamation-triangle" size={11} color={APP.accent} />}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-[#949CB1]">
                    <AppIcon name="calendar-alt" size={11} color={APP.darkGrey} />
                    {reason}
                  </span>
                </span>
              </>
            );
            const rowClass = 'flex items-center gap-3 rounded-xl border px-3 py-2.5';
            return (
              <motion.div key={name} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                {mainPatient ? (
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={checkInId}
                    onClick={() => setShowLotte(!open)}
                    className={`${rowClass} w-full transition-colors ${open ? 'border-[#2C766A]/40 bg-[#E6F4F1]' : 'border-[#E8EAEC] hover:bg-[#F9FAFB]'}`}
                  >{row}</button>
                ) : (
                  <div className={`${rowClass} ${red ? 'border-[#DE3C4B]/40 bg-[#FFE7ED]/50' : 'border-[#E8EAEC]'}`}>{row}</div>
                )}
              </motion.div>
            );
          })}
        </AppCard>

        <AppCard tone="widget" icon="exclamation-triangle" title="Waarschuwingstaken" bodyClassName="flex min-h-[120px] flex-col justify-center p-3">
          {hasAlert ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 rounded-lg bg-[#FFE7ED] px-3 py-2.5 text-[12px]">
                <AppIcon name="exclamation-triangle" size={15} color={APP.accent} className="mt-0.5" />
                <p><b>{alert.name}</b> · {alert.detail}</p>
              </div>
              <AppButton className="w-full py-2">Bekijk alle taken</AppButton>
            </motion.div>
          ) : <p className="text-center text-[12px] text-[#949CB1]">Geen waarschuwingstaken</p>}
        </AppCard>
      </div>

      <div id={checkInId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex flex-col gap-4 pt-4">
                <AppCard
                  icon="user"
                  title={<Patient patient={patient} />}
                  action={<span className="text-[10.5px] font-medium text-[#949CB1]">Voorbeelddata</span>}
                  bodyClassName="grid grid-cols-1 gap-5 p-4 md:grid-cols-[0.9fr_1.1fr]"
                >
                  <div>
                    <p className="mb-2 text-[11px] font-medium text-[#949CB1]">{checkInTitle}</p>
                    <div className="flex flex-col gap-2">
                      {chat.map((message, index) => (
                        <motion.p
                          key={message}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.2 }}
                          className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${index % 2 ? 'self-end bg-[#06ACC1] text-white' : 'self-start bg-[#F4F5F8]'}`}
                        >{message}</motion.p>
                      ))}
                    </div>
                    {checkInNote && <blockquote className="mt-3 rounded-lg bg-[#F4F5F8] px-3 py-2 text-[11.5px] leading-snug">“{checkInNote}”</blockquote>}
                  </div>
                  <div className="min-w-0">
                    {charts}
                    <ExampleTable
                      caption="Herstel · Voorbeelddata"
                      headers={scoreHeaders}
                      rows={professionalScores}
                    />
                  </div>
                </AppCard>

                <AppCard icon="list-checked" title={plansTitle}>
                  <p className="mb-3 max-w-xl text-[11.5px] leading-snug text-[#4E5670]">{professionalPlanIntro}</p>
                  <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-3">
                    {[...new Set(questionnaires.map(([name]) => name))].map((name) => (
                      <div key={name} className={`rounded-xl border px-3 py-2.5 ${name === treatment ? 'border-[#2C766A]/30 bg-[#E6F4F1]/70' : 'border-[#E8EAEC]'}`}>
                        <p className="mb-2 text-[12px] font-semibold">{name}</p>
                        <ul className="flex flex-col gap-2">
                          {questionnaires.filter(([group]) => group === name).map(([, moment, label, questions]) => (
                            <li key={moment} className="text-[11px] leading-snug">
                              <span className="flex flex-wrap items-center gap-1.5">
                                <span className="font-semibold tabular-nums text-[#0B759F]">{moment}</span>
                                <span className="font-medium">{label}</span>
                                {name === treatment && moment === completedMoment && (
                                  <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E9FFF7] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#1F9E6E]">
                                    <Check size={9} /> Ingevuld
                                  </span>
                                )}
                              </span>
                              <span className="block text-[#4E5670]">{questions}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#4E5670]">
                    <AppIcon name="exclamation-triangle" size={11} color={APP.darkGrey} />
                    {planNote}
                  </p>
                </AppCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppFrame>
  );
}
