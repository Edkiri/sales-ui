<template>
  <form @submit.prevent="submit" class="my-4 flex flex-col  p-4 w-full rounded max-w-3xl mx-auto">
    <h3 class="text-xl text-center my-1">Crear Producto</h3>

    <div class="flex flex-col gap-2">

      <app-input label="Nombre" :isLoading="loading" v-model:value="form.name"></app-input>
      <app-input label="Descripción" :isLoading="loading" v-model:value="form.description"></app-input>

      <div class="flex gap-2 w-full">
        <app-input label="Marca" :isLoading="loading" v-model:value="form.brand"></app-input>
        <app-input label="Referencia" :isLoading="loading" v-model:value="form.reference"></app-input>
      </div>

      <div class="flex gap-2 w-full mb-3">
        <app-input label="Precio" :isLoading="loading" v-model:value="form.price"></app-input>
        <app-input label="Stock" :isLoading="loading" v-model:value="form.stock"></app-input>
      </div>
      <app-checkbox  v-if="!loading" v-model:isActive="form.isActive" label="Estado" isActiveMessage="Activo" deactiveMessage="Inactivo. No disponible para ventas."></app-checkbox>
    </div>

    <app-button label="Crear producto" type="submit" :disabled="loading"></app-button>

    <error-message :error="error"></error-message>

  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppInput from '../../../components/AppInput.vue';
import { createProduct } from '../../../api';
import router from '../../../router';
import AppButton from '../../../components/AppButton.vue';
import AppCheckbox from '../../../components/AppCheckbox.vue';
import ErrorMessage from '../../../components/ErrorMessage.vue';

const form = reactive({
  name: "",
  description: "",
  reference: "",
  brand: "",
  price: "",
  stock: "",
  isActive: true
})

const loading = ref(false);
const error = ref('');

async function submit() {
  try {
    loading.value = true;
    error.value = '';
    await createProduct({
      name: form.name,
      description: form.description,
      reference: form.reference,
      brand: form.brand,
      price: Number(form.price),
      stock: Number(form.stock),
      isActive: form.isActive,
    });
    
    router.push({ path: '/products' });
  } catch (err: any) {
    console.log(err);
    error.value = err.response.data.message;
  }
  finally {
    loading.value = false;
  }
}
</script>