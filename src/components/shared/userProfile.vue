<template>
  <div class="max-w-xl mt-6 mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-white py-3 bg-gray-400 rounded-t-md text-center">
      Welcome, {{ profile.firstName }}
    </h1>
    <h2 class="text-xl font-semibold text-white bg-gray-300 py-2 px-4 text-left">
      User Profile
    </h2>

    <div class="flex justify-center my-4">
      <img
        v-if="profile.profilePicture"
        :src="profile.profilePicture"
        alt="Profile"
        class="h-32 w-32 object-cover rounded-full border-2 border-gray-400"
      />
    </div>

    <ImageUpload v-if="isEditing" v-model="profile.profilePictureFile" />

    <table class="w-full border border-blue-300 rounded-lg overflow-hidden mt-4">
      <tbody class="divide-y divide-blue-200">
        <tr class="bg-blue-50">
          <td class="font-semibold bg-gray-200 p-2 w-1/4">Name :</td>
          <td class="p-4">
            <div v-if="!isEditing">{{ profile.firstName }} {{ profile.lastName }}</div>
            <div v-else class="flex space-x-2">
              <input v-model="profile.firstName" placeholder="First Name" class="input" />
              <input v-model="profile.lastName" placeholder="Last Name" class="input" />
            </div>
          </td>
        </tr>

        <tr class="bg-blue-50">
          <td class="font-semibold bg-gray-200 p-2">Username :</td>
          <td class="p-4">
            <div v-if="!isEditing">{{ profile.username }}</div>
            <input v-else v-model="profile.username" class="input" />
          </td>
        </tr>

        <tr class="bg-blue-50">
          <td class="font-semibold bg-gray-200 p-2">Email :</td>
          <td class="p-4">
            <div v-if="!isEditing">{{ profile.email }}</div>
            <input v-else v-model="profile.email" class="input" />
          </td>
        </tr>

        <tr class="bg-blue-50">
          <td class="font-semibold bg-gray-200 p-2">Phone :</td>
          <td class="p-4">
            <div v-if="!isEditing">{{ profile.phoneNumber }}</div>
            <input v-else v-model="profile.phoneNumber" class="input" />
          </td>
        </tr>

        <tr class="bg-blue-50">
          <td class="font-semibold bg-gray-200 p-2">Bio:</td>
          <td class="p-4">
            <div v-if="!isEditing">{{ profile.bio }}</div>
            <textarea v-else v-model="profile.bio" class="input h-24 resize-none"></textarea>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6 flex gap-4">
      <button @click="toggleEdit" class="btn bg-orange-500 hover:bg-orange-600">
        {{ isEditing ? 'Cancel' : 'Edit Profile' }}
      </button>
      <button v-if="isEditing" @click="submitProfile" class="btn bg-green-600 hover:bg-green-700">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from '../../store/auth'
import { getProfile, updateProfile } from '../../api/authApi'
import ImageUpload from '../../components/shared/FormImageUpload.vue'

const authStore = useAuthStore()
const isEditing = ref(false)

const profile = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phoneNumber: '',
  bio: '',
  profilePicture: '',
  profilePictureFile: null,
})

const fetchProfile = async () => {
  const userId = localStorage.getItem('userId')
  const result = await getProfile(userId)
  Object.assign(profile, result)
}

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const submitProfile = async () => {
  const userId = localStorage.getItem('userId')
  const formData = new FormData()

  formData.append('userId', userId)
  formData.append('firstName', profile.firstName)
  formData.append('lastName', profile.lastName)
  formData.append('username', profile.username)
  formData.append('email', profile.email)
  formData.append('phoneNumber', profile.phoneNumber)
  formData.append('bio', profile.bio)

  if (profile.profilePictureFile) {
    formData.append('profilePicture', profile.profilePictureFile)
  }

  const updated = await updateProfile(userId, formData)
  Object.assign(profile, updated)
  isEditing.value = false
}

onMounted(fetchProfile)
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
.btn {
  padding: 0.5rem 1.25rem;
  color: white;
  border-radius: 0.375rem;
}
</style>
