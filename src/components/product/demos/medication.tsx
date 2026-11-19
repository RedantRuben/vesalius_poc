'use client';

/**
 * Medication, the same on every page: the patient sends one photo of their medicine boxes in the chat, the assistant
 * reads it and asks whether the list is right, and the structured list fills in next to it. Only the content differs
 * per specialty. The photo is a generic CC0 picture of medicine packaging (Wikimedia Commons, "Samples of drugs" by
 * Beendy234), kept small and soft so it reads as "a photo of boxes", not as the specific brands.
 */

import { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { SiteLocale } from '@/content/orthopedics';
import { APP, AppButton, AppCard, AppFrame, AppIcon, Initials } from '../app-ui';
import { Check, EASE, TypingDots, useLocalized, useSteps } from './shared';

export type MedTag = { label: string; tone: 'amber' | 'red' | 'blue' };

export type Med = {
  name: string;
  strength: string;
  substance: string;
  frequency: string;
  indication: string;
  form?: string;
  source?: string;
  chatLabel?: string;
  highlightDetails?: boolean;
  tag?: MedTag;
  /** Not on the photo: the patient mentions it in the chat, and it joins the list after their confirmation. */
  later?: boolean;
};

export type MedicationCopy = {
  title: string;
  scrollableTranscript?: boolean;
  intro: string;
  progress: string;
  placeholder: string;
  /** The assistant asks for a photo. */
  ask: string;
  /** What the assistant recognised, then "is this right?" */
  found: string;
  photoMessage?: string;
  correct: string;
  choices: [string, string];
  /** The patient's confirmation; may mention what they had forgotten. */
  confirm: string;
  exampleData: string;
  list: string;
  copy: string;
  head: [string, string, string, string];
  reading: string;
  recognised: (count: number) => string;
  confirmed: string;
  meds: Med[];
  /** Optional extra question after the confirmation, e.g. about anticoagulants. */
  followUp?: FollowUpQuestion;
  /** Several extra questions in a row; used instead of `followUp` when present. */
  followUps?: FollowUpQuestion[];
  /** The photo is of a pharmacy's medication schedule (a printed list) instead of the medicine boxes. */
  schedule?: { header: string; rows: [string, string][] };
  /** Optional status lines under the list, shown in the end frame; `ok` ones get a green tick. */
  notes?: { label: string; value: string; tone?: 'ok' | 'warn' }[];
};

export type FollowUpQuestion = { question: string; choices?: [string, string]; answer: string };

export type MedicationPatient = { name: string; initials: string; dob: string; color?: string; stage?: string };

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

const TAG_TONE: Record<MedTag['tone'], string> = {
  amber: 'bg-[#FFF6E8] text-[#C2410C] ring-[#F59E0C]/40',
  red: 'bg-[#FFE7ED] text-[#C81E3A] ring-[#DE3C4B]/30',
  blue: 'bg-[#EEF0FD] text-[#4F5BD5] ring-[#4F5BD5]/25',
};

function Tag({ tag }: { tag: MedTag }) {
  return <span className={`inline-flex shrink-0 items-center rounded-full px-1.5 py-px text-[9.5px] font-semibold ring-1 whitespace-nowrap ${TAG_TONE[tag.tone]}`}>{tag.label}</span>;
}

export function Phone({ intro, progress, placeholder, fill, scrollableTranscript, children }: { intro: string; progress: string; placeholder: string; fill: number; scrollableTranscript?: boolean; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] md:max-w-[300px] rounded-[40px] bg-[#111] p-[9px] shadow-[0_40px_80px_-40px_rgba(42,58,81,0.6)]">
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
        {scrollableTranscript ? (
          <div className="flex min-h-0 flex-1 flex-col-reverse overflow-y-auto px-3 py-3" tabIndex={0} aria-label="Gesprek">
            <div className="flex shrink-0 flex-col gap-2.5">{children}</div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col justify-end gap-2.5">{children}</div>
        )}
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

/** The patient's photo of their medicine boxes, as an image in a chat message; a scan line runs while it is read. */
function PhotoMessage({ scanning, label, schedule }: { scanning: boolean; label: string; schedule?: MedicationCopy['schedule'] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease: EASE }} className="self-end w-[150px] rounded-2xl bg-[#06ACC1] p-1.5">
      <div className={`relative rounded-xl overflow-hidden aspect-[3/4] ${schedule ? 'bg-[#C9C2B4]' : 'bg-[#2A3A51]'}`}>
        {schedule ? (
          // A photographed printout from the pharmacy: slightly turned paper on a table, small print.
          <div className="absolute inset-x-2 top-3 bottom-2 rotate-[-3deg] rounded-[3px] bg-[#FDFCF8] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.45)] px-1.5 py-1.5 text-[#2A3A51] blur-[0.25px]">
            <p className="text-[5.5px] font-bold leading-tight border-b border-[#2A3A51]/30 pb-0.5 mb-1">{schedule.header}</p>
            {schedule.rows.map(([med, use]) => (
              <p key={med} className="text-[4.8px] leading-[1.25] mb-1">
                <b className="font-semibold block">{med}</b>
                <span className="text-[#4E5670]">{use}</span>
              </p>
            ))}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/demo/medication-boxes.jpg" alt="" className="absolute inset-0 w-full h-full object-cover blur-[0.6px] saturate-[0.9]" />
        )}
        {scanning && (
          <>
            <span className="absolute inset-0 bg-[#06ACC1]/10" />
            <motion.span
              className="absolute inset-x-0 h-[2px] bg-[#5FD4E2] shadow-[0_0_14px_4px_rgba(6,172,193,0.55)]"
              animate={{ top: ['6%', '94%', '6%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>
      <p className="px-1.5 pt-1 text-[9px] text-white/80">{label}</p>
    </motion.div>
  );
}

const GRID = 'grid grid-cols-[1.25fr_1fr] md:grid-cols-[1.35fr_1fr_1.35fr_1fr] gap-x-3';

export function MedicationChatDemo({ copy, patient }: { copy: Record<SiteLocale, MedicationCopy>; patient: MedicationPatient }) {
  const c = useLocalized(copy);
  // 1 the assistant asks, 2 the photo arrives, 3 it is read, 4 the list (in the chat and in the record), 5 confirmed,
  // then optionally a follow-up question and its answer, two steps per question
  const asks = c.followUps ?? (c.followUp ? [c.followUp] : []);
  const total = 5 + asks.length * 2;
  const step = useSteps(total, 1500, 600);
  const scanning = step === 3;
  const read = step >= 4;
  const fromPhoto = c.meds.filter((med) => !med.later);
  const shownMeds = c.meds.filter((med) => !med.later || step >= 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-5 items-start">
      <Phone intro={c.intro} progress={c.progress} placeholder={c.placeholder} fill={Math.min(100, 40 + step * 8)} scrollableTranscript={c.scrollableTranscript}>
        {step >= 1 && <BotBubble>{c.ask}</BotBubble>}
        {step >= 2 && c.photoMessage && <PatientBubble>{c.photoMessage}</PatientBubble>}
        {step >= 2 && <PhotoMessage scanning={scanning} label={c.exampleData} schedule={c.schedule} />}
        {scanning && (
          <BotBubble>
            <TypingDots />
          </BotBubble>
        )}
        {read && (
          <BotBubble>
            {c.found}
            <span className="mt-1.5 mb-1.5 flex flex-col gap-0.5">
              {fromPhoto.map((med) => (
                <span key={med.name} className="flex gap-1.5">
                  <span className="mt-[6px] w-1 h-1 rounded-full bg-[#06ACC1] shrink-0" />
                  <span>
                    <b className="font-semibold">{med.chatLabel ?? med.name}</b> {!med.chatLabel && med.strength}
                  </span>
                </span>
              ))}
            </span>
            {c.correct}
          </BotBubble>
        )}
        {step === 4 && <Choices options={c.choices} />}
        {step >= 5 && <PatientBubble>{c.confirm}</PatientBubble>}
        {asks.map((ask, i) => {
          const at = 6 + i * 2;
          return (
            <Fragment key={ask.question}>
              {step >= at && <BotBubble>{ask.question}</BotBubble>}
              {step === at && ask.choices && <Choices options={ask.choices} />}
              {step >= at + 1 && <PatientBubble>{ask.answer}</PatientBubble>}
            </Fragment>
          );
        })}
      </Phone>

      <AppFrame
        active="medication"
        title={c.title}
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            <Initials text={patient.initials} size={14} color={patient.color} />
            {patient.name} · {patient.dob}{patient.stage && <> · {patient.stage}</>}
          </span>
        }
      >
        <AppCard bodyClassName="p-0">
          <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-3">
            <span className="text-[14px] font-bold">{c.list}</span>
            <AppButton variant="subtle" icon="copy">
              {c.copy}
            </AppButton>
          </div>
          <div className={`${GRID} px-4 py-2 bg-[#F4F5F8] border-y border-[#E8EAEC] text-[10.5px] font-medium text-[#4E5670]`}>
            {c.head.map((h, i) => (
              <span key={h} className={i === 1 || i === 3 ? 'hidden md:block' : ''}>
                {h}
              </span>
            ))}
          </div>
          <div className="relative">
            {(read ? shownMeds : fromPhoto).map((med, i) =>
              read ? (
                <motion.div
                  key={med.name}
                  initial={{ opacity: 0, y: 6, backgroundColor: 'rgba(6,172,193,0.12)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(6,172,193,0)' }}
                  transition={{ duration: 0.45, delay: med.later ? 0.2 : i * 0.22, ease: EASE, backgroundColor: { duration: 1.4, delay: med.later ? 0.2 : i * 0.22 } }}
                  className={`${GRID} items-center px-4 py-2.5 border-b border-[#E8EAEC] last:border-0 text-[11.5px]`}
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-1.5">
                      <b className="text-[12px] font-semibold">
                        {med.name} {med.strength}
                      </b>
                      {med.tag && <Tag tag={med.tag} />}
                    </span>
                    {med.form && <span className="block text-[10.5px] text-[#4E5670]">{med.form}</span>}
                    {med.source && <span className="block text-[10.5px] text-[#4E5670]">{med.source}</span>}
                    <span className="block md:hidden text-[10.5px] text-[#949CB1]">{med.highlightDetails ? <mark className="rounded-sm bg-[#FFF6E8] text-inherit">{med.substance}</mark> : med.substance}</span>
                    {med.form && <span className="block md:hidden text-[10.5px] text-[#4E5670]">{med.indication}</span>}
                  </span>
                  <span className="hidden md:block text-[#4E5670]">{med.highlightDetails ? <mark className="rounded-sm bg-[#FFF6E8] text-inherit">{med.substance}</mark> : med.substance}</span>
                  <span>{med.highlightDetails ? <mark className="rounded-sm bg-[#FFF6E8] text-inherit">{med.frequency}</mark> : med.frequency}</span>
                  <span className="hidden md:block text-[#4E5670]">{med.indication}</span>
                </motion.div>
              ) : (
                <div key={med.name} className={`${GRID} items-center px-4 py-3 border-b border-[#E8EAEC] last:border-0`}>
                  <span className={`h-2.5 rounded-full bg-[#F4F5F8] ${scanning ? 'animate-pulse' : ''}`} style={{ width: `${70 - (i % 3) * 12}%` }} />
                  <span className={`hidden md:block h-2.5 w-3/5 rounded-full bg-[#F4F5F8] ${scanning ? 'animate-pulse' : ''}`} />
                  <span className={`h-2.5 w-4/5 rounded-full bg-[#F4F5F8] ${scanning ? 'animate-pulse' : ''}`} />
                  <span className={`hidden md:block h-2.5 w-1/2 rounded-full bg-[#F4F5F8] ${scanning ? 'animate-pulse' : ''}`} />
                </div>
              ),
            )}
          </div>
          {/* Where the list came from, and the patient's own check */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-[#E8EAEC] bg-[#F9FAFB] rounded-b-xl text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[#4E5670]">
              <AppIcon name="camera" size={12} color={APP.primary} />
              <AnimatePresence mode="wait">
                <motion.span key={scanning ? 'reading' : read ? 'read' : 'idle'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {scanning ? c.reading : read ? c.recognised(fromPhoto.length) : '…'}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={`inline-flex items-center gap-1.5 font-medium transition-colors duration-300 ${step >= 5 ? 'text-[#1F9E6E]' : 'text-[#949CB1]'}`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${step >= 5 ? 'bg-[#37C18D]' : 'bg-[#E8EAEC]'}`}>
                {step >= 5 && <Check size={10} color="#fff" />}
              </span>
              {c.confirmed}
            </span>
          </div>
          {c.notes && step >= total && (
            <motion.dl initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden px-4 pb-1 border-t border-[#E8EAEC]">
              {c.notes.map((note) => (
                <div key={note.label} className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] gap-3 py-2 border-b border-[#E8EAEC] last:border-0 text-[11.5px]">
                  <dt className="text-[#4E5670]">{note.label}</dt>
                  <dd className={`flex items-start gap-1.5 font-medium ${note.tone === 'warn' ? 'text-[#B4531A]' : ''}`}>
                    {note.tone === 'ok' && (
                      <span className="mt-px w-3.5 h-3.5 rounded-full bg-[#37C18D] flex items-center justify-center shrink-0">
                        <Check size={8} color="#fff" />
                      </span>
                    )}
                    {note.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </AppCard>
      </AppFrame>
    </div>
  );
}

/** Shared UI strings per language; each page adds its own patient, medicines and confirmation. */
export const MED_UI: Record<
  SiteLocale,
  Omit<MedicationCopy, 'found' | 'confirm' | 'meds'>
> = {
  nl: {
    title: 'Medicatie',
    intro: 'Onze digitale assistent begeleidt u door een reeks algemene vragen ter voorbereiding van uw bezoek.',
    progress: 'Voortgang',
    placeholder: 'Schrijf hier je bericht',
    ask: 'Welke geneesmiddelen neemt u? U mag gewoon een foto sturen van de doosjes.',
    correct: 'Klopt dit?',
    choices: ['Ja', 'Iets aanpassen'],
    exampleData: 'Voorbeelddata',
    list: 'Medicatie lijst',
    copy: 'Kopieer naar het klembord',
    head: ['Medicatie', 'Werkzame stof', 'Frequentie', 'Indicatie'],
    reading: 'Foto wordt gelezen…',
    recognised: (n) => `${n} geneesmiddelen herkend uit 1 foto`,
    confirmed: 'Bevestigd door patiënt',
  },
  en: {
    title: 'Medication',
    intro: 'Our digital assistant guides you through a series of general questions to prepare for your visit.',
    progress: 'Progress',
    placeholder: 'Write your message here',
    ask: 'Which medicines do you take? You can simply send a photo of the boxes.',
    correct: 'Is this correct?',
    choices: ['Yes', 'Change something'],
    exampleData: 'Example data',
    list: 'Medication list',
    copy: 'Copy to clipboard',
    head: ['Medication', 'Active substance', 'Frequency', 'Indication'],
    reading: 'Reading the photo…',
    recognised: (n) => `${n} medicines recognised from 1 photo`,
    confirmed: 'Confirmed by patient',
  },
  fr: {
    title: 'Médicaments',
    intro: 'Notre assistant numérique vous guide à travers une série de questions générales pour préparer votre visite.',
    progress: 'Progression',
    placeholder: 'Écrivez votre message ici',
    ask: 'Quels médicaments prenez-vous ? Vous pouvez simplement envoyer une photo des boîtes.',
    correct: 'Est-ce correct ?',
    choices: ['Oui', 'Modifier quelque chose'],
    exampleData: 'Données d’exemple',
    list: 'Liste de médicaments',
    copy: 'Copier dans le presse-papiers',
    head: ['Médicament', 'Substance active', 'Fréquence', 'Indication'],
    reading: 'Lecture de la photo…',
    recognised: (n) => `${n} médicaments reconnus sur 1 photo`,
    confirmed: 'Confirmé par le patient',
  },
};

/** Builds a page's copy from the shared strings plus its own story. */
export function medicationCopy(
  perLocale: Record<SiteLocale, Pick<MedicationCopy, 'found' | 'confirm' | 'meds'> & Partial<Pick<MedicationCopy, 'ask' | 'followUp' | 'followUps' | 'schedule' | 'notes' | 'confirmed'>>>,
): Record<SiteLocale, MedicationCopy> {
  return {
    nl: { ...MED_UI.nl, ...perLocale.nl },
    en: { ...MED_UI.en, ...perLocale.en },
    fr: { ...MED_UI.fr, ...perLocale.fr },
  };
}
