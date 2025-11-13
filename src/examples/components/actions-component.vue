<template>
  <div class="content d-flex">
    <div class="btn-group me-2">
      <button
        class="btn btn-info"
        :disabled="first"
        :class="{ disabled: first }"
        @click="moveRow('up')"
      >
        <font-awesome-icon icon="chevron-up"></font-awesome-icon>
      </button>
      <button
        class="btn btn-info"
        :disabled="last"
        :class="{ disabled: last }"
        @click="moveRow('down')"
      >
        <font-awesome-icon icon="chevron-down"></font-awesome-icon>
      </button>
    </div>
    <div class="btn btn-danger me-2" @click="deleteRow" title="Delete Row">
      <font-awesome-icon icon="times"></font-awesome-icon>
    </div>
    <vue-draggable
        v-model="targetItems"
        item-key="id"
        class="drag-area drop-element"
       group="shared"
        @add="handleDrop"
    >
      <template #default="{ element }">
        <div class="card px-3 d-inline-block">
          <div class="py-2 bg-muted">
            <font-awesome-icon icon="expand"></font-awesome-icon>
          </div>
        </div>
      </template>

    </vue-draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

interface Props {
  first?: boolean;
  last?: boolean;
  index: number;
}

const props = withDefaults(defineProps<Props>(), {
  first: false,
  last: false,
});

const emit = defineEmits<{
  (e: 'action', payload: { index: number; type: string; to?: number }): void;
}>();

const checked = ref(false);
const reference = ref("actions-component");
const targetItems = ref([]);

const handleDrop = (data: any) => {
  emit("action", {
    index: data.index,
    type: "move-row",
    to: props.index,
  });
};

const moveRow = (mode: string = "up") => {
  if ((mode === "up" && props.first) || (mode === "down" && props.last)) {
    return;
  }

  emit("action", {
    index: props.index,
    type: "move-row",
    to: mode === "up" ? props.index - 1 : props.index + 1,
  });
};

const deleteRow = () => {
  emit("action", {
    index: props.index,
    type: "delete-row",
  });
};
</script>
<style scoped>
.btn.disabled {
  cursor: not-allowed;
}
</style>

<style>
.drop-element {
  .drag-element{
    top:0;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.5);
  }
}
</style>
