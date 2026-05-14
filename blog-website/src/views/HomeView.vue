<template>
  <navbar />
  <div class="min-h-screen bg-white">
 <section class="banner rounded-lg px-10 bg-cover bg-center bg-no-repeat round-md w-full h-screen flex items-center">
  <div class="container mx-auto px-6">
    <div class="max-w-xl">
      <h1 class="text-5xl font-extrabold text-gray-400 mb-4">Blog Content</h1>
      <h2 class="text-4xl font-bold text-gray-300 mb-4">{{message}}</h2>
      <p class="text-gray-400  text-3xl font-extrabold italic mb-6">
        “A good cup of coffee is more than just a drink—it’s a pause, a thought, a moment of clarity in the chaos of the day. Let your ideas brew, and your mind awaken.”
      </p>
    </div>
  </div>
</section>


<section class="py-16 bg-white">
  <div class="container bg-gray-100 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 class="text-3xl font-bold text-gray-800 mb-4">About Our Blog</h2>
      <p class="text-gray-400 mb-6 text-2xl font-bold">
        Our blog is a space where thoughts turn into stories, and stories spark inspiration. 
        We believe that every voice has a message worth sharing.  
        <br /><br />
        <em>"Words are free. It’s how you use them that may cost you." – Kipling Williams</em>
      </p>
      <router-link
        to="/"
        class="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
      >
        Read More
      </router-link>
    </div>
    <div class="py-4">
      <img src="../assets/image/page2.jpg" alt="About" class="rounded-lg shadow-md" />
    </div>
  </div>
</section>
<section class="bg-gray-200">
  <div
    class="min-h-screen bg-cover bg-center px-4 py-10"
    style="background-image: url('/images/blog-bg.jpg')"
  >
    <div class="flex justify-between items-center mb-10 max-w-7xl mx-auto px-4 bg-gray-400 p-8">
      <h1 class="text-4xl font-bold text-black">My Blog Posts</h1>
      <div class="flex items-center gap-3">
        <span class="text-gray-700 font-medium">
          {{ layout === 'carousel' ? 'Carousel View' : 'Grid View' }}
        </span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" v-model="isGrid" @change="toggleLayout" />
          <div
            class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"
          ></div>
          <div
            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"
          ></div>
        </label>
      </div>
    </div>

    <div class="bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-7xl mx-auto p-8">
      <!-- Carousel Layout -->
      <div v-if="layout === 'carousel'" class="relative">
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md"
        >
          &#10094;
        </button>

        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="post in userPosts"
              :key="post.id"
              class="min-w-full sm:min-w-[50%] lg:min-w-[33.3333%] px-4"
            >
              <BlogCard :post="post" @remove="removePost" />
            </div>
          </div>
        </div>

        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 p-3 rounded-full shadow-md"
        >
          &#10095;
        </button>
      </div>

      <!-- Grid Layout -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="(post, index) in paginatedPosts"
          :key="post.id"
          :post="post"
          @remove="removePost"
        />
      </div>

      <div v-if="layout === 'grid' && paginatedPosts.length < userPosts.length" class="text-center mt-6">
        <button @click="loadMore" class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Load More
        </button>
      </div>
    </div>
  </div>
  </section>
  </div>
  <footer1 />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAllPosts, deletePost } from '../api/postsApi.js';
import navbar from '../components/shared/navbar.vue';
import footer1 from '../components/shared/footer1.vue';
import BlogCard from '../components/shared/BlogCard.vue';

const message = ref('welcome to the blog!')
const userPosts = ref([]);
const currentSlide = ref(0);
const layout = ref('carousel');
const isGrid = ref(false);
const postsPerPage = 3;
const currentPage = ref(1);

onMounted(async () => {
  try {
    const posts = await getAllPosts();
    if (posts && Array.isArray(posts)) {
      userPosts.value = posts;
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

const paginatedPosts = computed(() =>
  userPosts.value.slice(0, currentPage.value * postsPerPage)
);

function loadMore() {
  currentPage.value++;
}
</script>
<style scoped>
.banner{
  background-image: url('../assets//image/table-4074014_1280.jpg');
}
</style>
