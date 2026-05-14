<template>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Search..." class="w-full border px-3 py-2 rounded">
  </template>
  
  <script setup>
  const props = defineProps(['modelValue'])
  </script>
  