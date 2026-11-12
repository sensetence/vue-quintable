// configFinal: the table's config with every default filled in, normalized once per config change.

type Dict = Record<string, any>;

export const PAGINATION_OPTIONS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 50, 100, 250, 500, 1000,
];

// Flags that are off unless set.
const BOOLEANS = [
  "pageSort",
  "multiSort",
  "pageSortSelect",
  "multiSortSelect",
  "rowsSelect",
  "keepSelect",
  "disallowAllOption",
  "defaultSelected",
  "search",
  "useFuzzySearch",
  "hideEmptyColumns",
  "select",
  "selectAll",
  "expandedAll",
  "prettySelect",
  "hideRowToggle",
  "enableRowTabIndex",
  "autoFit",
  "cellTitles",
  "skeletonLoading",
  "ignoreControlClicks",
  "alwaysShowSortIcons",
  "reuseRows",
];

// Values that fall back to a default when not set (or falsy).
const DEFAULTS: Dict = {
  numberOfVisibleRowsFillerWord: "of",
  ajaxRequestDelay: 250,
  ajaxUrl: false,
  searchLength: 1,
  searchPlaceholder: "Search...",
  multiSortPlaceholder: "Multiple sort",
  pageSortPlaceholder: "Page sort",
  rowsPlaceholder: "Rows per page:",
  emptyPlaceholder: "No rows...",
  pageRange: 5,
  searchClass: "col-12",
  searchContainerClass: "row",
};

// Values that must be one of a list; the first entry is the default.
const CHOICES: Record<string, string[]> = {
  selectPosition: ["post", "pre"],
  ignoreSortEmptyColumns: ["none", "active", "all"],
  filterRelation: ["AND", "OR"],
  filterGroupRelation: ["AND", "OR"],
};

// Case-insensitive choices, normalized to the case of the list.
const ICONS: Record<string, string[]> = {
  expandedRowIcon: ["chevron-up", "minus", "caret-up", "eye-slash"],
  collapsedRowIcon: ["chevron-down", "plus", "caret-down", "eye"],
};

let localStorageAvailable: boolean | null = null;

export function isLocalStorageAvailable() {
  if (localStorageAvailable === null) {
    try {
      const t = "test-local-storage";
      localStorage.setItem(t, t);
      localStorage.removeItem(t);
      localStorageAvailable = true;
    } catch {
      localStorageAvailable = false;
    }
  }
  return localStorageAvailable;
}

export function _resetLocalStorageCache() {
  localStorageAvailable = null;
}

// The largest pagination option not above the wanted page size.
function pageSize(pagination: any, options: number[]) {
  if (pagination === true) {
    return 25;
  }
  if (!pagination) {
    return false;
  }
  let i = 0;
  while (options[i] <= pagination && i < options.length) {
    i++;
  }
  return options[Math.min(i - 1, options.length - 1)];
}

// "bg-muted" unless switched off (false) or replaced by a class name.
function rowStateClass(value: any) {
  if (value === false) {
    return "";
  }
  return value && value !== true ? value : "bg-muted";
}

function columnLists(columns: any[]) {
  const lists = {
    headlines: [] as string[],
    columnClasses: [] as string[],
    sorts: [] as (boolean | string)[],
    stickyCols: [] as boolean[],
    alignments: [] as (string | false)[],
    breakpoints: [] as string[],
    hiddenCols: [] as boolean[],
    ignoreEmpty: [] as boolean[],
  };
  for (let i = 0; i < columns.length; i++) {
    const col = columns[i];
    let classes = "";
    if (col && col.headline) {
      lists.headlines[i] = col.headline;
      classes = col.headline
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
    } else {
      lists.headlines[i] = "";
    }
    classes += " column-" + (i + 1);
    // No null check, as before: a column must be an object.
    if (col.classes) {
      classes += " " + col.classes;
    }
    lists.columnClasses[i] = classes;
    lists.breakpoints[i] = (col && col.breakpoint) || "";

    const direction = col && col.firstSortDirection;
    lists.sorts[i] =
      !!(col && col.sort) &&
      (typeof direction === "string" &&
      ["DESC", "ASC"].includes(direction.toUpperCase())
        ? direction.toUpperCase()
        : true);
    lists.ignoreEmpty[i] = !!(col && col.ignoreEmpty);
    lists.stickyCols[i] = !!(col && col.sticky);
    lists.hiddenCols[i] = !!(col && col.hidden);
    lists.alignments[i] = (col && col.align) || false;
  }
  return lists;
}

export function normalizeConfig(
  ownConfig: Dict | null,
  defaults: Dict | null,
  identifier: string | null,
  paginationOptions: number[],
) {
  if (!ownConfig) {
    return {};
  }
  const config: Dict = { ...defaults, ...ownConfig };
  const final: Dict = {};

  for (const key of BOOLEANS) {
    final[key] = !!config[key];
  }
  for (const key in DEFAULTS) {
    final[key] = config[key] || DEFAULTS[key];
  }
  for (const key in CHOICES) {
    final[key] = CHOICES[key].includes(config[key])
      ? config[key]
      : CHOICES[key][0];
  }
  for (const key in ICONS) {
    const value = config[key];
    final[key] =
      typeof value === "string" && ICONS[key].includes(value.toLowerCase())
        ? value.toLowerCase()
        : ICONS[key][0];
  }

  final.pagination = pageSize(config.pagination, paginationOptions);
  final.hoverClass = rowStateClass(config.hoverClass);
  final.activeClass = rowStateClass(config.activeClass);

  const method = config.requestMethod;
  final.requestMethod =
    typeof method === "string" && ["POST", "GET"].includes(method.toUpperCase())
      ? method.toUpperCase()
      : "GET";

  final.selectAllRows = !!config.selectAllRows;
  if (final.ajaxUrl && final.selectAllRows) {
    console.warn(
      "Option selectAllRows was deactivated automatically because ajaxUrl is set!",
    );
    final.selectAllRows = false;
  }

  final.storeState = !!config.storeState;
  if (!identifier && config.storeState) {
    console.warn(
      "Option storeState was deactivated automatically because table identifier is not set!",
    );
    final.storeState = false;
  }
  if (final.storeState && !isLocalStorageAvailable()) {
    console.warn(
      "Option storeState was deactivated automatically because local storage is not available!",
    );
    final.storeState = false;
  }

  final.reloadOn =
    typeof config.reloadOn === "function" ? config.reloadOn : null;

  return Object.freeze({
    ...final,
    ...columnLists(config.columns || []),
    number: config.columns ? config.columns.length : 0,
    columns: config.columns ? config.columns : null,
  });
}
