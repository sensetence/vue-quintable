<template>

    <div class="content">
        <p class="alert alert-info">
            <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
            Toggle switches to hide/show columns
        </p>
        <VueQuintable :dynamicConfig="dynamicConfig" :config="config" :rows="rows">

            <template v-slot:header>
                <p><p-check class="p-switch" v-model="hideAge">Hide Age Column</p-check>
                </p>
                <p><p-check class="p-switch" v-model="hideJob">Hide Job  Column</p-check>
                </p>
            </template>

        </VueQuintable>

        <b-button v-b-toggle.code-basic variant="secondary"><font-awesome-icon icon="chevron-up"></font-awesome-icon><font-awesome-icon icon="chevron-down"></font-awesome-icon> <span class="show ml-2">Show</span><span class="hide ml-2">Hide</span> Code </b-button>
        <b-collapse id="code-basic" class="mt-2">
            <!-- @formatter:off -->
            <pre data-toolbar-order="copy-to-clipboard"><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :dynamicConfig=&quot;dynamicConfig&quot; :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;

            &lt;template v-slot:header&gt;
                &lt;p&gt;&lt;p-check class=&quot;p-switch&quot; v-model=&quot;hideAge&quot;&gt;Hide Age Column&lt;/p-check&gt;
                &lt;/p&gt;
                &lt;p&gt;&lt;p-check class=&quot;p-switch&quot; v-model=&quot;hideJob&quot;&gt;Hide Job  Column&lt;/p-check&gt;
                &lt;/p&gt;
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
                hideAge:false,
                hideJob:false,
            }
        },
        computed:{
            config(){

                 return {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                        }, {
                            headline: &quot;Age&quot;,
                            hidden:this.hideAge,
                            breakpoint:&quot;lg&quot;,
                        }, {
                            headline: &quot;Birth Place&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                            hidden:this.hideJob,
                            sticky:true,
                        }
                    ],
                };
            },
            rows(){

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
        watch:{
            hideAge(){
                this.dynamicConfig = true;
                this.$nextTick(()=>{
                    this.dynamicConfig = false;

                });
            },
            hideJob(){
                this.dynamicConfig = true;
                this.$nextTick(()=>{
                    this.dynamicConfig = false;

                });
            },
        }
    }
&lt;/script&gt;</code></pre>

            <!-- @formatter:on -->

        </b-collapse>
    </div>

</template>
<script>

    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
            VueQuintable
        },
        data() {
            return {
                hideAge:false,
                hideJob:false,
                dynamicConfig:false,

            }
        },
        computed:{
            config(){

                 return {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            hidden:this.hideAge,
                            breakpoint:"lg",
                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                            hidden:this.hideJob,
                            sticky:true,
                        }
                    ],
                };
            },
            rows(){

                let count = 10;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i < count; i++){
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
        watch:{
            hideAge(){
                this.dynamicConfig = true;
                this.$nextTick(()=>{
                    this.dynamicConfig = false;

                });
            },
            hideJob(){
                this.dynamicConfig = true;
                this.$nextTick(()=>{
                    this.dynamicConfig = false;

                });
            },
        }
    }
</script>