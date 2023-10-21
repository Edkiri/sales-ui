
<script setup lang="ts">
import { ref } from 'vue';
import { findProducts } from '../../../api';

const headingStyles = "text-left p-2 py-3 bg-blue-400 dark:bg-blue-800 border-neutral-800 dark:border-neutral-600";
const cellStyles = "p-2 bg-neutral-100 dark:bg-zinc-900";

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
        <th :class="headingStyles">Name</th>
        <th :class="headingStyles">Description</th>
        <th :class="headingStyles">Brand</th>
        <th :class="headingStyles">Reference</th>
        <th :class="headingStyles">Price</th>
        <th :class="headingStyles">Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td :class="cellStyles">{{ product.name }}</td>
        <td :class="cellStyles">{{ product.description }}</td>
        <td :class="cellStyles">{{ product.brand }}</td>
        <td :class="cellStyles">{{ product.reference }}</td>
        <td :class="cellStyles">{{ product.price }}</td>
        <td :class="cellStyles">{{ product.stock }}</td>
      </tr>
    </tbody>
  </table>
</template>