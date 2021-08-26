<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Just a simple table
    </p>

    <VueQuintable :config="config" :rows="rows"></VueQuintable>

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
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;&lt;/VueQuintable&gt;
&lt;/template&gt;

&lt;script&gt;
    import VueQuintable from &quot;../components/VueQuintable.vue&quot;

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

                rows: [
                    [
                        {
                            html: &quot;&lt;em&gt;John Doe&lt;/em&gt;&quot;
                        },
                        {
                            text: 40
                        },
                        {
                            text: &quot;New York&quot;
                        },
                        {
                            text: &quot;CFO&quot;
                        },
                    ],
                    [
                        {
                            text: &quot;Mia Wong&quot;,
                            classes:&quot;text-primary&quot;
                        },
                        {
                            text: 50
                        },
                        {
                            text: &quot;Beijing&quot;
                        },
                        {
                            text: &quot;CEO&quot;
                        },
                    ],
                    [
                        {
                            text: &quot;Peter Stanbridge&quot;
                        },
                        {
                            text: 18
                        },
                        {
                            text: &quot;London&quot;
                        },
                        {
                            text: &quot;Trainee&quot;,
                            align:&quot;end&quot;
                        },
                    ],
                    {
                         cells:[   {
                                text: &quot;Natalie Lee-Walsh&quot;
                            },
                            {
                                text: 25
                            },
                            {
                                text: &quot;Dublin&quot;
                            },
                            {
                                text: &quot;Managing Director&quot;
                            },
                        ],
                        classes:&quot;text-danger&quot;
                    },
                ],
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

      rows: [
        [
          {
            html: "<em>John Doe</em>",
          },
          {
            text: 40,
          },
          {
            text: "New York",
          },
          {
            text: "CFO",
          },
        ],
        [
          {
            text: "Mia Wong",
            classes: "text-primary",
          },
          {
            text: 50,
          },
          {
            text: "Beijing",
          },
          {
            text: "CEO",
          },
        ],
        [
          {
            text: "Peter Stanbridge",
          },
          {
            text: 18,
          },
          {
            text: "London",
          },
          {
            text: "Trainee",
            align: "end",
          },
        ],
        {
          cells: [
            {
              text: "Natalie Lee-Walsh",
            },
            {
              text: 25,
            },
            {
              text: "Dublin",
            },
            {
              text: "Managing Director",
            },
          ],
          classes: "text-danger",
        },
      ],
    };
  },
};
</script>
