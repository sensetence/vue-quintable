<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Do some filtering/sorting/selecting and then reload the page, state stays
      the same
    </p>
    <VueQuintable
      :config="config"
      :filters.sync="filters"
      :selectedRows.sync="selected"
      :rows="rows"
      :identifier="identifier"
    >
      <template #header>
        <v-select
          v-model="indexes"
          :options="indexesOptions"
          :reduce="(x) => x.value"
          :clearable="false"
          class="mb-3"
        ></v-select>
      </template>
    </VueQuintable>

    <button
      class="btn btn-secondary"
      data-bs-toggle="collapse"
      data-bs-target="#code-basic"
    >
      <font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ms-2">Show</span
      ><span class="hide ms-2">Hide</span> Code
    </button>
    <div id="code-basic" class="mt-2 collapse show">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable
      :config=&quot;config&quot;
      :filters.sync=&quot;filters&quot;
      :selectedRows.sync=&quot;selected&quot;
      :rows=&quot;rows&quot;
      :identifier=&quot;identifier&quot;
    &gt;
      &lt;template #header&gt;
        &lt;v-select
          v-model=&quot;indexes&quot;
          :options=&quot;indexesOptions&quot;
          :clearable=&quot;false&quot;
          :reduce=&quot;(x) =&gt; x.value&quot;
          class=&quot;mb-3&quot;
        &gt;&lt;/v-select&gt;
      &lt;/template&gt;
    &lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: &quot;Name&quot;,
            sort: true,
          },
          {
            headline: &quot;Email&quot;,
            breakpoint: &quot;sm&quot;,
            sort: true,
          },
          {
            headline: &quot;Phone&quot;,
            breakpoint: &quot;md&quot;,
          },
          {
            headline: &quot;Job Title&quot;,
            breakpoint: &quot;md&quot;,
            sort: true,
          },
          {
            headline: &quot;City&quot;,
            breakpoint: &quot;md&quot;,
          },
          {
            headline: &quot;Address&quot;,
            breakpoint: &quot;md&quot;,
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
        ajaxUrl: &quot;https://sensetence.com/vue-quintable-demo/data.php&quot;,
      },
      indexesOptions: [
        { label: &quot;All&quot;, value: &quot;all&quot; },
        { label: &quot;Bigger than 100&quot;, value: &quot;bigger&quot; },
        { label: &quot;Smaller than 100&quot;, value: &quot;smaller&quot; },
      ],
      indexes: &quot;all&quot;,
      identifier: &quot;stored-state-table-ajax&quot;,
      filters: {},
      selected: [],
      rows: [],
    };
  },
  watch: {
    indexes() {
      if (this.indexes === &quot;all&quot;) {
        this.$delete(this.filters, &quot;bigger&quot;);
        this.$delete(this.filters, &quot;smaller&quot;);
      } else if (this.indexes === &quot;bigger&quot;) {
        this.$set(this.filters, &quot;bigger&quot;, true);
        this.$delete(this.filters, &quot;smaller&quot;);
      } else if (this.indexes === &quot;smaller&quot;) {
        this.$set(this.filters, &quot;smaller&quot;, true);
        this.$delete(this.filters, &quot;bigger&quot;);
      }
    },
    filters() {
      if (
        typeof this.filters.smaller === &quot;undefined&quot; &amp;&amp;
        typeof this.filters.bigger === &quot;undefined&quot;
      ) {
        this.indexes = &quot;all&quot;;
      } else if (this.filters.smaller) {
        this.indexes = &quot;smaller&quot;;
      } else if (this.filters.bigger) {
        this.indexes = &quot;bigger&quot;;
      }
    },
  },
};
&lt;/script&gt;</code></pre>

      <!-- @formatter:on -->
    </div>
  </div>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: "Name",
            sort: true,
          },
          {
            headline: "Email",
            breakpoint: "sm",
            sort: true,
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
            sort: true,
          },
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
      },
      indexesOptions: [
        { label: "All", value: "all" },
        { label: "Bigger than 100", value: "bigger" },
        { label: "Smaller than 100", value: "smaller" },
      ],
      indexes: "all",
      identifier: "stored-state-table-ajax",
      filters: {},
      selected: [],
      rows: [],
    };
  },
  watch: {
    indexes() {
      if (this.indexes === "all") {
        this.$delete(this.filters, "bigger");
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "bigger") {
        this.$set(this.filters, "bigger", true);
        this.$delete(this.filters, "smaller");
      } else if (this.indexes === "smaller") {
        this.$set(this.filters, "smaller", true);
        this.$delete(this.filters, "bigger");
      }
    },
    filters() {
      if (
        typeof this.filters.smaller === "undefined" &&
        typeof this.filters.bigger === "undefined"
      ) {
        this.indexes = "all";
      } else if (this.filters.smaller) {
        this.indexes = "smaller";
      } else if (this.filters.bigger) {
        this.indexes = "bigger";
      }
    },
  },
};
</script>
