import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { phones, tel, fmtPhone } from "@/content/site";
import { Clock, Phone } from "@/components/Icons";
import { Container, Kicker, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/utilaje">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.equipment,
    description: t.equipmentPage.lead,
    alternates: { canonical: `/${lang}/utilaje`, languages: { ro: "/ro/utilaje", ru: "/ru/utilaje" } },
  };
}

export default async function EquipmentPage({ params }: PageProps<"/[lang]/utilaje">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const e = t.equipmentPage;

  return (
    <main>
      <PageHero crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.equipment }]} title={e.title} accent={e.titleAccent} lead={e.lead} />

      <Container>
        <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
          <div className="unveil relative aspect-[1000/650] rounded-[28px] bg-white">
            <Image src="/img/equipment.webp" alt="" fill priority sizes="(min-width: 768px) 56vw, 100vw" className="object-cover" />
          </div>
          <div className="unveil relative aspect-[1000/650] rounded-[28px] bg-white md:aspect-auto">
            <Image src="/img/equipment-2.webp" alt="" fill sizes="(min-width: 768px) 44vw, 100vw" className="object-contain p-4" />
          </div>
        </div>
      </Container>

      <section className="py-24 md:py-32">
        <Container>
          <Kicker>{e.makersTitle}</Kicker>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {e.makers.map((m, i) => (
              <article key={m.name} className="reveal rounded-[26px] border border-line bg-white p-8" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <p className="text-[34px] font-medium tracking-[-0.03em]">{m.name}</p>
                <p className="serif-accent mt-1 text-[20px] text-azure">{m.meta}</p>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink/70">{m.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Kicker>{e.rangeTitle}</Kicker>
            <ul className="mt-10 divide-y divide-line overflow-hidden rounded-[26px] border border-line bg-white">
              {e.range.map((r) => (
                <li key={r.title} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5 md:px-8">
                  <span>
                    <span className="block text-[18px] font-medium tracking-tight">{r.title}</span>
                    {r.text && <span className="mt-1 block text-[14.5px] text-muted">{r.text}</span>}
                  </span>
                  {r.cap && (
                    <span className="shrink-0 rounded-full bg-mist px-3.5 py-1.5 text-[14px]">
                      <span className="text-muted">{e.capLabel} </span>
                      <span className="font-medium tabular-nums">{r.cap}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Kicker>{e.servicesTitle}</Kicker>
            <ol className="mt-10 space-y-3">
              {e.services.map((s, i) => (
                <li key={s} className="reveal flex items-center gap-4 rounded-2xl bg-white px-5 py-4 text-[16px]" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span className="serif-accent w-8 shrink-0 text-[24px] leading-none text-brand">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="reveal relative overflow-hidden rounded-[32px] bg-ink-deep p-8 text-white md:p-14">
            <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-end">
              <div>
                <p className="text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.08] tracking-[-0.03em]">{e.ctaTitle}</p>
                <p className="mt-4 text-[17px] text-white/65">{e.ctaText}</p>
              </div>
              <div>
                <p className="text-[13px] uppercase tracking-[0.16em] text-white/50">{t.contact.adminTitle}</p>
                <a href={tel(phones.admin)} className="group mt-4 flex items-center justify-between rounded-2xl border border-white/15 px-5 py-4 transition-colors hover:border-azure hover:bg-azure">
                  <span className="text-[24px] font-medium tabular-nums tracking-tight">{fmtPhone(phones.admin)}</span>
                  <Phone className="size-5" />
                </a>
                <p className="mt-3 flex items-center gap-2 text-[14px] text-white/55">
                  <Clock className="size-4" />
                  {t.contact.adminHours}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
