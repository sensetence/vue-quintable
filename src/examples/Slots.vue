<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Customized with configured slots
    </p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:header>
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr />
        <div class="alert alert-primary">
          <div class="text-center">
            <h4>VueQuintable</h4>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="text-center py-3 px-3 mt-3 bg-info text-white">
          Copyright © 2020 by Quintet Consulting UG (haftungsbeschränkt)
        </div>
      </template>
      <template v-slot:no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </VueQuintable>

    <b-button class="mt-3" v-b-toggle.code-basic variant="secondary"
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
         &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
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
                    Copyright &copy; 2020 by Quintet Consulting UG (haftungsbeschr&auml;nkt)
                &lt;/div&gt;
            &lt;/template&gt;
            &lt;template v-slot:no-results&gt;
                &lt;div class=&quot;text-center&quot;&gt;
                    &lt;div class=&quot;alert alert-danger&quot;&gt;No Results...&lt;/div&gt;
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
                            headline: &quot;Birth Place&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                        }
                    ],
                },

                showRows:true,
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

                for(let i = 0; i &lt; count; i++){
                    rows.push([
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
                    ]);
                }

                return rows;
            }
        },

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
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
        ],
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
};
</script>
