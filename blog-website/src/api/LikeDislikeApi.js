import api1 from '../services/blogApi.js'

export const likedislikePost = async (data) => {
  const response = await api1.post('/reactions/toggle', data)
  return response.data
}

export const likedislikeGet = async (postId) => {
  const response = await api1.get(`/reactions/${postId}/likes`)
  return response.data
}