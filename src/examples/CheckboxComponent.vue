<template>
  <div class="checkbox-wrapper">
    <div>
      <span class="mr-2">{{ name }}</span>
      <p-check v-model="checked" @change="toggleCheck"><wbr /></p-check>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    index: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      checked: false,
      reference: "checkbox-component",
    };
  },
  methods: {
    toggleCheck() {
      this.$emit("action", {
        reference: this.reference,
        index: this.index,
        checked: this.checked,
      });
    },
  },
};
</script>


