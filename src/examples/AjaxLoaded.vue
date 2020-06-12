<template>

    <div class="content">

        <p class="alert alert-info">
            <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
            Initially pulled config and rows from server via ajax
        </p>

        <VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows" />

        <b-button v-b-toggle.code-basic variant="secondary">Toggle Code</b-button>
        <b-collapse id="code-basic" class="mt-2">
            <!-- @formatter:off -->
            <pre data-toolbar-order="copy-to-clipboard">
             <code class="language-markup">
        &lt;template&gt;
                &lt;VueQuintable :loading="loading" :config=&quot;remoteConfig&quot; :rows=&quot;remoteRows&quot;&gt;&lt;/VueQuintable&gt;
        &lt;/template&gt;

        &lt;script&gt;
            import axios from 'axios'
            import VueQuintable from "../components/VueQuintable.vue"

            export default {
                components:{
                    VueQuintable
                },
                data() {
                    return {
                        loading:false,
                        remoteConfig:{},
                        remoteRows:[]
                    }
                },
                mounted(){
                    this.loading = true;
                    axios.get("https://quintet.io/vue-quintable-demo/data.php?fetch=true").then((response)=>{
                        this.remoteRows = response.data.rows;
                        this.remoteConfig = response.data.config;
                        this.loading = false;
                    });
                }

            }

        &lt;/script&gt;
    </code>
        </pre>

            <!-- @formatter:on -->

        </b-collapse>
    </div>

</template>
<script>



    import axios from 'axios'
    import VueQuintable from "../components/VueQuintable.vue"

    export default {
        props:{
            updated:{
                type:[Boolean,Date]
            }
        },
        components:{
            VueQuintable
        },
        data() {
            return {
                loading:false,
                remoteConfig:{},
                remoteRows:[]
            }
        },
        mounted(){
            this.loading = true;
            axios.get("https://quintet.io/vue-quintable-demo/data.php?fetch=true").then((response)=>{
                this.remoteRows = response.data.rows;
                this.remoteConfig = response.data.config;
                this.loading = false;
            });
        },
        watch:{
            updated(){
                this.remoteConfig = null;
                this.remoteRows = null;
                this.loading = true;
                axios.get("https://quintet.io/vue-quintable-demo/data.php?fetch=true").then((response)=>{
                    this.remoteRows = response.data.rows;
                    this.remoteConfig = response.data.config;
                    this.loading = false;
                });
            }
        }

    }
</script>