import { ReactNode } from "react";

type SectionBlockProps = {
  title: string;
  subtitle: string;
  count?: number;
  children: ReactNode;
};

export function SectionBlock({
  title,
  subtitle,
  count,
  children,
}: SectionBlockProps) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-(--card-border) bg-(--card)/78 p-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.9)] sm:p-6">
      <div className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-(--accent-2)/12 blur-2xl" />

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/55">
            Collection
          </p>
          <h2 className="font-display text-3xl leading-none text-foreground">
            {title}
          </h2>
          <p className="text-sm text-(--muted)">{subtitle}</p>
        </div>

        {typeof count === "number" ? (
          <span className="inline-flex min-w-10 justify-center rounded-full border border-white/12 bg-white/7 px-3 py-1 font-mono text-xs font-semibold text-foreground">
            {count.toString().padStart(2, "0")}
          </span>
        ) : null}
      </div>

      {children}
    </section>
  );
}
