<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Pagination and sorting will be handled by server side via ajax
    </p>

    <VueQuintable
      :axios="axios"
      :config="ajaxConfig"
      @ajax:rows="rowsUpdated"
    />

    <b-button v-b-toggle.code-basic variant="secondary" class="mt-3"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code
    </b-button>
    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre data-toolbar-order="copy-to-clipboard">
             <code class="language-markup">
        &lt;template&gt;
                &lt;VueQuintable :axios=&quot;axios&quot; :config=&quot;ajaxConfig&quot; @ajax:rows=&quot;rowsUpdated&quot;&gt;&lt;/VueQuintable&gt;
        &lt;/template&gt;

        &lt;script&gt;

            import VueQuintable from "../components/VueQuintable.vue"
            export default {
                components:{
                  VueQuintable
                },
                data() {
                    return {
                        ajaxConfig: {
                            columns: [
                                {
                                    headline: "Name",
                                    sort: true,
                                }, {
                                    headline: "Email",
                                    breakpoint: "sm",
                                    sort: true,
                                }, {
                                    headline: "Phone",
                                    breakpoint: "md",
                                }, {
                                    headline: "Job Title",
                                    breakpoint: "md",
                                    sort: true,
                                }
                            ],
                            pagination:5,
                            pageSortSelect:true,
                            ajaxUrl:"https://quintet.io/vue-quintable-demo/data.php"
                        },
                    }
                },
                methods:{
                    rowsUpdated(rows){
                        if(rows.length){
                            alert("Rows updated from server: "+rows.length +" rows.")
                        }
                    },
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
import VueQuintable from "../components/VueQuintable.vue";
import axiosCustom from "axios";

axiosCustom.interceptors.request.use(
  (config) => {
    console.warn("Custom axios", config);

    return config;
  },
  (error) => {
    console.log("ERROR AXIOS", error);
  }
);

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      axios: axiosCustom,
      ajaxConfig: {
        //Object[] columns with headline, sticky, breakpoint, align, sort
        columns: [
          {
            headline: "Name",
            sort: true,
          },
          {
            headline: "Email",
            breakpoint: "sm",
            sort: true,
          },
          {
            headline: "Phone",
            breakpoint: "md",
          },
          {
            headline: "Job Title",
            breakpoint: "md",
            sort: true,
          },
        ],
        pagination: 5,
        pageSortSelect: true,
        ajaxUrl: "https://quintet.io/vue-quintable-demo/data.php/",
      },
    };
  },
  methods: {
    rowsUpdated(data) {
      if (data.rows.length) {
        alert("Rows updated from server: " + data.rows.length + " rows.");
      }
    },
  },
};
</script>
