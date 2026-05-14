import api1 from  '../services/blogApi.js'

export const getAllPosts = async () => {
    const response = await api1.get('/posts')
    return response.data
}
export const getPostById = async (id) => {
    const response = await api1.get(`/posts/${id}`)
    return response.data
}
export const createPost = async (formData) => {
  try {
      const response = await api1.post('/posts/create', formData);
      return response.data;
  } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
      throw error;
  }
};
export const updatePost = async (id,post) => {
    const response = await api1.put(`/posts/${id}`,post)
    return response.data
}
export const deletePost = async (id) =>{
    const response = await api1.delete(`/posts/${id}`)
    return response.data
}

export const getPost = async (postid) => {
    const response = await api1.get(`/posts/${postid}`)
    return response.data
}
export const updataPost = async (postid,data) =>{
    const response = await api1.post(`/posts/${postid}`,data)
    return response.data
}
// src/api/postsApi.js

