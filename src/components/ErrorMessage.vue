<template>
  <div class="flex flex-col w-100 items-center mt-4 gap-1">
    <span v-if="Array.isArray(error) && error.length" v-for="err in error"
      class="text-red-700 text-md text-center opacity-80">
      {{ err }}
    </span>

    <span v-if="!Array.isArray(error)" class="text-red-700 text-md text-center opacity-80">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: [String, Array],
  }
})
</script>