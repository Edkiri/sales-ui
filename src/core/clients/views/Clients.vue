<script setup lang="ts">
import ClientTable from '../components/ClientTable.vue';
import router from '../../../router';

</script>

<template>
  <div class="flex justify-between items-center my-3">
    <h1 class="text-2xl">Lista de clientes</h1>
    <button @click="() => router.push({ path: '/create-client' })"
      class="self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800">Crear cliente</button>
  </div>
  <div class="w-full">
    <client-table />
  </div>
</template>