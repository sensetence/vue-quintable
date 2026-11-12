<template>
  <div class="content">
    <alert-info>
      Do some filtering/sorting/selecting and then reload the page, state stays
      the same.
    </alert-info>

    <!-- table -->
    <vue-quintable
      v-model:filters="filters"
      v-model:selected-rows="selected"
      :config="config"
      :identifier="identifier"
    >
      <template #header>
        <quintable-v-select
          v-model="indexes"
          :options="indexesOptions"
          :reduce="(x: any) => x.value"
          :clearable="false"
          class="mb-3"
        />
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./ajax-store-state-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

// table data
const identifier = "stored-state-table-ajax";

const indexesOptions = [
  { label: "All", value: "all" },
  { label: "Bigger than 100", value: "bigger" },
  { label: "Smaller than 100", value: "smaller" },
];

const indexes = ref<"all" | "bigger" | "smaller">("all");
const filters = ref<Record<string, any>>({});
const selected = ref<any[]>([]);

const config = {
  columns: [
    { headline: "Name", sort: true },
    { headline: "Email", sort: true, breakpoint: "sm" },
    { headline: "Phone", breakpoint: "md" },
    { headline: "Job Title", sort: true, breakpoint: "md" },
    { headline: "City", breakpoint: "md" },
    { headline: "Address", breakpoint: "md" },
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  select: true,
  prettySelect: true,
  storeState: true,
  ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
};

watch(indexes, (val) => {
  if (val === "all") {
    delete filters.value.bigger;
    delete filters.value.smaller;
  } else if (val === "bigger") {
    filters.value.bigger = true;
    delete filters.value.smaller;
  } else if (val === "smaller") {
    filters.value.smaller = true;
    delete filters.value.bigger;
  }
});

watch(
  filters,
  () => {
    if (
      typeof filters.value.smaller === "undefined" &&
      typeof filters.value.bigger === "undefined"
    ) {
      indexes.value = "all";
    } else if (filters.value.smaller) {
      indexes.value = "smaller";
    } else if (filters.value.bigger) {
      indexes.value = "bigger";
    }
  },
  { deep: true },
);
</script>
