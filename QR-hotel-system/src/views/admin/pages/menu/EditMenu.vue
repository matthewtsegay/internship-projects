<template>
    <navbar />
  
    <div class="min-h-screen flex items-center justify-center bg-gray-300 py-8">
      <div class="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold mb-6 text-center">Edit menu</h1>
  
        <form @submit.prevent="handleUpdatemenu" class="space-y-6">
          <div v-if="imagePath" class="flex justify-center">
            <img
              :src="imagePath"
              alt="Current Image"
              class="w-48 h-48 object-cover rounded mb-4 cursor-pointer"
              @click="isUploadVisible = true" 
            />
          </div>
          <div v-if="isUploadVisible" class="flex justify-center">
            <FormImageUpload
              v-model="menu.image"
              id="image"
              label="Upload Image"
              class="w-full"
            />
          </div>
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                Title
            </label>
            <FormInput  v-model="menu.name"
                        type="text"
                        id="title"
                        label="name"
                        required 
                        class="w-full border rounded p-2"
            />
          </div>
  
          <!-- pri -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <FormInput v-model="menu.content" 
                       type="text"
                       id="category" 
                       required 
                       class="w-full border rounded p-2"
           />
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">price</label>
            <FormInput v-model="menu.price"
                       type="number"
                       label="price"
                       id="price" 
                       class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea v-model="menu.content" id="content" rows="6" required class="w-full border rounded p-2"></textarea>
          </div>
  
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Update menu
          </button>
        </form>
      </div>
    </div>
  
    <footer1 />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getmenu, updatemenu } from '../../api/menusApi.js';
  import FormImageUpload from '../../components/shared/FormImageUpload.vue';
  import FormInput from '../../components/shared/FormInput.vue';
  import navbar from '../../components/shared/navbar.vue';
  import footer1 from '../../components/shared/footer1.vue';
  
  const router = useRouter();
  const menuId = localStorage.getItem('editmenuId');
  const userId = localStorage.getItem('userId');
  
  const menu = ref({
    name: '',
    content: '',
    category:'',
    image: null,
    price: '',
  });
  
  const imagePath = ref(null);
  const isUploadVisible = ref(false);
  const loadmenu = async () => {
    try {
      const data = await getmenu(menuId);
      menu.value = {
        name: data.name,
        content: data.content,
        category: data.category,
        image: null
      };
      imagePath.value = data.imagePath || '';
    } catch (error) {
      console.error('Failed to load menu:', error);
    }
  };
  const handleUpdatemenu = async () => {
    if (!userId) {
      alert("User not authenticated.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', menu.value.name);
      formData.append('content', menu.value.content);
      formData.append('category', menu.value.category);
      formData.append('price', menu.value.price); // assuming comma-separated price
      formData.append('userId', userId);
  
      if (menu.value.image) {
        formData.append('image', menu.value.image);
      }
  
      await updatemenu(menuId, formData);
  
      localStorage.removeItem('editmenuId');
      localStorage.removeItem('editmenu');
      localStorage.removeItem('imagePath');
  
      router.push({ name: 'menuDashBoard' });
  
    } catch (error) {
      console.error('Error updating menu:', error);
      alert('Failed to update menu. Please try again.');
    }
  };
  
  onMounted(() => {
    loadmenu();
  });
  </script>
  