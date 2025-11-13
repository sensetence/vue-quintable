<template>
  <div class="source-container">
    <vue-draggable
        v-model="sourceItems"
        item-key="id"
        class="drag-area"
        :group="{ name: 'shared', pull: 'clone', put: false }"
        :forceFallback="true"
        :sort="false"
        @start="dragstart"
        @end="dragend"
    >
      <template #default="{ element }">
        <div class="btn p-2 drag-element">
          <font-awesome-icon icon="arrows-alt"></font-awesome-icon>
        </div>
      </template>
    </vue-draggable>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

interface Props {
  index: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'action', payload: { index: number; type: string }): void;
}>();

const sourceItems = ref([
  { index: props.index },
]);

const dragstart = () => {
  emit("action", {
    index: props.index,
    type: "dragstart",
  });
};

const dragend = () => {
  emit("action", {
    index: props.index,
    type: "dragend",
  });
};
</script>
<style scoped>
</style>