<template>
  <div class="content">
    <alert-info
      >The dashed box stands in for a narrow card, e.g. next to a sidebar. Make
      it narrower. With <code>autoFit</code> the columns with breakpoint xxl, xl
      and lg fold into the row details while the table does not fit the box,
      largest first, at any window width. Without it they follow the window
      width, and the table runs past the box. With <code>cellTitles</code> a
      note cut with "…" shows its full text on hover.</alert-info
    >

    <div class="row g-3 align-items-center mb-3">
      <div class="col-md-6">
        <label for="fit-box-width" class="form-label"
          >Box width: {{ width }}px</label
        >
        <input
          id="fit-box-width"
          v-model.number="width"
          type="range"
          class="form-range"
          min="320"
          max="1200"
          step="10"
        />
      </div>
      <div class="col-md-6">
        <div class="form-check form-switch">
          <input
            id="auto-fit"
            v-model="autoFit"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="auto-fit"
            >Fit the columns to the box</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            id="cell-titles"
            v-model="cellTitles"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="cell-titles"
            >Show cut text on hover</label
          >
        </div>
      </div>
    </div>

    <!-- table: autoFit sets up its observer on mount, so the switch mounts the table anew -->
    <div class="fit-box" :style="{ maxWidth: width + 'px' }">
      <vue-quintable :key="String(autoFit)" :config="config" :rows="rows">
        <template #cell-content="{ cell }">
          <div v-if="cell.type === 'note'" class="text-truncate note">
            {{ cell.text }}
          </div>
        </template>
      </vue-quintable>
    </div>

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

const showCode = ref(false);
const width = ref(640);
const autoFit = ref(true);
const cellTitles = ref(true);

const chance = new Chance();

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name" },
    { headline: "Email", breakpoint: "lg" },
    { headline: "Company", breakpoint: "xl" },
    { headline: "Address", breakpoint: "xxl" },
    { headline: "Notes" },
  ],
  pagination: 5,
  autoFit: autoFit.value,
  cellTitles: cellTitles.value,
}));

const rows = Array.from({ length: 12 }, () => [
  { text: chance.name({ nationality: "en" }) },
  { text: chance.email() },
  { text: chance.company() },
  { text: chance.address() + ", " + chance.city() },
  { type: "note", text: chance.sentence({ words: 14 }) },
]);

// example code
const code = `&lt;template&gt;
  &lt;div class=&quot;fit-box&quot;&gt;
    &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
      &lt;template #cell-content=&quot;{ cell }&quot;&gt;
        &lt;div v-if=&quot;cell.type === 'note'&quot; class=&quot;text-truncate note&quot;&gt;
          {{ cell.text }}
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-quintable&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import Chance from &quot;chance&quot;;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

const chance = new Chance();

const config = {
  columns: [
    { headline: &quot;Name&quot; },
    // xxl, xl and lg fold by the room in the box, largest first
    { headline: &quot;Email&quot;, breakpoint: &quot;lg&quot; },
    { headline: &quot;Company&quot;, breakpoint: &quot;xl&quot; },
    { headline: &quot;Address&quot;, breakpoint: &quot;xxl&quot; },
    { headline: &quot;Notes&quot; },
  ],
  pagination: 5,
  autoFit: true,
  cellTitles: true,
};

const rows = Array.from({ length: 12 }, () =&gt; [
  { text: chance.name({ nationality: &quot;en&quot; }) },
  { text: chance.email() },
  { text: chance.company() },
  { text: chance.address() + &quot;, &quot; + chance.city() },
  { type: &quot;note&quot;, text: chance.sentence({ words: 14 }) },
]);
&lt;/script&gt;

&lt;style scoped&gt;
/* cellTitles: an element that cuts its text with text-overflow: ellipsis */
.note {
  max-width: 16rem;
}
&lt;/style&gt;`;
</script>

<style scoped>
.fit-box {
  overflow-x: auto;
  padding: 0.5rem;
  border: 1px dashed #adb5bd;
  border-radius: 0.375rem;
}

/* cellTitles: an element that cuts its text with text-overflow: ellipsis */
.note {
  max-width: 16rem;
}
</style>
