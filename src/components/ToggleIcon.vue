<template functional>
  <span v-if="props.hasHidden">
    <span v-if="!props.expanded">
      <font-awesome-icon
        fixed-width
        :icon="props.collapsedIcon"
      ></font-awesome-icon>
    </span>
    <span v-else>
      <font-awesome-icon
        fixed-width
        :icon="props.expandedIcon"
      ></font-awesome-icon>
    </span>
  </span>
</template>

<script>
export default {
  name: "ToggleIcon",
  functional: true,
  props: {
    hasHidden: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    collapsedIcon: { type: String, default: "chevron-down" },
    expandedIcon: { type: String, default: "chevron-up" },
  },
};
</script>
