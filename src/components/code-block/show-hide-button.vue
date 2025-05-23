<template>
  <button
      class="btn btn-secondary"
      @click="toggleCode"
  >
    <font-awesome-icon :icon="showCode ? 'chevron-up' : 'chevron-down'"/>
    <span class="ms-2">
      {{ showCode ? 'Hide' : 'Show' }} Code
    </span>
  </button>
</template>

<script setup lang="ts">

const props = defineProps<{
  showCode: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showCode', value: boolean): void
}>()

function toggleCode() {
  emit('update:showCode', !props.showCode)
}
</script>
