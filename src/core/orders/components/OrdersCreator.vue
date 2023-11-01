<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Órdenes</h4>
    <button class="hover:opacity-100 opacity-60 px-3 rounded border border-green-500 text-green-500"
      @click="renderProductModal">agregar</button>
  </div>

  <div class="flex flex-col gap-4">

    <div class="flex gap-4 my-1 justify-between border px-4 py-2 rounded border-neutral-800" v-if="orders.length"
      v-for="(order, index) in orders" :key="index">


      <div class="flex gap-2 my-1 w-full items-center">
        <div class="flex gap-1 grow items-center">

          <div class="flex items-center gap-4">
            <button class="hover:opacity-100 opacity-60 px-2 rounded border border-red-500 text-red-500 self-start"
              @click="deleteOrder(order.temporaryId)">X</button>

            <div class="flex flex-col">
              <span class="text-neutral-100">{{ order.product.name }}</span>
              <span class="text-neutral-400 font-light">{{ order.product.description }}</span>
            </div>
          </div>

        </div>


        <div class="flex gap-4 my-2">
          <div class="flex gap-2 justify-between items-center">
            <span class="text-neutral-500">Precio</span>
            <app-input compact small v-model:value="order.product.price"></app-input>
          </div>
          <div class="flex gap-2 justify-between items-center">
            <span class="text-neutral-500">Cantidad</span>
            <app-input compact small v-model:value="order.quantity"></app-input>
          </div>
        </div>

      </div>


    </div>
  </div>
  <span class="text-red-500 my-2" v-if="!orders.length">No hay órdenes creadas</span>

  <div @click="hideClientModal" v-if="showClientModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showClientModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10 max-w-4xl mx-auto">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar producto</h1>
      <button @click="hideClientModal">X</button>
    </div>
    <div class="max-w-4xl">
      <products-table :selecting="true" v-model:selected="selectedProduct"></products-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import ProductsTable from '../../products/components/ProductsTable.vue';
import AppInput from '../../../components/AppInput.vue';
// max-w-[400px]
// <span class="text-neutral-400 font-light">{{ order.product.description }}</span>
const showClientModal = ref(false);
const selectedProduct = ref<IProduct | undefined>(undefined);

function renderProductModal() {
  showClientModal.value = true;
}
function hideClientModal() {
  showClientModal.value = false;
}

const props = defineProps({
  orders: {
    type: Array<Order>,
    default: [],
  }
})
const emit = defineEmits(['update:orders']);

watch(selectedProduct, () => {
  const newOrder = {
    product: selectedProduct.value,
    price: selectedProduct.value?.price,
    quantity: 1,
  }
  emit('update:orders', [...props.orders, { ...newOrder, quantity: 1, temporaryId: uuidv4() } as Order]);
  hideClientModal();
})

function deleteOrder(temporaryId: string) {
  const filteredOrders = props.orders.filter(order => order.temporaryId !== temporaryId);
  emit('update:orders', filteredOrders);
}

</script>