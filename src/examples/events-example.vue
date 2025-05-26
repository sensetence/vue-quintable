<template>
  <div class="content">
    <alert-info>Interact with the table to see when events get fired.</alert-info>
    
    <!-- event list -->
    <div class="list-group mb-3" v-if="eventsLog.length">
      <div
          v-for="(event, index) in eventsLog"
          :key="index"
          class="list-group-item"
          :class="{ 'bg-info text-white': index === eventsLog.length - 1 }"
      >
        Event {{ event.event }} was fired with data:
        <div>{{ event.data }}</div>
        <div class="mt-2" v-if="event.target">Target: {{ event.target }}</div>
      </div>
    </div>

    <!-- table -->
    <vue-quintable
        @update:sort="eventListener"
        @update:page="eventListener"
        @update:search="eventListener"
        @update:rows-per-page="eventListener"
        @click:row="eventListener"
        @click:cell="eventListener"
        @auxclick:cell="eventListener"
        @auxclick:row="eventListener"
        @expand:row="eventListener"
        @filtered:rows="eventListener"
        @hover:row="eventListener"
        @collapse:row="eventListener"
        @change:breakpoints="eventListener"
        :config="config"
        :rows="rows"
    >
      <template #cell-content="{ cell }">
        <span v-if="cell.type === 'prevent-toggle'" class="prevent-toggle">
          {{ cell.value }}
        </span>
      </template>
    </vue-quintable>


    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import Chance from 'chance';

import VueQuintable from '../components/table/vue-quintable.vue';
import AlertInfo from '../components/alert/alert-info.vue';
import CodeBlock from '../components/code-block/code-block.vue';
import ShowHideButton from '../components/code-block/show-hide-button.vue';

const showCode = ref(false);

// table data
type EventLogEntry = {
  event: string;
  data: string;
  target: string | null;
};

const chance = new Chance();
const eventsLog = ref<EventLogEntry[]>([]);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age', sort: true},
    {headline: 'Birth Place'},
    {headline: 'Job', breakpoint: 'all'},
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  searchLength: 2,
};

const rows = computed(() => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push([
      {text: chance.name({nationality: 'en'})},
      {type: 'prevent-toggle', value: chance.age()},
      {text: chance.city(), classes: 'prevent-toggle'},
      {text: chance.profession()},
    ]);
  }
  return items;
});

// event logging
function eventListener(data: unknown, event: string, target?: HTMLElement) {
  eventsLog.value.push({
    event,
    data: JSON.stringify(data),
    target: target ? target.outerHTML : null,
  });

  // limit to the last 5 events
  if (eventsLog.value.length > 5) {
    eventsLog.value.splice(0, 1);
  }
}

// example code
const code = `&lt;template&gt;
  &lt;vue-quintable
      @update:sort=&quot;eventListener&quot;
      @update:page=&quot;eventListener&quot;
      @update:search=&quot;eventListener&quot;
      @update:rows-per-page=&quot;eventListener&quot;
      @click:row=&quot;eventListener&quot;
      @click:cell=&quot;eventListener&quot;
      @auxclick:cell=&quot;eventListener&quot;
      @auxclick:row=&quot;eventListener&quot;
      @expand:row=&quot;eventListener&quot;
      @filtered:rows=&quot;eventListener&quot;
      @hover:row=&quot;eventListener&quot;
      @collapse:row=&quot;eventListener&quot;
      @change:breakpoints=&quot;eventListener&quot;
      :config=&quot;config&quot;
      :rows=&quot;rows&quot;
  &gt;
    &lt;template #cell-content=&quot;{ cell }&quot;&gt;
        &lt;span v-if=&quot;cell.type === 'prevent-toggle'&quot; class=&quot;prevent-toggle&quot;&gt;
          {{ cell.value }}
        &lt;/span&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
type EventLogEntry = {
  event: string;
  data: string;
  target: string | null;
};

const chance = new Chance();
const eventsLog = ref&lt;EventLogEntry[]&gt;([]);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age', sort: true},
    {headline: 'Birth Place'},
    {headline: 'Job', breakpoint: 'all'},
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  searchLength: 2,
};

const rows = computed(() =&gt; {
  const items = [];
  for (let i = 0; i &lt; 20; i++) {
    items.push([
      {text: chance.name({nationality: 'en'})},
      {type: 'prevent-toggle', value: chance.age()},
      {text: chance.city(), classes: 'prevent-toggle'},
      {text: chance.profession()},
    ]);
  }
  return items;
});

// event logging
function eventListener(data: unknown, event: string, target?: HTMLElement) {
  eventsLog.value.push({
    event,
    data: JSON.stringify(data),
    target: target ? target.outerHTML : null,
  });

  // limit to the last 5 events
  if (eventsLog.value.length &gt; 5) {
    eventsLog.value.splice(0, 1);
  }
}
&lt;/script&gt;`;
</script>