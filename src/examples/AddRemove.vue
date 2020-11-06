<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Use buttons to add/remove/move rows or Drag&Drop [<a
        target="_blank"
        href="https://github.com/cameronhimself/vue-drag-drop"
        >vue-drag-drop</a
      >].
    </p>

    <VueQuintable
      :table-classes="tableClasses"
      :config="config"
      :rows="rows"
      @component:event="componentListener"
    >
      <template v-slot:header>
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label for="index">Index</label>
              <v-select
                id="index"
                :options="indexes"
                v-model="index"
                :clearable="false"
              ></v-select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="age">Age</label>
              <v-select
                id="age"
                :options="ages"
                v-model="age"
                placeholder="Select Age..."
              ></v-select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="city">City</label>
              <input
                id="city"
                v-model="city"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="job">Job</label>
              <input id="job" v-model="job" type="text" class="form-control" />
            </div>
          </div>
          <div class="col-md-2">
            <label><wbr /></label>
            <div class="form-group">
              <span class="btn btn-info" @click="addRow"
                ><font-awesome-icon icon="plus"></font-awesome-icon> Add
                Row</span
              >
            </div>
          </div>
        </div>
      </template>
    </VueQuintable>

    <b-button v-b-toggle.code-basic variant="secondary" class="mr-2 mb-1"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code for App</b-button
    >
    <b-button
      v-b-toggle.code-component-drag
      variant="secondary"
      class="mr-2 mb-1"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code Drag Component</b-button
    >
    <b-button v-b-toggle.code-component variant="secondary" class="mb-1"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code Actions Component</b-button
    >

    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
       &lt;VueQuintable :table-classes="tableClasses" :config=&quot;config&quot; :rows=&quot;rows&quot; @component:event=&quot;componentListener&quot;&gt;

            &lt;template v-slot:header&gt;
                &lt;div class=&quot;row&quot;&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;label for=&quot;index&quot; &gt;Index&lt;/label&gt;
                            &lt;v-select id=&quot;index&quot; :options=&quot;indexes&quot; v-model=&quot;index&quot; :clearable=&quot;false&quot;&gt;&lt;/v-select&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;label for=&quot;name&quot; &gt;Name&lt;/label&gt;
                            &lt;input id=&quot;name&quot; v-model=&quot;name&quot; type=&quot;text&quot; class=&quot;form-control&quot;&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;label for=&quot;age&quot; &gt;Age&lt;/label&gt;
                            &lt;v-select id=&quot;age&quot; :options=&quot;ages&quot; v-model=&quot;age&quot; placeholder=&quot;Select Age...&quot;&gt;&lt;/v-select&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;label for=&quot;city&quot; &gt;City&lt;/label&gt;
                            &lt;input id=&quot;city&quot; v-model=&quot;city&quot; type=&quot;text&quot; class=&quot;form-control&quot;&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;label for=&quot;job&quot; &gt;Job&lt;/label&gt;
                            &lt;input id=&quot;job&quot; v-model=&quot;job&quot; type=&quot;text&quot; class=&quot;form-control&quot;&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class=&quot;col-md-2&quot;&gt;
                        &lt;label&gt;&lt;wbr&gt;&lt;/label&gt;
                        &lt;div class=&quot;form-group&quot;&gt;
                            &lt;span class=&quot;btn btn-info&quot; @click=&quot;addRow&quot;&gt;&lt;font-awesome-icon icon=&quot;plus&quot;&gt;&lt;/font-awesome-icon&gt; Add Row&lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/template&gt;

        &lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
    import VueQuintable from &quot;../components/VueQuintable.vue&quot;
    import DragComponent from &quot;./DragComponent.vue&quot;
    import ActionsComponent from &quot;./ActionsComponent.vue&quot;
    import Vue from &quot;vue&quot;


    Vue.component(
        &quot;actions-component&quot;,
        ActionsComponent.default || ActionsComponent
    );

    Vue.component(
        &quot;drag-component&quot;,
        DragComponent.default || DragComponent
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
                            headline: &quot;&quot;,
                        },{
                            headline: &quot;Name&quot;,
                        }, {
                            headline: &quot;Age&quot;,
                            breakpoint:&quot;md&quot;,
                        }, {
                            headline: &quot;Birth Place&quot;,
                            breakpoint:&quot;lg&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                            breakpoint:&quot;lg&quot;,
                        },{
                            headline:&quot;Actions&quot;,
                            breakpoint:&quot;sm&quot;,
                        }
                    ],
                },
                rows:[],
                index:1,
                name:&quot;&quot;,
                age:null,
                city:&quot;&quot;,
                job:&quot;&quot;,
                rowCount:10,
                dragging:false,
            }
        },
        computed:{
            tableClasses() {
                return this.dragging ? &quot;dragging&quot; : &quot;&quot;;
            },

            ages() {
                return Array.range(1, 99);
            },

            indexes(){
                return this.rows.map((row,index)=&gt;{
                    return index+1;
                });
            }
        },
        created(){
            Array.range = (start, end) =&gt; Array.from({length: (end - start)}, (v, k) =&gt; k + start);

            const rows = [];

            const chance = new Chance();

            for(let i = 0; i &lt; this.rowCount; i++){
                rows.push([
                    {
                        component:{
                            name:&quot;drag-component&quot;,
                            props:{
                                index:i,
                            },
                        }
                    },
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
                    {
                        component:{
                            name:&quot;actions-component&quot;,
                            props:{
                                index:i,
                                first:i===0,
                                last:i===this.rowCount -1,
                            },
                        }
                    }
                ]);
            }
            this.rows = rows;
        },
        methods:{
            updateIndexes(){
                this.rows = this.rows.map((row,index)=&gt;{
                    row[5].component.props.index = index;
                    row[5].component.props.first = index === 0;
                    row[5].component.props.last = index === this.rowCount - 1;
                    row[0].component.props.index = index;
                    return row;
                });
            },
            componentListener(data){
                if(data.type === &quot;delete-row&quot;){
                    this.rows.splice(data.index,1);
                    this.rowCount--;
                    this.updateIndexes();
                }else if(data.type === &quot;move-row&quot;){
                    this.move(data.index,data.to);
                }else if(data.type === &quot;dragstart&quot;){
                    this.dragging = true;
                }else if(data.type === &quot;dragend&quot;){
                    this.dragging = false;
                }
            },
             move(old_index, new_index) {
                if (new_index &gt;= this.rows.length) {
                    var k = new_index - this.rows.length + 1;
                    while (k--) {
                        this.rows.push(undefined);
                    }
                }
                this.rows.splice(new_index, 0, this.rows.splice(old_index, 1)[0]);
                this.updateIndexes();
             },
            addRow(){
                if(!this.name || !this.age || !this.city || !this.job){
                     alert(&quot;You have to fill out all inputs&quot;);
                     return;
                }

                const data = [
                    {
                        component:{
                            name:&quot;drag-component&quot;,
                            props:{
                                index:this.index - 1,
                            },

                        }
                    },
                    {
                        text:this.name
                    },
                    {
                        text:this.age
                    },
                    {
                        text:this.city
                    },
                    {
                        text:this.job
                    },
                    {
                        component:{
                            name:&quot;actions-component&quot;,
                            props:{
                                index:this.index - 1,
                            },

                        }
                    }
                ];

                if(this.index === this.rowCount){
                    this.rows.push(data);
                }else{
                    this.rows.splice(this.index - 1 , 0, data);
                }

                this.index = 1;
                this.name = &quot;&quot;;
                this.age = null;
                this.city = &quot;&quot;;
                this.job = &quot;&quot;;
                this.rowCount ++;

                this.updateIndexes();
            }
        }
    }
