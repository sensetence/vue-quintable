<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Hover over rows and cells to see the tooltips
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
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;
import Chance from &quot;chance&quot;;

export default {
  components: {
    VueQuintable,
  },
  data() {
    return {
      config: {
        columns: [
          {
            headline: &quot;Name&quot;,
          },
          {
            headline: &quot;Age&quot;,
            showHeadlineBreakpoint: &quot;md&quot;,
            breakpoint: &quot;md&quot;,
          },
          {
            headline: &quot;Birth Place&quot;,
            sticky: true,
          },
          {
            headline: &quot;Job&quot;,
            breakpoint: &quot;all&quot;,
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

      for (let i = 0; i &lt; count; i++) {
        rows.push({
          cells: [
            {
              text: chance.name({ nationality: &quot;en&quot; }),
            },
            {
              text: chance.age(),
              tooltip: &quot;Age &quot; + i,
            },
            {
              text: chance.city(),
              tooltip: &quot;City &quot; + i,
            },
            {
              text: chance.profession(),
              tooltip: &quot;Job &quot; + i,
            },
          ],
          tooltip: &quot;Row &quot; + i,
        });
      }

      return rows;
    },
  },
};
&lt;/script&gt;</code></pre>
      <!-- @formatter:on -->
    </div>
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
            showHeadlineBreakpoint: "md",
            breakpoint: "md",
          },
          {
            headline: "Birth Place",
            sticky: true,
          },
          {
            headline: "Job",
            breakpoint: "all",
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
        rows.push({
          cells: [
            {
              text: chance.name({ nationality: "en" }),
            },
            {
              text: chance.age(),
              tooltip: "Age " + i,
            },
            {
              text: chance.city(),
              tooltip: "City " + i,
            },
            {
              text: chance.profession(),
              tooltip: "Job " + i,
            },
          ],
          tooltip: "Row " + i,
        });
      }

      return rows;
    },
  },
};
</script>
