<template>
  <form @submit.prevent="submit" class="my-4 flex flex-col p-4 w-full rounded max-w-xl mx-auto">
    <h3 class="text-xl text-center my-1">Actualizar producto</h3>

    <div class="flex flex-col gap-4">

      <app-input label="Nombre" :isLoading="loading" v-model:value="form.name"></app-input>
      <app-input label="Descripción" :isLoading="loading" v-model:value="form.description"></app-input>

      <div class="flex gap-2 w-full">
        <app-input label="Referencia" :isLoading="loading" v-model:value="form.reference"></app-input>
        <app-input label="Marca" :isLoading="loading" v-model:value="form.brand"></app-input>
      </div>

      <div class="flex gap-2 w-full mb-2">
        <app-input label="Precio" :isLoading="loading" v-model:value="form.price"></app-input>
        <app-input label="Stock" :isLoading="loading" v-model:value="form.stock"></app-input>
      </div>

      <app-checkbox  v-if="!loading" v-model:isActive="form.isActive" label="Estado" isActiveMessage="Activo" deactiveMessage="Inactivo. No disponible para ventas."></app-checkbox>
      
    </div>

    <app-button label="Update product" :disabled="loading"></app-button>

    <div class="flex flex-col w-100 items-center mt-4 gap-1">
      <span v-if="Array.isArray(error) && error.length" v-for="err in error" :key="err"
        class="text-red-700 text-md opacity-80">
        {{ err }}
      </span>

      <span v-if="!Array.isArray(error)" class="text-red-700 text-md opacity-80">
        {{ error }}
      </span>

      <span v-if="successUpdated" class="text-green-600 :dark:text-green-600">
        Producto actualizado exitosamente
      </span>
    </div>

  </form>


</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppInput from '../../../components/AppInput.vue'; //TODO: Setup path aliases
import AppButton from '../../../components/AppButton.vue';
import AppCheckbox from '../../../components/AppCheckbox.vue';
import router from '../../../router';
import { getProductDetails, updateProduct } from '../../../api';
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
const product = ref<IProduct | null>(null)

const successUpdated = ref(false);

async function getData() {
  try {
    loading.value = true;
    error.value = '';
    const productId = router.currentRoute.value.params.id as string;
    const productDetails = await getProductDetails(productId);
    product.value = productDetails;

    form.name = productDetails.name;
    form.description = productDetails.description || '';
    form.reference = productDetails.reference;
    form.brand = productDetails.brand || '';
    form.price = String(productDetails.price) || '';
    form.stock = String(productDetails.stock) || '';
    form.isActive = productDetails.isActive;
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
    const productId = router.currentRoute.value.params.id as string;
    const productUpdated = await updateProduct(productId, {
      name: form.name,
      description: form.description,
      reference: form.reference,
      brand: form.brand,
      price: Number(form.price),
      stock: Number(form.stock),
      isActive: form.isActive,
    });
    product.value = productUpdated;
    form.name = productUpdated.name;
    form.description = productUpdated.description ?? '';
    form.reference = productUpdated.reference;
    form.brand = productUpdated.brand ?? '';
    form.price = String(productUpdated.price) ?? '';
    form.stock = String(productUpdated.stock) ?? '';
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