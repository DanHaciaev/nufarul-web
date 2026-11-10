import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/content";
import { phones, tel, fmtPhone, partners } from "@/content/site";
import { services } from "@/content/services";
import { Arrow, Clock, Lotus, Phone, Pin, Plus } from "./Icons";
import { Container, Kicker, Title } from "./ui";

export function ServiceCards({ t, lang, withDelivery = false }: { t: Dict; lang: Locale; withDelivery?: boolean }) {
  const list = services.filter((s) => withDelivery || s.slug !== "livrare");
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const p = t.servicePages[s.slug];
        const dark = !s.image;
        return (
          <Link
            key={s.slug}
            href={`/${lang}/servicii/${s.slug}`}
            className={`reveal group relative flex flex-col overflow-hidden rounded-[26px] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 ${
              dark ? "bg-ink text-white" : "border border-line bg-white hover:shadow-[0_30px_60px_-32px_rgba(31,42,68,.35)]"
            }`}
            style={{ ["--d" as string]: `${(i % 3) * 110}ms` }}
          >
            <div className="relative h-[168px] overflow-hidden">
              {dark ? (
                <Lotus className="absolute -right-6 -top-4 size-56 text-white/[.07] transition-transform duration-[1.4s] group-hover:rotate-6 group-hover:scale-110" />
              ) : (
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
                />
              )}
              <span className={`absolute left-5 top-5 rounded-full px-2.5 py-1 text-[12px] tabular-nums backdrop-blur ${dark ? "bg-white/10 text-white/60" : "bg-white/85 text-ink/70"}`}>
                0{i + 1}
              </span>
              <span className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[13px] font-medium backdrop-blur ${dark ? "bg-azure text-white" : "bg-ink/85 text-white"}`}>
                {t.common.from} {p.from}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="text-[24px] font-medium tracking-tight">{p.title}</h3>
              <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-ink/65"}`}>{p.short}</p>
              <div className={`mt-7 flex items-center justify-between gap-4 border-t pt-5 ${dark ? "border-white/15" : "border-line"}`}>
                <span className={`flex items-center gap-2 text-[14px] ${dark ? "text-white/80" : "text-ink/80"}`}>
                  <Clock className={`size-4 shrink-0 ${dark ? "text-azure" : "text-brand"}`} />
                  {p.term}
                </span>
                <span className={`inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium ${dark ? "text-azure" : "text-brand"}`}>
                  {t.common.seePrices}
                  <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function Services({ t, lang }: { t: Dict; lang: Locale }) {
  const h = t.home;
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker n="01">{h.servicesKicker}</Kicker>
            <Title a={h.servicesTitle} b={h.servicesAccent} className="mt-6" />
          </div>
          <p className="reveal text-[17px] leading-relaxed text-ink/70 lg:col-span-4 lg:col-start-9" style={{ ["--d" as string]: "160ms" }}>
            {h.servicesLead}
          </p>
        </div>

        <div className="mt-16">
          <ServiceCards t={t} lang={lang} />
        </div>

        <div className="reveal mt-8 flex flex-col gap-4 rounded-[20px] bg-sand-100 px-6 py-5 text-[15px] text-[#6b4e1a] md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand text-white">!</span>
            {h.urgent}
          </p>
          <Link href={`/${lang}/preturi`} className="group inline-flex shrink-0 items-center gap-2 font-medium">
            <span className="u-link">{t.common.seeAllPrices}</span>
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Process({ t, n = "02" }: { t: Dict["process"]; n?: string }) {
  return (
    <section className="relative overflow-hidden bg-mist py-24 md:py-32">
      <Container>
        <Kicker n={n}>{t.kicker}</Kicker>
        <Title a={t.title} b={t.titleAccent} className="mt-6 max-w-[820px]" />

        <ol className="relative mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="grow-line absolute left-0 right-0 top-[27px] hidden h-px bg-ink/15 lg:block" />
          {t.steps.map((s, i) => (
            <li key={s.title} className="reveal relative" style={{ ["--d" as string]: `${200 + i * 160}ms` }}>
              <span className="relative grid size-14 place-items-center rounded-full border border-ink/15 bg-mist text-[15px] font-medium tabular-nums">
                0{i + 1}
                {i === 3 && <span className="absolute -inset-1.5 rounded-full border border-azure/50" />}
              </span>
              <h3 className="mt-7 text-[24px] font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-ink/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Delivery({ t, lang }: { t: Dict["delivery"]; lang: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink-deep py-24 text-white md:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-40 top-1/2 size-[640px] -translate-y-1/2 rounded-full bg-azure/20 blur-[120px]" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Kicker n="03" light>
            {t.kicker}
          </Kicker>
          <h2 className="reveal mt-6 text-[clamp(36px,5vw,68px)] font-medium leading-[1.02] tracking-[-0.03em]" style={{ ["--d" as string]: "80ms" }}>
            {t.title} <span className="serif-accent block text-[1.1em] text-azure">{t.titleAccent}</span>
          </h2>
          <p className="reveal mt-7 max-w-[480px] text-[17px] leading-relaxed text-white/65" style={{ ["--d" as string]: "160ms" }}>
            {t.text}
          </p>

          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "240ms" }}>
            {phones.delivery.map((p) => (
              <a
                key={p}
                href={tel(p)}
                className="group flex items-center justify-between gap-6 rounded-2xl border border-white/15 px-5 py-4 transition-colors hover:border-azure hover:bg-azure"
              >
                <span className="text-[22px] font-medium tabular-nums tracking-tight">{fmtPhone(p)}</span>
                <Phone className="size-5 transition-transform group-hover:rotate-12" />
              </a>
            ))}
          </div>

          <dl className="reveal mt-9 grid gap-2 text-[15px]" style={{ ["--d" as string]: "300ms" }}>
            {t.hours.map(([d, h]) => (
              <div key={d} className="flex flex-wrap gap-x-4">
                <dt className="w-full text-white/50 sm:w-[190px]">{d}</dt>
                <dd className="text-white/85">{h}</dd>
              </div>
            ))}
          </dl>

          <Link href={`/${lang}/servicii/livrare`} className="reveal group mt-9 inline-flex items-center gap-2 text-[15px] font-medium text-azure" style={{ ["--d" as string]: "360ms" }}>
            <span className="u-link">{t.more}</span>
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative lg:col-span-6">
          <div className="unveil relative aspect-[10/8] rounded-[28px] [--mist:#14213a]">
            <Image src="/img/equipment.webp" alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="unveil absolute -bottom-10 -left-4 hidden aspect-[1080/255] w-[62%] rounded-[18px] border-4 border-ink-deep md:block [--mist:#14213a]" style={{ ["--d" as string]: "300ms" }}>
            <Image src="/img/shirts.webp" alt="" fill sizes="380px" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AboutTeaser({ t, lang }: { t: Dict; lang: Locale }) {
  const h = t.home;
  return (
    <section className="pt-24 md:pt-36">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Kicker n="04">{h.aboutKicker}</Kicker>
          <Title a={h.aboutTitle} b={h.aboutAccent} className="mt-6" />
          <p className="reveal mt-8 max-w-[560px] text-[17px] leading-relaxed text-ink/70" style={{ ["--d" as string]: "160ms" }}>
            {h.aboutText}
          </p>
          <div className="reveal mt-10 grid max-w-[560px] grid-cols-3 gap-4 border-t border-line pt-8" style={{ ["--d" as string]: "220ms" }}>
            {t.about.timeline.slice(0, 3).map((e) => (
              <div key={e.year}>
                <span className="serif-accent block text-[clamp(30px,3vw,38px)] leading-none text-brand">{e.year}</span>
                <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-muted">{e.text}</p>
              </div>
            ))}
          </div>
          <Link
            href={`/${lang}/despre`}
            className="reveal group mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
            style={{ ["--d" as string]: "280ms" }}
          >
            {h.aboutCta}
            <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <div className="unveil relative aspect-[1000/650] rounded-[24px]">
            <Image src="/img/equipment-2.webp" alt="" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
          <Image
            src="/img/diplomas/cinet.webp"
            alt="CINET Global Best Practices Awards 2020"
            width={160}
            height={193}
            className="float absolute -bottom-12 -left-4 w-28 drop-shadow-xl md:-left-6 md:w-36"
          />
        </div>
      </Container>
      <PartnersMarquee label={t.about.partners} className="mt-24" />
    </section>
  );
}

export function PartnersMarquee({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`border-y border-line py-7 ${className}`}>
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee items-center" style={{ ["--speed" as string]: "38s" }}>
          {[0, 1].map((k) => (
            <div key={k} aria-hidden={k === 1 || undefined} className="flex shrink-0 items-center">
              <span className="mx-8 text-[13px] uppercase tracking-[0.18em] text-muted">{label}</span>
              {partners.map((p) => (
                <span key={p} className="flex items-center text-[clamp(26px,3vw,40px)] font-medium tracking-tight text-ink/80">
                  <span className="mx-8">{p}</span>
                  <Lotus className="size-6 text-azure/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Reviews({ t, n = "05" }: { t: Dict["reviews"]; n?: string }) {
  return (
    <section className="bg-mist py-24 md:py-32">
      <Container>
        <Kicker n={n}>{t.kicker}</Kicker>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {t.items.map((r, i) => (
            <figure key={r.name} className="reveal flex flex-col justify-between rounded-[28px] bg-white p-8 md:p-12" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <span className="serif-accent block h-12 text-[110px] leading-[0.9] text-azure/80">“</span>
              <blockquote className="mt-6 text-[clamp(20px,2vw,26px)] leading-[1.45] tracking-[-0.01em]">{r.quote}</blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-line pt-6">
                <span className="grid size-12 place-items-center rounded-full bg-ink text-[17px] font-medium text-white">{r.name[0]}</span>
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="text-[14px] text-muted">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PointsTeaser({ t, lang }: { t: Dict; lang: Locale }) {
  const h = t.home;
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Link
          href={`/${lang}/contacte`}
          className="reveal group relative grid items-center gap-10 overflow-hidden rounded-[32px] border border-line bg-white p-8 transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(31,42,68,.35)] md:p-14 lg:grid-cols-12"
        >
          <svg className="pointer-events-none absolute -right-24 -top-24 size-[520px] text-azure/25" viewBox="0 0 400 400" fill="none" aria-hidden>
            {[60, 110, 160].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="0.6" />
            ))}
          </svg>
          <div className="relative lg:col-span-7">
            <Kicker n="06">{h.pointsKicker}</Kicker>
            <p className="mt-6 text-[clamp(34px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.03em]">
              {h.pointsTitle} <span className="serif-accent text-[1.08em] text-brand">{h.pointsAccent}</span>
            </p>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink/70">{h.pointsText}</p>
          </div>
          <div className="relative flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-wrap gap-2">
              {Object.values(t.points.sectors).map((s) => (
                <span key={s} className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[14px]">
                  <Pin className="size-3.5 text-azure" />
                  {s}
                </span>
              ))}
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white transition-colors group-hover:bg-azure">
              {h.pointsCta}
              <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}

export function Faq({ t, n = "07" }: { t: Dict["faq"]; n?: string }) {
  return (
    <section className="pb-24 md:pb-36">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker n={n}>{t.kicker}</Kicker>
          <Lotus animate className="mt-10 hidden w-40 text-azure/70 lg:block" />
        </div>
        <div className="lg:col-span-8">
          {t.items.map((f, i) => (
            <details key={f.q} className="reveal group border-b border-line" style={{ ["--d" as string]: `${i * 60}ms` }} open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 text-[clamp(19px,2vw,24px)] font-medium tracking-tight transition-colors hover:text-brand">
                {f.q}
                <span className="faq-plus grid size-10 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:bg-ink group-open:text-white">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-[640px] pb-8 text-[16px] leading-relaxed text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
