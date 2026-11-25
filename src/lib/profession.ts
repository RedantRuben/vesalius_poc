import type { SiteLocale, TailoredId } from '@/lib/disciplines';

/** [singular, plural] of the profession per discipline, in the words the discipline's hero and page title use. */
const PROFESSIONS: Record<TailoredId, Record<SiteLocale, [string, string]>> = {
  orthopedics: { nl: ['orthopedist', 'orthopedisten'], en: ['orthopaedic surgeon', 'orthopaedic surgeons'], fr: ['chirurgien orthopédiste', 'chirurgiens orthopédistes'] },
  neurosurgery: { nl: ['neurochirurg', 'neurochirurgen'], en: ['neurosurgeon', 'neurosurgeons'], fr: ['neurochirurgien', 'neurochirurgiens'] },
  ent: { nl: ['NKO-arts', 'NKO-artsen'], en: ['ENT surgeon', 'ENT surgeons'], fr: ['ORL', 'ORL'] },
  physicalMedicine: { nl: ['fysiater', 'fysiaters'], en: ['rehabilitation physician', 'rehabilitation physicians'], fr: ['médecin physique', 'médecins physiques'] },
  bariatrics: { nl: ['bariatrisch chirurg', 'bariatrisch chirurgen'], en: ['bariatric surgeon', 'bariatric surgeons'], fr: ['chirurgien bariatrique', 'chirurgiens bariatriques'] },
  mentalHealth: { nl: ['psycholoog', 'psychologen'], en: ['psychologist', 'psychologists'], fr: ['psychologue', 'psychologues'] },
  vascularSurgery: { nl: ['vaatchirurg', 'vaatchirurgen'], en: ['vascular surgeon', 'vascular surgeons'], fr: ['chirurgien vasculaire', 'chirurgiens vasculaires'] },
  ophthalmology: { nl: ['oogarts', 'oogartsen'], en: ['ophthalmologist', 'ophthalmologists'], fr: ['ophtalmologue', 'ophtalmologues'] },
  gynaecology: { nl: ['gynaecoloog', 'gynaecologen'], en: ['gynaecologist', 'gynaecologists'], fr: ['gynécologue', 'gynécologues'] },
  nephrology: { nl: ['nefroloog', 'nefrologen'], en: ['nephrologist', 'nephrologists'], fr: ['néphrologue', 'néphrologues'] },
  cardiology: { nl: ['cardioloog', 'cardiologen'], en: ['cardiologist', 'cardiologists'], fr: ['cardiologue', 'cardiologues'] },
  neurology: { nl: ['neuroloog', 'neurologen'], en: ['neurologist', 'neurologists'], fr: ['neurologue', 'neurologues'] },
  pneumology: { nl: ['longarts', 'longartsen'], en: ['respiratory physician', 'respiratory physicians'], fr: ['pneumologue', 'pneumologues'] },
  painClinic: { nl: ['algoloog', 'algologen'], en: ['pain physician', 'pain physicians'], fr: ['algologue', 'algologues'] },
  rheumatology: { nl: ['reumatoloog', 'reumatologen'], en: ['rheumatologist', 'rheumatologists'], fr: ['rhumatologue', 'rhumatologues'] },
  sportsMedicine: { nl: ['sportarts', 'sportartsen'], en: ['sports physician', 'sports physicians'], fr: ['médecin du sport', 'médecins du sport'] },
  physiotherapy: { nl: ['kinesitherapeut', 'kinesitherapeuten'], en: ['physiotherapist', 'physiotherapists'], fr: ['kinésithérapeute', 'kinésithérapeutes'] },
  gastroenterology: { nl: ['gastro-enteroloog', 'gastro-enterologen'], en: ['gastroenterologist', 'gastroenterologists'], fr: ['gastro-entérologue', 'gastro-entérologues'] },
  generalSurgery: { nl: ['chirurg', 'chirurgen'], en: ['surgeon', 'surgeons'], fr: ['chirurgien', 'chirurgiens'] },
  dietetics: { nl: ['diëtist', 'diëtisten'], en: ['dietitian', 'dietitians'], fr: ['diététicien', 'diététiciens'] },
  urology: { nl: ['uroloog', 'urologen'], en: ['urologist', 'urologists'], fr: ['urologue', 'urologues'] },
  podiatry: { nl: ['podoloog', 'podologen'], en: ['podiatrist', 'podiatrists'], fr: ['podologue', 'podologues'] },
  anaesthesia: { nl: ['anesthesist', 'anesthesisten'], en: ['anaesthetist', 'anaesthetists'], fr: ['anesthésiste', 'anesthésistes'] },
  dermatology: { nl: ['dermatoloog', 'dermatologen'], en: ['dermatologist', 'dermatologists'], fr: ['dermatologue', 'dermatologues'] },
  maxillofacialSurgery: { nl: ['MKA-chirurg', 'MKA-chirurgen'], en: ['oral and maxillofacial surgeon', 'oral and maxillofacial surgeons'], fr: ['chirurgien maxillo-facial', 'chirurgiens maxillo-faciaux'] },
  endocrinology: { nl: ['endocrinoloog', 'endocrinologen'], en: ['endocrinologist', 'endocrinologists'], fr: ['endocrinologue', 'endocrinologues'] },
};

