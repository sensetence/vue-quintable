<template>
  <div class="content">
    <alert-info>Select rows by clicking on checkboxes.</alert-info>

    <!-- options -->
    <div class="mb-3">
      <p-quintable-check class="p-switch" v-model="selectAllRows">
        Select rows cross pages
      </p-quintable-check>
    </div>

    <!-- table -->
    <VueQuintable
        :preSelectedRows="preSelectedRows"
        v-model:selected-rows="selectedRows"
        :config="config"
        :rows="rows"
    />

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import Chance from "chance";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

const showCode = ref(false);

// table data
const chance = new Chance();
const selectedRows = ref([]);
const preSelectedRows = ref([]);
const selectAllRows = ref(false);

const config = computed(() => ({
  columns: [
    {
      headline: "Name",
      classes: "first-and-last-name",
      sort: true,
    },
    {headline: "Age"},
    {headline: "Birth Place"},
    {headline: "Job"},
  ],
  selectPosition: "pre",
  select: true,
  selectAll: true,
  prettySelect: true,
  pagination: 8,
  selectAllRows: selectAllRows.value,
  enableRowTabIndex: true,
  search: true,
}));

const rows = computed(() => {
  const count = 24;
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push({
      selected: i % 2 === 0,
      disableSelect: i === 1,
      index: i,
      cells: [
        {text: chance.name({nationality: "en"})},
        {text: chance.age()},
        {text: chance.city()},
        {text: chance.profession()},
      ],
    });
  }

  return result;
});

watch(selectAllRows, () => {
  if (!selectAllRows.value) {
    preSelectedRows.value = [];
    return;
  }

  const newSelection = [];
  for (let i = 0; i < rows.value.length; i++) {
    // skip disabled rows
    if (rows.value[i].disableSelect) {
      continue;
    }

    // skip non-selected
    if (!rows.value[i].selected) {
      continue;
    }

    newSelection.push({
      key: "index",
      value: i,
    });
  }

  preSelectedRows.value = newSelection;
});

watch(selectedRows, () => {
  alert(
      "Selection Changed - Names:\n" +
      (selectedRows.value.length
          ? "- " +
          selectedRows.value
              .map((row) => row.cells[0].text)
              .join("\n- ")
          : "No rows selected")
  );
});

// example code
const code = `&lt;template&gt;
  &lt;div class=&quot;mb-3&quot;&gt;
    &lt;p-quintable-check class=&quot;p-switch&quot; v-model=&quot;selectAllRows&quot;&gt;
      Select rows cross pages
    &lt;/p-quintable-check&gt;
  &lt;/div&gt;

  &lt;VueQuintable
      :preSelectedRows=&quot;preSelectedRows&quot;
      v-model:selected-rows=&quot;selectedRows&quot;
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {computed, ref, watch} from 'vue';
import Chance from &quot;chance&quot;;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

// table data
const chance = new Chance();
const selectedRows = ref([]);
const preSelectedRows = ref([]);
const selectAllRows = ref(false);

const config = computed(() =&gt; ({
  columns: [
    {
      headline: &quot;Name&quot;,
      classes: &quot;first-and-last-name&quot;,
      sort: true,
    },
    {headline: &quot;Age&quot;},
    {headline: &quot;Birth Place&quot;},
    {headline: &quot;Job&quot;},
  ],
  selectPosition: &quot;pre&quot;,
  select: true,
  selectAll: true,
  prettySelect: true,
  pagination: 8,
  selectAllRows: selectAllRows.value,
  enableRowTabIndex: true,
  search: true,
}));

const rows = computed(() =&gt; {
  const count = 24;
  const result = [];

  for (let i = 0; i &lt; count; i++) {
    result.push({
      selected: i % 2 === 0,
      disableSelect: i === 1,
      index: i,
      cells: [
        {text: chance.name({nationality: &quot;en&quot;})},
        {text: chance.age()},
        {text: chance.city()},
        {text: chance.profession()},
      ],
    });
  }

  return result;
});

watch(selectAllRows, () =&gt; {
  if (!selectAllRows.value) {
    preSelectedRows.value = [];
    return;
  }

  const newSelection = [];
  for (let i = 0; i &lt; rows.value.length; i++) {
    // skip disabled rows
    if (rows.value[i].disableSelect) {
      continue;
    }

    // skip non-selected
    if (!rows.value[i].selected) {
      continue;
    }

    newSelection.push({
      key: &quot;index&quot;,
      value: i,
    });
  }

  preSelectedRows.value = newSelection;
});

watch(selectedRows, () =&gt; {
  alert(
      &quot;Selection Changed - Names:\\n&quot; +
      (selectedRows.value.length
          ? &quot;- &quot; +
          selectedRows.value
              .map((row) =&gt; row.cells[0].text)
              .join(&quot;\\n- &quot;)
          : &quot;No rows selected&quot;)
  );
});
&lt;/script&gt;`;

</script>