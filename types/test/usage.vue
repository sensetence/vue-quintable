<!-- Checks types/index.d.ts the way an app uses the package: yarn test:types. Every line marked
     @vue-expect-error must stay an error. -->
<template>
  <VueQuintable
    ref="table"
    :config="config"
    :rows="rows"
    @click:row="(row, name, target, event, index) => onRow(index)"
    @resize:column="(index, width) => widths.push(width)"
    @update:column-filters="(values) => Object.keys(values)"
  >
    <template #sort-icon="{ direction }">{{
      direction === "asc" ? "▲" : "▼"
    }}</template>
    <template #row-append="{ row, index }">{{ index }} {{ row }}</template>
    <template #error="{ error, reload }">
      <button @click="reload()">{{ String(error) }}</button>
    </template>
    <!-- @vue-expect-error a slot prop that does not exist -->
    <template #toggle-icon="{ open }">{{ open }}</template>
  </VueQuintable>

  <!-- @vue-expect-error columns must be an array -->
  <VueQuintable :config="{ columns: 5 }" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import install, {
  VueQuintable,
  type QuintableColumn,
  type QuintableConfig,
  type QuintableRow,
} from "@sensetence/vue-quintable";

const config: QuintableConfig = {
  columns: [{ headline: "Total", pin: "end", filter: "range", width: 120 }],
  virtualScroll: true,
  scrollHeight: 400,
  accessible: true,
  columnFilters: true,
};
const rows: QuintableRow[] = [
  [{ text: 1 }],
  { cells: [{ html: "<b>2</b>" }], keywords: ["two"] },
];
const widths: number[] = [];
const table = ref<InstanceType<typeof VueQuintable> | null>(null);

function onRow(index: number) {
  table.value?.setColumnFilter(index, { min: 1 });
  table.value?.toggleColumn(0, false);
}

// @ts-expect-error a pin is "start" or "end"
const wrong: QuintableColumn = { pin: "middle" };

const withHeaders: QuintableConfig = {
  columns: [],
  ajaxUrl: "/api",
  ajaxHeaders: async (params) => ({ "X-Page": String(params.page) }),
};
const badHeaders: QuintableConfig = {
  columns: [],
  // @ts-expect-error header values are strings
  ajaxHeaders: { "X-Page": 2 },
};

void [install, wrong, withHeaders, badHeaders];
</script>
