<template>
  <button class="btn btn-secondary mt-3" @click="toggleCode">
    <quintable-font-awesome-icon
      :icon="showCode ? 'chevron-up' : 'chevron-down'"
    />
    <span class="ms-2"> {{ showCode ? "Hide" : "Show" }} Code </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  showCode: boolean;
}>();

const emit = defineEmits<{
  "update:showCode": [value: boolean];
}>();

function toggleCode() {
  emit("update:showCode", !props.showCode);
}
</script>