&lt;/script&gt;

&lt;style&gt;
    .vue-quintable.dragging .vue-quintable-cell{
        position: relative;
    }

    .vue-quintable.dragging .vue-quintable-cell:after{
        content: &quot;&quot;;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.75);
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 2;
    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element{
        position: relative;
        z-index: 3;

    }

    .vue-quintable.dragging .vue-quintable-cell.actions .drop-element .card{
        background-color: #28a745;
        color: #fff;
    }

&lt;/style&gt;</code></pre>
    </b-collapse>

    <b-collapse id="code-component" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
    &lt;div class=&quot;content&quot;&gt;
        &lt;div class=&quot;btn-group mr-2&quot;&gt;
            &lt;div class=&quot;btn btn-info&quot; :disabled=&quot;first&quot; :class=&quot;{disabled:first}&quot; @click=&quot;moveRow('up')&quot;&gt;
                &lt;font-awesome-icon icon=&quot;chevron-up&quot;&gt;&lt;/font-awesome-icon&gt;
            &lt;/div&gt;
            &lt;div class=&quot;btn btn-info&quot; :disabled=&quot;last&quot; :class=&quot;{disabled:last}&quot; @click=&quot;moveRow('down')&quot;&gt;
                &lt;font-awesome-icon icon=&quot;chevron-down&quot;&gt;&lt;/font-awesome-icon&gt;
            &lt;/div&gt;
       &lt;/div&gt;
        &lt;div class=&quot;btn btn-danger mr-2&quot; @click=&quot;deleteRow&quot; title=&quot;Delete Row&quot;&gt;
            &lt;font-awesome-icon icon=&quot;times&quot;&gt;&lt;/font-awesome-icon&gt;
        &lt;/div&gt;

        &lt;drop  class=&quot;d-inline-block align-middle drop-element&quot; @drop=&quot;handleDrop&quot; title=&quot;Drop your dragging row here to move it&quot;&gt;
            &lt;div class=&quot;card px-3 d-inline-block&quot;&gt;
                &lt;div class=&quot;py-2 bg-muted&quot;&gt;
                    &lt;font-awesome-icon icon=&quot;expand&quot;&gt;&lt;/font-awesome-icon&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/drop&gt;
    &lt;/div&gt;
