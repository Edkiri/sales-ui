<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Órdenes</h4>
    <button class="hover:opacity-100 opacity-60 px-3 rounded border border-green-500 text-green-500"
      @click="renderProductModal">agregar</button>
  </div>

  <div class="flex gap-8 my-2" v-if="orders.length" v-for="(order, index) in orders" :key="index">
    <div class="flex gap-4">
      <span class="font-bold">Nombre:</span>
      <span>{{ order.product.name }}</span>
    </div>
    <div class="flex gap-4">
      <span class="font-bold">Referencia:</span>
      <span>{{ order.product.reference }}</span>
    </div>
  </div>
  <span class="text-red-500 my-2" v-if="!orders.length">No hay órdenes creadas</span>

  <div @click="hideClientModal" v-if="showClientModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showClientModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar cliente</h1>
      <button @click="hideClientModal">X</button>
    </div>

    <products-table :selecting="true" v-model:selected="selectedProduct"></products-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ProductsTable from '../../products/components/ProductsTable.vue';

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
  emit('update:orders', [...props.orders, newOrder]);
  hideClientModal();
})

</script>