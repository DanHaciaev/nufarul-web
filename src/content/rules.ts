import { rulesText } from "./prices";

export type RuleItem = { n: number; lead: string; parts: { mark: string; text: string; sub: boolean }[] };

/* The regulation comes as one long paragraph. Top-level points are "1. … 19.",
   taken strictly in order so numbers inside the text ("art.13", "30 zile")
   never start a new point. Inside a point, "4.1" subsections and "a) b) …"
   letters become list entries. */
export function parseRules() {
  const raw = rulesText();
  const sig = raw.search(/Administraţia|Administrația/);
  const body = sig > 0 ? raw.slice(0, sig) : raw;
  const signature = sig > 0 ? raw.slice(sig).replace(/_{3,}/g, " — ").replace(/\s+/g, " ").trim() : "";

  const starts: number[] = [];
  const re = /(?:^|\s)(\d{1,2})\.\s/g;
  let next = 1;
  for (let m; (m = re.exec(body)); ) {
    if (Number(m[1]) === next) {
      starts.push(m.index);
      next++;
    }
  }

  const items: RuleItem[] = starts.map((start, i) => {
    const text = body.slice(start, starts[i + 1] ?? body.length).trim().replace(/^\d{1,2}\.\s*/, "");
    const chunks = text.split(/\s(?=(?:\d\.\d|[a-k]\))\s)/);
    const parts = chunks.slice(1).map((c) => {
      const m = c.match(/^(\d\.\d|[a-k]\))\s+([\s\S]*)$/);
      return { mark: m?.[1] ?? "", text: (m?.[2] ?? c).trim(), sub: !!m && /\d\.\d/.test(m[1]) };
    });
    return { n: i + 1, lead: chunks[0].trim(), parts };
  });

  return { items, signature };
}
