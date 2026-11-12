<template>
  <div class="content">
    <alert-info
      >With <code>accessible: true</code> the keyboard reaches everything: Tab
      moves to the sortable headings (Enter or Space sorts), the row toggles,
      the checkboxes and the page links. A screen reader hears how a column is
      sorted, whether a row's details are open and what each checkbox
      selects.</alert-info
    >

    <div class="form-check form-switch mb-3">
      <input
        id="accessible"
        v-model="accessible"
        class="form-check-input"
        type="checkbox"
      />
      <label class="form-check-label" for="accessible">Accessible</label>
    </div>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

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
import source from "./accessibility-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const accessible = ref(true);

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name", sort: true },
    { headline: "Role", sort: true },
    { headline: "Email", breakpoint: "md" },
    { headline: "Team", breakpoint: "all" },
  ],
  accessible: accessible.value,
  select: true,
  selectAll: true,
  search: true,
  pagination: 5,
  // the names the table gives its controls; English unless set
  selectRowLabel: "Select person",
  selectAllLabel: "Select everyone on this page",
}));

const people = [
  ["Amara Okafor", "Product manager", "Platform"],
  ["Lukas Brandt", "Engineer", "Platform"],
  ["Sofia Marino", "Designer", "Growth"],
  ["Yuki Sato", "Engineer", "Payments"],
  ["Daniel Novak", "Data analyst", "Growth"],
  ["Priya Iyer", "Engineer", "Payments"],
  ["Oliver Hughes", "Support lead", "Customer care"],
  ["Ines Duarte", "Designer", "Platform"],
  ["Mateo Ruiz", "Engineer", "Growth"],
  ["Hanna Lindgren", "Recruiter", "People"],
  ["Kwame Mensah", "Engineer", "Payments"],
  ["Lea Fischer", "Product manager", "Growth"],
];

const rows = people.map(([name, role, team]) => [
  { text: name },
  { text: role },
  { text: name.toLowerCase().replace(" ", ".") + "@example.com" },
  { text: team },
]);
</script>
