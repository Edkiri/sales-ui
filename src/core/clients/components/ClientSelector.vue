<template>
  <div class="flex items-center my-2 gap-4">
    <h4>Cliente </h4>

    <outline-button color="blue-500" label="buscar" :click-function="renderClientModal"></outline-button>
    <outline-button v-if="clientSelected" label="x" color="red-500" :click-function="unselect"></outline-button>

    <span class="text-red-500 my-2 font-light" v-if="!clientSelected">No registrar</span>

    <div class="flex gap-8 my-2" v-if="clientSelected">
      <span>{{ clientSelected.name }}</span>
      <span>{{ clientSelected.identityCard }}</span>
    </div>
  </div>

  <div @click="hideClientModal" v-if="showClientModal"
    class="absolute bg-zinc-900 top-0 right-0 left-0 bottom-0 opacity-70">
  </div>
  <div v-if="showClientModal" class="rounded-md absolute top-10 right-28 left-28 bg-zinc-950 p-4 z-10 max-w-4xl mx-auto">
    <div class="flex align-center w-full justify-between">
      <h1>Buscar cliente</h1>
      <button type="button" @click="hideClientModal">X</button>
    </div>

    <clients-table :selecting="true" v-model:selected="clientSelected"></clients-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ClientsTable from './ClientsTable.vue';
import OutlineButton from '../../../components/OutlineButton.vue';

const showClientModal = ref(false);
const clientSelected = ref<IClient | undefined>(undefined);

function renderClientModal() {
  showClientModal.value = true;
}
function hideClientModal() {
  showClientModal.value = false;
}

function unselect() {
  clientSelected.value = undefined;
}

defineProps({
  client: {
    type: Object as () => IClient,
  }
})

const emit = defineEmits(['update:client']);

watch(clientSelected, () => {
  hideClientModal();
  emit('update:client', clientSelected.value);
});

</script>