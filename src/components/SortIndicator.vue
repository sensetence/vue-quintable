<template>
  <span :class="wrapperClass" v-if="sortEnabled">
    <font-awesome-icon v-if="!sortInfo" icon="sort" class="text-primary" />
    <font-awesome-icon
      v-if="sortInfo && sortInfo.asc"
      icon="sort-amount-down-alt"
      class="text-primary"
    />
    <font-awesome-icon
      v-if="sortInfo && !sortInfo.asc"
      icon="sort-amount-down"
      class="text-primary"
    />
    <span
      v-if="sortInfo"
      @click.stop.prevent="$emit('remove-sort', columnIndex)"
      class="ms-1 text-muted"
    >
      <span class="badge bg-info text-white" v-if="numberOfSorts > 1">
        {{ sortInfo.order + 1 }}
      </span>
      <small v-else>
        <font-awesome-icon icon="times" />
      </small>
    </span>
  </span>
</template>

<script>
export default {
  name: "SortIndicator",
  props: {
    sortEnabled: { type: Boolean, default: false },
    sortInfo: { type: Object, default: null },
    numberOfSorts: { type: Number, default: 0 },
    columnIndex: { type: [Number, String], required: true },
    wrapperClass: { type: String, default: "sorting-icon ms-2" },
  },
};
</script>
