"use client";

import { useState } from "react";
import type { Dict } from "@/content";
import { points, tel, fmtPhone, mapsUrl, type Sector } from "@/content/site";
import { ArrowUpRight, Clock, Phone } from "./Icons";

export default function Points({ t }: { t: Dict["points"] }) {
  const [sector, setSector] = useState<Sector | "all">("all");
  const sectors = Object.keys(t.sectors) as Sector[];
  const shown = points.filter((p) => sector === "all" || p.sector === sector);

  return (
    <>
      <div className="reveal -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" role="tablist">
        {(["all", ...sectors] as const).map((s) => {
          const active = s === sector;
          return (
            <button
              key={s}
              role="tab"
              aria-selected={active}
              onClick={() => setSector(s)}
              className={`shrink-0 rounded-full border px-4.5 py-2 text-[14px] transition-all duration-300 ${
                active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/75 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {s === "all" ? t.all : t.sectors[s]}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li
            key={`${sector}-${p.id}`}
            className={`fade-up group relative flex flex-col rounded-[22px] border border-line bg-white p-6 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(31,42,68,.25)] ${
              p.closed ? "opacity-70" : ""
            }`}
            style={{ ["--d" as string]: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-brand">{t.sectors[p.sector]}</span>
              {p.closed ? (
                <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-[#85601a]">{t.closed}</span>
              ) : (
                <span className="size-2 rounded-full bg-azure shadow-[0_0_0_4px_rgba(10,143,214,.15)]" />
              )}
            </div>

            <a
              href={mapsUrl(p.street)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start justify-between gap-3 text-[20px] font-medium leading-snug tracking-tight"
            >
              <span>
                {p.street}
                {p.name === "expres" && <span className="mt-1 block text-[14px] font-normal text-muted">{t.expres}</span>}
              </span>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure" />
            </a>

            <dl className="mt-6 space-y-1.5 border-t border-dashed border-line pt-5 text-[14px]">
              {t.schedules[p.schedule].map(([d, h]) => (
                <div key={d} className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted" />
                  <dt className="w-[82px] shrink-0 text-muted">{d}</dt>
                  <dd>{h}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[14px]">
              {p.phones.map((n) => (
                <a key={n} href={tel(n)} className="inline-flex items-center gap-1.5 text-ink/80 hover:text-azure">
                  <Phone className="size-3.5" />
                  {fmtPhone(n)}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
