<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"/>
      Use buttons to add/remove/move rows or Drag&Drop
      [<a target="_blank" href="https://github.com/Alfred-Skyblue/vue-draggable-plus">vue-draggable-plus</a>].
    </p>

    <VueQuintable
        :table-classes="tableClasses"
        :config="config"
        :rows="rows"
        @component:event="componentListener"
    >
      <template #header>
        <div class="row">
          <div class="col-md-2" v-for="key in ['index', 'name', 'age', 'city', 'job']" :key="key">
            <div class="mb-3">
              <label :for="key">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</label>
              <v-quintable-select
                  v-if="key === 'age'"
                  :id="key"
                  v-model="form[key]"
                  :options="ages"
                  placeholder="Select Age..."
              />

              <v-quintable-select
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
              <wbr/>
            </label>
            <div class="mb-3">
              <span class="btn btn-info" @click="addRow">
                <font-awesome-icon icon="plus"/> Add Row
              </span>
            </div>
          </div>
        </div>
      </template>
    </VueQuintable>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance,toRaw } from 'vue';
import VueQuintable from "../components/table/vue-quintable.vue";
import DragComponent from './components/drag-component.vue';
import ActionsComponent from './components/actions-component.vue';
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import Chance from 'chance';

// Register components globally for dynamic component usage
const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component('drag-component', DragComponent);
  app.component('actions-component', ActionsComponent);
}

const showCode = ref(false);

interface FormData {
  index: number;
  name: string;
  age: number | null;
  city: string;
  job: string;
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
    { headline: '' },
    { headline: 'Name' },
    { headline: 'Age', breakpoint: 'md' },
    { headline: 'Birth Place', breakpoint: 'lg' },
    { headline: 'Job', breakpoint: 'lg' },
    { headline: 'Actions', breakpoint: 'sm' },
  ],
};

const rows = ref<TableRow[][]>([]);
const rowCount = ref<number>(10);
const dragging = ref<boolean>(false);

const form = reactive<FormData>({
  index: 1,
  name: '',
  age: null,
  city: '',
  job: '',
});

const tableClasses = computed(() => dragging.value ? 'dragging' : '');

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
  if (data.type === 'delete-row') {
    rows.value.splice(data.index, 1);
    rowCount.value--;
    updateIndexes();
  } else if (data.type === 'move-row' && data.to !== undefined) {
    dragging.value = false;
    move(data.index, data.to);
  } else if (data.type === 'dragstart') {
    dragging.value = true;
  } else if (data.type === 'dragend') {
    dragging.value = false;
  }
};

