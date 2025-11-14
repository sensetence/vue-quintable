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

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      :axios=&quot;axios&quot;
      :config=&quot;config&quot;
      @ajax:rows=&quot;rowsUpdated&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref} from 'vue';
import axios from &quot;axios&quot;;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

// Axios interceptor
axios.interceptors.request.use(
    (config) =&gt; {
      console.log(&quot;Custom axios&quot;, config);
      return config;
    },
    (error) =&gt; {
      console.log(&quot;ERROR AXIOS&quot;, error);
    }
);

// table data
const config = {
  // Columns configuration
  columns: [
    {headline: &quot;Name&quot;, sort: true},
    {headline: &quot;Email&quot;, breakpoint: &quot;sm&quot;, sort: true},
    {headline: &quot;Phone&quot;, breakpoint: &quot;md&quot;},
    {headline: &quot;Job Title&quot;, breakpoint: &quot;md&quot;, sort: true},
    {headline: &quot;City&quot;, breakpoint: &quot;md&quot;},
    {headline: &quot;Address&quot;, breakpoint: &quot;md&quot;},
  ],
  pagination: 5,
  search: true,
  pageSortSelect: true,
  ajaxUrl: &quot;https://sensetence.com/vue-quintable-demo/data.php&quot;,
  requestMethod: &quot;POST&quot;,
};

const rowsUpdated = (data) =&gt; {
  if (data.rows.length) {
    alert(&quot;Rows updated from server: &quot; + data.rows.length + &quot; rows.&quot;);
  }
}
&lt;/script&gt;`;
</script>
