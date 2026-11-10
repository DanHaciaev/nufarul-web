import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import { Process, ServiceCards } from "@/components/Sections";
import { Container, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/servicii">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.nav.services,
    description: t.servicesPage.lead,
    alternates: { canonical: `/${lang}/servicii`, languages: { ro: "/ro/servicii", ru: "/ru/servicii" } },
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/servicii">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main>
      <PageHero
        crumbs={[{ href: `/${lang}`, label: t.nav.home }, { label: t.nav.services }]}
        title={t.servicesPage.title}
        accent={t.servicesPage.titleAccent}
        lead={t.servicesPage.lead}
      />
      <Container className="pb-24 md:pb-32">
        <ServiceCards t={t} lang={lang} withDelivery />
        <p className="reveal mt-8 text-[15px] text-muted">{t.home.urgent}</p>
      </Container>
      <Process t={t.process} n="" />
    </main>
  );
}
