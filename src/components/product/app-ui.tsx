'use client';

/**
 * A faithful miniature of the Vesalius web app (assistant-frontend): its sidebar, cards, status chips and
 * buttons, using the product's own icons (public/app-icons) and Vesalius theme colours. Module demos compose
 * these so the website shows the product as clinicians actually see it.
 */

import { motion } from 'framer-motion';
import { useLocalized } from './demos/shared';

export const APP = {
  primary: '#06ACC1',
  primarySoft: '#EBF6F8',
  secondary: '#0B759F',
  text: '#2A3A51',
  darkGrey: '#949CB1',
  line: '#E8EAEC',
  background: '#F9FAFB',
  accent: '#FF3366',
} as const;

/** Product icon from public/app-icons, recoloured with a CSS mask so any colour works. */
export function AppIcon({ name, size = 18, color = APP.text, className = '' }: { name: string; size?: number; color?: string; className?: string }) {
  const url = `url(/app-icons/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

export type AppNavKey = 'dashboard' | 'screening' | 'visits' | 'interactions' | 'insights' | 'workLists' | 'patients' | 'medication' | 'settings';

const NAV: { key: AppNavKey; icon: string }[] = [
  { key: 'dashboard', icon: 'dashboard' },
  { key: 'screening', icon: 'arrow-fork-down' },
  { key: 'visits', icon: 'calendar' },
  { key: 'interactions', icon: 'chat' },
  { key: 'insights', icon: 'chart' },
  { key: 'workLists', icon: 'list-checked' },
  { key: 'patients', icon: 'users-group' },
  { key: 'medication', icon: 'pill' },
  { key: 'settings', icon: 'settings' },
];

/** Browser-window chrome + the app's collapsed icon sidebar + page header. */
export function AppFrame({
  active,
  title,
  subtitle,
  actions,
  children,
  bodyClassName = 'p-4 md:p-5',
}: {
  active: AppNavKey;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  bodyClassName?: string;
}) {
  return (
    <div className="rounded-[18px] overflow-hidden bg-white ring-1 ring-[#E8EAEC] shadow-[0_30px_60px_-40px_rgba(42,58,81,0.45)] text-[#2A3A51] text-left">
      <div className="flex items-center gap-1.5 px-4 h-8 bg-[#F4F5F8] border-b border-[#E8EAEC]" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex-1 max-w-[260px] h-5 rounded-md bg-white text-[10px] text-[#949CB1] flex items-center px-2">assistant.vesalius.ai</span>
      </div>
      <div className="flex">
        <nav className="hidden sm:flex flex-col items-center gap-1.5 w-14 shrink-0 border-r border-[#E8EAEC] py-3" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vesalius-logo.svg" alt="" className="w-6 h-6 mb-3" />
          {NAV.map((item) => (
            <span key={item.key} className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.key === active ? 'bg-[#EBF6F8]' : ''}`}>
              <AppIcon name={item.icon} size={17} color={item.key === active ? APP.primary : APP.darkGrey} />
            </span>
          ))}
        </nav>
        <div className="flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 px-4 md:px-5 py-3 border-b border-[#E8EAEC] bg-white">
            <div className="min-w-0">
              <p className="text-[17px] md:text-[19px] leading-tight truncate">{title}</p>
              {subtitle && <p className="text-[11px] text-[#949CB1] mt-0.5">{subtitle}</p>}
            </div>
            {actions}
          </header>
          <div className={`bg-[#F9FAFB] ${bodyClassName}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/** The app's card: white, 1px line border, teal icon + title header ("card-primary"). */
export function AppCard({
  icon,
  title,
  action,
  children,
  className = '',
  bodyClassName = 'p-4',
  tone = 'primary',
}: {
  icon?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** primary: teal title (detail pages). widget: dark bold title with icon tile (dashboard). */
  tone?: 'primary' | 'widget';
}) {
  return (
    <div className={`bg-white rounded-xl border border-[#E8EAEC] ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#E8EAEC]">
          <span className="flex items-center gap-2.5 min-w-0">
            {icon &&
              (tone === 'widget' ? (
                <span className="w-7 h-7 rounded-lg bg-[#F4F5F8] flex items-center justify-center">
                  <AppIcon name={icon} size={15} color={icon === 'exclamation-triangle' ? APP.accent : APP.text} />
                </span>
              ) : (
                <AppIcon name={icon} size={18} color={APP.primary} />
              ))}
            <span className={`truncate text-[13px] ${tone === 'widget' ? 'font-semibold text-[#2A3A51]' : 'font-medium text-[#06ACC1]'}`}>{title}</span>
          </span>
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export type ScreeningStatus = 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | 'ERROR';

const STATUS_STYLE: Record<ScreeningStatus, string> = {
  STARTED: 'bg-[#F9E8DD] text-[#FE7F2D]',
  IN_PROGRESS: 'bg-[#FFF6E8] text-[#F59E0C]',
  COMPLETED: 'bg-[#E9FFF7] text-[#37C18D]',
  CLOSED: 'bg-[#F4F5F8] text-[#949CB1]',
  ERROR: 'bg-[#DE3C4B] text-white',
};

// Labels from assistant-frontend i18n: screening.status.*
const STATUS_LABEL = {
  en: { STARTED: 'Started', IN_PROGRESS: 'In Progress', COMPLETED: 'Completed', CLOSED: 'Closed', ERROR: 'Error' },
  nl: { STARTED: 'Gestart', IN_PROGRESS: 'Bezig', COMPLETED: 'Voltooid', CLOSED: 'Gesloten', ERROR: 'Fout' },
  fr: { STARTED: 'Commencé', IN_PROGRESS: 'En Cours', COMPLETED: 'Terminé', CLOSED: 'Clôturé', ERROR: 'Erreur' },
};

export function StatusChip({ status }: { status: ScreeningStatus }) {
  const labels = useLocalized(STATUS_LABEL);
  return (
    <motion.span
      key={status}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ${STATUS_STYLE[status]}`}
    >
      {labels[status]}
    </motion.span>
  );
}

/** Initials avatar as used across the app (patients in secondary blue, lists in primary). */
export function Initials({ text, tone = 'secondary', size = 32 }: { text: string; tone?: 'primary' | 'secondary'; size?: number }) {
  return (
    <span
      className="rounded-full text-white font-semibold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36, backgroundColor: tone === 'primary' ? APP.primary : APP.secondary }}
    >
      {text}
    </span>
  );
}

export function AppButton({
  children,
  variant = 'primary',
  icon,
  className = '',
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'bordered' | 'danger' | 'subtle';
  icon?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const style = {
    primary: 'bg-[#06ACC1] text-white hover:bg-[#0597a9]',
    bordered: 'bg-white text-[#06ACC1] ring-1 ring-[#06ACC1] hover:bg-[#EBF6F8]',
    danger: 'bg-[#DE3C4B] text-white',
    subtle: 'bg-white text-[#2A3A51] ring-1 ring-[#E8EAEC] hover:bg-[#F9FAFB]',
  }[variant];
  const iconColor = variant === 'primary' || variant === 'danger' ? '#fff' : variant === 'bordered' ? APP.primary : APP.text;
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick, disabled } : {})}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${style} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {icon && <AppIcon name={icon} size={13} color={iconColor} />}
      {children}
    </Tag>
  );
}

/** Label/value row as used in the app's patient and details cards. */
export function DetailRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-[12px]">
      <span className="text-[#949CB1]">{label}</span>
      <span className="text-right text-[#2A3A51]">{value}</span>
    </div>
  );
}
