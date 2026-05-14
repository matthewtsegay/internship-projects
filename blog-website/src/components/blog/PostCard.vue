<template>
    <div class="post-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img :src="post.imagepath" alt="post-image" class="w-full h-48 object-cover">
        <div class="p-4">
           <h3>{{ post.title }}</h3>
           <p>{{ post.content.slice(0,100) }}</p>
          <router-link :to="{name:'post',params={id:postMessage.id}}" class="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
            read more</router-link>
       </div>
    </div>
</template>
<script setup>
defineProps({
    post:object
})
</script>