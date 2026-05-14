<template>
    <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out m-4">
      <img v-if="post.image" :src="post.image" class="w-full h-52 object-cover rounded-t-2xl" />
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
        <p class="text-sm text-gray-500 mb-4">Category: <span class="font-semibold">{{ post.category }}</span></p>
        <p class="text-gray-600 mb-4">{{ post.content }}</p>
  
        <LikeDislikeButton
          :likes="likes"
          :dislikes="dislikes"
          :userReaction="userReaction"
          @like="handleLike"
          @dislike="handleDislike"
        />
  
        <div class="flex justify-between items-center mt-4">
          <router-link :to="`/edit/${post.id}`" class="text-blue-600 hover:underline text-sm">Edit</router-link>
          <button @click="deletePost" class="text-red-500 hover:text-red-600 text-sm">Delete</button>
        </div>
  
        <hr class="my-4" />
  
        <div v-for="comment in comments" :key="comment.id">
          <Comment :comment="comment" />
        </div>
  
        <CommentForm @submit="addComment" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import LikeDislikeButton from './LikeDislikeButtons.vue';
  import Comment from './Comment.vue';
  import CommentForm from './CommentForm.vue';
  
  const props = defineProps({ post: Object });
  const emit = defineEmits(['remove']);
  
  const likes = ref(props.post.likes || 0);
  const dislikes = ref(props.post.dislikes || 0);
  const userReaction = ref(null);
  const comments = ref(props.post.comments || []);
  
  function handleLike(action) {
    if (action === 'add') {
      likes.value++;
      if (userReaction.value === 'dislike') dislikes.value--;
      userReaction.value = 'like';
    } else {
      likes.value--;
      userReaction.value = null;
    }
  }
  
  function handleDislike(action) {
    if (action === 'add') {
      dislikes.value++;
      if (userReaction.value === 'like') likes.value--;
      userReaction.value = 'dislike';
    } else {
      dislikes.value--;
      userReaction.value = null;
    }
  }
  
  function addComment(content) {
    const newComment = {
      id: Date.now(),
      content,
      user: "CurrentUser",
      created_at: new Date(),
    };
    comments.value.unshift(newComment);
  }
  
  function deletePost() {
    emit('remove', props.post.id);
  }
  </script>
  