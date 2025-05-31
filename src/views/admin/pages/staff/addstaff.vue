<template>
  <navbar />

  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4">
    <div class="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <h1 class="text-xl font-semibold mb-6 text-center bg-gray-500 text-white p-2 rounded shadow">
        Add Staff
      </h1>

      <form @submit.prevent="submitstaff" class="space-y-4">

        <FormInput 
                  v-model="staff.firstname" 
                  type="text" id="firstname" 
                  label="Firstname"
                  placeholder="firstname" 
                  required 
        />
        <FormInput
                  v-model="staff.lastname"
                  type="text" 
                  id="lastname" 
                  label="Lastname" 
                  placeholder="lastname" 
                  required 
        />
        <div>
          <label for="sex" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sex</label>
          <select
            id="sex"
            v-model="staff.sex"
            required
            class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
      </div>
        <FormInput 
                  v-model="staff.position" 
                  type="text" 
                  id="position" 
                  label="Position" 
                  placeholder="position" 
                  required
         />
        <FormInput v-model="staff.phonenumber" 
                   type="text" 
                   id="phonenumber" 
                   label="Phone Number" 
                   placeholder="+251************"
                   required
         />
        <FormInput v-model="staff.email" 
                   type="email"
                   id="email" 
                   label="Email" 
                   placeholder="email" 
                   required 
        />

        <button
          type="submit"
          class="w-full flex justify-center items-center bg-gray-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>{{ isLoading ? "Submitting..." : "Add" }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { addStaff } from '../../api/adminApi.js';

import navbar from '../../../../components/shared/navbar.vue';
import FormInput from '../../../../components/shared/FormInput.vue';
import FormImageUpload from '../../../../components/shared/FormImageUpload.vue';

const router = useRouter();
const toast = useToast();
const isLoading = ref(false);

const userId = localStorage.getItem('userId');
const staff = ref({
  userId,
  firstname: '',
  lastname: '',
  sex: '',
  position: '',
  Bio: '',
  image: null,
  phonenumber: '',
  email: '',
});

function isValidPhone(phone) {
  return /^[0-9]{7,15}$/.test(phone);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resetForm() {
  staff.value = {
    userId,
    firstname: '',
    lastname: '',
    sex: '',
    position: '',
    Bio: '',
    image: null,
    phonenumber: '',
    email: '',
  };
}

async function submitstaff() {
  if (!isValidPhone(staff.value.phonenumber)) {
    toast.error('Phone number must be digits only (7 to 15 digits)');
    return;
  }

  if (!isValidEmail(staff.value.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  try {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('firstname', staff.value.firstname);
    formData.append('lastname', staff.value.lastname);
    formData.append('sex', staff.value.sex);
    formData.append('position', staff.value.position);
    formData.append('phonenumber', staff.value.phonenumber);
    formData.append('email', staff.value.email);
    formData.append('Bio', staff.value.Bio);

    if (staff.value.image) {
      formData.append('image', staff.value.image);
    }

    const res = await addStaff(formData);
    const newstaff = res.data ?? res;
    const staffId = newstaff.id || newstaff.staffId;

    if (!staffId) throw new Error('No staff ID returned from server.');

    localStorage.setItem('createdstaffId', staffId);
    toast.success('Staff added successfully!');
    resetForm();
    router.push('staffManager');
  } catch (err) {
    console.error('Error creating staff:', err);
    toast.error('Failed to create staff. Please try again.');
  } finally {
    isLoading.value = false;
  }
}
</script>
