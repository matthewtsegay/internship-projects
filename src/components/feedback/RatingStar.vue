<template>
    <div class="flex gap-1">
      <span v-for="n in 5" :key="n" @click="$emit('update:modelValue', n)" class="cursor-pointer text-yellow-400">
        {{ modelValue >= n ? '★' : '☆' }}
      </span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['modelValue'])
  </script>
  