<template>
  <div class="border border-green-500 rounded p-2 absolute right-4 top-4 transition-opacity duration-500"
    :class="`${show ? 'opacity-100' : 'opacity-0'}`">
    <span class="text-green-500">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: ''
  }
})
</script>