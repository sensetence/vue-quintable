<template>
  <div id="app">
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <img
              alt="VueQuintable Logo"
              title="VueQuintable Logo"
              src="./assets/images/banner.png"
              class="logo"
            />
            <h1 class="mb-4">VueQuintable Demo</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <quintable-v-select
            v-model="example"
            class="mb-3"
            :clearable="false"
            :options="examples"
            :get-option-key="(option: SelectItemWithComponent) => option.value"
          />
          <div class="example-content">
            <component :is="example.component" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  shallowRef,
  watch,
  defineAsyncComponent,
  type ShallowRef,
  type Component,
} from "vue";
import type { SelectItem } from "./types/form";

// Each example is its own chunk, loaded when selected.
const modules = import.meta.glob<Component>("./examples/*.vue", {
  import: "default",
});

// example navigation
type SelectItemWithComponent = SelectItem & {
  component: ShallowRef<Component>;
};

const examples: SelectItemWithComponent[] = [
  ["basic-example", "Basic Example"],
  ["computed-rows-example", "Computed Rows Example"],
  ["pagination-example", "Pagination Example"],
  ["large-data-example", "Large Data & Reuse Rows Example"],
  ["sort-example", "Sort Example"],
  ["custom-sort-example", "Custom Sort Example"],
  ["select-example", "Select Example"],
  ["select-options-example", "Selection Options Example"],
  ["cell-formatter-example", "Cell Formatter Example"],
  ["breakpoints-example", "Breakpoints Example"],
  ["breakpoints-advanced-example", "Breakpoints Advanced Example"],
  ["row-details-example", "Row Details Example"],
  ["row-states-example", "Hover, Active Row & Keyboard Example"],
  ["container-fit-example", "Container Fit Example"],
  ["tooltips-example", "Tooltips Example"],
  ["ajax-example", "Ajax Example"],
  ["ajax-select-example", "Ajax + Select Example"],
  ["ajax-loaded-example", "Ajax Loaded Example"],
  ["ajax-skeleton-example", "Ajax Skeleton & Reload Example"],
  ["ajax-error-example", "Ajax Error Example"],
  ["events-example", "Events Example"],
  ["slots-example", "Slots Example"],
  ["texts-example", "Texts & Languages Example"],
  ["vue-binded-example", "Vue-binded Example"],
  ["search-example", "Search Example"],
  ["filter-example", "Filter Example"],
  ["filter-groups-example", "Filter Groups Example"],
  ["component-example", "Component Example"],
  ["hide-show-example", "Hide/Show Example"],
  ["add-remove-example", "Add/Remove/Move Example"],
  ["nested-example", "Nested Example"],
  ["store-state-example", "Store State Example"],
  ["ajax-store-state-example", "Ajax Store State"],
].map(([value, label]) => ({
  value,
  label,
  component: shallowRef(
    defineAsyncComponent(modules[`./examples/${value}.vue`]),
  ),
}));

// load example from URL parameters
let urlParams = new URLSearchParams(window.location.search);
let exampleId = "";
if (urlParams.has("example")) {
  exampleId = urlParams.get("example") ?? examples[0].value;
} else {
  exampleId = examples[0].value;
}
const example = ref(examples.find((e) => e.value === exampleId) || examples[0]);

// update URL when example changes
watch(example, (newExample) => {
  if (newExample) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("example", newExample.value);
    window.history.replaceState({}, "", newUrl.toString());
  }
});
</script>

<style scoped>
.logo {
  width: 400px;
  height: 300px;
}
</style>
