
import api2 from '../services/commentApi.js';

export const getComments = async (postId) => {
  const response = await api2.get(`comments/post/${postId}`);
  return response.data;
};
export const addComment = async (payload) => {
  try {
    const response = await api2.post('comments/add', payload)
    return response.data
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message)
    throw error
  }
}