&lt;/template&gt;


&lt;script&gt;
    import { Drop } from 'vue-drag-drop';

    export default {
        props:{
            first:{
                type:Boolean,
                default:false
            },
            last:{
                type:Boolean,
                default:false
            },
            index:{
                type:Number
            }
        },
        components:{
            Drop
        },
        data(){
            return {
                checked:false,
                reference:&quot;checkbox-component&quot;,
            }
        },
        methods: {
            handleDrop(data) {
                this.$emit(&quot;action&quot;,
                    {
                        index:data.index,
                        type:&quot;move-row&quot;,
                        to:this.index
                    }
                )
            },
            moveRow(mode = &quot;up&quot;) {

                if(mode === &quot;up&quot; &amp;&amp; this.first || mode === &quot;down&quot; &amp;&amp; this.last){
                    return;
                }

                this.$emit(&quot;action&quot;,
                    {
                        index:this.index,
                        type:&quot;move-row&quot;,
                        to:mode === &quot;up&quot; ? this.index - 1:this.index + 1
                    }
                )
            },
            deleteRow(){
                this.$emit(&quot;action&quot;,
                    {
                        index:this.index,
                        type:&quot;delete-row&quot;,
                    }
                )
            }
        }
    }

&lt;/script&gt;
&lt;style scoped&gt;
    .btn.disabled{
        cursor: not-allowed;
    }
&lt;/style&gt;


</code></pre>
    </b-collapse>
    <b-collapse id="code-component-drag" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
    &lt;drag class=&quot;d-inline-block&quot; :transfer-data=&quot;{ index: index }&quot; :effect-allowed=&quot;['move']&quot;
          drop-effect=&quot;move&quot; @dragend=&quot;dragend&quot; @dragstart=&quot;dragstart&quot;&gt;
        &lt;div class=&quot;btn  p-2&quot;&gt;
            &lt;font-awesome-icon icon=&quot;arrows-alt&quot;&gt;&lt;/font-awesome-icon&gt;
        &lt;/div&gt;
    &lt;/drag&gt;
