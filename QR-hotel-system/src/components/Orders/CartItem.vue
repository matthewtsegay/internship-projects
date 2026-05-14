<template>
    <div class="flex justify-between items-center py-2 border-b">
      <span>{{ item.name }} x {{ item.quantity }}</span>
      <span>${{ item.price * item.quantity }}</span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['item'])
  </script>