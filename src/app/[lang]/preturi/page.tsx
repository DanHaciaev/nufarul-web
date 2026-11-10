import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { categoriesById } from "@/content/prices";
import { services } from "@/content/services";
import PriceList from "@/components/PriceList";
import { Arrow } from "@/components/Icons";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/preturi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.prices,
    description: t.pricesPage.lead,
    alternates: { canonical: `/${lang}/preturi`, languages: { ro: "/ro/preturi", ru: "/ru/preturi" } },
  };
}

export default async function PricesPage({ params }: PageProps<"/[lang]/preturi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = t.pricesPage;
  // same order as the services menu, suspended categories at the end
  const cats = categoriesById(lang, services.flatMap((s) => [...s.categories])).sort((a, b) => Number(a.suspended) - Number(b.suspended));

  return (
    <main>
      <PageHero crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.prices }]} title={p.title} accent={p.titleAccent} lead={p.lead} />

      <Container className="pb-24 md:pb-32">
        <PriceList
          categories={cats}
          search
          nav
          t={{ ...t.common, search: p.search, empty: p.empty, emptyHint: p.emptyHint, results: p.results }}
        />

        <div className="reveal mt-14 grid gap-8 rounded-[28px] bg-sand-100 p-8 text-[#6b4e1a] md:grid-cols-[1fr_auto] md:items-end md:p-10">
          <ul className="space-y-3 text-[15px] leading-relaxed">
            {p.notes.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-sand" />
                {n}
              </li>
            ))}
          </ul>
          <Link href={`/${lang}/regulament`} className="group inline-flex shrink-0 items-center gap-2 font-medium">
            <span className="u-link">{p.rules}</span>
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
