import axios from "axios";

const path = import.meta.env.VITE_URL_API;


const api3 = axios.create({
    baseURL: path,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api3;