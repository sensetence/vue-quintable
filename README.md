<p align="center">
  <img alt="VueQuintable" src="https://sensetence.com/vue-quintable-demo/vue-table.png" width="265" height="222">
</p>

<h1 align="center">VueQuintable</h1>

<p align="center">
  A highly configurable, responsive table component for <a href="https://vuejs.org/">Vue 3</a>, built on <a href="https://getbootstrap.com/">Bootstrap 5</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sensetence/vue-quintable"><img alt="npm" src="https://img.shields.io/npm/v/@sensetence/vue-quintable"></a>
  <a href="https://www.npmjs.com/package/@sensetence/vue-quintable"><img alt="downloads" src="https://img.shields.io/npm/dm/@sensetence/vue-quintable"></a>
  <img alt="Vue 3" src="https://img.shields.io/badge/vue-3.x-42b883">
  <img alt="Bootstrap 5" src="https://img.shields.io/badge/bootstrap-5.x-7952b3">
  <a href="#license"><img alt="license" src="https://img.shields.io/npm/l/@sensetence/vue-quintable"></a>
</p>

<p align="center">
  <a href="https://sensetence.com/vue-quintable-demo/"><b>Demo</b></a>
</p>

---

| VueQuintable | Vue | Bootstrap | npm tag |
|--------------|-----|-----------|---------|
| **3.x**      | 3.x | 5.x       | `latest` |
| 2.x          | 2.x | 5.x       | `v2-lts` |
| 1.x          | 2.x | 4.x       | –       |

> **Note:** `@sensetence/vue-quintable` is the successor of `@quintet/vue-quintable`. Development and bug fixes happen in `@sensetence/vue-quintable` only.

