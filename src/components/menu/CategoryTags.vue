<template>
    <div class="flex gap-4">
      <button v-for="category in categories" :key="cat" @click="$emit('select', cat)" class="px-4 py-2 rounded" :class="{ 'bg-blue-500 text-white': cat === selected }">
        {{ category }}
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['categories', 'selected'])
  </script>
  