<template>
  <form @submit.prevent="submit" class="my-2 flex flex-col p-2 w-full rounded max-w-xl mx-auto">
    <h3 class="text-xl text-center my-1">Actualizar cliente</h3>

    <div class="flex flex-col gap-2">

      <div class="flex gap-2 w-full">
        <app-input label="Nombre" :isLoading="loading" v-model:value="clientForm.name"></app-input>
        <app-input label="Teléfono" :isLoading="loading" v-model:value="clientForm.phoneNumber"></app-input>
      </div>

      <div class="flex gap-2 w-full">
        <app-input label="Cédula" :isLoading="loading" v-model:value="clientForm.identityCard"></app-input>
        <app-input label="Correo" :isLoading="loading" v-model:value="clientForm.email"></app-input>
      </div>

    </div>

    <app-button type="submit" label="Actualizar cliente" :disabled="loading"></app-button>

    <div class="flex flex-col w-100 items-center mt-4 gap-1">
      <span v-if="Array.isArray(error) && error.length" v-for="err in error" :key="err"
        class="text-red-700 text-md opacity-80">
        {{ err }}
      </span>

      <span v-if="!Array.isArray(error)" class="text-red-700 text-md opacity-80">
        {{ error }}
      </span>

      <span v-if="successUpdated" class="text-green-600 :dark:text-green-600">
        Cliente actualizado exitosamente
      </span>
    </div>

  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppInput from '../../../components/AppInput.vue'; //TODO: Setup path aliases
import AppButton from '../../../components/AppButton.vue';
import router from '../../../router';
import { getClientDetails, updateClient } from '../../../api';
const clientForm = reactive({
  name: "",
  phoneNumber: "",
  identityCard: "",
  email: "",
})
const loading = ref(false);
const error = ref('');
const client = ref<IClient | null>(null);

const successUpdated = ref(false);

async function getData() {
  try {
    loading.value = true;
    error.value = '';
    const clientId = router.currentRoute.value.params.id as string;
    const clientDestails = await getClientDetails(clientId);
    client.value = clientDestails;

    clientForm.name = clientDestails.name || '';
    clientForm.phoneNumber = clientDestails.phoneNumber || '';
    clientForm.identityCard = clientDestails.identityCard || '';
    clientForm.email = clientDestails.email || '';
  } catch (err: any) {
    console.log(err);
    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}

async function displayModal() {
  successUpdated.value = true;
}

async function submit() {
  try {
    loading.value = true;
    error.value = '';
    const clientId = router.currentRoute.value.params.id as string;
    const clientUpdated = await updateClient(clientId, {
      name: clientForm.name,
      phoneNumber: clientForm.phoneNumber,
      identityCard: clientForm.identityCard,
      email: clientForm.email,
    });
    client.value = clientUpdated;

    clientForm.name = clientUpdated.name;
    clientForm.phoneNumber = clientUpdated.phoneNumber;
    clientForm.identityCard = clientUpdated.identityCard || '';
    clientForm.email = clientUpdated.email || '';
    displayModal()
  } catch (err: any) {
    console.log(err);

    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}

getData()
</script>