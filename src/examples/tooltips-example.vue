<template>
  <div class="content">
    <alert-info>Hover over rows and cells to see the tooltips.</alert-info>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows"/>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import Chance from "chance";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

const showCode = ref(false);

// table data
const config = {
  columns: [
    {
      headline: "Name",
    },
    {
      headline: "Age",
      showHeadlineBreakpoint: "md",
      breakpoint: "md",
    },
    {
      headline: "Birth Place",
      sticky: true,
    },
    {
      headline: "Job",
      breakpoint: "md",
      alwaysExpanded: true,
    },
  ],
};

const rows = computed(() => {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    rows.push({
      cells: [
        {
          text: chance.name({nationality: "en"}),
        },
        {
          text: chance.age(),
          tooltip: "Age " + i,
        },
        {
          text: chance.city(),
          tooltip: "City " + i,
        },
        {
          text: chance.profession(),
          tooltip: "Job " + i,
        },
      ],
      tooltip: "Row " + i,
    });
  }

  return rows;
});

// example code
const code = `&lt;template&gt;
    &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;/&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {computed} from 'vue';
import Chance from &quot;chance&quot;;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

// table data
const config = {
  columns: [
    {
      headline: &quot;Name&quot;,
    },
    {
      headline: &quot;Age&quot;,
      showHeadlineBreakpoint: &quot;md&quot;,
      breakpoint: &quot;md&quot;,
    },
    {
      headline: &quot;Birth Place&quot;,
      sticky: true,
    },
    {
      headline: &quot;Job&quot;,
      breakpoint: &quot;md&quot;,
      alwaysExpanded: true,
    },
  ],
};

const rows = computed(() =&gt; {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i &lt; count; i++) {
    rows.push({
      cells: [
        {
          text: chance.name({nationality: &quot;en&quot;}),
        },
        {
          text: chance.age(),
          tooltip: &quot;Age &quot; + i,
        },
        {
          text: chance.city(),
          tooltip: &quot;City &quot; + i,
        },
        {
          text: chance.profession(),
          tooltip: &quot;Job &quot; + i,
        },
      ],
      tooltip: &quot;Row &quot; + i,
    });
  }

  return rows;
});
&lt;/script&gt;`;
</script>