<template>
  <div class="content">
    <alert-info
      >Rows are calculated and passed as a computed property</alert-info
    >

    <vue-quintable
      :config="config"
      :rows="rows"
      @component:event="onComponentEvent"
    />

    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="codeApp" class="mt-3" />
    <code-block v-if="showCode" :code="codeComponent" class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import CheckboxComponent from "./components/checkbox-component.vue";

import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component("CheckboxComponent", CheckboxComponent);
}

const showCode = ref(false);

// table data
const chance = new Chance();

const config = {
  columns: [
    { headline: "Name" },
    { headline: "Age" },
    { headline: "Birth Place" },
    { headline: "Job" },
  ],
};

const rows = computed(() => {
  const output = [];

  for (let i = 0; i < 10; i++) {
    output.push([
      {
        component: {
          name: "checkbox-component",
          props: {
            index: i + 1,
            name: chance.name({ nationality: "en" }),
          },
        },
      },
      { text: chance.age() },
      { text: chance.city() },
      { text: chance.profession() },
    ]);
  }

  return output;
});

function onComponentEvent(data: {
  reference: string;
  index: number;
  checked: boolean;
}) {
  alert(
    `Component ${data.reference} on index ${data.index} has just been${
      data.checked ? " checked!" : " unchecked!"
    }`,
  );
}

// example code
const codeApp = `&lt;template&gt;
  &lt;vue-quintable
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
      @component:event=&quot;onComponentEvent&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';
import CheckboxComponent from &quot;./components/checkbox-component.vue&quot;
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component(
      'checkbox-component',
      CheckboxComponent
  );
}

// table data
const chance = new Chance();

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age'},
    {headline: 'Birth Place'},
    {headline: 'Job'},
  ],
};

const rows = computed(() =&gt; {
  const output = [];

  for (let i = 0; i &lt; 10; i++) {
    output.push([
      {
        component: {
          name: 'checkbox-component',
          props: {
            index: i + 1,
            name: chance.name({nationality: 'en'}),
          },
        },
      },
      {text: chance.age()},
      {text: chance.city()},
      {text: chance.profession()},
    ]);
  }

  return output;
});

function onComponentEvent(data: { reference: string; index: number; checked: boolean }) {
  alert(
      \`Component \${data.reference} on index \${data.index} has just been\${
          data.checked ? ' checked!' : ' unchecked!'
      }\`
  );
}
&lt;/script&gt;`;

const codeComponent = `&lt;template&gt;
  &lt;div class=&quot;d-flex&quot;&gt;
    &lt;div&gt;
      &lt;span class=&quot;me-2&quot;&gt;{{ name }}&lt;/span&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;quintable-p-check v-model=&quot;checked&quot; @change=&quot;toggleCheck&quot; /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref} from 'vue';

// define props
const props = defineProps&lt;{
  index: number;
  name: string;
}&gt;();

// define emit
const emit = defineEmits&lt;{
  (e: 'action', payload: { reference: string; index: number; checked: boolean }): void;
}&gt;();

// component state
const checked = ref(false);
const reference = 'checkbox-component';

// emit action on toggle
function toggleCheck() {
  emit('action', {
    reference,
    index: props.index,
    checked: checked.value,
  });
}
&lt;/script&gt;`;
</script>
