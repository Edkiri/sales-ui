<template>
  <form @submit.prevent="submit" class="my-4 flex flex-col  p-4 w-full rounded max-w-xl mx-auto">
    <h3 class="text-xl text-center my-1">Create Product</h3>

    <div class="flex flex-col gap-2">

      <app-input label="Name" v-model:value="form.name"></app-input>
      <app-input label="Description" v-model:value="form.description"></app-input>

      <div class="flex gap-2 w-full">
        <app-input label="Reference" v-model:value="form.reference"></app-input>
        <app-input label="Brand" v-model:value="form.brand"></app-input>
      </div>

      <div class="flex gap-2 w-full">
        <app-input label="Price" v-model:value="form.price"></app-input>
        <app-input label="Stock" v-model:value="form.stock"></app-input>
      </div>
    </div>

    <button class="mt-6 mb-2 self-center py-1 px-6 rounded bg-blue-400 dark:bg-blue-800">Create Product</button>

  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppInput from '../../../components/AppInput.vue'; //TODO: Setup path aliases
// import { createProduct } from '../../../api';
// import router from '../../../router';

const form = reactive({
  name: "",
  description: "",
  reference: "",
  brand: "",
  price: "",
  stock: "",
})

const loading = ref(false);

async function submit() {
  try {
    console.log("FORM", form)
    loading.value = true;
    // await createProduct({
    //   name: form.value.name,
    //   description: form.value.description,
    //   reference: form.value.reference,
    //   brand: form.value.brand,
    //   price: Number(form.value.price),
    //   stock: Number(form.value.stock),
    // });
    // router.push({ path: '/products' });
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}
</script>