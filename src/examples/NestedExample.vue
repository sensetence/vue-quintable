<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="me-2" icon="info-circle"></font-awesome-icon>
      Nested VueQuintable
    </p>
    <VueQuintable :config="config" :rows="rows">
      <template v-slot:cell-complete="context">
        <div v-if="context.cell.type === 'nested'">
          <VueQuintable
            class="ms-4"
            :nested="true"
            :rows="rowsNested"
            :config="configNested"
          >
            <template v-slot:cell-complete="context">
              <strong v-if="context.cell.type === 'strong'">{{
                context.cell.text
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
            &lt;template v-slot:cell-complete=&quot;context&quot;&gt;
              &lt;strong v-if=&quot;context.cell.type === &apos;strong&apos;&quot;&gt;{{context.cell.text }}&lt;/strong&gt;
            &lt;/template&gt;
          &lt;/VueQuintable&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/VueQuintable&gt;
&lt;/template&gt;
&lt;script&gt;
import VueQuintable from &quot;../components/VueQuintable.vue&quot;;

import Chance from &quot;chance&quot;;
import * as moment from &quot;moment&quot;;
import &quot;moment-timezone&quot;;

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
            headline: &quot;Birth&amp;nbsp;Time&quot;,
            sticky: true,
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
            headline: &quot;Country&quot;,
            cellFormatter: (cell) =&gt; {
              return { value: &quot;Country: &quot; + cell.text };
            },
            align: &quot;center&quot;,
          },
          {
            headline: &quot;City&quot;,
            breakpoint: &quot;lg&quot;,
            align: &quot;center&quot;,
          },
          {
            headline: &quot;Time&quot;,
            breakpoint: &quot;xl&quot;,
            align: &quot;center&quot;,
          },
        ],
      };
    },

    rowsNested() {
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      var m = moment.tz(&quot;Europe/Berlin&quot;);
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format(&quot;hh:mm A&quot;);

      const timeNY = m.tz(&quot;America/New_York&quot;).format(&quot;hh:mm A&quot;);

      const timeH = m.tz(&quot;America/Chicago&quot;).format(&quot;hh:mm A&quot;);
      return [
        [
          { text: &quot;Germany&quot; },
          { text: &quot;Berlin&quot; },
          { type: &quot;strong&quot;, text: timeB },
        ],
        [
          { text: &quot;United States&quot; },
          { text: &quot;New York&quot; },
          { type: &quot;strong&quot;, text: timeNY },
        ],
        [
          { text: &quot;United States&quot; },
          { text: &quot;Chicago&quot; },
          { type: &quot;strong&quot;, text: timeH },
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
import * as moment from "moment";
import "moment-timezone";

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
            headline: "Birth&nbsp;Time",
            sticky: true,
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
            headline: "Country",
            cellFormatter: (cell) => {
              return { value: "Country: " + cell.text };
            },
            align: "center",
          },
          {
            headline: "City",
            breakpoint: "lg",
            align: "center",
          },
          {
            headline: "Time",
            breakpoint: "xl",
            align: "center",
          },
        ],
      };
    },

    rowsNested() {
      const hours = Math.ceil(Math.random() * 24);
      const minutes = Math.ceil(Math.random() * 59);

      var m = moment.tz("Europe/Berlin");
      m.set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });

      const timeB = m.format("hh:mm A");

      const timeNY = m.tz("America/New_York").format("hh:mm A");

      const timeH = m.tz("America/Chicago").format("hh:mm A");
      return [
        [
          { text: "Germany" },
          { text: "Berlin" },
          { type: "strong", text: timeB },
        ],
        [
          { text: "United States" },
          { text: "New York" },
          { type: "strong", text: timeNY },
        ],
        [
          { text: "United States" },
          { text: "Chicago" },
          { type: "strong", text: timeH },
        ],
      ];
    },
  },
};
</script>
