import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getDictionary, hasLocale, locales } from "@/content";
import { categoriesById } from "@/content/prices";
import { getService, services, slugs } from "@/content/services";
import { phones, tel, fmtPhone } from "@/content/site";
import PriceList from "@/components/PriceList";
import { Arrow, Clock, Lotus, Phone, Pin } from "@/components/Icons";
import { Container, Kicker, PageHero } from "@/components/ui";

export function generateStaticParams() {
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicii/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) return {};
  const p = getDictionary(lang).servicePages[s.slug];
  return {
    title: p.title,
    description: p.lead,
    alternates: { canonical: `/${lang}/servicii/${slug}`, languages: { ro: `/ro/servicii/${slug}`, ru: `/ru/servicii/${slug}` } },
  };
}

// "Curățare chimică" → ["Curățare", "chimică"]: the last word gets the serif accent
const splitLast = (s: string) => {
  const i = s.lastIndexOf(" ");
  return i < 0 ? ["", s] : [s.slice(0, i), s.slice(i + 1)];
};

// The slug is URL data, so it is read inside a Suspense boundary: the App Shell
// shared by all service links stays instant and the details stream in.
export default function ServicePage({ params }: PageProps<"/[lang]/servicii/[slug]">) {
  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <ServiceDetails params={params} />
    </Suspense>
  );
}

function ServiceSkeleton() {
  const bar = "rounded-full bg-ink/[.06] animate-pulse";
  return (
    <main aria-busy="true">
      <Container className="pb-14 pt-[120px] md:pb-20 md:pt-[148px]">
        <div className={`h-3.5 w-48 ${bar}`} />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className={`h-[clamp(42px,6.4vw,92px)] w-3/4 ${bar}`} />
            <div className={`mt-7 h-4 w-full max-w-[640px] ${bar}`} />
            <div className={`mt-3 h-4 w-2/3 max-w-[480px] ${bar}`} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-4">
            <div className="h-[118px] animate-pulse rounded-[20px] bg-ink/[.05]" />
            <div className="h-[118px] animate-pulse rounded-[20px] bg-ink/[.08]" />
          </div>
        </div>
      </Container>
      <Container>
        <div className="h-[180px] animate-pulse rounded-[28px] bg-mist md:h-auto md:aspect-[1080/255]" />
      </Container>
      <div className="h-[60vh]" />
    </main>
  );
}

