<template>
    <div class="border rounded p-4 shadow">
      <img :src="item.image" alt="" class="w-full h-32 object-cover mb-2">
      <h3 class="font-bold">{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p class="text-green-600 font-semibold">${{ item.price }}</p>
      <button @click="$emit('add', item)" class="bg-blue-500 text-white mt-2 px-3 py-1 rounded">Add to Cart</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['item'])
  </script>