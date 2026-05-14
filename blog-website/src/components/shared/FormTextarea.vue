<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Comment'
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

// Keep local value in sync with prop
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// Emit updates
watch(inputValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <textarea
      :id="id"
      v-model="inputValue"
      placeholder="Your comment..."
      rows="4"
      class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
    />
  </div>
</template>
