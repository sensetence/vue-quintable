<template>
  <div class="content">
    <alert-info>Customized with configured slots.</alert-info>

    <!-- table -->
    <vue-quintable :config="config" :rows="rows">
      <!-- cell-content slot -->
      <template #cell-content="{ cell }">
        <div class="btn btn-sm btn-info" @click.stop="alertMessage(cell.text)">
          {{ cell.text }}
        </div>
      </template>

      <!-- generated-cell-content slot -->
      <template #generated-cell-content="{ cell }">
        <div class="btn btn-sm btn-warning" @click.stop="alertMessage(cell.text)">
          {{ cell.text }}
        </div>
      </template>

      <!-- sticky-cell-content slot -->
      <template #sticky-cell-content="{ cell }">
        <div class="btn btn-sm btn-danger" @click.stop="alertMessage(cell.text)">
          {{ cell.text }}
        </div>
      </template>

      <!-- header slot -->
      <template #header>
        <hr/>
        <div class="alert alert-primary">
          <div class="text-center">
            <h4 class="m-0">VueQuintable</h4>
          </div>
        </div>
      </template>

      <!-- before-search slot -->
      <template #before-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100 text-center">
            Button before search
          </button>
        </div>
      </template>

      <!-- custom search slot -->
      <template #search="{ placeholder, value, setSearchQuery }">
        <div class="col-md-8">
          <input
              type="search"
              :value="value"
              :placeholder="placeholder"
              class="form-control"
              @input="setSearchQuery($event.target.value)"
          />
        </div>
      </template>

      <!-- after-search slot -->
      <template #after-search>
        <div class="col-md-2">
          <button type="button" class="btn btn-secondary w-100 text-center">
            Button after search
          </button>
        </div>
      </template>

      <!-- after-search-container slot -->
      <template #after-search-container>
        <hr/>
        <p-check class="p-switch" v-model="showRows">Toggle Rows</p-check>
        <hr/>
      </template>

      <!-- footer slot -->
      <template #footer>
        <div class="text-center py-3 px-3 mt-3 mb-3 bg-info text-white">
          Copyright © 2021 by Sensetence UG (haftungsbeschränkt)
        </div>
      </template>

      <!-- no-results slot -->
      <template #no-results>
        <div class="text-center">
          <div class="alert alert-danger">No Results...</div>
        </div>
      </template>
    </vue-quintable>

    <!-- code -->
    <show-hide-button v-model:showCode="showCode"/>
    <code-block v-if="showCode" :code="code" class="mt-3"/>
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
const chance = new Chance();
const showRows = ref(true);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age'},
    {headline: 'Birth Place', sticky: true},
    {headline: 'Job', breakpoint: 'md'},
  ],
  search: true,
  searchClass: 'col-md-8',
  pagination: true,
};

const rows = computed(() => {
  if (!showRows.value) return [];

  const data = [];
  for (let i = 0; i < 500; i++) {
    data.push([
      {text: chance.name({nationality: 'en'})},
      {text: chance.age()},
      {text: chance.city()},
      {text: chance.profession(), type: 'nested'},
    ]);
  }
  return data;
});

function alertMessage(text: string) {
  alert('I clicked the slot ' + text);
}

// Optional: Example code block content
const code = `&lt;template&gt;
  &lt;vue-quintable :config=&quot;config&quot; :rows=&quot;rows&quot;&gt;
    &lt;!-- cell-content slot --&gt;
    &lt;template #cell-content=&quot;{ cell }&quot;&gt;
      &lt;div class=&quot;btn btn-sm btn-info&quot; @click.stop=&quot;alertMessage(cell.text)&quot;&gt;
        {{ cell.text }}
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- generated-cell-content slot --&gt;
    &lt;template #generated-cell-content=&quot;{ cell }&quot;&gt;
      &lt;div class=&quot;btn btn-sm btn-warning&quot; @click.stop=&quot;alertMessage(cell.text)&quot;&gt;
        {{ cell.text }}
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- sticky-cell-content slot --&gt;
    &lt;template #sticky-cell-content=&quot;{ cell }&quot;&gt;
      &lt;div class=&quot;btn btn-sm btn-danger&quot; @click.stop=&quot;alertMessage(cell.text)&quot;&gt;
        {{ cell.text }}
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- header slot --&gt;
    &lt;template #header&gt;
      &lt;hr/&gt;
      &lt;div class=&quot;alert alert-primary&quot;&gt;
        &lt;div class=&quot;text-center&quot;&gt;
          &lt;h4 class=&quot;m-0&quot;&gt;VueQuintable&lt;/h4&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- before-search slot --&gt;
    &lt;template #before-search&gt;
      &lt;div class=&quot;col-md-2&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;btn btn-primary w-100 text-center&quot;&gt;
          Button before search
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- custom search slot --&gt;
    &lt;template #search=&quot;{ placeholder, value, setSearchQuery }&quot;&gt;
      &lt;div class=&quot;col-md-8&quot;&gt;
        &lt;input
            type=&quot;search&quot;
            :value=&quot;value&quot;
            :placeholder=&quot;placeholder&quot;
            class=&quot;form-control&quot;
            @input=&quot;setSearchQuery($event.target.value)&quot;
        /&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- after-search slot --&gt;
    &lt;template #after-search&gt;
      &lt;div class=&quot;col-md-2&quot;&gt;
        &lt;button type=&quot;button&quot; class=&quot;btn btn-secondary w-100 text-center&quot;&gt;
          Button after search
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- after-search-container slot --&gt;
    &lt;template #after-search-container&gt;
      &lt;hr/&gt;
      &lt;p-check class=&quot;p-switch&quot; v-model=&quot;showRows&quot;&gt;Toggle Rows&lt;/p-check&gt;
      &lt;hr/&gt;
    &lt;/template&gt;

    &lt;!-- footer slot --&gt;
    &lt;template #footer&gt;
      &lt;div class=&quot;text-center py-3 px-3 mt-3 bg-info text-white&quot;&gt;
        Copyright &copy; 2021 by Sensetence UG (haftungsbeschr&auml;nkt)
      &lt;/div&gt;
    &lt;/template&gt;

    &lt;!-- no-results slot --&gt;
    &lt;template #no-results&gt;
      &lt;div class=&quot;text-center&quot;&gt;
        &lt;div class=&quot;alert alert-danger&quot;&gt;No Results...&lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/vue-quintable&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import {ref, computed} from 'vue';
import Chance from 'chance';
import VueQuintable from '../components/table/vue-quintable.vue';

// table data
const chance = new Chance();
const showRows = ref(true);

const config = {
  columns: [
    {headline: 'Name'},
    {headline: 'Age'},
    {headline: 'Birth Place', sticky: true},
    {headline: 'Job', breakpoint: 'md'},
  ],
  search: true,
  searchClass: 'col-md-8',
  pagination: true,
};

const rows = computed(() =&gt; {
  if (!showRows.value) return [];

  const data = [];
  for (let i = 0; i &lt; 500; i++) {
    data.push([
      {text: chance.name({nationality: 'en'})},
      {text: chance.age()},
      {text: chance.city()},
      {text: chance.profession(), type: 'nested'},
    ]);
  }
  return data;
});

function alertMessage(text: string) {
  alert('I clicked the slot ' + text);
}
&lt;/script&gt;`;
</script>