/**
 * The public bookmarks index. The data is generated in the vault by
 * `01-agent/skills/resources/export_public.py` and committed as
 * `data/bookmarks.json`; nothing here edits it.
 */

export type Bookmark = {
  id: number;
  title: string;
  url: string;
  domain: string;
  note: string;
  shelf: string;
  pick: boolean;
  /** Site-relative path to a 480px JPEG of the page's og:image, or "". */
  thumb: string;
};

export type Shelf = { id: string; label: string; count: number };

export type BookmarkData = {
  updated: string;
  count: number;
  shelves: Shelf[];
  items: Bookmark[];
};

export type BookmarkQuery = {
  q: string;
  shelf: string | null;
  picks: boolean;
};

/** Lowercase, and strip accents so "tipografi" finds "tipografí". */
function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/**
 * Every word in the query has to appear somewhere in the title, note or
 * domain, in any order. That is what people expect from a filter box: more
 * words narrow, they never widen.
 */
export function filterBookmarks(
  items: Bookmark[],
  { q, shelf, picks }: BookmarkQuery
): Bookmark[] {
  const words = fold(q).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (shelf && item.shelf !== shelf) return false;
    if (picks && !item.pick) return false;
    if (!words.length) return true;
    const hay = fold(`${item.title} ${item.note} ${item.domain}`);
    return words.every((w) => hay.includes(w));
  });
}
