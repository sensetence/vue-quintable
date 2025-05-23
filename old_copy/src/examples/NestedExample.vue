<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Nested VueQuintable
    </p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:generated-cell-content="context">
        <div v-if="context.cell.type === 'nested'">
          <VueQuintable
            class="ms-4"
            :nested="true"
            :rows="rowsNested"
            :config="configNested"
          >
            <template v-slot:cell-complete="context">
              <strong v-if="context.cell.type === 'strong'">{{
                context.cell.value
              }}</strong>
            </template>
          </VueQuintable>
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
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup" v-pre>&lt;template&gt;
      &lt;VueQuintable
            class=&quot;ms-4&quot;
            :nested=&quot;true&quot;
            :rows=&quot;rowsNested&quot;
            :config=&quot;configNested&quot;
          &gt;
            &lt;template v-slot:generated-cell-content=&quot;context&quot;&gt;
              &lt;strong v-if=&quot;context.cell.type === &apos;strong&apos;&quot;&gt;{{context.cell.value }}&lt;/strong&gt;
            &lt;/template&gt;
          &lt;/VueQuintable&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;

import Chance from &quot;chance&quot;;
import moment from 'moment-timezone';


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
          },
          {
            headline: &quot;Children&quot;,
            breakpoint: &quot;all&quot;,
          },
          {
            headline: &quot;Job&quot;,
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
        rows.push([
          {
            text: chance.name({ nationality: &quot;en&quot; }),
          },
          {
            text: chance.age(),
          },
          {
            type: &quot;nested&quot;,
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
    configNested() {
      return {
        columns: [
        {
            headline: &quot;Name&quot;,
            align: &quot;center&quot;,
            sort:true,
          },
          {
            headline: &quot;Country of Birth&quot;,
            cellFormatter: (cell) =&gt; {
              return { value: &quot;Country: &quot; + cell.value };
            },
            align: &quot;center&quot;,
          },
          {
            headline: &quot;Time of Birth&quot;,
            breakpoint: &quot;xl&quot;,
            align: &quot;center&quot;,
          },
        ],
      };
    },

    rowsNested() {
      const chance = new Chance();
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      var m = moment.tz(&quot;Europe/Berlin&quot;);
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format(&quot;hh:mm A&quot;);
      const timeNY = m.tz(&quot;America/New_York&quot;).format(&quot;hh:mm A&quot;);
      const timeH = m.tz(&quot;America/Chicago&quot;).format(&quot;hh:mm A&quot;);


      return [
        [
          { text: chance.name({ nationality: &quot;en&quot; }) },
          { value: chance.country({ full: true })},
          { type: &quot;strong&quot;, value: timeB },
        ],
        [
          { text: chance.name({ nationality: &quot;en&quot; }) },
          { value: chance.country({ full: true }) },
          { type: &quot;strong&quot;, value: timeNY },
        ],
        [
          { text: chance.name({ nationality: &quot;en&quot; }) },
          { value: chance.country({ full: true }) },
          { type: &quot;strong&quot;, value: timeH },
        ],
      ];
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
import moment from "moment-timezone";

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
            breakpoint: "lg",
          },
          {
            headline: "Children",
            breakpoint: "all",
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
            text: chance.name({ nationality: "en" }),
          },
          {
            text: chance.age(),
          },
          {
            type: "nested",
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
    configNested() {
      return {
        columns: [
          {
            headline: "Name",
            align: "center",
            sort: true,
          },
          {
            headline: "Country of Birth",
            cellFormatter: (cell) => {
              return { value: "Country: " + cell.value };
            },
            align: "center",
          },
          {
            headline: "Time of Birth",
            breakpoint: "xl",
            align: "center",
          },
        ],
      };
    },

    rowsNested() {
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      let m = moment.tz("Europe/Berlin");
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format("hh:mm A");
      const timeNY = m.tz("America/New_York").format("hh:mm A");
      const timeH = m.tz("America/Chicago").format("hh:mm A");

      const chance = new Chance();

      return [
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeB },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeNY },
        ],
        [
          { text: chance.name({ nationality: "en" }) },
          { value: chance.country({ full: true }) },
          { type: "strong", value: timeH },
        ],
      ];
    },
  },
};
</script>
