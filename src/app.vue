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
import {ref, shallowRef, watch, type ShallowRef, type Component} from "vue";

import BasicExample from "./examples/basic-example.vue";
import ComputedRowsExample from "./examples/computed-rows-example.vue";
import PaginationExample from "./examples/pagination-example.vue";
import SortExample from "./examples/sort-example.vue";
import SelectExample from "./examples/select-example.vue";
import CellFormatterExample from "./examples/cell-formatter-example.vue";
import BreakpointsExample from "./examples/breakpoints-example.vue";
import BreakpointsAdvancedExample from "./examples/breakpoints-advanced-example.vue";
import TooltipsExample from "./examples/tooltips-example.vue";
import AjaxExample from "./examples/ajax-example.vue";
import AjaxSelectExample from "./examples/ajax-select-example.vue";
import AjaxLoadedExample from "./examples/ajax-loaded-example.vue";
import EventsExample from "./examples/events-example.vue";
import SlotsExample from "./examples/slots-example.vue";
import VueBindedExample from "./examples/vue-binded-example.vue";
import FilterExample from "./examples/filter-example.vue";
import ComponentExample from "./examples/component-example.vue";
import HideShowExample from "./examples/hide-show-example.vue";
import AddRemoveExample from "./examples/add-remove-example.vue";
import NestedExample from "./examples/nested-example.vue";
import StoreStateExample from "./examples/store-state-example.vue";
import AjaxStoreStateExample from "./examples/ajax-store-state-example.vue";

// example navigation
type SelectItemWithComponent = SelectItem & {
  component: ShallowRef<Component>;
};

const examples: SelectItemWithComponent[] = [
  {
    value: "basic-example",
    label: "Basic Example",
    component: shallowRef(BasicExample),
  },
  {
    value: "computed-rows-example",
    label: "Computed Rows Example",
    component: shallowRef(ComputedRowsExample),
  },
  {
    value: "pagination-example",
    label: "Pagination Example",
    component: shallowRef(PaginationExample),
  },
  {
    value: "sort-example",
    label: "Sort Example",
    component: shallowRef(SortExample),
  },
  {
    value: "select-example",
    label: "Select Example",
    component: shallowRef(SelectExample),
  },
  {
    value: "cell-formatter-example",
    label: "Cell Formatter Example",
    component: shallowRef(CellFormatterExample),
  },
  {
    value: "breakpoints-example",
    label: "Breakpoints Example",
    component: shallowRef(BreakpointsExample),
  },
  {
    value: "breakpoints-advanced-example",
    label: "Breakpoints Advanced Example",
    component: shallowRef(BreakpointsAdvancedExample),
  },
  {
    value: "tooltips-example",
    label: "Tooltips Example",
    component: shallowRef(TooltipsExample),
  },
  {
    value: "ajax-example",
    label: "Ajax Example",
    component: shallowRef(AjaxExample),
  },
  {
    value: "ajax-select-example",
    label: "Ajax + Select Example",
    component: shallowRef(AjaxSelectExample),
  },
  {
    value: "ajax-loaded-example",
    label: "Ajax Loaded Example",
    component: shallowRef(AjaxLoadedExample),
  },
  {
    value: "events-example",
    label: "Events Example",
    component: shallowRef(EventsExample),
  },
  {
    value: "slots-example",
    label: "Slots Example",
    component: shallowRef(SlotsExample),
  },
  {
    value: "vue-binded-example",
    label: "Vue-binded Example",
    component: shallowRef(VueBindedExample),
  },
  {
    value: "filter-example",
    label: "Filter Example (Todo)",
    component: shallowRef(FilterExample),
  },
  {
    value: "component-example",
    label: "Component Example (Todo)",
    component: shallowRef(ComponentExample),
  },
  {
    value: "hide-show-example",
    label: "Hide/Show Example",
    component: shallowRef(HideShowExample),
  },
  {
    value: "add-remove-example",
    label: "Add/Remove/Move Example (Todo)",
    component: shallowRef(AddRemoveExample),
  },
  {
    value: "nested-example",
    label: "Nested Example",
    component: shallowRef(NestedExample),
  },
  {
    value: "store-state-example",
    label: "Store State Example",
    component: shallowRef(StoreStateExample),
  },
  {
    value: "ajax-store-state-example",
    label: "Ajax Store State",
    component: shallowRef(AjaxStoreStateExample),
  },
];

// load example from URL parameters
let urlParams = new URLSearchParams(window.location.search);
let exampleId = '';
if (urlParams.has('example')) {
  exampleId = urlParams.get('example');
} else {
  exampleId = examples[0].value;
}
const example = ref(examples.find((e) => e.value === exampleId) || examples[0]);

// update URL when example changes
watch(example, (newExample) => {
  if (newExample) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('example', newExample.value);
    window.history.replaceState({}, '', newUrl.toString());
  }
});
</script>

<style scoped>
.logo {
  width: 400px;
  height: 300px;
}
</style>