<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Pagination and sorting will be handled by server side via ajax
    </p>

    <VueQuintable
      v-model="selectedRows"
      :pre-selected-rows="preSelectedRows"
      :axios="axios"
      :config="ajaxConfig"
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

    <b-button v-b-toggle.code-basic variant="secondary" class="mt-3"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code
    </b-button>
    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre data-toolbar-order="copy-to-clipboard">
             <code class="language-markup">
        &lt;template&gt;
            &lt;VueQuintable  v-model=&quot;selectedRows&quot;
                       :pre-selected-rows=&quot;preSelectedRows&quot;
                       :axios=&quot;axios&quot;
                       :config=&quot;ajaxConfig&quot;
                       @ajax:rows=&quot;rowsUpdated&quot; /&gt;
        &lt;/template&gt;

        &lt;script&gt;

    import VueQuintable from &quot;../components/VueQuintable.vue&quot;
    import axiosCustom from &quot;axios&quot;

    axiosCustom.interceptors.request.use(
        (config) =&gt; {

            console.warn(&quot;Custom axios&quot;,config);

            return config
        },
        error =&gt; {
            console.log(&quot;ERROR AXIOS&quot;, error)
        }
    )

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                axios:axiosCustom,
                selectedRows: [],
                allSelectedRows:{},
                preSelectedRowIds: [],
                preSelectedRows: [],
                ajaxRows: [],
                ajaxConfig: {
                    //Object[] columns with headline, sticky, breakpoint, align, sort
                    columns: [
                        {
                            headline: &quot;Name&quot;,

                        }, {
                            headline: &quot;Email&quot;,
                            breakpoint: &quot;sm&quot;,

                        }, {
                            headline: &quot;Phone&quot;,
                            breakpoint: &quot;md&quot;,
                        }, {
                            headline: &quot;Job Title&quot;,
                            breakpoint: &quot;md&quot;,

                        }
                    ],
                    pagination:5,
                    select: true,
                    selectPosition: &quot;pre&quot;,
                    selectAll: true,
                    prettySelect: true,
                    ajaxUrl:&quot;https://quintet.io/vue-quintable-demo/data.php/&quot;,

                },
            }
        },

        watch:{
            selectedRows(rows) {
                for (var i = 0; i &lt; rows.length; i++) {
                    if (this.preSelectedRowIds.indexOf(rows[i].id) === -1) {
                        this.preSelectedRowIds.push(rows[i].id);
                        this.$set(this.allSelectedRows,rows[i].id,rows[i])
                    }
                }

                for (var j = 0; j &lt; this.ajaxRows.length; j++) {
                    var id = this.ajaxRows[j].id;

                    var index = this.preSelectedRowIds.indexOf(id);
                    if (rows.map(r =&gt; r.id).indexOf(id) === -1 &amp;&amp; index !== -1) {
                        this.preSelectedRowIds.splice(index, 1);
                        this.allSelectedRows[id] = rows[i];
                        this.$delete(this.allSelectedRows,id);
                    }
                }
            },
        },
        methods:{
            clearSelection(){
                this.allSelectedRows = {};
                this.preSelectedRows = [];
                this.preSelectedRowIds = [];
            },
            rowsUpdated(data){

                if (data &amp;&amp; data.rows &amp;&amp; data.rows.length) {
                    this.$nextTick(() =&gt; {

                        this.preSelectedRows = this.preSelectedRowIds.map(id =&gt; {
                            return {
                                key: &quot;id&quot;,
                                value: id
                            }
                        });

                    });
                }

                this.ajaxRows = data.rows;
            },
        }
    }
&lt;/script&gt;
    </code>
        </pre>

      <!-- @formatter:on -->
    </b-collapse>
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
        ],
        pagination: 5,
        select: true,
        selectPosition: "pre",
        selectAll: true,
        prettySelect: true,
        ajaxUrl: "https://quintet.io/vue-quintable-demo/data.php/",
      },
    };
  },

  watch: {
    selectedRows(rows) {
      for (var i = 0; i < rows.length; i++) {
        if (this.preSelectedRowIds.indexOf(rows[i].id) === -1) {
          this.preSelectedRowIds.push(rows[i].id);
          this.$set(this.allSelectedRows, rows[i].id, rows[i]);
        }
      }

      for (var j = 0; j < this.ajaxRows.length; j++) {
        var id = this.ajaxRows[j].id;

        var index = this.preSelectedRowIds.indexOf(id);
        if (rows.map((r) => r.id).indexOf(id) === -1 && index !== -1) {
          this.preSelectedRowIds.splice(index, 1);
          this.allSelectedRows[id] = rows[i];
          this.$delete(this.allSelectedRows, id);
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
  },
};
</script>
