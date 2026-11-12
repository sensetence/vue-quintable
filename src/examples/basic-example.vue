<template>
  <div class="content">
    <alert-info>Just a simple table.</alert-info>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./basic-example.vue?raw";

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

const rows = [
  [
    {
      html: "<em>John Doe</em>",
    },
    {
      text: 40,
    },
    {
      text: "New York",
    },
    {
      text: "CFO",
    },
  ],
  [
    {
      text: "Mia Wong",
      classes: "text-primary",
    },
    {
      text: 50,
    },
    {
      text: "Beijing",
    },
    {
      text: "CEO",
    },
  ],
  [
    {
      text: "Peter Stanbridge",
    },
    {
      text: 18,
    },
    {
      text: "London",
    },
    {
      text: "Trainee",
      align: "end",
    },
  ],
  {
    cells: [
      {
        text: "Natalie Lee-Walsh",
      },
      {
        text: 25,
      },
      {
        text: "Dublin",
      },
      {
        text: "Managing Director",
      },
    ],
    classes: "text-red",
  },
];
</script>

<style lang="scss">
.text-red td {
  color: red;
}
</style>
