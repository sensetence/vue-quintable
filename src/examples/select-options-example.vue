<template>
  <div class="content">
    <alert-info
      >Pick who gets the newsletter. People who unsubscribed can't be selected;
      <code>showDisabledSelect</code> shows their checkbox greyed out.
      <code>defaultSelected</code> selects every row when the table loads,
      <code>keepSelect</code> keeps the selection while you search or
      sort.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="form-check form-switch mb-0">
        <input
          id="default-selected"
          v-model="defaultSelected"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="default-selected"
          >Select everyone at the start</label
        >
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="keep-select"
          v-model="keepSelect"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="keep-select"
          >Keep the selection on search and sort</label
        >
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="show-disabled-select"
          v-model="showDisabledSelect"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="show-disabled-select"
          >Show disabled checkboxes</label
        >
      </div>
    </div>

    <!-- table: defaultSelected applies when the table loads, so the switch loads it anew -->
    <vue-quintable
      :key="String(defaultSelected)"
      v-model:selected-rows="selectedRows"
      :config="config"
      :rows="rows"
    />

    <p class="mt-3" aria-live="polite">
      <template v-if="selectedRows.length">
        Send to {{ selectedRows.length }}:
        {{ selectedRows.map((row) => row.cells[0].text).join(", ") }}
      </template>
      <template v-else>Nobody selected yet.</template>
    </p>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./select-options-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const defaultSelected = ref(false);
const keepSelect = ref(true);
const showDisabledSelect = ref(true);
const selectedRows = ref<{ cells: { text: string }[] }[]>([]);

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name", sort: true },
    { headline: "Email", breakpoint: "md" },
    { headline: "Subscribed", sort: true },
  ],
  select: true,
  selectAll: true,
  // "select all" and defaultSelected cover every page, not just the visible one
  selectAllRows: true,
  search: true,
  pagination: 5,
  defaultSelected: defaultSelected.value,
  keepSelect: keepSelect.value,
}));

const people = [
  ["Ava Thompson", "ava.thompson@example.com", "Yes"],
  ["Noah Becker", "noah.becker@example.com", "Yes"],
  ["Lucía Fernández", "lucia.fernandez@example.com", "Unsubscribed"],
  ["Kenji Watanabe", "kenji.watanabe@example.com", "Yes"],
  ["Zara Ahmed", "zara.ahmed@example.com", "Yes"],
  ["Mateo Rossi", "mateo.rossi@example.com", "Unsubscribed"],
  ["Freya Lindqvist", "freya.lindqvist@example.com", "Yes"],
  ["Daniel Kowalski", "daniel.kowalski@example.com", "Yes"],
];

const rows = computed(() =>
  people.map(([name, email, subscribed]) => ({
    disableSelect: subscribed !== "Yes",
    showDisabledSelect: showDisabledSelect.value,
    cells: [{ text: name }, { text: email }, { text: subscribed }],
  })),
);
</script>
