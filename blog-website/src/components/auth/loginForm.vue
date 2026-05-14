<template>
  <div class="login-page flex h-screen w-full relative overflow-hidden pt-4">
    <div class="quote hidden md:flex w-2/3 items-center justify-center relative pt-4">
      <div
        class="absolute inset-0 rounded-l-3xl overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: 'url(/src/assets/image/office-581127_1280.jpg)' }"
      >
        <div class="absolute inset-0  bg-opacity-60"></div>
      </div>
      <div class="relative z-10 font-extrabold text-white text-center px-8">
        <blockquote class="text-2xl md:text-3xl font-extrabold italic leading-relaxed">
          “The future belongs to those who believe in the beauty of their dreams.”
        </blockquote>
      </div>
    </div>

    <div class="w-full md:w-1/3 flex items-center justify-center bg-gray-100 bg-opacity-90 backdrop-blur-sm p-6">
      <form
        @submit.prevent="handlesubmit"
        class="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 class="text-3xl font-bold text-center text-blue-600">login page</h2>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="credentials.email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div class="flex justify-between items-center text-sm text-gray-600">
          <button @click="goToForgotPassword" type="button" class="text-blue-600 hover:underline">
            Forgot Password?
          </button>
          <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="text-center text-sm text-gray-600">
          Don't have an account?
          <button @click="goToSignup" type="button" class="text-blue-600 hover:underline ml-1">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth.js'
import { login } from '../../api/authApi.js'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

const handlesubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    // 1. Send login request
    const res = await login(credentials.value)

    // 2. Get user data (support for both direct object or axios response)
    const user = res.data ?? res

    // 3. Check if user has an ID (backend must return it)
    const idToStore = user.id || user.userId
    if (!idToStore) {
      throw new Error('No user ID in login response')
    }

    // 4. Store full user object as JSON
    localStorage.setItem('user', JSON.stringify(user))  // ✅ IMPORTANT CHANGE
    localStorage.setItem('userId', idToStore);

    // 5. Update pinia or vuex store
    authStore.set(user)

    // 6. Redirect to Post Dashboard
    router.push({ name: 'PostDashBoard' })
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const goToSignup = () => router.push({ name: 'signupView' })
const goToForgotPassword = () => router.push({ name: 'ForgetPassword' })
</script>
