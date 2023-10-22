<template>
  <button :disabled="disabled" class="mt-6 mb-2 self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800"
    :class="{ disabled: disabled }">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'button',
  },
})
</script>

<style>
.disabled {
  opacity: 0.3;
  cursor: default;
}
</style>