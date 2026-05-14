<template>
  <div class="login-page min-h-screen w-full flex items-center justify-center relative overflow-hidden">
    <!-- Login Form Box -->
    <div class="relative z-10 w-full max-w-xs px-4 py-6 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl">
      <form @submit.prevent="handlesubmit" class="space-y-4">
        <h2 class="text-2xl font-bold text-center text-gray-200">🔒 Sign In</h2>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-bold text-gray-200 mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="credentials.email"
            required
            placeholder="email"
            class="w-full px-3 py-2 border bg-gray-200 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-bold text-gray-200 mb-1">Password</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="••••••••"
            class="w-full px-3 py-2 border bg-gray-200 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Error & Forgot Password -->
        <div class="flex justify-between items-center text-sm text-gray-400">
          <button @click="goToForgotPassword" type="button" class="hover:underline font-bold">
            Forgot Password?
          </button>
          <span v-if="error" class="text-red-400 text-xs font-semibold">{{ error }}</span>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300 font-semibold text-sm"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <!-- Sign up link -->
        <div class="text-center text-xs text-gray-300 font-bold">
          Don't have an account?
          <button @click="goToSignup" type="button" class="text-gray-300 hover:underline ml-1">
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
import { useAuthStore } from '../../views/auth/store/authStore.js'
import { login } from '../../views/auth/api/authApi.js'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

const handlesubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await login(credentials.value)
    const user = res.data ?? res
    const idToStore = user.id || user.userId
    const role = user.role?.toLowerCase()

    if (!idToStore || !role) throw new Error('User ID or role missing in response')

    //  Prevent customer login
    if (role === 'customer') {
      error.value = 'Customers must scan the QR code to access the menu.'
      loading.value = false
      return
    }

    // ✅ Save user info
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userId', idToStore)
    authStore.set(user)

    // 🔁 Redirect based on role
    switch (role) {
      case 'admin':
        router.push({ name: 'AdminDashboard' })
        break
      case 'superadmin':
        router.push({ name: 'SuperAdminDashboard' })
        break
      case 'staff':
        router.push({ name: 'KitchenStaffDashboard' })
        break
      default:
        throw new Error('Unknown role: ' + role)
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const goToSignup = () => router.push({ name: 'signup' })
const goToForgotPassword = () => router.push({ name: 'ForgetPassword' })
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  background-image: url('../../assets/image/pizza1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
}

/* Blur layer */
.login-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;
  background-repeat: inherit;
  background-attachment: inherit;
  filter: blur(5px);
  z-index: 0;
}

/* Ensure content appears above blur */
.login-page > * {
  position: relative;
  z-index: 1;
}
</style>

