<template>
  <div class="checkbox-wrapper">
    <div>
      <span class="me-2">{{ name }}</span>
      <p-check v-model="checked" @change="toggleCheck">
        <wbr/>
      </p-check>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

// define props
const props = defineProps<{
  index: number;
  name: string;
}>();

// define emit
const emit = defineEmits<{
  (e: 'action', payload: { reference: string; index: number; checked: boolean }): void;
}>();

// component state
const checked = ref(false);
const reference = 'checkbox-component';

// emit action on toggle
function toggleCheck() {
  emit('action', {
    reference,
    index: props.index,
    checked: checked.value,
  });
}
</script>