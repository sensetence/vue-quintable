<template>
  <div class="content">
    <alert-info
      >The table reports a failed request with the
      <code>ajax:error</code> event. Switch to the unreachable server (an
      <code>.invalid</code> host never resolves), then back. With the
      <code>verbose</code> prop the table logs every request to the browser
      console.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-4 mb-3">
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0" for="ajax-server">Load from</label>
        <select
          id="ajax-server"
          v-model="url"
          class="form-select form-select-sm w-auto"
        >
          <option :value="DEMO_URL">the demo server</option>
          <option :value="BROKEN_URL">an unreachable server</option>
        </select>
      </div>
      <div class="form-check form-switch mb-0">
        <input
          id="verbose"
          v-model="verbose"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="verbose"
          >Log requests to the console</label
        >
      </div>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      The rows could not be loaded: {{ error }}. Check the URL and the server,
      then load again.
    </div>

    <!-- table -->
    <vue-quintable
      :config="config"
      :verbose="verbose"
      identifier="ajax-error-example"
      @ajax:rows="error = ''"
      @ajax:error="onError"
    />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AlertInfo from "../components/alert/alert-info.vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import { exampleCode } from "../components/code-block/example-code";
import source from "./ajax-error-example.vue?raw";

const showCode = ref(false);
const code = exampleCode(source);

const DEMO_URL = "https://sensetence.com/vue-quintable-demo/data.php";
const BROKEN_URL = "https://quintable-demo.invalid/data.php";

const url = ref(DEMO_URL);
const verbose = ref(false);
const error = ref("");

function onError(e: Error) {
  error.value = e.message;
}

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name", sort: true },
    { headline: "Email", breakpoint: "sm" },
    { headline: "Phone", breakpoint: "md" },
    { headline: "Job Title", breakpoint: "md" },
    { headline: "City", breakpoint: "md" },
    { headline: "Address", breakpoint: "md" },
  ],
  pagination: 5,
  search: true,
  // wait this long after the last key press before the search request
  ajaxRequestDelay: 500,
  ajaxUrl: url.value,
  requestMethod: "POST",
}));
</script>
