<template>
    <div
      class="border-2 border-dashed p-4 rounded-md text-center"
      :class="{ 'border-blue-500': isDragging }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <p class="text-gray-600 mb-2">Drag and drop an image, or click to select</p>
      <input type="file" accept="image/*" class="hidden" :id="id" @change="handleFileChange" />
      <label :for="id" class="cursor-pointer text-blue-600 underline">Choose Image</label>
  
      <div v-if="previewUrl" class="mt-4">
        <img :src="previewUrl" alt="Preview" class="h-32 w-32 object-cover rounded-full mx-auto" />
        <p class="text-sm text-gray-500 mt-1">{{ imageName }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: File,
    label: String,
    id: String,
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const previewUrl = ref('')
  const imageName = ref('')
  const isDragging = ref(false)
  
  watch(() => props.modelValue, (newFile) => {
    if (newFile) {
      previewUrl.value = URL.createObjectURL(newFile)
      imageName.value = newFile.name
    }
  })
  
  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      emit('update:modelValue', file)
    }
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    handleFile(file)
  }
  
  const onDrop = (e) => {
    isDragging.value = false
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }
  
  const onDragOver = () => {
    isDragging.value = true
  }
  
  const onDragLeave = () => {
    isDragging.value = false
  }
  </script>
  

