<template>
  <div class="content">
    <alert-info>Initially pulled config and rows from server via ajax.</alert-info>

    <!-- table -->
    <vue-quintable :loading="loading" :config="remoteConfig" :rows="remoteRows">
      <template #loading>
        <div class="text-center py-3 mb-3 text-white bg-success">
          Loading...
          <font-awesome-icon
              class="ms-3"
              icon="circle-notch"
              spin
          />
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import axios from 'axios';
import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);

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
    }
);

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable :loading=&quot;loading&quot; :config=&quot;remoteConfig&quot; :rows=&quot;remoteRows&quot;&gt;
    &lt;template #loading&gt;
      &lt;div class=&quot;text-center py-3 mb-3 text-white bg-success&quot;&gt;
        Loading...
        &lt;font-awesome-icon
            class=&quot;ms-3&quot;
            icon=&quot;circle-notch&quot;
            spin
        /&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, watch, onMounted} from 'vue';
import axios from 'axios';
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

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

const fetchData = () =&gt; {
  loading.value = true;
  axios
      .get(&quot;https://sensetence.com/vue-quintable-demo/data.php?fetch=true&quot;)
      .then((response) =&gt; {
        remoteRows.value = response.data.rows;
        remoteConfig.value = response.data.config;
        loading.value = false;
      });
};

onMounted(fetchData);

watch(
    () =&gt; props.updated,
    () =&gt; {
      remoteConfig.value = {};
      remoteRows.value = [];
      fetchData();
    }
);
&lt;/script&gt;`;
</script>
