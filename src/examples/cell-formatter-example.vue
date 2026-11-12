<template>
  <div class="content">
    <alert-info
      >Cells will be formatted by custom formatting functions.</alert-info
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
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./cell-formatter-example.vue?raw";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

const showCode = ref(false);
const code = exampleCode(source);

// table data
const config = {
  columns: [
    {
      headline: "Name",
      cellFormatter: (cell: any) => {
        return "Name: " + cell.content.name;
      },
    },
    {
      headline: "Age",
      cellFormatter: (cell: any) => {
        return {
          value: "<strong>" + cell.content.age + "</strong>",
          type: "html",
        };
      },
    },
    {
      headline: "Birth Place",
      cellFormatter: (cell: any) => {
        return cell.content.city;
      },
    },
    {
      headline: "Job",
      cellFormatter: (cell: any) => {
        return cell.content.profession;
      },
    },
  ],
};

const rows = computed(() => {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    const row = {
      name: chance.name({ nationality: "en" }),
      age: chance.age(),
      city: chance.city(),
      profession: chance.profession(),
    };

    rows.push([
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
      },
    ]);
  }

  return rows;
});
</script>
