<template>
  <div class="content">
    <alert-info
      >Every control of this table comes from a slot: the headings, the sort and
      toggle icons, the checkboxes, the actions column, the row details and the
      whole footer. Switch off the products to see the
      <code>empty</code> slot.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="form-check form-switch mb-0">
        <input
          id="own-pagination"
          v-model="ownPagination"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="own-pagination"
          >Own page navigation (off: own arrows only)</label
        >
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="no-products"
          v-model="noProducts"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="no-products">No products</label>
      </div>
    </div>

    <!-- table -->
    <vue-quintable
      v-model:selected-rows="selectedRows"
      :config="config"
      :rows="rows"
    >
      <!-- header -->
      <template #headline="{ column, headline }"
        >{{ headline
        }}<small
          v-if="column.unit"
          class="ms-1 fw-normal text-body-secondary"
          >{{ column.unit }}</small
        ></template
      >
      <template #sort-icon="{ direction }">
        <span aria-hidden="true">{{
          direction === "asc" ? "▲" : direction === "desc" ? "▼" : "↕"
        }}</span>
      </template>
      <template #select-all-checkbox="{ checked, indeterminate, toggle }">
        <input
          class="form-check-input"
          type="checkbox"
          aria-label="Select all products on this page"
          :checked="checked"
          :indeterminate="indeterminate"
          @change="toggle()"
        />
      </template>
      <template #header-append>Actions</template>

      <!-- rows -->
      <template #toggle-icon="{ expanded }">
        <span class="badge text-bg-light border">{{
          expanded ? "Less" : "More"
        }}</span>
      </template>
      <template #select-checkbox="{ row, checked, toggle }">
        <input
          class="form-check-input"
          type="checkbox"
          :aria-label="`Select ${row.cells[0].text}`"
          :checked="checked"
          @change="toggle()"
        />
      </template>
      <template #row-append="{ row }">
        <!-- .stop: the button's click is not a click on the row -->
        <button
          type="button"
          class="btn btn-sm btn-outline-primary text-nowrap"
          @click.stop="restock(row.id)"
        >
          Restock +10
        </button>
      </template>
      <template #details="{ cells }">
        <dl class="row mb-0 px-3 py-2">
          <template v-for="{ index, headline, cell } in cells" :key="index">
            <dt class="col-sm-3">{{ headline }}</dt>
            <dd class="col-sm-9 mb-1">{{ cell.text }}</dd>
          </template>
        </dl>
      </template>
      <template #empty>
        <div class="text-center p-4">
          <p class="mb-2">No products yet.</p>
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="noProducts = false"
          >
            Load the sample products
          </button>
        </div>
      </template>

      <!-- footer -->
      <template #sort-switches="{ multiSort, setMultiSort }">
        <div class="form-check form-switch">
          <input
            id="multi-sort"
            class="form-check-input"
            type="checkbox"
            :checked="multiSort"
            @change="setMultiSort(!multiSort)"
          />
          <label class="form-check-label" for="multi-sort"
            >Sort by several columns</label
          >
        </div>
      </template>
      <template #rows-per-page="{ value, options, setRowsPerPage }">
        <div
          class="btn-group btn-group-sm"
          role="group"
          aria-label="Products per page"
        >
          <button
            v-for="option in pageSizes(options)"
            :key="option"
            type="button"
            class="btn"
            :class="
              option === value ? 'btn-secondary' : 'btn-outline-secondary'
            "
            :aria-pressed="option === value"
            @click="setRowsPerPage(option)"
          >
            {{ option }}
          </button>
        </div>
      </template>
      <template v-if="ownPagination" #pagination="{ page, pages, setPage }">
        <div class="d-inline-flex align-items-center gap-2 mb-2 me-3">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :disabled="page <= 1"
            @click="setPage('prev')"
          >
            Previous
          </button>
          <span>Page {{ page }} of {{ pages }}</span>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :disabled="page >= pages"
            @click="setPage('next')"
          >
            Next
          </button>
        </div>
      </template>
      <template #pagination-icon="{ type }">
        <span aria-hidden="true">{{ ARROWS[type] }}</span>
      </template>
      <template #rows-info="{ first, last, total }"
        >Products {{ first }}–{{ last }} of {{ total }}</template
      >
    </vue-quintable>

    <p class="mt-2" aria-live="polite">{{ selectedRows.length }} selected</p>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./slot-controls-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const ownPagination = ref(true);
