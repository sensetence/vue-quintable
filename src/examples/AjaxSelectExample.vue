<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Selecting rows will be persistent, even if pages are changes via ajax
    </p>

    <VueQuintable
      :selected-rows.sync="selectedRows"
      :pre-selected-rows="preSelectedRows"
      :axios="axios"
      :config="ajaxConfig"
      @update:page="onPageChange"
      @ajax:rows="rowsUpdated"
    />

    <p v-if="preSelectedRowIds.length">
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
    <div class="clearfix"></div>

    <button
      class="btn btn-secondary mt-3"
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
      <pre data-toolbar-order="copy-to-clipboard">
             <code class="language-markup" v-pre>
        &lt;template&gt;
           &lt;VueQuintable
            :selected-rows.sync=&quot;selectedRows&quot;
            :pre-selected-rows=&quot;preSelectedRows&quot;
            :axios=&quot;axios&quot;
            :config=&quot;ajaxConfig&quot;
            @update:page=&quot;onPageChange&quot;
            @ajax:rows=&quot;rowsUpdated&quot;
          /&gt;

          &lt;p v-if=&quot;preSelectedRowIds.length&quot;&gt;
            &lt;strong&gt;Selected Rows:&lt;/strong&gt;
          &lt;/p&gt;
          &lt;div class=&quot;list-group&quot;&gt;
            &lt;div class=&quot;list-group-item&quot; v-for=&quot;id in preSelectedRowIds&quot; :key=&quot;id&quot;&gt;
              {{ allSelectedRows[id].cells[0].html }}
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div
            class=&quot;btn btn-danger mt-2&quot;
            v-if=&quot;preSelectedRowIds.length&quot;
            @click=&quot;clearSelection&quot;
          &gt;
            Clear
          &lt;/div&gt;
          &lt;div class=&quot;clearfix&quot;&gt;&lt;/div&gt;
        &lt;/template&gt;

        &lt;script&gt;
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;
import axiosCustom from &quot;axios&quot;;

axiosCustom.interceptors.request.use(
  (config) =&gt; {
    console.warn(&quot;Custom axios&quot;, config);

    return config;
  },
  (error) =&gt; {
    console.log(&quot;ERROR AXIOS&quot;, error);
  }
);

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      axios: axiosCustom,
      selectedRows: [],
      allSelectedRows: {},
      preSelectedRowIds: [],
      preSelectedRows: [],
      ajaxRows: [],
      ajaxConfig: {
        //Object[] columns with headline, sticky, breakpoint, align, sort
        columns: [
          {
            headline: &quot;Name&quot;,
          },
          {
            headline: &quot;Email&quot;,
            breakpoint: &quot;sm&quot;,
          },
          {
            headline: &quot;Phone&quot;,
            breakpoint: &quot;md&quot;,
          },
          {
            headline: &quot;Job Title&quot;,
            breakpoint: &quot;md&quot;,
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
        select: true,
        selectPosition: &quot;pre&quot;,
        selectAll: true,
        prettySelect: true,
        ajaxUrl: &quot;https://sensetence.com/vue-quintable-demo/data.php/&quot;,
        pageChanged: false,
      },
    };
  },

  watch: {
    selectedRows(rows) {
      if (!this.pageChanged &amp;&amp; this.ajaxRows) {
        for (let i = 0; i &lt; rows.length; i++) {
          if (!this.preSelectedRowIds.includes(rows[i].id)) {
            this.preSelectedRowIds.push(rows[i].id);
            this.$set(this.allSelectedRows, rows[i].id, rows[i]);
          }
        }

        for (let j = 0; j &lt; this.ajaxRows.length; j++) {
          const id = this.ajaxRows[j].id;

          const index = this.preSelectedRowIds.indexOf(id);

          if (!rows.map((r) =&gt; r.id).includes(id) &amp;&amp; index !== -1) {
            this.preSelectedRowIds.splice(index, 1);
            this.$delete(this.allSelectedRows, id);
          }
        }
      }
    },
  },
  methods: {
    clearSelection() {
      this.allSelectedRows = {};
      this.preSelectedRows = [];
      this.preSelectedRowIds = [];
    },
    rowsUpdated(data) {
      this.pageChanged = false;
      if (data &amp;&amp; data.rows &amp;&amp; data.rows.length) {
        this.$nextTick(() =&gt; {
          this.preSelectedRows = this.preSelectedRowIds.map((id) =&gt; {
            return {
              key: &quot;id&quot;,
              value: id,
            };
          });
        });
      }

      this.ajaxRows = data.rows;
    },
    onPageChange() {
      this.pageChanged = true;
    },
  },
};
&lt;/script&gt;
    </code>
        </pre>

      <!-- @formatter:on -->
    </div>
  </div>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import axiosCustom from "axios";

axiosCustom.interceptors.request.use(
  (config) => {
    console.warn("Custom axios", config);

    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  }
);

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      axios: axiosCustom,
      selectedRows: [],
      allSelectedRows: {},
      preSelectedRowIds: [],
      preSelectedRows: [],
      ajaxRows: [],
      ajaxConfig: {
        //Object[] columns with headline, sticky, breakpoint, align, sort
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Email",
            breakpoint: "sm",
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
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
        select: true,
        selectPosition: "pre",
        selectAll: true,
        prettySelect: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php/",
        pageChanged: false,
      },
    };
  },

  watch: {
    selectedRows(rows) {
      if (!this.pageChanged && this.ajaxRows) {
        for (let i = 0; i < rows.length; i++) {
          if (!this.preSelectedRowIds.includes(rows[i].id)) {
            this.preSelectedRowIds.push(rows[i].id);
            this.$set(this.allSelectedRows, rows[i].id, rows[i]);
          }
        }

        for (let j = 0; j < this.ajaxRows.length; j++) {
          const id = this.ajaxRows[j].id;

          const index = this.preSelectedRowIds.indexOf(id);

          if (!rows.map((r) => r.id).includes(id) && index !== -1) {
            this.preSelectedRowIds.splice(index, 1);
            this.$delete(this.allSelectedRows, id);
          }
        }
      }
    },
  },
  methods: {
    clearSelection() {
      this.allSelectedRows = {};
      this.preSelectedRows = [];
      this.preSelectedRowIds = [];
    },
    rowsUpdated(data) {
      this.pageChanged = false;
      if (data && data.rows && data.rows.length) {
        this.$nextTick(() => {
          this.preSelectedRows = this.preSelectedRowIds.map((id) => {
            return {
              key: "id",
              value: id,
            };
          });
        });
      }

      this.ajaxRows = data.rows;
    },
    onPageChange() {
      this.pageChanged = true;
    },
  },
};
</script>
