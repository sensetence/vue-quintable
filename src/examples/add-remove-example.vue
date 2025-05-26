<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"/>
      Use buttons to add/remove/move rows or Drag&Drop
      [<a target="_blank" href="https://github.com/cameronhimself/vue-drag-drop">vue-drag-drop</a>].
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
              <component
                  :is="key === 'age' || key === 'index' ? 'v-select' : 'input'"
                  :id="key"
                  v-model="form[key]"
                  :options="key === 'age' ? ages : key === 'index' ? indexes : undefined"
                  :clearable="key === 'index' ? false : undefined"
                  :placeholder="key === 'age' ? 'Select Age...' : undefined"
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
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from 'vue';
import VueQuintable from "../components/table/vue-quintable.vue";
// import DragComponent from '../../old_copy/src/examples/components/DragComponent.vue';
// import ActionsComponent from '../../old_copy/src/examples/components/ActionsComponent.vue';
import Chance from 'chance';

const config = {
  columns: [
    {headline: ''},
    {headline: 'Name'},
    {headline: 'Age', breakpoint: 'md'},
    {headline: 'Birth Place', breakpoint: 'lg'},
    {headline: 'Job', breakpoint: 'lg'},
    {headline: 'Actions', breakpoint: 'sm'},
  ],
};

const rows = ref([]);
const rowCount = ref(10);
const dragging = ref(false);

const form = reactive({
  index: 1,
  name: '',
  age: null,
  city: '',
  job: '',
});

const tableClasses = computed(() => dragging.value ? 'dragging' : '');

Array.range = (start, end) => Array.from({length: end - start}, (_, k) => k + start);

const ages = computed(() => Array.range(1, 99));

const indexes = computed(() => rows.value.map((_, i) => i + 1));

const updateIndexes = () => {
  rows.value = rows.value.map((row, i) => {
    row[0].component.props.index = i;
    row[5].component.props.index = i;
    row[5].component.props.first = i === 0;
    row[5].component.props.last = i === rowCount.value - 1;
    return row;
  });
};

const move = (oldIndex, newIndex) => {
  if (newIndex >= rows.value.length) {
    let k = newIndex - rows.value.length + 1;
    while (k--) rows.value.push(undefined);
  }
  rows.value.splice(newIndex, 0, rows.value.splice(oldIndex, 1)[0]);
  updateIndexes();
};

const componentListener = (data) => {
  if (data.type === 'delete-row') {
    rows.value.splice(data.index, 1);
    rowCount.value--;
    updateIndexes();
  } else if (data.type === 'move-row') {
    dragging.value = false;
    move(data.index, data.to);
  } else if (data.type === 'dragstart') {
    dragging.value = true;
  } else if (data.type === 'dragend') {
    dragging.value = false;
  }
};

const addRow = () => {
  if (!form.name || !form.age || !form.city || !form.job) {
    alert('You have to fill out all inputs');
    return;
  }

  const data = [
    {
      component: {
        name: 'drag-component',
        props: {index: form.index - 1},
      },
    },
    {text: form.name},
    {text: form.age},
    {text: form.city},
    {text: form.job},
    {
      component: {
        name: 'actions-component',
        props: {index: form.index - 1},
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
  const generated = [];
  for (let i = 0; i < rowCount.value; i++) {
    generated.push([
      {
        component: {
          name: 'drag-component',
          props: {index: i},
        },
      },
      {text: chance.name({nationality: 'en'})},
      {text: chance.age()},
      {text: chance.city()},
      {text: chance.profession()},
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