const noProducts = ref(false);
const selectedRows = ref<unknown[]>([]);

// the page sizes the buttons offer, of the table's options
const PAGE_SIZES = [5, 10, "All"];
const pageSizes = (options: (number | string)[]) =>
  options.filter((option) => PAGE_SIZES.includes(option));
const ARROWS: Record<string, string> = {
  first: "«",
  prev: "‹",
  next: "›",
  last: "»",
};

// table data; a column's own properties (here: unit) reach the headline slot
const config = {
  columns: [
    { headline: "Product", sort: true },
    { headline: "Category", sort: true, breakpoint: "sm" },
    { headline: "Price", unit: "EUR", align: "end", sort: true },
    { headline: "Stock", unit: "pcs", align: "end", sort: true },
    { headline: "Supplier", breakpoint: "all" },
    { headline: "Location", breakpoint: "all" },
  ],
  select: true,
  selectAll: true,
  pagination: 5,
  pageRange: 2,
  rowsSelect: true,
  multiSortSelect: true,
};

const products = [
  {
    id: 1,
    name: "Desk lamp",
    category: "Lighting",
    price: 39,
    stock: 24,
    supplier: "Lumen GmbH",
    location: "Aisle 3",
  },
  {
    id: 2,
    name: "Office chair",
    category: "Furniture",
    price: 189,
    stock: 6,
    supplier: "Sitwell Ltd",
    location: "Aisle 1",
  },
  {
    id: 3,
    name: "Monitor arm",
    category: "Accessories",
    price: 79,
    stock: 15,
    supplier: "Mounto",
    location: "Aisle 4",
  },
  {
    id: 4,
    name: "Standing desk",
    category: "Furniture",
    price: 449,
    stock: 3,
    supplier: "Sitwell Ltd",
    location: "Aisle 1",
  },
  {
    id: 5,
    name: "Cable tray",
    category: "Accessories",
    price: 25,
    stock: 40,
    supplier: "Mounto",
    location: "Aisle 4",
  },
  {
    id: 6,
    name: "Floor lamp",
    category: "Lighting",
    price: 119,
    stock: 9,
    supplier: "Lumen GmbH",
    location: "Aisle 3",
  },
  {
    id: 7,
    name: "Footrest",
    category: "Furniture",
    price: 45,
    stock: 12,
    supplier: "Sitwell Ltd",
    location: "Aisle 2",
  },
  {
    id: 8,
    name: "Webcam light",
    category: "Lighting",
    price: 29,
    stock: 0,
    supplier: "Lumen GmbH",
    location: "Aisle 3",
  },
  {
    id: 9,
    name: "Laptop stand",
    category: "Accessories",
    price: 55,
    stock: 18,
    supplier: "Mounto",
    location: "Aisle 4",
  },
  {
    id: 10,
    name: "Bookshelf",
    category: "Furniture",
    price: 129,
    stock: 5,
    supplier: "Woodline",
    location: "Aisle 2",
  },
  {
    id: 11,
    name: "Desk organizer",
    category: "Accessories",
    price: 19,
    stock: 33,
    supplier: "Woodline",
    location: "Aisle 5",
  },
  {
    id: 12,
    name: "Pendant light",
    category: "Lighting",
    price: 159,
    stock: 4,
    supplier: "Lumen GmbH",
    location: "Aisle 3",
  },
];

// Built once and changed in place: a new rows array would set the table up anew (sort, open rows).
const productRows = reactive(
  products.map((product) => ({
    id: product.id,
    cells: [
      { text: product.name },
      { text: product.category },
      { text: product.price.toFixed(2), sortValue: product.price },
      { text: product.stock },
      { text: product.supplier },
      { text: product.location },
    ],
  })),
);

const rows = computed(() => (noProducts.value ? [] : productRows));

function restock(id: number) {
  const row = productRows.find((r) => r.id === id);
  if (row) {
    row.cells[3].text = Number(row.cells[3].text) + 10;
  }
}
</script>
