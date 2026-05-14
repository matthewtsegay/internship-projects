import api from "../services/apiServices.js"
import api3 from "../services/loginApi.js"


export const signup = async (data) => {
    const response = await api.post('/signup', data)
    return response.data
  }
export const login = async (data) => {
    const response = await api3.post('/login', data)
    return response.data
  }
export const deleteuser = async (id) => {
    const response = await api.delete(`/delete-User/${id}`)
    return response.data
  }
export const ForgotPassword = async (data) => {
   const response = await api3.post('/forgot-password',data)
   return response.data
}
export const resetPassword = async (data) => {
  const response = await api3.put(`/reset-password`,data)
  return response.data
}
export const updateProfile = async (id,userdata) => {
  const response = await api.put(`/update-profile/${id}`,userdata)
  return response.data
}
export const getProfile = async (id) =>{
  const response = await api.get(`/${id}`)
  return response.data
}
export const VerifyCode = async (data) =>{
  const response = await api3.post('/verify-reset-code',data)
  return response.data
}
export const ResetPassword = async (data) =>{
  const response = await api3.put ('/reset-password',data)
  return response.data
}