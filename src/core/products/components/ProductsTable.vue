
<script setup lang="ts">
import { ref } from 'vue';
import { findProducts } from '../../../api';
import router from '../../../router';

const headStyles = "text-left p-2 py-3 bg-blue-400 dark:bg-blue-900 border-neutral-800 dark:border-neutral-600";

const products = ref<IProduct[]>([]);
const loading = ref(true);

async function getData() {
  try {
    const response = await findProducts();
    products.value = response;
  } catch (error) {
    console.log(error);
  }
  finally {
    loading.value = false;
  }
}
getData();

</script>

<template>
  <h1 v-if="loading" class="text-2xl text-center my-4">Cargando</h1>
  <table v-if="!loading" class="w-full border border-neutral-800 dark:border-neutral-600">
    <thead>
      <tr>
        <th :class="headStyles">Estado</th>
        <th :class="headStyles">Referencia</th>
        <th :class="headStyles">Nombre</th>
        <th :class="headStyles">Marca</th>
        <th :class="headStyles">Precio</th>
        <th :class="headStyles">Stock</th>
        <th :class="headStyles">Acciones</th>
      </tr>
    </thead>
    <tbody class="bg-neutral-100 dark:bg-zinc-900">
      <tr v-for="(product, index) in products" :key="product.id" class="h-full"
        :class="` ${index % 2 === 0 ? ' bg-zinc-200 dark:bg-zinc-800' : ''}`">
        <td class="px-2 py-4  align-middle" >
          <div class="w-3 h-3 rounded-full ml-3" :class="`${product.isActive ? 'bg-green-500' : 'bg-red-500'} `"></div>
        </td>
        <td class="px-2 py-4  align-middle">{{ product.reference }}</td>
        <td class="px-2 py-4  align-middle">{{ product.name }}</td>
        <td class="px-2 py-4  align-middle">{{ product.brand }}</td>
        <td class="px-2 py-4  align-middle">{{ product.price }}</td>
        <td class="px-2 py-4  align-middle">{{ product.stock }}</td>
        <td class="px-2 py-4  align-middle flex gap-4 font-bold h-full">
          <div class="flex gap-2 h-100 items-center">
            <button class=" hover:opacity-100 opacity-60 px-3 rounded border border-yellow-500 text-yellow-500"
              @click="router.push(`/update-product/${product.id}`)">detalle</button>

          </div>

        </td>
      </tr>
    </tbody>
  </table>
</template>