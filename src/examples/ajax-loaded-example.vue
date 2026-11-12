<template>
  <div class="content">
    <alert-info
      >Initially pulled config and rows from server via ajax.</alert-info
    >

    <!-- table -->
    <vue-quintable :loading="loading" :config="remoteConfig" :rows="remoteRows">
      <template #loading>
        <div class="text-center py-3 mb-3 text-white bg-success">
          Loading...
          <quintable-font-awesome-icon class="ms-3" icon="circle-notch" spin />
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./ajax-loaded-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const props = defineProps({
  updated: {
    type: [Boolean, Date],
    default: false,
  },
});

// table config
const loading = ref(false);
const remoteConfig = ref({});
const remoteRows = ref([]);

const fetchData = () => {
  loading.value = true;
  axios
    .get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true")
    .then((response) => {
      remoteRows.value = response.data.rows;
      remoteConfig.value = response.data.config;
      loading.value = false;
    });
};

onMounted(fetchData);

watch(
  () => props.updated,
  () => {
    remoteConfig.value = {};
    remoteRows.value = [];
    fetchData();
  },
);
</script>
