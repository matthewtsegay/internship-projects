<template>
    <form @submit.prevent="submitPost">
      <input v-model="post.title" type="text" placeholder="Title" required />
      <textarea v-model="post.content" placeholder="Content" required></textarea>
      <input v-model="post.image" type="text" placeholder="Image URL" />
      <input v-model="post.category" type="text" placeholder="Category" />
      <input v-model="post.tags" type="text" placeholder="Tags (comma separated)" />
      <button type="submit">Submit Post</button>
    </form>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    postData: Object
  });
  
  const post = ref({ ...props.postData });
  
  const submitPost = () => {
    emit('submit', post.value);
  };
  
  watch(post, (newValue) => {
    console.log(newValue);
  });
  </script>
  