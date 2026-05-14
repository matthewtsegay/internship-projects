<script setup>
import { useAuthStore } from './store/auth.js'

const authStore = useAuthStore()
</script>
<template>
    <div id="app">
    <nav v-if="authStore.isAuthenticated">
      <router-link :to="{ name: 'postDashboard' }">Profile</router-link> |
      <button @click="authStore.logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
