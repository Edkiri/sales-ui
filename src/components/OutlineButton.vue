<template>
  <button :type="type" class="hover:opacity-100 opacity-60 px-2 rounded border text-md"
    :class="`border-${color} text-${color}`" @click="handleClick">{{ label }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: 'button'
  },
  clickFunction: {
    type: Function,
  },
  color: {
    type: String,
  },
  type: {
    type: String as () => undefined | "submit" | "button" | "reset",
    default: 'button',
  }
})

function handleClick(_e: MouseEvent) {
  if (props.clickFunction) {
    props.clickFunction();
  }
} 
</script>