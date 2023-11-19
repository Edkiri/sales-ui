<template>
  <button :disabled="disabled"
    @click="handleClick"
    class="mt-6 mb-2 self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800 hover:dark:bg-blue-700"
    :class="{ disabled: disabled }" :type="type">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'button',
  },
  clickFunction: {
    type: Function,
  },
  type: {
    type: String as () => undefined | "submit" | "button" | "reset",
    default: 'button',
  }
})

function handleClick(_e: MouseEvent) {
  if (props.clickFunction) {
    props.clickFunction();
  }
} 
</script>

<style>
.disabled {
  opacity: 0.3;
  cursor: default;
}
</style>