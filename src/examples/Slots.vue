<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Customized with configured slots
    </p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:cell-complete="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:generated-cell-complete="context">
        <div class="btn btn-sm btn-info" @click.stop="alert(context.cell.text)">
          {{ context.cell.text }}
        </div>
      </template>
      <template v-slot:header>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4>VueQuintable</h4>
          </div>
        </div>
      </template>

      <template v-slot:before-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100 text-center">
            Button before search
          </button>
        </div>
      </template>

      <template v-slot:search="{ placeholder, value, setSearchQuery }">
        <div class="col-md-8">
          <input
            type="search"
            :placeholder="placeholder"
            class="form-control"
            @input="setSearchQuery($event.target.value)"
          />
        </div>
      </template>

      <template v-slot:after-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-secondary w-100 text-center">
            Button after search
          </button>
        </div>
      </template>

      <template v-slot:after-search-container>
        <hr />
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr />
      </template>

      <template v-slot:footer>
        <div class="text-center py-3 px-3 mt-3 bg-info text-white">
          Copyright © 2021 by Quintet Consulting UG (haftungsbeschränkt)
        </div>
      </template>
      <template v-slot:no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </VueQuintable>

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
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup" v-pre>&lt;template&gt;
     &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
        &lt;template v-slot:cell-complete=&quot;context&quot;&gt;
            &lt;div class=&quot;btn btn-sm btn-info&quot; @click.stop=&quot;alert(context.cell.text)&quot;&gt;{{context.cell.text}}&lt;/div&gt;
        &lt;/template&gt;
        &lt;template v-slot:generated-cell-complete=&quot;context&quot;&gt;
            &lt;div class=&quot;btn btn-sm btn-info&quot; @click.stop=&quot;alert(context.cell.text)&quot;&gt;{{context.cell.text}}&lt;/div&gt;
        &lt;/template&gt;
        &lt;template v-slot:header&gt;
            &lt;p-check class=&quot;p-switch&quot; v-model=&quot;showRows&quot;&gt;Toggle Rows&lt;/p-check&gt;
            &lt;hr&gt;
            &lt;div class=&quot;alert alert-primary&quot;&gt;
                &lt;div class=&quot;text-center&quot;&gt;
                    &lt;h4&gt;VueQuintable&lt;/h4&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template v-slot:footer&gt;
            &lt;div class=&quot;text-center py-3 px-3 mt-3 bg-info text-white&quot;&gt;
                Copyright &#169; 2020 by Quintet Consulting UG (haftungsbeschr&#228;nkt)
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template v-slot:no-results&gt;
            &lt;div class=&quot;text-center&quot;&gt;
                &lt;div class=&quot;alert alert-danger&quot;&gt;No Results...&lt;/div&gt;
            &lt;/div&gt;
        &lt;/template&gt;

    &lt;/VueQuintable&gt;
&lt;/template&gt;
&#x3C;script&#x3E;

    import VueQuintable from &#x22;../components/VueQuintable.vue&#x22;
    import Chance from &#x22;chance&#x22;;

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: &#x22;Name&#x22;,
                        }, {
                            headline: &#x22;Age&#x22;,
                        }, {
                            headline: &#x22;Birth Place&#x22;,
                            breakpoint:&#x22;md&#x22;,
                        }, {
                            headline: &#x22;Job&#x22;,
                            breakpoint:&#x22;md&#x22;,
                        }
                    ],
                    searchClass:"col-md-8",
                    showRows:true,
                    search: true,
                },
            }
        },
        computed:{
            rows(){

                if(!this.showRows){
                    return [];
                }

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &#x3C; count; i++){
                    rows.push([
                        {
                            text:chance.name({ nationality: &#x27;en&#x27; })
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
                    ]);
                }

                return rows;


            }
        },
        methods:{
            alert(text){
                alert(&#x22;I clicked the slot &#x22;+ text)
            }
        }

    }
&#x3C;/script&#x3E;</code></pre>

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
          },
          {
            headline: "Birth Place",
            breakpoint: "md",
          },
          {
            headline: "Job",
            breakpoint: "md",
          },
        ],
        search: true,
        searchClass: "col-md-8",
      },
      showRows: true,
    };
  },
  computed: {
    rows() {
      if (!this.showRows) {
        return [];
      }

      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
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
        ]);
      }

      return rows;
    },
  },
  methods: {
    alert(text) {
      alert("I clicked the slot " + text);
    },
  },
};
</script>
