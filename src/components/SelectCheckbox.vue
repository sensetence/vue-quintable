<template>
  <span style="display: contents">
    <p-check
      v-if="pretty"
      name="check"
      class="p-icon"
      :class="smooth ? 'p-smooth' : ''"
      :disabled="disabled"
      v-model="proxyValue"
      @change="$emit('change', $event)"
    >
      <template slot="extra">
        <span
          ><font-awesome-icon
            v-if="proxyValue"
            icon="check"
            class="text-success icon-check"
        /></span>
        <span v-if="showPartial"
          ><font-awesome-icon
            v-if="partial && !proxyValue"
            icon="square"
            class="text-success icon-check"
        /></span>
      </template>
    </p-check>
    <label v-else class="mb-0 mt-0">
      <input
        type="checkbox"
        v-model="proxyValue"
        :disabled="disabled"
        @change="$emit('change', $event)"
      />
    </label>
  </span>
</template>

<script>
export default {
  name: "SelectCheckbox",
  props: {
    value: { type: Boolean, default: false },
    pretty: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    smooth: { type: Boolean, default: false },
    partial: { type: Boolean, default: false },
    showPartial: { type: Boolean, default: false },
  },
  computed: {
    proxyValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
