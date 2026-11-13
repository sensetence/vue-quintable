<template>
  <div class="content">
    <alert-info
      >When a request fails, the table shows its <code>error</code> slot and
      fires the <code>ajax:error</code> event. Switch to the unreachable server
      (an <code>.invalid</code> host never resolves), then back. With the
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

    <p class="mb-2" aria-live="polite">
      Failed requests so far: <strong>{{ failures }}</strong>
    </p>

    <!-- table -->
    <vue-quintable
      :config="config"
      :verbose="verbose"
      identifier="ajax-error-example"
      @ajax:error="failures++"
    >
      <template #error="{ error, reload }">
        <div class="alert alert-danger" role="alert">
          The rows could not be loaded: {{ error.message }}. Check the URL and
          the server, then
          <button
            type="button"
            class="btn btn-link alert-link p-0 align-baseline"
            @click="reload()"
          >
            load them again</button
          >.
        </div>
      </template>
    </vue-quintable>

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
const failures = ref(0);

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
  ajaxRequestDelay: 300,
  ajaxUrl: url.value,
  requestMethod: "POST",
}));
</script>
