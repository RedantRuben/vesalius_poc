'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, DetailRow } from '../app-ui';
import { EASE, useLocalized, useSteps } from './shared';

/* ------------------------------------------------------------------ */
/* Scribe: the "Consultatie" card while recording, then the summary     */
/* ------------------------------------------------------------------ */

// Toolbar labels from assistant-frontend i18n (conversations.details.voiceTranscription.*)
const SCRIBE = {
  en: {
    back: 'Back',
    consultation: 'Consultation',
    template: 'SOAP note',
    autoDetect: 'Auto-detect',
    stop: 'Stop recording',
    start: 'Start recording',
    showTranscript: 'Show transcript',
    microphone: 'MacBook Pro Microphone',
    generating: 'Generating',
    generatedWith: 'Generated with template',
    copy: 'Copy the summary',
    doctor: 'Doctor',
    patient: 'Patient',
    lines: [
      { who: 'doctor', text: 'What brings you in today?' },
      { who: 'patient', text: 'Headaches for two weeks, mostly at the front. Light bothers me.' },
      { who: 'doctor', text: 'Any fever or nausea?' },
      { who: 'patient', text: 'A little nausea in the morning. No fever.' },
    ],
    sections: [
      ['Subjective', 'Frontal headache for 2 weeks, photophobia, morning nausea. No fever.'],
      ['Objective', 'Blood pressure 128/82. Neurological exam normal.'],
      ['Assessment', 'Probable tension-type headache.'],
      ['Plan', 'Headache diary, review in 2 weeks.'],
    ],
    patientCard: [['Date of birth', '13-02-1984'], ['Questionnaire', 'General'], ['Language', 'English']],
  },
  nl: {
    back: 'Terug',
    consultation: 'Consultatie',
    template: 'SOAP-nota',
    autoDetect: 'Automatisch detecteren',
    stop: 'Stop opname',
    start: 'Start opname',
    showTranscript: 'Toon transcript',
    microphone: 'MacBook Pro-microfoon',
    generating: 'Aan het genereren',
    generatedWith: 'Gegenereerd met template',
    copy: 'Samenvatting kopiëren',
    doctor: 'Arts',
    patient: 'Patiënt',
    lines: [
      { who: 'doctor', text: 'Wat brengt u vandaag bij ons?' },
      { who: 'patient', text: 'Al twee weken hoofdpijn, vooral vooraan. Licht stoort me.' },
      { who: 'doctor', text: 'Koorts of misselijkheid?' },
      { who: 'patient', text: '’s Ochtends wat misselijk. Geen koorts.' },
    ],
    sections: [
      ['Subjectief', 'Frontale hoofdpijn sinds 2 weken, fotofobie, ochtendlijke nausea. Geen koorts.'],
      ['Objectief', 'Bloeddruk 128/82. Neurologisch onderzoek normaal.'],
      ['Assessment', 'Waarschijnlijk spanningshoofdpijn.'],
      ['Plan', 'Hoofdpijndagboek, controle over 2 weken.'],
    ],
    patientCard: [['Geboortedatum', '13-02-1984'], ['Vragenlijst', 'Algemeen'], ['Taal', 'Nederlands']],
  },
  fr: {
    back: 'Retour',
    consultation: 'Consultation',
    template: 'Note SOAP',
    autoDetect: 'Détection automatique',
    stop: 'Arrêter l’enregistrement',
    start: 'Commencer l’enregistrement',
    showTranscript: 'Afficher la transcription',
    microphone: 'Microphone MacBook Pro',
    generating: 'Génération en cours',
    generatedWith: 'Généré avec le modèle',
    copy: 'Copier le résumé',
    doctor: 'Médecin',
    patient: 'Patient',
    lines: [
      { who: 'doctor', text: 'Qu’est-ce qui vous amène aujourd’hui ?' },
      { who: 'patient', text: 'Des maux de tête depuis deux semaines, surtout à l’avant. La lumière me gêne.' },
      { who: 'doctor', text: 'De la fièvre ou des nausées ?' },
      { who: 'patient', text: 'Un peu de nausées le matin. Pas de fièvre.' },
    ],
    sections: [
      ['Subjectif', 'Céphalée frontale depuis 2 semaines, photophobie, nausées matinales. Pas de fièvre.'],
      ['Objectif', 'Tension 128/82. Examen neurologique normal.'],
      ['Évaluation', 'Céphalée de tension probable.'],
      ['Plan', 'Agenda des céphalées, contrôle dans 2 semaines.'],
    ],
    patientCard: [['Date de naissance', '13-02-1984'], ['Questionnaire', 'Général'], ['Langue', 'Français']],
  },
};

