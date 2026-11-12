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
            <template #generated-cell-complete="{ cell: innerCell }">
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
import { exampleCode } from "../components/code-block/example-code";
import source from "./nested-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

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
</script>
