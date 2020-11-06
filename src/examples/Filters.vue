<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Filter rows by adjust filter and settings switches
    </p>
    <VueQuintable
      :filter-groups="filterGroups"
      :filters="filters"
      :config="config"
      :rows="rows"
      @filtered:rows="visibleRows"
    >
      <template v-slot:header>
        <strong class="mb-2">Filters:</strong>

        <div class="clearfix py-2">
          <p-check class="p-switch" v-model="activeFilter" value="true"
            >Active</p-check
          >
        </div>
        <div class="clearfix py-2">
          <p-check class="p-switch" v-model="printableFilter" value="true"
            >Printable</p-check
          >
        </div>

        <div class="clearfix py-2">
          <p-check class="p-switch" v-model="dynamicFilter" value="true"
            >Regex for name (/Ma/)</p-check
          >
        </div>

        <hr />
        <strong class="mb-2">Settings:</strong>
        <div class="clearfix py-2">
          <p-check class="p-switch" v-model="filterGroupsActive" value="true"
            >Toggle Filter Groups</p-check
          >
        </div>

        <div class="card">
          <div class="card-body">
            <p-radio
              value="AND"
              name="radio"
              color="info"
              v-model="config.filterRelation"
              >AND filter relation</p-radio
            >
            <span class="mx-2"></span>
            <p-radio
              value="OR"
              name="radio"
              color="info"
              v-model="config.filterRelation"
              >OR filter relation</p-radio
            >
          </div>
        </div>
        <hr />
      </template>

      <template v-slot:footer>
        <div class="mb-3 alert alert-info">
          <em>Number of Rows:</em> <strong>{{ number }}</strong>
        </div>
      </template>
    </VueQuintable>

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
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :filter-groups=&quot;filterGroups&quot; :filters=&quot;filters&quot; :config=&quot;config&quot; :rows=&quot;rows&quot; @filtered:rows=&quot;visibleRows&quot;&gt;
            &lt;template v-slot:header&gt;

                &lt;strong class=&quot;mb-2&quot;&gt;Filters:&lt;/strong&gt;

                &lt;div class=&quot;clearfix py-2&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;activeFilter&quot; value=&quot;true&quot;&gt;Active&lt;/p-check&gt;
                &lt;/div&gt;
                &lt;div class=&quot;clearfix py-2&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;printableFilter&quot; value=&quot;true&quot;&gt;Printable&lt;/p-check&gt;
                &lt;/div&gt;

                &lt;div class=&quot;clearfix py-2&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;dynamicFilter&quot; value=&quot;true&quot;&gt;Regex for name (/Ma/)&lt;/p-check&gt;
                &lt;/div&gt;

                &lt;hr&gt;
                &lt;strong class=&quot;mb-2&quot;&gt;Settings:&lt;/strong&gt;
                    &lt;div class=&quot;clearfix py-2&quot;&gt;
                        &lt;p-check class=&quot;p-switch&quot; v-model=&quot;filterGroupsActive&quot; value=&quot;true&quot;&gt;Toggle Filter Groups&lt;/p-check&gt;
                    &lt;/div&gt;

                &lt;div class=&quot;card&quot;&gt;
                    &lt;div class=&quot;card-body&quot;&gt;
                     &lt;p-radio value=&quot;AND&quot; name=&quot;radio&quot; color=&quot;info&quot; v-model=&quot;config.filterRelation&quot;&gt;AND filter relation&lt;/p-radio&gt;
                     &lt;span class=&quot;mx-2&quot;&gt;&lt;/span&gt;
                        &lt;p-radio value=&quot;OR&quot; name=&quot;radio&quot; color=&quot;info&quot; v-model=&quot;config.filterRelation&quot;&gt;OR filter relation&lt;/p-radio&gt;
                    &lt;/div&gt;
                    &lt;/div&gt;
                &lt;hr&gt;
            &lt;/template&gt;

            &lt;template v-slot:footer&gt;
                &lt;div class=&quot;mb-3 alert alert-info&quot;&gt;
                    &lt;em&gt;Number of Rows:&lt;/em&gt; &lt;strong&gt;{{number}}&lt;/strong&gt;
                &lt;/div&gt;
            &lt;/template&gt;
        &lt;/VueQuintable&gt;
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
                config: {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                        }, {
                            headline: &quot;Age&quot;,
                        }, {
                            headline: &quot;Printable&quot;,
                        }, {
                            headline: &quot;Active&quot;,
                        }
                    ],
                    search:true,
                    useFuzzySearch:true,
                    searchLength:3,
                    filterRelation:&quot;AND&quot;,
                    searchPlaceholder:&quot;Search rows...&quot;,
                },
                filters:{
                },
                filterGroupsDefaults:[
                    {
                        items:[
                            {
                                items:[
                                    {name:&quot;name&quot;},
                                    {name:&quot;active&quot;}
                                ],
                                relation:&quot;OR&quot;,
                            },
                            {
                                items:[
                                    {
                                        name:&quot;printable&quot;
                                    }
                                ],
                            }
                        ],
                        relation:&quot;AND&quot;
                    }
                ],
                filterGroupsActive:false,
                printableFilter:false,
                activeFilter:false,
                dynamicFilter:false,
                number:0,

            }
        },
        computed:{
            filterGroups(){
                  return this.filterGroupsActive?this.filterGroupsDefaults:[];
            },
            rows(){

                let count = 50;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){
                    const printable = Math.random() &gt;= 0.5;
                    const active = Math.random() &gt;= 0.5;
                    const name = chance.name({ nationality: 'en' });
                    const age = chance.age();

                    rows.push(
                        {
                            cells:[
                                {
                                    text:name
                                },
                                {
                                    text:age
                                },
                                {
                                    component:{
                                        name:&quot;font-awesome-icon&quot;,
                                        props: {
                                            icon: (printable ? &quot;check&quot; : &quot;times&quot;)
                                        }
                                    }
                                },
                                {
                                    component:{
                                        name:&quot;font-awesome-icon&quot;,
                                        props: {
                                            icon: (active ? &quot;check&quot; : &quot;times&quot;)
                                        }
                                    }
                                },

                            ],
                            filters: {
                                active: active,
                                printable: printable,
                                name:name,
                            }
                        });
                }

                return rows;
            }
        },
        watch:{
            activeFilter(val){
                if(val){
                    this.$set(this.filters,&quot;active&quot;,true);
                }else{
                    this.$delete(this.filters,&quot;active&quot;);
                }

            },
            printableFilter(val){
                if(val){
                    this.$set(this.filters,&quot;printable&quot;,true);
                }else{
                    this.$delete(this.filters,&quot;printable&quot;);
                }
            },

            dynamicFilter(val){
                if(val){
                    this.$set(this.filters,&quot;name&quot;,{
                        operator:&quot;matches&quot;,
                        values:new RegExp(&quot;Ma&quot;)
                    });
                }else{
                    this.$delete(this.filters,&quot;name&quot;);
                }
            },



        },
        methods:{
            visibleRows(rows){
                this.number = rows.length;
            }
        }

    }
