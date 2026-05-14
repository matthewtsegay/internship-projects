<template>
  <navbar />
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <form @submit.prevent="verifyCode" class="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
      <h2 class="text-2xl font-bold text-center text-blue-600">Enter Verification Code</h2>
      <p class="text-center text-sm text-gray-500">We've sent a 6-digit code to your email</p>

      <div class="flex justify-center gap-2">
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          type="text"
          maxlength="1"
          class="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          @input="focusNext(index, $event)"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
      >
        Verify Code
      </button>

      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
  <footer1 />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import navbar from '../../components/shared/navbar.vue'
import footer1 from '../../components/shared/footer1.vue'
import { VerifyCode } from '../../api/authApi.js'

const router = useRouter()
const code = ref(['', '', '', '', '', ''])
const error = ref('')

// Get email from localStorage
const email = localStorage.getItem('resetEmail') || ''

const focusNext = (index, event) => {
  if (event.target.value && index < 5) {
    event.target.nextElementSibling?.focus()
  }
}

const verifyCode = async () => {
  const enteredCode = code.value.join('')
  if (enteredCode.length !== 6) {
    error.value = 'Please enter the 6-digit code.'
    return
  }

  try {
    await VerifyCode({ code: enteredCode, email }) // ✅ Send email + code
    localStorage.setItem('resetCode', enteredCode) // ✅ Save verified code
    router.push({ name: 'ResetPassword' })         // ✅ Go to reset password
  } catch (err) {
    error.value = err.response?.data?.error || 'Invalid code. Please try again.'
  }
}
</script>

<style scoped></style>
