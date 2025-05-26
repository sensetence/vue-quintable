<template>
  <div class="content">
    <alert-info>Rows are calculated and passed as a computed property</alert-info>

    <vue-quintable
        :config="config"
        :rows="rows"
        @component:event="onComponentEvent"
    />

    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="codeApp" class="mt-3"/>
    <code-block v-if="showCode" :code="codeComponent" class="mt-3"/>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import Chance from 'chance';

import VueQuintable from '../components/table/vue-quintable.vue';
import AlertInfo from '../components/alert/alert-info.vue';
import CodeBlock from '../components/code-block/code-block.vue';
import ShowHideButton from '../components/code-block/show-hide-button.vue';

const showCode = ref(false);

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

const rows = computed(() => {
  const output = [];

  for (let i = 0; i < 10; i++) {
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
      `Component ${data.reference} on index ${data.index} has just been${
          data.checked ? ' checked!' : ' unchecked!'
      }`
  );
}

// Optional: embedded code examples
const codeApp = `<vue-quintable :config="config" :rows="rows" @component:event="onComponentEvent" />`;
const codeComponent = `tp`;
</script>
