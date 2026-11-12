<template>
  <div class="content">
    <alert-info
      >The headings stay on top while the rows scroll in a box of 360px
      (<code>stickyHeader</code>, <code>scrollHeight</code>). Region stays at
      the start and Total at the end while the months scroll sideways
      (<code>pin</code>); the checkboxes before Region stay with it.</alert-info
    >

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

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
import source from "./pinned-columns-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const REGIONS = [
  "Bavaria",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hesse",
  "Lower Saxony",
  "Saarland",
  "Saxony",
  "Thuringia",
  "Rhineland",
  "Westphalia",
  "Schleswig",
  "Holstein",
  "Pomerania",
  "Franconia",
  "Swabia",
  "Palatinate",
];

// table data
const config = {
  columns: [
    { headline: "Region", pin: "start", sort: true },
    ...MONTHS.map((month) => ({ headline: month, align: "end" })),
    { headline: "Total", pin: "end", align: "end", sort: true },
  ],
  stickyHeader: true,
  scrollHeight: 360,
  select: true,
  selectPosition: "pre",
};

const euro = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const rows = REGIONS.map((region, r) => {
  const sales = MONTHS.map((_, i) => 8000 + ((r * 997 + i * 613) % 9000));
  const total = sales.reduce((sum, value) => sum + value, 0);
  return [
    { text: region },
    ...sales.map((value) => ({ text: euro.format(value), sortValue: value })),
    { text: euro.format(total), sortValue: total },
  ];
});
</script>
