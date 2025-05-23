<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"/>
      Just a simple table
    </p>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows"/>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
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
    },
    {
      headline: "Birth Place",
    },
    {
      headline: "Job",
    },
  ],
};

const rows = [
  [
    {
      html: "<em>John Doe</em>",
    },
    {
      text: 40,
    },
    {
      text: "New York",
    },
    {
      text: "CFO",
    },
  ],
  [
    {
      text: "Mia Wong",
      classes: "text-primary",
    },
    {
      text: 50,
    },
    {
      text: "Beijing",
    },
    {
      text: "CEO",
    },
  ],
  [
    {
      text: "Peter Stanbridge",
    },
    {
      text: 18,
    },
    {
      text: "London",
    },
    {
      text: "Trainee",
      align: "end",
    },
  ],
  {
    cells: [
      {
        text: "Natalie Lee-Walsh",
      },
      {
        text: 25,
      },
      {
        text: "Dublin",
      },
      {
        text: "Managing Director",
      },
    ],
    classes: "text-red",
  },
];

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;/&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

// table data
const config = {
  columns: [
    {
      headline: &quot;Name&quot;,
    },
    {
      headline: &quot;Age&quot;,
    },
    {
      headline: &quot;Birth Place&quot;,
    },
    {
      headline: &quot;Job&quot;,
    },
  ],
};

const rows = [
  [
    {
      html: &quot;&lt;em&gt;John Doe&lt;/em&gt;&quot;,
    },
    {
      text: 40,
    },
    {
      text: &quot;New York&quot;,
    },
    {
      text: &quot;CFO&quot;,
    },
  ],
  [
    {
      text: &quot;Mia Wong&quot;,
      classes: &quot;text-primary&quot;,
    },
    {
      text: 50,
    },
    {
      text: &quot;Beijing&quot;,
    },
    {
      text: &quot;CEO&quot;,
    },
  ],
  [
    {
      text: &quot;Peter Stanbridge&quot;,
    },
    {
      text: 18,
    },
    {
      text: &quot;London&quot;,
    },
    {
      text: &quot;Trainee&quot;,
      align: &quot;end&quot;,
    },
  ],
  {
    cells: [
      {
        text: &quot;Natalie Lee-Walsh&quot;,
      },
      {
        text: 25,
      },
      {
        text: &quot;Dublin&quot;,
      },
      {
        text: &quot;Managing Director&quot;,
      },
    ],
    classes: &quot;text-red&quot;,
  },
];
&lt;/script&gt;

&lt;style lang=&quot;scss&quot;&gt;
.text-red td {
  color: red;
}
&lt;/style&gt;`;
</script>

<style lang="scss">
.text-red td {
  color: red;
}
</style>