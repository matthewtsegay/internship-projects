<template>
  <navbar />
  <div class="forgot-password-page flex items-center justify-center min-h-screen bg-gray-100 relative p-4">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-xs bg-gray-700 border border-gray-200 rounded-xl shadow-lg p-6 space-y-4"
    >
      <h2 class="text-2xl font-bold text-center text-gray-400">Forgot Password</h2>
      <p class=" text-sm text-gray-300">Enter your email to receive a reset link</p>

      <div>
        <label for="email" class="block text-sm font-semibold text-gray-300 mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="you@example.com"
          class="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-white text-gray-600 py-2 rounded-lg hover:bg-gray-500 focus:outline-none border border-gray-500 hover:text-white focus:ring-2 focus:ring-blue-400 transition duration-300 font-semibold"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>

      <button 
        @click="back"
        type="button"
        class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 font-semibold"
      >
        Back
      </button>

      <p v-if="message" class="text-green-600 text-sm text-center">{{ message }}</p>
      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
    </form>
  </div>
  <footer1 />
</template>


<script setup>
import { ref } from 'vue'
import { forgetPassword } from '../api/authApi.js'
import { useRouter } from 'vue-router'
//import navbar from '../../components/shared/navbar.vue'
//import footer1 from '../../components/shared/footer1.vue'

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
    const response = await forgetPassword({ email: email.value })

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
  router.push({ name: 'login' })
}
</script>

<style scoped>
.forgot-password-page {
  font-family: 'Inter', sans-serif;
  background-image: url('../../../assets/image/burger3.jpg'); /* adjust to your image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
