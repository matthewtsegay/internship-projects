<template>
  <div class="signup-page flex h-screen w-full relative overflow-hidden">
    <div class="hidden md:flex w-2/3 items-center justify-center px-8 relative">
      <div
        class="absolute inset-0 rounded-l-3xl overflow-hidden bg-cover bg-center"
        :style="{ backgroundImage: 'url(/src/assets/image/mati.jpg)' }"
      >
        <div class="absolute inset-0 bg-opacity-60"></div>
      </div>
      <div class="relative z-10 text-white text-center px-8">
        <h2 class="text-3xl font-extrabold mb-4">Welcome to Our Blog Community</h2>
        <p class="text-gray-400 text-2xl italic font-semibold font-serif">
          “The power of a blog is not in its words, but in the connection it creates.”
        </p>
      </div>
    </div>

    <div class="w-full md:w-1/3 flex items-center justify-center bg-gray-100 rounded-md bg-opacity-90 p-6">
      <form
        @submit.prevent="handlesubmit"
        class="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 class="text-3xl font-extrabold text-center text-blue-600">Create Account</h2>

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
          <div class="flex justify-center">
            <FormImageUpload
              v-model="user.image"
              id="image"
              label="Upload Image"
              class="w-full"
            />
          </div>
          <div class="mb-4">
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              v-model="user.bio"
              rows="3"
              class="mt-1 block w-full border rounded-lg p-2"
              placeholder="Write a short bio..."
            ></textarea>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm -mt-2">{{ error }}</div>

        <div class="flex justify-between mt-4">
          <button
            v-if="step > 1"
            type="button"
            @click="step--"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
          <button
            v-if="step < 3"
            type="button"
            @click="nextStep"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
          <button
            v-if="step === 3"
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>

        <p class="mt-4 text-sm text-center">
          Already have an account?
          <router-link to="/loginView" class="text-blue-500 hover:underline">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.js';
import { signup } from '../../api/authApi.js'; // Your API call
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
    router.push({ name: 'loginView' });

  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || err.message || 'Signup failed';
  }
};
</script>
