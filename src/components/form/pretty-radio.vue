<template>
  <label class="wrapper">
    <button :class="buildClassName('pretty-checkbox', modelValue && 'checked')" @click="triggerChange">
      <input
          type="checkbox"
          :checked="modelValue"
          @change="handleChange"
      />
    </button>
    <slot/>

    <slot name="extra"/>
  </label>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import {buildClassName} from "../../utils/build-class-name";

// define props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

// define emits
const emit = defineEmits(['update:modelValue', 'change']);
const emitChange = (value: boolean) => {
  emit('update:modelValue', value);
  emit('change', value);
};

// handle checkbox change
const handleChange = (event: Event<HTMLInputElement>) => {
  emitChange(event.target.checked);
};

const triggerChange = () => {
  emitChange(!props.modelValue);
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}

.pretty-checkbox {
  background: #FFF;
  border: #000 1px solid;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  &::before {
    content: '';
    width: 14px;
    height: 8px;
    border-left: 3px solid #4caf50;
    border-bottom: 3px solid #4caf50;
    transform: rotate(-45deg);
    margin-top: -3px;
    opacity: 0;
  }

  &.checked::before {
    opacity: 1;
  }
}
</style>
