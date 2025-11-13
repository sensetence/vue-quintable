<template>
  <div class="content">
    <alert-info
      >Cells will be formatted by custom formatting functions.</alert-info
    >

    <!-- table -->
    <vue-quintable :config="config" :rows="rows" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
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
      cellFormatter: (cell: any) => {
        return "Name: " + cell.content.name;
      },
    },
    {
      headline: "Age",
      cellFormatter: (cell: any) => {
        return {
          value: "<strong>" + cell.content.age + "</strong>",
          type: "html",
        };
      },
    },
    {
      headline: "Birth Place",
      cellFormatter: (cell: any) => {
        return cell.content.city;
      },
    },
    {
      headline: "Job",
      cellFormatter: (cell: any) => {
        return cell.content.profession;
      },
    },
  ],
};

const rows = computed(() => {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    const row = {
      name: chance.name({ nationality: "en" }),
      age: chance.age(),
      city: chance.city(),
      profession: chance.profession(),
    };

    rows.push([
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
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
      cellFormatter: (cell) =&gt; {
        return &quot;Name: &quot; + cell.content.name;
      },
    },
    {
      headline: &quot;Age&quot;,
      cellFormatter: (cell) =&gt; {
        return {
          value: &quot;&lt;strong&gt;&quot; + cell.content.age + &quot;&lt;/strong&gt;&quot;,
          type: &quot;html&quot;,
        };
      },
    },
    {
      headline: &quot;Birth Place&quot;,
      cellFormatter: (cell) =&gt; {
        return cell.content.city;
      },
    },
    {
      headline: &quot;Job&quot;,
      cellFormatter: (cell) =&gt; {
        return cell.content.profession;
      },
    },
  ],
};

const rows = computed(() =&gt; {
  let count = 10;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i &lt; count; i++) {
    const row = {
      name: chance.name({nationality: &quot;en&quot;}),
      age: chance.age(),
      city: chance.city(),
      profession: chance.profession(),
    };

    rows.push([
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
      },
      {
        content: row,
      },
    ]);
  }

  return rows;
});
&lt;/script&gt;`;
</script>
