<template>
  <div class="content">
    <alert-info>
      Do some filtering/sorting/selecting and then reload the page, state stays the same.
    </alert-info>

    <!-- table -->
    <vue-quintable
        :config="config"
        :filters.sync="filters"
        :selected-rows.sync="selected"
        :identifier="identifier"
    >
      <template #header>
        <v-select
            v-model="indexes"
            :options="indexesOptions"
            :reduce="(x) => x.value"
            :clearable="false"
            class="mb-3"
        />
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue';
import VueQuintable from '../components/table/vue-quintable.vue';
import AlertInfo from '../components/alert/alert-info.vue';
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const identifier = 'stored-state-table-ajax';

const indexesOptions = [
  {label: 'All', value: 'all'},
  {label: 'Bigger than 100', value: 'bigger'},
  {label: 'Smaller than 100', value: 'smaller'},
];

const indexes = ref<'all' | 'bigger' | 'smaller'>('all');
const filters = reactive<Record<string, any>>({});
const selected = ref<any[]>([]);

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

watch(indexes, (val) => {
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

watch(filters, () => {
  if (typeof filters.smaller === 'undefined' && typeof filters.bigger === 'undefined') {
    indexes.value = 'all';
  } else if (filters.smaller) {
    indexes.value = 'smaller';
  } else if (filters.bigger) {
    indexes.value = 'bigger';
  }
});

// example code
const code = ``;
</script>