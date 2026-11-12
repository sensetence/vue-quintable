// Small helpers shared by the table and its mixins.

import { toRaw } from "vue";

export function sameList(a: any[], b: any[]) {
  return a.length === b.length && a.every((value, i) => value === b[i]);
}

// A cell value as text: "" for empty values (but "0" for 0).
export function valueToString(value: unknown) {
  return value === "" ||
    value === null ||
    value === false ||
    value === undefined
    ? ""
    : String(value);
}

export function cellsOf(row: any) {
  const cells = row.cells;
  return cells ? cells : row;
}

/**
 * Writes through a reactive object only if the value changes: its set trap triggers exactly then, so this triggers
 * the same, but skips the trap for the many unchanged writes of a loop over all rows. For methods and watcher
 * callbacks, which track nothing.
 */
export function setIfChanged(proxy: any, key: PropertyKey, value: unknown) {
  const raw = toRaw(proxy);
  if (
    !Object.prototype.hasOwnProperty.call(raw, key) ||
    !Object.is(raw[key], value)
  ) {
    proxy[key] = value;
  }
}

/**
 * A copy of one of the table's own lists with the updates applied, or null if no value changes. Assigning the copy
 * triggers once; writing key by key would wake every reader (each row's details box among them) once per key.
 */
export function withUpdates(proxy: any, updates: Map<string, unknown>) {
  const raw = toRaw(proxy);
  let next: Record<string, unknown> | null = null;
  for (const [key, value] of updates) {
    if (
      next ||
      !Object.prototype.hasOwnProperty.call(raw, key) ||
      !Object.is(raw[key], value)
    ) {
      next = next || { ...raw };
      next![key] = value;
    }
  }
  return next;
}

/**
 * highlightSearch: a text split at each case-insensitive occurrence of a (lower-case) query, the occurrences marked;
 * null if it does not occur.
 */
export function splitMarks(text: string, query: string) {
  const lower = text.toLowerCase();
  let at = lower.indexOf(query);
  if (!query || at === -1) {
    return null;
  }
  const parts: { text: string; mark: boolean }[] = [];
  let from = 0;
  while (at !== -1) {
    if (at > from) {
      parts.push({ text: text.slice(from, at), mark: false });
    }
    parts.push({ text: text.slice(at, at + query.length), mark: true });
    from = at + query.length;
    at = lower.indexOf(query, from);
  }
  if (from < text.length) {
    parts.push({ text: text.slice(from), mark: false });
  }
  return parts;
}
