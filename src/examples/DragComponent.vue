<template>
  <drag
    class="d-inline-block"
    :transfer-data="{ index: index }"
    :effect-allowed="['move']"
    drop-effect="move"
    @dragend="dragend"
    @dragstart="dragstart"
  >
    <div class="btn p-2">
      <font-awesome-icon icon="arrows-alt"></font-awesome-icon>
    </div>
  </drag>
</template>
<script>
import { Drag } from "vue-drag-drop";

export default {
  props: {
    index: {
      type: Number,
    },
  },
  components: {
    Drag,
  },
  methods: {
    dragstart() {
      this.$emit("action", {
        index: this.index,
        type: "dragstart",
      });
    },
    dragend() {
      this.$emit("action", {
        index: this.index,
        type: "dragend",
      });
    },
  },
};
</script>
