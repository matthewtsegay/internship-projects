<script setup>
import { ref } from 'vue'
import FormTextarea from '../shared/FormTextarea.vue'
import FormButton from '../shared/FormButton.vue' // Assuming you're using a custom button

const emit = defineEmits(['submit'])
const content = ref('')

function handleSubmit() {
  if (!content.value.trim()) {
    alert('Comment cannot be empty.')
    return
  }

  emit('submit', content.value.trim())
  content.value = '' 
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-3">
    <FormTextarea
      v-model="content"
      id="comment-content"
      label="Write a comment..."
    />
    <FormButton text="Post Comment" @click="handleSubmit" />
  </form>
</template>
