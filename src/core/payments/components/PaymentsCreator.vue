<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <h1>Pagos</h1>
      <button type="button" class="hover:opacity-100 opacity-60 px-3 rounded border border-green-500 text-green-500"
        @click="createPayment">agregar</button>
      <span class="text-red-500 my-2" v-if="!payments.length">No hay pagos creados</span>
    </div>
  </div>


  <div class="max-w-4xl flex flex-col gap-2">
    <div v-for="payment in payments" class="flex gap-4 my-2 items-stretch border p-2 rounded border-neutral-800">
      <button type="button"
        class="hover:opacity-100 opacity-60 px-2 rounded border border-red-500 text-red-500 self-start"
        @click="deletePayment(payment.temporaryId!)">x</button>

      <currency-selector v-model:selectedId="payment.currencyId"></currency-selector>

      <payment-method-selector v-model:currencyId="payment.currencyId"
        v-model:selectedMethodId="payment.paymentMethodId"></payment-method-selector>

      <app-input compact small label="Cantidad" v-model:value="payment.amount"></app-input>
      <app-input compact small label="Tasa" v-model:value="payment.rate"></app-input>

    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import AppInput from '../../../components/AppInput.vue';
import CurrencySelector from '../../currencies/components/CurrencySelector.vue';
import PaymentMethodSelector from './PaymentMethodSelector.vue';

const props = defineProps({
  payments: {
    type: Array<Payment>,
    default: [],
  }
})
const emit = defineEmits(['update:payments']);

function createPayment() {
  emit('update:payments', [...props.payments, {
    amount: 0,
    currencyId: 1,
    paymentMethodId: 1,
    rate: 0,
    temporaryId: uuidv4(),
  } as Payment])
}

function deletePayment(temporaryId: string) {
  const filteredPayments = props.payments.filter(payment => payment.temporaryId !== temporaryId);
  emit('update:payments', filteredPayments);
} 
</script>