<template>
  <div class="flex justify-between items-center my-2 border-b border-neutral-700 pb-2">
    <h1 class="text-2xl">Crear venta</h1>
  </div>

  <form @submit.prevent="submit" class="flex flex-col gap-2">

    <div class="flex flex-col border-neutral-700">
      <client-selector v-model:client="selectedClient"></client-selector>
    </div>

    <div class="flex flex-col border-neutral-700">
      <orders-creator v-model:orders="orders"></orders-creator>
    </div>

    <div class="flex flex-col border-neutral-700">
      <payments-creator v-model:payments="payments"></payments-creator>
    </div>

    <app-button type="submit" label="Crear venta"></app-button>

    <div class="flex flex-col w-100 items-center mt-4 gap-1">
      <span v-if="Array.isArray(error) && error.length" v-for="err in error" :key="err"
        class="text-red-700 text-md opacity-80">
        {{ err }}
      </span>

      <span v-if="!Array.isArray(error)" class="text-red-700 text-md opacity-80">
        {{ error }}
      </span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createSale } from '../../../api';
import router from '../../../router';
import ClientSelector from '../../clients/components/ClientSelector.vue';
import OrdersCreator from '../../orders/components/OrdersCreator.vue';
import PaymentsCreator from '../../payments/components/PaymentsCreator.vue';
import AppButton from '../../../components/AppButton.vue';

const selectedClient = ref<IClient | undefined>(undefined);
const orders = ref<Order[]>([]);
const payments = ref<Payment[]>([]);

const loading = ref(false);
const error = ref('');

async function submit() {
  try {
    loading.value = true;
    error.value = '';
    const sale = {
      description: '',
      orders: orders.value.map(order => ({ productId: order.productId, price: order.price, quantity: order.quantity })),
      payments: payments.value.map(pay => ({ amount: pay.amount, currencyId: pay.currencyId, rate: pay.rate, paymentMethodId: pay.paymentMethodId })),

    } as Sale;
    if (selectedClient.value) {
      sale.clientId = selectedClient.value.id;
    }
    await createSale(sale);

    router.push({ path: '/sales' });
  } catch (err: any) {
    console.log(err);
    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}

</script>