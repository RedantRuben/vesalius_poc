'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { APP, AppButton, AppCard, AppFrame, AppIcon, Initials } from '../app-ui';
import { EASE, useLocalized, useSteps } from './shared';

/* ------------------------------------------------------------------ */
/* Document Generation: the interaction's "Documenten" tab             */
/* ------------------------------------------------------------------ */

// Section/button/status labels from assistant-frontend i18n (conversations.details.documents.generation.*)
const DOCS = {
  en: {
    tabs: ['Input', 'Output', 'Documents'],
    title: 'Document templates',
    description: 'These templates can be used to generate a document for this interaction. Generated documents appear in the list below.',
    open: 'Generate document',
    generate: 'Generate',
    regenerate: 'Regenerate',
    generated: 'Generated',
    notGenerated: 'Not generated yet',
    templates: [
      { label: 'Consultation report', description: 'SOAP structure, for the patient record' },
      { label: 'Referral letter GP', description: 'Summary and question for the referring physician' },
      { label: 'Patient summary', description: 'Plain-language summary for the patient' },
    ],
    today: 'Today',
    previews: [
      'S: Frontal headache for two weeks, photophobia. O: BP 128/82, neuro exam normal. A: Probable tension-type headache. P: Headache diary, review in two weeks.',
      'Dear colleague, I saw David (42) for frontal headaches for two weeks. Findings and proposed follow-up below.',
      'Your headaches are most likely tension headaches. Keep a headache diary and come back in two weeks.',
    ],
  },
  nl: {
    tabs: ['Input', 'Output', 'Documenten'],
    title: 'Documentsjablonen',
    description: 'Deze sjablonen kunnen als document gegenereerd worden voor deze interactie. Gegenereerde documenten verschijnen in de lijst hieronder.',
    open: 'Document genereren',
    generate: 'Genereren',
    regenerate: 'Opnieuw genereren',
    generated: 'Gegenereerd',
    notGenerated: 'Nog niet gegenereerd',
    templates: [
      { label: 'Consultatieverslag', description: 'SOAP-structuur, voor het patiëntendossier' },
      { label: 'Verwijsbrief huisarts', description: 'Samenvatting en vraag voor de verwijzer' },
      { label: 'Samenvatting voor patiënt', description: 'Begrijpelijke samenvatting voor de patiënt' },
    ],
    today: 'Vandaag',
    previews: [
      'S: Frontale hoofdpijn sinds twee weken, fotofobie. O: BD 128/82, neurologisch onderzoek normaal. A: Waarschijnlijk spanningshoofdpijn. P: Hoofdpijndagboek, controle over twee weken.',
      'Geachte collega, ik zag David (42) voor frontale hoofdpijn sinds twee weken. Bevindingen en voorgestelde opvolging vindt u hieronder.',
      'Uw hoofdpijn is waarschijnlijk spanningshoofdpijn. Houd een hoofdpijndagboek bij en kom over twee weken terug.',
    ],
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
    templates: [
      { label: 'Rapport de consultation', description: 'Structure SOAP, pour le dossier patient' },
      { label: 'Lettre au généraliste', description: 'Résumé et question pour le médecin référent' },
      { label: 'Résumé pour le patient', description: 'Résumé en langage clair pour le patient' },
    ],
    today: 'Aujourd’hui',
    previews: [
      'S : Céphalée frontale depuis deux semaines, photophobie. O : TA 128/82, examen neurologique normal. A : Céphalée de tension probable. P : Agenda des céphalées, contrôle dans deux semaines.',
      'Cher confrère, j’ai vu David (42 ans) pour des céphalées frontales depuis deux semaines. Constatations et suivi proposé ci-dessous.',
      'Vos maux de tête sont probablement des céphalées de tension. Tenez un agenda des céphalées et revenez dans deux semaines.',
    ],
  },
};

type DocState = 'idle' | 'generating' | 'generated';

