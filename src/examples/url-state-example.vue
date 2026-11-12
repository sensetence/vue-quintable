<template>
  <div class="content">
    <alert-info
      >Sort, search or switch pages: the table writes its state into the page's
      address (<code>urlState</code>), so a link to this page opens the same
      view. The parameters start with the table's
      <code>identifier</code>.</alert-info
    >

    <p class="mb-2">
      The table's part of the address:
      <code class="url-state">{{ params || "(nothing yet)" }}</code>
    </p>

    <!-- table -->
    <vue-quintable
      :config="config"
      :rows="rows"
      identifier="staff"
      @update:page="readAddress"
      @update:sort="readAddress"
      @update:search="readAddress"
      @update:rows-per-page="readAddress"
    />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./url-state-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

// the parameters the table wrote (it writes them after the event)
const params = ref("");
async function readAddress() {
  await nextTick();
  params.value = [...new URLSearchParams(window.location.search)]
    .filter(([key]) => key.startsWith("staff-"))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
onMounted(readAddress);

// table data
const config = {
  columns: [
    { headline: "Name", sort: true },
    { headline: "Department", sort: true },
    { headline: "Since", sort: true, align: "end" },
  ],
  urlState: true,
  search: true,
  pagination: 5,
  rowsSelect: true,
};

const staff = [
  ["Ada Moreau", "Finance", 2014],
  ["Ben Carter", "Sales", 2019],
  ["Chloe Weiss", "Engineering", 2016],
  ["Dev Patel", "Engineering", 2021],
  ["Elena Rossi", "Marketing", 2018],
  ["Felix Wagner", "Sales", 2012],
  ["Grace Kim", "Legal", 2020],
  ["Hugo Lambert", "Engineering", 2015],
  ["Iris Novak", "Finance", 2022],
  ["Jonas Berg", "Marketing", 2017],
  ["Kira Sato", "Sales", 2023],
  ["Liam Walsh", "Engineering", 2013],
];

const rows = staff.map(([name, department, since]) => [
  { text: name },
  { text: department },
  { text: since },
]);
</script>
