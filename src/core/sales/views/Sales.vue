<script setup lang="ts">
import SalesTable from '../components/SalesTable.vue';
import router from '../../../router';

</script>

<template>
  <div class="flex justify-between items-center my-3">
    <h1 class="text-2xl">Lista de ventas</h1>
    <button @click="() => router.push({ path: '/create-client' })"
      class="self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800">Crear venta</button>
  </div>
  <div class="w-full">
    <sales-table />
  </div>
</template>