const addRow = (): void => {
  console.log(form)
  if (!form.name || !form.age || !form.city || !form.job) {
    alert('You have to fill out all inputs');
    return;
  }

  const data: TableRow[] = [
    {
      component: {
        name: 'drag-component',
        props: { index: form.index - 1 },
      },
    },
    { text: form.name },
    { text: form.age.toString() },
    { text: form.city },
    { text: form.job },
    {
      component: {
        name: 'actions-component',
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
  form.name = '';
  form.age = null;
  form.city = '';
  form.job = '';
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
          name: 'drag-component',
          props: { index: i },
        },
      },
      { text: chance.name({ nationality: 'en' }) },
      { text: chance.age().toString() },
      { text: chance.city() },
      { text: chance.profession() },
      {
        component: {
          name: 'actions-component',
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

// example code
const code = `&lt;template&gt;
  &lt;VueQuintable
      :table-classes=&quot;tableClasses&quot;
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
      @component:event=&quot;componentListener&quot;
  &gt;
    &lt;template #header&gt;
      &lt;div class=&quot;row&quot;&gt;
        &lt;div class=&quot;col-md-2&quot; v-for=&quot;key in ['index', 'name', 'age', 'city', 'job']&quot; :key=&quot;key&quot;&gt;
          &lt;div class=&quot;mb-3&quot;&gt;
            &lt;label :for=&quot;key&quot;&gt;{{ key.charAt(0).toUpperCase() + key.slice(1) }}&lt;/label&gt;
            &lt;v-quintable-select
                v-if=&quot;key === 'age'&quot;
                :id=&quot;key&quot;
                v-model=&quot;form[key]&quot;
                :options=&quot;ages&quot;
                placeholder=&quot;Select Age...&quot;
            /&gt;

            &lt;v-quintable-select
                v-else-if=&quot;key === 'index'&quot;
                :id=&quot;key&quot;
                v-model=&quot;form[key]&quot;
                :options=&quot;indexes&quot;
                :clearable=&quot;false&quot;
            /&gt;

            &lt;input
                v-else
                :id=&quot;key&quot;
                v-model=&quot;form[key]&quot;
                type=&quot;text&quot;
                class=&quot;form-control&quot;
            /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;col-md-2&quot;&gt;
          &lt;label&gt;
            &lt;wbr/&gt;
          &lt;/label&gt;
          &lt;div class=&quot;mb-3&quot;&gt;
            &lt;span class=&quot;btn btn-info&quot; @click=&quot;addRow&quot;&gt;
              &lt;font-awesome-icon icon=&quot;plus&quot;/&gt; Add Row
            &lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/VueQuintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import { ref, reactive, computed, onMounted, getCurrentInstance,toRaw } from 'vue';
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;
import DragComponent from './components/drag-component.vue';
import ActionsComponent from './components/actions-component.vue';
import Chance from 'chance';

// Register components globally for dynamic component usage
const instance = getCurrentInstance();
if (instance) {
  const app = instance.appContext.app;
  app.component('drag-component', DragComponent);
  app.component('actions-component', ActionsComponent);
}

interface FormData {
  index: number;
  name: string;
  age: number | null;
  city: string;
  job: string;
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
    props: Record&lt;string, any&gt;;
  };
}

const config = {
  columns: [
    { headline: '' },
    { headline: 'Name' },
    { headline: 'Age', breakpoint: 'md' },
    { headline: 'Birth Place', breakpoint: 'lg' },
    { headline: 'Job', breakpoint: 'lg' },
    { headline: 'Actions', breakpoint: 'sm' },
  ],
};

const rows = ref&lt;TableRow[][]&gt;([]);
const rowCount = ref&lt;number&gt;(10);
const dragging = ref&lt;boolean&gt;(false);

const form = reactive&lt;FormData&gt;({
  index: 1,
  name: '',
  age: null,
  city: '',
  job: '',
});

const tableClasses = computed(() =&gt; dragging.value ? 'dragging' : '');

// Utility function to create a range array
const arrayRange = (start: number, end: number): number[] =&gt;
  Array.from({ length: end - start }, (_, k) =&gt; k + start);

const ages = computed(() =&gt; arrayRange(1, 99));

const indexes = computed(() =&gt; rows.value.map((_, i) =&gt; i + 1));

const updateIndexes = (): void =&gt; {
  rows.value = rows.value.map((row, i) =&gt; {
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

const move = (oldIndex: number, newIndex: number): void =&gt; {
  if (newIndex &gt;= rows.value.length) {
    let k = newIndex - rows.value.length + 1;
    while (k--) rows.value.push([] as TableRow[]);
  }
  rows.value.splice(newIndex, 0, rows.value.splice(oldIndex, 1)[0]);
  updateIndexes();
};

const componentListener = (data: ComponentEvent): void =&gt; {
  if (data.type === 'delete-row') {
    rows.value.splice(data.index, 1);
    rowCount.value--;
    updateIndexes();
  } else if (data.type === 'move-row' &amp;&amp; data.to !== undefined) {
    dragging.value = false;
    move(data.index, data.to);
  } else if (data.type === 'dragstart') {
    dragging.value = true;
  } else if (data.type === 'dragend') {
    dragging.value = false;
  }
};

const addRow = (): void =&gt; {
  console.log(form)
  if (!form.name || !form.age || !form.city || !form.job) {
    alert('You have to fill out all inputs');
    return;
  }

  const data: TableRow[] = [
    {
      component: {
        name: 'drag-component',
        props: { index: form.index - 1 },
      },
    },
    { text: form.name },
    { text: form.age.toString() },
    { text: form.city },
    { text: form.job },
    {
      component: {
        name: 'actions-component',
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
  form.name = '';
  form.age = null;
  form.city = '';
  form.job = '';
  rowCount.value++;

  updateIndexes();
};

onMounted(() =&gt; {
  const chance = new Chance();
  const generated: TableRow[][] = [];
  for (let i = 0; i &lt; rowCount.value; i++) {
    generated.push([
      {
        component: {
          name: 'drag-component',
          props: { index: i },
        },
      },
      { text: chance.name({ nationality: 'en' }) },
      { text: chance.age().toString() },
      { text: chance.city() },
      { text: chance.profession() },
      {
        component: {
          name: 'actions-component',
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
&lt;/script&gt;

&lt;style&gt;
.vue-quintable.dragging .vue-quintable-cell {
  position: relative;
}

.vue-quintable.dragging .vue-quintable-cell:after {
  content: '';
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
&lt;/style&gt;`;
</script>

<style>
.vue-quintable.dragging .vue-quintable-cell {
  position: relative;
}

.vue-quintable.dragging .vue-quintable-cell:after {
  content: '';
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