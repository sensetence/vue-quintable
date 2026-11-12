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
import { exampleCode } from "../components/code-block/example-code";
import source from "./filter-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

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
