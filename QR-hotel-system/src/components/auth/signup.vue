<template>
  <div class="signup-page relative h-screen w-full bg-cover bg-center flex items-center justify-center">
    <div class="bg-gray-800  border border-gray-200 rounded-xl shadow-xl px-4 py-5 w-[95%] max-w-xs">
      <form @submit.prevent="handlesubmit" class="space-y-3">
        <h2 class="text-xl font-bold text-center text-gray-300">sign up</h2>

        <div v-if="step === 1">
          <FormInput
            label="Username"
            v-model="user.username"
            placeholder="username"
            type="text"
            id="username"
            autocomplete="username"
            required
          />
          <FormInput
            label="Password"
            v-model="user.password"
            type="password"
            placeholder="********"
            id="password"
            autocomplete="new-password"
            required
          />
          <FormInput
            label="Confirm Password"
            v-model="user.confirmpassword"
            type="password"
            placeholder="********"
            id="confirmpassword"
            autocomplete="new-password"
            required
          />
        </div>

        <div v-if="step === 2">
          <FormInput
            label="First Name"
            v-model="user.firstName"
            placeholder="first name"
            type="text"
            id="firstname"
            autocomplete="given-name"
            required
          />
          <FormInput
            label="Last Name"
            v-model="user.lastName"
            placeholder="last name"
            type="text"
            id="lastname"
            autocomplete="family-name"
            required
          />
          <FormInput
            label="Email"
            v-model="user.email"
            placeholder="email"
            type="email"
            id="email"
            autocomplete="email"
            required
          />
          <FormInput
            label="Phone Number"
            v-model="user.phoneNumber"
            placeholder="+251----------"
            type="tel"
            id="phone-number"
            autocomplete="tel"
            required
          />
        </div>

        <div v-if="step === 3">
          <FormImageUpload
            v-model="user.image"
            id="image"
            label="Upload Image"
            class="w-full"
          />
          <div>
            <label for="bio" class="block text-xs font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              v-model="user.bio"
              rows="2"
              class="mt-1 block w-full border rounded-md p-1 text-xs"
              placeholder="Write a short bio..."
            ></textarea>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-xs">{{ error }}</div>

        <div class="flex justify-between items-center mt-2">
          <button
            v-if="step > 1"
            type="button"
            @click="step--"
            class="px-2 py-1 text-xs bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            v-if="step < 3"
            type="button"
            @click="nextStep"
            class="ml-auto px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Next
          </button>
          <button
            v-if="step === 3"
            type="submit"
            class="ml-auto px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>

        <p class="mt-2 text-xs text-center text-gray-400 font-bold">
          Already have an account?
          <router-link to="/" class="text-gray-300 hover:underline">sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>




<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../views/auth/store/authStore.js';
import { signup } from '../../views/auth/api/authApi.js'; // Your API call
import FormInput from '../shared/FormInput.vue';
import FormImageUpload from '../shared/FormImageUpload.vue';

const router = useRouter();
const authStore = useAuthStore();

const user = ref({
  username: '',
  password: '',
  confirmpassword: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  bio: '',
  image: null,
});

const step = ref(1);
const error = ref('');

const nextStep = () => {
  error.value = '';
  if (step.value === 1) {
    if (!user.value.username || !user.value.password || !user.value.confirmpassword) {
      error.value = 'Please fill out all fields.';
      return;
    }
    if (user.value.password !== user.value.confirmpassword) {
      error.value = 'Passwords do not match.';
      return;
    }
  }
  step.value++;
};

const handlesubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('username', user.value.username);
    formData.append('password', user.value.password);
    formData.append('confirmPassword', user.value.confirmpassword);
    formData.append('firstName', user.value.firstName);
    formData.append('lastName', user.value.lastName);
    formData.append('email', user.value.email);
    formData.append('phoneNumber', user.value.phoneNumber);
    formData.append('bio', user.value.bio);
    if (user.value.image) {
      formData.append('image', user.value.image);
    }

    const res = await signup(formData);
    const createdUser = res.data ?? res;
    const idToStore = createdUser.id || createdUser.userId;
    if (!idToStore) {
      throw new Error('No user ID returned from signup');
    }
    localStorage.setItem('user', JSON.stringify(user.value));
    
    //localStorage.setItem('userId', idToStore);
    authStore.set(createdUser);
    router.push({ name: 'login' });

  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || err.message || 'Signup failed';
  }
};
</script>
<style scoped>
.signup-page {
  background-image: url('../../assets/image/pizza1.jpg'); /* adjust to your image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>