<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Rows are calculated and passed as a computed property
    </p>
    <VueQuintable
      :config="config"
      :rows="rows"
      @component:event="onComponentEvent"
    ></VueQuintable>

    <b-button v-b-toggle.code-basic variant="secondary" class="mr-2 mb-1"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code for App</b-button
    >
    <b-button v-b-toggle.code-component variant="secondary" class="mb-1"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code Component</b-button
    >

    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot; @component:event="onComponentEvent" &gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;

    import VueQuintable from &quot;../components/VueQuintable.vue&quot;
    import CheckboxComponent from &quot;./CheckboxComponent.vue&quot;
    import Vue from &quot;vue&quot;


    Vue.component(
        &quot;checkbox-component&quot;,
        CheckboxComponent.default || CheckboxComponent
    );


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

            }
        },
        computed:{
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){
                    rows.push([
                        {
                            component: {
                                name: &quot;checkbox-component&quot;,
                                props: {
                                    index: i+1,
                                    name: chance.name({ nationality: 'en' }),
                                }
                            }
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
            onComponentEvent(data){
                alert(
                    &quot;Component &quot; +data.reference +
                    &quot; on index &quot; + data.index +
                    &quot; has just been&quot; +
                    (data.checked ? &quot; checked!&quot; : &quot; unchecked!&quot;)
                );
            }
        }
    }
&lt;/script&gt;</code></pre>

      <!-- @formatter:on -->
    </b-collapse>

    <b-collapse id="code-component" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
    &lt;div class=&quot;checkbox-wrapper&quot;&gt;
        &lt;div&gt;
            &lt;span class=&quot;mr-2&quot; v-html="name"&gt;&lt;/span&gt;
            &lt;p-check v-model=&quot;checked&quot; @change=&quot;toggleCheck&quot;&gt;&lt;wbr&gt;&lt;/p-check&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;


&lt;script&gt;

    export default {
        props:{
            index:{
                type:Number
            },
            name:{
                type:String
            }
        },
        data(){
            return {
                checked:true,
                reference:&quot;checkbox-component&quot;,
            }
        },
        methods: {
            check() {
                this.$emit(&quot;action&quot;,
                    {
                        reference:this.reference,
                        index:this.index,
                        checked:this.checked,
                    }
                )
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
import CheckboxComponent from "./CheckboxComponent.vue";
import Vue from "vue";

Vue.component(
  "checkbox-component",
  CheckboxComponent.default || CheckboxComponent
);

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
    };
  },
  computed: {
    rows() {
      let count = 10;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        rows.push([
          {
            component: {
              name: "checkbox-component",
              props: {
                index: i + 1,
                name: chance.name({ nationality: "en" }),
              },
            },
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
    onComponentEvent(data) {
      alert(
        "Component " +
          data.reference +
          " on index " +
          data.index +
          " has just been" +
          (data.checked ? " checked!" : " unchecked!")
      );
    },
  },
};
</script>



