<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Rows are calculated and passed as a computed property
    </p>
    <VueQuintable
      :config="config"
      :rows="rows"
      @component:event="onComponentEvent"
    ></VueQuintable>

    <button
      class="btn btn-secondary mb-1 me-2"
      data-bs-toggle="collapse"
      data-bs-target="#code-basic"
    >
      <font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ms-2">Show</span
      ><span class="hide ms-2">Hide</span> Code for App
    </button>
    <button
      class="btn btn-secondary mb-1"
      data-bs-toggle="collapse"
      data-bs-target="#code-component"
    >
      <font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ms-2">Show</span
      ><span class="hide ms-2">Hide</span> Code Component
    </button>

    <div id="code-basic" class="mt-2 collapse show">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot; @component:event="onComponentEvent" &gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;

    import VueQuintable from &quot;../components/VueQuintable.vue&quot;
    import CheckboxComponent from &quot;./components/CheckboxComponent.vue&quot;
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
    </div>

    <div id="code-component" class="mt-2 collapse show">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
    &lt;div class=&quot;checkbox-wrapper&quot;&gt;
        &lt;div&gt;
            &lt;span class=&quot;me-2&quot; v-html="name"&gt;&lt;/span&gt;
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
    </div>
  </div>
</template>
<script>
import VueQuintable from "../components/VueQuintable.vue";
import CheckboxComponent from "./components/CheckboxComponent.vue";
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
