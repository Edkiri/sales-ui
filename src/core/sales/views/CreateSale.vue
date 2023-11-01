<template>
  <div class="flex justify-between items-center my-3 border-b border-neutral-700 pb-2">
    <h1 class="text-2xl">Crear venta</h1>
  </div>

  <form class="flex flex-col gap-4">

    <div class="flex flex-col border-neutral-700 pb-2">
      <client-selector v-model:client="selectedClient"></client-selector>
    </div>

    <div class="flex flex-col border-neutral-700 pb-2">
      <orders-creator v-model:orders="orders"></orders-creator>
    </div>

    <div class="flex flex-col border-neutral-700 pb-2">
      <payments-creator v-model:payments="payments"></payments-creator>
    </div>

  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ClientSelector from '../../clients/components/ClientSelector.vue';
import OrdersCreator from '../../orders/components/OrdersCreator.vue';
import PaymentsCreator from '../../payments/components/PaymentsCreator.vue';

const selectedClient = ref<IClient | undefined>(undefined);
const orders = ref<Order[]>([]);
const payments = ref<Payment[]>([]);

</script>