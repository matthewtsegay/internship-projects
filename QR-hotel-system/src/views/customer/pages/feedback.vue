<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Feedback</h1>
      <textarea v-model="feedback" class="textarea textarea-bordered w-full" placeholder="Write your feedback here..."></textarea>
      <div class="my-2">
        <label>Rate us:</label>
        <select v-model="rating" class="select select-bordered">
          <option disabled value="">Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
        </select>
      </div>
      <button class="btn btn-success mt-2" @click="submitFeedback">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const feedback = ref('')
  const rating = ref('')
  
  async function submitFeedback() {
    await axios.post('/api/feedback', { feedback: feedback.value, rating: rating.value })
    alert('Thank you for your feedback!')
    feedback.value = ''
    rating.value = ''
  }
  </script>
  