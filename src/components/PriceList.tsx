"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Dict } from "@/content";
import type { PriceCategory, PriceRow } from "@/content/prices";
import { phones, tel, fmtPhone } from "@/content/site";
import { Phone } from "./Icons";

// "Plapumă" ≈ "plapuma", and both ş/ș and ţ/ț fold to s/t
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();

type Labels = Pick<Dict["common"], "from" | "lei" | "units" | "suspended"> & {
  search?: string;
  empty?: string;
  emptyHint?: string;
  results?: string;
};

export default function PriceList({
  categories,
  t,
  search = false,
  nav = false,
}: {
  categories: PriceCategory[];
  t: Labels;
  search?: boolean;
  nav?: boolean;
}) {
  const [q, setQ] = useState("");
  const query = fold(useDeferredValue(q).trim());

  const shown = useMemo(() => {
    if (!query) return categories;
    return categories
      .map((c) => ({ ...c, rows: c.rows.filter((r) => fold(`${r.name} ${r.variants?.map((v) => v.label).join(" ") ?? ""}`).includes(query)) }))
      .filter((c) => c.rows.length);
  }, [categories, query]);
  const found = shown.reduce((n, c) => n + c.rows.length, 0);

  const list = (
    <div className="flex min-w-0 flex-col gap-6">
      {search && query && found > 0 && t.results && (
        <p className="text-[14px] text-muted">{t.results.replace("{n}", String(found))}</p>
      )}
      {shown.map((c) => (
        <Category key={c.id} c={c} t={t} query={query} />
      ))}
      {search && query && found === 0 && (
        <div className="rounded-[24px] border border-dashed border-line bg-white p-8 text-center md:p-12">
          <p className="text-[20px] font-medium tracking-tight">{t.empty?.replace("{q}", q.trim())}</p>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-relaxed text-muted">{t.emptyHint}</p>
          <a href={tel(phones.delivery[0])} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white hover:bg-brand">
            <Phone className="size-4" />
            {fmtPhone(phones.delivery[0])}
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {search && (
        <div className="sticky top-[84px] z-30 -mx-2 mb-8 px-2">
          <label className="flex items-center gap-3 rounded-full border border-line bg-white/95 px-5 py-1.5 shadow-[0_18px_40px_-28px_rgba(31,42,68,.45)] backdrop-blur focus-within:border-azure">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.search}
              className="h-11 w-full bg-transparent text-[16px] outline-none placeholder:text-muted"
            />
            {q && (
              <button onClick={() => setQ("")} className="shrink-0 rounded-full px-2 text-[20px] leading-none text-muted hover:text-ink" aria-label="×">
                ×
              </button>
            )}
          </label>
        </div>
      )}

      {nav ? (
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <nav className="hidden lg:block">
            <ul className="sticky top-[168px] flex flex-col gap-1 text-[14px]">
              {categories.map((c) => {
                const hit = shown.find((s) => s.id === c.id);
                return (
                  <li key={c.id}>
                    <a
                      href={`#cat-${c.id}`}
                      className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white ${hit ? "text-ink/80" : "pointer-events-none text-muted/50"}`}
                    >
                      <span className="leading-snug">{c.title}</span>
                      <span className="text-[12px] tabular-nums text-muted">{hit?.rows.length ?? 0}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {list}
        </div>
      ) : (
        list
      )}
    </div>
  );
}

function Category({ c, t, query }: { c: PriceCategory; t: Labels; query: string }) {
  return (
    <section id={`cat-${c.id}`} className={`scroll-mt-[170px] overflow-hidden rounded-[24px] border border-line bg-white ${c.suspended ? "opacity-75" : ""}`}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist/50 px-6 py-5 md:px-8">
        <h3 className="text-[19px] font-medium tracking-tight">{c.title}</h3>
        {c.suspended && <span className="rounded-full bg-sand-100 px-3 py-1 text-[12px] font-medium text-[#85601a]">{t.suspended}</span>}
      </header>
      <ul className="divide-y divide-line/70">
        {c.rows.map((r, i) => (
          <Row key={i} r={r} t={t} query={query} />
        ))}
      </ul>
    </section>
  );
}

function Row({ r, t, query }: { r: PriceRow; t: Labels; query: string }) {
  const unit = r.unit ? t.units[r.unit] ?? `lei/${r.unit}` : t.lei;
  return (
    <li className="group/row grid gap-x-4 gap-y-2 px-6 py-4 transition-colors hover:bg-paper/70 sm:grid-cols-[minmax(0,auto)_minmax(24px,1fr)_auto] md:px-8">
      <div className="min-w-0">
        <p className="text-[15.5px] leading-snug">
          <Mark text={r.name} query={query} />
        </p>
        {r.note && <p className="mt-1 text-[13px] text-muted">{r.note}</p>}
      </div>
      {/* dotted leader, as on a printed price list */}
      <span className="mb-[7px] hidden self-end border-b border-dotted border-ink/20 transition-colors group-hover/row:border-azure/50 sm:block" />
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 sm:justify-end sm:text-right">
        {r.variants ? (
          r.variants.map((v) => (
            <span key={v.label} className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-[13px] text-muted">{v.label}</span>
              <Price value={v.price} unit={unit} />
            </span>
          ))
        ) : (
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            {r.from && <span className="text-[13px] text-muted">{t.from}</span>}
            <Price value={r.prices.join(" / ")} unit={unit} />
          </span>
        )}
      </div>
    </li>
  );
}

const Price = ({ value, unit }: { value: string; unit: string }) => (
  <span>
    <span className="text-[17px] font-medium tabular-nums tracking-tight">{value}</span>
    <span className="ml-1 text-[12px] text-muted">{unit}</span>
  </span>
);

function Mark({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  // fold() keeps string length for Latin/Cyrillic, so indexes line up
  const i = fold(text).indexOf(query);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-azure/15 px-0.5 text-ink">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}
