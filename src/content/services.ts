// Which photo and which price-list categories (ids from nufarul.com) belong
// to each service page. Texts live in the dictionaries under `servicePages`.

export const services = [
  { slug: "curatare-chimica", image: "/img/shirts-b.webp", categories: [9, 11, 37] },
  { slug: "spalatorie", image: "/img/towels.webp", categories: [5] },
  { slug: "covoare", image: "/img/carpet.webp", categories: [38] },
  { slug: "perne", image: "/img/pillows.webp", categories: [39] },
  { slug: "plapume-draperii", image: "/img/curtains.webp", categories: [12] },
  { slug: "piele-incaltaminte", image: "", categories: [25, 18, 17, 14] },
  { slug: "livrare", image: "/img/shirts.webp", categories: [35] },
] as const;

export type Slug = (typeof services)[number]["slug"];
export const slugs = services.map((s) => s.slug) as Slug[];
export const getService = (slug: string) => services.find((s) => s.slug === slug);
