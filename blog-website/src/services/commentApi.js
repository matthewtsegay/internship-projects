import axios from "axios";

const path = import.meta.env.VITE_URL_API_BLOG;


const api2 = axios.create({
    baseURL: path,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api2;
