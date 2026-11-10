// Facts shared by both languages — addresses, phones, hours as published on
// nufarul.com/ro/contacts.html. Hours use day keys so each dictionary can
// render them in its own language.

export const phones = {
  delivery: ["079982294", "079982297"],
  admin: "079982294",
};

export const tel = (n: string) => {
  const digits = n.replace(/\D/g, "").replace(/^0/, "");
  return `tel:+373${digits}`;
};

export const fmtPhone = (n: string) => {
  const d = n.replace(/\D/g, "");
  if (d.length === 9 && d.startsWith("0")) return `0${d.slice(1, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  if (d.length === 9) return `(${d.slice(0, 3)}) ${d.slice(3, 6)} ${d.slice(6)}`;
  return n;
};

export type Sector = "centru" | "botanica" | "buiucani" | "ciocana" | "riscani" | "telecentru";

export type Schedule = "full" | "short";

export type Point = {
  id: string;
  sector: Sector;
  name?: "expres";
  street: string;
  phones: string[];
  schedule: Schedule;
  closed?: boolean;
};

export const points: Point[] = [
  { id: "dosoftei", sector: "centru", street: "str. Mitropolit Dosoftei, 100", phones: ["079988671", "022232234"], schedule: "full" },
  { id: "eminescu", sector: "centru", street: "str. Mihai Eminescu, 63", phones: ["079988605"], schedule: "full" },
  { id: "cuza", sector: "botanica", street: "str. Cuza Vodă, 24", phones: ["079988665", "022774507"], schedule: "full" },
  { id: "creanga", sector: "buiucani", street: "str. Ion Creangă, 58", phones: ["079336420", "022245225"], schedule: "full" },
  { id: "dragan", sector: "ciocana", name: "expres", street: "str. Maria Drăgan, 28/3", phones: ["079982294", "079982297"], schedule: "full" },
  { id: "asachi", sector: "telecentru", street: "str. Gh. Asachi, 48/1", phones: ["079988892", "022290158"], schedule: "full" },
  { id: "vladimirescu", sector: "riscani", street: "str. Tudor Vladimirescu, 1", phones: ["079988669", "022449994"], schedule: "short" },
  { id: "basarab", sector: "riscani", street: "str. Matei Basarab, 10", phones: ["079988672", "022324707"], schedule: "short" },
  { id: "mircea", sector: "ciocana", street: "bd. Mircea cel Bătrân, 24", phones: ["079988675", "022488392"], schedule: "short", closed: true },
];

export const mapsUrl = (street: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, Chișinău`)}`;

export const clients = [
  "bnm", "moldtelecom", "cec", "asem", "apacanal", "ise", "eurolab",
  "cet2", "aspiromed", "daachermes", "ambasada_rusiei",
];

export const partners = ["Kreussler", "SEITZ", "Ecolab", "Firbimatic", "Fenice", "ITALCLEAN", "Electrolux", "Kärcher", "Nilfisk"];

export const social = {
  facebook: "https://www.facebook.com/nufarulcom",
  youtube: "https://www.youtube.com/watch?v=imFf5QZuE-0",
};


// Shareholder documents from nufarul.com/ro/about-us.html, now served from
// /public/docs. Titles are the official Romanian names; only the code has an
// official Russian title.
export const shareholderDocs = [
  { file: "codul-de-guvernana-corporativa_nufarul.pdf", title: "Codul de guvernanță corporativă a companiei „Nufărul” S.A.", titleRu: "Кодекс корпоративного управления «Nufărul» S.A.", date: "" },
  { file: "aviz-de-convocare-a-adunarii-generale-extraordinare-a-actionarilor-din-12.10.2018.doc", title: "Aviz de convocare a adunării generale extraordinare a acționarilor", date: "12.10.2018" },
  { file: "hotararea-privind-emisiunea-vm-internet.pdf", title: "Hotărârea privind emisiunea valorilor mobiliare", date: "12.10.2018" },
  { file: "comunicat-informativ-privind-deciziile-agea-din-12.10.2018.pdf", title: "Comunicat informativ privind deciziile Adunării generale extraordinare a acționarilor", date: "12.10.2018" },
  { file: "dare-de-seama-privind-rezultatele-emisiunii-valorilor-mobiliare.pdf", title: "Darea de seamă privind rezultatele emisiunii valorilor mobiliare", date: "" },
  { file: "prospect-de-oferta-de-preluare-benevola-a-valorilor-mobiliare.pdf", title: "Prospect de ofertă de preluare benevolă a valorilor mobiliare", date: "" },
  { file: "aviz-de-convocare-a-adunarii-generale-extraordinare-a-actionarilor-nufarul-s.a.din-04.04.19.pdf", title: "Aviz de convocare a Adunării generale extraordinare a acționarilor", date: "04.04.2019" },
  { file: "comunicat-agea-04.04.19.pdf", title: "Comunicat informativ privind deciziile Adunării generale extraordinare a acționarilor", date: "04.04.2019" },
  { file: "aviz-de-convocare-aga-din-24.05.19-pe-site.doc", title: "Aviz de convocare a Adunării generale ordinare anuale a acționarilor", date: "24.05.2019" },
  { file: "anexa-nr.1-pe-site-si-msi.pdf", title: "Raportul anual al „Nufărul” S.A. pentru anul 2018 (Anexa nr. 1)", date: "2018" },
  { file: "declaratie-guvernanta-corporativa-2018-site.pdf", title: "Declarație de guvernanță corporativă pentru anul 2018", date: "2018" },
  { file: "comunicat-decizii-aga-din-24.05.19.doc", title: "Comunicat informativ cu privire la deciziile Adunării generale a acționarilor", date: "24.05.2019" },
] as { file: string; title: string; titleRu?: string; date: string }[];
