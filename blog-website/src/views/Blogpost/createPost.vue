<template>
  <navbar />

  <div class="min-h-screen flex items-center justify-center bg-gray-300 py-8">
    <div class="w-full max-w-2xl bg-gray-100 p-8 rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4 text-center bg-gray-400 text-white p-2 rounded">
        Create Post
      </h1>

      <form @submit.prevent="submitPost" class="space-y-6 bg-white p-4 rounded-2xl">
        <!-- Image Upload Section -->
        <div class="flex justify-center">
          <FormImageUpload
            v-model="post.image"
            id="image"
            label="Upload Image"
            class="w-full"
          />
        </div>

        <!-- Title Section -->
        <FormInput
          v-model="post.title"
          type="text"
          id="title"
          label="Title"
          placeholder="Enter post title"
          required
        />

        <!-- Category Section -->
        <FormInput
          v-model="post.category"
          type="text"
          id="category"
          label="Category"
          placeholder="Enter category"
          required
        />

        <!-- Tags Section -->
        <FormInput
          v-model="post.tags"
          type="text"
          id="tags"
          label="Tags"
          placeholder="Add tags..."
        />

        <!-- Content Section -->
        <div class="w-full max-w-2xl mx-auto">
              <label for="content" class="block text-sm font-bold text-gray-700 mb-1 ml-4 sm:ml-6 md:ml-16">
                Content
              </label>
              <textarea
                v-model="post.content"
                id="content"
                placeholder="Enter content..."
                required
                class="w-full sm:w-3/4 md:w-110 flex flex-wrap border rounded-lg  sm:ml-6 md:ml-16 p-2 h-32"
              ></textarea>
        </div>



        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-100 ml-20 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>

  <footer1 />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { createPost } from '../../api/postsApi.js'; // updated function
import navbar from '../../components/shared/navbar.vue';
import footer1 from '../../components/shared/footer1.vue';
import FormInput from '../../components/shared/FormInput.vue';
import FormImageUpload from '../../components/shared/FormImageUpload.vue';

const router = useRouter();
const userId = localStorage.getItem('userId');

const post = ref({
  userId,
  title: '',
  content: '',
  image: null,
  category: '',
  tags: '',
});

async function submitPost() {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('category', post.value.category);
    formData.append('tags', post.value.tags); // you can also do .split(',') if backend expects array
    if (post.value.image) {
      formData.append('image', post.value.image);
    }

    const res = await createPost(formData);
    const newPost = res.data ?? res;

    const postId = newPost.id || newPost.postId; // depends on backend response
    if (!postId) throw new Error('No post ID returned from server.');

    // ✅ Save postId in localStorage
    localStorage.setItem('createdPostId', postId);

    // ✅ Redirect to home or anywhere
    router.push('/MyPosts');
  } catch (err) {
    console.error('Error creating post:', err);
  }
}
</script>
