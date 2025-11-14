<template>
  <div class="content">
    <alert-info
      >Filter rows by adjusting filter and settings switches.</alert-info
    >

    <!-- table -->
    <vue-quintable
      :filter-groups="filterGroups"
      :filters="filters"
      :config="config"
      :rows="rows"
      @filtered:rows="visibleRows"
    >
      <template #header>
        <strong class="mb-2">Filters:</strong>

        <div class="clearfix py-2">
          <quintable-p-check
            v-model="activeFilter"
            class="p-switch"
            :value="true"
            >Active</quintable-p-check
          >
        </div>

        <div class="clearfix py-2">
          <quintable-p-check
            v-model="printableFilter"
            class="p-switch"
            :value="true"
            >Printable</quintable-p-check
          >
        </div>

        <div class="clearfix py-2">
          <quintable-p-check
            v-model="dynamicFilter"
            class="p-switch"
            :value="true"
            >Regex for name (/Ma/)</quintable-p-check
          >
        </div>

        <hr />
        <strong class="mb-2">Settings:</strong>
        <div class="clearfix py-2">
          <quintable-p-check
            v-model="filterGroupsActive"
            class="p-icon p-smooth"
            :value="true"
          >
            Toggle Filter Groups
            <template #extra>
              <span
                ><quintable-font-awesome-icon
                  v-if="filterGroupsActive"
                  icon="check"
                  class="text-success icon-check"
              /></span>
            </template>
          </quintable-p-check>
        </div>

        <div class="card">
          <div class="card-body">
            <quintable-p-radio
              v-model="config.filterRelation"
              value="AND"
              name="radio"
              color="info"
              >AND filter relation</quintable-p-radio
            >
            <span class="mx-2"></span>
            <quintable-p-radio
              v-model="config.filterRelation"
              value="OR"
              name="radio"
              color="info"
              >OR filter relation</quintable-p-radio
            >
          </div>
        </div>
        <hr />
      </template>

      <template #footer>
        <div class="mb-3 alert alert-info">
          <em>Number of Rows:</em> <strong>{{ number }}</strong>
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const chance = new Chance();
const number = ref(0);
const activeFilter = ref(false);
const printableFilter = ref(false);
const dynamicFilter = ref(false);
const filterGroupsActive = ref(false);

const config = reactive({
  columns: [
    { headline: "Name" },
    { headline: "Age" },
    { headline: "Printable" },
    { headline: "Active" },
  ],
  search: true,
  useFuzzySearch: true,
  searchLength: 3,
  filterRelation: "AND",
  searchPlaceholder: "Search rows...",
});

const filters = reactive<Record<string, any>>({});

const filterGroupsDefaults = [
  {
    items: [
      {
        items: [{ name: "name" }, { name: "active" }],
        relation: "OR",
      },
      {
        items: [{ name: "printable" }],
      },
    ],
    relation: "AND",
  },
];

const filterGroups = computed(() => {
  return filterGroupsActive.value ? filterGroupsDefaults : [];
});

const rows = computed(() => {
  const result = [];

  for (let i = 0; i < 50; i++) {
    const printable = Math.random() >= 0.5;
    const active = Math.random() >= 0.5;
    const name = chance.name({ nationality: "en" });
    const age = chance.age();

    result.push({
      keywords: ["Row " + i],
      cells: [
        { text: name },
        { text: age },
        {
          component: {
            name: "quintable-font-awesome-icon",
            props: {
              icon: printable ? "check" : "times",
            },
          },
        },
        {
          component: {
            name: "quintable-font-awesome-icon",
            props: {
              icon: active ? "check" : "times",
            },
          },
        },
      ],
      filters: {
        active,
        printable,
        name,
      },
    });
  }

  return result;
});

// Watchers to reactively apply/remove filters
watch(activeFilter, (val) => {
  if (val) {
    filters.active = true;
  } else {
    delete filters.active;
  }
});

watch(printableFilter, (val) => {
  if (val) {
    filters.printable = true;
  } else {
    delete filters.printable;
  }
});

watch(dynamicFilter, (val) => {
  if (val) {
    filters.name = {
      operator: "matches",
      values: new RegExp("Ma"),
    };
  } else {
    delete filters.name;
  }
});

