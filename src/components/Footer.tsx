import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/content";
import { phones, tel, fmtPhone, social } from "@/content/site";
import { services } from "@/content/services";
import { Facebook, Lotus, Youtube } from "./Icons";
import { Container, Kicker } from "./ui";

export default function Footer({ t, lang }: { t: Dict; lang: Locale }) {
  const c = t.contact;
  const base = `/${lang}`;
  return (
    <footer id="contacte" className="relative overflow-hidden bg-ink-deep text-white">
      <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
      <Lotus className="pointer-events-none absolute -bottom-24 -right-24 w-[620px] text-white/[.04]" />
      <Container className="relative pb-10 pt-24 md:pt-32">
        <Kicker light>{c.kicker}</Kicker>
        <p className="reveal mt-6 text-[clamp(48px,9vw,140px)] font-medium leading-[0.92] tracking-[-0.045em]">
          {c.title} <span className="serif-accent text-azure">{c.titleAccent}.</span>
        </p>

        <div className="mt-20 grid gap-12 border-t border-white/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="reveal">
            <p className="text-[13px] uppercase tracking-[0.18em] text-white/45">{c.deliveryTitle}</p>
            <div className="mt-5 flex flex-col gap-2">
              {phones.delivery.map((p) => (
                <a key={p} href={tel(p)} className="u-link w-fit text-[26px] font-medium tabular-nums tracking-tight hover:text-azure">
                  {fmtPhone(p)}
                </a>
              ))}
            </div>
            <p className="mt-5 text-[13px] uppercase tracking-[0.18em] text-white/45">{c.adminTitle}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">str. Maria Drăgan, 28/3, Chișinău</p>
            <p className="mt-1 text-[14px] text-white/50">{c.adminHours}</p>
          </div>

          <div className="reveal" style={{ ["--d" as string]: "80ms" }}>
            <p className="text-[13px] uppercase tracking-[0.18em] text-white/45">{t.nav.services}</p>
            <ul className="mt-5 space-y-2.5 text-[15px] text-white/80">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`${base}/servicii/${s.slug}`} className="u-link hover:text-white">
                    {t.servicePages[s.slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ ["--d" as string]: "160ms" }}>
            <p className="text-[13px] uppercase tracking-[0.18em] text-white/45">Nufărul</p>
            <ul className="mt-5 space-y-2.5 text-[15px] text-white/80">
              {(
                [
                  ["preturi", t.nav.prices],
                  ["reduceri", t.nav.discounts],
                  ["utilaje", t.nav.equipment],
                  ["despre", t.nav.about],
                  ["contacte", t.nav.contacts],
                  ["regulament", t.footer.rules],
                ] as const
              ).map(([path, label]) => (
                <li key={path}>
                  <Link href={`${base}/${path}`} className="u-link hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal" style={{ ["--d" as string]: "240ms" }}>
            <p className="text-[13px] uppercase tracking-[0.18em] text-white/45">{c.follow}</p>
            <div className="mt-5 flex gap-3">
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-azure hover:bg-azure">
                <Facebook className="size-5" />
              </a>
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-azure hover:bg-azure">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/12 pt-8 text-[14px] text-white/45 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-white px-3 py-1.5">
              <Image src="/img/logo.webp" alt="Nufărul" width={400} height={216} className="h-7 w-auto" />
            </span>
            © 1994–2026 {t.footer.rights}
          </div>
        </div>
      </Container>
    </footer>
  );
}
