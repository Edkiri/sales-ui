<template>
  <div class="flex flex-col">
    <div v-if="sale" class="flex flex-col my-2 border-b border-neutral-700 pb-2">
      <h1 class="text-2xl">Venta {{ sale.id }}</h1>
    </div>


    <form @submit.prevent="" class="flex flex-col gap-2">
      <div class="flex flex-col border-b border-neutral-700">
        <client-selector v-model:client="client"></client-selector>
      </div>

      <div class="flex flex-col border-neutral-700">
        <orders-creator v-model:orders="orders"></orders-creator>
      </div>

      <div class="flex flex-col border-neutral-700">
        <payments-creator v-model:payments="payments"></payments-creator>
      </div>

      <app-button :disabled="!updateble" type="submit" label="Actualizar venta"></app-button>
    </form>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import router from '../../../router';
import { saleDetails } from '../../../api';
import ClientSelector from '../../clients/components/ClientSelector.vue';
import OrdersCreator from '../../orders/components/OrdersCreator.vue';
import PaymentsCreator from '../../payments/components/PaymentsCreator.vue';
import AppButton from '../../../components/AppButton.vue';

const sale = ref<ISale | undefined>(undefined);
const client = ref<IClient | undefined>(undefined);
const orders = ref<IOrder[] | undefined>(undefined);
const payments = ref<IPayment[] | undefined>(undefined);
const loading = ref(false);
const error = ref('');

const ordersToCreate = ref<Order[] | undefined>(undefined);

async function getData() {
  try {
    loading.value = true;
    error.value = '';
    const saleId = router.currentRoute.value.params.id as string;
    const saleDestails = await saleDetails(saleId);
    sale.value = saleDestails;
    if (saleDestails.clientId) {
      client.value = saleDestails.client;
    }
    orders.value = saleDestails.orders;
    if (saleDestails.payments.length) {
      payments.value = saleDestails.payments;
    }

  } catch (err: any) {
    console.log(err);
    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}
getData();

watch(orders, () => {
  ordersToCreate.value = orders.value?.filter(order => order.temporaryId);
})

const updateble = computed(() => {
  return Boolean(ordersToCreate.value?.length);
})
</script>