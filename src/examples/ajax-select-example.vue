<template>
  <div class="content">
    <alert-info
      >Selecting rows will be persistent, even if pages are changes via
      ajax.</alert-info
    >

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
        <div v-for="id in preSelectedRowIds" :key="id" class="list-group-item">
          {{ allSelectedRows[id]?.cells?.[0]?.html }}
        </div>
      </div>
      <div
        v-if="preSelectedRowIds.length"
        class="btn btn-danger mt-2"
        @click="clearSelection"
      >
        Clear
      </div>
      <div class="clearfix" />
    </div>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import axios from "axios";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./ajax-select-example.vue?raw";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

// Types
interface RowData {
  id: number | string;
  cells?: Array<{ html?: string; text?: string }>;
  [key: string]: any;
}

interface AjaxData {
  rows: RowData[];
  [key: string]: any;
}

interface PreSelectedRow {
  key: string;
  value: number | string;
}

// axios interceptor setup
axios.interceptors.request.use(
  (config) => {
    console.warn("Custom axios", config);
    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  },
);

// table config
const showCode = ref(false);
const code = exampleCode(source);
const selectedRows = ref<RowData[]>([]);
const allSelectedRows = ref<Record<string | number, RowData>>({});
const preSelectedRowIds = ref<Array<string | number>>([]);
const preSelectedRows = ref<PreSelectedRow[]>([]);
const ajaxRows = ref<RowData[]>([]);
const pageChanged = ref(false);

const ajaxConfig = {
  columns: [
    { headline: "Name" },
    { headline: "Email", breakpoint: "sm" },
    { headline: "Phone", breakpoint: "md" },
    { headline: "Job Title", breakpoint: "md" },
    { headline: "City", breakpoint: "md" },
    { headline: "Address", breakpoint: "md" },
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

const rowsUpdated = (data: AjaxData) => {
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
</script>
