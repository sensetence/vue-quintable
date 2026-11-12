<template>
  <div class="content">
    <alert-info
      >Hover and click on headlines for sorting. The arrows show while the
      header row is hovered, or always with
      <code>alwaysShowSortIcons</code>.</alert-info
    >

    <div class="form-check form-switch mb-3">
      <input
        id="always-show-sort-icons"
        v-model="alwaysShowSortIcons"
        class="form-check-input"
        type="checkbox"
      />
      <label class="form-check-label" for="always-show-sort-icons"
        >Always show sort icons</label
      >
    </div>

    <!-- table -->
    <vue-quintable :sort-order="sortOrder" :config="config" :rows="rows" />

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
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./sort-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);
const alwaysShowSortIcons = ref(false);

// table data
const config = computed(() => ({
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
      sort: true,
    },
    {
      headline: "Job",
      sort: true,
      firstSortDirection: "DESC",
    },
  ],
  multiSort: false,
  multiSortSelect: true,
  pageSort: false,
  pageSortSelect: true,
  pagination: 5,
  search: true,
  alwaysShowSortIcons: alwaysShowSortIcons.value,
}));

const sortOrder = [
  {
    index: 1,
    asc: false,
  },
];

const rows = computed(() => {
  let count = 30;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    const randSortValue = Math.ceil(Math.random() * 10);

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
        html:
          '<span class="me-2">' +
          chance.profession() +
          "</span><em>" +
          "[" +
          randSortValue +
          "]</em>",
        sortValue: randSortValue,
      },
    ]);
  }

  return rows;
});
</script>
