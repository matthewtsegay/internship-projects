<template>
  <navbar />
  <div class="forgot-password-page flex h-screen w-full relative overflow-hidden">
    <!-- Left Inspirational Quote and Image -->
    <div class="quote hidden md:flex w-2/3 items-center justify-center relative">
      <div
        class="absolute inset-0 rounded-l-3xl overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: 'url(/src/assets/image/office-581127_1280.jpg)' }"
      >
        <div class="absolute inset-0 bg-opacity-60"></div>
      </div>
      <div class="relative z-10 font-extrabold text-white text-center px-8">
        <blockquote class="text-xl md:text-3xl font-extrabold italic leading-relaxed">
          “The future belongs to those who believe in the beauty of their dreams.”
        </blockquote>
      </div>
    </div>

    <!-- Right Side: Forgot Password Form -->
    <div class="w-full md:w-1/3 flex items-center justify-center bg-gray-100 bg-opacity-90 backdrop-blur-sm p-6">
      <form
        @submit.prevent="handleSubmit"
        class="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 class="text-3xl font-bold text-center text-blue-600">Forgot Password</h2>
        <p class="text-center text-sm text-gray-500">Enter your email to receive a reset link</p>

        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-blue-700 focus:outline-none border border-blue-500 hover:text-white focus:ring-2 focus:ring-blue-400 transition duration-300 font-semibold"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>

        <button 
          @click="back"
          type="button"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Back
        </button>

        <p v-if="message" class="text-green-600 text-sm text-center">{{ message }}</p>
        <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
  <footer1 />
</template>

<script setup>
import { ref } from 'vue'
import { ForgotPassword } from '../../api/authApi.js'
import { useRouter } from 'vue-router'
import navbar from '../../components/shared/navbar.vue'
import footer1 from '../../components/shared/footer1.vue'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const response = await ForgotPassword({ email: email.value })

    // ✅ Save email to localStorage
    localStorage.setItem('resetEmail', email.value)

    message.value = response.message || 'Reset link sent! Please check your email.'

    // ✅ Navigate after 1 second
    setTimeout(() => {
      router.push({ name: 'EnterCode' })
    }, 1000)

  } catch (err) {
    error.value = err.response?.data?.error || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

const back = () => {
  router.push({ name: 'loginView' })
}
</script>

<style scoped>
.forgot-password-page {
  font-family: 'Inter', sans-serif;
  background-color: #f9fafb;
}
</style>
