<template>
  <div class="w-full text-md flex flex-col gap-1 text-sm">
    <span class="text-neutral-600 dark:text-neutral-400">Método pago</span>
    <div
      class="cursor-pointer  flex items-center relative outline-none rounded-sm border-2  dark:bg-zinc-950 hover:border-neutral-700 hover:dark:border-neutral-600"
      :class="{ 'border-neutral-700 dark:border-neutral-600': selecting, 'border-neutral-400 dark:border-neutral-800': !selecting }">

      <div @click="() => selecting = !selecting" class="items-center py-1 px-2 flex w-full justify-between">
        <span class="select-none">{{ paymentMethods.find(item => item.id === selectedMethodId)?.name || '' }}</span>
        <button type="button" class="transform rotate-90 select-none">></button>
      </div>

      <div class="flex  flex-col absolute right-0 left-0 top-full z-10" v-if="selecting">
        <span v-for="method in filteredMethods" :key="method.id"
          class="p-2 hover:bg-neutral-800 hover:dark:bg-neutral-700 px-4 bg-zinc-800 text-neutral-300"
          @click="selectMethod(method)">
          {{ method.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { findPaymentMethods } from '../../../api';
const selecting = ref(false);

const selectedPaymentMethodId = ref<number | undefined>(undefined);
const paymentMethods = ref<IPaymentMethod[]>([]);

const props = defineProps({
  currencyId: {
    type: Number,
    requited: true
  },
  selectedMethodId: {
    type: Number,
    requited: true
  }
})
const emit = defineEmits(['update:selectedMethodId']);

const filteredMethods = computed<IPaymentMethod[]>(() => {
  return paymentMethods.value.filter(item => item.currencyId === props.currencyId);
})

watch(() => props.currencyId, () => {
  selectedPaymentMethodId.value = filteredMethods.value[0].id;
})

watch(selectedPaymentMethodId, () => {
  emit('update:selectedMethodId', selectedPaymentMethodId.value);
})

function selectMethod(method: IPaymentMethod) {
  selectedPaymentMethodId.value = method.id;
  selecting.value = false;
}

async function getData() {
  const mathodsResponse = await findPaymentMethods();
  paymentMethods.value = mathodsResponse;
  selectedPaymentMethodId.value = paymentMethods.value[0].id;
}
getData();

</script>