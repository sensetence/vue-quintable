<template functional>
  <span :class="props.wrapperClass" v-if="props.sortEnabled">
    <font-awesome-icon
      v-if="!props.sortInfo"
      icon="sort"
      class="text-primary"
    />
    <font-awesome-icon
      v-if="props.sortInfo && props.sortInfo.asc"
      icon="sort-amount-down-alt"
      class="text-primary"
    />
    <font-awesome-icon
      v-if="props.sortInfo && !props.sortInfo.asc"
      icon="sort-amount-down"
      class="text-primary"
    />
    <span
      v-if="props.sortInfo"
      @click.stop.prevent="listeners['remove-sort'](props.columnIndex)"
      class="ms-1 text-muted"
    >
      <span class="badge bg-info text-white" v-if="props.numberOfSorts > 1">
        {{ props.sortInfo.order + 1 }}
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
  functional: true,
  props: {
    sortEnabled: { type: Boolean, default: false },
    sortInfo: { type: Object, default: null },
    numberOfSorts: { type: Number, default: 0 },
    columnIndex: { type: [Number, String], required: true },
    wrapperClass: { type: String, default: "sorting-icon ms-2" },
  },
};
</script>
