<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Cliente </h4>
    <button class="hover:opacity-100 opacity-60 px-3 rounded border border-blue-500 text-blue-500"
      @click="renderClientModal">buscar</button>
    <button v-if="clientSelected" class="hover:opacity-100 opacity-60 px-3 rounded border border-red-500 text-red-500"
      @click="$emit('update:client', undefined)">descartar</button>
    <span class="text-red-500 my-2" v-if="!clientSelected">No hay cliente seleccionado</span>


    <div class="flex gap-8 my-2" v-if="clientSelected">
      <div class="flex gap-4">
        <span class="font-bold">Nombre:</span>
        <span>{{ clientSelected.name }}</span>
      </div>
      <div class="flex gap-4">
        <span class="font-bold">Cédula:</span>
        <span>{{ clientSelected.identityCard }}</span>
      </div>
    </div>
  </div>
  <div @click="hideClientModal" v-if="showClientModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showClientModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar cliente</h1>
      <button @click="hideClientModal">X</button>
    </div>

    <clients-table :selecting="true" v-model:selected="clientSelected"></clients-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ClientsTable from './ClientsTable.vue';

const showClientModal = ref(false);
const clientSelected = ref<IClient | undefined>(undefined);

function renderClientModal() {
  showClientModal.value = true;
}
function hideClientModal() {
  showClientModal.value = false;
}

defineProps({
  client: {
    type: Object as () => IClient,
  }
})

const emit = defineEmits(['update:client']);

watch(clientSelected, () => {
  hideClientModal();
  emit('update:client', clientSelected);
});

</script>