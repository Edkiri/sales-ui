<template>
  <div class="w-full flex flex-col gap-1 text-sm">
    <span class="text-neutral-600 dark:text-neutral-400">Moneda</span>
    <div
      class="cursor-pointer flex items-center relative outline-none rounded-sm border-2  dark:bg-zinc-950 hover:border-neutral-700 hover:dark:border-neutral-600"
      :class="{ 'border-neutral-700 dark:border-neutral-600': selecting, 'border-neutral-400 dark:border-neutral-800': !selecting }">

      <div @click="() => selecting = !selecting" class="items-center py-1 px-2 flex w-full justify-between">
        <span class="select-none">{{ selectedCurrency?.name || '' }}</span>
        <span class="transform rotate-90 select-none">></span>
      </div>

      <div class="flex flex-col bg-neutral-zinc-950 absolute right-0 left-0 top-full z-10" v-if="selecting">
        <span v-for="currency in currencies" :key="currency.id"
          class="p-2 hover:bg-neutral-800 hover:dark:bg-neutral-700 px-4 bg-zinc-950 text-neutral-400"
          @click="selectCurrency(currency)">
          {{ currency.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { findCurrencies } from '../../../api';
const selecting = ref(false);

defineProps({
  selected: {
    type: Object as () => ICurrency
  }
})
const emit = defineEmits(['update:selected']);

const selectedCurrency = ref<ICurrency | undefined>(undefined);
const currencies = ref<ICurrency[]>([]);

function selectCurrency(currency: ICurrency) {
  selectedCurrency.value = currency;
  selecting.value = false;
}

watch(selectedCurrency, () => {
  emit('update:selected', selectedCurrency.value)
})

async function getData() {
  const currenciesResponse = await findCurrencies();
  currencies.value = currenciesResponse;
  selectedCurrency.value = currencies.value[0];
}
getData();

</script>