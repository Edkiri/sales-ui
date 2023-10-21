<template>
  <div class="flex flex-col gap-1 w-full">
    <label class="px-2 text-neutral-600 dark:text-neutral-400 text-md">{{ label }}</label>
    <input
      class="outline-none rounded-sm border-2 border-neutral-400 dark:border-neutral-800 dark:bg-zinc-950 py-1 px-2 text-lg"
      :value="value" @input="$emit('update:value', ($event.target as HTMLButtonElement).value)" :type="type">
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
    type: String,
    default: '',
    required: true
  },
})

</script>