import api from '../../../service/staffService.js'


export const addDrink = async (drinkdata)=>{
 try {
    const response = await api.post('/addDrink',drinkdata)
    return response.data
}catch(error){
    const message = error.response?.data?.message || error.message || 'An error occured'
    console.error(error)
    throw new error('failed to add drink',message)
}

}
export const EditDrink = async (drinkdata)=>{
 try{
    const response = await api.put('/editDrink',drinkdata)   
    return response.data
}catch(error){
    const message = error.response?.data?.message || error.message || "An error occured!"
    console.error(error)
    throw new error("failed to Edit drink",message)
}
}
export const getallDrinks = async ()=>{
    try{
       const response = await api.get('/drinks')   
       return response.data
   }catch(error){
       const message = error.response?.data?.message || error.message || "An error occured!"
       console.error(error)
       throw new error("failed to Edit drink",message)
   }
   }