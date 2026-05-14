<template>
  <nav class="w-full fixed top-0 left-0 z-50 bg-transparent">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-end">
      <RouterLink
        to="/signup"
        class="text-white hover:underline font-semibold transition duration-200"
      >
        Sign Up
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
