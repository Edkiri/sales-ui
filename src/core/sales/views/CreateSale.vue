<template>
  <div class="flex justify-between items-center my-3 border-b border-neutral-700 pb-2">
    <h1 class="text-2xl">Crear venta</h1>
  </div>

  <form>

    <div class="flex flex-col border-b border-neutral-700 pb-2">
      <client-selector v-model:client="selectedClient"></client-selector>
    </div>

  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClientSelector from '../../clients/components/ClientSelector.vue';

const selectedClient = ref<IClient | undefined>(undefined);

</script>