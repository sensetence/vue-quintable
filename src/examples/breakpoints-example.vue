<template>
  <div class="content">
    <alert-info>Resize your browser window to see responsive behaviour.</alert-info>

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
      breakpoint: "md",
    },
    {
      headline: "Birth Place",
      breakpoint: "xxl",
    },
    {
      headline: "Job",
      breakpoint: "xl",
    },
  ],
};

const rows = computed(() => {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    rows.push([
      {
        text: chance.name({nationality: "en"}),
      },
      {
        text: chance.age(),
      },
      {
        text: chance.city(),
      },
      {
        text: chance.profession(),
      },
    ]);
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
      breakpoint: &quot;md&quot;,
    },
    {
      headline: &quot;Birth Place&quot;,
      breakpoint: &quot;xxl&quot;,
    },
    {
      headline: &quot;Job&quot;,
      breakpoint: &quot;xl&quot;,
    },
  ],
};

const rows = computed(() =&gt; {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i &lt; count; i++) {
    rows.push([
      {
        text: chance.name({nationality: &quot;en&quot;}),
      },
      {
        text: chance.age(),
      },
      {
        text: chance.city(),
      },
      {
        text: chance.profession(),
      },
    ]);
  }

  return rows;
});
&lt;/script&gt;`;
</script>