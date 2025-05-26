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
        :rows="rows"
        :identifier="identifier"
    >
      <template #header>
        <v-select
            v-model="active"
            :options="activeOptions"
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
import {ref, reactive, watch, onMounted} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';
import AlertInfo from '../components/alert/alert-info.vue';
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const identifier = 'stored-state-table';
const activeOptions = [
  {label: 'All', value: 'both'},
  {label: 'Only Active', value: true},
  {label: 'Only Not Active', value: false},
];

const active = ref<'both' | boolean>('both');
const filters = reactive<Record<string, any>>({});
const selected = ref<any[]>([]);
const rows = ref<any[]>([]);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age', sort: true},
    {headline: 'Birth Place'},
    {headline: 'Job'},
    {headline: 'Active'},
  ],
  pagination: 5,
  selectAllRows: true,
  pageRange: 3,
  rowsSelect: true,
  search: true,
  select: true,
  prettySelect: true,
  storeState: true,
};

onMounted(() => {
  let storedRows: any[] | null = null;
  try {
    const stored = localStorage.getItem(`${identifier}-stored-rows`);
    storedRows = stored ? JSON.parse(stored) : null;
  } catch (e) {
  }

  if (!storedRows) {
    const chance = new Chance();
    const tempRows = [];
    for (let i = 0; i < 250; i++) {
      const isActive = Math.random() >= 0.5;
      tempRows.push({
        filters: {active: isActive},
        cells: [
          {text: chance.name({nationality: 'en'})},
          {text: chance.age()},
          {text: chance.city()},
          {text: chance.profession()},
          {text: isActive ? 'Yes' : 'No'},
        ],
      });
    }
    rows.value = tempRows;
    try {
      localStorage.setItem(`${identifier}-stored-rows`, JSON.stringify(tempRows));
    } catch (e) {
    }
  } else {
    rows.value = storedRows;
  }
});

watch(active, (val) => {
  if (val === 'both') {
    delete filters.active;
  } else {
    filters.active = val;
  }
});

watch(filters, () => {
  if (typeof filters.active === 'undefined') {
    active.value = 'both';
  } else if (filters.active !== active.value) {
    active.value = filters.active;
  }
});

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      :config=&quot;config&quot;
      :filters.sync=&quot;filters&quot;
      :selected-rows.sync=&quot;selected&quot;
      :rows=&quot;rows&quot;
      :identifier=&quot;identifier&quot;
  &gt;
    &lt;template #header&gt;
      &lt;v-select
          v-model=&quot;active&quot;
          :options=&quot;activeOptions&quot;
          :reduce=&quot;(x) =&gt; x.value&quot;
          :clearable=&quot;false&quot;
          class=&quot;mb-3&quot;
      /&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, reactive, watch, onMounted} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const identifier = 'stored-state-table';
const activeOptions = [
  {label: 'All', value: 'both'},
  {label: 'Only Active', value: true},
  {label: 'Only Not Active', value: false},
];

const active = ref&lt;'both' | boolean&gt;('both');
const filters = reactive&lt;Record&lt;string, any&gt;&gt;({});
const selected = ref&lt;any[]&gt;([]);
const rows = ref&lt;any[]&gt;([]);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age', sort: true},
    {headline: 'Birth Place'},
    {headline: 'Job'},
    {headline: 'Active'},
  ],
  pagination: 5,
  selectAllRows: true,
  pageRange: 3,
  rowsSelect: true,
  search: true,
  select: true,
  prettySelect: true,
  storeState: true,
};

onMounted(() =&gt; {
  let storedRows: any[] | null = null;
  try {
    const stored = localStorage.getItem(\`${identifier}-stored-rows\`);
    storedRows = stored ? JSON.parse(stored) : null;
  } catch (e) {
  }

  if (!storedRows) {
    const chance = new Chance();
    const tempRows = [];
    for (let i = 0; i &lt; 250; i++) {
      const isActive = Math.random() &gt;= 0.5;
      tempRows.push({
        filters: {active: isActive},
        cells: [
          {text: chance.name({nationality: 'en'})},
          {text: chance.age()},
          {text: chance.city()},
          {text: chance.profession()},
          {text: isActive ? 'Yes' : 'No'},
        ],
      });
    }
    rows.value = tempRows;
    try {
      localStorage.setItem(\`${identifier}-stored-rows\`, JSON.stringify(tempRows));
    } catch (e) {
    }
  } else {
    rows.value = storedRows;
  }
});

watch(active, (val) =&gt; {
  if (val === 'both') {
    delete filters.active;
  } else {
    filters.active = val;
  }
});

watch(filters, () =&gt; {
  if (typeof filters.active === 'undefined') {
    active.value = 'both';
  } else if (filters.active !== active.value) {
    active.value = filters.active;
  }
});
&lt;/script&gt;`
</script>