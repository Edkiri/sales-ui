
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { findClients } from '../../../api';
import router from '../../../router';
import AppInput from '../../../components/AppInput.vue';
import AppButton from '../../../components/AppButton.vue';
import OutlineButton from '../../../components/OutlineButton.vue';

const headStyles = "text-left p-2 py-3 bg-blue-400 dark:bg-blue-900 border-neutral-800 dark:border-neutral-600";

defineProps({
  selected: {
    type: Object as () => IClient,
    required: false,
  },
  selecting: {
    type: Boolean,
    default: false,
  }
})

const filters = reactive({
  name: '',
  limit: 5,
  offset: 0,
});
const clients = ref<IClient[] | undefined>(undefined);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(0);

async function getData() {
  try {
    loading.value = true;
    const response = await findClients(filters);
    clients.value = response.clients;
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

</script>

<template>
  <form @submit.prevent="getData" class="max-w-lg flex gap-4 my-2 items-center">
    <app-input :isLoading="loading" :small="true" label="Nombre" v-model:value="filters.name"></app-input>

    <div class="min-h-full flex self-end">

      <app-button :disabled="loading" label="Buscar"></app-button>
    </div>

  </form>

  <div class="flex gap-4 items-center pb-2 justify-end">
    <h4>página {{ currentPage }} de {{ totalPages }}</h4>
    <button type="button" @click="previousPage" :disabled="currentPage === 1" class="text-sm text-indigo-400">{{ '<' }}
        anterior</button>
        <button type="button" @click="nextPage" :disabled="currentPage === totalPages"
          class="text-sm text-indigo-400">siguiente
          ></button>
  </div>
  <table class="w-full border border-neutral-800 dark:border-neutral-600">
    <thead>
      <tr>
        <th :class="headStyles">Nombre</th>
        <th :class="headStyles">Correo</th>
        <th :class="headStyles">Teléfono</th>
        <th :class="headStyles">Acciones</th>
      </tr>
    </thead>

    <tbody class="bg-neutral-100 dark:bg-zinc-900">
      <tr v-for="(client, index) in clients" :key="client.id" class="h-full"
        :class="` ${index % 2 === 0 ? ' bg-zinc-200 dark:bg-zinc-800' : ''}`">
        <td class="px-2 py-4 align-middle">{{ client.name }}</td>
        <td class="px-2 py-4 align-middle">{{ client.email }}</td>
        <td class="px-2 py-4 align-middle">{{ client.phoneNumber }}</td>
        <td class="px-2 py-4 align-middle flex gap-4 font-bold h-full">
          <div class="flex gap-2 h-100 items-center">

            <outline-button v-if="!selecting" label="detalle" color="yellow-500"
              :click-function="() => router.push(`/update-client/${client.id}`)"></outline-button>

            <outline-button v-if="(selecting && clients && clients.length)" label="select" color="green-500"
              :click-function="() => $emit('update:selected', clients!.find(item => item.id === client.id))"></outline-button>
          </div>

        </td>
      </tr>
    </tbody>
  </table>
</template>