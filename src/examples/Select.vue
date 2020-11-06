<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Select rows by clicking on checkboxes
    </p>

    <div class="form-group">
      <p-check class="p-switch" v-model="selectAllRows"
        >Select rows cross pages</p-check
      >
    </div>

    <VueQuintable
      :preSelectedRows="preSelectedRows"
      v-model="selectedRows"
      :config="config"
      :rows="rows"
    ></VueQuintable>

    <b-button v-b-toggle.code-basic variant="secondary"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code
    </b-button>
    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      > <code class="language-markup">&lt;template&gt;
    &lt;div class=&quot;form-group&quot;&gt;
        &lt;p-check class=&quot;p-switch&quot; v-model=&quot;selectAllRows&quot;&gt;Select rows cross pages&lt;/p-check&gt;
    &lt;/div&gt;

    &lt;VueQuintable :preSelectedRows=&quot;preSelectedRows&quot; v-model=&quot;selectedRows&quot; :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;

    import VueQuintable from &quot;../components/VueQuintable.vue&quot;
    import Chance from &quot;chance&quot;;

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                selectedRows:[],
                preSelectedRows:[],
                selectAllRows:false,
            }
        },
        computed:{
            config(){
                return {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                            classes: &quot;first-and-last-name&quot;,
                            sort:true,
                        }, {
                            headline: &quot;Age&quot;,
                        }, {
                            headline: &quot;Birth Place&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                        }
                    ],
                    selectPosition:&quot;pre&quot;,
                    select:true,
                    selectAll:true,
                    prettySelect:true,
                    pagination:8,
                    selectAllRows:this.selectAllRows,

                }
            },
            rows(){

                let count = 24;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){
                    rows.push(
                        {
                            selected:i % 2 === 0,
                            disableSelect: i===1,
                            index:i,
                            cells:[
                            {
                                text:chance.name({ nationality: 'en' })
                            },
                            {
                                text:chance.age()
                            },
                            {
                                text:chance.city()
                            },
                            {
                                text:chance.profession()
                            },
                        ]
                        });
                }

                return rows;
            }
        },
        watch:{
            selectAllRows(){
                this.selectedRows = [];

                const selectedRows = [];
                for(let i = 0; i &lt; this.rows.length; i++){
                    if(i===0 || i % 2 !== 0 ){
                        selectedRows.push({
                            key:&quot;index&quot;,
                            value:i,
                        });
                    }
                }

                this.preSelectedRows = selectedRows;

            },
            selectedRows(){
                alert(&quot;Selection Changed - Names:\n&quot; + (this.selectedRows.length?&quot;- &quot;+this.selectedRows.map((row)=&gt;{return row.cells[0].text}).join(&quot;\n- &quot;): &quot;No rows selected&quot;));
            }
        }
    }
&lt;/script&gt;</code>
</pre>

      <!-- @formatter:on -->
    </b-collapse>
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
      selectedRows: [],
      preSelectedRows: [],
      selectAllRows: false,
    };
  },
  computed: {
    config() {
      return {
        columns: [
          {
            headline: "Name",
            classes: "first-and-last-name",
            sort: true,
          },
          {
            headline: "Age",
          },
          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
        ],
        selectPosition: "pre",
        select: true,
        selectAll: true,
        prettySelect: true,
        pagination: 8,
        selectAllRows: this.selectAllRows,
      };
    },
    rows() {
      let count = 24;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push({
          selected: i % 2 === 0,
          disableSelect: i === 1,
          index: i,
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
          ],
        });
      }

      return rows;
    },
  },
  watch: {
    selectAllRows() {
      this.selectedRows = [];

      const selectedRows = [];
      for (let i = 0; i < this.rows.length; i++) {
        if (i === 0 || i % 2 !== 0) {
          selectedRows.push({
            key: "index",
            value: i,
          });
        }
      }

      this.preSelectedRows = selectedRows;
    },
    selectedRows() {
      alert(
        "Selection Changed - Names:\n" +
          (this.selectedRows.length
            ? "- " +
              this.selectedRows
                .map((row) => {
                  return row.cells[0].text;
                })
                .join("\n- ")
            : "No rows selected")
      );
    },
  },
};
</script>