function visibleRows(rows: any[]) {
  number.value = rows.length;
}

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      :filter-groups=&quot;filterGroups&quot;
      :filters=&quot;filters&quot;
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
      @filtered:rows=&quot;visibleRows&quot;
  &gt;
    &lt;template #header&gt;
      &lt;strong class=&quot;mb-2&quot;&gt;Filters:&lt;/strong&gt;

      &lt;div class=&quot;clearfix py-2&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;activeFilter&quot; :value=&quot;true&quot;&gt;Active&lt;/quintable-p-check&gt;
      &lt;/div&gt;

      &lt;div class=&quot;clearfix py-2&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;printableFilter&quot; :value=&quot;true&quot;&gt;Printable&lt;/quintable-p-check&gt;
      &lt;/div&gt;

      &lt;div class=&quot;clearfix py-2&quot;&gt;
        &lt;quintable-p-check class=&quot;p-switch&quot; v-model=&quot;dynamicFilter&quot; :value=&quot;true&quot;&gt;Regex for name (/Ma/)&lt;/quintable-p-check&gt;
      &lt;/div&gt;

      &lt;hr/&gt;
      &lt;strong class=&quot;mb-2&quot;&gt;Settings:&lt;/strong&gt;

      &lt;div class=&quot;clearfix py-2&quot;&gt;
        &lt;quintable-p-check class=&quot;p-icon p-smooth&quot; v-model=&quot;filterGroupsActive&quot; :value=&quot;true&quot;&gt;
          Toggle Filter Groups
          &lt;template #extra&gt;
            &lt;span&gt;&lt;quintable-font-awesome-icon
                v-if=&quot;filterGroupsActive&quot;
                icon=&quot;check&quot;
                class=&quot;text-success icon-check&quot;
            /&gt;&lt;/span&gt;
          &lt;/template&gt;
        &lt;/quintable-p-check&gt;
      &lt;/div&gt;

      &lt;div class=&quot;card&quot;&gt;
        &lt;div class=&quot;card-body&quot;&gt;
          &lt;quintable-p-radio value=&quot;AND&quot; name=&quot;radio&quot; color=&quot;info&quot; v-model=&quot;config.filterRelation&quot;&gt;AND filter relation&lt;/quintable-p-radio&gt;
          &lt;span class=&quot;mx-2&quot;&gt;&lt;/span&gt;
          &lt;quintable-p-radio value=&quot;OR&quot; name=&quot;radio&quot; color=&quot;info&quot; v-model=&quot;config.filterRelation&quot;&gt;OR filter relation&lt;/quintable-p-radio&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;hr/&gt;
    &lt;/template&gt;

    &lt;template #footer&gt;
      &lt;div class=&quot;mb-3 alert alert-info&quot;&gt;
        &lt;em&gt;Number of Rows:&lt;/em&gt; &lt;strong&gt;{{ number }}&lt;/strong&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed, reactive, watch} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const chance = new Chance();
const number = ref(0);
const activeFilter = ref(false);
const printableFilter = ref(false);
const dynamicFilter = ref(false);
const filterGroupsActive = ref(false);

const config = reactive({
  columns: [
    {headline: 'Name'},
    {headline: 'Age'},
    {headline: 'Printable'},
    {headline: 'Active'},
  ],
  search: true,
  useFuzzySearch: true,
  searchLength: 3,
  filterRelation: 'AND',
  searchPlaceholder: 'Search rows...',
});

const filters = reactive&lt;Record&lt;string, any&gt;&gt;({});

const filterGroupsDefaults = [
  {
    items: [
      {
        items: [{name: 'name'}, {name: 'active'}],
        relation: 'OR',
      },
      {
        items: [{name: 'printable'}],
      },
    ],
    relation: 'AND',
  },
];

const filterGroups = computed(() =&gt; {
  return filterGroupsActive.value ? filterGroupsDefaults : [];
});

const rows = computed(() =&gt; {
  const result = [];

  for (let i = 0; i &lt; 50; i++) {
    const printable = Math.random() &gt;= 0.5;
    const active = Math.random() &gt;= 0.5;
    const name = chance.name({nationality: 'en'});
    const age = chance.age();

    result.push({
      keywords: ['Row ' + i],
      cells: [
        {text: name},
        {text: age},
        {
          component: {
            name: 'quintable-font-awesome-icon',
            props: {
              icon: printable ? 'check' : 'times',
            },
          },
        },
        {
          component: {
            name: 'quintable-font-awesome-icon',
            props: {
              icon: active ? 'check' : 'times',
            },
          },
        },
      ],
      filters: {
        active,
        printable,
        name,
      },
    });
  }

  return result;
});

// Watchers to reactively apply/remove filters
watch(activeFilter, (val) =&gt; {
  if (val) {
    filters.active = true;
  } else {
    delete filters.active;
  }
});

watch(printableFilter, (val) =&gt; {
  if (val) {
    filters.printable = true;
  } else {
    delete filters.printable;
  }
});

watch(dynamicFilter, (val) =&gt; {
  if (val) {
    filters.name = {
      operator: 'matches',
      values: new RegExp('Ma'),
    };
  } else {
    delete filters.name;
  }
});

function visibleRows(rows: any[]) {
  number.value = rows.length;
}
&lt;/script&gt;

&lt;style scoped&gt;
.icon-check {
  padding: 3px;
  position: absolute;
  top: 50%;
  left: 9px;
  transform: translateX(-50%) translateY(-50%);
}
&lt;/style&gt;`;
</script>

<style scoped>
.icon-check {
  padding: 3px;
  position: absolute;
  top: 50%;
  left: 9px;
  transform: translateX(-50%) translateY(-50%);
}
</style>
