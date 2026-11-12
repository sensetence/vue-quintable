<template>
  <div class="content">
    <alert-info
      >Pagination and sorting will be handled by server side via
      ajax.</alert-info
    >

    <!-- table -->
    <vue-quintable :axios="axios" :config="config" @ajax:rows="rowsUpdated" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./ajax-example.vue?raw";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

// Axios interceptor
axios.interceptors.request.use(
  (config) => {
    console.log("Custom axios", config);
    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  },
);

const showCode = ref(false);
const code = exampleCode(source);

// table data
const config = {
  // Columns configuration
  columns: [
    { headline: "Name", sort: true },
    { headline: "Email", breakpoint: "sm", sort: true },
    { headline: "Phone", breakpoint: "md" },
    { headline: "Job Title", breakpoint: "md", sort: true },
    { headline: "City", breakpoint: "md" },
    { headline: "Address", breakpoint: "md" },
  ],
  pagination: 5,
  search: true,
  pageSortSelect: true,
  ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
  requestMethod: "POST",
};

const rowsUpdated = (data: any) => {
  if (data.rows.length) {
    alert("Rows updated from server: " + data.rows.length + " rows.");
  }
};
</script>
