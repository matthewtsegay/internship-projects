<template>
  <navbar />

  <div class="min-h-screen flex items-center justify-center bg-gray-300 py-8">
    <div class="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-6 text-center">Edit Post</h1>

      <form @submit.prevent="handleUpdatePost" class="space-y-6">
        <!-- Image display (click to show upload form) -->
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
            v-model="post.image"
            id="image"
            label="Upload Image"
            class="w-full"
          />
        </div>
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input v-model="post.title" type="text" id="title" required class="w-full border rounded p-2" />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input v-model="post.category" type="text" id="category" required class="w-full border rounded p-2" />
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input v-model="post.tags" type="text" id="tags" class="w-full border rounded p-2" />
        </div>

        <!-- Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea v-model="post.content" id="content" rows="6" required class="w-full border rounded p-2"></textarea>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Update Post
        </button>
      </form>
    </div>
  </div>

  <footer1 />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPost, updatePost } from '../../api/postsApi.js';
import FormImageUpload from '../../components/shared/FormImageUpload.vue';
import navbar from '../../components/shared/navbar.vue';
import footer1 from '../../components/shared/footer1.vue';

const router = useRouter();
const postId = localStorage.getItem('editPostId');
const userId = localStorage.getItem('userId');

const post = ref({
  title: '',
  content: '',
  image: null,
  category: '',
  tags: ''
});

const imagePath = ref(null);
const isUploadVisible = ref(false);

// Fetch the post to be edited
const loadPost = async () => {
  try {
    const data = await getPost(postId);
    post.value = {
      title: data.title,
      content: data.content,
      category: data.category,
      tags: data.tags ? data.tags.join(', ') : '',
      image: null
    };
    imagePath.value = data.imagePath || '';
  } catch (error) {
    console.error('Failed to load post:', error);
  }
};

// Handle form submission and post update
const handleUpdatePost = async () => {
  if (!userId) {
    alert("User not authenticated.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('category', post.value.category);
    formData.append('tags', post.value.tags); // assuming comma-separated tags
    formData.append('userId', userId);

    if (post.value.image) {
      formData.append('image', post.value.image);
    }

    await updatePost(postId, formData);

    localStorage.removeItem('editPostId');
    localStorage.removeItem('editPost');
    localStorage.removeItem('imagePath');

    router.push({ name: 'PostDashBoard' });

  } catch (error) {
    console.error('Error updating post:', error);
    alert('Failed to update post. Please try again.');
  }
};

onMounted(() => {
  loadPost();
});
</script>
