<template>
  <navbar />
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="resetPassword" class="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
      <h2 class="text-2xl font-bold text-center text-blue-600">Reset Password</h2>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          v-model="password"
          required
          placeholder="New password"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          required
          placeholder="Confirm password"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
      >
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>

      <p v-if="message" class="text-green-500 text-sm text-center">{{ message }}</p>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
  <footer1 />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ResetPassword } from '../../api/authApi.JS'
import navbar from '../../components/shared/navbar.vue'
import footer1 from '../../components/shared/footer1.vue'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const email = ref(localStorage.getItem('resetEmail') || '')
const resetCode = ref(localStorage.getItem('resetCode') || '')

const loading = ref(false)
const message = ref('')
const error = ref('')

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  if (!email.value || !resetCode.value) {
    error.value = 'Missing email or reset code. Please restart the reset process.'
    return
  }

  loading.value = true
  error.value = ''
  message.value = ''

  try {
    await ResetPassword({
      email: email.value,
      resetCode: resetCode.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })

    message.value = 'Password reset successfully!'
    localStorage.removeItem('resetEmail')
    localStorage.removeItem('resetCode')

    setTimeout(() => {
      router.push({ name: 'loginView' })
    }, 1500)
  } catch (err) {
    error.value = err.response?.data?.error || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
