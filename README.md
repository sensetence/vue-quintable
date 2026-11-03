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
- [Configuration](#configuration) – [config](#config) · [columns](#columns) · [rows](#rows) · [cells](#cells)
- [Custom components in cells](#custom-components-in-cells)
- [Cell formatters](#cell-formatters)
- [Filters](#filters) · [Filter groups](#filter-groups)
- [Sort order](#sort-order)
- [Selecting rows](#selecting-rows)
- [Slots](#slots)
- [Events](#events)
- [AJAX / server-side data](#ajax--server-side-data)
- [Persisting table state](#persisting-table-state)
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
- Table state persisted in local storage
- Nested tables

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

Font Awesome 6 and 7 are supported (`^6.7.2 || ^7`).

## Setup

```js
import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "@sensetence/vue-quintable/style.css";
import VueQuintable from "@sensetence/vue-quintable";

const app = createApp(App);

app.use(VueQuintable);
// or pass a configured axios instance for all tables:
// app.use(VueQuintable, { axios: myAxiosInstance });

app.mount("#app");
```

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

| Key                             | Type                          | Default            | Description |
|---------------------------------|-------------------------------|--------------------|-------------|
| `columns`                       | Array                         | –                  | **Required.** Column definitions, see [columns](#columns). |
| **Layout**                      |                               |                    |             |
| `hideEmptyColumns`              | Boolean                       | `false`            | Hide columns that are empty (`text`, `html`, `component`) in all visible rows. |
| `ignoreSortEmptyColumns`        | `"none"` \| `"active"` \| `"all"` | `"none"`       | With `hideEmptyColumns`: `"none"` keeps sortable columns always visible, `"active"` keeps them visible while sorted, `"all"` hides them like other columns. |
| `expandedAll`                   | Boolean                       | `false`            | Expand all rows with hidden (breakpoint) columns by default. |
| `hideRowToggle`                 | Boolean                       | `false`            | Hide the expand/collapse toggle icon. |
| `expandedRowIcon`               | String                        | `"chevron-up"`     | Icon for expanded rows: `"chevron-up"`, `"minus"`, `"caret-up"`, `"eye-slash"`. |
| `collapsedRowIcon`              | String                        | `"chevron-down"`   | Icon for collapsed rows: `"chevron-down"`, `"plus"`, `"caret-down"`, `"eye"`. |
| `hoverClass`                    | String \| Boolean             | `"bg-muted"`       | CSS class for hovered rows. `false` disables it. |
| `activeClass`                   | String \| Boolean             | `"bg-muted"`       | CSS class for the active row. `false` disables it. |
| `enableRowTabIndex`             | Boolean                       | `false`            | Clicking a row makes it active; arrow keys move the active row (`active:row` event). |
| **Pagination**                  |                               |                    |             |
| `pagination`                    | Number \| Boolean             | `false`            | Rows per page. `true` means 25. Other values snap down to one of 1–10, 15, 20, 25, 30, 50, 100. |
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
| **Filters**                     |                               |                    |             |
| `filterRelation`                | `"AND"` \| `"OR"`             | `"AND"`            | Relation between filters that are not part of a filter group. |
| `filterGroupRelation`           | `"AND"` \| `"OR"`             | `"AND"`            | Relation between filter groups. |
| **Sorting**                     |                               |                    |             |
| `multiSort`                     | Boolean                       | `false`            | Sort by multiple columns. |
| `multiSortSelect`               | Boolean                       | `false`            | Let the user toggle multi-sort. |
| `multiSortPlaceholder`          | String                        | `"Multiple sort"`  | Label of the multi-sort toggle. |
| `pageSort`                      | Boolean                       | `false`            | Sort only the rows of the current page. |
| `pageSortSelect`                | Boolean                       | `false`            | Let the user toggle page sort. |
| `pageSortPlaceholder`           | String                        | `"Page sort"`      | Label of the page sort toggle. |
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
| **State**                       |                               |                    |             |
| `storeState`                    | Boolean                       | `false`            | Persist the table state in local storage, see [Persisting table state](#persisting-table-state). Requires the `identifier` prop. |

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
| `loading`                | – | Custom loader. |
| `footer`                 | – | Content below the table. |

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

## Good to know

- Clicks on links don't toggle the row. Add the class `prevent-toggle` to any element to prevent toggling, too.
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

