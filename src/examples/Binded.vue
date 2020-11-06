<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Change the value in the input to see affect for the table
    </p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:header>
        <input type="text" class="form-control" v-model="input" />
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
                        }, {
                            headline: &quot;Age&quot;,
                        }, {
                            headline: &quot;Birth Place&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                        }
                    ],
                },
                input:&quot;New York&quot;,
                age:18
            }
        },
        computed:{
            initialRows(){

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
            },
            rows(){
                return this.initialRows.map((row,index)=&gt;{
                    if(index === 0){
                        row[2].text = this.input;
                    }

                    if(index === 0){
                        row[1].text = this.age;
                    }

                    return row;
                });
            }
        },

        mounted(){
            setInterval(()=&gt;{

                if(this.age &gt;=35){
                    this.age = 18;
                }else{
                    this.age++;
                }

            },1000);
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
            headline: "Birth Place",
          },
          {
            headline: "Job",
          },
        ],
      },
      input: "New York",
      age: 18,
    };
  },
  computed: {
    initialRows() {
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
    rows() {
      return this.initialRows.map((row, index) => {
        if (index === 0) {
          row[2].text = this.input;
        }

        if (index === 0) {
          row[1].text = this.age;
        }

        return row;
      });
    },
  },

  mounted() {
    setInterval(() => {
      if (this.age >= 35) {
        this.age = 18;
      } else {
        this.age++;
      }
    }, 1000);
  },
};
</script>