## Contents

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Quick start](#quick-start)
- [Component props](#component-props)
- [Configuration](#configuration) – [config](#config) · [columns](#columns) · [rows](#rows) · [cells](#cells) · [Option combinations](#option-combinations)
- [Custom components in cells](#custom-components-in-cells)
- [Cell formatters](#cell-formatters)
- [Filters](#filters) · [Filter groups](#filter-groups)
- [Sort order](#sort-order)
- [Selecting rows](#selecting-rows)
- [Slots](#slots)
- [Events](#events)
- [AJAX / server-side data](#ajax--server-side-data)
- [Persisting table state](#persisting-table-state)
- [Reusing rows](#reusing-rows)
- [Large tables: virtual scrolling](#large-tables-virtual-scrolling)
- [Column tools](#column-tools) · [Sticky header and pinned columns](#sticky-header-and-pinned-columns)
- [Accessibility](#accessibility)
- [State in the address](#state-in-the-address)
- [Methods](#methods)
- [TypeScript](#typescript)
- [Good to know](#good-to-know)
- [Development](#development)

## Features

- Responsive columns: columns below a Bootstrap breakpoint are rendered as expandable additional rows
- Sticky columns that are always shown as additional row
- Pagination with page range and selectable rows per page
- Sort, multi-sort and page-only sort, with custom sort values
- Search, optionally fuzzy, with custom keywords per row
- Filters with operators and custom compare functions
- Recursive filter groups with AND/OR relations
- Row selection (checkboxes, select all, select across pages, pre-selection)
- Tooltips for rows and cells
- Row and cell click events, keyboard navigation through rows
- Hide empty columns automatically, hide/show columns dynamically
- Custom cell formatters, HTML cells and Vue components inside cells
- Slots for cells, search, loader, empty state, header and footer
- Server-side data via AJAX (GET or POST) for search, filter, sort and pagination
- Table state persisted in local storage or in the page's address
- Virtual scrolling for tens of thousands of rows
- Sticky header, pinned columns, resizable columns and a column picker
- A filter per column (text, select, range) and search matches marked in the cells
- Keyboard and screen reader support (opt-in)
- TypeScript types for config, rows, events, slots and methods
- Nested tables

Every feature beyond the basics is opt-in: without its option the table renders and behaves as before.

## Installation

VueQuintable needs Vue 3, Bootstrap 5 and Font Awesome (shared with your app as peer dependencies). For [AJAX](#ajax--server-side-data) features install [axios](https://github.com/axios/axios) too.

```shell
# yarn
yarn add @sensetence/vue-quintable bootstrap @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
yarn add axios   # optional, for AJAX

# npm
npm install @sensetence/vue-quintable bootstrap @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
npm install axios   # optional, for AJAX
```

Font Awesome 7 is required (`^7.3.1`): the table asks for icons by their FA 7 names.

## Setup

```js
import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "@sensetence/vue-quintable/style.css";
import VueQuintable from "@sensetence/vue-quintable";

const app = createApp(App);

app.use(VueQuintable);
// or pass a configured axios instance and config defaults for all tables:
// app.use(VueQuintable, {
//   axios: myAxiosInstance,
//   defaults: { autoFit: true, cellTitles: true, skeletonLoading: true, ignoreControlClicks: true },
// });

app.mount("#app");
```

`defaults` holds config keys every table starts from; a table's own `config` wins.

The plugin registers the global component `<vue-quintable>` and the `v-tooltip` directive ([floating-vue](https://floating-vue.starpad.dev/)). The component is also available as named export:

```js
import { VueQuintable } from "@sensetence/vue-quintable";
```

## Quick start

```vue
<template>
  <vue-quintable :config="config" :rows="rows" />
</template>

<script setup>
import { ref } from "vue";

const config = ref({
  columns: [
    { headline: "Name", sort: true },
    { headline: "Age", sort: true },
    { headline: "Birth Place", breakpoint: "md" },
    { headline: "Job", sticky: true },
  ],
  pagination: 10,
  search: true,
});

const rows = ref([
  [{ text: "Mia Wong" }, { text: 50 }, { text: "Beijing" }, { text: "Trainee" }],
  [{ text: "Peter Stanbridge" }, { text: 18 }, { text: "London" }, { text: "Trainee" }],
  [{ text: "Natalie Lee-Walsh" }, { text: 25 }, { text: "Dublin" }, { text: "Trainee" }],
]);
</script>
```

More examples live in [`src/examples`](src/examples) and can be started with `yarn dev` (see [Development](#development)).

## Component props

| Prop                  | Type                    | Default | Description |
|-----------------------|-------------------------|---------|-------------|
| `config`              | Object                  | –       | **Required.** Table configuration, see [config](#config). |
| `rows`                | Array                   | `[]`    | Table rows, see [rows](#rows). Required unless `config.ajaxUrl` is set. |
| `selected-rows`       | Array                   | `[]`    | Use with `v-model:selected-rows` to receive the selected rows, see [Selecting rows](#selecting-rows). |
| `pre-selected-rows`   | Array                   | `[]`    | Select rows from outside: array of `{ key, value }`. A row is selected if its property `key` equals `value`, e.g. `{ key: "id", value: 42 }`. Not applied initially – use `config.defaultSelected` or `row.selected` for the initial selection. |
| `filters`             | Object                  | `{}`    | Active filters, see [Filters](#filters). Supports `v-model:filters`. |
| `filter-groups`       | Array                   | `[]`    | Filter groups with relations, see [Filter groups](#filter-groups). |
| `sort-order`          | Array                   | `[]`    | Sort columns by default or on the fly, see [Sort order](#sort-order). |
| `loading`             | Boolean                 | `false` | Shows the loader (or the `loading` slot) instead of the table. |
| `table-classes`       | String                  | `""`    | Additional CSS classes for the `<table>` element, e.g. `"table-striped table-sm"`. |
| `dynamic-config`      | Boolean                 | `false` | If `true`, changes inside `config` don't re-initialize the table. Useful to change column settings (e.g. `hidden`) on the fly. |
| `axios`               | Function                | `null`  | Configured axios instance for this table. Falls back to the plugin option, then to the default axios. |
| `updated`             | Boolean \| Date \| Object | `false` | Change the value to reload the current page via AJAX, e.g. `new Date()`. |
| `identifier`          | String                  | `null`  | Unique table id. Required for `config.storeState` (local storage key) and shown in verbose logs. |
| `initial-search-term` | String                  | `null`  | Initial search query if `config.search` is enabled. |
| `nested`              | Boolean                 | `false` | Set to `true` for a table nested inside another table's slot, so its row clicks work. |
| `verbose`             | Boolean                 | `false` | Logs debug information to the browser console. |

## Configuration

### config

What an option needs, and what it does not work with, is listed in [Option combinations](#option-combinations).

| Key                             | Type                          | Default            | Description |
|---------------------------------|-------------------------------|--------------------|-------------|
| `columns`                       | Array                         | –                  | **Required.** Column definitions, see [columns](#columns). |
| **Layout**                      |                               |                    |             |
| `hideEmptyColumns`              | Boolean                       | `false`            | Hide columns that have no `text` or `html` in any visible row. A cell with only a `component` counts as empty unless it sets `isEmpty: false`. |
| `ignoreSortEmptyColumns`        | `"none"` \| `"active"` \| `"all"` | `"none"`       | With `hideEmptyColumns`: `"none"` keeps sortable columns always visible, `"active"` keeps them visible while sorted, `"all"` hides them like other columns. |
| `expandedAll`                   | Boolean                       | `false`            | Expand all rows with hidden (breakpoint) columns by default. |
| `hideRowToggle`                 | Boolean                       | `false`            | Hide the expand/collapse toggle icon. |
| `expandedRowIcon`               | String                        | `"chevron-up"`     | Icon for expanded rows: `"chevron-up"`, `"minus"`, `"caret-up"`, `"eye-slash"`. |
| `collapsedRowIcon`              | String                        | `"chevron-down"`   | Icon for collapsed rows: `"chevron-down"`, `"plus"`, `"caret-down"`, `"eye"`. |
| `hoverClass`                    | String \| Boolean             | `"bg-muted"`       | CSS class for hovered rows. `false` disables it. |
| `activeClass`                   | String \| Boolean             | `"bg-muted"`       | CSS class for the active row. `false` disables it. |
| `enableRowTabIndex`             | Boolean                       | `false`            | Clicking a row makes it active; arrow keys move the active row (`active:row` event). |
| `autoFit`                       | Boolean                       | `false`            | Columns with breakpoint `xxl`, `xl` or `lg` fold into the row details only while the table is wider than its container, largest first, never by window width (`sm`, `md` and `all` still follow the window). What still overflows then scrolls inside the container (class `quintable-fit-scroll`). |
| `cellTitles`                    | Boolean                       | `false`            | An element in a cell that cuts its text with `text-overflow: ellipsis` shows the whole text as its `title` on hover. An own `title` or a cell tooltip wins. |
| `skeletonLoading`               | Boolean                       | `false`            | While loading, show grey bars in the shape of the table (visible columns, one page of rows) instead of the spinner. |
| `ignoreControlClicks`           | Boolean                       | `false`            | A click on a link, button or form field in a row is that control's own: no `click:row`, `click:cell` or `auxclick:*` event. A click on a disabled control stays the row's. |
| `reuseRows`                     | Boolean                       | `false`            | Update rows in place on sort, page change and filter instead of re-creating them. Faster for large pages; read [Reusing rows](#reusing-rows) before you turn it on. |
| `stickyHeader`                  | Boolean                       | `false`            | The headings stay on top while the rows scroll, see [Sticky header and pinned columns](#sticky-header-and-pinned-columns). |
| `scrollHeight`                  | Number \| String              | `false`            | The table scrolls in a box of this height, e.g. `400` (px) or `"60vh"`. |
| `virtualScroll`                 | Boolean                       | `false`            | Render only the rows in the scroll box, see [Large tables](#large-tables-virtual-scrolling). Without `scrollHeight` the box is 400px high. |
| `rowHeight`                     | Number                        | `41`               | With `virtualScroll`: the height in px rows are estimated at until the first one was measured. |
| `resizableColumns`              | Boolean                       | `false`            | Drag a heading's end edge (or use the arrow keys on it) to size its column, see [Column tools](#column-tools). |
| `resizeColumnLabel`             | String                        | `"Resize column"`  | Accessible name of the edges. |
| `columnPicker`                  | Boolean                       | `false`            | A menu to show and hide columns, see [Column tools](#column-tools). |
| `columnPickerPlaceholder`       | String                        | `"Columns"`        | Label of the menu button. |
| **Pagination**                  |                               |                    |             |
| `pagination`                    | Number \| Boolean             | `false`            | Rows per page. `true` means 25. Other values snap down to one of 1–10, 15, 20, 25, 30, 50, 100, 250, 500, 1000. |
| `pageRange`                     | Number                        | `5`                | Number of page links shown. |
| `rowsSelect`                    | Boolean                       | `false`            | Let the user choose the rows per page. |
| `disallowAllOption`             | Boolean                       | `false`            | Hide the "All" option in the rows per page select. |
| `rowsPlaceholder`               | String                        | `"Rows per page:"` | Label of the rows per page select. |
| `numberOfVisibleRowsFillerWord` | String                        | `"of"`             | Filler word in "1-10 of 50", e.g. `"von"` for German. |
| **Search**                      |                               |                    |             |
| `search`                        | Boolean                       | `false`            | Show the search input. |
| `searchLength`                  | Number                        | `1`                | Minimum query length that triggers the search. |
| `searchPlaceholder`             | String                        | `"Search..."`      | Placeholder of the search input. |
| `useFuzzySearch`                | Boolean                       | `false`            | Additionally match rows fuzzily (via [fuzzy.js](https://github.com/bripkens/fuzzy.js)). |
| `searchContainerClass`          | String                        | `"row"`            | CSS class of the search container. |
| `searchClass`                   | String                        | `"col-12"`         | CSS class of the search input wrapper. |
| `emptyPlaceholder`              | String                        | `"No rows..."`     | Text if search or filters match no rows. |
| `highlightSearch`               | Boolean                       | `false`            | Mark the query in text cells (`<mark class="quintable--search-mark">`). HTML and component cells stay as they are. |
| `searchDebounce`                | Number                        | `0`                | Milliseconds the local search waits after the last key press. For large tables; AJAX tables use `ajaxRequestDelay`. |
| **Filters**                     |                               |                    |             |
| `filterRelation`                | `"AND"` \| `"OR"`             | `"AND"`            | Relation between filters that are not part of a filter group. |
| `filterGroupRelation`           | `"AND"` \| `"OR"`             | `"AND"`            | Relation between filter groups. |
| `columnFilters`                 | Boolean                       | `false`            | A row of filters below the headings, one per column, see [Column tools](#column-tools). |
| `columnFilterPlaceholder`       | String                        | `"Filter"`         | Placeholder of the text filters (and start of their accessible name). |
| `columnFilterAllLabel`          | String                        | `"All"`            | The "no filter" choice of select filters. |
| `columnFilterMinLabel`          | String                        | `"Min"`            | Placeholder of a range filter's lower bound. |
| `columnFilterMaxLabel`          | String                        | `"Max"`            | Placeholder of a range filter's upper bound. |
| **Sorting**                     |                               |                    |             |
| `multiSort`                     | Boolean                       | `false`            | Sort by multiple columns. |
| `multiSortSelect`               | Boolean                       | `false`            | Let the user toggle multi-sort. |
| `multiSortPlaceholder`          | String                        | `"Multiple sort"`  | Label of the multi-sort toggle. |
| `pageSort`                      | Boolean                       | `false`            | Sort only the rows of the current page. |
| `pageSortSelect`                | Boolean                       | `false`            | Let the user toggle page sort. |
| `pageSortPlaceholder`           | String                        | `"Page sort"`      | Label of the page sort toggle. |
| `alwaysShowSortIcons`           | Boolean                       | `false`            | Show the sort arrows of every sortable heading faintly at all times. Otherwise they show only while the header row is hovered (always on touch screens). |
| **Selection**                   |                               |                    |             |
| `select`                        | Boolean                       | `false`            | Show checkboxes to select rows. |
| `selectPosition`                | `"pre"` \| `"post"`           | `"post"`           | Checkbox column first (`"pre"`) or last (`"post"`). |
| `prettySelect`                  | Boolean                       | `false`            | Use [pretty checkbox](https://lokesh-coder.github.io/pretty-checkbox/) styling. |
| `selectAll`                     | Boolean                       | `false`            | Show a "select all" checkbox. |
| `selectAllRows`                 | Boolean                       | `false`            | "Select all" selects the rows of all pages. Disabled automatically with `ajaxUrl`. |
| `defaultSelected`               | Boolean                       | `false`            | Select all rows initially. |
| `keepSelect`                    | Boolean                       | `false`            | Keep the selection when search, filters or sorting change (otherwise it is reset). |
| **AJAX**                        |                               |                    |             |
| `ajaxUrl`                       | String                        | `false`            | Load rows from the server for search, filter, sort and pagination, see [AJAX](#ajax--server-side-data). |
| `requestMethod`                 | `"GET"` \| `"POST"`           | `"GET"`            | HTTP method of AJAX requests. |
| `ajaxRequestDelay`              | Number                        | `250`              | Debounce for AJAX search requests in milliseconds. |
| `reloadOn`                      | Function                      | –                  | `(reload) => unsubscribe`: called once on mount with a function that re-fetches the current page; call it on your own signal (e.g. a router visit). The returned function is called on unmount. Only for tables with `ajaxUrl`. |
| **Accessibility**               |                               |                    |             |
| `accessible`                    | Boolean                       | `false`            | Keyboard and screen reader support, see [Accessibility](#accessibility). |
| `selectRowLabel`                | String                        | `"Select row"`     | Accessible name of a row's checkbox, followed by the row's number. |
| `selectAllLabel`                | String                        | `"Select all rows"`| Accessible name of the "select all" checkbox. |
| `expandRowLabel`                | String                        | `"Show details"`   | Accessible name of a closed row's toggle. |
| `collapseRowLabel`              | String                        | `"Hide details"`   | Accessible name of an open row's toggle. |
| `paginationLabel`               | String                        | `"Pagination"`     | Accessible name of the page navigation. |
| `firstPageLabel`, `previousPageLabel`, `nextPageLabel`, `lastPageLabel` | String | `"First page"`, … | Accessible names of the page arrows. |
| **State**                       |                               |                    |             |
| `storeState`                    | Boolean                       | `false`            | Persist the table state in local storage, see [Persisting table state](#persisting-table-state). Requires the `identifier` prop. |
| `urlState`                      | Boolean                       | `false`            | Keep page, sort, search, rows per page and column filters in the page's address, see [State in the address](#state-in-the-address). |

### columns

| Key                      | Type                     | Description |
|--------------------------|--------------------------|-------------|
| `headline`               | String                   | Column headline. |
| `title`                  | String                   | Text shown on hover over the headline. |
| `classes`                | String                   | Space separated CSS classes for headline, cells, generated and sticky rows. |
| `align`                  | `"start"` \| `"end"` \| `"center"` | Text alignment of the column. |
| `sort`                   | Boolean                  | Make the column sortable. |
| `firstSortDirection`     | `"ASC"` \| `"DESC"`      | Direction of the first click on the sort header. Default `"ASC"`. |
| `breakpoint`             | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"xxl"` \| `"all"` | Below (and at) this Bootstrap breakpoint the column moves into an expandable additional row. |
| `alwaysExpanded`         | Boolean                  | With `breakpoint`: the additional row is always expanded. |
| `sticky`                 | Boolean                  | Always show the column as expanded additional row. Don't combine with `breakpoint`. |
| `showHeadlineBreakpoint` | Breakpoint               | Show the headline in additional rows from this breakpoint downwards. |
| `hideHeadlineBreakpoint` | Breakpoint               | Hide the headline in additional rows from this breakpoint downwards. |
| `hidden`                 | Boolean                  | Never show the column. Best used with `dynamic-config`. |
| `ignoreEmpty`            | Boolean                  | With `hideEmptyColumns`: never hide this column. |
| `cellFormatter`          | Function                 | Format cells of this column, see [Cell formatters](#cell-formatters). |
| `pin`                    | `"start"` \| `"end"`     | Keep the column in place while the table scrolls sideways, see [Sticky header and pinned columns](#sticky-header-and-pinned-columns). |
| `width`                  | Number \| String         | Width of the heading, e.g. `120` (px) or `"10rem"`. |
| `resizable`              | Boolean                  | With `resizableColumns`: `false` keeps this column's width. |
| `filter`                 | `"text"` \| `"select"` \| `"range"` \| `false` | With `columnFilters`: the column's filter. Default `"text"`. |
| `filterOptions`          | Array                    | With `columnFilters`: the choices of a select filter. Default: the column's values (on the current page for AJAX tables). |

Any other property of a column reaches the `headline` slot as `column.yourProperty`.

### rows

A row is either an array of [cells](#cells) or an object:

| Key                  | Type     | Description |
|----------------------|----------|-------------|
| `cells`              | Array    | The [cells](#cells) of the row. |
| `classes`            | String   | Additional CSS classes for the row. |
| `align`              | `"start"` \| `"end"` \| `"center"` | Text alignment of the row. Overridden by column and cell `align`. |
| `tooltip`            | String   | Tooltip shown on hover over the row. |
| `expanded`           | Boolean  | Expand the row initially (if it has hidden breakpoint columns). |
| `keywords`           | String[] | Additional keywords matched by the search. |
| `filters`            | Object   | Filter values of the row, e.g. `{ active: true, city: "London" }`, see [Filters](#filters). |
| `selected`           | Boolean  | Select the row initially. |
| `disableSelect`      | Boolean  | Exclude the row from selection. |
| `showDisabledSelect` | Boolean  | With `disableSelect`: show a disabled checkbox instead of none. |

### cells

Use exactly one of `text`, `html` or `component`.

| Key         | Type             | Description |
|-------------|------------------|-------------|
| `text`      | String \| Number | Text content. |
| `html`      | String           | HTML content. Only pass trusted or sanitized HTML. |
| `component` | Object           | `{ name, props }` of a globally registered component, see [Custom components](#custom-components-in-cells). Prefer the `cell-content` slot. |
| `classes`   | String           | Additional CSS classes for the cell. |
| `align`     | `"start"` \| `"end"` \| `"center"` | Text alignment. Overrides column and row `align`. |
| `tooltip`   | String           | Tooltip shown on hover over the cell. |
| `sortValue` | String \| Number | Value used for sorting instead of the content, e.g. for formatted or HTML cells. |
| `computeSortValue` | Function | `(sortIndexes) => value`: the value to sort by, computed on each sort. Gets the active sorts by column index (`{ asc, order }`), e.g. to keep empty cells last in both directions. Wins over `sortValue`. |
| `isEmpty`   | Boolean          | Mark a cell as empty (for `hideEmptyColumns`), e.g. when its content comes from a slot. Overrides `text` and `html`. |

Any other property is passed through and available in [slots](#slots) as `cell.yourProperty`.

```js
const rows = [
  // simple row: array of cells
  [{ text: "John Doe" }, { text: 50 }, { text: "Trainee" }],

  // advanced row: object
  {
    classes: "special-row",
    tooltip: "Max is new",
    keywords: ["intern"],
    filters: { active: true },
    cells: [
      { html: "<b>Max</b> Mustermann", classes: "special-td", align: "end" },
      { component: { name: "age-component", props: { age: 20 } }, sortValue: 20 },
      { text: "Trainee" },
    ],
  },
];
```

### Option combinations

**Needs:** without it the option does nothing. **Not with:** the combination does not work, or the option has no effect in it. **Combine with:** what the option is meant to go with. Slots that replace a part of the table (e.g. `rows-per-page`) also replace the options of that part.

| Option | Needs | Not with | Combine with |
|--------|-------|----------|--------------|
| **Layout** | | | |
| `hideEmptyColumns` | – | With pagination or `ajaxUrl` it checks the rows of the current page only, so a column can come and go between pages. Component cells count as empty unless they set `isEmpty: false`. | `ignoreSortEmptyColumns`, column `ignoreEmpty`, cell `isEmpty` |
| `ignoreSortEmptyColumns` | `hideEmptyColumns` | – | – |
| `expandedAll` | Columns with `breakpoint` | – | `hideRowToggle` |
| `hideRowToggle` | Columns with `breakpoint` | `accessible`: without the toggle the keyboard can't open a row's details. | `expandedAll`, column `alwaysExpanded` |
| `expandedRowIcon`, `collapsedRowIcon` | Columns with `breakpoint` | `hideRowToggle`, `toggle-icon` slot | – |
| `hoverClass` | – | A custom class or `false`: the `--quintable-row-*` variables and the joint look of a row and its details apply to the default only. | – |
| `activeClass` | `enableRowTabIndex` (only then a row becomes active) | A custom class or `false`: no built-in accent edge. | – |
| `enableRowTabIndex` | – | The arrow keys stay on the current page. Every table with an active row reacts to them. | `virtualScroll` (the box scrolls along), `accessible` |
| `autoFit` | Columns with `breakpoint` `"xxl"`, `"xl"` or `"lg"` | `resizableColumns`: sized columns widen the table, and `autoFit` folds columns while you size them. `stickyHeader` without `scrollHeight` once the table scrolls in its container. | – |
| `cellTitles` | Cell content cut with `text-overflow: ellipsis` (your CSS) | A cell `tooltip` or an own `title` wins. | – |
| `skeletonLoading` | `ajaxUrl` or the `loading` prop | `loading` slot | – |
| `ignoreControlClicks` | – | – | Component cells, cell slots and `row-prepend`/`row-append` with buttons, links or fields |
| `reuseRows` | – | Cell components or slots with their own state, focus and open tooltips in rows (see [Reusing rows](#reusing-rows)) | `virtualScroll`, large pages |
| `stickyHeader` | – | A table that scrolls sideways in its container (`pin`, `autoFit`, sized columns of `resizableColumns`): the header then sticks inside the container only, so set `scrollHeight`. A fixed navbar: set `--quintable-sticky-top`. | `scrollHeight`, `virtualScroll`, `columnFilters` (the filter row sticks too) |
| `scrollHeight` | – | – | `stickyHeader`, `virtualScroll`, column `pin` |
| `virtualScroll` | `scrollHeight` (400px if not set) | Small pages and `ajaxUrl`: only the rows of the current or loaded page are virtual, so there is little to gain. More than about 400,000 rows on one page. | `reuseRows`, `stickyHeader`, `pagination: false` |
| `rowHeight` | `virtualScroll` | – | – |
| `resizableColumns` | – | `autoFit` (see there). A column that `columnPicker` or a breakpoint shows later starts at 120px. | `storeState` (widths are stored), column `width` and `resizable` |
| `columnPicker` | – | Columns with `hidden` are not listed. A column that `hideEmptyColumns` or a breakpoint hides stays listed as shown. | `storeState` (hidden columns are stored) |
| `columnPickerPlaceholder` | `columnPicker` | – | – |
| `resizeColumnLabel` | `resizableColumns` | – | – |
| **Pagination** | | | |
| `pagination` | – | – | `rowsSelect`, `pageSort` |
| `pageRange` | `pagination` | `pagination` slot | – |
| `rowsSelect` | `pagination` | `rows-per-page` slot | `disallowAllOption`; for "All" with many rows `virtualScroll` or `reuseRows` |
| `disallowAllOption` | `rowsSelect` | `rows-per-page` slot | – |
| `rowsPlaceholder` | `rowsSelect` | `rows-per-page` slot | – |
| `numberOfVisibleRowsFillerWord` | `pagination` | `rows-info` slot | – |
| **Search** | | | |
| `search` | – | – | `highlightSearch`, `searchDebounce` |
| `searchLength` | `search` | – | Also for `ajaxUrl`: shorter queries send no request. |
| `searchPlaceholder` | `search` | `search` slot | `accessible` (it names the field) |
| `useFuzzySearch` | `search` | `ajaxUrl` (the server searches). `highlightSearch` marks exact matches only. | – |
| `searchContainerClass`, `searchClass` | `search` | `search` slot (`searchClass` is passed to it) | – |
| `emptyPlaceholder` | – | `no-results` slot | `empty` slot for a table without rows |
| `highlightSearch` | `search` | HTML and component cells, `cell-content` slots, fuzzy matches | `searchDebounce` |
| `searchDebounce` | `search` | `ajaxUrl` (uses `ajaxRequestDelay`) | `highlightSearch`, large tables |
| **Filters** | | | |
| `filterRelation` | The `filters` prop | The `filter-groups` prop (then the groups' relations decide) | – |
| `filterGroupRelation` | The `filter-groups` prop | – | – |
| `columnFilters` | – | `ajaxUrl`: the server must apply the `columnFilters` parameter, and select filters list the current page's values only unless the column has `filterOptions`. | `search` and the `filters` prop (a row must pass all), `storeState`, `urlState`, `stickyHeader` |
| `columnFilterPlaceholder`, `columnFilterAllLabel`, `columnFilterMinLabel`, `columnFilterMaxLabel` | `columnFilters` | – | – |
| **Sorting** | | | |
| `multiSort` | Sortable columns | – | The `sort-order` prop with several entries needs it. |
| `multiSortSelect`, `multiSortPlaceholder` | Sortable columns | `sort-switches` slot | – |
| `pageSort` | `pagination` | `ajaxUrl`: it sorts the loaded page in the browser, and a new search turns it off. | – |
| `pageSortSelect`, `pageSortPlaceholder` | `pagination` | `sort-switches` slot | – |
| `alwaysShowSortIcons` | Sortable columns | – | – |
| **Selection** | | | |
| `select` | – | – | `selectAll`, `keepSelect` |
| `selectPosition` | `select` | – | – |
| `prettySelect` | `select` | `select-checkbox` and `select-all-checkbox` slots | – |
| `selectAll` | `select` | `select-all-checkbox` slot | `selectAllRows` |
| `selectAllRows` | `select`, `selectAll` | `ajaxUrl` (switched off with a warning) | – |
| `defaultSelected` | `select` | `ajaxUrl`: rows loaded later are not selected. | `selectAllRows` (selects all pages) |
| `keepSelect` | `select` | – | – |
| **Accessibility** | | | |
| `accessible` | – | `hideRowToggle` (see there). The `select-checkbox`, `select-all-checkbox` and `pagination` slots replace controls: give them their own accessible names. | `enableRowTabIndex` |
| `selectRowLabel`, `selectAllLabel`, `expandRowLabel`, `collapseRowLabel`, `paginationLabel`, `firstPageLabel`, `previousPageLabel`, `nextPageLabel`, `lastPageLabel` | `accessible` | – | – |
| **AJAX** | | | |
| `ajaxUrl` | – | The `rows` prop (ignored), `selectAllRows`, `useFuzzySearch`, `searchDebounce`, `defaultSelected` | `requestMethod`, `ajaxRequestDelay`, `reloadOn`, `skeletonLoading` |
| `requestMethod`, `ajaxRequestDelay` | `ajaxUrl` | – | – |
| `reloadOn` | `ajaxUrl` | – | – |
| **State** | | | |
| `storeState` | The `identifier` prop and local storage (otherwise switched off with a warning) | `urlState` wins where both hold a value. | `columnPicker`, `resizableColumns`, `columnFilters` (stored too) |
| `urlState` | – (an `identifier` is recommended) | Two tables on one page without `identifier` share their parameters. | `storeState` |
| **Columns** | | | |
| `breakpoint` | – | Column `sticky`. Column `pin`: a folded column is not pinned. | `alwaysExpanded`, `showHeadlineBreakpoint`, `hideHeadlineBreakpoint` |
| `alwaysExpanded` | Column `breakpoint` | – | – |
| `sticky` | – | Column `breakpoint` | – |
| `showHeadlineBreakpoint`, `hideHeadlineBreakpoint` | Column `breakpoint` or `sticky` | – | – |
| `hidden` | – | `columnPicker` does not list it. | The `dynamic-config` prop |
| `ignoreEmpty` | `hideEmptyColumns` | – | – |
| `firstSortDirection` | Column `sort` | – | – |
| `pin` | A table that scrolls sideways (its columns don't fit) | More than 10 pinned cells per side. A column folded by `breakpoint` or `autoFit`. | `scrollHeight` (needed with `stickyHeader`) |
| `width` | – | `resizableColumns` replaces it once the column was sized. | – |
| `resizable` | `resizableColumns` | – | – |
| `filter`, `filterOptions` | `columnFilters` | – | – |
| `cellFormatter` | – | `highlightSearch` marks its result only if it is text, not HTML. | – |

## Custom components in cells

The `cell-content` slot is the recommended way to render custom content. Components referenced by `cell.component.name` must be registered globally. An `action` event emitted by the component is forwarded as `component:event`.

```vue
<!-- AgeComponent.vue -->
<template>
  <div @click="emit('action', { age: props.age })">Age: {{ props.age }}</div>
</template>

<script setup>
const props = defineProps({ age: { type: [Number, String], required: true } });
const emit = defineEmits(["action"]);
</script>
```

```js
import AgeComponent from "./components/AgeComponent.vue";

app.component("age-component", AgeComponent);
```

```vue
<vue-quintable :config="config" :rows="rows" @component:event="onComponentEvent" />
```

## Cell formatters

`cellFormatter` receives the cell and returns either a string (rendered as text) or `{ value, type }` with `type` `"text"` or `"html"`.

```js
const config = {
  columns: [
    { headline: "Name" },
    {
      headline: "Salary",
      cellFormatter: (cell) => ({
        value: `<b>${cell.text.toLocaleString()} €</b>`,
        type: "html",
      }),
    },
  ],
};
```

## Filters

Rows declare their filter values in `row.filters`. The `filters` prop holds the active filters keyed by filter name. A filter is either a plain value or an object:

| Key        | Type             | Description |
|------------|------------------|-------------|
| `values`   | Any \| Array     | **Required.** Single value or array of values compared to the row's filter value. |
| `operator` | String           | Compare operator, default `equal`. See below. |
| `compare`  | Function         | Custom compare function `(value, rowValue) => Boolean`. Overrides `operator`. |

| Operator       | Matches if the row value … |
|----------------|----------------------------|
| `equal`        | equals the value (`===`) |
| `greater`      | is greater than the value |
| `less`         | is less than the value |
| `greaterEqual` | is greater than or equal to the value |
| `lessEqual`    | is less than or equal to the value |
| `contains`     | (string or array) contains the value |
| `notContains`  | (string or array) doesn't contain the value |
| `startsWith`   | (string) starts with the value |
| `endsWith`     | (string) ends with the value |
| `matches`      | (string) matches the value, a `RegExp` |

```js
const filters = {
  active: true,
  printable: false,
  first_name: { operator: "contains", values: ["Jo", "ja"] },
  middle_name: { operator: "matches", values: /r.+a/ },
  last_name: {
    compare: (value, rowValue) => rowValue.indexOf(value) === 2,
    values: "a",
  },
};
```

### Filter groups

Groups combine filters with `AND`/`OR` relations and can be nested infinitely. An item is `{ name }` of a filter or another group.

| Key        | Type              | Description |
|------------|-------------------|-------------|
| `items`    | Object[]          | Filter names (`{ name }`) or nested groups. |
| `relation` | `"AND"` \| `"OR"` | Relation between the items. |

This example shows rows matching (**name** *OR* **active**) *AND* **printable**:

```js
const filterGroups = [
  {
    relation: "AND",
    items: [
      { relation: "OR", items: [{ name: "name" }, { name: "active" }] },
      { items: [{ name: "printable" }] },
    ],
  },
];
```

## Sort order

`sort-order` is an array of column indexes (starting at 0) or `{ index, asc }` objects. `asc` defaults to `true`. Only columns with `sort: true` are sorted, and more than one entry requires `config.multiSort`. This sorts by the second column descending, then by the first ascending:

```js
// simple
[1, 0]

// advanced
[
  { index: 1, asc: false },
  { index: 0, asc: true },
]
```

## Selecting rows

Enable `config.select` and bind the selection with `v-model:selected-rows`. The binding receives the selected rows; to select rows from outside use `pre-selected-rows`, `row.selected` or `config.defaultSelected`.

```vue
<vue-quintable
  v-model:selected-rows="selectedRows"
  :config="{ ...config, select: true, selectAll: true }"
  :rows="rows"
  :pre-selected-rows="[{ key: 'id', value: 42 }]"
/>
```

## Slots

| Slot                     | Scope | Description |
|--------------------------|-------|-------------|
| `header`                 | – | Content above the table. |
| `before-search`          | – | Content before the search input. |
| `search`                 | `{ value, loading, setSearchQuery, placeholder, searchClass }` | Replace the search input. |
| `after-search`           | – | Content after the search input. |
| `after-search-container` | – | Content after the search container. |
| `cell-content`           | `{ cell }` | Content of regular cells. |
| `generated-cell-content` | `{ cell }` | Content of cells in responsive (breakpoint) rows. |
| `sticky-cell-content`    | `{ cell }` | Content of sticky cells. |
| `no-results`             | – | Placeholder if no rows match. |
| `loading`                | `{ hiddenBreakpoints }` | Custom loader. `hiddenBreakpoints` lists the breakpoints whose columns are folded right now, for a loader in the table's shape. |
| `footer`                 | – | Content below the table. |
| `headline`               | `{ column, index, headline }` | Content of a column heading, in the header and in a row's details. |
| `sort-icon`              | `{ column, index, direction }` | Replaces the sort arrows of a sortable heading. `direction` is `"asc"`, `"desc"` or `null`. The control that removes a sort stays. |
| `toggle-icon`            | `{ row, index, expanded }` | Replaces the expand/collapse icon of a row. |
| `select-checkbox`        | `{ row, index, checked, disabled, toggle }` | Replaces a row's checkbox. `toggle()` flips it, `toggle(true)` / `toggle(false)` sets it. |
| `select-all-checkbox`    | `{ checked, indeterminate, toggle }` | Replaces the "select all" checkbox. |
| `row-prepend`            | `{ row, index }` | An extra cell at the start of every row, e.g. for actions. A click in it is a row click, as in any cell; see `ignoreControlClicks`. |
| `row-append`             | `{ row, index }` | An extra cell at the end of every row. |
| `header-prepend`         | – | Heading of the `row-prepend` column. |
| `header-append`          | – | Heading of the `row-append` column. |
| `details`                | `{ row, index, cells, hovered }` | Replaces a row's details (its hidden and sticky columns). `cells` lists what they show now: `{ cell, index, headline, sticky }`. |
| `empty`                  | – | Shown instead of `no-results` while the table has no rows at all. With `ajaxUrl`: the server reports none and no search or filter is set. |
| `error`                  | `{ error, reload }` | Shown when loading rows via AJAX fails. `reload()` loads the current page again. |
| `pagination`             | `{ page, pages, setPage }` | Replaces the page navigation. `setPage` takes a page number or `"first"`, `"prev"`, `"next"`, `"last"`. |
| `pagination-icon`        | `{ type }` | Replaces the arrows of the page navigation. `type` is `"first"`, `"prev"`, `"next"` or `"last"`. |
| `rows-info`              | `{ first, last, total }` | Replaces the text "1-10 of 50". |
| `rows-per-page`          | `{ value, options, setRowsPerPage, placeholder }` | Replaces the rows per page select. |
| `sort-switches`          | `{ multiSort, pageSort, setMultiSort, setPageSort }` | Replaces the multiple sort and page sort switches. |

`cell-complete`, `generated-cell-complete` and `sticky-cell-complete` are deprecated aliases.

```vue
<vue-quintable :config="config" :rows="rows">
  <template #header>Your HTML</template>

  <!-- same content for regular, generated and sticky cells -->
  <template
    v-for="slotName in ['cell-content', 'generated-cell-content', 'sticky-cell-content']"
    :key="slotName"
    #[slotName]="{ cell }"
  >
    <button v-if="cell.type === 'action'" class="btn btn-sm btn-primary">
      {{ cell.text }}
    </button>
    <template v-else>{{ cell.text }}</template>
  </template>

  <template #search="{ value, setSearchQuery }">
    <input :value="value" class="form-control" @input="setSearchQuery($event.target.value)" />
  </template>

  <!-- own icons -->
  <template #sort-icon="{ direction }">
    {{ direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕" }}
  </template>
  <template #toggle-icon="{ expanded }">{{ expanded ? "Less" : "More" }}</template>

  <!-- an actions column -->
  <template #header-append>Actions</template>
  <template #row-append="{ row }">
    <button class="btn btn-sm btn-outline-primary" @click.stop="edit(row)">Edit</button>
  </template>

  <template #error="{ error, reload }">
    {{ error.message }} <button class="btn btn-link" @click="reload()">Try again</button>
  </template>
</vue-quintable>
```

## Events

All events pass the event name as second argument.

| Event                 | Arguments | Fired when |
|-----------------------|-----------|------------|
| `click:row`           | `row, name, target, event, index` | A row is clicked. |
| `auxclick:row`        | `row, name, target, event, index` | A row is middle-clicked. |
| `click:cell`          | `cell, name, target, event` | A cell is clicked. |
| `auxclick:cell`       | `cell, name, target, event` | A cell is middle-clicked. |
| `hover:row`           | `row, name` | The mouse enters a row. |
| `active:row`          | `row, name, index` | The active row changes (requires `enableRowTabIndex`). |
| `expand:row`          | `row, name, index` | A row is expanded. *Deprecated:* also fires on collapse with `name` `"collapse:row"`. |
| `collapse:row`        | `row, name, index` | A row is collapsed. |
| `update:selected-rows`| `rows` | The selection changes. |
| `update:filters`      | `filters, name` | The active filters change. |
| `filtered:rows`       | `rows, name` | Search or filters change the visible rows. |
| `update:search`       | `query, name` | The search query changes. |
| `update:sort`         | `sortIndexes, name` | The sort order changes. |
| `update:page`         | `page, name` | The page changes. |
| `update:rows-per-page`| `perPage, name` | The rows per page change. |
| `change:breakpoints`  | `hiddenBreakpoints, name` | The window crosses a Bootstrap breakpoint. |
| `component:event`     | `data, name` | A [cell component](#custom-components-in-cells) emits `action`. |
| `ajax:rows`           | `{ rows, old, all }, name` | Rows were loaded from the server. |
| `ajax:error`          | `error, name` | Loading rows from the server failed. |
| `update:hidden-columns` | `hidden, name` | The column picker hid or showed a column; `hidden` lists the hidden columns' indexes. |
| `resize:column`       | `index, width, name` | A column was sized (`width` in px). |
| `update:column-filters` | `values, name` | A column filter changed; `values` holds them by column index. |

```vue
<vue-quintable :config="config" :rows="rows" @click:row="onRowClick" @expand:row="onToggle" />
```

## AJAX / server-side data

### Load once, render locally

```vue
<template>
  <vue-quintable :loading="loading" :config="config" :rows="rows" />
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const loading = ref(true);
const config = ref({ columns: [] });
const rows = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get("https://your.server.url/api/endpoint");
    config.value = data.config;
    rows.value = data.rows;
  } finally {
    loading.value = false;
  }
});
</script>
```

### Server-side search, filter, sort and pagination

Set `config.ajaxUrl` and omit `rows`. On every change VueQuintable sends a request (query parameters for `GET`, JSON body for `POST`):

```js
{
  search: "some query",          // String: search query
  filters: {},                   // Object: active filters, see above
  perPage: 25,                   // Number: rows per page
  page: 2,                       // Number: current page, starting at 1
  hiddenColumns: [false, true],  // Boolean[]: hidden flag per column
  sort: {                        // Object|null: null if not sorted
    indexes: {},                 // sorting column indexes
    columns: {},                 // sorting column definitions keyed by index
  },
}
```

The server responds with:

```js
{
  rows: [],   // Array: rows of the current page, structure see above
  all: 240,   // Number: count of all matching rows (without paging)
}
```

Change the `updated` prop (e.g. to `new Date()`) to reload the current page.

## Persisting table state

With `config.storeState` and an `identifier`, filters, search query, page, rows per page, sort order and selection are stored in local storage and restored on reload. Bind filters with `v-model:filters` so restored filters reach your component.

```vue
<vue-quintable
  v-model:filters="filters"
  identifier="customers"
  :config="{ ...config, storeState: true }"
  :rows="rows"
/>
```

## Reusing rows

By default, every sort, page change, search and filter re-creates the rows it shows: Vue removes their `<tr>` and `<td>` elements with all event listeners and builds them anew. With `reuseRows: true` the table keeps one row element per position and only swaps its text, classes and ids.

**What for:** large pages of plain data, for example `pagination: false` or the "All" option of the rows-per-page select with hundreds or thousands of rows. Measured in Chromium, sorting 1000 visible rows takes about 70–85 ms instead of 120–275 ms, 2000 rows about 180–255 ms instead of 320–365 ms. With 100 rows per page or fewer there is no noticeable difference, so leave it off there.

**When not to use it:** a row element no longer belongs to one row of data, it belongs to a position. That matters in three cases:

- **Components and slots with their own state** (`component` cells, cell slots with inputs, checkboxes, open menus): after a sort they keep that state but show the row now in their position. Without the switch they start fresh with their row.
- **Focus and open tooltips** stay on the element, so they end up at another row after a sort.
- **Hover:** after a sort, page change, search or filter the hover disappears until the mouse enters a row again. Without the switch it stays when the hovered row is still shown.

Row details (expanded rows, sticky and `alwaysExpanded` columns) are re-created as before. Events, emitted data and the rendered HTML are the same with and without the switch.

## Large tables: virtual scrolling

With `virtualScroll: true` the table renders only the rows in its scroll box and a few around it, about 30 instead of thousands. It works with or without pagination, with search, filters, sorting, selection, row details and the arrow keys of `enableRowTabIndex` (the box scrolls along). The box is `scrollHeight` high (400px by default).

```js
const config = {
  columns,
  virtualScroll: true,
  scrollHeight: 480,
  reuseRows: true, // rows are updated, not re-created, while scrolling
  stickyHeader: true,
};
```

Rows are measured once rendered; the others count with the height of the first one measured (`rowHeight` until then). Rows of very different heights make the scrollbar jump a little while they are measured. Browsers limit an element's height (about 17 million px in Firefox), so keep a table without pages below about 400,000 rows.

## Column tools

- **`columnPicker`** adds a "Columns" menu above the table. Columns the config hides (`hidden`) are not listed; the last shown column can't be hidden. Hidden columns are left out of the row details too, and the `hiddenColumns` AJAX parameter lists them.
- **`resizableColumns`** puts a grip on each heading's end edge. Drag it, or focus it with Tab and use the arrow keys; a double-click resets all widths. Once a column was sized, the table keeps fixed widths for all columns and scrolls sideways when they don't fit.
- **`columnFilters`** adds a row of filters below the headings. A column's `filter` picks the kind: `"text"` (contains, case-insensitive), `"select"` (equals one of `filterOptions` or the column's values) or `"range"` (a number between min and max, from `sortValue` or the text). Column filters work together with the search and the `filters` prop; AJAX tables get them as the `columnFilters` parameter.

With `storeState`, hidden columns, widths and column filters are stored, too.

```js
const config = {
  columns: [
    { headline: "Product" },
    { headline: "Category", filter: "select" },
    { headline: "Price", filter: "range", align: "end" },
    { headline: "SKU", filter: false, resizable: false, width: 110 },
  ],
  columnPicker: true,
  resizableColumns: true,
  columnFilters: true,
};
```

## Sticky header and pinned columns

`stickyHeader: true` keeps the headings (and the column filters) on top while the rows scroll. Without `scrollHeight` they stick to the top of the page; set the CSS variable `--quintable-sticky-top` (e.g. to your navbar's height) to stick below a fixed bar. With `scrollHeight` they stick inside the table's box.

A column with `pin: "start"` or `pin: "end"` stays in place while the table scrolls sideways; the toggle and checkbox columns before (or after) it stay with it. Up to 10 cells per side can be pinned. Pinned columns need the table to scroll sideways inside its container: it does when its columns don't fit. A sticky header together with pinned columns needs `scrollHeight`, because the header then sticks inside the table's box.

## Accessibility

With `accessible: true`:

- sortable headings can be reached with Tab and sorted with Enter or Space, and tell how they are sorted (`aria-sort`),
- a row's toggle is a button that says whether the details are open (`aria-expanded`),
- checkboxes, the search field and the page navigation have accessible names (set them with the `…Label` options, e.g. in another language),
- page links can be reached with Tab and followed with Enter or Space; the current page is marked (`aria-current`).

Keyboard focus is visible on all of them. Without the option the table's HTML is the same as before.

## State in the address

With `urlState: true` the table keeps page, sort, search, rows per page and column filters in the page's address, so a link opens the same view. The parameters start with the table's `identifier` (or `qt`), e.g. `?orders-page=2&orders-sort=1:desc`. Values at their default are left out, other parameters stay, and no history entries are added. The address wins over `storeState`.

## Methods

A template ref to the table can call:

| Method | Description |
|--------|-------------|
| `setSearchQuery(query)` | Search for `query`. |
| `setSortColumn(index, asc?)` | Sort by a column (or flip its direction). |
| `removeSort(index)` | Stop sorting by a column. |
| `gotoPage(page)` | Go to a page number or `"first"`, `"prev"`, `"next"`, `"last"`. |
| `toggleColumn(index, visible?)` | With `columnPicker`: show or hide a column. |
| `setColumnFilter(index, value)` / `clearColumnFilters()` | With `columnFilters`: set (an empty value removes) or clear the column filters. |
| `resetColumnWidths()` | With `resizableColumns`: back to the widths the content gives. |

## TypeScript

The package ships types for its props, config, columns, rows, cells, events, slots and methods. Templates are checked with [vue-tsc](https://github.com/vuejs/language-tools) / Volar:

```ts
import { VueQuintable, type QuintableConfig, type QuintableRow } from "@sensetence/vue-quintable";

const config: QuintableConfig = { columns: [{ headline: "Name", sort: true }], virtualScroll: true };
const table = ref<InstanceType<typeof VueQuintable> | null>(null);
table.value?.setSearchQuery("Ada");
```

## Good to know

- Clicks on links don't toggle the row. Add the class `prevent-toggle` to any element to prevent toggling, too.
- Sortable headings show two arrows after their text: faint while the header row is hovered (or always, see `alwaysShowSortIcons`), in full while the heading is hovered. A sorted heading shows one icon of its direction. A right-aligned heading (`text-end` / `text-right`) has them before its text. The icons take the heading's colour.
- The root element carries the rows per page as the CSS variable `--quintable-page-size`, e.g. to keep a page's height while the next one loads.
- A row and its details hover together, in one tint; a table nested in the details sits on it, so its hovered row is one step darker. The active row (`enableRowTabIndex`) and its details get `activeClass`; with the default `activeClass` also `row-active` / `parent-row-active`, which show an accent with a leading edge. With the default classes the colours come from Bootstrap's theme (dark mode included) and can be changed with the CSS variables `--quintable-row-hover-bg`, `--quintable-row-active-bg` and `--quintable-row-active-edge` (set them on `.quintable` or any ancestor).
- "Select all" selects only the rows in its scope (the visible page, or with `selectAllRows` all pages) that pass search and filters; every other row is deselected, as in 2.x.
- `v-model:selected-rows` replaces Vue 2's `v-model`; plain `v-model` is not supported.
- Set `:nested="true"` on tables inside another table's slot.
- `html` cells and HTML returned by cell formatters are rendered unescaped. Never pass unsanitized user input.

## Development

```shell
yarn install
yarn dev          # demo with all examples
yarn test         # unit tests (vitest)
yarn test:e2e     # end-to-end tests (playwright)
yarn prod         # build the library into dist/
```

## License

VueQuintable is free for everyone to use in any project ([MIT License](https://opensource.org/licenses/MIT)).

## Authors

Sensetence UG – Samuel Krusche
Sensetence UG – Dennis Parsch

[https://sensetence.com](https://sensetence.com)

