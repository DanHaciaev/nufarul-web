import Link from "next/link";
import type { ReactNode } from "react";

export function Kicker({ n, children, light = false }: { n?: string; children: ReactNode; light?: boolean }) {
  return (
    <div className={`reveal flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] ${light ? "text-white/60" : "text-muted"}`}>
      {n && <span className={`tabular-nums ${light ? "text-azure" : "text-brand"}`}>{n}</span>}
      <span className={`h-px w-10 ${light ? "bg-white/25" : "bg-ink/20"}`} />
      {children}
    </div>
  );
}

export function Title({ a, b, className = "", as: Tag = "h2" }: { a: string; b: string; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag
      className={`reveal text-[clamp(36px,5.2vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] ${className}`}
      style={{ ["--d" as string]: "80ms" }}
    >
      {a} <span className="serif-accent text-[1.08em] text-brand">{b}</span>
    </Tag>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1320px] px-5 md:px-8 ${className}`}>{children}</div>;
}

export type Crumb = { href?: string; label: string };

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="fade-up flex flex-wrap items-center gap-2 text-[13px] text-muted">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink/25">/</span>}
          {c.href ? (
            <Link href={c.href} className="u-link hover:text-ink">
              {c.label}
            </Link>
          ) : (
            <span className="text-ink/80">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* Shared top of every inner page: crumbs, big title with the serif accent,
   lead, and an optional slot on the right (meta, CTA). */
export function PageHero({
  crumbs,
  title,
  accent,
  lead,
  aside,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  accent: string;
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-[120px] md:pb-20 md:pt-[148px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(55%_70%_at_85%_0%,rgba(10,143,214,.10),transparent_70%)]" />
      <Container className="relative">
        <Crumbs items={crumbs} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="fade-up text-[clamp(42px,6.4vw,92px)] font-medium leading-[0.98] tracking-[-0.04em]" style={{ ["--d" as string]: "120ms" }}>
              {title} <span className="serif-accent text-[1.08em] text-azure">{accent}</span>
            </h1>
            {lead && (
              <p className="fade-up mt-7 max-w-[640px] text-[18px] leading-relaxed text-ink/70" style={{ ["--d" as string]: "260ms" }}>
                {lead}
              </p>
            )}
          </div>
          {aside && (
            <div className="fade-up lg:col-span-4" style={{ ["--d" as string]: "380ms" }}>
              {aside}
            </div>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
