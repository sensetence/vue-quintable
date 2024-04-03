<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Pagination and sorting will be handled by server side via ajax
    </p>

    <VueQuintable
      :axios="axios"
      :config="ajaxConfig"
      @ajax:rows="rowsUpdated"
    />

    <button
      class="btn btn-secondary mt-3"
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
                                }, {
                                    headline: &quot;City&quot;,
                                    breakpoint: &quot;md&quot;,
                                }, {
                                    headline: &quot;Address&quot;,
                                    breakpoint: &quot;md&quot;,

                                }
                            ],
                            pagination:5,
                            pageSortSelect:true,
                            ajaxUrl:"https://sensetence.com/vue-quintable-demo/data.php",
                            requestMethod: "POST",
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
    </div>
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
          {
            headline: "City",
            breakpoint: "md",
          },
          {
            headline: "Address",
            breakpoint: "md",
          },
        ],
        pagination: 5,
        search: true,
        pageSortSelect: true,
        ajaxUrl: "https://sensetence.com/vue-quintable-demo/data.php",
        requestMethod: "POST",
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
