<template>
  <div class="content">
    <alert-info>Toggle switches to hide/show columns.</alert-info>

    <!-- table -->
    <vue-quintable
      :dynamic-config="dynamicConfig"
      :config="config"
      :rows="rows"
    >
      <template #header>
        <div class="mb-3">
          <quintable-p-check v-model="hideAge" class="p-switch"
            >Hide Age Column</quintable-p-check
          >
        </div>
        <div class="mb-3">
          <quintable-p-check v-model="hideJob" class="p-switch"
            >Hide Job Column</quintable-p-check
          >
        </div>
        <div class="mb-3">
          <quintable-p-check v-model="hideColumns" class="p-switch">
            Hide empty columns automatically
          </quintable-p-check>
        </div>
        <div class="mb-3">
          <quintable-v-select
            v-model="ignoreSortingColumns"
            :reduce="(option: any) => option.value"
            :options="ignoreOptions"
            :clearable="false"
          />
        </div>
      </template>

      <template #cell-content="{ cell }">
        <div v-if="cell.type === 'word'">{{ cell.value }}</div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const chance = new Chance();
const hideAge = ref(false);
const hideJob = ref(false);
const hideColumns = ref(true);
const ignoreSortingColumns = ref("none");
const dynamicConfig = ref(false);

const ignoreOptions = [
  { value: "none", label: "Don't hide empty sorting columns" },
  { value: "active", label: "Don't hide active empty sorting columns" },
  { value: "all", label: "Hide empty sorting columns" },
];

function setConfigDynamicForNextTick() {
  dynamicConfig.value = true;
  nextTick(() => {
    dynamicConfig.value = false;
  });
}

const config = computed(() => ({
  columns: [
    { headline: "Name", ignoreEmpty: true },
    { headline: "Age", hidden: hideAge.value, breakpoint: "lg" },
    { headline: "Birth Place", breakpoint: "md", sort: true },
    { headline: "Birth country", breakpoint: "lg" },
    { headline: "Random Word", breakpoint: "xl" },
    { headline: "Job", hidden: hideJob.value, sticky: true },
  ],
  hideEmptyColumns: hideColumns.value,
  ignoreSortEmptyColumns: ignoreSortingColumns.value,
  pagination: 10,
}));

// Reactive rows
const rows = computed(() => {
  const data = [];

  for (let i = 0; i < 20; i++) {
    const city = i < 13 ? "" : chance.city();
    const country = i >= 9 ? "" : chance.country();
    const name = i > 7 ? "" : chance.name({ nationality: "en" });
    const alwaysHide = i < 15;

    data.push([
      { text: name },
      { text: chance.age() },
      { text: city },
      { text: country },
      { type: "word", text: "asd", isEmpty: alwaysHide, value: chance.word() },
      { text: chance.profession() },
    ]);
  }

  return data;
});

watch(
  [hideColumns, hideAge, hideJob, ignoreSortingColumns],
  setConfigDynamicForNextTick,
);

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable :dynamic-config=&quot;dynamicConfig&quot; :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
    &lt;template #header&gt;
      &lt;div class=&quot;mb-3&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;hideAge&quot;&gt;Hide Age Column&lt;/quintable-p-check&gt;
      &lt;/div&gt;
      &lt;div class=&quot;mb-3&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;hideJob&quot;&gt;Hide Job Column&lt;/quintable-p-check&gt;
      &lt;/div&gt;
      &lt;div class=&quot;mb-3&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;hideColumns&quot;&gt;
          Hide empty columns automatically
        &lt;/quintable-p-check&gt;
      &lt;/div&gt;
      &lt;div class=&quot;mb-3&quot;&gt;
        &lt;quintable-v-select
            v-model=&quot;ignoreSortingColumns&quot;
            :reduce=&quot;(option) =&gt; option.value&quot;
            :options=&quot;ignoreOptions&quot;
            :clearable=&quot;false&quot;
        /&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;template #cell-content=&quot;{ cell }&quot;&gt;
      &lt;div v-if=&quot;cell.type === 'word'&quot;&gt;{{ cell.value }}&lt;/div&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed, watch, nextTick} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const chance = new Chance();
const hideAge = ref(false);
const hideJob = ref(false);
const hideColumns = ref(true);
const ignoreSortingColumns = ref('none');
const dynamicConfig = ref(false);

const ignoreOptions = [
  {value: 'none', label: &quot;Don't hide empty sorting columns&quot;},
  {value: 'active', label: &quot;Don't hide active empty sorting columns&quot;},
  {value: 'all', label: 'Hide empty sorting columns'},
];

function setConfigDynamicForNextTick() {
  dynamicConfig.value = true;
  nextTick(() =&gt; {
    dynamicConfig.value = false;
  });
}

const config = computed(() =&gt; ({
  columns: [
    {headline: 'Name', ignoreEmpty: true},
    {headline: 'Age', hidden: hideAge.value, breakpoint: 'lg'},
    {headline: 'Birth Place', breakpoint: 'md', sort: true},
    {headline: 'Birth country', breakpoint: 'lg'},
    {headline: 'Random Word', breakpoint: 'xl'},
    {headline: 'Job', hidden: hideJob.value, sticky: true},
  ],
  hideEmptyColumns: hideColumns.value,
  ignoreSortEmptyColumns: ignoreSortingColumns.value,
  pagination: 10,
}));

// Reactive rows
const rows = computed(() =&gt; {
  const data = [];

  for (let i = 0; i &lt; 20; i++) {
    const city = i &lt; 13 ? '' : chance.city();
    const country = i &gt;= 9 ? '' : chance.country();
    const name = i &gt; 7 ? '' : chance.name({nationality: 'en'});
    const alwaysHide = i &lt; 15;

    data.push([
      {text: name},
      {text: chance.age()},
      {text: city},
      {text: country},
      {type: 'word', text: 'asd', isEmpty: alwaysHide, value: chance.word()},
      {text: chance.profession()},
    ]);
  }

  return data;
});

watch([hideColumns, hideAge, hideJob, ignoreSortingColumns], setConfigDynamicForNextTick);
&lt;/script&gt;`;
</script>
