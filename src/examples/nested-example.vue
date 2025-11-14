<template>
  <div class="content">
    <alert-info>This is a nested VueQuintable example.</alert-info>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows">
      <template #generated-cell-content="{ cell }">
        <div v-if="cell.type === 'nested'">
          <vue-quintable
            class="ms-4"
            :nested="true"
            :rows="rowsNested"
            :config="configNested"
          >
            <template #cell-complete="{ cell: innerCell }">
              <strong v-if="innerCell.type === 'strong'">{{
                innerCell.value
              }}</strong>
            </template>
          </vue-quintable>
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Chance from "chance";
import moment from "moment-timezone";
import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const chance = new Chance();

const config = {
  columns: [
    { headline: "Name" },
    { headline: "Age", breakpoint: "lg" },
    { headline: "Children", breakpoint: "all" },
    { headline: "Job" },
  ],
};

const rows = computed(() => {
  const output = [];
  for (let i = 0; i < 10; i++) {
    output.push([
      { text: chance.name({ nationality: "en" }) },
      { text: chance.age() },
      { type: "nested" },
      { text: chance.profession() },
    ]);
  }
  return output;
});

const configNested = {
  columns: [
    { headline: "Name", align: "center", sort: true },
    {
      headline: "Country of Birth",
      cellFormatter: (cell: any) => ({ value: "Country: " + cell.value }),
      align: "center",
    },
    { headline: "Time of Birth", breakpoint: "xl", align: "center" },
  ],
};

const rowsNested = computed(() => {
  const hours = Math.ceil(Math.random() * 24);
  const minutes = Math.ceil(Math.random() * 59);

  const m = moment.tz("Europe/Berlin");
  m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

  const timeB = m.format("hh:mm A");
  const timeNY = m.tz("America/New_York").format("hh:mm A");
  const timeH = m.tz("America/Chicago").format("hh:mm A");

  return [
    [
      { text: chance.name({ nationality: "en" }) },
      { value: chance.country({ full: true }) },
      { type: "strong", value: timeB },
    ],
    [
      { text: chance.name({ nationality: "en" }) },
      { value: chance.country({ full: true }) },
      { type: "strong", value: timeNY },
    ],
    [
      { text: chance.name({ nationality: "en" }) },
      { value: chance.country({ full: true }) },
      { type: "strong", value: timeH },
    ],
  ];
});

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
    &lt;template #generated-cell-content=&quot;{ cell }&quot;&gt;
      &lt;div v-if=&quot;cell.type === 'nested'&quot;&gt;
        &lt;vue-quintable
            class=&quot;ms-4&quot;
            :nested=&quot;true&quot;
            :rows=&quot;rowsNested&quot;
            :config=&quot;configNested&quot;
        &gt;
          &lt;template #cell-complete=&quot;{ cell }&quot;&gt;
            &lt;strong v-if=&quot;cell.type === 'strong'&quot;&gt;{{ cell.value }}&lt;/strong&gt;
          &lt;/template&gt;
        &lt;/vue-quintable&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {computed} from 'vue';
import Chance from 'chance';
import moment from 'moment-timezone';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const chance = new Chance();

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age', breakpoint: 'lg'},
    {headline: 'Children', breakpoint: 'all'},
    {headline: 'Job'},
  ],
};

const rows = computed(() =&gt; {
  const output = [];
  for (let i = 0; i &lt; 10; i++) {
    output.push([
      {text: chance.name({nationality: 'en'})},
      {text: chance.age()},
      {type: 'nested'},
      {text: chance.profession()},
    ]);
  }
  return output;
});

const configNested = {
  columns: [
    {headline: 'Name', align: 'center', sort: true},
    {
      headline: 'Country of Birth',
      cellFormatter: (cell: any) =&gt; ({value: 'Country: ' + cell.value}),
      align: 'center',
    },
    {headline: 'Time of Birth', breakpoint: 'xl', align: 'center'},
  ],
};

const rowsNested = computed(() =&gt; {
  const hours = Math.ceil(Math.random() * 24);
  const minutes = Math.ceil(Math.random() * 59);

  const m = moment.tz('Europe/Berlin');
  m.set({hour: hours, minute: minutes, second: 0, millisecond: 0});

  const timeB = m.format('hh:mm A');
  const timeNY = m.tz('America/New_York').format('hh:mm A');
  const timeH = m.tz('America/Chicago').format('hh:mm A');

  return [
    [
      {text: chance.name({nationality: 'en'})},
      {value: chance.country({full: true})},
      {type: 'strong', value: timeB},
    ],
    [
      {text: chance.name({nationality: 'en'})},
      {value: chance.country({full: true})},
      {type: 'strong', value: timeNY},
    ],
    [
      {text: chance.name({nationality: 'en'})},
      {value: chance.country({full: true})},
      {type: 'strong', value: timeH},
    ],
  ];
});
&lt;/script&gt;`;
</script>
