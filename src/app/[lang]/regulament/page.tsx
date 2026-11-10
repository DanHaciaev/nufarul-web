import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { parseRules } from "@/content/rules";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/regulament">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.footer.rules,
    description: t.rulesPage.lead,
    alternates: { canonical: `/${lang}/regulament`, languages: { ro: "/ro/regulament", ru: "/ru/regulament" } },
  };
}

export default async function RulesPage({ params }: PageProps<"/[lang]/regulament">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const { items, signature } = parseRules();

  return (
    <main>
      <PageHero
        crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.footer.rules }]}
        title={t.rulesPage.title}
        accent={t.rulesPage.titleAccent}
        lead={t.rulesPage.lead}
      />
      <Container className="pb-24 md:pb-32">
        {t.rulesPage.langNote && (
          <p className="mb-8 inline-flex rounded-full bg-sand-100 px-4 py-2 text-[14px] text-[#6b4e1a]">{t.rulesPage.langNote}</p>
        )}
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav className="hidden lg:block">
            <ol className="sticky top-28 grid grid-cols-4 gap-1.5">
              {items.map((it) => (
                <li key={it.n}>
                  <a href={`#p${it.n}`} className="grid h-10 place-items-center rounded-lg border border-line bg-white text-[14px] tabular-nums transition-colors hover:border-ink hover:bg-ink hover:text-white">
                    {it.n}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <ol lang="ro" className="max-w-[820px] divide-y divide-line rounded-[28px] border border-line bg-white">
            {items.map((it) => (
              <li key={it.n} id={`p${it.n}`} className="grid scroll-mt-28 gap-4 p-6 md:grid-cols-[56px_1fr] md:p-9">
                <span className="serif-accent text-[38px] leading-none text-brand">{it.n}</span>
                <div className="text-[16px] leading-[1.7] text-ink/80">
                  <p>{it.lead}</p>
                  {it.parts.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {it.parts.map((p, i) => (
                        <li key={i} className={p.sub ? "pt-2 font-medium text-ink" : "flex gap-3 pl-1"}>
                          <span className={p.sub ? "mr-2 text-brand" : "w-5 shrink-0 text-muted"}>{p.mark}</span>
                          <span>{p.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
        {signature && <p className="mt-8 max-w-[820px] text-[14px] text-muted lg:ml-[268px]">{signature}</p>}
      </Container>
    </main>
  );
}
