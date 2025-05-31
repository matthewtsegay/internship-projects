<template>
    <p class="text-gray-700 mb-2">
      <strong class="font-semibold">{{ label }}:</strong>
      {{ value }}
    </p>
</template>
  
  <script setup>
  defineProps({
    label: String,
    value: [String, Number]
  })
  </script>
  