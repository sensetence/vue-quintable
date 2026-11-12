<template>
  <div class="content">
    <alert-info
      >The search starts with "Ber" from <code>initial-search-term</code>. Rows
      also match their <code>keywords</code>, which the table does not show:
      search for Bob, Liz or Sasha. Fuzzy search forgives a missing letter:
      "Wiliam" finds William.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="form-check form-switch mb-0">
        <input
          id="fuzzy-search"
          v-model="useFuzzySearch"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="fuzzy-search">Fuzzy search</label>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0" for="search-length"
          >Search from this many letters</label
        >
        <input
          id="search-length"
          v-model.number="searchLength"
          class="form-control form-control-sm"
          type="number"
          min="1"
          max="4"
          style="width: 4.5rem"
        />
      </div>
    </div>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" initial-search-term="Ber" />

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
import source from "./search-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const useFuzzySearch = ref(false);
const searchLength = ref(1);

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name", sort: true },
    { headline: "City", sort: true },
    { headline: "Team", breakpoint: "sm" },
  ],
  search: true,
  searchLength: searchLength.value,
  useFuzzySearch: useFuzzySearch.value,
  searchPlaceholder: "Name, city or nickname",
  emptyPlaceholder: "Nobody matches. Try fewer letters or fuzzy search.",
}));

const people = [
  {
    name: "Robert Klein",
    city: "Berlin",
    team: "Sales",
    nicknames: ["Bob", "Rob"],
  },
  {
    name: "Elisabeth Weber",
    city: "Bern",
    team: "Legal",
    nicknames: ["Liz", "Lisa"],
  },
  {
    name: "Alexander Petrov",
    city: "Hamburg",
    team: "Support",
    nicknames: ["Sasha"],
  },
  { name: "Bertha Nowak", city: "Kraków", team: "Finance", nicknames: [] },
  { name: "Jan Müller", city: "Bergen", team: "Engineering", nicknames: [] },
  { name: "Sofia Romano", city: "Turin", team: "Design", nicknames: ["Sofi"] },
  {
    name: "William Hughes",
    city: "Cardiff",
    team: "Sales",
    nicknames: ["Will", "Bill"],
  },
  {
    name: "Margarethe Lund",
    city: "Aarhus",
    team: "Engineering",
    nicknames: ["Grete"],
  },
];

const rows = people.map((person) => ({
  keywords: person.nicknames,
  cells: [{ text: person.name }, { text: person.city }, { text: person.team }],
}));
</script>
