<template>
  <navbar />

  <div class="min-h-screen flex items-center justify-center bg-gray-700 dark:bg-gray-900 py-12 px-4">
    <div class="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <h1 class="text-xl font-semibold mb-6 text-center bg-gray-500 text-white p-2 rounded shadow">
        Add Menu
      </h1>

      <form @submit.prevent="submitmenu" class="space-y-4">
        <div class="flex justify-center">
          <FormImageUpload
            v-model="menu.image"
            id="image"
            label="Upload"
            class="w-full max-w-xs"
          />
        </div>

        <FormInput
          v-model="menu.title"
          type="text"
          id="title"
          label="Title"
          placeholder="Menu title"
          required
        />
        <FormInput
          v-model="menu.category"
          type="text"
          id="category"
          label="Category"
          placeholder="Menu category"
          required
        />
        
        <div>
          <label for="content" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <textarea
            v-model="menu.content"
            id="content"
            placeholder="Enter content..."
            required
            class="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm rounded-md p-2 h-20 focus:outline-none focus:ring-2 focus:ring-gray-400"
          ></textarea>
        </div>

        <FormInput
          v-model="menu.price"
          type="number"
          id="price"
          label="Price"
          placeholder="Price"
        />

        <button
          type="submit"
          class="w-full flex justify-center items-center bg-gray-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addMenu } from '../../api/adminApi.js';

import navbar from '../../../../components/shared/navbar.vue';
import FormInput from '../../../../components/shared/FormInput.vue';
import FormImageUpload from '../../../../components/shared/FormImageUpload.vue';

const router = useRouter();
const userId = localStorage.getItem('userId');

const menu = ref({
  userId,
  title: '',
  category: '',
  content: '',
  image: null,
  price: '',
});

async function submitmenu() {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', menu.value.title);
    formData.append('content', menu.value.content);
    formData.append('category', menu.value.category);
    formData.append('price', menu.value.price);
    if (menu.value.image) {
      formData.append('image', menu.value.image);
    }

    const res = await addMenu(formData);
    const newmenu = res.data ?? res;

    const menuId = newmenu.id || newmenu.menuId;
    if (!menuId) throw new Error('No menu ID returned from server.');

    localStorage.setItem('createdmenuId', menuId);
    router.push('MenuManager');
  } catch (err) {
    console.error('Error creating menu:', err);
  }
}
</script>
