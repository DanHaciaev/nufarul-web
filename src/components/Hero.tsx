import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/content";
import { phones, tel, clients } from "@/content/site";
import { Arrow, Lotus, Phone } from "./Icons";
import Counter from "./Counter";
import { Container } from "./ui";

function Words({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`rise ${className}`}>
          <span style={{ ["--d" as string]: `${start + i * 90}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </>
  );
}

export default function Hero({ t, stats, clientsTitle, lang }: { t: Dict["hero"]; stats: Dict["stats"]; clientsTitle: string; lang: Locale }) {
  const ring = "NUFĂRUL · CURĂȚĂTORIE · DIN 1994 · ";

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-[112px] md:pb-20 md:pt-[136px]">
        {/* water rings */}
        <svg
          className="pointer-events-none absolute -right-[20%] top-[8%] h-[900px] w-[900px] text-azure/50 md:-right-[8%]"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden
        >
          {[0, 3, 6].map((d) => (
            <circle key={d} className="ripple" cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.5" style={{ ["--d" as string]: `${d}s` }} />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_60%_at_80%_20%,rgba(10,143,214,.10),transparent_70%)]" />

        <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p
              className="fade-up inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-1.5 pl-2 pr-4 text-[13px] text-ink/75 backdrop-blur"
              style={{ ["--d" as string]: "100ms" }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-mist text-azure">
                <Lotus className="size-4" />
              </span>
              {t.eyebrow}
            </p>

            <h1 className="mt-7 text-[clamp(46px,7.4vw,112px)] font-medium leading-[0.96] tracking-[-0.04em]">
              <span className="block">
                <Words text={t.titleA} start={200} />
              </span>
              <span className="block">
                <Words text={t.titleB} start={420} className="serif-accent text-[1.12em] text-azure" />
              </span>
              <span className="block">
                <Words text={t.titleC} start={600} />
              </span>
            </h1>

            <p className="fade-up mt-8 max-w-[540px] text-[18px] leading-relaxed text-ink/70" style={{ ["--d" as string]: "900ms" }}>
              {t.lead}
            </p>

            <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "1050ms" }}>
              <a
                href={tel(phones.delivery[0])}
                className="group inline-flex items-center gap-3 rounded-full bg-azure py-2 pl-2 pr-6 text-[15px] font-medium text-white shadow-[0_14px_30px_-12px_rgba(10,143,214,.7)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#0780c1]"
              >
                <span className="grid size-10 place-items-center rounded-full bg-white/15">
                  <Phone className="size-4.5" />
                </span>
                {t.ctaPrimary}
              </a>
              <Link
                href={`/${lang}/preturi`}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-[15px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.ctaSecondary}
                <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
            <div className="fade-up relative" style={{ ["--d" as string]: "350ms" }}>
              <div className="relative aspect-[4/5] overflow-hidden bg-mist [border-radius:50%_50%_32px_32px/38%_38%_32px_32px]">
                <div className="parallax absolute -inset-y-[8%] inset-x-0">
                  <Image
                    src="/img/laundry.webp"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-cover object-[38%_50%]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </div>

              {/* rotating seal */}
              <div className="absolute -left-2 top-8 grid size-[112px] sm:-left-6 sm:top-10 sm:size-[118px] place-items-center rounded-full bg-paper shadow-[0_18px_40px_-20px_rgba(31,42,68,.45)] md:-left-12 md:size-[136px]">
                <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_28s_linear_infinite]" aria-hidden>
                  <defs>
                    <path id="seal" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                  </defs>
                  <text className="fill-ink text-[8px] font-medium">
                    <textPath href="#seal" textLength="236" lengthAdjust="spacing">
                      {ring}
                    </textPath>
                  </text>
                </svg>
                <Lotus animate className="size-12 text-azure" />
              </div>

              <div
                className="float absolute -bottom-8 -right-3 w-[220px] rounded-[22px] bg-white p-5 shadow-[0_30px_60px_-30px_rgba(31,42,68,.5)] md:-right-10"
                style={{ ["--d" as string]: "1s" }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-[44px] font-medium leading-none tracking-tight">30</span>
                  <span className="serif-accent text-3xl text-azure">+</span>
                </div>
                <p className="mt-1 text-[14px] text-muted">{t.badgeYears}</p>
                <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-ink/70">
                  <span className="rounded-md bg-mist px-1.5 py-0.5 font-semibold text-brand">ISO 9001</span>
                  <span className="leading-tight">{t.badgeIso}</span>
                </div>
              </div>

              <div className="float absolute -left-3 bottom-24 hidden items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-[13px] text-white shadow-xl sm:flex md:-left-14" style={{ ["--d" as string]: "2.5s" }}>
                <span className="relative grid size-8 place-items-center rounded-full bg-azure">
                  <span className="absolute inset-0 animate-ping rounded-full bg-azure/60" />
                  <span className="relative size-2 rounded-full bg-white" />
                </span>
                {t.badgeTime}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* stats */}
      <section className="border-y border-line bg-white/60">
        <Container className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`reveal flex flex-col gap-2 py-8 md:py-10 ${i % 2 ? "pl-6 md:pl-10" : "pr-6"} ${i > 0 ? "lg:border-l lg:border-line lg:pl-10" : ""} ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
              style={{ ["--d" as string]: `${i * 100}ms` }}
            >
              <div className="flex items-baseline text-[clamp(38px,4.6vw,60px)] font-medium leading-none tracking-[-0.04em]">
                <Counter to={s.value} from={s.value > 1000 ? 1960 : 0} />
                <span className="serif-accent ml-0.5 text-azure">{s.suffix}</span>
              </div>
              <p className="text-[14px] leading-snug text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* clients */}
      <section className="py-12 md:py-16">
        <Container>
          <p className="reveal text-center text-[13px] uppercase tracking-[0.18em] text-muted">{clientsTitle}</p>
        </Container>
        <div className="marquee-wrap mt-8 overflow-hidden">
          <div className="marquee items-center" style={{ ["--speed" as string]: "45s" }}>
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                aria-hidden={i >= clients.length || undefined}
                className="mx-8 flex h-14 w-[140px] shrink-0 items-center justify-center md:mx-12"
              >
                <Image
                  src={`/img/clients/${c}.webp`}
                  alt=""
                  width={240}
                  height={120}
                  className="max-h-14 w-auto object-contain opacity-60 mix-blend-multiply grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
