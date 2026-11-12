<template>
  <div class="content">
    <alert-info
      >Click a message, then move through the inbox with the arrow keys
      (<code>enableRowTabIndex</code>). The table reports the active row with
      the <code>active:row</code> event. A message and its preview hover and
      light up as one.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0" for="row-classes">Row colours</label>
        <select
          id="row-classes"
          v-model="classes"
          class="form-select form-select-sm w-auto"
        >
          <option value="default">Default classes</option>
          <option value="bootstrap">Bootstrap table classes</option>
          <option value="off">Off</option>
        </select>
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="green-theme"
          v-model="greenTheme"
          class="form-check-input"
          type="checkbox"
          :disabled="classes !== 'default'"
        />
        <label class="form-check-label" for="green-theme"
          >Green, via CSS variables (default classes only)</label
        >
      </div>
    </div>

    <p class="mb-2" aria-live="polite">
      Active message: <strong>{{ activeSubject || "none" }}</strong>
    </p>

    <!-- table: the CSS variables work on any ancestor of the table -->
    <div :style="greenTheme && classes === 'default' ? GREEN : undefined">
      <vue-quintable :config="config" :rows="rows" @active:row="onActiveRow" />
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
import source from "./row-states-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const classes = ref<"default" | "bootstrap" | "off">("default");
const greenTheme = ref(false);
const activeSubject = ref("");

const GREEN = {
  "--quintable-row-hover-bg": "rgba(25, 135, 84, 0.12)",
  "--quintable-row-active-bg": "#d1e7dd",
  "--quintable-row-active-edge": "#198754",
};

// hoverClass and activeClass: left out for the default ("bg-muted"), a class name, or false for none
const ROW_CLASSES = {
  default: {},
  bootstrap: { hoverClass: "table-warning", activeClass: "table-primary" },
  off: { hoverClass: false, activeClass: false },
};

// table data
const config = computed(() => ({
  columns: [
    { headline: "From" },
    { headline: "Subject" },
    { headline: "Received", align: "end" },
    { headline: "Preview", breakpoint: "all" },
  ],
  enableRowTabIndex: true,
  ...ROW_CLASSES[classes.value],
}));

const messages = [
  [
    "Priya Natarajan",
    "Quarterly numbers",
    "09:12",
    "The draft is in the shared folder. Can you check the totals in sheet 3 before noon?",
  ],
  [
    "Jonas Berg",
    "Lunch on Friday?",
    "08:47",
    "The new place on the corner opens this week. 12:30 works for me.",
  ],
  [
    "IT Service Desk",
    "Password expires in 3 days",
    "Yesterday",
    "Change your password in the account portal before Sunday to keep access.",
  ],
  [
    "Clara Moreau",
    "Slides for the workshop",
    "Yesterday",
    "I shortened the intro to five slides. The demo part stays as it is.",
  ],
  [
    "Hamid Rahimi",
    "Invoice 2026-118",
    "Mon",
    "Attached is the invoice for October. Payment is due within 14 days.",
  ],
  [
    "Mei Lin",
    "Re: Travel dates",
    "Mon",
    "The 3rd to the 6th works. I booked the hotel near the venue.",
  ],
];

// rows as objects: active:row hands out the row
const rows = messages.map(([from, subject, received, preview]) => ({
  cells: [
    { text: from },
    { text: subject },
    { text: received },
    { text: preview },
  ],
}));

function onActiveRow(row: { cells: { text: string }[] } | null) {
  activeSubject.value = row ? row.cells[1].text : "";
}
</script>
