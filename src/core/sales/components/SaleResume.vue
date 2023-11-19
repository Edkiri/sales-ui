<template>
  <div class="p-2 border rounded border-neutral-800">

    <div class="flex gap-2 items-center">
      <span>Total: </span>
      <span>{{ totalOrders }}</span>
    </div>

    <div class="flex gap-2 items-center">
      <span>Pagos: </span>
      <span>{{ totalPayments }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const totalOrders = computed(() => {
  return props.orders.reduce((cur, order) => {
    return cur + (order.price * order.quantity);
  }, 0)
});

const totalPayments = computed(() => {
  return props.payments.reduce((cur, payment) => {
    return cur + (payment.amount * payment.rate);
  }, 0)
});

const props = defineProps({
  orders: {
    type: Array as PropType<(Order | IOrder)[]>,
    default: [],
  },
  payments: {
    type: Array as PropType<(Payment | IPayment)[]>,
    default: [],
  }
})

</script>