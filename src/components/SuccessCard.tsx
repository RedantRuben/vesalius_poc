import { Link } from '@/i18n/routing';

export default function SuccessCard({
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: {
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  title: string;
}) {
  return (
    <section className="px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-3xl mx-auto glass-panel bg-white/70 rounded-[36px] p-8 md:p-12 shadow-[0_30px_80px_-30px_rgba(11,27,61,0.2)]">
        <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#06ACC1] mb-6">
          <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0B1B3D] mb-4">{title}</h1>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">{body}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-[#0B1B3D] px-7 py-4 text-white font-semibold shadow-[0_8px_20px_-6px_rgba(11,27,61,0.5)] hover:bg-slate-800 transition-colors"
            href={primaryHref}
          >
            {primaryLabel}
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-[#0B1B3D] font-semibold hover:border-[#0B1B3D] transition-colors"
            href={secondaryHref}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
