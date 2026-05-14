import axios from "axios";

const path = import.meta.env.VITE_URL_API_BLOG;


const api1 = axios.create({
    baseURL: path,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default api1;



