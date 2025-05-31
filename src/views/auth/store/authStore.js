import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  // Computed properties to determine authentication status
  const isAuthenticated = computed(() => !!token.value)
  const registrationComplete = computed(() => user.value?.registrationComplete || false)

  // Set user and token data when user logs in
  const set = (data) => {
    user.value = data.user
    token.value = data.token
  }

  const updateProfile = async (profileData) => {
    if (!token.value) throw new Error('Not authenticated')

    try {
      const response = await axios.put(
        'http://localhost:8080/api/user/profile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      )

      user.value = response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed')
    }
  }

  // Log out user
  const logout = () => {
    user.value = null
    token.value = null
    delete axios.defaults.headers.common['Authorization']
  }

  // Dynamically change navbar based on authentication
  const updateNavbar = () => {
    // This method can be used in your components to update the navbar directly.
    // For example, you can call it after successful login or logout.
    // It will automatically trigger reactivity and update the navbar based on `isAuthenticated`.
  }

  return {
    user,
    token,
    set,
    isAuthenticated,
    registrationComplete,
    updateProfile,
    logout,
    updateNavbar,
  }
})

export default useAuthStore
