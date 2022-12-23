<template>
  <div>
    <NestedQuintableComponent
      :name="generateIdentifier()"
      :table-classes="cell.quintable.tableClasses"
      class="quintable-sub-table"
      :class="path + ' ' + path + '--quintable-sub-table'"
      :nested="true"
      :identifier="
        cell.quintable.identifier
          ? cell.quintable.identifier
          : generateIdentifier()
      "
      :config="cell.quintable.config"
      :rows="cell.quintable.rows"
      :verbose="verbose"
      :filter-groups="
        cell.quintable.filterGroups ? cell.quintable.filterGroups : []
      "
      :filters="cell.quintable.filters ? cell.quintable.filters : {}"
      v-model="selectedValues"
      @click:row="(data) => $emit('click:row', data)"
      @click:cell="(data) => $emit('click:cell', data)"
      @expand:row="(data) => $emit('expand:row', data)"
      @collapse:row="(data) => $emit('collapse:row', data)"
      @filtered:rows="(data) => $emit('filtered:rows', data)"
      @ajax:rows="(data) => $emit('ajax:rows', data)"
      @ajax:error="(data) => $emit('ajax:error', data)"
      @update:perPage="(data) => $emit('update:perPage', data)"
      @update:page="(data) => $emit('update:page', data)"
      @update:search="(data) => $emit('update:search', data)"
      @update:sort="(data) => $emit('update:sort', data)"
      @component:event="(data) => $emit('component:event', data)"
    >
      <template
        v-for="slot in Object.keys(slots)"
        :slot="slot"
        slot-scope="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
    </NestedQuintableComponent>
  </div>
</template>

<script>
import randomUUID from "uuid/v4";

export default {
  name: "NestedVueQuintable",
  components: {
    NestedQuintableComponent: () => import("./VueQuintable.vue"),
  },
  data() {
    return {
      selectedValues: this.selectedRows,
    };
  },
  props: {
    cell: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    selectedRows: {
      type: Array,
      default: () => [],
    },
    slots: {
      type: Object,
      required: true,
    },
    verbose: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    selectedValues(value) {
      this.$emit("update:select", value);
    },
  },
  methods: {
    generateIdentifier() {
      return randomUUID();
    },
  },
};
</script>
