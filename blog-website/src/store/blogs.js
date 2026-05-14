import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])

  // Add a new post to the posts array
  const addPost = (post) => posts.value.push(post)

  // Update an existing post
  const updatePost = (updatedPost) => {
    const index = posts.value.findIndex(post => post.id === updatedPost.id)
    if (index !== -1) posts.value[index] = updatedPost
  }

  // Delete a post based on post ID
  const deletePost = (postId) => {
    posts.value = posts.value.filter(post => post.id !== postId)
  }

  // Add a new post and update state directly in one action
  const createNewPost = (newPost) => {
    posts.value.unshift(newPost) // Adds the new post at the beginning of the posts array
  }

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    createNewPost, // Expose the createNewPost action to add a post instantly
  }
})