&lt;/template&gt;
&lt;script&gt;
    import { Drag } from 'vue-drag-drop';

    export default {
        props:{
            index:{
                type:Number
            }
        },
        components:{
            Drag
        },
        methods:{
            dragstart(){
                this.$emit(&quot;action&quot;,
                    {
                        index:this.index,
                        type:&quot;dragstart&quot;,
                    }
                );
            },
            dragend(){
                this.$emit(&quot;action&quot;,
                    {
                        index:this.index,
                        type:&quot;dragend&quot;,
                    }
                );
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
import DragComponent from "./DragComponent.vue";
import ActionsComponent from "./ActionsComponent.vue";
import Vue from "vue";

Vue.component(
  "actions-component",
  ActionsComponent.default || ActionsComponent
);

Vue.component("drag-component", DragComponent.default || DragComponent);

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
            headline: "",
          },
          {
            headline: "Name",
          },
          {
            headline: "Age",
            breakpoint: "md",
          },
          {
            headline: "Birth Place",
            breakpoint: "lg",
          },
          {
            headline: "Job",
            breakpoint: "lg",
          },
          {
            headline: "Actions",
            breakpoint: "sm",
          },
        ],
      },
      rows: [],
      index: 1,
      name: "",
      age: null,
      city: "",
      job: "",
      rowCount: 10,
      dragging: false,
    };
  },
  computed: {
    tableClasses() {
      return this.dragging ? "dragging" : "";
    },

    ages() {
      return Array.range(1, 99);
    },

    indexes() {
      return this.rows.map((row, index) => {
        return index + 1;
      });
    },
  },
  created() {
    Array.range = (start, end) =>
      Array.from({ length: end - start }, (v, k) => k + start);

    const rows = [];

    const chance = new Chance();

    for (let i = 0; i < this.rowCount; i++) {
      rows.push([
        {
          component: {
            name: "drag-component",
            props: {
              index: i,
            },
          },
        },
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
        {
          component: {
            name: "actions-component",
            props: {
              index: i,
              first: i === 0,
              last: i === this.rowCount - 1,
            },
          },
        },
      ]);
    }

    this.rows = rows;
  },
  methods: {
    updateIndexes() {
      this.rows = this.rows.map((row, index) => {
        row[5].component.props.index = index;
        row[5].component.props.first = index === 0;
        row[5].component.props.last = index === this.rowCount - 1;
        row[0].component.props.index = index;
        return row;
      });
    },

    componentListener(data) {
      if (data.type === "delete-row") {
        this.rows.splice(data.index, 1);
        this.rowCount--;
        this.updateIndexes();
      } else if (data.type === "move-row") {
        this.move(data.index, data.to);
      } else if (data.type === "dragstart") {
        this.dragging = true;
      } else if (data.type === "dragend") {
        this.dragging = false;
      }
    },

    move(old_index, new_index) {
      if (new_index >= this.rows.length) {
        var k = new_index - this.rows.length + 1;
        while (k--) {
          this.rows.push(undefined);
        }
      }
      this.rows.splice(new_index, 0, this.rows.splice(old_index, 1)[0]);
      this.updateIndexes();
    },
    addRow() {
      if (!this.name || !this.age || !this.city || !this.job) {
        alert("You have to fill out all inputs");
        return;
      }

      const data = [
        {
          component: {
            name: "drag-component",
            props: {
              index: this.index - 1,
            },
          },
        },
        {
          text: this.name,
        },
        {
          text: this.age,
        },
        {
          text: this.city,
        },
        {
          text: this.job,
        },
        {
          component: {
            name: "actions-component",
            props: {
              index: this.index - 1,
            },
          },
        },
      ];

      if (this.index === this.rowCount) {
        this.rows.push(data);
      } else {
        this.rows.splice(this.index - 1, 0, data);
      }

      this.index = 1;
      this.name = "";
      this.age = null;
      this.city = "";
      this.job = "";
      this.rowCount++;

      this.updateIndexes();
    },
  },
};
</script>

<style>
.vue-quintable.dragging .vue-quintable-cell {
  position: relative;
}

.vue-quintable.dragging .vue-quintable-cell:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 2;
}

.vue-quintable.dragging .vue-quintable-cell.actions .drop-element {
  position: relative;
  z-index: 3;
}

.vue-quintable.dragging .vue-quintable-cell.actions .drop-element .card {
  background-color: #28a745;
  color: #fff;
}
</style>