export function DocumentDemo() {
  const c = useLocalized(DOCS);
  const [states, setStates] = useState<DocState[]>(['idle', 'idle', 'idle']);
  const [order, setOrder] = useState<number[]>([]);
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

  // The consultation report generates by itself, as it would after a consultation; the rest is up to you.
  useEffect(() => {
    const list = timers.current;
    const id = setTimeout(() => generate(0), 900);
    return () => {
      clearTimeout(id);
      list.forEach(clearTimeout);
    };
  }, []);

  return (
    <AppFrame
      active="interactions"
      title={
        <span className="inline-flex items-center gap-3 text-[14px]">
          <span className="text-[#06ACC1]">←</span>
          <span className="font-medium">David Maes</span>
        </span>
      }
    >
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
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium">
                      {c.templates[i].label} <span className="text-[#949CB1] font-normal">· {c.today}</span>
                    </span>
                    <span className="block text-[11.5px] text-[#4E5670] leading-snug line-clamp-2">{c.previews[i]}</span>
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
/* Smart Follow-up: dashboard widgets fill; one check-in raises alert  */
/* ------------------------------------------------------------------ */

// Widget titles from assistant-frontend i18n (admin.pages.adminDashboard.*)
const FOLLOW = {
  en: {
    hello: 'Hello Dr. Janssens!',
    calm: 'You have no urgent interactions',
    urgent: 'You have 1 alert task',
    screenings: 'Recent Screenings',
    alerts: 'Alert Tasks',
    noAlerts: 'No alert tasks.',
    viewAll: 'View all',
    checkins: [
      ['K. Peeters', 'Knee arthroscopy · day 1'],
      ['R. Wouters', 'Hip replacement · day 7'],
      ['K. Peeters', 'Knee arthroscopy · day 3'],
      ['K. Peeters', 'Knee arthroscopy · day 5'],
    ],
    alert: 'Pain 7/10 and fever 38.4 °C on day 5. Deviates from the expected recovery.',
  },
  nl: {
    hello: 'Hallo Dr. Janssens!',
    calm: 'U hebt geen urgente interacties',
    urgent: 'U hebt 1 waarschuwingstaak',
    screenings: 'Recente Screenings',
    alerts: 'Waarschuwingstaken',
    noAlerts: 'Geen waarschuwingstaken.',
    viewAll: 'Bekijk alle',
    checkins: [
      ['K. Peeters', 'Knie-artroscopie · dag 1'],
      ['R. Wouters', 'Heupprothese · dag 7'],
      ['K. Peeters', 'Knie-artroscopie · dag 3'],
      ['K. Peeters', 'Knie-artroscopie · dag 5'],
    ],
    alert: 'Pijn 7/10 en koorts 38,4 °C op dag 5. Wijkt af van het verwachte herstel.',
  },
  fr: {
    hello: 'Bonjour Dr Janssens !',
    calm: 'Vous n’avez aucune interaction urgente',
    urgent: 'Vous avez 1 tâche d’alerte',
    screenings: 'Dépistages Récents',
    alerts: 'Tâches d’alerte',
    noAlerts: 'Aucune tâche d’alerte.',
    viewAll: 'Voir tout',
    checkins: [
      ['K. Peeters', 'Arthroscopie du genou · jour 1'],
      ['R. Wouters', 'Prothèse de hanche · jour 7'],
      ['K. Peeters', 'Arthroscopie du genou · jour 3'],
      ['K. Peeters', 'Arthroscopie du genou · jour 5'],
    ],
    alert: 'Douleur 7/10 et fièvre 38,4 °C au jour 5. S’écarte du rétablissement attendu.',
  },
};

const DATES = ['21-09-2026, 09:12', '22-09-2026, 10:05', '23-09-2026, 09:30', '25-09-2026, 09:41'];

export function FollowUpDemo() {
  const c = useLocalized(FOLLOW);
  // 1–4 check-ins land (newest on top), 5 the day-5 answer raises an alert task
  const step = useSteps(5, 900, 500);
  const alert = step >= 5;
  const shown = c.checkins.slice(0, Math.min(step, 4)).map((row, i) => ({ row, i })).reverse();

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
        <AppCard tone="widget" icon="clipboard-notes" title={c.screenings} bodyClassName="p-3 flex flex-col gap-2 min-h-[260px]">
          <AnimatePresence initial={false}>
            {shown.map(({ row: [name, detail], i }) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${i === 3 && alert ? 'border-[#DE3C4B]/40 bg-[#FFE7ED]/50' : 'border-[#E8EAEC]'}`}
              >
                <Initials text={name.split(' ').map((p) => p[0]).join('').replace('.', '')} tone="primary" size={30} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[12.5px] font-semibold truncate">{name}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#949CB1] truncate">
                    <AppIcon name="calendar-alt" size={11} color={APP.darkGrey} />
                    {detail} · {DATES[i]}
                  </span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </AppCard>

        <AppCard tone="widget" icon="exclamation-triangle" title={c.alerts} bodyClassName="p-3 min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {alert ? (
              <motion.div key="alert" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: EASE }} className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5 rounded-lg bg-[#FFE7ED] px-3 py-2.5 text-[12px]">
                  <AppIcon name="exclamation-triangle" size={15} color={APP.accent} className="mt-0.5" />
                  <span>
                    <b>K. Peeters</b> · {c.alert}
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
    </AppFrame>
  );
}
