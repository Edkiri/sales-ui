<template>
  <div class="flex flex-col gap-1 w-full"
    :class="`${(small || compact) ? 'text-sm' : 'text-lg'} ${compact ? 'max-w-[120px]' : ''}`">
    <label class="px-2 text-neutral-600 dark:text-neutral-400 ">{{ label }}</label>
    <input
      class=" focus:border-neutral-700 focus:dark:border-neutral-600 outline-none rounded-sm border-2 border-neutral-400 dark:border-neutral-800 dark:bg-zinc-950"
      :class="{ loading: isLoading, 'py-1 px-2': small, 'py-2 px-3': !small, 'text-center': compact }" :value="value"
      :disabled="isLoading" @input="$emit('update:value', ($event.target as HTMLButtonElement).value)" :type="type">
  </div>
</template>

<script setup lang="ts">

defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number],
    default: '',
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  }
})
</script>

<style>
.loading {
  opacity: 0.3;
  cursor: default;
}
</style>