<template>
  <div class="content">
    <alert-info>Hover and click on headlines for sorting.</alert-info>

    <!-- table -->
    <vue-quintable
        :sort-order="sortOrder"
        :config="config"
        :rows="rows"
    />

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import Chance from "chance";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

// table data
const config = {
  columns: [
    {
      headline: "Name",
    },
    {
      headline: "Age",
      sort: true,
    },
    {
      headline: "Birth Place",
      sort: true,
    },
    {
      headline: "Job",
      sort: true,
      firstSortDirection: "DESC",
    },
  ],
  multiSort: false,
  multiSortSelect: true,
  pageSort: false,
  pageSortSelect: true,
  pagination: 5,
  search: true,
};

const sortOrder = [
  {
    index: 1,
    asc: false,
  },
];

const rows = computed(() => {
  let count = 30;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i < count; i++) {
    const randSortValue = Math.ceil(Math.random() * 10);

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
        html:
            '<span class="me-2">' +
            chance.profession() +
            "</span><em>" +
            "[" +
            randSortValue +
            "]</em>",
        sortValue: randSortValue,
      },
    ]);
  }

  return rows;
});

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      :sort-order=&quot;sortOrder&quot;
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {computed} from &quot;vue&quot;;
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
      sort: true,
    },
    {
      headline: &quot;Birth Place&quot;,
      sort: true,
    },
    {
      headline: &quot;Job&quot;,
      sort: true,
      firstSortDirection: &quot;DESC&quot;,
    },
  ],
  multiSort: false,
  multiSortSelect: true,
  pageSort: false,
  pageSortSelect: true,
  pagination: 5,
  search: true,
};

const sortOrder = [
  {
    index: 1,
    asc: false,
  },
];

const rows = computed(() =&gt; {
  let count = 30;
  const rows = [];

  const chance = new Chance();

  for (let i = 0; i &lt; count; i++) {
    const randSortValue = Math.ceil(Math.random() * 10);

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
        html:
            '&lt;span class=&quot;me-2&quot;&gt;' +
            chance.profession() +
            &quot;&lt;/span&gt;&lt;em&gt;&quot; +
            &quot;[&quot; +
            randSortValue +
            &quot;]&lt;/em&gt;&quot;,
        sortValue: randSortValue,
      },
    ]);
  }

  return rows;
});
&lt;/script&gt;`;
</script>