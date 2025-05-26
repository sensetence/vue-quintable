<template>
  <div class="content">
    <alert-info>Selecting rows will be persistent, even if pages are changes via ajax.</alert-info>

    <!-- table -->
    <vue-quintable
        v-model:selected-rows="selectedRows"
        :pre-selected-rows="preSelectedRows"
        :axios="axios"
        :config="ajaxConfig"
        @update:page="onPageChange"
        @ajax:rows="rowsUpdated"
    />

    <!-- selection info -->
    <div v-if="preSelectedRowIds.length > 0">
      <p>
        <strong>Selected Rows:</strong>
      </p>
      <div class="list-group">
        <div class="list-group-item" v-for="id in preSelectedRowIds" :key="id">
          {{ allSelectedRows[id].cells[0].html }}
        </div>
      </div>
      <div
          class="btn btn-danger mt-2"
          v-if="preSelectedRowIds.length"
          @click="clearSelection"
      >
        Clear
      </div>
      <div class="clearfix"/>
    </div>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, nextTick} from 'vue';
import axios from 'axios';
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

// axios interceptor setup
axios.interceptors.request.use(
    (config) => {
      console.warn("Custom axios", config);
      return config;
    },
    (error) => {
      console.log("ERROR AXIOS", error);
    }
);

// table config
const showCode = ref(false);
const selectedRows = ref([]);
const allSelectedRows = ref({});
const preSelectedRowIds = ref([]);
const preSelectedRows = ref([]);
const ajaxRows = ref([]);
const pageChanged = ref(false);

const ajaxConfig = {
  columns: [
    {headline: "Name"},
    {headline: "Email", breakpoint: "sm"},
    {headline: "Phone", breakpoint: "md"},
    {headline: "Job Title", breakpoint: "md"},
    {headline: "City", breakpoint: "md"},
    {headline: "Address", breakpoint: "md"},
  ],
  pagination: 5,
  select: true,
  selectPosition: "pre",
  selectAll: true,
  prettySelect: true,
  ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
  pageChanged: false,
};

// Watcher for selectedRows
watch(selectedRows, (rows) => {
  if (!pageChanged.value && ajaxRows.value) {
    for (let i = 0; i < rows.length; i++) {
      if (!preSelectedRowIds.value.includes(rows[i].id)) {
        preSelectedRowIds.value.push(rows[i].id);
        allSelectedRows.value[rows[i].id] = rows[i];
      }
    }

    for (let j = 0; j < ajaxRows.value.length; j++) {
      const id = ajaxRows.value[j].id;
      const index = preSelectedRowIds.value.indexOf(id);

      if (!rows.map((r) => r.id).includes(id) && index !== -1) {
        preSelectedRowIds.value.splice(index, 1);
        delete allSelectedRows.value[id];
      }
    }
  }
});

// methods
const clearSelection = () => {
  allSelectedRows.value = {};
  preSelectedRows.value = [];
  preSelectedRowIds.value = [];
};

const rowsUpdated = (data) => {
  pageChanged.value = false;
  if (data && data.rows && data.rows.length) {
    nextTick(() => {
      preSelectedRows.value = preSelectedRowIds.value.map((id) => ({
        key: "id",
        value: id,
      }));
    });
  }
  ajaxRows.value = data.rows;
};

const onPageChange = () => {
  pageChanged.value = true;
};

// example code
const code = `todo`;
</script>