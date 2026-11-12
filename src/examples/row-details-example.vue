<template>
  <div class="content">
    <alert-info
      >Columns with breakpoint <code>all</code> live in each row's details.
      Click a row to open or close them. Order 1042 starts open, because its row
      has <code>expanded: true</code>.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="form-check form-switch mb-0">
        <input
          id="expanded-all"
          v-model="expandedAll"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="expanded-all"
          >Open all details</label
        >
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="hide-row-toggle"
          v-model="hideRowToggle"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="hide-row-toggle"
          >Hide the toggle icon</label
        >
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0" for="row-icons">Toggle icons</label>
        <select
          id="row-icons"
          v-model="icons"
          class="form-select form-select-sm w-auto"
        >
          <option
            v-for="label in Object.keys(ICONS)"
            :key="label"
            :value="label"
          >
            {{ label }}
          </option>
        </select>
      </div>
    </div>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./row-details-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

// [icon of an open row, icon of a closed row]
const ICONS: Record<string, [string, string]> = {
  Chevron: ["chevron-up", "chevron-down"],
  "Plus and minus": ["minus", "plus"],
  Caret: ["caret-up", "caret-down"],
  Eye: ["eye-slash", "eye"],
};

const expandedAll = ref(false);
const hideRowToggle = ref(false);
const icons = ref("Chevron");

// table data
const config = computed(() => ({
  columns: [
    { headline: "Order", sort: true },
    { headline: "Customer", sort: true },
    { headline: "Total", align: "end", sort: true },
    { headline: "Status" },
    // the details
    { headline: "Items", breakpoint: "all" },
    { headline: "Ship to", breakpoint: "all" },
    { headline: "Note", breakpoint: "all" },
  ],
  expandedAll: expandedAll.value,
  hideRowToggle: hideRowToggle.value,
  expandedRowIcon: ICONS[icons.value][0],
  collapsedRowIcon: ICONS[icons.value][1],
}));

const STATUS: Record<string, string> = {
  Processing: "text-bg-secondary",
  Shipped: "text-bg-primary",
  Delivered: "text-bg-success",
  Cancelled: "text-bg-danger",
};

const orders = [
  {
    id: 1042,
    customer: "Lena Fischer",
    total: 184.9,
    status: "Shipped",
    items: "2 × Linen shirt, 1 × Canvas tote",
    shipTo: "Kastanienallee 12, 10435 Berlin",
    note: "Leave the parcel at the door.",
    expanded: true,
  },
  {
    id: 1043,
    customer: "Tomás Rivera",
    total: 59,
    status: "Processing",
    items: "1 × Wool beanie",
    shipTo: "Calle de Atocha 27, 28012 Madrid",
    note: "",
  },
  {
    id: 1044,
    customer: "Aiko Tanaka",
    total: 312.4,
    status: "Delivered",
    items: "1 × Rain jacket, 2 × Merino socks",
    shipTo: "2-11-3 Meguro, Tokyo 153-0063",
    note: "Gift wrap, no invoice in the parcel.",
  },
  {
    id: 1045,
    customer: "Samuel Okafor",
    total: 96.5,
    status: "Cancelled",
    items: "3 × Ceramic mug",
    shipTo: "14 Allen Avenue, Ikeja, Lagos",
    note: "Cancelled by the customer before shipping.",
  },
  {
    id: 1046,
    customer: "Ingrid Holm",
    total: 140,
    status: "Shipped",
    items: "1 × Leather belt, 1 × Card holder",
    shipTo: "Storgata 8, 0155 Oslo",
    note: "Express delivery.",
  },
];

const rows = orders.map((order) => ({
  expanded: order.expanded,
  cells: [
    { text: order.id },
    { text: order.customer },
    { text: `€${order.total.toFixed(2)}`, sortValue: order.total },
    {
      html: `<span class="badge ${STATUS[order.status]}">${order.status}</span>`,
      sortValue: order.status,
    },
    { text: order.items },
    { text: order.shipTo },
    { text: order.note || "No note" },
  ],
}));
</script>
