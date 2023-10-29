
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { findSales } from '../../../api';
import router from '../../../router';

const headStyles = "text-left p-2 py-3 bg-blue-400 dark:bg-blue-900 border-neutral-800 dark:border-neutral-600";

const filters = reactive({ status: '', limit: 5, offset: 0 });
const sales = ref<ISale[] | null>(null);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(0);

async function getData() {
  try {
    loading.value = true;
    const response = await findSales(filters);
    sales.value = response.sales;
    totalPages.value = Math.ceil(response.totalCount / filters.limit);
  } catch (error) {
    console.log(error);
  }
  finally {
    loading.value = false;
  }
}

function nextPage() {
  filters.offset = filters.offset + filters.limit;
  currentPage.value++;
  getData();
}
getData();

function previousPage() {
  filters.offset = filters.offset - filters.limit;
  currentPage.value--;
  getData();
}

function getTotalSale(orders: IOrder[]) {
  return orders.reduce((curr, order) => {
    return curr + (order.price * order.quantity)
  }, 0)
}

</script>

<template>
  <div class="flex gap-4 items-center pb-2 justify-end">
    <h4>página {{ currentPage }} de {{ totalPages }}</h4>
    <button @click="previousPage" :disabled="currentPage === 1" class="text-sm text-indigo-400">{{ '<' }}
        anterior</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="text-sm text-indigo-400">siguiente
          ></button>
  </div>
  <table class="w-full border border-neutral-800 dark:border-neutral-600">
    <thead>
      <tr>
        <th :class="headStyles">Estado</th>
        <th :class="headStyles">Cliente</th>
        <th :class="headStyles">Descripción</th>
        <th :class="headStyles">Total</th>
        <th :class="headStyles">Acciones</th>
      </tr>
    </thead>

    <tbody class="bg-neutral-100 dark:bg-zinc-900">
      <tr v-for="(sale, index) in sales" :key="sale.id" class="h-full"
        :class="` ${index % 2 === 0 ? ' bg-zinc-200 dark:bg-zinc-800' : ''}`">
        <td class="px-2 py-4  align-middle">
          <div class="w-3 h-3 rounded-full ml-3" :class="`${sale.status ? 'bg-green-500' : 'bg-red-500'} `"></div>
        </td>
        <td class="px-2 py-4 align-middle">{{ sale.client.name }}</td>
        <td class="px-2 py-4 align-middle">{{ sale.description }}</td>
        <td class="px-2 py-4 align-middle">{{ getTotalSale(sale.orders) }}</td>
        <td class="px-2 py-4 align-middle flex gap-4 font-bold h-full">
          <div class="flex gap-2 h-100 items-center">
            <button class="hover:opacity-100 opacity-60 px-3 rounded border border-yellow-500 text-yellow-500"
              @click="router.push(`/update-sale/${sale.id}`)">detalle</button>s
          </div>

        </td>
      </tr>
    </tbody>
  </table>
</template>