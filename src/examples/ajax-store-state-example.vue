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
import { ref, reactive, watch } from "vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const identifier = "stored-state-table-ajax";

const indexesOptions = [
  { label: "All", value: "all" },
  { label: "Bigger than 100", value: "bigger" },
  { label: "Smaller than 100", value: "smaller" },
];

const indexes = ref<"all" | "bigger" | "smaller">("all");
const filters = reactive<Record<string, any>>({});
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
    delete filters.bigger;
    delete filters.smaller;
  } else if (val === "bigger") {
    filters.bigger = true;
    delete filters.smaller;
  } else if (val === "smaller") {
    filters.smaller = true;
    delete filters.bigger;
  }
});

watch(filters, () => {
  if (
    typeof filters.smaller === "undefined" &&
    typeof filters.bigger === "undefined"
  ) {
    indexes.value = "all";
  } else if (filters.smaller) {
    indexes.value = "smaller";
  } else if (filters.bigger) {
    indexes.value = "bigger";
  }
});

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      :config=&quot;config&quot;
      v-model:filters=&quot;filters&quot;
      v-model:selected-rows=&quot;selected&quot;
      :identifier=&quot;identifier&quot;
  &gt;
    &lt;template #header&gt;
      &lt;quintable-v-select
          v-model=&quot;indexes&quot;
          :options=&quot;indexesOptions&quot;
          :reduce=&quot;(x) =&gt; x.value&quot;
          :clearable=&quot;false&quot;
          class=&quot;mb-3&quot;
      /&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, reactive, watch} from 'vue';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const identifier = 'stored-state-table-ajax';

const indexesOptions = [
  {label: 'All', value: 'all'},
  {label: 'Bigger than 100', value: 'bigger'},
  {label: 'Smaller than 100', value: 'smaller'},
];

const indexes = ref&lt;'all' | 'bigger' | 'smaller'&gt;('all');
const filters = reactive&lt;Record&lt;string, any&gt;&gt;({});
const selected = ref&lt;any[]&gt;([]);

const config = {
  columns: [
    {headline: 'Name', sort: true},
    {headline: 'Email', sort: true, breakpoint: 'sm'},
    {headline: 'Phone', breakpoint: 'md'},
    {headline: 'Job Title', sort: true, breakpoint: 'md'},
    {headline: 'City', breakpoint: 'md'},
    {headline: 'Address', breakpoint: 'md'},
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  select: true,
  prettySelect: true,
  storeState: true,
  ajaxUrl: 'https://sensetence.com/vue-quintable-demo/data.php',
};

watch(indexes, (val) =&gt; {
  if (val === 'all') {
    delete filters.bigger;
    delete filters.smaller;
  } else if (val === 'bigger') {
    filters.bigger = true;
    delete filters.smaller;
  } else if (val === 'smaller') {
    filters.smaller = true;
    delete filters.bigger;
  }
});

watch(filters, () =&gt; {
  if (typeof filters.smaller === 'undefined' &amp;&amp; typeof filters.bigger === 'undefined') {
    indexes.value = 'all';
  } else if (filters.smaller) {
    indexes.value = 'smaller';
  } else if (filters.bigger) {
    indexes.value = 'bigger';
  }
});
&lt;/script&gt;`;
</script>
