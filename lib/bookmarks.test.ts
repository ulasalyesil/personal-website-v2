import { describe, expect, it } from "vitest";
import { filterBookmarks, type Bookmark } from "./bookmarks";

const item = (over: Partial<Bookmark>): Bookmark => ({
  id: 1,
  title: "",
  url: "https://example.com",
  domain: "example.com",
  note: "",
  shelf: "tools",
  pick: false,
  thumb: "",
  ...over,
});

const ITEMS = [
  item({
    id: 1,
    title: "Fonts In Use",
    note: "Typographic archive",
    domain: "fontsinuse.com",
    shelf: "type",
    pick: true,
  }),
  item({
    id: 2,
    title: "Coolors",
    note: "Palette generator",
    domain: "coolors.co",
    shelf: "color",
  }),
  item({
    id: 3,
    title: "Typewolf",
    note: "Font pairing",
    domain: "typewolf.com",
    shelf: "tools",
  }),
  item({
    id: 4,
    title: "Café Grid",
    note: "",
    domain: "cafe.design",
    shelf: "galleries",
  }),
];

const ids = (list: Bookmark[]) => list.map((b) => b.id);

describe("filterBookmarks", () => {
  it("returns everything for an empty query", () => {
    expect(
      ids(filterBookmarks(ITEMS, { q: "  ", shelf: null, picks: false }))
    ).toEqual([1, 2, 3, 4]);
  });

  it("matches title, note and domain, case-insensitively", () => {
    expect(
      ids(filterBookmarks(ITEMS, { q: "FONT", shelf: null, picks: false }))
    ).toEqual([1, 3]);
    expect(
      ids(
        filterBookmarks(ITEMS, { q: "coolors.co", shelf: null, picks: false })
      )
    ).toEqual([2]);
  });

  it("narrows with every extra word, in any order", () => {
    expect(
      ids(
        filterBookmarks(ITEMS, { q: "pairing font", shelf: null, picks: false })
      )
    ).toEqual([3]);
    expect(
      ids(
        filterBookmarks(ITEMS, { q: "font nothing", shelf: null, picks: false })
      )
    ).toEqual([]);
  });

  it("ignores accents", () => {
    expect(
      ids(filterBookmarks(ITEMS, { q: "cafe", shelf: null, picks: false }))
    ).toEqual([4]);
  });

  it("combines shelf, picks and query", () => {
    expect(
      ids(filterBookmarks(ITEMS, { q: "", shelf: "type", picks: false }))
    ).toEqual([1]);
    expect(
      ids(filterBookmarks(ITEMS, { q: "font", shelf: null, picks: true }))
    ).toEqual([1]);
    expect(
      ids(filterBookmarks(ITEMS, { q: "font", shelf: "color", picks: false }))
    ).toEqual([]);
  });
});
