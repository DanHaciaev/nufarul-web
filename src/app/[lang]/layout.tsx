import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Onest, Cormorant_Garamond } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/content";
import { services } from "@/content/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

// Onest — the same face the internal order system uses, so print-outs,
// receipts and the public site share one voice.
const onest = Onest({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-onest" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-cormorant",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL("https://www.nufarul.com"),
    title: { default: t.meta.title, template: `%s — ${t.meta.suffix}` },
    description: t.meta.description,
    openGraph: { title: t.meta.title, description: t.meta.description, images: ["/img/laundry.webp"], locale: lang },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const nav = services.map((s) => ({ slug: s.slug, title: t.servicePages[s.slug].title, short: t.servicePages[s.slug].short }));

  return (
    <html lang={lang} className={`${onest.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <Header t={t.nav} lang={lang} services={nav} />
        {children}
        <Footer t={t} lang={lang} />
      </body>
    </html>
  );
}
