<template>
  <div class="content">
    <alert-info
      >Interact with the table to see when events get fired. Click a Profile
      button with and without <code>ignoreControlClicks</code>: with it, the
      click stays the button's and fires no click:cell or click:row.</alert-info
    >

    <div class="form-check form-switch mb-3">
      <input
        id="ignore-control-clicks"
        v-model="ignoreControlClicks"
        class="form-check-input"
        type="checkbox"
      />
      <label class="form-check-label" for="ignore-control-clicks"
        >Clicks on buttons and links are not row clicks</label
      >
    </div>

    <!-- event list -->
    <div v-if="eventsLog.length" class="list-group mb-3">
      <div
        v-for="(event, index) in eventsLog"
        :key="index"
        class="list-group-item"
        :class="{ 'bg-info text-white': index === eventsLog.length - 1 }"
      >
        Event {{ event.event }} was fired with data:
        <div>{{ event.data }}</div>
        <div v-if="event.target" class="mt-2">Target:{{ event.target }}</div>
      </div>
    </div>

    <!-- table -->
    <vue-quintable
      :config="config"
      :rows="rows"
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
    >
      <template #cell-content="{ cell }">
        <span v-if="cell.type === 'prevent-toggle'" class="prevent-toggle">
          {{ cell.value }}
        </span>
        <button
          v-else-if="cell.type === 'button'"
          type="button"
          class="btn btn-sm btn-outline-primary"
          @click="eventListener(cell.value, 'click:button')"
        >
          Profile
        </button>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:show-code="showCode" />
    <code-block v-if="showCode" :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Chance from "chance";

import VueQuintable from "../components/table/vue-quintable.vue";
import AlertInfo from "../components/alert/alert-info.vue";
import CodeBlock from "../components/code-block/code-block.vue";
import ShowHideButton from "../components/code-block/show-hide-button.vue";

const showCode = ref(false);
const ignoreControlClicks = ref(false);

// table data
type EventLogEntry = {
  event: string;
  data: string;
  target: string | null;
};

const chance = new Chance();
const eventsLog = ref<EventLogEntry[]>([]);

const config = computed(() => ({
  columns: [
    { headline: "Name" },
    { headline: "Age", sort: true },
    { headline: "Birth Place" },
    { headline: "Job", breakpoint: "all" },
    { headline: "Profile" },
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  searchLength: 2,
  ignoreControlClicks: ignoreControlClicks.value,
}));

const rows = computed(() => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const name = chance.name({ nationality: "en" });
    items.push([
      { text: name },
      { type: "prevent-toggle", value: chance.age() },
      { text: chance.city(), classes: "prevent-toggle" },
      { text: chance.profession() },
      { type: "button", value: name },
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
        &lt;button
            v-else-if=&quot;cell.type === 'button'&quot;
            type=&quot;button&quot;
            class=&quot;btn btn-sm btn-outline-primary&quot;
            @click=&quot;eventListener(cell.value, 'click:button')&quot;
        &gt;
          Profile
        &lt;/button&gt;
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
    {headline: 'Profile'},
  ],
  pagination: 5,
  rowsSelect: true,
  search: true,
  searchLength: 2,
  // a click on a link, button or field in a row fires no click:row / click:cell
  ignoreControlClicks: true,
};

const rows = computed(() =&gt; {
  const items = [];
  for (let i = 0; i &lt; 20; i++) {
    const name = chance.name({nationality: 'en'});
    items.push([
      {text: name},
      {type: 'prevent-toggle', value: chance.age()},
      {text: chance.city(), classes: 'prevent-toggle'},
      {text: chance.profession()},
      {type: 'button', value: name},
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
