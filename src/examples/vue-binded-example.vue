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
import { exampleCode } from "../components/code-block/example-code";
import source from "./vue-binded-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

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
</script>
