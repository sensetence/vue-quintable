// Types of @sensetence/vue-quintable: the table's props, config, rows, events, slots and public methods.
// Hand-written next to the JavaScript component; keep them in step with README.md.

import type { App, DefineSetupFnComponent, SlotsType, VNode } from "vue";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type Alignment = "start" | "end" | "center";

/** The active sorts, by column index. */
export type SortIndexes = Record<
  number | string,
  { headline: string; index: number | string; asc: boolean; order: number }
>;

export interface QuintableCell {
  /** Text content. Use exactly one of text, html or component. */
  text?: string | number;
  /** HTML content. Only pass trusted or sanitized HTML. */
  html?: string;
  /** A globally registered component and its props. */
  component?: { name: string; props?: Record<string, unknown> };
  classes?: string;
  align?: Alignment;
  tooltip?: string;
  /** The value to sort by instead of the content. */
  sortValue?: string | number;
  /** The value to sort by, computed on each sort from the active sorts. Wins over sortValue. */
  computeSortValue?: (sortIndexes: SortIndexes) => unknown;
  /** Marks the cell as empty for hideEmptyColumns. */
  isEmpty?: boolean;
  /** Any other property reaches the slots as cell.yourProperty. */
  [key: string]: unknown;
}

export interface QuintableRowObject {
  cells: QuintableCell[];
  classes?: string;
  align?: Alignment;
  tooltip?: string;
  /** Show the row's details initially. */
  expanded?: boolean;
  /** Matched by the search, not shown. */
  keywords?: string[];
  /** The row's filter values, by filter name. */
  filters?: Record<string, unknown>;
  selected?: boolean;
  disableSelect?: boolean;
  showDisabledSelect?: boolean;
  [key: string]: unknown;
}

/** A row: its cells, or an object with them. */
export type QuintableRow = QuintableCell[] | QuintableRowObject;

export interface QuintableColumn {
  headline?: string;
  /** Text shown on hover over the headline. */
  title?: string;
  classes?: string;
  align?: Alignment;
  sort?: boolean;
  firstSortDirection?: "ASC" | "DESC";
  /** Below (and at) this breakpoint the column moves into the row's details; "all" always. */
  breakpoint?: Breakpoint | "all";
  alwaysExpanded?: boolean;
  /** Always shown in the row's details. */
  sticky?: boolean;
  showHeadlineBreakpoint?: Breakpoint;
  hideHeadlineBreakpoint?: Breakpoint;
  hidden?: boolean;
  ignoreEmpty?: boolean;
  cellFormatter?: (
    cell: QuintableCell,
  ) => string | number | { value: string | number; type?: "html" | "text" };
  /** Stays in place while the table scrolls sideways. */
  pin?: "start" | "end";
  /** The heading's width, e.g. 120 (px) or "10rem". */
  width?: number | string;
  /** resizableColumns: false keeps this column's width. */
  resizable?: boolean;
  /** columnFilters: the column's filter. Default "text". */
  filter?: "text" | "select" | "range" | false;
  /** columnFilters: the choices of a select filter (default: the column's values). */
  filterOptions?: (string | number)[];
  /** Any other property reaches the headline slot as column.yourProperty. */
  [key: string]: unknown;
}

export interface QuintableConfig {
  columns: QuintableColumn[];

  // layout
  hideEmptyColumns?: boolean;
  ignoreSortEmptyColumns?: "none" | "active" | "all";
  expandedAll?: boolean;
  hideRowToggle?: boolean;
  expandedRowIcon?: "chevron-up" | "minus" | "caret-up" | "eye-slash";
  collapsedRowIcon?: "chevron-down" | "plus" | "caret-down" | "eye";
  hoverClass?: string | boolean;
  activeClass?: string | boolean;
  enableRowTabIndex?: boolean;
  autoFit?: boolean;
  cellTitles?: boolean;
  skeletonLoading?: boolean;
  ignoreControlClicks?: boolean;
  reuseRows?: boolean;
  stickyHeader?: boolean;
  /** The table scrolls in a box of this height, e.g. 400 (px) or "60vh". */
  scrollHeight?: number | string;
  virtualScroll?: boolean;
  /** virtualScroll: the height rows are estimated at until measured, in px. */
  rowHeight?: number;
  resizableColumns?: boolean;
  columnPicker?: boolean;
  columnPickerPlaceholder?: string;
  resizeColumnLabel?: string;

  // pagination
  pagination?: number | boolean;
  pageRange?: number;
  rowsSelect?: boolean;
  disallowAllOption?: boolean;
  rowsPlaceholder?: string;
  numberOfVisibleRowsFillerWord?: string;

  // search
  search?: boolean;
  searchLength?: number;
  searchPlaceholder?: string;
  useFuzzySearch?: boolean;
  searchContainerClass?: string;
  searchClass?: string;
  emptyPlaceholder?: string;
  highlightSearch?: boolean;
  /** Milliseconds the local search waits after the last key press. */
  searchDebounce?: number;

