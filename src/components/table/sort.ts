// Sorting: orders rows by the active sort columns, in their order.

type Dict = Record<string, any>;

export interface SortKey {
  index: string | number; // the column
  asc: boolean;
  order: number;
}

// A cell's value to sort by: sortValue, else html, else text; computeSortValue wins. Numbers (also numeric strings)
// compare as numbers, other strings case-insensitively.
function sortValue(cell: Dict, sortIndexes: Dict) {
  let value =
    typeof cell.sortValue !== "undefined" && cell.sortValue !== null
      ? cell.sortValue
      : cell.html
        ? cell.html
        : cell.text;
  if (typeof cell.computeSortValue === "function") {
    value = cell.computeSortValue(sortIndexes);
  }
  if (typeof value === "string") {
    value = value.toLowerCase();
  }
  if (!isNaN(value)) {
    value = parseFloat(value);
  }
  return value;
}

/**
 * Sorts rows in place by the keys, first key first. Equal values fall through to the next key; equal on the last
 * key, a row counts as larger in ascending order and smaller in descending order, as it always has (the result for
 * ties depends on the engine's sort algorithm, so this must not change). Each cell's value is computed at most once,
 * and only once the comparison needs it.
 */
export function sortRows(rows: any[], keys: SortKey[], sortIndexes: Dict) {
  const entries = rows.map((row) => ({
    row,
    cells: row.cells ? row.cells : row,
    values: [] as any[],
    known: [] as boolean[],
  }));
  const valueOf = (entry: (typeof entries)[number], k: number) => {
    if (!entry.known[k]) {
      entry.values[k] = sortValue(entry.cells[keys[k].index], sortIndexes);
      entry.known[k] = true;
    }
    return entry.values[k];
  };
  const compare = (
    a: (typeof entries)[number],
    b: (typeof entries)[number],
    k: number,
  ): number => {
    const aValue = valueOf(a, k);
    const bValue = valueOf(b, k);
    const last = !keys[k + 1];
    if (keys[k].asc) {
      return aValue > bValue
        ? 1
        : aValue < bValue
          ? -1
          : last
            ? 1
            : compare(a, b, k + 1);
    }
    return aValue < bValue
      ? 1
      : aValue > bValue
        ? -1
        : last
          ? -1
          : compare(a, b, k + 1);
  };
  entries.sort((a, b) => compare(a, b, 0));
  entries.forEach((entry, i) => (rows[i] = entry.row));
  return rows;
}
