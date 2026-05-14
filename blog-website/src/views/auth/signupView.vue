<script setup>
import signup from '../../components/auth/signup.vue'
import footer1 from '../../components/shared/footer1.vue'
import navbar from '../../components/shared/navbar.vue'
</script>

<template>
  <div class="auth-view bg-gray-100 flex justify-center items-center min-h-[100vh]">
    <div class="auth-container w-full bg-blue-50 rounded-lg shadow-lg">
      <navbar />
      <signup />
      <footer1 />
    </div>
  </div>
</template>
