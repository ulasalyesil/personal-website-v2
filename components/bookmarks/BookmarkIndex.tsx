"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Marks, Readout } from "@/components/hud";
import {
  filterBookmarks,
  type BookmarkData,
  type BookmarkQuery,
} from "@/lib/bookmarks";
import { isTyping } from "@/lib/keys";
import styles from "./BookmarkIndex.module.css";

const pad = (n: number) => String(n).padStart(3, "0");

type View = "list" | "grid";
type State = BookmarkQuery & { view: View };

/** The unfiltered state. Kept as one object so the URL is only written once
 *  the query has actually been set, never over a shared link on first load. */
const EMPTY: State = { q: "", shelf: null, picks: false, view: "list" };

/** Reads `?shelf=&q=&picks=1&view=grid`, dropping a shelf the data no longer has. */
function readQuery(shelves: Set<string>): State {
  const params = new URLSearchParams(window.location.search);
  const shelf = params.get("shelf");
  return {
    q: params.get("q") ?? "",
    shelf: shelf && shelves.has(shelf) ? shelf : null,
    picks: params.get("picks") === "1",
    view: params.get("view") === "grid" ? "grid" : "list",
  };
}

function writeQuery({ q, shelf, picks, view }: State) {
  const params = new URLSearchParams();
  if (shelf) params.set("shelf", shelf);
  if (q.trim()) params.set("q", q.trim());
  if (picks) params.set("picks", "1");
  if (view === "grid") params.set("view", "grid");
  const search = params.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
  window.history.replaceState(window.history.state, "", url);
}

/**
 * The index is a filter box over one list. The shelf, the query and the
 * picks toggle live in the URL, so any narrowed view is a link someone can
 * be sent, and so does the view: rows to scan, or a grid of thumbnails
 * to recognise things by sight. Keys: `/` or ⌘K finds, `j`/`k` or the arrows walk the rows, Enter
 * opens, `c` copies, Esc goes back to the box.
 */
