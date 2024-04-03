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
          v-model="active"
          :options="activeOptions"
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
          v-model=&quot;active&quot;
          :options=&quot;activeOptions&quot;
          :clearable=&quot;false&quot;
          :reduce=&quot;(x) =&gt; x.value&quot;
          class=&quot;mb-3&quot;
        &gt;&lt;/v-select&gt;
      &lt;/template&gt;
    &lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;

import Chance from &quot;chance&quot;;

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
          },
          {
            headline: &quot;Age&quot;,
            sort: true,
          },

          {
            headline: &quot;Birth Place&quot;,
          },
          {
            headline: &quot;Job&quot;,
          },
          {
            headline: &quot;Active&quot;,
          },
        ],
        pagination: 5,
        selectAllRows: true,
        pageRange: 3,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
      },
      activeOptions: [
        { label: &quot;All&quot;, value: &quot;both&quot; },
        { label: &quot;Only Active&quot;, value: true },
        { label: &quot;Only Not Active&quot;, value: false },
      ],
      active: &quot;both&quot;,
      identifier: &quot;stored-state-table&quot;,
      filters: {},
      selected: [],
      rows: [],
    };
  },

  created() {
    let storedRows = null;

    try {
      storedRows = localStorage.getItem(&quot;stored-state-table-stored-rows&quot;)
        ? JSON.parse(localStorage.getItem(&quot;stored-state-table-stored-rows&quot;))
        : null;
    } catch (e) {
      //do nothing
    }

    if (!storedRows) {
      let count = 250;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i &lt; count; i++) {
        const rand = Math.random();
        const active = rand &gt;= 0.5;
        rows.push({
          filters: {
            active,
          },
          cells: [
            {
              text: chance.name({ nationality: &quot;en&quot; }),
            },

            {
              text: chance.age(),
            },
            {
              text: chance.city(),
            },
            {
              text: chance.profession(),
            },
            {
              text: active ? &quot;Yes&quot; : &quot;No&quot;,
            },
          ],
        });
      }
      this.rows = rows;
      try {
        localStorage.setItem(
          &quot;stored-state-table-stored-rows&quot;,
          JSON.stringify(rows)
        );
      } catch (e) {
        //do nothing
      }
    } else {
      this.rows = storedRows;
    }
  },
  watch: {
    active() {
      if (this.active === &quot;both&quot;) {
        this.$delete(this.filters, &quot;active&quot;);
      } else {
        this.$set(this.filters, &quot;active&quot;, this.active);
      }
    },
    filters() {
      if (typeof this.filters.active === &quot;undefined&quot;) {
        this.active = &quot;both&quot;;
      } else if (this.filters.active !== this.active) {
        this.active = this.filters.active;
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

import Chance from "chance";

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
          },
          {
            headline: "Age",
            sort: true,
          },

          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
          {
            headline: "Active",
          },
        ],
        pagination: 5,
        selectAllRows: true,
        pageRange: 3,
        rowsSelect: true,
        search: true,
        select: true,
        prettySelect: true,
        storeState: true,
      },
      activeOptions: [
        { label: "All", value: "both" },
        { label: "Only Active", value: true },
        { label: "Only Not Active", value: false },
      ],
      active: "both",
      identifier: "stored-state-table",
      filters: {},
      selected: [],
      rows: [],
    };
  },

  created() {
    let storedRows = null;

    try {
      storedRows = localStorage.getItem("stored-state-table-stored-rows")
        ? JSON.parse(localStorage.getItem("stored-state-table-stored-rows"))
        : null;
    } catch (e) {
      //do nothing
    }

    if (!storedRows) {
      let count = 250;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const active = rand >= 0.5;
        rows.push({
          filters: {
            active,
          },
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },

            {
              text: chance.age(),
            },
            {
              text: chance.city(),
            },
            {
              text: chance.profession(),
            },
            {
              text: active ? "Yes" : "No",
            },
          ],
        });
      }
      this.rows = rows;
      try {
        localStorage.setItem(
          "stored-state-table-stored-rows",
          JSON.stringify(rows)
        );
      } catch (e) {
        //do nothing
      }
    } else {
      this.rows = storedRows;
    }
  },
  watch: {
    active() {
      if (this.active === "both") {
        this.$delete(this.filters, "active");
      } else {
        this.$set(this.filters, "active", this.active);
      }
    },
    filters() {
      if (typeof this.filters.active === "undefined") {
        this.active = "both";
      } else if (this.filters.active !== this.active) {
        this.active = this.filters.active;
      }
    },
  },
};
</script>
