import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import Hero from "@/components/Hero";
import { AboutTeaser, Delivery, Faq, PointsTeaser, Process, Reviews, Services } from "@/components/Sections";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: { canonical: `/${lang}`, languages: { ro: "/ro", ru: "/ru" } } };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main>
      <Hero t={t.hero} stats={t.stats} clientsTitle={t.clientsTitle} lang={lang} />
      <Services t={t} lang={lang} />
      <Process t={t.process} />
      <Delivery t={t.delivery} lang={lang} />
      <AboutTeaser t={t} lang={lang} />
      <Reviews t={t.reviews} />
      <PointsTeaser t={t} lang={lang} />
      <Faq t={t.faq} />
    </main>
  );
}
