<template>
  <div class="content">
    <alert-info
      >Change the value in the input to see effect on the table.</alert-info
    >

    <!-- table -->
    <vue-quintable :config="config" :rows="rows">
      <template #header>
        <input v-model="input" type="text" class="form-control" />
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const chance = new Chance();
const input = ref("New York");
const age = ref(18);

const config = {
  columns: [
    { headline: "Name" },
    { headline: "Age" },
    { headline: "Birth Place" },
    { headline: "Job" },
  ],
};

const initialRows = computed(() => {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push([
      { text: chance.name({ nationality: "en" }) },
      { text: chance.age() },
      { text: chance.city() },
      { text: chance.profession() },
    ]);
  }
  return rows;
});

const rows = computed(() => {
  return initialRows.value.map((row, index) => {
    if (index === 0) {
      row[1].text = age.value;
      row[2].text = input.value;
    }
    return row;
  });
});

// simulate dynamic aging
onMounted(() => {
  setInterval(() => {
    age.value = age.value >= 35 ? 18 : age.value + 1;
  }, 1000);
});

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
    &lt;template #header&gt;
      &lt;input type=&quot;text&quot; class=&quot;form-control&quot; v-model=&quot;input&quot;/&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed, onMounted} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const chance = new Chance();
const input = ref('New York');
const age = ref(18);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age'},
    {headline: 'Birth Place'},
    {headline: 'Job'},
  ],
};

const initialRows = computed(() =&gt; {
  const rows = [];
  for (let i = 0; i &lt; 10; i++) {
    rows.push([
      {text: chance.name({nationality: 'en'})},
      {text: chance.age()},
      {text: chance.city()},
      {text: chance.profession()},
    ]);
  }
  return rows;
});

const rows = computed(() =&gt; {
  return initialRows.value.map((row, index) =&gt; {
    if (index === 0) {
      row[1].text = age.value;
      row[2].text = input.value;
    }
    return row;
  });
});

// simulate dynamic aging
onMounted(() =&gt; {
  setInterval(() =&gt; {
    age.value = age.value &gt;= 35 ? 18 : age.value + 1;
  }, 1000);
});
&lt;/script&gt;`;
</script>
