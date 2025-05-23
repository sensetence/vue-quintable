<template>
  <div id="app">
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <img
                alt="VueQuintable Logo"
                title="VueQuintable Logo"
                src="./assets/banner.png"
                width="400"
                height="300"
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
          ></v-select>
          <div class="example-content">
            <component :is="example.value"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosCustom from "axios";

import BasicExample from "./examples/BasicExample.vue";
import SelectExample from "./examples/SelectExample.vue";
import PaginationExample from "./examples/PaginationExample.vue";
import SortExample from "./examples/SortExample.vue";
import BreakpointsExample from "./examples/BreakpointsExample.vue";
import BindedExample from "./examples/BindedExample.vue";
import EventsExample from "./examples/EventsExample.vue";
import AjaxLoadedExample from "./examples/AjaxLoadedExample.vue";
import FiltersExample from "./examples/FiltersExample.vue";
import ComponentsExample from "./examples/ComponentsExample.vue";
import NestedExample from "./examples/NestedExample.vue";
import SlotsExample from "./examples/SlotsExample.vue";
import AddRemoveExample from "./examples/AddRemoveExample.vue";
import TooltipsExample from "./examples/TooltipsExample.vue";
import HiddenExample from "./examples/HiddenExample.vue";
import ComputedRowsExample from "../../src/examples/computed-rows-example.vue";
import CellFormattersExample from "./examples/FormatterExample.vue";
import AjaxExample from "./examples/AjaxExample.vue";
import AjaxSelectExample from "./examples/AjaxSelectExample.vue";
import BreakpointsAdvancedExample from "./examples/BreakpointsAdvancedExample.vue";
import StoreStateExample from "./examples/StoreStateExample.vue";
import AjaxStoreStateExample from "./examples/AjaxStoreStateExample.vue";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

// import Vue from "vue";
// import Tester from "./examples/CheckboxComponent.vue";
//
// Vue.component(
//   "tester",
//   // Look for the component options on `.default`, which will
//   // exist if the component was exported with `export default`,
//   // otherwise fall back to module's root.
//   Tester.default || Tester
// );

axiosCustom.interceptors.request.use(
    (config) => {
      console.warn("Custom axios", config);

      return config;
    },
    (error) => {
      console.log("ERROR AXIOS", error);
    }
);

export default {
  name: "app",
  components: {
    // VueQuintable,
    BasicExample,
    BreakpointsExample,
    AjaxSelectExample,
    BreakpointsAdvancedExample,
    AjaxExample,
    AjaxLoadedExample,
    PaginationExample,
    SortExample,
    BindedExample,
    TooltipsExample,
    SelectExample,
    FiltersExample,
    ComponentsExample,
    EventsExample,
    NestedExample,
    SlotsExample,
    HiddenExample,
    AddRemoveExample,
    ComputedRowsExample: ComputedRowsExample,
    CellFormattersExample,
    StoreStateExample,
    AjaxStoreStateExample,
  },

  data() {
    return {
      example: {
        value: "BasicExample",
        label: "Basic Example",
      },
      examples: [
        {
          value: "BasicExample",
          label: "Basic Example",
        },
        {
          value: "ComputedRowsExample",
          label: "Computed Rows Example",
        },
        {
          value: "PaginationExample",
          label: "Pagination Example",
        },
        {
          value: "SortExample",
          label: "Sort Example",
        },
        {
          value: "SelectExample",
          label: "Select Example",
        },
        {
          value: "CellFormattersExample",
          label: "Cell Formatters Example",
        },
        {
          value: "BreakpointsExample",
          label: "Breakpoints Example",
        },
        {
          value: "BreakpointsAdvancedExample",
          label: "Breakpoints Advanced Example",
        },
        {
          value: "TooltipsExample",
          label: "Tooltips",
        },
        {
          value: "AjaxExample",
          label: "Ajax Example",
        },
        {
          value: "AjaxSelectExample",
          label: "Ajax + Select Example",
        },
        {
          value: "AjaxLoadedExample",
          label: "Ajax Loaded Example",
        },
        {
          value: "EventsExample",
          label: "Events Example",
        },
        {
          value: "SlotsExample",
          label: "Slots Example",
        },
        {
          value: "BindedExample",
          label: "Vue-binded Example",
        },
        {
          value: "FiltersExample",
          label: "Filter Example",
        },
        {
          value: "ComponentsExample",
          label: "Component Example",
        },
        {
          value: "HiddenExample",
          label: "Hide/Show Example",
        },
        {
          value: "AddRemoveExample",
          label: "Add/Remove/Move Example",
        },
        {
          value: "NestedExample",
          label: "Nested Example",
        },
        {
          value: "StoreStateExample",
          label: "Store State",
        },
        {
          value: "AjaxStoreStateExample",
          label: "Ajax Store State",
        },
      ],
    };
  },
  watch: {
    example: {
      handler() {
        this.$nextTick(() => {
          Prism.highlightAll();
        });
      },
      immediate: true,
    },
  },

  created() {
    Prism.manual = true;
  },
};
</script>

<style>
pre .close {
  float: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-shadow: inherit;
  opacity: inherit;
}

.nav-item {
  font-size: 0.85em;
  padding: 0.3rem 0.5rem;
}

button [data-icon="chevron-down"],
button .show {
  display: none;
}

button.collapsed [data-icon="chevron-up"],
button.collapsed .hide {
  display: none;
}

button.collapsed [data-icon="chevron-down"],
button.collapsed .show {
  display: inline;
}
</style>
