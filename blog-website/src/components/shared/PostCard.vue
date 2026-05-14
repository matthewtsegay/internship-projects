<template>
    <div class="border rounded-xl p-4 shadow hover:shadow-md transition">
      <h2 class="text-xl font-semibold">{{ post.title }}</h2>
      <p class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</p>
      <p class="mt-2 text-gray-700">{{ post.content.slice(0, 150) }}...</p>
      <router-link :to="`/posts/${post.id}`" class="text-blue-500 hover:underline mt-2 block">Read More</router-link>
    </div>
  </template>
  
  <script setup>
  defineProps({
    post: Object
  })
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }
  </script>
  