  // filters
  filterRelation?: "AND" | "OR";
  filterGroupRelation?: "AND" | "OR";
  columnFilters?: boolean;
  columnFilterPlaceholder?: string;
  columnFilterAllLabel?: string;
  columnFilterMinLabel?: string;
  columnFilterMaxLabel?: string;

  // sorting
  multiSort?: boolean;
  multiSortSelect?: boolean;
  multiSortPlaceholder?: string;
  pageSort?: boolean;
  pageSortSelect?: boolean;
  pageSortPlaceholder?: string;
  alwaysShowSortIcons?: boolean;

  // selection
  select?: boolean;
  selectPosition?: "pre" | "post";
  prettySelect?: boolean;
  selectAll?: boolean;
  selectAllRows?: boolean;
  defaultSelected?: boolean;
  keepSelect?: boolean;

  // accessibility
  accessible?: boolean;
  selectRowLabel?: string;
  selectAllLabel?: string;
  paginationLabel?: string;
  expandRowLabel?: string;
  collapseRowLabel?: string;
  firstPageLabel?: string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  lastPageLabel?: string;

  // AJAX
  ajaxUrl?: string | false;
  requestMethod?: "GET" | "POST";
  ajaxRequestDelay?: number;
  reloadOn?: (reload: () => void) => (() => void) | void;
  /** Headers of every AJAX request, or a function returning them (a promise is awaited) before each request. */
  ajaxHeaders?:
    | Record<string, string>
    | ((
        params: QuintableAjaxParams,
      ) => Record<string, string> | Promise<Record<string, string>>);

  // state
  storeState?: boolean;
  urlState?: boolean;
}

/** A filter: a value (or values), or an object with values and an operator or compare function. */
export type QuintableFilter =
  | unknown
  | {
      values: unknown;
      operator?:
        | "equal"
        | "greater"
        | "less"
        | "greaterEqual"
        | "lessEqual"
        | "contains"
        | "notContains"
        | "startsWith"
        | "endsWith"
        | "matches";
      compare?: (value: unknown, rowValue: unknown) => boolean;
    };

export interface QuintableFilterGroup {
  relation?: "AND" | "OR";
  items: ({ name: string } | QuintableFilterGroup)[];
}

/** The parameters of an AJAX request (query parameters for GET, JSON body for POST). */
export interface QuintableAjaxParams {
  search: string;
  filters: Record<string, QuintableFilter>;
  perPage: number | "All";
  page: number;
  columnFilters?: Record<number, ColumnFilterValue>;
  hiddenColumns: boolean[];
  sort: {
    indexes: SortIndexes;
    columns: Record<number, QuintableColumn>;
  } | null;
}

/** columnFilters: a text, a select value, or a range. */
export type ColumnFilterValue =
  | string
  | { min?: string | number; max?: string | number };

export interface QuintableProps {
  config: QuintableConfig;
  rows?: QuintableRow[];
  selectedRows?: QuintableRow[];
  preSelectedRows?: { key: string; value: unknown }[];
  filters?: Record<string, QuintableFilter>;
  filterGroups?: QuintableFilterGroup[];
  sortOrder?: (number | { index: number; asc?: boolean })[];
  loading?: boolean;
  tableClasses?: string;
  dynamicConfig?: boolean;
  axios?: unknown;
  updated?: boolean | Date | Record<string, unknown>;
  identifier?: string;
  initialSearchTerm?: string;
  nested?: boolean;
  verbose?: boolean;
}

type RowEvent = (
  row: QuintableRow,
  name: string,
  target: EventTarget | null,
  event: MouseEvent,
  index: number,
) => void;
type CellEvent = (
  cell: QuintableCell,
  name: string,
  target: EventTarget | null,
  event: MouseEvent,
) => void;

export type QuintableEvents = {
  "click:row": RowEvent;
  "auxclick:row": RowEvent;
  "click:cell": CellEvent;
  "auxclick:cell": CellEvent;
  "hover:row": (row: QuintableRow, name: string) => void;
  "active:row": (
    row: QuintableRow | undefined,
    name: string,
    index: number,
  ) => void;
  "expand:row": (row: QuintableRow, name: string, index: number) => void;
  "collapse:row": (row: QuintableRow, name: string, index: number) => void;
  "update:selected-rows": (rows: QuintableRow[]) => void;
  "update:filters": (
    filters: Record<string, QuintableFilter>,
    name: string,
  ) => void;
  "filtered:rows": (rows: boolean[], name: string) => void;
  "update:search": (query: string | null, name: string) => void;
  "update:sort": (sortIndexes: SortIndexes, name: string) => void;
  "update:page": (page: number, name: string) => void;
  "update:rows-per-page": (perPage: number | "All", name: string) => void;
  "change:breakpoints": (hiddenBreakpoints: Breakpoint[], name: string) => void;
  "component:event": (data: unknown, name: string) => void;
  "ajax:rows": (
    data: { rows: QuintableRow[]; old: QuintableRow[]; all: number },
    name: string,
  ) => void;
  "ajax:error": (error: unknown, name: string) => void;
  "update:hidden-columns": (hidden: number[], name: string) => void;
  "resize:column": (index: number, width: number, name: string) => void;
  "update:column-filters": (
    values: Record<number, ColumnFilterValue>,
    name: string,
  ) => void;
};

