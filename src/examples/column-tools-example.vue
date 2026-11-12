<template>
  <div class="content">
    <alert-info
      >Choose the columns (<code>columnPicker</code>), drag a heading's edge to
      size its column or focus the edge and use the arrow keys
      (<code>resizableColumns</code>, double-click resets), filter each column
      (<code>columnFilters</code>) and see the search marked in the cells
      (<code>highlightSearch</code>). The search waits for a pause in typing
      (<code>searchDebounce</code>).</alert-info
    >

    <div class="d-flex flex-wrap gap-2 mb-3">
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        @click="table?.clearColumnFilters()"
      >
        Clear filters
      </button>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        @click="table?.resetColumnWidths()"
      >
        Reset widths
      </button>
    </div>

    <!-- table -->
    <vue-quintable ref="table" :config="config" :rows="rows" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./column-tools-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const table = ref<{
  clearColumnFilters: () => void;
  resetColumnWidths: () => void;
} | null>(null);

// table data; filter picks the filter of a column: text (default), select, range or false
const config = {
  columns: [
    { headline: "Product", sort: true },
    { headline: "Category", sort: true, filter: "select" },
    { headline: "Price", align: "end", sort: true, filter: "range" },
    { headline: "Stock", align: "end", sort: true, filter: "range" },
    { headline: "Supplier", filter: "select" },
    { headline: "SKU", filter: false, width: 110 },
  ],
  pagination: 10,
  search: true,
  highlightSearch: true,
  searchDebounce: 200,
  columnPicker: true,
  resizableColumns: true,
  columnFilters: true,
};

const CATEGORIES = ["Lighting", "Furniture", "Accessories", "Storage"];
const SUPPLIERS = ["Lumen GmbH", "Sitwell Ltd", "Mounto", "Woodline"];
const NAMES = [
  "Desk lamp",
  "Office chair",
  "Monitor arm",
  "Standing desk",
  "Cable tray",
  "Floor lamp",
  "Footrest",
  "Shelf unit",
  "Laptop stand",
  "Drawer box",
];

const rows = Array.from({ length: 30 }, (_, i) => {
  const price = 19 + ((i * 37) % 420);
  return [
    { text: `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) + 1}` },
    { text: CATEGORIES[(i * 3) % CATEGORIES.length] },
    { text: price.toFixed(2), sortValue: price },
    { text: (i * 7) % 45 },
    { text: SUPPLIERS[(i * 5) % SUPPLIERS.length] },
    { text: `SKU-${String(1000 + i * 13)}` },
  ];
});
</script>
