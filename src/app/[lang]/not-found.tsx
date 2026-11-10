import Link from "next/link";
import { getDictionary } from "@/content";
import { Lotus } from "@/components/Icons";
import { Container } from "@/components/ui";

// not-found gets no params; Romanian is the site default
export default function NotFound() {
  const t = getDictionary("ro").notFound;
  return (
    <main className="pb-24 pt-[160px] md:pb-32">
      <Container className="flex flex-col items-start">
        <Lotus animate className="w-28 text-azure" />
        <h1 className="mt-8 text-[clamp(40px,6vw,80px)] font-medium tracking-[-0.04em]">
          404 <span className="serif-accent text-azure">— {t.title}</span>
        </h1>
        <p className="mt-5 text-[18px] text-ink/70">{t.text}</p>
        <Link href="/ro" className="mt-10 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white hover:bg-brand">
          {t.cta}
        </Link>
      </Container>
    </main>
  );
}