type Slot<P = Record<string, never>> = (props: P) => VNode[];

export interface QuintableSlots {
  header?: Slot;
  footer?: Slot;
  "before-search"?: Slot;
  search?: Slot<{
    value: string;
    loading: boolean;
    setSearchQuery: (query: string) => void;
    placeholder: string;
    searchClass: string;
  }>;
  "after-search"?: Slot;
  "after-search-container"?: Slot;
  "cell-content"?: Slot<{ cell: QuintableCell }>;
  "generated-cell-content"?: Slot<{ cell: QuintableCell }>;
  "sticky-cell-content"?: Slot<{ cell: QuintableCell }>;
  "no-results"?: Slot;
  empty?: Slot;
  error?: Slot<{ error: unknown; reload: () => void }>;
  loading?: Slot<{ hiddenBreakpoints: Breakpoint[] }>;
  headline?: Slot<{ column: QuintableColumn; index: number; headline: string }>;
  "sort-icon"?: Slot<{
    column: QuintableColumn;
    index: number;
    direction: "asc" | "desc" | null;
  }>;
  "toggle-icon"?: Slot<{ row: QuintableRow; index: number; expanded: boolean }>;
  "select-checkbox"?: Slot<{
    row: QuintableRow;
    index: number;
    checked: boolean;
    disabled: boolean;
    toggle: (value?: boolean) => void;
  }>;
  "select-all-checkbox"?: Slot<{
    checked: boolean;
    indeterminate: boolean;
    toggle: (value?: boolean) => void;
  }>;
  "row-prepend"?: Slot<{ row: QuintableRow; index: number }>;
  "row-append"?: Slot<{ row: QuintableRow; index: number }>;
  "header-prepend"?: Slot;
  "header-append"?: Slot;
  details?: Slot<{
    row: QuintableRow;
    index: number;
    hovered: boolean;
    cells: {
      cell: QuintableCell;
      index: number;
      headline: string;
      sticky: boolean;
    }[];
  }>;
  pagination?: Slot<{
    page: number;
    pages: number;
    setPage: (page: number | "first" | "prev" | "next" | "last") => void;
  }>;
  "pagination-icon"?: Slot<{ type: "first" | "prev" | "next" | "last" }>;
  "rows-info"?: Slot<{ first: number; last: number; total: number }>;
  "rows-per-page"?: Slot<{
    value: number | "All";
    options: (number | "All")[];
    setRowsPerPage: (value: number | "All") => void;
    placeholder: string;
  }>;
  "sort-switches"?: Slot<{
    multiSort: boolean;
    pageSort: boolean;
    setMultiSort: (value: boolean) => void;
    setPageSort: (value: boolean) => void;
  }>;
  /** @deprecated use cell-content */
  "cell-complete"?: Slot<{ cell: QuintableCell }>;
  /** @deprecated use generated-cell-content */
  "generated-cell-complete"?: Slot<{ cell: QuintableCell }>;
  /** @deprecated use sticky-cell-content */
  "sticky-cell-complete"?: Slot<{ cell: QuintableCell }>;
}

/** The methods a template ref to the table can call. */
export interface QuintableMethods {
  setSearchQuery(query: string): void;
  setSortColumn(index: number, asc?: boolean): void;
  removeSort(index: number): void;
  gotoPage(page: number | "first" | "prev" | "next" | "last"): void;
  checkAll(force?: boolean): void;
  resetSelect(): void;
  /** columnPicker: shows or hides a column (flips it without a value). */
  toggleColumn(index: number, visible?: boolean): void;
  /** columnFilters: sets a column's filter; an empty value removes it. */
  setColumnFilter(index: number, value: ColumnFilterValue): void;
  clearColumnFilters(): void;
  /** resizableColumns: back to the widths the content gives the columns. */
  resetColumnWidths(): void;
}

// The component as defineComponent would type it (props, events, slots), with its public methods on the instance.
type QuintableComponent = DefineSetupFnComponent<
  QuintableProps,
  QuintableEvents,
  SlotsType<QuintableSlots>
>;

export declare const VueQuintable: {
  new (
    ...args: ConstructorParameters<QuintableComponent>
  ): InstanceType<QuintableComponent> & QuintableMethods;
};

export interface InstallOptions {
  /** A configured axios instance for every table (a table's own axios prop wins). */
  axios?: unknown;
  /** Config defaults for every table; a table's own config wins. */
  defaults?: Partial<QuintableConfig>;
}

declare const install: (app: App, options?: InstallOptions) => void;
export default install;

declare module "vue" {
  export interface GlobalComponents {
    VueQuintable: typeof VueQuintable;
  }
}
