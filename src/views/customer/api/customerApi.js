
import api from '../service/menuService'

export const getMenuItem = async (tableid) =>{
    try{
        const response = await api.get('/menuView',{params:{tableid}})//as path url('/menuView/${tableid}')
        return response.data
    }catch(error){
        const message = getErrorMessage(error)
        console.error('Failed to fetch menu Items:',message)
        throw new error(message)
    }
}
export const placeOrder = async (data) =>{
    try{
        const response = await api.post('/cart',data)
        return response.data
    }catch(error){
        const message = getErrorMessage(error)
        console.error('Failed to place order:',message)
        throw new error(message)
    }
}
export const submmitFeedback = async (data)=>{
    try{
        const response = await api.post('/feedback',data)
        return response.data
     }catch(error){
        const response = getErrorMessage(error)
        console.error('Failed to submmit feedback',message)
        throw new error(message)
     }
}
export const makePayment = async (data) =>{
    try{
        const response = await api.post('/payment',data)
        return response.data
    }catch(error){
        const response = getErrorMessage(error)
        console.error('Failed to makePayment:',message)
        
    }
}

