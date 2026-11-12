<template>
  <div class="content">
    <alert-info>
      Use buttons to add/remove/move rows or Drag&Drop [<a
        target="_blank"
        href="https://github.com/Alfred-Skyblue/vue-draggable-plus"
        >vue-draggable-plus</a
      >].
    </alert-info>

    <VueQuintable
      :table-classes="tableClasses"
      :config="config"
      :rows="rows"
      @component:event="componentListener"
    >
      <template #header>
        <div class="row">
          <div
            v-for="key in ['index', 'name', 'age', 'city', 'job']"
            :key="key"
            class="col-md-2"
          >
            <div class="mb-3">
              <label :for="key">{{
                key.charAt(0).toUpperCase() + key.slice(1)
              }}</label>
              <quintable-v-select
                v-if="key === 'age'"
                :id="key"
                v-model="form[key]"
                :options="ages"
                placeholder="Select Age..."
              />

              <quintable-v-select
                v-else-if="key === 'index'"
                :id="key"
                v-model="form[key]"
                :options="indexes"
                :clearable="false"
              />

              <input
                v-else
                :id="key"
                v-model="form[key]"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="col-md-2">
            <label>
              <wbr />
            </label>
            <div class="mb-3">
              <span class="btn btn-info" @click="addRow">
                <quintable-font-awesome-icon icon="plus" /> Add Row
              </span>
            </div>
          </div>
        </div>
      </template>
    </VueQuintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import DragComponent from "./components/drag-component.vue";
import ActionsComponent from "./components/actions-component.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./add-remove-example.vue?raw";
import Chance from "chance";

// Cell components are found by name, so they are registered globally (in an app: app.component(...) in main.ts)
const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component("DragComponent", DragComponent);
  app.component("ActionsComponent", ActionsComponent);
}

const showCode = ref(false);
const code = exampleCode(source);

interface FormData {
  index: number;
  name: string;
  age: number | null;
  city: string;
  job: string;
  [key: string]: number | string | null;
}

interface ComponentEvent {
  type: string;
  index: number;
  to?: number;
}

interface TableRow {
  text?: string;
  component?: {
    name: string;
    props: Record<string, any>;
  };
}

const config = {
  columns: [
    { headline: "" },
    { headline: "Name" },
    { headline: "Age", breakpoint: "md" },
    { headline: "Birth Place", breakpoint: "lg" },
    { headline: "Job", breakpoint: "lg" },
    { headline: "Actions", breakpoint: "sm" },
  ],
};

const rows = ref<TableRow[][]>([]);
const rowCount = ref<number>(10);
const dragging = ref<boolean>(false);

const form = reactive<FormData>({
  index: 1,
  name: "",
  age: null,
  city: "",
  job: "",
});

const tableClasses = computed(() => (dragging.value ? "dragging" : ""));

// Utility function to create a range array
const arrayRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (_, k) => k + start);

const ages = computed(() => arrayRange(1, 99));

const indexes = computed(() => rows.value.map((_, i) => i + 1));

const updateIndexes = (): void => {
  rows.value = rows.value.map((row, i) => {
    if (row[0].component) {
      row[0].component.props.index = i;
    }
    if (row[5].component) {
      row[5].component.props.index = i;
      row[5].component.props.first = i === 0;
      row[5].component.props.last = i === rowCount.value - 1;
    }
    return row;
  });
};

const move = (oldIndex: number, newIndex: number): void => {
  if (newIndex >= rows.value.length) {
    let k = newIndex - rows.value.length + 1;
    while (k--) rows.value.push([] as TableRow[]);
  }
  rows.value.splice(newIndex, 0, rows.value.splice(oldIndex, 1)[0]);
  updateIndexes();
};

const componentListener = (data: ComponentEvent): void => {
  if (data.type === "delete-row") {
    rows.value.splice(data.index, 1);
    rowCount.value--;
    updateIndexes();
  } else if (data.type === "move-row" && data.to !== undefined) {
    dragging.value = false;
    move(data.index, data.to);
  } else if (data.type === "dragstart") {
    dragging.value = true;
  } else if (data.type === "dragend") {
    dragging.value = false;
  }
};

const addRow = (): void => {
  console.log(form);
  if (!form.name || !form.age || !form.city || !form.job) {
    alert("You have to fill out all inputs");
    return;
  }

  const data: TableRow[] = [
    {
      component: {
        name: "drag-component",
        props: { index: form.index - 1 },
      },
    },
    { text: form.name },
    { text: form.age.toString() },
    { text: form.city },
    { text: form.job },
    {
      component: {
        name: "actions-component",
        props: { index: form.index - 1 },
      },
    },
  ];

  if (form.index === rowCount.value) {
    rows.value.push(data);
  } else {
    rows.value.splice(form.index - 1, 0, data);
  }

  form.index = 1;
  form.name = "";
  form.age = null;
  form.city = "";
  form.job = "";
  rowCount.value++;

  updateIndexes();
};

onMounted(() => {
  const chance = new Chance();
  const generated: TableRow[][] = [];
  for (let i = 0; i < rowCount.value; i++) {
    generated.push([
      {
        component: {
          name: "drag-component",
          props: { index: i },
        },
      },
      { text: chance.name({ nationality: "en" }) },
      { text: chance.age().toString() },
      { text: chance.city() },
      { text: chance.profession() },
      {
        component: {
          name: "actions-component",
          props: {
            index: i,
            first: i === 0,
            last: i === rowCount.value - 1,
          },
        },
      },
    ]);
  }
  rows.value = generated;
});
</script>

<style>
.vue-quintable.dragging .vue-quintable-cell {
  position: relative;
}

.vue-quintable.dragging .vue-quintable-cell:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 2;
}

.vue-quintable.dragging .vue-quintable-cell.actions .drop-element {
  position: relative;
  z-index: 3;
}

.vue-quintable.dragging .vue-quintable-cell.actions .drop-element .card {
  background-color: #28a745;
  color: #fff;
}
</style>
