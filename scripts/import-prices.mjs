// Pulls the published price list from nufarul.com (the old "Comandă online"
// page, one per language) and writes src/content/prices.json.
//
//   node scripts/import-prices.mjs
//
// Each language keeps its own rows exactly as the company published them —
// the RO and RU pages are sorted differently, so rows are never paired.

import { writeFile } from "node:fs/promises";

const SOURCES = {
  ro: "https://www.nufarul.com/ro/order-online.html",
  ru: "https://www.nufarul.com/ru/order-online.html",
};

const ENTITIES = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"', "#039": "'", icirc: "î", Icirc: "Î", acirc: "â", Acirc: "Â" };
const text = (s) =>
  s
    // the source has a bare "grosime <10mm" that would otherwise read as a tag
    .replace(/<(?=[\d\s=])/g, "&lt;")
    .replace(/<br\s*\/?>/g, " | ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(\w+|#\d+);/g, (m, e) => ENTITIES[e] ?? m)
    .replace(/\s+/g, " ")
    .trim();

const SUSPENDED = /!!!\s*SERVICIU TEMPORAR SUSPENDAT\s*!!!/i;
const UNIT = /\(\s*(?:lei|лей)\s*\/\s*(m²|м²|m\.p\.|kg|кг|buc|шт|covor|km)\s*\)/i;
const UNIT_NAMES = { "м²": "m²", "m.p.": "m²", кг: "kg", шт: "buc" };

// Typos / untranslated bits in the source, fixed for display only.
const FIXES = [
  [/\(simple \/ complicated\)/, "(simplă / complicată)"],
  [/^WORK CLOTHING \(thick, winter\)$/, "Рабочая одежда (утеплённая, зимняя)"],
  [/^TOATE SECTOARELE ORAȘULUI: BOTANICA, BUIUCANI, CENTRU, RÂȘCANI, CIOCANA/, "Toate sectoarele orașului: Botanica, Buiucani, Centru, Râșcani, Ciocana"],
  [/^PE REPUBLICĂ$/, "Pe teritoriul Republicii Moldova"],
  [/^(Localități[^()]*Cricova)\)$/, "$1"],
  [/^ВСЕ СЕКТОРА ГОРОДА: BOTANICA, BUIUCANI, CENTRU, RÂȘCANI, CIOCANA \(включительно/, "Все секторы города: Ботаника, Буюканы, Центр, Рышкановка, Чеканы (включая"],
  [/^ДРУГИЕ НАСЕЛЕННЫЕ ПУНКТЫ \(из мун\. Кишинэу и по близости, включительно/, "Пригороды и сёла мун. Кишинэу (включая"],
  [/^ПО РЕСПУБЛИКЕ$/, "По всей Молдове"],
  [/chpiu/g, "chipiu"],
  [/искуственные/g, "искусственные"],
  [/химчитска/g, "химчистка"],
  [/\(incl curăţarea chimică\)/, "(incl. curățarea chimică)"],
  [/грязезашитные/g, "грязезащитные"],
  [/Сovoare/g, "Covoare"],
  [/\s+,/g, ","],
  [/\(\s+/g, "("],
  [/\s+\)/g, ")"],
  [/,\s*$/, ""],
];
const fix = (s) => FIXES.reduce((acc, [re, to]) => acc.replace(re, to), s);

// "CURĂȚARE COVOARE" / "ÎMBRĂCĂMINTE DE LUCRU (groasă)" → sentence case;
// only the part outside parentheses decides
const sentence = (s) => {
  const head = s.replace(/\(.*?\)/g, "");
  return head === head.toUpperCase() ? s[0] + s.slice(1).toLowerCase() : s;
};

const num =(p) => p.replace(/(\d+)\.00\b/g, "$1");

function parseRow(rawName, rawPrice) {
  let [name, ...notes] = text(rawName).split(/\s*\|\s*/);
  let note = notes.join(" ").trim();
  let unit;

  const m = name.match(UNIT) || note.match(UNIT);
  if (m) {
    unit = UNIT_NAMES[m[1].toLowerCase()] ?? m[1].toLowerCase();
    name = name.replace(UNIT, "");
    note = note.replace(UNIT, "");
  }
  // phone hints repeat on every row and are already on the page
  note = note
    .replace(/(Colectare și livrare la domiciliu|Прием и доставка на дом):?\s*/gi, "")
    .replace(/,?\s*(tel|тел)\.?\s*[\d-]+\.?/gi, "")
    .replace(/^\s*[.,]\s*/, "")
    .trim();
  name = fix(name.trim());

  let price = num(text(rawPrice));
  let from = false;
  const fm = price.match(/^(?:de la|от)\s+(.*)$/i);
  if (fm) {
    from = true;
    price = fm[1];
  }
  const pu = price.match(/^([\d.]+)\s*(?:lei|лей)\s*\/\s*(\S+)$/i);
  if (pu) {
    price = pu[1];
    unit = { com: "order", "ком": "order" }[pu[2]] ?? pu[2];
  }

  // "Palton (cu glugă/fără glugă)" + "370 / 330" → two labelled prices
  const prices = price.split("/").map((p) => p.trim()).filter(Boolean);
  let variants;
  const paren = name.match(/\(([^()]*\/[^()]*)\)\s*$/);
  if (paren && prices.length > 1) {
    const labels = paren[1].split("/").map((s) => s.trim());
    if (labels.length === prices.length) {
      variants = labels.map((label, i) => ({ label, price: prices[i] }));
      name = name.slice(0, paren.index).trim();
    }
  }

  return { name, prices, ...(variants && { variants }), ...(unit && { unit }), ...(from && { from }), ...(note && { note }) };
}

function parse(html) {
  const parts = html.split(/<div id="item_(\d+)" class="toggle-title/).slice(1);
  const cats = [];
  for (let i = 0; i < parts.length; i += 2) {
    const id = Number(parts[i]);
    const body = parts[i + 1];
    const rawTitle = text((body.match(/<b>([\s\S]*?)<\/b>/) || [])[1] || "");
    const rows = [];
    for (const tr of body.matchAll(/<tr class="product-row">([\s\S]*?)<\/tr>/g)) {
      const cells = [...tr[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]);
      rows.push(parseRow(cells[0] ?? "", cells[1] ?? ""));
    }
    cats.push({
      id,
      title: sentence(fix(rawTitle.replace(SUSPENDED, "").trim())),
      suspended: SUSPENDED.test(rawTitle),
      rows,
    });
  }
  return cats;
}

const out = { source: SOURCES, importedAt: new Date().toISOString().slice(0, 10) };
for (const [lang, url] of Object.entries(SOURCES)) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  const cats = parse(await res.text());
  // category 36 is the service regulation (one long paragraph), not prices
  const rules = cats.find((c) => c.id === 36);
  out[lang] = {
    categories: cats.filter((c) => c.id !== 36 && c.rows.length),
    rules: rules ? { title: rules.title, text: rules.rows[0]?.note || rules.rows[0]?.name || "" } : null,
  };
  console.log(lang, out[lang].categories.map((c) => `${c.id}:${c.rows.length}`).join(" "));
}

await writeFile(new URL("../src/content/prices.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log("→ src/content/prices.json");
