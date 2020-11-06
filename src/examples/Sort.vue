<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Hover and click on headlines for sorting
    </p>

    <VueQuintable
      :sort-order="sortOrder"
      :config="config"
      :rows="rows"
    ></VueQuintable>

    <b-button v-b-toggle.code-basic variant="secondary" class="mt-3"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code
    </b-button>
    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup"> &lt;template&gt;
        &lt;VueQuintable  :sort-order="sortOrder" :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
    import VueQuintable from "../components/VueQuintable.vue"
    import Chance from "chance";

    export default {
        components:{
          VueQuintable
        },
        data() {
            return {
                config: {
                    columns: [
                        {
                            headline: "Name",
                        }, {
                            headline: "Age",
                            sort:true

                        }, {
                            headline: "Birth Place",
                        }, {
                            headline: "Job",
                            sort:true
                        }
                    ],
                    multiSort:true,
                    multiSortSelect:true,
                    pageSort:true,
                    pageSortSelect:true,
                    pagination:5,
                    search:true,
                },
                sortOrder:[{
                    index:1,
                    asc:false,
                }]

            }
        },
        computed:{
            rows(){

                let count = 30;
                const rows = [];

                const chance = new Chance();

                for(let i = 0; i &lt; count; i++){

                    const randSortValue = Math.ceil(Math.random() * 10);

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
                            html:&quot;&lt;span class\&quot;mr-2\&quot;&gt;&quot; + chance.profession() +&quot;&lt;/span&gt;&lt;em&gt;&quot;+ &quot;[&quot;+randSortValue+&quot;]&lt;/em&gt;&quot;,
                            sortValue: randSortValue
                        },
                    ]);
                }

                return rows;
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
            sort: true,
          },
          {
            headline: "Birth Place",
          },
          {
            headline: "Job",
            sort: true,
          },
        ],
        multiSort: false,
        multiSortSelect: true,
        pageSort: false,
        pageSortSelect: true,
        pagination: 5,
        search: true,
      },
      sortOrder: [
        {
          index: 1,
          asc: false,
        },
      ],
    };
  },
  computed: {
    rows() {
      let count = 30;
      const rows = [];

      const chance = new Chance();

      for (let i = 0; i < count; i++) {
        const randSortValue = Math.ceil(Math.random() * 10);

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
            html:
              '<span class="mr-2">' +
              chance.profession() +
              "</span><em>" +
              "[" +
              randSortValue +
              "]</em>",
            sortValue: randSortValue,
          },
        ]);
      }

      return rows;
    },
  },
};
</script>
