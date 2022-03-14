<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Initially pulled config and rows from server via ajax
    </p>

    <VueQuintable :loading="loading" :config="remoteConfig" :rows="remoteRows">
      <template v-slot:loading>
        <div class="text-center py-3 mb-3 text-white bg-success">
          Loading...
          <font-awesome-icon
            class="ms-3"
            icon="circle-notch"
            spin
          ></font-awesome-icon>
        </div>
      </template>
    </VueQuintable>

    <button
      class="btn btn-secondary"
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
      <pre data-toolbar-order="copy-to-clipboard">
             <code class="language-markup">
        &lt;template&gt;
             &lt;VueQuintable :loading=&quot;loading&quot; :config=&quot;remoteConfig&quot; :rows=&quot;remoteRows&quot;&gt;
                &lt;template v-slot:loading&gt;
                    &lt;div class=&quot;text-center py-3 mb-3 text-white bg-success&quot;&gt;
                        Loading... &lt;font-awesome-icon class=&quot;ms-3&quot; icon=&quot;circle-notch&quot; spin&gt;&lt;/font-awesome-icon&gt;
                    &lt;/div&gt;
                &lt;/template&gt;
            &lt;/VueQuintable&gt;
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
                    this.remoteConfig = null;
                    this.remoteRows = null;
                    this.loading = true;
                    axios.get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true").then((response)=>{
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
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueQuintable from "../components/VueQuintable.vue";

export default {
  props: {
    updated: {
      type: [Boolean, Date],
    },
  },
  components: {
    VueQuintable,
  },
  data() {
    return {
      loading: false,
      remoteConfig: {},
      remoteRows: [],
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true")
      .then((response) => {
        this.remoteRows = response.data.rows;
        this.remoteConfig = response.data.config;
        this.loading = false;
      });
  },
  watch: {
    updated() {
      this.remoteConfig = null;
      this.remoteRows = null;
      this.loading = true;
      axios
        .get("https://sensetence.com/vue-quintable-demo/data.php?fetch=true")
        .then((response) => {
          this.remoteRows = response.data.rows;
          this.remoteConfig = response.data.config;
          this.loading = false;
        });
    },
  },
};
</script>
