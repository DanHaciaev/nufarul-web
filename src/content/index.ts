import ro, { type Dict } from "./ro";
import ru from "./ru";

const dictionaries = { ro, ru } satisfies Record<string, Dict>;

export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (l: string): l is Locale => l in dictionaries;
export const getDictionary = (l: Locale): Dict => dictionaries[l];
export type { Dict };