&lt;/script&gt;</code></pre>

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
      config: {
        columns: [
          {
            headline: "Name",
          },
          {
            headline: "Age",
          },
          {
            headline: "Printable",
          },
          {
            headline: "Active",
          },
        ],
        search: true,
        useFuzzySearch: true,
        searchLength: 3,
        filterRelation: "AND",
        searchPlaceholder: "Search rows...",
      },
      filters: {},
      filterGroupsDefaults: [
        {
          items: [
            {
              items: [{ name: "name" }, { name: "active" }],
              relation: "OR",
            },
            {
              items: [
                {
                  name: "printable",
                },
              ],
            },
          ],
          relation: "AND",
        },
      ],
      filterGroupsActive: false,
      printableFilter: false,
      activeFilter: false,
      dynamicFilter: false,
      number: 0,
    };
  },
  computed: {
    filterGroups() {
      return this.filterGroupsActive ? this.filterGroupsDefaults : [];
    },
    rows() {
      let count = 50;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const printable = Math.random() >= 0.5;
        const active = Math.random() >= 0.5;
        const name = chance.name({ nationality: "en" });
        const age = chance.age();

        rows.push({
          cells: [
            {
              text: name,
            },
            {
              text: age,
            },
            {
              component: {
                name: "font-awesome-icon",
                props: {
                  icon: printable ? "check" : "times",
                },
              },
            },
            {
              component: {
                name: "font-awesome-icon",
                props: {
                  icon: active ? "check" : "times",
                },
              },
            },
          ],
          filters: {
            active: active,
            printable: printable,
            name: name,
          },
        });
      }

      return rows;
    },
  },
  watch: {
    activeFilter(val) {
      if (val) {
        this.$set(this.filters, "active", true);
      } else {
        this.$delete(this.filters, "active");
      }
    },
    printableFilter(val) {
      if (val) {
        this.$set(this.filters, "printable", true);
      } else {
        this.$delete(this.filters, "printable");
      }
    },

    dynamicFilter(val) {
      if (val) {
        this.$set(this.filters, "name", {
          operator: "matches",
          values: new RegExp("Ma"),
        });
      } else {
        this.$delete(this.filters, "name");
      }
    },
  },
  methods: {
    visibleRows(rows) {
      this.number = rows.length;
    },
  },
};
</script>
