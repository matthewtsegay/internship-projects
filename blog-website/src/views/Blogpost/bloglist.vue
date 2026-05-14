<template>
    <div class="min-h-screen bg-cover bg-center px-4 py-10" style="background-image: url('/images/blog-bg.jpg')">
      <div class="flex justify-between items-center mb-10 max-w-7xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-black">My Blog Posts</h1>
        <div class="flex items-center gap-3">
          <span class="text-gray-700 font-medium">
            {{ layout === 'carousel' ? 'Carousel View' : 'Grid View' }}
          </span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" v-model="isGrid" @change="toggleLayout" />
            <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
  
      <div class="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-7xl mx-auto p-8">
        <!-- Carousel Layout -->
        <div v-if="layout === 'carousel'" class="relative">
          <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md">
            &#10094;
          </button>
  
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="post in userPosts" :key="post.id" class="min-w-full sm:min-w-[50%] lg:min-w-[33.3333%] px-4">
                <blogpost :post="post" @remove="removePost" />
              </div>
            </div>
          </div>
  
          <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md">
            &#10095;
          </button>
        </div>
  
        <!-- Grid Layout -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <blogpost v-for="post in paginatedPosts" :key="post.id" :post="post" @remove="removePost" />
        </div>
  
        <div v-if="layout === 'grid' && paginatedPosts.length < userPosts.length" class="text-center mt-6">
          <button @click="loadMore" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Load More
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAllPosts,deletePost } from '../../api/postsApi.js';
  import blogpost from '../../components/blog/blogpost.vue';
  
  const router = useRouter();
  const userPosts = ref([]);
  const currentSlide = ref(0);
  const layout = ref('grid');
  const isGrid = ref(true);
  const postsPerPage = 3;
  const currentPage = ref(1);
  
  const paginatedPosts = computed(() => {
    const end = currentPage.value * postsPerPage;
    return userPosts.value.slice(0, end);
  });
  
  onMounted(async () => {
    try {
      const rawUserId = localStorage.getItem('userId');
      console.log("Fetched userId:", rawUserId);
  
      if (!rawUserId) {
        router.push({ name: 'loginView' });
        return;
      }
  
      const userId = Number(rawUserId);
      const posts = await getAllPosts();
      console.log("All fetched posts:", posts);
  
      if (posts && Array.isArray(posts)) {
        userPosts.value = posts.filter(post => post.userId === userId);
        console.log("Filtered userPosts:", userPosts.value);
      } else {
        console.error('Unexpected response structure:', posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  });
  
  function toggleLayout() {
    layout.value = isGrid.value ? 'grid' : 'carousel';
  }
  
  function removePost(id) {
    deletePost(id)
      .then(() => {
        userPosts.value = userPosts.value.filter(post => post.id !== id);
      })
      .catch(err => console.error('Delete failed:', err));
  }
  
  function prevSlide() {
    if (currentSlide.value > 0) currentSlide.value--;
  }
  
  function nextSlide() {
    const maxSlides = Math.ceil(userPosts.value.length / 3) - 1;
    if (currentSlide.value < maxSlides) currentSlide.value++;
  }
  
  function loadMore() {
    currentPage.value++;
  }
  </script>
  