<template>
  <div class="flex items-center gap-1 w-full">
    <label class="px-2 text-neutral-600 dark:text-neutral-400 text-md">{{ label }}</label>
    <button type="button" class="w-8 h-4 rounded-full relative" :class="`${isActive ? 'bg-green-700' : 'bg-red-700'}`"
      @click="$emit('update:isActive', !isActive)">
      <div class="w-4 h-4 transition-all transform duration-200 rounded-full bg-neutral-400 absolute top-0"
        :class="`${isActive ? 'translate-x-full' : 'translate-x-0'}`"></div>
    </button>
    <span v-if="!isActive" class="ml-4 text-red-700 text-sm opacity-80">{{ deactiveMessage }}</span>
    <span v-if="isActive" class="ml-4 text-green-700 text-sm opacity-80">{{ isActiveMessage }}</span>
  </div>
</template>

<script setup lang="ts">

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  deactiveMessage: {
    type: String,
    default: '',
  },
  isActiveMessage: {
    type: String,
    default: '',
  }
})
</script>