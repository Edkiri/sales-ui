<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Órdenes</h4>
    <outline-button label="agregar" color="green-500" :click-function="renderProductModal"></outline-button>
    <span class="text-red-500 font-light my-2" v-if="!orders.length">No hay órdenes creadas</span>
  </div>

  <div class="max-w-4xl flex flex-col gap-2">

    <div class="flex gap-2 justify-between border p-2 my-2 rounded border-neutral-800" v-if="orders.length"
      v-for="(order, index) in orders" :key="index">


      <div class="flex gap-2 w-full items-center">
        <div class="flex gap-1 grow items-center">

          <div class="flex items-center gap-4">

            <div v-if="order.temporaryId" class="self-start">
              <outline-button label="x" color="red-500"
                :click-function="() => deleteOrder(order.temporaryId!)"></outline-button>
            </div>

            <div v-if="(order as IOrder).id" class="self-start">
              <outline-button label="x" color="red-500"
                :click-function="() => deleteOrderFunc((order as IOrder).id)"></outline-button>
            </div>

            <div class="flex flex-col">
              <span class="text-neutral-100">{{ order.product!.name }}</span>
              <span class="text-neutral-400 font-light">{{ order.product!.description }}</span>
            </div>
          </div>

        </div>

        <div v-if="order.temporaryId" class="flex gap-4">
          <app-input compact small label="Cantidad" v-model:value="order.quantity"></app-input>
          <app-input v-if="order.temporaryId" compact small label="Precio" v-model:value="order.price"></app-input>
        </div>

        <div v-if="!order.temporaryId" class="flex gap-4">
          <div class="flex flex-col gap-1 text-sm w-[120px]">
            <label class="text-neutral-600 dark:text-neutral-400 text-center">Cantidad</label>
            <span class=" text-center">{{ order.quantity }}</span>
          </div>
          <div class="flex flex-col gap-1 text-sm w-[120px]">
            <label class="text-neutral-600 dark:text-neutral-400 text-center">Precio</label>
            <span class="text-center">{{ order.price }}</span>
          </div>
        </div>

      </div>

    </div>
  </div>

  <div @click="hideProductModal" v-if="showProductModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showProductModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10 max-w-4xl mx-auto">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar producto</h1>
      <outline-button label="x" color="red-500" :click-function="hideProductModal"></outline-button>
    </div>
    <div class="max-w-4xl">
      <products-table :selecting="true" v-model:selected="selectedProduct"></products-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import ProductsTable from '../../products/components/ProductsTable.vue';
import AppInput from '../../../components/AppInput.vue';
import OutlineButton from '../../../components/OutlineButton.vue';

const showProductModal = ref(false);
const selectedProduct = ref<IProduct | undefined>(undefined);

function renderProductModal() {
  showProductModal.value = true;
}
function hideProductModal() {
  showProductModal.value = false;
}

const props = defineProps({
  orders: {
    type: Array as PropType<(Order | IOrder)[]>,
    default: [],
  }
})
const emit = defineEmits(['update:orders']);

watch(selectedProduct, () => {
  if (!selectedProduct.value?.id) return;
  const newOrder = {
    product: selectedProduct.value,
    price: selectedProduct.value.price,
    quantity: 1,
    productId: selectedProduct.value.id
  } as Order;
  emit('update:orders', [...props.orders, { ...newOrder, quantity: 1, temporaryId: uuidv4() }]);
  hideProductModal();
})

function deleteOrder(temporaryId: string) {
  const filteredOrders = props.orders.filter(order => order.temporaryId !== temporaryId);
  emit('update:orders', filteredOrders);
}

function deleteOrderFunc(orderId: number) {
  const filteredOrders = props.orders.filter((order) => (order as IOrder).id !== orderId);
  emit('update:orders', filteredOrders);
}

</script>