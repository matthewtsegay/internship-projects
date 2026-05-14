<template>
    <div class="flex items-center gap-2">
      <button @click="$emit('decrease')" class="px-2">-</button>
      <span>{{ quantity }}</span>
      <button @click="$emit('increase')" class="px-2">+</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['quantity'])
  </script>
  