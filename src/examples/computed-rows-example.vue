<template>
  <div class="content">
    <alert-info
      >Rows are calculated and passed as a computed property.</alert-info
    >

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Chance from "chance";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./computed-rows-example.vue?raw";
import CodeBlock from "../components/code-block/code-block.vue";

const showCode = ref(false);
const code = exampleCode(source);

// table data
const config = {
  columns: [
    {
      headline: "Name",
    },
    {
      headline: "Age",
    },
    {
      headline: "Birth Place",
    },
    {
      headline: "Job",
    },
  ],
};

const rows = computed(() => {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    rows.push([
      {
        text: chance.name({ nationality: "en" }),
      },
      {
        text: chance.age(),
      },
      {
        text: chance.city(),
      },
      {
        text: chance.profession(),
      },
    ]);
  }

  return rows;
});
</script>
