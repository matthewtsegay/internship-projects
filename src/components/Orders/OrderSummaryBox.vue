<template>
    <div class="p-4 bg-gray-100 rounded">
      <slot></slot>
      <div class="mt-4 font-bold">Total: ${{ total }}</div>
      <button @click="$emit('place-order')" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">Place Order</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['total'])
  </script>