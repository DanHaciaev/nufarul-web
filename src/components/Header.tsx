"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/content";
import { phones, tel, fmtPhone } from "@/content/site";
import { Arrow, Phone } from "./Icons";

type ServiceLink = { slug: string; title: string; short: string };

export default function Header({ t, lang, services }: { t: Dict["nav"]; lang: Locale; services: ServiceLink[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close everything on navigation (adjusting state during render, not in an effect)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
    setMenu(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const base = `/${lang}`;
  const links = [
    [`${base}/preturi`, t.prices],
    [`${base}/reduceri`, t.discounts],
    [`${base}/utilaje`, t.equipment],
    [`${base}/despre`, t.about],
    [`${base}/contacte`, t.contacts],
  ] as const;
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = active(`${base}/servicii`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled || open || menu ? "bg-paper/90 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent"
      }`}
      onMouseLeave={() => setMenu(false)}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center gap-8 px-5 md:px-8">
        <Link href={base} className="shrink-0" aria-label="Nufărul">
          <Image src="/img/logo.webp" alt="Nufărul" width={400} height={216} priority className="h-11 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-[15px] lg:flex xl:gap-8">
          <button
            onMouseEnter={() => setMenu(true)}
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            className={`flex items-center gap-1.5 py-1 transition-colors hover:text-ink ${servicesActive || menu ? "text-ink" : "text-ink/75"}`}
          >
            {t.services}
            <svg viewBox="0 0 12 12" className={`size-2.5 transition-transform duration-300 ${menu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="m2 4.5 4 3.5 4-3.5" />
            </svg>
          </button>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setMenu(false)}
              className={`u-link py-1 transition-colors hover:text-ink ${active(href) ? "text-ink [background-size:100%_1px]" : "text-ink/75"}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <LangSwitch lang={lang} pathname={pathname} />
          <a
            href={tel(phones.delivery[0])}
            className="group hidden items-center gap-2.5 rounded-full bg-ink py-2.5 pl-3 pr-5 text-[14px] font-medium text-white transition-colors hover:bg-brand sm:flex"
          >
            <span className="grid size-7 place-items-center rounded-full bg-white/12 transition-transform group-hover:rotate-12">
              <Phone className="size-3.5" />
            </span>
            {fmtPhone(phones.delivery[0])}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
          >
            <span className={`absolute h-px w-4.5 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-4.5 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      {/* desktop services panel */}
      <div
        className={`absolute inset-x-0 top-full hidden border-t border-line bg-paper/95 backdrop-blur-xl transition-[opacity,transform] duration-300 lg:block ${
          menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-4 gap-2 px-8 py-8">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`${base}/servicii/${s.slug}`}
              className={`group rounded-2xl p-5 transition-colors hover:bg-white ${active(`${base}/servicii/${s.slug}`) ? "bg-white" : ""}`}
            >
              <span className="text-[12px] tabular-nums text-muted">0{i + 1}</span>
              <span className="mt-2 flex items-center justify-between gap-2 text-[17px] font-medium tracking-tight">
                {s.title}
                <Arrow className="size-4 -translate-x-1 text-azure opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
              <span className="mt-1.5 line-clamp-2 block text-[13px] leading-relaxed text-muted">{s.short}</span>
            </Link>
          ))}
          <Link href={`${base}/servicii`} className="group flex flex-col justify-end rounded-2xl bg-ink p-5 text-white transition-colors hover:bg-brand">
            <span className="flex items-center justify-between text-[17px] font-medium">
              {t.allServices}
              <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <nav className="flex h-[calc(100dvh-76px)] flex-col overflow-y-auto px-5 pb-8 pt-4">
            <p className="text-[12px] uppercase tracking-[0.16em] text-muted">{t.services}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {services.map((s) => (
                <Link key={s.slug} href={`${base}/servicii/${s.slug}`} className="rounded-xl bg-white px-3.5 py-3 text-[15px] leading-tight">
                  {s.title}
                </Link>
              ))}
            </div>
            {links.map(([href, label], i) => (
              <Link key={href} href={href} className="flex items-baseline gap-4 border-b border-line py-5 text-3xl font-medium tracking-tight">
                <span className="text-xs tabular-nums text-muted">0{i + 1}</span>
                {label}
              </Link>
            ))}
            <div className="mt-auto flex flex-col gap-3 pt-8">
              {phones.delivery.map((p) => (
                <a key={p} href={tel(p)} className="flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-lg text-white">
                  {fmtPhone(p)}
                  <Phone className="size-5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function LangSwitch({ lang, pathname }: { lang: Locale; pathname: string }) {
  return (
    <div className="flex rounded-full border border-line p-1 text-[13px] font-medium">
      {(["ro", "ru"] as const).map((l) => (
        <Link
          key={l}
          href={pathname.replace(/^\/(ro|ru)(?=\/|$)/, `/${l}`)}
          aria-current={l === lang ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${l === lang ? "bg-mist text-ink" : "text-muted hover:text-ink"}`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
