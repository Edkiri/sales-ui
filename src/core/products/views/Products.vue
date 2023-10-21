<script setup lang="ts">
import ProductsTable from '../components/ProductsTable.vue';
import router from '../../../router';

</script>

<template>
  <div class="flex justify-between items-center my-4">
    <h1 class="text-2xl">Products list</h1>
    <button @click="() => router.push({ path: '/create-product' })"
      class="self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800">Create product</button>
  </div>
  <div class="w-full">
    <products-table />
  </div>
</template>