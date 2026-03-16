<template>
  <span v-if="hasHidden">
    <span v-if="!expanded"
      ><font-awesome-icon fixed-width :icon="collapsedIcon"></font-awesome-icon
    ></span>
    <span v-else
      ><font-awesome-icon fixed-width :icon="expandedIcon"></font-awesome-icon
    ></span>
  </span>
</template>

<script>
export default {
  name: "ToggleIcon",
  props: {
    hasHidden: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    collapsedIcon: { type: String, default: "chevron-down" },
    expandedIcon: { type: String, default: "chevron-up" },
  },
};
</script>
