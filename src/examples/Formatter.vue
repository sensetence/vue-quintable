<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Cells will be formatted by custom formatting functions
    </p>

    <VueQuintable :config="config" :rows="rows"></VueQuintable>

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
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
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
                            cellFormatter:(cell)=&gt;{
                                return &quot;Name: &quot; +  cell.content.name
                            }
                        }, {
                            headline: &quot;Age&quot;,
                            cellFormatter:(cell)=&gt;{
                                return {
                                    value:&quot;&lt;strong&gt;&quot;+cell.content.age+&quot;&lt;/strong&gt;&quot;,
                                    type:&quot;html&quot;,
                                }
                            }
                        }, {
                            headline: &quot;Birth Place&quot;,
                            cellFormatter:(cell)=&gt;{
                                return cell.content.city
                            }
                        }, {
                            headline: &quot;Job&quot;,
                            cellFormatter:(cell)=&gt;{
                                return cell.content.profession
                            }
                        }
                    ],
                },

             }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();



                for(let i = 0; i &lt; count; i++){

                    const row = {
                        name:chance.name({ nationality: 'en' }),
                        age:chance.age(),
                        city:chance.city(),
                        profession:chance.profession(),
                    };

                    rows.push([
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                        {
                            content:row
                        },
                    ]);
                }

                return rows;
            }
        }
    }
&lt;/script&gt;
</code></pre>

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
            cellFormatter: (cell) => {
              return "Name: " + cell.content.name;
            },
          },
          {
            headline: "Age",
            cellFormatter: (cell) => {
              return {
                value: "<strong>" + cell.content.age + "</strong>",
                type: "html",
              };
            },
          },
          {
            headline: "Birth Place",
            cellFormatter: (cell) => {
              return cell.content.city;
            },
          },
          {
            headline: "Job",
            cellFormatter: (cell) => {
              return cell.content.profession;
            },
          },
        ],
      },
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const row = {
          name: chance.name({ nationality: "en" }),
          age: chance.age(),
          city: chance.city(),
          profession: chance.profession(),
        };

        rows.push([
          {
            content: row,
          },
          {
            content: row,
          },
          {
            content: row,
          },
          {
            content: row,
          },
        ]);
      }

      return rows;
    },
  },
};
</script>