async function ServiceDetails({ params }: Pick<PageProps<"/[lang]/servicii/[slug]">, "params">) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!hasLocale(lang) || !s) notFound();
  const t = getDictionary(lang);
  const p = t.servicePages[s.slug];
  const c = t.common;
  const cats = categoriesById(lang, [...s.categories]);
  const rows = cats.reduce((n, k) => n + k.rows.length, 0);
  const [a, b] = splitLast(p.title);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <main>
      <PageHero
        crumbs={[
          { href: `/${lang}`, label: t.nav.home },
          { href: `/${lang}/servicii`, label: t.nav.services },
          { label: p.title },
        ]}
        title={a}
        accent={b}
        lead={p.lead}
        aside={
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[20px] border border-line bg-white p-5">
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <Clock className="size-4 text-brand" />
                {c.term}
              </p>
              <p className="mt-2 text-[22px] font-medium tracking-tight">{p.term}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">{p.termNote}</p>
            </div>
            <div className="rounded-[20px] bg-ink p-5 text-white">
              <p className="text-[13px] text-white/55">{c.price}</p>
              <p className="mt-2 text-[22px] font-medium tracking-tight">
                <span className="serif-accent mr-1 text-[20px] text-azure">{c.from}</span>
                {p.from}
              </p>
              <a href="#preturi" className="mt-2 inline-flex items-center gap-1 text-[12.5px] text-white/70 hover:text-white">
                {c.seePrices} <Arrow className="size-3" />
              </a>
            </div>
          </div>
        }
      />

      <Container>
        {s.image ? (
          <div className="unveil relative h-[180px] rounded-[28px] md:h-auto md:aspect-[1080/255]">
            <Image src={s.image} alt="" fill priority sizes="(min-width: 1320px) 1260px, 100vw" className="object-cover" />
          </div>
        ) : (
          <div className="reveal relative h-[200px] overflow-hidden rounded-[28px] bg-ink md:h-[280px]">
            <div className="grain absolute inset-0 opacity-[.06] mix-blend-overlay" />
            <Lotus animate className="absolute -bottom-10 right-6 w-[360px] text-white/15 md:right-16" />
          </div>
        )}
      </Container>

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {p.body.map((para, i) => (
              <p key={i} className={`reveal text-[18px] leading-[1.7] text-ink/80 ${i ? "mt-6" : ""}`} style={{ ["--d" as string]: `${i * 80}ms` }}>
                {para}
              </p>
            ))}

            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {p.includes.map((item, i) => (
                <li key={item} className="reveal flex gap-3 rounded-2xl border border-line bg-white p-4 text-[15px] leading-snug" style={{ ["--d" as string]: `${i * 50}ms` }}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mist text-azure">
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="m2.5 6.2 2.3 2.3 4.7-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {p.notes.length > 0 && (
              <div className="reveal mt-8 space-y-2 rounded-[20px] bg-sand-100 px-6 py-5 text-[15px] leading-relaxed text-[#6b4e1a]">
                {p.notes.map((n) => (
                  <p key={n} className="flex gap-3">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-sand" />
                    {n}
                  </p>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="reveal rounded-[26px] bg-ink-deep p-7 text-white lg:sticky lg:top-28">
              <p className="text-[13px] uppercase tracking-[0.16em] text-white/50">{c.orderByPhone}</p>
              <div className="mt-5 flex flex-col gap-2">
                {phones.delivery.map((n) => (
                  <a key={n} href={tel(n)} className="group flex items-center justify-between rounded-2xl border border-white/15 px-4 py-3.5 transition-colors hover:border-azure hover:bg-azure">
                    <span className="text-[20px] font-medium tabular-nums tracking-tight">{fmtPhone(n)}</span>
                    <Phone className="size-4.5 transition-transform group-hover:rotate-12" />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/55">{c.orderHours}</p>
              <Link href={`/${lang}/contacte`} className="group mt-6 flex items-center justify-between border-t border-white/12 pt-5 text-[15px] text-white/85 hover:text-white">
                <span className="flex items-center gap-2">
                  <Pin className="size-4 text-azure" />
                  {c.findPoint}
                </span>
                <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section id="preturi" className="scroll-mt-24 bg-mist py-20 md:py-28">
        <Container className="max-w-[1080px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker>{t.nav.prices}</Kicker>
              <h2 className="reveal mt-5 text-[clamp(32px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.03em]">{p.title}</h2>
            </div>
            <Link href={`/${lang}/preturi`} className="group inline-flex items-center gap-2 text-[15px] font-medium text-brand">
              <span className="u-link">{c.seeAllPrices}</span>
              <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <PriceList
            categories={cats}
            search={rows > 25}
            t={{ ...c, search: t.pricesPage.search, empty: t.pricesPage.empty, emptyHint: t.pricesPage.emptyHint, results: t.pricesPage.results }}
          />
          <p className="mt-6 text-[14px] text-muted">{t.pricesPage.notes[0]}</p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Kicker>{c.otherServices}</Kicker>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Link
                key={o.slug}
                href={`/${lang}/servicii/${o.slug}`}
                className="reveal group flex items-center justify-between gap-4 rounded-[20px] border border-line bg-white px-6 py-5 transition-colors hover:border-ink"
                style={{ ["--d" as string]: `${i * 50}ms` }}
              >
                <span>
                  <span className="block text-[18px] font-medium tracking-tight">{t.servicePages[o.slug].title}</span>
                  <span className="text-[13px] text-muted">
                    {c.from} {t.servicePages[o.slug].from}
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist transition-colors group-hover:bg-ink group-hover:text-white">
                  <Arrow className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