/** Shared copy: every stand-alone "arts", "doctor" or "médecin" is the reader. */
const ANY: Record<SiteLocale, RegExp> = {
  nl: /(?<![\p{L}-])()(arts)(en)?(?![\p{L}-])/giu,
  en: /(?<![\p{L}-])()(doctor|physician|clinician)(s)?(?![\p{L}-])/giu,
  fr: /(?<![\p{L}-])(le |du |au )?(médecin)(s)?(?![\p{L}-])/giu,
};

/** A discipline's own copy also names GPs and other doctors, so only phrases that mean the reader are replaced. */
const READER: Record<SiteLocale, RegExp> = {
  nl: /(?<=gewoon |klaar voor de |help de |juiste |blijft de |bezoek met de |bezoek aan de |afspraak met de |agenda van de |behandeling die de |kiest de |wilt u dat de |goed om te weten voor de |door de |diagnose blijft bij de |eerste consult bij de |consult ingepland bij de )()(arts)()(?![\p{L}-])/giu,
  en: /(?<=be the |ready for the |help the |stay the |the right |visit with the |agenda of the |treatment the |would you like the |good for the |by the |diagnosis stays with the )()(doctor|clinician)()(?![\p{L}-])/giu,
  fr: /(?<=être |pour |aider |aide |visite avec |restez |bon |agenda |traitement choisi par |souhaitez-vous que |bon à savoir pour |mesurée par |diagnostic par |diagnostic reste celui |première consultation chez |consultation planifiée chez )(le |du |au )?(médecin)()(?![\p{L}-]| traitant| du | physique| généraliste| conseil| référent)/giu,
};

const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

/** Copy with the generic word for doctor replaced by the discipline's profession, through nested objects and lists. */
export function withProfession<T>(copy: T, id: TailoredId | null, locale: SiteLocale, scope: 'any' | 'reader'): T {
  if (!id) return copy;
  const [singular, plural] = PROFESSIONS[id][locale];
  const pattern = (scope === 'any' ? ANY : READER)[locale];
  const swap = (value: unknown): unknown => {
    if (typeof value === 'string') {
      const matcher = scope === 'reader' && /^(arts|doctor|physician|clinician|médecin)$/iu.test(value) ? ANY[locale] : pattern;
      return value.replace(matcher, (_, article: string | undefined, word: string, ending: string | undefined) => {
        const noun = ending ? plural : singular;
        const cased = /^\p{Lu}/u.test(word) ? capitalise(noun) : noun;
        if (!article) return cased;
        if (!/^[aeiouéo]/i.test(noun)) return article + cased;
        const prefix = article.toLowerCase() === 'du ' ? 'de l' : article.toLowerCase() === 'au ' ? 'à l' : 'l';
        return `${/^\p{Lu}/u.test(article) ? capitalise(prefix) : prefix}’${cased}`;
      });
    }
    if (Array.isArray(value)) return value.map(swap);
    // Only plain data: anything else (React elements, dates) passes through untouched
    if (value && Object.getPrototypeOf(value) === Object.prototype) {
      // Chat speaker identifiers drive rendering; only their display labels are translated.
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === 'who' || key === 'from' ? item : swap(item)]));
    }
    return value;
  };
  return swap(copy) as T;
}

type Messages = Record<string, Record<string, unknown>>;

/** The site messages for a discipline's pages. */
export function messagesForProfession<T>(messages: T, id: TailoredId | null, locale: SiteLocale): T {
  if (!id) return messages;
  const all = messages as unknown as Messages;
  const { TheProblem, Testimonials, Journey } = all;
  const cards = TheProblem.cards as Record<string, unknown>;
  const swap = <V,>(value: V) => withProfession(value, id, locale, 'any');
  return {
    ...all,
    Journey: swap(Journey),
    // Research figures about doctors stay about doctors: they were not measured per discipline
    TheProblem: { ...swap(TheProblem), cards: { ...swap(cards), burnout: cards.burnout, stress: cards.stress } },
    // The doctors' own titles and quotes stay as they gave them
    Testimonials: {
      ...swap(Testimonials),
      ...(locale === 'nl' ? { physiciansRating: `Beoordeling door ${PROFESSIONS[id].nl[1]}` } : {}),
      doctors: Testimonials.doctors,
    },
  } as unknown as T;
}
