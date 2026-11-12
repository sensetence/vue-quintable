<template>
  <div class="content">
    <alert-info
      >50,000 rows without pages: the table renders only the rows in its box and
      a few around it (<code>virtualScroll</code>). Open a row's details: the
      table measures it and keeps its height. Click a row and use the arrow
      keys: the box scrolls along. With <code>reuseRows</code> scrolling updates
      rows instead of creating them.</alert-info
    >

    <p class="mb-2" aria-live="polite">
      Rendered:
      <output class="rendered-rows fw-semibold">{{ rendered }}</output> of
      {{ rows.length.toLocaleString("en") }} rows
    </p>

    <!-- table; the count of rendered rows follows the scrolling -->
    <div @scroll.capture="countRows">
      <vue-quintable
        ref="table"
        :config="config"
        :rows="rows"
        @vue:updated="countRows"
      />
    </div>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./virtual-scroll-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const table = ref<{ $el: HTMLElement } | null>(null);
const rendered = ref(0);

function countRows() {
  requestAnimationFrame(() => {
    rendered.value =
      table.value?.$el.querySelectorAll("tbody tr.vue-quintable-row").length ??
      0;
  });
}
onMounted(countRows);

// table data
const config = {
  columns: [
    { headline: "#", sort: true, align: "end" },
    { headline: "Order", sort: true },
    { headline: "Customer", sort: true },
    { headline: "Amount", sort: true, align: "end" },
    { headline: "Note", breakpoint: "all" },
  ],
  virtualScroll: true,
  scrollHeight: 480,
  stickyHeader: true,
  reuseRows: true,
  search: true,
  enableRowTabIndex: true,
};

const CUSTOMERS = [
  "Acme",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Vandelay",
];

const rows = Array.from({ length: 50000 }, (_, i) => {
  const amount = ((i * 7919) % 100000) / 100;
  return [
    { text: i + 1 },
    { text: `ORD-${String(100000 + i)}` },
    { text: CUSTOMERS[(i * 5) % CUSTOMERS.length] },
    { text: amount.toFixed(2), sortValue: amount },
    { text: i % 3 ? "Standard delivery" : "Express, signature required" },
  ];
});
</script>
