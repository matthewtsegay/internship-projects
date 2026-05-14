<!-- src/components/FormTextarea.vue -->
<template>
    <div class="form-group">
      <label :for="id">{{ label }}</label>
      <textarea 
        :id="id" 
        v-model="modelValue" 
        placeholder="Your comment..."
        rows="4"
        class="w-full border rounded-lg p-2"
      ></textarea>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,  // Ensure the `id` prop is required for the textarea
    },
  });
  </script>
  
  <style scoped>
  /* Optional styling for FormTextarea */
  </style>
  