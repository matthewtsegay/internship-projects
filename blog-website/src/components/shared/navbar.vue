<template>
  <nav :class="[!isAuthenticated ? 'bg-black' : 'bg-gray-500', 'shadow-md px-6 py-6 flex items-center justify-between relative w-full z-50']">
    <div class="flex items-center">
      <router-link to="/" class="text-2xl font-bold text-gray-100">
        {{ badge }}
      </router-link>
    </div>

    <!-- Blog Dropdown (Visible when logged in) -->
    <div v-if="isAuthenticated" class="absolute left-1/2 transform -translate-x-1/2">
      <div class="relative" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          class="text-xl font-bold text-white hover:text-gray-200 focus:outline-none"
        >
          Blog ▼
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white border border-blue-200 shadow-md rounded-md py-2 z-[999]"
        >
          <router-link
            to="/createPost"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            Create Blog
          </router-link>
          <div class="border-t border-blue-100"></div>
          <router-link
            to="/postDashBoard"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            Post Dashboard
          </router-link>
          <div class="border-t border-blue-100"></div>
          <router-link
            to="/MyPosts"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeDropdown"
          >
            My Blogs
          </router-link>
        </div>
      </div>
    </div>

    <!-- Login and Sign Up (Visible when not logged in) -->
    <div v-if="!isAuthenticated" class="flex items-center space-x-4">
      <router-link
        to="/loginView"
        class="text-sm font-bold text-white hover:text-gray-200 px-4 py-2"
      >
        Login
      </router-link>
      <router-link
        to="/signupView"
        class="text-sm font-bold text-white hover:text-gray-200 px-4 py-2"
      >
        Sign Up
      </router-link>
    </div>

    <!-- Profile Dropdown (Visible when logged in) -->
    <template v-if="isAuthenticated">
      <div class="relative text-center" ref="profileDropdownRef">
        <img
          @click="toggleProfileDropdown"
          :src="userProfileImage"
          alt="Profile"
          class="w-10 h-10 rounded-full border-2 border-blue-400 shadow-sm object-cover cursor-pointer"
        />
        <p class="text-sm font-bold text-gray-700 mt-1">
          {{ user?.name }}
        </p>
        <div
          v-if="profileDropdown"
          class="absolute right-0 mt-2 w-44 bg-white border border-blue-200 shadow-md rounded-md py-2 z-[999]"
        >
          <router-link
            to="/profileView"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            @click="closeProfileDropdown"
          >
            Profile
          </router-link>
          <div class="border-t border-blue-100"></div>
          <button
            @click="logout"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
          >
            Logout
          </button>
        </div>
      </div>
    </template>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // Import axios for making API calls
import ImageUpload from '../../components/shared/FormImageUpload.vue'

const isAuthenticated = ref(false) // Store authentication state
const dropdownOpen = ref(false)
const profileDropdown = ref(false)
const userProfileImage = ref('') // Store the user's profile image URL
const user = ref({}) // Store user info (including name)
const badge = ref('Blog website')
const router = useRouter()

const getUserProfile = async () => {
  try {
    // Assuming the user is authenticated, make an API request to fetch user profile data
    const response = await axios.get('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token if necessary
      }
    })
    
    // Update the user and profile image based on the response
    user.value = response.data
    userProfileImage.value = user.value.profileImage || '/default-profile.jpg' // Default image if no profile image
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    isAuthenticated.value = true
    getUserProfile() 
  }
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const toggleProfileDropdown = () => {
  profileDropdown.value = !profileDropdown.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const closeProfileDropdown = () => {
  profileDropdown.value = false
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token') 
  isAuthenticated.value = false
  user.value = {}
  userProfileImage.value = ''
  router.push('/loginView') 
}
</script>

<style scoped></style>
