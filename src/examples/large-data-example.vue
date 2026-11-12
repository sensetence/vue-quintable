<template>
  <div class="content">
    <alert-info
      >5,000 log entries, 100 per page. Sort, search or switch pages and compare
      the time with and without <code>reuseRows</code>. With it, the table
      updates the rows it already shows instead of creating them anew. Read
      "Reusing rows" in the README before you turn it on in your
      app.</alert-info
    >

    <div class="form-check form-switch mb-2">
      <input
        id="reuse-rows"
        v-model="reuseRows"
        class="form-check-input"
        type="checkbox"
      />
      <label class="form-check-label" for="reuse-rows">Reuse rows</label>
    </div>
    <!-- a line of its own: a longer time must not wrap and move the table -->
    <p class="mb-3" aria-live="polite">
      Last update took
      <output class="render-time fw-semibold">{{
        renderTime === null ? "–" : `${renderTime} ms`
      }}</output>
    </p>

    <!-- table: the time runs from your click or key press to the next paint -->
    <div
      @click.capture="startTimer"
      @input.capture="startTimer"
      @change.capture="startTimer"
    >
      <vue-quintable :config="config" :rows="rows" />
    </div>

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
import source from "./large-data-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const reuseRows = ref(true);
const renderTime = ref<number | null>(null);

function startTimer() {
  const start = performance.now();
  // rAF runs before the next paint, the timeout right after it
  requestAnimationFrame(() =>
    setTimeout(() => {
      renderTime.value = Math.round(performance.now() - start);
    }),
  );
}

// table data
const config = computed(() => ({
  columns: [
    { headline: "#", sort: true },
    { headline: "Time", sort: true },
    { headline: "Level", sort: true },
    { headline: "Service", sort: true },
    { headline: "Message", breakpoint: "md" },
    { headline: "Duration", align: "end", sort: true },
  ],
  pagination: 100,
  rowsSelect: true,
  search: true,
  reuseRows: reuseRows.value,
}));

const LEVELS = ["info", "info", "info", "warn", "error"];
const BADGES: Record<string, string> = {
  info: "text-bg-light",
  warn: "text-bg-warning",
  error: "text-bg-danger",
};
const SERVICES = ["auth", "billing", "search", "mailer", "gateway"];
const MESSAGES = [
  "Request served",
  "Cache miss",
  "Retrying upstream",
  "Token refreshed",
  "Slow query",
  "Queue drained",
];
const START = Date.UTC(2026, 10, 12, 8, 0, 0);

const rows = Array.from({ length: 5000 }, (_, i) => {
  const level = LEVELS[(i * 7) % LEVELS.length];
  const duration = ((i * 37) % 900) + 3;
  const time = START + i * 1730;
  return [
    { text: i + 1 },
    { text: new Date(time).toISOString().slice(11, 19), sortValue: time },
    {
      html: `<span class="badge ${BADGES[level]}">${level}</span>`,
      sortValue: level,
    },
    { text: SERVICES[(i * 3) % SERVICES.length] },
    { text: MESSAGES[(i * 11) % MESSAGES.length] },
    { text: `${duration} ms`, sortValue: duration },
  ];
});
</script>
