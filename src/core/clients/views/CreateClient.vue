<template>
  <form @submit.prevent="submit" class="my-4 flex flex-col  p-4 w-full rounded max-w-3xl mx-auto">
    <h3 class="text-xl text-center my-1">Crear cliente</h3>

    <div class="flex flex-col gap-2">

      <div class="flex gap-2 w-full">
        <app-input label="Nombre" :isLoading="loading" v-model:value="form.name"></app-input>
        <app-input label="Teléfono" :isLoading="loading" v-model:value="form.phoneNumber"></app-input>
      </div>

      <div class="flex gap-2 w-full">
        <app-input label="Cédula" :isLoading="loading" v-model:value="form.identityCard"></app-input>
        <app-input label="Correo" :isLoading="loading" v-model:value="form.email"></app-input>
      </div>

    </div>

    <app-button label="Crear cliente" type="submit" :disabled="loading"></app-button>

    <error-message :error="error"></error-message>

  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppInput from '../../../components/AppInput.vue';
import { createClient } from '../../../api';
import router from '../../../router';
import AppButton from '../../../components/AppButton.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const form = reactive({
  name: "",
  phoneNumber: "",
  identityCard: "",
  email: "",
})

const loading = ref(false);
const error = ref<string | string[]>('');

async function submit() {
  try {
    loading.value = true;
    error.value = '';
    await createClient({
      name: form.name,
      phoneNumber: form.phoneNumber,
      identityCard: form.identityCard,
      email: form.email,
    });

    router.push({ path: '/clients' });
  } catch (err: any) {
    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}
</script>