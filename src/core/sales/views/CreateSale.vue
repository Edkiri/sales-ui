<template>
  <div class="flex items-center my-2 gap-8 border-b border-neutral-700 pb-2">
    <h1 class="text-2xl">Crear venta</h1>
    <app-button :click-function="submit" label="Crear venta"></app-button>
  </div>

  <sale-resume v-model:orders="orders" v-model:payments="payments"></sale-resume>

  <form @submit.prevent="submit" class="flex flex-col gap-2">


    <client-selector v-model:client="selectedClient"></client-selector>

    <orders-creator v-model:orders="orders"></orders-creator>

    <payments-creator v-model:payments="payments"></payments-creator>

    <error-message :error="error"></error-message>
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
import SaleResume from '../components/SaleResume.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const selectedClient = ref<IClient | undefined>(undefined);
const orders = ref<Order[]>([]);
const payments = ref<Payment[]>([]);

const loading = ref(false);
const error = ref<string | string[]>('');

async function submit() {
  if (!orders.value.length) {
    error.value = 'Agrega al menos una orden para crear la venta';
    return;
  }
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