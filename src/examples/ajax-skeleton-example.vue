<template>
  <div class="content">
    <alert-info
      >The rows come from the server. While they load,
      <code>skeletonLoading</code> shows grey bars in the shape of the table
      instead of a spinner, so the page keeps its height. "Reload" fires a
      signal of the page, as a router visit or a saved form would; the table
      subscribes to it with <code>reloadOn</code> and fetches its current page
      again.</alert-info
    >

    <div class="d-flex flex-wrap align-items-center gap-3 mb-3">
      <div class="form-check form-switch mb-0">
        <input
          id="skeleton-loading"
          v-model="skeletonLoading"
          class="form-check-input"
          type="checkbox"
        />
        <label class="form-check-label" for="skeleton-loading"
          >Skeleton while loading</label
        >
      </div>
      <button
        type="button"
        class="btn btn-sm btn-outline-primary"
        @click="reloadAll"
      >
        Reload
      </button>
    </div>

    <!-- table -->
    <vue-quintable :config="config" />

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueQuintable from "../components/table/vue-quintable.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import AlertInfo from "../components/alert/alert-info.vue";

const showCode = ref(false);
const skeletonLoading = ref(true);

// A page-wide signal. In an app this is e.g. a router event after a visit.
const listeners = new Set<() => void>();
function reloadOn(reload: () => void) {
  listeners.add(reload);
  return () => listeners.delete(reload);
}
function reloadAll() {
  listeners.forEach((reload) => reload());
}

// table data
const config = computed(() => ({
  columns: [
    { headline: "Name", sort: true },
    { headline: "Email", breakpoint: "sm", sort: true },
    { headline: "Phone", breakpoint: "md" },
    { headline: "Job Title", breakpoint: "md", sort: true },
    { headline: "City", breakpoint: "md" },
  ],
  pagination: 5,
  search: true,
  ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
  requestMethod: "POST",
  skeletonLoading: skeletonLoading.value,
  reloadOn,
}));

// example code
const code = `&lt;template&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-sm btn-outline-primary&quot; @click=&quot;reloadAll&quot;&gt;
    Reload
  &lt;/button&gt;
  &lt;vue-quintable :config=&quot;config&quot; /&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import VueQuintable from &quot;../components/table/vue-quintable.vue&quot;;

// A page-wide signal. In an app this is e.g. a router event after a visit.
const listeners = new Set&lt;() =&gt; void&gt;();
function reloadOn(reload: () =&gt; void) {
  listeners.add(reload);
  return () =&gt; listeners.delete(reload); // called when the table unmounts
}
function reloadAll() {
  listeners.forEach((reload) =&gt; reload());
}

const config = {
  columns: [
    { headline: &quot;Name&quot;, sort: true },
    { headline: &quot;Email&quot;, breakpoint: &quot;sm&quot;, sort: true },
    { headline: &quot;Phone&quot;, breakpoint: &quot;md&quot; },
    { headline: &quot;Job Title&quot;, breakpoint: &quot;md&quot;, sort: true },
    { headline: &quot;City&quot;, breakpoint: &quot;md&quot; },
  ],
  pagination: 5,
  search: true,
  ajaxUrl: &quot;https://sensetence.com/vue-quintable-demo/data.php&quot;,
  requestMethod: &quot;POST&quot;,
  skeletonLoading: true,
  reloadOn,
};

// Or for every table of the app:
// app.use(VueQuintable, { defaults: { skeletonLoading: true, reloadOn } });
&lt;/script&gt;`;
</script>
