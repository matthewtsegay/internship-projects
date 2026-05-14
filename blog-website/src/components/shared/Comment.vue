<template>
  <div class="bg-gray-100 rounded p-3 mb-2">
    <p class="text-sm text-gray-600">
      {{ formatDate(comment.created_at) }} by <strong>{{ comment.user }}</strong>
    </p>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

function formatDate(date) {
  return new Date(date).toLocaleString()
}
</script>
