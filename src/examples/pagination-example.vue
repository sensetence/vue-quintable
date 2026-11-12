<template>
  <div class="content">
    <alert-info>Switch pages by clicking on pagination below.</alert-info>

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
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./pagination-example.vue?raw";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

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
      sort: true,
    },
    {
      headline: "Birth Place",
      breakpoint: "md",
    },
    {
      headline: "Job",
    },
  ],
  pagination: 5,
  pageRange: 3,
  rowsSelect: true,
  disallowAllOption: false,
};

const rows = computed(() => {
  let count = 2000;
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
