<template>
  <div id="app">
    <div class="container py-5">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <img
              alt="VueQuintable Logo"
              title="VueQuintable Logo"
              src="banner.png"
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
// import VueQuintable from "./components/VueQuintable.vue"
import axiosCustom from "axios";
import Vue from "vue";

import Basic from "./examples/Basic.vue";
import Select from "./examples/Select.vue";
import Pagination from "./examples/Pagination.vue";
import Sort from "./examples/Sort.vue";
import Breakpoints from "./examples/Breakpoints.vue";
import Binded from "./examples/Binded.vue";
import Events from "./examples/Events.vue";
import AjaxLoaded from "./examples/AjaxLoaded.vue";
import Filters from "./examples/Filters.vue";
import Components from "./examples/Components.vue";
import Nested from "./examples/Nested.vue";
import Slots from "./examples/Slots.vue";
import AddRemove from "./examples/AddRemove.vue";
import Hidden from "./examples/Hidden.vue";
import ComputedRows from "./examples/ComputedRows.vue";
import CellFormatters from "./examples/Formatter.vue";
import Ajax from "./examples/Ajax.vue";
import AjaxSelect from "./examples/AjaxSelect.vue";
import BreakpointsAdvanced from "./examples/BreakpointsAdvanced.vue";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

import Tester from "./examples/CheckboxComponent.vue";

Vue.component(
  "tester",
  // Look for the component options on `.default`, which will
  // exist if the component was exported with `export default`,
  // otherwise fall back to module's root.
  Tester.default || Tester
);

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
    Basic,
    Breakpoints,
    AjaxSelect,
    BreakpointsAdvanced,
    Ajax,
    AjaxLoaded,
    Pagination,
    Sort,
    Binded,
    Select,
    Filters,
    Components,
    Events,
    Nested,
    Slots,
    Hidden,
    AddRemove,
    ComputedRows,
    CellFormatters,
  },

  data() {
    return {
      example: {
        value: "Basic",
        label: "Basic Example",
      },
      examples: [
        {
          value: "Basic",
          label: "Basic Example",
        },
        {
          value: "ComputedRows",
          label: "Computed Rows Example",
        },
        {
          value: "Pagination",
          label: "Pagination Example",
        },
        {
          value: "Sort",
          label: "Sort Example",
        },
        {
          value: "Select",
          label: "Select Example",
        },
        {
          value: "CellFormatters",
          label: "Cell Formatters Example",
        },
        {
          value: "Breakpoints",
          label: "Breakpoints Example",
        },
        {
          value: "BreakpointsAdvanced",
          label: "Breakpoints Advanced Example",
        },
        {
          value: "Ajax",
          label: "Ajax Example",
        },
        {
          value: "AjaxSelect",
          label: "Ajax + Select Example",
        },
        {
          value: "AjaxLoaded",
          label: "Ajax Loaded Example",
        },
        {
          value: "Events",
          label: "Events Example",
        },
        {
          value: "Slots",
          label: "Slots Example",
        },
        {
          value: "Binded",
          label: "Vue-binded Example",
        },
        {
          value: "Filters",
          label: "Filter Example",
        },
        {
          value: "Components",
          label: "Component Example",
        },
        {
          value: "Hidden",
          label: "Hide/Show Example",
        },
        {
          value: "AddRemove",
          label: "Add/Remove/Move Example",
        },
        {
          value: "Nested",
          label: "Nested Example",
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

