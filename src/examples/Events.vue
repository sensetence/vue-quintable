<template>
  <div class="content">
    <p class="alert alert-info">
      <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>
      Interact with the table to so when events get fired
    </p>

    <div class="list-group mb-3" v-if="this.eventsLog.length">
      <div
        :key="index"
        class="list-group-item"
        v-for="(event, index) in eventsLog"
        :class="{ 'bg-info text-white': index === eventsLog.length - 1 }"
      >
        Event {{ event.event }} was fired with data:
        <div>{{ event.data }}</div>
      </div>
    </div>

    <VueQuintable
      @update:sort="eventListener"
      @update:page="eventListener"
      @update:search="eventListener"
      @update:rows-per-page="eventListener"
      @click:row="eventListener"
      @click:cell="eventListener"
      @expand:row="eventListener"
      @filtered:rows="eventListener"
      @hover:row="eventListener"
      @collapse:row="eventListener"
      @change:breakpoints="eventListener"
      :config="config"
      :rows="rows"
    >
    </VueQuintable>

    <b-button v-b-toggle.code-basic variant="secondary"
      ><font-awesome-icon icon="chevron-up"></font-awesome-icon
      ><font-awesome-icon icon="chevron-down"></font-awesome-icon>
      <span class="show ml-2">Show</span
      ><span class="hide ml-2">Hide</span> Code
    </b-button>
    <b-collapse id="code-basic" class="mt-2">
      <!-- @formatter:off -->
      <pre
        data-toolbar-order="copy-to-clipboard"
      ><code class="language-markup">&lt;template&gt;
        &lt;VueQuintable
                @update:sort=&quot;eventListener&quot;
                @update:page=&quot;eventListener&quot;
                @update:search=&quot;eventListener&quot;
                @update:rows-per-page=&quot;eventListener&quot;
                @click:row=&quot;eventListener&quot;
                @click:cell=&quot;eventListener&quot;
                @expand:row=&quot;eventListener&quot;
                @filtered:rows=&quot;eventListener&quot;
                @hover:row=&quot;eventListener&quot;
                @collapse:row=&quot;eventListener&quot;
                @change:breakpoints=&quot;eventListener&quot;
                :config=&quot;config&quot;
                :rows=&quot;rows&quot;&gt;
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
                config: {
                    columns: [
                        {
                            headline: &quot;Name&quot;,
                        }, {
                            headline: &quot;Age&quot;,
                            sort:true,
                        }, {
                            headline: &quot;Birth Place&quot;,
                        }, {
                            headline: &quot;Job&quot;,
                            breakpoint:&quot;all&quot;
                        }
                    ],
                    pagination:5,
                    rowsSelect:true,
                    search:true,
                }

            }
        },
        computed:{
            rows(){

                let count = 20;
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
        methods:{
            eventListener(data,event){

                //do stuff and handle the event

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
            breakpoint: "all",
          },
        ],
        pagination: 5,
        rowsSelect: true,
        search: true,
      },
      eventsLog: [],
    };
  },
  computed: {
    rows() {
      let count = 20;
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
            text: chance.city(),
          },
          {
            text: chance.profession(),
          },
        ]);
      }

      return rows;
    },
  },
  methods: {
    eventListener(data, event) {
      const eventsLog = this.eventsLog;
      eventsLog.push({ event: event, data: JSON.stringify(data) });
      this.eventsLog = eventsLog;

      if (this.eventsLog.length > 5) {
        const eventsLog = this.eventsLog;
        eventsLog.splice(0, 1);
        this.eventsLog = eventsLog;
      }
    },
  },
};
</script>
