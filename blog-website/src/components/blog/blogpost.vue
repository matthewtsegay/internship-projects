<template>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <img :src="post.image" alt="Post image" class="w-full h-48 object-cover" />
      
      <div class="p-4 flex-1 flex flex-col">
        <h2 class="text-xl font-bold text-gray-800 mb-1">{{ post.title }}</h2>
        <p class="text-sm text-gray-500 mb-2">{{ post.category }}</p>
        <p class="text-gray-700 flex-1 mb-3">{{ truncate(post.content, 100) }}</p>
  
        <div class="flex justify-between items-center mt-auto">
          <div class="flex gap-4 text-gray-600 text-sm">
            <span>👍 {{ post.likes }}</span>
            <span>👎 {{ post.dislikes }}</span>
            <span>💬 {{ post.comments.length }}</span>
          </div>
          <button
            @click="removePost"
            class="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    post: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['remove']);
  
  function removePost() {
    emit('remove', post.id);
  }
  
  function truncate(text, length) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
  </script>
  