export default function BookmarkIndex({ data }: { data: BookmarkData }) {
  const shelfIds = useMemo(
    () => new Set(data.shelves.map((s) => s.id)),
    [data.shelves]
  );
  const labels = useMemo(
    () => Object.fromEntries(data.shelves.map((s) => [s.id, s.label])),
    [data.shelves]
  );
  const pickCount = useMemo(
    () => data.items.filter((b) => b.pick).length,
    [data.items]
  );

  const [query, setQuery] = useState<State>(EMPTY);
  const [copied, setCopied] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLUListElement>(null);

  // A shared link lands pre-filtered. The server renders the full list, so
  // the page is complete without script; the URL narrows it once mounted.
  useEffect(() => {
    setQuery(readQuery(shelfIds));
  }, [shelfIds]);

  useEffect(() => {
    if (query !== EMPTY) writeQuery(query);
  }, [query]);

  // On a phone the shelves are one scrolling row; bring the pressed one into
  // it, or a shared link lands on a shelf you cannot see is selected. Only
  // the row scrolls, never the page.
  useEffect(() => {
    const row = chips.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const pressed = row.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (pressed) row.scrollLeft = pressed.offsetLeft - row.offsetLeft - 16;
  }, [query.shelf]);

  const results = useMemo(
    () => filterBookmarks(data.items, query),
    [data.items, query]
  );
  const groups = useMemo(() => {
    const byShelf = new Map<string, typeof results>();
    for (const b of results) {
      const g = byShelf.get(b.shelf);
      if (g) g.push(b);
      else byShelf.set(b.shelf, [b]);
    }
    return data.shelves
      .filter((s) => byShelf.has(s.id))
      .map((s) => ({ ...s, items: byShelf.get(s.id)! }));
  }, [results, data.shelves]);

  const update = (patch: Partial<State>) =>
    setQuery((q) => ({ ...q, ...patch }));
  const clear = () => {
    setQuery((q) => ({ ...EMPTY, view: q.view }));
    input.current?.focus();
  };

  const rows = useCallback(
    () =>
      Array.from(
        list.current?.querySelectorAll<HTMLAnchorElement>("a[data-row]") ?? []
      ),
    []
  );

  const move = useCallback(
    (by: number) => {
      const all = rows();
      if (!all.length) return;
      const at = all.indexOf(document.activeElement as HTMLAnchorElement);
      const next =
        at === -1
          ? by > 0
            ? 0
            : all.length - 1
          : Math.min(all.length - 1, Math.max(0, at + by));
      all[next].focus();
    },
    [rows]
  );

  const copy = useCallback(async (url: string, domain: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(domain);
    } catch {
      setCopied(null);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K is the palette key people already reach for, so it
      // finds too, and works from inside a field as well.
      if (
        (e.metaKey || e.ctrlKey) &&
        !e.altKey &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        input.current?.focus();
        input.current?.select();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const active = document.activeElement as HTMLElement | null;
      const onRow = active?.hasAttribute("data-row") ?? false;

      if (e.key === "/" && !isTyping()) {
        e.preventDefault();
        input.current?.focus();
        input.current?.select();
        return;
      }
      if (!onRow) return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "c") {
        const a = active as HTMLAnchorElement;
        copy(a.href, a.dataset.domain ?? "");
      } else if (e.key === "Escape") {
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, copy]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (query.q) update({ q: "" });
      else input.current?.blur();
    } else if (e.key === "ArrowDown" || e.key === "Enter") {
      e.preventDefault();
      rows()[0]?.focus();
    }
  };

  const filtered = query.q.trim() !== "" || query.shelf !== null || query.picks;

  return (
    <div className={styles.index}>
      <nav className={styles.rail} aria-label="Shelves">
        <ul ref={chips} className={styles.shelves}>
          <li>
            <button
              type="button"
              className={styles.shelf}
              aria-pressed={query.shelf === null}
              onClick={() => update({ shelf: null })}
            >
              <span>All</span>
              <span className={styles.count}>{data.count}</span>
            </button>
          </li>
          {data.shelves.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={styles.shelf}
                aria-pressed={query.shelf === s.id}
                onClick={() =>
                  update({ shelf: query.shelf === s.id ? null : s.id })
                }
              >
                <span>{s.label}</span>
                <span className={styles.count}>{s.count}</span>
              </button>
            </li>
          ))}
          <li className={styles.pickItem}>
            <button
              type="button"
              className={styles.shelf}
              aria-pressed={query.picks}
              onClick={() => update({ picks: !query.picks })}
            >
              <span>
                <span className={styles.star} aria-hidden>
                  ★
                </span>{" "}
                Picks
              </span>
              <span className={styles.count}>{pickCount}</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.main}>
        <div className={styles.bar} role="search">
          <label className={styles.field}>
            <span className={styles.prompt} aria-hidden>
              &gt;
            </span>
            <span className="sr-only">Filter bookmarks</span>
            <input
              ref={input}
              type="search"
              className={styles.input}
              value={query.q}
              onChange={(e) => update({ q: e.target.value })}
              onKeyDown={onInputKey}
              placeholder={`filter ${data.count} links`}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
            />
            <kbd className={styles.kbd} aria-hidden>
              /
            </kbd>
          </label>
          <div className={styles.views} role="group" aria-label="View">
            {(["list", "grid"] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={styles.view}
                aria-pressed={query.view === v}
                onClick={() => update({ view: v })}
              >
                {v}
              </button>
            ))}
          </div>
          <div className={styles.meta}>
            {copied ? (
              <span className={styles.copied}>copied {copied}</span>
            ) : (
              <Readout
                items={[
                  { key: "Showing", value: `${results.length}/${data.count}` },
                ]}
              />
            )}
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {copied
              ? `Copied ${copied} link`
              : `${results.length} of ${data.count} links`}
          </p>
        </div>

        <div ref={list} className={styles.list}>
          {groups.length === 0 ? (
            <div className={styles.empty}>
              <p>
                No match for{" "}
                <span className={styles.term}>
                  &ldquo;{query.q.trim() || "this filter"}&rdquo;
                </span>{" "}
                <span className={styles.bracketed}>[0/{data.count}]</span>
              </p>
              <button type="button" className={styles.clear} onClick={clear}>
                Clear filter
              </button>
            </div>
          ) : (
            groups.map((g) => (
              <section
                key={g.id}
                className={styles.group}
                aria-labelledby={`shelf-${g.id}`}
              >
                <h2 id={`shelf-${g.id}`} className={styles.groupLabel}>
                  <span className={styles.hash} aria-hidden>
                    #
                  </span>
                  {labels[g.id]}
                  <span className={styles.bracketed}>
                    [{filtered ? `${g.items.length}/${g.count}` : g.count}]
                  </span>
                </h2>
                {query.view === "grid" ? (
                  <ol className={styles.grid}>
                    {g.items.map((b) => (
                      <li key={b.id}>
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.card}
                          data-row
                          data-domain={b.domain}
                        >
                          <span className={styles.thumb}>
                            {b.thumb ? (
                              // Already a 480px JPEG made at export; the optimizer would add nothing.
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={b.thumb}
                                alt=""
                                width={480}
                                height={300}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <span className={styles.placeholder} aria-hidden>
                                {b.domain}
                              </span>
                            )}
                            <Marks kind="select" className={styles.cardMarks} />
                          </span>
                          <span className={styles.cardTitle}>
                            {b.pick && (
                              <span className={styles.star} title="Pick">
                                ★<span className="sr-only">Pick:</span>
                              </span>
                            )}
                            {b.title}
                          </span>
                          <span className={styles.cardMeta}>
                            <span aria-hidden>{pad(b.id)}</span>
                            <span className={styles.cardDomain}>
                              {b.domain}
                              <span className="sr-only">
                                {" "}
                                (opens in a new tab)
                              </span>
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ol className={styles.rows}>
                    {g.items.map((b) => (
                      <li key={b.id}>
                        <a
                          href={b.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.row}
                          data-row
                          data-domain={b.domain}
                        >
                          <span className={styles.num} aria-hidden>
                            {pad(b.id)}
                          </span>
                          <span className={styles.title}>
                            {b.pick && (
                              <span className={styles.star} title="Pick">
                                ★<span className="sr-only">Pick:</span>
                              </span>
                            )}
                            {b.title}
                          </span>
                          {b.note && (
                            <span className={styles.note}>{b.note}</span>
                          )}
                          <span className={styles.domain}>
                            {b.domain}
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
