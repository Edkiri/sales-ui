<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Cliente </h4>
    <button class="hover:opacity-100 opacity-60 px-3 rounded border border-blue-500 text-blue-500"
      @click="renderClientModal">buscar</button>
    <button v-if="productSelected" class="hover:opacity-100 opacity-60 px-3 rounded border border-red-500 text-red-500"
      @click="$emit('update:product', undefined)">descartar</button>
  </div>

  <div class="flex gap-8 my-2" v-if="productSelected">
    <div class="flex gap-4">
      <span class="font-bold">Nombre:</span>
      <span>{{ productSelected.name }}</span>
    </div>
    <div class="flex gap-4">
      <span class="font-bold">Referencia:</span>
      <span>{{ productSelected.reference }}</span>
    </div>
  </div>
  <span class="text-red-500 my-2" v-if="!productSelected">No hay cliente seleccionado</span>

  <div @click="hideClientModal" v-if="showClientModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showClientModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar cliente</h1>
      <button @click="hideClientModal">X</button>
    </div>

    <products-table></products-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ProductsTable from '../../products/components/ProductsTable.vue';

const showClientModal = ref(false);
const productSelected = ref<Product | undefined>(undefined);

function renderClientModal() {
  showClientModal.value = true;
}
function hideClientModal() {
  showClientModal.value = false;
}

defineProps({
  product: {
    type: Object as () => Product,
  }
})

const emit = defineEmits(['update:product']);

watch(productSelected, () => {
  hideClientModal();
  emit('update:product', productSelected);
});

</script>