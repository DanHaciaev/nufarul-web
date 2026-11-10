import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { clients, shareholderDocs } from "@/content/site";
import { PartnersMarquee, Reviews } from "@/components/Sections";
import { Download, Lotus } from "@/components/Icons";
import { Container, Kicker, PageHero } from "@/components/ui";

// diplomas were resized to 900px wide; heights keep the masonry from jumping
const DIPLOMA_H: Record<string, number> = {
  "diploma-1": 631, "diploma-2": 1166, "diploma-3": 721, "diploma-4": 1168, "diploma-5": 1190,
  "diploma-6": 639, "diploma-7": 1270, "diploma-8": 1295, cinet: 1087,
};

export async function generateMetadata({ params }: PageProps<"/[lang]/despre">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.about,
    description: t.about.lead,
    alternates: { canonical: `/${lang}/despre`, languages: { ro: "/ro/despre", ru: "/ru/despre" } },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/despre">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.about;

  return (
    <main>
      <PageHero crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.about }]} title={a.title} accent={a.titleAccent} lead={a.lead} />

      <Container>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="unveil relative aspect-[850/567] rounded-[28px]">
            <Image src="/img/laundry.webp" alt="" fill priority sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </div>
          <div className="unveil relative aspect-[1000/650] rounded-[28px] md:aspect-auto" style={{ ["--d" as string]: "200ms" }}>
            <Image src="/img/equipment.webp" alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>

      {/* history */}
      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Kicker>{a.timelineTitle}</Kicker>
              <Lotus animate className="mt-10 hidden w-44 text-azure/70 lg:block" />
            </div>
          </div>
          <ol className="relative border-l border-line lg:col-span-7 lg:col-start-6">
            {a.timeline.map((e, i) => (
              <li key={e.year} className="reveal group relative pb-12 pl-10 last:pb-0" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="absolute -left-[5px] top-3 size-[9px] rounded-full border border-brand bg-paper transition-colors duration-500 group-hover:bg-azure" />
                <span className="serif-accent block text-[clamp(40px,4vw,56px)] leading-none text-brand">{e.year}</span>
                <p className="mt-3 max-w-[520px] text-[17px] leading-relaxed text-ink/75">{e.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* mission */}
      <section className="relative overflow-hidden bg-ink-deep py-24 text-white md:py-32">
        <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
        <Container className="relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Kicker light>{a.missionTitle}</Kicker>
            <p className="reveal mt-8 text-[clamp(24px,2.6vw,34px)] leading-[1.3] tracking-[-0.015em] text-white/90">{a.values}</p>
            <p className="reveal mt-4 text-[13px] uppercase tracking-[0.16em] text-white/40">{a.valuesTitle}</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {a.mission.map((m, i) => (
              <li key={m} className="reveal bg-ink-deep p-7" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <span className="serif-accent text-[34px] leading-none text-azure">0{i + 1}</span>
                <p className="mt-4 text-[16px] leading-relaxed text-white/80">{m}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* technology */}
      <section className="py-24 md:py-32">
        <Container>
          <Kicker>{a.techTitle}</Kicker>
          <p className="reveal mt-8 max-w-[860px] text-[clamp(22px,2.4vw,30px)] leading-[1.35] tracking-[-0.015em] text-ink/85">{a.techIntro}</p>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {a.tech.map((x, i) => (
              <div key={x.title} className="reveal rounded-[24px] border border-line bg-white p-7" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <Lotus className="size-8 text-azure" />
                <h3 className="mt-6 text-[20px] font-medium tracking-tight">{x.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{x.text}</p>
              </div>
            ))}
            <div className="reveal rounded-[24px] bg-ink p-7 text-white">
              <p className="text-[13px] uppercase tracking-[0.16em] text-white/50">{a.partners}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-white/80">{a.partnersText}</p>
            </div>
          </div>
        </Container>
        <PartnersMarquee label={a.partners} className="mt-20" />
      </section>

      {/* awards */}
      <section className="bg-mist py-24 md:py-32">
        <Container>
          <Kicker>{a.awardsTitle}</Kicker>
          <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
            {a.awards.map((d, i) => (
              <a
                key={d.file}
                href={`/img/diplomas/${d.file}.webp`}
                target="_blank"
                rel="noopener"
                className="reveal group mb-4 block break-inside-avoid overflow-hidden rounded-[20px] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(31,42,68,.4)]"
                style={{ ["--d" as string]: `${(i % 4) * 80}ms` }}
              >
                <div className="overflow-hidden rounded-[12px] bg-paper">
                  <Image
                    src={`/img/diplomas/${d.file}.webp`}
                    alt={d.title}
                    width={900}
                    height={DIPLOMA_H[d.file] ?? 900}
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-3 px-1 text-[14.5px] font-medium leading-snug">{d.title}</p>
                <p className="px-1 pb-1 text-[12.5px] text-muted">{d.by}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <Reviews t={t.reviews} n="" />

      {/* clients + shareholders */}
      <section className="py-24 md:py-32">
        <Container>
          <Kicker>{t.clientsTitle}</Kicker>
          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-4 lg:grid-cols-6">
            {clients.map((c) => (
              <div key={c} className="grid h-28 place-items-center bg-white p-5">
                <Image src={`/img/clients/${c}.webp`} alt="" width={240} height={120} className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* shareholders: documents moved over from the old site, served from /docs */}
      <section id="actionari" className="scroll-mt-24 pb-24 md:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>{a.shareholdersTitle}</Kicker>
            <p className="reveal mt-6 text-[16px] leading-relaxed text-ink/70">{a.shareholdersText}</p>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-white lg:col-span-8">
            {shareholderDocs.map((doc) => {
              const ext = doc.file.split(".").pop()!.toUpperCase();
              return (
                <li key={doc.file}>
                  <a href={`/docs/${doc.file}`} download className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-paper md:px-7">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-[11px] font-semibold ${ext === "PDF" ? "bg-[#fbefee] text-[#a23b33]" : "bg-mist text-brand"}`}>
                      {ext}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15.5px] leading-snug">{lang === "ru" && doc.titleRu ? doc.titleRu : doc.title}</span>
                      {doc.date && <span className="text-[13px] text-muted">{doc.date}</span>}
                    </span>
                    <span className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium text-brand sm:flex">
                      {a.shareholdersCta}
                      <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}
