<template>
    <div class="bg-white rounded-lg shadow-md p-4 text-center">
      <img
        v-if="post.profilePicture"
        :src="post.profilePicture"
        alt="User"
        class="w-24 h-24 rounded-full mx-auto object-cover border"
      />
      <h3 class="text-lg font-semibold mt-3">{{ post.firstName }} {{ post.lastName }}</h3>
      <p class="text-gray-600">{{ post.username }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    post: { type: Object, required: true }
  })
  </script>
  