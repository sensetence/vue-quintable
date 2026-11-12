<template>
  <div class="content">
    <alert-info
      >The table starts sorted by due date (<code>sort-order</code>). Dates sort
      by time, not by their text. Tasks without a date stay at the bottom in
      both directions: <code>computeSortValue</code> gets the active sorts and
      returns a value per direction. Priority sorts by rank, highest first
      (<code>firstSortDirection</code>); hover its heading for a
      hint.</alert-info
    >

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" :sort-order="[1]" />

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
import source from "./custom-sort-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

// table data
const config = {
  columns: [
    { headline: "Task" },
    { headline: "Due", sort: true },
    {
      headline: "Priority",
      title: "High, medium or low",
      sort: true,
      firstSortDirection: "DESC",
    },
    { headline: "Owner", sort: true, breakpoint: "sm" },
  ],
};

const RANK: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
const DUE_COLUMN = 1;

// The active sorts, by column index
type Sorts = Record<string, { asc: boolean }>;

const tasks = [
  {
    task: "Renew the SSL certificate",
    due: "2026-11-20",
    priority: "High",
    owner: "Nadia",
  },
  {
    task: "Write the release notes",
    due: "2026-12-02",
    priority: "Medium",
    owner: "Oskar",
  },
  {
    task: "Clean up old feature flags",
    due: "",
    priority: "Low",
    owner: "Mira",
  },
  {
    task: "Plan the team offsite",
    due: "2027-01-15",
    priority: "Low",
    owner: "Nadia",
  },
  {
    task: "Fix the login redirect",
    due: "2026-11-14",
    priority: "High",
    owner: "Oskar",
  },
  {
    task: "Update the onboarding guide",
    due: "",
    priority: "Medium",
    owner: "Mira",
  },
  {
    task: "Review the Q4 budget",
    due: "2026-11-28",
    priority: "Medium",
    owner: "Leon",
  },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

const rows = tasks.map(({ task, due, priority, owner }) => [
  { text: task },
  due
    ? { text: dateFormat.format(new Date(due)), sortValue: Date.parse(due) }
    : {
        html: '<span class="text-body-secondary">No date</span>',
        // last in either direction
        computeSortValue: (sorts: Sorts) =>
          sorts[DUE_COLUMN]?.asc === false ? -Infinity : Infinity,
      },
  { text: priority, sortValue: RANK[priority] },
  { text: owner },
]);
</script>
