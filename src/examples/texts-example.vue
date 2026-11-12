<template>
  <div class="content">
    <alert-info
      >Every text the table shows comes from the config: the search placeholder,
      the empty message, the rows per page label, the sort switches and the "of"
      in "1-5 of 12". Switch the language and search for something that is not
      there.</alert-info
    >

    <div class="d-flex align-items-center gap-2 mb-3">
      <label class="mb-0" for="table-language">Language</label>
      <select
        id="table-language"
        v-model="language"
        class="form-select form-select-sm w-auto"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
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
import source from "./texts-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const language = ref<"en" | "de">("en");

const TEXTS = {
  en: {
    headlines: ["Title", "Author", "Year", "Pages"],
    searchPlaceholder: "Search books…",
    emptyPlaceholder: "No book matches your search.",
    rowsPlaceholder: "Books per page:",
    multiSortPlaceholder: "Multi-column sort",
    pageSortPlaceholder: "This page only",
    numberOfVisibleRowsFillerWord: "of",
  },
  de: {
    headlines: ["Titel", "Autor", "Jahr", "Seiten"],
    searchPlaceholder: "Bücher suchen…",
    emptyPlaceholder: "Kein Buch passt zu deiner Suche.",
    rowsPlaceholder: "Bücher pro Seite:",
    multiSortPlaceholder: "Mehrspaltig sortieren",
    pageSortPlaceholder: "Nur diese Seite",
    numberOfVisibleRowsFillerWord: "von",
  },
};

// table data
const config = computed(() => {
  const { headlines, ...texts } = TEXTS[language.value];
  return {
    columns: [
      { headline: headlines[0], sort: true },
      { headline: headlines[1], sort: true },
      { headline: headlines[2], align: "end", sort: true },
      { headline: headlines[3], align: "end", breakpoint: "sm", sort: true },
    ],
    pagination: 5,
    rowsSelect: true,
    search: true,
    multiSortSelect: true,
    pageSortSelect: true,
    // the search field takes the right half of the row from md upwards
    searchContainerClass: "row justify-content-end",
    searchClass: "col-md-6",
    ...texts,
  };
});

const books = [
  ["Pride and Prejudice", "Jane Austen", 1813, 432],
  ["Frankenstein", "Mary Shelley", 1818, 280],
  ["Moby-Dick", "Herman Melville", 1851, 635],
  ["Madame Bovary", "Gustave Flaubert", 1857, 329],
  ["Crime and Punishment", "Fyodor Dostoevsky", 1866, 545],
  ["Middlemarch", "George Eliot", 1871, 880],
  ["Effi Briest", "Theodor Fontane", 1895, 336],
  ["Buddenbrooks", "Thomas Mann", 1901, 760],
  ["The Trial", "Franz Kafka", 1925, 255],
  ["Mrs Dalloway", "Virginia Woolf", 1925, 194],
  ["Berlin Alexanderplatz", "Alfred Döblin", 1929, 528],
  ["Things Fall Apart", "Chinua Achebe", 1958, 209],
];

const rows = books.map((book) => book.map((value) => ({ text: value })));
</script>
