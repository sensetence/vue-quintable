<template>
  <div class="content">
    <alert-info
      >A cell can render a component. Its events reach the table as
      component:event.</alert-info
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
import { exampleCode } from "../components/code-block/example-code";
import source from "./component-example.vue?raw";
import componentSource from "./components/checkbox-component.vue?raw";
import CheckboxComponent from "./components/checkbox-component.vue";
import { getCurrentInstance } from "vue";

// Cell components are found by name, so they are registered globally (in an app: app.component(...) in main.ts)
const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component("CheckboxComponent", CheckboxComponent);
}

const showCode = ref(false);
const codeApp = exampleCode(source);
const codeComponent = exampleCode(componentSource);

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
</script>
