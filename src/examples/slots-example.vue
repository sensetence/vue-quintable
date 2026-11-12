<template>
  <div class="content">
    <alert-info>Customized with configured slots.</alert-info>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows">
      <!-- cell-content slot -->
      <template #cell-content="{ cell }">
        <div class="btn btn-sm btn-info" @click.stop="alertMessage(cell.text)">
          {{ cell.text }}
        </div>
      </template>

      <!-- generated-cell-content slot -->
      <template #generated-cell-content="{ cell }">
        <div
          class="btn btn-sm btn-warning"
          @click.stop="alertMessage(cell.text)"
        >
          {{ cell.text }}
        </div>
      </template>

      <!-- sticky-cell-content slot -->
      <template #sticky-cell-content="{ cell }">
        <div
          class="btn btn-sm btn-danger"
          @click.stop="alertMessage(cell.text)"
        >
          {{ cell.text }}
        </div>
      </template>

      <!-- header slot -->
      <template #header>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4 class="m-0">VueQuintable</h4>
          </div>
        </div>
      </template>

      <!-- before-search slot -->
      <template #before-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100 text-center">
            Button before search
          </button>
        </div>
      </template>

      <!-- custom search slot -->
      <template #search="{ placeholder, value, setSearchQuery }">
        <div class="col-md-8">
          <input
            type="search"
            :value="value"
            :placeholder="placeholder"
            class="form-control"
            @input="setSearchQuery(($event.target as HTMLInputElement).value)"
          />
        </div>
      </template>

      <!-- after-search slot -->
      <template #after-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-secondary w-100 text-center">
            Button after search
          </button>
        </div>
      </template>

      <!-- after-search-container slot -->
      <template #after-search-container>
        <hr />
        <quintable-p-check v-model="showRows" class="p-switch"
          >Toggle Rows</quintable-p-check
        >
        <hr />
      </template>

      <!-- footer slot -->
      <template #footer>
        <div class="text-center py-3 px-3 mt-3 mb-3 bg-info text-white">
          Copyright © 2021 by Sensetence UG (haftungsbeschränkt)
        </div>
      </template>

      <!-- no-results slot -->
      <template #no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./slots-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

// table data
const chance = new Chance();
const showRows = ref(true);

const config = {
  columns: [
    { headline: "Name" },
    { headline: "Age" },
    { headline: "Birth Place", sticky: true },
    { headline: "Job", breakpoint: "md" },
  ],
  search: true,
  searchClass: "col-md-8",
  pagination: true,
};

const rows = computed(() => {
  if (!showRows.value) return [];

  const data = [];
  for (let i = 0; i < 500; i++) {
    data.push([
      { text: chance.name({ nationality: "en" }) },
      { text: chance.age() },
      { text: chance.city() },
      { text: chance.profession(), type: "nested" },
    ]);
  }
  return data;
});

function alertMessage(text: string) {
  alert("I clicked the slot " + text);
}
</script>
