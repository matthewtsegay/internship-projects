<template>
  <div v-if="post" class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>

    <img
      :src="post.image"
      alt="Post Image"
      v-if="post.image"
      class="w-full h-64 object-cover rounded-md mb-4"
    />

    <p class="mb-4 text-gray-800">{{ post.content }}</p>
    <p class="text-sm text-gray-600">Category: {{ post.category }}</p>
    <p class="text-sm text-gray-600 mb-4">Tags: {{ post.tags.join(', ') }}</p>

    <LikeDislikeButton
      :likes="post.likes"
      :dislikes="post.dislikes"
      :userReaction="userReaction"
      :postId="post.id"
      @reaction-updated="updateReaction"
    />
    <div class="comments mt-6 border-t pt-4">
      <h3 class="text-lg font-semibold mb-2">Comments</h3>
      <div
        v-for="comment in post.comments"
        :key="comment.id"
        class="bg-gray-100 p-2 mb-2 rounded"
      >
        <p class="text-sm">
          <strong>{{ comment.user }}:</strong> {{ comment.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '../../api/postsApi.js'
import LikeDislikeButton from '../../components/shared/LikeDislikeButtons.vue'

const route = useRoute()
const post = ref(null)
const userReaction = ref(null)

onMounted(async () => {
  const fetchedPost = await getPostById(route.params.id)
  post.value = fetchedPost
  userReaction.value = fetchedPost.userReaction || null
})

function updateReaction({ likes, dislikes, userReaction: newReaction }) {
  post.value.likes = likes
  post.value.dislikes = dislikes
  userReaction.value = newReaction
}
</script>
