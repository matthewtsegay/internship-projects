<template>
  <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out m-4">
    <!-- Render image directly if available -->
    <img
  
      :src="post.imageUrl"
      :alt="post.title"
      class="w-full h-52 object-cover rounded-t-2xl"
    />

    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
      <p class="text-sm text-gray-500 mb-2">
        Category: <span class="font-semibold">{{ post.category }}</span>
      </p>
      <p class="text-gray-600 mb-4">{{ post.content }}</p>

      <LikeDislikeButton
        :likes="likes"
        :dislikes="dislikes"
        :userReaction="userReaction"
        @like="handleLike"
        @dislike="handleDislike"
      />

      <div>
        <button
          @click="toggleComment"
          class="flex items-center text-blue-500 hover:text-blue-700 text-sm mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 8h2a2 2 0 012 2v10l-4-4H7a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          </svg>
          {{ showCommentField ? 'Hide Comments' : 'Comment' }}
        </button>

        <div v-if="showCommentField" class="mt-4">
          <CommentForm @submit="onAddComment" />
          <div v-for="comment in comments" :key="comment.id" class="mt-2">
            <Comment :comment="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LikeDislikeButton from './LikeDislikeButtons.vue'
import Comment from './Comment.vue'
import CommentForm from './CommentForm.vue'
import { likedislikeGet, likedislikePost } from '../../api/LikeDislikeApi.js'
import { getComments, addComment } from '../../api/commentApi.js'

// props
const props = defineProps({
  post: { type: Object, required: true }
})

// state
const likes = ref(0)
const dislikes = ref(0)
const userReaction = ref(null)
const comments = ref([])
const showCommentField = ref(false)

const imageUrl = ref(props.post.image)

onMounted(async () => {
  await loadReactions()
  await loadComments()
})

async function loadReactions() {
  try {
    const { likes: l = 0, dislikes: d = 0, userReaction: ur = null } = await likedislikeGet(props.post.id)
    likes.value = l
    dislikes.value = d
    userReaction.value = ur
  } catch (e) {
    console.error('Failed to load reactions', e)
  }
}

async function loadComments() {
  try {
    const data = await getComments(props.post.id)
    comments.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('Failed to load comments', e)
  }
}

function toggleComment() {
  showCommentField.value = !showCommentField.value
}

async function onAddComment(content) {
  const stored = localStorage.getItem('user')
  if (!stored) return alert('Please log in first to comment.')
  let user
  try {
    user = JSON.parse(stored)
  } catch {
    return alert('Invalid user session')
  }
  try {
    const newC = await addComment({ postId: props.post.id, userId: user.id, content })
    comments.value.unshift(newC)
  } catch (e) {
    console.error(e)
    alert('Failed to add comment.')
  }
}

async function handleLike() {
  await react('like')
}
async function handleDislike() {
  await react('dislike')
}
async function react(type) {
  const stored = localStorage.getItem('user')
  if (!stored) return alert(`Please log in first to ${type} the post.`)
  const user = JSON.parse(stored)
  const newReaction = userReaction.value === type ? null : type
  try {
    const res = await likedislikePost({ postId: props.post.id, userId: user.id, reaction: newReaction })
    likes.value = res.likes
    dislikes.value = res.dislikes
    userReaction.value = res.userReaction
  } catch (e) {
    console.error(`Error posting ${type}`, e)
  }
}
</script>

<style scoped>
</style>
