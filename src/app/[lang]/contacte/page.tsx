import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { phones, tel, fmtPhone } from "@/content/site";
import Points from "@/components/Points";
import { Faq } from "@/components/Sections";
import { Clock, Phone, Pin } from "@/components/Icons";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacte">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.contacts,
    description: t.contactsPage.lead,
    alternates: { canonical: `/${lang}/contacte`, languages: { ro: "/ro/contacte", ru: "/ru/contacte" } },
  };
}

export default async function ContactsPage({ params }: PageProps<"/[lang]/contacte">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = t.contact;

  return (
    <main>
      <PageHero
        crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.contacts }]}
        title={t.contactsPage.title}
        accent={t.contactsPage.titleAccent}
        lead={t.contactsPage.lead}
      />

      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="reveal rounded-[26px] bg-ink-deep p-7 text-white md:p-9">
            <p className="text-[13px] uppercase tracking-[0.16em] text-white/50">{c.deliveryTitle}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              {phones.delivery.map((n) => (
                <a key={n} href={tel(n)} className="group flex flex-1 items-center justify-between rounded-2xl border border-white/15 px-4 py-3.5 transition-colors hover:border-azure hover:bg-azure">
                  <span className="text-[20px] font-medium tabular-nums tracking-tight">{fmtPhone(n)}</span>
                  <Phone className="size-4.5" />
                </a>
              ))}
            </div>
            <dl className="mt-5 space-y-1.5 text-[14.5px]">
              {t.delivery.hours.map(([d, h]) => (
                <div key={d} className="flex flex-wrap gap-x-4">
                  <dt className="text-white/50 sm:w-[190px]">{d}</dt>
                  <dd className="text-white/85">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal rounded-[26px] border border-line bg-white p-7 md:p-9" style={{ ["--d" as string]: "100ms" }}>
            <p className="text-[13px] uppercase tracking-[0.16em] text-muted">{c.adminTitle}</p>
            <p className="mt-5 flex items-start gap-3 text-[20px] font-medium tracking-tight">
              <Pin className="mt-1 size-5 shrink-0 text-azure" />
              str. Maria Drăgan, 28/3, Chișinău
            </p>
            <p className="mt-4 flex items-center gap-3 text-[15px] text-ink/75">
              <Clock className="size-4.5 shrink-0 text-muted" />
              {c.adminHours}
            </p>
            <a href={tel(phones.admin)} className="mt-3 flex items-center gap-3 text-[15px] text-ink/75 hover:text-azure">
              <Phone className="size-4.5 shrink-0 text-muted" />
              {fmtPhone(phones.admin)}
            </a>
          </div>
        </div>
      </Container>

      <section className="py-20 md:py-28">
        <Container>
          <h2 className="reveal mb-8 text-[clamp(30px,3.6vw,46px)] font-medium tracking-[-0.03em]">
            {t.points.title} <span className="serif-accent text-[1.08em] text-brand">{t.points.titleAccent}</span>
          </h2>
          <Points t={t.points} />
        </Container>
      </section>

      <Faq t={t.faq} n="" />
    </main>
  );
}
