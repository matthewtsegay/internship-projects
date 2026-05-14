<template>
    <form @submit.prevent="$emit('submit', { rating, comment })" class="space-y-3">
      <RatingStars v-model="rating" />
      <textarea v-model="comment" class="w-full border rounded p-2" placeholder="Your feedback......"></textarea>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import RatingStars from './RatingStars.vue'
  
  const rating = ref(0)
  const comment = ref('')
  </script>