import api from '../../../service/authService/userService.js'

export const signup = async (Userdata)=>{
    try{
        const response = await api.post('/signup',Userdata)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)

    }
}
export const login = async (Userdata)=>{
    try{
        const response = await api.post('/login',Userdata)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }

}
export const forgetPassword = async (email)=>{
    try{
        const response = await api.post('/auth/forgetPassword',email)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }

}
export const resetPassword = async (password)=>{
    try{
        const response = await api.post(`/auth/reset-password`,password)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }

}
export const deleteuser = async (id) => {
    try{
        const response = await api.delete(`/delete-User/${id}`)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }
    
  }
export const updateProfile = async (id,userdata) => {
    try{ 
        const response = await api.put(`/update-profile/${id}`,userdata)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }
}
export const getProfile = async (id) =>{
    try{
        const response = await api.get(`/${id}`)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
    }
  
}
export const VerifyCode = async (data) =>{
    try{
        const response = await api3.post('/verify-reset-code',data)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new error(error)
   }
  
}