export function ScribeDemo() {
  const c = useLocalized(SCRIBE);
  // 1–4 transcript lines while recording, 5 recording stops + generating, 6 summary ready
  const step = useSteps(6, 1000, 500);
  const recording = step < 5;

  return (
    <AppFrame
      active="interactions"
      title={
        <span className="inline-flex items-center gap-3 text-[14px]">
          <span className="text-[#06ACC1]">← {c.back}</span>
          <span className="font-medium">David Maes</span>
        </span>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <AppCard
          icon="microphone"
          title={c.consultation}
          bodyClassName="p-4 flex flex-col gap-3"
          action={
            <span className="hidden md:flex items-center gap-1.5">
              <span className="rounded-lg ring-1 ring-[#E8EAEC] px-2.5 py-1 text-[11px]">{c.template} ▾</span>
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
                {c.sections.map(([title, text], i) => (
                  <motion.div key={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }} className="px-1">
                    <p className="text-[12.5px] text-[#06ACC1]">{title}</p>
                    <p className="text-[12.5px] leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </AppCard>

        <AppCard icon="user" title="David Maes" bodyClassName="px-4 py-2" className="hidden lg:block self-start">
          {c.patientCard.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Medication: "Medicatie" upload → Verwerk → Medicatie lijst          */
/* ------------------------------------------------------------------ */

// Labels from assistant-frontend i18n (pages.medicationOverview.*, components.upload.*)
const MEDICATION = {
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
    meds: [
      { name: 'Amoxicillin 500 mg', prescription: '3× daily, 7 days', dose: '1 capsule', mandatory: true, confidence: 'high' },
      { name: 'Metformin 850 mg', prescription: '2× daily with meals', dose: '1 tablet', mandatory: true, confidence: 'high' },
      { name: 'Atorvastatin 20 mg', prescription: 'In the evening', dose: '1 tablet', mandatory: false, confidence: 'medium' },
    ],
  },
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
    meds: [
      { name: 'Amoxicilline 500 mg', prescription: '3× per dag, 7 dagen', dose: '1 capsule', mandatory: true, confidence: 'high' },
      { name: 'Metformine 850 mg', prescription: '2× per dag bij de maaltijd', dose: '1 tablet', mandatory: true, confidence: 'high' },
      { name: 'Atorvastatine 20 mg', prescription: '’s Avonds', dose: '1 tablet', mandatory: false, confidence: 'medium' },
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
    meds: [
      { name: 'Amoxicilline 500 mg', prescription: '3× par jour, 7 jours', dose: '1 gélule', mandatory: true, confidence: 'high' },
      { name: 'Metformine 850 mg', prescription: '2× par jour au repas', dose: '1 comprimé', mandatory: true, confidence: 'high' },
      { name: 'Atorvastatine 20 mg', prescription: 'Le soir', dose: '1 comprimé', mandatory: false, confidence: 'medium' },
    ],
  },
};

// Confidence dot colours from medication-overview-page (success / warning / error).
const CONFIDENCE = { high: '#37C18D', medium: '#F59E0C', low: '#DE3C4B' } as const;

export function MedicationDemo() {
  const c = useLocalized(MEDICATION);
  // 1 photo picked, 2 processing, 3–5 results
  const step = useSteps(5, 900, 500);

  return (
    <AppFrame active="medication" title={c.title}>
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
                <span className="flex items-center gap-2">
                  <strong>
                    {i + 1}. {med.name}
                  </strong>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CONFIDENCE[med.confidence as keyof typeof CONFIDENCE] }} />
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
