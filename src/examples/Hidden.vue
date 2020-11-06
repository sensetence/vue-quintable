<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Toggle switches to hide/show columns
    </p>
    <VueQuintable :dynamicConfig="dynamicConfig" :config="config" :rows="rows">
      <template v-slot:header>
        <div class="form-group">
          <p-check class="p-switch" v-model="hideAge">Hide Age Column</p-check>
        </div>
        <div class="form-group">
          <p-check class="p-switch" v-model="hideJob">Hide Job Column</p-check>
        </div>
        <div class="form-group">
          <p-check class="p-switch" v-model="hideColumns"
            >Hide empty columns automatically</p-check
          >
        </div>
        <div class="form-group">
          <v-select
            v-model="ignoreSortingColumns"
            :reduce="(option) => option.value"
            :options="ignoreOptions"
            :clearable="false"
          ></v-select>
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
        &lt;VueQuintable :dynamicConfig=&quot;dynamicConfig&quot; :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
            &lt;template v-slot:header&gt;
                &lt;div class=&quot;form-group&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;hideAge&quot;&gt;Hide Age Column&lt;/p-check&gt;
                &lt;/div&gt;
                &lt;div class=&quot;form-group&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;hideJob&quot;&gt;Hide Job Column&lt;/p-check&gt;
                &lt;/div&gt;
                &lt;div class=&quot;form-group&quot;&gt;
                    &lt;p-check class=&quot;p-switch&quot; v-model=&quot;hideColumns&quot;&gt;Hide empty columns automatically&lt;/p-check&gt;
                &lt;/div&gt;
                &lt;div class=&quot;form-group&quot;&gt;
                    &lt;v-select v-model=&quot;ignoreSortingColumns&quot; :reduce=&quot;option=&gt;option.value&quot; :options=&quot;ignoreOptions&quot; :clearable=&quot;false&quot;&gt;&lt;/v-select&gt;
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
                hideColumns:true,
                ignoreSortingColumns:&quot;none&quot;,
                hideAge:false,
                hideJob:false,
                dynamicConfig:false,
                ignoreOptions:[
                    {
                        value:&quot;none&quot;,
                        label:&quot;Don't hide hide empty sorting columns&quot;
                    },
                    {
                        value:&quot;active&quot;,
                        label:&quot;Don't hide active empty sorting columns&quot;
                    },
                    {
                        value:&quot;all&quot;,
                        label:&quot;Hide empty sorting columns&quot;
                    }
                ]
            }
        },
        computed:{
            config(){

                 return {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                            ignoreEmpty:true,
                        }, {
                            headline: &quot;Age&quot;,
                            hidden:this.hideAge,
                            breakpoint:&quot;lg&quot;,
                        }, {
                            headline: &quot;Birth Place&quot;,
                            sort:true,
                        }, {
                            headline: &quot;Job&quot;,
                            hidden:this.hideJob,
                            sticky:true,
                        }
                    ],
                     hideEmptyColumns: this.hideColumns,
                     ignoreSortEmptyColumns:this.ignoreSortingColumns,
                     pagination:10,
                 };
            },
            rows(){

                let count = 20;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){
                    //first entry with a birth place will be the 13. row
                    const city = i &lt; 13 ? &quot;&quot; : chance.city();

                    //lase entry with name will be the 8. row
                    const name = i &gt; 7 ? &quot;&quot; :chance.name({ nationality: 'en' });

                    rows.push([
                        {
                            text:name
                        },
                        {
                            text:chance.age()
                        },
                        {
                            text:city,
                        },
                        {
                            text:chance.profession()
                        },
                    ]);
                }

                return rows;
            }
        },
        watch:{
            hideColumns(){
                this.setConfigDynamicForNextTick();
            },
            ignoreSortingColumns(){
                this.setConfigDynamicForNextTick();
            },
            hideAge(){
                this.setConfigDynamicForNextTick();
            },
            hideJob(){
               this.setConfigDynamicForNextTick();
            },

        },
        methods:{
            setConfigDynamicForNextTick(){
                this.dynamicConfig = true;
                this.$nextTick(()=&gt;{
                    this.dynamicConfig = false;

                });
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
      hideColumns: true,
      ignoreSortingColumns: "none",
      hideAge: false,
      hideJob: false,
      dynamicConfig: false,
      ignoreOptions: [
        {
          value: "none",
          label: "Don't hide hide empty sorting columns",
        },
        {
          value: "active",
          label: "Don't hide active empty sorting columns",
        },
        {
          value: "all",
          label: "Hide empty sorting columns",
        },
      ],
    };
  },
  computed: {
    config() {
      return {
        columns: [
          {
            headline: "Name",
            ignoreEmpty: true,
          },
          {
            headline: "Age",
            hidden: this.hideAge,
            breakpoint: "lg",
          },
          {
            headline: "Birth Place",
            sort: true,
          },
          {
            headline: "Job",
            hidden: this.hideJob,
            sticky: true,
          },
        ],
        hideEmptyColumns: this.hideColumns,
        ignoreSortEmptyColumns: this.ignoreSortingColumns,
        pagination: 10,
      };
    },
    rows() {
      let count = 20;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        //first entry with a birth place will be the 13. row
        const city = i < 13 ? "" : chance.city();

        //lase entry with name will be the 8. row
        const name = i > 7 ? "" : chance.name({ nationality: "en" });

        rows.push([
          {
            text: name,
          },
          {
            text: chance.age(),
          },
          {
            text: city,
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
  watch: {
    hideColumns() {
      this.setConfigDynamicForNextTick();
    },
    ignoreSortingColumns() {
      this.setConfigDynamicForNextTick();
    },
    hideAge() {
      this.setConfigDynamicForNextTick();
    },
    hideJob() {
      this.setConfigDynamicForNextTick();
    },
  },
  methods: {
    setConfigDynamicForNextTick() {
      this.dynamicConfig = true;
      this.$nextTick(() => {
        this.dynamicConfig = false;
      });
    },
  },
};
</script>
