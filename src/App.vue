<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';

const theme = ref('dark');

function toggleDarkMode() {
  if (theme.value === 'light') {
    theme.value = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    theme.value = 'light';
    document.documentElement.classList.remove('dark');
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-white dark:bg-zinc-800 text-black dark:text-white grow">

    <header
      class="py-3 px-5 flex items-center justify-between border-b border-neutral-800 bg-neutral-200 dark:bg-zinc-900 dark:border-neutral-600">
      <h1 class="text-2xl font-bold">Sales App</h1>
      <button @click="toggleDarkMode">Dark</button>
    </header>

    <div class="flex grow">
      <div class="self-align-stretch border-r bg-neutral-200 dark:bg-zinc-900 border-neutral-800 dark:border-neutral-600">

        <nav class="flex flex-col items-start py-2 gap-3">
          <button class="self-justify-start text-4xl px-4">X</button>

          <ul class="flex flex-col min-w-[300px]">
            <router-link to="/orders">
              <li class="flex gap-4 items-center px-4 py-3 hover:bg-neutral-500 cursor-pointer">
                <span class="text-4xl">O</span>
                <span class="text-2xl">Orders</span>
              </li>
            </router-link>
            <router-link to="/">
              <li class="flex gap-4 items-center px-4 py-3 hover:bg-neutral-500 cursor-pointer">
                <span class="text-4xl">O</span>
                <span class="text-2xl">Sales</span>
              </li>
            </router-link>
            <router-link to="/">
              <li class="flex gap-4 items-center px-4 py-3 hover:bg-neutral-500 cursor-pointer">
                <span class="text-4xl">O</span>
                <span class="text-2xl">Products</span>
              </li>
            </router-link>
          </ul>
        </nav>

      </div>
      <div class="flex flex-col grow">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
