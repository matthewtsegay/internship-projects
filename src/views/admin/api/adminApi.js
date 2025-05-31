import api from '../../../service/adminService/adminService.js'

export const getAdmin = async ()=>{
    try{
        const response = await api.get('/admin')
        return response.data
    }
    catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to fetch admin data',)
    }
}
export const getAllstaff = async ()=>{
    try{
        const response = await api.get('/admin/staff')
        return response.data
    }
    catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to fetch admin data',)
    }
}
export const addMenu = async ()=>{
    try{
        const response = await api.post('/admin/addMenu')
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to add staff',message)
    }
}
export const getAllmenu = async ()=>{
    try{
        const response = await api.get('/admin/menu')
        return response.data
    }
    catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to fetch admin data',)
    }
}
export const addStaff = async ()=>{
    try{
        const response = await api.post('/addstaff')
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to add staff',message)
    }
}
export const editStaff = async ()=>{
    try{
        const response = await api.put(`/admin/editstaff/${id}`)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to edit staff', message)
    }
} 
export const editMenu = async (menuId)=>{
    try{
        const response = await api.put(`/admin/editMenu/${menuId}`)
        return response.data
    }catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to edit menu',message)
    }
}
export const deletemenu = async ()=>{
    try{
        const response = await api.delete('/admin/menu')
        return response.data
    }
    catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to fetch admin data',)
    }
}
export const deletestaff = async ()=>{
    try{
        const response = await api.delete('/staff')
        return response.data
    }
    catch(error){
        const message = error.response?.data?.message || error.message || 'An error occurred'
        console.error(error)
        throw new Error('Failed to fetch admin data',)
    }
}