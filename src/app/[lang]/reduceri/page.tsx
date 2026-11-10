import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { phones, tel, fmtPhone } from "@/content/site";
import { Lotus, Phone } from "@/components/Icons";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/reduceri">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.discounts,
    description: t.discountsPage.lead,
    alternates: { canonical: `/${lang}/reduceri`, languages: { ro: "/ro/reduceri", ru: "/ru/reduceri" } },
  };
}

export default async function DiscountsPage({ params }: PageProps<"/[lang]/reduceri">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const d = t.discountsPage;
  const [card, ...rest] = d.items;

  return (
    <main>
      <PageHero crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.discounts }]} title={d.title} accent={d.titleAccent} lead={d.lead} />

      <Container className="pb-24 md:pb-32">
        {/* loyalty card gets the wide slot, styled like the card itself */}
        <article className="reveal relative grid gap-10 overflow-hidden rounded-[32px] bg-ink-deep p-8 text-white md:grid-cols-[1fr_1.3fr] md:items-center md:p-14">
          <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
          <div className="relative mx-auto aspect-[1.586] w-full max-w-[380px] -rotate-3 rounded-[22px] bg-gradient-to-br from-azure to-brand-700 p-6 shadow-[0_40px_80px_-30px_rgba(10,143,214,.7)] transition-transform duration-700 hover:rotate-0">
            <Lotus className="absolute -bottom-6 -right-4 w-48 text-white/20" />
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/70">Nufărul</p>
            <p className="serif-accent mt-6 text-[72px] leading-none">{card.value}</p>
            <p className="absolute bottom-6 left-6 text-[12px] uppercase tracking-[0.16em] text-white/70">{card.applies}</p>
          </div>
          <div className="relative">
            <h2 className="text-[clamp(28px,3.2vw,42px)] font-medium leading-[1.1] tracking-[-0.025em]">{card.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-white/70">{card.text}</p>
            <p className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-[14px] text-white/80">
              <span className="mr-2 text-white/45">{d.appliesLabel}</span>
              {card.applies}
            </p>
          </div>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((it, i) => (
            <article
              key={it.title}
              className="reveal group flex flex-col rounded-[28px] border border-line bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-32px_rgba(31,42,68,.35)] md:p-10"
              style={{ ["--d" as string]: `${i * 80}ms` }}
            >
              <span className="serif-accent text-[clamp(56px,6vw,80px)] leading-none text-azure">{it.value}</span>
              <h3 className="mt-6 text-[24px] font-medium tracking-tight">{it.title}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink/70">{it.text}</p>
              <p className="mt-6 border-t border-line pt-5 text-[14px]">
                <span className="text-muted">{d.appliesLabel}: </span>
                {it.applies}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal mt-5 flex flex-col gap-6 rounded-[28px] bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-[22px] font-medium tracking-tight">{d.ctaTitle}</p>
            <p className="mt-2 text-[15px] text-muted">{d.ctaText}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            {phones.delivery.map((n) => (
              <a key={n} href={tel(n)} className="flex items-center justify-between gap-6 rounded-2xl bg-ink px-5 py-3.5 text-white transition-colors hover:bg-azure">
                <span className="text-[18px] font-medium tabular-nums">{fmtPhone(n)}</span>
                <Phone className="size-4.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
