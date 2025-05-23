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
          <v-select
              class="mb-3"
              :clearable="false"
              v-model="example"
              :options="examples"
              :getOptionKey="(option: SelectItemWithComponent) => option.value"
          />
          <div class="example-content">
            <component :is="example.component"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, shallowRef, type ShallowRef, type Component} from "vue";

import BasicExample from "./examples/basic-example.vue";
import ComputedRowsExample from "./examples/computed-rows-example.vue";

// example navigation
type SelectItemWithComponent = SelectItem & {
  component: ShallowRef<Component>;
};

const examples: SelectItemWithComponent[] = [
  {
    value: "BasicExample",
    label: "Basic Example",
    component: shallowRef(BasicExample),
  },
  {
    value: "ComputedRowsExample",
    label: "Computed Rows Example",
    component: shallowRef(ComputedRowsExample),
  },
  // {
  //   value: "PaginationExample",
  //   label: "Pagination Example",
  // },
  // {
  //   value: "SortExample",
  //   label: "Sort Example",
  // },
  // {
  //   value: "SelectExample",
  //   label: "Select Example",
  // },
  // {
  //   value: "CellFormattersExample",
  //   label: "Cell Formatters Example",
  // },
  // {
  //   value: "BreakpointsExample",
  //   label: "Breakpoints Example",
  // },
  // {
  //   value: "BreakpointsAdvancedExample",
  //   label: "Breakpoints Advanced Example",
  // },
  // {
  //   value: "TooltipsExample",
  //   label: "Tooltips",
  // },
  // {
  //   value: "AjaxExample",
  //   label: "Ajax Example",
  // },
  // {
  //   value: "AjaxSelectExample",
  //   label: "Ajax + Select Example",
  // },
  // {
  //   value: "AjaxLoadedExample",
  //   label: "Ajax Loaded Example",
  // },
  // {
  //   value: "EventsExample",
  //   label: "Events Example",
  // },
  // {
  //   value: "SlotsExample",
  //   label: "Slots Example",
  // },
  // {
  //   value: "BindedExample",
  //   label: "Vue-binded Example",
  // },
  // {
  //   value: "FiltersExample",
  //   label: "Filter Example",
  // },
  // {
  //   value: "ComponentsExample",
  //   label: "Component Example",
  // },
  // {
  //   value: "HiddenExample",
  //   label: "Hide/Show Example",
  // },
  // {
  //   value: "AddRemoveExample",
  //   label: "Add/Remove/Move Example",
  // },
  // {
  //   value: "NestedExample",
  //   label: "Nested Example",
  // },
  // {
  //   value: "StoreStateExample",
  //   label: "Store State",
  // },
  // {
  //   value: "AjaxStoreStateExample",
  //   label: "Ajax Store State",
  // },
];

const example = ref(examples[0]);
</script>

<style scoped>
.logo {
  width: 400px;
  height: 300px;
}
</style>